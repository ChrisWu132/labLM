"use server"

import { getSupabaseServer } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"

/**
 * Initialize or update module 0 progress to 'started' status
 */
export async function startOrientation() {
  const supabase = await getSupabaseServer()

  // Get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: "Not authenticated" }
  }

  // Check if module 0 progress already exists
  const { data: existingProgress } = await supabase
    .from("module_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("module_number", 0)
    .single()

  if (existingProgress) {
    // Already started, just return success
    return { success: true, data: existingProgress }
  }

  // Create new module 0 progress record
  const { data, error } = await supabase
    .from("module_progress")
    .insert({
      user_id: user.id,
      module_number: 0,
      status: "in_progress",
      started_at: new Date().toISOString(),
      checklist_items: {
        sandpack: false,
        supabase: false,
        community: false,
      },
    })
    .select()
    .single()

  if (error) {
    console.error("Error starting orientation:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard/orientation")
  return { success: true, data }
}

/**
 * Update checklist item status
 */
export async function updateChecklistItem(itemId: string, completed: boolean) {
  const supabase = await getSupabaseServer()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: "Not authenticated" }
  }

  // Get current progress
  const { data: currentProgress } = await supabase
    .from("module_progress")
    .select("checklist_items")
    .eq("user_id", user.id)
    .eq("module_number", 0)
    .single()

  if (!currentProgress) {
    return { success: false, error: "Module progress not found" }
  }

  // Update checklist items
  const updatedChecklist = {
    ...(currentProgress.checklist_items || {}),
    [itemId]: completed,
  }

  const { error } = await supabase
    .from("module_progress")
    .update({ checklist_items: updatedChecklist })
    .eq("user_id", user.id)
    .eq("module_number", 0)

  if (error) {
    console.error("Error updating checklist:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard/orientation")
  return { success: true, checklist: updatedChecklist }
}

/**
 * Complete module 0 and start module 1
 */
export async function startModule(moduleNumber: number) {
  const supabase = await getSupabaseServer()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: "Not authenticated" }
  }

  // Complete Module 0
  const { error: completeError } = await supabase
    .from("module_progress")
    .update({
      status: "completed",
      completed_at: new Date().toISOString(),
    })
    .eq("user_id", user.id)
    .eq("module_number", 0)

  if (completeError) {
    console.error("Error completing Module 0:", completeError)
    return { success: false, error: completeError.message }
  }

  // Check if the target module already exists
  const { data: existingModule } = await supabase
    .from("module_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("module_number", moduleNumber)
    .single()

  if (!existingModule) {
    // Start the new module
    const { error: startError } = await supabase
      .from("module_progress")
      .insert({
        user_id: user.id,
        module_number: moduleNumber,
        status: "in_progress",
        started_at: new Date().toISOString(),
      })

    if (startError) {
      console.error(`Error starting Module ${moduleNumber}:`, startError)
      return { success: false, error: startError.message }
    }
  }

  revalidatePath("/dashboard/orientation")
  revalidatePath(`/dashboard/problem-discovery`)
  return { success: true }
}

/**
 * Get module progress for current user
 */
export async function getModuleProgress(moduleNumber: number) {
  const supabase = await getSupabaseServer()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: "Not authenticated", data: null }
  }

  const { data, error } = await supabase
    .from("module_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("module_number", moduleNumber)
    .single()

  if (error && error.code !== "PGRST116") {
    // PGRST116 is "not found" which is ok
    console.error("Error fetching module progress:", error)
    return { success: false, error: error.message, data: null }
  }

  return { success: true, data }
}
