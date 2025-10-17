"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sparkles, Brain, Target, Shield, Rocket, ArrowRight, Clock, BookOpen, Award } from "lucide-react"
import { LABS } from "@/lib/constants"

interface OrientationWelcomeProps {
  userName: string
  onComplete?: () => void
}

export function OrientationWelcome({ userName, onComplete }: OrientationWelcomeProps) {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState<1 | 2>(1)

  const handleStart = () => {
    onComplete?.()
    router.push("/dashboard/vibecoding/labs/lab1")
  }

  const totalDuration = LABS.reduce((acc, lab) => {
    const minutes = parseInt(lab.duration)
    return acc + minutes
  }, 0)

  const totalHours = Math.floor(totalDuration / 60)
  const remainingMinutes = totalDuration % 60

  return (
    <div className="h-full w-full flex flex-col bg-background">
      {/* Page 1: Benefits & What You'll Gain */}
      {currentPage === 1 && (
        <div className="flex-1 flex flex-col items-center justify-center p-12 overflow-y-auto animate-in fade-in duration-500">
          <div className="max-w-3xl w-full space-y-8 pb-12">
            {/* Hero */}
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                Welcome, {userName}!
              </h1>
              <p className="text-xl text-muted-foreground">
                Embark on a journey to understand AI and become a responsible AI user
              </p>
            </div>

            {/* What You'll Gain */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center">What You'll Gain</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4 p-4 rounded-lg border bg-card hover:border-primary/50 transition-colors">
                  <Brain className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Understand How AI Works</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn about LLMs, training, generation, and why AI makes mistakes
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-lg border bg-card hover:border-primary/50 transition-colors">
                  <Target className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Master Practical Skills</h3>
                    <p className="text-sm text-muted-foreground">
                      Write effective prompts, use role-playing, and guide AI step-by-step
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-lg border bg-card hover:border-primary/50 transition-colors">
                  <Shield className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Develop Critical Thinking</h3>
                    <p className="text-sm text-muted-foreground">
                      Question AI outputs, verify facts, and recognize hallucinations
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-lg border bg-card hover:border-primary/50 transition-colors">
                  <Rocket className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Use AI Responsibly</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn ethics, privacy, and how to use AI for learning (not cheating)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hands-On Experience Highlight */}
            <div className="p-6 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-start gap-4">
                <BookOpen className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Hands-On Learning Labs</h3>
                  <p className="text-muted-foreground">
                    Learn by doing! Each lab includes interactive exercises where you'll experiment with AI,
                    discover its capabilities and limits, and apply what you learn in real scenarios.
                    No prior knowledge needed¡ªeverything runs in your browser.
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center pt-8">
              <Button onClick={() => setCurrentPage(2)} size="lg" className="gap-2 text-lg px-8 py-6">
                See Course Schedule
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Page Indicator */}
            <div className="flex justify-center gap-3 pt-4">
              <div className="w-3 h-3 rounded-full bg-primary transition-all" />
              <div className="w-3 h-3 rounded-full bg-muted transition-all" />
            </div>
          </div>
        </div>
      )}

      {/* Page 2: Course Schedule & Time Estimates */}
      {currentPage === 2 && (
        <div className="flex-1 flex flex-col items-center justify-center p-12 overflow-y-auto animate-in fade-in duration-500">
          <div className="max-w-3xl w-full space-y-8 pb-12">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex justify-center items-center gap-2 mb-4">
                <Clock className="w-8 h-8 text-primary" />
                <h1 className="text-4xl font-bold">Your Learning Path</h1>
              </div>
              <p className="text-xl text-muted-foreground">
                Complete all {LABS.length} labs in approximately {totalHours} hours {remainingMinutes > 0 && `${remainingMinutes} minutes`}
              </p>
            </div>

            {/* Labs Schedule */}
            <div className="space-y-3">
              {LABS.map((lab) => (
                <div
                  key={lab.number}
                  className="p-4 rounded-lg border bg-card hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-lg">
                      {lab.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-semibold text-lg">{lab.title}</h3>
                        <div className="flex items-center gap-2 shrink-0">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-muted-foreground">{lab.duration}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{lab.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {lab.concepts.map((concept) => (
                          <span
                            key={concept}
                            className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                          >
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="pt-4 space-y-4">
              <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <Award className="w-6 h-6 text-primary" />
                <p className="text-sm font-medium">
                  Complete all labs to master AI and become a responsible AI user
                </p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <Button onClick={() => setCurrentPage(1)} variant="outline" size="lg" className="text-lg px-8 py-6">
                  Back
                </Button>
                <Button onClick={handleStart} size="lg" className="gap-2 text-lg px-8 py-6">
                  Start Lab 1
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Page Indicator */}
            <div className="flex justify-center gap-3 pt-4">
              <div className="w-3 h-3 rounded-full bg-muted transition-all" />
              <div className="w-3 h-3 rounded-full bg-primary transition-all" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

