'use client'

/**
 * Lab 6, Section 6.4: Using Variables
 * Try It Tab Content
 */

import { TryItContent } from '@/components/features/lab-sections'
import { EnhancedWorkflowBuilder } from '@/components/features/workflow/EnhancedWorkflowBuilder'

export default function TryIt() {
  return (
    <TryItContent
      instructions="Build a 3-step workflow that uses variables to pass data between steps. Practice using the {{node_name}} syntax!"
      hideSuccessIndicator
    >
      <div className="space-y-4">
        <div className="bg-[rgba(59,153,156,0.05)] border-l-4 border-[#3b999c] p-6 rounded-lg">
          <h3 className="font-bold text-[#164055] mb-3">
            Your Task: Build a Research Workflow with Variables
          </h3>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li>
              <strong>Node 1: "Find Topics"</strong>
              <br />
              <span className="text-sm">
                Prompt: "List 5 topics about [your subject]"
              </span>
            </li>
            <li>
              <strong>Node 2: "Explain Topic"</strong>
              <br />
              <span className="text-sm">
                Prompt: "From this list: <code className="bg-white px-2 py-1 rounded">{'{{Find Topics}}'}</code>, explain the first topic in detail"
              </span>
            </li>
            <li>
              <strong>Node 3: "Create Quiz"</strong>
              <br />
              <span className="text-sm">
                Prompt: "Based on: <code className="bg-white px-2 py-1 rounded">{'{{Explain Topic}}'}</code>, create 3 quiz questions"
              </span>
            </li>
            <li>
              <strong>Connect all three nodes in order</strong>
            </li>
            <li>
              <strong>Run and verify variables work!</strong>
            </li>
          </ol>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-lg">
          <p className="text-sm font-semibold text-yellow-700 mb-2">
            Variable Checklist
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
            <li>Node names must be unique and descriptive</li>
            <li>Use exact node name in {'{{double_braces}}'}</li>
            <li>Check spelling - "Find Topics" ≠ "FindTopics"</li>
            <li>Variables can only reference nodes that run before them</li>
          </ul>
        </div>

        {/* Workflow Builder */}
        <div className="rounded-lg border-2 border-[#3b999c] bg-white overflow-hidden">
          <div className="bg-[#3b999c] text-white px-6 py-3 font-semibold">
            Variable Practice Canvas
          </div>
          <div className="h-[600px]">
            <EnhancedWorkflowBuilder />
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-blue-700 mb-3">
            Verify Your Variables
          </h4>
          <p className="text-gray-700 mb-3">
            After running your workflow, check:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
            <li>Does Step 2's prompt show content from Step 1?</li>
            <li>Does Step 3's prompt include Step 2's explanation?</li>
            <li>Are the quiz questions relevant to the topic from Step 1?</li>
          </ul>
          <p className="text-sm text-gray-600 mt-3 italic">
            If you see error messages about undefined variables, double-check your node names!
          </p>
        </div>
      </div>
    </TryItContent>
  )
}
