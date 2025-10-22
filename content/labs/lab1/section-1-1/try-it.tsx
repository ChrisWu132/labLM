'use client'

/**
 * Lab 1, Section 1.1: What is AI?
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
        exerciseId: '1.1-ex1',
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
      instructions="Try asking the AI 'What is a cat?' multiple times. Run the prompt at least 3 times and observe how the responses are similar but slightly different each time. This demonstrates the randomness built into LLMs."
      showSuccessMessage={attemptCount >= 3}
      successMessage="Great observation! You've seen how LLMs generate varied responses. This randomness makes conversations feel more natural and creative."
    >
      <div className="space-y-6">
        {/* Exercise Prompt */}
        <div className="rounded-lg border-2 border-[#3b999c] bg-white p-6">
          <h3 className="mb-4 text-xl font-bold text-[#164055]">
            Exercise 1.1: See the AI in Action
          </h3>

          <p className="mb-4 text-gray-700">
            Ask the AI: <strong>"What is a cat?"</strong>
          </p>

          <PromptEditor
            exerciseId="1.1-ex1"
            mode="editable"
            initialValue="What is a cat?"
            placeholder="What is a cat?"
            onSubmit={handleSubmit}
          />

          {attemptCount > 0 && (
            <p className="mt-4 text-sm text-[#3b999c]">
              Attempts: {attemptCount} {attemptCount >= 3 && ''}
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
        {attemptCount >= 2 && (
          <div className="rounded-lg border-2 border-yellow-400 bg-yellow-50 p-6">
            <h4 className="mb-3 text-lg font-semibold text-yellow-700">
              What did you notice?
            </h4>

            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>Did the AI give the exact same answer both times?</li>
              <li>Were the answers similar but with different words?</li>
              <li>What stayed consistent across both responses?</li>
            </ul>

            {attemptCount >= 3 && (
              <p className="mt-4 font-semibold text-green-700">
                Try running it one more time to see the pattern!
              </p>
            )}
          </div>
        )}

        {/* Learning Point */}
        {attemptCount >= 3 && (
          <div className="rounded-lg border-2 border-green-500 bg-green-50 p-6">
            <h4 className="mb-3 text-lg font-semibold text-green-700">
              What You Learned
            </h4>

            <p className="mb-3 text-gray-700">
              The answer is <strong>slightly different each time</strong>! This is because LLMs have some <strong>randomness</strong> built in - they don't always pick the <em>most</em> likely next word, but sometimes choose from the top few options.
            </p>

            <p className="text-gray-700">
              This makes conversations with AI feel more natural and creative, rather than robotic and repetitive.
            </p>
          </div>
        )}
      </div>
    </TryItContent>
  )
}
