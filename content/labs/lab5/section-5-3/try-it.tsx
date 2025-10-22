'use client'

/**
 * Lab 5, Section 5.3: Privacy Protection
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
        exerciseId: '5.3-ex1',
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
      instructions="Evaluate privacy scenarios to identify what information is safe or unsafe to share with AI. Practice making smart privacy decisions."
    >
      <div className="space-y-6">
        {/* Exercise Prompt */}
        <div className="rounded-lg border-2 border-[#3b999c] bg-white p-6">
          <h3 className="mb-4 text-xl font-bold text-[#164055]">
            Exercise 5.3: Privacy Scenario Analysis
          </h3>

          <p className="mb-4 text-gray-700">
            Analyze these scenarios and determine which ones involve sharing unsafe information with AI. Identify what information should be removed or changed to protect privacy.
          </p>

          <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded mb-4 text-sm">
            <p className="font-semibold mb-2">Scenarios to Analyze:</p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <strong>Emma's Prompt:</strong> "My name is Emma Rodriguez and I live at 123 Oak Street in Seattle. I'm 12 years old. Can you help me with my homework?"
              </li>
              <li>
                <strong>Jake's Prompt:</strong> "I'm a middle school student working on a math project about geometry. Can you explain what triangles are?"
              </li>
              <li>
                <strong>Sofia's Prompt:</strong> "I go to Washington Middle School and my teacher is Mrs. Anderson. Her email is anderson@wms.edu and my school password is sophia2024. Can you help me log in?"
              </li>
              <li>
                <strong>Marcus's Prompt:</strong> "I'm interested in learning Python programming. I'm a beginner and want to understand how to create a simple calculator."
              </li>
              <li>
                <strong>Lily's Prompt:</strong> "I'll be home alone tomorrow from 3-6pm while my parents are at work. Can you suggest some safe activities I can do?"
              </li>
            </ol>
          </div>

          <PromptEditor
            exerciseId="5.3-ex1"
            mode="editable"
            initialValue={`Analyze these five privacy scenarios and identify privacy issues:

Scenario 1 - Emma: Shares full name, address, age while asking for homework help
Scenario 2 - Jake: Says he's a middle school student working on geometry, asks about triangles
Scenario 3 - Sofia: Shares school name, teacher name/email, and password
Scenario 4 - Marcus: Says he's a beginner wanting to learn Python programming
Scenario 5 - Lily: Shares that she'll be home alone with specific time window

For each scenario:
1. Is this SAFE or UNSAFE?
2. What specific information should NOT be shared?
3. How could they rewrite it to be privacy-safe?`}
            placeholder="Analyze the privacy scenarios..."
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

        {/* Answer Key */}
        {output && (
          <div className="rounded-lg border-2 border-purple-500 bg-purple-50 p-6">
            <h4 className="mb-3 text-lg font-semibold text-purple-700">
              Privacy Analysis Answer Key
            </h4>

            <div className="space-y-4">
              <div className="bg-white border border-red-300 rounded-lg p-4">
                <p className="font-semibold text-red-700 mb-2"> UNSAFE: Emma (Scenario 1)</p>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Problems:</strong> Full name, complete address, specific age
                </p>
                <p className="text-sm text-green-700">
                  <strong>Better version:</strong> "I'm a middle school student. Can you help me with my homework?"
                </p>
              </div>

              <div className="bg-white border border-green-300 rounded-lg p-4">
                <p className="font-semibold text-green-700 mb-2"> SAFE: Jake (Scenario 2)</p>
                <p className="text-sm text-gray-700">
                  <strong>Why it's safe:</strong> Only shares general grade level and subject, no personal identifying information
                </p>
              </div>

              <div className="bg-white border border-red-300 rounded-lg p-4">
                <p className="font-semibold text-red-700 mb-2"> UNSAFE: Sofia (Scenario 3)</p>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Problems:</strong> School name, teacher info, and PASSWORD (never share!)
                </p>
                <p className="text-sm text-green-700">
                  <strong>Better version:</strong> "I'm having trouble logging into my school account. Can you explain what I should do if I forget my password?"
                </p>
              </div>

              <div className="bg-white border border-green-300 rounded-lg p-4">
                <p className="font-semibold text-green-700 mb-2"> SAFE: Marcus (Scenario 4)</p>
                <p className="text-sm text-gray-700">
                  <strong>Why it's safe:</strong> Only shares skill level and learning goal, no personal information
                </p>
              </div>

              <div className="bg-white border border-red-300 rounded-lg p-4">
                <p className="font-semibold text-red-700 mb-2"> UNSAFE: Lily (Scenario 5)</p>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Problems:</strong> Specific location information and time when home alone (safety risk!)
                </p>
                <p className="text-sm text-green-700">
                  <strong>Better version:</strong> "Can you suggest some safe indoor activities for a teenager?"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Checklist */}
        <div className="rounded-lg border-2 border-yellow-400 bg-yellow-50 p-6">
          <h4 className="mb-3 text-lg font-semibold text-yellow-700">
            Privacy Protection Checklist
          </h4>

          <p className="text-gray-700 mb-3">
            Before sharing information with AI, ask yourself:
          </p>

          <div className="bg-white border border-yellow-300 rounded-lg p-4">
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">□</span>
                <span>Does this identify me personally? (name, address, school, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">□</span>
                <span>Am I sharing passwords or security information?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">□</span>
                <span>Does this reveal my location or schedule?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">□</span>
                <span>Would I be OK if this appeared on a public bulletin board?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-600 font-bold">□</span>
                <span>Am I sharing information about other people without their permission?</span>
              </li>
            </ul>

            <p className="mt-4 text-sm font-semibold text-yellow-800">
              If you answered YES to any of these, DON'T SHARE IT! Rewrite your prompt without that information.
            </p>
          </div>
        </div>

        {/* Privacy Tips */}
        <div className="rounded-lg border-2 border-blue-400 bg-blue-50 p-6">
          <h4 className="mb-3 text-lg font-semibold text-blue-700">
            Quick Privacy Tips
          </h4>

          <div className="space-y-2 text-gray-700">
            <p className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">1.</span>
              <span>Use general descriptions instead of specific names or places</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">2.</span>
              <span>Never share passwords, even in examples or tests</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">3.</span>
              <span>Keep location information vague ("a city with cold winters" not "Boston")</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">4.</span>
              <span>Remember: AI conversations might be stored or reviewed by humans</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">5.</span>
              <span>When in doubt, leave it out!</span>
            </p>
          </div>
        </div>
      </div>
    </TryItContent>
  )
}
