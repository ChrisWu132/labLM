/**
 * Section Page
 *
 * Renders a single lab section with Learn/Try It tabs.
 * This is the new micro-section view for restructured labs.
 */

import { notFound, redirect } from 'next/navigation'
import { getSection, getNextSection } from '@/lib/constants/lab-sections'
import { SectionLayout } from '@/components/features/lab-sections'
import { getSectionProgress, markSectionComplete } from '@/lib/actions/section-progress'

// Import section content dynamically based on section ID
async function getSectionContent(sectionId: string) {
  try {
    // Dynamically import the Learn and Try It content for this section
    const [labNum, sectionNum] = sectionId.split('.')
    const labNumber = parseInt(labNum, 10)

    // Convert section ID "1.1" to folder name "1-1"
    const sectionFolder = sectionId.replace('.', '-')

    // Import Learn content (MDX)
    const { default: LearnComponent } = await import(
      `@/content/labs/lab${labNumber}/section-${sectionFolder}/learn`
    )

    // Import Try It content (React component)
    let TryItComponent = null
    try {
      const tryItModule = await import(
        `@/content/labs/lab${labNumber}/section-${sectionFolder}/try-it`
      )
      TryItComponent = tryItModule.default
    } catch (e) {
      // Try It tab is optional
    }

    // Import Quiz content (for final sections)
    let QuizComponent = null
    try {
      const quizModule = await import(
        `@/content/labs/lab${labNumber}/section-${sectionFolder}/quiz`
      )
      QuizComponent = quizModule.default
    } catch (e) {
      // Quiz tab is optional
    }

    return {
      LearnComponent,
      TryItComponent,
      QuizComponent,
    }
  } catch (error) {
    console.error(`Failed to load section content for ${sectionId}:`, error)
    return null
  }
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ labId: string; sectionId: string }>
}) {
  const { labId, sectionId } = await params

  // Get section configuration
  const section = getSection(sectionId)
  if (!section) {
    notFound()
  }

  // Verify lab ID matches section
  const labNumber = parseInt(labId.replace('lab', ''), 10)
  if (section.labNumber !== labNumber) {
    notFound()
  }

  // Get user's progress for this section
  const progress = await getSectionProgress(sectionId)

  // Check if section is locked
  if (progress?.status === 'locked') {
    // Redirect to lab overview
    redirect(`/dashboard/vibecoding/labs/${labId}`)
  }

  // Load section content
  const content = await getSectionContent(sectionId)
  if (!content) {
    notFound()
  }

  const { LearnComponent, TryItComponent, QuizComponent } = content

  // Handle marking section complete
  async function handleMarkComplete() {
    'use server'

    await markSectionComplete(sectionId)

    // Get next section
    const nextSection = getNextSection(sectionId)

    if (nextSection) {
      // Redirect to next section
      redirect(
        `/dashboard/vibecoding/labs/lab${nextSection.labNumber}/sections/${nextSection.id}`
      )
    } else {
      // No more sections, redirect to lab overview
      redirect(`/dashboard/vibecoding/labs/${labId}`)
    }
  }

  return (
    <div className="bg-[#F8F9FE]">
      <SectionLayout
        section={section}
        learnContent={<LearnComponent />}
        tryItContent={TryItComponent ? <TryItComponent /> : undefined}
        quizContent={QuizComponent ? <QuizComponent /> : undefined}
        onMarkComplete={handleMarkComplete}
        isCompleted={progress?.status === 'completed'}
      />
    </div>
  )
}

/**
 * Generate static params for all sections
 */
export async function generateStaticParams() {
  const params: { labId: string; sectionId: string }[] = []

  // Generate params for all labs and sections
  for (let labNum = 1; labNum <= 6; labNum++) {
    const { getLabSections } = await import('@/lib/constants/lab-sections')
    const sections = getLabSections(labNum)

    for (const section of sections) {
      params.push({
        labId: `lab${labNum}`,
        sectionId: section.id,
      })
    }
  }

  return params
}
