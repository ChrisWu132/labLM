import { notFound } from 'next/navigation'
import { LabOverview } from './_components/LabOverview'

/**
 * Lab Page - Displays lab overview with sections
 *
 * All labs (1-6) use the micro-sections structure.
 * Each lab overview shows the sections list and progress.
 */
export default async function LabPage({
  params
}: {
  params: Promise<{ labId: string }>
}) {
  const { labId } = await params

  // Extract lab number from labId (e.g., 'lab1' -> 1)
  const labNumber = parseInt(labId.replace('lab', ''))

  // Validate lab number
  if (isNaN(labNumber) || labNumber < 1 || labNumber > 6) {
    notFound()
  }

  // All labs use the section-based structure
  return <LabOverview labNumber={labNumber} />
}

/**
 * Generate static params for all labs
 */
export async function generateStaticParams() {
  return [
    { labId: 'lab1' },
    { labId: 'lab2' },
    { labId: 'lab3' },
    { labId: 'lab4' },
    { labId: 'lab5' },
    { labId: 'lab6' }
  ]
}
