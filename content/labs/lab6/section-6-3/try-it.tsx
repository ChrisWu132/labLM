'use client'

/**
 * Lab 6, Section 6.3: First Workflow
 * Try It Tab Content
 */

import { TryItContent } from '@/components/features/lab-sections'
import { EnhancedWorkflowBuilder } from '@/components/features/workflow/EnhancedWorkflowBuilder'

export default function TryIt() {
  return (
    <TryItContent
      instructions="Build your first 2-step workflow following the instructions from the Learn tab. Create a 'Generate Ideas' node and an 'Expand Idea' node, connect them, and run the workflow!"
      hideSuccessIndicator
    >
      <div className="space-y-4">
        <div className="bg-[rgba(59,153,156,0.05)] border-l-4 border-[#3b999c] p-6 rounded-lg">
          <h3 className="font-bold text-[#164055] mb-3">
            Your Task: Build a 2-Step Story Generator
          </h3>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>
              <strong>Add Node 1:</strong> "Generate Ideas" - prompt to generate 3 story ideas
            </li>
            <li>
              <strong>Add Node 2:</strong> "Expand Idea" - prompt to expand first idea into outline
            </li>
            <li>
              <strong>Connect them:</strong> Draw a line from Node 1 output to Node 2 input
            </li>
            <li>
              <strong>Run!</strong> Click the Run button and watch the magic happen
            </li>
          </ol>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-lg">
          <p className="text-sm font-semibold text-yellow-700 mb-2">
            Troubleshooting Tips
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
            <li>If nodes won't connect, make sure they're close enough together</li>
            <li>Click on a node to edit its prompt in the right panel</li>
            <li>Use the "Clear" button if you want to start over</li>
            <li>Check that your prompts are clear and specific</li>
          </ul>
        </div>

        {/* Workflow Builder */}
        <div className="rounded-lg border-2 border-[#3b999c] bg-white overflow-hidden">
          <div className="bg-[#3b999c] text-white px-6 py-3 font-semibold">
            Your Workflow Canvas
          </div>
          <div className="h-[600px]">
            <EnhancedWorkflowBuilder />
          </div>
        </div>

        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-green-700 mb-3">
            Challenge: Try Different Topics!
          </h4>
          <p className="text-gray-700 mb-3">
            Once you've successfully run your workflow with "space exploration", try changing the topic in the first node's prompt:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
            <li>"underwater adventure"</li>
            <li>"time travel"</li>
            <li>"robot friendship"</li>
            <li>...or any topic you like!</li>
          </ul>
        </div>
      </div>
    </TryItContent>
  )
}
