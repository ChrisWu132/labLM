'use client'

/**
 * Lab 4, Section 4.1: AI Superpowers
 * Try It Tab Content
 */

import { useState } from 'react'
import { TryItContent } from '@/components/features/lab-sections'
import { PromptEditor } from '@/components/features/prompt-lab/PromptEditor'
import { LLMOutputDisplay } from '@/components/features/prompt-lab/LLMOutputDisplay'
import { runPrompt } from '@/lib/actions/prompt-lab'

export default function TryIt() {
  const [outputs, setOutputs] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [errors, setErrors] = useState<Record<string, string | null>>({})
  const [attemptCounts, setAttemptCounts] = useState<Record<string, number>>({})

  const handleSubmit = async (exerciseId: string, prompt: string) => {
    setLoading((prev) => ({ ...prev, [exerciseId]: true }))
    setErrors((prev) => ({ ...prev, [exerciseId]: null }))

    try {
      const result = await runPrompt({
        prompt,
        labNumber: 4,
        exerciseId,
      })

      if (result.success && result.output) {
        setOutputs((prev) => ({ ...prev, [exerciseId]: result.output! }))
        setAttemptCounts((prev) => ({ ...prev, [exerciseId]: (prev[exerciseId] || 0) + 1 }))
      } else {
        setErrors((prev) => ({ ...prev, [exerciseId]: result.error || 'Failed to run prompt' }))
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, [exerciseId]: 'An error occurred. Please try again.' }))
    } finally {
      setLoading((prev) => ({ ...prev, [exerciseId]: false }))
    }
  }

  const totalAttempts = Object.values(attemptCounts).reduce((sum, count) => sum + count, 0)

  return (
    <TryItContent
      instructions="Test AI's superpowers! Try tasks that leverage AI's core strengths in writing, explanation, and creativity."
      showSuccessMessage={totalAttempts >= 2}
      successMessage="Excellent! You've discovered what AI excels at. Remember these strengths when choosing tasks for AI!"
    >
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-[#164055] mb-6">
          Exercise: Leverage AI's Strengths
        </h2>

        {/* Exercise 1: Creative Writing */}
        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6">
          <h3 className="text-xl font-bold text-[#164055] mb-4">
            Task 1: Creative Writing (AI Superpower!)
          </h3>

          <p className="text-gray-700 mb-4">
            Try one of AI's strongest abilities - creative content generation:
          </p>

          <PromptEditor
            exerciseId="4.1-ex1"
            mode="editable"
            initialValue="Write the opening paragraph of a mystery story set in a futuristic city. Make it engaging and atmospheric, introducing a detective character."
            placeholder="Try a creative writing task..."
            onSubmit={(prompt) => handleSubmit('4.1-ex1', prompt)}
          />

          {attemptCounts['4.1-ex1'] > 0 && (
            <p className="mt-4 text-sm text-[#3b999c]">
              ✓ Completed
            </p>
          )}
        </div>

        {(loading['4.1-ex1'] || outputs['4.1-ex1'] || errors['4.1-ex1']) && (
          <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
            <h4 className="mb-4 text-lg font-semibold text-[#164055]">
              AI Response:
            </h4>
            <LLMOutputDisplay
              mode="live"
              content={outputs['4.1-ex1'] || ''}
              loading={loading['4.1-ex1']}
              error={errors['4.1-ex1']}
            />
          </div>
        )}

        {/* Exercise 2: Explanation */}
        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6">
          <h3 className="text-xl font-bold text-[#164055] mb-4">
            Task 2: Explanation (Another AI Strength!)
          </h3>

          <p className="text-gray-700 mb-4">
            Test AI's ability to explain complex concepts simply:
          </p>

          <PromptEditor
            exerciseId="4.1-ex2"
            mode="editable"
            initialValue="You are a patient teacher. Explain how WiFi works to a 10-year-old using a simple analogy. Keep it under 100 words."
            placeholder="Try an explanation task..."
            onSubmit={(prompt) => handleSubmit('4.1-ex2', prompt)}
          />

          {attemptCounts['4.1-ex2'] > 0 && (
            <p className="mt-4 text-sm text-[#3b999c]">
              ✓ Completed
            </p>
          )}
        </div>

        {(loading['4.1-ex2'] || outputs['4.1-ex2'] || errors['4.1-ex2']) && (
          <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
            <h4 className="mb-4 text-lg font-semibold text-[#164055]">
              AI Response:
            </h4>
            <LLMOutputDisplay
              mode="live"
              content={outputs['4.1-ex2'] || ''}
              loading={loading['4.1-ex2']}
              error={errors['4.1-ex2']}
            />
          </div>
        )}

        {/* Exercise 3: Your Choice */}
        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6">
          <h3 className="text-xl font-bold text-[#164055] mb-4">
            Task 3: Your Choice of AI Strength!
          </h3>

          <p className="text-gray-700 mb-4">
            Choose a task that plays to AI's strengths:
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mb-4">
            <p className="text-sm font-semibold text-blue-700 mb-2">
              💡 Ideas:
            </p>
            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
              <li><strong>Brainstorming:</strong> Generate 5 creative project ideas for...</li>
              <li><strong>Summarization:</strong> Summarize this concept in 3 bullet points...</li>
              <li><strong>Translation:</strong> Rephrase this formally/casually...</li>
              <li><strong>Teaching:</strong> Explain [topic] using a cooking analogy...</li>
            </ul>
          </div>

          <PromptEditor
            exerciseId="4.1-ex3"
            mode="editable"
            initialValue="Choose a task that leverages AI's strengths..."
            placeholder="Try brainstorming, summarizing, or explaining..."
            onSubmit={(prompt) => handleSubmit('4.1-ex3', prompt)}
          />

          {attemptCounts['4.1-ex3'] > 0 && (
            <p className="mt-4 text-sm text-[#3b999c]">
              ✓ Completed
            </p>
          )}
        </div>

        {(loading['4.1-ex3'] || outputs['4.1-ex3'] || errors['4.1-ex3']) && (
          <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
            <h4 className="mb-4 text-lg font-semibold text-[#164055]">
              AI Response:
            </h4>
            <LLMOutputDisplay
              mode="live"
              content={outputs['4.1-ex3'] || ''}
              loading={loading['4.1-ex3']}
              error={errors['4.1-ex3']}
            />
          </div>
        )}

        {totalAttempts >= 2 && (
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
            <h4 className="text-lg font-bold text-green-700 mb-3">
              🎉 What You Discovered
            </h4>
            <p className="text-gray-700 mb-3">
              AI is <strong>exceptional</strong> at tasks involving language patterns and creativity!
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm">
              <li>Writing and creative content generation</li>
              <li>Explaining complex concepts simply</li>
              <li>Brainstorming and generating ideas</li>
              <li>Summarizing and rephrasing</li>
            </ul>
          </div>
        )}
      </div>
    </TryItContent>
  )
}
