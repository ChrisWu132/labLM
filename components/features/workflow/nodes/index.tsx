/**
 * Workflow Node Components - All custom React Flow nodes
 * Implements all node types from PRD with visual styling and execution states
 */

import { memo } from 'react'
import { Handle, Position, type NodeProps } from 'reactflow'
import {
  Play,
  Square,
  Sparkles,
  Filter,
  GitBranch,
  Shield,
  Scan,
  FileText,
  Languages,
  FileInput,
  FileOutput,
  Shuffle,
  Layers,
  AlertTriangle
} from 'lucide-react'
import type { WorkflowNode, NodeExecutionStatus } from '@/lib/workflow/types'

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get node styling based on execution status
 */
function getNodeStatusStyle(status?: NodeExecutionStatus) {
  switch (status) {
    case 'running':
      return 'border-blue-500 bg-blue-50 animate-pulse shadow-lg shadow-blue-200'
    case 'completed':
      return 'border-green-500 bg-green-50 shadow-md shadow-green-200'
    case 'error':
      return 'border-red-500 bg-red-50 shadow-md shadow-red-200'
    default:
      return 'border-gray-300 bg-white hover:shadow-md hover:border-gray-400 transition-all'
  }
}

/**
 * Get icon color based on node type
 */
function getIconColor(type: string) {
  const colors: Record<string, string> = {
    start: 'text-green-600',
    end: 'text-red-600',
    llmAgent: 'text-amber-600',
    classifier: 'text-blue-600',
    ifElse: 'text-yellow-600',
    extractor: 'text-purple-600',
    summarizer: 'text-indigo-600',
    translator: 'text-cyan-600',
    contentFilter: 'text-pink-600',
    hallucinationCheck: 'text-orange-600',
    safetyValidator: 'text-rose-600',
    input: 'text-gray-600',
    output: 'text-gray-700'
  }
  return colors[type] || 'text-gray-600'
}

// ============================================================================
// Base Node Component
// ============================================================================

interface BaseNodeProps {
  data: any
  icon: React.ReactNode
  color: string
  hasInput?: boolean
  hasOutput?: boolean
  outputs?: Array<{ id: string; label: string }>
}

function BaseNode({ data, icon, color, hasInput = true, hasOutput = true, outputs }: BaseNodeProps) {
  return (
    <div className={`px-4 py-3 rounded-lg border-2 min-w-[180px] ${getNodeStatusStyle(data.status)}`}>
      {/* Input Handle */}
      {hasInput && (
        <Handle
          type="target"
          position={Position.Left}
          className="!w-3 !h-3 !bg-gray-400 !border-2 !border-white"
        />
      )}

      {/* Node Content */}
      <div className="flex items-start gap-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          data.status === 'running' ? 'bg-blue-100' :
          data.status === 'completed' ? 'bg-green-100' :
          data.status === 'error' ? 'bg-red-100' :
          'bg-gray-100'
        }`}>
          <div className={color}>{icon}</div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm truncate">{data.label}</div>
          {data.description && (
            <div className="text-xs text-gray-500 truncate mt-0.5">{data.description}</div>
          )}
          {data.status === 'error' && data.error && (
            <div className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              <span className="truncate">{data.error}</span>
            </div>
          )}
        </div>
      </div>

      {/* Output Handles */}
      {outputs && outputs.length > 1 ? (
        // Multiple outputs (e.g., If/Else, Classifier)
        <div className="mt-2 space-y-1">
          {outputs.map((output, idx) => (
            <div key={output.id} className="relative flex items-center justify-end">
              <span className="text-xs text-gray-600 mr-2">{output.label}</span>
              <Handle
                type="source"
                position={Position.Right}
                id={output.id}
                style={{ top: `${40 + idx * 24}px` }}
                className="!w-3 !h-3 !bg-gray-400 !border-2 !border-white"
              />
            </div>
          ))}
        </div>
      ) : hasOutput ? (
        // Single output
        <Handle
          type="source"
          position={Position.Right}
          className="!w-3 !h-3 !bg-gray-400 !border-2 !border-white"
        />
      ) : null}
    </div>
  )
}

// ============================================================================
// Specific Node Components
// ============================================================================

export const StartNode = memo(({ data }: NodeProps<WorkflowNode>) => (
  <BaseNode
    data={data}
    icon={<Play className="w-4 h-4" />}
    color={getIconColor('start')}
    hasInput={false}
    hasOutput={true}
  />
))
StartNode.displayName = 'StartNode'

export const EndNode = memo(({ data }: NodeProps<WorkflowNode>) => (
  <BaseNode
    data={data}
    icon={<Square className="w-4 h-4" />}
    color={getIconColor('end')}
    hasInput={true}
    hasOutput={false}
  />
))
EndNode.displayName = 'EndNode'

export const LLMAgentNode = memo(({ data }: NodeProps<WorkflowNode>) => (
  <BaseNode
    data={data}
    icon={<Sparkles className="w-4 h-4" />}
    color={getIconColor('llmAgent')}
  />
))
LLMAgentNode.displayName = 'LLMAgentNode'

export const ClassifierNode = memo(({ data }: NodeProps<WorkflowNode>) => {
  const outputs = data.categories?.map((cat: any) => ({
    id: cat.handle,
    label: cat.name
  })) || [{ id: 'default', label: 'Output' }]

  return (
    <BaseNode
      data={data}
      icon={<Filter className="w-4 h-4" />}
      color={getIconColor('classifier')}
      outputs={outputs}
    />
  )
})
ClassifierNode.displayName = 'ClassifierNode'

export const IfElseNode = memo(({ data }: NodeProps<WorkflowNode>) => {
  const outputs = [
    { id: 'true', label: 'True' },
    { id: 'false', label: 'False' }
  ]

  return (
    <BaseNode
      data={data}
      icon={<GitBranch className="w-4 h-4" />}
      color={getIconColor('ifElse')}
      outputs={outputs}
    />
  )
})
IfElseNode.displayName = 'IfElseNode'

export const ExtractorNode = memo(({ data }: NodeProps<WorkflowNode>) => (
  <BaseNode
    data={data}
    icon={<Scan className="w-4 h-4" />}
    color={getIconColor('extractor')}
  />
))
ExtractorNode.displayName = 'ExtractorNode'

export const SummarizerNode = memo(({ data }: NodeProps<WorkflowNode>) => (
  <BaseNode
    data={data}
    icon={<FileText className="w-4 h-4" />}
    color={getIconColor('summarizer')}
  />
))
SummarizerNode.displayName = 'SummarizerNode'

export const TranslatorNode = memo(({ data }: NodeProps<WorkflowNode>) => (
  <BaseNode
    data={data}
    icon={<Languages className="w-4 h-4" />}
    color={getIconColor('translator')}
  />
))
TranslatorNode.displayName = 'TranslatorNode'

export const InputNode = memo(({ data }: NodeProps<WorkflowNode>) => (
  <BaseNode
    data={data}
    icon={<FileInput className="w-4 h-4" />}
    color={getIconColor('input')}
    hasInput={false}
  />
))
InputNode.displayName = 'InputNode'

export const OutputNode = memo(({ data }: NodeProps<WorkflowNode>) => (
  <BaseNode
    data={data}
    icon={<FileOutput className="w-4 h-4" />}
    color={getIconColor('output')}
    hasOutput={false}
  />
))
OutputNode.displayName = 'OutputNode'

export const ContentFilterNode = memo(({ data }: NodeProps<WorkflowNode>) => {
  const outputs = [
    { id: 'pass', label: 'Pass' },
    { id: 'fail', label: 'Fail' }
  ]

  return (
    <BaseNode
      data={data}
      icon={<Shield className="w-4 h-4" />}
      color={getIconColor('contentFilter')}
      outputs={outputs}
    />
  )
})
ContentFilterNode.displayName = 'ContentFilterNode'

export const HallucinationCheckNode = memo(({ data }: NodeProps<WorkflowNode>) => {
  const outputs = [
    { id: 'pass', label: 'Pass' },
    { id: 'fail', label: 'Fail' }
  ]

  return (
    <BaseNode
      data={data}
      icon={<Scan className="w-4 h-4" />}
      color={getIconColor('hallucinationCheck')}
      outputs={outputs}
    />
  )
})
HallucinationCheckNode.displayName = 'HallucinationCheckNode'

export const SafetyValidatorNode = memo(({ data }: NodeProps<WorkflowNode>) => {
  const outputs = [
    { id: 'safe', label: 'Safe' },
    { id: 'unsafe', label: 'Unsafe' }
  ]

  return (
    <BaseNode
      data={data}
      icon={<Shield className="w-4 h-4" />}
      color={getIconColor('safetyValidator')}
      outputs={outputs}
    />
  )
})
SafetyValidatorNode.displayName = 'SafetyValidatorNode'

export const TransformNode = memo(({ data }: NodeProps<WorkflowNode>) => (
  <BaseNode
    data={data}
    icon={<Shuffle className="w-4 h-4" />}
    color="text-indigo-600"
  />
))
TransformNode.displayName = 'TransformNode'

export const MergeNode = memo(({ data }: NodeProps<WorkflowNode>) => (
  <BaseNode
    data={data}
    icon={<Layers className="w-4 h-4" />}
    color="text-violet-600"
  />
))
MergeNode.displayName = 'MergeNode'

// Legacy AIStep node for backward compatibility
export const AIStepNode = memo(({ data }: NodeProps<WorkflowNode>) => (
  <BaseNode
    data={data}
    icon={<Sparkles className="w-4 h-4" />}
    color={getIconColor('llmAgent')}
  />
))
AIStepNode.displayName = 'AIStepNode'

// ============================================================================
// Node Types Registry
// ============================================================================

export const nodeTypes = {
  start: StartNode,
  end: EndNode,
  llmAgent: LLMAgentNode,
  classifier: ClassifierNode,
  ifElse: IfElseNode,
  extractor: ExtractorNode,
  summarizer: SummarizerNode,
  translator: TranslatorNode,
  input: InputNode,
  output: OutputNode,
  contentFilter: ContentFilterNode,
  hallucinationCheck: HallucinationCheckNode,
  safetyValidator: SafetyValidatorNode,
  transform: TransformNode,
  merge: MergeNode,
  aiStep: AIStepNode // Legacy
}
