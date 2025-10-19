// Admin Panel Types

export interface Class {
  id: string
  teacher_id: string
  name: string
  join_code: string
  created_at: string
  updated_at: string
}

export interface ClassEnrollment {
  id: string
  class_id: string
  student_id: string
  enrolled_at: string
}

// Exercise-level progress tracking
export interface ExerciseProgress {
  exercise_id: string
  lab_number: number
  success: boolean
  attempts: number
  created_at: string
  completed_at: string | null
  prompt_submitted: string
  llm_response: string
}

// Lab-level progress summary
export interface LabProgress {
  lab_number: number
  lab_name: string
  status: 'completed' | 'in_progress' | 'stuck' | 'not_started' | 'locked'
  exercises: ExerciseProgress[]
  completed_exercises: number
  total_exercises: number
  total_attempts: number
  time_spent_minutes: number | null
  completed_at: string | null
}

// Student progress with detailed lab breakdown
export interface StudentProgressDetailed {
  student_id: string
  email: string
  labs: LabProgress[]
  labs_completed: number
  total_labs: number
  last_activity: string | null
  completion_percentage: number
  is_at_risk: boolean // >7 days inactive or stuck on exercise
  stuck_exercises: number // exercises with >5 attempts
}

// Simple student progress (for overview table)
export interface StudentProgress {
  student_id: string
  email: string
  labs_completed: number
  total_labs: number
  last_activity: string | null
  completion_percentage: number
}

// Lab statistics for class
export interface LabStatistics {
  lab_number: number
  lab_name: string
  completed_students: number
  in_progress_students: number
  stuck_students: number
  not_started_students: number
  total_students: number
  completion_rate: number
  average_attempts: number
  average_time_minutes: number | null
  exercises: {
    exercise_id: string
    completion_rate: number
    average_attempts: number
    average_time_minutes: number | null
  }[]
}

export interface ClassWithStats extends Class {
  student_count: number
  active_students: number
  average_progress: number
}

export interface CreateClassRequest {
  name: string
  period?: string
  school_year?: string
}

export interface CreateClassResponse {
  class: Class
  join_code: string
}

export interface JoinClassRequest {
  join_code: string
}

export interface ClassProgressData {
  class: Class
  students: StudentProgress[]
  total_students: number
  average_completion: number
}

// Detailed class progress with lab breakdown
export interface ClassProgressDetailed {
  class: Class
  students: StudentProgressDetailed[]
  total_students: number
  average_completion: number
  at_risk_students: number
  lab_statistics: LabStatistics[]
}
