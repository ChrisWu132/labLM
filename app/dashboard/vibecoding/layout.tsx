"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, ChevronRight, ChevronLeft, MessageSquare, Send, Loader2 } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { markLabComplete, getLabSubmissions } from "./actions"
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
    title: "Meet Your AI Friend",
    description: "Understand what LLMs are and how they work",
    path: "/dashboard/vibecoding/labs/lab1",
  },
  {
    number: 2,
    title: "How AI Gets Smart",
    description: "Learn how LLMs learn and master clear prompts",
    path: "/dashboard/vibecoding/labs/lab2",
  },
  {
    number: 3,
    title: "AI's Thinking Process",
    description: "Understand generation and master role-playing",
    path: "/dashboard/vibecoding/labs/lab3",
  },
  {
    number: 4,
    title: "AI's Capabilities & Limits",
    description: "Learn AI's strengths/weaknesses and Chain-of-Thought",
    path: "/dashboard/vibecoding/labs/lab4",
  },
  {
    number: 5,
    title: "Responsible AI Use",
    description: "Learn ethics and apply all skills responsibly",
    path: "/dashboard/vibecoding/labs/lab5",
  },
  {
    number: 6,
    title: "AI Workflow Builder",
    description: "Build complex workflows (Advanced Capstone)",
    path: "/dashboard/vibecoding/labs/lab6",
  },
]

export default function VibeCodingLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  const [completedLabs, setCompletedLabs] = useState<number[]>([])
  const [isMarkingComplete, setIsMarkingComplete] = useState(false)
  const [coachOpen, setCoachOpen] = useState(false)
  const [coachQuestion, setCoachQuestion] = useState("")
  const [coachResponse, setCoachResponse] = useState("")
  const [isAskingCoach, setIsAskingCoach] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  // Determine current lab from pathname
  const currentLab = pathname.match(/\/labs\/lab(\d+)/)
    ? parseInt(pathname.match(/\/labs\/lab(\d+)/)![1])
    : null

  // Load completed labs on mount
  useEffect(() => {
    async function loadCompletedLabs() {
      try {
        const result = await getLabSubmissions()
        const completed = result.data?.filter((sub) => sub.completed).map((sub) => sub.lab_number) || []
        setCompletedLabs(completed)
      } catch (error) {
        console.error("Failed to load completed labs:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadCompletedLabs()
  }, [])

  const handleStartLab = (labNumber: number) => {
    // If sidebar is collapsed, expand it first instead of navigating
    if (sidebarCollapsed) {
      setSidebarCollapsed(false)
      return
    }

    // If sidebar is expanded, navigate to the lab
    const lab = labs.find(l => l.number === labNumber)
    if (lab) {
      router.push(lab.path)
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

  const handleAskCoach = async () => {
    if (!coachQuestion.trim()) return

    setIsAskingCoach(true)
    setCoachResponse("")

    try {
      const response = await askCoach({
        userMessage: coachQuestion,
        context: "Prompt Engineering Lab",
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
            <h2 className="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wide px-2">Learning Labs</h2>
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
                  // Expanded view
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

      {/* Right: Main Content Area (children) */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  )
}
