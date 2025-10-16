"use server"

import { getSupabaseServer } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"

/**
 * Initialize or update module 2 progress
 */
export async function startVibecoding() {
  const supabase = await getSupabaseServer()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: "Not authenticated" }
  }

  // Check if module 2 progress already exists
  const { data: existingProgress } = await supabase
    .from("module_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("module_number", 2)
    .single()

  if (existingProgress) {
    return { success: true, data: existingProgress }
  }

  // Create new module 2 progress record
  const { data, error } = await supabase
    .from("module_progress")
    .insert({
      user_id: user.id,
      module_number: 2,
      status: "in_progress",
      started_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error("Error starting vibecoding:", error)
    return { success: false, error: error.message }
  }

  revalidatePath("/dashboard/vibecoding")
  return { success: true, data }
}

/**
 * Get module progress
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
    console.error("Error fetching module progress:", error)
    return { success: false, error: error.message, data: null }
  }

  return { success: true, data }
}

/**
 * Save Sandpack submission
 */
export async function saveSandpackSubmission(
  labNumber: number,
  codeSnapshot: Record<string, string>,
  experimentNotes?: string,
) {
  const supabase = await getSupabaseServer()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: "Not authenticated" }
  }

  // Check if submission already exists
  const { data: existing } = await supabase
    .from("sandpack_submissions")
    .select("*")
    .eq("user_id", user.id)
    .eq("lab_number", labNumber)
    .single()

  if (existing) {
    // Update existing submission
    const { error } = await supabase
      .from("sandpack_submissions")
      .update({
        code_snapshot: codeSnapshot,
        experiment_notes: experimentNotes,
        completed: true,
      })
      .eq("user_id", user.id)
      .eq("lab_number", labNumber)

    if (error) {
      console.error("Error updating sandpack submission:", error)
      return { success: false, error: error.message }
    }
  } else {
    // Create new submission
    const { error } = await supabase.from("sandpack_submissions").insert({
      user_id: user.id,
      lab_number: labNumber,
      code_snapshot: codeSnapshot,
      experiment_notes: experimentNotes,
      completed: true,
    })

    if (error) {
      console.error("Error creating sandpack submission:", error)
      return { success: false, error: error.message }
    }
  }

  revalidatePath("/dashboard/vibecoding")
  return { success: true, message: "Lab progress saved!" }
}

/**
 * Mark lab as complete
 */
export async function markLabComplete(labNumber: number) {
  const supabase = await getSupabaseServer()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: "Not authenticated" }
  }

  // Check if submission exists
  const { data: existing } = await supabase
    .from("sandpack_submissions")
    .select("*")
    .eq("user_id", user.id)
    .eq("lab_number", labNumber)
    .single()

  if (existing) {
    // Update existing
    const { error } = await supabase
      .from("sandpack_submissions")
      .update({ completed: true })
      .eq("user_id", user.id)
      .eq("lab_number", labNumber)

    if (error) {
      console.error("Error marking lab complete:", error)
      return { success: false, error: error.message }
    }
  } else {
    // Create new entry
    const { error } = await supabase.from("sandpack_submissions").insert({
      user_id: user.id,
      lab_number: labNumber,
      code_snapshot: {},
      completed: true,
    })

    if (error) {
      console.error("Error marking lab complete:", error)
      return { success: false, error: error.message }
    }
  }

  revalidatePath("/dashboard/vibecoding")
  return { success: true }
}

/**
 * Get lab submissions
 */
export async function getLabSubmissions() {
  const supabase = await getSupabaseServer()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: "Not authenticated", data: [] }
  }

  const { data, error } = await supabase
    .from("sandpack_submissions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching lab submissions:", error)
    return { success: false, error: error.message, data: [] }
  }

  return { success: true, data: data || [] }
}
