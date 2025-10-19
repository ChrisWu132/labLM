'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Users, BookOpen, TrendingUp, AlertTriangle, ChevronDown, Settings } from 'lucide-react'
import type { ClassWithStats, ClassProgressDetailed } from '@/types/admin'
import { CreateClassDialog } from './components/create-class-dialog'
import { formatLastActivity } from '@/lib/admin-utils'

interface TeacherDashboardClientProps {
  classes: ClassWithStats[]
  userEmail: string
  selectedClassId: string | null
  detailedProgress: ClassProgressDetailed | null
}

const LAB_NAMES = [
  'Lab 1',
  'Lab 2',
  'Lab 3',
  'Lab 4',
  'Lab 5',
  'Lab 6'
]

const getStatusIcon = (status: 'completed' | 'in_progress' | 'stuck' | 'not_started' | 'locked') => {
  switch (status) {
    case 'completed':
      return '✓'
    case 'in_progress':
      return '⚠️'
    case 'stuck':
      return '❌'
    case 'locked':
      return '🔒'
    case 'not_started':
    default:
      return '○'
  }
}

const getStatusColor = (status: 'completed' | 'in_progress' | 'stuck' | 'not_started' | 'locked') => {
  switch (status) {
    case 'completed':
      return 'text-green-600'
    case 'in_progress':
      return 'text-yellow-600'
    case 'stuck':
      return 'text-red-600'
    case 'locked':
      return 'text-gray-400'
    case 'not_started':
    default:
      return 'text-gray-300'
  }
}

export function TeacherDashboardClient({
  classes,
  userEmail,
  selectedClassId,
  detailedProgress
}: TeacherDashboardClientProps) {
  const router = useRouter()
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  // Select first class by default if none selected
  const currentClassId = selectedClassId || classes[0]?.id || null
  const currentClass = classes.find(c => c.id === currentClassId)

  const handleClassChange = (classId: string) => {
    router.push(`/dashboard/teacher?class=${classId}`)
    router.refresh()
  }

  const handleStudentClick = (studentId: string) => {
    router.push(`/dashboard/teacher/students/${studentId}?class=${currentClassId}`)
  }

  const handleLabHeaderClick = (labNumber: number) => {
    router.push(`/dashboard/teacher/labs/${labNumber}?class=${currentClassId}`)
  }

  if (classes.length === 0) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-6">
        <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">No classes yet</h3>
        <p className="text-muted-foreground mb-6 text-center max-w-md">
          Create your first class to get started with VibeCode Study and track your students' progress.
        </p>
        <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
          Create First Class
        </Button>
        <CreateClassDialog
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
          onSuccess={() => {
            setShowCreateDialog(false)
            router.refresh()
          }}
        />
      </div>
    )
  }

  if (!detailedProgress) {
    return <div className="flex items-center justify-center h-full">Loading...</div>
  }

  const { students, total_students, average_completion, at_risk_students } = detailedProgress

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Teacher Panel</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {userEmail}</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Class Selector */}
              <div className="relative">
                <select
                  value={currentClassId || ''}
                  onChange={(e) => handleClassChange(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 border rounded-lg bg-background font-medium hover:border-primary transition-colors cursor-pointer"
                >
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>

              {/* Settings Menu */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings className="h-4 w-4" />
                </Button>
                {showSettings && (
                  <div className="absolute right-0 mt-2 w-48 bg-background border rounded-lg shadow-lg p-2 z-50">
                    <button
                      onClick={() => {
                        setShowSettings(false)
                        setShowCreateDialog(true)
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-accent rounded text-sm"
                    >
                      Create New Class
                    </button>
                    <button
                      onClick={() => router.push('/dashboard/teacher/settings')}
                      className="w-full text-left px-3 py-2 hover:bg-accent rounded text-sm"
                    >
                      Settings
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{total_students}</p>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{currentClass?.active_students || 0}</p>
                  <p className="text-sm text-muted-foreground">Active This Week</p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{average_completion}%</p>
                  <p className="text-sm text-muted-foreground">Avg Progress</p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{at_risk_students}</p>
                  <p className="text-sm text-muted-foreground">At Risk</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Student Lab Progress Matrix */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-full mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Student Lab Progress</h2>
            <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/teacher/export?class=${currentClassId}`)}>
              Export CSV
            </Button>
          </div>

          {students.length === 0 ? (
            <div className="border rounded-lg p-12 text-center bg-card">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No students yet</h3>
              <p className="text-muted-foreground">
                Share the class code <strong>{currentClass?.join_code}</strong> with your students to get started.
              </p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-auto bg-card">
              <table className="w-full">
                <thead className="bg-muted/30 sticky top-0 z-10">
                  <tr>
                    <th className="text-left p-3 font-medium border-r w-64">Student</th>
                    {LAB_NAMES.map((name, idx) => (
                      <th
                        key={idx}
                        className="text-center p-3 font-medium border-r cursor-pointer hover:bg-muted transition-colors"
                        onClick={() => handleLabHeaderClick(idx + 1)}
                        title={`Click to view ${name} statistics`}
                      >
                        {name}
                      </th>
                    ))}
                    <th className="text-center p-3 font-medium border-r">Total</th>
                    <th className="text-left p-3 font-medium">Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {students
                    .sort((a, b) => {
                      // Sort: at-risk first, then by completion percentage desc
                      if (a.is_at_risk && !b.is_at_risk) return -1
                      if (!a.is_at_risk && b.is_at_risk) return 1
                      return b.completion_percentage - a.completion_percentage
                    })
                    .map((student) => (
                      <tr
                        key={student.student_id}
                        className={`hover:bg-muted/50 transition-colors cursor-pointer ${
                          student.is_at_risk ? 'bg-red-50 dark:bg-red-950/20' : ''
                        }`}
                        onClick={() => handleStudentClick(student.student_id)}
                      >
                        <td className="p-3 border-r border-t">
                          <div className="flex items-center gap-2">
                            <span className="font-medium truncate">{student.email}</span>
                            {student.is_at_risk && (
                              <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" title="At risk" />
                            )}
                          </div>
                        </td>
                        {student.labs.map((lab, idx) => (
                          <td key={idx} className="text-center p-3 border-r border-t">
                            <span
                              className={`text-xl ${getStatusColor(lab.status)}`}
                              title={`${lab.lab_name}: ${lab.status} (${lab.completed_exercises}/${lab.total_exercises} exercises)`}
                            >
                              {getStatusIcon(lab.status)}
                            </span>
                          </td>
                        ))}
                        <td className="text-center p-3 border-r border-t">
                          <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                            {student.labs_completed}/{student.total_labs}
                          </span>
                        </td>
                        <td className="p-3 border-t text-sm text-muted-foreground">
                          {student.last_activity ? formatLastActivity(student.last_activity) : 'Never'}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {/* Legend */}
              <div className="px-4 py-3 bg-muted/20 border-t text-sm text-muted-foreground flex items-center gap-4 flex-wrap">
                <span className="font-medium">Legend:</span>
                <span>✓ Completed</span>
                <span>⚠️ In Progress</span>
                <span>❌ Stuck</span>
                <span>○ Not Started</span>
                <span>🔒 Locked</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Class Dialog */}
      <CreateClassDialog
        open={showCreateDialog}
        onOpenChange={(open) => {
          setShowCreateDialog(open)
          if (!open) setShowSettings(false)
        }}
        onSuccess={() => {
          setShowCreateDialog(false)
          setShowSettings(false)
          router.refresh()
        }}
      />
    </div>
  )
}
