"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, Loader2, MessageSquare } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useFloatingCoach } from "@/lib/contexts/floating-coach-context"
import { Message } from "./message"
import { ContextBadge } from "./context-badge"
import { askCoach } from "@/lib/actions/coach"

interface ChatPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentModule: number
  currentLab?: number
  currentLabTitle?: string
}

export function ChatPanel({ open, onOpenChange, currentModule, currentLab, currentLabTitle }: ChatPanelProps) {
  const { messages, addMessage, coachState, setCoachState } = useFloatingCoach()
  const [input, setInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isSubmitting) return

    const userMessage = input.trim()
    setInput("")
    addMessage(userMessage, "student")
    setIsSubmitting(true)
    setCoachState("thinking")

    try {
      const result = await askCoach({
        userMessage,
        context: "Prompt Engineering Lab",
        moduleNumber: currentModule,
        additionalContext: { labNumber: currentLab },
      })

      if (result.success && result.message) {
        addMessage(result.message, "coach")
      } else {
        addMessage(result.error || "The coach is temporarily unavailable. Please try again.", "coach")
      }
    } catch (error) {
      addMessage("Oops, something went wrong. Please try again in a moment.", "coach")
    } finally {
      setIsSubmitting(false)
      setCoachState("idle")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] md:h-[600px] md:max-w-[360px] md:right-4 md:bottom-4 md:left-auto md:top-auto md:rounded-lg flex flex-col bg-white"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            AI Learning Coach
          </SheetTitle>
          <SheetDescription>Ask me anything about your current lab</SheetDescription>
        </SheetHeader>

        {/* Current Context */}
        {currentLabTitle && (
          <ContextBadge labNumber={currentLab} labTitle={currentLabTitle} />
        )}

        {/* Messages */}
        <div className="flex-1 mt-4 overflow-y-auto pr-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-8">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Hi! I'm your AI learning coach.</p>
                <p className="mt-1">Ask me anything about your current lab!</p>
              </div>
            )}
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            {isSubmitting && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Coach is thinking...</span>
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="mt-4 pt-4 border-t space-y-2">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your coach anything..."
              rows={2}
              disabled={isSubmitting}
              className="resize-none min-h-[60px] max-h-[120px]"
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isSubmitting} className="h-[60px] w-[60px]">
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
