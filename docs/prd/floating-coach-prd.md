# Floating AI Coach Avatar - Product Requirements Document

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-10-16 | v1.0 | Initial PRD for Floating AI Coach Avatar | Product Team |

---

## Goals and Background Context

### Goals

- Replace sidebar and topbar coach components with a persistent, accessible floating avatar
- Provide students with an always-available AI learning companion across all learning modules
- Enable teachers to access detailed student learning reports through an intuitive dashboard
- Track student learning patterns through coach interactions for educational insights
- Create a more modern, user-friendly interface pattern for AI assistance

### Background Context

The current AI coach implementation is hidden within the sidebar (only visible when expanded) and topbar, making it feel like a secondary feature rather than a core learning companion. Students must navigate away from their learning content to access help, creating friction in the learning experience.

This redesign positions the AI coach as a first-class learning companion through a floating avatar that remains accessible across all pages. The avatar creates emotional connection while maintaining a non-intrusive presence. Additionally, by tracking all coach interactions, we enable teachers to gain insights into student learning patterns, struggles, and breakthroughs, allowing for more personalized support.

---

## Requirements

### Functional Requirements

**Student-Facing Features:**

- **FR1**: System MUST display a floating avatar button fixed to the bottom-right corner of the viewport on all authenticated student pages
- **FR2**: Avatar MUST remain visible and accessible during scrolling and across all learning module pages
- **FR3**: Clicking the avatar MUST expand a chat panel (360px width × 600px height) with smooth slide-up animation
- **FR4**: Chat panel MUST display conversation history (scrollable) with clear visual distinction between student messages and coach responses
- **FR5**: Chat panel MUST include a text input field and send button for submitting questions
- **FR6**: System MUST show current learning context (current lab number, module, lab title) within the chat panel header
- **FR7**: System MUST provide "Generate My Learning Report" button within the chat interface for students
- **FR8**: Avatar MUST display subtle breathing/idle animation to indicate it's active and available
- **FR9**: System MUST show loading state (pulse/glow animation) while coach is processing questions
- **FR10**: Chat panel MUST be collapsible back to avatar-only state via close button
- **FR11**: System MUST persist conversation history across page navigation within the same session
- **FR12**: All coach interactions MUST be context-aware, knowing the current lab and module the student is working on

**Teacher-Facing Features:**

- **FR13**: System MUST provide a teacher dashboard accessible via dedicated route
- **FR14**: Teacher dashboard MUST display a list of all students with basic progress indicators
- **FR15**: Clicking a student card MUST open a modal displaying the student's learning report
- **FR16**: Report modal MUST be styled as a speech bubble/conversation format from the AI coach
- **FR17**: Learning report MUST include: total questions asked, topics explored, most active lab, engagement patterns
- **FR18**: Learning report MUST analyze and display student strengths (topics with few questions)
- **FR19**: Learning report MUST identify struggle areas (topics with repeated questions)
- **FR20**: Learning report MUST include AI-generated personalized insights about the student's learning journey
- **FR21**: Learning report MUST display timeline view of learning progression through modules
- **FR22**: System MUST automatically generate/update student reports after each lab completion
- **FR23**: Teachers MUST be able to manually trigger report regeneration for any student
- **FR24**: Report modal MUST include export functionality (PDF or markdown)

**Backend & Data Requirements:**

- **FR25**: System MUST store all coach interactions in `coach_transcripts` table with full context (user_id, module, lab, question, response, timestamp)
- **FR26**: System MUST track and store conversation metadata including latency, status, and tone
- **FR27**: System MUST provide server action `generateStudentReport(studentId, dateRange?)` for report generation
- **FR28**: Report generation MUST use AI analysis of transcript patterns to identify learning behaviors
- **FR29**: Generated reports MUST be cached in database for performance
- **FR30**: System MUST delete sidebar coach component and all related code from `app/dashboard/vibecoding/layout.tsx`
- **FR31**: System MUST delete topbar coach references and components

### Non-Functional Requirements

- **NFR1**: Floating avatar MUST be responsive and work on mobile devices (320px+ screen width)
- **NFR2**: Chat panel expansion/collapse animations MUST complete within 300ms
- **NFR3**: Avatar component MUST not block or obscure critical UI elements (form submit buttons, navigation)
- **NFR4**: Coach response generation MUST maintain current performance (<2s for 90th percentile)
- **NFR5**: Conversation history MUST handle at least 100 messages per session without performance degradation
- **NFR6**: Report generation MUST complete within 5 seconds for students with up to 500 coach interactions
- **NFR7**: Avatar image MUST be optimized (max 50KB) and load instantly
- **NFR8**: System MUST gracefully handle coach service timeouts with user-friendly error messages
- **NFR9**: All coach data MUST be associated with authenticated user_id (no anonymous tracking)
- **NFR10**: Teacher dashboard MUST only display students assigned to that teacher (role-based access control)
- **NFR11**: Component MUST persist position across browser sessions (localStorage)
- **NFR12**: System MUST maintain accessibility standards (WCAG AA): keyboard navigation, screen reader support, proper ARIA labels

---

## User Interface Design Goals

### Overall UX Vision

Create a friendly, approachable AI learning companion that feels like a personal tutor always available to help. The avatar should have personality and presence without being distracting. The interaction should feel conversational and supportive, reducing anxiety around asking for help.

For teachers, provide clear, actionable insights presented in a digestible format that tells the story of each student's learning journey.

### Key Interaction Paradigms

- **Floating Action Button Pattern**: Avatar as persistent, unobtrusive entry point
- **Chat Panel Overlay**: Modern slide-up drawer pattern familiar from customer support widgets
- **Speech Bubble Reports**: Coach "speaking" the report to teacher, creating narrative feel
- **Context Awareness**: Avatar knows where student is and references current content
- **Passive Availability**: Coach never interrupts or pushes notifications; student controls all interactions

### Core Screens and Views

**Student-Facing:**
1. **Floating Avatar Button** (all pages) - 48×48px circular button, bottom-right, 16px margin
2. **Expanded Chat Panel** - 360×600px overlay with conversation history and input
3. **Student Learning Report View** (accessible from chat) - Personal learning analytics

**Teacher-Facing:**
4. **Teacher Dashboard** - Grid/list of student cards with progress indicators
5. **Student Report Modal** - Speech-bubble styled detailed learning report
6. **Report Timeline View** - Visual progression through modules

### Accessibility

**WCAG AA compliance required:**
- Keyboard navigation: Tab to avatar, Enter to open, Escape to close
- Screen reader support: Proper ARIA labels, role announcements
- Focus management: Trap focus in chat panel when open
- Color contrast: Minimum 4.5:1 for text
- Visual indicators: Not relying on color alone for states

### Branding

**Avatar Design Concepts:**

**Option A (Recommended): Friendly AI Robot Guide**
- Modern flat design, circular format
- Warm colors: soft blues, purples, oranges
- Large friendly eyes, small smile
- Academic accessories (glasses or graduation cap)
- Gender-neutral, approachable to ages 18-35

**Gemini Image Generation Prompt:**
```
Create a friendly AI learning assistant avatar character for an educational platform. Style: modern flat design, circular avatar format (1024x1024px). The character should be a cute, approachable robot or AI guide with warm colors (soft blues, purples, and oranges). Features: large friendly eyes, small smile, wearing academic accessories like glasses or a graduation cap. The design should feel welcoming to students ages 18-35. Clean lines, minimal detail, works well at small sizes (48x48px when scaled). Transparent or solid color background. No text or UI elements.
```

**Option B: Wise Owl Companion**
- Traditional wisdom symbol with playful twist
- Teal/cyan primary with warm accents
- Holding tablet or book
- Graduation cap

**Gemini Image Generation Prompt:**
```
Design a modern, minimalist owl mascot for an AI learning coach. Style: flat design illustration, circular format (1024x1024px). The owl should have large, intelligent eyes, a small graduation cap, and be holding a tablet or book. Color palette: teal/cyan primary with warm accent colors (orange or yellow). Expression should be friendly and encouraging, not stern. Simple geometric shapes, suitable for scaling to small icon sizes. Transparent background.
```

**Option C: Abstract AI Brain**
- Stylized neural network visualization
- Gradient blue → purple → pink
- Glowing nodes, subtle sparkles
- Suggests intelligence and learning

**Gemini Image Generation Prompt:**
```
Create an abstract, friendly AI brain icon for an educational chatbot avatar. Style: modern gradient design, circular format (1024x1024px). The brain should be stylized with neural network connections, glowing nodes, and a soft pulsing effect. Colors: gradient from blue to purple to pink. Add subtle sparkles or stars around it to suggest learning/insights. The design should feel alive and intelligent but not intimidating. Works at small sizes (48px). Transparent background.
```

### Target Device and Platforms

**Web Responsive (all devices):**
- Desktop: 1920×1080 and above
- Tablet: 768×1024
- Mobile: 375×667 minimum (iPhone SE)

**Responsive Behavior:**
- Desktop: Avatar bottom-right, chat panel 360×600px
- Tablet: Avatar bottom-right, chat panel 90% width, max 400px
- Mobile: Avatar bottom-right with smaller size (40×40px), chat panel full-width bottom sheet

---

## Technical Assumptions

### Repository Structure

**Monorepo** - Feature additions to existing VibeCodeStudy platform

### Service Architecture

**Next.js 14+ App Router with Server Actions**
- React Server Components for data fetching
- Client components for interactive chat UI
- Server actions for coach interactions and report generation
- Supabase for database operations

### Core Technology Stack

**Frontend:**
- React 18+ with TypeScript
- Tailwind CSS for styling
- Radix UI primitives (Sheet/Dialog components)
- Framer Motion for animations (optional)
- React Query for data caching (if needed)

**Backend:**
- Next.js API Routes / Server Actions
- Supabase PostgreSQL database
- OpenAI API for coach responses
- AI analysis for report generation (using OpenAI or similar)

**Database:**
- Extend existing `coach_transcripts` table
- New table: `student_reports` (cached report data)
- New table: `teacher_assignments` (teacher-student relationships)

### Testing Requirements

**Unit Tests:**
- Avatar component behavior (open/close, animations)
- Chat message formatting
- Report data processing logic
- Context awareness utilities

**Integration Tests:**
- Coach interaction flow (question → response → storage)
- Report generation from transcript data
- Teacher dashboard data fetching
- Role-based access control

**E2E Tests (Playwright):**
- Student: Open avatar, ask question, receive response
- Teacher: Open dashboard, view student report
- Cross-page navigation with persistent chat

**Manual Testing:**
- Avatar positioning across different screen sizes
- Animation smoothness
- Accessibility (keyboard navigation, screen readers)

### Additional Technical Assumptions

1. **Existing Coach Infrastructure**: Reuse existing `callCoach()` function from `lib/coach.ts` and `askCoach()` server action from `lib/actions/coach.ts`
2. **Database Schema**: `coach_transcripts` table already exists and tracks all necessary data
3. **Authentication**: Supabase auth already implemented and working
4. **Image Assets**: Avatar image to be generated via Gemini and stored in `public/images/coach-avatar.png`
5. **Performance**: Conversation history limited to last 50 messages in UI to prevent performance issues
6. **Session Management**: Use React context or Zustand for chat state management
7. **Real-time Updates**: No WebSocket required; standard REST/Server Actions sufficient
8. **AI Report Generation**: Use streaming for report generation to provide progressive feedback
9. **Error Boundaries**: Wrap floating coach in error boundary to prevent app crashes
10. **Feature Flag**: Implement behind feature flag for gradual rollout

---

## Epic List

### Epic 1: Foundation - Floating Avatar Component & Basic Chat
**Goal**: Replace existing coach UI with floating avatar that provides basic chat functionality for students, establishing the foundation for all subsequent features.

### Epic 2: Learning Analytics & Report Generation
**Goal**: Implement backend analytics processing and AI-powered report generation system that analyzes coach transcripts to identify learning patterns and generate insights.

### Epic 3: Teacher Dashboard & Student Reports
**Goal**: Build teacher-facing dashboard with student list, report viewing modal, and export functionality, enabling teachers to monitor and support student learning.

---

## Epic 1: Foundation - Floating Avatar Component & Basic Chat

**Epic Goal**: Create and deploy a fully functional floating AI coach avatar that replaces the current sidebar/topbar implementation. Students will be able to access their AI learning companion from any page, ask questions in a chat interface, and receive context-aware responses. This epic establishes the foundational UI pattern and interaction model for all future coach features.

### Story 1.1: Remove Existing Coach Components

**As a** developer,
**I want** to cleanly remove the sidebar and topbar coach implementations,
**so that** we can replace them with the new floating avatar without conflicts or dead code.

**Acceptance Criteria:**
1. All coach-related code removed from `app/dashboard/vibecoding/layout.tsx` (lines 66-345)
2. All topbar coach references removed from dashboard header component
3. `CoachDrawer` component (`components/shared/coach-drawer.tsx`) deprecated but preserved in `archive/` folder
4. No broken imports or TypeScript errors after removal
5. All existing coach API routes and server actions remain functional (reused by new implementation)
6. Git commit with clear message documenting removal rationale

### Story 1.2: Create Floating Coach Avatar Component

**As a** student,
**I want** to see a friendly AI coach avatar button fixed to my screen,
**so that** I always know help is available without navigating away from my learning content.

**Acceptance Criteria:**
1. New component `components/shared/floating-coach.tsx` created with TypeScript
2. Avatar renders as circular button (48×48px desktop, 40×40px mobile)
3. Fixed positioning: bottom-right corner, 16px margin from viewport edges
4. Avatar displays generated image from `public/images/coach-avatar.png`
5. Subtle breathing animation (scale 1.0 → 1.05, 2s duration, infinite loop)
6. Component is client component with proper "use client" directive
7. Hover effect: slight scale increase + shadow enhancement
8. Keyboard accessible: focusable with visible focus ring
9. ARIA label: "Open AI Learning Coach"
10. Component renders on all authenticated dashboard pages
11. Z-index configured to float above page content but below modals (z-50)
12. Mobile responsive: smaller size and adjusted positioning

### Story 1.3: Implement Chat Panel Expansion

**As a** student,
**I want** to click the avatar to expand a chat interface,
**so that** I can ask questions and see conversation history.

**Acceptance Criteria:**
1. Clicking avatar opens chat panel with smooth slide-up animation (300ms ease-out)
2. Chat panel dimensions: 360px width × 600px height on desktop
3. Mobile: Full-width bottom sheet covering 80% of viewport height
4. Panel includes close button (X icon) in top-right corner
5. Clicking close button or pressing Escape key collapses panel back to avatar
6. Panel header displays: "AI Learning Coach" title + MessageSquare icon
7. Panel includes current context badge showing "Lab 3" or "Module 2" based on current page
8. Panel uses Radix Sheet component for accessibility features
9. Focus trap: Tab key cycles through panel elements only when open
10. Panel has semi-transparent backdrop (overlay) that closes panel when clicked
11. Animation respects user's prefers-reduced-motion setting
12. Panel state (open/closed) managed via React useState

### Story 1.4: Build Chat Message Interface

**As a** student,
**I want** to view my conversation history and type new questions,
**so that** I can have a continuous dialogue with the AI coach.

**Acceptance Criteria:**
1. Chat panel body displays scrollable message history (max-height with overflow-y-auto)
2. Messages displayed with clear visual distinction:
   - Student messages: right-aligned, primary color background
   - Coach messages: left-aligned, muted background with coach avatar thumbnail
3. Each message includes timestamp (relative format: "2m ago", "1h ago")
4. Textarea input field at panel bottom with placeholder "Ask your coach anything..."
5. Send button next to input field with Send icon
6. Input area has min-height of 60px and auto-expands up to 120px as user types
7. Pressing Enter key submits message (Shift+Enter for new line)
8. Send button disabled when input is empty or while processing
9. Loading state shown while waiting for coach response (spinner + "Coach is thinking...")
10. Error messages displayed inline if coach request fails
11. Message history auto-scrolls to bottom when new message arrives
12. Empty state message shown when no conversation history: "Hi! I'm your AI learning coach. Ask me anything about your current lab!"

### Story 1.5: Integrate Coach Context Awareness

**As a** student,
**I want** the coach to know which lab and module I'm currently working on,
**so that** responses are relevant to my current learning context.

**Acceptance Criteria:**
1. Component detects current lab number from URL pathname (e.g., `/labs/lab3` → lab 3)
2. Component detects current module from parent route or context
3. Context displayed in panel header as badge: "Lab 3: AI's Thinking Process"
4. Context automatically updates when user navigates to different lab without closing chat
5. Context passed to `askCoach()` server action as `additionalContext` parameter
6. Context stored in `coach_transcripts.context_tag` field
7. If context cannot be determined, defaults to "General" and logs warning
8. Lab title fetched from labs configuration array or database
9. Context indicator has tooltip explaining: "Your coach knows you're working on this lab"

### Story 1.6: Connect Chat to Existing Coach API

**As a** student,
**I want** my questions sent to the AI coach and responses displayed instantly,
**so that** I get immediate help with my learning challenges.

**Acceptance Criteria:**
1. Clicking Send button calls existing `askCoach()` server action from `lib/actions/coach.ts`
2. Request includes: userMessage, context ("Prompt Engineering Lab"), moduleNumber, labNumber
3. Loading state shown in UI while awaiting response
4. Successful response displays coach message in conversation history
5. Response latency displayed to user via toast notification
6. Error responses show user-friendly message: "The coach is temporarily unavailable. Please try again."
7. Timeout errors specifically shown as: "The coach is taking longer than expected. Please try again."
8. All interactions persisted to `coach_transcripts` table via existing server action
9. Rate limiting respected (if implemented): show message if user exceeds limits
10. Toast notifications use existing `useToast` hook
11. Conversation history updates immediately with new messages (optimistic UI update)
12. Network errors handled gracefully with retry button

### Story 1.7: Implement Conversation History Persistence

**As a** student,
**I want** my conversation history to persist as I navigate between pages,
**so that** I don't lose context when exploring different labs.

**Acceptance Criteria:**
1. Conversation history stored in React state at app level (not component-local)
2. State managed via React Context API or Zustand store
3. History persists across page navigation within same session
4. History cleared when user logs out
5. Maximum 50 messages retained in memory to prevent performance issues
6. Older messages automatically pruned when limit exceeded (FIFO)
7. History loaded from database on initial page load (last 20 messages)
8. Server action `getRecentCoachHistory(userId, limit)` created to fetch history
9. Loading state shown while fetching initial history
10. History sorted by timestamp (oldest first)
11. Duplicate prevention: messages not re-added if already in state

### Story 1.8: Add Avatar Animation States

**As a** student,
**I want** the avatar to visually respond to different states (idle, thinking, active),
**so that** I understand when the coach is processing my question.

**Acceptance Criteria:**
1. **Idle state**: Gentle breathing animation (scale 1.0 ↔ 1.05, 2s loop)
2. **Thinking state**: Pulsing glow effect while processing questions (opacity animation)
3. **Active state**: Subtle bounce when new message received
4. Thinking state triggered when coach request is in-flight
5. Active state triggered when response arrives and panel is closed
6. Notification badge (red dot) appears on avatar when response arrives while panel closed
7. Badge disappears when panel is opened
8. Animations implemented with CSS animations (not JavaScript) for performance
9. All animations respect `prefers-reduced-motion` media query
10. Smooth transitions between states (200ms ease)

### Story 1.9: Mobile Responsive Optimization

**As a** student using a mobile device,
**I want** the floating coach to work perfectly on my phone,
**so that** I can get help on-the-go without UI issues.

**Acceptance Criteria:**
1. Avatar size reduced to 40×40px on screens <768px width
2. Avatar positioned 12px from bottom and right edges on mobile
3. Chat panel becomes full-width bottom sheet on mobile
4. Bottom sheet covers 85% of screen height with rounded top corners
5. Bottom sheet slides up from bottom (not from right like desktop)
6. Virtual keyboard appearance doesn't obscure input field
7. Message history scrolls smoothly on mobile with momentum scrolling
8. Touch gestures: swipe down to close panel (optional enhancement)
9. Safe area insets respected (iOS notch, Android navigation bar)
10. Text input auto-focuses when panel opens on desktop, but not on mobile (prevents unwanted keyboard)
11. Send button sized appropriately for touch (min 44×44px)
12. Tested on iOS Safari, Chrome Mobile, and Samsung Internet

---

## Epic 2: Learning Analytics & Report Generation

**Epic Goal**: Build the backend analytics engine that processes coach transcript data to identify learning patterns, struggles, and breakthroughs. Implement AI-powered report generation that creates personalized learning insights for each student, providing teachers with actionable data about student progress and areas needing support.

### Story 2.1: Design Student Reports Database Schema

**As a** developer,
**I want** a database schema to store generated learning reports,
**so that** reports can be cached and quickly retrieved by teachers.

**Acceptance Criteria:**
1. Migration created for new `student_reports` table in Supabase
2. Table schema includes columns:
   - `id` (uuid, primary key)
   - `user_id` (uuid, foreign key to auth.users)
   - `generated_at` (timestamp)
   - `date_range_start` (timestamp, nullable)
   - `date_range_end` (timestamp, nullable)
   - `report_data` (jsonb) - stores structured report content
   - `ai_insights` (text) - AI-generated narrative
   - `metadata` (jsonb) - stats like total_questions, labs_covered, etc.
   - `version` (integer) - for schema versioning
   - `created_at` (timestamp)
   - `updated_at` (timestamp)
3. Index created on `user_id` for fast lookups
4. Index created on `generated_at` for sorting recent reports
5. Row Level Security (RLS) policies created:
   - Students can read their own reports
   - Teachers can read reports for their assigned students
   - Only system can insert/update reports
6. TypeScript interface `StudentReport` created in `lib/types.ts`
7. Migration tested in dev environment
8. Rollback migration script created

### Story 2.2: Create Transcript Analysis Utilities

**As a** developer,
**I want** utility functions to analyze coach transcript data,
**so that** I can extract meaningful learning patterns from raw conversation data.

**Acceptance Criteria:**
1. New file created: `lib/analytics/transcript-analyzer.ts`
2. Function `analyzeTranscripts(transcripts: CoachTranscript[])` returns structured analysis:
   - `totalQuestions`: number
   - `topicsExplored`: string[] (extracted from messages)
   - `mostActiveLabNumber`: number
   - `labDistribution`: Record<number, number> (questions per lab)
   - `timePatterns`: time-of-day distribution
   - `avgResponseTime`: number (milliseconds)
   - `strugglingTopics`: string[] (topics with 3+ questions)
   - `masteredTopics`: string[] (topics mentioned but few questions)
3. Function `extractTopicsFromMessage(message: string)`: string[] uses basic NLP:
   - Identifies keywords (async, promises, API, database, etc.)
   - Removes stop words
   - Returns array of relevant topics
4. Function `identifyStrugglePatterns(transcripts)` finds:
   - Same topic questioned multiple times within 24 hours
   - Error messages or "not working" phrases
   - Questions getting progressively longer (indicates frustration)
5. Function `calculateIndependenceScore(transcripts, progressData)`:
   - Ratio of progress to questions asked
   - Higher score = more independent learning
   - Returns 0-100 score
6. All functions have TypeScript types
7. Unit tests cover edge cases (empty transcripts, single message, etc.)
8. Performance: processes 500 transcripts in <1 second

### Story 2.3: Implement AI-Powered Insight Generation

**As a** developer,
**I want** an AI system that generates personalized insights from transcript analysis,
**so that** reports contain meaningful, human-readable narratives about student learning.

**Acceptance Criteria:**
1. New file created: `lib/analytics/insight-generator.ts`
2. Function `generateLearningInsights(analysisData, transcripts)` returns:
   - `strengths`: string (paragraph describing what student does well)
   - `areasForImprovement`: string (paragraph on struggle areas)
   - `learningStyle`: string (detected learning style description)
   - `recommendations`: string[] (actionable next steps)
   - `notableBreakthroughs`: string[] (moments of progress)
3. Uses OpenAI GPT-4 with specialized prompt:
   - System prompt defines role: "educational analyst"
   - Includes transcript excerpts as context
   - Requests structured output matching above format
   - Temperature: 0.7 (balanced creativity and accuracy)
   - Max tokens: 500
4. Function `detectBreakthroughMoments(transcripts)` identifies:
   - Questions that show conceptual leap
   - Student teaching concept back to coach
   - Successful problem resolution sequences
5. AI prompt engineering tested for quality:
   - Insights are specific and actionable
   - Tone is encouraging and supportive
   - Avoids generic statements
   - References specific labs and topics
6. Error handling: falls back to template-based insights if AI fails
7. Rate limiting: caches insights for 24 hours to avoid redundant API calls
8. Unit tests with mock transcript data
9. Manual review of 10 sample reports for quality assurance

### Story 2.4: Build Report Generation Server Action

**As a** developer,
**I want** a server action that generates complete student reports,
**so that** teachers can request reports on-demand or they can be auto-generated.

**Acceptance Criteria:**
1. New server action: `generateStudentReport(studentId, options?)` in `lib/actions/reports.ts`
2. Options parameter includes:
   - `dateRange?: { start: Date, end: Date }` (defaults to all time)
   - `forceRegenerate?: boolean` (bypass cache)
   - `includeRawTranscripts?: boolean` (for detailed view)
3. Function flow:
   - Check authentication and authorization (teacher or admin)
   - Check cache: if recent report exists (<24h old) and not forceRegenerate, return cached
   - Fetch transcripts from database for date range
   - Call `analyzeTranscripts()` to process data
   - Call `generateLearningInsights()` for AI insights
   - Structure report data
   - Insert/update `student_reports` table
   - Return report
4. Return type: `{ success: boolean, report?: StudentReport, error?: string }`
5. Performance optimization: parallelizes DB queries and AI calls where possible
6. Error handling:
   - Graceful degradation if AI insights fail (return analysis without insights)
   - Proper error messages if student not found
   - Timeout handling for AI calls
7. Logging: tracks report generation success/failure with telemetry
8. Authorization checks:
   - Teachers can only generate reports for their students
   - Admins can generate for anyone
   - Students cannot generate other students' reports
9. Integration test: generates report for test student with mock data

### Story 2.5: Add Auto-Report Generation on Lab Completion

**As a** teacher,
**I want** reports automatically generated when students complete labs,
**so that** I have up-to-date insights without manual effort.

**Acceptance Criteria:**
1. Existing `markLabComplete()` server action in `app/dashboard/vibecoding/actions.ts` modified
2. After successful lab completion:
   - Asynchronously triggers `generateStudentReport(userId)`
   - Does not block lab completion if report generation fails
   - Logs success/failure of background report generation
3. Report generation runs in background (fire-and-forget pattern)
4. Duplicate prevention: checks if report already generated in last hour
5. Only generates report if student has asked at least 1 coach question in that lab
6. Database trigger alternative considered (document why server action chosen)
7. Error handling: failures don't affect user experience
8. Telemetry: tracks how many auto-reports generated per day
9. Feature flag: `AUTO_GENERATE_REPORTS` environment variable to enable/disable
10. Manual testing: complete lab and verify report appears in teacher dashboard

### Story 2.6: Create Report Data Formatting Utilities

**As a** developer,
**I want** utilities to format report data for display,
**so that** UI components can easily render reports consistently.

**Acceptance Criteria:**
1. New file: `lib/analytics/report-formatter.ts`
2. Function `formatReportForDisplay(report: StudentReport)` returns:
   - Formatted date ranges ("Oct 1 - Oct 15")
   - Percentage calculations (% of labs completed, engagement rate)
   - Sparkline data arrays for charts
   - Color-coded indicators (green for strengths, yellow for areas to improve)
3. Function `generateReportSummary(report)` creates executive summary:
   - 2-3 sentence overview
   - Key metrics highlighted
   - Suitable for email notifications or dashboard cards
4. Function `formatQuestionTimeline(transcripts)` creates timeline data:
   - Groups questions by date
   - Counts questions per day
   - Identifies peak activity periods
5. Function `calculateEngagementMetrics(report)`:
   - Questions per hour of study time
   - Response engagement (student replied to coach suggestions?)
   - Session depth (avg questions per session)
6. Function `exportReportAsMarkdown(report)` generates markdown:
   - Proper heading hierarchy
   - Tables for metrics
   - Lists for recommendations
   - Suitable for copying to LMS or email
7. All functions have TypeScript return types
8. Unit tests for edge cases (zero questions, incomplete data)
9. Functions are pure (no side effects)

---

## Epic 3: Teacher Dashboard & Student Reports

**Epic Goal**: Build a comprehensive teacher dashboard that displays all students, provides quick access to learning reports, and enables teachers to monitor and support student progress. Implement an intuitive, speech-bubble-styled report modal that presents learning insights in a conversational format, making data digestible and actionable.

### Story 3.1: Create Teacher Dashboard Route & Layout

**As a** teacher,
**I want** a dedicated dashboard to view all my students,
**so that** I can monitor their learning progress at a glance.

**Acceptance Criteria:**
1. New route created: `app/dashboard/teacher/page.tsx`
2. Route protected by authentication middleware
3. Authorization check: only users with `role = 'teacher'` or `role = 'admin'` can access
4. Layout includes:
   - Page header: "My Students" with subtitle "Monitor learning progress and insights"
   - Search/filter bar for finding students by name or email
   - Sort dropdown: "Recent Activity", "Most Questions", "Least Questions", "A-Z"
5. Loading skeleton shown while fetching data
6. Empty state if teacher has no assigned students: "No students assigned yet. Contact admin to get started."
7. Responsive grid layout: 3 columns on desktop, 2 on tablet, 1 on mobile
8. Proper TypeScript types for all props and state
9. Server component for initial data fetch (RSC pattern)
10. Error boundary wraps page to handle failures gracefully

### Story 3.2: Implement Student List with Progress Indicators

**As a** teacher,
**I want** to see a list of student cards showing their progress,
**so that** I can quickly identify who needs support.

**Acceptance Criteria:**
1. Server action `getMyStudents()` created in `lib/actions/teacher.ts`
2. Server action returns array of student data:
   - Basic info: name, email, avatar_url
   - Progress: labs_completed, current_lab
   - Coach stats: total_questions, last_question_date
   - Engagement score (calculated metric)
3. Student card component (`components/teacher/student-card.tsx`) displays:
   - Student avatar or initials
   - Full name
   - Current lab: "Working on Lab 3"
   - Progress bar: X/6 labs completed
   - Question count badge: "45 questions asked"
   - Engagement indicator: colored dot (green=active, yellow=moderate, red=inactive)
4. Card has hover effect (shadow + border highlight)
5. Click anywhere on card to open report modal
6. Cards sorted by selected sort option
7. Search filters cards in real-time (client-side)
8. TypeScript interface `StudentSummary` created
9. Loading state: skeleton cards shown while fetching
10. Pagination or infinite scroll if >50 students

### Story 3.3: Build Report Modal Component

**As a** teacher,
**I want** a modal that opens when I click a student card,
**so that** I can view detailed learning insights in an engaging format.

**Acceptance Criteria:**
1. Component created: `components/teacher/student-report-modal.tsx`
2. Uses Radix Dialog component for accessibility
3. Modal dimensions: 800px max-width, 90vh max-height, centered
4. Header includes:
   - Student avatar and name
   - Date range of report
   - Close button (X)
5. Body styled as speech bubble from AI coach:
   - Friendly coach avatar thumbnail in top-left
   - Rounded bubble background (subtle gradient)
   - Conversational tone in content
6. Content sections:
   - **Quick Stats**: Total questions, labs completed, engagement score
   - **Learning Journey Timeline**: Visual timeline of progress
   - **Strengths**: What student excels at
   - **Areas for Growth**: Struggle topics
   - **Coach Insights**: AI-generated narrative
   - **Recommendations**: Actionable next steps
7. Footer includes:
   - "Generate Fresh Report" button (force regenerate)
   - "Export as PDF" button (future enhancement, can be placeholder)
   - Last updated timestamp
8. Modal backdrop (overlay) darkens page
9. Keyboard accessible: Escape to close, Tab to navigate
10. Mobile responsive: full-screen on small devices
11. Loading state shown while fetching report
12. Error state if report fails to load: "Unable to load report. Try again."

### Story 3.4: Implement Report Data Fetching in Modal

**As a** teacher,
**I want** the modal to load the student's report automatically,
**so that** I see insights immediately upon opening.

**Acceptance Criteria:**
1. Modal component accepts `studentId` prop
2. On modal open, calls server action `getStudentReport(studentId)`
3. Server action checks cache first, generates new report if none exists
4. Loading spinner shown while fetching
5. Report data populated into all modal sections
6. If no coach interactions exist: "This student hasn't asked any questions yet."
7. Date range defaults to "All Time" unless specified
8. Option to select custom date range (dropdown: Last Week, Last Month, All Time)
9. Changing date range re-fetches report with new parameters
10. Error handling: graceful error message if fetch fails
11. Server action authorized: only teacher of that student can access report
12. Report data cached in React state to avoid re-fetching on modal reopen

### Story 3.5: Design Report Content Layout & Styling

**As a** teacher,
**I want** the report content to be visually appealing and easy to read,
**so that** I can quickly understand student progress and needs.

**Acceptance Criteria:**
1. **Quick Stats Section**:
   - 4 metric cards in horizontal row
   - Icons for each metric (MessageSquare, BookCheck, TrendingUp, Clock)
   - Large number + label (e.g., "45 Questions Asked")
   - Cards have subtle background color
2. **Learning Journey Timeline**:
   - Vertical timeline with dots for each lab
   - Completed labs: green checkmark
   - Current lab: pulsing blue dot
   - Not started: gray outline
   - Hover shows question count for that lab
3. **Strengths Section**:
   - Green-tinted background
   - Bullet points listing strengths
   - Derived from AI insights
4. **Areas for Growth Section**:
   - Yellow-tinted background
   - Bullet points listing struggle topics
   - Each item clickable to show example questions (modal within modal or expansion)
5. **Coach Insights Section**:
   - Main narrative text (2-3 paragraphs)
   - Styled as if coach is speaking
   - Coach avatar thumbnail to the left
   - Speech bubble tail pointing to avatar
6. **Recommendations Section**:
   - Numbered list of actionable next steps
   - Each recommendation has icon (Lightbulb, Book, Code)
   - Optional: "Mark as Done" checkbox (for teacher notes)
7. Typography:
   - Clear hierarchy: section headers (font-semibold text-lg)
   - Body text readable (text-base leading-relaxed)
   - Metrics use larger font (text-2xl font-bold)
8. Spacing: consistent padding (16px sections, 8px between elements)
9. Colors follow existing app theme
10. Smooth scrolling within modal if content overflows

### Story 3.6: Add "Generate Fresh Report" Functionality

**As a** teacher,
**I want** to manually trigger report regeneration,
**so that** I can get the most up-to-date insights for a student.

**Acceptance Criteria:**
1. "Generate Fresh Report" button in modal footer
2. Clicking button calls `generateStudentReport(studentId, { forceRegenerate: true })`
3. Button shows loading state during generation: "Generating..." with spinner
4. Button disabled during generation to prevent duplicate requests
5. Success: modal content updates with new report data
6. Success toast notification: "Report updated successfully!"
7. Error: toast shows "Failed to generate report. Please try again."
8. Last updated timestamp updates to current time
9. Logs regeneration action for audit trail
10. Rate limiting: prevent more than 1 regeneration per minute per student
11. Optimistic UI: shows generating indicator immediately

### Story 3.7: Implement Report Export (PDF/Markdown)

**As a** teacher,
**I want** to export student reports for offline viewing or sharing,
**so that** I can document student progress for administrative purposes.

**Acceptance Criteria:**
1. "Export Report" dropdown button with options: "Export as PDF" and "Export as Markdown"
2. **Markdown Export**:
   - Calls `exportReportAsMarkdown(report)` utility function
   - Downloads `.md` file: `student-report-[name]-[date].md`
   - File includes all report sections with proper formatting
   - Uses browser download API
3. **PDF Export** (optional, can be placeholder for future):
   - Button shows "Coming Soon" tooltip
   - Or uses print-to-PDF browser functionality
   - Or integrates library like jsPDF/Puppeteer
4. Export action logs telemetry (which format, timestamp)
5. Export includes:
   - Student name and email
   - Report generation date
   - All metrics and insights
   - Teacher name (who exported)
6. File naming follows consistent pattern
7. Success toast: "Report exported successfully!"
8. Error handling: "Export failed. Please try again."
9. Mobile: uses share sheet API on mobile devices

### Story 3.8: Add Teacher-Student Assignment Management

**As a** teacher,
**I want** to only see students assigned to me,
**so that** the dashboard is relevant and manageable.

**Acceptance Criteria:**
1. New table created: `teacher_assignments`
   - `id` (uuid, primary key)
   - `teacher_id` (uuid, foreign key to users)
   - `student_id` (uuid, foreign key to users)
   - `assigned_at` (timestamp)
   - `assigned_by` (uuid, admin who created assignment)
2. RLS policies:
   - Teachers can read their own assignments
   - Admins can read and write all assignments
3. Server action `getMyStudents()` filters by teacher_id
4. Admin interface to manage assignments (separate story/epic)
5. If teacher has no assignments: show helpful empty state
6. Students without assigned teacher: visible only to admins
7. TypeScript type `TeacherAssignment` added to `lib/types.ts`
8. Migration tested in dev environment

### Story 3.9: Implement Dashboard Search and Filters

**As a** teacher,
**I want** to search and filter my student list,
**so that** I can quickly find specific students or groups.

**Acceptance Criteria:**
1. Search input at top of dashboard with magnifying glass icon
2. Real-time search: filters students by name or email as user types
3. Debounced input (300ms) to avoid excessive re-renders
4. Search is case-insensitive
5. Shows result count: "Showing 5 of 20 students"
6. Sort dropdown with options:
   - Recent Activity (last question date, newest first)
   - Most Questions (total questions, high to low)
   - Least Questions (total questions, low to high)
   - Name (A-Z)
   - Name (Z-A)
7. Filter by engagement level:
   - All Students
   - Active (>10 questions in last week)
   - Moderate (1-10 questions)
   - Inactive (0 questions)
8. Filter by lab progress:
   - All Labs
   - Lab 1
   - Lab 2
   - ...Lab 6
9. Filters and search work together (AND logic)
10. Clear filters button resets all filters and search
11. URL state: search and filters reflected in query params for bookmarking
12. Mobile: filters collapse into dropdown menu to save space

### Story 3.10: Add Dashboard Analytics Overview

**As a** teacher,
**I want** an overview section showing aggregate stats,
**so that** I understand overall class performance at a glance.

**Acceptance Criteria:**
1. Overview section at top of dashboard (above student cards)
2. 4 stat cards in horizontal row:
   - Total Students
   - Avg Questions per Student
   - Most Active Lab (lab with most questions)
   - Overall Engagement Rate (% of students active this week)
3. Each card has icon, large number, and label
4. Cards use color coding (primary colors)
5. Hover effect: slight scale increase
6. Stats calculated from student data on server side
7. Server action `getTeacherDashboardStats()` returns aggregate data
8. Stats refresh when filters change (show filtered stats)
9. Loading skeletons while fetching
10. Tooltip on engagement rate explaining calculation
11. Responsive: stack vertically on mobile

---

## Checklist Results Report

_(To be completed after PM checklist execution)_

**Checklist items to validate:**
- All requirements are clear, testable, and unambiguous
- Epic sequencing is logical and follows agile best practices
- Stories within each epic are properly sequenced
- Acceptance criteria are comprehensive and verifiable
- No cross-cutting concerns are relegated to final stories
- Technical assumptions align with PRD goals
- UI/UX specifications provide sufficient guidance

---

## Next Steps

### Avatar Image Generation

**Recommended Action**: Use Gemini to generate the avatar image with Option A prompt (Friendly AI Robot Guide). Save the generated image as `public/images/coach-avatar.png` (1024×1024px source, optimized versions generated for web).

### For UX Expert

"Please review the UI Design Goals section and create detailed wireframes for the floating coach avatar component and teacher dashboard. Focus on the speech-bubble report modal styling and ensure the design aligns with our existing component library (Radix UI + Tailwind)."

### For Architect

"Please review this PRD and create a comprehensive architecture document covering:
1. Component hierarchy and state management strategy for floating coach
2. Database schema enhancements for student reports and teacher assignments
3. API/Server action design for report generation and analytics
4. Performance optimization strategy for report generation at scale
5. Caching strategy for generated reports
6. Integration points with existing coach infrastructure

Pay special attention to the analytics pipeline architecture for processing coach transcripts and generating AI insights."

---

**End of PRD**
