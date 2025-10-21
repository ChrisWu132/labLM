'use client'

/**
 * Lab 1, Section 1.3: Why Different Answers?
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
  const [responses, setResponses] = useState<string[]>([])

  const handleSubmit = async (prompt: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await runPrompt({
        prompt,
        labNumber: 1,
        exerciseId: '1.3-ex1',
      })

      if (result.success && result.output) {
        setOutput(result.output)
        setResponses((prev) => [...prev, result.output])
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
      instructions="Run the same prompt 3 times to see how AI responses vary each time due to randomness."
      showSuccessMessage={attemptCount >= 3}
      successMessage="Perfect! You've experienced how LLMs use randomness to make responses more natural and creative!"
    >
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-[#164055] mb-6">
          Exercise: Experience Randomness
        </h2>

        <p className="text-lg text-gray-700 mb-6">
          Let's see randomness in action! You'll ask the AI the same question multiple times and observe the variations.
        </p>

        {/* Interactive Exercise */}
        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-[#3b999c] mb-4">
            Your Task
          </h3>

          <p className="text-gray-700 mb-4">
            Ask the AI this exact question <strong>3 times</strong>:
          </p>

          <div className="bg-gray-100 p-4 rounded-lg mb-6 border-2 border-gray-300">
            <p className="font-mono text-gray-800">
              "Write a creative opening sentence for a mystery story about a missing cat."
            </p>
          </div>

          <p className="text-gray-700 mb-6">
            <strong>What to observe:</strong>
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>How different is each response?</li>
            <li>Do they all start the story differently?</li>
            <li>Are they all relevant to the prompt?</li>
            <li>Which version do you like best?</li>
          </ul>

          {/* Actual PromptEditor */}
          <PromptEditor
            exerciseId="1.3-ex1"
            mode="editable"
            initialValue="Write a creative opening sentence for a mystery story about a missing cat."
            placeholder="Run this prompt multiple times..."
            onSubmit={handleSubmit}
          />

          {attemptCount > 0 && (
            <p className="mt-4 text-sm text-[#3b999c]">
              Attempt {attemptCount} of 3 {attemptCount >= 3 && '✓'}
            </p>
          )}
        </div>

        {/* Output Display */}
        {(loading || output || error) && (
          <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
            <h4 className="mb-4 text-lg font-semibold text-[#164055]">
              AI Response #{attemptCount}:
            </h4>

            <LLMOutputDisplay
              mode="live"
              content={output}
              loading={loading}
              error={error}
            />
          </div>
        )}

        {/* Progress Feedback */}
        {attemptCount === 1 && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <h4 className="font-bold text-blue-900 mb-3">
              Attempt 1 of 3
            </h4>
            <p className="text-blue-800">
              Great! That's your first response. Now run it again to see a different version!
            </p>
          </div>
        )}

        {attemptCount === 2 && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <h4 className="font-bold text-blue-900 mb-3">
              Attempt 2 of 3
            </h4>
            <div className="text-blue-800 space-y-2">
              <p className="font-semibold">Nice! You've got two different versions.</p>
              <p>Notice how they're both relevant but creatively different? Try one more time!</p>
            </div>
          </div>
        )}

        {attemptCount >= 3 && (
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
            <h4 className="font-bold text-green-900 mb-3">
              🎉 Excellent! You've experienced randomness!
            </h4>
            <div className="text-green-800 space-y-3">
              <p>
                <strong>What did you notice?</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Each opening sentence was unique</li>
                <li>All were relevant to "mystery story about a missing cat"</li>
                <li>The AI gave you creative variety to choose from</li>
                <li>You can pick your favorite or run it again for more options!</li>
              </ul>
              <p className="mt-4 font-semibold">
                💡 This is why randomness is useful—it gives you choices and sparks creativity!
              </p>
            </div>
          </div>
        )}

        {/* Show all responses side-by-side if multiple attempts */}
        {responses.length >= 2 && (
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <h4 className="text-lg font-bold text-[#164055] mb-4">
              Compare All Responses
            </h4>
            <div className="space-y-3">
              {responses.map((response, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#3b999c]"
                >
                  <p className="text-xs font-semibold text-gray-600 mb-2">
                    Response #{index + 1}
                  </p>
                  <p className="text-gray-800">{response}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4 italic">
              Notice how each response is different but equally valid? That's the power of randomness in LLMs!
            </p>
          </div>
        )}

        {/* Learning Point */}
        {attemptCount >= 3 && (
          <div className="bg-[rgba(59,153,156,0.05)] border-2 border-[#3b999c] rounded-xl p-6">
            <h4 className="text-lg font-bold text-[#3b999c] mb-3">
              💡 What You Learned
            </h4>
            <p className="mb-3 text-gray-700">
              The answer is <strong>slightly different each time</strong>! This is because LLMs have some <strong>randomness</strong> built in - they don't always pick the <em>most</em> likely next word, but sometimes choose from the top few options.
            </p>
            <p className="text-gray-700">
              This makes conversations with AI feel more natural and creative, rather than robotic and repetitive.
            </p>
          </div>
        )}

        {/* Pro Tip */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-sm font-semibold text-yellow-700 mb-1">💡 Pro Tip</p>
          <p className="text-sm text-gray-700">
            For creative tasks (stories, poems, brainstorming), try running the same prompt 3-5 times to get the best result!
          </p>
        </div>
      </div>
    </TryItContent>
  )
}
