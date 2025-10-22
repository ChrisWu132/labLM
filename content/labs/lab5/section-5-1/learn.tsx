/**
 * Lab 5, Section 5.1: AI Ethics
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        AI Ethics: Using AI Responsibly
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        Now that you know HOW to use AI effectively, let's talk about WHEN and HOW you should use it responsibly. AI is a powerful tool, but like any tool, it needs to be used ethically and with care.
      </p>

      <div className="bg-[rgba(59,153,156,0.05)] border-l-4 border-[#3b999c] p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-[#3b999c] mb-2">
          Why AI Ethics Matter
        </p>
        <p className="text-gray-700">
          AI can amplify both good and bad outcomes. Understanding ethics helps you use AI as a learning tool rather than a shortcut, and ensures you protect yourself and others while using these powerful technologies.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Core Ethical Principles for AI Use
      </h3>

      <div className="space-y-6 mb-8">
        <div className="bg-white border-2 border-green-500 rounded-xl p-6">
          <h4 className="text-xl font-bold text-green-700 mb-3">
            1. Honesty & Integrity
          </h4>
          <p className="text-gray-700 mb-3">
            Be honest about when and how you use AI. If your teacher asks if you used AI help, tell the truth. If you're required to cite AI usage, always do so.
          </p>
          <p className="text-sm text-green-600">
            <strong>Example:</strong> "I used AI to help me understand the concept of photosynthesis, then wrote my explanation in my own words."
          </p>
        </div>

        <div className="bg-white border-2 border-blue-500 rounded-xl p-6">
          <h4 className="text-xl font-bold text-blue-700 mb-3">
            2. Learning Over Shortcuts
          </h4>
          <p className="text-gray-700 mb-3">
            Use AI to help you LEARN, not to avoid learning. The goal is understanding, not just getting answers. If you're not learning from the interaction, you're using AI wrong.
          </p>
          <p className="text-sm text-blue-600">
            <strong>Ask yourself:</strong> "Could I explain this to someone else now? Do I understand it better?"
          </p>
        </div>

        <div className="bg-white border-2 border-purple-500 rounded-xl p-6">
          <h4 className="text-xl font-bold text-purple-700 mb-3">
            3. Fairness & Bias Awareness
          </h4>
          <p className="text-gray-700 mb-3">
            AI systems can have biases based on their training data. Be aware that AI might reflect societal biases about gender, race, culture, or other topics. Think critically about the responses you receive.
          </p>
          <p className="text-sm text-purple-600">
            <strong>Example:</strong> If AI makes assumptions about careers based on gender, recognize this as bias, not truth.
          </p>
        </div>

        <div className="bg-white border-2 border-orange-500 rounded-xl p-6">
          <h4 className="text-xl font-bold text-orange-700 mb-3">
            4. Respect for Others
          </h4>
          <p className="text-gray-700 mb-3">
            Don't use AI to create harmful content, spread misinformation, or hurt others. Don't share other people's private information with AI systems.
          </p>
          <p className="text-sm text-orange-600">
            <strong>Never:</strong> Use AI to write mean messages, create fake information, or violate someone's privacy.
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Understanding AI Bias
      </h3>

      <p className="text-lg text-gray-700 mb-6">
        AI systems learn from data created by humans, which means they can inherit human biases. Here's what you need to know:
      </p>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <h4 className="text-lg font-semibold text-yellow-700 mb-3">
          Common Types of AI Bias
        </h4>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li><strong>Gender bias:</strong> Associating certain jobs or traits with specific genders</li>
          <li><strong>Cultural bias:</strong> Favoring certain cultural perspectives over others</li>
          <li><strong>Historical bias:</strong> Reflecting outdated views from historical training data</li>
          <li><strong>Language bias:</strong> Working better with some languages or dialects than others</li>
        </ul>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        The Golden Rule of AI Ethics
      </h3>

      <div className="bg-[#164055] text-white rounded-xl p-8 text-center">
        <p className="text-2xl font-bold mb-4">
          "Use AI to help you LEARN, not to AVOID learning."
        </p>
        <p className="text-lg">
          If you're not understanding more after using AI, you're using it as a crutch instead of a tool.
        </p>
      </div>

      <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-sm font-semibold text-blue-700 mb-2">
          💡 Remember
        </p>
        <p className="text-gray-700">
          Ethical AI use isn't just about following rules—it's about being the kind of learner and person you want to be. Use AI in ways that help you grow, learn, and become more capable, not less.
        </p>
      </div>
    </LearnContent>
  )
}
