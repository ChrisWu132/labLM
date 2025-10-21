'use client'

/**
 * Lab 1, Section 1.4: Experiment Time
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
        labNumber: 1,
        exerciseId: '1.4-ex1',
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
      instructions="Experiment with different prompting techniques. Try at least 3 different prompts to practice what you've learned!"
      showSuccessMessage={attemptCount >= 3}
      successMessage="Fantastic! You're mastering the art of prompt writing. Keep experimenting to discover what works best!"
    >
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-[#164055] mb-6">
          Exercise: Free Experimentation
        </h2>

        <p className="text-lg text-gray-700 mb-6">
          Time to put everything you've learned into practice! This is your playground to experiment with different prompting techniques.
        </p>

        {/* Challenge Options */}
        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-[#3b999c] mb-4">
            Your Challenge
          </h3>

          <p className="text-gray-700 mb-4">
            Pick ONE of these tasks and write the best prompt you can:
          </p>

          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <p className="font-semibold text-blue-900 mb-2">Option 1: Creative Writing</p>
              <p className="text-gray-700 text-sm">
                Get the AI to write a short, exciting adventure story (3-4 sentences). Make your prompt specific enough that the story has a clear setting, character, and challenge.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
              <p className="font-semibold text-green-900 mb-2">Option 2: Learning Help</p>
              <p className="text-gray-700 text-sm">
                Ask the AI to explain a concept you're curious about (science, math, history, etc.). Make your prompt clear about who the explanation is for and how detailed it should be.
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded">
              <p className="font-semibold text-purple-900 mb-2">Option 3: Brainstorming</p>
              <p className="text-gray-700 text-sm">
                Generate 5 creative ideas for something (art project, science fair, story topic, etc.). Be specific about what type of ideas and any constraints.
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mt-6">
            <p className="text-sm font-semibold text-yellow-700 mb-1">💡 Checklist</p>
            <p className="text-sm text-gray-700 mb-2">Make sure your prompt includes:</p>
            <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
              <li><strong>Clear task:</strong> What should the AI do?</li>
              <li><strong>Context:</strong> Who is this for? Why?</li>
              <li><strong>Details:</strong> Any specific requirements?</li>
              <li><strong>Format:</strong> How should the response be structured?</li>
            </ul>
          </div>
        </div>

        {/* Interactive Prompt Editor */}
        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-[#3b999c] mb-4">
            🎨 Your Experiment Space
          </h3>

          <p className="text-gray-700 mb-4">
            Write your prompt below and click "Run Prompt" to see the AI's response:
          </p>

          <PromptEditor
            exerciseId="1.4-ex1"
            mode="editable"
            initialValue=""
            placeholder="Write your creative prompt here... (Try one of the options above!)"
            onSubmit={handleSubmit}
          />

          {attemptCount > 0 && (
            <p className="mt-4 text-sm text-[#3b999c]">
              Experiments: {attemptCount} {attemptCount >= 3 && '✓'}
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

        {/* Progress Feedback */}
        {attemptCount === 1 && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <h4 className="font-bold text-blue-900 mb-3">
              🎉 Great First Attempt!
            </h4>

            <div className="text-blue-800 space-y-2 text-sm">
              <p><strong>Self-Evaluation Questions:</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Did the AI give you what you wanted?</li>
                <li>Was your prompt clear and specific?</li>
                <li>Could you make it even better?</li>
              </ul>
              <p className="mt-3">Try again with a refinement or pick a different option!</p>
            </div>
          </div>
        )}

        {attemptCount === 2 && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <h4 className="font-bold text-blue-900 mb-3">
              🎯 Nice Refinement!
            </h4>

            <div className="text-blue-800 space-y-2 text-sm">
              <p className="font-semibold">You're getting the hang of it!</p>
              <p>Try one more to solidify your skills. Consider:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Trying a different option from above</li>
                <li>Making an even more specific prompt</li>
                <li>Adding more context or constraints</li>
              </ul>
            </div>
          </div>
        )}

        {attemptCount >= 3 && (
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
            <h4 className="font-bold text-green-900 mb-3">
              ⭐ Excellent Practice!
            </h4>

            <div className="text-green-800 space-y-2 text-sm">
              <p className="font-semibold">🌟 You're mastering prompt writing!</p>
              <p>Key things you've learned:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Specific prompts get better results</li>
                <li>Adding context helps the AI understand your needs</li>
                <li>You can always refine and try again</li>
                <li>Experimentation is how you learn!</li>
              </ul>
              <p className="mt-4 font-semibold">
                ✅ Fantastic! You're ready to move on to the final review section.
              </p>
            </div>
          </div>
        )}

        {/* Bonus Challenge */}
        <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-6">
          <h4 className="font-bold text-gray-800 mb-3">🔍 Bonus Challenge (Optional)</h4>
          <p className="text-gray-700 mb-3">
            Try the SAME task with both a vague prompt and a specific prompt. Compare the results! This helps you see firsthand why specificity matters.
          </p>
          <p className="text-sm text-gray-600 italic">
            Example: Try "Write a story" vs "Write a 3-sentence mystery story about a detective solving a case in a haunted library"
          </p>
        </div>
      </div>
    </TryItContent>
  )
}
