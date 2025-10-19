"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  Brain,
  Target,
  Shield,
  Rocket,
  ArrowRight,
  BookOpen,
  Award
} from "lucide-react"
import { LABS } from "@/lib/constants"

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
    <div className="h-full w-full bg-background">
      <div className="flex h-full flex-col">
        <section className="flex-1 overflow-y-auto px-6 py-12 md:px-10 lg:px-16">
          <div className="mx-auto max-w-3xl space-y-10 pb-16">
            <div className="text-center space-y-5">
              <div className="flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h1 className="text-balance text-4xl font-bold md:text-5xl">Welcome, {userName}!</h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Embark on a journey to understand AI and become a responsible AI explorer.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-center text-2xl font-bold">What You&apos;ll Gain</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex gap-4 rounded-xl border bg-card p-4 shadow-sm transition-colors hover:border-primary/40">
                  <Brain className="h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-semibold">Understand How AI Works</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn how large language models are trained, why they make mistakes, and how to guide them.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 rounded-xl border bg-card p-4 shadow-sm transition-colors hover:border-primary/40">
                  <Target className="h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-semibold">Master Practical Skills</h3>
                    <p className="text-sm text-muted-foreground">
                      Practice writing effective prompts, role playing, and step-by-step reasoning with AI.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 rounded-xl border bg-card p-4 shadow-sm transition-colors hover:border-primary/40">
                  <Shield className="h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-semibold">Think Critically</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn to question AI outputs, verify facts, and spot hallucinations before they spread.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 rounded-xl border bg-card p-4 shadow-sm transition-colors hover:border-primary/40">
                  <Rocket className="h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-semibold">Use AI Responsibly</h3>
                    <p className="text-sm text-muted-foreground">
                      Explore ethics, privacy, and how to partner with AI for creativity—not shortcuts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <BookOpen className="h-8 w-8 shrink-0 text-primary" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Hands-On Learning Labs</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn by doing. Each lab delivers a guided experiment where you build, test, and reflect on how AI behaves—all in your browser, no installs required.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold">Your Learning Path</h2>
                <p className="text-lg text-muted-foreground md:text-xl">
                  Complete all {LABS.length} labs to master AI literacy.
                </p>
              </div>

              <div className="space-y-3">
                {LABS.map((lab) => (
                  <div key={lab.number} className="rounded-xl border bg-card p-4 shadow-sm transition-all hover:border-primary/40">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                        {lab.number}
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="text-lg font-semibold">{lab.title}</h3>
                        <p className="text-sm text-muted-foreground">{lab.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {lab.concepts.map((concept) => (
                            <span key={concept} className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                              {concept}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <Award className="h-6 w-6 text-primary" />
                  <p className="text-sm font-medium text-primary">
                    Complete every lab to earn your AI Explorer certificate.
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <Button size="lg" className="gap-2 px-8 py-6 text-lg" onClick={handleStart}>
                    Start Lab 1
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
