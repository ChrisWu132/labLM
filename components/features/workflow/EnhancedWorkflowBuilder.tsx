/**
 * Enhanced Workflow Builder - Complete canvas-based workflow builder
 * Integrates React Flow canvas, node library, and configuration panel
 */

'use client'

import { useCallback, useRef, useState } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  type ReactFlowInstance
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import {
  PlayCircle,
  Trash2,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { useWorkflowStore } from '@/lib/workflow/store'
import { NodeLibrary } from './NodeLibrary'
import { NodeConfigPanel } from './NodeConfigPanel'
import { nodeTypes } from './nodes'
import type { NodeType } from '@/lib/workflow/types'

// ============================================================================
// Enhanced Workflow Builder Component
// ============================================================================

export function EnhancedWorkflowBuilder() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)
  const [testInput, setTestInput] = useState('artificial intelligence')
  const [lastOutput, setLastOutput] = useState<string>('')

  // Zustand store
  const nodes = useWorkflowStore((state) => state.nodes)
  const edges = useWorkflowStore((state) => state.edges)
  const onNodesChange = useWorkflowStore((state) => state.onNodesChange)
  const onEdgesChange = useWorkflowStore((state) => state.onEdgesChange)
  const onConnect = useWorkflowStore((state) => state.onConnect)
  const selectNode = useWorkflowStore((state) => state.selectNode)
  const addNode = useWorkflowStore((state) => state.addNode)
  const executeWorkflow = useWorkflowStore((state) => state.executeWorkflow)
  const validateWorkflow = useWorkflowStore((state) => state.validateWorkflow)
  const clearWorkflow = useWorkflowStore((state) => state.clearWorkflow)
  const executionState = useWorkflowStore((state) => state.executionState)
  const validationErrors = useWorkflowStore((state) => state.validationErrors)

  // Handle drop from node library
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow') as NodeType
      if (!type) return

      if (reactFlowWrapper.current && reactFlowInstance) {
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top
        })

        addNode(type, position)
        toast.success(`${type} node added`)
      }
    },
    [reactFlowInstance, addNode]
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  // Handle node click
  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: any) => {
      selectNode(node)
    },
    [selectNode]
  )

  // Handle pane click (deselect)
  const onPaneClick = useCallback(() => {
    selectNode(null)
  }, [selectNode])

  // Execute workflow
  const handleExecute = async () => {
    if (!testInput.trim()) {
      toast.error('Please enter test input')
      return
    }

    const validation = validateWorkflow()
    if (!validation.valid) {
      toast.error('Workflow validation failed')
      return
    }

    setLastOutput('')
    toast.loading('Executing workflow...')

    const result = await executeWorkflow(testInput)

    toast.dismiss()

    if (result.success) {
      toast.success('Workflow executed successfully!')
      setLastOutput(result.output || 'No output generated')
    } else {
      toast.error(result.error || 'Execution failed')
      setLastOutput(`Error: ${result.error || 'Execution failed'}`)
    }
  }

  // Clear workflow
  const handleClear = () => {
    if (nodes.length === 0) return

    if (confirm('Are you sure you want to clear the entire workflow? This cannot be undone.')) {
      clearWorkflow()
      toast.success('Workflow cleared')
    }
  }

  return (
    <div className="flex h-full w-full">
      {/* Left: Node Library */}
      <NodeLibrary />

      {/* Center: Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-white border-b p-3 shrink-0">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Enter a topic (e.g., 'quantum computing', 'healthy eating')..."
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              className="flex-1 h-9 min-w-[400px]"
            />

            <Button
              size="sm"
              variant="default"
              onClick={handleExecute}
              disabled={executionState === 'running'}
            >
              {executionState === 'running' ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Run
                </>
              )}
            </Button>

            <div className="h-4 w-px bg-gray-300" />

            <Button size="sm" variant="outline" onClick={handleClear}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>

            {validationErrors.length > 0 && (
              <div className="ml-auto flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4 text-orange-500" />
                <span className="text-orange-600">{validationErrors.length} issues</span>
              </div>
            )}
          </div>
        </div>

        {/* Canvas */}
        <div ref={reactFlowWrapper} className="flex-1 bg-gray-50" onDrop={onDrop} onDragOver={onDragOver}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onInit={setReactFlowInstance}
            nodeTypes={nodeTypes}
            fitView
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#e5e7eb" />
            <Controls showInteractive={false} />
            <MiniMap
              nodeStrokeWidth={3}
              zoomable
              pannable
              className="bg-white border border-gray-200"
            />
          </ReactFlow>
        </div>

        {/* Output Display */}
        {lastOutput && (
          <div className="bg-white border-t p-4 shrink-0 max-h-64 overflow-auto">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Workflow Output
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setLastOutput('')}
                className="h-6 px-2 text-xs"
              >
                Clear
              </Button>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-sm whitespace-pre-wrap">
              {lastOutput}
            </div>
          </div>
        )}

        {/* Status Bar */}
        {validationErrors.length > 0 && (
          <div className="bg-orange-50 border-t border-orange-200 p-2">
            <div className="text-xs space-y-1">
              {validationErrors.slice(0, 3).map((error, index) => (
                <div key={index} className="flex items-center gap-2">
                  <AlertCircle className="w-3 h-3 text-orange-500 shrink-0" />
                  <span className="text-orange-700">{error.message}</span>
                </div>
              ))}
              {validationErrors.length > 3 && (
                <div className="text-orange-600 font-medium">
                  +{validationErrors.length - 3} more issues
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right: Configuration Panel */}
      <NodeConfigPanel />
    </div>
  )
}
