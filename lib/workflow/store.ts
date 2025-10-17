/**
 * Workflow Store - Zustand state management for AI Workflow Builder
 * Centralizes workflow state, node/edge manipulation, and execution control
 */

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import {
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge
} from 'reactflow'
import type {
  WorkflowNode,
  WorkflowEdge,
  WorkflowConfig,
  NodeType,
  NodeExecutionStatus,
  ValidationResult,
  ValidationError
} from './types'
import { saveWorkflow, executeWorkflowDirect } from '@/lib/actions/workflow'

// ============================================================================
// Store Interface
// ============================================================================

interface WorkflowStore {
  // State
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  selectedNode: WorkflowNode | null
  executionState: 'idle' | 'running' | 'completed' | 'error'
  executionLog: string[]
  validationErrors: ValidationError[]
  isSaving: boolean

  // Workflow metadata
  workflowId?: string
  workflowName: string
  workflowDescription: string

  // Node Actions
  setNodes: (nodes: WorkflowNode[]) => void
  setEdges: (edges: WorkflowEdge[]) => void
  onNodesChange: (changes: NodeChange[]) => void
  onEdgesChange: (changes: EdgeChange[]) => void
  onConnect: (connection: Connection) => void

  addNode: (type: NodeType, position?: { x: number; y: number }) => void
  deleteNode: (nodeId: string) => void
  updateNodeData: (nodeId: string, data: Partial<any>) => void
  selectNode: (node: WorkflowNode | null) => void
  duplicateNode: (nodeId: string) => void

  // Edge Actions
  deleteEdge: (edgeId: string) => void

  // Workflow Actions
  setWorkflowName: (name: string) => void
  setWorkflowDescription: (description: string) => void
  saveCurrentWorkflow: () => Promise<{ success: boolean; error?: string }>
  loadWorkflow: (config: WorkflowConfig, metadata?: { id?: string; name: string; description?: string }) => void
  clearWorkflow: () => void
  exportWorkflow: () => string
  importWorkflow: (jsonString: string) => Promise<{ success: boolean; error?: string }>

  // Validation
  validateWorkflow: () => ValidationResult

  // Execution
  executeWorkflow: (inputData: string) => Promise<{ success: boolean; output?: string; error?: string }>
  updateNodeExecutionStatus: (nodeId: string, status: NodeExecutionStatus, output?: string, error?: string) => void
  resetExecutionState: () => void
}

// ============================================================================
// Default Node Data Factory
// ============================================================================

function getDefaultNodeData(type: NodeType): any {
  const baseData = {
    label: '',
    status: 'idle' as NodeExecutionStatus
  }

  switch (type) {
    case 'start':
      return { ...baseData, label: 'Start' }
    case 'end':
      return { ...baseData, label: 'End', outputFormat: 'text' }
    case 'llmAgent':
      return {
        ...baseData,
        label: 'LLM Agent',
        agentName: 'New Agent',
        systemPrompt: 'You are a helpful assistant.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000
      }
    case 'classifier':
      return {
        ...baseData,
        label: 'Classifier',
        classifierName: 'New Classifier',
        classificationPrompt: 'Classify the input:',
        categories: [
          { name: 'Category A', description: '', handle: 'cat-a' },
          { name: 'Category B', description: '', handle: 'cat-b' }
        ],
        model: 'gpt-4'
      }
    case 'ifElse':
      return {
        ...baseData,
        label: 'If/Else',
        conditionType: 'contains',
        conditionValue: '',
        caseSensitive: false
      }
    case 'extractor':
      return {
        ...baseData,
        label: 'Data Extractor',
        extractorName: 'New Extractor',
        extractionPrompt: 'Extract structured data from the input:',
        outputSchema: {},
        model: 'gpt-4'
      }
    case 'summarizer':
      return {
        ...baseData,
        label: 'Summarizer',
        summarizerName: 'New Summarizer',
        summaryLength: 'medium',
        summaryStyle: 'paragraph',
        model: 'gpt-4'
      }
    case 'translator':
      return {
        ...baseData,
        label: 'Translator',
        translatorName: 'New Translator',
        sourceLanguage: 'English',
        targetLanguage: 'Chinese',
        preserveFormatting: true,
        model: 'gpt-4'
      }
    case 'input':
      return {
        ...baseData,
        label: 'Input',
        parameterName: 'input',
        parameterType: 'text',
        placeholder: 'Enter input...',
        required: true
      }
    case 'output':
      return {
        ...baseData,
        label: 'Output',
        outputFormat: 'text'
      }
    case 'contentFilter':
      return {
        ...baseData,
        label: 'Content Filter',
        filterName: 'New Filter',
        blockedWords: [],
        action: 'block'
      }
    case 'hallucinationCheck':
      return {
        ...baseData,
        label: 'Hallucination Check',
        checkerName: 'New Checker',
        similarityThreshold: 0.8,
        model: 'gpt-4'
      }
    case 'safetyValidator':
      return {
        ...baseData,
        label: 'Safety Validator',
        validatorName: 'New Validator',
        checkViolence: true,
        checkSexual: true,
        checkHateSpeech: true,
        checkSelfHarm: true,
        action: 'block'
      }
    case 'aiStep':
      return {
        ...baseData,
        label: 'AI Step',
        prompt: 'Enter your prompt here...',
        editable: true
      }
    default:
      return baseData
  }
}

// ============================================================================
// Zustand Store
// ============================================================================

export const useWorkflowStore = create<WorkflowStore>()(
  devtools(
    (set, get) => ({
      // Initial State
      nodes: [],
      edges: [],
      selectedNode: null,
      executionState: 'idle',
      executionLog: [],
      validationErrors: [],
      isSaving: false,
      workflowName: '',
      workflowDescription: '',

      // Node Actions
      setNodes: (nodes) => set({ nodes }),

      setEdges: (edges) => set({ edges }),

      onNodesChange: (changes) => {
        set((state) => ({
          nodes: applyNodeChanges(changes, state.nodes) as WorkflowNode[]
        }))
      },

      onEdgesChange: (changes) => {
        set((state) => ({
          edges: applyEdgeChanges(changes, state.edges) as WorkflowEdge[]
        }))
      },

      onConnect: (connection) => {
        set((state) => ({
          edges: addEdge(connection, state.edges) as WorkflowEdge[]
        }))
      },

      addNode: (type, position) => {
        const id = `${type}-${Date.now()}`
        const defaultPosition = position || {
          x: 250 + get().nodes.length * 20,
          y: 100 + get().nodes.length * 100
        }

        const newNode: WorkflowNode = {
          id,
          type,
          position: defaultPosition,
          data: getDefaultNodeData(type)
        }

        set((state) => ({
          nodes: [...state.nodes, newNode]
        }))
      },

      deleteNode: (nodeId) => {
        set((state) => ({
          nodes: state.nodes.filter((n) => n.id !== nodeId),
          edges: state.edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
          selectedNode: state.selectedNode?.id === nodeId ? null : state.selectedNode
        }))
      },

      updateNodeData: (nodeId, data) => {
        set((state) => ({
          nodes: state.nodes.map((node) => {
            if (node.id === nodeId) {
              const updated = {
                ...node,
                data: { ...node.data, ...data }
              }
              // Update selected node if it's the one being updated
              if (state.selectedNode?.id === nodeId) {
                return updated
              }
              return updated
            }
            return node
          }),
          selectedNode:
            state.selectedNode?.id === nodeId
              ? {
                  ...state.selectedNode,
                  data: { ...state.selectedNode.data, ...data }
                }
              : state.selectedNode
        }))
      },

      selectNode: (node) => set({ selectedNode: node }),

      duplicateNode: (nodeId) => {
        const node = get().nodes.find((n) => n.id === nodeId)
        if (!node) return

        const newId = `${node.type}-${Date.now()}`
        const newNode: WorkflowNode = {
          ...node,
          id: newId,
          position: {
            x: node.position.x + 50,
            y: node.position.y + 50
          },
          data: { ...node.data, label: `${node.data.label} (Copy)` }
        }

        set((state) => ({
          nodes: [...state.nodes, newNode]
        }))
      },

      // Edge Actions
      deleteEdge: (edgeId) => {
        set((state) => ({
          edges: state.edges.filter((e) => e.id !== edgeId)
        }))
      },

      // Workflow Actions
      setWorkflowName: (name) => set({ workflowName: name }),

      setWorkflowDescription: (description) => set({ workflowDescription: description }),

      saveCurrentWorkflow: async () => {
        const state = get()

        if (!state.workflowName.trim()) {
          return { success: false, error: 'Workflow name is required' }
        }

        set({ isSaving: true })

        try {
          const result = await saveWorkflow({
            id: state.workflowId,
            name: state.workflowName,
            description: state.workflowDescription,
            config: {
              nodes: state.nodes,
              edges: state.edges
            }
          })

          if (result.success && result.data) {
            set({ workflowId: result.data.id, isSaving: false })
          } else {
            set({ isSaving: false })
          }

          return result
        } catch (error) {
          set({ isSaving: false })
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to save workflow'
          }
        }
      },

      loadWorkflow: (config, metadata) => {
        set({
          nodes: config.nodes,
          edges: config.edges,
          workflowId: metadata?.id,
          workflowName: metadata?.name || '',
          workflowDescription: metadata?.description || '',
          selectedNode: null,
          executionState: 'idle',
          executionLog: [],
          validationErrors: []
        })
      },

      clearWorkflow: () => {
        set({
          nodes: [],
          edges: [],
          selectedNode: null,
          executionState: 'idle',
          executionLog: [],
          validationErrors: [],
          workflowId: undefined,
          workflowName: '',
          workflowDescription: ''
        })
      },

      exportWorkflow: () => {
        const state = get()
        const exported = {
          version: '1.0',
          name: state.workflowName,
          description: state.workflowDescription,
          nodes: state.nodes,
          edges: state.edges,
          metadata: {
            created: new Date().toISOString(),
            nodeCount: state.nodes.length,
            edgeCount: state.edges.length
          }
        }
        return JSON.stringify(exported, null, 2)
      },

      importWorkflow: async (jsonString) => {
        try {
          const imported = JSON.parse(jsonString)

          if (!imported.nodes || !imported.edges) {
            return { success: false, error: 'Invalid workflow file format' }
          }

          set({
            nodes: imported.nodes,
            edges: imported.edges,
            workflowName: imported.name || 'Imported Workflow',
            workflowDescription: imported.description || '',
            workflowId: undefined, // New workflow, not saved yet
            selectedNode: null
          })

          return { success: true }
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to parse workflow file'
          }
        }
      },

      // Validation
      validateWorkflow: () => {
        const state = get()
        const errors: ValidationError[] = []

        // Check for start node
        if (!state.nodes.some((n) => n.type === 'start')) {
          errors.push({
            type: 'error',
            message: 'Workflow must have at least one Start node'
          })
        }

        // Check for end node
        if (!state.nodes.some((n) => n.type === 'end' || n.type === 'output')) {
          errors.push({
            type: 'error',
            message: 'Workflow must have at least one End or Output node'
          })
        }

        // Check for isolated nodes (no connections)
        state.nodes.forEach((node) => {
          const hasIncoming = state.edges.some((e) => e.target === node.id)
          const hasOutgoing = state.edges.some((e) => e.source === node.id)

          if (!hasIncoming && node.type !== 'start' && node.type !== 'input') {
            errors.push({
              type: 'warning',
              nodeId: node.id,
              message: `Node "${node.data.label}" has no incoming connections`
            })
          }

          if (!hasOutgoing && node.type !== 'end' && node.type !== 'output') {
            errors.push({
              type: 'warning',
              nodeId: node.id,
              message: `Node "${node.data.label}" has no outgoing connections`
            })
          }
        })

        // TODO: Check for circular dependencies (implement topological sort)

        set({ validationErrors: errors })

        return {
          valid: errors.filter((e) => e.type === 'error').length === 0,
          errors
        }
      },

      // Execution
      executeWorkflow: async (inputData) => {
        const state = get()

        // Validate first
        const validation = get().validateWorkflow()
        if (!validation.valid) {
          return {
            success: false,
            error: 'Workflow validation failed: ' + validation.errors.map((e) => e.message).join(', ')
          }
        }

        set({ executionState: 'running', executionLog: [] })

        try {
          const result = await executeWorkflowDirect(
            { nodes: state.nodes, edges: state.edges },
            inputData
          )

          if (result.success) {
            set({ executionState: 'completed' })
          } else {
            set({ executionState: 'error' })
          }

          return {
            success: result.success,
            output: result.data?.finalOutput,
            error: result.error
          }
        } catch (error) {
          set({ executionState: 'error' })
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Execution failed'
          }
        }
      },

      updateNodeExecutionStatus: (nodeId, status, output, error) => {
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === nodeId
              ? {
                  ...node,
                  data: {
                    ...node.data,
                    status,
                    output,
                    error
                  }
                }
              : node
          )
        }))
      },

      resetExecutionState: () => {
        set((state) => ({
          executionState: 'idle',
          executionLog: [],
          nodes: state.nodes.map((node) => ({
            ...node,
            data: {
              ...node.data,
              status: 'idle',
              output: undefined,
              error: undefined
            }
          }))
        }))
      }
    }),
    { name: 'WorkflowStore' }
  )
)

// Export type for use in components
export type { WorkflowStore }
