/**
 * Lab 1, Section 1.3: Why Different Answers?
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent previousSummary="You learned what prompts are and how to write clear, specific instructions for the AI.">
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Why Different Answers?
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        Have you noticed that when you ask the AI the same question twice, you get slightly different answers? This isn't a bug—it's a feature! Let's explore why.
      </p>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Randomness in AI Responses
      </h3>

      <p className="text-lg text-gray-700 mb-6">
        Remember: LLMs are "next word predictors." At each step, the AI has multiple good options for what word should come next.
      </p>

      <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-8">
        <h4 className="text-xl font-bold text-[#3b999c] mb-4">
          How It Works
        </h4>

        <p className="text-gray-700 mb-4">
          When you ask: <span className="font-mono bg-gray-100 px-2 py-1 rounded">"The sky is..."</span>
        </p>

        <div className="space-y-3 mb-4">
          <div className="bg-green-100 border-l-4 border-green-500 p-3 rounded">
            <p className="text-gray-800">
              <span className="font-bold text-green-700">Most likely:</span> "blue" (40% chance)
            </p>
          </div>
          <div className="bg-blue-100 border-l-4 border-blue-500 p-3 rounded">
            <p className="text-gray-800">
              <span className="font-bold text-blue-700">Also likely:</span> "clear" (30% chance)
            </p>
          </div>
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
            <p className="text-gray-800">
              <span className="font-bold text-yellow-700">Less likely:</span> "gray" (20% chance)
            </p>
          </div>
          <div className="bg-orange-100 border-l-4 border-orange-500 p-3 rounded">
            <p className="text-gray-800">
              <span className="font-bold text-orange-700">Rare:</span> "vast" (10% chance)
            </p>
          </div>
        </div>

        <p className="text-gray-700">
          The AI doesn't always pick the <em>most</em> likely word. It randomly selects from the top options, adding variety and creativity!
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Why Is This Useful?
      </h3>

      <p className="text-lg text-gray-700 mb-6">
        This randomness (called "temperature" in AI terms) has important benefits:
      </p>

      <div className="space-y-4 mb-8">
        <div className="bg-white border-l-4 border-[#3b999c] p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-[#164055] mb-2"> More Natural</h4>
          <p className="text-gray-700">Responses feel more human-like, not robotic</p>
          <p className="text-sm text-gray-500 mt-1 italic">
            Example: A human wouldn't say "blue" every single time!
          </p>
        </div>

        <div className="bg-white border-l-4 border-[#3b999c] p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-[#164055] mb-2"> More Creative</h4>
          <p className="text-gray-700">Good for stories, poems, and brainstorming</p>
          <p className="text-sm text-gray-500 mt-1 italic">
            Example: Get 5 different story ideas from the same prompt
          </p>
        </div>

        <div className="bg-white border-l-4 border-[#3b999c] p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-[#164055] mb-2"> More Flexible</h4>
          <p className="text-gray-700">Can explore multiple ways to phrase an answer</p>
          <p className="text-sm text-gray-500 mt-1 italic">
            Example: Different teaching styles for different learners
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          Key Insight
        </p>
        <p className="text-gray-700">
          This is why you should run important prompts multiple times! You might get an even better answer the second or third try.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        What Stays the Same?
      </h3>

      <p className="text-lg text-gray-700 mb-6">
        Even with randomness, certain things remain consistent:
      </p>

      <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">
        <li><strong>Relevance:</strong> All responses will be on-topic and related to your prompt</li>
        <li><strong>Accuracy:</strong> Factual information stays mostly the same (though phrased differently)</li>
        <li><strong>Structure:</strong> If you asked for 3 reasons, you'll get 3 reasons each time</li>
        <li><strong>Tone:</strong> The overall style and personality match your request</li>
      </ul>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-sm font-semibold text-blue-700 mb-2">
          Technical Note
        </p>
        <p className="text-gray-700">
          In AI settings, you can control the "temperature" (amount of randomness). Higher temperature = more creative and varied. Lower temperature = more focused and consistent. Most tools use a balanced default.
        </p>
      </div>
    </LearnContent>
  )
}
