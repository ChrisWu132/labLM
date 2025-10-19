'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Plus, Users, BookOpen, TrendingUp } from 'lucide-react'
import type { ClassWithStats } from '@/types/admin'
import { CreateClassDialog } from './components/create-class-dialog'

interface TeacherDashboardClientProps {
  classes: ClassWithStats[]
  userEmail: string
}

export function TeacherDashboardClient({ classes, userEmail }: TeacherDashboardClientProps) {
  const router = useRouter()
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  const totalStudents = classes.reduce((sum, c) => sum + c.student_count, 0)
  const activeStudents = classes.reduce((sum, c) => sum + c.active_students, 0)
  const avgProgress = classes.length > 0
    ? Math.round(classes.reduce((sum, c) => sum + c.average_progress, 0) / classes.length)
    : 0

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {userEmail}</p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create New Class
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalStudents}</p>
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
                  <p className="text-2xl font-bold">{activeStudents}</p>
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
                  <p className="text-2xl font-bold">{avgProgress}%</p>
                  <p className="text-sm text-muted-foreground">Average Progress</p>
                </div>
              </div>
            </div>
          </div>

          {/* My Classes */}
          <div>
            <h2 className="text-xl font-bold mb-4">My Classes ({classes.length})</h2>

            {classes.length === 0 ? (
              <div className="border rounded-lg p-12 text-center bg-card">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No classes yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first class to get started with VibeCode Study.
                </p>
                <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create New Class
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {classes.map((classItem) => (
                  <div
                    key={classItem.id}
                    className="border rounded-lg p-4 bg-card hover:border-primary/40 transition-colors cursor-pointer"
                    onClick={() => router.push(`/dashboard/teacher/classes/${classItem.id}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{classItem.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Code: {classItem.join_code}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{classItem.average_progress}%</p>
                        <p className="text-xs text-muted-foreground">avg progress</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{classItem.student_count} students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{classItem.active_students} active this week</span>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full mt-3"
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/dashboard/teacher/classes/${classItem.id}`)
                      }}
                    >
                      View Details →
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Class Dialog */}
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
