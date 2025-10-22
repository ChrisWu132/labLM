'use client'

/**
 * Lab 5, Section 5.2: Academic Integrity
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
        exerciseId: '5.2-ex1',
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
      instructions="Practice using AI as a learning tool by crafting prompts that help you understand, not just get answers. Focus on learning-centered questions that develop your understanding."
    >
      <div className="space-y-6">
        {/* Exercise Prompt */}
        <div className="rounded-lg border-2 border-[#3b999c] bg-white p-6">
          <h3 className="mb-4 text-xl font-bold text-[#164055]">
            Exercise 5.2: Transform Bad Prompts into Good Ones
          </h3>

          <p className="mb-4 text-gray-700">
            Imagine you're working on a science assignment about the water cycle. Instead of asking AI to do the work for you, craft a prompt that helps you LEARN.
          </p>

          <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded mb-4 text-sm">
            <p className="font-semibold mb-2">Your Assignment:</p>
            <p className="text-gray-700">
              You need to write a 2-paragraph explanation of the water cycle for your science class. You understand the basic idea but want to make sure you're including all the important steps and explaining them clearly.
            </p>
          </div>

          <div className="mb-4">
            <p className="font-semibold text-red-700 mb-2"> Bad Example (Plagiarism):</p>
            <div className="bg-red-50 border border-red-300 p-3 rounded text-sm">
              <code className="text-gray-700">"Write a 2-paragraph explanation of the water cycle for my science class."</code>
            </div>
            <p className="text-sm text-red-600 mt-1">This asks AI to do your work, not help you learn.</p>
          </div>

          <div className="mb-4">
            <p className="font-semibold text-green-700 mb-2"> Good Example (Learning):</p>
            <div className="bg-green-50 border border-green-300 p-3 rounded text-sm">
              <code className="text-gray-700">"I'm writing about the water cycle. Can you explain the main steps (evaporation, condensation, precipitation, collection) and why each is important? I want to understand it well enough to write my own explanation."</code>
            </div>
            <p className="text-sm text-green-600 mt-1">This asks for understanding so you can create your own work.</p>
          </div>

          <p className="mb-3 font-semibold text-[#164055]">
            Now you try! Write a GOOD prompt that helps you learn:
          </p>

          <PromptEditor
            exerciseId="5.2-ex1"
            mode="editable"
            initialValue={`I'm working on understanding the water cycle for a science assignment. I need to write my own explanation, but I want to make sure I understand all the key concepts first.

Can you:
1. Explain each stage of the water cycle (evaporation, condensation, precipitation, collection)
2. Help me understand why each stage is important
3. Give me an analogy or real-world example for each stage
4. Ask me a question to check if I understand

I want to learn this so I can write my own explanation in my own words.`}
            placeholder="Write your learning-focused prompt here..."
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

        {/* Next Steps */}
        {output && (
          <div className="rounded-lg border-2 border-blue-500 bg-blue-50 p-6">
            <h4 className="mb-3 text-lg font-semibold text-blue-700">
              Next Steps: Put Your Learning Into Practice
            </h4>

            <ol className="list-decimal space-y-3 pl-6 text-gray-700">
              <li>
                <strong>Read the AI's explanation carefully</strong> and make sure you understand each part
              </li>
              <li>
                <strong>Close this window</strong> and try to explain the water cycle in your own words
              </li>
              <li>
                <strong>Write your assignment</strong> using your own understanding, not copying AI's words
              </li>
              <li>
                <strong>Check your work</strong> - could you explain this to a friend without looking?
              </li>
            </ol>

            <div className="mt-4 p-4 bg-white rounded-lg border border-blue-300">
              <p className="font-semibold text-blue-800 mb-2"> You're learning when:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>You understand the concept better than before</li>
                <li>You can explain it in your own words</li>
                <li>You're creating your own work based on understanding</li>
                <li>You could teach this to someone else</li>
              </ul>
            </div>
          </div>
        )}

        {/* Create Your Principles */}
        <div className="rounded-lg border-2 border-purple-400 bg-purple-50 p-6">
          <h4 className="mb-3 text-lg font-semibold text-purple-700">
            Create Your Personal AI Usage Principles
          </h4>

          <p className="text-gray-700 mb-4">
            Write at least 3 personal principles for how you'll use AI responsibly for schoolwork:
          </p>

          <div className="bg-white border border-purple-300 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Example Principles:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              <li>I will always try to solve problems myself before asking AI for help</li>
              <li>I will use AI to understand concepts, not to avoid doing the work</li>
              <li>I will be honest with my teachers about when and how I use AI</li>
              <li>I will never submit AI-generated work as my own</li>
              <li>I will check AI's facts before trusting them completely</li>
            </ul>
          </div>

          <p className="text-sm text-purple-600 mt-4">
            Tip: Write these down somewhere you'll see them when you're tempted to use AI as a shortcut instead of a learning tool!
          </p>
        </div>
      </div>
    </TryItContent>
  )
}
