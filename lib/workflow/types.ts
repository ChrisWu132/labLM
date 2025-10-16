/**
 * Workflow Types
 * Shared types for workflow system
 */

export interface WorkflowNode {
  id: string
  type: 'input' | 'aiStep' | 'output'
  data: {
    label: string
    prompt?: string
    placeholder?: string
    value?: string
    output?: string
    editable?: boolean
    status?: 'idle' | 'running' | 'completed' | 'error'
    [key: string]: any
  }
  position: { x: number; y: number }
}

export interface WorkflowEdge {
  id: string
  source: string
  target: string
  type?: string
}

export interface WorkflowConfig {
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
}

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
  created_at?: string
  updated_at?: string
}

export interface ExecutionLog {
  stepId: string
  timestamp: string
  input: string
  output: string
  durationMs: number
  status: 'success' | 'error'
  error?: string
}

export interface WorkflowExecutionResult {
  success: boolean
  finalOutput?: string
  log: ExecutionLog[]
  error?: string
}

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
