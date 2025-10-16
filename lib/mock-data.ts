// Mock data for development and testing

import type { ModuleProgress, CoachTranscript, ProblemBrief } from "./types"
import { MODULES } from "./constants"

export const mockUser = {
  id: "user-123",
  email: "learner@example.com",
  full_name: "Alex Chen",
  avatar_url: "/diverse-avatars.png",
  created_at: new Date().toISOString(),
}

export const mockModuleProgress: ModuleProgress[] = [
  {
    id: "1",
    user_id: "user-123",
    module_number: 0,
    status: "completed",
    started_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    completed_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    checklist_items: {
      sandpack_account: true,
      supabase_login: true,
      community_join: true,
    },
  },
  {
    id: "2",
    user_id: "user-123",
    module_number: 1,
    status: "in_progress",
    started_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    checklist_items: {
      deep_research: true,
      bullseye: false,
      interview_kit: false,
    },
  },
]

export const mockCoachTranscripts: CoachTranscript[] = [
  {
    id: "1",
    user_id: "user-123",
    module_number: 1,
    context_tag: "Problem",
    user_message: "How do I validate if my problem is worth solving?",
    coach_response:
      "Great question! When validating your problem, focus on understanding the frequency and intensity of the pain point. Try asking: 'How often does this happen?' and 'What does it cost you when it does?'",
    latency_ms: 850,
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    user_id: "user-123",
    module_number: 1,
    context_tag: "Problem",
    user_message: "What should I include in my interview kit?",
    coach_response:
      "Your interview kit should include: 1) An opening that builds rapport, 2) Open-ended questions about their current workflow, 3) Probing questions about pain points, 4) A closing that thanks them and asks for referrals. Keep it conversational, not interrogative!",
    latency_ms: 920,
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
]

export const mockProblemBrief: ProblemBrief = {
  id: "1",
  user_id: "user-123",
  segment: "Small business owners managing inventory",
  problem: "Manually tracking inventory across multiple sales channels leads to stockouts and overselling",
  current_solution: "Excel spreadsheets updated daily, prone to human error",
  desired_outcome: "Real-time inventory sync across all channels with automated alerts",
  validation_status: "pending",
  created_at: new Date().toISOString(),
}

export const modulesList = MODULES
