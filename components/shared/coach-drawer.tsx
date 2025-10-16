"use client"

import type React from "react"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, Loader2, MessageSquare, BookOpen } from "lucide-react"
import { askCoach } from "@/lib/actions/coach"
import { useToast } from "@/hooks/use-toast"

interface CoachDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentModule: number
  currentLabTitle?: string
  currentLabNumber?: number
}

export function CoachDrawer({ open, onOpenChange, currentModule, currentLabTitle, currentLabNumber }: CoachDrawerProps) {
  const { toast } = useToast()
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [response, setResponse] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setIsSubmitting(true)
    setResponse(null)

    try {
      const result = await askCoach({
        userMessage: message,
        context: "Prompt Lab",
        moduleNumber: currentModule,
        additionalContext: { labNumber: currentLabNumber },
      })

      if (result.success && result.message) {
        setResponse(result.message)
        setMessage("")
        toast({
          title: "Coach responded",
          description: `Response time: ${result.latencyMs}ms`,
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to get coach response. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get coach response. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Ask Coach
          </SheetTitle>
          <SheetDescription>Get personalized guidance and feedback</SheetDescription>
        </SheetHeader>

        {/* Current Context Display */}
        {currentLabTitle && (
          <div className="mt-4 p-3 bg-primary/5 border border-primary/10 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="w-4 h-4 text-primary" />
              <div>
                <p className="font-medium text-primary">Current Lab</p>
                <p className="text-muted-foreground text-xs">{currentLabTitle}</p>
              </div>
            </div>
          </div>
        )}

        {/* Ask Coach Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">Your Question</Label>
            <Textarea
              id="message"
              placeholder="Ask your coach anything about this lab..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              disabled={isSubmitting}
              className="resize-none"
            />
          </div>

          <Button type="submit" disabled={isSubmitting || !message.trim()} className="w-full gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Asking Coach...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Ask Coach
              </>
            )}
          </Button>
        </form>

        {/* Coach Response */}
        {response && (
          <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-lg space-y-2">
            <p className="text-sm font-medium text-primary">Coach Response:</p>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
