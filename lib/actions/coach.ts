"use server"

import { getSupabaseServer } from "@/lib/supabase-server"
import { callCoach, type CoachContextTag } from "@/lib/coach"
import { revalidatePath } from "next/cache"

export interface AskCoachRequest {
  userMessage: string
  context: CoachContextTag
  moduleNumber: number
  additionalContext?: Record<string, any>
}

export interface AskCoachResponse {
  success: boolean
  message?: string
  suggestions?: string[]
  latencyMs?: number
  transcriptId?: string
  error?: string
}

/**
 * Shared server action for all coach interactions
 *
 * Features:
 * - Validates authentication
 * - Calls external AI provider via callCoach()
 * - Persists all interactions to coach_transcripts table
 * - Provides telemetry and error handling
 * - Ensures consistent module/context tagging
 *
 * @param request - Coach request with message, context, and module info
 * @returns Response with coach message or error
 */
export async function askCoach(request: AskCoachRequest): Promise<AskCoachResponse> {
  const startTime = Date.now()

  try {
    // 1. Validate authentication
    const supabase = await getSupabaseServer()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      console.error("[askCoach] Authentication failed:", authError)
      return {
        success: false,
        error: "Authentication required. Please log in to ask the coach.",
      }
    }

    // 2. Validate input
    if (!request.userMessage?.trim()) {
      return {
        success: false,
        error: "Please enter a message for the coach.",
      }
    }

    // Log request (telemetry)
    console.log(`[askCoach] User ${user.id} | Module ${request.moduleNumber} | Context: ${request.context}`)

    // 3. Call AI provider
    let coachResponse
    let status: "success" | "failure" | "timeout" = "success"
    let errorMessage: string | undefined

    try {
      coachResponse = await callCoach({
        context: request.context,
        userMessage: request.userMessage,
        moduleNumber: request.moduleNumber,
        additionalContext: request.additionalContext,
      })
    } catch (providerError: any) {
      console.error("[askCoach] Provider error:", providerError)
      status = providerError.message?.includes("timeout") ? "timeout" : "failure"
      errorMessage = providerError.message || "AI provider error"

      const totalLatencyMs = Date.now() - startTime

      // Still log the failure to coach_transcripts
      try {
        const { data: transcript } = await supabase
          .from("coach_transcripts")
          .insert({
            user_id: user.id,
            module_number: request.moduleNumber,
            context_tag: request.context,
            user_message: request.userMessage,
            coach_response: errorMessage,
            latency_ms: totalLatencyMs,
            status,
            tone: "warning",
          })
          .select("id")
          .single()

        console.log(`[askCoach] Failure logged | Status: ${status} | Latency: ${totalLatencyMs}ms | Transcript ID: ${transcript?.id || "not-saved"}`)
      } catch (dbError) {
        console.error("[askCoach] Failed to persist error transcript:", dbError)
      }

      // Return user-friendly error
      return {
        success: false,
        error: status === "timeout"
          ? "The coach is taking longer than expected. Please try again."
          : "The coach is temporarily unavailable. Please try again in a moment.",
        latencyMs: totalLatencyMs,
      }
    }

    const totalLatencyMs = Date.now() - startTime

    // 4. Persist transcript to database
    let transcriptId: string | undefined

    try {
      const { data: transcript, error: transcriptError } = await supabase
        .from("coach_transcripts")
        .insert({
          user_id: user.id,
          module_number: request.moduleNumber,
          context_tag: request.context,
          user_message: request.userMessage,
          coach_response: coachResponse.message,
          latency_ms: totalLatencyMs,
          status,
          tone: "coach", // Default tone, can be customized based on response content
        })
        .select("id")
        .single()

      if (transcriptError) {
        console.error("[askCoach] Failed to persist transcript:", transcriptError)
        // Don't fail the request if transcript save fails
      } else {
        transcriptId = transcript?.id
      }
    } catch (dbError) {
      console.error("[askCoach] Database error:", dbError)
      // Continue - transcript persistence is not critical for user experience
    }

    // 5. Log telemetry
    console.log(`[askCoach] Success | Latency: ${totalLatencyMs}ms | Transcript ID: ${transcriptId || "not-saved"}`)

    // 6. Revalidate paths that might show coach history
    revalidatePath("/dashboard")

    // 7. Return successful response
    return {
      success: true,
      message: coachResponse.message,
      suggestions: coachResponse.suggestions,
      latencyMs: totalLatencyMs,
      transcriptId,
    }

  } catch (unexpectedError: any) {
    const totalLatencyMs = Date.now() - startTime

    console.error("[askCoach] Unexpected error:", unexpectedError)
    console.error("[askCoach] Latency before failure:", totalLatencyMs, "ms")

    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}

/**
 * Get coach transcripts for the current user
 * Useful for displaying conversation history
 */
export async function getCoachTranscripts(
  moduleNumber?: number,
  limit: number = 10
) {
  try {
    const supabase = await getSupabaseServer()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { success: false, error: "Not authenticated", data: [] }
    }

    let query = supabase
      .from("coach_transcripts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (moduleNumber !== undefined) {
      query = query.eq("module_number", moduleNumber)
    }

    const { data, error } = await query

    if (error) {
      console.error("[getCoachTranscripts] Error:", error)
      return { success: false, error: error.message, data: [] }
    }

    return { success: true, data: data || [] }
  } catch (error: any) {
    console.error("[getCoachTranscripts] Unexpected error:", error)
    return { success: false, error: error.message, data: [] }
  }
}
