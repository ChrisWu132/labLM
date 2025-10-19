'use server'

import { getSupabaseServer } from '@/lib/supabase-server'
import { generateJoinCode, formatJoinCode, calculateCompletionPercentage } from '@/lib/admin-utils'
import type {
  Class,
  CreateClassResponse,
  ClassWithStats,
  ClassProgressData,
  StudentProgress
} from '@/types/admin'

/**
 * Create a new class for a teacher
 */
export async function createClass(name: string): Promise<{
  data?: CreateClassResponse
  error?: string
}> {
  const supabase = await getSupabaseServer()

  // Get authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Not authenticated. Please log in.' }
  }

  // Generate unique join code
  let joinCode = generateJoinCode()
  let isUnique = false
  let attempts = 0

  // Ensure join code is unique (retry up to 5 times)
  while (!isUnique && attempts < 5) {
    const { data: existing } = await supabase
      .from('classes')
      .select('id')
      .eq('join_code', joinCode)
      .single()

    if (!existing) {
      isUnique = true
    } else {
      joinCode = generateJoinCode()
      attempts++
    }
  }

  if (!isUnique) {
    return { error: 'Failed to generate unique join code. Please try again.' }
  }

  // Create class
  const { data, error } = await supabase
    .from('classes')
    .insert({
      teacher_id: user.id,
      name,
      join_code: joinCode
    })
    .select()
    .single()

  if (error) {
    console.error('[createClass] Error:', error)
    return { error: 'Failed to create class. Please try again.' }
  }

  return {
    data: {
      class: data as Class,
      join_code: joinCode
    }
  }
}

/**
 * Get all classes for the authenticated teacher
 */
export async function getMyClasses(): Promise<{
  data?: ClassWithStats[]
  error?: string
}> {
  const supabase = await getSupabaseServer()

  // Get authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Not authenticated. Please log in.' }
  }

  // Get all classes for this teacher
  const { data: classes, error: classesError } = await supabase
    .from('classes')
    .select('*')
    .eq('teacher_id', user.id)
    .order('created_at', { ascending: false })

  if (classesError) {
    console.error('[getMyClasses] Error:', classesError)
    return { error: 'Failed to fetch classes.' }
  }

  // Get student count and progress for each class
  const classesWithStats: ClassWithStats[] = await Promise.all(
    (classes as Class[]).map(async (classItem) => {
      // Get enrollments for this class
      const { data: enrollments } = await supabase
        .from('class_enrollments')
        .select('student_id')
        .eq('class_id', classItem.id)

      const studentCount = enrollments?.length || 0
      const studentIds = enrollments?.map(e => e.student_id) || []

      if (studentIds.length === 0) {
        return {
          ...classItem,
          student_count: 0,
          active_students: 0,
          average_progress: 0
        }
      }

      // Get progress for all students in this class
      const { data: progress } = await supabase
        .from('prompt_lab_progress')
        .select('user_id, success, created_at')
        .in('user_id', studentIds)

      // Calculate stats
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

      const activeStudents = new Set(
        progress?.filter(p => new Date(p.created_at) > oneWeekAgo).map(p => p.user_id)
      ).size

      // Calculate average progress (labs completed out of 6)
      const studentProgressMap = new Map<string, number>()
      progress?.forEach(p => {
        if (p.success) {
          studentProgressMap.set(p.user_id, (studentProgressMap.get(p.user_id) || 0) + 1)
        }
      })

      const totalLabsCompleted = Array.from(studentProgressMap.values()).reduce((sum, count) => sum + count, 0)
      const averageProgress = studentCount > 0 ? Math.round((totalLabsCompleted / (studentCount * 6)) * 100) : 0

      return {
        ...classItem,
        student_count: studentCount,
        active_students: activeStudents,
        average_progress: averageProgress
      }
    })
  )

  return { data: classesWithStats }
}

/**
 * Get a single class by ID (for teacher only)
 */
export async function getClass(classId: string): Promise<{
  data?: Class
  error?: string
}> {
  const supabase = await getSupabaseServer()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Not authenticated. Please log in.' }
  }

  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .eq('id', classId)
    .eq('teacher_id', user.id)
    .single()

  if (error) {
    console.error('[getClass] Error:', error)
    return { error: 'Class not found or access denied.' }
  }

  return { data: data as Class }
}

/**
 * Join a class with a join code (for students)
 */
export async function joinClassWithCode(joinCode: string): Promise<{
  data?: { class_name: string; teacher_email: string }
  error?: string
}> {
  const supabase = await getSupabaseServer()

  // Get authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Not authenticated. Please create an account or log in first.' }
  }

  // Format and validate join code
  const formattedCode = formatJoinCode(joinCode)

  // Find class by join code
  const { data: classData, error: classError } = await supabase
    .from('classes')
    .select('id, name, teacher_id')
    .eq('join_code', formattedCode)
    .single()

  if (classError || !classData) {
    return { error: 'Invalid class code. Please check and try again.' }
  }

  // Check if already enrolled
  const { data: existing } = await supabase
    .from('class_enrollments')
    .select('id')
    .eq('class_id', classData.id)
    .eq('student_id', user.id)
    .single()

  if (existing) {
    return { error: 'You are already enrolled in this class.' }
  }

  // Enroll student
  const { error: enrollError } = await supabase
    .from('class_enrollments')
    .insert({
      class_id: classData.id,
      student_id: user.id
    })

  if (enrollError) {
    console.error('[joinClassWithCode] Error:', enrollError)
    return { error: 'Failed to join class. Please try again.' }
  }

  // Get teacher email
  const { data: teacherData } = await supabase
    .from('auth.users')
    .select('email')
    .eq('id', classData.teacher_id)
    .single()

  return {
    data: {
      class_name: classData.name,
      teacher_email: teacherData?.email || 'Unknown'
    }
  }
}

/**
 * Get student enrollments for the authenticated student
 */
export async function getMyEnrollments(): Promise<{
  data?: Array<{ class: Class; enrolled_at: string }>
  error?: string
}> {
  const supabase = await getSupabaseServer()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Not authenticated. Please log in.' }
  }

  const { data, error } = await supabase
    .from('class_enrollments')
    .select('*, classes(*)')
    .eq('student_id', user.id)
    .order('enrolled_at', { ascending: false })

  if (error) {
    console.error('[getMyEnrollments] Error:', error)
    return { error: 'Failed to fetch enrollments.' }
  }

  return {
    data: data.map(enrollment => ({
      class: enrollment.classes as Class,
      enrolled_at: enrollment.enrolled_at
    }))
  }
}

/**
 * Get class progress data (students and their lab completion)
 */
export async function getClassProgress(classId: string): Promise<{
  data?: ClassProgressData
  error?: string
}> {
  const supabase = await getSupabaseServer()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Not authenticated. Please log in.' }
  }

  // Verify teacher owns this class
  const { data: classData, error: classError } = await supabase
    .from('classes')
    .select('*')
    .eq('id', classId)
    .eq('teacher_id', user.id)
    .single()

  if (classError || !classData) {
    return { error: 'Class not found or access denied.' }
  }

  // Get students enrolled in class
  const { data: enrollments, error: enrollError } = await supabase
    .from('class_enrollments')
    .select('student_id, enrolled_at')
    .eq('class_id', classId)

  if (enrollError) {
    console.error('[getClassProgress] Error fetching enrollments:', enrollError)
    return { error: 'Failed to fetch class enrollments.' }
  }

  const studentIds = enrollments?.map(e => e.student_id) || []

  if (studentIds.length === 0) {
    return {
      data: {
        class: classData as Class,
        students: [],
        total_students: 0,
        average_completion: 0
      }
    }
  }

  // Get student emails from auth.users
  const { data: users, error: usersError } = await supabase.auth.admin.listUsers()

  if (usersError) {
    console.error('[getClassProgress] Error fetching users:', usersError)
    return { error: 'Failed to fetch student information.' }
  }

  const userMap = new Map(users.users.map(u => [u.id, u.email || 'Unknown']))

  // Get progress from prompt_lab_progress table
  const { data: progressData, error: progressError } = await supabase
    .from('prompt_lab_progress')
    .select('user_id, success, created_at')
    .in('user_id', studentIds)

  if (progressError) {
    console.error('[getClassProgress] Error fetching progress:', progressError)
    return { error: 'Failed to fetch student progress.' }
  }

  // Aggregate progress per student
  const studentProgressMap = new Map<string, {
    completed: number
    lastActivity: string | null
  }>()

  progressData?.forEach(p => {
    const current = studentProgressMap.get(p.user_id) || { completed: 0, lastActivity: null }

    if (p.success) {
      current.completed++
    }

    if (!current.lastActivity || new Date(p.created_at) > new Date(current.lastActivity)) {
      current.lastActivity = p.created_at
    }

    studentProgressMap.set(p.user_id, current)
  })

  // Build student progress array
  const students: StudentProgress[] = studentIds.map(studentId => {
    const progress = studentProgressMap.get(studentId) || { completed: 0, lastActivity: null }
    const totalLabs = 6

    return {
      student_id: studentId,
      email: userMap.get(studentId) || 'Unknown',
      labs_completed: progress.completed,
      total_labs: totalLabs,
      last_activity: progress.lastActivity,
      completion_percentage: calculateCompletionPercentage(progress.completed, totalLabs)
    }
  })

  // Calculate average completion
  const totalCompleted = students.reduce((sum, s) => sum + s.labs_completed, 0)
  const averageCompletion = Math.round((totalCompleted / (students.length * 6)) * 100)

  return {
    data: {
      class: classData as Class,
      students,
      total_students: students.length,
      average_completion: averageCompletion
    }
  }
}

/**
 * Delete a class (teacher only)
 */
export async function deleteClass(classId: string): Promise<{
  success: boolean
  error?: string
}> {
  const supabase = await getSupabaseServer()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'Not authenticated. Please log in.' }
  }

  const { error } = await supabase
    .from('classes')
    .delete()
    .eq('id', classId)
    .eq('teacher_id', user.id)

  if (error) {
    console.error('[deleteClass] Error:', error)
    return { success: false, error: 'Failed to delete class.' }
  }

  return { success: true }
}

/**
 * Remove a student from a class (teacher only)
 */
export async function removeStudentFromClass(classId: string, studentId: string): Promise<{
  success: boolean
  error?: string
}> {
  const supabase = await getSupabaseServer()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'Not authenticated. Please log in.' }
  }

  // Verify teacher owns this class
  const { data: classData } = await supabase
    .from('classes')
    .select('id')
    .eq('id', classId)
    .eq('teacher_id', user.id)
    .single()

  if (!classData) {
    return { success: false, error: 'Class not found or access denied.' }
  }

  // Remove enrollment
  const { error } = await supabase
    .from('class_enrollments')
    .delete()
    .eq('class_id', classId)
    .eq('student_id', studentId)

  if (error) {
    console.error('[removeStudentFromClass] Error:', error)
    return { success: false, error: 'Failed to remove student.' }
  }

  return { success: true }
}
