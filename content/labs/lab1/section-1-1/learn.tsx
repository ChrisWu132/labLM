/**
 * Lab 1, Section 1.1: What is AI?
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        What is AI? What is an LLM?
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        <strong className="text-[#164055]">AI (Artificial Intelligence)</strong> is software that can perform tasks that typically require human intelligence - like understanding language, recognizing patterns, and making decisions.
      </p>

      <p className="text-lg text-gray-700 mb-6">
        <strong className="text-[#164055]">LLM (Large Language Model)</strong> is a specific type of AI that specializes in understanding and generating text. Think of it as an extremely well-read assistant that has learned from millions of books, articles, and conversations.
      </p>

      <div className="bg-[rgba(59,153,156,0.05)] border-l-4 border-[#3b999c] p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-[#3b999c] mb-2">
          Examples of LLMs
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>ChatGPT (by OpenAI)</li>
          <li>Claude (by Anthropic)</li>
          <li>Google Gemini (by Google)</li>
        </ul>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        LLM vs Search Engine vs Calculator
      </h3>

      <p className="text-lg text-gray-700 mb-6">
        Let's understand the difference between these three tools:
      </p>

      <div className="overflow-x-auto rounded-2xl border-2 border-gray-200 shadow-sm bg-white mb-8">
        <table className="w-full text-left border-collapse">
          <thead style={{ backgroundColor: '#f7aa37' }}>
            <tr>
              <th className="px-6 py-4 font-semibold text-white">Tool</th>
              <th className="px-6 py-4 font-semibold text-white">What it does</th>
              <th className="px-6 py-4 font-semibold text-white">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">Calculator</td>
              <td className="px-6 py-4 text-gray-700">Follows exact rules, always same answer</td>
              <td className="px-6 py-4 text-gray-700">2 + 2 = 4 (always)</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">Search Engine</td>
              <td className="px-6 py-4 text-gray-700">Finds existing web pages</td>
              <td className="px-6 py-4 text-gray-700">Shows links to cat information</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">LLM</td>
              <td className="px-6 py-4 text-gray-700">Generates new text based on patterns</td>
              <td className="px-6 py-4 text-gray-700">Creates a unique explanation about cats</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          💡 Key Insight
        </p>
        <p className="text-gray-700">
          An LLM doesn't search the internet or calculate. It <strong>predicts</strong> what words should come next based on patterns it learned during training.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        How Does an LLM Work?
      </h3>

      <p className="text-lg text-gray-700 mb-6">
        Think of an LLM like this:
      </p>

      <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-6">
        <h4 className="text-xl font-bold text-[#3b999c] mb-4">
          The "Next Word Predictor"
        </h4>

        <p className="text-gray-700 mb-4">
          When you write: <code className="bg-gray-100 px-2 py-1 rounded">"The sky is..."</code>
        </p>

        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
          <li>A human would say: "blue"</li>
          <li>An LLM predicts: "blue" (most likely), "clear" (also likely), "falling" (less likely)</li>
        </ul>

        <p className="font-semibold text-[#164055] mb-2">It works by:</p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>Reading your prompt</li>
          <li>Breaking it into pieces (tokens)</li>
          <li>Predicting what should come next, word by word</li>
          <li>Continuing until it has a complete response</li>
        </ol>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-sm font-semibold text-blue-700 mb-2">
          ⚠️ Important
        </p>
        <p className="text-gray-700">
          The AI isn't thinking or conscious. It's using statistical patterns to generate helpful text.
        </p>
      </div>
    </LearnContent>
  )
}
