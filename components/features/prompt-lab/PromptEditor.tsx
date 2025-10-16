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
  placeholder = '在这里输入你的 prompt...',
  maxLength = 1000,
  showCharCount = true,
  onSubmit
}: PromptEditorProps) {
  const [prompt, setPrompt] = useState(initialValue)
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    <div className="prompt-editor my-4 p-4 border rounded-lg bg-white dark:bg-gray-800">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={mode === 'readonly' || isSubmitting}
        className="w-full min-h-[120px] p-3 border rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        rows={4}
      />

      <div className="mt-2 flex items-center justify-between">
        {showCharCount && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {prompt.length} / {maxLength} 字符
          </div>
        )}

        {mode !== 'readonly' && (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !prompt.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSubmitting ? '运行中...' : '运行 Prompt'}
          </button>
        )}
      </div>
    </div>
  )
}
