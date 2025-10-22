/**
 * Lab 2, Section 2.3: Knowledge Cutoff
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Understanding Knowledge Cutoff Dates
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        Every LLM has a <strong>knowledge cutoff date</strong> - the last time it was trained on new data. This is one of the most important limitations to understand!
      </p>

      <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-[#3b999c] mb-4">
          What is a Knowledge Cutoff?
        </h3>

        <p className="text-gray-700 mb-4">
          Imagine taking a photograph of everything written on the internet on a specific date. That's essentially what a knowledge cutoff is - a snapshot in time.
        </p>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-semibold text-blue-800 mb-2">Example:</p>
          <p className="text-gray-700 text-sm">
            If an LLM's cutoff is <strong>April 2024</strong>, it knows:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-sm text-gray-700">
            <li>✅ Events before April 2024</li>
            <li>❌ Events after April 2024</li>
          </ul>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Why Does This Matter?
      </h3>

      <div className="space-y-4 mb-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <h4 className="font-bold text-red-700 mb-2">
            ❌ Don't Rely on AI For:
          </h4>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>• <strong>Real-time news</strong> or current events</li>
            <li>• <strong>Recent product releases</strong> or updates</li>
            <li>• <strong>Latest scientific discoveries</strong></li>
            <li>• <strong>Current statistics</strong> (population, stock prices, etc.)</li>
            <li>• <strong>Trending topics</strong> or viral content</li>
          </ul>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
          <h4 className="font-bold text-green-700 mb-2">
            ✅ AI is Great For:
          </h4>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>• <strong>Historical events</strong> and established facts</li>
            <li>• <strong>Timeless concepts</strong> (math, science principles)</li>
            <li>• <strong>Classic literature</strong> and well-known works</li>
            <li>• <strong>General knowledge</strong> that doesn't change frequently</li>
            <li>• <strong>Fundamental skills</strong> (writing, coding basics)</li>
          </ul>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        How to Work Around the Cutoff
      </h3>

      <div className="overflow-x-auto rounded-2xl border-2 border-gray-200 shadow-sm bg-white mb-8">
        <table className="w-full text-left border-collapse">
          <thead style={{ backgroundColor: '#f7aa37' }}>
            <tr>
              <th className="px-6 py-4 font-semibold text-white">Need</th>
              <th className="px-6 py-4 font-semibold text-white">Use AI For</th>
              <th className="px-6 py-4 font-semibold text-white">Then Check</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">Current News</td>
              <td className="px-6 py-4 text-gray-700 text-sm">Background context</td>
              <td className="px-6 py-4 text-gray-700 text-sm">News websites</td>
            </tr>
            <tr className="border-t border-gray-200 bg-gray-50">
              <td className="px-6 py-4 font-semibold text-[#164055]">Latest Stats</td>
              <td className="px-6 py-4 text-gray-700 text-sm">Understanding concepts</td>
              <td className="px-6 py-4 text-gray-700 text-sm">Official data sources</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">Recent Tech</td>
              <td className="px-6 py-4 text-gray-700 text-sm">General principles</td>
              <td className="px-6 py-4 text-gray-700 text-sm">Official documentation</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          💡 Pro Tip
        </p>
        <p className="text-gray-700">
          Always check <strong>when</strong> information might matter. For a history essay about World War II? AI is perfect! For today's weather forecast? Use a weather app instead!
        </p>
      </div>

      <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
        <h4 className="font-bold text-blue-800 mb-3">
          🎯 The Right Tool for the Right Job
        </h4>

        <div className="space-y-3 text-sm">
          <div>
            <p className="font-semibold text-gray-700">For Explanations & Learning:</p>
            <p className="text-gray-600">Use AI to understand concepts and get help learning</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">For Current Information:</p>
            <p className="text-gray-600">Use search engines, news sites, and official sources</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">For Critical Facts:</p>
            <p className="text-gray-600">Verify AI's answers with multiple reliable sources</p>
          </div>
        </div>
      </div>
    </LearnContent>
  )
}
