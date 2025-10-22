/**
 * TypeScript Type Definitions for LLM Learning Lab
 *
 * This file contains all the type definitions for the Prompt Engineering platform,
 * including database models, API request/response types, and UI component props.
 */

// ============================================================================
// Database Models
// ============================================================================

/**
 * Progress record for a single exercise in a lab
 */
export interface PromptLabProgress {
  id: string
  user_id: string
  lab_number: number
  exercise_id: string
  prompt_submitted: string
  llm_response: string
  success: boolean
  attempts: number
  completed_at: string | null
  created_at: string
}

/**
 * Overall progress tracking for a lab module
 */
export interface ModuleProgress {
  id: string
  user_id: string
  module_number: number
  completed: boolean
  completed_at: string | null
  created_at: string
  updated_at: string
}

/**
 * AI usage log entry for rate limiting and analytics
 */
export interface AIUsageLog {
  id: string
  user_id: string
  action: string
  metadata?: Record<string, any>
  created_at: string
}

// ============================================================================
// API Request/Response Types
// ============================================================================

/**
 * Request payload for running a prompt
 */
export interface RunPromptRequest {
  prompt: string
  labNumber: number
  exerciseId: string
}

/**
 * Response from running a prompt
 */
export interface RunPromptResult {
  success: boolean
  error?: string
  output?: string
  passed?: boolean
  feedback?: string
  latencyMs?: number
}

// ============================================================================
// Success Criteria System
// ============================================================================

/**
 * Success criteria configuration for an exercise
 */
export interface SuccessCriteria {
  exerciseId: string
  rules: SuccessRule[]
  passingScore: number // Minimum number of rules that must pass
}

/**
 * Individual success rule
 */
export interface SuccessRule {
  type: 'containsKeywords' | 'minLength' | 'maxLength' | 'format' | 'sentiment'
  value: any
}

/**
 * Result of checking success criteria
 */
export interface SuccessCheckResult {
  success: boolean
  feedback: string
  passedRules?: number
  totalRules?: number
}

// ============================================================================
// Lab Metadata
// ============================================================================

/**
 * Metadata for a lab module
 */
export interface LabMetadata {
  id: number
  title: string
  description: string
  estimatedMinutes: number
  exerciseCount: number
  path: string
}

/**
 * Lab content loaded from MDX
 */
export interface LabContent {
  id: string
  mdx: string
  metadata: {
    title: string
    description: string
    estimatedMinutes: number
  }
}

// ============================================================================
// Lab Sections (Micro-Sections)
// ============================================================================

/**
 * Tab type within a section
 */
export type TabType = 'content' | 'interactive' | 'quiz'

/**
 * Individual tab within a lab section
 */
export interface SectionTab {
  id: string // 'learn' | 'tryIt' | 'quiz'
  type: TabType
  label: string // Display label (e.g., 'Learn', 'Try It')
}

/**
 * Lab section configuration (micro-section)
 */
export interface LabSection {
  id: string // Format: "1.1", "1.2", "2.1", etc.
  labNumber: number // 1-6
  order: number // 1, 2, 3, ...
  title: string // e.g., "What is AI?"
  tabs: SectionTab[]
}

/**
 * User progress for a specific section
 * Maps to section_progress database table
 */
export interface SectionProgress {
  id: string
  user_id: string
  section_id: string // Format: "1.1", "1.2", etc.
  status: 'locked' | 'in_progress' | 'completed'
  learn_tab_visited: boolean
  try_it_tab_visited: boolean
  started_at: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
}

// ============================================================================
// UI Component Props
// ============================================================================

/**
 * Props for PromptEditor component
 */
export interface PromptEditorProps {
  exerciseId: string
  mode: 'readonly' | 'editable' | 'blank'
  initialValue?: string
  placeholder?: string
  maxLength?: number
  showCharCount?: boolean
  onSubmit?: (prompt: string) => Promise<void>
}

/**
 * Props for LLMOutputDisplay component
 */
export interface LLMOutputProps {
  mode: 'static' | 'live'
  content?: string
  loading?: boolean
  error?: string | null
  success?: boolean | null
  feedback?: string
  showTokenCount?: boolean
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Rate limiting configuration
 */
export interface RateLimitConfig {
  action: string
  limit: number
  windowMinutes: number
}

/**
 * User progress summary for dashboard
 */
export interface UserProgressSummary {
  totalLabs: number
  completedLabs: number
  currentLab: number | null
  totalExercises: number
  completedExercises: number
  successRate: number // Percentage
  totalAttempts: number
}
