"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import type { ChatMessage, CoachState, ChatContextData } from "@/components/shared/floating-coach/types"

const FloatingCoachContext = createContext<ChatContextData | undefined>(undefined)

export function FloatingCoachProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [coachState, setCoachState] = useState<CoachState>("idle")

  const addMessage = useCallback((content: string, role: ChatMessage["role"]) => {
    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role,
      content,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return (
    <FloatingCoachContext.Provider
      value={{
        messages,
        isOpen,
        coachState,
        addMessage,
        setIsOpen,
        setCoachState,
        clearMessages,
      }}
    >
      {children}
    </FloatingCoachContext.Provider>
  )
}

export function useFloatingCoach() {
  const context = useContext(FloatingCoachContext)
  if (!context) {
    throw new Error("useFloatingCoach must be used within FloatingCoachProvider")
  }
  return context
}
