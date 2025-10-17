# AI Workflow Builder PRD

## Goals and Background Context

### Goals

- Enable users to create, edit, and manage AI-powered workflows through an intuitive visual node-based interface
- Provide a drag-and-drop workflow builder that simplifies complex AI task decomposition
- Support real-time workflow execution and testing within the builder interface
- Allow users to save, load, and share workflow templates
- Replace the current abstract Lab 6 UI with a practical, production-ready workflow builder tool

### Background Context

The current Lab 6 implementation uses an abstract, stage-based UI that focuses on educational concepts but lacks practical utility. Users cannot visually see workflow structures, making it difficult to understand how AI agents interact and how data flows between steps.

Modern workflow builders (like LangGraph Studio, n8n, Flowise) have proven that visual, node-based interfaces significantly improve user understanding and productivity. By redesigning Lab 6 as a standalone workflow builder tool, we create immediate value for users while establishing a solid foundation that can later be enhanced with educational features.

The new design will feature a canvas-based interface where users can:
- Drag and drop nodes representing different AI agents and logic components
- Visually connect nodes to define data flow and execution order
- Configure node parameters through intuitive forms
- Execute workflows and see real-time results
- Save and share workflows as reusable templates

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-10-16 | 0.1 | Initial PRD draft | John (PM) |

## Requirements

### Functional Requirements

#### FR1: Visual Workflow Canvas
Users must be able to work with a canvas-based interface where workflows are represented as connected nodes, similar to flowchart or state machine builders.

#### FR2: Node Library
The system must provide a library of pre-built node types including:
- **Control Nodes**: Start, End, If/Else (conditional branching), Switch (multi-path routing)
- **Agent Nodes**: LLM Agent (generic AI task), Classification Agent, Extraction Agent, Summary Agent, Translation Agent
- **Data Nodes**: Input, Output, Transform, Merge
- **Guardrail Nodes**: Content Filter, Hallucination Check, Safety Validator

#### FR3: Drag-and-Drop Node Placement
Users must be able to drag nodes from the library and drop them onto the canvas to add them to the workflow.

#### FR4: Visual Edge Connections
Users must be able to create connections (edges) between nodes by clicking/dragging from an output port to an input port, visually representing data flow.

#### FR5: Node Configuration
Users must be able to click on any node to open a configuration panel where they can:
- Set node-specific parameters (e.g., LLM prompt, model selection, temperature)
- Define input/output schemas
- Configure conditional logic for branching nodes

#### FR6: Workflow Execution
Users must be able to execute workflows from the canvas using a "Run" or "Evaluate" button, with the system:
- Validating the workflow structure before execution
- Executing nodes in the correct order based on dependencies
- Displaying execution status (running, completed, error) on each node
- Showing intermediate outputs from each node

#### FR7: Real-time Execution Visualization
During workflow execution, the canvas must visually indicate:
- Which node is currently executing (highlighted state)
- Which nodes have completed successfully (success state)
- Which nodes have errors (error state)
- Data flowing through connections (animated edges)

#### FR8: Workflow Save/Load
Users must be able to:
- Save workflows with a custom name
- Load previously saved workflows
- Export workflows as JSON files
- Import workflows from JSON files

#### FR9: Workflow Templates
The system must provide pre-built workflow templates for common use cases:
- Customer Service Agent (multi-step routing with classification)
- Content Generator (prompt → LLM → review → output)
- Data Extraction Pipeline (input → extract → validate → format)
- Translation Workflow (detect language → translate → verify)

#### FR10: Canvas Navigation
Users must be able to:
- Pan the canvas by dragging
- Zoom in/out using mouse wheel or pinch gestures
- Fit all nodes in view with a "Fit View" button
- Use minimap for navigation in large workflows

#### FR11: Node Deletion and Editing
Users must be able to:
- Delete nodes by selecting and pressing delete key or using context menu
- Delete connections by clicking on them and pressing delete
- Move nodes by dragging them to new positions
- Undo/redo operations

#### FR12: Workflow Validation
Before execution, the system must validate:
- All nodes have required inputs connected
- No circular dependencies exist
- All node configurations are complete
- At least one Start (or Input) node and one End (or Output) node exist

### Non-Functional Requirements

#### NFR1: Performance
The canvas must smoothly handle workflows with up to 50 nodes without lag when panning, zooming, or adding/removing nodes.

#### NFR2: Responsive Design
The interface must work on desktop screens (1280px+ width) with proper responsive behavior for different screen sizes.

#### NFR3: Browser Compatibility
The application must work on modern browsers: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+.

#### NFR4: Execution Latency
Workflow validation and execution startup must complete within 2 seconds for workflows with up to 20 nodes.

#### NFR5: Data Persistence
All workflow saves must persist to the database with confirmation, preventing data loss.

#### NFR6: Accessibility
The interface should support keyboard navigation for node creation, selection, and deletion (WCAG AA compliance where feasible).

## User Interface Design Goals

### Overall UX Vision

The AI Workflow Builder will provide a clean, modern, canvas-based interface that feels intuitive and powerful. The design philosophy prioritizes:

- **Visual Clarity**: Users should immediately understand workflow structure by looking at the canvas
- **Low Friction**: Common operations (add node, connect, configure, run) should require minimal clicks
- **Progressive Disclosure**: Simple workflows are simple to build; advanced features don't clutter the basic experience
- **Immediate Feedback**: Every action (add, connect, delete, run) provides instant visual feedback

### Key Interaction Paradigms

1. **Canvas-Centric Design**: The workflow canvas occupies the majority of screen real estate
2. **Contextual Panels**: Configuration panels slide in from the side when nodes are selected
3. **Direct Manipulation**: Drag-and-drop for all spatial operations (add nodes, move, connect)
4. **Toolbar Actions**: Top toolbar provides global actions (Run, Save, Load, Export, Undo/Redo)
5. **Node Library Sidebar**: Left sidebar contains categorized node library for quick access

### Core Screens and Views

1. **Workflow Builder Canvas** (Main Screen)
   - Full canvas workspace
   - Top toolbar with global actions
   - Left sidebar with node library
   - Right panel for node configuration (shows on selection)
   - Bottom status bar showing validation messages

2. **Workflow Gallery** (Home/Dashboard)
   - Grid of saved workflows with thumbnails
   - Template library section
   - "Create New Workflow" button
   - Search and filter workflows

3. **Execution Results View**
   - Canvas with execution visualization overlay
   - Bottom panel showing detailed logs
   - Node outputs displayed in expandable sections

### Frontend Implementation Details

#### Technology Stack

**Core Framework**: React 18+ with TypeScript

**Workflow Canvas Library**: **React Flow** (https://reactflow.dev/)
- Industry-standard library for node-based UIs
- Built-in support for drag-and-drop, panning, zooming
- Customizable nodes and edges
- Excellent performance for large graphs
- Active development and strong documentation

**Alternative Options Considered**:
- Reaflow (less maintained)
- Custom canvas with D3.js (higher development cost)
- X6/AntV (less React-idiomatic)

**State Management**: Zustand or Jotai
- React Flow integrates well with both
- Lightweight alternatives to Redux
- Zustand recommended for simpler API

**UI Components**: Shadcn/ui (already used in project)
- Consistent with existing VibeCoding Lab design
- Headless components for flexibility

**Icons**: Lucide React (already in project)

#### Canvas Implementation with React Flow

**Basic Setup**:
```tsx
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  addEdge,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';

// Node types mapping
const nodeTypes = {
  'start': StartNode,
  'llmAgent': LLMAgentNode,
  'classifier': ClassifierNode,
  'ifElse': IfElseNode,
  'guardrail': GuardrailNode,
  'end': EndNode,
};

function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback((params) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
}
```

#### Custom Node Components

Each node type should be a custom React component:

```tsx
import { Handle, Position } from 'reactflow';

function LLMAgentNode({ data, isConnectable }) {
  return (
    <div className="px-4 py-2 shadow-lg rounded-lg bg-white border-2 border-stone-400">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-amber-600" />
        </div>
        <div>
          <div className="font-semibold text-sm">{data.label}</div>
          <div className="text-xs text-gray-500">{data.agentType}</div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
}
```

#### Node Library Sidebar

```tsx
function NodeLibrary() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const nodeCategories = [
    {
      category: 'Control',
      nodes: [
        { type: 'start', label: 'Start', icon: Play },
        { type: 'end', label: 'End', icon: Square },
        { type: 'ifElse', label: 'If/Else', icon: GitBranch },
      ]
    },
    {
      category: 'Agents',
      nodes: [
        { type: 'llmAgent', label: 'LLM Agent', icon: Sparkles },
        { type: 'classifier', label: 'Classifier', icon: Filter },
        { type: 'extractor', label: 'Extractor', icon: Scan },
      ]
    },
    // ... more categories
  ];

  return (
    <div className="w-64 border-r bg-gray-50 p-4">
      {nodeCategories.map(({ category, nodes }) => (
        <div key={category} className="mb-6">
          <h3 className="font-semibold mb-2">{category}</h3>
          {nodes.map((node) => (
            <div
              key={node.type}
              draggable
              onDragStart={(e) => onDragStart(e, node.type)}
              className="flex items-center gap-2 p-2 bg-white rounded shadow cursor-move mb-2"
            >
              <node.icon className="w-4 h-4" />
              <span className="text-sm">{node.label}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

#### Drop Handler on Canvas

```tsx
const onDrop = useCallback((event) => {
  event.preventDefault();

  const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
  const type = event.dataTransfer.getData('application/reactflow');

  const position = reactFlowInstance.project({
    x: event.clientX - reactFlowBounds.left,
    y: event.clientY - reactFlowBounds.top,
  });

  const newNode = {
    id: `${type}-${Date.now()}`,
    type,
    position,
    data: {
      label: `${type} node`,
      // ... default node data
    },
  };

  setNodes((nds) => nds.concat(newNode));
}, [reactFlowInstance]);

const onDragOver = useCallback((event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}, []);
```

#### Execution Visualization

```tsx
// Update node styles during execution
function updateNodeExecutionState(nodeId: string, state: 'running' | 'success' | 'error') {
  setNodes((nds) =>
    nds.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          data: {
            ...node.data,
            executionState: state,
          },
          className: `execution-${state}`, // CSS class for visual feedback
        };
      }
      return node;
    })
  );
}

// In your node component
function LLMAgentNode({ data }) {
  const getNodeStyle = () => {
    switch(data.executionState) {
      case 'running':
        return 'border-blue-500 animate-pulse';
      case 'success':
        return 'border-green-500';
      case 'error':
        return 'border-red-500';
      default:
        return 'border-stone-400';
    }
  };

  return (
    <div className={`px-4 py-2 shadow-lg rounded-lg bg-white border-2 ${getNodeStyle()}`}>
      {/* ... node content */}
    </div>
  );
}
```

#### Edge Animations

```tsx
const edges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true, // Shows animated flow
    style: { stroke: '#94a3b8', strokeWidth: 2 },
  }
];

// For execution visualization, update edge dynamically
function highlightActiveEdge(edgeId: string) {
  setEdges((eds) =>
    eds.map((edge) => ({
      ...edge,
      animated: edge.id === edgeId,
      style: {
        ...edge.style,
        stroke: edge.id === edgeId ? '#3b82f6' : '#94a3b8',
        strokeWidth: edge.id === edgeId ? 3 : 2,
      },
    }))
  );
}
```

#### State Management with Zustand

```tsx
import create from 'zustand';

interface WorkflowState {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  executionState: 'idle' | 'running' | 'completed' | 'error';

  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: Node) => void;
  deleteNode: (nodeId: string) => void;
  selectNode: (node: Node | null) => void;
  updateNodeData: (nodeId: string, data: any) => void;

  executeWorkflow: () => Promise<void>;
  saveWorkflow: (name: string) => Promise<void>;
  loadWorkflow: (workflowId: string) => Promise<void>;
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

  executeWorkflow: async () => {
    set({ executionState: 'running' });
    // Workflow execution logic
    // ...
    set({ executionState: 'completed' });
  },

  saveWorkflow: async (name) => {
    const { nodes, edges } = get();
    await fetch('/api/workflow/save', {
      method: 'POST',
      body: JSON.stringify({ name, nodes, edges })
    });
  },

  loadWorkflow: async (workflowId) => {
    const response = await fetch(`/api/workflow/${workflowId}`);
    const { nodes, edges } = await response.json();
    set({ nodes, edges });
  },
}));
```

### Accessibility

- WCAG AA compliance for keyboard navigation
- Focus indicators on all interactive elements
- Keyboard shortcuts for common operations (Ctrl+Z undo, Delete to remove nodes, etc.)
- Screen reader support for node labels and connections

### Branding

- Consistent with VibeCoding Lab design system
- Use existing color palette and Shadcn/ui components
- Clean, modern aesthetic matching the reference image (123.png)
- Subtle shadows and rounded corners for depth

### Target Platforms

- **Web Responsive**: Desktop-first (1280px+), with tablet support (768px+)
- Browser support: Modern evergreen browsers (Chrome, Firefox, Safari, Edge)

## Technical Assumptions

### Repository Structure

**Monorepo** - Existing VibeCoding Lab repository

### Service Architecture

**Monolith with Feature Modules** - The workflow builder will be a new feature module within the existing Next.js application:
- Frontend: React components in `/app/dashboard/vibecoding/labs/lab6/`
- Backend API: Next.js API routes in `/app/api/workflow/`
- Database: Supabase (existing setup)

### Frontend Technology Stack

**Framework**: Next.js 14+ with App Router (existing)

**UI Library**: React 18+ with TypeScript

**Workflow Canvas**: React Flow v11+
- Install: `npm install reactflow`
- Provides node-based UI with drag-and-drop
- Handles canvas panning, zooming, connections

**State Management**: Zustand
- Install: `npm install zustand`
- Lightweight state management for workflow state
- Integrates cleanly with React Flow

**Component Library**: Shadcn/ui (existing)
- Use existing Button, Input, Select, Dialog components
- Add Sheet component for node configuration panel

**Icons**: Lucide React (existing)

**Styling**: Tailwind CSS (existing)

### Database Schema

**New Tables in Supabase**:

1. `workflows` table:
```sql
create table workflows (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  name text not null,
  description text,
  nodes jsonb not null,
  edges jsonb not null,
  is_template boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

2. `workflow_executions` table:
```sql
create table workflow_executions (
  id uuid primary key default uuid_generate_v4(),
  workflow_id uuid references workflows not null,
  user_id uuid references auth.users not null,
  status text check (status in ('running', 'completed', 'error')),
  input jsonb,
  output jsonb,
  execution_log jsonb,
  started_at timestamp with time zone default now(),
  completed_at timestamp with time zone
);
```

### API Endpoints

**Workflow CRUD**:
- `POST /api/workflow/create` - Create new workflow
- `GET /api/workflow/:id` - Load workflow
- `PUT /api/workflow/:id` - Update workflow
- `DELETE /api/workflow/:id` - Delete workflow
- `GET /api/workflow/list` - List user's workflows
- `GET /api/workflow/templates` - Get template workflows

**Workflow Execution**:
- `POST /api/workflow/:id/execute` - Execute workflow
- `GET /api/workflow/execution/:executionId` - Get execution status
- `GET /api/workflow/execution/:executionId/logs` - Get execution logs

### LLM Integration

**OpenAI API** (existing integration) for agent nodes:
- Use existing OpenAI API setup from prompt-lab
- Streaming responses for real-time execution feedback
- Support for different models (GPT-4, GPT-3.5-turbo)

### Testing Requirements

**Unit + Integration Testing**:
- Unit tests for node validation logic
- Integration tests for workflow execution engine
- Component tests for React Flow interactions
- E2E tests for critical user flows (create workflow, execute, save)

**Testing Stack**:
- Jest for unit tests
- React Testing Library for component tests
- Playwright for E2E tests (if not already in project, use Cypress as alternative)

### Additional Technical Assumptions

1. **Workflow Execution Engine**: Server-side execution using Node.js
   - Sequential execution based on node dependencies
   - Parallel execution for independent branches
   - Error handling and rollback for failed nodes

2. **Real-time Updates**: Server-Sent Events (SSE) or WebSockets for execution progress
   - Update frontend in real-time as nodes complete
   - Stream LLM responses to show progress

3. **File Uploads**: Support for input nodes that accept file uploads (future enhancement)

4. **Export/Import**: Workflows exported as JSON files following this schema:
```json
{
  "version": "1.0",
  "name": "Workflow Name",
  "nodes": [...],
  "edges": [...],
  "metadata": {
    "created": "ISO timestamp",
    "author": "user_id"
  }
}
```

5. **Deployment**: Vercel (existing) - no changes required

## Epic List

### Epic 1: Workflow Canvas Foundation
**Goal**: Establish the core canvas-based UI with React Flow, enabling users to visually see and manipulate workflow nodes. Deliver a functional canvas where users can add basic nodes and see them rendered, providing immediate value as a visual workflow viewer.

**Value**: Users can visualize workflow structure immediately, establishing the foundation for all subsequent features.

### Epic 2: Node Library & Drag-and-Drop
**Goal**: Implement the complete node library with drag-and-drop functionality, allowing users to build workflows by adding different node types to the canvas. Users can create complete workflow structures visually.

**Value**: Users can build workflows end-to-end using visual tools, making workflow creation accessible and intuitive.

### Epic 3: Node Configuration & Workflow Logic
**Goal**: Enable users to configure individual nodes (set prompts, choose models, define logic) and connect nodes to define workflow execution order. Users can create functional, executable workflows.

**Value**: Workflows become executable with business logic, transitioning from visual mockups to functional automation tools.

### Epic 4: Workflow Execution Engine
**Goal**: Build the server-side execution engine and integrate real-time execution visualization on the canvas. Users can run workflows and see results in real-time.

**Value**: Users can test and validate workflows immediately, enabling rapid iteration and debugging.

### Epic 5: Persistence & Templates
**Goal**: Implement save/load functionality and provide pre-built workflow templates. Users can persist their work and start from proven examples.

**Value**: Users can build a library of reusable workflows and learn from templates, accelerating adoption and productivity.

---

## Epic 1: Workflow Canvas Foundation

**Goal**: Establish the core canvas-based UI with React Flow, enabling users to visually see and manipulate workflow nodes. Deliver a functional canvas where users can add basic nodes and see them rendered, providing immediate value as a visual workflow viewer. This epic includes project setup, database schema, and the basic canvas infrastructure.

### Story 1.1: Project Setup & Dependencies
**As a** developer,
**I want** to set up the Lab 6 workflow builder project structure with all necessary dependencies,
**so that** I have a solid foundation to build the canvas UI.

#### Acceptance Criteria
1. Next.js app router structure created at `/app/dashboard/vibecoding/labs/lab6/`
2. React Flow library installed and verified (`reactflow` v11+)
3. Zustand installed for state management
4. TypeScript types configured for React Flow nodes and edges
5. Basic page renders at `/dashboard/vibecoding/labs/lab6` with empty canvas
6. Tailwind CSS configured and working with canvas components

### Story 1.2: Database Schema for Workflows
**As a** system,
**I want** to have database tables for storing workflows and execution history,
**so that** users' workflows can be persisted and retrieved.

#### Acceptance Criteria
1. `workflows` table created in Supabase with columns: id, user_id, name, description, nodes (jsonb), edges (jsonb), is_template, created_at, updated_at
2. `workflow_executions` table created with columns: id, workflow_id, user_id, status, input, output, execution_log, started_at, completed_at
3. Row Level Security (RLS) policies set up to ensure users can only access their own workflows
4. Database migration script created and tested
5. TypeScript types generated for database tables

### Story 1.3: Basic React Flow Canvas
**As a** user,
**I want** to see a blank workflow canvas when I open Lab 6,
**so that** I have a workspace ready for building workflows.

#### Acceptance Criteria
1. React Flow canvas renders in the main content area
2. Canvas includes Background component (dots or grid pattern)
3. Canvas includes Controls component (zoom in/out, fit view buttons)
4. Canvas includes MiniMap component in bottom-right corner
5. Canvas is responsive and fills available viewport space
6. Panning works by dragging on canvas background
7. Zooming works with mouse wheel

### Story 1.4: Workflow State Management
**As a** developer,
**I want** a centralized Zustand store for managing workflow state,
**so that** node and edge data is accessible across components.

#### Acceptance Criteria
1. Zustand store created with initial state: `nodes`, `edges`, `selectedNode`, `executionState`
2. Store actions implemented: `setNodes`, `setEdges`, `addNode`, `deleteNode`, `selectNode`, `updateNodeData`
3. React Flow hooks (`useNodesState`, `useEdgesState`) integrated with Zustand store
4. Store properly typed with TypeScript interfaces
5. DevTools integration for debugging store state (development only)

### Story 1.5: Basic Node Component
**As a** user,
**I want** to see a simple node rendered on the canvas,
**so that** I can verify the canvas is working with node components.

#### Acceptance Criteria
1. Custom `BasicNode` component created with Shadcn/ui styling
2. Node displays a label and icon
3. Node has input handle (left side) and output handle (right side)
4. Node has subtle shadow and rounded corners matching design system
5. Node can be dragged to reposition
6. Initial demo node added to canvas on page load for testing
7. Node selection state visually indicated (border highlight)

---

## Epic 2: Node Library & Drag-and-Drop

**Goal**: Implement the complete node library with drag-and-drop functionality, allowing users to build workflows by adding different node types to the canvas. Users can create complete workflow structures visually.

### Story 2.1: Node Type Definitions
**As a** developer,
**I want** to define all node types with their schemas and configurations,
**so that** I can create type-safe node components.

#### Acceptance Criteria
1. TypeScript interfaces defined for all node types: `StartNode`, `EndNode`, `LLMAgentNode`, `ClassifierNode`, `IfElseNode`, `GuardrailNode`, `ExtractorNode`, `TranslatorNode`
2. Each node type has a defined data schema (required fields, optional fields)
3. Node type registry created mapping type strings to component definitions
4. Default data values defined for each node type
5. Node type validation functions created

### Story 2.2: Node Library Sidebar
**As a** user,
**I want** to see a sidebar with categorized node types,
**so that** I can browse available nodes and understand what's possible.

#### Acceptance Criteria
1. Left sidebar component created with fixed width (256px)
2. Node types organized into categories: Control, Agents, Data, Guardrails
3. Each category has a collapsible section with heading
4. Each node type shows icon and label
5. Nodes are styled as draggable cards
6. Sidebar is scrollable if content exceeds viewport height
7. Sidebar has subtle background color to distinguish from canvas

### Story 2.3: Drag-and-Drop Node Creation
**As a** user,
**I want** to drag a node from the library and drop it on the canvas,
**so that** I can add nodes to my workflow.

#### Acceptance Criteria
1. Nodes in library are draggable (HTML5 drag API)
2. Canvas has drop handler that accepts dragged nodes
3. Dropped node appears at cursor position on canvas
4. New node gets unique ID (e.g., `llmAgent-{timestamp}`)
5. New node has default configuration based on type
6. Cursor shows "move" feedback during drag
7. Canvas shows drop zone indicator when dragging over it

### Story 2.4: Custom Node Components
**As a** user,
**I want** each node type to have a distinct visual appearance,
**so that** I can quickly identify node types in my workflow.

#### Acceptance Criteria
1. `StartNode` component: green circle with Play icon
2. `EndNode` component: red square with Stop icon
3. `LLMAgentNode` component: amber card with Sparkles icon and agent label
4. `ClassifierNode` component: blue card with Filter icon
5. `IfElseNode` component: yellow card with GitBranch icon, shows two output handles
6. `GuardrailNode` component: purple card with Shield icon
7. All nodes have consistent styling (shadow, rounded corners, hover effects)
8. Node icons use Lucide React icons

### Story 2.5: Edge Connections
**As a** user,
**I want** to connect nodes by dragging from one node's output to another's input,
**so that** I can define the flow of my workflow.

#### Acceptance Criteria
1. User can click and drag from output handle to create connection
2. Connection line follows cursor during drag
3. Connection completes when dropped on valid input handle
4. Invalid connections are rejected (e.g., output to output)
5. Edges have smooth bezier curves
6. Edge color is gray (#94a3b8) with 2px stroke width
7. Clicking an edge selects it (highlighted state)
8. Selected edges can be deleted with Delete key

### Story 2.6: Node and Edge Deletion
**As a** user,
**I want** to delete nodes and edges I no longer need,
**so that** I can modify my workflow.

#### Acceptance Criteria
1. Clicking a node selects it (highlighted border)
2. Pressing Delete key removes selected node
3. Deleting a node also removes all connected edges
4. Clicking an edge selects it
5. Pressing Delete key removes selected edge
6. Right-click context menu on node shows "Delete" option
7. Deletion updates Zustand store state

---

## Epic 3: Node Configuration & Workflow Logic

**Goal**: Enable users to configure individual nodes (set prompts, choose models, define logic) and connect nodes to define workflow execution order. Users can create functional, executable workflows.

### Story 3.1: Node Configuration Panel
**As a** user,
**I want** to click a node and see a configuration panel,
**so that** I can set node-specific parameters.

#### Acceptance Criteria
1. Right sidebar Sheet component slides in when node is selected
2. Panel shows node type, icon, and label at top
3. Panel is scrollable for long configuration forms
4. Close button (X) deselects node and closes panel
5. Panel width is 400px on desktop, full-width on mobile
6. Clicking canvas background deselects node and closes panel

### Story 3.2: LLM Agent Node Configuration
**As a** user,
**I want** to configure an LLM Agent node with prompt and model settings,
**so that** I can define what the agent should do.

#### Acceptance Criteria
1. Configuration form shows these fields: Agent Name, System Prompt (textarea), Model (select dropdown: gpt-4, gpt-3.5-turbo), Temperature (slider 0-1), Max Tokens (number input)
2. Form values are saved to node data on change (debounced)
3. Form uses Shadcn/ui components (Input, Textarea, Select, Slider)
4. Placeholder text guides user on what to enter
5. Model dropdown shows model names and descriptions
6. Changes persist in Zustand store
7. Node label updates to show Agent Name

### Story 3.3: Classifier Node Configuration
**As a** user,
**I want** to configure a Classifier node with categories,
**so that** I can route inputs to different paths based on classification.

#### Acceptance Criteria
1. Configuration form shows: Classifier Name, Classification Prompt, Categories (multi-input list)
2. User can add/remove categories dynamically
3. Each category has: name, description, output handle
4. Classifier node visually shows multiple output handles (one per category)
5. Output handles are labeled with category names
6. Changes update node data and re-render node component

### Story 3.4: If/Else Node Configuration
**As a** user,
**I want** to configure conditional logic in If/Else nodes,
**so that** I can create branching workflows.

#### Acceptance Criteria
1. Configuration form shows: Condition Type (select: contains, equals, regex, custom)
2. For "contains": input field for text to check
3. For "equals": input field for exact match value
4. For "regex": textarea for regex pattern
5. For "custom": JavaScript expression editor
6. Node has two output handles labeled "True" and "False"
7. Condition expression is validated before saving

### Story 3.5: Guardrail Node Configuration
**As a** user,
**I want** to configure guardrails to validate or filter content,
**so that** I can ensure output quality and safety.

#### Acceptance Criteria
1. Configuration form shows: Guardrail Type (select: content filter, hallucination check, safety validator)
2. Each type shows relevant sub-options
3. Content Filter: blocked words/phrases list
4. Hallucination Check: reference text input, similarity threshold slider
5. Safety Validator: category checkboxes (violence, sexual, hate speech)
6. Guardrail has "Pass" and "Fail" output handles
7. Configuration is validated before saving

### Story 3.6: Input/Output Node Configuration
**As a** user,
**I want** to define input parameters and output formats,
**so that** my workflow can accept data and return results.

#### Acceptance Criteria
1. Input Node config: Parameter Name, Type (text, number, file, json), Required checkbox, Default Value
2. User can add multiple input parameters
3. Output Node config: Output Format (json, text, markdown), Fields to include
4. Input/Output schema is validated
5. Workflow execution uses configured input/output schemas

---

## Epic 4: Workflow Execution Engine

**Goal**: Build the server-side execution engine and integrate real-time execution visualization on the canvas. Users can run workflows and see results in real-time.

### Story 4.1: Workflow Validation
**As a** user,
**I want** the system to validate my workflow before execution,
**so that** I get clear error messages if something is misconfigured.

#### Acceptance Criteria
1. Validation checks for: at least one Start node, at least one End node, all nodes have required inputs connected, no circular dependencies, all node configs complete
2. Validation runs automatically when user clicks "Run"
3. Validation errors displayed in status bar at bottom
4. Invalid nodes highlighted in red on canvas
5. Validation error messages are specific and actionable
6. Valid workflow shows success message

### Story 4.2: API Endpoint for Workflow Execution
**As a** system,
**I want** an API endpoint that accepts workflow definitions and executes them,
**so that** workflows can run server-side with proper error handling.

#### Acceptance Criteria
1. `POST /api/workflow/execute` endpoint created
2. Endpoint accepts: workflow nodes, edges, input parameters
3. Endpoint validates workflow structure
4. Endpoint returns execution ID immediately
5. Execution runs asynchronously in background
6. Execution status saved to `workflow_executions` table
7. Error handling returns meaningful error messages

### Story 4.3: Execution Engine Core
**As a** system,
**I want** an execution engine that processes workflow nodes in correct order,
**so that** complex workflows execute reliably.

#### Acceptance Criteria
1. Engine builds dependency graph from nodes and edges
2. Engine executes nodes in topological order
3. Sequential execution for dependent nodes
4. Parallel execution for independent branches
5. Each node's output becomes input for connected nodes
6. Execution halts on node error (or continues based on error handling config)
7. Execution logs every node execution with timestamps

### Story 4.4: LLM Agent Node Execution
**As a** system,
**I want** LLM Agent nodes to call OpenAI API with configured parameters,
**so that** AI-powered steps execute in the workflow.

#### Acceptance Criteria
1. Agent node executor reads node config (model, prompt, temperature, max_tokens)
2. Executor calls OpenAI API with streaming enabled
3. Streaming responses are captured and stored
4. Response text becomes node output
5. API errors are caught and logged
6. Rate limiting handled gracefully
7. Execution time tracked for each agent call

### Story 4.5: Real-time Execution Visualization
**As a** user,
**I want** to see my workflow execute in real-time on the canvas,
**so that** I can understand what's happening at each step.

#### Acceptance Criteria
1. "Run" button in top toolbar starts execution
2. Currently executing node highlighted with blue pulsing border
3. Completed nodes show green border
4. Failed nodes show red border
5. Edges animate (flowing dots) when data passes through
6. Execution progress updates using SSE or polling
7. User can cancel execution with "Stop" button

### Story 4.6: Execution Results Display
**As a** user,
**I want** to see the output of each node after execution,
**so that** I can debug and verify results.

#### Acceptance Criteria
1. Bottom panel opens during execution showing logs
2. Each node's output displayed in expandable section
3. Output formatted based on type (JSON formatted, text wrapped)
4. Execution timeline shows start/end times for each node
5. Error messages displayed prominently for failed nodes
6. Final workflow output highlighted
7. User can copy outputs to clipboard

---

## Epic 5: Persistence & Templates

**Goal**: Implement save/load functionality and provide pre-built workflow templates. Users can persist their work and start from proven examples.

### Story 5.1: Save Workflow
**As a** user,
**I want** to save my workflow with a name,
**so that** I can continue working on it later.

#### Acceptance Criteria
1. "Save" button in top toolbar opens save dialog
2. Dialog prompts for workflow name and description
3. Name is required, description is optional
4. Saving creates/updates record in `workflows` table
5. Current nodes and edges serialized as JSON
6. User ID associated with workflow for RLS
7. Success message shown after save
8. Workflow marked as "saved" in UI (indicator in toolbar)

### Story 5.2: Load Workflow
**As a** user,
**I want** to load a previously saved workflow,
**so that** I can continue editing it.

#### Acceptance Criteria
1. "Load" button opens workflow gallery dialog
2. Gallery shows user's saved workflows in grid layout
3. Each workflow shows: name, thumbnail (mini canvas), last modified date
4. Clicking workflow loads it onto canvas
5. Current unsaved work prompts "Save changes?" before loading
6. Loaded workflow nodes and edges populate canvas
7. Loaded workflow marked as current in UI

### Story 5.3: Workflow Gallery
**As a** user,
**I want** to see all my workflows in a gallery view,
**so that** I can manage and organize them.

#### Acceptance Criteria
1. Gallery accessible from home screen and "Load" dialog
2. Workflows displayed in card grid (3 columns on desktop)
3. Each card shows: thumbnail, name, description, last modified, "Open" button
4. Hover on card shows action menu: Open, Duplicate, Delete
5. Search box filters workflows by name
6. Sort options: Last Modified, Name (A-Z)
7. Empty state shows helpful message and "Create New" button

### Story 5.4: Pre-built Workflow Templates
**As a** user,
**I want** to start from pre-built templates,
**so that** I can learn best practices and get started quickly.

#### Acceptance Criteria
1. Templates stored in database with `is_template: true` flag
2. Template gallery accessible from home screen
3. Four templates provided:
   - **Customer Service Agent**: Classification → routing → response generation
   - **Content Generator**: Input → LLM generation → hallucination check → output
   - **Data Extraction**: Input → extraction agent → validation → structured output
   - **Translation Workflow**: Language detection → translator → quality check
4. Clicking template creates copy for user to edit
5. Templates have descriptions explaining use case
6. Template nodes pre-configured with example prompts

### Story 5.5: Export/Import Workflows
**As a** user,
**I want** to export workflows as JSON files,
**so that** I can share them or back them up.

#### Acceptance Criteria
1. "Export" button in toolbar opens export dialog
2. Export format is JSON with schema version, name, nodes, edges, metadata
3. Export downloads as `.json` file with sanitized workflow name
4. "Import" button accepts JSON file upload
5. Import validates JSON schema before loading
6. Import creates new workflow (doesn't overwrite existing)
7. Imported workflows marked as "imported" initially (unsaved)

### Story 5.6: Workflow Metadata & Settings
**As a** user,
**I want** to edit workflow metadata (name, description, tags),
**so that** I can organize my workflows better.

#### Acceptance Criteria
1. "Settings" button opens workflow settings dialog
2. Settings include: Name, Description, Tags (comma-separated)
3. Settings saved to `workflows` table on submit
4. Tags enable filtering in gallery
5. Settings dialog shows created date and last modified date (read-only)
6. User can mark workflow as "Favorite" (star icon)
7. Favorites shown at top of gallery

---

## Checklist Results Report

_(This section will be populated after running the pm-checklist task)_

## Next Steps

### UX Expert Prompt

As the UX Expert, please review this PRD and create a detailed front-end specification for the AI Workflow Builder, focusing on:
1. Detailed component designs for the canvas, node library, and configuration panels
2. Interaction patterns and micro-interactions (drag feedback, animations, state transitions)
3. Responsive breakpoints and mobile considerations
4. Accessibility features and keyboard navigation
5. Visual design guidelines for node types and edges
6. Error states and empty states

Reference the React Flow implementation details provided in this PRD and the visual style from the reference image (123.png).

### Architect Prompt

As the Architect, please review this PRD and create the system architecture document, focusing on:
1. Frontend architecture using Next.js, React Flow, and Zustand
2. Backend API design for workflow CRUD and execution endpoints
3. Database schema and relationships for Supabase
4. Workflow execution engine architecture (node processing, dependency resolution)
5. Integration with OpenAI API for LLM agent nodes
6. Real-time communication strategy (SSE vs WebSockets) for execution updates
7. Error handling and retry strategies
8. Performance optimization for large workflows
9. Security considerations (RLS policies, input validation, API rate limiting)

Use the existing VibeCoding Lab tech stack and infrastructure. Focus on making the execution engine robust and scalable.
