/**
 * Workflow Execution Engine
 *
 * Handles:
 * - Topological sorting of workflow steps
 * - Variable resolution in prompts
 * - LLM API calls for each step
 * - Execution logging and error handling
 */

import { createChatCompletion } from '@/lib/ai/openai-client'
import type {
  WorkflowNode,
  WorkflowEdge,
  WorkflowExecutionResult,
  ExecutionLog
} from './types'

export class WorkflowEngine {
  private nodes: Map<string, WorkflowNode>
  private edges: WorkflowEdge[]
  private results: Map<string, string>

  // Callback functions for UI updates
  public onStepStart?: (stepId: string) => void
  public onStepComplete?: (stepId: string, output: string) => void
  public onStepError?: (stepId: string, error: string) => void

  constructor(nodes: WorkflowNode[], edges: WorkflowEdge[]) {
    this.nodes = new Map(nodes.map(n => [n.id, n]))
    this.edges = edges
    this.results = new Map()
  }

  /**
   * Execute the entire workflow
   */
  async execute(initialInput: string): Promise<WorkflowExecutionResult> {
    const log: ExecutionLog[] = []
    const startTime = Date.now()

    console.log('[WorkflowEngine] Starting execution with input:', initialInput)

    try {
      // 1. Topological sort to get execution order
      const executionOrder = this.topologicalSort()
      console.log('[WorkflowEngine] Execution order:', executionOrder)

      // 2. Set initial input
      const inputStepId = this.findPrimaryInputNode()
      if (!inputStepId) {
        throw new Error('Workflow must have an input/start node')
      }
      this.results.set(inputStepId, initialInput)
      console.log('[WorkflowEngine] Set input node:', inputStepId, 'with value:', initialInput)

      // 3. Execute each step in order
      for (const stepId of executionOrder) {
        const node = this.nodes.get(stepId)
        if (!node) {
          console.log('[WorkflowEngine] Node not found:', stepId)
          continue
        }

        console.log('[WorkflowEngine] Processing node:', stepId, 'type:', node.type)

        // Skip input (already set) and output (processed at end)
        if (node.type === 'input' || node.type === 'output') {
          console.log('[WorkflowEngine] Skipping', node.type, 'node')
          continue
        }

        // Execute AI step
        if (this.isAgentNode(node.type)) {
          console.log('[WorkflowEngine] Executing agent node:', stepId)
          await this.executeAgentNode(stepId, node, log)
          console.log('[WorkflowEngine] Completed agent node:', stepId, 'result:', this.results.get(stepId)?.substring(0, 100) + '...')
        } else {
          console.log('[WorkflowEngine] Node type not recognized as agent:', node.type)
        }
      }

      // 4. Get final output
      const outputStepId = this.findPrimaryOutputNode()
      console.log('[WorkflowEngine] Output node ID:', outputStepId)

      const finalOutput = outputStepId
        ? this.collectWorkflowOutput(outputStepId)
        : undefined

      console.log('[WorkflowEngine] Final output collected:', finalOutput?.substring(0, 150) + '...')
      console.log('[WorkflowEngine] All results:', Array.from(this.results.entries()).map(([k, v]) => `${k}: ${v.substring(0, 50)}...`))

      const totalDurationMs = Date.now() - startTime

      return {
        success: true,
        finalOutput,
        log
      }
    } catch (error) {
      console.error('[WorkflowEngine] Execution error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        log
      }
    }
  }

  /**
   * Execute a single AI step
   */
  private async executeAgentNode(
    stepId: string,
    node: WorkflowNode,
    log: ExecutionLog[]
  ): Promise<void> {
    const startTime = Date.now()

    try {
      // Trigger start callback
      this.onStepStart?.(stepId)

      // 1. Get input data from previous steps
      const inputs = this.getInputsForStep(stepId)
      console.log(`[WorkflowEngine] Node ${stepId} inputs:`, Object.fromEntries(inputs))

      // 2. Build prompt using node template + inputs
      const resolvedPrompt = this.buildPrompt(node, inputs)
      console.log(`[WorkflowEngine] Node ${stepId} resolved prompt:`, resolvedPrompt.substring(0, 200) + '...')

      // 3. Call LLM
      const output = await this.callLLM(resolvedPrompt)
      console.log(`[WorkflowEngine] Node ${stepId} LLM output:`, output.substring(0, 150) + '...')

      // 4. Save result
      this.results.set(stepId, output)

      // 5. Log
      const logEntry: ExecutionLog = {
        stepId,
        timestamp: new Date().toISOString(),
        input: resolvedPrompt,
        output,
        durationMs: Date.now() - startTime,
        status: 'success'
      }
      log.push(logEntry)

      // Trigger complete callback
      this.onStepComplete?.(stepId, output)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Execution failed'
      console.error(`[WorkflowEngine] Node ${stepId} error:`, errorMsg)

      log.push({
        stepId,
        timestamp: new Date().toISOString(),
        input: node.data.prompt || '',
        output: errorMsg,
        durationMs: Date.now() - startTime,
        status: 'error',
        error: errorMsg
      })

      this.onStepError?.(stepId, errorMsg)
      throw error
    }
  }

  /**
   * Call LLM API
   */
  private async callLLM(prompt: string): Promise<string> {
    try {
      const output = await createChatCompletion(prompt)
      return output
    } catch (error) {
      throw new Error('LLM call failed: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  /**
   * Resolve {variable} placeholders in prompt template
   */
  private resolvePromptVariables(
    template: string,
    inputs: Map<string, string>
  ): string {
    let resolved = template

    // Replace {variableName} placeholders
    for (const [key, value] of inputs.entries()) {
      const regex = new RegExp(`\\{${key}\\}`, 'g')
      resolved = resolved.replace(regex, value)
    }

    // Special variable: {输入} - points to initial workflow input
    const inputStepId = this.findPrimaryInputNode()
    if (inputStepId) {
      const inputValue = this.results.get(inputStepId) || ''
      resolved = resolved.replace(/\{输入\}/g, inputValue)
    }

    return resolved
  }

  /**
   * Get all inputs for a step from its predecessors
   */
  private getInputsForStep(stepId: string): Map<string, string> {
    const inputs = new Map<string, string>()

    // Find all edges pointing to this step
    const incomingEdges = this.edges.filter(e => e.target === stepId)

    for (const edge of incomingEdges) {
      const sourceNode = this.nodes.get(edge.source)
      const sourceOutput = this.results.get(edge.source)

      if (sourceNode && sourceOutput !== undefined) {
        // Use source node label as variable name
        const varName = sourceNode.data.label || edge.source
        inputs.set(varName, sourceOutput)

        // Also add step ID as variable name (for compatibility)
        inputs.set(edge.source, sourceOutput)
      }
    }

    return inputs
  }

  /**
   * Topological sort - determine step execution order
   */
  private topologicalSort(): string[] {
    const visited = new Set<string>()
    const result: string[] = []
    const adjacency = this.buildAdjacencyList()

    const visit = (nodeId: string) => {
      if (visited.has(nodeId)) return

      visited.add(nodeId)

      const neighbors = adjacency.get(nodeId) || []
      for (const neighbor of neighbors) {
        visit(neighbor)
      }

      result.push(nodeId)
    }

    // Start DFS from input node
    const inputStepId = this.findPrimaryInputNode()
    if (inputStepId) {
      visit(inputStepId)
    }

    return result.reverse()
  }

  /**
   * Build adjacency list from edges
   */
  private buildAdjacencyList(): Map<string, string[]> {
    const adjacency = new Map<string, string[]>()

    for (const edge of this.edges) {
      const neighbors = adjacency.get(edge.source) || []
      neighbors.push(edge.target)
      adjacency.set(edge.source, neighbors)
    }

    return adjacency
  }

  /**
   * Find primary input node (supports both legacy 'input' and new 'start' nodes)
   */
  private findPrimaryInputNode(): string | undefined {
    return this.findNodeByType('input') ?? this.findNodeByType('start')
  }

  /**
   * Find primary output node (supports both 'output' and 'end')
   */
  private findPrimaryOutputNode(): string | undefined {
    return this.findNodeByType('output') ?? this.findNodeByType('end')
  }

  /**
   * Find first node of a given type
   */
  private findNodeByType(type: string): string | undefined {
    for (const [id, node] of this.nodes.entries()) {
      if (node.type === type) return id
    }
    return undefined
  }

  /**
   * Get the input source node ID for a given step
   */
  private getInputSourceForStep(stepId: string): string | undefined {
    const incomingEdge = this.edges.find(e => e.target === stepId)
    return incomingEdge?.source
  }

  /**
   * Collect final output by tracing upstream from the output node
   */
  private collectWorkflowOutput(outputNodeId: string): string | undefined {
    const intoOutputEdge = this.edges.find(e => e.target === outputNodeId)
    if (!intoOutputEdge) return undefined

    const upstreamId = intoOutputEdge.source

    // Prefer stored result on upstream node
    const upstreamResult = this.results.get(upstreamId)
    if (upstreamResult) {
      return upstreamResult
    }

    // Fall back to stored result on the output node itself
    return this.results.get(outputNodeId)
  }

  /**
   * Determine if node type should be executed as an AI/agent step
   */
  private isAgentNode(type: string): boolean {
    return [
      'aiStep',
      'llmAgent',
      'summarizer',
      'translator',
      'extractor',
      'classifier'
    ].includes(type)
  }

  /**
   * Build final prompt string for an agent node
   */
  private buildPrompt(
    node: WorkflowNode,
    inputs: Map<string, string>
  ): string {
    const template = this.getPromptTemplate(node)
    let resolved = this.resolvePromptVariables(template, inputs)

    const inputText = Array.from(inputs.values())
      .filter(Boolean)
      .join('\n\n')

    if (!resolved.trim()) {
      if (inputText.trim()) {
        resolved = `${template || 'Process the following input and respond helpfully:'}\n\n${inputText}`
      } else {
        resolved = template || 'Provide a helpful response for the given task.'
      }
    } else if (inputText.trim()) {
      resolved = `${resolved.trim()}\n\nInput:\n${inputText}`
    }

    return resolved
  }

  /**
   * Get prompt template for node based on type
   */
  private getPromptTemplate(node: WorkflowNode): string {
    switch (node.type) {
      case 'llmAgent':
        return node.data.systemPrompt || node.data.prompt || ''
      case 'summarizer':
        return (
          node.data.systemPrompt ||
          `Summarize the provided content into a ${node.data.summaryLength ?? 'medium'} summary using ${
            node.data.summaryStyle ?? 'paragraph'
          } style.`
        )
      case 'translator':
        return (
          node.data.systemPrompt ||
          `Translate the text from ${node.data.sourceLanguage ?? 'source language'} to ${
            node.data.targetLanguage ?? 'target language'
          }. Preserve formatting: ${node.data.preserveFormatting ? 'yes' : 'no'}.`
        )
      case 'extractor':
        return (
          node.data.systemPrompt ||
          `Extract the following structured fields: ${Object.keys(node.data.outputSchema || {}).join(', ')}.`
        )
      case 'classifier':
        return (
          node.data.systemPrompt ||
          `Classify the input into one of the following categories: ${
            (node.data.categories || []).map((cat: any) => cat.name).join(', ') || 'the given options'
          }.`
        )
      case 'aiStep':
      default:
        return node.data.prompt || ''
    }
  }
}
