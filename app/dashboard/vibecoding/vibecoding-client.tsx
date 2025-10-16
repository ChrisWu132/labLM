"use client"

import { useState } from "react"
import { LabCard } from "@/components/features/vibecoding/lab-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Code2, Loader2, MessageSquare, ChevronDown, Send, ChevronRight, ChevronLeft } from "lucide-react"
import { markLabComplete } from "./actions"
import { askCoach } from "@/lib/actions/coach"
import { useToast } from "@/hooks/use-toast"

interface Lab {
  number: number
  title: string
  description: string
  path: string
}

const labs: Lab[] = [
  {
    number: 1,
    title: "Lab 1: What is a Prompt",
    description: "Understand prompt basics, learn to write basic instructions",
    path: "/dashboard/vibecoding/labs/lab1",
  },
  {
    number: 2,
    title: "Lab 2: How to Give Clear Instructions",
    description: "Learn specific expression, avoid ambiguity",
    path: "/dashboard/vibecoding/labs/lab2",
  },
  {
    number: 3,
    title: "Lab 3: Role-Playing Techniques",
    description: "Have AI play different roles, get different style outputs",
    path: "/dashboard/vibecoding/labs/lab3",
  },
  {
    number: 4,
    title: "Lab 4: Guided Reasoning",
    description: "Use Chain-of-Thought, have AI reason step-by-step",
    path: "/dashboard/vibecoding/labs/lab4",
  },
  {
    number: 5,
    title: "Lab 5: Comprehensive Application Challenge",
    description: "Apply all techniques, complete real scenarios",
    path: "/dashboard/vibecoding/labs/lab5",
  },
]

interface VibeCodingClientProps {
  completedLabNumbers: number[]
}

export function VibeCodingClient({ completedLabNumbers }: VibeCodingClientProps) {
  const { toast } = useToast()
  const [completedLabs, setCompletedLabs] = useState<number[]>(completedLabNumbers)
  const [showPlatform, setShowPlatform] = useState(true) // Start with platform visible
  const [currentLab, setCurrentLab] = useState<number | null>(null)
  const [isMarkingComplete, setIsMarkingComplete] = useState(false)
  const [coachOpen, setCoachOpen] = useState(false)
  const [coachQuestion, setCoachQuestion] = useState("")
  const [coachResponse, setCoachResponse] = useState("")
  const [isAskingCoach, setIsAskingCoach] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true) // Default collapsed

  const handleStartLab = (labNumber: number) => {
    const lab = labs.find(l => l.number === labNumber)
    if (lab) {
      // Navigate to the lab page
      window.location.href = lab.path
    }
  }

  const handleMarkComplete = async (labNumber: number) => {
    if (completedLabs.includes(labNumber)) return

    setIsMarkingComplete(true)

    try {
      const result = await markLabComplete(labNumber)

      if (result.success) {
        setCompletedLabs([...completedLabs, labNumber])
        toast({
          title: "Lab completed!",
          description: `Lab ${labNumber} has been marked as complete.`,
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to mark lab complete",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark lab complete. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsMarkingComplete(false)
    }
  }

  const handleTogglePlatform = () => {
    setShowPlatform(!showPlatform)
  }

  const handleAskCoach = async () => {
    if (!coachQuestion.trim()) return

    setIsAskingCoach(true)
    setCoachResponse("")

    try {
      const response = await askCoach({
        userMessage: coachQuestion,
        context: "Sandbox",
        moduleNumber: 2,
        additionalContext: { labNumber: currentLab },
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
          description: response.error || "Failed to get coach response",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsAskingCoach(false)
    }
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left Sidebar - Collapsible */}
      <div className={`border-r flex flex-col overflow-hidden bg-background transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        {/* Toggle Button */}
        <div className="border-b p-2 flex justify-end">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="h-8 w-8 p-0"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {/* Labs Section */}
        <div className="flex-1 overflow-y-auto p-2">
          {!sidebarCollapsed && (
            <h2 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wide px-2">Coding Labs</h2>
          )}
          <div className="space-y-2">
            {labs.map((lab) => (
              <div key={lab.number}>
                {sidebarCollapsed ? (
                  // Collapsed view - icon only
                  <Button
                    size="sm"
                    variant={currentLab === lab.number ? "default" : "ghost"}
                    onClick={() => handleStartLab(lab.number)}
                    className={`w-full h-12 p-0 ${
                      completedLabs.includes(lab.number) ? 'border-2 border-green-500' : ''
                    }`}
                    title={lab.title}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      completedLabs.includes(lab.number)
                        ? 'bg-green-500 text-white'
                        : currentLab === lab.number
                        ? 'bg-primary-foreground text-primary'
                        : ''
                    }`}>
                      {completedLabs.includes(lab.number) ? '✓' : lab.number}
                    </div>
                  </Button>
                ) : (
                  // Expanded view - title only (no description)
                  <Collapsible defaultOpen={false}>
                    <div className={`border rounded-lg overflow-hidden transition-colors ${
                      currentLab === lab.number ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground/30'
                    }`}>
                      <CollapsibleTrigger asChild>
                        <div className="flex items-center justify-between p-2 cursor-pointer">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                              completedLabs.includes(lab.number)
                                ? 'bg-green-500 text-white'
                                : currentLab === lab.number
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {completedLabs.includes(lab.number) ? '✓' : lab.number}
                            </div>
                            <h3 className="font-medium text-xs truncate">{lab.title}</h3>
                          </div>
                          <ChevronDown className="w-3 h-3 text-muted-foreground shrink-0" />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="px-2 pb-2 space-y-2 border-t pt-2">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleStartLab(lab.number)}
                              className="flex-1 h-7 text-xs"
                              variant={currentLab === lab.number ? "default" : "outline"}
                            >
                              {currentLab === lab.number ? 'Working' : 'Start'}
                            </Button>
                            {!completedLabs.includes(lab.number) && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleMarkComplete(lab.number)}
                                disabled={isMarkingComplete}
                                className="h-7 text-xs"
                              >
                                Done
                              </Button>
                            )}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI Coach Helper - Fixed at bottom */}
        {!sidebarCollapsed && (
          <div className="border-t">
            <Collapsible open={coachOpen} onOpenChange={setCoachOpen}>
              <CollapsibleTrigger asChild>
                <div className="cursor-pointer hover:bg-muted/50 transition-colors p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-xs">Need Help?</span>
                    </div>
                    <ChevronDown
                      className={`w-3 h-3 text-muted-foreground transition-transform ${coachOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Ask AI coach</p>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-3 pt-0 space-y-2">
                  <Textarea
                    id="coach-question"
                    placeholder="e.g., How do I fix this error?"
                    value={coachQuestion}
                    onChange={(e) => setCoachQuestion(e.target.value)}
                    rows={3}
                    disabled={isAskingCoach}
                    className="text-xs"
                  />
                  <Button
                    onClick={handleAskCoach}
                    disabled={!coachQuestion.trim() || isAskingCoach}
                    className="w-full gap-2"
                    size="sm"
                  >
                    {isAskingCoach ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Asking...
                      </>
                    ) : (
                      <>
                        <Send className="w-3 h-3" />
                        Ask
                      </>
                    )}
                  </Button>

                  {coachResponse && (
                    <div className="p-2 bg-primary/5 border border-primary/10 rounded-lg">
                      <p className="text-xs font-medium text-primary mb-1">Coach:</p>
                      <p className="text-xs leading-relaxed">{coachResponse}</p>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        )}
      </div>

      {/* Right: Welcome/Instructions */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b px-4 py-3 bg-muted/30">
          <div className="flex items-center gap-3">
            <Code2 className="w-5 h-5 text-primary" />
            <div>
              <h2 className="font-semibold">LLM Learning Lab - Prompt Engineering</h2>
              <p className="text-xs text-muted-foreground">
                Learn how to communicate with AI - Master Prompt Engineering in 2 hours
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Welcome to the Prompt Engineering Learning Platform!</h3>
              <p className="text-muted-foreground">
                Through 5 hands-on labs, you will learn how to effectively communicate with AI and write high-quality prompts.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border">
              <h4 className="font-semibold mb-3">🎯 Learning Objectives</h4>
              <ul className="space-y-2 text-sm">
                <li>✓ Understand what a Prompt is and its importance</li>
                <li>✓ Learn to write clear, specific instructions</li>
                <li>✓ Master role-playing and context-setting techniques</li>
                <li>✓ Use Chain-of-Thought to guide AI reasoning</li>
                <li>✓ Apply comprehensively to real scenarios</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h5 className="font-semibold mb-2">⏱️ Duration</h5>
                <p className="text-2xl font-bold text-primary">~2 hours</p>
                <p className="text-xs text-muted-foreground mt-1">Average 15-25 minutes per lab</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h5 className="font-semibold mb-2">📊 Difficulty Level</h5>
                <p className="text-2xl font-bold text-primary">Beginner</p>
                <p className="text-xs text-muted-foreground mt-1">Suitable for middle school and above</p>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border">
              <h5 className="font-semibold mb-2">💡 Getting Started</h5>
              <p className="text-sm">
                Click <strong>Lab 1</strong> on the left to begin your Prompt Engineering learning journey! Each lab includes theoretical explanations and practical exercises.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
