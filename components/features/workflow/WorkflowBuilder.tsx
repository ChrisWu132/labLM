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
      toast.error('Can only have one input node')
      return
    }
    if (type === 'output' && nodes.some(n => n.type === 'output')) {
      toast.error('Can only have one output node')
      return
    }

    const id = `node-${Date.now()}`
    const newNode: Node = {
      id,
      type,
      position: { x: 250, y: nodes.length * 150 },
      data:
        type === 'input'
          ? { label: 'Input', placeholder: 'Enter content' }
          : type === 'output'
            ? { label: 'Output' }
            : { label: `AI Step ${nodes.filter(n => n.type === 'aiStep').length + 1}`, prompt: 'Enter prompt here...' }
    }

    setNodes(nds => [...nds, newNode])
    toast.success('Node added')
  }

  // Delete selected node
  const deleteSelectedNode = () => {
    if (!selectedNode) {
      toast.error('Please select a node first')
      return
    }

    setNodes(nds => nds.filter(n => n.id !== selectedNode.id))
    setEdges(eds => eds.filter(e => e.source !== selectedNode.id && e.target !== selectedNode.id))
    setSelectedNode(null)
    toast.success('Node deleted')
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
      toast.error('Please enter workflow name')
      return
    }

    if (nodes.length < 3) {
      toast.error('Workflow needs at least 3 nodes (input, AI step, output)')
      return
    }

    if (!nodes.some(n => n.type === 'input')) {
      toast.error('Workflow must include an input node')
      return
    }

    if (!nodes.some(n => n.type === 'output')) {
      toast.error('Workflow must include an output node')
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
        toast.success('Workflow saved successfully!')
      } else {
        toast.error(result.error || 'Save failed')
      }
    } catch (error) {
      toast.error('Error occurred while saving')
    } finally {
      setIsSaving(false)
    }
  }

  // Test run
  const handleTestRun = async () => {
    if (!testInput.trim()) {
      toast.error('Please enter test data')
      return
    }

    if (nodes.length < 3) {
      toast.error('Please build a complete workflow first')
      return
    }

    try {
      toast.loading('Running...')

      const result = await executeWorkflowDirect(
        { nodes, edges },
        testInput.trim()
      )

      toast.dismiss()

      if (result.success) {
        toast.success('Test run successful!')
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
        toast.error(result.error || 'Execution failed')
      }
    } catch (error) {
      toast.dismiss()
      toast.error('Error occurred during execution')
    }
  }

  return (
    <div className="flex h-full">
      {/* Left Toolbox */}
      <Card className="w-64 p-4 border-r rounded-none space-y-4">
        <div>
          <h3 className="font-semibold mb-3">📦 Toolbox</h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => addNode('input')}
            >
              <span className="text-xl mr-2">📝</span>
              Input Node
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => addNode('aiStep')}
            >
              <span className="text-xl mr-2">🤖</span>
              AI Step
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => addNode('output')}
            >
              <span className="text-xl mr-2">✅</span>
              Output Node
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
            Delete Node
          </Button>
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium text-sm mb-2">💡 Tips</h4>
          <p className="text-xs text-gray-600">
            1. Add input, AI step, and output nodes
            <br />
            2. Connect nodes (drag from bottom to top of another node)
            <br />
            3. Click nodes to configure properties
            <br />
            4. Test run
            <br />
            5. Save workflow
          </p>
        </div>
      </Card>

      {/* Center Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="p-4 border-b bg-white space-y-3 shrink-0">
          <div className="flex gap-3">
            <Input
              placeholder="Workflow name..."
              value={workflowName}
              onChange={e => setWorkflowName(e.target.value)}
              className="max-w-xs"
            />
            <Input
              placeholder="Description (optional)"
              value={workflowDescription}
              onChange={e => setWorkflowDescription(e.target.value)}
              className="max-w-md"
            />
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </div>

          <div className="flex gap-3">
            <Input
              placeholder="Enter test data..."
              value={testInput}
              onChange={e => setTestInput(e.target.value)}
              className="max-w-md"
            />
            <Button variant="outline" onClick={handleTestRun}>
              <PlayCircle className="w-4 h-4 mr-2" />
              Test Run
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
      <Card className="w-80 p-4 border-l rounded-none space-y-4 overflow-y-auto shrink-0">
        <h3 className="font-semibold">⚙️ Configuration Panel</h3>

        {selectedNode ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Node Type</label>
              <div className="px-3 py-2 bg-gray-100 rounded text-sm">
                {selectedNode.type === 'input' && '📝 Input Node'}
                {selectedNode.type === 'aiStep' && '🤖 AI Step'}
                {selectedNode.type === 'output' && '✅ Output Node'}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Node Name</label>
              <Input
                value={selectedNode.data.label || ''}
                onChange={e => updateNodeData('label', e.target.value)}
              />
            </div>

            {selectedNode.type === 'input' && (
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Input Placeholder
                </label>
                <Input
                  value={selectedNode.data.placeholder || ''}
                  onChange={e => updateNodeData('placeholder', e.target.value)}
                  placeholder="e.g.: Enter a topic..."
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
                  placeholder="Enter AI prompt...&#10;&#10;Available variables:&#10;{Input} - Workflow input&#10;{StepName} - Reference other steps"
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  💡 Use {'{Input}'} to reference initial input
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-sm text-gray-500 text-center py-8">
            Click a node to configure
          </div>
        )}
      </Card>
    </div>
  )
}
