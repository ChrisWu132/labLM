/**
 * Lab 5, Section 5.3: Privacy Protection
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent>
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Privacy Protection: What NOT to Share with AI
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        AI systems can be incredibly helpful, but they're not private confidants. Think of AI like a stranger on the internet—you wouldn't share personal information with a stranger, so don't share it with AI either!
      </p>

      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-red-700 mb-2">
          ⚠️ Important Privacy Rule
        </p>
        <p className="text-gray-700 text-lg font-semibold">
          Treat AI like a stranger on the internet—don't share personal information!
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        ❌ NEVER Share With AI
      </h3>

      <div className="space-y-4 mb-8">
        <div className="bg-white border-2 border-red-400 rounded-xl p-6">
          <h4 className="text-lg font-bold text-red-700 mb-3">
            1. Personal Information
          </h4>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Your full name, address, or phone number</li>
            <li>Your school's exact name or location</li>
            <li>Your age, birthday, or other identifying details</li>
            <li>Social security numbers or ID numbers</li>
          </ul>
          <div className="mt-3 p-3 bg-red-50 rounded border border-red-200">
            <p className="text-sm text-red-700">
              <strong>Why?</strong> This information could be used to identify you or be stored in ways you don't control.
            </p>
          </div>
        </div>

        <div className="bg-white border-2 border-red-400 rounded-xl p-6">
          <h4 className="text-lg font-bold text-red-700 mb-3">
            2. Passwords & Security
          </h4>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Any passwords (email, social media, games, etc.)</li>
            <li>Security questions and answers</li>
            <li>Banking or financial information</li>
            <li>Login credentials for any accounts</li>
          </ul>
          <div className="mt-3 p-3 bg-red-50 rounded border border-red-200">
            <p className="text-sm text-red-700">
              <strong>Why?</strong> Sharing passwords puts your accounts at risk. AI companies may store conversations.
            </p>
          </div>
        </div>

        <div className="bg-white border-2 border-red-400 rounded-xl p-6">
          <h4 className="text-lg font-bold text-red-700 mb-3">
            3. Private Content
          </h4>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Photos of yourself or your family</li>
            <li>Private conversations or messages</li>
            <li>Confidential information about others</li>
            <li>Medical or health information</li>
          </ul>
          <div className="mt-3 p-3 bg-red-50 rounded border border-red-200">
            <p className="text-sm text-red-700">
              <strong>Why?</strong> This violates your privacy and others' privacy. You don't control where this data goes.
            </p>
          </div>
        </div>

        <div className="bg-white border-2 border-red-400 rounded-xl p-6">
          <h4 className="text-lg font-bold text-red-700 mb-3">
            4. Location & Plans
          </h4>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Where you are right now</li>
            <li>Where you'll be and when</li>
            <li>Your daily schedule or routine</li>
            <li>Travel plans or vacation details</li>
          </ul>
          <div className="mt-3 p-3 bg-red-50 rounded border border-red-200">
            <p className="text-sm text-red-700">
              <strong>Why?</strong> Location information can compromise your safety and that of your family.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        ✅ Safe to Share
      </h3>

      <p className="text-lg text-gray-700 mb-6">
        You CAN share general information that doesn't identify you personally:
      </p>

      <div className="bg-green-50 border-2 border-green-400 rounded-xl p-6 mb-8">
        <h4 className="text-lg font-bold text-green-700 mb-3">
          General Information (Safe)
        </h4>
        <ul className="list-disc pl-6 space-y-3 text-gray-700">
          <li>
            <strong>"I'm a middle school student learning about..."</strong>
            <span className="text-sm text-green-600 ml-2">✓ Vague age group, no personal details</span>
          </li>
          <li>
            <strong>"I'm working on a science project about volcanoes..."</strong>
            <span className="text-sm text-green-600 ml-2">✓ Educational context, not personal</span>
          </li>
          <li>
            <strong>"I'm interested in learning programming..."</strong>
            <span className="text-sm text-green-600 ml-2">✓ General interest, no identifying info</span>
          </li>
          <li>
            <strong>"I live in a place where it snows in winter..."</strong>
            <span className="text-sm text-green-600 ml-2">✓ Very general location, not specific</span>
          </li>
        </ul>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Privacy Best Practices
      </h3>

      <div className="overflow-x-auto rounded-2xl border-2 border-gray-200 shadow-sm bg-white mb-8">
        <table className="w-full text-left border-collapse">
          <thead style={{ backgroundColor: '#f7aa37' }}>
            <tr>
              <th className="px-6 py-4 font-semibold text-white">Situation</th>
              <th className="px-6 py-4 font-semibold text-white">❌ Don't Say</th>
              <th className="px-6 py-4 font-semibold text-white">✅ Better Alternative</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">School help</td>
              <td className="px-6 py-4 text-red-600">"I go to Lincoln Middle School in Boston"</td>
              <td className="px-6 py-4 text-green-600">"I'm a middle school student"</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">Age context</td>
              <td className="px-6 py-4 text-red-600">"I'm 13 years old, born on May 15, 2011"</td>
              <td className="px-6 py-4 text-green-600">"I'm in 7th grade" or "I'm a teenager"</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">Homework help</td>
              <td className="px-6 py-4 text-red-600">"My teacher Ms. Johnson assigned..."</td>
              <td className="px-6 py-4 text-green-600">"My teacher assigned..."</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4 font-semibold text-[#164055]">Coding help</td>
              <td className="px-6 py-4 text-red-600">"My password is abc123, can you test my code?"</td>
              <td className="px-6 py-4 text-green-600">"Can you help me create a secure password system?"</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          🤔 When in Doubt...
        </p>
        <p className="text-gray-700 mb-3">
          Ask yourself: "Would I be comfortable if this information appeared on a public bulletin board at school?"
        </p>
        <p className="text-gray-700">
          If the answer is NO, don't share it with AI!
        </p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
        <p className="text-sm font-semibold text-blue-700 mb-2">
          💡 Remember
        </p>
        <p className="text-gray-700">
          AI conversations might be reviewed by humans, stored in databases, or used for training. Protect your privacy like you would on any online platform. When in doubt, leave it out!
        </p>
      </div>
    </LearnContent>
  )
}
