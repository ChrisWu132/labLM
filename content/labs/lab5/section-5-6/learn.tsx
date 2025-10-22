/**
 * Lab 5, Section 5.6: Review & Quiz
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Lab 5 Review: Responsible AI Use & Mastery
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        Congratulations on completing Lab 5! Let's review everything you've learned about using AI responsibly and effectively.
      </p>

      <div className="bg-[rgba(59,153,156,0.05)] border-l-4 border-[#3b999c] p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-[#3b999c] mb-2">
          What You've Mastered
        </p>
        <p className="text-gray-700">
          You now understand not just HOW to use AI, but WHEN to use it, HOW to use it ethically, and HOW to think critically about its outputs. These skills will serve you for years to come!
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Key Concepts from Lab 5
      </h3>

      <div className="space-y-4 mb-8">
        <div className="bg-white border-2 border-green-400 rounded-xl p-6">
          <h4 className="text-xl font-bold text-green-700 mb-3">
            1. AI Ethics (Section 5.1)
          </h4>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Honesty & Integrity:</strong> Be honest about when and how you use AI</li>
            <li><strong>Learning Over Shortcuts:</strong> Use AI to help you learn, not to avoid learning</li>
            <li><strong>Fairness & Bias:</strong> Be aware that AI can have biases and think critically</li>
            <li><strong>Respect for Others:</strong> Don't use AI to harm others or violate privacy</li>
          </ul>
          <p className="mt-3 text-sm text-green-600 font-semibold">
            Golden Rule: Use AI to help you LEARN, not to AVOID learning
          </p>
        </div>

        <div className="bg-white border-2 border-blue-400 rounded-xl p-6">
          <h4 className="text-xl font-bold text-blue-700 mb-3">
            2. Academic Integrity (Section 5.2)
          </h4>
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-blue-800 mb-2">✅ Good Uses (Learning):</p>
              <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                <li>Understanding difficult concepts with explanations</li>
                <li>Getting unstuck when brainstorming ideas</li>
                <li>Checking your work and learning from mistakes</li>
                <li>Learning new skills with examples and practice</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-red-800 mb-2">❌ Bad Uses (Cheating):</p>
              <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                <li>Having AI write your essays or do your homework</li>
                <li>Copying answers without understanding</li>
                <li>Using AI during tests when not allowed</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-purple-400 rounded-xl p-6">
          <h4 className="text-xl font-bold text-purple-700 mb-3">
            3. Privacy Protection (Section 5.3)
          </h4>
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-red-800 mb-2">❌ NEVER Share:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                <li>Personal information (name, address, phone, age details)</li>
                <li>Passwords or security information</li>
                <li>Private content (photos, conversations, health info)</li>
                <li>Location details or schedule information</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-green-800 mb-2">✅ Safe to Share:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
                <li>General information (e.g., "I'm a middle school student")</li>
                <li>Educational context without identifying details</li>
                <li>Broad interests and learning goals</li>
              </ul>
            </div>
          </div>
          <p className="mt-3 text-sm text-purple-600 font-semibold">
            Rule: Treat AI like a stranger on the internet—don't share personal info!
          </p>
        </div>

        <div className="bg-white border-2 border-orange-400 rounded-xl p-6">
          <h4 className="text-xl font-bold text-orange-700 mb-3">
            4. Critical Thinking (Section 5.4)
          </h4>
          <p className="text-gray-700 mb-3">
            <strong>The 5 Questions Framework:</strong>
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li><strong>Does this make sense?</strong> Use your own knowledge and logic</li>
            <li><strong>Can I verify this?</strong> Check with reliable sources</li>
            <li><strong>Is this biased?</strong> Look for assumptions or stereotypes</li>
            <li><strong>Is this complete?</strong> Are important details missing?</li>
            <li><strong>How confident should I be?</strong> Always verify important info</li>
          </ol>
          <p className="mt-3 text-sm text-orange-600 font-semibold">
            Remember: AI can make mistakes, hallucinate, and have biases. Think critically!
          </p>
        </div>

        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6">
          <h4 className="text-xl font-bold text-[#3b999c] mb-3">
            5. Multi-Step Workflows (Section 5.5)
          </h4>
          <p className="text-gray-700 mb-3">
            Break complex problems into smaller steps and chain prompts together:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>More Control:</strong> Review and adjust after each step</li>
            <li><strong>Better Quality:</strong> Each step focuses on one specific goal</li>
            <li><strong>More Learning:</strong> Think critically at each stage</li>
            <li><strong>Easier Debugging:</strong> Know exactly which step to fix</li>
          </ul>
          <p className="mt-3 text-sm text-[#3b999c] font-semibold">
            Pro Tip: Manual chaining teaches you the process. Lab 6 will teach automation!
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Skills from All 5 Labs Combined
      </h3>

      <div className="overflow-x-auto rounded-2xl border-2 border-gray-200 shadow-sm bg-white mb-8">
        <table className="w-full text-left border-collapse">
          <thead style={{ backgroundColor: '#f7aa37' }}>
            <tr>
              <th className="px-6 py-4 font-semibold text-white">Lab</th>
              <th className="px-6 py-4 font-semibold text-white">Key Skill</th>
              <th className="px-6 py-4 font-semibold text-white">Application</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">Lab 1</td>
              <td className="px-6 py-4 text-gray-700">Clear Instructions</td>
              <td className="px-6 py-4 text-gray-700">Ask specific questions with details</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">Lab 2</td>
              <td className="px-6 py-4 text-gray-700">Context & Constraints</td>
              <td className="px-6 py-4 text-gray-700">Provide background info and set limits</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">Lab 3</td>
              <td className="px-6 py-4 text-gray-700">Role-Playing</td>
              <td className="px-6 py-4 text-gray-700">Use "You are..." to shape responses</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">Lab 4</td>
              <td className="px-6 py-4 text-gray-700">Chain-of-Thought</td>
              <td className="px-6 py-4 text-gray-700">Request step-by-step reasoning</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">Lab 5</td>
              <td className="px-6 py-4 text-gray-700">Responsible Use</td>
              <td className="px-6 py-4 text-gray-700">Ethics, privacy, critical thinking</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-[#164055] text-white rounded-xl p-8 mb-8">
        <h3 className="text-2xl font-bold mb-4 text-center">
          Your AI Mastery Checklist
        </h3>
        <p className="text-center text-gray-200 mb-6">
          You're ready when you can confidently do all of these:
        </p>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div className="space-y-2">
            <p className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Explain how an LLM generates responses</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Write clear prompts with context</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Use role-playing to control AI</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Apply Chain-of-Thought reasoning</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Recognize AI hallucinations</span>
            </p>
          </div>
          <div className="space-y-2">
            <p className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Use AI ethically for learning</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Protect your privacy with AI</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Combine multiple techniques</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Think critically about outputs</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Chain prompts for complex tasks</span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          🎯 Before the Quiz
        </p>
        <p className="text-gray-700">
          Review the key concepts above and make sure you understand the ethical principles, privacy rules, and critical thinking frameworks. The quiz will test your comprehensive understanding of responsible AI use!
        </p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-sm font-semibold text-blue-700 mb-2">
          🎓 You Are Now an AI-Literate Learner!
        </p>
        <p className="text-gray-700">
          You don't just know how to USE AI—you understand what it is, how it works, when to trust it, when to question it, and how to use it responsibly. This knowledge will serve you for years to come as AI becomes more integrated into education, work, and daily life.
        </p>
      </div>
    </LearnContent>
  )
}
