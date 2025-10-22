'use client'

/**
 * Lab 4, Section 4.2: AI Weaknesses
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
        exerciseId: '4.2-ex1',
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
      instructions="Test AI's limitations! Try math problems, current events questions, or specific fact queries to see where AI might struggle."
      showSuccessMessage={attemptCount >= 2}
      successMessage="Great exploration! You now understand AI's limitations and know to verify important information!"
    >
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-[#164055] mb-6">
          Exercise: Testing AI's Limitations
        </h2>

        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg mb-8">
          <p className="text-sm font-semibold text-red-700 mb-2">
            ⚠️ Purpose of This Exercise
          </p>
          <p className="text-gray-700 text-sm">
            This exercise helps you recognize when AI might give unreliable answers. Always verify important information!
          </p>
        </div>

        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-[#3b999c] mb-4">
            Test AI's Limits
          </h3>

          <p className="text-gray-700 mb-4">
            Try questions that test AI's weaknesses:
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mb-6">
            <p className="text-sm font-semibold text-blue-700 mb-2">
              💡 Try These:
            </p>
            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
              <li><strong>Math:</strong> "If I buy 3 items at $12.47 each with 8% tax, what's the total?"</li>
              <li><strong>Current Events:</strong> "What major news happened today?"</li>
              <li><strong>Specific Facts:</strong> "What's the exact population of Tokyo right now?"</li>
              <li><strong>Complex Logic:</strong> "Solve this riddle: [complex multi-step puzzle]"</li>
            </ul>
          </div>

          <PromptEditor
            exerciseId="4.2-ex1"
            mode="editable"
            initialValue="Try asking: What major world events happened in 2024? OR Calculate: 347 x 89 + 234 / 7"
            placeholder="Test AI's limitations with math, current events, or specific facts..."
            onSubmit={handleSubmit}
          />

          {attemptCount > 0 && (
            <p className="mt-4 text-sm text-[#3b999c]">
              Attempts: {attemptCount} {attemptCount >= 2 && '✓'}
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
              🤔 Evaluate the Response
            </h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Did AI show uncertainty about current information?</li>
              <li>Were calculations accurate? (Verify with a calculator!)</li>
              <li>Did it acknowledge its knowledge cutoff?</li>
              <li>Would you trust this answer for something important?</li>
            </ul>
          </div>
        )}

        {attemptCount >= 2 && (
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
            <h4 className="text-lg font-bold text-green-700 mb-3">
              🎯 Key Lessons
            </h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Always verify</strong> important facts and calculations</li>
              <li><strong>Don't rely on AI alone</strong> for critical decisions</li>
              <li><strong>Use appropriate tools</strong> - calculator for math, search for current events</li>
              <li><strong>AI is a helpful assistant</strong>, not an infallible authority</li>
            </ul>
          </div>
        )}
      </div>
    </TryItContent>
  )
}
