'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export interface PromptEditorProps {
  exerciseId: string
  mode: 'readonly' | 'editable' | 'blank'
  initialValue?: string
  placeholder?: string
  maxLength?: number
  showCharCount?: boolean
  onSubmit?: (prompt: string) => Promise<void>
}

export function PromptEditor({
  exerciseId,
  mode,
  initialValue = '',
  placeholder = 'Enter your prompt here...',
  maxLength = 1000,
  showCharCount = true,
  onSubmit
}: PromptEditorProps) {
  const [prompt, setPrompt] = useState(initialValue)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUseExample = () => {
    // Prefer explicit initialValue; otherwise use placeholder text
    const sample = initialValue?.trim() ? initialValue : (placeholder || '')
    if (sample) setPrompt(sample)
  }

  const handleSubmit = async () => {
    if (!prompt.trim() || !onSubmit) return

    setIsSubmitting(true)
    try {
      await onSubmit(prompt)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="prompt-editor my-4 bg-white border-2 border-slate-300/50 rounded-2xl shadow-sm p-4 md:p-5 transition-all focus-within:border-[#3A7BFA] dark:bg-gray-800">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={mode === 'readonly' || isSubmitting}
        className="w-full min-h-[120px] p-3 bg-transparent border-0 rounded-md resize-none focus:outline-none placeholder:text-slate-400 disabled:bg-gray-100 dark:bg-gray-700 dark:text-white"
        rows={4}
      />

      <div className="mt-2 flex items-center justify-between">
        {showCharCount && (
          <div className="text-sm text-slate-500 dark:text-gray-400">
            {prompt.length} / {maxLength} characters
          </div>
        )}

        {mode !== 'readonly' && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleUseExample}
              disabled={isSubmitting}
              title="Fill with example prompt"
              className="px-4 py-2 rounded-2xl bg-cyan-50 text-cyan-700 border border-cyan-200 hover:bg-cyan-100 disabled:opacity-60 transition"
            >
              Use Example
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !prompt.trim()}
              className="px-5 py-2.5 rounded-2xl text-white disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 transition-transform duration-200 ease-out hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0.5"
              style={{backgroundColor: '#f7aa37'}}
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? 'Running...' : 'Run Prompt'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
