'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle2, AlertCircle, Circle, Lock, Clock, Hash } from 'lucide-react'
import type { StudentProgressDetailed } from '@/types/admin'
import { formatLastActivity } from '@/lib/admin-utils'

interface StudentDetailClientProps {
  studentProgress: StudentProgressDetailed
  classId: string
}

const getStatusBadge = (status: 'completed' | 'in_progress' | 'stuck' | 'not_started' | 'locked') => {
  switch (status) {
    case 'completed':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
          <CheckCircle2 className="h-4 w-4" />
          Completed
        </span>
      )
    case 'in_progress':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
          <Clock className="h-4 w-4" />
          In Progress
        </span>
      )
    case 'stuck':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
          <AlertCircle className="h-4 w-4" />
          Stuck
        </span>
      )
    case 'locked':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-500 text-sm font-medium">
          <Lock className="h-4 w-4" />
          Locked
        </span>
      )
    case 'not_started':
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
          <Circle className="h-4 w-4" />
          Not Started
        </span>
      )
  }
}

export function StudentDetailClient({ studentProgress, classId }: StudentDetailClientProps) {
  const router = useRouter()

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
              <h1 className="text-2xl font-bold">{studentProgress.email}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Last active: {studentProgress.last_activity ? formatLastActivity(studentProgress.last_activity) : 'Never'}
              </p>
            </div>
            {studentProgress.is_at_risk && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                <AlertCircle className="h-4 w-4" />
                At Risk
              </span>
            )}
          </div>

          {/* Overall Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                {studentProgress.labs_completed}/{studentProgress.total_labs} labs ({studentProgress.completion_percentage}%)
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${studentProgress.completion_percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content - Lab Progress */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {studentProgress.labs.map((lab) => (
            <div key={lab.lab_number} className="border rounded-lg overflow-hidden bg-card">
              {/* Lab Header */}
              <div className="bg-muted/30 border-b px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">
                    Lab {lab.lab_number}: {lab.lab_name}
                  </h3>
                  {getStatusBadge(lab.status)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {lab.completed_exercises}/{lab.total_exercises} exercises
                  {lab.time_spent_minutes !== null && (
                    <span className="ml-3">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {lab.time_spent_minutes}m
                    </span>
                  )}
                </div>
              </div>

              {/* Exercise List */}
              <div className="divide-y">
                {lab.exercises.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    {lab.status === 'locked' ? (
                      <>
                        <Lock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p>Complete previous lab to unlock</p>
                      </>
                    ) : (
                      <>
                        <Circle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p>No exercises attempted yet</p>
                      </>
                    )}
                  </div>
                ) : (
                  lab.exercises.map((exercise) => (
                    <div key={exercise.exercise_id} className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {exercise.success ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                          ) : exercise.attempts >= 5 ? (
                            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                          ) : (
                            <Clock className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                          )}
                          <div>
                            <p className="font-medium">Exercise {exercise.exercise_id.split('-')[1]}</p>
                            <p className="text-xs text-muted-foreground">
                              {exercise.success
                                ? `Completed ${new Date(exercise.completed_at!).toLocaleDateString()}`
                                : `Last attempt ${new Date(exercise.created_at).toLocaleDateString()}`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Hash className="h-3 w-3" />
                            {exercise.attempts} {exercise.attempts === 1 ? 'attempt' : 'attempts'}
                          </span>
                        </div>
                      </div>

                      {/* Show latest prompt and response */}
                      <div className="mt-3 space-y-2">
                        <details className="group">
                          <summary className="cursor-pointer text-sm font-medium text-primary hover:underline">
                            View submission
                          </summary>
                          <div className="mt-2 space-y-2">
                            <div className="p-3 bg-muted/50 rounded">
                              <p className="text-xs font-medium text-muted-foreground mb-1">Student Prompt:</p>
                              <p className="text-sm">{exercise.prompt_submitted}</p>
                            </div>
                            <div className="p-3 bg-muted/50 rounded">
                              <p className="text-xs font-medium text-muted-foreground mb-1">LLM Response:</p>
                              <p className="text-sm whitespace-pre-wrap">{exercise.llm_response}</p>
                            </div>
                          </div>
                        </details>
                      </div>

                      {!exercise.success && exercise.attempts >= 5 && (
                        <div className="mt-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-red-700 dark:text-red-400">
                            <p className="font-medium">Student is stuck</p>
                            <p className="text-xs">Failed {exercise.attempts} times - may need assistance</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {lab.completed_at && (
                <div className="px-4 py-2 bg-green-50 dark:bg-green-950/20 border-t text-sm text-green-700 dark:text-green-400">
                  ✓ Completed on {new Date(lab.completed_at).toLocaleDateString()} at{' '}
                  {new Date(lab.completed_at).toLocaleTimeString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
