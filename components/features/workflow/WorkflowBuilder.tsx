'use client'

import { useState, useCallback } from 'react'
import ReactFlow, {
  Background,
  Controls,
  BackgroundVariant,
  addEdge,
  type Node,
  type Edge,
  type Connection,
  useNodesState,
  useEdgesState
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { nodeTypes } from './nodes'
import { saveWorkflow, executeWorkflowDirect } from '@/lib/actions/workflow'
import { toast } from 'sonner'
import { Plus, Save, PlayCircle, Trash2 } from 'lucide-react'

export function WorkflowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [workflowName, setWorkflowName] = useState('')
  const [workflowDescription, setWorkflowDescription] = useState('')
  const [testInput, setTestInput] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  // Add node
  const addNode = (type: 'input' | 'aiStep' | 'output') => {
    // Check if input/output already exists
    if (type === 'input' && nodes.some(n => n.type === 'input')) {
      toast.error('只能有一个输入节点')
      return
    }
    if (type === 'output' && nodes.some(n => n.type === 'output')) {
      toast.error('只能有一个输出节点')
      return
    }

    const id = `node-${Date.now()}`
    const newNode: Node = {
      id,
      type,
      position: { x: 250, y: nodes.length * 150 },
      data:
        type === 'input'
          ? { label: '输入', placeholder: '输入内容' }
          : type === 'output'
            ? { label: '输出' }
            : { label: `AI步骤${nodes.filter(n => n.type === 'aiStep').length + 1}`, prompt: '在此输入 prompt...' }
    }

    setNodes(nds => [...nds, newNode])
    toast.success('节点已添加')
  }

  // Delete selected node
  const deleteSelectedNode = () => {
    if (!selectedNode) {
      toast.error('请先选择一个节点')
      return
    }

    setNodes(nds => nds.filter(n => n.id !== selectedNode.id))
    setEdges(eds => eds.filter(e => e.source !== selectedNode.id && e.target !== selectedNode.id))
    setSelectedNode(null)
    toast.success('节点已删除')
  }

  // Connect nodes
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges(eds => addEdge({ ...params, type: 'default' }, eds))
    },
    [setEdges]
  )

  // Update selected node data
  const updateNodeData = (key: string, value: string) => {
    if (!selectedNode) return

    setNodes(nds =>
      nds.map(node => {
        if (node.id === selectedNode.id) {
          const updated = {
            ...node,
            data: { ...node.data, [key]: value }
          }
          setSelectedNode(updated)
          return updated
        }
        return node
      })
    )
  }

  // Save workflow
  const handleSave = async () => {
    if (!workflowName.trim()) {
      toast.error('请输入工作流名称')
      return
    }

    if (nodes.length < 3) {
      toast.error('工作流至少需要3个节点（输入、AI步骤、输出）')
      return
    }

    if (!nodes.some(n => n.type === 'input')) {
      toast.error('工作流必须包含输入节点')
      return
    }

    if (!nodes.some(n => n.type === 'output')) {
      toast.error('工作流必须包含输出节点')
      return
    }

    setIsSaving(true)

    try {
      const result = await saveWorkflow({
        name: workflowName.trim(),
        description: workflowDescription.trim(),
        config: { nodes, edges }
      })

      if (result.success) {
        toast.success('工作流保存成功！')
      } else {
        toast.error(result.error || '保存失败')
      }
    } catch (error) {
      toast.error('保存过程中出现错误')
    } finally {
      setIsSaving(false)
    }
  }

  // Test run
  const handleTestRun = async () => {
    if (!testInput.trim()) {
      toast.error('请输入测试数据')
      return
    }

    if (nodes.length < 3) {
      toast.error('请先构建完整的工作流')
      return
    }

    try {
      toast.loading('正在执行...')

      const result = await executeWorkflowDirect(
        { nodes, edges },
        testInput.trim()
      )

      toast.dismiss()

      if (result.success) {
        toast.success('测试运行成功！')
        // Show result in output node
        if (result.data?.finalOutput) {
          setNodes(nds =>
            nds.map(node => {
              if (node.type === 'output') {
                return {
                  ...node,
                  data: { ...node.data, result: result.data!.finalOutput }
                }
              }
              return node
            })
          )
        }
      } else {
        toast.error(result.error || '执行失败')
      }
    } catch (error) {
      toast.dismiss()
      toast.error('执行过程中出现错误')
    }
  }

  return (
    <div className="flex h-full">
      {/* Left Toolbox */}
      <Card className="w-64 p-4 border-r rounded-none space-y-4">
        <div>
          <h3 className="font-semibold mb-3">📦 工具箱</h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => addNode('input')}
            >
              <span className="text-xl mr-2">📝</span>
              输入节点
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => addNode('aiStep')}
            >
              <span className="text-xl mr-2">🤖</span>
              AI步骤
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => addNode('output')}
            >
              <span className="text-xl mr-2">✅</span>
              输出节点
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t space-y-2">
          <Button
            variant="destructive"
            className="w-full"
            onClick={deleteSelectedNode}
            disabled={!selectedNode}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            删除节点
          </Button>
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium text-sm mb-2">💡 提示</h4>
          <p className="text-xs text-gray-600">
            1. 添加输入、AI步骤和输出节点
            <br />
            2. 连接节点（从节点底部拖到另一个节点顶部）
            <br />
            3. 点击节点配置属性
            <br />
            4. 测试运行
            <br />
            5. 保存工作流
          </p>
        </div>
      </Card>

      {/* Center Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="p-4 border-b bg-white space-y-3">
          <div className="flex gap-3">
            <Input
              placeholder="工作流名称..."
              value={workflowName}
              onChange={e => setWorkflowName(e.target.value)}
              className="max-w-xs"
            />
            <Input
              placeholder="描述（可选）"
              value={workflowDescription}
              onChange={e => setWorkflowDescription(e.target.value)}
              className="max-w-md"
            />
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? '保存中...' : '保存'}
            </Button>
          </div>

          <div className="flex gap-3">
            <Input
              placeholder="输入测试数据..."
              value={testInput}
              onChange={e => setTestInput(e.target.value)}
              className="max-w-md"
            />
            <Button variant="outline" onClick={handleTestRun}>
              <PlayCircle className="w-4 h-4 mr-2" />
              测试运行
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-gray-50">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={(_, node) => setSelectedNode(node)}
            onPaneClick={() => setSelectedNode(null)}
            nodeTypes={nodeTypes}
            fitView
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
            <Controls />
          </ReactFlow>
        </div>
      </div>

      {/* Right Config Panel */}
      <Card className="w-80 p-4 border-l rounded-none space-y-4 overflow-y-auto">
        <h3 className="font-semibold">⚙️ 配置面板</h3>

        {selectedNode ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">节点类型</label>
              <div className="px-3 py-2 bg-gray-100 rounded text-sm">
                {selectedNode.type === 'input' && '📝 输入节点'}
                {selectedNode.type === 'aiStep' && '🤖 AI步骤'}
                {selectedNode.type === 'output' && '✅ 输出节点'}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">节点名称</label>
              <Input
                value={selectedNode.data.label || ''}
                onChange={e => updateNodeData('label', e.target.value)}
              />
            </div>

            {selectedNode.type === 'input' && (
              <div>
                <label className="text-sm font-medium mb-1 block">
                  输入提示
                </label>
                <Input
                  value={selectedNode.data.placeholder || ''}
                  onChange={e => updateNodeData('placeholder', e.target.value)}
                  placeholder="如：输入一个主题..."
                />
              </div>
            )}

            {selectedNode.type === 'aiStep' && (
              <div>
                <label className="text-sm font-medium mb-1 block">Prompt</label>
                <Textarea
                  value={selectedNode.data.prompt || ''}
                  onChange={e => updateNodeData('prompt', e.target.value)}
                  rows={8}
                  placeholder="输入 AI prompt...&#10;&#10;可以使用变量：&#10;{输入} - 工作流输入&#10;{步骤名} - 引用其他步骤"
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  💡 使用 {'{输入}'} 引用初始输入
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-sm text-gray-500 text-center py-8">
            点击节点进行配置
          </div>
        )}
      </Card>
    </div>
  )
}
