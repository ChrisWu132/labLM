'use client'

/**
 * Lab 1, Section 1.2: Your First Prompt
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
        labNumber: 1,
        exerciseId: '1.2-ex1',
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
      instructions="Practice improving vague prompts by making them clear and specific. Try writing your own improved version!"
      showSuccessMessage={attemptCount >= 2}
      successMessage="Excellent! You're getting the hang of writing clear prompts. Notice how specific prompts get better AI responses!"
    >
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-[#164055] mb-6">
          Exercise: Improve a Vague Prompt
        </h2>

        <p className="text-lg text-gray-700 mb-6">
          Let's practice turning a vague prompt into a clear, specific one!
        </p>

        {/* Examples */}
        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg mb-8">
          <p className="text-sm font-semibold text-red-700 mb-2">
            Bad Example - Too Vague
          </p>
          <p className="text-lg text-gray-800 font-mono">
            "Tell me about cats."
          </p>
          <p className="text-sm text-gray-600 mt-3">
            This prompt is too vague! The AI doesn't know what specific information you want, who the audience is, or how detailed to be.
          </p>
        </div>

        <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg mb-8">
          <p className="text-sm font-semibold text-green-700 mb-2">
            Good Example - Clear & Specific
          </p>
          <p className="text-lg text-gray-800 font-mono mb-3">
            "Explain to a 10-year-old why cats make good pets. Include 3 specific reasons and keep it under 100 words."
          </p>
          <p className="text-sm text-gray-600">
            Much better! This prompt has a clear task, context, details, and format.
          </p>
        </div>

        {/* Interactive Exercise */}
        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-[#3b999c] mb-4">
            Your Turn!
          </h3>

          <p className="text-lg text-gray-700 mb-4">
            Improve this vague prompt: <span className="font-mono bg-gray-100 px-2 py-1 rounded">"Write about healthy eating"</span>
          </p>

          <p className="text-gray-700 mb-6">
            Make it better by adding:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li><strong>Clear Task:</strong> What should the AI do? (explain, list, describe, etc.)</li>
            <li><strong>Context:</strong> Who is this for? (kids, athletes, busy adults?)</li>
            <li><strong>Details:</strong> What aspect? (benefits, meal ideas, how to start?)</li>
            <li><strong>Format:</strong> How long? What structure?</li>
          </ul>

          {/* Actual PromptEditor */}
          <PromptEditor
            exerciseId="1.2-ex1"
            mode="editable"
            initialValue="Write about healthy eating"
            placeholder="Improve this prompt to be more specific..."
            onSubmit={handleSubmit}
          />

          {attemptCount > 0 && (
            <p className="mt-4 text-sm text-[#3b999c]">
              Attempts: {attemptCount} {attemptCount >= 2 && ''}
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

        {/* Reflection Questions */}
        {attemptCount >= 1 && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <h4 className="font-bold text-blue-900 mb-3">
              Compare your results
            </h4>
            <div className="text-blue-800 space-y-2">
              <p><strong>Think about:</strong></p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Did you specify WHO the information is for?</li>
                <li>Did you clarify WHAT aspect of healthy eating to focus on?</li>
                <li>Did you include format or length requirements?</li>
                <li>Is your AI response more useful than it would have been with "Write about healthy eating"?</li>
              </ul>
              {attemptCount >= 2 && (
                <p className="mt-4 font-semibold text-green-700">
                  Great! Try experimenting with different approaches below!
                </p>
              )}
            </div>
          </div>
        )}

        {/* Example Improved Prompts */}
        <div className="bg-[rgba(59,153,156,0.05)] border-2 border-[#3b999c] rounded-xl p-6">
          <h4 className="text-lg font-bold text-[#3b999c] mb-3">
            Example Improved Prompts
          </h4>
          <p className="text-gray-700 mb-4">
            Here are some examples of how you could improve the prompt:
          </p>
          <div className="space-y-3 text-sm">
            <div className="bg-white p-4 rounded border-l-4 border-green-400">
              <strong className="text-green-700">For Kids:</strong>
              <p className="text-gray-700 mt-1 font-mono text-sm">
                "Explain healthy eating to a 9-year-old. List 5 simple tips they can start using today, and explain why each tip helps their body."
              </p>
            </div>
            <div className="bg-white p-4 rounded border-l-4 border-blue-400">
              <strong className="text-blue-700">For Busy Adults:</strong>
              <p className="text-gray-700 mt-1 font-mono text-sm">
                "Write a quick guide for busy professionals on healthy eating. Include 3 time-saving meal prep tips and 3 easy healthy snack ideas. Keep it under 150 words."
              </p>
            </div>
            <div className="bg-white p-4 rounded border-l-4 border-purple-400">
              <strong className="text-purple-700">For Athletes:</strong>
              <p className="text-gray-700 mt-1 font-mono text-sm">
                "Explain healthy eating for teenage athletes. Focus on nutrition before and after sports practice. Include specific food examples and timing recommendations."
              </p>
            </div>
          </div>
        </div>
      </div>
    </TryItContent>
  )
}
