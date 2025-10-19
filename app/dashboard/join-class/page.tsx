import { redirect } from 'next/navigation'
import { getSupabaseServer } from '@/lib/supabase-server'
import { JoinClassClient } from './join-class-client'

export default async function JoinClassPage() {
  const supabase = await getSupabaseServer()

  // Check authentication
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth?redirect=/dashboard/join-class')
  }

  return <JoinClassClient userEmail={user.email || ''} />
}
