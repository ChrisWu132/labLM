"use client"

import { useState, useEffect } from "react"
import { Code2, Clock, BookOpen, CheckCircle2, Circle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { getLabSubmissions } from "./actions"
import { getLabSections, calculateLabProgress } from "@/lib/constants/lab-sections"
import { getAllSectionProgress } from "@/lib/actions/section-progress"

const labs = [
  {
    number: 1,
    title: "Meet Your AI Friend",
    description: "Understand what LLMs are and how they work",
    duration: 20,
    topics: ["What LLMs are", "How they work", "First conversation", "Asking clear questions"],
  },
  {
    number: 2,
    title: "How AI Gets Smart",
    description: "Learn how LLMs learn and master clear prompts",
    duration: 25,
    topics: ["Training process", "Knowledge sources", "Clear communication", "Specific instructions"],
  },
  {
    number: 3,
    title: "AI's Thinking Process",
    description: "Understand generation and master role-playing",
    duration: 25,
    topics: ["Token concept", "Generation process", "Role-playing techniques", "Context setting"],
  },
  {
    number: 4,
    title: "AI's Capabilities & Limits",
    description: "Learn AI's strengths/weaknesses and Chain-of-Thought",
    duration: 30,
    topics: ["AI superpowers", "Limitations & hallucinations", "Critical thinking", "Guided reasoning"],
  },
  {
    number: 5,
    title: "Responsible AI Use",
    description: "Learn ethics and apply all skills responsibly",
    duration: 30,
    topics: ["AI ethics", "Academic integrity", "Privacy protection", "Comprehensive application"],
  },
  {
    number: 6,
    title: "AI Workflow Builder",
    description: "Build complex workflows (Advanced Capstone)",
    duration: 60,
    topics: ["Problem decomposition", "Workflow design", "Systems thinking", "Computational thinking"],
    isAdvanced: true,
  },
]

export function VibeCodingClient() {
  const router = useRouter()
  const [completedLabs, setCompletedLabs] = useState<number[]>([])
  const [sectionProgress, setSectionProgress] = useState<Record<string, { status: string, completed: boolean }>>({})
  const [isLoading, setIsLoading] = useState(true)

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
      } catch (error) {
        console.error("Failed to load progress:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadProgress()
  }, [])

  const calculateOverallProgress = () => {
    const totalLabs = labs.length
    const completedCount = completedLabs.length
    return Math.round((completedCount / totalLabs) * 100)
  }

  const getLabProgress = (labNumber: number) => {
    const sections = getLabSections(labNumber)
    const completedSectionIds = sections
      .filter(s => sectionProgress[s.id]?.completed)
      .map(s => s.id)
    return calculateLabProgress(labNumber, completedSectionIds)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <Code2 className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-xl font-bold">LLM Learning Lab - AI Literacy Education</h1>
              <p className="text-sm text-muted-foreground">
                Understand AI principles and master practical skills through theory + practice
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Overall Progress */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Your Progress</h2>
                <p className="text-sm text-muted-foreground">
                  {completedLabs.length} of {labs.length} labs completed
                </p>
              </div>
              <div className="text-3xl font-bold text-primary">{calculateOverallProgress()}%</div>
            </div>
            <Progress value={calculateOverallProgress()} className="h-2" />
          </div>

          {/* Course Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-semibold text-sm">Duration</h3>
              </div>
              <p className="text-2xl font-bold text-primary">~3.2 hours</p>
              <p className="text-xs text-muted-foreground mt-1">Complete course</p>
            </div>
            <div className="p-4 border rounded-lg bg-card">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-semibold text-sm">Structure</h3>
              </div>
              <p className="text-2xl font-bold text-primary">40/60</p>
              <p className="text-xs text-muted-foreground mt-1">Theory / Practice</p>
            </div>
            <div className="p-4 border rounded-lg bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Code2 className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-semibold text-sm">Level</h3>
              </div>
              <p className="text-2xl font-bold text-primary">Beginner</p>
              <p className="text-xs text-muted-foreground mt-1">Ages 12-15+</p>
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">What You'll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm">Understand LLM fundamentals and how they work</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm">Master effective communication with AI</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm">Develop critical thinking about AI outputs</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm">Learn responsible and ethical AI use</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm">Apply advanced prompt engineering techniques</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span className="text-sm">Build complex AI workflows (Lab 6)</span>
              </div>
            </div>
          </div>

          {/* Labs Grid */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Course Structure</h2>
            <div className="space-y-4">
              {labs.map((lab) => {
                const progress = getLabProgress(lab.number)
                const isCompleted = completedLabs.includes(lab.number)
                const progressPercent = progress.totalSections > 0
                  ? Math.round((progress.completedSections / progress.totalSections) * 100)
                  : 0

                return (
                  <div
                    key={lab.number}
                    className={`bg-card border rounded-lg p-5 transition-all hover:shadow-md ${
                      lab.isAdvanced ? 'border-primary/50 bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Lab Number Badge */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : progressPercent > 0
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {isCompleted ? '✓' : lab.number}
                      </div>

                      {/* Lab Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-base mb-1">
                              {lab.title}
                              {lab.isAdvanced && (
                                <span className="ml-2 text-xs font-normal text-primary border border-primary px-2 py-0.5 rounded">
                                  Advanced
                                </span>
                              )}
                            </h3>
                            <p className="text-sm text-muted-foreground">{lab.description}</p>
                          </div>
                          <div className="text-sm text-muted-foreground shrink-0">
                            <Clock className="w-4 h-4 inline mr-1" />
                            {lab.duration} min
                          </div>
                        </div>

                        {/* Topics */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {lab.topics.map((topic, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-muted rounded-md"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">
                              {progress.completedSections} of {progress.totalSections} sections completed
                            </span>
                            <span className="font-medium">{progressPercent}%</span>
                          </div>
                          <Progress value={progressPercent} className="h-1.5" />
                        </div>

                        {/* Action Button */}
                        <div className="mt-3">
                          <Button
                            variant={progressPercent > 0 ? "default" : "outline"}
                            size="sm"
                            onClick={() => router.push(`/dashboard/vibecoding/labs/lab${lab.number}`)}
                          >
                            {isCompleted ? 'Review' : progressPercent > 0 ? 'Continue' : 'Start Lab'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
            <h2 className="font-semibold mb-2">Ready to Begin?</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Start with Lab 1 to build your AI literacy foundation. Each lab includes theoretical explanations
              and hands-on exercises to help you understand and practice.
            </p>
            <Button onClick={() => router.push("/dashboard/vibecoding/labs/lab1")}>
              Begin Lab 1
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
