/**
 * Lab 5, Section 5.4: Critical Thinking
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Critical Thinking: Question Everything
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        AI is powerful, but it's not perfect. One of the most important skills you can develop is thinking critically about AI outputs. Don't just accept what AI tells you—verify, question, and think for yourself!
      </p>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          ⚠️ Remember
        </p>
        <p className="text-gray-700 text-lg">
          AI can make mistakes, have biases, and even make up information (hallucinations). Your job is to think critically about what it tells you!
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Why AI Needs Critical Thinking
      </h3>

      <div className="space-y-4 mb-8">
        <div className="bg-white border-2 border-orange-400 rounded-xl p-6">
          <h4 className="text-lg font-bold text-orange-700 mb-3">
            1. AI Can Make Mistakes
          </h4>
          <p className="text-gray-700 mb-3">
            AI predicts what words should come next based on patterns. Sometimes those predictions are wrong, especially with:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Math calculations (it's not a calculator!)</li>
            <li>Current events (its training data has a cutoff date)</li>
            <li>Specific factual details (dates, numbers, names)</li>
            <li>Technical or specialized information</li>
          </ul>
        </div>

        <div className="bg-white border-2 border-purple-400 rounded-xl p-6">
          <h4 className="text-lg font-bold text-purple-700 mb-3">
            2. AI Can "Hallucinate"
          </h4>
          <p className="text-gray-700 mb-3">
            Sometimes AI generates information that sounds believable but is completely made up! This is called a "hallucination."
          </p>
          <div className="bg-purple-50 border border-purple-300 rounded p-4">
            <p className="text-sm font-semibold text-purple-800 mb-2">Example Hallucination:</p>
            <p className="text-sm text-gray-700 italic mb-2">
              "The famous scientist Dr. Jennifer Martinez discovered the cure for the common cold in 2019."
            </p>
            <p className="text-sm text-purple-700">
              This person and discovery don't exist! The AI made it up because it sounded plausible.
            </p>
          </div>
        </div>

        <div className="bg-white border-2 border-blue-400 rounded-xl p-6">
          <h4 className="text-lg font-bold text-blue-700 mb-3">
            3. AI Reflects Training Biases
          </h4>
          <p className="text-gray-700 mb-3">
            AI learns from human-created data, which means it can pick up human biases about:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Gender roles and stereotypes</li>
            <li>Cultural assumptions</li>
            <li>Historical perspectives</li>
            <li>Social and economic views</li>
          </ul>
        </div>

        <div className="bg-white border-2 border-red-400 rounded-xl p-6">
          <h4 className="text-lg font-bold text-red-700 mb-3">
            4. AI Lacks Real Understanding
          </h4>
          <p className="text-gray-700 mb-3">
            AI doesn't truly "understand" like humans do. It:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Can't verify its own facts</li>
            <li>Doesn't know when it's wrong</li>
            <li>Can't think critically about its responses</li>
            <li>May sound confident even when incorrect</li>
          </ul>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        The Critical Thinking Framework
      </h3>

      <div className="bg-[#164055] text-white rounded-xl p-8 mb-8">
        <h4 className="text-2xl font-bold mb-6 text-center">
          5 Questions to Ask About AI Responses
        </h4>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <span className="text-3xl font-bold text-[#f7aa37]">1</span>
            <div>
              <p className="font-semibold text-lg mb-1">Does this make sense?</p>
              <p className="text-gray-200 text-sm">Use your own knowledge and logic. Does the answer seem reasonable?</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-3xl font-bold text-[#f7aa37]">2</span>
            <div>
              <p className="font-semibold text-lg mb-1">Can I verify this?</p>
              <p className="text-gray-200 text-sm">Can you check facts with reliable sources (textbooks, educational websites, experts)?</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-3xl font-bold text-[#f7aa37]">3</span>
            <div>
              <p className="font-semibold text-lg mb-1">Is this biased?</p>
              <p className="text-gray-200 text-sm">Does it make assumptions based on stereotypes or favor one perspective?</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-3xl font-bold text-[#f7aa37]">4</span>
            <div>
              <p className="font-semibold text-lg mb-1">Is this complete?</p>
              <p className="text-gray-200 text-sm">Did the AI give you the full picture, or are there important details missing?</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-3xl font-bold text-[#f7aa37]">5</span>
            <div>
              <p className="font-semibold text-lg mb-1">How confident should I be?</p>
              <p className="text-gray-200 text-sm">For important information, always verify with multiple sources!</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Verification Strategies
      </h3>

      <div className="overflow-x-auto rounded-2xl border-2 border-gray-200 shadow-sm bg-white mb-8">
        <table className="w-full text-left border-collapse">
          <thead style={{ backgroundColor: '#3b999c' }}>
            <tr>
              <th className="px-6 py-4 font-semibold text-white">Type of Information</th>
              <th className="px-6 py-4 font-semibold text-white">How to Verify</th>
              <th className="px-6 py-4 font-semibold text-white">Trust Level</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">Historical Facts</td>
              <td className="px-6 py-4 text-gray-700">Check textbooks, encyclopedias, educational websites</td>
              <td className="px-6 py-4 text-green-600">✓ Usually reliable</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">Scientific Concepts</td>
              <td className="px-6 py-4 text-gray-700">Verify with science textbooks, .edu sites</td>
              <td className="px-6 py-4 text-green-600">✓ Usually reliable</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">Current Events</td>
              <td className="px-6 py-4 text-gray-700">Check recent news sources (AI data may be outdated)</td>
              <td className="px-6 py-4 text-yellow-600">⚠ Verify carefully</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">Math Calculations</td>
              <td className="px-6 py-4 text-gray-700">Use a calculator! AI can make arithmetic errors</td>
              <td className="px-6 py-4 text-red-600">⚠ Don't trust blindly</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">Specific Citations</td>
              <td className="px-6 py-4 text-gray-700">Look up the actual source (books, articles, websites)</td>
              <td className="px-6 py-4 text-red-600">⚠ Often hallucinated</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-green-700 mb-2">
          ✅ Good Practice
        </p>
        <p className="text-gray-700 mb-3">
          For homework or important decisions, use the "Three Source Rule":
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>Get information from AI</li>
          <li>Verify with at least 2 other reliable sources</li>
          <li>Only use information that matches across all sources</li>
        </ol>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-sm font-semibold text-blue-700 mb-2">
          💡 Remember
        </p>
        <p className="text-gray-700">
          <strong>AI is a tool, not an oracle.</strong> Your critical thinking is what makes AI truly useful. Question, verify, and think for yourself!
        </p>
      </div>
    </LearnContent>
  )
}
