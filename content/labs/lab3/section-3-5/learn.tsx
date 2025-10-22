/**
 * Lab 3, Section 3.5: Review & Quiz
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent previousSummary="You learned to create advanced custom AI personas with specific expertise, personality traits, teaching styles, and unique characteristics.">
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Lab 3 Review: AI's "Thinking" Process
      </h2>

      <p className="text-lg text-gray-700 mb-8">
        Congratulations on completing Lab 3! Let's review everything you've mastered about how AI generates responses and how to control its personality.
      </p>

      <h3 className="text-2xl font-bold text-[#164055] mb-4">
        Key Concepts Mastered
      </h3>

      <div className="space-y-6 mb-8">
        <div className="bg-white border-l-4 border-blue-500 p-6 rounded-r-lg shadow-sm">
          <h4 className="text-xl font-bold text-blue-800 mb-3">
            1. Word-by-Word Generation
          </h4>
          <p className="text-gray-700 mb-3">
            LLMs don't "know" the full answer upfront. They generate responses <strong>one piece at a time</strong>, with each word influencing what comes next.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Example:</strong> "The capital of France is..." → AI predicts "Paris" based on all previous context.
            </p>
          </div>
        </div>

        <div className="bg-white border-l-4 border-green-500 p-6 rounded-r-lg shadow-sm">
          <h4 className="text-xl font-bold text-green-800 mb-3">
            2. Tokens: AI's Building Blocks
          </h4>
          <p className="text-gray-700 mb-3">
            <strong>Tokens</strong> are the basic units of text that AI processes (roughly words or word pieces).
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
            <li>AI processes text in tokens, not letters</li>
            <li>Longer prompts = more tokens = higher cost</li>
            <li>Token limits exist (context windows)</li>
          </ul>
        </div>

        <div className="bg-white border-l-4 border-purple-500 p-6 rounded-r-lg shadow-sm">
          <h4 className="text-xl font-bold text-purple-800 mb-3">
            3. Probabilistic Selection
          </h4>
          <p className="text-gray-700 mb-3">
            At each step, AI has multiple good options. It uses <strong>randomness</strong> to select from top choices, creating variety.
          </p>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Why it matters:</strong> Same prompt can give slightly different responses, making AI feel more creative and natural.
            </p>
          </div>
        </div>

        <div className="bg-white border-l-4 border-yellow-500 p-6 rounded-r-lg shadow-sm">
          <h4 className="text-xl font-bold text-yellow-800 mb-3">
            4. Context is King
          </h4>
          <p className="text-gray-700 mb-3">
            <strong>Context</strong> = Everything that came before. It shapes every word the AI predicts next.
          </p>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-yellow-700 mb-2">Four Types of Context:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li><strong>Audience:</strong> Who is this for?</li>
              <li><strong>Background:</strong> What information helps frame the task?</li>
              <li><strong>Situational:</strong> What's the goal or situation?</li>
              <li><strong>Preference:</strong> How do you want the answer?</li>
            </ul>
          </div>
        </div>

        <div className="bg-white border-l-4 border-[#3b999c] p-6 rounded-r-lg shadow-sm">
          <h4 className="text-xl font-bold text-[#3b999c] mb-3">
            5. Role-Playing Power
          </h4>
          <p className="text-gray-700 mb-3">
            Using <strong>"You are a [ROLE]"</strong> dramatically changes AI's output style, tone, and approach.
          </p>
          <div className="bg-[rgba(59,153,156,0.1)] p-4 rounded-lg">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Basic roles:</strong> "You are a patient teacher" / "You are a creative poet"
            </p>
            <p className="text-sm text-gray-700">
              <strong>Advanced personas:</strong> Detailed characters with expertise, personality, style, and unique traits
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Practical Skills You Can Use
      </h3>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-green-50 border-2 border-green-400 rounded-lg p-4">
          <p className="font-bold text-green-700 mb-2">✅ You can now:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>Understand why AI gives different responses each time</li>
            <li>Add rich context to improve AI responses</li>
            <li>Use roles to control AI's personality</li>
            <li>Create custom AI assistants for specific needs</li>
            <li>Combine multiple techniques for maximum control</li>
          </ul>
        </div>

        <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-4">
          <p className="font-bold text-blue-700 mb-2">🎯 Real-world applications:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>Get homework help in your learning style</li>
            <li>Create AI tutors for different subjects</li>
            <li>Generate creative content with specific tones</li>
            <li>Explain complex topics for specific audiences</li>
            <li>Design AI assistants tailored to your goals</li>
          </ul>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Quick Reference Guide
      </h3>

      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-8">
        <h4 className="font-bold text-[#164055] mb-4 text-lg">
          Formula for Powerful Prompts:
        </h4>

        <div className="space-y-3">
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#3b999c]">
            <p className="font-mono text-sm text-gray-800">
              <strong className="text-[#3b999c]">Step 1:</strong> Set the role<br/>
              "You are [detailed persona with traits and style]"
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
            <p className="font-mono text-sm text-gray-800">
              <strong className="text-blue-700">Step 2:</strong> Add context<br/>
              "I'm [audience]. I need [situation]. I know [background]."
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-500">
            <p className="font-mono text-sm text-gray-800">
              <strong className="text-green-700">Step 3:</strong> Make your request<br/>
              "Please [task] focusing on [specifics]. Use [format/style]."
            </p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          💡 Pro Tip
        </p>
        <p className="text-gray-700">
          The techniques from Lab 3 combine perfectly with what you learned in Labs 1 and 2! Use clear prompts + rich context + role-playing + constraints for maximum control.
        </p>
      </div>

      <div className="bg-[rgba(59,153,156,0.05)] border-2 border-[#3b999c] rounded-xl p-6">
        <h4 className="text-lg font-bold text-[#3b999c] mb-3">
          🎯 Ready for the Quiz?
        </h4>
        <p className="text-gray-700 mb-4">
          Test your understanding of Lab 3 concepts! Head to the Quiz tab to check your knowledge.
        </p>
        <p className="text-sm text-gray-600 italic">
          After completing the quiz, you'll be ready for Lab 4 where you'll learn about AI's capabilities, limitations, and how to get more accurate responses!
        </p>
      </div>
    </LearnContent>
  )
}
