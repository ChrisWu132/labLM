'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Copy, Check, Download, Users } from 'lucide-react'
import type { ClassProgressData } from '@/types/admin'
import { formatLastActivity, generateProgressCSV } from '@/lib/admin-utils'

interface ClassDetailClientProps {
  classData: ClassProgressData
}

export function ClassDetailClient({ classData }: ClassDetailClientProps) {
  const router = useRouter()
  const [copied, setCopied] = useState(false)

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(classData.class.join_code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleExportCSV = () => {
    const csv = generateProgressCSV(classData.students.map(s => ({
      email: s.email,
      labs_completed: s.labs_completed,
      total_labs: s.total_labs,
      last_activity: s.last_activity
    })))

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${classData.class.name.replace(/\s+/g, '_')}_progress.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const sortedStudents = [...classData.students].sort((a, b) => {
    // Sort by completion percentage (descending), then by email
    if (b.completion_percentage !== a.completion_percentage) {
      return b.completion_percentage - a.completion_percentage
    }
    return a.email.localeCompare(b.email)
  })

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="px-6 py-4">
          <button
            onClick={() => router.push('/dashboard/teacher')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-3 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">{classData.class.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Code:</span>
                  <code className="px-2 py-1 bg-muted rounded font-mono text-primary font-semibold">
                    {classData.class.join_code}
                  </code>
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    onClick={handleCopyCode}
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <Button onClick={handleExportCSV} variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="px-6 py-3 bg-muted/50 border-t">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{classData.total_students} students enrolled</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div>
              Average Progress: <span className="font-medium text-primary">{classData.average_completion}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          {classData.students.length === 0 ? (
            <div className="border rounded-lg p-12 text-center bg-card">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No students yet</h3>
              <p className="text-muted-foreground mb-4">
                Share the class code with your students so they can join and start learning.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
                <span className="text-sm font-medium">Class Code:</span>
                <code className="text-lg font-mono font-bold text-primary">
                  {classData.class.join_code}
                </code>
                <Button
                  size="icon-sm"
                  variant="ghost"
                  onClick={handleCopyCode}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden bg-card">
              {/* Table Header */}
              <div className="bg-muted/30 border-b px-4 py-3 grid grid-cols-12 gap-4 text-sm font-medium">
                <div className="col-span-5">Student Email</div>
                <div className="col-span-3">Progress</div>
                <div className="col-span-2 text-center">Completed</div>
                <div className="col-span-2 text-right">Last Active</div>
              </div>

              {/* Table Body */}
              <div className="divide-y">
                {sortedStudents.map((student) => (
                  <div
                    key={student.student_id}
                    className="px-4 py-3 grid grid-cols-12 gap-4 items-center hover:bg-muted/30 transition-colors"
                  >
                    <div className="col-span-5 font-medium truncate">
                      {student.email}
                    </div>

                    <div className="col-span-3">
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${student.completion_percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {student.completion_percentage}%
                      </p>
                    </div>

                    <div className="col-span-2 text-center">
                      <span className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {student.labs_completed}/{student.total_labs}
                      </span>
                    </div>

                    <div className="col-span-2 text-right text-sm text-muted-foreground">
                      {formatLastActivity(student.last_activity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
