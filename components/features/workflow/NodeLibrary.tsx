/**
 * Node Library Sidebar - Drag-and-drop node palette
 * Organizes all available node types by category with search and filtering
 */

'use client'

import { useState } from 'react'
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
  Search,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import type { NodeType, NodeCategory } from '@/lib/workflow/types'

// ============================================================================
// Node Type Definitions for Library
// ============================================================================

interface NodeDefinition {
  type: NodeType
  label: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  category: NodeCategory
}

const nodeDefinitions: NodeDefinition[] = [
  // Control Nodes
  {
    type: 'start',
    label: 'Start',
    icon: Play,
    description: 'Entry point of the workflow',
    category: 'Control'
  },
  {
    type: 'end',
    label: 'End',
    icon: Square,
    description: 'Exit point of the workflow',
    category: 'Control'
  },
  {
    type: 'ifElse',
    label: 'If/Else',
    icon: GitBranch,
    description: 'Conditional branching logic',
    category: 'Control'
  },

  // Agent Nodes
  {
    type: 'llmAgent',
    label: 'LLM Agent',
    icon: Sparkles,
    description: 'Generic AI task with custom prompt',
    category: 'Agents'
  },
  {
    type: 'classifier',
    label: 'Classifier',
    icon: Filter,
    description: 'Classify input into categories',
    category: 'Agents'
  },
  {
    type: 'extractor',
    label: 'Extractor',
    icon: Scan,
    description: 'Extract structured data',
    category: 'Agents'
  },
  {
    type: 'summarizer',
    label: 'Summarizer',
    icon: FileText,
    description: 'Summarize text content',
    category: 'Agents'
  },
  {
    type: 'translator',
    label: 'Translator',
    icon: Languages,
    description: 'Translate between languages',
    category: 'Agents'
  },

  // Data Nodes
  {
    type: 'input',
    label: 'Input',
    icon: FileInput,
    description: 'Workflow input parameter',
    category: 'Data'
  },
  {
    type: 'output',
    label: 'Output',
    icon: FileOutput,
    description: 'Workflow output result',
    category: 'Data'
  },
  {
    type: 'transform',
    label: 'Transform',
    icon: Shuffle,
    description: 'Transform data format',
    category: 'Data'
  },
  {
    type: 'merge',
    label: 'Merge',
    icon: Layers,
    description: 'Combine multiple inputs',
    category: 'Data'
  },

  // Guardrail Nodes
  {
    type: 'contentFilter',
    label: 'Content Filter',
    icon: Shield,
    description: 'Filter inappropriate content',
    category: 'Guardrails'
  },
  {
    type: 'hallucinationCheck',
    label: 'Hallucination Check',
    icon: Scan,
    description: 'Verify output accuracy',
    category: 'Guardrails'
  },
  {
    type: 'safetyValidator',
    label: 'Safety Validator',
    icon: Shield,
    description: 'Check for harmful content',
    category: 'Guardrails'
  }
]

// ============================================================================
// Category Colors
// ============================================================================

const categoryColors: Record<NodeCategory, string> = {
  Control: 'bg-green-100 text-green-700 border-green-200',
  Agents: 'bg-amber-100 text-amber-700 border-amber-200',
  Data: 'bg-blue-100 text-blue-700 border-blue-200',
  Guardrails: 'bg-purple-100 text-purple-700 border-purple-200'
}

// ============================================================================
// Node Library Component
// ============================================================================

export function NodeLibrary() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<NodeCategory>>(
    new Set(['Control', 'Agents', 'Data', 'Guardrails'])
  )

  // Filter nodes by search query
  const filteredNodes = nodeDefinitions.filter(
    (node) =>
      node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Group filtered nodes by category
  const nodesByCategory = filteredNodes.reduce(
    (acc, node) => {
      if (!acc[node.category]) {
        acc[node.category] = []
      }
      acc[node.category].push(node)
      return acc
    },
    {} as Record<NodeCategory, NodeDefinition[]>
  )

  // Handle drag start
  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  // Toggle category expansion
  const toggleCategory = (category: NodeCategory) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

  return (
    <div className="w-64 border-r bg-gray-50 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-white">
        <h3 className="font-semibold text-sm mb-2">Node Library</h3>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search nodes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-9 text-sm"
          />
        </div>
      </div>

      {/* Node Categories */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {(Object.keys(nodesByCategory) as NodeCategory[]).map((category) => {
            const nodes = nodesByCategory[category]
            if (nodes.length === 0) return null

            const isExpanded = expandedCategories.has(category)

            return (
              <Collapsible key={category} open={isExpanded} onOpenChange={() => toggleCategory(category)}>
                <CollapsibleTrigger className="w-full">
                  <div
                    className={`flex items-center justify-between px-3 py-2 rounded-md font-medium text-sm border ${categoryColors[category]} hover:opacity-80 transition-opacity`}
                  >
                    <span>{category}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs opacity-70">{nodes.length}</span>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="mt-1 space-y-1">
                    {nodes.map((node) => {
                      const Icon = node.icon
                      return (
                        <div
                          key={node.type}
                          draggable
                          onDragStart={(e) => onDragStart(e, node.type)}
                          className="flex items-start gap-2 p-2 bg-white rounded-md border border-gray-200 cursor-move hover:border-gray-300 hover:shadow-sm transition-all group"
                        >
                          <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-gray-200 transition-colors">
                            <Icon className="w-4 h-4 text-gray-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-xs">{node.label}</div>
                            <div className="text-xs text-gray-500 leading-tight">{node.description}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </div>
      </ScrollArea>

      {/* Instructions */}
      <div className="p-3 border-t bg-white">
        <div className="text-xs text-gray-600 space-y-1">
          <p className="font-medium">💡 How to use:</p>
          <p>Drag nodes onto the canvas to build your workflow.</p>
          <p>Connect nodes by dragging from output (right) to input (left).</p>
        </div>
      </div>
    </div>
  )
}
