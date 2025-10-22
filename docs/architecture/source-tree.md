# Source Tree - LLM Learning Lab

## Project Structure

```
vibecodestudy/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Marketing pages group
│   │   ├── page.tsx              # Landing page (/)
│   │   ├── pricing/              # Pricing page
│   │   └── about/                # About page
│   │
│   ├── auth/                     # Authentication pages
│   │   └── page.tsx              # Login/signup
│   │
│   ├── dashboard/                # Protected dashboard
│   │   ├── layout.tsx            # Dashboard layout (sidebar, nav)
│   │   ├── page.tsx              # Dashboard home
│   │   │
│   │   ├── vibecoding/           # Main lab section
│   │   │   ├── page.tsx          # Lab 列表页
│   │   │   ├── labs/             # Individual lab routes
│   │   │   │   ├── [labId]/      # Dynamic route for labs
│   │   │   │   │   └── page.tsx  # Lab content page (MDX)
│   │   │   │   └── _components/  # Lab-specific components
│   │   │   │       └── LabWrapper.tsx
│   │   │   └── _components/      # Vibecoding section components
│   │   │       └── LabCard.tsx
│   │   │
│   │   ├── settings/             # User settings
│   │   │   └── page.tsx
│   │   │
│   │   └── support/              # Support & help
│   │       └── page.tsx
│   │
│   ├── api/                      # API routes (if needed)
│   │   └── health/
│   │       └── route.ts
│   │
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── not-found.tsx             # 404 page
│
├── components/                   # Reusable components
│   ├── features/                 # Feature-specific components
│   │   ├── lab-sections/         # ✨ NEW: Section components (Phase 4)
│   │   │   ├── LearnContent.tsx      # Wrapper for educational content
│   │   │   ├── TryItContent.tsx      # Interactive exercise container
│   │   │   ├── SectionLayout.tsx     # Section page layout with tabs
│   │   │   ├── SectionNav.tsx        # Section list with progress
│   │   │   ├── SectionProgress.tsx   # Progress bar component
│   │   │   └── index.ts              # Barrel exports
│   │   │
│   │   ├── prompt-lab/           # Prompt Lab components
│   │   │   ├── PromptEditor.tsx
│   │   │   ├── LLMOutputDisplay.tsx
│   │   │   ├── ExerciseCard.tsx
│   │   │   └── SuccessFeedback.tsx
│   │   │
│   │   ├── coach/                # AI Coach components (复用)
│   │   │   ├── CoachDrawer.tsx
│   │   │   ├── CoachMessage.tsx
│   │   │   └── CoachInput.tsx
│   │   │
│   │   └── progress/             # Progress tracking (复用)
│   │       ├── ProgressBar.tsx
│   │       └── ProgressIndicator.tsx
│   │
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   │
│   └── layout/                   # Layout components
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── Sidebar.tsx
│
├── content/                      # ✨ Lab content (micro-sections)
│   └── labs/                     # Lab sections (Learn/Try It/Quiz)
│       ├── lab1/                 # Lab 1: Meet Your AI Friend (5 sections)
│       │   ├── section-1-1/      # What is AI?
│       │   │   ├── learn.tsx
│       │   │   └── try-it.tsx
│       │   ├── section-1-2/      # Your First Prompt
│       │   ├── section-1-3/      # Why Different Answers?
│       │   ├── section-1-4/      # Experiment Time
│       │   └── section-1-5/      # Review & Quiz
│       │       ├── learn.tsx
│       │       └── quiz.tsx
│       ├── lab2/                 # Lab 2: How AI Gets Smart (5 sections) ✅
│       ├── lab3/                 # Lab 3: AI's Thinking Process (5 sections) ✅
│       ├── lab4/                 # Lab 4: AI Capabilities & Limits (6 sections) ✅
│       ├── lab5/                 # Lab 5: Responsible AI Use (6 sections) ✅
│       └── lab6/                 # Lab 6: AI Workflow Builder (8 sections)
│
│   # Legacy monolithic files (backup only)
│   ├── lab1.mdx (deprecated)
│   ├── lab2.mdx (deprecated)
│   └── lab3-5.mdx (deprecated)
│
├── lib/                          # Utility libraries
│   ├── actions/                  # Server Actions
│   │   ├── section-progress.ts   # ✨ NEW (Phase 4): Section progress tracking
│   │   ├── prompt-lab.ts         # runPrompt(), checkSuccess()
│   │   ├── coach.ts              # askCoach() (reused)
│   │   ├── progress.ts           # updateModuleProgress() (reused)
│   │   └── auth.ts               # Authentication helpers (reused)
│   │
│   ├── constants/                # ✨ NEW: Configuration constants
│   │   └── lab-sections.ts       # Lab section definitions (35 sections)
│   │
│   ├── prompt-lab/               # ✨ NEW: Prompt Lab utilities
│   │   ├── success-checker.ts    # 成功标准检查
│   │   ├── lab-metadata.ts       # Lab metadata
│   │   └── exercise-criteria.ts  # Exercise success criteria
│   │
│   ├── ai/                       # AI integration
│   │   ├── openai-client.ts      # OpenAI wrapper
│   │   └── coach-prompts.ts      # Coach system prompts
│   │
│   ├── lab-content.ts            # ✨ NEW: Lab content loader
│   ├── supabase-client.ts        # Supabase client (browser)
│   ├── supabase-server.ts        # Supabase client (server)
│   ├── rate-limit.ts             # Rate limiting helper
│   └── utils.ts                  # General utilities
│
├── types/                        # TypeScript type definitions
│   ├── prompt-lab.ts             # ✨ NEW: Prompt Lab types
│   ├── supabase.ts               # Database types
│   └── index.ts                  # Exports
│
├── supabase/                     # Supabase configuration
│   ├── migrations/               # Database migrations
│   │   ├── 20251016_prompt_lab.sql  # ✨ NEW: Prompt lab tables
│   │   └── ...
│   ├── config.toml               # Supabase config
│   └── seed.sql                  # Seed data (optional)
│
├── public/                       # Static assets
│   ├── images/
│   ├── icons/
│   └── favicon.ico
│
├── .env.example                  # Environment variables template
├── .env.local                    # Local environment (gitignored)
├── .gitignore
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies
├── README.md                     # Project README
└── mdx-components.tsx            # MDX components mapping
```

---

## Key Directories Explained

### `/app` - Next.js App Router
所有路由页面，使用 App Router 约定。

**关键文件:**
- `app/dashboard/vibecoding/labs/[labId]/page.tsx` - 动态 Lab 内容页
- `app/dashboard/vibecoding/page.tsx` - Lab 列表

### `/components/features/prompt-lab` ✨ NEW
核心的 Prompt Lab 组件。

**关键文件:**
- `PromptEditor.tsx` - Prompt 编辑器
- `LLMOutputDisplay.tsx` - LLM 输出展示

### `/content/labs` ✨ NEW
所有 Lab 的 MDX 内容文件。

**命名约定:**
- `lab1.mdx` - Lab 1
- `lab2.mdx` - Lab 2
- ...

### `/lib/actions` - Server Actions
所有与数据库和 AI 交互的 Server Actions。

**关键文件:**
- `prompt-lab.ts` - 新增的 Prompt Lab actions
- `coach.ts` - 复用的 Coach actions

### `/lib/prompt-lab` ✨ NEW
Prompt Lab 专用的业务逻辑。

**关键文件:**
- `success-checker.ts` - 练习成功检查逻辑

### `/supabase/migrations`
所有数据库迁移 SQL 文件。

**关键文件:**
- `20251016_prompt_lab.sql` - 新表和索引

---

## Removed Directories (After Refactor)

以下目录/文件在重构后**不再需要**:

```
❌ components/features/webcontainer/     # WebContainer 相关组件
❌ components/features/sandpack/         # Sandpack 编辑器组件
❌ lib/webcontainer/                     # WebContainer 工具函数
❌ lib/ai/function-calling.ts            # AI Function Calling (不再使用)
```

---

## File Naming Conventions

### Components
- PascalCase: `PromptEditor.tsx`
- Suffix: `.tsx` for components, `.ts` for utilities

### Server Actions
- kebab-case for files: `prompt-lab.ts`
- camelCase for functions: `runPrompt()`

### MDX Content
- kebab-case: `lab1.mdx`, `lab2.mdx`

### Types
- kebab-case files: `prompt-lab.ts`
- PascalCase interfaces: `interface PromptLabProgress`

---

## Import Aliases

配置在 `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/types/*": ["./types/*"]
    }
  }
}
```

**Usage:**
```typescript
import { PromptEditor } from '@/components/features/prompt-lab/PromptEditor'
import { runPrompt } from '@/lib/actions/prompt-lab'
import type { PromptLabProgress } from '@/types/prompt-lab'
```

---

## Code Organization Principles

1. **Feature-based**: Group by feature (prompt-lab, coach, progress)
2. **Colocation**: Keep related files close (components + actions)
3. **Separation**: UI components separate from business logic
4. **Type safety**: All types in `/types` directory
5. **Server vs Client**: Clear separation (server actions in `/lib/actions`)

---

---

## Recent Updates (Phase 4 - January 2025)

### Micro-Sections Architecture

**What Changed:**
- Refactored Labs 2-5 into 22 micro-sections (5-7 min each)
- Created 44 new TypeScript files (learn.tsx, try-it.tsx, quiz.tsx)
- New `section_progress` table for granular tracking
- New components in `lab-sections/` directory
- New configuration system in `lib/constants/lab-sections.ts`
- New server actions in `lib/actions/section-progress.ts`

**Benefits:**
- Better attention span alignment (middle school students)
- Clear Learn/Practice separation
- Progressive unlocking
- Easier to pause and resume
- More granular progress tracking

**Status:** ✅ Phase 4 Complete - Build successful, production ready

---

**Last Updated**: 2025-01-22 (Phase 4 completion)
**Status**: Active - Reflects current production architecture
**Next Update**: After Lab 6 refactoring
