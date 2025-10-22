/**
 * Lab 4, Section 4.3: Hallucinations
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent previousSummary="You learned AI's limitations: struggles with complex math, current events, specific facts, deep reasoning, and has no personal knowledge.">
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Understanding AI "Hallucinations"
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        One of AI's most important limitations is its tendency to "hallucinate" - making up information that sounds plausible but is completely false.
      </p>

      <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-red-800 mb-4">
          What is a Hallucination?
        </h3>
        <p className="text-gray-700 mb-3">
          <strong>Hallucination</strong> = When AI generates information that is incorrect, made-up, or nonsensical, but presents it confidently as if it were true.
        </p>
        <p className="text-gray-700 text-sm">
          It's called a "hallucination" because the AI essentially "sees" patterns that aren't really there and fills gaps with plausible-sounding fiction.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Why Hallucinations Happen
      </h3>

      <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-8">
        <p className="text-gray-700 mb-4">
          Remember: AI is a <strong>pattern predictor</strong>, not a database. When it doesn't actually know something:
        </p>

        <div className="space-y-3">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <p className="font-semibold text-blue-800 mb-2">Step 1: Recognizes the Pattern</p>
            <p className="text-sm text-gray-700">
              AI notices "this question asks for a book title and author"
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
            <p className="font-semibold text-purple-800 mb-2">Step 2: Generates "Reasonable" Answer</p>
            <p className="text-sm text-gray-700">
              Creates something that sounds like a real book title and author
            </p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
            <p className="font-semibold text-red-800 mb-2">Step 3: States it Confidently</p>
            <p className="text-sm text-gray-700">
              Presents the made-up information as fact, even adding plausible details!
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Common Hallucination Examples
      </h3>

      <div className="space-y-4 mb-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
          <h4 className="font-bold text-red-800 mb-2">Fake Sources</h4>
          <p className="text-gray-700 text-sm mb-2">Making up research papers, books, or articles that don't exist</p>
          <p className="text-xs text-gray-600 italic">"According to the 2019 study by Dr. Smith..." (no such study exists)</p>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
          <h4 className="font-bold text-red-800 mb-2">False Facts</h4>
          <p className="text-gray-700 text-sm mb-2">Inventing plausible-sounding but incorrect information</p>
          <p className="text-xs text-gray-600 italic">"The Eiffel Tower was built in 1878" (actually 1889)</p>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
          <h4 className="font-bold text-red-800 mb-2">Fabricated Details</h4>
          <p className="text-gray-700 text-sm mb-2">Adding specific but invented details to fill gaps</p>
          <p className="text-xs text-gray-600 italic">"This company has 500 employees in 12 countries" (made-up numbers)</p>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
          <h4 className="font-bold text-red-800 mb-2">Mixed Information</h4>
          <p className="text-gray-700 text-sm mb-2">Combining facts from different sources incorrectly</p>
          <p className="text-xs text-gray-600 italic">"Einstein won the Nobel Prize for relativity" (he won it for photoelectric effect)</p>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        How to Avoid Being Fooled
      </h3>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-green-50 border-2 border-green-400 rounded-lg p-4">
          <p className="font-bold text-green-700 mb-3"> Do This:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>Verify important information independently</li>
            <li>Check facts with authoritative sources</li>
            <li>Be skeptical of very specific details</li>
            <li>Ask AI to note uncertainties</li>
            <li>Cross-reference multiple sources</li>
          </ul>
        </div>

        <div className="bg-red-50 border-2 border-red-400 rounded-lg p-4">
          <p className="font-bold text-red-700 mb-3"> Don't:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>Blindly trust all AI output</li>
            <li>Use AI as sole source for critical decisions</li>
            <li>Assume confidence = accuracy</li>
            <li>Skip verification for important facts</li>
            <li>Share unverified AI information as truth</li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          Golden Rule
        </p>
        <p className="text-gray-700">
          <strong>If it matters, verify it!</strong> Don't let AI's confident tone fool you - always fact-check important information.
        </p>
      </div>

      <div className="bg-[rgba(59,153,156,0.05)] border-2 border-[#3b999c] rounded-xl p-6">
        <h4 className="text-lg font-bold text-[#3b999c] mb-3">
          Ready to Spot Hallucinations!
        </h4>
        <p className="text-gray-700">
          Head to the Try It tab to practice recognizing when AI might be making things up!
        </p>
      </div>
    </LearnContent>
  )
}
