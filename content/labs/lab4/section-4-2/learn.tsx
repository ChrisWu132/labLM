/**
 * Lab 4, Section 4.2: AI Weaknesses
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent previousSummary="You learned what AI excels at: writing, explanation, summarization, translation, and brainstorming - all tasks involving language patterns and creativity.">
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        AI's Limitations: What to Watch Out For
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        Understanding AI's weaknesses is just as important as knowing its strengths. Let's explore where LLMs struggle and why.
      </p>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Tasks AI Struggles With
      </h3>

      <div className="space-y-6 mb-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-red-800 mb-2 text-lg">1. Complex Math & Calculations</h4>
          <p className="text-gray-700 mb-3">
            AI can make errors with:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
            <li>Multi-step mathematical calculations</li>
            <li>Complex arithmetic operations</li>
            <li>Precise numerical computations</li>
            <li>Mathematical proofs</li>
          </ul>
          <p className="text-sm text-gray-600 mt-2 italic">
            Why? LLMs predict words/patterns, they don't actually "calculate" like a calculator.
          </p>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-red-800 mb-2 text-lg">2. Current Events & Real-Time Information</h4>
          <p className="text-gray-700 mb-3">
            Limited by knowledge cutoff:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
            <li>Cannot access current news or events</li>
            <li>No real-time data (stock prices, weather, etc.)</li>
            <li>Information may be months or years outdated</li>
            <li>Can't browse the internet (in most models)</li>
          </ul>
          <p className="text-sm text-gray-600 mt-2 italic">
            Why? Training data has a cutoff date. AI doesn't "know" anything after that.
          </p>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-red-800 mb-2 text-lg">3. Specific Facts & Statistics</h4>
          <p className="text-gray-700 mb-3">
            May confuse or approximate:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
            <li>Exact numbers and dates</li>
            <li>Precise statistics</li>
            <li>Specific historical details</li>
            <li>Technical specifications</li>
          </ul>
          <p className="text-sm text-gray-600 mt-2 italic">
            Why? AI learns patterns, not exact memorization. Similar facts can get mixed up.
          </p>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-red-800 mb-2 text-lg">4. Deep Logical Reasoning</h4>
          <p className="text-gray-700 mb-3">
            Challenges include:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
            <li>Complex multi-step reasoning (without guidance)</li>
            <li>Abstract logical puzzles</li>
            <li>Formal mathematical proofs</li>
            <li>Deep causal analysis</li>
          </ul>
          <p className="text-sm text-gray-600 mt-2 italic">
            Why? Pattern matching ≠ logical reasoning. AI can be helped with techniques like Chain-of-Thought!
          </p>
        </div>

        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-red-800 mb-2 text-lg">5. Personal Knowledge</h4>
          <p className="text-gray-700 mb-3">
            AI doesn't know:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
            <li>Your personal life or history</li>
            <li>Your previous conversations (in different sessions)</li>
            <li>Private or confidential information</li>
            <li>Anything about your specific situation (unless you tell it)</li>
          </ul>
          <p className="text-sm text-gray-600 mt-2 italic">
            Why? AI only knows what's in its training data or what you tell it in the current conversation.
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          ⚠️ Important Takeaway
        </p>
        <p className="text-gray-700">
          AI isn't "smart" in the traditional sense - it's a pattern matcher. It excels at language tasks but struggles with precision, calculations, and real-time information.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        How to Work Around Limitations
      </h3>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-green-50 border-2 border-green-400 rounded-lg p-4">
          <p className="font-bold text-green-700 mb-3">✅ For Math:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>Use a calculator for important calculations</li>
            <li>Ask AI to show steps, then verify them</li>
            <li>Use Chain-of-Thought for complex problems</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-4">
          <p className="font-bold text-blue-700 mb-3">✅ For Current Info:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>Check recent events with search engines</li>
            <li>Don't rely on AI for today's news</li>
            <li>Verify dates and recent developments</li>
          </ul>
        </div>

        <div className="bg-purple-50 border-2 border-purple-400 rounded-lg p-4">
          <p className="font-bold text-purple-700 mb-3">✅ For Exact Facts:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>Cross-reference important information</li>
            <li>Use authoritative sources for verification</li>
            <li>Ask AI to note uncertainty</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
          <p className="font-bold text-yellow-700 mb-3">✅ For Reasoning:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>Use "Let's think step by step"</li>
            <li>Break complex problems into parts</li>
            <li>Guide AI through logical steps</li>
          </ul>
        </div>
      </div>

      <div className="bg-[rgba(59,153,156,0.05)] border-2 border-[#3b999c] rounded-xl p-6">
        <h4 className="text-lg font-bold text-[#3b999c] mb-3">
          🎯 Ready to Test AI's Limits!
        </h4>
        <p className="text-gray-700">
          Now let's see these limitations in action and learn to recognize when AI might struggle. Head to the Try It tab!
        </p>
      </div>
    </LearnContent>
  )
}
