'use server'

/**
 * Section Progress Server Actions
 *
 * Handles all database operations for section-level progress tracking.
 * Used by the micro-sections feature to track user progress through labs.
 */

import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { SectionProgress } from '@/types/prompt-lab'
import { getLabSections, getSection } from '@/lib/constants/lab-sections'
import { revalidatePath } from 'next/cache'

/**
 * Get progress for a specific section (OPTIMIZED)
 */
export async function getSectionProgress(
  sectionId: string
): Promise<SectionProgress | null> {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  // Get the section info
  const section = getSection(sectionId)
  if (!section) return null

  // Get ALL progress for this lab in one query
  const labProgress = await getLabProgress(section.labNumber)

  // Return the specific section's progress
  return labProgress[sectionId] || null
}

/**
 * Get progress for all sections in a lab (OPTIMIZED)
 */
export async function getLabProgress(
  labNumber: number
): Promise<Record<string, SectionProgress>> {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {}
  }

  const sections = getLabSections(labNumber)
  const sectionIds = sections.map((s) => s.id)

  // Single database query for all sections
  const { data, error } = await supabase
    .from('section_progress')
    .select('*')
    .eq('user_id', user.id)
    .in('section_id', sectionIds)

  if (error) {
    console.error('Error fetching lab progress:', error)
    return {}
  }

  // Convert array to keyed object
  const progressMap: Record<string, SectionProgress> = {}

  for (const progress of data || []) {
    progressMap[progress.section_id] = progress as SectionProgress
  }

  // Fill in missing sections with computed default status (no DB calls)
  let previousCompleted = true

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i]

    if (!progressMap[section.id]) {
      // Determine status based on position and previous section
      let status: 'locked' | 'in_progress' | 'completed' = 'locked'

      if (i === 0) {
        // First section is always unlocked
        status = 'in_progress'
      } else if (previousCompleted) {
        // Previous section is completed, unlock this one
        status = 'in_progress'
      }

      progressMap[section.id] = {
        id: '',
        user_id: user.id,
        section_id: section.id,
        status,
        learn_tab_visited: false,
        try_it_tab_visited: false,
        started_at: null,
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }

    // Update previousCompleted for next iteration
    previousCompleted = progressMap[section.id].status === 'completed'
  }

  return progressMap
}

/**
 * Start a section (mark as in_progress)
 */
export async function startSection(sectionId: string): Promise<void> {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Check if progress record already exists
  const existing = await getSectionProgress(sectionId)

  if (existing?.id) {
    // Update existing record
    await supabase
      .from('section_progress')
      .update({
        status: 'in_progress',
        started_at: existing.started_at || new Date().toISOString(),
      })
      .eq('id', existing.id)
  } else {
    // Create new record
    await supabase.from('section_progress').insert({
      user_id: user.id,
      section_id: sectionId,
      status: 'in_progress',
      started_at: new Date().toISOString(),
    })
  }

  // Revalidate paths
  const section = getSection(sectionId)
  if (section) {
    revalidatePath(`/dashboard/vibecoding/labs/lab${section.labNumber}`)
    revalidatePath(
      `/dashboard/vibecoding/labs/lab${section.labNumber}/sections/${sectionId}`
    )
  }
}

/**
 * Mark a section as completed
 */
export async function markSectionComplete(sectionId: string): Promise<void> {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  // Get or create progress record
  const existing = await getSectionProgress(sectionId)

  if (existing?.id) {
    // Update existing record
    await supabase
      .from('section_progress')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
      })
      .eq('id', existing.id)
  } else {
    // Create new record
    await supabase.from('section_progress').insert({
      user_id: user.id,
      section_id: sectionId,
      status: 'completed',
      started_at: new Date().toISOString(),
      completed_at: new Date().toISOString(),
    })
  }

  // Revalidate paths
  const section = getSection(sectionId)
  if (section) {
    revalidatePath(`/dashboard/vibecoding/labs/lab${section.labNumber}`)
    revalidatePath(
      `/dashboard/vibecoding/labs/lab${section.labNumber}/sections/${sectionId}`
    )
  }
}

/**
 * Mark a tab as visited
 */
export async function markTabVisited(
  sectionId: string,
  tabType: 'learn' | 'tryIt'
): Promise<void> {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const existing = await getSectionProgress(sectionId)

  const updateData =
    tabType === 'learn'
      ? { learn_tab_visited: true }
      : { try_it_tab_visited: true }

  if (existing?.id) {
    await supabase
      .from('section_progress')
      .update(updateData)
      .eq('id', existing.id)
  } else {
    await supabase.from('section_progress').insert({
      user_id: user.id,
      section_id: sectionId,
      status: 'in_progress',
      started_at: new Date().toISOString(),
      ...updateData,
    })
  }
}

/**
 * Get progress for all sections across all labs (for sidebar)
 */
export async function getAllSectionProgress(): Promise<{
  success: boolean
  data?: any[]
  error?: string
}> {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Not authenticated' }
  }

  const { data, error } = await supabase
    .from('section_progress')
    .select('*')
    .eq('user_id', user.id)

  if (error) {
    console.error('Error fetching all section progress:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data: data || [] }
}

/**
 * Reset all progress for a lab (for testing/debugging)
 */
export async function resetLabProgress(labNumber: number): Promise<void> {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const sections = getLabSections(labNumber)
  const sectionIds = sections.map((s) => s.id)

  await supabase
    .from('section_progress')
    .delete()
    .eq('user_id', user.id)
    .in('section_id', sectionIds)

  revalidatePath(`/dashboard/vibecoding/labs/lab${labNumber}`)
}
