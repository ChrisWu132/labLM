'use client'

/**
 * Lab 6, Section 6.7: Create Your Own
 * Try It Tab Content
 */

import { TryItContent } from '@/components/features/lab-sections'
import { EnhancedWorkflowBuilder } from '@/components/features/workflow/EnhancedWorkflowBuilder'

export default function TryIt() {
  return (
    <TryItContent
      instructions="Design and build your own original workflow from scratch! Choose a task you actually need, break it into steps, and bring it to life."
      hideSuccessIndicator
    >
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-[#3b999c]/10 to-[#f7aa37]/10 border-2 border-[#3b999c] rounded-lg p-6">
          <h3 className="font-bold text-[#164055] mb-4">
            Your Creative Challenge
          </h3>
          <p className="text-gray-700 mb-4">
            Build a workflow that solves a real problem for you. This is your chance to create something genuinely useful!
          </p>

          <div className="bg-white rounded-lg p-5 space-y-3">
            <h4 className="font-semibold text-[#164055] mb-2">Planning Checklist:</h4>
            <div className="space-y-2 text-sm">
              <label className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span className="text-gray-700">I've chosen a task that has 3+ steps</span>
              </label>
              <label className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span className="text-gray-700">I know what the input will be</span>
              </label>
              <label className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span className="text-gray-700">I know what output I want</span>
              </label>
              <label className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span className="text-gray-700">I've broken the task into logical steps</span>
              </label>
              <label className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span className="text-gray-700">I know how data flows between steps</span>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-lg">
          <p className="text-sm font-semibold text-yellow-700 mb-2">
            Build Tips
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
            <li>Start simple - build 2 nodes first, test, then add more</li>
            <li>Give nodes descriptive names that explain their purpose</li>
            <li>Write clear, specific prompts - avoid vague instructions</li>
            <li>Test with real input data as you build</li>
            <li>Use variables {'{{node_name}}'} to connect steps</li>
            <li>Don't hesitate to revise and refine!</li>
          </ul>
        </div>

        {/* Workflow Builder */}
        <div className="rounded-lg border-2 border-[#3b999c] bg-white overflow-hidden">
          <div className="bg-gradient-to-r from-[#3b999c] to-[#f7aa37] text-white px-6 py-3 font-semibold">
            Your Original Workflow Canvas
          </div>
          <div className="h-[700px]">
            <EnhancedWorkflowBuilder />
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-blue-700 mb-3">
            Testing Your Workflow
          </h4>
          <p className="text-gray-700 mb-3">
            Once you've built your workflow, run through this test:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-sm text-gray-700">
            <li>Run it with real input data - does it produce the expected output?</li>
            <li>Check each step - is the output from each node useful for the next?</li>
            <li>Try different inputs - does it handle variations well?</li>
            <li>Ask yourself: "Would I actually use this?"</li>
            <li>Refine any steps that didn't work as expected</li>
          </ol>
        </div>

        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-green-700 mb-3">
            When You're Done
          </h4>
          <p className="text-gray-700 mb-4">
            Congratulations! You've just built your first original AI workflow from scratch. This is a valuable skill that you can apply to countless tasks.
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-700">
              <strong>Next steps you can explore:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
              <li>Save your workflow and use it regularly</li>
              <li>Build variations for different scenarios</li>
              <li>Share your workflow idea with classmates</li>
              <li>Think about other tasks you could automate</li>
            </ul>
          </div>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-400 p-5 rounded-lg">
          <p className="text-sm font-semibold text-purple-700 mb-2">
            Challenge Yourself
          </p>
          <p className="text-sm text-gray-700 mb-2">
            If you finish early and want to push yourself further:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-xs text-gray-700">
            <li>Build a 6+ step workflow for a complex task</li>
            <li>Create a workflow that branches (multiple paths)</li>
            <li>Design a workflow for a completely unique/creative purpose</li>
            <li>Optimize your workflow to use fewer steps while maintaining quality</li>
          </ul>
        </div>
      </div>
    </TryItContent>
  )
}
