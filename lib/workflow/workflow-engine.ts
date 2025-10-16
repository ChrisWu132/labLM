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

    try {
      // 1. Topological sort to get execution order
      const executionOrder = this.topologicalSort()

      // 2. Set initial input
      const inputStepId = this.findNodeByType('input')
      if (!inputStepId) {
        throw new Error('Workflow must have an input node')
      }
      this.results.set(inputStepId, initialInput)

      // 3. Execute each step in order
      for (const stepId of executionOrder) {
        const node = this.nodes.get(stepId)
        if (!node) continue

        // Skip input (already set) and output (processed at end)
        if (node.type === 'input' || node.type === 'output') {
          continue
        }

        // Execute AI step
        if (node.type === 'aiStep') {
          await this.executeAIStep(stepId, node, log)
        }
      }

      // 4. Get final output
      const outputStepId = this.findNodeByType('output')
      const finalOutput = outputStepId
        ? this.results.get(this.getInputSourceForStep(outputStepId) || '')
        : undefined

      const totalDurationMs = Date.now() - startTime

      return {
        success: true,
        finalOutput,
        log
      }
    } catch (error) {
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
  private async executeAIStep(
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

      // 2. Resolve prompt variables
      const resolvedPrompt = this.resolvePromptVariables(
        node.data.prompt || '',
        inputs
      )

      // 3. Call LLM
      const output = await this.callLLM(resolvedPrompt)

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
    const inputStepId = this.findNodeByType('input')
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
    const inputStepId = this.findNodeByType('input')
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
}
