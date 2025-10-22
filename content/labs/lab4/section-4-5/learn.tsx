/**
 * Lab 4, Section 4.5: Chain-of-Thought
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent previousSummary="You learned about AI hallucinations - when AI makes up plausible-sounding but false information - and how to verify important facts.">
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Chain-of-Thought: Making AI Reason Better
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        Now that you know AI's limitations, let's learn a powerful technique to <strong>improve its reasoning</strong>: Chain-of-Thought prompting!
      </p>

      <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-[#3b999c] mb-4">
          What is Chain-of-Thought (CoT)?
        </h3>
        <p className="text-gray-700 mb-3">
          <strong>Chain-of-Thought</strong> = Asking the AI to show its reasoning step-by-step before giving an answer
        </p>
        <p className="text-gray-700 text-sm">
          Instead of jumping to a conclusion, the AI "thinks out loud" through each step of the problem.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Why Chain-of-Thought Works
      </h3>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-green-50 border-2 border-green-400 rounded-lg p-4">
          <p className="font-bold text-green-700 mb-3">✅ Benefits:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>Reduces errors in complex problems</li>
            <li>Makes reasoning visible (you can check it!)</li>
            <li>Forces AI to "think" more carefully</li>
            <li>Catches mistakes early in the process</li>
            <li>Better for math, logic, and multi-step tasks</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-4">
          <p className="font-bold text-blue-700 mb-3">💡 How it helps:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>Breaks complex problems into smaller steps</li>
            <li>Each step builds on the previous</li>
            <li>You can spot where reasoning goes wrong</li>
            <li>Creates a "thinking pathway" for AI to follow</li>
          </ul>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        The Magic Phrase
      </h3>

      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 mb-8">
        <p className="text-2xl font-bold text-center text-yellow-800 mb-4">
          "Let's think step by step"
        </p>
        <p className="text-gray-700 text-center text-sm">
          This simple phrase dramatically improves AI reasoning!
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Example: With vs. Without CoT
      </h3>

      <div className="space-y-6 mb-8">
        <div className="bg-red-50 border-2 border-red-400 rounded-xl p-6">
          <p className="font-bold text-red-800 mb-3">❌ Without Chain-of-Thought:</p>
          <div className="bg-white p-4 rounded-lg mb-3">
            <p className="font-mono text-sm text-gray-800 mb-2">
              <strong>Prompt:</strong> "If I buy 3 items at $12.47 each with 8% tax, what's the total?"
            </p>
            <p className="font-mono text-sm text-gray-700">
              <strong>AI:</strong> "The total is approximately $40.40"
            </p>
          </div>
          <p className="text-sm text-gray-600 italic">
            Problem: You can't verify the answer. Did AI calculate correctly? Where could it have gone wrong?
          </p>
        </div>

        <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
          <p className="font-bold text-green-800 mb-3">✅ With Chain-of-Thought:</p>
          <div className="bg-white p-4 rounded-lg mb-3">
            <p className="font-mono text-sm text-gray-800 mb-2">
              <strong>Prompt:</strong> "If I buy 3 items at $12.47 each with 8% tax, what's the total? Let's think step by step."
            </p>
            <div className="font-mono text-sm text-gray-700 space-y-2 mt-3">
              <p><strong>AI:</strong> "Let me solve this step by step:</p>
              <p><strong>Step 1:</strong> Calculate subtotal</p>
              <p>• 3 items × $12.47 = $37.41</p>
              <p><strong>Step 2:</strong> Calculate tax</p>
              <p>• $37.41 × 0.08 = $2.99</p>
              <p><strong>Step 3:</strong> Add tax to subtotal</p>
              <p>• $37.41 + $2.99 = $40.40</p>
              <p><strong>Answer:</strong> $40.40"</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 italic">
            Success! You can follow each step and verify the logic and math.
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Variations of Chain-of-Thought
      </h3>

      <div className="space-y-4 mb-8">
        <div className="bg-white border-l-4 border-blue-500 p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-[#164055] mb-2">1. Basic CoT</h4>
          <p className="text-gray-700 text-sm mb-2">Just add the magic phrase:</p>
          <p className="font-mono text-xs text-gray-600">"Let's think step by step"</p>
        </div>

        <div className="bg-white border-l-4 border-green-500 p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-[#164055] mb-2">2. Structured CoT</h4>
          <p className="text-gray-700 text-sm mb-2">Give AI a template to follow:</p>
          <p className="font-mono text-xs text-gray-600">"Please solve this by: 1) Identifying key information 2) Planning approach 3) Solving step-by-step 4) Checking your answer"</p>
        </div>

        <div className="bg-white border-l-4 border-purple-500 p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-[#164055] mb-2">3. Numbered Steps</h4>
          <p className="text-gray-700 text-sm mb-2">Request specific format:</p>
          <p className="font-mono text-xs text-gray-600">"Break this down into numbered steps, showing your work for each"</p>
        </div>

        <div className="bg-white border-l-4 border-yellow-500 p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-[#164055] mb-2">4. Think-Aloud Protocol</h4>
          <p className="text-gray-700 text-sm mb-2">Ask AI to explain its thinking:</p>
          <p className="font-mono text-xs text-gray-600">"Walk me through your reasoning process as you solve this"</p>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        When to Use Chain-of-Thought
      </h3>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-green-50 border-2 border-green-400 rounded-lg p-4">
          <p className="font-bold text-green-700 mb-3">✅ Use CoT for:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>Math problems and calculations</li>
            <li>Multi-step reasoning tasks</li>
            <li>Logical puzzles and problems</li>
            <li>Debugging code</li>
            <li>Complex decision-making</li>
            <li>Analyzing pros and cons</li>
          </ul>
        </div>

        <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4">
          <p className="font-bold text-gray-700 mb-3">⚪ Skip CoT for:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>Simple creative writing</li>
            <li>Straightforward facts</li>
            <li>Quick brainstorming</li>
            <li>Translation tasks</li>
            <li>When you want concise answers</li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
        <h4 className="font-bold text-blue-800 mb-3">
          🎯 Ready to Practice Chain-of-Thought!
        </h4>
        <p className="text-gray-700">
          Head to the Try It tab to see how dramatically "Let's think step by step" improves AI reasoning!
        </p>
      </div>
    </LearnContent>
  )
}
