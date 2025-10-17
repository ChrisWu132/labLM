# Floating AI Coach Avatar - Implementation Plan

**Version**: 1.0
**Date**: 2025-10-16
**Author**: Development Team
**Related PRD**: [floating-coach-prd.md](./floating-coach-prd.md)

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Phase 1: Foundation - Floating Avatar & Chat](#phase-1-foundation---floating-avatar--chat)
4. [Phase 2: Analytics & Report Generation](#phase-2-analytics--report-generation)
5. [Phase 3: Teacher Dashboard](#phase-3-teacher-dashboard)
6. [Testing Strategy](#testing-strategy)
7. [Deployment Plan](#deployment-plan)
8. [Risk Mitigation](#risk-mitigation)
9. [Success Metrics](#success-metrics)

---

## Overview

This document provides detailed implementation guidance for the Floating AI Coach Avatar feature. It breaks down the PRD requirements into actionable development tasks with technical specifications, file structure, and code patterns.

### Implementation Approach

- **Framework**: Next.js 14+ (App Router with Server Actions)
- **Styling**: Tailwind CSS + Radix UI primitives
- **State Management**: React Context API (Zustand if needed for complex state)
- **Database**: Supabase PostgreSQL
- **AI Provider**: OpenAI (existing integration)
- **Development Pattern**: Test-driven where applicable, mobile-first responsive design

### Estimated Timeline

- **Phase 1**: 2-3 weeks (Foundation)
- **Phase 2**: 1-2 weeks (Analytics)
- **Phase 3**: 2 weeks (Teacher Dashboard)
- **Testing & Polish**: 1 week
- **Total**: 6-8 weeks

---

## Prerequisites

### 1. Avatar Image Generation

**Task**: Generate coach avatar image using Gemini

**Prompt** (Option A - Recommended):
```
Create a friendly AI learning assistant avatar character for an educational platform. Style: modern flat design, circular avatar format (1024x1024px). The character should be a cute, approachable robot or AI guide with warm colors (soft blues, purples, and oranges). Features: large friendly eyes, small smile, wearing academic accessories like glasses or a graduation cap. The design should feel welcoming to students ages 18-35. Clean lines, minimal detail, works well at small sizes (48x48px when scaled). Transparent or solid color background. No text or UI elements.
```

**Steps**:
1. Generate image with Gemini
2. Download and save as `public/images/coach-avatar.png` (1024×1024px)
3. Optimize with `sharp` or similar tool
4. Create responsive versions:
   - `coach-avatar@2x.png` (96×96px for Retina)
   - `coach-avatar.png` (48×48px)

### 2. Dependencies Installation

```bash
# Install required packages
npm install @radix-ui/react-dialog@latest
npm install @radix-ui/react-toast@latest
npm install zustand  # If using for state management
npm install framer-motion  # Optional: for advanced animations
npm install react-intersection-observer  # For lazy loading
```

### 3. Environment Setup

Add to `.env.local` (if needed):
```env
# Feature flags
NEXT_PUBLIC_FLOATING_COACH_ENABLED=true
NEXT_PUBLIC_AUTO_GENERATE_REPORTS=true

# Report generation
OPENAI_REPORT_MODEL=gpt-4-turbo-preview
REPORT_CACHE_TTL_HOURS=24
```

---

## Phase 1: Foundation - Floating Avatar & Chat

### Step 1.1: Remove Existing Coach Components

**Files to Modify**:
- `app/dashboard/vibecoding/layout.tsx`
- `app/dashboard/layout.tsx` (if coach references exist)
- `components/layout/dashboard-header.tsx` (if coach in topbar)

**Tasks**:

1. **Create archive folder**:
```bash
mkdir -p archive/coach-components
```

2. **Move deprecated components**:
```bash
git mv components/shared/coach-drawer.tsx archive/coach-components/
```

3. **Remove coach code from sidebar**:

In `app/dashboard/vibecoding/layout.tsx`:
- Delete lines 66-345 (coach state, handlers, UI)
- Remove imports: `MessageSquare`, `Send`, `Loader2`, `Textarea`
- Remove state: `coachOpen`, `coachQuestion`, `coachResponse`, `isAskingCoach`
- Remove handler: `handleAskCoach`

**Git Commit**:
```bash
git add .
git commit -m "refactor: Remove sidebar and topbar coach components

- Archive CoachDrawer component for reference
- Remove coach UI from vibecoding layout sidebar
- Preserve server actions for reuse in new floating coach
- Part of floating coach avatar implementation (FR30, FR31)"
```

---

### Step 1.2: Create Floating Coach Component Structure

**File Structure**:
```
components/
  shared/
    floating-coach/
      index.tsx              # Main component export
      floating-coach.tsx     # Core component
      chat-panel.tsx         # Expanded chat UI
      message.tsx            # Message bubble component
      context-badge.tsx      # Current lab/module indicator
      avatar-button.tsx      # Floating button
      types.ts               # Component-specific types
      animations.ts          # CSS-in-JS animations
```

**Create Base Files**:

```bash
mkdir -p components/shared/floating-coach
touch components/shared/floating-coach/{index,floating-coach,chat-panel,message,context-badge,avatar-button,types,animations}.tsx
```

**1. Create Types** (`components/shared/floating-coach/types.ts`):

```typescript
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
```

**2. Create Context Provider** (`lib/contexts/floating-coach-context.tsx`):

```typescript
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
```

**3. Wrap App with Provider**:

In `app/dashboard/layout.tsx`:

```typescript
import { FloatingCoachProvider } from "@/lib/contexts/floating-coach-context"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <FloatingCoachProvider>
      {/* existing layout code */}
      {children}
    </FloatingCoachProvider>
  )
}
```

---

### Step 1.3: Implement Avatar Button Component

**File**: `components/shared/floating-coach/avatar-button.tsx`

```typescript
"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import type { CoachState } from "./types"

interface AvatarButtonProps {
  onClick: () => void
  state: CoachState
  hasNotification?: boolean
}

export function AvatarButton({ onClick, state, hasNotification }: AvatarButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-12 h-12 md:w-14 md:h-14 rounded-full shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 overflow-hidden bg-primary"
      aria-label="Open AI Learning Coach"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        scale: state === "idle" ? [1, 1.05, 1] : 1,
      }}
      transition={{
        duration: 2,
        repeat: state === "idle" ? Infinity : 0,
        ease: "easeInOut",
      }}
    >
      {/* Avatar Image */}
      <Image
        src="/images/coach-avatar.png"
        alt="AI Coach"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 40px, 48px"
        priority
      />

      {/* Thinking State - Pulsing Glow */}
      {state === "thinking" && (
        <motion.div
          className="absolute inset-0 bg-primary/30 rounded-full"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {/* Notification Badge */}
      {hasNotification && (
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.button>
  )
}
```

---

### Step 1.4: Implement Chat Panel Component

**File**: `components/shared/floating-coach/chat-panel.tsx`

```typescript
"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, Loader2, MessageSquare, BookOpen } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useFloatingCoach } from "@/lib/contexts/floating-coach-context"
import { Message } from "./message"
import { ContextBadge } from "./context-badge"
import { askCoach } from "@/lib/actions/coach"
import { useToast } from "@/hooks/use-toast"

interface ChatPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentModule: number
  currentLab?: number
  currentLabTitle?: string
}

export function ChatPanel({ open, onOpenChange, currentModule, currentLab, currentLabTitle }: ChatPanelProps) {
  const { messages, addMessage, coachState, setCoachState } = useFloatingCoach()
  const { toast } = useToast()
  const [input, setInput] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isSubmitting) return

    const userMessage = input.trim()
    setInput("")
    addMessage(userMessage, "student")
    setIsSubmitting(true)
    setCoachState("thinking")

    try {
      const result = await askCoach({
        userMessage,
        context: "Prompt Engineering Lab",
        moduleNumber: currentModule,
        additionalContext: { labNumber: currentLab },
      })

      if (result.success && result.message) {
        addMessage(result.message, "coach")
        toast({
          title: "Coach responded",
          description: `Response time: ${result.latencyMs}ms`,
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to get coach response",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      setCoachState("idle")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] md:h-[600px] md:max-w-[360px] md:right-4 md:bottom-4 md:left-auto md:top-auto md:rounded-lg"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            AI Learning Coach
          </SheetTitle>
          <SheetDescription>Ask me anything about your current lab</SheetDescription>
        </SheetHeader>

        {/* Current Context */}
        {currentLabTitle && (
          <ContextBadge labNumber={currentLab} labTitle={currentLabTitle} />
        )}

        {/* Messages */}
        <ScrollArea className="flex-1 h-[calc(100%-180px)] mt-4" ref={scrollRef}>
          <div className="space-y-4 pr-4">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-8">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Hi! I'm your AI learning coach.</p>
                <p className="mt-1">Ask me anything about your current lab!</p>
              </div>
            )}
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            {isSubmitting && (
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Coach is thinking...</span>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <form onSubmit={handleSubmit} className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your coach anything..."
              rows={2}
              disabled={isSubmitting}
              className="resize-none min-h-[60px] max-h-[120px]"
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
```

---

### Step 1.5: Implement Message Component

**File**: `components/shared/floating-coach/message.tsx`

```typescript
import { formatDistanceToNow } from "date-fns"
import Image from "next/image"
import type { ChatMessage } from "./types"

interface MessageProps {
  message: ChatMessage
}

export function Message({ message }: MessageProps) {
  const isCoach = message.role === "coach"

  return (
    <div className={`flex gap-2 ${isCoach ? "flex-row" : "flex-row-reverse"}`}>
      {/* Avatar */}
      {isCoach && (
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src="/images/coach-avatar.png"
            alt="Coach"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>
      )}

      {/* Message Bubble */}
      <div className="flex flex-col flex-1 max-w-[80%]">
        <div
          className={`rounded-lg px-3 py-2 ${
            isCoach
              ? "bg-muted text-foreground"
              : "bg-primary text-primary-foreground"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-1">
          {formatDistanceToNow(message.timestamp, { addSuffix: true })}
        </span>
      </div>
    </div>
  )
}
```

---

### Step 1.6: Implement Context Badge Component

**File**: `components/shared/floating-coach/context-badge.tsx`

```typescript
import { BookOpen } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ContextBadgeProps {
  labNumber?: number
  labTitle?: string
}

export function ContextBadge({ labNumber, labTitle }: ContextBadgeProps) {
  if (!labNumber || !labTitle) return null

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="mt-3 p-2 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-2 cursor-help">
            <BookOpen className="w-4 h-4 text-primary" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-primary">Lab {labNumber}</p>
              <p className="text-xs text-muted-foreground truncate">{labTitle}</p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Your coach knows you're working on this lab</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
```

---

### Step 1.7: Create Main Floating Coach Component

**File**: `components/shared/floating-coach/floating-coach.tsx`

```typescript
"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useFloatingCoach } from "@/lib/contexts/floating-coach-context"
import { AvatarButton } from "./avatar-button"
import { ChatPanel } from "./chat-panel"
import type { FloatingCoachProps } from "./types"

// Lab configuration (could be moved to a config file)
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
```

**File**: `components/shared/floating-coach/index.tsx`

```typescript
export { FloatingCoach } from "./floating-coach"
export type { FloatingCoachProps } from "./types"
```

---

### Step 1.8: Add Floating Coach to Layout

**File**: `app/dashboard/vibecoding/layout.tsx` (simplified)

```typescript
import { FloatingCoach } from "@/components/shared/floating-coach"

export default function VibeCodingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar code (unchanged) */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>

      {/* Floating Coach - always accessible */}
      <FloatingCoach currentModule={2} />
    </div>
  )
}
```

---

## Phase 2: Analytics & Report Generation

### Step 2.1: Create Database Migration for Reports

**File**: `supabase/migrations/YYYYMMDDHHMMSS_create_student_reports.sql`

```sql
-- Create student_reports table
CREATE TABLE IF NOT EXISTS public.student_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  date_range_start TIMESTAMPTZ,
  date_range_end TIMESTAMPTZ,
  report_data JSONB NOT NULL,
  ai_insights TEXT,
  metadata JSONB DEFAULT '{}',
  version INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_student_reports_user_id ON public.student_reports(user_id);
CREATE INDEX idx_student_reports_generated_at ON public.student_reports(generated_at DESC);

-- RLS Policies
ALTER TABLE public.student_reports ENABLE ROW LEVEL SECURITY;

-- Students can read their own reports
CREATE POLICY "Users can view own reports"
  ON public.student_reports
  FOR SELECT
  USING (auth.uid() = user_id);

-- Only system can insert/update (via service role)
CREATE POLICY "Service role can manage reports"
  ON public.student_reports
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create teacher_assignments table
CREATE TABLE IF NOT EXISTS public.teacher_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  assigned_by UUID REFERENCES auth.users(id),
  UNIQUE(teacher_id, student_id)
);

-- Indexes
CREATE INDEX idx_teacher_assignments_teacher ON public.teacher_assignments(teacher_id);
CREATE INDEX idx_teacher_assignments_student ON public.teacher_assignments(student_id);

-- RLS
ALTER TABLE public.teacher_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers can view own assignments"
  ON public.teacher_assignments
  FOR SELECT
  USING (auth.uid() = teacher_id);

-- Admins can manage all assignments
CREATE POLICY "Admins can manage assignments"
  ON public.teacher_assignments
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
      AND raw_user_meta_data->>'role' = 'admin'
    )
  );
```

**Run Migration**:
```bash
npx supabase db push
```

---

### Step 2.2: Create TypeScript Types

**File**: `lib/types.ts` (add to existing)

```typescript
export interface StudentReport {
  id: string
  user_id: string
  generated_at: string
  date_range_start?: string
  date_range_end?: string
  report_data: ReportData
  ai_insights?: string
  metadata: ReportMetadata
  version: number
  created_at: string
  updated_at: string
}

export interface ReportData {
  totalQuestions: number
  labsCompleted: number
  topicsExplored: string[]
  mostActiveLab: number
  labDistribution: Record<number, number>
  timePatterns: Record<string, number>
  avgResponseTime: number
  strugglingTopics: string[]
  masteredTopics: string[]
  independenceScore: number
}

export interface ReportMetadata {
  generatedBy: string
  processingTime: number
  transcriptCount: number
}

export interface TeacherAssignment {
  id: string
  teacher_id: string
  student_id: string
  assigned_at: string
  assigned_by?: string
}

export interface StudentSummary {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  labs_completed: number
  current_lab: number
  total_questions: number
  last_question_date?: string
  engagement_score: number
}
```

---

### Step 2.3: Build Transcript Analyzer

**File**: `lib/analytics/transcript-analyzer.ts`

```typescript
import type { CoachTranscript } from "@/lib/types"

interface TranscriptAnalysis {
  totalQuestions: number
  topicsExplored: string[]
  mostActiveLab: number
  labDistribution: Record<number, number>
  timePatterns: Record<string, number>
  avgResponseTime: number
  strugglingTopics: string[]
  masteredTopics: string[]
}

// Common programming/learning topics
const KNOWN_TOPICS = [
  "async", "promise", "api", "database", "authentication", "state", "props",
  "component", "hook", "effect", "deployment", "testing", "debugging",
  "error", "syntax", "logic", "algorithm", "performance", "security"
]

export function analyzeTranscripts(transcripts: CoachTranscript[]): TranscriptAnalysis {
  if (transcripts.length === 0) {
    return {
      totalQuestions: 0,
      topicsExplored: [],
      mostActiveLab: 0,
      labDistribution: {},
      timePatterns: {},
      avgResponseTime: 0,
      strugglingTopics: [],
      masteredTopics: [],
    }
  }

  // Lab distribution
  const labDist: Record<number, number> = {}
  transcripts.forEach((t) => {
    const labNum = t.additionalContext?.labNumber || 0
    labDist[labNum] = (labDist[labNum] || 0) + 1
  })

  const mostActiveLab = Object.entries(labDist).reduce((a, b) => (b[1] > a[1] ? b : a))[0]

  // Time patterns (hour of day)
  const timeDist: Record<string, number> = {}
  transcripts.forEach((t) => {
    const hour = new Date(t.created_at).getHours()
    const timeSlot = `${hour}:00`
    timeDist[timeSlot] = (timeDist[timeSlot] || 0) + 1
  })

  // Topics
  const topicCounts: Record<string, number> = {}
  transcripts.forEach((t) => {
    const topics = extractTopicsFromMessage(t.user_message)
    topics.forEach((topic) => {
      topicCounts[topic] = (topicCounts[topic] || 0) + 1
    })
  })

  const allTopics = Object.keys(topicCounts)
  const strugglingTopics = allTopics.filter((t) => topicCounts[t] >= 3)
  const masteredTopics = allTopics.filter((t) => topicCounts[t] === 1)

  // Avg latency
  const avgLatency =
    transcripts.reduce((sum, t) => sum + (t.latency_ms || 0), 0) / transcripts.length

  return {
    totalQuestions: transcripts.length,
    topicsExplored: allTopics,
    mostActiveLab: parseInt(mostActiveLab),
    labDistribution: labDist,
    timePatterns: timeDist,
    avgResponseTime: Math.round(avgLatency),
    strugglingTopics,
    masteredTopics,
  }
}

export function extractTopicsFromMessage(message: string): string[] {
  const lowerMessage = message.toLowerCase()
  const foundTopics: string[] = []

  KNOWN_TOPICS.forEach((topic) => {
    if (lowerMessage.includes(topic)) {
      foundTopics.push(topic)
    }
  })

  return foundTopics
}

export function calculateIndependenceScore(
  transcripts: CoachTranscript[],
  labsCompleted: number
): number {
  if (labsCompleted === 0) return 0

  const questionsPerLab = transcripts.length / labsCompleted

  // Lower questions per lab = higher independence
  // Scale: 0-3 questions/lab = 100 score, 10+ = 0 score
  const rawScore = Math.max(0, 100 - (questionsPerLab * 10))

  return Math.round(rawScore)
}
```

---

### Step 2.4: Build AI Insight Generator

**File**: `lib/analytics/insight-generator.ts`

```typescript
import { createChatCompletion } from "@/lib/ai/openai-client"
import type { CoachTranscript } from "@/lib/types"

interface LearningInsights {
  strengths: string
  areasForImprovement: string
  learningStyle: string
  recommendations: string[]
  notableBreakthroughs: string[]
}

const INSIGHT_SYSTEM_PROMPT = `You are an educational data analyst who generates personalized learning insights for students based on their interactions with an AI learning coach.

Your role:
- Analyze conversation patterns to identify strengths and areas for growth
- Provide specific, actionable, encouraging feedback
- Reference actual topics and labs the student worked on
- Identify learning style from question patterns
- Suggest concrete next steps

Tone: Supportive, specific, growth-oriented. Avoid generic statements.`

export async function generateLearningInsights(
  analysisData: any,
  sampleTranscripts: CoachTranscript[]
): Promise<LearningInsights> {
  try {
    // Prepare context for AI
    const context = `
Student Learning Analysis:
- Total Questions: ${analysisData.totalQuestions}
- Most Active Lab: Lab ${analysisData.mostActiveLab}
- Topics Explored: ${analysisData.topicsExplored.join(", ")}
- Struggling Topics: ${analysisData.strugglingTopics.join(", ") || "None"}
- Independence Score: ${analysisData.independenceScore}/100

Sample Recent Questions:
${sampleTranscripts.slice(-5).map((t, i) => `${i + 1}. "${t.user_message}"`).join("\n")}

Generate a learning report with:
1. Strengths (paragraph)
2. Areas for improvement (paragraph)
3. Learning style description
4. 3-5 specific recommendations
5. Notable breakthrough moments (if any)

Format as JSON:
{
  "strengths": "...",
  "areasForImprovement": "...",
  "learningStyle": "...",
  "recommendations": ["...", "..."],
  "notableBreakthroughs": ["..."]
}
`

    const response = await createChatCompletion(context, INSIGHT_SYSTEM_PROMPT, {
      maxTokens: 600,
      temperature: 0.7,
    })

    // Parse JSON response
    const insights = JSON.parse(response) as LearningInsights

    return insights
  } catch (error) {
    console.error("[generateLearningInsights] Error:", error)

    // Fallback to template-based insights
    return {
      strengths: `This student has asked ${analysisData.totalQuestions} thoughtful questions, showing strong engagement with the material.`,
      areasForImprovement: analysisData.strugglingTopics.length > 0
        ? `Consider reviewing: ${analysisData.strugglingTopics.join(", ")}.`
        : "Continue exploring new topics to broaden understanding.",
      learningStyle: "Engaged learner who seeks clarification when needed.",
      recommendations: [
        "Continue current pace of learning",
        "Try building a small project to apply concepts",
        "Explore advanced topics in most active lab",
      ],
      notableBreakthroughs: [],
    }
  }
}

export function detectBreakthroughMoments(transcripts: CoachTranscript[]): string[] {
  const breakthroughs: string[] = []

  // Simple heuristics for breakthroughs
  transcripts.forEach((t) => {
    const msg = t.user_message.toLowerCase()

    if (msg.includes("i understand now") || msg.includes("ah, i see")) {
      breakthroughs.push(`Breakthrough on: ${t.context_tag}`)
    }

    if (msg.includes("it works!") || msg.includes("finally")) {
      breakthroughs.push(`Successfully resolved issue in Lab ${t.additionalContext?.labNumber}`)
    }
  })

  return breakthroughs.slice(0, 3) // Return top 3
}
```

---

### Step 2.5: Create Report Generation Server Action

**File**: `lib/actions/reports.ts`

```typescript
"use server"

import { getSupabaseServer } from "@/lib/supabase-server"
import { analyzeTranscripts, calculateIndependenceScore } from "@/lib/analytics/transcript-analyzer"
import { generateLearningInsights } from "@/lib/analytics/insight-generator"
import type { StudentReport } from "@/lib/types"

interface GenerateReportOptions {
  dateRange?: { start: Date; end: Date }
  forceRegenerate?: boolean
}

interface GenerateReportResponse {
  success: boolean
  report?: StudentReport
  error?: string
}

export async function generateStudentReport(
  studentId: string,
  options?: GenerateReportOptions
): Promise<GenerateReportResponse> {
  const startTime = Date.now()

  try {
    const supabase = await getSupabaseServer()

    // 1. Auth check
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { success: false, error: "Authentication required" }
    }

    // 2. Authorization check (teacher or admin)
    const userRole = user.user_metadata?.role
    if (userRole === "teacher") {
      // Verify teacher is assigned to this student
      const { data: assignment } = await supabase
        .from("teacher_assignments")
        .select("id")
        .eq("teacher_id", user.id)
        .eq("student_id", studentId)
        .single()

      if (!assignment) {
        return { success: false, error: "Not authorized to view this student's report" }
      }
    } else if (userRole !== "admin") {
      return { success: false, error: "Insufficient permissions" }
    }

    // 3. Check cache (unless force regenerate)
    if (!options?.forceRegenerate) {
      const { data: cachedReport } = await supabase
        .from("student_reports")
        .select("*")
        .eq("user_id", studentId)
        .gte("generated_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .order("generated_at", { ascending: false })
        .limit(1)
        .single()

      if (cachedReport) {
        console.log("[generateStudentReport] Returning cached report")
        return { success: true, report: cachedReport as StudentReport }
      }
    }

    // 4. Fetch transcripts
    let query = supabase
      .from("coach_transcripts")
      .select("*")
      .eq("user_id", studentId)
      .order("created_at", { ascending: true })

    if (options?.dateRange) {
      query = query
        .gte("created_at", options.dateRange.start.toISOString())
        .lte("created_at", options.dateRange.end.toISOString())
    }

    const { data: transcripts, error: transcriptError } = await query

    if (transcriptError) {
      console.error("[generateStudentReport] Transcript fetch error:", transcriptError)
      return { success: false, error: "Failed to fetch student data" }
    }

    if (!transcripts || transcripts.length === 0) {
      return { success: false, error: "No coach interactions found for this student" }
    }

    // 5. Analyze transcripts
    const analysis = analyzeTranscripts(transcripts)

    // 6. Get labs completed (fetch from sandpack_submissions or progress table)
    const { data: submissions } = await supabase
      .from("sandpack_submissions")
      .select("lab_number")
      .eq("user_id", studentId)
      .eq("completed", true)

    const labsCompleted = new Set(submissions?.map((s) => s.lab_number) || []).size

    // Calculate independence score
    const independenceScore = calculateIndependenceScore(transcripts, labsCompleted)

    // 7. Generate AI insights
    const insights = await generateLearningInsights(
      { ...analysis, independenceScore },
      transcripts
    )

    // 8. Build report data
    const reportData = {
      totalQuestions: analysis.totalQuestions,
      labsCompleted,
      topicsExplored: analysis.topicsExplored,
      mostActiveLab: analysis.mostActiveLab,
      labDistribution: analysis.labDistribution,
      timePatterns: analysis.timePatterns,
      avgResponseTime: analysis.avgResponseTime,
      strugglingTopics: analysis.strugglingTopics,
      masteredTopics: analysis.masteredTopics,
      independenceScore,
    }

    const metadata = {
      generatedBy: user.id,
      processingTime: Date.now() - startTime,
      transcriptCount: transcripts.length,
    }

    // 9. Save to database
    const { data: savedReport, error: saveError } = await supabase
      .from("student_reports")
      .insert({
        user_id: studentId,
        generated_at: new Date().toISOString(),
        date_range_start: options?.dateRange?.start.toISOString(),
        date_range_end: options?.dateRange?.end.toISOString(),
        report_data: reportData,
        ai_insights: JSON.stringify(insights),
        metadata,
      })
      .select()
      .single()

    if (saveError) {
      console.error("[generateStudentReport] Save error:", saveError)
      return { success: false, error: "Failed to save report" }
    }

    console.log(`[generateStudentReport] Report generated in ${Date.now() - startTime}ms`)

    return { success: true, report: savedReport as StudentReport }

  } catch (error: any) {
    console.error("[generateStudentReport] Unexpected error:", error)
    return { success: false, error: "Failed to generate report" }
  }
}
```

---

## Phase 3: Teacher Dashboard

### Step 3.1: Create Teacher Dashboard Route

**File**: `app/dashboard/teacher/page.tsx`

```typescript
import { Suspense } from "react"
import { redirect } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase-server"
import { StudentList } from "@/components/teacher/student-list"
import { DashboardStats } from "@/components/teacher/dashboard-stats"
import { Search, Users } from "lucide-react"

export default async function TeacherDashboardPage() {
  const supabase = await getSupabaseServer()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const userRole = user.user_metadata?.role
  if (userRole !== "teacher" && userRole !== "admin") {
    redirect("/dashboard")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">My Students</h1>
        </div>
        <p className="text-muted-foreground">
          Monitor learning progress and access detailed insights
        </p>
      </div>

      {/* Stats Overview */}
      <Suspense fallback={<div>Loading stats...</div>}>
        <DashboardStats teacherId={user.id} />
      </Suspense>

      {/* Student List */}
      <Suspense fallback={<div>Loading students...</div>}>
        <StudentList teacherId={user.id} />
      </Suspense>
    </div>
  )
}
```

**Continue with remaining implementation steps for teacher dashboard components, search/filter, report modal, etc. in similar detailed fashion...**

---

## Testing Strategy

### Unit Tests

**Test Files to Create**:
- `components/shared/floating-coach/__tests__/avatar-button.test.tsx`
- `components/shared/floating-coach/__tests__/chat-panel.test.tsx`
- `lib/analytics/__tests__/transcript-analyzer.test.ts`
- `lib/analytics/__tests__/insight-generator.test.ts`

**Sample Test** (`transcript-analyzer.test.ts`):

```typescript
import { analyzeTranscripts, extractTopicsFromMessage } from "../transcript-analyzer"

describe("Transcript Analyzer", () => {
  describe("extractTopicsFromMessage", () => {
    it("should extract known topics from message", () => {
      const message = "I'm having trouble with async promises in my API"
      const topics = extractTopicsFromMessage(message)

      expect(topics).toContain("async")
      expect(topics).toContain("promise")
      expect(topics).toContain("api")
    })

    it("should return empty array for message without topics", () => {
      const message = "Hello, how are you?"
      const topics = extractTopicsFromMessage(message)

      expect(topics).toEqual([])
    })
  })

  describe("analyzeTranscripts", () => {
    it("should return zero values for empty transcripts", () => {
      const result = analyzeTranscripts([])

      expect(result.totalQuestions).toBe(0)
      expect(result.topicsExplored).toEqual([])
    })

    it("should calculate lab distribution correctly", () => {
      const transcripts = [
        { additionalContext: { labNumber: 1 } },
        { additionalContext: { labNumber: 1 } },
        { additionalContext: { labNumber: 2 } },
      ]

      const result = analyzeTranscripts(transcripts)

      expect(result.labDistribution[1]).toBe(2)
      expect(result.labDistribution[2]).toBe(1)
    })
  })
})
```

### Integration Tests

Test full flow:
1. Student asks question → Response received → Stored in DB
2. Report generation → Fetches transcripts → Analyzes → Saves report
3. Teacher views student → Opens modal → Report displays

### E2E Tests (Playwright)

**File**: `e2e/floating-coach.spec.ts`

```typescript
import { test, expect } from "@playwright/test"

test.describe("Floating Coach Avatar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard/vibecoding/labs/lab1")
  })

  test("should display floating avatar button", async ({ page }) => {
    const avatar = page.getByRole("button", { name: /open ai learning coach/i })
    await expect(avatar).toBeVisible()
  })

  test("should open chat panel when avatar clicked", async ({ page }) => {
    await page.click('[aria-label="Open AI Learning Coach"]')

    await expect(page.getByText("AI Learning Coach")).toBeVisible()
    await expect(page.getByPlaceholder("Ask your coach anything")).toBeVisible()
  })

  test("should send question and receive response", async ({ page }) => {
    await page.click('[aria-label="Open AI Learning Coach"]')
    await page.fill('[placeholder="Ask your coach anything"]', "What is async?")
    await page.click('button[type="submit"]')

    // Wait for response
    await expect(page.getByText("Coach is thinking")).toBeVisible()
    await expect(page.getByText(/async/i)).toBeVisible({ timeout: 10000 })
  })
})
```

---

## Deployment Plan

### Pre-Deployment Checklist

- [ ] All unit tests passing
- [ ] Integration tests passing
- [ ] E2E tests passing on staging
- [ ] Avatar image optimized and uploaded
- [ ] Database migrations applied to staging
- [ ] Environment variables configured
- [ ] Feature flag ready (`NEXT_PUBLIC_FLOATING_COACH_ENABLED`)
- [ ] Performance testing completed (report generation <5s)
- [ ] Accessibility audit passed (WCAG AA)
- [ ] Mobile testing completed (iOS Safari, Chrome Mobile)

### Deployment Steps

1. **Deploy to Staging**:
```bash
git checkout main
git pull
git checkout -b feature/floating-coach
# ... commit all changes
git push origin feature/floating-coach
```

2. **Run Migrations**:
```bash
npx supabase db push --linked
```

3. **Deploy to Vercel**:
```bash
vercel --prod
```

4. **Enable Feature Flag** (gradual rollout):
```env
# Start with 10% of users
NEXT_PUBLIC_FLOATING_COACH_ENABLED=true
NEXT_PUBLIC_FLOATING_COACH_ROLLOUT_PERCENTAGE=10
```

5. **Monitor**:
- Check Vercel logs for errors
- Monitor Supabase dashboard for database load
- Track user engagement metrics

6. **Increase Rollout**:
- 10% → 25% → 50% → 100% over 1 week

---

## Risk Mitigation

### Risk 1: Performance Degradation
**Mitigation**:
- Implement report caching (24-hour TTL)
- Use database indexes on frequently queried fields
- Paginate conversation history (max 50 messages in UI)
- Monitor response times with logging

### Risk 2: AI Insight Generation Failures
**Mitigation**:
- Implement fallback to template-based insights
- Set AI request timeout to 10s
- Retry logic (1 retry with exponential backoff)
- Error boundaries prevent UI crashes

### Risk 3: Mobile UX Issues
**Mitigation**:
- Extensive mobile testing on real devices
- Touch target sizes ≥44px
- Safe area insets respected
- Virtual keyboard handling tested

### Risk 4: Database Migration Failures
**Mitigation**:
- Test migrations in dev environment first
- Create rollback scripts
- Backup production database before migration
- Apply migrations during low-traffic window

---

## Success Metrics

**Engagement Metrics**:
- % of students who use floating coach (target: >60%)
- Average questions per student per week (target: 5+)
- Chat panel open rate (target: >40% of sessions)

**Teacher Metrics**:
- % of teachers viewing student reports weekly (target: >70%)
- Report export rate (target: >20% of views)
- Time spent on dashboard (indicates usefulness)

**Technical Metrics**:
- Report generation time (target: <5s p95)
- Coach response latency (target: <2s p90)
- Error rate (target: <1%)
- Uptime (target: 99.9%)

**Quality Metrics**:
- Student satisfaction survey score (target: 4+/5)
- Teacher usefulness rating (target: 4+/5)
- Accessibility compliance (target: WCAG AA)

---

**End of Implementation Plan**
