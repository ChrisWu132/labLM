# LLM Learning Lab

**AI literacy curriculum for K-12 education** — Empowering students in grades 5-9 to understand, question, and responsibly use AI.

Discover how LLMs work through 6 progressive labs: explore prompts, hallucinations, biases, reasoning, ethics, and build AI workflows. No coding required!

---

## 🎯 What is LLM Learning Lab?

An educational platform where students explore how Large Language Models (LLMs) work through **6 progressive, hands-on labs**. Instead of just learning to *use* AI, students discover *how AI thinks*, including its limitations, mistakes, and ethical concerns—culminating in building their own AI workflows.

### Key Learning Goals

- 🔬 **Experiment with AI behaviors** - See what AI can and can't do
- 🚨 **Discover hallucinations** - Learn when AI makes things up
- ⚖️ **Explore bias & ethics** - Understand fairness and responsibility
- 🧠 **Understand reasoning** - See how AI thinks step-by-step
- ✅ **Critical thinking** - Learn to question and verify AI outputs
- 🛠️ **Build AI workflows** - Chain AI steps to solve complex problems

---

## 📚 The 6 Progressive Labs

| Lab | Title | Duration | What You'll Discover |
|-----|-------|----------|---------------------|
| **1** | **Meet Your AI Friend** | 20 min | What LLMs are, how they work, first conversation |
| **2** | **How AI Gets Smart** | 25 min | Training process, knowledge boundaries, clear communication |
| **3** | **AI's Thinking Process** | 25 min | Token generation, context role, role-playing techniques |
| **4** | **AI's Capabilities & Limits** | 30 min | Strengths & weaknesses, hallucinations, step-by-step reasoning |
| **5** | **Responsible AI Use & Mastery** | 30 min | Ethics, academic integrity, comprehensive application |
| **6** | **AI Workflow Builder** ⭐ | 60 min | Build complex workflows, problem decomposition, systems thinking (Advanced Capstone) |

**Total Time**: ~3.2 hours | **Target**: Grades 5-9 | **Prerequisites**: None!

---

## ✨ Key Features

### 🔬 Hands-On Experiments
- Interactive prompt editor embedded in lessons
- Real-time AI responses to see cause and effect
- Experiment with different inputs and observe outputs

### 🎯 Auto-Success Checking
- Rule-based validation (keywords, format, length)
- Instant feedback on exercise completion
- Learn what "good" looks like

### 📊 Progress Tracking
- Save your work and continue anytime
- Track completed experiments
- Module and lab completion tracking

### 🤖 AI Coach Assistant
- Get help when you're stuck
- Ask questions about AI concepts
- Context-aware guidance throughout your learning journey
- Accessible via sidebar drawer

### 🛠️ AI Workflow Builder (Lab 6)
- Visual node-based workflow designer
- Drag-and-drop interface for building AI workflows
- Pre-built templates to get started quickly
- Execute workflows in real-time
- Save and share your workflows

### 🎓 Educational Focus
- Age-appropriate content (grades 5-9)
- Teaches critical thinking about AI
- Focus on understanding, not just skills
- Emphasizes responsible AI use
- Culminates in practical workflow building

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15.2.4 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Workflow Builder**: React Flow v11+ (visual node-based interface)
- **State Management**: Zustand (for workflow builder)
- **Icons**: Lucide React

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI Provider**: GPT-4o (OpenAI API)
- **Server Actions**: Next.js 15 native server actions
- **Workflow Engine**: Custom execution engine with topological sorting

### Deployment
- **Platform**: Vercel (optimized for Next.js)
- **Analytics**: Vercel Analytics
- **CDN**: Vercel Edge Network

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account (free tier works)
- OpenAI API key (for GPT-4o)
- Git

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/ChrisWu132/labLM.git
cd labLM
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**

Create a `.env.local` file:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI (for GPT-4o)
OPENAI_API_KEY=your_openai_api_key
```

Get Supabase credentials from: `Settings > API` in your Supabase dashboard

4. **Run database migrations:**

In your Supabase SQL Editor, run the migration file:
```sql
-- See: supabase/migrations/20251016_prompt_lab.sql
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

## 📁 Project Structure

```
├── app/
│   ├── dashboard/
│   │   ├── vibecoding/           # Main labs area (5 experimental labs)
│   │   │   ├── [labId]/          # Dynamic lab routes (lab1, lab2, etc.)
│   │   │   └── page.tsx          # Labs list page
│   │   ├── orientation/          # Quick intro & setup
│   │   ├── settings/             # User settings
│   │   └── layout.tsx            # Dashboard shell
│   ├── auth/                     # Authentication pages
│   ├── page.tsx                  # Landing page
│   └── layout.tsx                # Root layout
├── components/
│   ├── ui/                       # shadcn/ui base components
│   ├── features/
│   │   └── prompt-lab/           # Lab-specific components
│   │       ├── PromptEditor.tsx  # Interactive prompt editor
│   │       ├── LLMOutputDisplay.tsx # AI response display
│   │       ├── LabArticle.tsx    # Article container
│   │       ├── ExerciseCard.tsx  # Exercise wrapper
│   │       └── SuccessCriteria.tsx # Auto-check validator
│   ├── layout/                   # Layout components
│   └── shared/                   # Shared components
├── lib/
│   ├── actions/
│   │   ├── prompt-lab.ts         # runPrompt, checkSuccess actions
│   │   └── coach.ts              # AI coach helper
│   ├── supabase-server.ts        # Server-side Supabase
│   ├── supabase-client.ts        # Client-side Supabase
│   ├── constants.ts              # App constants (labs config, copy)
│   └── types.ts                  # TypeScript types
├── supabase/
│   └── migrations/               # Database migrations
│       └── 20251016_prompt_lab.sql
├── docs/                         # Project documentation
│   ├── prd/
│   │   └── llm-learning-lab-prd.md
│   └── architecture/
└── public/                       # Static assets
```

---

## 🗄 Database Schema

### Core Tables

| Table | Purpose |
|-------|---------|
| `prompt_lab_progress` | Track user progress through labs, exercise completion, attempts |
| `module_progress` | Overall course/module progress tracking |
| `ai_usage_log` | Rate limiting and AI usage analytics |
| `coach_transcripts` | AI coach conversation history for help/guidance |
| `workflows` | User-created and template workflows (Lab 6) |
| `workflow_executions` | Execution history and results for workflows |

### Security
- **Row Level Security (RLS)** enabled on all tables
- Users can only access their own data
- Public templates available for all authenticated users
- Cascade delete on user removal

---

## 🧪 How Labs Work

### Lab Structure (MDX-based)

Each lab is an MDX file with embedded React components:

```mdx
# Lab 1: AI Basics

## 📖 Learning Goal
Understand how prompts and responses work.

## 🎯 Core Concepts
[Article content explaining the concept...]

## 💡 Example
<PromptEditor readonly initialValue="Tell me about cats" />
<LLMOutput content="[AI response here]" />

## ✏️ Exercise 1
Try modifying the prompt to get a specific response.

<PromptEditor
  editable
  exerciseId="lab1-ex1"
  initialValue="Tell me about..."
/>
<LLMOutput mode="live" />

**Success Criteria**: Output must mention "whiskers" and be under 100 words.
```

### Success Checking

Two methods for auto-validation:

1. **Rule-based** (recommended, zero cost):
```typescript
{
  exerciseId: "lab1-ex2",
  rules: [
    { containsKeywords: ["cat", "adventure"] },
    { minLength: 100 },
    { sentiment: "positive" }
  ],
  passingScore: 3  // All 3 must pass
}
```

2. **LLM-based** (flexible, minimal cost):
```typescript
// Use GPT-4o-mini to judge if output meets exercise goal
checkWithLLM(exerciseGoal, llmOutput)
// Returns: { success: boolean, feedback: string }
```

---

## 🎨 Component Architecture

### PromptEditor Component
```typescript
<PromptEditor
  mode="readonly" | "editable" | "blank"
  initialValue={string}
  exerciseId={string}
  onSubmit={(prompt) => runPrompt(prompt)}
  showCharCount={boolean}
  maxLength={number}
/>
```

### LLMOutputDisplay Component
```typescript
<LLMOutput
  mode="static" | "live"
  content={string}
  loading={boolean}
  error={string | null}
  showTokenCount={boolean}
/>
```

---

## 🔑 Key Server Actions

### runPrompt
```typescript
// Executes student prompt against GPT-4o
export async function runPrompt(request: {
  prompt: string
  labNumber: number
  exerciseId: string
}) {
  // 1. Validate auth
  // 2. Call GPT-4o API
  // 3. Save to lab_submissions
  // 4. Return response + metadata
}
```

### checkSuccess
```typescript
// Validates if exercise criteria are met
export async function checkSuccess(request: {
  exerciseId: string
  llmOutput: string
}) {
  // Check against success rules
  // Return: { success: boolean, feedback: string }
}
```

---

## 💰 Cost Estimates

Using **GPT-4o** for all LLM operations:

### Per Student (All 6 Labs)
- Labs 1-5: ~35 API calls (exercises + experiments)
- Lab 6 (Workflow Builder): ~37 API calls (observe, edit, create)
- Total: ~72 API calls per student
- ~200 tokens input + 400 tokens output per call
- Input cost: 72 × 200 × $2.50/1M = $0.036
- Output cost: 72 × 400 × $10.00/1M = $0.288
- **Total: ~$0.33 per student (complete 6-lab course)**

### Scale
- 100 students: ~$33/month
- 500 students: ~$165/month
- 1000 students: ~$330/month

### Cost Optimization
- Rule-based success checking (free) instead of LLM validation
- Rate limiting: 30 prompts per hour per student
- Estimated actual cost: ~$0.26/student (based on 80% Labs 1-5 completion, 60% Lab 6 completion)

---

## 🎯 Development Status

### ✅ Completed Features
- [x] Landing page with ToB positioning
- [x] Authentication system (Supabase Auth)
- [x] Database schema and migrations
- [x] PromptEditor component
- [x] LLMOutputDisplay component
- [x] runPrompt server action with rate limiting
- [x] Success criteria auto-checking (rule-based)
- [x] AI Coach integration (drawer-based)
- [x] Progress tracking system
- [x] Module and lab progress UI
- [x] Lab 6: AI Workflow Builder
  - [x] Visual workflow canvas (React Flow)
  - [x] Drag-and-drop node library
  - [x] Workflow execution engine
  - [x] Save/load workflows
  - [x] Template system
- [x] Orientation module

### 🚧 In Progress
- [ ] Lab 1-5 content development (article-based with MDX)
- [ ] Floating AI Coach avatar (to replace sidebar drawer)
- [ ] Teacher dashboard with student reports
- [ ] Advanced analytics and insights

### 📋 Planned Features
- [ ] Achievement badges and gamification
- [ ] Peer sharing of workflows
- [ ] Mobile app optimization
- [ ] Multi-language support
- [ ] LMS integration (Canvas, Google Classroom)

---

## 🧪 Educational Philosophy

### Why This Approach?

**Traditional AI courses teach**: How to use ChatGPT effectively
**LLM Learning Lab teaches**: How ChatGPT actually works

Students learn:
- ✅ What AI can do (capabilities)
- ✅ What AI can't do (limitations)
- ✅ When AI makes mistakes (hallucinations)
- ✅ How AI can be biased (ethics)
- ✅ How to think critically about AI outputs

### Science Education for the AI Age

This is not a "how to use AI tools" course. It's a **science curriculum** where students:
1. Form hypotheses about AI behavior
2. Run experiments with different prompts
3. Observe and analyze outputs
4. Draw conclusions about LLM characteristics
5. Apply critical thinking to real scenarios

---

## 📊 Success Metrics

### Learning Outcomes
- **80%+ completion rate** - Students finish all 5 labs
- **70%+ first/second attempt success** - Exercises are appropriately challenging
- **Average time per lab** - Matches target durations

### Technical Performance
- **<3s API response time** - Fast, smooth experience
- **95%+ API success rate** - Reliable interactions
- **<2s page load time** - Snappy UI

### Engagement
- **1.5-2 avg attempts per exercise** - Healthy trial-and-error
- **30%+ use AI coach** - Students seek help when needed
- **50%+ return within a week** - Content is engaging

---

## 🔐 Safety & Moderation

### Content Safety
- All AI responses filtered through OpenAI safety layer
- Age-appropriate content monitoring
- Exercises designed to avoid inappropriate outputs
- Teacher/parent dashboard (future feature)

### Privacy
- COPPA compliant (under-13 with parental consent)
- Minimal data collection
- No third-party tracking
- Student data never shared

---

## 🤝 Contributing

This is an educational project. For suggestions or issues:
- Open an issue on GitHub
- Contact: [your-email@example.com]

When contributing:
- All code and content must be in English
- Follow existing code style
- Add tests for new features
- Update documentation

---

## 📄 License

All rights reserved. © 2025 LLM Learning Lab

---

## 🎉 Recent Updates

### 2025-10-17
- 🛠️ **Lab 6 Workflow Builder**: Visual AI workflow builder with React Flow
- 📊 **Database enhancements**: Added workflow tables and execution tracking
- 🎨 **UI refinements**: Dashboard improvements and layout optimizations
- 🤖 **AI Coach improvements**: Context-aware coaching with better UX

### 2025-10-16
- 🔄 **Major pivot**: From startup course to LLM Learning Lab
- 🎯 **New focus**: Elementary & middle school students (grades 5-9)
- 🔬 **6 progressive labs**: AI fundamentals through workflow building
- 🎨 **Landing page redesigned**: ToB positioning for educators
- 📚 **Educational platform**: AI literacy curriculum for K-12
- 🤖 **GPT-4o integration**: Real-time AI responses for experiments

---

**Built with Next.js 15, Supabase, GPT-4o, React Flow, and shadcn/ui** 🚀
**Designed for students grades 5-9** 🧠
**AI literacy education for the next generation** 🔬

---

## 🛠 Troubleshooting

### ENOENT: .next/server/app-paths-manifest.json not found

If you see an error like:

```
Error: ENOENT: no such file or directory, open '.next/server/app-paths-manifest.json'
```

It means the production build artifacts are missing. Fixes:

1) Build first, then start:

```powershell
npm run build; npm start
```

2) Use the built-in guard. We added a prestart hook that auto-builds if artifacts are missing. Simply run:

```powershell
npm start
```

This will execute `scripts/ensure-build.js` to create the `.next` artifacts if needed, then boot the server.

3) For development, prefer:

```powershell
npm run dev
```

If issues persist, try clearing the build output and rebuilding:

```powershell
Remove-Item -Recurse -Force .next
npm run build
```
