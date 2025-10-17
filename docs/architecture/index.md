# LLM Learning Lab - Architecture Documentation

**Project**: LLM Learning Lab - 初中生 Prompt Engineering 教学平台
**Version**: 1.0 (Post-refactor)
**Last Updated**: 2025-10-16

---

## 📚 Documentation Overview

This directory contains the complete technical architecture documentation for the **LLM Learning Lab** platform.

### Quick Links

| Document | Purpose | Audience |
|----------|---------|----------|
| **[Full-Stack Architecture](./full-stack-architecture.md)** | System overview, tech stack, core features | All |
| **[Refactor Plan](../refactor.md)** | Migration guide from old to new system | Developers |
| **[Tech Stack](./tech-stack.md)** | Technology choices and dependencies | Developers, DevOps |
| **[Source Tree](./source-tree.md)** | Project file structure and organization | Developers |
| **[Data Model & Services](./data-model-and-services.md)** | Database schema and server actions | Developers, Backend |
| **[PRD](../prd/llm-learning-lab-prd.md)** | Product requirements and specifications | PM, All |

---

## 🎯 What is LLM Learning Lab?

A web-based learning platform designed to teach **middle school students (12-15 years old)** and **higher education students (18-35 years old)** the fundamentals of **Prompt Engineering** and **AI Workflow Building** through interactive, article-based labs.

### Core Concept

- **Not a coding platform** - Focus on learning to communicate with AI
- **Article + Practice** - Students read concepts, then practice with embedded prompt editors
- **Instant Feedback** - See LLM outputs in real-time and get automatic success checks
- **6 Progressive Labs** - From basics to advanced workflow building

### Target Outcome

Students complete **6 labs in ~3 hours** and learn:
- ✅ What prompts are and how they work (Labs 1-2)
- ✅ How to write clear, specific instructions (Lab 3)
- ✅ Role-playing and context-setting techniques (Lab 4)
- ✅ Chain-of-thought prompting (Lab 5)
- ✅ AI workflow building and task decomposition (Lab 6)

---

## 🏗️ Architecture at a Glance

### High-Level System

```
┌─────────────────────────────────────┐
│      Browser (Student)              │
│  ┌───────────────────────────────┐  │
│  │   MDX Article Content         │  │
│  │   + Prompt Editor             │  │
│  │   + LLM Output Display        │  │
│  └───────────────────────────────┘  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Next.js 15 (Vercel)                │
│  ┌─────────────────────────────┐    │
│  │  Server Actions:            │    │
│  │  - runPrompt()              │    │
│  │  - askCoach()               │    │
│  │  - checkSuccess()           │    │
│  └─────────────────────────────┘    │
└──────┬────────────┬─────────────────┘
       │            │
       ▼            ▼
┌────────────┐  ┌──────────────┐
│ Supabase   │  │ OpenAI       │
│ (Database) │  │ (GPT-4o)     │
└────────────┘  └──────────────┘
```

### Key Technologies

- **Frontend**: Next.js 15, React 19, Tailwind CSS, MDX
- **Backend**: Next.js Server Actions, Supabase
- **AI**: OpenAI GPT-4o
- **Deployment**: Vercel

---

## 📖 Documentation Guide

### For New Developers

**Start here:**
1. Read [PRD](../prd/llm-learning-lab-prd.md) - Understand what we're building
2. Read [Full-Stack Architecture](./full-stack-architecture.md) - Get system overview
3. Review [Refactor Plan](../refactor.md) - Understand migration phases
4. Check [Source Tree](./source-tree.md) - Navigate the codebase

### For Implementing Features

**Follow this order:**
1. [Refactor Plan](../refactor.md) - See which phase you're in
2. [Data Model](./data-model-and-services.md) - Understand database schema
3. [Full-Stack Architecture](./full-stack-architecture.md) - See component interactions
4. [Tech Stack](./tech-stack.md) - Check available tools

### For Deployment

**Check these:**
1. [Tech Stack](./tech-stack.md#deployment) - Deployment setup
2. [Data Model](./data-model-and-services.md#migration-scripts) - Database migrations
3. [Refactor Plan](../refactor.md#phase-4-完善和测试-week-4) - Deploy checklist

---

## 🔄 Migration Status

### From: VibeCoding Lab (AI Programming Platform)
### To: LLM Learning Lab (Prompt Engineering Platform)

**Current Status**: ✅ Architecture Complete, Ready for Implementation

**Migration Summary:**

| Component | Old System | New System | Status |
|-----------|------------|------------|--------|
| **Core Tech** | WebContainer + Monaco | MDX + Prompt Editor | 📄 Documented |
| **Learning Goal** | Watch AI code | Learn prompt writing | 📄 Documented |
| **Data Model** | `webcontainer_projects` | `prompt_lab_progress` | 📄 Documented |
| **UI Flow** | 3-panel workspace | Article + embedded exercises | 📄 Documented |
| **Implementation** | Old code | Needs refactor | ⏳ Phase 1-4 Planned |

**Next Steps**: See [Refactor Plan](../refactor.md) Phase 1

---

## 🚀 Key Features

### 1. MDX-based Lab Content
- Labs 1-5: Written in MDX (Markdown + JSX)
- Lab 6: React Flow workflow builder
- Components embedded directly in articles
- Static generation for performance

### 2. Interactive Prompt Practice (Labs 1-5)
- Simple textarea-based editor
- Real-time LLM API calls
- Automatic success checking

### 3. Visual Workflow Builder (Lab 6) ✨ NEW
- React Flow canvas for node-based workflows
- Drag-and-drop interface for AI agents
- Real-time workflow execution
- Save/load workflow templates

### 4. Progress Tracking
- Exercise-level completion tracking
- Lab-level progress (6 labs total)
- Module-level completion
- Workflow execution history

### 5. Floating AI Coach ✨ NEW
- Persistent floating avatar button
- Context-aware chat interface
- On-demand help across all labs
- Rate-limited to prevent abuse

### 6. Teacher Dashboard ✨ NEW
- Student learning reports
- AI-generated insights
- Progress monitoring
- Intervention recommendations

---

## 💾 Data Architecture

### Core Tables

1. **prompt_lab_progress** ✨ NEW
   - Purpose: Track exercise submissions and success
   - Size: ~36 MB (1000 students, 6 labs)

2. **workflows** ✨ NEW (Lab 6)
   - Purpose: Store workflow definitions
   - Size: ~9 MB (1000 students)

3. **workflow_executions** ✨ NEW (Lab 6)
   - Purpose: Track workflow execution history
   - Size: ~30 MB (1000 students)

4. **student_reports** ✨ NEW (Floating Coach)
   - Purpose: Cache AI-generated learning reports
   - Size: ~5 MB (1000 students)

5. **teacher_assignments** ✨ NEW (Floating Coach)
   - Purpose: Teacher-student relationships
   - Size: ~0.2 MB (1000 students)

6. **coach_transcripts** (Reused)
   - Purpose: AI coach conversations
   - Updated: New context 'PromptLab'

7. **module_progress** (Reused)
   - Purpose: Module-level tracking
   - Updated: Support 6 labs

8. **ai_usage_log** (Reused)
   - Purpose: Rate limiting
   - Updated: New actions 'prompt_lab', 'workflow'

### Removed Tables
- ❌ `webcontainer_projects` - No longer needed
- ❌ `sandpack_submissions` - No longer needed

---

## 🔧 Tech Stack Summary

### Frontend
- **Framework**: Next.js 15.2.4 (App Router)
- **UI**: Tailwind CSS + shadcn/ui
- **Content**: next-mdx-remote (MDX)
- **Icons**: Lucide React

### Backend
- **Platform**: Next.js Server Actions
- **Database**: Supabase PostgreSQL
- **Auth**: Supabase Auth
- **AI**: OpenAI GPT-4o

### Removed
- ❌ `@webcontainer/api`
- ❌ `@monaco-editor/react`
- ❌ `xterm`

---

## 📊 Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Landing Page Load | <1.5s | Vercel Analytics |
| Lab Article Load | <1s | Core Web Vitals |
| Prompt → Response | <3s | Server action latency |
| Success Check | <100ms | Rule-based (instant) |

---

## 💰 Cost Estimates

### MVP (1000 students)
- Vercel: $0 (Hobby tier)
- Supabase: $0 (Free tier)
- OpenAI GPT-4o:
  - Labs 1-5: ~$140/month
  - Lab 6 Workflows: ~$50/month
  - Coach Reporting: ~$20/month
- **Total**: ~$210/month

### Scale (10,000 students)
- Vercel Pro: $20/month
- Supabase Pro: $25/month
- OpenAI API:
  - Labs 1-5: ~$1,400/month
  - Lab 6 Workflows: ~$500/month
  - Coach Reporting: ~$200/month
- **Total**: ~$2,145/month

---

## 🔐 Security

### Key Protections
- Row Level Security (RLS) on all tables
- Rate limiting (30 prompts/hour, 20 coach questions/hour)
- Server-only API keys
- Input validation (Zod)
- Content sanitization (XSS prevention)

---

## 📞 Support & Questions

### Documentation Issues
- File issue in GitHub
- Tag as `documentation`

### Architecture Questions
- Review full documents linked above
- Check [Refactor Plan](../refactor.md) for migration guidance

### Product Questions
- See [PRD](../prd/llm-learning-lab-prd.md)
- Check PRD Section 14 (Open Questions)

---

## 🗂️ File Organization

```
docs/
├── architecture/
│   ├── index.md                          # This file
│   ├── full-stack-architecture.md        # System overview
│   ├── tech-stack.md                     # Technology choices
│   ├── source-tree.md                    # File structure
│   ├── data-model-and-services.md        # Database & APIs
│   └── [legacy docs]                     # Old system docs (archived)
├── prd/
│   └── llm-learning-lab-prd.md           # Product requirements
└── refactor.md                           # Migration plan
```

---

## ✅ Architecture Review Checklist

Before implementing, ensure:

- [ ] Read [PRD](../prd/llm-learning-lab-prd.md) completely
- [ ] Understand [Full-Stack Architecture](./full-stack-architecture.md)
- [ ] Review [Refactor Plan](../refactor.md) phases
- [ ] Check [Data Model](./data-model-and-services.md) schema
- [ ] Verify [Tech Stack](./tech-stack.md) dependencies
- [ ] Navigate [Source Tree](./source-tree.md) structure

---

## 📅 Timeline

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| **Phase 1** | Week 1 | Infrastructure, database migration |
| **Phase 2** | Week 2 | Core components (PromptEditor, LLMOutput) |
| **Phase 3** | Week 3 | Lab 1-2 content integration |
| **Phase 4** | Week 4 | Lab 3-5, testing, deployment |
| **Lab 6** | Week 5-8 | Workflow builder (React Flow integration) |
| **Floating Coach** | Week 9-11 | Floating avatar, teacher dashboard, reports |

**Total**: 11 weeks (Phases 1-4: 4 weeks, Lab 6: 4 weeks, Coach: 3 weeks)

---

**Architecture Status**: ✅ Complete (Updated with Lab 6 and Floating Coach)
**Implementation Status**: ⏳ Labs 1-5 Complete, Lab 6 and Coach In Progress
**Last Updated**: 2025-10-17
**Next Actions**:
- Lab 6: Implement React Flow workflow builder
- Floating Coach: Build avatar UI and teacher dashboard
