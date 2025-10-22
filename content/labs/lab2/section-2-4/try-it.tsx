'use client'

/**
 * Lab 2, Section 2.4: Clear Communication
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
        labNumber: 2,
        exerciseId: '2.4-ex1',
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
      instructions="Practice improving vague prompts! Take a simple request and add details, constraints, and context to make it much more effective."
      showSuccessMessage={attemptCount >= 2}
      successMessage="Excellent work! You've mastered the art of writing clear, specific prompts with proper constraints and context."
    >
      <div className="space-y-6">
        {/* Exercise Prompt */}
        <div className="rounded-lg border-2 border-[#3b999c] bg-white p-6">
          <h3 className="mb-4 text-xl font-bold text-[#164055]">
            Exercise 2.4: Transform Vague Prompts
          </h3>

          <p className="mb-4 text-gray-700">
            Let's take a vague prompt and make it MUCH better by adding the three elements!
          </p>

          <div className="mb-4 bg-red-50 border border-red-200 p-4 rounded-lg">
            <p className="font-semibold text-red-700 mb-2"> Vague Prompt:</p>
            <p className="text-sm text-gray-700 font-mono bg-white p-2 rounded">
              "Write about healthy eating"
            </p>
          </div>

          <div className="mb-4 bg-green-50 border border-green-200 p-4 rounded-lg">
            <p className="font-semibold text-green-700 mb-2"> Improved Version (Add These):</p>
            <ul className="text-sm text-gray-700 space-y-1 list-disc pl-5">
              <li><strong>Details:</strong> Who is this for? (kids, athletes, busy adults?)</li>
              <li><strong>Context:</strong> What aspect? (benefits, meal ideas, how to start?)</li>
              <li><strong>Constraints:</strong> How long? What tone? What format?</li>
            </ul>
          </div>

          <p className="mb-4 text-gray-700 text-sm">
            <strong>Your Task:</strong> Rewrite "Write about healthy eating" with all three elements. Make it specific!
          </p>

          <PromptEditor
            exerciseId="2.4-ex1"
            mode="editable"
            initialValue="Write about healthy eating for middle school students. Explain 3 benefits of eating vegetables in simple language, using a casual and encouraging tone. Keep it under 100 words."
            placeholder="Transform the vague prompt by adding details, context, and constraints..."
            onSubmit={handleSubmit}
          />

          {attemptCount > 0 && (
            <p className="mt-4 text-sm text-[#3b999c]">
              Prompts tested: {attemptCount} {attemptCount >= 2 && ''}
            </p>
          )}
        </div>

        {/* Output Display */}
        {(loading || output || error) && (
          <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
            <h4 className="mb-4 text-lg font-semibold text-[#164055]">
              AI Response:
            </h4>

            <LLMOutputDisplay
              mode="live"
              content={output}
              loading={loading}
              error={error}
            />
          </div>
        )}

        {/* Observation Prompts */}
        {attemptCount >= 1 && (
          <div className="rounded-lg border-2 border-yellow-400 bg-yellow-50 p-6">
            <h4 className="mb-3 text-lg font-semibold text-yellow-700">
              Evaluate Your Prompt
            </h4>

            <div className="space-y-3">
              <div>
                <p className="font-semibold text-gray-700 mb-1">Did you include DETAILS?</p>
                <p className="text-sm text-gray-600"> Specific audience, aspect, or focus</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700 mb-1">Did you add CONSTRAINTS?</p>
                <p className="text-sm text-gray-600"> Length, format, style, or structure requirements</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700 mb-1">Did you provide CONTEXT?</p>
                <p className="text-sm text-gray-600"> Why you're asking, who you are, or what you need it for</p>
              </div>
            </div>

            {attemptCount >= 2 && (
              <p className="mt-4 font-semibold text-green-700">
                Great job! Compare the quality of your answer to what a vague prompt would give!
              </p>
            )}
          </div>
        )}

        {/* Learning Point */}
        {attemptCount >= 2 && (
          <div className="rounded-lg border-2 border-green-500 bg-green-50 p-6">
            <h4 className="mb-3 text-lg font-semibold text-green-700">
              What You Learned
            </h4>

            <p className="mb-3 text-gray-700">
              Adding <strong>details, constraints, and context</strong> transforms a vague prompt into a powerful one. The AI can provide exactly what you need when you're specific about what you want.
            </p>

            <div className="mt-4 p-4 bg-white rounded border border-green-300">
              <p className="font-semibold text-gray-700 mb-2">
                The Three-Element Formula:
              </p>

              <div className="space-y-2 text-sm text-gray-600">
                <p><strong className="text-blue-600">1. Details:</strong> Make it specific (who, what, which aspect)</p>
                <p><strong className="text-purple-600">2. Constraints:</strong> Set limits (length, format, style)</p>
                <p><strong className="text-green-600">3. Context:</strong> Provide background (why, purpose, situation)</p>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 border border-blue-200 p-3 rounded">
              <p className="text-sm font-semibold text-blue-800 mb-1"> Pro Tip:</p>
              <p className="text-sm text-gray-700">
                Before hitting submit, ask yourself: "Could someone else interpret this prompt differently?" If yes, add more specifics!
              </p>
            </div>
          </div>
        )}

        {/* Challenge */}
        {attemptCount >= 2 && (
          <div className="rounded-lg border-2 border-purple-400 bg-purple-50 p-6">
            <h4 className="mb-3 text-lg font-semibold text-purple-700">
              Bonus Challenge
            </h4>

            <p className="text-gray-700 mb-3">
              Try improving another vague prompt using all three elements:
            </p>

            <div className="bg-white p-3 rounded border border-purple-200">
              <p className="text-sm font-mono text-gray-700">
                "Explain climate change"
              </p>
            </div>

            <p className="text-sm text-gray-600 mt-2">
              Think about: Who's the audience? What specific aspect? What constraints would help?
            </p>
          </div>
        )}
      </div>
    </TryItContent>
  )
}
