/**
 * Workflow Node Types
 * Export all custom nodes for React Flow
 */

import { InputNode } from './InputNode'
import { AIStepNode } from './AIStepNode'
import { OutputNode } from './OutputNode'

export const nodeTypes = {
  input: InputNode,
  aiStep: AIStepNode,
  output: OutputNode
}

export { InputNode, AIStepNode, OutputNode }
