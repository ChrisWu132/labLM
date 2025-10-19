import { redirect } from 'next/navigation'
import { getSupabaseServer } from '@/lib/supabase-server'
import { getStudentProgress } from '@/lib/actions/admin'
import { StudentDetailClient } from './student-detail-client'

interface StudentDetailPageProps {
  params: Promise<{
    studentId: string
  }>
  searchParams: Promise<{ class?: string }>
}

export default async function StudentDetailPage({ params, searchParams }: StudentDetailPageProps) {
  const supabase = await getSupabaseServer()
  const { studentId } = await params
  const { class: classId } = await searchParams

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth')
  }

  if (!classId) {
    redirect('/dashboard/teacher')
  }

  // Get student progress
  const { data: studentProgress, error } = await getStudentProgress(classId, studentId)

  if (error || !studentProgress) {
    console.error('[StudentDetail] Error:', error)
    redirect('/dashboard/teacher')
  }

  return <StudentDetailClient studentProgress={studentProgress} classId={classId} />
}
