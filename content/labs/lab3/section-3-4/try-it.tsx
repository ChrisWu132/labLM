'use client'

/**
 * Lab 3, Section 3.4: Advanced Personas
 * Try It Tab Content
 */

import { useState } from 'react'
import { TryItContent } from '@/components/features/lab-sections'
import { PromptEditor } from '@/components/features/prompt-lab/PromptEditor'
import { LLMOutputDisplay } from '@/components/features/prompt-lab/LLMOutputDisplay'
import { runPrompt } from '@/lib/actions/prompt-lab'

export default function TryIt() {
  const [output, setOutput] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [attemptCount, setAttemptCount] = useState(0)

  const handleSubmit = async (prompt: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await runPrompt({
        prompt,
        labNumber: 3,
        exerciseId: '3.4-ex1',
      })

      if (result.success && result.output) {
        setOutput(result.output)
        setAttemptCount((prev) => prev + 1)
      } else {
        setError(result.error || 'Failed to run prompt')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <TryItContent
      instructions="Design your own custom AI assistant with a detailed persona! Include expertise, personality traits, teaching style, and unique characteristics."
      showSuccessMessage={attemptCount >= 1}
      successMessage="Excellent! You've created a custom AI persona with unique personality and expertise!"
    >
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-[#164055] mb-6">
          Challenge: Design Your Custom AI Assistant
        </h2>

        <p className="text-lg text-gray-700 mb-6">
          Create your own AI assistant with a unique personality tailored to help you with something specific!
        </p>

        {/* Persona Building Guide */}
        <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-blue-800 mb-4">
            Build Your Persona - Include These Elements:
          </h3>

          <div className="space-y-3">
            <div className="bg-white p-4 rounded border-l-4 border-blue-500">
              <p className="font-semibold text-blue-700 mb-1">1. Core Role & Expertise</p>
              <p className="text-sm text-gray-600">What are they an expert in? (math tutor, coding mentor, writing coach, study advisor, etc.)</p>
            </div>

            <div className="bg-white p-4 rounded border-l-4 border-green-500">
              <p className="font-semibold text-green-700 mb-1">2. Personality Traits (2-3 traits)</p>
              <p className="text-sm text-gray-600">How do they communicate? (patient, funny, enthusiastic, strict, encouraging, creative, etc.)</p>
            </div>

            <div className="bg-white p-4 rounded border-l-4 border-purple-500">
              <p className="font-semibold text-purple-700 mb-1">3. Teaching/Communication Style</p>
              <p className="text-sm text-gray-600">How do they help? (uses analogies, step-by-step, asks questions, gives examples, etc.)</p>
            </div>

            <div className="bg-white p-4 rounded border-l-4 border-yellow-500">
              <p className="font-semibold text-yellow-700 mb-1">4. Unique Characteristics</p>
              <p className="text-sm text-gray-600">What makes them memorable? (always adds fun facts, uses movie references, never uses jargon, etc.)</p>
            </div>

            <div className="bg-white p-4 rounded border-l-4 border-red-500">
              <p className="font-semibold text-red-700 mb-1">5. Values/Philosophy (Optional)</p>
              <p className="text-sm text-gray-600">What do they believe? (mistakes are learning opportunities, practice beats perfection, etc.)</p>
            </div>
          </div>
        </div>

        {/* Template */}
        <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            📝 Template to Get Started:
          </h3>

          <div className="bg-white p-4 rounded-lg font-mono text-sm text-gray-700 leading-relaxed">
            "You are [NAME/TITLE], a [PERSONALITY] [PROFESSION] who [STYLE/METHOD]. You [UNIQUE TRAIT] and believe that [PHILOSOPHY]. You [SPECIFIC BEHAVIOR].
            <br/><br/>
            [Then add your question or task]"
          </div>
        </div>

        {/* Example for Inspiration */}
        <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg mb-8">
          <p className="text-sm font-semibold text-green-700 mb-2">
            ✅ Example: Custom Homework Helper
          </p>
          <p className="text-sm text-gray-800 font-mono leading-relaxed">
            "You are Professor Maple, a patient and encouraging homework coach who specializes in making difficult subjects feel manageable. You break complex problems into smaller steps and celebrate progress along the way. You always ask guiding questions instead of giving direct answers, and you believe that struggling productively is part of learning. You use everyday analogies to explain abstract concepts.
            <br/><br/>
            Help me understand how to solve quadratic equations. I know basic algebra but get confused when there are multiple steps."
          </p>
        </div>

        {/* Interactive Exercise */}
        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-[#3b999c] mb-4">
            Create Your Custom AI Assistant!
          </h3>

          <p className="text-gray-700 mb-4">
            Design an AI assistant that helps YOU with something you actually need. Make it specific and tailored to your goals!
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-6">
            <p className="text-sm font-semibold text-yellow-700 mb-2">
              💡 Ideas for Assistance:
            </p>
            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
              <li><strong>Study helper:</strong> For a specific subject you're learning</li>
              <li><strong>Writing coach:</strong> To improve essays or creative writing</li>
              <li><strong>Project planner:</strong> To organize and break down big tasks</li>
              <li><strong>Skill teacher:</strong> For learning coding, music, art, etc.</li>
              <li><strong>Fitness buddy:</strong> For workout motivation and advice</li>
              <li><strong>Career advisor:</strong> For exploring future paths</li>
            </ul>
          </div>

          <PromptEditor
            exerciseId="3.4-ex1"
            mode="editable"
            initialValue="You are [create your custom persona here with name, traits, style, and unique characteristics]

[Then add a real question or task you need help with]"
            placeholder="Design your custom AI assistant..."
            onSubmit={handleSubmit}
          />

          {attemptCount > 0 && (
            <p className="mt-4 text-sm text-[#3b999c]">
              Attempts: {attemptCount} ✓
            </p>
          )}
        </div>

        {/* Output Display */}
        {(loading || output || error) && (
          <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
            <h4 className="mb-4 text-lg font-semibold text-[#164055]">
              Your Custom AI Assistant's Response:
            </h4>

            <LLMOutputDisplay
              mode="live"
              content={output}
              loading={loading}
              error={error}
            />
          </div>
        )}

        {/* Evaluation Checklist */}
        {attemptCount >= 1 && (
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6">
            <h4 className="font-bold text-yellow-900 mb-3">
              🤔 Evaluate Your Persona
            </h4>

            <p className="text-gray-700 mb-3">
              Check if your AI assistant has:
            </p>

            <ul className="list-none space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 text-lg">□</span>
                <span><strong>Clear expertise:</strong> Specific role or area of knowledge</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 text-lg">□</span>
                <span><strong>Personality traits:</strong> 2-3 characteristics that shape communication</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-600 text-lg">□</span>
                <span><strong>Teaching style:</strong> How they help or explain things</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 text-lg">□</span>
                <span><strong>Unique trait:</strong> Something that makes them memorable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 text-lg">□</span>
                <span><strong>Values:</strong> What they believe about learning/helping</span>
              </li>
            </ul>

            <div className="mt-4 p-4 bg-white rounded border border-yellow-300">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Reflection Questions:</strong>
              </p>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                <li>Did the AI respond in the personality you defined?</li>
                <li>Was the communication style different from a generic response?</li>
                <li>Did the unique characteristics come through?</li>
                <li>Would this persona be helpful for your actual needs?</li>
              </ul>
            </div>
          </div>
        )}

        {/* Success Message and Next Steps */}
        {attemptCount >= 1 && (
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
            <h4 className="text-lg font-bold text-green-700 mb-3">
              🎉 Congratulations!
            </h4>

            <p className="text-gray-700 mb-4">
              You've created a custom AI assistant! You can now:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Save this persona for future use</li>
              <li>Refine it based on the responses you get</li>
              <li>Create different personas for different subjects or tasks</li>
              <li>Combine personas with other techniques (context, constraints, etc.)</li>
              <li>Share your favorite personas with friends studying similar topics</li>
            </ul>

            <div className="mt-4 p-4 bg-white rounded border border-green-300">
              <p className="font-semibold text-green-700 mb-2">
                💡 Pro Tip:
              </p>
              <p className="text-sm text-gray-700">
                Keep a "persona library" of your favorite AI assistants for different needs. Copy-paste them whenever you need that specific type of help!
              </p>
            </div>
          </div>
        )}

        {/* More Examples */}
        <div className="bg-[rgba(59,153,156,0.05)] border-2 border-[#3b999c] rounded-xl p-6">
          <h4 className="text-lg font-bold text-[#3b999c] mb-3">
            📚 More Persona Examples for Inspiration
          </h4>

          <div className="space-y-4 text-sm">
            <div className="bg-white p-4 rounded border-l-4 border-blue-400">
              <strong className="text-blue-700">Code Sensei:</strong>
              <p className="text-gray-700 mt-1 font-mono text-xs leading-relaxed">
                "You are Code Sensei, a wise and patient programming mentor who believes in learning by doing. You never give complete solutions but guide students with hints and questions. You use real-world project examples and always explain the 'why' behind coding practices. You celebrate debugging as a valuable skill, not a frustration."
              </p>
            </div>

            <div className="bg-white p-4 rounded border-l-4 border-green-400">
              <strong className="text-green-700">Story Weaver:</strong>
              <p className="text-gray-700 mt-1 font-mono text-xs leading-relaxed">
                "You are Story Weaver, an imaginative writing coach who helps students find their unique voice. You ask thought-provoking questions about character motivation and plot, and you encourage bold creative choices. You believe every story idea has potential and help writers develop it through curiosity, not criticism."
              </p>
            </div>

            <div className="bg-white p-4 rounded border-l-4 border-purple-400">
              <strong className="text-purple-700">Math Mapper:</strong>
              <p className="text-gray-700 mt-1 font-mono text-xs leading-relaxed">
                "You are Math Mapper, an organized and systematic math tutor who breaks down problems into visual steps. You use diagrams and color-coding to make concepts clear. You always check understanding before moving forward and celebrate when students spot their own mistakes. You believe math is about patterns, not memorization."
              </p>
            </div>
          </div>
        </div>
      </div>
    </TryItContent>
  )
}
