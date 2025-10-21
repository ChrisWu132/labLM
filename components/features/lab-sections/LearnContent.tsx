/**
 * LearnContent Component
 *
 * Wrapper for the Learn tab content (theory, explanations, examples).
 * Provides consistent styling for educational content.
 */

import { ReactNode } from 'react'

export interface LearnContentProps {
  children: ReactNode
  previousSummary?: string // Optional recap of previous section
}

export function LearnContent({
  children,
  previousSummary,
}: LearnContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      {/* Optional "Previously..." recap */}
      {previousSummary && (
        <div className="mb-8 rounded-lg border-l-4 border-[#3b999c] bg-[rgba(59,153,156,0.05)] p-4">
          <p className="mb-2 text-sm font-semibold text-[#3b999c]">
            Previously...
          </p>
          <p className="text-sm text-gray-700">{previousSummary}</p>
        </div>
      )}

      {/* Main content */}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}
