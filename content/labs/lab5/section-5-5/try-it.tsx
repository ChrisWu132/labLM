'use client'

/**
 * Lab 5, Section 5.5: Multi-Step Workflow
 * Try It Tab Content
 */

import { useState } from 'react'
import { TryItContent } from '@/components/features/lab-sections'
import { PromptEditor } from '@/components/features/prompt-lab/PromptEditor'
import { LLMOutputDisplay } from '@/components/features/prompt-lab/LLMOutputDisplay'
import { runPrompt } from '@/lib/actions/prompt-lab'

export default function TryIt() {
  const [step, setStep] = useState(1)
  const [outputs, setOutputs] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (prompt: string, currentStep: number) => {
    setLoading(true)
    setError(null)

    try {
      const result = await runPrompt({
        prompt,
        labNumber: 5,
        exerciseId: `5.5-step${currentStep}`,
      })

      if (result.success && result.output) {
        setOutputs({ ...outputs, [currentStep]: result.output })
      } else {
        setError(result.error || 'Failed to run prompt')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const moveToNextStep = () => {
    if (step < 4 && outputs[step]) {
      setStep(step + 1)
      setError(null)
    }
  }

  const moveToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1)
      setError(null)
    }
  }

  return (
    <TryItContent
      instructions="Practice multi-step problem solving by working through a 4-step workflow. Each step builds on the previous one, teaching you how to break down complex problems."
    >
      <div className="space-y-6">
        {/* Progress Indicator */}
        <div className="rounded-lg border-2 border-[#3b999c] bg-white p-6">
          <h3 className="mb-4 text-xl font-bold text-[#164055]">
            Multi-Step Workflow: Study Plan Creator
          </h3>

          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    s < step
                      ? 'bg-green-500 text-white'
                      : s === step
                      ? 'bg-[#3b999c] text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s < step ? '' : s}
                </div>
                {s < 4 && (
                  <div
                    className={`w-24 h-1 mx-2 ${
                      s < step ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-4 text-center text-sm">
            <div className={step === 1 ? 'font-bold text-[#3b999c]' : 'text-gray-500'}>
              Identify Goals
            </div>
            <div className={step === 2 ? 'font-bold text-[#3b999c]' : 'text-gray-500'}>
              Break Down Topics
            </div>
            <div className={step === 3 ? 'font-bold text-[#3b999c]' : 'text-gray-500'}>
              Create Schedule
            </div>
            <div className={step === 4 ? 'font-bold text-[#3b999c]' : 'text-gray-500'}>
              Add Study Methods
            </div>
          </div>
        </div>

        {/* Step 1: Identify Goals */}
        {step === 1 && (
          <div className="rounded-lg border-2 border-blue-400 bg-blue-50 p-6">
            <h4 className="mb-3 text-lg font-semibold text-blue-700">
              Step 1: Identify Your Study Goals
            </h4>

            <p className="text-gray-700 mb-4">
              First, let's identify what you need to study and your main goals. Be specific about the subject, topics, and timeline.
            </p>

            <div className="bg-white border border-blue-300 rounded p-4 mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Example Scenario:</p>
              <p className="text-sm text-gray-600">
                "I have a biology test in 5 days covering cell structure, photosynthesis, and cellular respiration. I understand the basics but struggle with the details and connecting concepts."
              </p>
            </div>

            <PromptEditor
              exerciseId="5.5-step1"
              mode="editable"
              initialValue={`You are a study planning expert who helps students organize their learning effectively.

I need to create a study plan. Here's my situation:
- Subject: [Your subject]
- Topics to cover: [List 2-3 topics]
- Time until test/project: [Number of days]
- Current understanding: [What you know vs. what's difficult]
- Any special considerations: [Learning style, available study time, etc.]

Please help me:
1. Summarize my main study goals
2. Identify which topics need the most attention
3. Suggest a realistic time allocation for each topic

Keep your response concise (under 200 words).`}
              placeholder="Describe your study situation..."
              onSubmit={(prompt) => handleSubmit(prompt, 1)}
            />

            {loading && <div className="mt-4"><LLMOutputDisplay mode="live" loading={true} /></div>}

            {outputs[1] && (
              <div className="mt-4">
                <div className="bg-white border border-blue-300 rounded p-4">
                  <p className="text-sm font-semibold text-blue-800 mb-2">AI Response:</p>
                  <LLMOutputDisplay mode="live" content={outputs[1]} />
                </div>
                <button
                  onClick={moveToNextStep}
                  className="mt-4 px-6 py-3 bg-[#3b999c] hover:bg-[#2d7a7d] text-white rounded-lg font-semibold"
                >
                  Continue to Step 2 →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Break Down Topics */}
        {step === 2 && (
          <div className="rounded-lg border-2 border-purple-400 bg-purple-50 p-6">
            <h4 className="mb-3 text-lg font-semibold text-purple-700">
              Step 2: Break Down Each Topic
            </h4>

            <p className="text-gray-700 mb-4">
              Now that you know your goals, let's break down one of your topics into specific learning objectives. This helps you study more effectively.
            </p>

            <div className="bg-white border border-purple-300 rounded p-4 mb-4">
              <p className="text-sm font-semibold text-purple-800 mb-2">Reference from Step 1:</p>
              <div className="text-sm text-gray-600 max-h-32 overflow-y-auto">
                {outputs[1]}
              </div>
            </div>

            <PromptEditor
              exerciseId="5.5-step2"
              mode="editable"
              initialValue={`Based on my study goals from before, I want to focus on [choose one topic from Step 1].

For this topic, please:
1. Break it down into 4-5 specific sub-topics or concepts I need to understand
2. Order them from foundational to advanced
3. Estimate how much time I should spend on each sub-topic
4. Identify which concepts are most commonly tested

Keep it organized and easy to follow.`}
              placeholder="Choose a topic to break down..."
              onSubmit={(prompt) => handleSubmit(prompt, 2)}
            />

            {loading && <div className="mt-4"><LLMOutputDisplay mode="live" loading={true} /></div>}

            {outputs[2] && (
              <div className="mt-4">
                <div className="bg-white border border-purple-300 rounded p-4">
                  <p className="text-sm font-semibold text-purple-800 mb-2">AI Response:</p>
                  <LLMOutputDisplay mode="live" content={outputs[2]} />
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={moveToPreviousStep}
                    className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold"
                  >
                    ← Back to Step 1
                  </button>
                  <button
                    onClick={moveToNextStep}
                    className="px-6 py-3 bg-[#3b999c] hover:bg-[#2d7a7d] text-white rounded-lg font-semibold"
                  >
                    Continue to Step 3 →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Create Schedule */}
        {step === 3 && (
          <div className="rounded-lg border-2 border-orange-400 bg-orange-50 p-6">
            <h4 className="mb-3 text-lg font-semibold text-orange-700">
              Step 3: Create Your Study Schedule
            </h4>

            <p className="text-gray-700 mb-4">
              Now let's turn your breakdown into a day-by-day schedule. This helps you stay on track and not feel overwhelmed.
            </p>

            <div className="bg-white border border-orange-300 rounded p-4 mb-4">
              <p className="text-sm font-semibold text-orange-800 mb-2">Progress So Far:</p>
              <div className="text-sm text-gray-600 space-y-2">
                <div>
                  <p className="font-semibold">Step 1 - Goals:</p>
                  <div className="max-h-24 overflow-y-auto text-xs">{outputs[1]}</div>
                </div>
                <div>
                  <p className="font-semibold">Step 2 - Breakdown:</p>
                  <div className="max-h-24 overflow-y-auto text-xs">{outputs[2]}</div>
                </div>
              </div>
            </div>

            <PromptEditor
              exerciseId="5.5-step3"
              mode="editable"
              initialValue={`Based on my study goals and topic breakdown, create a detailed day-by-day study schedule.

I have [X days] to study, and I can dedicate [X hours per day].

For each day, please specify:
1. Which sub-topics to focus on
2. Specific learning activities (read, practice, review, etc.)
3. Approximate time for each activity
4. One checkpoint question to test understanding

Make the schedule realistic and include breaks/buffer time.`}
              placeholder="Request your study schedule..."
              onSubmit={(prompt) => handleSubmit(prompt, 3)}
            />

            {loading && <div className="mt-4"><LLMOutputDisplay mode="live" loading={true} /></div>}

            {outputs[3] && (
              <div className="mt-4">
                <div className="bg-white border border-orange-300 rounded p-4">
                  <p className="text-sm font-semibold text-orange-800 mb-2">AI Response:</p>
                  <LLMOutputDisplay mode="live" content={outputs[3]} />
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={moveToPreviousStep}
                    className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold"
                  >
                    ← Back to Step 2
                  </button>
                  <button
                    onClick={moveToNextStep}
                    className="px-6 py-3 bg-[#3b999c] hover:bg-[#2d7a7d] text-white rounded-lg font-semibold"
                  >
                    Continue to Step 4 →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Add Study Methods */}
        {step === 4 && (
          <div className="rounded-lg border-2 border-green-400 bg-green-50 p-6">
            <h4 className="mb-3 text-lg font-semibold text-green-700">
              Step 4: Personalize with Study Methods
            </h4>

            <p className="text-gray-700 mb-4">
              Finally, let's enhance your plan with specific study techniques that match your learning style and the type of material you're studying.
            </p>

            <div className="bg-white border border-green-300 rounded p-4 mb-4">
              <p className="text-sm font-semibold text-green-800 mb-2">Your Complete Plan So Far:</p>
              <div className="text-sm text-gray-600 space-y-2 max-h-48 overflow-y-auto">
                <div>
                  <p className="font-semibold">Goals & Schedule:</p>
                  <p className="text-xs">{outputs[1]}</p>
                </div>
              </div>
            </div>

            <PromptEditor
              exerciseId="5.5-step4"
              mode="editable"
              initialValue={`Based on my study plan for [your subject], suggest specific study methods and techniques.

Consider:
- My learning style: [visual, auditory, kinesthetic, or mixed]
- Type of material: [memorization, conceptual understanding, problem-solving, etc.]

Please provide:
1. 3-4 specific study techniques for this subject (e.g., flashcards, mind maps, practice problems)
2. How to use each technique effectively
3. Which technique to use for which type of content
4. One active recall method to test myself

Keep it practical and actionable!`}
              placeholder="Request study methods..."
              onSubmit={(prompt) => handleSubmit(prompt, 4)}
            />

            {loading && <div className="mt-4"><LLMOutputDisplay mode="live" loading={true} /></div>}

            {outputs[4] && (
              <div className="mt-4">
                <div className="bg-white border border-green-300 rounded p-4">
                  <p className="text-sm font-semibold text-green-800 mb-2">AI Response:</p>
                  <LLMOutputDisplay mode="live" content={outputs[4]} />
                </div>
                <div className="mt-4">
                  <button
                    onClick={moveToPreviousStep}
                    className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold mr-3"
                  >
                    ← Back to Step 3
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Completion Message */}
        {step === 4 && outputs[4] && (
          <div className="rounded-lg border-2 border-green-500 bg-green-50 p-6">
            <h4 className="mb-3 text-lg font-semibold text-green-700">
              Workflow Complete!
            </h4>

            <p className="text-gray-700 mb-4">
              Congratulations! You just completed a 4-step workflow. You now have:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Clear study goals and priorities</li>
              <li>Detailed topic breakdown</li>
              <li>Day-by-day schedule</li>
              <li>Personalized study methods</li>
            </ul>

            <div className="bg-white border border-green-300 rounded p-4">
              <p className="font-semibold text-green-800 mb-2">What You Learned:</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Breaking complex problems into manageable steps</li>
                <li>• Building on previous outputs for better results</li>
                <li>• Maintaining context across multiple prompts</li>
                <li>• Creating comprehensive solutions through iteration</li>
              </ul>
            </div>

            <p className="text-sm text-green-600 mt-4 font-semibold">
              This manual chaining gave you control at each step. In Lab 6, you'll learn how to automate workflows like this!
            </p>
          </div>
        )}

        {/* Workflow Benefits */}
        <div className="rounded-lg border-2 border-blue-400 bg-blue-50 p-6">
          <h4 className="mb-3 text-lg font-semibold text-blue-700">
            Why Multi-Step Workflows Work Better
          </h4>

          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">1.</span>
              <div>
                <p className="font-semibold">More Control</p>
                <p className="text-sm">Review and adjust after each step instead of getting one large output</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">2.</span>
              <div>
                <p className="font-semibold">Better Quality</p>
                <p className="text-sm">Each step focuses on one thing, leading to more detailed and accurate results</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">3.</span>
              <div>
                <p className="font-semibold">More Learning</p>
                <p className="text-sm">You think critically at each stage instead of passively accepting output</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">4.</span>
              <div>
                <p className="font-semibold">Easier Debugging</p>
                <p className="text-sm">If something goes wrong, you know exactly which step to fix</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TryItContent>
  )
}
