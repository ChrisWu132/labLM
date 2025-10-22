/**
 * Lab 6, Section 6.7: Create Your Own
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Create Your Own Workflow from Scratch
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        This is it - the final challenge! Now you'll design and build a completely original workflow for a task that matters to YOU.
      </p>

      <div className="bg-gradient-to-r from-[#3b999c]/10 to-[#f7aa37]/10 border-2 border-[#3b999c] rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-[#164055] mb-4">
          Your Challenge
        </h3>
        <p className="text-gray-700">
          Think of a multi-step task you do regularly for school, hobbies, or life. Break it down into steps and automate it with a workflow!
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Step 1: Choose Your Task
      </h3>

      <p className="text-gray-700 mb-4">
        Good workflow candidates are tasks that:
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white border-2 border-green-400 rounded-lg p-5">
          <div className="text-2xl mb-2"></div>
          <h4 className="font-bold text-green-700 mb-2">Good Candidates</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li> Have 3+ distinct steps</li>
            <li> Involve text processing</li>
            <li> You do repeatedly</li>
            <li> Take significant time manually</li>
            <li> Follow a consistent pattern</li>
          </ul>
        </div>

        <div className="bg-white border-2 border-red-400 rounded-lg p-5">
          <div className="text-2xl mb-2"></div>
          <h4 className="font-bold text-red-700 mb-2">Avoid</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li> Single-step tasks</li>
            <li> Tasks requiring real-time data</li>
            <li> Tasks needing external tools</li>
            <li> Math-heavy calculations</li>
            <li> Image or video processing</li>
          </ul>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Step 2: Design Your Workflow
      </h3>

      <div className="bg-white border-2 border-blue-300 rounded-xl p-6 mb-8">
        <h4 className="font-bold text-blue-700 mb-3">
          Use the "5W" Framework
        </h4>
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-24 font-bold text-blue-600 shrink-0">What:</div>
            <p className="text-gray-700">What task are you automating?</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-24 font-bold text-blue-600 shrink-0">Why:</div>
            <p className="text-gray-700">Why does this need automation?</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-24 font-bold text-blue-600 shrink-0">When:</div>
            <p className="text-gray-700">When will you use this workflow?</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-24 font-bold text-blue-600 shrink-0">Where:</div>
            <p className="text-gray-700">Where does the input come from?</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-24 font-bold text-blue-600 shrink-0">Who:</div>
            <p className="text-gray-700">Who is the target audience for outputs?</p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Step 3: Break Down into Steps
      </h3>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-3">
          Example: Homework Helper
        </p>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Task:</strong> Convert class notes into study materials</p>
          <p><strong>Steps:</strong></p>
          <ol className="list-decimal pl-6 space-y-1 mt-2">
            <li>Input: Raw class notes</li>
            <li>Extract key concepts</li>
            <li>Generate practice questions</li>
            <li>Create answer explanations</li>
            <li>Format as flashcards</li>
          </ol>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Workflow Ideas to Inspire You
      </h3>

      <div className="grid md:grid-cols-2 gap-3 mb-8">
        <div className="bg-white border border-[#3b999c] rounded p-4">
          <div className="font-bold text-[#164055] mb-1"> Email Composer</div>
          <p className="text-xs text-gray-600">Draft → Formalize → Proofread → Add context</p>
        </div>
        <div className="bg-white border border-[#3b999c] rounded p-4">
          <div className="font-bold text-[#164055] mb-1"> Speech Writer</div>
          <p className="text-xs text-gray-600">Topic → Outline → Add examples → Add transitions</p>
        </div>
        <div className="bg-white border border-[#3b999c] rounded p-4">
          <div className="font-bold text-[#164055] mb-1"> Book Summarizer</div>
          <p className="text-xs text-gray-600">Extract themes → Character analysis → Plot summary → Key quotes</p>
        </div>
        <div className="bg-white border border-[#3b999c] rounded p-4">
          <div className="font-bold text-[#164055] mb-1"> Project Planner</div>
          <p className="text-xs text-gray-600">Goal → Break into milestones → Create tasks → Estimate time</p>
        </div>
        <div className="bg-white border border-[#3b999c] rounded p-4">
          <div className="font-bold text-[#164055] mb-1"> Fact Checker</div>
          <p className="text-xs text-gray-600">Claim → Find sources → Verify → Explain confidence level</p>
        </div>
        <div className="bg-white border border-[#3b999c] rounded p-4">
          <div className="font-bold text-[#164055] mb-1"> Debate Prep</div>
          <p className="text-xs text-gray-600">Topic → Pro arguments → Con arguments → Rebuttals</p>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-blue-700 mb-2">
          Success Criteria
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
          <li>At least 3 steps (aim for 4-6)</li>
          <li>Uses variables to pass data between steps</li>
          <li>Produces useful output you'd actually use</li>
          <li>Can run multiple times with different inputs</li>
          <li>Nodes are clearly named and organized</li>
        </ul>
      </div>

      <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-green-700 mb-3">
          Ready to Build?
        </h4>
        <p className="text-gray-700 mb-3">
          Head to the Try It tab with your workflow idea in mind. Take your time designing it - great workflows come from thoughtful planning!
        </p>
        <p className="text-sm text-gray-600 italic">
          Remember: There's no "right" answer. The best workflow is one that solves a real problem for YOU.
        </p>
      </div>
    </LearnContent>
  )
}
