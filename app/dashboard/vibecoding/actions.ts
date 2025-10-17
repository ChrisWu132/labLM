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

  // Create new module 2 progress record (handle schema differences)
  const insertPayload: Record<string, any> = {
    user_id: user.id,
    module_number: 2,
    status: "in_progress",
    started_at: new Date().toISOString(),
  }

  let { data, error } = await supabase
    .from("module_progress")
    .insert(insertPayload)
    .select()
    .single()

  if (error?.code === "PGRST204") {
    const fallback = await supabase
      .from("module_progress")
      .insert({
        user_id: user.id,
        module_number: 2,
        completed: false,
      })
      .select()
      .single()

    data = fallback.data
    error = fallback.error || null
  }

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

  // Sandpack submissions have been deprecated in favor of prompt-based labs.
  // Keep the handler to maintain API compatibility, but simply return success.
  console.warn("saveSandpackSubmission is deprecated and no longer persists data.")

  revalidatePath("/dashboard/vibecoding")
  return {
    success: true,
    message: "Sandpack submissions are no longer required. Your progress is tracked automatically.",
  }
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

  const now = new Date().toISOString()
  const manualExerciseId = `lab${labNumber}-manual-complete`

  const { error: upsertError } = await supabase
    .from("prompt_lab_progress")
    .upsert(
      {
        user_id: user.id,
        lab_number: labNumber,
        exercise_id: manualExerciseId,
        prompt_submitted: "[manual completion]",
        llm_response: "Manual completion recorded",
        success: true,
        attempts: 1,
        completed_at: now,
      },
      {
        onConflict: "user_id,lab_number,exercise_id",
      },
    )

  if (upsertError) {
    console.error("Error marking lab complete:", upsertError)
    return { success: false, error: upsertError.message }
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
    .from("prompt_lab_progress")
    .select("lab_number, success, completed_at")
    .eq("user_id", user.id)

  if (error) {
    if (error.code === "PGRST205") {
      // Table not found (older schema) – treat as no submissions yet
      return { success: true, data: [] }
    }

    console.error("Error fetching lab submissions:", error)
    return { success: false, error: error.message, data: [] }
  }

  const summary = new Map<number, { lab_number: number; completed: boolean; completed_at?: string | null }>()

  for (const row of data || []) {
    if (!row) continue
    const labNumber = (row as any).lab_number as number
    if (!summary.has(labNumber)) {
      summary.set(labNumber, {
        lab_number: labNumber,
        completed: false,
        completed_at: null,
      })
    }

    if ((row as any).success) {
      const entry = summary.get(labNumber)!
      entry.completed = true
      entry.completed_at = (row as any).completed_at ?? entry.completed_at
    }
  }

  return { success: true, data: Array.from(summary.values()) }
}
