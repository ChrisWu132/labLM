'use client'

/**
 * Lab 5, Section 5.4: Critical Thinking
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

  const handleSubmit = async (prompt: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await runPrompt({
        prompt,
        labNumber: 5,
        exerciseId: '5.4-ex1',
      })

      if (result.success && result.output) {
        setOutput(result.output)
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
      instructions="Practice applying critical thinking to AI responses. Use all the prompt techniques you've learned (role-setting, context, constraints, chain-of-thought) while maintaining a critical mindset."
    >
      <div className="space-y-6">
        {/* Exercise Prompt */}
        <div className="rounded-lg border-2 border-[#3b999c] bg-white p-6">
          <h3 className="mb-4 text-xl font-bold text-[#164055]">
            Exercise 5.4: Apply ALL Your Skills
          </h3>

          <p className="mb-4 text-gray-700">
            Now it's time to combine EVERYTHING you've learned! Create a comprehensive prompt that uses multiple techniques while showing critical thinking.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-4">
            <p className="font-semibold text-blue-800 mb-2">Your Challenge:</p>
            <p className="text-sm text-gray-700 mb-3">
              Choose a topic you're actually learning about or curious about. Create a prompt that:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700">
              <li>Sets the AI's role appropriately</li>
              <li>Provides clear context about what you need</li>
              <li>Includes specific constraints (format, length, style)</li>
              <li>Requests step-by-step reasoning</li>
              <li>Shows you want to LEARN (not just get answers)</li>
              <li>Asks AI to indicate uncertainty where appropriate</li>
            </ol>
          </div>

          <div className="bg-green-50 border border-green-300 rounded-lg p-4 mb-4">
            <p className="font-semibold text-green-800 mb-2">Example Comprehensive Prompt:</p>
            <div className="text-sm text-gray-700 bg-white border border-green-200 rounded p-3">
              <p className="mb-2">
                <strong>You are a patient science teacher who loves explaining concepts clearly and helping students develop critical thinking skills.</strong>
              </p>
              <p className="mb-2">
                I'm learning about climate change for a school project. I need to understand the greenhouse effect and how it relates to global warming. I've heard different perspectives and want to understand the scientific consensus.
              </p>
              <p className="mb-2">
                Please help me by:
              </p>
              <ol className="list-decimal pl-5 space-y-1 mb-2">
                <li>Explaining the greenhouse effect step-by-step</li>
                <li>Connecting it to global warming with clear reasoning</li>
                <li>Noting any areas of scientific debate or uncertainty</li>
                <li>Suggesting 2-3 reliable sources where I can verify this information</li>
                <li>Giving me one question to think about to test my understanding</li>
              </ol>
              <p>
                Keep your explanation suitable for an 8th grader. Let me know if any part of your explanation is simplified or if there are important nuances I should explore further.
              </p>
            </div>
          </div>

          <p className="mb-3 font-semibold text-[#164055]">
            Now create YOUR comprehensive prompt:
          </p>

          <PromptEditor
            exerciseId="5.4-ex1"
            mode="editable"
            initialValue="You are [set the role]...\n\nI'm learning about [your topic]...\n\nPlease:\n1. [First request]\n2. [Second request]\n3. [Ask for sources or verification]\n4. [Request for checking understanding]\n\n[Add any constraints about style, length, or format]"
            placeholder="Create your comprehensive prompt using ALL techniques..."
            onSubmit={handleSubmit}
          />
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

        {/* Critical Thinking Exercise */}
        {output && (
          <div className="rounded-lg border-2 border-purple-500 bg-purple-50 p-6">
            <h4 className="mb-3 text-lg font-semibold text-purple-700">
              Now Apply Critical Thinking to the Response
            </h4>

            <p className="text-gray-700 mb-4">
              Don't just accept the AI's response! Use the 5-question framework:
            </p>

            <div className="bg-white border border-purple-300 rounded-lg p-4 space-y-3">
              <div>
                <p className="font-semibold text-purple-800 mb-1">1. Does this make sense?</p>
                <p className="text-sm text-gray-600">Review the explanation. Does it align with what you already know? Are there any contradictions?</p>
              </div>

              <div>
                <p className="font-semibold text-purple-800 mb-1">2. Can I verify this?</p>
                <p className="text-sm text-gray-600">Did the AI suggest sources? Plan to check at least 2-3 reliable sources before using this information.</p>
              </div>

              <div>
                <p className="font-semibold text-purple-800 mb-1">3. Is this biased?</p>
                <p className="text-sm text-gray-600">Does the response present multiple perspectives? Are there any assumptions being made?</p>
              </div>

              <div>
                <p className="font-semibold text-purple-800 mb-1">4. Is this complete?</p>
                <p className="text-sm text-gray-600">Did you get all the information you asked for? Are there important details missing?</p>
              </div>

              <div>
                <p className="font-semibold text-purple-800 mb-1">5. How confident should I be?</p>
                <p className="text-sm text-gray-600">Did the AI indicate any uncertainty? What level of verification does this topic require?</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-purple-100 border border-purple-300 rounded">
              <p className="font-semibold text-purple-800 mb-2"> Action Items:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Write down 2-3 key facts to verify with other sources</li>
                <li>• Note any claims that seem surprising or uncertain</li>
                <li>• Try explaining the concept to someone else in your own words</li>
                <li>• Identify what you still need to learn or clarify</li>
              </ul>
            </div>
          </div>
        )}

        {/* Skills Mastery Check */}
        <div className="rounded-lg border-2 border-green-500 bg-green-50 p-6">
          <h4 className="mb-3 text-lg font-semibold text-green-700">
            Skills Mastery Checklist
          </h4>

          <p className="text-gray-700 mb-4">
            Review your prompt. Did you include:
          </p>

          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 bg-white rounded border border-green-200">
              <input type="checkbox" className="w-5 h-5 text-green-600" />
              <span className="text-gray-700"><strong>Role-Setting:</strong> Clear role for AI (teacher, coach, expert)</span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-white rounded border border-green-200">
              <input type="checkbox" className="w-5 h-5 text-green-600" />
              <span className="text-gray-700"><strong>Context:</strong> Specific details about your situation and needs</span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-white rounded border border-green-200">
              <input type="checkbox" className="w-5 h-5 text-green-600" />
              <span className="text-gray-700"><strong>Constraints:</strong> Format, length, or style requirements</span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-white rounded border border-green-200">
              <input type="checkbox" className="w-5 h-5 text-green-600" />
              <span className="text-gray-700"><strong>Chain-of-Thought:</strong> Step-by-step reasoning request</span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-white rounded border border-green-200">
              <input type="checkbox" className="w-5 h-5 text-green-600" />
              <span className="text-gray-700"><strong>Learning Focus:</strong> Shows you want to understand, not just get answers</span>
            </label>

            <label className="flex items-center gap-3 p-3 bg-white rounded border border-green-200">
              <input type="checkbox" className="w-5 h-5 text-green-600" />
              <span className="text-gray-700"><strong>Verification:</strong> Asked for sources or ways to verify information</span>
            </label>
          </div>

          <p className="mt-4 text-sm text-green-700 font-semibold">
            If you checked all boxes, congratulations! You're using AI like a pro!
          </p>
        </div>
      </div>
    </TryItContent>
  )
}
