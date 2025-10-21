/**
 * Lab 1, Section 1.2: Your First Prompt
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent previousSummary="You learned what AI and LLMs are, how they work as 'next word predictors', and how they differ from search engines and calculators.">
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        What is a Prompt?
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        Now that you understand what an LLM is, let's learn how to communicate with it effectively. The key to getting good results from AI is knowing how to ask!
      </p>

      <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-[#3b999c] mb-4">
          Definition
        </h3>
        <p className="text-lg text-gray-700 mb-4">
          A <strong className="text-[#164055]">prompt</strong> is the instruction or question you give to an LLM. It's how you communicate what you want.
        </p>
        <div className="bg-[rgba(59,153,156,0.05)] border-l-4 border-[#3b999c] p-4 rounded">
          <p className="text-gray-700">
            <strong>Prompt</strong> = Input (what you say)<br />
            <strong>Response</strong> = Output (what AI generates)
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          💡 Key Insight
        </p>
        <p className="text-gray-700">
          The better your prompt, the better the response! Clear communication = better results.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        How Prompts Work
      </h3>

      <p className="text-lg text-gray-700 mb-6">
        Think of prompting like giving directions to a helpful friend:
      </p>

      <div className="overflow-x-auto rounded-2xl border-2 border-gray-200 shadow-sm bg-white mb-8">
        <table className="w-full text-left border-collapse">
          <thead style={{ backgroundColor: '#f7aa37' }}>
            <tr>
              <th className="px-6 py-4 font-semibold text-white">Type of Instruction</th>
              <th className="px-6 py-4 font-semibold text-white">Example Prompt</th>
              <th className="px-6 py-4 font-semibold text-white">Result Quality</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">Vague</td>
              <td className="px-6 py-4 text-gray-700">"Tell me about dogs"</td>
              <td className="px-6 py-4 text-gray-700">❌ Generic, unfocused</td>
            </tr>
            <tr className="border-t border-gray-200 bg-green-50">
              <td className="px-6 py-4 font-semibold text-[#164055]">Specific</td>
              <td className="px-6 py-4 text-gray-700">"Explain to a 10-year-old why dogs are good pets. Include 3 reasons."</td>
              <td className="px-6 py-4 text-gray-700">✅ Focused, helpful</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Elements of a Good Prompt
      </h3>

      <p className="text-lg text-gray-700 mb-6">
        Great prompts typically include:
      </p>

      <div className="space-y-4 mb-8">
        <div className="bg-white border-l-4 border-[#3b999c] p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-[#164055] mb-2">1. Clear Task</h4>
          <p className="text-gray-700">What do you want the AI to do? (explain, write, translate, summarize, etc.)</p>
          <p className="text-sm text-gray-500 mt-2 italic">Example: "Explain...", "Write...", "Summarize..."</p>
        </div>

        <div className="bg-white border-l-4 border-[#3b999c] p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-[#164055] mb-2">2. Context</h4>
          <p className="text-gray-700">Who is this for? What's the situation?</p>
          <p className="text-sm text-gray-500 mt-2 italic">Example: "for a 10-year-old", "for a school presentation"</p>
        </div>

        <div className="bg-white border-l-4 border-[#3b999c] p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-[#164055] mb-2">3. Details</h4>
          <p className="text-gray-700">What specific aspects do you care about?</p>
          <p className="text-sm text-gray-500 mt-2 italic">Example: "Include 3 reasons", "Focus on health benefits"</p>
        </div>

        <div className="bg-white border-l-4 border-[#3b999c] p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-[#164055] mb-2">4. Format (Optional)</h4>
          <p className="text-gray-700">How should the answer be structured?</p>
          <p className="text-sm text-gray-500 mt-2 italic">Example: "in bullet points", "in 100 words", "as a list"</p>
        </div>
      </div>

      <div className="bg-[rgba(59,153,156,0.05)] border-2 border-[#3b999c] rounded-xl p-6">
        <h4 className="text-lg font-bold text-[#3b999c] mb-3">
          🎯 Ready to Practice!
        </h4>
        <p className="text-gray-700">
          Now that you know what makes a good prompt, let's try writing some! Head to the Try It tab to practice.
        </p>
      </div>
    </LearnContent>
  )
}
