'use client'

/**
 * Lab 2, Section 2.3: Knowledge Cutoff
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
        exerciseId: '2.3-ex1',
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
      instructions="Test the AI's knowledge cutoff! Compare how it handles historical events vs. very recent developments. Watch for signs of uncertainty or outdated information."
      showSuccessMessage={attemptCount >= 3}
      successMessage="Perfect! You've learned to recognize when AI's knowledge cutoff affects its answers."
    >
      <div className="space-y-6">
        {/* Exercise Prompt */}
        <div className="rounded-lg border-2 border-[#3b999c] bg-white p-6">
          <h3 className="mb-4 text-xl font-bold text-[#164055]">
            Exercise 2.3: Finding the Knowledge Cutoff
          </h3>

          <p className="mb-4 text-gray-700">
            Let's discover when AI's knowledge stops being current!
          </p>

          <div className="mb-4 bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-700 mb-2">Test These Time Periods:</p>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-green-600">Well Before Cutoff:</p>
                <p className="text-sm text-gray-600">• "What were the major events of 2020?"</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-yellow-600">Around Cutoff:</p>
                <p className="text-sm text-gray-600">• "What are the latest developments in AI technology in 2024?"</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-red-600">After Cutoff:</p>
                <p className="text-sm text-gray-600">• "What happened in the news today?"</p>
              </div>
            </div>

            <p className="mt-3 text-sm text-gray-600 italic">
              Notice: Does AI acknowledge when information might be outdated?
            </p>
          </div>

          <PromptEditor
            exerciseId="2.3-ex1"
            mode="editable"
            initialValue="What were the major events of 2020?"
            placeholder="Ask about different time periods..."
            onSubmit={handleSubmit}
          />

          {attemptCount > 0 && (
            <p className="mt-4 text-sm text-[#3b999c]">
              Time periods tested: {attemptCount} {attemptCount >= 3 && ''}
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
              What patterns did you notice?
            </h4>

            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>Did AI answer confidently about older events?</li>
              <li>Was it more cautious or vague about recent events?</li>
              <li>Did it mention its knowledge cutoff date?</li>
              <li>Did it acknowledge when information might be outdated?</li>
            </ul>

            {attemptCount >= 3 && (
              <p className="mt-4 font-semibold text-green-700">
                Great detective work! Try one more to confirm your findings!
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
              LLMs have a <strong>knowledge cutoff date</strong> - they can't access information from after their training ended. Well-trained models will often <strong>acknowledge this limitation</strong> when asked about recent events.
            </p>

            <div className="mt-4 p-4 bg-white rounded border border-green-300">
              <p className="font-semibold text-gray-700 mb-2">
                Practical Strategy:
              </p>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold"></span>
                  <p><strong>Old events (2+ years ago):</strong> Trust AI's knowledge</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">~</span>
                  <p><strong>Recent events (1-2 years):</strong> AI may be accurate but verify</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-600 font-bold"></span>
                  <p><strong>Current events (weeks/months):</strong> Use news sites, not AI</p>
                </div>
              </div>
            </div>

            <p className="mt-3 text-gray-700 text-sm">
              <strong>Remember:</strong> AI is excellent for understanding established concepts and historical facts, but always use current sources for timely information!
            </p>
          </div>
        )}
      </div>
    </TryItContent>
  )
}
