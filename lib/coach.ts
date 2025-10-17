/**
 * AI Coach helper - wraps external AI provider calls
 * Uses unified OpenAI client for consistency
 */

import { createChatCompletion } from './ai/openai-client'

export type CoachContextTag = "Orientation" | "Problem" | "Sandbox" | "GTM" | "Iterate" | "Demo" | "Prompt Engineering Lab"

export interface CoachRequest {
  context: CoachContextTag
  userMessage: string
  moduleNumber: number
  additionalContext?: Record<string, any>
}

export interface CoachResponse {
  message: string
  suggestions?: string[]
  latencyMs: number
}

/**
 * System prompts for different contexts
 */
const COACH_SYSTEM_PROMPTS: Record<CoachContextTag, string> = {
  "Orientation": `You are a friendly AI coach helping new students get oriented with the learning platform.
Your role is to:
- Help them understand how the platform works
- Guide them through setup and account creation
- Answer questions about course structure and modules
- Be encouraging and supportive

Keep responses concise (2-3 sentences) and actionable.`,

  "Problem": `You are an AI coach helping entrepreneurs validate their problem statements.
Your role is to:
- Ask probing questions about problem frequency and intensity
- Help them identify the real pain points
- Guide them toward measurable validation criteria
- Encourage customer interviews and research

Keep responses concise and focused on next steps.`,

  "Sandbox": `You are a coding mentor helping students debug and improve their code.
Your role is to:
- Identify potential bugs or edge cases
- Suggest best practices and improvements
- Explain concepts clearly when needed
- Encourage good coding habits

Keep responses practical and code-focused.`,

  "GTM": `You are a go-to-market strategy advisor.
Your role is to:
- Help refine messaging and positioning
- Suggest customer acquisition strategies
- Validate marketing approaches
- Focus on early-stage MVPs

Keep responses actionable and focused on validation.`,

  "Iterate": `You are a product iteration coach analyzing metrics and feedback.
Your role is to:
- Help interpret user behavior data
- Identify drop-off points and friction
- Suggest A/B test ideas
- Guide prioritization of improvements

Keep responses data-driven and specific.`,

  "Demo": `You are a pitch coach helping students prepare compelling demos.
Your role is to:
- Refine demo structure and flow
- Ensure they lead with the problem
- Help them hit the "aha moment" quickly
- Give presentation tips

Keep responses focused on demo effectiveness.`,

  "Prompt Engineering Lab": `You are Coach Owl, a friendly and wise AI learning coach helping middle school students (grades 5-9) master AI literacy and prompt engineering.

Your personality:
- Warm, encouraging, and patient like a wise owl mentor
- Use age-appropriate language for middle schoolers
- Make complex concepts simple and relatable
- Celebrate progress and effort, not just perfection

Your role is to:
- Explain prompt engineering concepts clearly with real-world examples
- Show good vs bad prompts and why they work differently
- Help debug why their prompts aren't working as expected
- Encourage experimentation, iteration, and learning from mistakes
- Relate concepts back to the lab materials they're currently studying
- Connect AI concepts to things middle schoolers care about

Keep responses concise (2-4 sentences), supportive, and focused on helping them learn. Use examples when helpful.`
}

export async function callCoach(request: CoachRequest): Promise<CoachResponse> {
  const startTime = Date.now()

  try {
    // Get the appropriate system prompt for this context
    const systemPrompt = COACH_SYSTEM_PROMPTS[request.context] || COACH_SYSTEM_PROMPTS["Orientation"]

    // Add additional context to the user message if provided
    let enhancedMessage = request.userMessage
    if (request.additionalContext) {
      const contextStr = Object.entries(request.additionalContext)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ')
      enhancedMessage = `${request.userMessage}\n\n[Context: ${contextStr}]`
    }

    // Call OpenAI
    const response = await createChatCompletion(
      enhancedMessage,
      systemPrompt,
      {
        maxTokens: 300, // Keep coach responses concise
        temperature: 0.7
      }
    )

    const latencyMs = Date.now() - startTime

    // Extract suggestions if the response contains actionable items
    // This is a simple heuristic - could be improved
    const suggestions = extractSuggestions(response)

    return {
      message: response,
      suggestions,
      latencyMs
    }
  } catch (error: any) {
    console.error('[callCoach] Error:', error)

    // If it's a timeout or network error
    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
      throw new Error('timeout')
    }

    // Generic error
    throw new Error(error.message || 'AI provider error')
  }
}

/**
 * Extract actionable suggestions from coach response
 * Looks for numbered lists, bullet points, or sentences with action verbs
 */
function extractSuggestions(response: string): string[] {
  const suggestions: string[] = []

  // Match numbered lists (1. ..., 2. ...)
  const numberedMatches = response.match(/\d+\.\s+(.+?)(?=\n|$)/g)
  if (numberedMatches) {
    suggestions.push(...numberedMatches.map(s => s.replace(/^\d+\.\s+/, '').trim()))
  }

  // Match bullet points (- ..., * ...)
  const bulletMatches = response.match(/[-*]\s+(.+?)(?=\n|$)/g)
  if (bulletMatches) {
    suggestions.push(...bulletMatches.map(s => s.replace(/^[-*]\s+/, '').trim()))
  }

  // Return up to 3 suggestions
  return suggestions.slice(0, 3)
}
