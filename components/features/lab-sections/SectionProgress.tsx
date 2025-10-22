/**
 * SectionProgress Component
 *
 * Displays progress bar and statistics for a lab's sections.
 * Shows completion percentage.
 */

import type { LabSection, SectionProgress as SectionProgressType } from '@/types/prompt-lab'

export interface SectionProgressProps {
  labNumber: number
  sections: LabSection[]
  sectionProgress: Record<string, SectionProgressType>
}

export function SectionProgress({
  labNumber,
  sections,
  sectionProgress,
}: SectionProgressProps) {
  // Calculate progress stats
  const totalSections = sections.length
  const completedSections = sections.filter(
    (s) => sectionProgress[s.id]?.status === 'completed'
  ).length

  const percentComplete =
    totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0

  const isLabComplete = completedSections === totalSections

  return (
    <div className="w-full rounded-lg border-2 border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-[#164055]">
          Lab {labNumber} Progress
        </h3>
        <span className="text-sm font-medium text-gray-600">
          {completedSections}/{totalSections} sections
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-3 h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-[#3b999c] transition-all duration-500 ease-out"
          style={{ width: `${percentComplete}%` }}
        />
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-[#3b999c]">
          {percentComplete}% complete
        </span>
        {isLabComplete && (
          <span className="font-medium text-green-600">✓ Lab Complete!</span>
        )}
      </div>
    </div>
  )
}
