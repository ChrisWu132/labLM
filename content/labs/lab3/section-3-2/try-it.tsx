'use client'

/**
 * Lab 3, Section 3.2: Context Windows
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
        labNumber: 3,
        exerciseId: '3.2-ex1',
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
      instructions="Transform a context-free prompt into a rich, detailed one! Add audience, background, situation, and preferences to see how dramatically it improves the response."
      showSuccessMessage={attemptCount >= 2}
      successMessage="Excellent work! You've mastered the art of providing rich context to shape AI responses!"
    >
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-[#164055] mb-6">
          Exercise: Transform with Context
        </h2>

        <p className="text-lg text-gray-700 mb-6">
          Take a simple, context-free prompt and enrich it with multiple types of context!
        </p>

        {/* The Challenge */}
        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg mb-8">
          <p className="text-sm font-semibold text-red-700 mb-2">
            Starting Prompt (Too Vague)
          </p>
          <p className="text-lg text-gray-800 font-mono">
            "Explain how computers work."
          </p>
          <p className="text-sm text-gray-600 mt-3">
            This prompt has NO context! The AI doesn't know who you are, why you're asking, or how detailed to be.
          </p>
        </div>

        {/* Context Types to Add */}
        <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-blue-800 mb-4">
            Add These Types of Context:
          </h3>

          <div className="space-y-3">
            <div className="bg-white p-4 rounded border-l-4 border-purple-400">
              <strong className="text-purple-700">1. Audience Context:</strong>
              <p className="text-sm text-gray-600 mt-1">Who are you? (age, background, interests)</p>
            </div>

            <div className="bg-white p-4 rounded border-l-4 border-green-400">
              <strong className="text-green-700">2. Background Context:</strong>
              <p className="text-sm text-gray-600 mt-1">What do you already know? What's your skill level?</p>
            </div>

            <div className="bg-white p-4 rounded border-l-4 border-blue-400">
              <strong className="text-blue-700">3. Situational Context:</strong>
              <p className="text-sm text-gray-600 mt-1">Why do you need this? What's your goal?</p>
            </div>

            <div className="bg-white p-4 rounded border-l-4 border-yellow-400">
              <strong className="text-yellow-700">4. Preference Context:</strong>
              <p className="text-sm text-gray-600 mt-1">How do you want it explained? Any specific examples or style?</p>
            </div>
          </div>
        </div>

        {/* Interactive Exercise */}
        <div className="bg-white border-2 border-[#3b999c] rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-[#3b999c] mb-4">
            Your Turn: Add Rich Context!
          </h3>

          <p className="text-gray-700 mb-6">
            Rewrite the prompt below to include <strong>all four types</strong> of context. Make it specific and tailored!
          </p>

          <PromptEditor
            exerciseId="3.2-ex1"
            mode="editable"
            initialValue="Explain how computers work."
            placeholder="Add audience, background, situation, and preferences..."
            onSubmit={handleSubmit}
          />

          {attemptCount > 0 && (
            <p className="mt-4 text-sm text-[#3b999c]">
              Attempts: {attemptCount} {attemptCount >= 2 && ''}
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

        {/* Feedback */}
        {attemptCount >= 1 && (
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6">
            <h4 className="font-bold text-yellow-900 mb-3">
              Evaluate Your Context
            </h4>

            <p className="text-gray-700 mb-3">
              Check if you included:
            </p>

            <ul className="list-none space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-purple-600">□</span>
                <span><strong>Audience:</strong> Did you specify who you are or your knowledge level?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">□</span>
                <span><strong>Background:</strong> Did you mention what you already know or don't know?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">□</span>
                <span><strong>Situation:</strong> Did you explain why you need this information?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600">□</span>
                <span><strong>Preferences:</strong> Did you specify how you want it explained (analogies, examples, etc.)?</span>
              </li>
            </ul>

            {attemptCount >= 2 && (
              <div className="mt-4 p-4 bg-white rounded border border-yellow-300">
                <p className="font-semibold text-green-700">
                  Great job! Compare your response to one without context. Much more helpful, right?
                </p>
              </div>
            )}
          </div>
        )}

        {/* Example Solutions */}
        <div className="bg-[rgba(59,153,156,0.05)] border-2 border-[#3b999c] rounded-xl p-6">
          <h4 className="text-lg font-bold text-[#3b999c] mb-3">
            Example Context-Rich Prompts
          </h4>
          <p className="text-gray-700 mb-4">
            Here are examples of how to add all four types of context:
          </p>

          <div className="space-y-3 text-sm">
            <div className="bg-white p-4 rounded border-l-4 border-green-400">
              <strong className="text-green-700">For a Young Student:</strong>
              <p className="text-gray-700 mt-2 font-mono text-xs leading-relaxed">
                "I'm a 12-year-old student who loves gaming but doesn't understand technology yet. I need to write a short report about how computers work. Explain the basics using gaming examples that I can relate to, and keep it simple enough that I can explain it to my classmates. Focus on the main components (processor, memory, storage) and what each does."
              </p>
            </div>

            <div className="bg-white p-4 rounded border-l-4 border-blue-400">
              <strong className="text-blue-700">For a Career Changer:</strong>
              <p className="text-gray-700 mt-2 font-mono text-xs leading-relaxed">
                "I'm a 35-year-old considering a career switch to IT support. I understand how to use computers but don't know the technical details of how they actually function. Explain computer architecture in a way that helps me understand what I'd be troubleshooting in a tech support role. Include practical examples of common hardware issues."
              </p>
            </div>

            <div className="bg-white p-4 rounded border-l-4 border-purple-400">
              <strong className="text-purple-700">For a DIY Builder:</strong>
              <p className="text-gray-700 mt-2 font-mono text-xs leading-relaxed">
                "I'm planning to build my first gaming PC and want to understand how the components work together. I've watched some YouTube videos but need a clearer explanation. Walk me through how the CPU, RAM, GPU, motherboard, and storage interact during gaming, using step-by-step explanations I can visualize."
              </p>
            </div>
          </div>

          <p className="text-gray-600 text-sm mt-4 italic">
            Notice how each example specifies WHO, WHAT background knowledge they have, WHY they're asking, and HOW they want it explained!
          </p>
        </div>

        {/* Advanced Tips */}
        {attemptCount >= 2 && (
          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
            <h4 className="font-bold text-blue-800 mb-3">
              Pro Tips for Context
            </h4>

            <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm">
              <li><strong>Be specific:</strong> "13-year-old gamer" is better than "kid"</li>
              <li><strong>Mention constraints:</strong> "in under 200 words" or "using 3 examples"</li>
              <li><strong>Specify format:</strong> "step-by-step", "as a story", "using bullet points"</li>
              <li><strong>State your goal:</strong> "so I can teach others", "for a test", "for a job interview"</li>
              <li><strong>Include examples:</strong> "like how you'd explain to someone learning to cook"</li>
            </ul>
          </div>
        )}
      </div>
    </TryItContent>
  )
}
