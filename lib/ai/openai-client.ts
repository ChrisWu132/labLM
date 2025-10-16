/**
 * Unified OpenAI Client
 *
 * Single source of truth for all OpenAI API calls
 * Used by:
 * - Prompt Lab (runPrompt)
 * - AI Coach (callCoach)
 * - Any future AI features
 */

import OpenAI from 'openai'

// Singleton OpenAI client instance
let openaiInstance: OpenAI | null = null

/**
 * Get the OpenAI client instance
 * Creates one if it doesn't exist (singleton pattern)
 */
export function getOpenAIClient(): OpenAI {
  if (!openaiInstance) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is not set')
    }

    openaiInstance = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  }

  return openaiInstance
}

/**
 * Default model configuration
 */
export const AI_CONFIG = {
  model: process.env.AI_MODEL || 'gpt-4o',
  maxTokens: parseInt(process.env.AI_MAX_TOKENS || '500'),
  temperature: 0.7
} as const

/**
 * Simple chat completion helper
 *
 * @param userMessage - The user's message
 * @param systemPrompt - Optional system prompt for context
 * @param options - Optional override for model config
 */
export async function createChatCompletion(
  userMessage: string,
  systemPrompt?: string,
  options?: {
    model?: string
    maxTokens?: number
    temperature?: number
  }
): Promise<string> {
  const openai = getOpenAIClient()

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = []

  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt })
  }

  messages.push({ role: 'user', content: userMessage })

  const completion = await openai.chat.completions.create({
    model: options?.model || AI_CONFIG.model,
    messages,
    max_tokens: options?.maxTokens || AI_CONFIG.maxTokens,
    temperature: options?.temperature ?? AI_CONFIG.temperature
  })

  return completion.choices[0].message.content || ''
}
