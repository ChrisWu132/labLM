/**
 * Lab 3, Section 3.3: Role-Playing Basics
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent previousSummary="You learned how context shapes every word the AI generates, what context windows are, and the four types of context you can provide (audience, background, situation, preferences).">
      <h2 className="text-3xl font-bold text-[#164055] mb-6">
        Role-Playing Magic: Controlling AI Personality
      </h2>

      <p className="text-lg text-gray-700 mb-6">
        Now that you understand how context works, let's learn one of the most powerful context techniques: <strong>role-playing</strong>!
      </p>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Why Role-Setting Works
      </h3>

      <p className="text-lg text-gray-700 mb-4">
        Remember: Context shapes every word the AI chooses. When you set a role, you're providing powerful context that influences:
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
          <p className="font-semibold text-blue-800 mb-2">Vocabulary Choice</p>
          <p className="text-sm text-gray-700">
            A doctor uses medical terms, a teacher uses simple explanations
          </p>
        </div>

        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
          <p className="font-semibold text-green-800 mb-2">Explanation Style</p>
          <p className="text-sm text-gray-700">
            A poet is descriptive, a scientist is precise and factual
          </p>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-lg">
          <p className="font-semibold text-purple-800 mb-2">Level of Detail</p>
          <p className="text-sm text-gray-700">
            An expert goes deep, a beginner's guide stays high-level
          </p>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <p className="font-semibold text-yellow-800 mb-2">Tone & Personality</p>
          <p className="text-sm text-gray-700">
            A coach is motivational, a librarian is calm and informative
          </p>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
        <p className="text-sm font-semibold text-yellow-700 mb-2">
          💡 Key Insight
        </p>
        <p className="text-gray-700">
          Role-setting is just <strong>very specific context</strong> about how the AI should "behave" in its responses!
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        The Magic Phrase: "You are..."
      </h3>

      <p className="text-lg text-gray-700 mb-4">
        The simplest way to set a role is with this template:
      </p>

      <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-6">
        <p className="text-2xl font-bold text-center text-[#3b999c] mb-4">
          "You are a [ROLE]. [Your request]."
        </p>

        <div className="space-y-3 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-mono text-sm text-gray-800">
              "You are a patient teacher. Explain photosynthesis to a 10-year-old."
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-mono text-sm text-gray-800">
              "You are a creative poet. Write a poem about the ocean."
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-mono text-sm text-gray-800">
              "You are a professional chef. Give me a recipe for chocolate cake."
            </p>
          </div>
        </div>
      </div>

      <p className="text-gray-700 mb-8">
        This tiny phrase completely changes the AI's "personality" and output style!
      </p>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        How Roles Change Responses
      </h3>

      <p className="text-lg text-gray-700 mb-4">
        Let's see how the SAME task changes with different roles:
      </p>

      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-8">
        <p className="font-semibold text-gray-800 mb-4 text-lg">
          Task: "Explain why exercise is important"
        </p>

        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
            <p className="font-bold text-blue-800 mb-2">Role: Medical Doctor</p>
            <p className="text-sm text-gray-700 italic">
              "Exercise improves cardiovascular health, strengthens the immune system, and reduces risk of chronic diseases like diabetes and heart disease."
            </p>
            <p className="text-xs text-gray-500 mt-2">→ Medical/health focus, clinical language</p>
          </div>

          <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
            <p className="font-bold text-green-800 mb-2">Role: Sports Coach</p>
            <p className="text-sm text-gray-700 italic">
              "Get moving to unlock your potential! Exercise builds strength, boosts energy, and helps you perform at your peak in everything you do!"
            </p>
            <p className="text-xs text-gray-500 mt-2">→ Motivational/performance focus, energetic tone</p>
          </div>

          <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
            <p className="font-bold text-purple-800 mb-2">Role: Research Scientist</p>
            <p className="text-sm text-gray-700 italic">
              "Physical activity triggers beneficial biochemical processes: increased mitochondrial biogenesis, enhanced neuroplasticity, and optimized cellular metabolism."
            </p>
            <p className="text-xs text-gray-500 mt-2">→ Technical/biological focus, scientific terminology</p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border-2 border-green-400 rounded-xl p-6 mb-8">
        <h4 className="font-bold text-green-800 mb-3">
          Key Observation
        </h4>
        <p className="text-gray-700">
          <strong>Same topic, completely different approaches!</strong> The role determines vocabulary, tone, detail level, and focus area.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-[#164055] mb-4 mt-8">
        Common Roles to Try
      </h3>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
          <p className="font-bold text-[#164055] mb-3">Educational Roles:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>Patient teacher</li>
            <li>Enthusiastic tutor</li>
            <li>Experienced professor</li>
            <li>Study coach</li>
          </ul>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
          <p className="font-bold text-[#164055] mb-3">Creative Roles:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>Romantic poet</li>
            <li>Screenwriter</li>
            <li>Creative storyteller</li>
            <li>Comedy writer</li>
          </ul>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
          <p className="font-bold text-[#164055] mb-3">Professional Roles:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>Business consultant</li>
            <li>Software engineer</li>
            <li>Marketing expert</li>
            <li>Career advisor</li>
          </ul>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
          <p className="font-bold text-[#164055] mb-3">Helper Roles:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            <li>Friendly mentor</li>
            <li>Helpful assistant</li>
            <li>Supportive guide</li>
            <li>Expert advisor</li>
          </ul>
        </div>
      </div>

      <div className="bg-[rgba(59,153,156,0.05)] border-2 border-[#3b999c] rounded-xl p-6">
        <h4 className="text-lg font-bold text-[#3b999c] mb-3">
          🎯 Ready to Try Role-Playing!
        </h4>
        <p className="text-gray-700">
          Now that you understand the basics, let's practice using different roles to shape AI responses. Head to the Try It tab!
        </p>
      </div>
    </LearnContent>
  )
}
