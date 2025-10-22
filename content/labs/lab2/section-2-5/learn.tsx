/**
 * Lab 2, Section 2.5: Review & Quiz
 * Learn Tab Content - Recap
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Lab 2 Review: How AI Gets Smart
      </h2>

      <p className="text-lg text-gray-700 mb-8">
        Congratulations on completing Lab 2! Let's recap the key concepts you've learned about how LLMs learn and how to communicate with them effectively.
      </p>

      <div className="space-y-6 mb-8">
        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6">
          <h3 className="text-xl font-bold text-[#3b999c] mb-4">
            📚 Section 2.1: How LLMs Learn
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>LLMs learn by reading massive amounts of text and recognizing patterns</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>They compress knowledge into neural networks with billions of connections</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>They don't memorize text - they learn patterns and relationships</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6">
          <h3 className="text-xl font-bold text-[#3b999c] mb-4">
            🎯 Section 2.2: Knowledge Sources
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>Popular topics get more detailed answers due to more training data</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>Obscure or rare topics may get vague or general responses</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>Training data frequency determines knowledge depth and confidence</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6">
          <h3 className="text-xl font-bold text-[#3b999c] mb-4">
            📅 Section 2.3: Knowledge Cutoff
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>Every LLM has a knowledge cutoff date - the last time it was trained</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>Don't rely on AI for real-time news, current events, or recent updates</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span>Use AI for established facts and timeless concepts, not current info</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6">
          <h3 className="text-xl font-bold text-[#3b999c] mb-4">
            💬 Section 2.4: Clear Communication
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span><strong>Details:</strong> Specify exactly what you want</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span><strong>Constraints:</strong> Set limits on length, format, and style</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#3b999c] font-bold mt-1">•</span>
              <span><strong>Context:</strong> Provide background and purpose</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#3b999c] to-[#2d7a7d] rounded-xl p-8 text-white mb-8">
        <h3 className="text-2xl font-bold mb-4">
          🎉 Key Discoveries from Lab 2
        </h3>

        <div className="space-y-4 text-lg">
          <p>
            <strong>1.</strong> LLMs have deep knowledge but it's not uniform - popular topics get better answers
          </p>
          <p>
            <strong>2.</strong> Knowledge cutoff dates mean AI can't provide current information
          </p>
          <p>
            <strong>3.</strong> Specific prompts with details, constraints, and context get much better results
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
        <h3 className="text-xl font-bold text-blue-800 mb-4">
          🚀 Ready for the Quiz?
        </h3>
        <p className="text-gray-700 mb-4">
          Test your understanding of Lab 2 concepts with a quick 5-question quiz. This will help reinforce what you've learned!
        </p>
        <p className="text-sm text-gray-600">
          <strong>Tip:</strong> If you score less than 4/5, review the sections where you missed questions before moving to Lab 3.
        </p>
      </div>
    </LearnContent>
  )
}
