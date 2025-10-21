'use client'

/**
 * SectionNav Component
 *
 * Displays navigation for all sections in a lab with progress indicators.
 * Shows section status (locked, in progress, completed) and estimated time.
 */

import Link from 'next/link'
import { CheckCircle, Lock, Circle } from 'lucide-react'
import type { LabSection, SectionProgress } from '@/types/prompt-lab'

export interface SectionNavProps {
  labNumber: number
  sections: LabSection[]
  sectionProgress: Record<string, SectionProgress> // Keyed by section_id
  currentSectionId?: string
}

export function SectionNav({
  labNumber,
  sections,
  sectionProgress,
  currentSectionId,
}: SectionNavProps) {
  const getStatusIcon = (sectionId: string) => {
    const progress = sectionProgress[sectionId]

    if (!progress || progress.status === 'locked') {
      return <Lock className="h-5 w-5 text-gray-400" />
    }

    if (progress.status === 'completed') {
      return <CheckCircle className="h-5 w-5 text-green-600" />
    }

    if (progress.status === 'in_progress') {
      return <Circle className="h-5 w-5 text-[#3b999c]" />
    }

    return <Circle className="h-5 w-5 text-gray-300" />
  }

  const getStatusText = (sectionId: string) => {
    const progress = sectionProgress[sectionId]

    if (!progress || progress.status === 'locked') {
      return { text: 'Locked', color: 'text-gray-500' }
    }

    if (progress.status === 'completed') {
      return { text: 'Completed', color: 'text-green-600' }
    }

    if (progress.status === 'in_progress') {
      return { text: 'In Progress', color: 'text-[#3b999c]' }
    }

    return { text: 'Not Started', color: 'text-gray-500' }
  }

  const isSectionAccessible = (sectionId: string) => {
    const progress = sectionProgress[sectionId]
    return progress && progress.status !== 'locked'
  }

  return (
    <div className="w-full">
      <h2 className="mb-4 text-xl font-semibold text-[#164055]">
        Lab {labNumber} Sections
      </h2>

      <div className="space-y-3">
        {sections.map((section) => {
          const { text: statusText, color: statusColor } = getStatusText(
            section.id
          )
          const isAccessible = isSectionAccessible(section.id)
          const isCurrent = currentSectionId === section.id

          const sectionCard = (
            <div
              className={`
                flex items-center justify-between rounded-lg border-2 p-4
                transition-all duration-200
                ${
                  isCurrent
                    ? 'border-[#3b999c] bg-[rgba(59,153,156,0.05)]'
                    : 'border-gray-200 bg-white'
                }
                ${
                  isAccessible && !isCurrent
                    ? 'hover:border-[#3b999c] hover:shadow-md'
                    : ''
                }
                ${!isAccessible ? 'opacity-60' : ''}
              `}
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(section.id)}
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Section {section.id}
                  </p>
                  <h3 className="font-semibold text-[#164055]">
                    {section.title}
                  </h3>
                  <p className={`text-xs ${statusColor}`}>{statusText}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {section.estimatedMinutes} min
                </p>
                {isCurrent && (
                  <p className="text-xs font-medium text-[#3b999c]">
                    ← You are here
                  </p>
                )}
              </div>
            </div>
          )

          // Only wrap with Link if the section is accessible
          if (isAccessible) {
            return (
              <Link
                key={section.id}
                href={`/dashboard/vibecoding/labs/lab${labNumber}/sections/${section.id}`}
              >
                {sectionCard}
              </Link>
            )
          }

          // Otherwise, render without link
          return <div key={section.id}>{sectionCard}</div>
        })}
      </div>
    </div>
  )
}
