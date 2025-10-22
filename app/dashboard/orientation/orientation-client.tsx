"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowRight, ChevronDown, Send, Loader2, AlertCircle } from "lucide-react"
import { ChecklistCard } from "@/components/features/orientation/checklist-card"
import { updateChecklistItem, startModule } from "./actions"
import { askCoach } from "@/lib/actions/coach"
import { useToast } from "@/hooks/use-toast"

interface ChecklistItem {
  id: string
  label: string
  description: string
  completed: boolean
}

interface OrientationClientProps {
  initialChecklistItems: ChecklistItem[]
}

export function OrientationClient({ initialChecklistItems }: OrientationClientProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const [checklistItems, setChecklistItems] = useState(initialChecklistItems)
  const [troubleshootOpen, setTroubleshootOpen] = useState(false)
  const [coachQuestion, setCoachQuestion] = useState("")
  const [coachResponse, setCoachResponse] = useState("")
  const [isAskingCoach, setIsAskingCoach] = useState(false)
  const [isStarting, setIsStarting] = useState(false)

  const allCompleted = checklistItems.every((item) => item.completed)

  const handleItemToggle = async (itemId: string) => {
    // Optimistic update
    setChecklistItems((items) =>
      items.map((item) => (item.id === itemId ? { ...item, completed: !item.completed } : item)),
    )

    // Update in database
    const item = checklistItems.find((i) => i.id === itemId)
    const newCompleted = !item?.completed

    const result = await updateChecklistItem(itemId, newCompleted)

    if (!result.success) {
      // Revert on error
      setChecklistItems((items) =>
        items.map((item) => (item.id === itemId ? { ...item, completed: !newCompleted } : item)),
      )
      toast({
        title: "Error",
        description: "Failed to update checklist. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAskCoach = async () => {
    if (!coachQuestion.trim()) return

    setIsAskingCoach(true)
    setCoachResponse("")

    try {
      const response = await askCoach({
        userMessage: coachQuestion,
        context: "Orientation",
        moduleNumber: 0,
      })

      if (response.success && response.message) {
        setCoachResponse(response.message)
        toast({
          title: "Coach responded",
          description: `Response time: ${response.latencyMs}ms`,
        })
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to get coach response. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAskingCoach(false)
    }
  }

  const handleStartLearning = async () => {
    setIsStarting(true)

    try {
      const result = await startModule(2)

      if (result.success) {
        toast({
          title: "Great work!",
          description: "Module 0 completed. Starting Module 2...",
        })

        // Navigate to Module 2 (skipping Module 1 for now)
        router.push("/dashboard/vibecoding")
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to start Module 2. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsStarting(false)
    }
  }

  return (
    <>
      {/* Setup Checklist */}
      <ChecklistCard
        title="Setup Checklist"
        description="Complete these steps to get ready for the course"
        items={checklistItems}
        onItemToggle={handleItemToggle}
      />

      {/* Troubleshooting Section */}
      <Collapsible open={troubleshootOpen} onOpenChange={setTroubleshootOpen}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber" />
                  <CardTitle className="text-base">Need Help Getting Started?</CardTitle>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${troubleshootOpen ? "rotate-180" : ""}`}
                />
              </div>
              <CardDescription>Common setup questions and troubleshooting tips</CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0 space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">How do I create a Sandpack account?</h4>
                  <p className="text-sm text-muted-foreground">
                    Visit{" "}
                    <a href="https://codesandbox.io" className="underline text-primary" target="_blank" rel="noopener">
                      codesandbox.io
                    </a>{" "}
                    and sign up with your GitHub account. It's free.
                  </p>
                </div>

                <div className="p-3 bg-muted/30 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">What if I don't have a Supabase account?</h4>
                  <p className="text-sm text-muted-foreground">
                    Don't worry! You can create a free Supabase account at{" "}
                    <a href="https://supabase.com" className="underline text-primary" target="_blank" rel="noopener">
                      supabase.com
                    </a>
                    . We'll guide you through the setup in the upcoming modules.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Label htmlFor="coach-question" className="text-sm font-medium mb-2 block">
                  Ask Your AI Coach
                </Label>
                <div className="space-y-3">
                  <Textarea
                    id="coach-question"
                    placeholder="e.g., How much time should I dedicate to this course weekly?"
                    value={coachQuestion}
                    onChange={(e) => setCoachQuestion(e.target.value)}
                    rows={3}
                    disabled={isAskingCoach}
                  />
                  <Button
                    onClick={handleAskCoach}
                    disabled={!coachQuestion.trim() || isAskingCoach}
                    className="w-full gap-2"
                    variant="outline"
                  >
                    {isAskingCoach ? (
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

                  {coachResponse && (
                    <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg">
                      <p className="text-sm font-medium text-primary mb-2">Coach says:</p>
                      <p className="text-sm leading-relaxed">{coachResponse}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Next Steps */}
      <Card className={allCompleted ? "border-primary" : ""}>
        <CardHeader>
          <CardTitle>Ready to Start?</CardTitle>
          <CardDescription>
            {allCompleted
              ? "Great! You've completed the setup. Let's dive into Vibecoding!"
              : "Complete the checklist above to unlock the next module"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleStartLearning}
            disabled={!allCompleted || isStarting}
            className="gap-2"
            size="lg"
          >
            {isStarting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Starting Module 2...
              </>
            ) : (
              <>
                Start Learning
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </>
  )
}
