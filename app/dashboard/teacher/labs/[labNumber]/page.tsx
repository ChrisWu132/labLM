import { redirect } from 'next/navigation'
import { getSupabaseServer } from '@/lib/supabase-server'
import { getClassProgressDetailed } from '@/lib/actions/admin'
import { LabStatisticsClient } from './lab-statistics-client'

interface LabStatisticsPageProps {
  params: Promise<{
    labNumber: string
  }>
  searchParams: Promise<{ class?: string }>
}

export default async function LabStatisticsPage({ params, searchParams }: LabStatisticsPageProps) {
  const supabase = await getSupabaseServer()
  const { labNumber } = await params
  const { class: classId } = await searchParams

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth')
  }

  if (!classId) {
    redirect('/dashboard/teacher')
  }

  const labNum = parseInt(labNumber)
  if (isNaN(labNum) || labNum < 1 || labNum > 6) {
    redirect('/dashboard/teacher')
  }

  // Get class progress to extract lab statistics
  const { data: classProgress, error } = await getClassProgressDetailed(classId)

  if (error || !classProgress) {
    console.error('[LabStatistics] Error:', error)
    redirect('/dashboard/teacher')
  }

  const labStats = classProgress.lab_statistics.find(l => l.lab_number === labNum)
  const studentsForLab = classProgress.students.map(s => ({
    ...s,
    labProgress: s.labs.find(l => l.lab_number === labNum)!
  }))

  if (!labStats) {
    redirect('/dashboard/teacher')
  }

  return (
    <LabStatisticsClient
      labStats={labStats}
      students={studentsForLab}
      classId={classId}
    />
  )
}
