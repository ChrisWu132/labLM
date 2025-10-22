'use client'

/**
 * Lab 6, Section 6.1: Why Workflows?
 * Try It Tab Content
 */

import { useState } from 'react'
import { TryItContent } from '@/components/features/lab-sections'
import { PromptEditor } from '@/components/features/prompt-lab/PromptEditor'
import { LLMOutputDisplay } from '@/components/features/prompt-lab/LLMOutputDisplay'
import { runPrompt } from '@/lib/actions/prompt-lab'

export default function TryIt() {
  const [step1Output, setStep1Output] = useState<string>('')
  const [step2Output, setStep2Output] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)

  const handleStep1Submit = async (prompt: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await runPrompt({
        prompt,
        labNumber: 6,
        exerciseId: '6.1-step1',
      })

      if (result.success && result.output) {
        setStep1Output(result.output)
        setCurrentStep(2)
      } else {
        setError(result.error || 'Failed to run prompt')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleStep2Submit = async (prompt: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await runPrompt({
        prompt,
        labNumber: 6,
        exerciseId: '6.1-step2',
      })

      if (result.success && result.output) {
        setStep2Output(result.output)
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
      instructions="Experience the manual copy-paste process by completing both steps. Then imagine doing this 10 times for a complex task!"
      showSuccessMessage={!!step2Output}
      successMessage="You've experienced the tedious manual process! In the next sections, you'll learn how workflows automate this entire flow."
    >
      <div className="space-y-6">
        {/* Step 1 */}
        <div className="rounded-lg border-2 border-[#3b999c] bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#3b999c] text-white flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-xl font-bold text-[#164055]">
              Step 1: Generate Ideas
            </h3>
          </div>

          <p className="mb-4 text-gray-700">
            Ask the AI: <strong>"Give me 3 ideas for a science project about plants"</strong>
          </p>

          <PromptEditor
            exerciseId="6.1-step1"
            mode="editable"
            initialValue="Give me 3 ideas for a science project about plants"
            placeholder="Give me 3 ideas for a science project about plants"
            onSubmit={handleStep1Submit}
            disabled={currentStep !== 1}
          />

          {step1Output && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold text-[#3b999c] mb-2">
                AI Response:
              </h4>
              <LLMOutputDisplay
                mode="static"
                content={step1Output}
                loading={false}
              />
            </div>
          )}
        </div>

        {/* Manual Copy-Paste Instruction */}
        {step1Output && !step2Output && (
          <div className="rounded-lg border-2 border-yellow-400 bg-yellow-50 p-6">
            <h4 className="text-lg font-semibold text-yellow-700 mb-3">
              Now comes the tedious part...
            </h4>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>Read the first idea from above</li>
              <li>Manually type or copy it into Step 2 below</li>
              <li>Submit Step 2</li>
            </ol>
            <p className="mt-3 text-sm text-yellow-600">
              Imagine doing this 10 times for a complex workflow!
            </p>
          </div>
        )}

        {/* Step 2 */}
        {step1Output && (
          <div className="rounded-lg border-2 border-[#f7aa37] bg-white p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#f7aa37] text-white flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-[#164055]">
                Step 2: Expand the First Idea
              </h3>
            </div>

            <p className="mb-4 text-gray-700">
              Now paste the first idea here and ask: <strong>"Explain this science project idea in detail: [paste your first idea here]"</strong>
            </p>

            <PromptEditor
              exerciseId="6.1-step2"
              mode="editable"
              initialValue="Explain this science project idea in detail: "
              placeholder="Explain this science project idea in detail: [paste first idea here]"
              onSubmit={handleStep2Submit}
            />

            {loading && currentStep === 2 && (
              <div className="mt-4">
                <LLMOutputDisplay
                  mode="static"
                  content=""
                  loading={true}
                />
              </div>
            )}

            {step2Output && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-semibold text-[#f7aa37] mb-2">
                  AI Response:
                </h4>
                <LLMOutputDisplay
                  mode="static"
                  content={step2Output}
                  loading={false}
                />
              </div>
            )}
          </div>
        )}

        {/* Success Message */}
        {step2Output && (
          <div className="rounded-lg border-2 border-green-500 bg-green-50 p-6">
            <h4 className="text-lg font-semibold text-green-700 mb-3">
              You've Completed the Manual Process!
            </h4>
            <p className="text-gray-700 mb-3">
              You just experienced what it's like to manually chain two AI prompts together. Notice how you had to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
              <li>Wait for Step 1 to finish</li>
              <li>Read and copy the output</li>
              <li>Paste it into Step 2</li>
              <li>Submit Step 2 manually</li>
            </ul>
            <p className="font-semibold text-green-700">
              With workflows, all of this happens automatically! Let's learn how in the next sections.
            </p>
          </div>
        )}
      </div>
    </TryItContent>
  )
}
