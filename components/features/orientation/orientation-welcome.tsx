"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, Brain, Target, Shield, Rocket } from "lucide-react"
import { LEARNING_JOURNEY } from "@/lib/constants"

interface OrientationWelcomeProps {
  userName: string
  onComplete?: () => void
}

export function OrientationWelcome({ userName, onComplete }: OrientationWelcomeProps) {
  const router = useRouter()

  const handleStart = () => {
    onComplete?.()
    router.push("/dashboard/vibecoding/labs/lab1")
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Welcome */}
        <div className="text-center space-y-4 py-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome, {userName}!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            You're about to embark on a journey to understand AI, learn how it works, and become a responsible AI user.
          </p>
        </div>

        {/* What You'll Learn */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">What You'll Discover</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <Brain className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">How AI Really Works</h3>
                <p className="text-sm text-muted-foreground">Understand LLMs, training, generation, and why AI makes mistakes</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Target className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Master Practical Skills</h3>
                <p className="text-sm text-muted-foreground">Write effective prompts, use role-playing, and guide AI step-by-step</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Critical Thinking</h3>
                <p className="text-sm text-muted-foreground">Question AI outputs, verify facts, and recognize hallucinations</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Rocket className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Responsible Use</h3>
                <p className="text-sm text-muted-foreground">Learn ethics, privacy, and how to use AI for learning (not cheating)</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Learning Path */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-center">Your Learning Path (3.2 Hours)</h2>
          <div className="space-y-3">
            {LEARNING_JOURNEY.map((step) => (
              <Card key={step.step} className="p-4 hover:border-primary/50 transition-colors">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-4 py-8">
          <h2 className="text-2xl font-bold">Ready to Begin?</h2>
          <p className="text-muted-foreground mb-6">
            No prior knowledge needed. Everything runs in your browser. Let's dive in!
          </p>
          <Button onClick={handleStart} size="lg" className="px-8">
            Start Lab 1: Meet Your AI Friend
          </Button>
        </div>
      </div>
    </div>
  )
}
