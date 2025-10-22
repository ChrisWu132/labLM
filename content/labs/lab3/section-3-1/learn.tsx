/**
 * Lab 3, Section 3.1: Token Generation
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        How LLMs Generate Responses Word-by-Word
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        Remember: LLMs are "next word predictors." Let's see how they actually generate responses!
      </p>

      <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-[#3b999c] mb-4">
          The Generation Process
        </h3>

        <p className="text-gray-700 mb-4">
          Imagine you ask: "What is the capital of France?"
        </p>

        <div className="bg-blue-50 p-4 rounded-lg font-mono text-sm text-gray-700">
          <p className="mb-2"><strong>Your question:</strong> "What is the capital of France?"</p>

          <p className="mt-4 mb-2"><strong>AI thinks step-by-step:</strong></p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>"The" (most likely start)</li>
            <li>"The capital" (logical continuation)</li>
            <li>"The capital of" (completing the pattern)</li>
            <li>"The capital of France" (repeating your question)</li>
            <li>"The capital of France is" (setting up the answer)</li>
            <li>"The capital of France is Paris" (THE answer!)</li>
            <li>"The capital of France is Paris." (add punctuation, DONE!)</li>
          </ol>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          Key Insight
        </p>
        <p className="text-gray-700">
          The AI doesn't "know" the full answer upfront. It generates it <strong>one piece at a time</strong>, with each word influencing what comes next!
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        What Are Tokens?
      </h3>

      <p className="text-lg text-gray-700 mb-4">
        <strong>Token</strong> = The basic unit of text that AI processes
      </p>

      <p className="text-gray-700 mb-4">
        Think of tokens as puzzle pieces that make up words and sentences.
      </p>

      <div className="overflow-x-auto rounded-2xl border-2 border-gray-200 shadow-sm bg-white mb-8">
        <table className="w-full text-left border-collapse">
          <thead style={{ backgroundColor: '#f7aa37' }}>
            <tr>
              <th className="px-6 py-4 font-semibold text-white">Text</th>
              <th className="px-6 py-4 font-semibold text-white">Number of Tokens</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-mono text-gray-700">"cat"</td>
              <td className="px-6 py-4 text-gray-700">1 token</td>
            </tr>
            <tr className="border-t border-gray-200 bg-gray-50">
              <td className="px-6 py-4 font-mono text-gray-700">"running"</td>
              <td className="px-6 py-4 text-gray-700">1 token (sometimes 2: "run" + "ning")</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-mono text-gray-700">"The cat sat on the mat"</td>
              <td className="px-6 py-4 text-gray-700">7 tokens</td>
            </tr>
            <tr className="border-t border-gray-200 bg-gray-50">
              <td className="px-6 py-4 font-mono text-gray-700">"don't"</td>
              <td className="px-6 py-4 text-gray-700">2 tokens ("don" + "'t")</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-8">
        <h4 className="text-lg font-bold text-[#3b999c] mb-3">
          Why Tokens Matter
        </h4>

        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-[#3b999c] font-bold mt-1">•</span>
            <span><strong>Processing:</strong> AI processes text in tokens, not letters</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#3b999c] font-bold mt-1">•</span>
            <span><strong>Cost:</strong> Longer prompts = more tokens = higher cost</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#3b999c] font-bold mt-1">•</span>
            <span><strong>Limits:</strong> Token limits exist (e.g., 4000 tokens max for some models)</span>
          </li>
        </ul>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Why Responses Vary
      </h3>

      <p className="text-gray-700 mb-4">
        At each step, the AI has multiple good options:
      </p>

      <div className="overflow-x-auto rounded-2xl border-2 border-gray-200 shadow-sm bg-white mb-8">
        <table className="w-full text-left border-collapse">
          <thead style={{ backgroundColor: '#f7aa37' }}>
            <tr>
              <th className="px-6 py-4 font-semibold text-white">Next Word Option</th>
              <th className="px-6 py-4 font-semibold text-white">Probability</th>
              <th className="px-6 py-4 font-semibold text-white">How Often Selected?</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-mono text-gray-700">"sleeping"</td>
              <td className="px-6 py-4 text-gray-700">35%</td>
              <td className="px-6 py-4 text-green-600 font-semibold">Often</td>
            </tr>
            <tr className="border-t border-gray-200 bg-gray-50">
              <td className="px-6 py-4 font-mono text-gray-700">"hiding"</td>
              <td className="px-6 py-4 text-gray-700">25%</td>
              <td className="px-6 py-4 text-blue-600 font-semibold">Sometimes</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-mono text-gray-700">"hungry"</td>
              <td className="px-6 py-4 text-gray-700">20%</td>
              <td className="px-6 py-4 text-blue-600 font-semibold">Sometimes</td>
            </tr>
            <tr className="border-t border-gray-200 bg-gray-50">
              <td className="px-6 py-4 font-mono text-gray-700">"orange"</td>
              <td className="px-6 py-4 text-gray-700">15%</td>
              <td className="px-6 py-4 text-yellow-600 font-semibold">Rarely</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-mono text-gray-700">"dancing"</td>
              <td className="px-6 py-4 text-gray-700">5%</td>
              <td className="px-6 py-4 text-red-600 font-semibold">Very Rarely</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
        <h4 className="font-bold text-blue-800 mb-3">
          Benefits of Probabilistic Selection
        </h4>

        <div className="space-y-2 text-gray-700">
          <p> <strong>Creative responses</strong> - Not always the same</p>
          <p> <strong>Natural-sounding language</strong> - Variety feels human</p>
          <p> <strong>Interesting variations</strong> - Multiple valid approaches</p>
          <p> <strong>Trade-off:</strong> Slightly different each time, occasionally unexpected</p>
        </div>
      </div>
    </LearnContent>
  )
}
