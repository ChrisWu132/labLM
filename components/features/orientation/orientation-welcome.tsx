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
    <div className="h-full w-full flex flex-col overflow-hidden bg-background">
      {/* Page 1: Benefits & What You'll Gain */}
      {currentPage === 1 && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto animate-in fade-in duration-500">
          <div className="max-w-4xl w-full space-y-10 pb-10">
            {/* Hero */}
            <div className="text-center space-y-3">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Welcome, {userName}!
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Embark on a journey to understand AI and become a responsible AI user
              </p>
            </div>

            {/* What You'll Gain */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-center tracking-tight">What You'll Gain</h2>

              <div className="grid md:grid-cols-2 gap-5 items-stretch">
                <div className="flex gap-4 p-5 rounded-xl border border-muted-foreground/20 bg-card hover:bg-muted/30 transition-colors">
                  <Brain className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1 leading-snug">Understand How AI Works</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Learn about LLMs, training, generation, and why AI makes mistakes
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-xl border border-muted-foreground/20 bg-card hover:bg-muted/30 transition-colors">
                  <Target className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1 leading-snug">Master Practical Skills</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Write effective prompts, use role-playing, and guide AI step-by-step
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-xl border border-muted-foreground/20 bg-card hover:bg-muted/30 transition-colors">
                  <Shield className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1 leading-snug">Develop Critical Thinking</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Question AI outputs, verify facts, and recognize hallucinations
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-5 rounded-xl border border-muted-foreground/20 bg-card hover:bg-muted/30 transition-colors">
                  <Rocket className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1 leading-snug">Use AI Responsibly</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Learn ethics, privacy, and how to use AI for learning (not cheating)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hands-On Experience Highlight */}
            <div className="p-6 rounded-xl bg-primary/5 border border-muted-foreground/20">
              <div className="flex items-start gap-4">
                <BookOpen className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h3 className="font-medium text-lg mb-2 leading-snug">Hands-On Learning Labs</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Learn by doing! Each lab includes interactive exercises where you'll experiment with AI,
                    discover its capabilities and limits, and apply what you learn in real scenarios.
                    No prior knowledge needed—everything runs in your browser.
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center pt-6">
              <Button onClick={() => setCurrentPage(2)} size="lg" variant="outline" className="gap-2 text-base h-12 rounded-full px-6">
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
        <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto animate-in fade-in duration-500">
          <div className="max-w-4xl w-full space-y-10 pb-10">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="flex justify-center items-center gap-2 mb-2">
                <Clock className="w-8 h-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Your Learning Path</h1>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Complete all {LABS.length} labs in approximately {totalHours} hours {remainingMinutes > 0 && `${remainingMinutes} minutes`}
              </p>
            </div>

            {/* Labs Schedule */}
            <div className="space-y-3">
              {LABS.map((lab) => (
                <div
                  key={lab.number}
                  className="p-5 rounded-xl border border-muted-foreground/20 bg-card hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center shrink-0 text-base">
                      {lab.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-medium text-lg leading-snug">{lab.title}</h3>
                        <div className="flex items-center gap-2 shrink-0">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-muted-foreground">{lab.duration}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{lab.description}</p>
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
              <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-primary/5 border border-muted-foreground/20">
                <Award className="w-6 h-6 text-primary" />
                <p className="text-sm font-medium leading-relaxed">
                  Complete all labs to master AI and become a responsible AI user
                </p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <Button onClick={() => setCurrentPage(1)} variant="outline" size="lg" className="h-12 rounded-full px-6">
                  Back
                </Button>
                <Button onClick={handleStart} size="lg" className="gap-2 h-12 rounded-full px-6">
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
