'use client'

import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

export interface LLMOutputProps {
  mode: 'static' | 'live'
  content?: string
  loading?: boolean
  error?: string | null
  success?: boolean | null
  feedback?: string
  showTokenCount?: boolean
}

export function LLMOutputDisplay({
  mode,
  content = '',
  loading = false,
  error = null,
  success = null,
  feedback,
  showTokenCount = false
}: LLMOutputProps) {
  return (
    <div className="llm-output my-4">
      {/* Main Output */}
      <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900 min-h-[120px]">
        {loading && (
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>AI is thinking...</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <AlertCircle className="w-5 h-5" />
            <span>❌ Error: {error}</span>
          </div>
        )}

        {content && !loading && !error && (
          <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
            {content}
          </div>
        )}

        {!content && !loading && !error && (
          <div className="text-gray-400 dark:text-gray-500 italic">
            AI output will appear here after running your prompt
          </div>
        )}
      </div>

      {/* Success Feedback */}
      {success !== null && (
        <div
          className={`mt-3 p-3 rounded-lg flex items-start gap-2 ${
            success
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
          }`}
        >
          {success ? (
            <>
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Excellent!</strong> Your prompt achieved the goal!
              </div>
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Try again:</strong> {feedback || 'Output doesn\'t meet requirements, try adjusting your prompt'}
              </div>
            </>
          )}
        </div>
      )}

      {/* Token Count (Optional) */}
      {showTokenCount && content && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          ~{Math.ceil(content.length / 4)} tokens
        </div>
      )}
    </div>
  )
}
