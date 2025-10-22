'use client'

/**
 * Lab 4, Section 4.4: Verification
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
        labNumber: 4,
        exerciseId: '4.4-ex1',
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
      instructions="Practice fact-checking AI outputs! Ask questions that might produce hallucinations, then think critically about how you would verify the answers."
      showSuccessMessage={attemptCount >= 2}
      successMessage="Excellent critical thinking! You've learned to approach AI outputs with healthy skepticism and verification strategies."
    >
      <div className="space-y-6">
        {/* Exercise Prompt */}
        <div className="rounded-lg border-2 border-[#3b999c] bg-white p-6">
          <h3 className="mb-4 text-xl font-bold text-[#164055]">
            Exercise 4.4: Verification Practice
          </h3>

          <p className="mb-4 text-gray-700">
            Let's practice identifying claims that need verification!
          </p>

          <div className="mb-4 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <p className="font-semibold text-yellow-800 mb-2"> Your Challenge:</p>
            <p className="text-sm text-gray-700 mb-3">
              Ask AI a question that might produce specific facts or statistics, then evaluate how you would verify the answer.
            </p>

            <div className="space-y-2 text-sm">
              <div>
                <p className="font-semibold text-gray-700">Try questions like:</p>
                <ul className="list-disc pl-6 space-y-1 text-gray-600">
                  <li>"How many species of butterflies exist in the Amazon rainforest?"</li>
                  <li>"What percentage of the Earth's surface is covered by forests?"</li>
                  <li>"Who invented the first mechanical computer and in what year?"</li>
                </ul>
              </div>
            </div>
          </div>

          <PromptEditor
            exerciseId="4.4-ex1"
            mode="editable"
            initialValue="How many species of butterflies exist in the Amazon rainforest?"
            placeholder="Ask a question that requires factual verification..."
            onSubmit={handleSubmit}
          />

          {attemptCount > 0 && (
            <p className="mt-4 text-sm text-[#3b999c]">
              Questions asked: {attemptCount} {attemptCount >= 2 && ''}
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

        {/* Verification Analysis */}
        {attemptCount >= 1 && output && (
          <div className="rounded-lg border-2 border-purple-400 bg-purple-50 p-6">
            <h4 className="mb-3 text-lg font-semibold text-purple-700">
              Now Apply the Verification Checklist
            </h4>

            <div className="space-y-3">
              <div className="bg-white p-4 rounded border border-purple-200">
                <p className="font-semibold text-gray-700 mb-2">1. Cross-Reference Check:</p>
                <p className="text-sm text-gray-600">
                  How would you verify this answer? What sources would you check?
                </p>
                <ul className="list-disc pl-6 mt-2 text-sm text-gray-600">
                  <li>Search engines (Google, Bing)</li>
                  <li>Official websites (NASA, WHO, government sites)</li>
                  <li>Academic sources (Wikipedia, research papers)</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded border border-purple-200">
                <p className="font-semibold text-gray-700 mb-2">2. Specificity Red Flags:</p>
                <p className="text-sm text-gray-600">
                  Did the AI give very specific numbers or dates? Be extra cautious!
                </p>
              </div>

              <div className="bg-white p-4 rounded border border-purple-200">
                <p className="font-semibold text-gray-700 mb-2">3. Common Sense Check:</p>
                <p className="text-sm text-gray-600">
                  Does the answer make logical sense? Does it align with what you already know?
                </p>
              </div>

              <div className="bg-white p-4 rounded border border-purple-200">
                <p className="font-semibold text-gray-700 mb-2">4. Uncertainty Indicators:</p>
                <p className="text-sm text-gray-600">
                  Did the AI acknowledge any uncertainty or limitations in its answer?
                </p>
              </div>
            </div>

            {attemptCount >= 2 && (
              <p className="mt-4 font-semibold text-green-700">
                Great practice! You're thinking like a critical consumer of AI information!
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
              Verification is a <strong>critical skill</strong> when using AI. Always approach AI-generated facts with healthy skepticism, especially when:
            </p>

            <ul className="space-y-2 text-gray-700 list-disc pl-6 mb-4">
              <li>The information includes specific numbers, dates, or statistics</li>
              <li>You'll use the information for important decisions</li>
              <li>The topic is outside your area of expertise</li>
              <li>The stakes are high (homework, health, safety)</li>
            </ul>

            <div className="mt-4 p-4 bg-white rounded border border-green-300">
              <p className="font-semibold text-gray-700 mb-2">
                The Golden Rule:
              </p>
              <p className="text-sm text-gray-700">
                <strong>Trust, but verify.</strong> AI is an amazing tool for learning and exploration, but it's not infallible. Always cross-check important facts with authoritative sources.
              </p>
            </div>

            <div className="mt-4 bg-blue-50 border border-blue-200 p-3 rounded">
              <p className="text-sm font-semibold text-blue-800 mb-1">Pro Tip:</p>
              <p className="text-sm text-gray-700">
                For school assignments, use AI to <strong>understand concepts</strong>, but verify all facts you include in your work with textbooks, reliable websites, or by asking your teacher.
              </p>
            </div>
          </div>
        )}
      </div>
    </TryItContent>
  )
}
