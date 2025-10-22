'use client'

/**
 * Lab 6, Section 6.5: Rebuild Lab 5
 * Try It Tab Content
 */

import { TryItContent } from '@/components/features/lab-sections'
import { EnhancedWorkflowBuilder } from '@/components/features/workflow/EnhancedWorkflowBuilder'

export default function TryIt() {
  return (
    <TryItContent
      instructions="Recreate the multi-step research workflow from Lab 5 as an automated workflow. Build all 4 steps and connect them with variables!"
      hideSuccessIndicator
    >
      <div className="space-y-4">
        <div className="bg-[rgba(59,153,156,0.05)] border-l-4 border-[#3b999c] p-6 rounded-lg">
          <h3 className="font-bold text-[#164055] mb-3">
            ✅ Your Task: Build a Complete Research Workflow
          </h3>
          <p className="text-gray-700 mb-4">
            Choose any research topic (e.g., "climate change", "ancient Egypt", "renewable energy") and build a 4-step workflow:
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-gray-700">
            <li>
              <strong>Node 1: "Research Facts"</strong>
              <br />
              <span className="text-sm">
                Gather 8-10 key facts about your chosen topic
              </span>
            </li>
            <li>
              <strong>Node 2: "Organize Info"</strong>
              <br />
              <span className="text-sm">
                Use <code className="bg-white px-2 py-1 rounded">{'{{Research Facts}}'}</code> to organize facts into categories
              </span>
            </li>
            <li>
              <strong>Node 3: "Verify Accuracy"</strong>
              <br />
              <span className="text-sm">
                Review <code className="bg-white px-2 py-1 rounded">{'{{Organize Info}}'}</code> for gaps or inaccuracies
              </span>
            </li>
            <li>
              <strong>Node 4: "Format Report"</strong>
              <br />
              <span className="text-sm">
                Format <code className="bg-white px-2 py-1 rounded">{'{{Verify Accuracy}}'}</code> as a student-friendly report
              </span>
            </li>
          </ol>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-lg">
          <p className="text-sm font-semibold text-yellow-700 mb-2">
            💡 Success Criteria
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
            <li>All 4 nodes are connected in sequence</li>
            <li>Each node uses variables from the previous step</li>
            <li>The final output is a complete, well-formatted report</li>
            <li>You can change the topic and rerun to get a new report</li>
          </ul>
        </div>

        {/* Workflow Builder */}
        <div className="rounded-lg border-2 border-[#3b999c] bg-white overflow-hidden">
          <div className="bg-[#3b999c] text-white px-6 py-3 font-semibold">
            Research Workflow Canvas
          </div>
          <div className="h-[650px]">
            <EnhancedWorkflowBuilder />
          </div>
        </div>

        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-green-700 mb-3">
            🎉 Challenge: Test with Different Topics
          </h4>
          <p className="text-gray-700 mb-3">
            Once your workflow works with one topic, test it with completely different ones:
          </p>
          <div className="grid md:grid-cols-3 gap-2 text-sm">
            <div className="bg-white border border-green-300 rounded p-2">
              🌍 Climate change
            </div>
            <div className="bg-white border border-green-300 rounded p-2">
              🏛️ Ancient civilizations
            </div>
            <div className="bg-white border border-green-300 rounded p-2">
              🚀 Space exploration
            </div>
            <div className="bg-white border border-green-300 rounded p-2">
              🧬 DNA and genetics
            </div>
            <div className="bg-white border border-green-300 rounded p-2">
              🤖 Artificial intelligence
            </div>
            <div className="bg-white border border-green-300 rounded p-2">
              🎨 Renaissance art
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3 italic">
            A good workflow should work for any topic without changing the structure!
          </p>
        </div>
      </div>
    </TryItContent>
  )
}
