/**
 * Lab 3, Section 3.2: Context Windows
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent previousSummary="You learned how LLMs generate responses word-by-word, what tokens are, and how probabilistic selection creates variety in responses.">
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        The Role of Context in AI Responses
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        You've seen that context matters - but <em>why</em> does it matter so much? Let's dive deeper into how context shapes every word the AI generates.
      </p>

      <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-[#3b999c] mb-4">
          What is Context?
        </h3>

        <p className="text-gray-700 mb-4">
          <strong>Context</strong> = Everything that came before the current word
        </p>

        <p className="text-gray-700">
          Context includes your entire prompt plus all the words the AI has generated so far in its response. Think of it as the AI's "working memory" for the current conversation.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        How Context Shapes Predictions
      </h3>

      <p className="text-lg text-gray-700 mb-4">
        The same sentence structure can lead to completely different predictions based on context:
      </p>

      <div className="overflow-x-auto rounded-2xl border-2 border-gray-200 shadow-sm bg-white mb-8">
        <table className="w-full text-left border-collapse">
          <thead style={{ backgroundColor: '#f7aa37' }}>
            <tr>
              <th className="px-6 py-4 font-semibold text-white">Context</th>
              <th className="px-6 py-4 font-semibold text-white">Next Words Likely...</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 text-gray-700">"The doctor said I need..."</td>
              <td className="px-6 py-4 text-gray-700">medicine, rest, surgery, tests</td>
            </tr>
            <tr className="border-t border-gray-200 bg-gray-50">
              <td className="px-6 py-4 text-gray-700">"The baker said I need..."</td>
              <td className="px-6 py-4 text-gray-700">flour, eggs, more oven space, sugar</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 text-gray-700">"The teacher said I need..."</td>
              <td className="px-6 py-4 text-gray-700">to study, more practice, to pay attention</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          💡 Key Insight
        </p>
        <p className="text-gray-700">
          Same structure ("said I need..."), but <strong>context changes everything!</strong> The AI uses all previous words to predict what makes sense next.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        The Context Window
      </h3>

      <p className="text-lg text-gray-700 mb-4">
        LLMs have a limited "memory" called the <strong>context window</strong>.
      </p>

      <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-6">
        <h4 className="text-lg font-bold text-[#3b999c] mb-3">
          Understanding Context Windows
        </h4>

        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold text-blue-800 mb-2">What is it?</p>
            <p className="text-gray-700 text-sm">
              The maximum amount of text (in tokens) that an AI can "remember" at once. This includes your prompt AND the AI's response.
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="font-semibold text-green-800 mb-2">Typical Sizes</p>
            <ul className="text-gray-700 text-sm list-disc pl-5 space-y-1">
              <li>Older models: 2,000-4,000 tokens (~1,500-3,000 words)</li>
              <li>Modern models: 8,000-32,000 tokens (~6,000-24,000 words)</li>
              <li>Advanced models: 100,000+ tokens (~75,000+ words)</li>
            </ul>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <p className="font-semibold text-red-800 mb-2">What happens when you exceed it?</p>
            <p className="text-gray-700 text-sm">
              The AI "forgets" the oldest parts of the conversation. It's like trying to remember a book you just read - you remember the recent chapters clearly, but earlier chapters fade.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Types of Context You Can Provide
      </h3>

      <div className="space-y-4 mb-8">
        <div className="bg-white border-l-4 border-[#3b999c] p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-[#164055] mb-2">1. Audience Context</h4>
          <p className="text-gray-700 mb-2">Who is this for?</p>
          <p className="text-sm text-gray-500 italic">Example: "Explain to a 10-year-old", "for a technical audience", "for beginners"</p>
        </div>

        <div className="bg-white border-l-4 border-[#3b999c] p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-[#164055] mb-2">2. Background Context</h4>
          <p className="text-gray-700 mb-2">What information helps frame the task?</p>
          <p className="text-sm text-gray-500 italic">Example: "I'm learning Python for data science", "I have a biology test tomorrow"</p>
        </div>

        <div className="bg-white border-l-4 border-[#3b999c] p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-[#164055] mb-2">3. Situational Context</h4>
          <p className="text-gray-700 mb-2">What's the situation or goal?</p>
          <p className="text-sm text-gray-500 italic">Example: "I need to write a persuasive essay", "I'm debugging code that crashes"</p>
        </div>

        <div className="bg-white border-l-4 border-[#3b999c] p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-[#164055] mb-2">4. Preference Context</h4>
          <p className="text-gray-700 mb-2">How do you want the answer?</p>
          <p className="text-sm text-gray-500 italic">Example: "using simple language", "with examples", "step-by-step"</p>
        </div>
      </div>

      <div className="bg-green-50 border-2 border-green-400 rounded-xl p-6 mb-8">
        <h4 className="font-bold text-green-800 mb-3">
          ✅ Example: Adding Rich Context
        </h4>

        <div className="space-y-4">
          <div className="bg-red-100 border-l-4 border-red-400 p-4 rounded">
            <p className="text-sm font-semibold text-red-700 mb-2">❌ Minimal Context</p>
            <p className="font-mono text-sm text-gray-800">"Explain photosynthesis."</p>
          </div>

          <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded">
            <p className="text-sm font-semibold text-green-700 mb-2">✅ Rich Context</p>
            <p className="font-mono text-sm text-gray-800">
              "I'm a 13-year-old student studying for a biology test. Explain photosynthesis using a simple analogy I can remember. Focus on the main inputs and outputs, and keep it under 100 words."
            </p>
          </div>
        </div>

        <p className="text-gray-700 mt-4 text-sm">
          The second prompt gives the AI context about: <strong>audience</strong> (13-year-old), <strong>situation</strong> (studying for test), <strong>preference</strong> (simple analogy, memorable), and <strong>constraints</strong> (main points, under 100 words).
        </p>
      </div>

      <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
        <h4 className="font-bold text-blue-800 mb-3">
          🎯 Ready to Practice!
        </h4>
        <p className="text-gray-700">
          Now that you understand how context works, let's practice adding rich context to your prompts. Head to the Try It tab!
        </p>
      </div>
    </LearnContent>
  )
}
