/**
 * Workflow Types - Comprehensive type definitions for AI Workflow Builder
 * Based on PRD: AI Workflow Builder (Lab 6)
 */

import { Node as ReactFlowNode, Edge as ReactFlowEdge } from 'reactflow'

// ============================================================================
// Node Type Definitions
// ============================================================================

/**
 * All supported node types
 */
export type NodeType =
  // Control Nodes
  | 'start'
  | 'end'
  | 'ifElse'
  | 'switch'
  // Agent Nodes
  | 'llmAgent'
  | 'classifier'
  | 'extractor'
  | 'summarizer'
  | 'translator'
  // Data Nodes
  | 'input'
  | 'output'
  | 'transform'
  | 'merge'
  // Guardrail Nodes
  | 'contentFilter'
  | 'hallucinationCheck'
  | 'safetyValidator'
  // Legacy support
  | 'aiStep'

/**
 * Node execution status
 */
export type NodeExecutionStatus = 'idle' | 'running' | 'completed' | 'error'

// ============================================================================
// Base Node Data Interfaces
// ============================================================================

/**
 * Base data for all nodes
 */
export interface BaseNodeData {
  label: string
  description?: string
  status?: NodeExecutionStatus
  output?: string
  error?: string
}

/**
 * Start Node - Entry point of workflow
 */
export interface StartNodeData extends BaseNodeData {
  label: string
}

/**
 * End Node - Exit point of workflow
 */
export interface EndNodeData extends BaseNodeData {
  label: string
  outputFormat?: 'json' | 'text' | 'markdown'
}

/**
 * LLM Agent Node - Generic AI task execution
 */
export interface LLMAgentNodeData extends BaseNodeData {
  agentName: string
  systemPrompt: string
  model: 'gpt-4' | 'gpt-3.5-turbo' | 'gpt-4-turbo'
  temperature: number // 0-1
  maxTokens: number
  inputVariables?: string[] // Variables to interpolate in prompt
}

/**
 * Classifier Node - Multi-path routing based on classification
 */
export interface ClassifierNodeData extends BaseNodeData {
  classifierName: string
  classificationPrompt: string
  categories: Array<{
    name: string
    description: string
    handle: string // Handle ID for output connection
  }>
  model?: 'gpt-4' | 'gpt-3.5-turbo'
}

/**
 * If/Else Node - Conditional branching
 */
export interface IfElseNodeData extends BaseNodeData {
  conditionType: 'contains' | 'equals' | 'regex' | 'custom'
  conditionValue: string // Text to check, regex pattern, or JS expression
  caseSensitive?: boolean
}

/**
 * Switch Node - Multi-conditional routing
 */
export interface SwitchNodeData extends BaseNodeData {
  cases: Array<{
    condition: string
    handle: string
  }>
  defaultHandle?: string
}

/**
 * Extractor Node - Extract structured data
 */
export interface ExtractorNodeData extends BaseNodeData {
  extractorName: string
  extractionPrompt: string
  outputSchema: Record<string, string> // Field name -> description
  model?: 'gpt-4' | 'gpt-3.5-turbo'
}

/**
 * Summarizer Node - Summarize text
 */
export interface SummarizerNodeData extends BaseNodeData {
  summarizerName: string
  summaryLength: 'short' | 'medium' | 'long'
  summaryStyle: 'bullet-points' | 'paragraph' | 'key-points'
  model?: 'gpt-4' | 'gpt-3.5-turbo'
}

/**
 * Translator Node - Translate text
 */
export interface TranslatorNodeData extends BaseNodeData {
  translatorName: string
  sourceLanguage: string
  targetLanguage: string
  preserveFormatting: boolean
  model?: 'gpt-4' | 'gpt-3.5-turbo'
}

/**
 * Input Node - Workflow input
 */
export interface InputNodeData extends BaseNodeData {
  parameterName: string
  parameterType: 'text' | 'number' | 'file' | 'json'
  placeholder?: string
  defaultValue?: string
  required: boolean
  value?: string
}

/**
 * Output Node - Workflow output
 */
export interface OutputNodeData extends BaseNodeData {
  outputFormat: 'json' | 'text' | 'markdown'
  fields?: string[] // Fields to include in output
  result?: string
}

/**
 * Transform Node - Data transformation
 */
export interface TransformNodeData extends BaseNodeData {
  transformName: string
  transformType: 'format' | 'parse' | 'custom'
  transformScript?: string // JavaScript code
}

/**
 * Merge Node - Combine multiple inputs
 */
export interface MergeNodeData extends BaseNodeData {
  mergeStrategy: 'concat' | 'json-merge' | 'custom'
  separator?: string
  mergeScript?: string
}

/**
 * Content Filter Node - Filter inappropriate content
 */
export interface ContentFilterNodeData extends BaseNodeData {
  filterName: string
  blockedWords?: string[]
  blockedPhrases?: string[]
  action: 'block' | 'warn' | 'sanitize'
}

/**
 * Hallucination Check Node - Verify output against reference
 */
export interface HallucinationCheckNodeData extends BaseNodeData {
  checkerName: string
  referenceText?: string
  similarityThreshold: number // 0-1
  model?: 'gpt-4'
}

/**
 * Safety Validator Node - Check for harmful content
 */
export interface SafetyValidatorNodeData extends BaseNodeData {
  validatorName: string
  checkViolence: boolean
  checkSexual: boolean
  checkHateSpeech: boolean
  checkSelfHarm: boolean
  action: 'block' | 'warn'
}

/**
 * AI Step Node (Legacy) - Simple AI processing step
 */
export interface AIStepNodeData extends BaseNodeData {
  prompt: string
  editable?: boolean
}

// ============================================================================
// Workflow Node & Edge Types
// ============================================================================

/**
 * Union of all node data types
 */
export type NodeData =
  | StartNodeData
  | EndNodeData
  | LLMAgentNodeData
  | ClassifierNodeData
  | IfElseNodeData
  | SwitchNodeData
  | ExtractorNodeData
  | SummarizerNodeData
  | TranslatorNodeData
  | InputNodeData
  | OutputNodeData
  | TransformNodeData
  | MergeNodeData
  | ContentFilterNodeData
  | HallucinationCheckNodeData
  | SafetyValidatorNodeData
  | AIStepNodeData

/**
 * Workflow Node compatible with React Flow
 */
export interface WorkflowNode extends ReactFlowNode {
  id: string
  type: NodeType
  position: { x: number; y: number }
  data: NodeData
}

/**
 * Workflow Edge compatible with React Flow
 */
export interface WorkflowEdge extends ReactFlowEdge {
  id: string
  source: string
  target: string
  sourceHandle?: string
  targetHandle?: string
  type?: string
  animated?: boolean
  label?: string
}

// ============================================================================
// Workflow Configuration
// ============================================================================

/**
 * Complete workflow configuration
 */
export interface WorkflowConfig {
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
}

/**
 * Workflow metadata and configuration
 */
export interface Workflow {
  id?: string
  user_id?: string
  name: string
  description?: string
  config: WorkflowConfig
  is_template?: boolean
  is_public?: boolean
  template_category?: string
  execution_count?: number
  success_rate?: number
  created_at?: string
  updated_at?: string
  lab_number?: number
}

// ============================================================================
// Execution Types
// ============================================================================

/**
 * Single step execution log
 */
export interface ExecutionLog {
  stepId: string
  stepLabel: string
  timestamp: string
  input: string
  output: string
  durationMs: number
  status: 'success' | 'error'
  error?: string
  tokensUsed?: number
}

/**
 * Workflow execution result
 */
export interface WorkflowExecutionResult {
  success: boolean
  finalOutput?: string
  log: ExecutionLog[]
  error?: string
  totalDurationMs?: number
  totalTokens?: number
}

/**
 * Workflow execution record
 */
export interface WorkflowExecution {
  id?: string
  workflow_id: string
  user_id?: string
  input_data: string
  final_output?: string
  execution_log?: {
    steps: ExecutionLog[]
    totalDurationMs: number
  }
  status: 'running' | 'completed' | 'failed'
  error_message?: string
  tokens_used?: number
  api_calls?: number
  created_at?: string
  completed_at?: string
}

// ============================================================================
// Node Library Types
// ============================================================================

/**
 * Node type category for organization
 */
export type NodeCategory = 'Control' | 'Agents' | 'Data' | 'Guardrails'

/**
 * Node type definition for library
 */
export interface NodeTypeDefinition {
  type: NodeType
  label: string
  category: NodeCategory
  icon: string
  description: string
  defaultData: Partial<NodeData>
}

// ============================================================================
// Validation Types
// ============================================================================

/**
 * Workflow validation error
 */
export interface ValidationError {
  type: 'error' | 'warning'
  nodeId?: string
  message: string
}

/**
 * Workflow validation result
 */
export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
}

// ============================================================================
// Export Types
// ============================================================================

/**
 * Exported workflow file format
 */
export interface ExportedWorkflow {
  version: string
  name: string
  description?: string
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  metadata: {
    created: string
    author?: string
    tags?: string[]
  }
}
