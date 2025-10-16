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

A web-based learning platform designed to teach **middle school students (12-15 years old)** the fundamentals of **Prompt Engineering** through interactive, article-based labs.

### Core Concept

- **Not a coding platform** - Focus on learning to communicate with AI
- **Article + Practice** - Students read concepts, then practice with embedded prompt editors
- **Instant Feedback** - See LLM outputs in real-time and get automatic success checks
- **5 Progressive Labs** - From basics to advanced prompt techniques

### Target Outcome

Students complete **5 labs in ~2 hours** and learn:
- ✅ What prompts are and how they work
- ✅ How to write clear, specific instructions
- ✅ Role-playing and context-setting techniques
- ✅ Chain-of-thought prompting
- ✅ Real-world application of prompt skills

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
- Labs written in MDX (Markdown + JSX)
- Components embedded directly in articles
- Static generation for performance

### 2. Interactive Prompt Practice
- Simple textarea-based editor
- Real-time LLM API calls
- Automatic success checking

### 3. Progress Tracking
- Exercise-level completion tracking
- Lab-level progress
- Module-level completion

### 4. AI Coach (Repurposed)
- Context updated for prompt learning
- On-demand help
- Rate-limited to prevent abuse

---

## 💾 Data Architecture

### Core Tables

1. **prompt_lab_progress** ✨ NEW
   - Purpose: Track exercise submissions and success
   - Size: ~30 MB (1000 students)

2. **coach_transcripts** (Reused)
   - Purpose: AI coach conversations
   - Updated: New context 'PromptLab'

3. **module_progress** (Reused)
   - Purpose: Module-level tracking
   - Updated: Support 5 labs

4. **ai_usage_log** (Reused)
   - Purpose: Rate limiting
   - Updated: New action 'prompt_lab'

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
- OpenAI GPT-4o: ~$140/month
- **Total**: ~$140-150/month

### Scale (10,000 students)
- Vercel Pro: $20/month
- Supabase Pro: $25/month
- OpenAI API: ~$1,400/month
- **Total**: ~$1,450/month

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

**Total**: 4 weeks + 1 week buffer

---

**Architecture Status**: ✅ Complete
**Implementation Status**: ⏳ Ready to Start
**Next Action**: Begin [Refactor Phase 1](../refactor.md#-phase-1-基础设施迁移-week-1)
