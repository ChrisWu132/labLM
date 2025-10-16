# Interactive AI Startup Course

A comprehensive learning platform for building AI-powered startups from problem discovery to demo.

## 🎯 Project Status (Last Updated: 2025-01)

### ✅ Completed Features

- **Database Schema** (Story 000) - Full Supabase schema with RLS policies
- **Coach Foundation** (Story 001A) - Centralized `askCoach()` with transcript persistence
- **Landing Page & Auth** (Stories 012/013) - Marketing page + Supabase authentication
- **Component Architecture** - Organized structure (layout/shared/features)
- **Module Scaffolding** - All 6 modules with basic UI
- **AI Coach Integration** - Integrated across all modules with context-specific feedback

### 🚧 In Progress

- **Epic 003** (Vibecoding Sandbox) - 75% complete
  - ✅ Sandpack integration
  - ✅ Lab cards and progress tracking
  - ✅ Inline coach helper
  - ⏳ Sandpack project content (3 files per lab)
  - ⏳ Download/copy functionality

### 📋 Pending Implementation

- **Epic 002** (Problem Discovery) - Ready to start
- **Epic 004** (Go-To-Market) - Scaffolded
- **Epic 005** (Iterate) - Scaffolded
- **Epic 006** (Demo & Certificate) - Scaffolded
- Real AI provider integration (currently mock)
- Unit tests for core functions
- Certificate generation

---

## Features

### Core Modules

- **Module 0: Orientation** - Setup checklist with AI coach troubleshooting
- **Module 1: Problem Discovery** - Research workspace, bullseye planner, interview kit *(Ready to implement)*
- **Module 2: Vibecoding** - Live Sandpack labs with inline AI coach *(In progress)*
- **Module 3: Go-To-Market** - ToB/ToC strategy builder *(Scaffolded)*
- **Module 4: Iterate** - North Star tracking & retro helper *(Scaffolded)*
- **Module 5: Demo & Certificate** - Final submission with certificate generation *(Scaffolded)*

### Technical Features

- **Centralized AI Coach** - `askCoach()` server action with automatic transcript persistence
- **Real-time Feedback** - Context-aware AI responses (Orientation, Problem, Sandbox, GTM, Iterate, Demo)
- **Progress Tracking** - Supabase-backed module progress and checklist system
- **Global Coach Drawer** - Persistent conversation history across all modules
- **Responsive Design** - Mobile-first approach with collapsible sections

---

## Tech Stack

### Frontend
- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Code Editor**: Sandpack (@codesandbox/sandpack-react)
- **Icons**: Lucide React

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Email/Password + OAuth)
- **ORM**: Supabase Client with TypeScript types
- **Server Actions**: Next.js 15 native server actions

### Deployment
- **Platform**: Vercel (optimized for Next.js)
- **Analytics**: Vercel Analytics
- **Environment**: Node.js runtime for server actions

---

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account (free tier works)
- Git

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd vibecodestudy
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**

Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these from your Supabase project: `Settings > API`

4. **Run database migrations:**

In your Supabase SQL Editor, run:
```bash
supabase/migrations/20251013000000_initial_schema.sql
```

Or use Supabase CLI:
```bash
supabase db push
```

5. **Run the development server:**
```bash
npm run dev
```

6. **Open the app:**
Navigate to [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
├── app/
│   ├── dashboard/              # Protected dashboard routes
│   │   ├── orientation/        # Module 0 - Setup & intro
│   │   ├── problem-discovery/  # Module 1 - Problem validation
│   │   ├── vibecoding/         # Module 2 - Sandpack labs
│   │   ├── go-to-market/       # Module 3 - GTM strategy
│   │   ├── iterate/            # Module 4 - Metrics & retros
│   │   ├── demo/               # Module 5 - Final submission
│   │   ├── settings/           # User settings
│   │   ├── support/            # Support page
│   │   └── layout.tsx          # Dashboard shell with sidebar
│   ├── auth/                   # Authentication pages & callbacks
│   ├── page.tsx                # Marketing landing page
│   └── layout.tsx              # Root layout
├── components/
│   ├── ui/                     # shadcn/ui base components
│   ├── layout/                 # Layout components
│   │   ├── dashboard-header.tsx
│   │   ├── module-sidebar.tsx
│   │   └── theme-provider.tsx
│   ├── shared/                 # Shared across modules
│   │   ├── coach-drawer.tsx    # Global AI coach drawer
│   │   ├── module-header.tsx   # Module page header
│   │   ├── progress-pill.tsx   # Progress indicator
│   │   └── video-player.tsx    # Video embeds
│   └── features/               # Feature-specific components
│       ├── demo/               # Module 5 components
│       ├── orientation/        # Module 0 components
│       ├── vibecoding/         # Module 2 components
│       └── go-to-market/       # Module 3 components
├── lib/
│   ├── actions/
│   │   └── coach.ts            # Centralized askCoach() server action
│   ├── types.ts                # TypeScript interfaces
│   ├── coach.ts                # AI provider wrapper (mock)
│   ├── supabase-server.ts      # Server-side Supabase client
│   ├── supabase-client.ts      # Client-side Supabase client
│   ├── constants.ts            # App constants and content
│   └── mock-data.ts            # Development fixtures
├── supabase/
│   ├── migrations/             # Database migrations
│   └── config.toml             # Supabase configuration
├── docs/                       # Project documentation
│   ├── architecture/           # Technical architecture docs
│   ├── epics/                  # Epic definitions
│   ├── stories/                # User stories
│   └── prd/                    # Product requirements
└── public/                     # Static assets
```

---

## Database Schema

### Core Tables

| Table | Purpose | Key Features |
|-------|---------|--------------|
| `module_progress` | Track user progress through modules 0-5 | Status, timestamps, checklist items (JSONB) |
| `research_inputs` | Store problem discovery research | Type (deep_research, bullseye, interview_kit), coach feedback |
| `problem_briefs` | Validated problem statements | Segment, problem, solution, validation status |
| `sandpack_submissions` | Code sandbox work from Module 2 | Lab number, code snapshot (JSONB), completion flag |
| `gtm_actions` | Go-to-market content (Module 3) | Track (ToB/ToC), action type, content (JSONB) |
| `iterate_logs` | Metrics tracking & retrospectives | North star, tracking items, retro notes |
| `demo_submissions` | Final project submissions | Name, project title, links, certificate URL |
| `coach_transcripts` | Complete AI coach conversation history | Module, context tag, messages, latency, status |
| `ai_usage_log` | Rate limiting (optional) | Call counts per user/module |

### Security

- **Row Level Security (RLS)** enabled on all tables
- Users can only access their own data (`user_id = auth.uid()`)
- Cascade delete on user account removal
- Storage bucket policies for certificates

---

## AI Coach Architecture

### Centralized Design

All AI interactions flow through a single server action:

```typescript
// lib/actions/coach.ts
export async function askCoach(request: AskCoachRequest): Promise<AskCoachResponse>
```

**Features:**
- ✅ Authentication validation
- ✅ Provider error handling
- ✅ Automatic transcript persistence
- ✅ Telemetry logging
- ✅ Context-specific responses (6 contexts)
- ✅ Failure/timeout recording

### Context Tags

| Context | Module | Use Case |
|---------|--------|----------|
| `Orientation` | 0 | Setup troubleshooting |
| `Problem` | 1 | Research validation |
| `Sandbox` | 2 | Coding help |
| `GTM` | 3 | Strategy feedback |
| `Iterate` | 4 | Metrics synthesis |
| `Demo` | 5 | Demo script review |

### Current State

- ✅ **Infrastructure**: Complete and tested
- ✅ **Integration**: All modules connected
- ⚠️ **Provider**: Mock implementation (needs real AI API)

---

## Development

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

### Environment Variables

Required:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

Optional (for production):
- `AI_PROVIDER` - AI provider name (e.g., "openai", "anthropic")
- `AI_API_KEY` - AI provider API key
- `AI_MODEL` - Model name (e.g., "gpt-4o-mini", "claude-3-haiku")

---

## Deployment

### Vercel Deployment (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - (Optional) `AI_PROVIDER`, `AI_API_KEY`, `AI_MODEL`
4. Deploy!

**Important**: Set Node.js runtime for server actions (not Edge runtime for AI endpoints)

---

## Integration TODOs

### High Priority

- [ ] **Real AI Provider Integration**
  - Replace mock in `lib/coach.ts`
  - Choose: OpenAI (gpt-4o-mini) or Anthropic (claude-3-haiku)
  - Add API key to environment
  - Test latency (<5s target)

- [ ] **Complete Epic 003 (Vibecoding)**
  - Add 3 core files per lab (App.tsx, api/mock.ts, prompts/sample.ts)
  - Implement download/copy functionality
  - Add Git primer content

### Medium Priority

- [ ] **Implement Epic 002 (Problem Discovery)**
  - Already scaffolded, ~3-5 days work

- [ ] **Unit Tests**
  - `askCoach()` function tests
  - Server action tests
  - Component tests

- [ ] **Certificate Generation**
  - PDF/PNG generation
  - QR code embedding
  - Storage upload

### Low Priority

- [ ] Analytics tracking (page views, completions)
- [ ] Error monitoring (Sentry)
- [ ] Performance monitoring
- [ ] Email notifications
- [ ] Admin dashboard

---

## Architecture Highlights

### Component Organization

- **Layout**: Dashboard shell, headers, sidebars
- **Shared**: Reusable across modules (coach drawer, module header)
- **Features**: Module-specific components (isolated, easier to maintain)
- **UI**: Pure presentational components (shadcn/ui)

### Data Flow

```
User Action → Client Component → Server Action → Supabase
                                    ↓
                              askCoach() → AI Provider
                                    ↓
                            coach_transcripts
```

### Performance Optimizations

- Lazy loading for Sandpack (code splitting)
- Optimistic UI updates for checklists
- Server-side rendering for initial load
- Image optimization (Next.js)

---

## Known Issues & Limitations

1. **Mock AI Responses**: Using static responses until real AI provider is connected
2. **CoachDrawer**: Still uses `callCoach()` instead of `askCoach()` (15min fix)
3. **No Tests**: Unit/integration tests pending
4. **Sandpack Content**: Basic starter code needs expansion for each lab
5. **Module 1 Skipped**: Orientation routes directly to Module 2 (temporary)

---

## Documentation

- **Architecture**: `docs/architecture/`
- **Epic Definitions**: `docs/epics/`
- **User Stories**: `docs/stories/`
- **PRD**: `docs/prd/`

---

## Contributing

This is a course project. For issues or questions, please contact the course team.

---

## License

All rights reserved.

---

## Recent Updates

### 2025-01-13
- ✅ Centralized AI coach with `askCoach()` server action
- ✅ Component architecture refactored (layout/shared/features)
- ✅ All modules integrated with AI coach
- ✅ Error handling for AI provider failures/timeouts
- ✅ Transcript persistence with failure logging

### 2025-01-12
- ✅ Database schema migrations completed
- ✅ Authentication flow implemented
- ✅ Landing page and navigation

---

**Built with Next.js 15, Supabase, and shadcn/ui** 🚀
