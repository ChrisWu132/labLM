/**
 * Lab 4, Section 4.1: AI Superpowers
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        What AI Excels At: LLM Superpowers
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        Not all tasks are equal for AI! Understanding what LLMs are <strong>exceptional</strong> at helps you use them more effectively.
      </p>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        AI's Core Strengths
      </h3>

      <div className="space-y-6 mb-8">
        <div className="bg-white border-l-4 border-green-500 p-6 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-green-800 mb-2 text-lg">1. Writing & Creative Content</h4>
          <p className="text-gray-700 mb-3">
            LLMs are <strong>exceptional</strong> at generating and refining text:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
            <li>Essays, stories, poems, and scripts</li>
            <li>Product descriptions and marketing copy</li>
            <li>Email drafts and professional correspondence</li>
            <li>Blog posts and social media content</li>
          </ul>
        </div>

        <div className="bg-white border-l-4 border-blue-500 p-6 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-blue-800 mb-2 text-lg">2. Explanation & Teaching</h4>
          <p className="text-gray-700 mb-3">
            Perfect for breaking down complex concepts:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
            <li>Explaining difficult topics in simple terms</li>
            <li>Using analogies and metaphors</li>
            <li>Adapting explanations to different audiences</li>
            <li>Answering "how" and "why" questions</li>
          </ul>
        </div>

        <div className="bg-white border-l-4 border-purple-500 p-6 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-purple-800 mb-2 text-lg">3. Summarization</h4>
          <p className="text-gray-700 mb-3">
            Great at condensing information:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
            <li>Condensing long texts into key points</li>
            <li>Extracting main ideas from articles</li>
            <li>Creating executive summaries</li>
            <li>Simplifying complex documents</li>
          </ul>
        </div>

        <div className="bg-white border-l-4 border-yellow-500 p-6 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-yellow-800 mb-2 text-lg">4. Translation & Language</h4>
          <p className="text-gray-700 mb-3">
            Strong language processing abilities:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
            <li>Translating between languages</li>
            <li>Rephrasing for different tones</li>
            <li>Grammar and style improvements</li>
            <li>Converting formal to casual (or vice versa)</li>
          </ul>
        </div>

        <div className="bg-white border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-red-800 mb-2 text-lg">5. Brainstorming</h4>
          <p className="text-gray-700 mb-3">
            Excellent creative thinking partner:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 text-sm">
            <li>Generating multiple ideas quickly</li>
            <li>Exploring different possibilities</li>
            <li>Creative problem-solving approaches</li>
            <li>Building on your initial concepts</li>
          </ul>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Why AI Excels at These Tasks
      </h3>

      <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-6 mb-8">
        <p className="text-gray-700 mb-4">
          LLMs are trained on massive amounts of text, so they've "seen" countless examples of:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Writing patterns:</strong> They know what good writing looks like across many styles</li>
          <li><strong>Explanations:</strong> They've read millions of teaching materials and tutorials</li>
          <li><strong>Translations:</strong> They've seen text in many languages paired together</li>
          <li><strong>Creative works:</strong> They've analyzed stories, poems, and creative content</li>
        </ul>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Best Practices for Leveraging AI Strengths
      </h3>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-green-50 border-2 border-green-400 rounded-lg p-4">
          <p className="font-bold text-green-700 mb-3">✅ Use AI when:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>You need multiple draft versions</li>
            <li>You're stuck and need ideas</li>
            <li>You want to learn or understand something</li>
            <li>You need text revised or improved</li>
            <li>You're exploring creative possibilities</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-4">
          <p className="font-bold text-blue-700 mb-3">💡 Pro tips:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>Be specific about style and tone</li>
            <li>Ask for multiple options to choose from</li>
            <li>Use AI as a starting point, then refine</li>
            <li>Combine AI output with your own ideas</li>
            <li>Iterate and improve based on results</li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          💡 Key Insight
        </p>
        <p className="text-gray-700">
          AI is best at tasks involving <strong>language patterns and creativity</strong>. Use it for generating, explaining, and transforming text!
        </p>
      </div>

      <div className="bg-[rgba(59,153,156,0.05)] border-2 border-[#3b999c] rounded-xl p-6">
        <h4 className="text-lg font-bold text-[#3b999c] mb-3">
          🎯 Ready to Test AI's Strengths!
        </h4>
        <p className="text-gray-700">
          Now let's see these superpowers in action. Head to the Try It tab to experiment with tasks that AI excels at!
        </p>
      </div>
    </LearnContent>
  )
}
