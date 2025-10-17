/**
 * Node Configuration Panel - Right sidebar for editing node properties
 * Dynamically renders configuration forms based on selected node type
 */

'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { X, Plus, Trash2 } from 'lucide-react'
import { useWorkflowStore } from '@/lib/workflow/store'
import type { WorkflowNode } from '@/lib/workflow/types'

// ============================================================================
// Configuration Forms by Node Type
// ============================================================================

function StartNodeConfig({ node }: { node: WorkflowNode }) {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData)

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="label">Node Label</Label>
        <Input
          id="label"
          value={node.data.label}
          onChange={(e) => updateNodeData(node.id, { label: e.target.value })}
          placeholder="Start"
        />
      </div>
      <p className="text-xs text-gray-500">
        Start node marks the entry point of your workflow. No configuration needed.
      </p>
    </div>
  )
}

function LLMAgentNodeConfig({ node }: { node: WorkflowNode }) {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData)
  const data = node.data

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="agentName">Agent Name</Label>
        <Input
          id="agentName"
          value={data.agentName || ''}
          onChange={(e) => updateNodeData(node.id, { agentName: e.target.value })}
          placeholder="My Agent"
        />
      </div>

      <div>
        <Label htmlFor="systemPrompt">System Prompt</Label>
        <Textarea
          id="systemPrompt"
          value={data.systemPrompt || ''}
          onChange={(e) => updateNodeData(node.id, { systemPrompt: e.target.value })}
          placeholder="You are a helpful assistant..."
          rows={6}
          className="font-mono text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          Use {'{input}'} to reference workflow input
        </p>
      </div>

      <div>
        <Label htmlFor="model">Model</Label>
        <Select
          value={data.model || 'gpt-4'}
          onValueChange={(value) => updateNodeData(node.id, { model: value })}
        >
          <SelectTrigger id="model">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt-4">GPT-4 (Most capable)</SelectItem>
            <SelectItem value="gpt-4-turbo">GPT-4 Turbo (Fast)</SelectItem>
            <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (Economical)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="temperature">Temperature: {data.temperature || 0.7}</Label>
        <Slider
          id="temperature"
          min={0}
          max={1}
          step={0.1}
          value={[data.temperature || 0.7]}
          onValueChange={([value]) => updateNodeData(node.id, { temperature: value })}
          className="mt-2"
        />
        <p className="text-xs text-gray-500 mt-1">
          Higher = more creative, Lower = more focused
        </p>
      </div>

      <div>
        <Label htmlFor="maxTokens">Max Tokens</Label>
        <Input
          id="maxTokens"
          type="number"
          value={data.maxTokens || 1000}
          onChange={(e) => updateNodeData(node.id, { maxTokens: parseInt(e.target.value) })}
          min={100}
          max={4000}
        />
      </div>
    </div>
  )
}

function ClassifierNodeConfig({ node }: { node: WorkflowNode }) {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData)
  const data = node.data
  const categories = data.categories || []

  const addCategory = () => {
    const newCategories = [
      ...categories,
      {
        name: `Category ${categories.length + 1}`,
        description: '',
        handle: `cat-${Date.now()}`
      }
    ]
    updateNodeData(node.id, { categories: newCategories })
  }

  const removeCategory = (index: number) => {
    const newCategories = categories.filter((_: any, i: number) => i !== index)
    updateNodeData(node.id, { categories: newCategories })
  }

  const updateCategory = (index: number, field: string, value: string) => {
    const newCategories = [...categories]
    newCategories[index] = { ...newCategories[index], [field]: value }
    updateNodeData(node.id, { categories: newCategories })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="classifierName">Classifier Name</Label>
        <Input
          id="classifierName"
          value={data.classifierName || ''}
          onChange={(e) => updateNodeData(node.id, { classifierName: e.target.value })}
          placeholder="My Classifier"
        />
      </div>

      <div>
        <Label htmlFor="classificationPrompt">Classification Prompt</Label>
        <Textarea
          id="classificationPrompt"
          value={data.classificationPrompt || ''}
          onChange={(e) => updateNodeData(node.id, { classificationPrompt: e.target.value })}
          placeholder="Classify the following input..."
          rows={4}
        />
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Categories</Label>
          <Button size="sm" variant="outline" onClick={addCategory}>
            <Plus className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>

        <div className="space-y-2">
          {categories.map((category: any, index: number) => (
            <div key={category.handle} className="border rounded-md p-2 space-y-2">
              <div className="flex items-center justify-between">
                <Input
                  value={category.name}
                  onChange={(e) => updateCategory(index, 'name', e.target.value)}
                  placeholder="Category name"
                  className="flex-1 h-8 text-sm"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeCategory(index)}
                  className="ml-2 h-8 w-8 p-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <Input
                value={category.description}
                onChange={(e) => updateCategory(index, 'description', e.target.value)}
                placeholder="Description (optional)"
                className="h-8 text-xs"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function IfElseNodeConfig({ node }: { node: WorkflowNode }) {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData)
  const data = node.data

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="conditionType">Condition Type</Label>
        <Select
          value={data.conditionType || 'contains'}
          onValueChange={(value) => updateNodeData(node.id, { conditionType: value })}
        >
          <SelectTrigger id="conditionType">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="contains">Contains Text</SelectItem>
            <SelectItem value="equals">Equals Exactly</SelectItem>
            <SelectItem value="regex">Regex Pattern</SelectItem>
            <SelectItem value="custom">Custom Expression</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="conditionValue">
          {data.conditionType === 'regex' ? 'Regex Pattern' : 'Condition Value'}
        </Label>
        <Textarea
          id="conditionValue"
          value={data.conditionValue || ''}
          onChange={(e) => updateNodeData(node.id, { conditionValue: e.target.value })}
          placeholder={
            data.conditionType === 'regex'
              ? '^[A-Z].*'
              : data.conditionType === 'custom'
                ? 'input.length > 100'
                : 'text to check'
          }
          rows={3}
          className="font-mono text-sm"
        />
      </div>

      {data.conditionType !== 'custom' && (
        <div className="flex items-center space-x-2">
          <Switch
            id="caseSensitive"
            checked={data.caseSensitive || false}
            onCheckedChange={(checked) => updateNodeData(node.id, { caseSensitive: checked })}
          />
          <Label htmlFor="caseSensitive">Case Sensitive</Label>
        </div>
      )}
    </div>
  )
}

function InputNodeConfig({ node }: { node: WorkflowNode }) {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData)
  const data = node.data

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="parameterName">Parameter Name</Label>
        <Input
          id="parameterName"
          value={data.parameterName || ''}
          onChange={(e) => updateNodeData(node.id, { parameterName: e.target.value })}
          placeholder="input"
        />
      </div>

      <div>
        <Label htmlFor="parameterType">Type</Label>
        <Select
          value={data.parameterType || 'text'}
          onValueChange={(value) => updateNodeData(node.id, { parameterType: value })}
        >
          <SelectTrigger id="parameterType">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="json">JSON</SelectItem>
            <SelectItem value="file">File</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="placeholder">Placeholder</Label>
        <Input
          id="placeholder"
          value={data.placeholder || ''}
          onChange={(e) => updateNodeData(node.id, { placeholder: e.target.value })}
          placeholder="Enter value..."
        />
      </div>

      <div>
        <Label htmlFor="defaultValue">Default Value</Label>
        <Input
          id="defaultValue"
          value={data.defaultValue || ''}
          onChange={(e) => updateNodeData(node.id, { defaultValue: e.target.value })}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="required"
          checked={data.required !== false}
          onCheckedChange={(checked) => updateNodeData(node.id, { required: checked })}
        />
        <Label htmlFor="required">Required</Label>
      </div>
    </div>
  )
}

function OutputNodeConfig({ node }: { node: WorkflowNode }) {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData)
  const data = node.data

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="label">Output Label</Label>
        <Input
          id="label"
          value={node.data.label}
          onChange={(e) => updateNodeData(node.id, { label: e.target.value })}
          placeholder="Output"
        />
      </div>

      <div>
        <Label htmlFor="outputFormat">Output Format</Label>
        <Select
          value={data.outputFormat || 'text'}
          onValueChange={(value) => updateNodeData(node.id, { outputFormat: value })}
        >
          <SelectTrigger id="outputFormat">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Plain Text</SelectItem>
            <SelectItem value="json">JSON</SelectItem>
            <SelectItem value="markdown">Markdown</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

function DefaultNodeConfig({ node }: { node: WorkflowNode }) {
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData)

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="label">Node Label</Label>
        <Input
          id="label"
          value={node.data.label}
          onChange={(e) => updateNodeData(node.id, { label: e.target.value })}
          placeholder="Node name"
        />
      </div>
      <div>
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          value={node.data.description || ''}
          onChange={(e) => updateNodeData(node.id, { description: e.target.value })}
          placeholder="Node description..."
          rows={3}
        />
      </div>
      <p className="text-xs text-gray-500">
        Additional configuration for this node type is not yet implemented.
      </p>
    </div>
  )
}

// ============================================================================
// Main Configuration Panel Component
// ============================================================================

export function NodeConfigPanel() {
  const selectedNode = useWorkflowStore((state) => state.selectedNode)
  const selectNode = useWorkflowStore((state) => state.selectNode)
  const deleteNode = useWorkflowStore((state) => state.deleteNode)
  const duplicateNode = useWorkflowStore((state) => state.duplicateNode)

  if (!selectedNode) {
    return (
      <div className="w-80 border-l bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center text-sm text-gray-500">
          <p className="font-medium mb-2">No node selected</p>
          <p>Click on a node to configure its properties</p>
        </div>
      </div>
    )
  }

  // Render appropriate config form based on node type
  const renderConfigForm = () => {
    switch (selectedNode.type) {
      case 'start':
      case 'end':
        return <StartNodeConfig node={selectedNode} />
      case 'llmAgent':
      case 'aiStep':
        return <LLMAgentNodeConfig node={selectedNode} />
      case 'classifier':
        return <ClassifierNodeConfig node={selectedNode} />
      case 'ifElse':
        return <IfElseNodeConfig node={selectedNode} />
      case 'input':
        return <InputNodeConfig node={selectedNode} />
      case 'output':
        return <OutputNodeConfig node={selectedNode} />
      default:
        return <DefaultNodeConfig node={selectedNode} />
    }
  }

  return (
    <div className="w-80 border-l bg-white flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-sm">Node Configuration</h3>
          <p className="text-xs text-gray-500 mt-0.5">ID: {selectedNode.id}</p>
        </div>
        <Button size="sm" variant="ghost" onClick={() => selectNode(null)} className="h-8 w-8 p-0">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Configuration Form */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          <div className="bg-gray-100 rounded-md px-3 py-2">
            <p className="text-xs font-medium text-gray-700">Node Type</p>
            <p className="text-sm font-semibold capitalize">{selectedNode.type}</p>
          </div>

          <Separator />

          {renderConfigForm()}
        </div>
      </ScrollArea>

      {/* Actions */}
      <div className="p-4 border-t space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => duplicateNode(selectedNode.id)}
          className="w-full"
        >
          Duplicate Node
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            deleteNode(selectedNode.id)
            selectNode(null)
          }}
          className="w-full"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Node
        </Button>
      </div>
    </div>
  )
}
