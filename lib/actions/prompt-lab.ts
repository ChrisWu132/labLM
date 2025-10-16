'use server'

import { createServerSupabaseClient } from '@/lib/supabase-server'
import { checkRateLimit, logAIUsage } from '@/lib/rate-limit'
import { checkExerciseSuccess } from '@/lib/prompt-lab/success-checker'
import OpenAI from 'openai'
import type { RunPromptRequest, RunPromptResult } from '@/types/prompt-lab'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

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
    return { success: false, error: '请先登录' }
  }

  // 2. Validate input
  if (!request.prompt || request.prompt.trim().length < 10) {
    return { success: false, error: 'Prompt 太短,至少 10 个字符' }
  }

  if (request.prompt.length > 1000) {
    return { success: false, error: 'Prompt 太长,最多 1000 个字符' }
  }

  // 3. Rate limit check (30 per hour)
  const allowed = await checkRateLimit(user.id, 'prompt_lab', 30, 60)
  if (!allowed) {
    return {
      success: false,
      error: '操作太频繁,请稍后再试 (每小时最多 30 次)'
    }
  }

  // 4. Call GPT-4o
  const startTime = Date.now()
  let llmResponse: string

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.AI_MODEL || 'gpt-4o',
      messages: [{ role: 'user', content: request.prompt }],
      max_tokens: parseInt(process.env.AI_MAX_TOKENS || '500'),
      temperature: 0.7
    })

    llmResponse = completion.choices[0].message.content || ''
  } catch (error: any) {
    console.error('[runPrompt] OpenAI API error:', error)
    return {
      success: false,
      error: 'AI 服务暂时不可用,请稍后再试'
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
