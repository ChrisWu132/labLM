import { redirect } from 'next/navigation'
import { getSupabaseServer } from '@/lib/supabase-server'
import { getMyClasses } from '@/lib/actions/admin'
import { TeacherDashboardClient } from './teacher-dashboard-client'

export default async function TeacherDashboardPage() {
  const supabase = await getSupabaseServer()

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

  return (
    <TeacherDashboardClient
      classes={classes || []}
      userEmail={user.email || ''}
    />
  )
}
