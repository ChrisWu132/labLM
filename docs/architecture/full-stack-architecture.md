# LLM Learning Lab - Full-Stack Architecture

## 1. Guiding Principles

- **Article-First Learning**: 学生通过阅读文章学习概念,然后实践
- **Prompt Engineering Focus**: 专注于教学生如何与 LLM 对话,而非编程
- **Interactive Practice**: 嵌入式编辑器让学生实时看到 prompt 效果
- **Middle School Friendly**: 适合 12-15 岁初中生,零技术门槛
- **Minimal Infrastructure**: 不需要 WebContainer,直接调用 LLM API
- **Fast Iteration**: 轻量级组件,快速加载

## 2. High-Level System Overview

```
┌──────────────────────────────────────────────────────────────┐
│             Next.js App (Vercel, Node runtime)                │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Marketing Pages                                              │
│  ├── / (Landing)                       [Static SSG]          │
│  ├── /pricing                          [Static SSG]          │
│  └── /auth (Supabase Auth UI)         [Client-side]         │
│                                                               │
│  Dashboard (/dashboard/*)                                     │
│  ├── /dashboard/vibecoding             [Dynamic SSR/CSR]    │
│  │    └── Lab List UI (复用现有)                            │
│  ├── /dashboard/vibecoding/labs/[labId]                      │
│  │    ├── MDX Article Content          [Static SSG]         │
│  │    ├── PromptEditor Components      [Client-only]        │
│  │    ├── LLMOutput Display            [Client-only]        │
│  │    └── Coach Drawer (复用)          [Client-only]        │
│  ├── /dashboard/settings               [Dynamic SSR]        │
│  └── /dashboard/support                [Static SSG]         │
│                                                               │
│  Server Actions (/lib/actions/*)                              │
│  ├── runPrompt() - 执行学生的 prompt 练习                    │
│  ├── checkSuccess() - 自动检查练习是否达标                   │
│  ├── askCoach() - AI 辅导(复用,上下文改为 prompt 学习)      │
│  └── saveLabProgress() - 保存练习进度                        │
│                                                               │
└──────────────────────────────────────────────────────────────┘
                      │                    │
         ┌────────────┴────────┬───────────┴───────────┐
         │                     │                       │
    ┌────▼─────┐      ┌───────▼────────┐      ┌──────▼──────┐
    │ Supabase │      │   AI Provider   │      │   不再使用   │
    │  (BaaS)  │      │   (GPT-4o)      │      │ WebContainer│
    ├──────────┤      ├─────────────────┤      └─────────────┘
    │ Auth     │      │ Text Completion │
    │ Postgres │      │ No Function Call│
    │ Storage  │      │ Streaming (可选)│
    └──────────┘      └─────────────────┘
```

### Traffic Flow

1. **学生** → 选择 Lab → 阅读 MDX 文章
2. **练习** → 在嵌入的 PromptEditor 中修改 prompt → 点击"运行"
3. **Client** → 调用 `runPrompt()` server action → 传递 prompt + exerciseId
4. **Server** → 调用 GPT-4o API → 返回 LLM 输出
5. **Server** → 自动检查输出是否符合成功标准 (规则 or LLM 判断)
6. **Client** → 显示 LLM 输出 + 成功/失败反馈
7. **Background** → 记录提交到 `prompt_lab_progress` 表

## 3. Technology Stack

### Frontend

```yaml
Framework: Next.js 15.2.4 (App Router)
Language: TypeScript 5
Styling: Tailwind CSS v4
UI Components: shadcn/ui (Radix UI primitives)
Icons: Lucide React

Content Stack:
  MDX: "@next/mdx" 或 "next-mdx-remote" (文章 + 嵌入组件)
  Editor: 简单的 <textarea> + 语法高亮(可选)
  No Monaco: ❌ 不需要复杂代码编辑器
  No Terminal: ❌ 不需要终端模拟

State Management: React hooks + Server Components (no Redux)

移除的依赖:
  ❌ @webcontainer/api - 不再需要浏览器 Node.js
  ❌ @monaco-editor/react - 不再需要代码编辑器
  ❌ xterm - 不再需要终端
```

### Backend

```yaml
Platform: Next.js 15 Server Actions
Database: Supabase (PostgreSQL with RLS)
Authentication: Supabase Auth (OAuth + Email/Password)
Storage: Supabase Storage (可选：存储证书)
Runtime: Node.js (仍需要，用于 AI SDK)
```

### AI Integration

```yaml
Provider: OpenAI (gpt-4o) - PRD 确认选择
Approach: 简单的文本补全 (非 function calling)
Features:
  - Prompt 执行 (单次调用)
  - 输出成功检查 (规则检查 or LLM 判断)
  - 辅导对话 (askCoach 复用)
Cost: ~$0.14 per student (30次练习 × 600 tokens × GPT-4o 价格)
```

### Deployment

```yaml
Platform: Vercel (optimized for Next.js)
Environment: Production + Preview branches
Runtime: Node.js serverless functions (NOT Edge)
Analytics: Vercel Analytics
Monitoring: Vercel logs + Supabase dashboard
```

## 4. Application Modules

| Module | Route | Components | Backend | Notes |
|--------|-------|------------|---------|-------|
| **Landing** | `/` | Hero, Features, Pricing, FAQ | Static SSG | 营销页面 (需更新内容为 Prompt Lab) |
| **Auth** | `/auth` | Supabase Auth UI | Supabase Auth | OAuth + magic link (复用) |
| **Lab List** | `/dashboard/vibecoding` | Lab 卡片列表, 进度追踪 | Supabase | 复用现有 UI, 改数据源 |
| **Lab Content** | `/dashboard/vibecoding/labs/[labId]` | MDX Article + PromptEditor + LLMOutput | runPrompt() | 核心学习体验 |
| **Settings** | `/dashboard/settings` | Profile, Preferences | Supabase | 复用 |
| **Support** | `/dashboard/support` | FAQ, Contact | Static SSG | 复用 |

## 5. Core Features Deep Dive

### 5.1 Lab Content Page (新增核心模块)

**组件结构:**

```tsx
<LabPage labId="lab1">
  <LabHeader>
    <LabNavigation /> {/* Lab 1-5 导航 */}
    <ProgressIndicator />
  </LabHeader>

  {/* MDX Article with embedded components */}
  <MDXContent>
    {/*
      MDX 文件包含：
      - 学习目标
      - 核心概念讲解
      - 示例展示 (readonly PromptEditor + LLMOutput)
      - 练习题 (editable PromptEditor + live LLMOutput)
      - 挑战题
      - 总结
    */}

    <PromptEditor
      exerciseId="lab1-ex1"
      mode="editable"
      initialValue="告诉我关于猫的事情"
      onSubmit={handleRunPrompt}
    />

    <LLMOutputDisplay
      mode="live"
      loading={isLoading}
      content={llmResponse}
      success={isSuccess}
      feedback={feedback}
    />
  </MDXContent>

  <CoachDrawer /> {/* 复用, 上下文改为 Prompt 学习 */}
</LabPage>
```

**关键交互流程:**

1. 学生阅读文章,了解 Prompt 概念
2. 在嵌入的编辑器中修改示例 prompt
3. 点击"运行" → `await runPrompt(prompt, exerciseId)`
4. 显示加载状态 → 显示 LLM 输出
5. 自动检查输出是否符合成功标准
6. 显示反馈: ✅ 成功 or ❌ 再试试 (带提示)
7. 成功后记录进度,解锁下一题

### 5.2 PromptEditor Component (核心新组件)

```typescript
// components/features/prompt-lab/PromptEditor.tsx
interface PromptEditorProps {
  exerciseId: string
  mode: 'readonly' | 'editable' | 'blank'
  initialValue?: string
  placeholder?: string
  maxLength?: number
  showCharCount?: boolean
  onSubmit?: (prompt: string) => void
}

export function PromptEditor({
  exerciseId,
  mode,
  initialValue = '',
  placeholder = '在这里输入你的 prompt...',
  maxLength = 1000,
  showCharCount = true,
  onSubmit
}: PromptEditorProps) {
  const [prompt, setPrompt] = useState(initialValue)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!prompt.trim()) return

    setIsSubmitting(true)
    await onSubmit?.(prompt)
    setIsSubmitting(false)
  }

  return (
    <div className="prompt-editor">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={mode === 'readonly' || isSubmitting}
        className="w-full min-h-[120px] p-4 border rounded-lg"
      />

      {showCharCount && (
        <div className="text-sm text-gray-500 mt-1">
          {prompt.length} / {maxLength} 字符
        </div>
      )}

      {mode !== 'readonly' && (
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !prompt.trim()}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          {isSubmitting ? '运行中...' : '运行 Prompt'}
        </button>
      )}
    </div>
  )
}
```

### 5.3 LLMOutputDisplay Component (核心新组件)

```typescript
// components/features/prompt-lab/LLMOutputDisplay.tsx
interface LLMOutputProps {
  mode: 'static' | 'live'
  content: string
  loading?: boolean
  error?: string | null
  success?: boolean | null
  feedback?: string
  showTokenCount?: boolean
}

export function LLMOutputDisplay({
  mode,
  content,
  loading = false,
  error = null,
  success = null,
  feedback,
  showTokenCount = false
}: LLMOutputProps) {
  return (
    <div className="llm-output">
      <div className="border rounded-lg p-4 bg-gray-50">
        {loading && (
          <div className="flex items-center gap-2">
            <Spinner />
            <span>AI 正在思考...</span>
          </div>
        )}

        {error && (
          <div className="text-red-600">
            ❌ 出错了: {error}
          </div>
        )}

        {content && !loading && (
          <div className="whitespace-pre-wrap">
            {content}
          </div>
        )}
      </div>

      {/* 成功检查反馈 */}
      {success !== null && (
        <div className={`mt-3 p-3 rounded-lg ${
          success ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {success ? (
            <>
              ✅ <strong>太棒了!</strong> 你的 prompt 达到了目标!
            </>
          ) : (
            <>
              💡 <strong>再试试:</strong> {feedback || '输出还不太符合要求,尝试调整你的 prompt'}
            </>
          )}
        </div>
      )}

      {showTokenCount && content && (
        <div className="text-xs text-gray-500 mt-2">
          约 {Math.ceil(content.length / 4)} tokens
        </div>
      )}
    </div>
  )
}
```

### 5.4 MDX Content Integration

**技术方案: next-mdx-remote**

```typescript
// app/dashboard/vibecoding/labs/[labId]/page.tsx
import { MDXRemote } from 'next-mdx-remote/rsc'
import { PromptEditor } from '@/components/features/prompt-lab/PromptEditor'
import { LLMOutputDisplay } from '@/components/features/prompt-lab/LLMOutputDisplay'

const components = {
  PromptEditor,
  LLMOutputDisplay
}

export default async function LabPage({ params }: { params: { labId: string } }) {
  const labContent = await getLabContent(params.labId)

  return (
    <div className="lab-container">
      <MDXRemote
        source={labContent.mdx}
        components={components}
      />
    </div>
  )
}
```

**Lab MDX 文件示例:**

```mdx
# Lab 1: 什么是 Prompt

## 📖 学习目标
- 理解什么是 prompt
- 学会写基本的指令
- 了解 LLM 如何理解输入

## 🎯 核心概念

Prompt 就是你对 AI 说的话。就像你问朋友问题一样，你对 AI 说什么，它就会根据你说的话来回答。

**示例:**

<PromptEditor
  exerciseId="lab1-demo"
  mode="readonly"
  initialValue="告诉我关于猫的事情"
/>

<LLMOutputDisplay
  mode="static"
  content="猫是一种可爱的家养动物。它们通常有柔软的毛发，敏捷的身手，喜欢晒太阳和玩耍。猫有很强的独立性，但也喜欢和主人互动..."
/>

## ✏️ 动手练习

### 练习 1: 让回答更具体

**任务**: 修改下面的 prompt，让 AI 的回答更具体，比如只介绍猫的习性。

<PromptEditor
  exerciseId="lab1-ex1"
  mode="editable"
  initialValue="告诉我关于猫的事情"
/>

<LLMOutputDisplay mode="live" />

**目标**: 输出应该专注于猫的习性，而不是泛泛而谈。

**提示**: 试着在 prompt 中明确说明你想了解"猫的习性"。

## 📝 总结
- Prompt 越具体，AI 的回答越准确
- 明确说明你想要什么内容
- 下一步：学习如何给清晰的指令
```

### 5.5 Server Action: runPrompt()

```typescript
// lib/actions/prompt-lab.ts
export async function runPrompt(request: {
  prompt: string
  labNumber: number
  exerciseId: string
}): Promise<RunPromptResult> {
  const user = await getCurrentUser()
  if (!user) throw new Error('Not authenticated')

  // 1. Validate input
  if (!request.prompt || request.prompt.length < 10) {
    return { success: false, error: 'Prompt 太短,至少 10 个字符' }
  }

  // 2. Rate limit check
  const allowed = await checkRateLimit(user.id, 'prompt_lab', 30, 60)
  if (!allowed) {
    return { success: false, error: '操作太频繁,请稍后再试' }
  }

  // 3. Call GPT-4o
  const startTime = Date.now()
  let llmResponse: string

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'user', content: request.prompt }
      ],
      max_tokens: 500,
      temperature: 0.7
    })

    llmResponse = response.choices[0].message.content || ''
  } catch (error) {
    console.error('[runPrompt] AI API error:', error)
    return { success: false, error: 'AI 服务暂时不可用' }
  }

  const latencyMs = Date.now() - startTime

  // 4. Check success criteria
  const successCheck = await checkExerciseSuccess(
    request.exerciseId,
    llmResponse
  )

  // 5. Persist submission
  await supabase.from('prompt_lab_progress').insert({
    user_id: user.id,
    lab_number: request.labNumber,
    exercise_id: request.exerciseId,
    prompt_submitted: request.prompt,
    llm_response: llmResponse,
    success: successCheck.success,
    attempts: 1, // TODO: increment existing attempts
    completed_at: successCheck.success ? new Date().toISOString() : null
  })

  // 6. Log usage
  await supabase.from('ai_usage_log').insert({
    user_id: user.id,
    action: 'prompt_lab'
  })

  return {
    success: true,
    output: llmResponse,
    passed: successCheck.success,
    feedback: successCheck.feedback,
    latencyMs
  }
}
```

### 5.6 Success Criteria Checking

```typescript
// lib/prompt-lab/success-checker.ts
interface SuccessCriteria {
  exerciseId: string
  rules: {
    type: 'containsKeywords' | 'minLength' | 'maxLength' | 'format' | 'sentiment'
    value: any
  }[]
  passingScore: number // 需要满足几条规则
}

const exerciseCriteria: Record<string, SuccessCriteria> = {
  'lab1-ex1': {
    exerciseId: 'lab1-ex1',
    rules: [
      { type: 'containsKeywords', value: ['习性', '行为', '特点'] },
      { type: 'minLength', value: 50 }
    ],
    passingScore: 2
  },
  // ... more exercises
}

export async function checkExerciseSuccess(
  exerciseId: string,
  llmOutput: string
): Promise<{ success: boolean, feedback: string }> {
  const criteria = exerciseCriteria[exerciseId]
  if (!criteria) {
    // No criteria defined = always pass
    return { success: true, feedback: '' }
  }

  let passedRules = 0

  for (const rule of criteria.rules) {
    switch (rule.type) {
      case 'containsKeywords':
        const keywords = rule.value as string[]
        if (keywords.some(kw => llmOutput.includes(kw))) {
          passedRules++
        }
        break

      case 'minLength':
        if (llmOutput.length >= rule.value) {
          passedRules++
        }
        break

      case 'maxLength':
        if (llmOutput.length <= rule.value) {
          passedRules++
        }
        break

      // ... more rule types
    }
  }

  const success = passedRules >= criteria.passingScore

  let feedback = ''
  if (!success) {
    feedback = '输出还不太符合要求。提示: 试着让 AI 更聚焦在具体方面。'
  }

  return { success, feedback }
}
```

### 5.7 Coach Integration (复用 askCoach)

**更新 Coach 上下文:**

```typescript
// lib/coach.ts
function getCoachSystemPrompt(context: string): string {
  if (context === 'PromptLab') {
    return `你是一个 Prompt Engineering 教学助手，帮助初中生学习如何与 LLM 对话。

职责:
- 用简单易懂的语言解释 prompt 概念
- 给出具体的改进建议（不是泛泛而谈）
- 鼓励学生实验不同的表达方式
- 当学生卡住时给予恰当提示

风格:
- 友好、耐心
- 不使用专业术语
- 多用比喻和例子
- 每次回答控制在 2-3 句话`
  }

  // ... other contexts
}
```

## 6. Authentication & Authorization

**完全复用现有实现** - 无变化

```typescript
// lib/supabase-client.ts - 复用
// lib/supabase-server.ts - 复用
// middleware.ts - 复用 (保护 /dashboard/*)
```

**Rate Limiting** - 更新限制:

- Prompt Lab: 30 次执行/小时 (之前是 10 次 AI Agent)
- AI Coach: 20 questions/小时 (保持)

## 7. Data Architecture

### 7.1 New Tables

```sql
-- Prompt Lab 进度追踪
CREATE TABLE prompt_lab_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lab_number SMALLINT NOT NULL CHECK (lab_number BETWEEN 1 AND 5),
  exercise_id TEXT NOT NULL, -- e.g., "lab1-ex1"

  -- Submission data
  prompt_submitted TEXT NOT NULL,
  llm_response TEXT NOT NULL,

  -- Success tracking
  success BOOLEAN DEFAULT false,
  attempts INT DEFAULT 1,

  -- Timestamps
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(user_id, lab_number, exercise_id)
);

CREATE INDEX idx_prompt_lab_user ON prompt_lab_progress(user_id, lab_number);
CREATE INDEX idx_prompt_lab_success ON prompt_lab_progress(user_id, success, created_at DESC);
```

### 7.2 Retained Tables (复用)

- `coach_transcripts` - 复用（Coach 对话记录）
- `module_progress` - 复用（模块级进度）
- `ai_usage_log` - 复用（Rate limiting）

### 7.3 Removed Tables (不再需要)

- ❌ `webcontainer_projects` - 删除（不再使用 WebContainer）
- ❌ `sandpack_submissions` - 删除（不再使用 Sandpack）

### 7.4 RLS Policies

```sql
ALTER TABLE prompt_lab_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON prompt_lab_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON prompt_lab_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON prompt_lab_progress FOR UPDATE
  USING (auth.uid() = user_id);
```

## 8. Performance Targets

| Metric | Target | Measured By |
|--------|--------|-------------|
| **Landing Page Load** | <1.5s | Vercel Analytics |
| **Lab Article Load** | <1s | Core Web Vitals (LCP) |
| **Prompt Submit → Response** | <3s | Server action latency |
| **MDX Rendering** | <500ms | Client-side timing |
| **Success Check** | <100ms | Rule-based (instant) |
| **Coach Response** | <3s | `coach_transcripts.latency_ms` |

**Optimization Strategies:**

- **MDX**: Precompile at build time (SSG)
- **Components**: Code-split PromptEditor/LLMOutput
- **AI API**: Use streaming for long responses (optional)
- **Caching**: Cache common exercise prompts (Redis, 后期)

## 9. Security

### 9.1 Attack Surface

**Threats:**

- ❌ Prompt Injection - Sanitize user prompts before AI calls
- ❌ XSS in LLM output - Escape HTML in response display
- ❌ API key leakage - Server-only environment variables
- ❌ Rate limit bypass - Supabase-backed rate limiting
- ❌ Content moderation - Use OpenAI's safety filters

### 9.2 Input Validation

```typescript
import { z } from 'zod'

const PromptLabSchema = z.object({
  prompt: z.string().min(10).max(1000),
  labNumber: z.number().int().min(1).max(5),
  exerciseId: z.string().regex(/^lab\d+-ex\d+$/)
})
```

### 9.3 Content Safety

```typescript
// Sanitize LLM output before displaying
function sanitizeLLMOutput(text: string): string {
  // Remove potential XSS vectors
  return text
    .replace(/<script>/gi, '&lt;script&gt;')
    .replace(/<iframe>/gi, '&lt;iframe&gt;')
}
```

## 10. Cost Estimates (MVP)

| Service | Usage | Cost |
|---------|-------|------|
| **Vercel** | Hobby tier, 100 GB bandwidth | $0 |
| **Supabase** | Free tier, <500MB data | $0 |
| **OpenAI GPT-4o** | 1000 students × $0.14/student | $140/month |
| **Domain** | .com registration | $12/year |
| **Total** | First 1000 students | **~$140-150/month** |

**Scaling (10,000 students):**

- Vercel Pro: $20/month
- Supabase Pro: $25/month
- OpenAI API: $1,400/month
- **Total: ~$1,450/month**

## 11. Observability

### 11.1 Key Metrics

**Lab Completion Rate:**

```sql
SELECT
  lab_number,
  COUNT(DISTINCT user_id) AS total_students,
  COUNT(DISTINCT user_id) FILTER (WHERE success = true) AS completed,
  COUNT(DISTINCT user_id) FILTER (WHERE success = true)::FLOAT / COUNT(DISTINCT user_id) AS completion_rate
FROM prompt_lab_progress
WHERE created_at > now() - interval '7 days'
GROUP BY lab_number
ORDER BY lab_number;
```

**Average Attempts per Exercise:**

```sql
SELECT
  exercise_id,
  AVG(attempts) AS avg_attempts,
  MAX(attempts) AS max_attempts
FROM prompt_lab_progress
WHERE created_at > now() - interval '7 days'
GROUP BY exercise_id
ORDER BY avg_attempts DESC;
```

## 12. Future Enhancements (Post-MVP)

### Phase 2 (3-6 months)

- [ ] LLM-based success checking (更灵活的判断)
- [ ] Prompt 版本历史 (查看和恢复之前的尝试)
- [ ] 学生间分享优秀 prompt 示例
- [ ] "解释为什么这个 prompt 有效" 按钮

### Phase 3 (6-12 months)

- [ ] 教师 Dashboard (查看全班进度)
- [ ] 自定义练习题创建器
- [ ] 多语言支持 (英文版)
- [ ] 移动端 App

## 13. Migration from Old System

**关键变化:**

| 旧系统 | 新系统 | 迁移策略 |
|-------|-------|---------|
| WebContainer workspace | MDX article + editors | 完全替换 UI |
| `webcontainer_projects` table | `prompt_lab_progress` table | 新表,旧表可保留备份 |
| AI Agent (function calling) | Simple LLM call | 简化 AI 集成 |
| Code generation focus | Prompt engineering focus | 内容重写 |
| Sandpack/Monaco editor | Simple textarea | 移除重型依赖 |

**复用的部分:**

- ✅ Authentication (Supabase Auth)
- ✅ Dashboard layout & navigation
- ✅ Coach interaction pattern (`askCoach()`)
- ✅ Progress tracking system
- ✅ Rate limiting infrastructure

## 14. Related Documentation

- [MDX Content Architecture](./mdx-content-architecture.md) - MDX 集成详解
- [Prompt Lab Components](./prompt-lab-components.md) - 组件库文档
- [Data Model & Services](./data-model-and-services.md) - 数据库 schema
- [Tech Stack](./tech-stack.md) - 技术栈详解
- [Source Tree](./source-tree.md) - 项目文件结构
- [Coding Standards](./coding-standards.md) - 代码规范

---

**Last Updated**: 2025-10-16
**Status**: Active Development (Migration from VibeCoding Lab to LLM Learning Lab)
**Next Review**: After refactor Phase 1 completion
