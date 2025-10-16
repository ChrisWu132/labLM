"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sparkles, Bot, Rocket, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface OrientationWelcomeProps {
  userName: string
  onComplete?: () => void
}

const messages = [
  {
    id: 1,
    icon: Sparkles,
    title: (userName: string) => `Welcome, ${userName}!`,
    description: "You're joining a community of learners\ndiscovering coding through AI.",
    duration: 3000,
  },
  {
    id: 2,
    icon: Bot,
    title: () => "Your AI Teacher",
    description:
      "Watch as your AI teacher guides you step-by-step\nbuilding real apps from scratch.\n\nNo coding experience? Perfect!\nThis is designed for complete beginners.",
    duration: 3000,
  },
  {
    id: 3,
    icon: Rocket,
    title: () => "Zero Configuration Needed",
    description:
      "No downloads. No installation. No setup.\nEverything runs directly in your browser.\n\nJust watch, understand, and learn.",
    duration: 3000,
  },
  {
    id: 4,
    icon: Users,
    title: () => "Community Support Always Available",
    description:
      "Join our Discord community\nGet help from experienced coaches and peers\nConnect with other learners\n\nYou're not alone on this journey!",
    duration: 3000,
  },
]

export function OrientationWelcome({ userName, onComplete }: OrientationWelcomeProps) {
  const router = useRouter()
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    if (currentMessage >= messages.length) {
      // Show transition message
      setIsTransitioning(true)
      const transitionTimer = setTimeout(() => {
        onComplete?.()
        router.push("/dashboard/vibecoding")
      }, 2000)

      return () => clearTimeout(transitionTimer)
    }

    // Auto-advance to next message
    const timer = setTimeout(() => {
      setIsFading(true)
      setTimeout(() => {
        setCurrentMessage((prev) => prev + 1)
        setIsFading(false)
      }, 500)
    }, messages[currentMessage].duration)

    return () => clearTimeout(timer)
  }, [currentMessage, router, onComplete])

  const handleSkip = () => {
    onComplete?.()
    router.push("/dashboard/vibecoding")
  }

  if (isTransitioning) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <div className="text-center animate-in fade-in duration-1000">
          <h2 className="text-3xl font-bold mb-4">Let's start with Lab 1...</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full animate-pulse" />
        </div>
      </div>
    )
  }

  if (currentMessage >= messages.length) {
    return null
  }

  const message = messages[currentMessage]
  const Icon = message.icon

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50 p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Skip Button */}
        <div className="absolute top-4 right-4">
          <Button variant="ghost" onClick={handleSkip}>
            Skip Intro
          </Button>
        </div>

        {/* Message Content */}
        <div
          className={cn(
            "space-y-6 transition-opacity duration-500",
            isFading ? "opacity-0" : "opacity-100 animate-in fade-in",
          )}
        >
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon className="w-12 h-12 text-primary" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold">{message.title(userName)}</h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground whitespace-pre-line max-w-xl mx-auto">
            {message.description}
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 pt-8">
          {messages.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentMessage ? "bg-primary w-8" : "bg-muted-foreground/30",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
