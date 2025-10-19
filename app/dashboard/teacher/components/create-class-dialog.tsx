'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { createClass } from '@/lib/actions/admin'
import { X, Copy, Check } from 'lucide-react'
import { getCurrentSchoolYear } from '@/lib/admin-utils'

interface CreateClassDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function CreateClassDialog({ open, onOpenChange, onSuccess }: CreateClassDialogProps) {
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [name, setName] = useState('')
  const [period, setPeriod] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [joinCode, setJoinCode] = useState('')
  const [copied, setCopied] = useState(false)

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep('form')
        setName('')
        setPeriod('')
        setError('')
        setJoinCode('')
        setCopied(false)
      }, 200) // Wait for close animation
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Class name is required')
      return
    }

    setIsLoading(true)

    // Combine name with period if provided
    const fullName = period ? `${name} - ${period}` : name

    const { data, error: createError } = await createClass(fullName)

    setIsLoading(false)

    if (createError || !data) {
      setError(createError || 'Failed to create class')
      return
    }

    setJoinCode(data.join_code)
    setStep('success')
  }

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(joinCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClose = () => {
    if (step === 'success') {
      onSuccess()
    }
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-background border rounded-lg shadow-lg w-full max-w-md mx-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {step === 'form' ? 'Create New Class' : '✓ Class Created!'}
          </h2>
          <button
            onClick={handleClose}
            className="h-8 w-8 rounded-full hover:bg-accent flex items-center justify-center transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="className" className="block text-sm font-medium mb-2">
                  Class Name *
                </label>
                <input
                  id="className"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., 7th Grade Math"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="period" className="block text-sm font-medium mb-2">
                  Period/Section (Optional)
                </label>
                <input
                  id="period"
                  type="text"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  placeholder="e.g., Period 3"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  School Year
                </label>
                <input
                  type="text"
                  value={getCurrentSchoolYear()}
                  disabled
                  className="w-full px-3 py-2 border rounded-lg bg-muted text-muted-foreground"
                />
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isLoading}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? 'Creating...' : 'Create Class'}
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-muted-foreground mb-6">
                  Your class has been created successfully. Share this code with your students.
                </p>

                <div className="border-2 border-dashed rounded-lg p-6 bg-primary/5">
                  <p className="text-sm font-medium mb-2">Class Join Code:</p>
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-3xl font-bold text-primary tracking-wider">
                      {joinCode}
                    </p>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={handleCopyCode}
                      className="h-10 w-10"
                    >
                      {copied ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Next Steps:</p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Share the join code with your students</li>
                  <li>• Students create accounts and enter the code</li>
                  <li>• Track their progress from the class dashboard</li>
                </ul>
              </div>

              <Button
                onClick={handleClose}
                className="w-full"
              >
                Go to Class Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
