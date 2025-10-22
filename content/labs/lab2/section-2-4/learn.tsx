/**
 * Lab 2, Section 2.4: Clear Communication
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        The Art of Clear Communication
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        Now that you understand how AI learns, let's master the art of communicating with it effectively! The more specific and clear your prompts, the better the AI's responses.
      </p>

      <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-[#3b999c] mb-4">
          The Three Elements of Great Prompts
        </h3>

        <p className="text-gray-700 mb-4">
          Every effective prompt should include:
        </p>

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">
              1. Details - What exactly do you want?
            </h4>
            <p className="text-sm text-gray-700 mb-2">Be specific about:</p>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
              <li>Who the audience is</li>
              <li>What aspect you're interested in</li>
              <li>Why you're asking</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">
              2. Constraints - What are the limits?
            </h4>
            <p className="text-sm text-gray-700 mb-2">Specify:</p>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
              <li>Length (word count, sentences)</li>
              <li>Format (list, paragraph, table)</li>
              <li>Style (formal, casual, technical)</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">
              3. Context - What's the background?
            </h4>
            <p className="text-sm text-gray-700 mb-2">Provide:</p>
            <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
              <li>Your situation or role</li>
              <li>The purpose of your request</li>
              <li>Any relevant background</li>
            </ul>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Example: Vague vs. Specific
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
          <h4 className="text-lg font-bold text-red-700 mb-3">
            ❌ Vague Prompt
          </h4>
          <p className="text-sm text-gray-700 font-mono bg-white p-3 rounded border border-red-200 mb-3">
            "Tell me about programming."
          </p>
          <p className="text-sm text-gray-600">
            <strong>Result:</strong> Generic, unfocused answer that might not be helpful.
          </p>
        </div>

        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
          <h4 className="text-lg font-bold text-green-700 mb-3">
            ✅ Specific Prompt
          </h4>
          <p className="text-sm text-gray-700 font-mono bg-white p-3 rounded border border-green-200 mb-3">
            "Explain to a 12-year-old beginner what programming is and why it's useful. Include 2 simple examples of things they could build."
          </p>
          <p className="text-sm text-gray-600">
            <strong>Result:</strong> Focused, age-appropriate answer with relevant examples.
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Common Constraint Types
      </h3>

      <div className="overflow-x-auto rounded-2xl border-2 border-gray-200 shadow-sm bg-white mb-8">
        <table className="w-full text-left border-collapse">
          <thead style={{ backgroundColor: '#f7aa37' }}>
            <tr>
              <th className="px-6 py-4 font-semibold text-white">Constraint Type</th>
              <th className="px-6 py-4 font-semibold text-white">Examples</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">Length</td>
              <td className="px-6 py-4 text-gray-700 text-sm">
                "in 100 words", "in 3 sentences", "under 200 words"
              </td>
            </tr>
            <tr className="border-t border-gray-200 bg-gray-50">
              <td className="px-6 py-4 font-semibold text-[#164055]">Format</td>
              <td className="px-6 py-4 text-gray-700 text-sm">
                "as a bulleted list", "in JSON format", "as a table"
              </td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">Style</td>
              <td className="px-6 py-4 text-gray-700 text-sm">
                "formal tone", "explain like I'm 5", "professional language"
              </td>
            </tr>
            <tr className="border-t border-gray-200 bg-gray-50">
              <td className="px-6 py-4 font-semibold text-[#164055]">Structure</td>
              <td className="px-6 py-4 text-gray-700 text-sm">
                "with 3 main points", "include examples", "start with a summary"
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          💡 The Power of Specificity
        </p>
        <p className="text-gray-700">
          Based on what we learned about training patterns, the AI responds best to <strong>specific, detailed prompts</strong>. Why? Because specific prompts match clearer patterns in the training data, leading to more accurate and useful responses.
        </p>
      </div>

      <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
        <h4 className="font-bold text-blue-800 mb-3">
          📝 Quick Formula for Better Prompts
        </h4>

        <div className="bg-white p-4 rounded border border-blue-200 font-mono text-sm">
          <p className="text-gray-700">
            [Context] + [Request] + [Constraints] = Great Prompt
          </p>
        </div>

        <p className="text-sm text-gray-600 mt-3">
          Example: "I'm a middle school student studying ecosystems. Explain how predators and prey maintain balance in nature. Use simple language and give 2 real-world examples. Keep it under 150 words."
        </p>
      </div>
    </LearnContent>
  )
}
