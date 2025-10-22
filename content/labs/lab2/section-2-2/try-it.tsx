'use client'

/**
 * Lab 2, Section 2.2: Knowledge Sources
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
        exerciseId: '2.2-ex1',
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
      instructions="Compare AI's knowledge depth across different topics! Test popular topics vs. obscure ones and observe the difference in detail and confidence."
      showSuccessMessage={attemptCount >= 3}
      successMessage="Excellent comparison! You've seen firsthand how AI's knowledge depth varies based on training data frequency."
    >
      <div className="space-y-6">
        {/* Exercise Prompt */}
        <div className="rounded-lg border-2 border-[#3b999c] bg-white p-6">
          <h3 className="mb-4 text-xl font-bold text-[#164055]">
            Exercise 2.2: Testing Knowledge Depth
          </h3>

          <p className="mb-4 text-gray-700">
            Let's compare how the AI performs with different types of topics!
          </p>

          <div className="mb-4 bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-700 mb-2">Try These Comparisons:</p>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-green-600">Popular Topic:</p>
                <p className="text-sm text-gray-600">• "Explain how photosynthesis works"</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-yellow-600">Specialized Topic:</p>
                <p className="text-sm text-gray-600">• "Explain the traditional wedding customs of the Maasai people"</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-orange-600">Obscure Topic:</p>
                <p className="text-sm text-gray-600">• "Explain the political structure of the ancient Xiongnu confederation"</p>
              </div>
            </div>

            <p className="mt-3 text-sm text-gray-600 italic">
              Compare: Which gets the most detailed answer? Which is more vague?
            </p>
          </div>

          <PromptEditor
            exerciseId="2.2-ex1"
            mode="editable"
            initialValue="Explain how photosynthesis works"
            placeholder="Try comparing popular vs. obscure topics..."
            onSubmit={handleSubmit}
          />

          {attemptCount > 0 && (
            <p className="mt-4 text-sm text-[#3b999c]">
              Topics tested: {attemptCount} {attemptCount >= 3 && '✓'}
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
              🤔 What differences did you notice?
            </h4>

            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>Did popular topics get more detailed explanations?</li>
              <li>Were answers about obscure topics more general or vague?</li>
              <li>Did the AI provide more examples for familiar topics?</li>
              <li>Was the confidence level different between topics?</li>
            </ul>

            {attemptCount >= 3 && (
              <p className="mt-4 font-semibold text-green-700">
                ✓ Great observations! One more test will complete your analysis!
              </p>
            )}
          </div>
        )}

        {/* Learning Point */}
        {attemptCount >= 3 && (
          <div className="rounded-lg border-2 border-green-500 bg-green-50 p-6">
            <h4 className="mb-3 text-lg font-semibold text-green-700">
              💡 What You Learned
            </h4>

            <p className="mb-3 text-gray-700">
              AI provides <strong>more detailed, confident answers</strong> for popular topics because it has seen <strong>more training examples</strong>. For obscure topics, it may give more <strong>general or cautious responses</strong>.
            </p>

            <div className="mt-4 p-4 bg-white rounded border border-green-300">
              <p className="font-semibold text-gray-700 mb-2">
                Practical Application:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ For popular topics → Trust AI's detailed explanations</li>
                <li>~ For specialized topics → Check a second source</li>
                <li>✗ For very obscure topics → Verify with expert sources</li>
              </ul>
            </div>

            <p className="mt-3 text-gray-700 text-sm">
              <strong>Pro Tip:</strong> If you're researching something rare or very specific, use AI for a starting point, but always verify with authoritative sources!
            </p>
          </div>
        )}
      </div>
    </TryItContent>
  )
}
