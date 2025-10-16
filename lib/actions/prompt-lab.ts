'use server'

import { createServerSupabaseClient } from '@/lib/supabase-server'
import { checkRateLimit, logAIUsage } from '@/lib/rate-limit'
import { checkExerciseSuccess } from '@/lib/prompt-lab/success-checker'
import { getOpenAIClient, AI_CONFIG } from '@/lib/ai/openai-client'
import type { RunPromptRequest, RunPromptResult } from '@/types/prompt-lab'

/**
 * Run a user's prompt through the LLM and check success criteria
 *
 * This is the main server action for the Prompt Lab feature.
 * It handles:
 * 1. Authentication
 * 2. Input validation
 * 3. Rate limiting
 * 4. LLM API call
 * 5. Success checking
 * 6. Data persistence
 */
export async function runPrompt(
  request: RunPromptRequest
): Promise<RunPromptResult> {
  const supabase = await createServerSupabaseClient()

  // 1. Get current user
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'Please log in first' }
  }

  // 2. Validate input
  if (!request.prompt || request.prompt.trim().length < 10) {
    return { success: false, error: 'Prompt too short - minimum 10 characters' }
  }

  if (request.prompt.length > 1000) {
    return { success: false, error: 'Prompt too long - maximum 1000 characters' }
  }

  // 3. Rate limit check (30 per hour)
  const allowed = await checkRateLimit(user.id, 'prompt_lab', 30, 60)
  if (!allowed) {
    return {
      success: false,
      error: 'Rate limit exceeded. Please try again later (max 30 per hour)'
    }
  }

  // 4. Call GPT-4o using unified client
  const startTime = Date.now()
  let llmResponse: string

  try {
    const openai = getOpenAIClient()
    const completion = await openai.chat.completions.create({
      model: AI_CONFIG.model,
      messages: [{ role: 'user', content: request.prompt }],
      max_tokens: AI_CONFIG.maxTokens,
      temperature: AI_CONFIG.temperature
    })

    llmResponse = completion.choices[0].message.content || ''
  } catch (error: any) {
    console.error('[runPrompt] OpenAI API error:', error)
    return {
      success: false,
      error: 'AI service temporarily unavailable, please try again later'
    }
  }

  const latencyMs = Date.now() - startTime

  // 5. Check success criteria
  const successCheck = await checkExerciseSuccess(
    request.exerciseId,
    llmResponse
  )

  // 6. Get existing attempts count
  const { data: existing } = await supabase
    .from('prompt_lab_progress')
    .select('attempts')
    .eq('user_id', user.id)
    .eq('lab_number', request.labNumber)
    .eq('exercise_id', request.exerciseId)
    .single()

  const newAttempts = (existing?.attempts || 0) + 1

  // 7. Persist submission
  const { error: upsertError } = await supabase
    .from('prompt_lab_progress')
    .upsert({
      user_id: user.id,
      lab_number: request.labNumber,
      exercise_id: request.exerciseId,
      prompt_submitted: request.prompt,
      llm_response: llmResponse,
      success: successCheck.success,
      attempts: newAttempts,
      completed_at: successCheck.success ? new Date().toISOString() : null
    })

  if (upsertError) {
    console.error('[runPrompt] Database error:', upsertError)
  }

  // 8. Log usage
  await logAIUsage(user.id, 'prompt_lab', {
    lab_number: request.labNumber,
    exercise_id: request.exerciseId,
    success: successCheck.success,
    latency_ms: latencyMs
  })

  return {
    success: true,
    output: llmResponse,
    passed: successCheck.success,
    feedback: successCheck.feedback,
    latencyMs
  }
}
