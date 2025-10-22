'use client'

/**
 * Lab 3, Section 3.3: Role-Playing Basics
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
        labNumber: 3,
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
      instructions="Practice using different roles to shape AI responses! See how the same task produces completely different outputs when you change the role."
      showSuccessMessage={totalAttempts >= 3}
      successMessage="Outstanding! You've mastered the basics of role-playing to control AI personality and style!"
    >
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-[#164055] mb-6">
          Exercise: Compare Different Roles
        </h2>

        <p className="text-lg text-gray-700 mb-6">
          Let's see how the SAME task changes with different roles. Choose a topic and try at least 3 different roles!
        </p>

        {/* Exercise 1: Teacher Role */}
        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6">
          <h3 className="text-xl font-bold text-[#164055] mb-4">
            Role 1: As a Friendly Teacher
          </h3>

          <p className="text-gray-700 mb-4">
            Ask the AI to explain a concept as a patient, encouraging teacher:
          </p>

          <PromptEditor
            exerciseId="3.3-ex1"
            mode="editable"
            initialValue="You are a friendly and patient middle school science teacher who loves using analogies.

Explain how the internet works to a student who has never thought about it before. Use a simple analogy and keep it under 100 words."
            placeholder="Try asking as a teacher..."
            onSubmit={(prompt) => handleSubmit('3.3-ex1', prompt)}
          />

          {attemptCounts['3.3-ex1'] > 0 && (
            <p className="mt-4 text-sm text-[#3b999c]">
              Completed
            </p>
          )}
        </div>

        {/* Output Display 1 */}
        {(loading['3.3-ex1'] || outputs['3.3-ex1'] || errors['3.3-ex1']) && (
          <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
            <h4 className="mb-4 text-lg font-semibold text-[#164055]">
              Teacher Response:
            </h4>

            <LLMOutputDisplay
              mode="live"
              content={outputs['3.3-ex1'] || ''}
              loading={loading['3.3-ex1']}
              error={errors['3.3-ex1']}
            />
          </div>
        )}

        {/* Exercise 2: Poet Role */}
        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6">
          <h3 className="text-xl font-bold text-[#164055] mb-4">
            Role 2: As a Creative Poet
          </h3>

          <p className="text-gray-700 mb-4">
            Now give the AI a creative, artistic persona:
          </p>

          <PromptEditor
            exerciseId="3.3-ex2"
            mode="editable"
            initialValue="You are a romantic poet who loves nature and uses vivid imagery.

Write a 4-line poem about autumn leaves falling from trees."
            placeholder="Try asking as a poet..."
            onSubmit={(prompt) => handleSubmit('3.3-ex2', prompt)}
          />

          {attemptCounts['3.3-ex2'] > 0 && (
            <p className="mt-4 text-sm text-[#3b999c]">
              Completed
            </p>
          )}
        </div>

        {/* Output Display 2 */}
        {(loading['3.3-ex2'] || outputs['3.3-ex2'] || errors['3.3-ex2']) && (
          <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
            <h4 className="mb-4 text-lg font-semibold text-[#164055]">
              Poet Response:
            </h4>

            <LLMOutputDisplay
              mode="live"
              content={outputs['3.3-ex2'] || ''}
              loading={loading['3.3-ex2']}
              error={errors['3.3-ex2']}
            />
          </div>
        )}

        {/* Exercise 3: Custom Role */}
        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6">
          <h3 className="text-xl font-bold text-[#164055] mb-4">
            Role 3: Your Choice!
          </h3>

          <p className="text-gray-700 mb-4">
            Choose your own role and topic. Try something creative like a sports coach, chef, comedian, or scientist!
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mb-4">
            <p className="text-sm font-semibold text-blue-700 mb-2">
              Ideas for Roles:
            </p>
            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
              <li><strong>Sports Coach:</strong> Motivational, energetic, performance-focused</li>
              <li><strong>Chef:</strong> Detailed recipes, cooking tips, food science</li>
              <li><strong>Comedian:</strong> Funny explanations, jokes, lighthearted tone</li>
              <li><strong>Scientist:</strong> Technical, precise, evidence-based</li>
              <li><strong>Tour Guide:</strong> Descriptive, historical, engaging stories</li>
            </ul>
          </div>

          <PromptEditor
            exerciseId="3.3-ex3"
            mode="editable"
            initialValue="You are a [choose your role with personality traits].

[Your question or task]"
            placeholder="Create your own role and task..."
            onSubmit={(prompt) => handleSubmit('3.3-ex3', prompt)}
          />

          {attemptCounts['3.3-ex3'] > 0 && (
            <p className="mt-4 text-sm text-[#3b999c]">
              Completed
            </p>
          )}
        </div>

        {/* Output Display 3 */}
        {(loading['3.3-ex3'] || outputs['3.3-ex3'] || errors['3.3-ex3']) && (
          <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
            <h4 className="mb-4 text-lg font-semibold text-[#164055]">
              Custom Role Response:
            </h4>

            <LLMOutputDisplay
              mode="live"
              content={outputs['3.3-ex3'] || ''}
              loading={loading['3.3-ex3']}
              error={errors['3.3-ex3']}
            />
          </div>
        )}

        {/* Comparison and Reflection */}
        {totalAttempts >= 2 && (
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6">
            <h4 className="font-bold text-yellow-900 mb-3">
              Compare the Responses
            </h4>

            <p className="text-gray-700 mb-3">
              Look at the different outputs above. Notice:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Vocabulary:</strong> Did different roles use different words?</li>
              <li><strong>Tone:</strong> Was one more formal, another more casual or enthusiastic?</li>
              <li><strong>Structure:</strong> Did they organize information differently?</li>
              <li><strong>Focus:</strong> Did they emphasize different aspects of the topic?</li>
              <li><strong>Examples:</strong> Did they use different types of examples or analogies?</li>
            </ul>

            {totalAttempts >= 3 && (
              <div className="mt-4 p-4 bg-white rounded border border-yellow-300">
                <p className="font-semibold text-green-700">
                  Excellent! You can see how roles dramatically change the AI's "personality" and output!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Key Takeaways */}
        {totalAttempts >= 3 && (
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
            <h4 className="text-lg font-bold text-green-700 mb-3">
              What You Learned
            </h4>

            <div className="space-y-3">
              <div className="bg-white p-4 rounded border-l-4 border-green-400">
                <strong className="text-green-700">The "You are..." Formula:</strong>
                <p className="text-sm text-gray-700 mt-1">
                  This simple phrase is one of the most powerful prompt techniques. It sets context that shapes the entire response.
                </p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-blue-400">
                <strong className="text-blue-700">Roles Change Everything:</strong>
                <p className="text-sm text-gray-700 mt-1">
                  Same task, completely different outputs. Roles affect vocabulary, tone, detail level, and approach.
                </p>
              </div>

              <div className="bg-white p-4 rounded border-l-4 border-purple-400">
                <strong className="text-purple-700">Mix and Match:</strong>
                <p className="text-sm text-gray-700 mt-1">
                  You can combine roles with other context (audience, situation, preferences) for even more control!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Advanced Preview */}
        {totalAttempts >= 3 && (
          <div className="bg-[rgba(59,153,156,0.05)] border-2 border-[#3b999c] rounded-xl p-6">
            <h4 className="text-lg font-bold text-[#3b999c] mb-3">
              Coming Up Next
            </h4>
            <p className="text-gray-700 mb-3">
              In the next section, you'll learn to create <strong>advanced custom personas</strong> with multiple personality traits and specific expertise!
            </p>
            <p className="text-sm text-gray-600 italic">
              Preview: "You are Professor Sparks, an enthusiastic physics teacher who explains everything using superhero movie analogies and always adds fun facts..."
            </p>
          </div>
        )}
      </div>
    </TryItContent>
  )
}
