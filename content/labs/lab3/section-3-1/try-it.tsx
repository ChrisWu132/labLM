'use client'

/**
 * Lab 3, Section 3.1: Token Generation
 * Try It Tab Content
 */

import { useState } from 'react'
import { TryItContent } from '@/components/features/lab-sections'
import { PromptEditor } from '@/components/features/prompt-lab/PromptEditor'
import { LLMOutputDisplay } from '@/components/features/prompt-lab/LLMOutputDisplay'
import { runPrompt } from '@/lib/actions/prompt-lab'

export default function TryIt() {
  const [output1, setOutput1] = useState<string>('')
  const [output2, setOutput2] = useState<string>('')
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [error1, setError1] = useState<string | null>(null)
  const [error2, setError2] = useState<string | null>(null)
  const [attemptCount1, setAttemptCount1] = useState(0)
  const [attemptCount2, setAttemptCount2] = useState(0)

  const handleSubmit1 = async (prompt: string) => {
    setLoading1(true)
    setError1(null)

    try {
      const result = await runPrompt({
        prompt,
        labNumber: 3,
        exerciseId: '3.1-ex1',
      })

      if (result.success && result.output) {
        setOutput1(result.output)
        setAttemptCount1((prev) => prev + 1)
      } else {
        setError1(result.error || 'Failed to run prompt')
      }
    } catch (err) {
      setError1('An error occurred. Please try again.')
    } finally {
      setLoading1(false)
    }
  }

  const handleSubmit2 = async (prompt: string) => {
    setLoading2(true)
    setError2(null)

    try {
      const result = await runPrompt({
        prompt,
        labNumber: 3,
        exerciseId: '3.1-ex2',
      })

      if (result.success && result.output) {
        setOutput2(result.output)
        setAttemptCount2((prev) => prev + 1)
      } else {
        setError2(result.error || 'Failed to run prompt')
      }
    } catch (err) {
      setError2('An error occurred. Please try again.')
    } finally {
      setLoading2(false)
    }
  }

  return (
    <TryItContent
      instructions="Observe how AI generates responses! Run the same prompt multiple times to see variation, then add context to see how it improves the response."
      showSuccessMessage={attemptCount1 >= 3 && attemptCount2 >= 1}
      successMessage="Excellent! You've discovered how probabilistic selection creates variety and how context shapes AI responses!"
    >
      <div className="space-y-8">
        {/* Exercise 1: Observing Variations */}
        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6">
          <h3 className="text-2xl font-bold text-[#164055] mb-4">
            Exercise 1: Observing Variations
          </h3>

          <p className="text-lg text-gray-700 mb-4">
            Run this same prompt <strong>3 times</strong> and compare the results!
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mb-6">
            <p className="text-sm font-semibold text-blue-700 mb-2">
              🔬 Experiment Instructions
            </p>
            <p className="text-gray-700 text-sm">
              Each time you run the prompt below, notice how the AI generates a different creative opening. This happens because at each step, the AI randomly selects from multiple good options!
            </p>
          </div>

          <PromptEditor
            exerciseId="3.1-ex1"
            mode="editable"
            initialValue="Write a creative opening sentence for a mystery story about a missing cat."
            placeholder="Click 'Run' multiple times to see different responses..."
            onSubmit={handleSubmit1}
          />

          {attemptCount1 > 0 && (
            <p className="mt-4 text-sm text-[#3b999c]">
              Runs: {attemptCount1} {attemptCount1 >= 3 && '✓'}
            </p>
          )}
        </div>

        {/* Output Display 1 */}
        {(loading1 || output1 || error1) && (
          <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
            <h4 className="mb-4 text-lg font-semibold text-[#164055]">
              AI Response {attemptCount1 > 0 && `(Run #${attemptCount1})`}:
            </h4>

            <LLMOutputDisplay
              mode="live"
              content={output1}
              loading={loading1}
              error={error1}
            />
          </div>
        )}

        {/* Observations */}
        {attemptCount1 >= 2 && (
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6">
            <h4 className="font-bold text-yellow-900 mb-3">
              🤔 What Did You Observe?
            </h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Each response is slightly different</li>
              <li>All responses are relevant to the prompt</li>
              <li>The AI makes different "creative choices" each time</li>
              <li>Some variations are more dramatic than others</li>
            </ul>

            {attemptCount1 >= 3 && (
              <div className="mt-4 p-4 bg-white rounded border border-yellow-300">
                <p className="font-semibold text-gray-700 mb-2">
                  💡 Why Does This Happen?
                </p>
                <p className="text-sm text-gray-600">
                  At each step, the AI has multiple good options. It uses <strong>probabilistic selection</strong> - randomly picking from the top options instead of always choosing the most likely one. This creates variety and makes responses feel more natural and creative!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Exercise 2: Adding Context */}
        {attemptCount1 >= 3 && (
          <>
            <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6">
              <h3 className="text-2xl font-bold text-[#164055] mb-4">
                Exercise 2: The Power of Context
              </h3>

              <p className="text-lg text-gray-700 mb-4">
                Now let's see how adding context improves responses! Try this prompt with rich context:
              </p>

              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg mb-6">
                <p className="text-sm font-semibold text-green-700 mb-2">
                  ✅ Rich Context Example
                </p>
                <p className="text-gray-700 text-sm">
                  Notice how specifying WHO you are (13-year-old gamer) and HOW to explain (video game analogy) completely changes the AI's approach!
                </p>
              </div>

              <PromptEditor
                exerciseId="3.1-ex2"
                mode="editable"
                initialValue="I'm a 13-year-old who loves video games. Explain quantum mechanics using a video game analogy that makes it exciting and easy to understand."
                placeholder="Try modifying the context to see how it changes the response..."
                onSubmit={handleSubmit2}
              />

              {attemptCount2 > 0 && (
                <p className="mt-4 text-sm text-[#3b999c]">
                  Attempts: {attemptCount2} ✓
                </p>
              )}
            </div>

            {/* Output Display 2 */}
            {(loading2 || output2 || error2) && (
              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <h4 className="mb-4 text-lg font-semibold text-[#164055]">
                  AI Response with Context:
                </h4>

                <LLMOutputDisplay
                  mode="live"
                  content={output2}
                  loading={loading2}
                  error={error2}
                />
              </div>
            )}
          </>
        )}

        {/* Final Learning Points */}
        {attemptCount1 >= 3 && attemptCount2 >= 1 && (
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
            <h4 className="text-lg font-bold text-green-700 mb-3">
              🎉 Key Discoveries
            </h4>

            <div className="space-y-3 text-gray-700">
              <div className="bg-white p-4 rounded border-l-4 border-green-400">
                <strong className="text-green-700">Probabilistic Selection:</strong>
                <p className="text-sm mt-1">
                  The AI doesn't always pick the most likely word - it adds variety by randomly selecting from multiple good options at each step.
                </p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-blue-400">
                <strong className="text-blue-700">Context is King:</strong>
                <p className="text-sm mt-1">
                  Every word that came before shapes what the AI predicts next. More context = better, more tailored responses.
                </p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-purple-400">
                <strong className="text-purple-700">Tokens Matter:</strong>
                <p className="text-sm mt-1">
                  Remember: AI processes text in tokens (word pieces), not full words. This affects cost, limits, and how AI "reads" your prompt.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Experiment Ideas */}
        {attemptCount2 >= 1 && (
          <div className="bg-[rgba(59,153,156,0.05)] border-2 border-[#3b999c] rounded-xl p-6">
            <h4 className="text-lg font-bold text-[#3b999c] mb-3">
              🚀 Try More Experiments!
            </h4>
            <p className="text-gray-700 mb-3">
              Want to explore more? Try these variations:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-gray-600">
              <li>Change the audience age (5-year-old vs. college student)</li>
              <li>Add specific interests (explain using sports, music, or cooking)</li>
              <li>Compare short prompts vs. detailed prompts</li>
              <li>Try explaining the same concept with different analogies</li>
            </ul>
          </div>
        )}
      </div>
    </TryItContent>
  )
}
