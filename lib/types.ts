// TypeScript interfaces for Supabase data contracts

export interface ModuleProgress {
  id: string
  user_id: string
  module_number: number
  status: "not_started" | "in_progress" | "completed"
  started_at?: string
  completed_at?: string
  checklist_items?: Record<string, boolean>
  created_at: string
  updated_at: string
}

export interface ResearchInput {
  id: string
  user_id: string
  research_type: "deep_research" | "bullseye" | "interview_kit"
  content: Record<string, any>
  coach_feedback?: string
  created_at: string
  updated_at: string
}

export interface ProblemBrief {
  id: string
  user_id: string
  segment: string
  problem: string
  current_solution: string
  desired_outcome: string
  validation_status?: "pending" | "approved" | "needs_revision"
  coach_notes?: string
  created_at: string
  updated_at: string
}

export interface SandpackSubmission {
  id: string
  user_id: string
  lab_number: number
  code_snapshot: Record<string, string>
  experiment_notes?: string
  completed: boolean
  created_at: string
  updated_at: string
}

export interface GtmAction {
  id: string
  user_id: string
  track: "tob" | "toc"
  action_type: string
  content: Record<string, any>
  coach_review_status?: "pending" | "approved" | "needs_work"
  created_at: string
  updated_at: string
}

export interface IterateLog {
  id: string
  user_id: string
  week_number: number
  north_star_prompt?: string
  tracking_items: Array<{
    metric: string
    target: number
    actual: number
    notes?: string
  }>
  retro_notes?: {
    keep: string[]
    improve: string[]
    test: string[]
  }
  coach_synthesis?: string
  created_at: string
  updated_at: string
}

export interface DemoSubmission {
  id: string
  user_id: string
  learner_name: string
  project_title: string
  value_proposition: string
  sandpack_link: string
  loom_link?: string
  certificate_url?: string
  certificate_thumb_url?: string
  coach_status?: "pending" | "approved" | "needs_revision"
  submitted_at: string
  created_at: string
  updated_at: string
}

export type CoachContextTag = "Orientation" | "Problem" | "Sandbox" | "GTM" | "Iterate" | "Demo"

export interface CoachTranscript {
  id: string
  user_id: string
  module_number: number
  context_tag: CoachContextTag
  user_message: string
  coach_response: string
  latency_ms?: number
  tone?: "coach" | "warning" | "celebration"
  status?: "success" | "failure" | "timeout"
  additionalContext?: Record<string, any>
  created_at: string
}

export interface AIUsageLog {
  id: string
  user_id: string
  module_number?: number
  call_count: number
  window_start: string
  created_at: string
}

export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
}
