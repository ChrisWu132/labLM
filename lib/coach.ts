// AI Coach helper - wraps external AI provider calls
// TODO: Connect to real AI provider (OpenAI, Anthropic, etc.)

export type CoachContextTag = "Orientation" | "Problem" | "Sandbox" | "GTM" | "Iterate" | "Demo"

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

export async function callCoach(request: CoachRequest): Promise<CoachResponse> {
  // TODO: Replace with actual AI provider integration
  // This is a mock implementation for scaffolding

  const startTime = Date.now()

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const mockResponses: Record<string, string> = {
    Orientation:
      "Welcome! Great question about getting started. Make sure you have your Sandpack and Supabase accounts set up - they're essential tools for building your MVP. If you run into any setup issues, check the troubleshooting section or reach out in the community Discord.",
    Problem:
      "Great question! When validating your problem, focus on understanding the frequency and intensity of the pain point. Try asking: 'How often does this happen?' and 'What does it cost you when it does?'",
    Sandbox:
      "Nice work on the code! Consider adding error handling for edge cases. Also, think about how you might make this more user-friendly with better feedback messages.",
    GTM: "Your go-to-market approach is solid. I'd recommend testing your messaging with 5-10 potential customers before scaling. Focus on the transformation, not just features.",
    Iterate:
      "Looking at your metrics, you're making good progress. The drop in engagement on day 3 is common - consider adding a reminder or value reinforcement at that point.",
    Demo: "Your demo is coming together nicely! Make sure to lead with the problem and show the 'aha moment' within the first 30 seconds. Practice your delivery to stay under 2 minutes.",
  }

  const latencyMs = Date.now() - startTime

  return {
    message: mockResponses[request.context] || "I'm here to help! What specific aspect would you like guidance on?",
    suggestions: [
      "Review the module materials",
      "Check out the example in the resources",
      "Try breaking this down into smaller steps",
    ],
    latencyMs,
  }
}
