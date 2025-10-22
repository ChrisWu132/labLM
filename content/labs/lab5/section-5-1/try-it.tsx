'use client'

/**
 * Lab 5, Section 5.1: AI Ethics
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
        exerciseId: '5.1-ex1',
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
      instructions="Analyze real-world scenarios to determine if they represent ethical AI use. Think critically about the motivation, honesty, and learning outcomes of each situation."
    >
      <div className="space-y-6">
        {/* Exercise Prompt */}
        <div className="rounded-lg border-2 border-[#3b999c] bg-white p-6">
          <h3 className="mb-4 text-xl font-bold text-[#164055]">
            Exercise 5.1: Ethics Scenario Analysis
          </h3>

          <p className="mb-4 text-gray-700">
            Analyze these scenarios and determine which ones show ethical AI use. Explain your reasoning for each one.
          </p>

          <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded mb-4 text-sm">
            <p className="font-semibold mb-2">Scenarios to Analyze:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Sarah:</strong> She's stuck on a math problem. She asks AI to explain the concept, then solves the problem herself using what she learned.</li>
              <li><strong>Tom:</strong> He asks AI to write his entire history essay, then copies it word-for-word and submits it as his own work.</li>
              <li><strong>Maya:</strong> She uses AI to brainstorm ideas for her science fair project, then researches and develops her favorite idea on her own.</li>
              <li><strong>Alex:</strong> He's taking a test and secretly uses AI on his phone to answer questions without his teacher knowing.</li>
              <li><strong>Jordan:</strong> She asks AI to check her completed homework for errors and explain any mistakes so she can fix them and understand what went wrong.</li>
            </ol>
          </div>

          <PromptEditor
            exerciseId="5.1-ex1"
            mode="editable"
            initialValue={`Analyze these five scenarios and determine which show ethical AI use:

Scenario 1 - Sarah: Stuck on math, asks AI to explain concept, then solves problem herself
Scenario 2 - Tom: Asks AI to write his entire essay, copies it word-for-word
Scenario 3 - Maya: Uses AI to brainstorm project ideas, then researches/develops her favorite
Scenario 4 - Alex: Uses AI secretly during a test to answer questions
Scenario 5 - Jordan: Asks AI to check homework and explain mistakes so she can fix them

For each scenario, explain:
1. Is this ethical AI use? (Yes/No)
2. Why or why not?
3. Is the student learning or avoiding learning?`}
            placeholder="Analyze the scenarios..."
            onSubmit={handleSubmit}
          />
        </div>

        {/* Output Display */}
        {(loading || output || error) && (
          <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
            <h4 className="mb-4 text-lg font-semibold text-[#164055]">
              AI Analysis:
            </h4>

            <LLMOutputDisplay
              mode="live"
              content={output}
              loading={loading}
              error={error}
            />
          </div>
        )}

        {/* Learning Guidance */}
        {output && (
          <div className="rounded-lg border-2 border-green-500 bg-green-50 p-6">
            <h4 className="mb-3 text-lg font-semibold text-green-700">
              💡 Key Ethical Questions to Ask
            </h4>

            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li><strong>Learning Test:</strong> Is the student learning from this, or just getting an answer?</li>
              <li><strong>Honesty Test:</strong> Is the student being honest about their AI use?</li>
              <li><strong>Teacher Test:</strong> Would a teacher approve of this AI use?</li>
              <li><strong>Understanding Test:</strong> Could the student explain this to someone else afterward?</li>
              <li><strong>Integrity Test:</strong> Is the student claiming AI's work as their own?</li>
            </ul>

            <div className="mt-4 p-4 bg-white rounded-lg border border-green-300">
              <p className="font-semibold text-green-800 mb-2">✅ Ethical Scenarios: Sarah, Maya, Jordan</p>
              <p className="text-sm text-gray-700 mb-3">
                These students use AI to understand concepts, brainstorm ideas, or check their work—all while doing the learning themselves.
              </p>

              <p className="font-semibold text-red-800 mb-2">❌ Unethical Scenarios: Tom, Alex</p>
              <p className="text-sm text-gray-700">
                These students use AI to avoid work entirely or to cheat on assessments, learning nothing in the process.
              </p>
            </div>
          </div>
        )}

        {/* Reflection Exercise */}
        <div className="rounded-lg border-2 border-purple-400 bg-purple-50 p-6">
          <h4 className="mb-3 text-lg font-semibold text-purple-700">
            🤔 Personal Reflection
          </h4>

          <p className="text-gray-700 mb-4">
            Think about your own AI use. Have you ever used AI in a way that you now realize wasn't ethical? What would you do differently next time?
          </p>

          <p className="text-sm text-purple-600">
            Remember: Everyone makes mistakes. What matters is recognizing them and choosing to do better going forward.
          </p>
        </div>
      </div>
    </TryItContent>
  )
}
