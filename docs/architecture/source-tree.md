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
│   │   ├── prompt-lab/           # ✨ NEW: Prompt Lab components
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
├── content/                      # ✨ NEW: MDX content files
│   └── labs/                     # Lab articles
│       ├── lab1.mdx              # Lab 1: 什么是 Prompt
│       ├── lab2.mdx              # Lab 2: 如何给清晰指令
│       ├── lab3.mdx              # Lab 3: 角色扮演技巧
│       ├── lab4.mdx              # Lab 4: 引导思考
│       └── lab5.mdx              # Lab 5: 综合应用挑战
│
├── lib/                          # Utility libraries
│   ├── actions/                  # Server Actions
│   │   ├── prompt-lab.ts         # ✨ NEW: runPrompt(), checkSuccess()
│   │   ├── coach.ts              # askCoach() (复用)
│   │   ├── progress.ts           # updateModuleProgress() (复用)
│   │   └── auth.ts               # Authentication helpers (复用)
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

**Last Updated**: 2025-10-16
**Status**: Active (Post-refactor)
