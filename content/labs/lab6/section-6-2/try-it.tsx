'use client'

/**
 * Lab 6, Section 6.2: Guided Tour
 * Try It Tab Content
 */

import { TryItContent } from '@/components/features/lab-sections'
import { EnhancedWorkflowBuilder } from '@/components/features/workflow/EnhancedWorkflowBuilder'

export default function TryIt() {
  return (
    <TryItContent
      instructions="Explore the Workflow Builder interface! Try clicking on different areas, hovering over nodes, and checking out the node library on the left. Don't worry about breaking anything - this is your practice space!"
      hideSuccessIndicator
    >
      <div className="space-y-4">
        <div className="bg-[rgba(59,153,156,0.05)] border-l-4 border-[#3b999c] p-6 rounded-lg">
          <h3 className="font-bold text-[#164055] mb-3">
            🗺️ Guided Exploration Tasks
          </h3>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>
              <strong>Find the Node Library:</strong> Look for the panel on the left side with different node types.
            </li>
            <li>
              <strong>Try Adding a Node:</strong> Drag an "AI Prompt" node from the library onto the canvas.
            </li>
            <li>
              <strong>Click on a Node:</strong> Select a node to see its configuration panel appear on the right.
            </li>
            <li>
              <strong>Explore the Controls:</strong> Check out the buttons at the top (Run, Save, Clear, etc.).
            </li>
            <li>
              <strong>Move Things Around:</strong> Try dragging nodes to different positions on the canvas.
            </li>
          </ol>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-lg">
          <p className="text-sm font-semibold text-yellow-700 mb-2">
            💡 Tips for Exploration
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
            <li>Use mouse wheel or pinch to zoom in/out</li>
            <li>Click and drag on empty space to pan around</li>
            <li>Right-click on a node to see more options</li>
            <li>Don't worry about breaking anything - you can always refresh!</li>
          </ul>
        </div>

        {/* Workflow Builder */}
        <div className="rounded-lg border-2 border-[#3b999c] bg-white overflow-hidden">
          <div className="bg-[#3b999c] text-white px-6 py-3 font-semibold">
            Workflow Builder - Practice Canvas
          </div>
          <div className="h-[600px]">
            <EnhancedWorkflowBuilder />
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-5 rounded-lg">
          <p className="text-sm font-semibold text-blue-700 mb-2">
            🎯 What to Notice
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
            <li>
              <strong>Node Library (Left):</strong> Contains different types of nodes you can add
            </li>
            <li>
              <strong>Canvas (Center):</strong> Your workspace for building workflows
            </li>
            <li>
              <strong>Configuration (Right):</strong> Appears when you select a node
            </li>
            <li>
              <strong>Control Buttons (Top):</strong> Run, save, and manage your workflow
            </li>
          </ul>
        </div>

        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-green-700 mb-3">
            ✅ When You're Ready
          </h4>
          <p className="text-gray-700 mb-3">
            Once you've explored the interface and feel comfortable with the basic layout, move on to the next section where you'll build your first real workflow!
          </p>
          <p className="text-sm text-gray-600 italic">
            Tip: There's no "completion" requirement for this section - it's all about getting comfortable with the interface.
          </p>
        </div>
      </div>
    </TryItContent>
  )
}
