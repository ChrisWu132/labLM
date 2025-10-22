'use client'

/**
 * Lab 4, Section 4.5: Chain-of-Thought
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
        exerciseId: '4.5-ex1',
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
      instructions="Experience the power of Chain-of-Thought! Add 'Let's think step by step' to see how it improves AI reasoning."
      showSuccessMessage={attemptCount >= 2}
      successMessage="Excellent! You've mastered Chain-of-Thought prompting - one of the most powerful techniques for improving AI reasoning!"
    >
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-[#164055] mb-6">
          Exercise: Using "Let's Think Step by Step"
        </h2>

        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-[#3b999c] mb-4">
            Try: Add Chain-of-Thought to a Problem
          </h3>

          <p className="text-gray-700 mb-4">
            Take a problem that requires reasoning and add the magic phrase!
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mb-6">
            <p className="text-sm font-semibold text-blue-700 mb-2">
              💡 Example Problems to Try:
            </p>
            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
              <li><strong>Math:</strong> "I have a rectangular garden 12 feet long and 8 feet wide. Fencing costs $15 per foot. What's the total cost? Let's think step by step."</li>
              <li><strong>Logic:</strong> "If all cats are animals, and all animals need food, what can we conclude about cats? Let's think step by step."</li>
              <li><strong>Decision:</strong> "Should I learn Python or JavaScript first for web development? Let's think step by step about the factors."</li>
              <li><strong>Debugging:</strong> "This code prints 0-9 instead of 1-10. Walk me through step-by-step what it does and why."</li>
            </ul>
          </div>

          <PromptEditor
            exerciseId="4.5-ex1"
            mode="editable"
            initialValue="I have a rectangular garden that's 12 feet long and 8 feet wide. I want to put a fence around it, and fencing costs $15 per foot. How much will the fence cost?

Let's think step by step."
            placeholder="Try a problem with 'Let's think step by step'..."
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
              <li>Did AI break the problem into clear steps?</li>
              <li>Can you follow the reasoning from start to finish?</li>
              <li>Are the calculations or logic visible?</li>
              <li>Could you verify each step independently?</li>
              <li>Is this more reliable than a direct answer?</li>
            </ul>

            {attemptCount >= 2 && (
              <div className="mt-4 p-4 bg-white rounded border border-yellow-300">
                <p className="font-semibold text-green-700 mb-2">
                  ✅ Compare Without CoT:
                </p>
                <p className="text-sm text-gray-700">
                  Try the same problem WITHOUT "Let's think step by step" to see the difference. The Chain-of-Thought version should be much clearer and more verifiable!
                </p>
              </div>
            )}
          </div>
        )}

        {attemptCount >= 2 && (
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
            <h4 className="text-lg font-bold text-green-700 mb-3">
              🎉 You've Mastered Chain-of-Thought!
            </h4>
            <div className="space-y-3 text-gray-700">
              <p><strong>What you learned:</strong></p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Chain-of-Thought makes AI reasoning visible and verifiable</li>
                <li>"Let's think step by step" is the magic phrase</li>
                <li>Use CoT for math, logic, debugging, and complex decisions</li>
                <li>Step-by-step reasoning reduces errors dramatically</li>
              </ul>

              <div className="mt-4 p-4 bg-white rounded border border-green-300">
                <p className="font-semibold text-green-700 mb-2">
                  💡 Pro Tip:
                </p>
                <p className="text-sm text-gray-700">
                  Combine CoT with role-playing: "You are a patient math tutor. Solve this step-by-step, explaining each step clearly for a student."
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-[rgba(59,153,156,0.05)] border-2 border-[#3b999c] rounded-xl p-6">
          <h4 className="text-lg font-bold text-[#3b999c] mb-3">
            🚀 Advanced Techniques
          </h4>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Try these variations:</strong></p>
            <ul className="list-disc pl-6 space-y-1">
              <li>"Break this down into numbered steps"</li>
              <li>"Walk me through your reasoning process"</li>
              <li>"First, identify what we know. Then, plan our approach. Finally, solve step-by-step."</li>
              <li>"Show your work for each calculation"</li>
            </ul>
          </div>
        </div>
      </div>
    </TryItContent>
  )
}
