'use server'

import { getSupabaseServer } from '@/lib/supabase-server'
import { generateJoinCode, formatJoinCode, calculateCompletionPercentage } from '@/lib/admin-utils'
import type {
  Class,
  CreateClassResponse,
  ClassWithStats,
  ClassProgressData,
  StudentProgress,
  ClassProgressDetailed,
  StudentProgressDetailed,
  LabProgress,
  ExerciseProgress,
  LabStatistics
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

/**
 * Lab metadata - names and exercise counts
 */
const LAB_METADATA = [
  { number: 1, name: '什么是 Prompt', exercises: 3 },
  { number: 2, name: '如何给清晰指令', exercises: 3 },
  { number: 3, name: '角色扮演技巧', exercises: 3 },
  { number: 4, name: '引导思考', exercises: 3 },
  { number: 5, name: '综合应用挑战', exercises: 3 },
  { number: 6, name: 'Workflow Builder', exercises: 3 }
]

/**
 * Get detailed class progress with lab and exercise breakdown
 */
export async function getClassProgressDetailed(classId: string): Promise<{
  data?: ClassProgressDetailed
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
    .select('student_id')
    .eq('class_id', classId)

  if (enrollError) {
    console.error('[getClassProgressDetailed] Error fetching enrollments:', enrollError)
    return { error: 'Failed to fetch class enrollments.' }
  }

  const studentIds = enrollments?.map(e => e.student_id) || []

  if (studentIds.length === 0) {
    return {
      data: {
        class: classData as Class,
        students: [],
        total_students: 0,
        average_completion: 0,
        at_risk_students: 0,
        lab_statistics: []
      }
    }
  }

  // Get student emails
  const { data: users, error: usersError } = await supabase.auth.admin.listUsers()
  if (usersError) {
    console.error('[getClassProgressDetailed] Error fetching users:', usersError)
    return { error: 'Failed to fetch student information.' }
  }
  const userMap = new Map(users.users.map(u => [u.id, u.email || 'Unknown']))

  // Get all exercise progress for these students
  const { data: progressData, error: progressError } = await supabase
    .from('prompt_lab_progress')
    .select('*')
    .in('user_id', studentIds)
    .order('created_at', { ascending: true })

  if (progressError) {
    console.error('[getClassProgressDetailed] Error fetching progress:', progressError)
    return { error: 'Failed to fetch student progress.' }
  }

  // Build detailed student progress
  const students: StudentProgressDetailed[] = studentIds.map(studentId => {
    const studentProgress = progressData?.filter(p => p.user_id === studentId) || []

    // Group by lab
    const labsMap = new Map<number, ExerciseProgress[]>()
    studentProgress.forEach(p => {
      if (!labsMap.has(p.lab_number)) {
        labsMap.set(p.lab_number, [])
      }
      labsMap.get(p.lab_number)!.push({
        exercise_id: p.exercise_id,
        lab_number: p.lab_number,
        success: p.success,
        attempts: p.attempts || 1,
        created_at: p.created_at,
        completed_at: p.completed_at,
        prompt_submitted: p.prompt_submitted,
        llm_response: p.llm_response
      })
    })

    // Build lab progress
    const labs: LabProgress[] = LAB_METADATA.map(labMeta => {
      const exercises = labsMap.get(labMeta.number) || []
      const completedCount = exercises.filter(e => e.success).length
      const totalAttempts = exercises.reduce((sum, e) => sum + e.attempts, 0)

      // Determine status
      let status: LabProgress['status'] = 'not_started'
      if (exercises.length === 0) {
        // Check if previous lab is complete (locked logic)
        if (labMeta.number > 1) {
          const prevLab = labsMap.get(labMeta.number - 1)
          const prevComplete = prevLab && prevLab.filter(e => e.success).length === LAB_METADATA[labMeta.number - 2].exercises
          status = prevComplete ? 'not_started' : 'locked'
        } else {
          status = 'not_started'
        }
      } else if (completedCount === labMeta.exercises) {
        status = 'completed'
      } else if (exercises.some(e => e.attempts >= 5 && !e.success)) {
        status = 'stuck'
      } else {
        status = 'in_progress'
      }

      // Calculate time spent (rough estimate based on timestamps)
      let timeSpent: number | null = null
      if (exercises.length > 0) {
        const sorted = [...exercises].sort((a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
        const first = new Date(sorted[0].created_at)
        const last = sorted[sorted.length - 1].completed_at
          ? new Date(sorted[sorted.length - 1].completed_at!)
          : new Date(sorted[sorted.length - 1].created_at)
        timeSpent = Math.round((last.getTime() - first.getTime()) / (1000 * 60))
      }

      const completedAt = completedCount === labMeta.exercises
        ? exercises.reduce((latest, e) => {
            if (!e.completed_at) return latest
            if (!latest) return e.completed_at
            return new Date(e.completed_at) > new Date(latest) ? e.completed_at : latest
          }, null as string | null)
        : null

      return {
        lab_number: labMeta.number,
        lab_name: labMeta.name,
        status,
        exercises,
        completed_exercises: completedCount,
        total_exercises: labMeta.exercises,
        total_attempts: totalAttempts,
        time_spent_minutes: timeSpent,
        completed_at: completedAt
      }
    })

    const labsCompleted = labs.filter(l => l.status === 'completed').length
    const lastActivity = studentProgress.length > 0
      ? studentProgress.reduce((latest, p) => {
          return !latest || new Date(p.created_at) > new Date(latest) ? p.created_at : latest
        }, null as string | null)
      : null

    // Check if at risk
    const isAtRisk = lastActivity
      ? (Date.now() - new Date(lastActivity).getTime()) > 7 * 24 * 60 * 60 * 1000
      : true

    const stuckExercises = studentProgress.filter(p => p.attempts >= 5 && !p.success).length

    return {
      student_id: studentId,
      email: userMap.get(studentId) || 'Unknown',
      labs,
      labs_completed: labsCompleted,
      total_labs: 6,
      last_activity: lastActivity,
      completion_percentage: Math.round((labsCompleted / 6) * 100),
      is_at_risk: isAtRisk || stuckExercises > 0,
      stuck_exercises: stuckExercises
    }
  })

  // Calculate class-level statistics
  const totalCompleted = students.reduce((sum, s) => sum + s.labs_completed, 0)
  const averageCompletion = Math.round((totalCompleted / (students.length * 6)) * 100)
  const atRiskCount = students.filter(s => s.is_at_risk).length

  // Calculate lab statistics
  const labStatistics: LabStatistics[] = LAB_METADATA.map(labMeta => {
    const studentsForLab = students.map(s => s.labs.find(l => l.lab_number === labMeta.number)!)

    const completed = studentsForLab.filter(l => l.status === 'completed').length
    const inProgress = studentsForLab.filter(l => l.status === 'in_progress').length
    const stuck = studentsForLab.filter(l => l.status === 'stuck').length
    const notStarted = studentsForLab.filter(l => l.status === 'not_started' || l.status === 'locked').length

    const avgAttempts = studentsForLab.reduce((sum, l) => sum + l.total_attempts, 0) / students.length
    const avgTime = studentsForLab
      .filter(l => l.time_spent_minutes !== null)
      .reduce((sum, l) => sum + (l.time_spent_minutes || 0), 0) / students.length

    // Exercise-level stats
    const exerciseStats = Array.from({ length: labMeta.exercises }, (_, i) => {
      const exerciseId = `lab${labMeta.number}-ex${i + 1}`
      const exerciseData = studentsForLab
        .flatMap(l => l.exercises)
        .filter(e => e.exercise_id === exerciseId)

      const completionRate = (exerciseData.filter(e => e.success).length / students.length) * 100
      const avgExAttempts = exerciseData.reduce((sum, e) => sum + e.attempts, 0) / students.length

      return {
        exercise_id: exerciseId,
        completion_rate: Math.round(completionRate),
        average_attempts: Math.round(avgExAttempts * 10) / 10,
        average_time_minutes: null // We don't track per-exercise time
      }
    })

    return {
      lab_number: labMeta.number,
      lab_name: labMeta.name,
      completed_students: completed,
      in_progress_students: inProgress,
      stuck_students: stuck,
      not_started_students: notStarted,
      total_students: students.length,
      completion_rate: Math.round((completed / students.length) * 100),
      average_attempts: Math.round(avgAttempts * 10) / 10,
      average_time_minutes: avgTime > 0 ? Math.round(avgTime) : null,
      exercises: exerciseStats
    }
  })

  return {
    data: {
      class: classData as Class,
      students,
      total_students: students.length,
      average_completion: averageCompletion,
      at_risk_students: atRiskCount,
      lab_statistics: labStatistics
    }
  }
}

/**
 * Get detailed progress for a single student
 */
export async function getStudentProgress(classId: string, studentId: string): Promise<{
  data?: StudentProgressDetailed
  error?: string
}> {
  const supabase = await getSupabaseServer()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: 'Not authenticated. Please log in.' }
  }

  // Verify teacher owns this class and student is enrolled
  const { data: classData } = await supabase
    .from('classes')
    .select('*')
    .eq('id', classId)
    .eq('teacher_id', user.id)
    .single()

  if (!classData) {
    return { error: 'Class not found or access denied.' }
  }

  const { data: enrollment } = await supabase
    .from('class_enrollments')
    .select('*')
    .eq('class_id', classId)
    .eq('student_id', studentId)
    .single()

  if (!enrollment) {
    return { error: 'Student not found in this class.' }
  }

  // Get student email
  const { data: userData } = await supabase.auth.admin.getUserById(studentId)
  const email = userData.user?.email || 'Unknown'

  // Get all progress for this student
  const { data: progressData } = await supabase
    .from('prompt_lab_progress')
    .select('*')
    .eq('user_id', studentId)
    .order('created_at', { ascending: true })

  // Build detailed progress (same logic as above, but for single student)
  const labsMap = new Map<number, ExerciseProgress[]>()
  progressData?.forEach(p => {
    if (!labsMap.has(p.lab_number)) {
      labsMap.set(p.lab_number, [])
    }
    labsMap.get(p.lab_number)!.push({
      exercise_id: p.exercise_id,
      lab_number: p.lab_number,
      success: p.success,
      attempts: p.attempts || 1,
      created_at: p.created_at,
      completed_at: p.completed_at,
      prompt_submitted: p.prompt_submitted,
      llm_response: p.llm_response
    })
  })

  const labs: LabProgress[] = LAB_METADATA.map(labMeta => {
    const exercises = labsMap.get(labMeta.number) || []
    const completedCount = exercises.filter(e => e.success).length
    const totalAttempts = exercises.reduce((sum, e) => sum + e.attempts, 0)

    let status: LabProgress['status'] = 'not_started'
    if (exercises.length === 0) {
      if (labMeta.number > 1) {
        const prevLab = labsMap.get(labMeta.number - 1)
        const prevComplete = prevLab && prevLab.filter(e => e.success).length === LAB_METADATA[labMeta.number - 2].exercises
        status = prevComplete ? 'not_started' : 'locked'
      } else {
        status = 'not_started'
      }
    } else if (completedCount === labMeta.exercises) {
      status = 'completed'
    } else if (exercises.some(e => e.attempts >= 5 && !e.success)) {
      status = 'stuck'
    } else {
      status = 'in_progress'
    }

    let timeSpent: number | null = null
    if (exercises.length > 0) {
      const sorted = [...exercises].sort((a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      const first = new Date(sorted[0].created_at)
      const last = sorted[sorted.length - 1].completed_at
        ? new Date(sorted[sorted.length - 1].completed_at!)
        : new Date(sorted[sorted.length - 1].created_at)
      timeSpent = Math.round((last.getTime() - first.getTime()) / (1000 * 60))
    }

    const completedAt = completedCount === labMeta.exercises
      ? exercises.reduce((latest, e) => {
          if (!e.completed_at) return latest
          if (!latest) return e.completed_at
          return new Date(e.completed_at) > new Date(latest) ? e.completed_at : latest
        }, null as string | null)
      : null

    return {
      lab_number: labMeta.number,
      lab_name: labMeta.name,
      status,
      exercises,
      completed_exercises: completedCount,
      total_exercises: labMeta.exercises,
      total_attempts: totalAttempts,
      time_spent_minutes: timeSpent,
      completed_at: completedAt
    }
  })

  const labsCompleted = labs.filter(l => l.status === 'completed').length
  const lastActivity = progressData && progressData.length > 0
    ? progressData.reduce((latest, p) => {
        return !latest || new Date(p.created_at) > new Date(latest) ? p.created_at : latest
      }, null as string | null)
    : null

  const isAtRisk = lastActivity
    ? (Date.now() - new Date(lastActivity).getTime()) > 7 * 24 * 60 * 60 * 1000
    : true

  const stuckExercises = progressData?.filter(p => p.attempts >= 5 && !p.success).length || 0

  return {
    data: {
      student_id: studentId,
      email,
      labs,
      labs_completed: labsCompleted,
      total_labs: 6,
      last_activity: lastActivity,
      completion_percentage: Math.round((labsCompleted / 6) * 100),
      is_at_risk: isAtRisk || stuckExercises > 0,
      stuck_exercises: stuckExercises
    }
  }
}
