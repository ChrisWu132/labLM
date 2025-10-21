'use client'

/**
 * TryItContent Component
 *
 * Wrapper for the Try It tab content (interactive exercises).
 * Provides consistent styling and exercise management.
 */

import { ReactNode } from 'react'

export interface TryItContentProps {
  children: ReactNode
  instructions?: string
  successMessage?: string
  showSuccessMessage?: boolean
}

export function TryItContent({
  children,
  instructions,
  successMessage = 'Great job! You can now move to the next section.',
  showSuccessMessage = false,
}: TryItContentProps) {
  return (
    <div className="space-y-6">
      {/* Instructions */}
      {instructions && (
        <div className="rounded-lg border-2 border-[#f7aa37] bg-[rgba(247,170,55,0.05)] p-4">
          <p className="mb-2 text-sm font-semibold text-[#f7aa37]">
            📋 Instructions
          </p>
          <p className="text-sm text-gray-700">{instructions}</p>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="rounded-lg border-2 border-green-500 bg-green-50 p-4">
          <p className="mb-2 text-sm font-semibold text-green-700">
            ✓ Success!
          </p>
          <p className="text-sm text-green-700">{successMessage}</p>
        </div>
      )}

      {/* Exercise Content */}
      <div className="space-y-4">{children}</div>
    </div>
  )
}
