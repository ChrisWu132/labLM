"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useFloatingCoach } from "@/lib/contexts/floating-coach-context"
import { AvatarButton } from "./avatar-button"
import { ChatPanel } from "./chat-panel"
import type { FloatingCoachProps } from "./types"

// Lab configuration
const labs = [
  { number: 1, title: "Meet Your AI Friend", path: "/dashboard/vibecoding/labs/lab1" },
  { number: 2, title: "How AI Gets Smart", path: "/dashboard/vibecoding/labs/lab2" },
  { number: 3, title: "AI's Thinking Process", path: "/dashboard/vibecoding/labs/lab3" },
  { number: 4, title: "AI's Capabilities & Limits", path: "/dashboard/vibecoding/labs/lab4" },
  { number: 5, title: "Responsible AI Use", path: "/dashboard/vibecoding/labs/lab5" },
  { number: 6, title: "AI Workflow Builder", path: "/dashboard/vibecoding/labs/lab6" },
]

export function FloatingCoach({ currentModule }: FloatingCoachProps) {
  const pathname = usePathname()
  const { isOpen, setIsOpen, coachState, messages } = useFloatingCoach()
  const [hasUnreadMessage, setHasUnreadMessage] = useState(false)

  // Detect current lab from URL
  const currentLabMatch = pathname.match(/\/labs\/lab(\d+)/)
  const currentLab = currentLabMatch ? parseInt(currentLabMatch[1]) : undefined
  const currentLabInfo = labs.find((lab) => lab.number === currentLab)

  // Show notification badge if new message arrives while panel is closed
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.role === "coach") {
        setHasUnreadMessage(true)
      }
    } else {
      setHasUnreadMessage(false)
    }
  }, [isOpen, messages])

  return (
    <>
      {/* Floating Avatar Button */}
      <div className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6">
        <AvatarButton
          onClick={() => setIsOpen(true)}
          state={coachState}
          hasNotification={hasUnreadMessage}
        />
      </div>

      {/* Chat Panel */}
      <ChatPanel
        open={isOpen}
        onOpenChange={setIsOpen}
        currentModule={currentModule}
        currentLab={currentLab}
        currentLabTitle={currentLabInfo?.title}
      />
    </>
  )
}
