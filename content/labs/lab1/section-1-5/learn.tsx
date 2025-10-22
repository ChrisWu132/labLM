/**
 * Lab 1, Section 1.5: Review & Quiz
 * Learn Tab Content (Recap)
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Lab 1 Review & Recap
      </h2>

      <p className="text-lg text-gray-700 mb-8">
        Congratulations! You've completed all the learning sections of Lab 1. Let's review what you've learned before taking the quiz.
      </p>

      <div className="bg-[rgba(59,153,156,0.05)] border-2 border-[#3b999c] rounded-xl p-6 mb-8">
        <h3 className="text-2xl font-bold text-[#3b999c] mb-6">
          Key Takeaways from Lab 1
        </h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-bold text-[#164055] mb-3">Section 1.1: What is AI?</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-3">
                <span className="text-[#3b999c] flex-shrink-0"></span>
                <span><strong>LLM</strong> = Large Language Model, a type of AI that understands and generates text</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#3b999c] flex-shrink-0"></span>
                <span>LLMs work by <strong>predicting the next word</strong> based on patterns learned from training data</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#3b999c] flex-shrink-0"></span>
                <span>LLMs <strong>create new text</strong>, unlike search engines which find existing content</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#3b999c] flex-shrink-0"></span>
                <span>AI is a <strong>tool, not a thinking being</strong>—it uses statistical patterns, not consciousness</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold text-[#164055] mb-3">Section 1.2: Your First Prompt</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-3">
                <span className="text-[#3b999c] flex-shrink-0"></span>
                <span>A <strong>prompt</strong> is your instruction or question to the AI</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#3b999c] flex-shrink-0"></span>
                <span>Good prompts include: <strong>clear task, context, details, and format</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#3b999c] flex-shrink-0"></span>
                <span><strong>Specific prompts</strong> get better results than vague ones</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold text-[#164055] mb-3">Section 1.3: Why Different Answers?</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-3">
                <span className="text-[#3b999c] flex-shrink-0"></span>
                <span>LLMs use <strong>randomness</strong> to make responses more natural and creative</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#3b999c] flex-shrink-0"></span>
                <span>At each step, AI picks from <strong>multiple good options</strong>, not always the most likely one</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#3b999c] flex-shrink-0"></span>
                <span>Variation is <strong>useful for creativity</strong> (stories, brainstorming, etc.)</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold text-[#164055] mb-3">Section 1.4: Experiment Time</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex gap-3">
                <span className="text-[#3b999c] flex-shrink-0"></span>
                <span>Experimentation helps you <strong>discover what works</strong> for different tasks</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#3b999c] flex-shrink-0"></span>
                <span>You can <strong>refine prompts</strong> based on the responses you get</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#3b999c] flex-shrink-0"></span>
                <span><strong>Practice makes perfect</strong>—the more you use AI, the better you get</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg mb-8">
        <h4 className="text-lg font-bold text-blue-900 mb-3">
          What You Can Do Now
        </h4>
        <p className="text-gray-800 mb-3">
          You now understand:
        </p>
        <ul className="space-y-2 text-gray-800 text-sm">
          <li> How LLMs work (next word prediction)</li>
          <li> How to write clear, effective prompts</li>
          <li> Why AI gives different answers each time</li>
          <li> How to experiment and refine your prompts</li>
        </ul>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          Ready for the Quiz?
        </p>
        <p className="text-gray-700">
          Head to the <strong>Quiz tab</strong> to test your understanding of Lab 1! The quiz has 5 questions covering all the key concepts.
        </p>
      </div>

      <div className="bg-gradient-to-r from-[#3b999c]/10 to-[#f7aa37]/10 border-2 border-[#3b999c] rounded-xl p-6">
        <h4 className="text-lg font-bold text-[#164055] mb-3">
          What's Next?
        </h4>
        <p className="text-gray-700 mb-2">
          After completing the quiz, you'll unlock <strong>Lab 2: How AI Gets Smart</strong>, where you'll learn:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
          <li>How LLMs learn from training data</li>
          <li>What LLMs know (and don't know)</li>
          <li>Advanced prompt engineering techniques</li>
          <li>How to add constraints for precise outputs</li>
        </ul>
      </div>
    </LearnContent>
  )
}
