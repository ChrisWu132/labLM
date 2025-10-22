"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, ChevronLeft, Lock, Check, Play } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { markLabComplete, getLabSubmissions } from "./actions"
import { useToast } from "@/hooks/use-toast"
import { FloatingCoach } from "@/components/shared/floating-coach"
import { getLabSections, calculateLabProgress } from "@/lib/constants/lab-sections"
import { getAllSectionProgress } from "@/lib/actions/section-progress"

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [expandedLab, setExpandedLab] = useState<number | null>(null)
  const [sectionProgress, setSectionProgress] = useState<Record<string, { status: string, completed: boolean }>>({})

  // Determine current lab and section from pathname
  const currentLab = pathname.match(/\/labs\/lab(\d+)/)
    ? parseInt(pathname.match(/\/labs\/lab(\d+)/)![1])
    : null

  const currentSection = pathname.match(/\/sections\/([\d.]+)/)
    ? pathname.match(/\/sections\/([\d.]+)/)![1]
    : null

  // Check if we're on a lab section or overview page (needs scrolling)
  const isLabSectionOrOverview = pathname.includes("/sections/") || pathname.match(/\/labs\/lab\d+$/)

  // Load completed labs and section progress on mount
  useEffect(() => {
    async function loadProgress() {
      try {
        const [labResult, sectionResult] = await Promise.all([
          getLabSubmissions(),
          getAllSectionProgress()
        ])

        const completed = labResult.data?.filter((sub) => sub.completed).map((sub) => sub.lab_number) || []
        setCompletedLabs(completed)

        // Convert section progress array to object for easy lookup
        const progressMap: Record<string, { status: string, completed: boolean }> = {}
        if (sectionResult.success && sectionResult.data) {
          sectionResult.data.forEach((sp: any) => {
            progressMap[sp.section_id] = {
              status: sp.status,
              completed: sp.status === 'completed'
            }
          })
        }
        setSectionProgress(progressMap)

        // Auto-expand current lab
        if (currentLab) {
          setExpandedLab(currentLab)
        }
      } catch (error) {
        console.error("Failed to load progress:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadProgress()
  }, [currentLab])

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
            {/* Getting Started / Overview */}
            <div>
              {sidebarCollapsed ? (
                // Collapsed view - icon only
                <Button
                  size="sm"
                  variant={pathname === "/dashboard/vibecoding" ? "default" : "ghost"}
                  onClick={() => router.push("/dashboard/vibecoding")}
                  className="w-full h-12 p-0"
                  title="Getting Started"
                >
                  <div className="text-lg">🏠</div>
                </Button>
              ) : (
                // Expanded view
                <Button
                  size="sm"
                  variant={pathname === "/dashboard/vibecoding" ? "default" : "ghost"}
                  onClick={() => router.push("/dashboard/vibecoding")}
                  className="w-full justify-start gap-2 h-10"
                >
                  <span className="text-base">🏠</span>
                  <span className="font-medium text-xs">Getting Started</span>
                </Button>
              )}
            </div>

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
                  // Expanded view with sections
                  <Collapsible
                    open={expandedLab === lab.number}
                    onOpenChange={(isOpen) => setExpandedLab(isOpen ? lab.number : null)}
                  >
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
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-xs truncate">{lab.title}</h3>
                              {(() => {
                                const sections = getLabSections(lab.number)
                                const completedSectionIds = sections
                                  .filter(s => sectionProgress[s.id]?.completed)
                                  .map(s => s.id)
                                const progress = calculateLabProgress(lab.number, completedSectionIds)
                                return (
                                  <div className="flex items-center gap-1 mt-0.5">
                                    <div className="flex gap-0.5">
                                      {Array.from({ length: progress.totalSections }).map((_, i) => (
                                        <div
                                          key={i}
                                          className={`w-1.5 h-1.5 rounded-full ${
                                            i < progress.completedSections
                                              ? 'bg-green-500'
                                              : 'bg-muted-foreground/30'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-[10px] text-muted-foreground">
                                      {progress.completedSections}/{progress.totalSections}
                                    </span>
                                  </div>
                                )
                              })()}
                            </div>
                          </div>
                          <ChevronDown className={`w-3 h-3 text-muted-foreground shrink-0 transition-transform ${
                            expandedLab === lab.number ? 'rotate-180' : ''
                          }`} />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="border-t">
                          {/* Section List */}
                          <div className="py-1">
                            {getLabSections(lab.number).map((section) => {
                              const progress = sectionProgress[section.id]
                              const isCompleted = progress?.completed
                              const isCurrent = currentSection === section.id
                              const isLocked = !isCompleted && !isCurrent &&
                                section.order > 1 &&
                                !sectionProgress[`${lab.number}.${section.order - 1}`]?.completed

                              return (
                                <button
                                  key={section.id}
                                  onClick={() => {
                                    if (!isLocked) {
                                      router.push(`/dashboard/vibecoding/labs/lab${lab.number}/sections/${section.id}`)
                                    }
                                  }}
                                  disabled={isLocked}
                                  className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs transition-colors ${
                                    isCurrent
                                      ? 'bg-primary/10 text-primary'
                                      : isLocked
                                      ? 'text-muted-foreground/50 cursor-not-allowed'
                                      : 'hover:bg-muted/50'
                                  }`}
                                  title={isLocked ? 'Complete previous section first' : ''}
                                >
                                  {/* Status Icon */}
                                  <div className="shrink-0">
                                    {isCompleted ? (
                                      <Check className="w-3 h-3 text-green-500" />
                                    ) : isCurrent ? (
                                      <Play className="w-3 h-3 text-primary animate-pulse" />
                                    ) : isLocked ? (
                                      <Lock className="w-3 h-3" />
                                    ) : (
                                      <div className="w-3 h-3 rounded-full border border-current" />
                                    )}
                                  </div>

                                  {/* Section Info */}
                                  <div className="flex-1 min-w-0 text-left">
                                    <div className="truncate">
                                      <span className="font-medium">{section.id}</span> {section.title}
                                    </div>
                                  </div>
                                </button>
                              )
                            })}
                          </div>

                          {/* Lab Actions */}
                          <div className="px-2 pb-2 pt-1 border-t">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleStartLab(lab.number)}
                                className="flex-1 h-7 text-xs"
                                variant="outline"
                              >
                                Overview
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
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Main Content Area (children) */}
      <div className={`flex-1 ${isLabSectionOrOverview ? 'overflow-y-auto' : 'overflow-hidden'}`}>
        {children}
      </div>

      {/* Floating AI Coach - Always accessible */}
      <FloatingCoach currentModule={2} />
    </div>
  )
}
