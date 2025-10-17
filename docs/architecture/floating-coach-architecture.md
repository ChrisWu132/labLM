# Floating AI Coach Avatar - Architecture Document

**Project**: LLM Learning Lab - Floating Coach Feature
**Version**: 1.0
**Last Updated**: 2025-10-17
**Status**: Design Complete, Ready for Implementation

---

## 📋 Document Overview

This document describes the technical architecture for the Floating AI Coach Avatar feature, which replaces the sidebar/topbar coach implementation with a persistent, accessible floating button and chat interface.

### Related Documents

- [Floating Coach PRD](../prd/floating-coach-prd.md) - Product requirements
- [Floating Coach Implementation Plan](../prd/floating-coach-implementation-plan.md) - Implementation phases
- [Data Model & Services](./data-model-and-services.md) - Database schema
- [Tech Stack](./tech-stack.md) - Technology choices

---

## 🎯 Goals and Scope

### Primary Goals

1. **Always-Available Coach**: Floating avatar button accessible on all authenticated pages
2. **Context-Aware Help**: Coach knows current lab/module and provides relevant guidance
3. **Teacher Insights**: AI-powered learning reports for teachers
4. **Student Analytics**: Track learning patterns through coach interactions

### Key Features

**Student-Facing**:
- Floating avatar button (bottom-right)
- Expandable chat panel
- Conversation history persistence
- Context awareness (current lab)
- Student learning report generation

**Teacher-Facing**:
- Teacher dashboard with student list
- AI-generated learning reports
- Student progress monitoring
- Intervention recommendations

---

## 🏗️ High-Level Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│           Student View (All Pages)                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   Page Content (Labs, Dashboard, etc.)              │   │
│  │                                                      │   │
│  │                                                      │   │
│  │                                                      │   │
│  │                                           ┌────────┐ │   │
│  │                                           │  🤖   │ │   │ Floating Avatar
│  │                                           │ Coach │ │   │ (48x48px)
│  │                                           └────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  Click Avatar ────▶  ┌─────────────────────────┐            │
│                      │  💬 Chat Panel          │            │
│                      │  (360x600px)            │            │
│                      │  ┌────────────────────┐ │            │
│                      │  │ Lab 3 Context      │ │            │
│                      │  ├────────────────────┤ │            │
│                      │  │ Conversation       │ │            │
│                      │  │ History            │ │            │
│                      │  │ ...                │ │            │
│                      │  ├────────────────────┤ │            │
│                      │  │ [Type message...]  │ │            │
│                      │  └────────────────────┘ │            │
│                      └─────────────────────────┘            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│           Teacher View (/dashboard/teacher)                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  📊 Teacher Dashboard                                │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐             │   │
│  │  │Student 1│  │Student 2│  │Student 3│             │   │
│  │  │45 Q     │  │12 Q     │  │78 Q     │             │   │
│  │  │Lab 3    │  │Lab 2    │  │Lab 5    │             │   │
│  │  └─────────┘  └─────────┘  └─────────┘             │   │
│  │                                                      │   │
│  │  Click Student ────▶  Report Modal                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

           │                                    │
           ▼                                    ▼
    ┌─────────────────────────────────────────────────┐
    │       Next.js Server Actions                    │
    │  ┌───────────────────────────────────────────┐  │
    │  │  lib/actions/coach.ts:                    │  │
    │  │  - askCoach()  [existing, updated]        │  │
    │  │  - getRecentCoachHistory()                │  │
    │  └───────────────────────────────────────────┘  │
    │  ┌───────────────────────────────────────────┐  │
    │  │  lib/actions/reports.ts:                  │  │
    │  │  - generateStudentReport()                │  │
    │  │  - analyzeTranscripts()                   │  │
    │  │  - generateLearningInsights()             │  │
    │  └───────────────────────────────────────────┘  │
    │  ┌───────────────────────────────────────────┐  │
    │  │  lib/actions/teacher.ts:                  │  │
    │  │  - getMyStudents()                        │  │
    │  │  - getStudentReport()                     │  │
    │  └───────────────────────────────────────────┘  │
    └──────┬─────────────────────┬──────────────────┘
           │                     │
           ▼                     ▼
    ┌────────────┐         ┌──────────┐
    │ Supabase   │         │ OpenAI   │
    │ PostgreSQL │         │ GPT-4o   │
    └────────────┘         └──────────┘
```

---

## 🧩 Component Architecture

### Frontend Component Hierarchy

```
components/shared/
├── floating-coach.tsx                 # Main floating avatar + chat panel
│   └── FloatingCoach (Client Component)
│       ├── Avatar Button (always visible)
│       ├── Chat Panel (Sheet from Radix UI)
│       │   ├── Header (context badge)
│       │   ├── Message History (scrollable)
│       │   └── Input Area (textarea + send)
│       └── Context Detection Hook

app/dashboard/teacher/
├── page.tsx                           # Teacher dashboard (RSC)
├── components/
│   ├── StudentGrid.tsx                # Grid of student cards
│   ├── StudentCard.tsx                # Individual student summary
│   ├── StudentReportModal.tsx         # Report display modal
│   │   ├── Quick Stats Section
│   │   ├── Learning Timeline
│   │   ├── Strengths Section
│   │   ├── Areas for Growth
│   │   ├── AI Insights (speech bubble)
│   │   └── Recommendations
│   └── DashboardFilters.tsx           # Search and filter controls
```

### Key Components Detail

#### 1. FloatingCoach Component

```typescript
// components/shared/floating-coach.tsx
'use client'

import { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { MessageSquare, Send } from 'lucide-react'
import { askCoach } from '@/lib/actions/coach'

interface Message {
  id: string
  role: 'user' | 'coach'
  content: string
  timestamp: Date
}

export function FloatingCoach() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [context, setContext] = useState<{
    labNumber?: number
    labTitle?: string
  }>({})

  // Detect current lab from URL
  useEffect(() => {
    const pathname = window.location.pathname
    const labMatch = pathname.match(/labs\/lab(\d+)/)
    if (labMatch) {
      setContext({
        labNumber: parseInt(labMatch[1]),
        labTitle: `Lab ${labMatch[1]}`
      })
    }
  }, [])

  // Load conversation history on mount
  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    // Load last 20 messages from database
    const response = await fetch('/api/coach/history?limit=20')
    if (response.ok) {
      const { messages } = await response.json()
      setMessages(messages)
    }
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await askCoach({
        userMessage: input,
        context: 'PromptLab',
        moduleNumber: context.labNumber
      })

      if (response.success && response.message) {
        const coachMessage: Message = {
          id: `coach-${Date.now()}`,
          role: 'coach',
          content: response.message,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, coachMessage])
      }
    } catch (error) {
      console.error('Coach error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Avatar Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-purple-600 shadow-lg hover:shadow-xl transition-all hover:scale-105 z-50 flex items-center justify-center animate-breathing"
        aria-label="Open AI Learning Coach"
      >
        <MessageSquare className="w-6 h-6 text-white" />
      </button>

      {/* Chat Panel */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-[360px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>AI Learning Coach</SheetTitle>
            {context.labTitle && (
              <div className="text-sm text-muted-foreground">
                Currently: {context.labTitle}
              </div>
            )}
          </SheetHeader>

          {/* Message History */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground">
                Hi! I'm your AI learning coach. Ask me anything about your current lab!
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-2">
                  Coach is thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t pt-4">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Ask your coach anything..."
                className="min-h-[60px]"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
```

#### 2. Teacher Dashboard Student Card

```typescript
// app/dashboard/teacher/components/StudentCard.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, BookCheck, TrendingUp } from 'lucide-react'

interface StudentSummary {
  id: string
  name: string
  email: string
  labs_completed: number
  current_lab: number
  total_questions: number
  last_question_date?: string
  engagement_score: number
}

export function StudentCard({
  student,
  onClick
}: {
  student: StudentSummary
  onClick: () => void
}) {
  const getEngagementColor = (score: number) => {
    if (score >= 70) return 'bg-green-500'
    if (score >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{student.name}</span>
          <div className={`w-3 h-3 rounded-full ${getEngagementColor(student.engagement_score)}`} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <BookCheck className="w-4 h-4" />
          <span>Lab {student.current_lab} • {student.labs_completed}/6 completed</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MessageSquare className="w-4 h-4" />
          <span>{student.total_questions} questions asked</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>Engagement: {student.engagement_score}%</span>
        </div>
        {student.last_question_date && (
          <div className="text-xs text-muted-foreground">
            Last active: {new Date(student.last_question_date).toLocaleDateString()}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
```

---

## 📊 Data Flow

### Student Coach Interaction Flow

```
1. Student clicks avatar button
   ↓
2. FloatingCoach component renders chat panel
   ↓
3. Student types question and clicks Send
   ↓
4. askCoach() server action called with:
   - userMessage
   - context: 'PromptLab'
   - moduleNumber: (current lab)
   ↓
5. Server action:
   - Checks rate limit (20/hour)
   - Calls OpenAI GPT-4o
   - Saves to coach_transcripts table
   - Logs to ai_usage_log
   ↓
6. Response returned to client
   ↓
7. Message added to conversation history
   ↓
8. UI updates with coach response
```

### Teacher Report Generation Flow

```
1. Teacher opens student report modal
   ↓
2. getStudentReport() server action called
   ↓
3. Server checks cache (student_reports table)
   ↓
4a. If recent report exists (<24h):
    - Return cached report
   ↓
4b. If no recent report:
   ↓
   5. generateStudentReport() called:
      ↓
      6. Fetch coach transcripts for date range
      ↓
      7. analyzeTranscripts():
         - Extract topics
         - Identify struggle patterns
         - Calculate engagement metrics
      ↓
      8. generateLearningInsights() (GPT-4):
         - Generate strengths narrative
         - Generate areas for improvement
         - Detect learning style
         - Create recommendations
      ↓
      9. Store report in student_reports table
   ↓
5. Return report to client
   ↓
6. StudentReportModal renders report data
```

---

## 📊 Database Schema

See [Data Model & Services](./data-model-and-services.md) for complete schema details.

### Key Tables

**coach_transcripts** (existing, updated):
- Stores all coach conversations
- Updated context_tag to include 'PromptLab'
- Used for report generation

**student_reports** (new):
- Caches AI-generated learning reports
- JSONB report_data and ai_insights TEXT
- 24-hour cache by default

**teacher_assignments** (new):
- Maps teachers to students
- Enables teacher-only report access via RLS
- Admin-managed relationships

---

## 🔒 Security Considerations

### Authentication & Authorization

1. **Coach Access**: Only authenticated users can access coach
2. **Report Generation**: Only teachers/admins can generate reports
3. **Report Viewing**: Teachers can only view reports for assigned students
4. **RLS Policies**: Database-level access control

### Privacy

1. **Student Data**: Coach transcripts are private to each student
2. **Teacher Access**: Limited to assigned students only
3. **Data Retention**: Consider auto-deletion of old transcripts (GDPR compliance)
4. **Anonymous Analytics**: Aggregate analytics don't expose individual students

### Rate Limiting

```typescript
// lib/rate-limit.ts
export async function checkCoachRateLimit(userId: string): Promise<{
  allowed: boolean
  remaining: number
}> {
  const supabase = await createServerSupabaseClient()
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)

  const { count } = await supabase
    .from('ai_usage_log')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('action', 'ai_coach')
    .gte('created_at', oneHourAgo.toISOString())

  const used = count || 0
  const limit = 20
  const allowed = used < limit

  return { allowed, remaining: Math.max(0, limit - used) }
}
```

---

## 📈 Performance Considerations

### Frontend Optimization

1. **Lazy Loading**: FloatingCoach loads only when user is authenticated
2. **Message Pagination**: Load last 20 messages initially, lazy load more on scroll
3. **Optimistic UI**: Show user message immediately, update after server response
4. **Debouncing**: Debounce typing indicators (if implemented)

### Backend Optimization

1. **Report Caching**: Cache reports for 24 hours to avoid redundant AI calls
2. **Batch Analysis**: Analyze transcripts in batches for efficiency
3. **Async Report Generation**: Generate reports asynchronously on lab completion
4. **Query Optimization**: Index coach_transcripts by user_id and created_at

### Cost Optimization

1. **Smart Caching**: Don't regenerate reports unless data changed
2. **Selective AI Insights**: Only use GPT-4 for insights, not basic analytics
3. **Prompt Optimization**: Keep AI prompts concise to minimize tokens
4. **Rate Limiting**: Prevent excessive coach usage

---

## 🧪 Testing Strategy

### Unit Tests

- FloatingCoach component behavior
- Message formatting
- Context detection
- Rate limit checking
- Report data processing

### Integration Tests

- Coach interaction flow (question → response → storage)
- Report generation from transcripts
- Teacher dashboard data fetching
- RLS policy enforcement

### E2E Tests

- Student: Open avatar, ask question, receive response
- Teacher: Open dashboard, view student report
- Cross-page navigation with persistent chat
- Mobile responsive behavior

---

## 📚 Related Documentation

- [Floating Coach PRD](../prd/floating-coach-prd.md)
- [Floating Coach Implementation Plan](../prd/floating-coach-implementation-plan.md)
- [Data Model](./data-model-and-services.md)
- [Tech Stack](./tech-stack.md)

---

**Document Status**: ✅ Complete
**Next Steps**: Begin implementation following Floating Coach Implementation Plan
