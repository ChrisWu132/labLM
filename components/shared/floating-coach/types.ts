export type ChatMessage = {
  id: string
  role: "student" | "coach"
  content: string
  timestamp: Date
  isLoading?: boolean
}

export type CoachState = "idle" | "thinking" | "active"

export type ChatPanelState = "closed" | "open"

export interface FloatingCoachProps {
  currentModule: number
  currentLab?: number
  currentLabTitle?: string
}

export interface ChatContextData {
  messages: ChatMessage[]
  isOpen: boolean
  coachState: CoachState
  addMessage: (content: string, role: ChatMessage["role"]) => void
  setIsOpen: (open: boolean) => void
  setCoachState: (state: CoachState) => void
  clearMessages: () => void
}
