/**
 * Lab 1, Section 1.4: Experiment Time
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent previousSummary="You learned why AI gives different answers due to randomness, and how this makes responses more natural and creative.">
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Prompt Experiment Time!
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        You've learned the basics—now it's time to experiment! This section gives you tips and ideas for testing different prompt techniques.
      </p>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Tips for Good Prompts
      </h3>

      <div className="space-y-4 mb-8">
        <div className="bg-white border-l-4 border-green-500 p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-green-700 mb-2"> Be Specific</h4>
          <p className="text-gray-700 mb-2">
            Instead of "Tell me about dogs" → "Explain why Golden Retrievers are good family pets in 100 words"
          </p>
          <p className="text-sm text-gray-500 italic">
            Specificity gives the AI clear direction
          </p>
        </div>

        <div className="bg-white border-l-4 border-blue-500 p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-blue-700 mb-2"> Give Context</h4>
          <p className="text-gray-700 mb-2">
            Add "for a 5th grader" or "for a science presentation" to tailor the response
          </p>
          <p className="text-sm text-gray-500 italic">
            Context helps AI match the right tone and depth
          </p>
        </div>

        <div className="bg-white border-l-4 border-purple-500 p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-purple-700 mb-2"> Set Format</h4>
          <p className="text-gray-700 mb-2">
            Request "as a bulleted list" or "in 3 paragraphs" for structured output
          </p>
          <p className="text-sm text-gray-500 italic">
            Format constraints make responses easier to use
          </p>
        </div>

        <div className="bg-white border-l-4 border-orange-500 p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-orange-700 mb-2"> Ask Follow-ups</h4>
          <p className="text-gray-700 mb-2">
            If the first answer isn't quite right, ask the AI to clarify, expand, or simplify
          </p>
          <p className="text-sm text-gray-500 italic">
            You can refine responses through conversation
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Specific vs. Vague: The Difference
      </h3>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-5">
          <p className="font-bold text-red-700 mb-3"> Vague Prompts</p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>"Write something about space"</li>
            <li>"Tell me about history"</li>
            <li>"Explain programming"</li>
            <li>"Give me ideas"</li>
          </ul>
          <p className="text-sm text-red-600 mt-4 italic">
            Result: Generic, unfocused answers
          </p>
        </div>

        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-5">
          <p className="font-bold text-green-700 mb-3"> Specific Prompts</p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>"Explain black holes to a 12-year-old in 3 simple points"</li>
            <li>"Summarize the American Revolution in 5 key events"</li>
            <li>"What is a Python loop? Give me a simple example"</li>
            <li>"Give me 3 ideas for a school science fair project about plants"</li>
          </ul>
          <p className="text-sm text-green-600 mt-4 italic">
            Result: Focused, useful, actionable answers
          </p>
        </div>
      </div>

      <div className="bg-[rgba(59,153,156,0.05)] border-2 border-[#3b999c] rounded-xl p-6 mb-8">
        <h4 className="text-lg font-bold text-[#3b999c] mb-3">
          Ready to Experiment!
        </h4>
        <p className="text-gray-700 mb-4">
          Head to the Try It tab to test different prompting strategies and see which approaches work best for different tasks!
        </p>
        <p className="text-sm text-gray-600 italic">
          Remember: There's no "wrong" way to experiment. The goal is to discover what works best for YOU!
        </p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          Pro Tip
        </p>
        <p className="text-gray-700">
          Save prompts that work well! You can reuse and adapt them for similar tasks later.
        </p>
      </div>
    </LearnContent>
  )
}
