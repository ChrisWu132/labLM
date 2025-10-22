/**
 * Lab 2, Section 2.1: How LLMs Learn
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        How Do LLMs Learn?
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        Remember from Lab 1 that LLMs are "next word predictors"? But where did they learn all those patterns? Let's find out!
      </p>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        The Training Process
      </h3>

      <p className="text-lg text-gray-700 mb-4">
        Think of training an LLM like teaching someone to write by having them read millions of books:
      </p>

      <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-6">
        <h4 className="text-xl font-bold text-[#3b999c] mb-4">
          Three Phases of Learning
        </h4>

        <div className="space-y-6">
          <div>
            <h5 className="font-semibold text-[#164055] mb-2">
              1. Reading Phase
            </h5>
            <p className="text-gray-700 mb-2">
              The AI reads massive amounts of text from:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Books (fiction, non-fiction, textbooks)</li>
              <li>Websites and articles</li>
              <li>Wikipedia</li>
              <li>Code repositories</li>
              <li>Conversations and forums</li>
              <li>Research papers</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-[#164055] mb-2">
              2. Pattern Recognition
            </h5>
            <p className="text-gray-700 mb-2">
              As it reads, it learns patterns:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>"After 'The cat sat on the', usually comes 'mat' or 'chair'"</li>
              <li>"When discussing science, use technical vocabulary"</li>
              <li>"Questions starting with 'How' usually need explanations"</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-[#164055] mb-2">
              3. Knowledge Compression
            </h5>
            <p className="text-gray-700">
              All this learning gets compressed into the model's "neural network" - billions of connections that encode these patterns.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-blue-700 mb-2">
          Important
        </p>
        <p className="text-gray-700">
          The AI doesn't memorize the text word-for-word. It learns <strong>patterns</strong> and <strong>relationships</strong> between concepts.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        What Has the AI "Read"?
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
          <h4 className="text-lg font-bold text-green-700 mb-4">
            LLMs Have Knowledge From:
          </h4>
          <ul className="space-y-2 text-gray-700">
            <li> General knowledge (history, science, culture)</li>
            <li> Common sense and everyday facts</li>
            <li> Programming languages and code patterns</li>
            <li> Multiple languages (English, Spanish, Chinese, etc.)</li>
            <li> Math concepts and problem-solving methods</li>
            <li> Writing styles and formats</li>
          </ul>
        </div>

        <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6">
          <h4 className="text-lg font-bold text-red-700 mb-4">
            But They DON'T Have:
          </h4>
          <ul className="space-y-2 text-gray-700">
            <li> Real-time internet access (most can't browse the web)</li>
            <li> Your personal information (unless you tell them)</li>
            <li> Events after their "knowledge cutoff date"</li>
            <li> Information about private/unpublished content</li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          Key Insight
        </p>
        <p className="text-gray-700">
          An LLM's knowledge is like a snapshot in time - it knows everything up to its training cutoff date, but nothing after that. Think of it as an extremely well-read friend who stopped reading the news a few months ago.
        </p>
      </div>
    </LearnContent>
  )
}
