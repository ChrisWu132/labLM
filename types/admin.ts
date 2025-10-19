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

export interface StudentProgress {
  student_id: string
  email: string
  labs_completed: number
  total_labs: number
  last_activity: string | null
  completion_percentage: number
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
