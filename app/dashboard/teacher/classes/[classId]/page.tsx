import { redirect } from 'next/navigation'
import { getSupabaseServer } from '@/lib/supabase-server'
import { getClassProgress } from '@/lib/actions/admin'
import { ClassDetailClient } from './class-detail-client'

interface ClassDetailPageProps {
  params: Promise<{
    classId: string
  }>
}

export default async function ClassDetailPage({ params }: ClassDetailPageProps) {
  const { classId } = await params
  const supabase = await getSupabaseServer()

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth')
  }

  // Get class progress data
  const { data, error } = await getClassProgress(classId)

  if (error) {
    console.error('[ClassDetailPage] Error:', error)
    redirect('/dashboard/teacher')
  }

  if (!data) {
    redirect('/dashboard/teacher')
  }

  return <ClassDetailClient classData={data} />
}
