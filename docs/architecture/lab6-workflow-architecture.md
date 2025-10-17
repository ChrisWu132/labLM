# Lab 6: AI Workflow Builder - Architecture Document

**Project**: LLM Learning Lab - Lab 6 (Advanced)
**Version**: 1.0
**Last Updated**: 2025-10-17
**Status**: Design Complete, Ready for Implementation

---

## 📋 Document Overview

This document describes the technical architecture for Lab 6: AI Workflow Builder, a visual node-based interface for creating and executing AI-powered workflows.

### Related Documents

- [Lab 6 PRD](../prd/lab6-workflow-builder-prd.md) - Product requirements
- [Lab 6 Detailed Design](../labs/lab6-workflow-builder.md) - Chinese detailed design
- [Lab 6 Implementation Plan](../prd/lab6-implementation-plan.md) - Implementation phases
- [Data Model & Services](./data-model-and-services.md) - Database schema
- [Tech Stack](./tech-stack.md) - Technology choices

---

## 🎯 Goals and Scope

### Primary Goals

1. **Visual Workflow Creation**: Enable students to build AI workflows using drag-and-drop interface
2. **Real-time Execution**: Execute workflows and display results in real-time
3. **Learning Experience**: Teach task decomposition and AI agent chaining concepts
4. **Persistence**: Save/load workflows for reuse and sharing

### Out of Scope (Phase 1)

- Branching/conditional nodes (If/Else)
- Loop nodes
- Multi-user collaboration
- Workflow marketplace
- Code export functionality

---

## 🏗️ High-Level Architecture

### System Components

```
┌─────────────────────────────────────────────────────┐
│              Lab 6 Frontend (React)                 │
│  ┌──────────────┐  ┌───────────────────────────┐   │
│  │  Toolbox     │  │   React Flow Canvas       │   │
│  │  Sidebar     │  │   - Input Node            │   │
│  │              │  │   - AI Step Node          │   │
│  │  📦 Nodes:   │  │   - Output Node           │   │
│  │  - Input     │  │                           │   │
│  │  - AI Step   │  │   Config Panel (right) ─┐ │   │
│  │  - Output    │  └───────────────────────────┼───┘
│  └──────────────┘                              │   │
│         │                                      │   │
│         └──────────────────────────────────────┘   │
│                        │                           │
└────────────────────────┼───────────────────────────┘
                         │
                         ▼
    ┌────────────────────────────────────────────────┐
    │         Next.js Server Actions                 │
    │  ┌──────────────────────────────────────────┐ │
    │  │  lib/actions/workflow.ts:                │ │
    │  │  - saveWorkflow()                        │ │
    │  │  - loadWorkflow()                        │ │
    │  │  - executeWorkflow()                     │ │
    │  │  - getWorkflowTemplates()                │ │
    │  └──────────────────────────────────────────┘ │
    │  ┌──────────────────────────────────────────┐ │
    │  │  lib/workflow/workflow-engine.ts:        │ │
    │  │  - WorkflowEngine class                  │ │
    │  │  - Topological sort execution            │ │
    │  │  - Variable resolution                   │ │
    │  │  - LLM integration                       │ │
    │  └──────────────────────────────────────────┘ │
    └─────┬───────────────────┬────────────────────┘
          │                   │
          ▼                   ▼
    ┌───────────┐       ┌──────────┐
    │ Supabase  │       │ OpenAI   │
    │ PostgreSQL│       │ GPT-4o   │
    └───────────┘       └──────────┘
```

---

## 🧩 Component Architecture

### Frontend Component Hierarchy

```
app/dashboard/vibecoding/labs/lab6/
├── page.tsx                       # Main Lab 6 page (RSC)
├── components/
│   ├── WorkflowCanvas.tsx         # React Flow wrapper
│   ├── WorkflowToolbox.tsx        # Left sidebar with node library
│   ├── WorkflowConfigPanel.tsx    # Right sidebar for node config
│   ├── WorkflowExecutor.tsx       # Execution controls and status
│   ├── nodes/
│   │   ├── BaseNode.tsx           # Base node component
│   │   ├── InputNode.tsx          # Input node (blue)
│   │   ├── AIStepNode.tsx         # AI processing node (purple)
│   │   └── OutputNode.tsx         # Output node (green)
│   └── templates/
│       ├── StoryCreator.ts        # Pre-built: Story creation workflow
│       ├── HomeworkHelper.ts      # Pre-built: Homework assistant
│       └── Translator.ts          # Pre-built: Translation workflow
└── hooks/
    ├── useWorkflowStore.ts        # Zustand store for workflow state
    └── useWorkflowExecution.ts    # Execution state management
```

### Key Components Detail

#### 1. WorkflowCanvas Component

```typescript
// components/features/workflow/WorkflowCanvas.tsx
'use client'

import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge
} from 'reactflow'
import 'reactflow/dist/style.css'

export function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds))
  }, [])

  const onDrop = useCallback((event) => {
    // Handle node drop from toolbox
    const nodeType = event.dataTransfer.getData('application/reactflow')
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    })

    const newNode = {
      id: `${nodeType}-${Date.now()}`,
      type: nodeType,
      position,
      data: { label: `${nodeType} node` }
    }

    setNodes((nds) => nds.concat(newNode))
  }, [])

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background variant="dots" />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}
```

#### 2. Zustand Store for State Management

```typescript
// hooks/useWorkflowStore.ts
import { create } from 'zustand'
import { Node, Edge } from 'reactflow'

interface WorkflowState {
  nodes: Node[]
  edges: Edge[]
  selectedNode: Node | null
  executionState: 'idle' | 'running' | 'completed' | 'error'

  // Actions
  setNodes: (nodes: Node[]) => void
  setEdges: (edges: Edge[]) => void
  addNode: (node: Node) => void
  deleteNode: (nodeId: string) => void
  selectNode: (node: Node | null) => void
  updateNodeData: (nodeId: string, data: any) => void
  executeWorkflow: (input: string) => Promise<void>
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  executionState: 'idle',

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  addNode: (node) => set((state) => ({
    nodes: [...state.nodes, node]
  })),

  deleteNode: (nodeId) => set((state) => ({
    nodes: state.nodes.filter(n => n.id !== nodeId),
    edges: state.edges.filter(e => e.source !== nodeId && e.target !== nodeId)
  })),

  selectNode: (node) => set({ selectedNode: node }),

  updateNodeData: (nodeId, data) => set((state) => ({
    nodes: state.nodes.map(n =>
      n.id === nodeId ? { ...n, data: { ...n.data, ...data } } : n
    )
  })),

  executeWorkflow: async (input) => {
    set({ executionState: 'running' })
    const { nodes, edges } = get()

    try {
      const result = await executeWorkflow('temp-id', input)
      if (result.success) {
        set({ executionState: 'completed' })
      } else {
        set({ executionState: 'error' })
      }
    } catch (error) {
      set({ executionState: 'error' })
    }
  }
}))
```

---

## 🔧 Workflow Execution Engine

### WorkflowEngine Class

```typescript
// lib/workflow/workflow-engine.ts

export interface WorkflowStep {
  id: string
  type: 'input' | 'aiStep' | 'output'
  data: {
    label: string
    prompt?: string
    value?: string
    [key: string]: any
  }
  position: { x: number; y: number }
}

export interface WorkflowEdge {
  id: string
  source: string
  target: string
}

export interface ExecutionLog {
  stepId: string
  timestamp: string
  input: string
  output: string
  durationMs: number
  status: 'success' | 'error'
}

export class WorkflowEngine {
  private steps: Map<string, WorkflowStep>
  private edges: WorkflowEdge[]
  private results: Map<string, string>

  // Callbacks for UI updates
  public onStepStart?: (stepId: string) => void
  public onStepComplete?: (stepId: string, output: string) => void
  public onStepError?: (stepId: string, error: string) => void

  constructor(steps: WorkflowStep[], edges: WorkflowEdge[]) {
    this.steps = new Map(steps.map(s => [s.id, s]))
    this.edges = edges
    this.results = new Map()
  }

  /**
   * Execute workflow with topological sort
   */
  async execute(initialInput: string): Promise<{
    success: boolean
    finalOutput?: string
    log: ExecutionLog[]
    error?: string
  }> {
    const log: ExecutionLog[] = []

    try {
      // 1. Topological sort for execution order
      const executionOrder = this.topologicalSort()

      // 2. Set initial input
      const inputStepId = this.findInputStep()
      if (!inputStepId) {
        throw new Error('Workflow must have input node')
      }
      this.results.set(inputStepId, initialInput)

      // 3. Execute steps in order
      for (const stepId of executionOrder) {
        const step = this.steps.get(stepId)
        if (!step) continue

        if (step.type === 'aiStep') {
          await this.executeAIStep(stepId, step, log)
        }
      }

      // 4. Get final output
      const outputStepId = this.findOutputStep()
      const finalOutput = outputStepId
        ? this.results.get(this.getInputSourceForStep(outputStepId))
        : undefined

      return { success: true, finalOutput, log }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        log
      }
    }
  }

  /**
   * Execute single AI step
   */
  private async executeAIStep(
    stepId: string,
    step: WorkflowStep,
    log: ExecutionLog[]
  ): Promise<void> {
    const startTime = Date.now()

    try {
      this.onStepStart?.(stepId)

      // 1. Get input data
      const inputs = this.getInputsForStep(stepId)

      // 2. Resolve prompt variables
      const resolvedPrompt = this.resolvePromptVariables(
        step.data.prompt!,
        inputs
      )

      // 3. Call LLM
      const output = await this.callLLM(resolvedPrompt)

      // 4. Save result
      this.results.set(stepId, output)

      // 5. Log
      log.push({
        stepId,
        timestamp: new Date().toISOString(),
        input: resolvedPrompt,
        output,
        durationMs: Date.now() - startTime,
        status: 'success'
      })

      this.onStepComplete?.(stepId, output)
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Execution failed'
      log.push({
        stepId,
        timestamp: new Date().toISOString(),
        input: step.data.prompt || '',
        output: errorMsg,
        durationMs: Date.now() - startTime,
        status: 'error'
      })
      this.onStepError?.(stepId, errorMsg)
      throw error
    }
  }

  /**
   * Call LLM API
   */
  private async callLLM(prompt: string): Promise<string> {
    const response = await fetch('/api/llm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })

    if (!response.ok) {
      throw new Error('LLM API call failed')
    }

    const { output } = await response.json()
    return output
  }

  /**
   * Resolve {variable} placeholders in prompt
   */
  private resolvePromptVariables(
    template: string,
    inputs: Map<string, string>
  ): string {
    let resolved = template

    // Replace {variableName} with actual values
    for (const [key, value] of inputs.entries()) {
      const regex = new RegExp(`\\{${key}\\}`, 'g')
      resolved = resolved.replace(regex, value)
    }

    // Special variable: {输入} -> workflow initial input
    const inputStepId = this.findInputStep()
    if (inputStepId) {
      const inputValue = this.results.get(inputStepId) || ''
      resolved = resolved.replace(/\{输入\}/g, inputValue)
    }

    return resolved
  }

  /**
   * Topological sort for execution order
   */
  private topologicalSort(): string[] {
    const visited = new Set<string>()
    const result: string[] = []
    const adjacency = this.buildAdjacencyList()

    const visit = (nodeId: string) => {
      if (visited.has(nodeId)) return
      visited.add(nodeId)

      const neighbors = adjacency.get(nodeId) || []
      for (const neighbor of neighbors) {
        visit(neighbor)
      }

      result.push(nodeId)
    }

    const inputStepId = this.findInputStep()
    if (inputStepId) {
      visit(inputStepId)
    }

    return result.reverse()
  }

  private buildAdjacencyList(): Map<string, string[]> {
    const adjacency = new Map<string, string[]>()

    for (const edge of this.edges) {
      const neighbors = adjacency.get(edge.source) || []
      neighbors.push(edge.target)
      adjacency.set(edge.source, neighbors)
    }

    return adjacency
  }

  private findInputStep(): string | undefined {
    for (const [id, step] of this.steps.entries()) {
      if (step.type === 'input') return id
    }
    return undefined
  }

  private findOutputStep(): string | undefined {
    for (const [id, step] of this.steps.entries()) {
      if (step.type === 'output') return id
    }
    return undefined
  }

  private getInputsForStep(stepId: string): Map<string, string> {
    const inputs = new Map<string, string>()

    const incomingEdges = this.edges.filter(e => e.target === stepId)
    for (const edge of incomingEdges) {
      const sourceOutput = this.results.get(edge.source)
      if (sourceOutput) {
        inputs.set(edge.source, sourceOutput)
      }
    }

    return inputs
  }

  private getInputSourceForStep(stepId: string): string | undefined {
    const incomingEdge = this.edges.find(e => e.target === stepId)
    return incomingEdge?.source
  }
}
```

---

## 📊 Database Schema

See [Data Model & Services](./data-model-and-services.md) for complete schema details.

### Key Tables

**workflows**:
- Stores workflow definitions (nodes, edges as JSONB)
- User-owned with public template support
- RLS policies for security

**workflow_executions**:
- Tracks execution history
- Stores execution logs and results
- Linked to workflows and users

---

## 🔒 Security Considerations

### Authentication & Authorization

1. **Workflow Creation**: Users can only create workflows for themselves
2. **Workflow Execution**: Users can only execute their own workflows or public templates
3. **RLS Policies**: Enforce user_id checks at database level
4. **API Rate Limiting**: Prevent abuse of LLM calls

### Input Validation

```typescript
// Validate workflow before execution
function validateWorkflow(nodes: Node[], edges: Edge[]): ValidationResult {
  const errors = []

  // Check for input node
  if (!nodes.some(n => n.type === 'input')) {
    errors.push('Workflow must have at least one input node')
  }

  // Check for output node
  if (!nodes.some(n => n.type === 'output')) {
    errors.push('Workflow must have at least one output node')
  }

  // Check for circular dependencies
  if (hasCircularDependency(nodes, edges)) {
    errors.push('Workflow has circular dependencies')
  }

  // Check all nodes have required config
  for (const node of nodes) {
    if (node.type === 'aiStep' && !node.data.prompt) {
      errors.push(`Node ${node.id} missing prompt`)
    }
  }

  return { valid: errors.length === 0, errors }
}
```

---

## 📈 Performance Considerations

### Frontend Optimization

1. **React Flow Performance**:
   - Limit to 50 nodes per workflow
   - Use memoization for node components
   - Debounce node position updates

2. **State Management**:
   - Zustand for lightweight state
   - Avoid unnecessary re-renders
   - Use selectors for specific state slices

### Backend Optimization

1. **Workflow Execution**:
   - Parallel execution where possible (independent branches)
   - Streaming LLM responses for better UX
   - Timeout handling (max 60s per node)

2. **Database**:
   - Index on user_id for fast workflow lookups
   - JSONB GIN indexes for workflow search
   - Execution log size limits

---

## 📚 Related Documentation

- [Lab 6 PRD](../prd/lab6-workflow-builder-prd.md)
- [Lab 6 Implementation Plan](../prd/lab6-implementation-plan.md)
- [Data Model](./data-model-and-services.md)
- [Tech Stack](./tech-stack.md)

---

**Document Status**: ✅ Complete
**Next Steps**: Begin implementation following Lab 6 Implementation Plan
