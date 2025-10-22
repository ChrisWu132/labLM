/**
 * Lab 6, Section 6.5: Rebuild Lab 5
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Real-World Application: Rebuild Lab 5 Workflow
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        Remember Lab 5, Section 5.5 where you manually performed multi-step research? Now you'll automate it!
      </p>

      <div className="bg-[rgba(59,153,156,0.05)] border-l-4 border-[#3b999c] p-6 rounded-lg mb-8">
        <h3 className="font-bold text-[#164055] mb-3">
          From Manual to Automated
        </h3>
        <div className="space-y-3">
          <div>
            <div className="font-semibold text-gray-700 mb-1">Before (Manual):</div>
            <p className="text-sm text-gray-600">
              1. Ask AI for topics → 2. Copy output → 3. Paste into new prompt → 4. Copy again → 5. Paste again...
            </p>
          </div>
          <div className="bg-green-50 p-3 rounded">
            <div className="font-semibold text-green-700 mb-1">After (Workflow):</div>
            <p className="text-sm text-gray-700">
              1. Build workflow once → 2. Click "Run" → 3. Done!
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        The Research Workflow Pattern
      </h3>

      <p className="text-gray-700 mb-6">
        This is a common pattern you'll use over and over for research tasks:
      </p>

      <div className="space-y-4 mb-8">
        <div className="flex items-start gap-4 bg-white border-2 border-blue-300 rounded-lg p-5">
          <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shrink-0">
            1
          </div>
          <div>
            <h4 className="font-bold text-[#164055] mb-1">Gather Information</h4>
            <p className="text-sm text-gray-700">
              Collect initial data, facts, or ideas on a topic
            </p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
              "Research key facts about [topic]"
            </code>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-white border-2 border-purple-300 rounded-lg p-5">
          <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold shrink-0">
            2
          </div>
          <div>
            <h4 className="font-bold text-[#164055] mb-1">Organize & Summarize</h4>
            <p className="text-sm text-gray-700">
              Structure the information in a clear format
            </p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
              "Organize these facts: {'{{Gather Information}}'} into categories"
            </code>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-white border-2 border-green-300 rounded-lg p-5">
          <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold shrink-0">
            3
          </div>
          <div>
            <h4 className="font-bold text-[#164055] mb-1">Verify & Critique</h4>
            <p className="text-sm text-gray-700">
              Check for accuracy and identify gaps
            </p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
              "Review this summary: {'{{Organize & Summarize}}'} for accuracy"
            </code>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-white border-2 border-orange-300 rounded-lg p-5">
          <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold shrink-0">
            4
          </div>
          <div>
            <h4 className="font-bold text-[#164055] mb-1">Format for Output</h4>
            <p className="text-sm text-gray-700">
              Present in final desired format (report, presentation, etc.)
            </p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
              "Format as a student report: {'{{Verify & Critique}}'}"
            </code>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          Pro Tip: Templates
        </p>
        <p className="text-gray-700">
          Once you build a workflow pattern that works well, you can save it as a <strong>template</strong> and reuse it for different topics! Just change the initial input and run it again.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Your Task
      </h3>

      <div className="bg-gradient-to-r from-[#3b999c]/10 to-[#f7aa37]/10 border-2 border-[#3b999c] rounded-xl p-6 mb-8">
        <p className="text-gray-700 mb-4">
          In the Try It tab, you'll recreate the research workflow from Lab 5 Section 5.5 as an automated workflow. Your workflow should:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Start with a research topic input</li>
          <li>Gather key information</li>
          <li>Organize and summarize</li>
          <li>Check for accuracy</li>
          <li>Format as a final report</li>
        </ul>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-sm font-semibold text-blue-700 mb-2">
          Learning Goal
        </p>
        <p className="text-gray-700">
          By the end of this section, you'll understand how to transform any manual multi-step process into an automated workflow. This skill is incredibly valuable for schoolwork, projects, and real-world tasks!
        </p>
      </div>
    </LearnContent>
  )
}
