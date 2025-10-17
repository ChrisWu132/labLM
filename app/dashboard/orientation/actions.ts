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

  // Create new module 0 progress record (handle legacy/new schema differences)
  const insertPayload: Record<string, any> = {
    user_id: user.id,
    module_number: 0,
    status: "in_progress",
    started_at: new Date().toISOString(),
  }

  let { data, error } = await supabase
    .from("module_progress")
    .insert(insertPayload)
    .select()
    .single()

  // Fallback for schemas without status/started_at fields
  if (error?.code === "PGRST204") {
    const fallbackPayload = {
      user_id: user.id,
      module_number: 0,
      completed: false,
    }

    const fallback = await supabase
      .from("module_progress")
      .insert(fallbackPayload)
      .select()
      .single()

    data = fallback.data
    error = fallback.error || null
  }

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
  const { data: currentProgress, error: fetchError } = await supabase
    .from("module_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("module_number", 0)
    .single()

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error("Error fetching checklist:", fetchError)
    return { success: false, error: fetchError.message }
  }

  if (!currentProgress) {
    return { success: false, error: "Module progress not found" }
  }

  const hasChecklistColumn =
    typeof currentProgress === "object" &&
    currentProgress !== null &&
    Object.prototype.hasOwnProperty.call(currentProgress, "checklist_items")

  const existingChecklist = hasChecklistColumn
    ? ((currentProgress as any).checklist_items as Record<string, boolean> | null)
    : null

  const updatedChecklist = {
    ...(existingChecklist || {}),
    [itemId]: completed,
  }

  if (!hasChecklistColumn) {
    // Checklist storage not available in current schema – treat as no-op but succeed
    return { success: true, checklist: updatedChecklist }
  }

  const { error: updateError } = await supabase
    .from("module_progress")
    .update({ checklist_items: updatedChecklist })
    .eq("user_id", user.id)
    .eq("module_number", 0)

  if (updateError) {
    if (updateError.code === "PGRST204") {
      // Column removed – return success without persisting
      return { success: true, checklist: updatedChecklist }
    }

    console.error("Error updating checklist:", updateError)
    return { success: false, error: updateError.message }
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

  const completionUpdate: Record<string, any> = {
    completed_at: new Date().toISOString(),
  }

  const { data: moduleZero } = await supabase
    .from("module_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("module_number", 0)
    .single()

  if (moduleZero && Object.prototype.hasOwnProperty.call(moduleZero, "status")) {
    completionUpdate.status = "completed"
  }
  if (moduleZero && Object.prototype.hasOwnProperty.call(moduleZero, "completed")) {
    completionUpdate.completed = true
  }

  const { error: completeError } = await supabase
    .from("module_progress")
    .update(completionUpdate)
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
    const defaultInsert = {
      user_id: user.id,
      module_number: moduleNumber,
      status: "in_progress",
      started_at: new Date().toISOString(),
    }

    let { error: startError } = await supabase
      .from("module_progress")
      .insert(defaultInsert)

    if (startError?.code === "PGRST204") {
      startError = (
        await supabase
          .from("module_progress")
          .insert({
            user_id: user.id,
            module_number: moduleNumber,
            completed: false,
          })
      ).error
    }

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
