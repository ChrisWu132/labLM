'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Users, CheckCircle2, Clock, AlertCircle, Circle, TrendingUp } from 'lucide-react'
import type { LabStatistics, StudentProgressDetailed, LabProgress } from '@/types/admin'

interface LabStatisticsClientProps {
  labStats: LabStatistics
  students: Array<StudentProgressDetailed & { labProgress: LabProgress }>
  classId: string
}

export function LabStatisticsClient({ labStats, students, classId }: LabStatisticsClientProps) {
  const router = useRouter()

  const stuckStudents = students.filter(s => s.labProgress.status === 'stuck')
  const completionRate = labStats.completion_rate

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="px-6 py-4">
          <button
            onClick={() => router.push(`/dashboard/teacher?class=${classId}`)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-3 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Class
          </button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                Lab {labStats.lab_number}: {labStats.lab_name}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Class-wide statistics and performance</p>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="px-6 py-4 bg-muted/50 border-t">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{labStats.completed_students}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{labStats.in_progress_students}</div>
              <div className="text-xs text-muted-foreground">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{labStats.stuck_students}</div>
              <div className="text-xs text-muted-foreground">Stuck</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-500">{labStats.not_started_students}</div>
              <div className="text-xs text-muted-foreground">Not Started</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{completionRate}%</div>
              <div className="text-xs text-muted-foreground">Completion Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Exercise Breakdown */}
          <div className="border rounded-lg overflow-hidden bg-card">
            <div className="bg-muted/30 border-b px-4 py-3">
              <h2 className="font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Exercise Breakdown
              </h2>
            </div>
            <div className="p-4">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="p-3 font-medium">Exercise</th>
                    <th className="p-3 font-medium text-center">Completion Rate</th>
                    <th className="p-3 font-medium text-center">Avg Attempts</th>
                    <th className="p-3 font-medium">Progress Bar</th>
                  </tr>
                </thead>
                <tbody>
                  {labStats.exercises.map((exercise, idx) => (
                    <tr key={exercise.exercise_id} className="border-b last:border-0">
                      <td className="p-3">Exercise {idx + 1}</td>
                      <td className="p-3 text-center">
                        <span
                          className={`font-medium ${
                            exercise.completion_rate >= 75
                              ? 'text-green-600'
                              : exercise.completion_rate >= 50
                              ? 'text-yellow-600'
                              : 'text-red-600'
                          }`}
                        >
                          {exercise.completion_rate}%
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={`${
                            exercise.average_attempts > 3 ? 'text-red-600 font-medium' : 'text-muted-foreground'
                          }`}
                        >
                          {exercise.average_attempts.toFixed(1)}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              exercise.completion_rate >= 75
                                ? 'bg-green-500'
                                : exercise.completion_rate >= 50
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${exercise.completion_rate}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {labStats.average_attempts !== null && labStats.average_time_minutes !== null && (
                <div className="mt-4 pt-4 border-t flex items-center justify-around text-sm">
                  <div className="text-center">
                    <div className="font-medium">Overall Avg Attempts</div>
                    <div className="text-2xl font-bold text-primary mt-1">{labStats.average_attempts.toFixed(1)}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">Avg Time Spent</div>
                    <div className="text-2xl font-bold text-primary mt-1">{labStats.average_time_minutes}m</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Students Needing Attention */}
          {stuckStudents.length > 0 && (
            <div className="border rounded-lg overflow-hidden bg-card">
              <div className="bg-red-50 dark:bg-red-950/20 border-b px-4 py-3">
                <h2 className="font-semibold flex items-center gap-2 text-red-700 dark:text-red-400">
                  <AlertCircle className="h-5 w-5" />
                  Students Stuck on This Lab ({stuckStudents.length})
                </h2>
              </div>
              <div className="divide-y">
                {stuckStudents.map((student) => {
                  const stuckExercises = student.labProgress.exercises.filter(
                    e => !e.success && e.attempts >= 5
                  )
                  return (
                    <div
                      key={student.student_id}
                      className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => router.push(`/dashboard/teacher/students/${student.student_id}?class=${classId}`)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{student.email}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Stuck on {stuckExercises.length} {stuckExercises.length === 1 ? 'exercise' : 'exercises'}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {stuckExercises.map((exercise) => (
                              <span
                                key={exercise.exercise_id}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 text-xs"
                              >
                                Exercise {exercise.exercise_id.split('-')[1]} ({exercise.attempts} attempts)
                              </span>
                            ))}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          View Details →
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* All Students Status */}
          <div className="border rounded-lg overflow-hidden bg-card">
            <div className="bg-muted/30 border-b px-4 py-3">
              <h2 className="font-semibold flex items-center gap-2">
                <Users className="h-5 w-5" />
                All Students ({labStats.total_students})
              </h2>
            </div>
            <div className="divide-y">
              {students
                .sort((a, b) => {
                  // Sort: stuck first, then by progress
                  const statusOrder = { stuck: 0, in_progress: 1, not_started: 2, locked: 3, completed: 4 }
                  return statusOrder[a.labProgress.status] - statusOrder[b.labProgress.status]
                })
                .map((student) => {
                  const labProgress = student.labProgress
                  const getStatusIcon = () => {
                    switch (labProgress.status) {
                      case 'completed':
                        return <CheckCircle2 className="h-5 w-5 text-green-600" />
                      case 'in_progress':
                        return <Clock className="h-5 w-5 text-yellow-600" />
                      case 'stuck':
                        return <AlertCircle className="h-5 w-5 text-red-600" />
                      default:
                        return <Circle className="h-5 w-5 text-gray-400" />
                    }
                  }

                  return (
                    <div
                      key={student.student_id}
                      className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => router.push(`/dashboard/teacher/students/${student.student_id}?class=${classId}`)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon()}
                          <div>
                            <p className="font-medium">{student.email}</p>
                            <p className="text-sm text-muted-foreground">
                              {labProgress.completed_exercises}/{labProgress.total_exercises} exercises
                              {labProgress.total_attempts > 0 && (
                                <span className="ml-2">• {labProgress.total_attempts} total attempts</span>
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground capitalize">{labProgress.status}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
