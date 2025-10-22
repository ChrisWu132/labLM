/**
 * Lab 3, Section 3.4: Advanced Personas
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent previousSummary="You learned the basics of role-playing with the 'You are...' formula and saw how different roles produce completely different responses to the same task.">
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Creating Advanced Custom Personas
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        You've mastered basic roles. Now let's level up by creating <strong>detailed custom AI assistants</strong> with unique personalities, expertise, and teaching styles!
      </p>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Beyond Simple Roles
      </h3>

      <p className="text-lg text-gray-700 mb-4">
        Instead of just "You are a teacher," you can create rich, multi-dimensional personas:
      </p>

      <div className="overflow-x-auto rounded-2xl border-2 border-gray-200 shadow-sm bg-white mb-8">
        <table className="w-full text-left border-collapse">
          <thead style={{ backgroundColor: '#f7aa37' }}>
            <tr>
              <th className="px-6 py-4 font-semibold text-white">Simple Role</th>
              <th className="px-6 py-4 font-semibold text-white">Advanced Persona</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 text-gray-700">"You are a teacher"</td>
              <td className="px-6 py-4 text-gray-700">"You are a patient, enthusiastic high school teacher with 15 years of experience who loves using real-world examples"</td>
            </tr>
            <tr className="border-t border-gray-200 bg-gray-50">
              <td className="px-6 py-4 text-gray-700">"You are a chef"</td>
              <td className="px-6 py-4 text-gray-700">"You are a French-trained chef who specializes in simple, healthy meals and always explains the 'why' behind techniques"</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 text-gray-700">"You are a coach"</td>
              <td className="px-6 py-4 text-gray-700">"You are an energetic fitness coach who believes in positive reinforcement, celebrates small wins, and adapts advice for beginners"</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          💡 Key Insight
        </p>
        <p className="text-gray-700">
          The more specific you are, the more tailored the response! Advanced personas combine multiple traits for maximum control.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Components of an Advanced Persona
      </h3>

      <p className="text-lg text-gray-700 mb-4">
        Build rich personas by combining these elements:
      </p>

      <div className="space-y-4 mb-8">
        <div className="bg-white border-l-4 border-blue-500 p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-[#164055] mb-2">1. Core Role & Expertise</h4>
          <p className="text-gray-700 mb-2">What is their profession or specialization?</p>
          <p className="text-sm text-gray-500 italic">Examples: "physics teacher", "Python developer", "nutrition coach"</p>
        </div>

        <div className="bg-white border-l-4 border-green-500 p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-[#164055] mb-2">2. Personality Traits</h4>
          <p className="text-gray-700 mb-2">How do they communicate?</p>
          <p className="text-sm text-gray-500 italic">Examples: "patient", "enthusiastic", "witty", "encouraging", "strict but fair"</p>
        </div>

        <div className="bg-white border-l-4 border-purple-500 p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-[#164055] mb-2">3. Teaching/Communication Style</h4>
          <p className="text-gray-700 mb-2">What methods do they prefer?</p>
          <p className="text-sm text-gray-500 italic">Examples: "uses analogies", "step-by-step approach", "asks guiding questions", "uses humor"</p>
        </div>

        <div className="bg-white border-l-4 border-yellow-500 p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-[#164055] mb-2">4. Unique Characteristics</h4>
          <p className="text-gray-700 mb-2">What makes them special or memorable?</p>
          <p className="text-sm text-gray-500 italic">Examples: "always adds fun facts", "relates everything to sports", "never uses jargon"</p>
        </div>

        <div className="bg-white border-l-4 border-red-500 p-5 rounded-r-lg shadow-sm">
          <h4 className="font-bold text-[#164055] mb-2">5. Values/Philosophy (Optional)</h4>
          <p className="text-gray-700 mb-2">What do they believe in or prioritize?</p>
          <p className="text-sm text-gray-500 italic">Examples: "believes mistakes are learning opportunities", "values practical over theoretical", "encourages curiosity"</p>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Example: Detailed Persona
      </h3>

      <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 mb-8">
        <h4 className="text-lg font-bold text-green-700 mb-4">
          Professor Sparks: The Superhero Physics Teacher
        </h4>

        <div className="bg-white p-4 rounded-lg mb-4">
          <p className="font-mono text-sm text-gray-800 leading-relaxed">
            "You are Professor Sparks, an enthusiastic physics teacher who explains everything using superhero movie analogies and always adds fun facts. You encourage students to ask 'what if' questions and believe that physics should be exciting, not intimidating. You break complex concepts into simple steps and celebrate curiosity."
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-gray-700">
            <strong className="text-green-700">✓ Core Role:</strong> Physics teacher
          </p>
          <p className="text-gray-700">
            <strong className="text-green-700">✓ Personality:</strong> Enthusiastic, encouraging
          </p>
          <p className="text-gray-700">
            <strong className="text-green-700">✓ Style:</strong> Uses superhero analogies, adds fun facts
          </p>
          <p className="text-gray-700">
            <strong className="text-green-700">✓ Unique Trait:</strong> Encourages "what if" questions
          </p>
          <p className="text-gray-700">
            <strong className="text-green-700">✓ Philosophy:</strong> Physics should be exciting, not intimidating
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Template for Creating Personas
      </h3>

      <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-8">
        <p className="font-bold text-[#3b999c] mb-4 text-lg">
          Persona Creation Template:
        </p>

        <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm text-gray-800 leading-relaxed">
          "You are [NAME], a [PERSONALITY TRAITS] [PROFESSION/ROLE] who [TEACHING/COMMUNICATION STYLE]. You [UNIQUE CHARACTERISTICS] and believe that [VALUES/PHILOSOPHY]. You [SPECIFIC BEHAVIORS OR PREFERENCES]."
        </div>

        <div className="mt-6 space-y-3 text-sm">
          <p className="text-gray-700">
            <strong>Example 1:</strong> "You are Coach Maya, an energetic fitness trainer who motivates through positive reinforcement. You adapt exercises for all fitness levels and always explain the health benefits. You believe everyone can improve with consistent effort and never make anyone feel bad about their starting point."
          </p>

          <p className="text-gray-700">
            <strong>Example 2:</strong> "You are Chef Luca, a practical Italian home cook who shares family recipes and shortcuts. You explain techniques simply and encourage experimentation. You believe good food doesn't have to be complicated and always suggest ingredient substitutions for flexibility."
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Tips for Effective Personas
      </h3>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-green-50 border-2 border-green-400 rounded-lg p-4">
          <h4 className="font-bold text-green-700 mb-3">✅ Do This:</h4>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>Be specific and detailed</li>
            <li>Combine multiple personality traits</li>
            <li>Include unique characteristics</li>
            <li>Mention communication preferences</li>
            <li>Add relevant expertise or experience</li>
          </ul>
        </div>

        <div className="bg-red-50 border-2 border-red-400 rounded-lg p-4">
          <h4 className="font-bold text-red-700 mb-3">❌ Avoid This:</h4>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>Being too vague ("helpful person")</li>
            <li>Conflicting traits ("patient but rushed")</li>
            <li>Overly complex personas (keep it readable)</li>
            <li>Unrealistic expectations (AI has limits)</li>
            <li>Forgetting your audience/goal</li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
        <h4 className="font-bold text-blue-800 mb-3">
          🎯 Ready to Create Your Custom AI Assistant!
        </h4>
        <p className="text-gray-700">
          Now it's your turn to design a detailed persona tailored to your needs. Head to the Try It tab to build your custom AI assistant!
        </p>
      </div>
    </LearnContent>
  )
}
