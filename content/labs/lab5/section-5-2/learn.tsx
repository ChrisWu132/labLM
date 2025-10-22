/**
 * Lab 5, Section 5.2: Academic Integrity
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Academic Integrity: Using AI Honestly
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        Using AI for schoolwork is like using a calculator—it's a tool that can help you learn, but you need to use it correctly. Let's learn the difference between AI-assisted learning and plagiarism.
      </p>

      <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-bold text-green-700 mb-3">
          ✅ GOOD: AI-Assisted Learning
        </h3>
        <p className="text-gray-700 mb-4">
          These uses help you LEARN and develop your own understanding:
        </p>
      </div>

      <div className="space-y-6 mb-8">
        <div className="bg-white border-2 border-green-400 rounded-xl p-6">
          <h4 className="text-lg font-bold text-green-700 mb-3">
            1. Understanding Concepts
          </h4>
          <div className="space-y-3">
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <p className="text-sm font-semibold text-red-700 mb-1">❌ BAD</p>
              <p className="text-gray-700">"What's the answer to question 5 on my worksheet?"</p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
              <p className="text-sm font-semibold text-green-700 mb-1">✅ GOOD</p>
              <p className="text-gray-700">"I don't understand photosynthesis. Can you explain it using a simple analogy?"</p>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-green-400 rounded-xl p-6">
          <h4 className="text-lg font-bold text-green-700 mb-3">
            2. Getting Unstuck
          </h4>
          <div className="space-y-3">
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <p className="text-sm font-semibold text-red-700 mb-1">❌ BAD</p>
              <p className="text-gray-700">"Write my essay about Romeo and Juliet."</p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
              <p className="text-sm font-semibold text-green-700 mb-1">✅ GOOD</p>
              <p className="text-gray-700">"I'm writing about themes in Romeo and Juliet. Can you help me brainstorm 3 possible themes to explore?"</p>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-green-400 rounded-xl p-6">
          <h4 className="text-lg font-bold text-green-700 mb-3">
            3. Checking Your Work
          </h4>
          <div className="space-y-3">
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <p className="text-sm font-semibold text-red-700 mb-1">❌ BAD</p>
              <p className="text-gray-700">"Solve this math problem for me."</p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
              <p className="text-sm font-semibold text-green-700 mb-1">✅ GOOD</p>
              <p className="text-gray-700">"I solved this problem and got X. Can you check my steps and tell me if I made a mistake?"</p>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-green-400 rounded-xl p-6">
          <h4 className="text-lg font-bold text-green-700 mb-3">
            4. Learning New Skills
          </h4>
          <div className="space-y-3">
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <p className="text-sm font-semibold text-red-700 mb-1">❌ BAD</p>
              <p className="text-gray-700">"Write my code for me."</p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
              <p className="text-sm font-semibold text-green-700 mb-1">✅ GOOD</p>
              <p className="text-gray-700">"I'm trying to create a loop in Python but I'm stuck. Can you explain how loops work with an example?"</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-bold text-red-700 mb-3">
          ❌ BAD: Plagiarism & Cheating
        </h3>
        <p className="text-gray-700 mb-4">
          These uses hurt your learning and are academically dishonest:
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="bg-white border-2 border-red-400 rounded-xl p-6">
          <h4 className="text-lg font-bold text-red-700 mb-3">
            1. Direct Copying
          </h4>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Asking AI to write your essay and submitting it as yours</li>
            <li>Copying answers from AI without understanding them</li>
            <li>Using AI to do your homework entirely</li>
          </ul>
        </div>

        <div className="bg-white border-2 border-red-400 rounded-xl p-6">
          <h4 className="text-lg font-bold text-red-700 mb-3">
            2. Avoiding Learning
          </h4>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Never attempting problems yourself first</li>
            <li>Using AI as a shortcut instead of a learning tool</li>
            <li>Not understanding what the AI produces</li>
          </ul>
        </div>

        <div className="bg-white border-2 border-red-400 rounded-xl p-6">
          <h4 className="text-lg font-bold text-red-700 mb-3">
            3. Academic Dishonesty
          </h4>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Submitting AI-generated work as your own original work</li>
            <li>Using AI during tests when it's not allowed</li>
            <li>Not citing AI when you're required to</li>
          </ul>
        </div>
      </div>

      <div className="bg-[#164055] text-white rounded-xl p-8 text-center mb-8">
        <h3 className="text-2xl font-bold mb-4">
          The 3 Key Questions
        </h3>
        <div className="space-y-3 text-left max-w-2xl mx-auto">
          <p className="text-lg">💭 "Am I learning from this, or just getting an answer?"</p>
          <p className="text-lg">💭 "Could I explain this to someone else after using AI?"</p>
          <p className="text-lg">💭 "Am I using AI to understand better, or to skip the work?"</p>
        </div>
        <p className="text-xl font-semibold mt-6">
          If you're not learning, you're using it wrong!
        </p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-sm font-semibold text-blue-700 mb-2">
          💡 Pro Tip
        </p>
        <p className="text-gray-700">
          When in doubt, ask your teacher! Many teachers appreciate when students are upfront about using AI as a learning tool. They can help you understand the boundaries and expectations for your specific assignments.
        </p>
      </div>
    </LearnContent>
  )
}
