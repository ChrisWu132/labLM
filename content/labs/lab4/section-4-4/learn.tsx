/**
 * Lab 4, Section 4.4: Verification
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        How to Verify AI Outputs
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        You now know that AI can make mistakes and even hallucinate. So how do you know when to trust AI outputs? Let's learn verification strategies!
      </p>

      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-red-700 mb-2">
          ⚠️ Critical Rule
        </p>
        <p className="text-gray-700">
          <strong>Never blindly trust AI for important decisions.</strong> Always verify critical information like medical advice, legal matters, financial decisions, or facts you'll use in school or work.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        The Verification Toolkit
      </h3>

      <div className="space-y-6 mb-8">
        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6">
          <h4 className="text-xl font-bold text-[#3b999c] mb-3">
            1. Cross-Reference Multiple Sources
          </h4>
          <p className="text-gray-700 mb-3">
            Don't rely on AI alone. Check the information against other reliable sources.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-700 mb-2">How to do it:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600">
              <li>Search for the same topic on Google or Wikipedia</li>
              <li>Check official sources (government sites, universities, experts)</li>
              <li>Look for multiple sources that agree</li>
              <li>If sources disagree, investigate further</li>
            </ul>
          </div>
        </div>

        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6">
          <h4 className="text-xl font-bold text-[#3b999c] mb-3">
            2. Check for Specificity Red Flags
          </h4>
          <p className="text-gray-700 mb-3">
            Be skeptical when AI provides very specific details without sources.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-700 mb-2">Warning signs:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600">
              <li>🚩 Exact dates or numbers (especially for recent events)</li>
              <li>🚩 Direct quotes without attribution</li>
              <li>🚩 Very specific statistics or percentages</li>
              <li>🚩 Claims that seem "too perfect" or convenient</li>
            </ul>
          </div>
        </div>

        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6">
          <h4 className="text-xl font-bold text-[#3b999c] mb-3">
            3. Ask for Uncertainty
          </h4>
          <p className="text-gray-700 mb-3">
            Prompt AI to indicate when it's uncertain.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-700 mb-2">Better prompts:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600">
              <li>"Explain X, and note if you're uncertain about any details"</li>
              <li>"Tell me what you're confident about vs. what might need verification"</li>
              <li>"If you don't know, please say so rather than guessing"</li>
            </ul>
          </div>
        </div>

        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6">
          <h4 className="text-xl font-bold text-[#3b999c] mb-3">
            4. Use Common Sense
          </h4>
          <p className="text-gray-700 mb-3">
            Does the answer make sense? Apply critical thinking!
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-700 mb-2">Ask yourself:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600">
              <li>Does this align with what I already know?</li>
              <li>Is this claim realistic and reasonable?</li>
              <li>Would an expert agree with this?</li>
              <li>Are there any logical contradictions?</li>
            </ul>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        When to Trust vs. Verify
      </h3>

      <div className="overflow-x-auto rounded-2xl border-2 border-gray-200 shadow-sm bg-white mb-8">
        <table className="w-full text-left border-collapse">
          <thead style={{ backgroundColor: '#f7aa37' }}>
            <tr>
              <th className="px-6 py-4 font-semibold text-white">Use Case</th>
              <th className="px-6 py-4 font-semibold text-white">Trust Level</th>
              <th className="px-6 py-4 font-semibold text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 text-gray-700">Brainstorming ideas</td>
              <td className="px-6 py-4"><span className="text-green-600 font-semibold">High ✓</span></td>
              <td className="px-6 py-4 text-sm text-gray-600">Use directly, ideas don't need verification</td>
            </tr>
            <tr className="border-t border-gray-200 bg-gray-50">
              <td className="px-6 py-4 text-gray-700">Learning concepts</td>
              <td className="px-6 py-4"><span className="text-green-600 font-semibold">High ✓</span></td>
              <td className="px-6 py-4 text-sm text-gray-600">Good for understanding, cross-check key facts</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 text-gray-700">Historical facts</td>
              <td className="px-6 py-4"><span className="text-yellow-600 font-semibold">Medium ~</span></td>
              <td className="px-6 py-4 text-sm text-gray-600">Verify dates and specific details</td>
            </tr>
            <tr className="border-t border-gray-200 bg-gray-50">
              <td className="px-6 py-4 text-gray-700">Homework answers</td>
              <td className="px-6 py-4"><span className="text-orange-600 font-semibold">Low ~</span></td>
              <td className="px-6 py-4 text-sm text-gray-600">Use for understanding, verify before submitting</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 text-gray-700">Medical/Legal advice</td>
              <td className="px-6 py-4"><span className="text-red-600 font-semibold">None ✗</span></td>
              <td className="px-6 py-4 text-sm text-gray-600">Consult real professionals only</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
        <h4 className="font-bold text-blue-800 mb-3">
          🎯 The Verification Checklist
        </h4>

        <p className="text-gray-700 mb-3">Before trusting AI output for anything important:</p>

        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <span className="font-bold">☐</span>
            <span>Cross-reference with at least 2 other reliable sources</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold">☐</span>
            <span>Check if AI indicated any uncertainty</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold">☐</span>
            <span>Apply common sense - does it make sense?</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold">☐</span>
            <span>Consider the stakes - how important is accuracy?</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold">☐</span>
            <span>Ask an expert if available (teacher, parent, professional)</span>
          </div>
        </div>
      </div>
    </LearnContent>
  )
}
