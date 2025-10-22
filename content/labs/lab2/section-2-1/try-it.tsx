'use client'

/**
 * Lab 2, Section 2.1: How LLMs Learn
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
        exerciseId: '2.1-ex1',
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
      instructions="Test the AI's knowledge boundaries! Try asking about recent events vs. older historical events. Notice which ones it answers confidently and which ones it struggles with."
      showSuccessMessage={attemptCount >= 3}
      successMessage="Excellent testing! You've discovered how LLMs have deep knowledge of historical events but may be uncertain about very recent developments."
    >
      <div className="space-y-6">
        {/* Exercise Prompt */}
        <div className="rounded-lg border-2 border-[#3b999c] bg-white p-6">
          <h3 className="mb-4 text-xl font-bold text-[#164055]">
            Exercise 2.1: Discovering Knowledge Boundaries
          </h3>

          <p className="mb-4 text-gray-700">
            Let's test what the AI knows! Try asking these different types of questions:
          </p>

          <div className="mb-4 bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-700 mb-2">Suggested Questions:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600">
              <li>What happened in the 2020 Olympics?</li>
              <li>Who won the Nobel Prize in Physics in 2015?</li>
              <li>What are the main themes in Harry Potter?</li>
              <li>What are the latest AI developments in 2024?</li>
            </ul>
            <p className="mt-2 text-sm text-gray-600 italic">
              Notice: Which questions get confident answers? Which ones show uncertainty?
            </p>
          </div>

          <PromptEditor
            exerciseId="2.1-ex1"
            mode="editable"
            initialValue="What happened in the 2020 Olympics?"
            placeholder="Try asking about different events and topics..."
            onSubmit={handleSubmit}
          />

          {attemptCount > 0 && (
            <p className="mt-4 text-sm text-[#3b999c]">
              Questions asked: {attemptCount} {attemptCount >= 3 && ''}
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
              What did you discover?
            </h4>

            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>Did the AI answer historical questions confidently?</li>
              <li>Was it uncertain or vague about very recent events?</li>
              <li>Did it provide more detail for popular topics than obscure ones?</li>
              <li>Did it acknowledge when information might be outdated?</li>
            </ul>

            {attemptCount >= 3 && (
              <p className="mt-4 font-semibold text-green-700">
                Great exploration! Try one more to solidify your understanding!
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
              LLMs have <strong>deep knowledge</strong> about well-documented past events and popular topics, but they may be <strong>uncertain or outdated</strong> about recent developments.
            </p>

            <p className="text-gray-700">
              <strong>Why?</strong> Because their knowledge comes from their training data, which has a cutoff date. They can't access the internet to get current information (unless specifically designed to do so).
            </p>

            <div className="mt-4 p-4 bg-white rounded border border-green-300">
              <p className="font-semibold text-gray-700 mb-2">
                Key Takeaway:
              </p>
              <p className="text-sm text-gray-600">
                The quality of an AI's answer depends on:<br/>
                1. <strong>Training data frequency</strong> - Popular topics get better answers<br/>
                2. <strong>Recency</strong> - Older events are more reliable than recent ones<br/>
                3. <strong>Question clarity</strong> - Specific questions get better answers
              </p>
            </div>
          </div>
        )}
      </div>
    </TryItContent>
  )
}
