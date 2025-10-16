'use client'

import { useState, useCallback } from 'react'
import ReactFlow, {
  Background,
  BackgroundVariant,
  type Node,
  type Edge
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { nodeTypes } from './nodes'
import { executeWorkflowDirect } from '@/lib/actions/workflow'
import { toast } from 'sonner'
import type { WorkflowConfig } from '@/lib/workflow/types'
import { Loader2, PlayCircle, RotateCcw } from 'lucide-react'

interface WorkflowPlayerProps {
  initialWorkflow: WorkflowConfig
  editable?: boolean
  onWorkflowChange?: (workflow: WorkflowConfig) => void
}

export function WorkflowPlayer({
  initialWorkflow,
  editable = false,
  onWorkflowChange
}: WorkflowPlayerProps) {
  const [nodes, setNodes] = useState<Node[]>(initialWorkflow.nodes)
  const [edges] = useState<Edge[]>(initialWorkflow.edges)
  const [input, setInput] = useState('')
  const [isRunning, setIsRunning] = useState(false)

  const runWorkflow = async () => {
    if (!input.trim()) {
      toast.error('请输入内容')
      return
    }

    setIsRunning(true)

    try {
      // Reset all nodes
      setNodes(prev =>
        prev.map(node => ({
          ...node,
          data: { ...node.data, output: undefined, status: 'idle' }
        }))
      )

      // Execute workflow
      const result = await executeWorkflowDirect(
        { nodes, edges },
        input.trim()
      )

      if (!result.success) {
        toast.error(result.error || '执行失败')
        return
      }

      // Update nodes with execution results
      if (result.data?.log) {
        for (const logEntry of result.data.log) {
          await new Promise(resolve => setTimeout(resolve, 500))

          setNodes(prev =>
            prev.map(node => {
              if (node.id === logEntry.stepId) {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    output: logEntry.output,
                    status: logEntry.status === 'success' ? 'completed' : 'error'
                  }
                }
              }
              return node
            })
          )
        }
      }

      // Update output node
      if (result.data?.finalOutput) {
        setNodes(prev =>
          prev.map(node => {
            if (node.type === 'output') {
              return {
                ...node,
                data: {
                  ...node.data,
                  result: result.data.finalOutput,
                  status: 'completed'
                }
              }
            }
            return node
          })
        )

        toast.success('工作流执行完成！')
      }
    } catch (error) {
      toast.error('执行过程中出现错误')
      console.error(error)
    } finally {
      setIsRunning(false)
    }
  }

  const resetWorkflow = () => {
    setNodes(initialWorkflow.nodes)
    setInput('')
    toast.info('工作流已重置')
  }

  const handlePromptChange = useCallback(
    (nodeId: string, newPrompt: string) => {
      setNodes(prev => {
        const updated = prev.map(node => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: { ...node.data, prompt: newPrompt }
            }
          }
          return node
        })

        // Notify parent
        if (onWorkflowChange) {
          onWorkflowChange({ nodes: updated, edges })
        }

        return updated
      })
    },
    [edges, onWorkflowChange]
  )

  // Add prompt change handler to editable nodes
  const enhancedNodes = nodes.map(node => ({
    ...node,
    data: {
      ...node.data,
      onPromptChange: editable
        ? (newPrompt: string) => handlePromptChange(node.id, newPrompt)
        : undefined,
      readonly: !editable
    }
  }))

  return (
    <div className="flex flex-col h-full">
      {/* Control Panel */}
      <Card className="p-4 border-b rounded-none">
        <div className="flex gap-3 items-center">
          <div className="flex-1">
            <label className="text-sm text-gray-600 mb-1 block">
              📝 输入主题:
            </label>
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="输入一个主题，如：太空猫"
              disabled={isRunning}
              className="w-full"
              onKeyDown={e => {
                if (e.key === 'Enter' && !isRunning) {
                  runWorkflow()
                }
              }}
            />
          </div>
          <div className="flex gap-2 pt-5">
            <Button onClick={runWorkflow} disabled={isRunning}>
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  运行中...
                </>
              ) : (
                <>
                  <PlayCircle className="w-4 h-4 mr-2" />
                  运行
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={resetWorkflow}
              disabled={isRunning}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              重置
            </Button>
          </div>
        </div>

        {editable && (
          <div className="mt-3 text-sm text-gray-600 bg-blue-50 p-2 rounded">
            💡 提示：点击步骤上的 🔧 按钮可以编辑 Prompt
          </div>
        )}
      </Card>

      {/* Workflow Visualization */}
      <div className="flex-1 bg-gray-50">
        <ReactFlow
          nodes={enhancedNodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={editable}
          zoomOnScroll={false}
          panOnScroll={false}
          panOnDrag={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        </ReactFlow>
      </div>
    </div>
  )
}
