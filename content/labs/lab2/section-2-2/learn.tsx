/**
 * Lab 2, Section 2.2: Knowledge Sources
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Knowledge Sources & Depth
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        Not all topics are equal! The AI's knowledge depth varies based on how much training data existed on that topic.
      </p>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Why Some Topics Get Better Answers
      </h3>

      <div className="overflow-x-auto rounded-2xl border-2 border-gray-200 shadow-sm bg-white mb-8">
        <table className="w-full text-left border-collapse">
          <thead style={{ backgroundColor: '#f7aa37' }}>
            <tr>
              <th className="px-6 py-4 font-semibold text-white">Topic Type</th>
              <th className="px-6 py-4 font-semibold text-white">Training Data</th>
              <th className="px-6 py-4 font-semibold text-white">Answer Quality</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">Popular Topics</td>
              <td className="px-6 py-4 text-gray-700">Massive amounts</td>
              <td className="px-6 py-4 text-green-600 font-semibold">Excellent </td>
            </tr>
            <tr className="border-t border-gray-200 bg-gray-50">
              <td className="px-6 py-4 font-semibold text-[#164055]">Common Knowledge</td>
              <td className="px-6 py-4 text-gray-700">Large amounts</td>
              <td className="px-6 py-4 text-green-600 font-semibold">Very Good </td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">Specialized Topics</td>
              <td className="px-6 py-4 text-gray-700">Moderate amounts</td>
              <td className="px-6 py-4 text-yellow-600 font-semibold">Good ~</td>
            </tr>
            <tr className="border-t border-gray-200 bg-gray-50">
              <td className="px-6 py-4 font-semibold text-[#164055]">Obscure Topics</td>
              <td className="px-6 py-4 text-gray-700">Limited data</td>
              <td className="px-6 py-4 text-orange-600 font-semibold">Fair ~</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">Very Rare Topics</td>
              <td className="px-6 py-4 text-gray-700">Minimal data</td>
              <td className="px-6 py-4 text-red-600 font-semibold">Vague </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-6">
        <h4 className="text-xl font-bold text-[#3b999c] mb-4">
          Examples by Topic
        </h4>

        <div className="space-y-4">
          <div>
            <p className="font-semibold text-green-700 mb-2">
              Popular Topics (Excellent Answers):
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
              <li>Photosynthesis, Python programming, Harry Potter</li>
              <li>World War II, Shakespeare, basic math concepts</li>
              <li>Climate change, healthy eating, common animals (cats, dogs)</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-yellow-700 mb-2">
              ~ Specialized Topics (Good Answers):
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
              <li>Quantum physics, advanced programming algorithms</li>
              <li>Specific historical battles, rare diseases</li>
              <li>Regional cuisines, niche hobbies</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-red-700 mb-2">
              Obscure Topics (May Be Vague):
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
              <li>Very specific local history</li>
              <li>Extremely rare languages or dialects</li>
              <li>Brand new scientific discoveries (after training cutoff)</li>
            </ul>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Three Factors That Affect Answer Quality
      </h3>

      <div className="space-y-4 mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
          <h4 className="font-bold text-blue-700 mb-2">
            1. Training Data Frequency
          </h4>
          <p className="text-gray-700 text-sm">
            Topics that appear more often in training data → Better, more detailed answers<br/>
            Rare topics → Generic or vague responses
          </p>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-lg">
          <h4 className="font-bold text-purple-700 mb-2">
            2. Question Clarity
          </h4>
          <p className="text-gray-700 text-sm">
            Clear, specific questions → Focused, relevant answers<br/>
            Vague, ambiguous questions → Generic, unfocused responses
          </p>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
          <h4 className="font-bold text-green-700 mb-2">
            3. Task Type
          </h4>
          <p className="text-gray-700 text-sm">
            Explanation/Writing/Creative tasks → AI's strength <br/>
            Real-time facts/Complex calculations → AI's weakness
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          Key Insight
        </p>
        <p className="text-gray-700">
          The AI's knowledge is <strong>not</strong> uniform. It's like an expert who has read everything about certain topics but only skimmed others. Understanding this helps you know when to trust AI answers and when to verify them yourself.
        </p>
      </div>
    </LearnContent>
  )
}
