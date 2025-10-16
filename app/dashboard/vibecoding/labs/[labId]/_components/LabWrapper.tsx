'use client'

import { PromptEditor } from '@/components/features/prompt-lab/PromptEditor'
import { LLMOutputDisplay } from '@/components/features/prompt-lab/LLMOutputDisplay'
import type { PromptEditorProps, LLMOutputProps } from '@/types/prompt-lab'
import { runPrompt } from '@/lib/actions/prompt-lab'
import { useState } from 'react'

/**
 * Interactive Prompt Editor for MDX
 *
 * This wrapper handles the client-side state and interactions
 */
export function InteractivePromptEditor(props: PromptEditorProps) {
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean | null>(null)
  const [feedback, setFeedback] = useState('')

  const handleSubmit = async (prompt: string) => {
    setLoading(true)
    setSuccess(null)
    setError(null)

    // Extract lab number from exerciseId (e.g., 'lab1-ex1' -> 1)
    const labNumber = parseInt(props.exerciseId.match(/lab(\d+)/)?.[1] || '1')

    const result = await runPrompt({
      prompt,
      labNumber,
      exerciseId: props.exerciseId
    })

    if (result.success && result.output) {
      setOutput(result.output)
      setSuccess(result.passed || false)
      setFeedback(result.feedback || '')
      setError(null)
    } else {
      setError(result.error || 'Unknown error')
      setSuccess(null)
    }

    setLoading(false)
  }

  return (
    <>
      <PromptEditor {...props} onSubmit={handleSubmit} />
      <LLMOutputDisplay
        mode="live"
        content={output}
        loading={loading}
        error={error}
        success={success}
        feedback={feedback}
      />
    </>
  )
}

/**
 * Static Display for demos (readonly examples)
 */
export function StaticPromptDemo(
  props: PromptEditorProps & { demoOutput: string }
) {
  return (
    <>
      <PromptEditor {...props} mode="readonly" />
      <LLMOutputDisplay mode="static" content={props.demoOutput} />
    </>
  )
}
