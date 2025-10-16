import { createClient } from '@supabase/supabase-js'

/**
 * Rate Limiting Helper
 *
 * Checks if a user has exceeded their rate limit for a specific action
 * Uses the ai_usage_log table to track usage
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

/**
 * Check if user is within rate limit
 *
 * @param userId - User ID to check
 * @param action - Action type (e.g., 'prompt_lab')
 * @param limit - Maximum number of actions allowed
 * @param windowMinutes - Time window in minutes
 * @returns true if within limit, false if exceeded
 */
export async function checkRateLimit(
  userId: string,
  action: string,
  limit: number,
  windowMinutes: number
): Promise<boolean> {
  // Create service role client (bypasses RLS)
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000)

  const { count, error } = await supabase
    .from('ai_usage_log')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('action', action)
    .gte('created_at', windowStart.toISOString())

  if (error) {
    console.error('[checkRateLimit] Error:', error)
    // On error, allow the request (fail open)
    return true
  }

  return (count || 0) < limit
}

/**
 * Log an AI usage action
 *
 * @param userId - User ID
 * @param action - Action type
 * @param metadata - Optional metadata
 */
export async function logAIUsage(
  userId: string,
  action: string,
  metadata?: Record<string, any>
): Promise<void> {
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  const { error } = await supabase.from('ai_usage_log').insert({
    user_id: userId,
    action,
    metadata
  })

  if (error) {
    console.error('[logAIUsage] Error:', error)
  }
}
