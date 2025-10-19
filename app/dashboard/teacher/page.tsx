import { redirect } from 'next/navigation'
import { getSupabaseServer } from '@/lib/supabase-server'
import { getMyClasses, getClassProgressDetailed } from '@/lib/actions/admin'
import { TeacherDashboardClient } from './teacher-dashboard-client'

interface TeacherDashboardPageProps {
  searchParams: Promise<{ class?: string }>
}

export default async function TeacherDashboardPage({ searchParams }: TeacherDashboardPageProps) {
  const supabase = await getSupabaseServer()
  const params = await searchParams

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth')
  }

  // Get teacher's classes
  const { data: classes, error } = await getMyClasses()

  if (error) {
    console.error('[TeacherDashboard] Error:', error)
  }

  const classList = classes || []

  // Get selected class (from query param or first class)
  const selectedClassId = params.class || classList[0]?.id || null

  // Get detailed progress for selected class
  let detailedProgress = null
  if (selectedClassId) {
    const { data } = await getClassProgressDetailed(selectedClassId)
    detailedProgress = data || null
  }

  return (
    <TeacherDashboardClient
      classes={classList}
      userEmail={user.email || ''}
      selectedClassId={selectedClassId}
      detailedProgress={detailedProgress}
    />
  )
}
