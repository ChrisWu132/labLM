'use client'

/**
 * Lab 4, Section 4.3: Hallucinations
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
        exerciseId: '4.3-ex1',
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
      instructions="Test if AI can catch fake topics or if it will hallucinate plausible-sounding information!"
      showSuccessMessage={attemptCount >= 1}
      successMessage="Great! You've seen how AI can hallucinate. Always verify important information!"
    >
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-[#164055] mb-6">
          Exercise: Catching Hallucinations
        </h2>

        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg mb-8">
          <p className="text-sm font-semibold text-red-700 mb-2">
            This is an Educational Exercise
          </p>
          <p className="text-gray-700 text-sm">
            We're deliberately testing AI with fake topics to demonstrate hallucinations. In real use, always verify information independently!
          </p>
        </div>

        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-[#3b999c] mb-4">
            Try: Ask About Something Completely Made-Up
          </h3>

          <p className="text-gray-700 mb-4">
            Create a fake topic and see if AI notices it's not real, or if it generates plausible-sounding information:
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mb-6">
            <p className="text-sm font-semibold text-blue-700 mb-2">
              Example Made-Up Topics:
            </p>
            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
              <li>"Tell me about the scientific theory of Quantum Biscuits"</li>
              <li>"Describe the book 'The Adventures of Captain Whiskers' by Jane Smith"</li>
              <li>"Explain the historical event called the Great Penguin Migration of 1847"</li>
              <li>"What is the Fibonacci Effect in social media marketing?"</li>
            </ul>
          </div>

          <PromptEditor
            exerciseId="4.3-ex1"
            mode="editable"
            initialValue="Tell me about the scientific theory of Quantum Biscuits discovered by Dr. Martin Crumbsworth in 1987."
            placeholder="Ask about a completely made-up topic..."
            onSubmit={handleSubmit}
          />

          {attemptCount > 0 && (
            <p className="mt-4 text-sm text-[#3b999c]">
              Attempted
            </p>
          )}
        </div>

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

        {attemptCount >= 1 && (
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6">
            <h4 className="font-bold text-yellow-900 mb-3">
              Evaluate the Response
            </h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Did AI recognize this is fake? Or did it generate plausible-sounding details?</li>
              <li>Does the response sound confident even though it's made-up?</li>
              <li>Did AI hedge with phrases like "I'm not certain" or "I don't have information"?</li>
              <li>How convincing would this be if you didn't know it was fake?</li>
            </ul>

            <div className="mt-4 p-4 bg-white rounded border border-yellow-300">
              <p className="font-semibold text-red-700 mb-2">
                The Danger:
              </p>
              <p className="text-sm text-gray-700">
                AI can generate very convincing but completely false information. This is why you MUST verify important facts, especially for homework, research, or decisions!
              </p>
            </div>
          </div>
        )}

        {attemptCount >= 1 && (
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
            <h4 className="text-lg font-bold text-green-700 mb-3">
              Key Lessons
            </h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Confidence ≠ Accuracy:</strong> AI can sound very sure about false information</li>
              <li><strong>Always Verify:</strong> Check important facts with authoritative sources</li>
              <li><strong>Be Skeptical:</strong> Question specific details, statistics, and sources</li>
              <li><strong>Use AI Wisely:</strong> Great for ideation and drafts, not for final facts</li>
            </ul>
          </div>
        )}
      </div>
    </TryItContent>
  )
}
