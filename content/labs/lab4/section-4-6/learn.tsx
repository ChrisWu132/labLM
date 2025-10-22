/**
 * Lab 4, Section 4.6: Review & Quiz
 * Learn Tab Content - Recap
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Lab 4 Review: AI's Capabilities & Limits
      </h2>

      <p className="text-lg text-gray-700 mb-8">
        Congratulations on completing Lab 4! You've learned to understand AI's strengths, recognize its limitations, and work around them effectively.
      </p>

      <div className="space-y-6 mb-8">
        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6">
          <h3 className="text-xl font-bold text-[#3b999c] mb-4">
            Section 4.1: AI Superpowers
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>AI excels at writing, explaining, summarizing, translating, and brainstorming</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>Great for creative content and breaking down complex concepts</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>Can adapt explanations to different audiences and styles</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6">
          <h3 className="text-xl font-bold text-[#3b999c] mb-4">
            Section 4.2: AI Weaknesses
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>Struggles with complex reasoning, precise math, and real-time information</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>Can't access current events or personal information</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>Multi-step calculations and logical proofs can contain errors</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6">
          <h3 className="text-xl font-bold text-[#3b999c] mb-4">
            Section 4.3: Hallucinations
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>AI can generate plausible-sounding but completely false information</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>Happens when AI fills knowledge gaps with "reasonable guesses"</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>Always verify important facts - never blindly trust AI</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6">
          <h3 className="text-xl font-bold text-[#3b999c] mb-4">
            Section 4.4: Verification
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>Cross-reference AI outputs with multiple reliable sources</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>Watch for specificity red flags (exact numbers, dates without sources)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>Apply common sense and critical thinking to all AI responses</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6">
          <h3 className="text-xl font-bold text-[#3b999c] mb-4">
            Section 4.5: Chain-of-Thought
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>"Let's think step by step" dramatically improves AI reasoning</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>Makes AI's logic visible so you can verify each step</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>Essential for complex problems, calculations, and debugging</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#3b999c] to-[#2d7a7d] rounded-xl p-8 text-white mb-8">
        <h3 className="text-2xl font-bold mb-4">
          Key Discoveries from Lab 4
        </h3>

        <div className="space-y-4 text-lg">
          <p>
            <strong>1.</strong> AI has specific strengths (creative tasks) and weaknesses (complex reasoning)
          </p>
          <p>
            <strong>2.</strong> Hallucinations are real - always verify important information
          </p>
          <p>
            <strong>3.</strong> Chain-of-Thought prompting unlocks better reasoning and transparency
          </p>
          <p>
            <strong>4.</strong> Critical thinking is your most important tool when using AI
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
        <h3 className="text-xl font-bold text-blue-800 mb-4">
          Ready for the Quiz?
        </h3>
        <p className="text-gray-700 mb-4">
          Test your understanding of Lab 4 concepts with a 6-question quiz covering AI capabilities, limitations, and verification strategies.
        </p>
        <p className="text-sm text-gray-600">
          <strong>Tip:</strong> Focus on understanding when to trust AI and when to verify. This knowledge is crucial for responsible AI use!
        </p>
      </div>
    </LearnContent>
  )
}
