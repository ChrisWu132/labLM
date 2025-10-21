/**
 * LabOverview Component
 *
 * Displays the overview page for a lab with section list and progress.
 * This replaces the monolithic lab view for restructured labs.
 */

import Link from 'next/link'
import { SectionNav, SectionProgress } from '@/components/features/lab-sections'
import { getLabSections } from '@/lib/constants/lab-sections'
import { getLabProgress } from '@/lib/actions/section-progress'
import { LABS } from '@/lib/constants'

export interface LabOverviewProps {
  labNumber: number
}

export async function LabOverview({ labNumber }: LabOverviewProps) {
  // Get lab configuration
  const lab = LABS.find((l) => l.number === labNumber)
  if (!lab) {
    return (
      <div className="p-8 text-center">
        <p>Lab not found</p>
      </div>
    )
  }

  // Get sections configuration
  const sections = getLabSections(labNumber)

  // Get user's progress
  const sectionProgress = await getLabProgress(labNumber)

  // Find the current section (first in-progress or first not completed)
  let currentSectionId: string | undefined
  for (const section of sections) {
    const progress = sectionProgress[section.id]
    if (!progress || progress.status !== 'completed') {
      currentSectionId = section.id
      break
    }
  }

  return (
    <div className="bg-[#F8F9FE] px-4 py-8">
      <div className="mx-auto max-w-5xl">
        {/* Lab Header */}
        <div className="mb-8">
          <div className="mb-4">
            <Link
              href="/dashboard/vibecoding"
              className="text-sm text-[#3b999c] hover:underline"
            >
              ← Back to Labs
            </Link>
          </div>

          <div className="rounded-2xl border-2 border-[#3b999c] bg-white p-8 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full bg-[#f7aa37] px-3 py-1 text-sm font-semibold text-white">
                Lab {labNumber}
              </span>
              <span className="text-sm text-gray-600">{lab.duration}</span>
              <span className="text-sm text-gray-600">•</span>
              <span className="text-sm text-gray-600">{lab.difficulty}</span>
            </div>

            <h1
              className="mb-4 text-4xl font-bold md:text-5xl"
              style={{ color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif' }}
            >
              {lab.title}
            </h1>

            <p className="mb-6 text-lg text-gray-700">{lab.description}</p>

            {/* Key Concepts */}
            <div className="mb-6">
              <p className="mb-2 text-sm font-semibold text-gray-600">
                What You'll Learn:
              </p>
              <div className="flex flex-wrap gap-2">
                {lab.concepts.map((concept) => (
                  <span
                    key={concept}
                    className="rounded-lg bg-[rgba(59,153,156,0.1)] px-3 py-1 text-sm text-[#164055]"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>

            {/* Start Button */}
            {currentSectionId && (
              <Link
                href={`/dashboard/vibecoding/labs/lab${labNumber}/sections/${currentSectionId}`}
                className="
                  inline-flex items-center gap-2 rounded-lg bg-[#3b999c] px-6 py-3
                  font-semibold text-white shadow-md transition-all duration-200
                  hover:bg-[#2b898c] hover:shadow-lg
                "
              >
                {sectionProgress[currentSectionId]?.status === 'in_progress'
                  ? 'Continue Lab'
                  : 'Start Lab'}{' '}
                →
              </Link>
            )}
          </div>
        </div>

        {/* Progress Overview */}
        <div className="mb-8">
          <SectionProgress
            labNumber={labNumber}
            sections={sections}
            sectionProgress={sectionProgress}
          />
        </div>

        {/* Section Navigation */}
        <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-sm">
          <SectionNav
            labNumber={labNumber}
            sections={sections}
            sectionProgress={sectionProgress}
            currentSectionId={currentSectionId}
          />
        </div>
      </div>
    </div>
  )
}
