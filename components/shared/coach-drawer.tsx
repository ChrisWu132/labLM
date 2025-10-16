"use client"

import type React from "react"

import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Send, Loader2, MessageSquare, Filter } from "lucide-react"
import { callCoach } from "@/lib/coach"
import { useToast } from "@/hooks/use-toast"
import { mockCoachTranscripts } from "@/lib/mock-data"
import type { CoachTranscript } from "@/lib/types"

interface CoachDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentModule: number
}

export function CoachDrawer({ open, onOpenChange, currentModule }: CoachDrawerProps) {
  const { toast } = useToast()
  const [message, setMessage] = useState("")
  const [context, setContext] = useState<"Problem" | "Sandbox" | "GTM" | "Iterate" | "Demo">("Problem")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [transcripts, setTranscripts] = useState<CoachTranscript[]>(mockCoachTranscripts)
  const [filterModule, setFilterModule] = useState<string>("all")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setIsSubmitting(true)

    try {
      const response = await callCoach({
        context,
        userMessage: message,
        moduleNumber: currentModule,
      })

      // Add to transcripts
      const newTranscript: CoachTranscript = {
        id: Date.now().toString(),
        user_id: "user-123",
        module_number: currentModule,
        context_tag: context,
        user_message: message,
        coach_response: response.message,
        latency_ms: response.latencyMs,
        created_at: new Date().toISOString(),
      }

      setTranscripts([newTranscript, ...transcripts])
      setMessage("")

      toast({
        title: "Coach responded",
        description: "Your AI coach has provided feedback",
      })
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

  const filteredTranscripts =
    filterModule === "all" ? transcripts : transcripts.filter((t) => t.module_number === Number.parseInt(filterModule))

  const getContextColor = (ctx: string) => {
    const colors: Record<string, string> = {
      Problem: "bg-teal/10 text-teal border-teal/20",
      Sandbox: "bg-primary/10 text-primary border-primary/20",
      GTM: "bg-amber/10 text-amber border-amber/20",
      Iterate: "bg-teal/10 text-teal border-teal/20",
      Demo: "bg-primary/10 text-primary border-primary/20",
    }
    return colors[ctx] || "bg-secondary text-secondary-foreground"
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-xl p-0 flex flex-col">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            AI Coach
          </SheetTitle>
          <SheetDescription>Get personalized guidance and feedback on your work</SheetDescription>
        </SheetHeader>

        <Separator />

        {/* Ask Coach Form */}
        <div className="p-6 border-b">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="context">Context</Label>
              <Select value={context} onValueChange={(v) => setContext(v as typeof context)}>
                <SelectTrigger id="context">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Problem">Problem Discovery</SelectItem>
                  <SelectItem value="Sandbox">Sandbox/Coding</SelectItem>
                  <SelectItem value="GTM">Go-To-Market</SelectItem>
                  <SelectItem value="Iterate">Iterate/Metrics</SelectItem>
                  <SelectItem value="Demo">Demo/Certificate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Your Question</Label>
              <Textarea
                id="message"
                placeholder="Ask your coach anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                disabled={isSubmitting}
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
        </div>

        {/* Transcript History */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="p-6 pb-3 flex items-center justify-between">
            <h3 className="font-semibold">Conversation History</h3>
            <Select value={filterModule} onValueChange={setFilterModule}>
              <SelectTrigger className="w-32 h-8 text-xs">
                <Filter className="w-3 h-3 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modules</SelectItem>
                <SelectItem value="0">Module 0</SelectItem>
                <SelectItem value="1">Module 1</SelectItem>
                <SelectItem value="2">Module 2</SelectItem>
                <SelectItem value="3">Module 3</SelectItem>
                <SelectItem value="4">Module 4</SelectItem>
                <SelectItem value="5">Module 5</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ScrollArea className="flex-1 px-6">
            <div className="space-y-4 pb-6">
              {filteredTranscripts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No conversations yet. Ask your coach a question above!
                </div>
              ) : (
                filteredTranscripts.map((transcript) => (
                  <div key={transcript.id} className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className={getContextColor(transcript.context_tag)}>
                        {transcript.context_tag}
                      </Badge>
                      <span>Module {transcript.module_number}</span>
                      <span>•</span>
                      <span>{new Date(transcript.created_at).toLocaleDateString()}</span>
                      {transcript.latency_ms && (
                        <>
                          <span>•</span>
                          <span>{transcript.latency_ms}ms</span>
                        </>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm font-medium mb-1">You asked:</p>
                        <p className="text-sm text-muted-foreground">{transcript.user_message}</p>
                      </div>

                      <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                        <p className="text-sm font-medium mb-1 text-primary">Coach response:</p>
                        <p className="text-sm leading-relaxed">{transcript.coach_response}</p>
                      </div>
                    </div>

                    <Separator className="my-4" />
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}
