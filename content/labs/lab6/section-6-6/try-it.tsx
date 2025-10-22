'use client'

/**
 * Lab 6, Section 6.6: Customize Template
 * Try It Tab Content
 */

import { TryItContent } from '@/components/features/lab-sections'
import { EnhancedWorkflowBuilder } from '@/components/features/workflow/EnhancedWorkflowBuilder'

export default function TryIt() {
  return (
    <TryItContent
      instructions="Pick a workflow template idea and customize it for your specific needs. Modify prompts, add/remove steps, and make it your own!"
      hideSuccessIndicator
    >
      <div className="space-y-4">
        <div className="bg-[rgba(59,153,156,0.05)] border-l-4 border-[#3b999c] p-6 rounded-lg">
          <h3 className="font-bold text-[#164055] mb-3">
            ✅ Your Task: Customize a Workflow Template
          </h3>
          <p className="text-gray-700 mb-4">
            Choose one of these template ideas, build it, then customize it for your specific needs:
          </p>

          <div className="space-y-3">
            <div className="bg-white border-2 border-blue-400 rounded-lg p-4">
              <h4 className="font-bold text-blue-700 mb-2">Option 1: Essay Writer</h4>
              <p className="text-sm text-gray-600 mb-2">Base Steps:</p>
              <ol className="text-xs text-gray-700 list-decimal pl-5 space-y-1">
                <li>Topic → Generate thesis ideas</li>
                <li>Select best thesis → Create outline</li>
                <li>Outline → Write introduction</li>
                <li>Outline → Write body paragraphs</li>
              </ol>
              <p className="text-xs text-blue-600 mt-2">
                <strong>Customize:</strong> Add style requirements, audience level, or specific formatting
              </p>
            </div>

            <div className="bg-white border-2 border-purple-400 rounded-lg p-4">
              <h4 className="font-bold text-purple-700 mb-2">Option 2: Story Creator</h4>
              <p className="text-sm text-gray-600 mb-2">Base Steps:</p>
              <ol className="text-xs text-gray-700 list-decimal pl-5 space-y-1">
                <li>Theme → Generate character ideas</li>
                <li>Character → Create setting</li>
                <li>Setting + Character → Plot outline</li>
                <li>Plot → Write opening scene</li>
              </ol>
              <p className="text-xs text-purple-600 mt-2">
                <strong>Customize:</strong> Specify genre, tone, or target age group
              </p>
            </div>

            <div className="bg-white border-2 border-green-400 rounded-lg p-4">
              <h4 className="font-bold text-green-700 mb-2">Option 3: Problem Solver</h4>
              <p className="text-sm text-gray-600 mb-2">Base Steps:</p>
              <ol className="text-xs text-gray-700 list-decimal pl-5 space-y-1">
                <li>Problem → Identify root causes</li>
                <li>Causes → Generate solution ideas</li>
                <li>Ideas → Evaluate pros/cons</li>
                <li>Best solution → Action plan</li>
              </ol>
              <p className="text-xs text-green-600 mt-2">
                <strong>Customize:</strong> Add specific constraints or evaluation criteria
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-lg">
          <p className="text-sm font-semibold text-yellow-700 mb-2">
            💡 Customization Ideas
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
            <li><strong>Change the audience:</strong> "for middle schoolers", "for beginners"</li>
            <li><strong>Add constraints:</strong> "under 200 words", "using simple vocabulary"</li>
            <li><strong>Specify format:</strong> "as bullet points", "in paragraph form"</li>
            <li><strong>Add quality checks:</strong> Extra verification or critique steps</li>
            <li><strong>Remove unnecessary steps:</strong> Streamline for your specific use case</li>
          </ul>
        </div>

        {/* Workflow Builder */}
        <div className="rounded-lg border-2 border-[#3b999c] bg-white overflow-hidden">
          <div className="bg-[#3b999c] text-white px-6 py-3 font-semibold">
            Template Customization Canvas
          </div>
          <div className="h-[650px]">
            <EnhancedWorkflowBuilder />
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-blue-700 mb-3">
            🔍 Testing Your Customization
          </h4>
          <p className="text-gray-700 mb-3">
            After customizing, test your workflow:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
            <li>Run it with real input data</li>
            <li>Check if outputs match your expectations</li>
            <li>Refine prompts if needed</li>
            <li>Test with different inputs to verify it's flexible</li>
          </ul>
        </div>

        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-green-700 mb-3">
            🎉 Bonus Challenge
          </h4>
          <p className="text-gray-700 mb-3">
            Once your customized workflow works well, try:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
            <li>Adding a creative twist (e.g., "write in rhyme", "make it funny")</li>
            <li>Combining two templates into one mega-workflow</li>
            <li>Creating a version for a completely different subject area</li>
          </ul>
        </div>
      </div>
    </TryItContent>
  )
}
