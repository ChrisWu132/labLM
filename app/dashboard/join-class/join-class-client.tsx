'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { joinClassWithCode } from '@/lib/actions/admin'
import { BookOpen, Check } from 'lucide-react'

interface JoinClassClientProps {
  userEmail: string
}

export function JoinClassClient({ userEmail }: JoinClassClientProps) {
  const router = useRouter()
  const [joinCode, setJoinCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState<{
    className: string
    teacherEmail: string
  } | null>(null)

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!joinCode.trim()) {
      setError('Please enter a class code')
      return
    }

    setIsLoading(true)

    const { data, error: joinError } = await joinClassWithCode(joinCode.trim())

    setIsLoading(false)

    if (joinError || !data) {
      setError(joinError || 'Failed to join class')
      return
    }

    setSuccess({
      className: data.class_name,
      teacherEmail: data.teacher_email
    })
  }

  const handleGoToDashboard = () => {
    router.push('/dashboard/vibecoding')
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="w-full max-w-md">
        <div className="bg-card border rounded-lg shadow-lg p-8">
          {!success ? (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Join a Class</h1>
                <p className="text-muted-foreground">
                  Enter the class code from your teacher
                </p>
              </div>

              <form onSubmit={handleJoin} className="space-y-4">
                <div>
                  <label htmlFor="joinCode" className="block text-sm font-medium mb-2">
                    Class Code
                  </label>
                  <input
                    id="joinCode"
                    type="text"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    placeholder="ABC-XYZ-2025"
                    className="w-full px-4 py-3 border rounded-lg text-center text-lg font-mono font-bold tracking-wider focus:outline-none focus:ring-2 focus:ring-primary uppercase"
                    maxLength={13}
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Example format: ABC-XYZ-2025
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Joining...' : 'Join Class'}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => router.push('/dashboard/vibecoding')}
                >
                  Cancel
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground text-center">
                  Signed in as: <span className="font-medium">{userEmail}</span>
                </p>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Successfully Joined!</h2>
              <p className="text-lg font-medium mb-1">{success.className}</p>
              <p className="text-sm text-muted-foreground mb-6">
                Teacher: {success.teacherEmail}
              </p>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mb-6">
                <p className="text-sm">
                  You&apos;re all set! Start learning with your AI study buddy.
                </p>
              </div>

              <Button onClick={handleGoToDashboard} className="w-full">
                Go to Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
