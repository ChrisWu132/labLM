# LLM Learning Lab - 重构计划

## 概述

**目标**: 将现有的 VibeCoding Lab（观察 AI 编程平台）重构为 **LLM Learning Lab**（面向初中生的 Prompt Engineering 教学平台）

**时间线**: 4-5 周
**阶段数**: 3 个主要阶段 + 1 个测试优化阶段

---

## 📋 重构总览

### 核心变化

| 维度 | 旧系统 | 新系统 | 影响范围 |
|-----|--------|--------|----------|
| **学习目标** | 观察 AI 编程 | 学习 Prompt Engineering | 全部内容 |
| **核心技术** | WebContainer + Sandpack | MDX + Prompt Editor | 前端核心 |
| **用户交互** | 看 AI 写代码 | 自己写 prompt 看输出 | UX 流程 |
| **数据模型** | `webcontainer_projects` | `prompt_lab_progress` | 数据库 |
| **依赖项** | Monaco, xterm, WebContainer | MDX, simple textarea | package.json |

### 保留的部分 ✅

- Next.js 15 + App Router
- Supabase 认证和数据库
- Dashboard 布局和导航
- Coach Drawer (`askCoach()`)
- 进度追踪系统
- Rate limiting 机制

### 移除的部分 ❌

- `@webcontainer/api`
- `@monaco-editor/react`
- `xterm` + `xterm-addon-fit`
- `webcontainer_projects` 表
- AI Function Calling 逻辑

### 新增的部分 ✨

- `next-mdx-remote` (MDX 支持)
- PromptEditor 组件
- LLMOutputDisplay 组件
- `prompt_lab_progress` 表
- 成功标准检查系统
- Lab 1-5 MDX 内容

---

## 🚀 Phase 1: 基础设施迁移 (Week 1)

### 目标
建立新系统的技术基础，移除旧依赖，准备数据层。

### 1.1 Dependencies 清理

**移除旧依赖:**

```bash
npm uninstall @webcontainer/api @monaco-editor/react xterm xterm-addon-fit
```

**新增依赖:**

```bash
npm install next-mdx-remote@latest
npm install react-syntax-highlighter @types/react-syntax-highlighter
# 可选：如果需要 prompt 语法高亮
```

**更新 `package.json` 脚本:**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:migrate": "supabase migration up",
    "db:reset": "supabase db reset"
  }
}
```

### 1.2 数据库迁移

**创建迁移文件:** `supabase/migrations/20251016_prompt_lab.sql`

```sql
-- 1. 创建 prompt_lab_progress 表
CREATE TABLE prompt_lab_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lab_number SMALLINT NOT NULL CHECK (lab_number BETWEEN 1 AND 5),
  exercise_id TEXT NOT NULL,

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

-- 2. 创建索引
CREATE INDEX idx_prompt_lab_user ON prompt_lab_progress(user_id, lab_number);
CREATE INDEX idx_prompt_lab_success ON prompt_lab_progress(user_id, success, created_at DESC);

-- 3. RLS 策略
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

-- 4. 备份旧表 (不删除，以防需要数据)
-- webcontainer_projects 保留不变
-- 如果后续确认不需要，可手动删除：DROP TABLE webcontainer_projects CASCADE;

-- 5. 更新 module_progress 检查约束（支持 Lab 1-5）
ALTER TABLE module_progress DROP CONSTRAINT IF EXISTS module_progress_module_number_check;
ALTER TABLE module_progress ADD CONSTRAINT module_progress_module_number_check
  CHECK (module_number BETWEEN 0 AND 5);
```

**运行迁移:**

```bash
supabase db reset  # 本地开发环境
# 或
supabase migration up  # 生产环境
```

### 1.3 配置 MDX 支持

**更新 `next.config.mjs`:**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  experimental: {
    mdxRs: false, // 使用传统 MDX loader
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['vibecodinglab.com', 'localhost:3000']
    }
  }
}

export default nextConfig
```

**创建 MDX 组件配置:** `mdx-components.tsx`

```typescript
// mdx-components.tsx (根目录)
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 自定义 MDX 组件映射（Phase 2 会用到）
    ...components,
  }
}
```

### 1.4 环境变量更新

**更新 `.env.local`:**

```bash
# Supabase (保持不变)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJyyy...

# AI Provider - 确认使用 GPT-4o
AI_PROVIDER=openai
OPENAI_API_KEY=sk-xxx...
AI_MODEL=gpt-4o  # 根据 PRD 确定
AI_TIMEOUT_MS=30000
AI_MAX_TOKENS=500

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 1.5 TypeScript 类型定义

**创建:** `types/prompt-lab.ts`

```typescript
// types/prompt-lab.ts
export interface PromptLabProgress {
  id: string
  user_id: string
  lab_number: number
  exercise_id: string
  prompt_submitted: string
  llm_response: string
  success: boolean
  attempts: number
  completed_at: string | null
  created_at: string
}

export interface RunPromptRequest {
  prompt: string
  labNumber: number
  exerciseId: string
}

export interface RunPromptResult {
  success: boolean
  error?: string
  output?: string
  passed?: boolean
  feedback?: string
  latencyMs?: number
}

export interface SuccessCriteria {
  exerciseId: string
  rules: SuccessRule[]
  passingScore: number
}

export interface SuccessRule {
  type: 'containsKeywords' | 'minLength' | 'maxLength' | 'format' | 'sentiment'
  value: any
}

export interface LabMetadata {
  id: number
  title: string
  description: string
  estimatedMinutes: number
  exerciseCount: number
}
```

### 1.6 测试迁移

**验证检查列表:**

- [ ] `npm install` 成功，无旧依赖冲突
- [ ] `supabase migration up` 成功执行
- [ ] `prompt_lab_progress` 表创建成功
- [ ] RLS 策略正常工作
- [ ] 开发服务器 `npm run dev` 启动成功
- [ ] 现有功能（登录、Dashboard）仍然正常

**完成标志:** 基础设施就绪，无 breaking changes，旧功能仍可运行。

---

## 🔧 Phase 2: 核心组件开发 (Week 2)

### 目标
构建新系统的核心 UI 组件和 Server Actions。

### 2.1 PromptEditor 组件

**创建:** `components/features/prompt-lab/PromptEditor.tsx`

```typescript
'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export interface PromptEditorProps {
  exerciseId: string
  mode: 'readonly' | 'editable' | 'blank'
  initialValue?: string
  placeholder?: string
  maxLength?: number
  showCharCount?: boolean
  onSubmit?: (prompt: string) => Promise<void>
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
    if (!prompt.trim() || !onSubmit) return

    setIsSubmitting(true)
    try {
      await onSubmit(prompt)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="prompt-editor my-4 p-4 border rounded-lg bg-white">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={mode === 'readonly' || isSubmitting}
        className="w-full min-h-[120px] p-3 border rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        rows={4}
      />

      <div className="mt-2 flex items-center justify-between">
        {showCharCount && (
          <div className="text-sm text-gray-500">
            {prompt.length} / {maxLength} 字符
          </div>
        )}

        {mode !== 'readonly' && (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !prompt.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSubmitting ? '运行中...' : '运行 Prompt'}
          </button>
        )}
      </div>
    </div>
  )
}
```

### 2.2 LLMOutputDisplay 组件

**创建:** `components/features/prompt-lab/LLMOutputDisplay.tsx`

```typescript
'use client'

import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

export interface LLMOutputProps {
  mode: 'static' | 'live'
  content?: string
  loading?: boolean
  error?: string | null
  success?: boolean | null
  feedback?: string
  showTokenCount?: boolean
}

export function LLMOutputDisplay({
  mode,
  content = '',
  loading = false,
  error = null,
  success = null,
  feedback,
  showTokenCount = false
}: LLMOutputProps) {
  return (
    <div className="llm-output my-4">
      {/* Main Output */}
      <div className="border rounded-lg p-4 bg-gray-50 min-h-[120px]">
        {loading && (
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>AI 正在思考...</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <span>❌ 出错了: {error}</span>
          </div>
        )}

        {content && !loading && !error && (
          <div className="whitespace-pre-wrap text-gray-800">
            {content}
          </div>
        )}

        {!content && !loading && !error && (
          <div className="text-gray-400 italic">
            运行 prompt 后，AI 的输出会显示在这里
          </div>
        )}
      </div>

      {/* Success Feedback */}
      {success !== null && (
        <div
          className={`mt-3 p-3 rounded-lg flex items-start gap-2 ${
            success
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {success ? (
            <>
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <strong>太棒了!</strong> 你的 prompt 达到了目标!
              </div>
            </>
          ) : (
            <>
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <strong>再试试:</strong> {feedback || '输出还不太符合要求,尝试调整你的 prompt'}
              </div>
            </>
          )}
        </div>
      )}

      {/* Token Count (Optional) */}
      {showTokenCount && content && (
        <div className="text-xs text-gray-500 mt-2">
          约 {Math.ceil(content.length / 4)} tokens
        </div>
      )}
    </div>
  )
}
```

### 2.3 Server Action: runPrompt()

**创建:** `lib/actions/prompt-lab.ts`

```typescript
'use server'

import { createServerClient } from '@/lib/supabase-server'
import { checkRateLimit } from '@/lib/rate-limit'
import { checkExerciseSuccess } from '@/lib/prompt-lab/success-checker'
import OpenAI from 'openai'
import type { RunPromptRequest, RunPromptResult } from '@/types/prompt-lab'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function runPrompt(
  request: RunPromptRequest
): Promise<RunPromptResult> {
  const supabase = createServerClient()

  // 1. Get current user
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: 'Not authenticated' }
  }

  // 2. Validate input
  if (!request.prompt || request.prompt.length < 10) {
    return { success: false, error: 'Prompt 太短,至少 10 个字符' }
  }

  if (request.prompt.length > 1000) {
    return { success: false, error: 'Prompt 太长,最多 1000 个字符' }
  }

  // 3. Rate limit check
  const allowed = await checkRateLimit(user.id, 'prompt_lab', 30, 60)
  if (!allowed) {
    return { success: false, error: '操作太频繁,请稍后再试 (每小时最多 30 次)' }
  }

  // 4. Call GPT-4o
  const startTime = Date.now()
  let llmResponse: string

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.AI_MODEL || 'gpt-4o',
      messages: [{ role: 'user', content: request.prompt }],
      max_tokens: parseInt(process.env.AI_MAX_TOKENS || '500'),
      temperature: 0.7,
      timeout: parseInt(process.env.AI_TIMEOUT_MS || '30000')
    })

    llmResponse = completion.choices[0].message.content || ''
  } catch (error) {
    console.error('[runPrompt] OpenAI API error:', error)
    return { success: false, error: 'AI 服务暂时不可用,请稍后再试' }
  }

  const latencyMs = Date.now() - startTime

  // 5. Check success criteria
  const successCheck = await checkExerciseSuccess(
    request.exerciseId,
    llmResponse
  )

  // 6. Get existing attempts count
  const { data: existing } = await supabase
    .from('prompt_lab_progress')
    .select('attempts')
    .eq('user_id', user.id)
    .eq('lab_number', request.labNumber)
    .eq('exercise_id', request.exerciseId)
    .single()

  const newAttempts = (existing?.attempts || 0) + 1

  // 7. Persist submission
  await supabase.from('prompt_lab_progress').upsert({
    user_id: user.id,
    lab_number: request.labNumber,
    exercise_id: request.exerciseId,
    prompt_submitted: request.prompt,
    llm_response: llmResponse,
    success: successCheck.success,
    attempts: newAttempts,
    completed_at: successCheck.success ? new Date().toISOString() : null
  })

  // 8. Log usage
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

### 2.4 Success Criteria Checker

**创建:** `lib/prompt-lab/success-checker.ts`

```typescript
import type { SuccessCriteria, SuccessRule } from '@/types/prompt-lab'

// 练习成功标准配置
const exerciseCriteria: Record<string, SuccessCriteria> = {
  'lab1-ex1': {
    exerciseId: 'lab1-ex1',
    rules: [
      { type: 'containsKeywords', value: ['习性', '行为', '特点', '喜欢'] },
      { type: 'minLength', value: 50 }
    ],
    passingScore: 2
  },
  'lab1-ex2': {
    exerciseId: 'lab1-ex2',
    rules: [
      { type: 'containsKeywords', value: ['故事', '冒险'] },
      { type: 'minLength', value: 100 }
    ],
    passingScore: 2
  }
  // ... more exercises defined in Phase 3
}

export async function checkExerciseSuccess(
  exerciseId: string,
  llmOutput: string
): Promise<{ success: boolean; feedback: string }> {
  const criteria = exerciseCriteria[exerciseId]

  // No criteria = always pass (used for demo exercises)
  if (!criteria) {
    return { success: true, feedback: '' }
  }

  let passedRules = 0
  const failedRules: string[] = []

  for (const rule of criteria.rules) {
    const passed = checkRule(rule, llmOutput)
    if (passed) {
      passedRules++
    } else {
      failedRules.push(getRuleFeedback(rule))
    }
  }

  const success = passedRules >= criteria.passingScore

  let feedback = ''
  if (!success) {
    feedback = failedRules[0] || '输出还不太符合要求。提示: 试着让 AI 更聚焦在具体方面。'
  }

  return { success, feedback }
}

function checkRule(rule: SuccessRule, output: string): boolean {
  switch (rule.type) {
    case 'containsKeywords':
      const keywords = rule.value as string[]
      return keywords.some((kw) => output.includes(kw))

    case 'minLength':
      return output.length >= (rule.value as number)

    case 'maxLength':
      return output.length <= (rule.value as number)

    case 'format':
      // TODO: implement format checking (e.g., JSON, markdown)
      return true

    case 'sentiment':
      // TODO: implement sentiment analysis (后期可用 LLM 判断)
      return true

    default:
      return false
  }
}

function getRuleFeedback(rule: SuccessRule): string {
  switch (rule.type) {
    case 'containsKeywords':
      return `输出中缺少关键词。试着在 prompt 中要求包含: ${(rule.value as string[]).join('、')}`

    case 'minLength':
      return `输出太短了。试着让 AI 提供更详细的回答。`

    case 'maxLength':
      return `输出太长了。试着让 AI 更简洁。`

    default:
      return '输出不符合要求。'
  }
}
```

### 2.5 Rate Limit Helper (复用)

**确认存在:** `lib/rate-limit.ts`

如不存在,创建:

```typescript
import { createServerClient } from '@/lib/supabase-server'

export async function checkRateLimit(
  userId: string,
  action: string,
  limit: number,
  windowMinutes: number
): Promise<boolean> {
  const supabase = createServerClient()
  const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000)

  const { count } = await supabase
    .from('ai_usage_log')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('action', action)
    .gte('created_at', windowStart.toISOString())

  return (count || 0) < limit
}
```

### 2.6 测试核心组件

**创建测试页面:** `app/dashboard/test-prompt/page.tsx`

```typescript
'use client'

import { useState } from 'react'
import { PromptEditor } from '@/components/features/prompt-lab/PromptEditor'
import { LLMOutputDisplay } from '@/components/features/prompt-lab/LLMOutputDisplay'
import { runPrompt } from '@/lib/actions/prompt-lab'

export default function TestPromptPage() {
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<boolean | null>(null)
  const [feedback, setFeedback] = useState('')

  const handleSubmit = async (prompt: string) => {
    setLoading(true)
    setSuccess(null)

    const result = await runPrompt({
      prompt,
      labNumber: 1,
      exerciseId: 'lab1-ex1'
    })

    if (result.success && result.output) {
      setOutput(result.output)
      setSuccess(result.passed || false)
      setFeedback(result.feedback || '')
    }

    setLoading(false)
  }

  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Prompt Lab 组件测试</h1>

      <PromptEditor
        exerciseId="lab1-ex1"
        mode="editable"
        initialValue="告诉我关于猫的习性"
        onSubmit={handleSubmit}
      />

      <LLMOutputDisplay
        mode="live"
        content={output}
        loading={loading}
        success={success}
        feedback={feedback}
        showTokenCount
      />
    </div>
  )
}
```

**验证检查列表:**

- [ ] PromptEditor 渲染正常
- [ ] 点击"运行"调用 server action
- [ ] LLM API 返回输出
- [ ] 成功检查逻辑正常工作
- [ ] 数据保存到 `prompt_lab_progress` 表
- [ ] Rate limiting 正常工作

**完成标志:** 核心组件完整可用,能运行完整的 prompt → output → check 流程。

---

## 📝 Phase 3: Lab 内容集成 (Week 3)

### 目标
创建 MDX Lab 内容,集成组件,实现完整的学习体验。

### 3.1 创建 Lab 路由结构

**文件结构:**

```
app/dashboard/vibecoding/
├── page.tsx                    # Lab 列表页 (复用现有,改数据源)
└── labs/
    ├── [labId]/
    │   └── page.tsx            # 动态 Lab 内容页
    └── _components/
        └── LabWrapper.tsx      # Lab 页面包装器
```

**创建:** `app/dashboard/vibecoding/labs/[labId]/page.tsx`

```typescript
import { MDXRemote } from 'next-mdx-remote/rsc'
import { PromptEditor } from '@/components/features/prompt-lab/PromptEditor'
import { LLMOutputDisplay } from '@/components/features/prompt-lab/LLMOutputDisplay'
import { getLabContent } from '@/lib/lab-content'
import { notFound } from 'next/navigation'

const components = {
  PromptEditor,
  LLMOutputDisplay
}

export default async function LabPage({ params }: { params: { labId: string } }) {
  const labContent = await getLabContent(params.labId)

  if (!labContent) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <MDXRemote source={labContent.mdx} components={components} />
    </div>
  )
}

export async function generateStaticParams() {
  return [
    { labId: 'lab1' },
    { labId: 'lab2' },
    { labId: 'lab3' },
    { labId: 'lab4' },
    { labId: 'lab5' }
  ]
}
```

### 3.2 Lab Content Loader

**创建:** `lib/lab-content.ts`

```typescript
import fs from 'fs/promises'
import path from 'path'

export interface LabContent {
  id: string
  mdx: string
  metadata: {
    title: string
    description: string
    estimatedMinutes: number
  }
}

export async function getLabContent(labId: string): Promise<LabContent | null> {
  const labsDir = path.join(process.cwd(), 'content', 'labs')
  const filePath = path.join(labsDir, `${labId}.mdx`)

  try {
    const source = await fs.readFile(filePath, 'utf8')

    // 简单的 metadata 提取（可后续改进）
    const titleMatch = source.match(/^# (.+)$/m)
    const title = titleMatch ? titleMatch[1] : labId

    return {
      id: labId,
      mdx: source,
      metadata: {
        title,
        description: '', // TODO: 从 MDX frontmatter 提取
        estimatedMinutes: 15
      }
    }
  } catch (error) {
    console.error(`Failed to load lab content: ${labId}`, error)
    return null
  }
}
```

### 3.3 创建 Lab 1-2 MDX 内容

**创建目录:**

```bash
mkdir -p content/labs
```

**创建:** `content/labs/lab1.mdx`

```mdx
# Lab 1: 什么是 Prompt

## 📖 学习目标

- 理解什么是 prompt
- 学会写基本的指令
- 了解 LLM 如何理解输入

## 🎯 核心概念

**Prompt** 就是你对 AI 说的话。

就像你问朋友问题一样，你对 AI 说什么，它就会根据你说的话来回答。

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

看到了吗？我们给 AI 一个简单的指令，它就给出了关于猫的介绍。

但是，这个回答有点太宽泛了。如果我们想要更具体的信息呢？

## ✏️ 动手练习

### 练习 1: 让回答更具体

**任务**: 修改下面的 prompt，让 AI 的回答更具体，比如只介绍**猫的习性**。

<PromptEditor
  exerciseId="lab1-ex1"
  mode="editable"
  initialValue="告诉我关于猫的事情"
/>

<LLMOutputDisplay mode="live" />

**目标**: 输出应该专注于猫的习性，而不是泛泛而谈。

**提示**:
- 试着在 prompt 中明确说明你想了解"猫的习性"
- 你可以说"请介绍猫的习性"或"猫有什么行为特点"

### 练习 2: 让 AI 讲故事

**任务**: 从零开始写一个 prompt，让 AI 写一个关于猫冒险的小故事。

<PromptEditor
  exerciseId="lab1-ex2"
  mode="blank"
  placeholder="在这里写你的 prompt..."
/>

<LLMOutputDisplay mode="live" />

**成功标准**:
- ✅ 输出包含"故事"和"冒险"相关内容
- ✅ 至少 100 个字

**提示**: 试着说"写一个关于...的故事"

## 📝 总结

恭喜你完成 Lab 1！你学会了：

- ✅ Prompt 越具体，AI 的回答越准确
- ✅ 明确说明你想要什么内容
- ✅ 不同的 prompt 会得到不同的输出

**下一步**: Lab 2 - 学习如何给清晰的指令，避免歧义！
```

**创建:** `content/labs/lab2.mdx`

```mdx
# Lab 2: 如何给清晰指令

## 📖 学习目标

- 理解清晰表达的重要性
- 学会避免模糊的 prompt
- 掌握添加约束条件的技巧

## 🎯 核心概念

**清晰 > 模糊**

AI 不会读心术。如果你的 prompt 模糊不清，AI 只能猜你想要什么。

**对比:**

### ❌ 模糊的 prompt

<PromptEditor
  exerciseId="lab2-demo-bad"
  mode="readonly"
  initialValue="写点东西"
/>

<LLMOutputDisplay
  mode="static"
  content="这是一些文字。我不太确定你想要什么内容，所以我写了一些通用的东西..."
/>

### ✅ 清晰的 prompt

<PromptEditor
  exerciseId="lab2-demo-good"
  mode="readonly"
  initialValue="写一段 50 字左右的文字，介绍为什么运动对健康有益。使用简单易懂的语言。"
/>

<LLMOutputDisplay
  mode="static"
  content="运动可以让身体更强壮，心脏更健康。经常运动的人不容易生病，精神也会更好。每天运动 30 分钟，比如跑步、游泳或打球，都能让你变得更健康、更快乐。"
/>

看到区别了吗？清晰的 prompt 包含：
- ✅ 明确的任务（"介绍为什么..."）
- ✅ 具体的要求（"50 字左右"）
- ✅ 风格指导（"简单易懂"）

## ✏️ 动手练习

### 练习 1: 改进模糊的 prompt

下面这个 prompt 太模糊了。修改它，让 AI 给出更有用的回答。

<PromptEditor
  exerciseId="lab2-ex1"
  mode="editable"
  initialValue="介绍一下编程"
/>

<LLMOutputDisplay mode="live" />

**提示**:
- 想要什么角度的介绍？（适合初学者？还是深入技术？）
- 想要多长的回答？
- 想要什么语气？（正式？轻松？）

### 练习 2: 添加约束条件

让 AI 用三个要点列举健康饮食的好处。

<PromptEditor
  exerciseId="lab2-ex2"
  mode="editable"
  initialValue="说说健康饮食的好处"
/>

<LLMOutputDisplay mode="live" />

**成功标准**:
- ✅ 输出包含 3 个要点
- ✅ 格式清晰（使用列表或编号）

**提示**: 在 prompt 中明确说"用三个要点"或"列举三个"

### 🎓 挑战题: 获得 JSON 格式输出

这是一个高级练习！写一个 prompt，让 AI 返回 JSON 格式的书籍信息。

**要求:**
- 书名: "西游记"
- 字段: title, author, year, genre

<PromptEditor
  exerciseId="lab2-ex3"
  mode="blank"
  placeholder="写一个 prompt 让 AI 返回 JSON 格式..."
/>

<LLMOutputDisplay mode="live" showTokenCount />

**提示**: 试着说"用 JSON 格式"或"返回一个包含...字段的 JSON 对象"

## 📝 总结

你学会了：

- ✅ 具体明确 > 模糊笼统
- ✅ 添加约束条件（长度、格式、风格）
- ✅ 清晰的 prompt = 有用的输出

**下一步**: Lab 3 - 角色扮演技巧
```

### 3.4 更新 Lab 列表数据源

**修改:** `app/dashboard/vibecoding/page.tsx`

更新 Lab 列表数据为新的 5 个 Labs:

```typescript
const labs = [
  {
    id: 1,
    title: 'Lab 1: 什么是 Prompt',
    description: '理解 prompt 基础，学会写基本指令',
    estimatedMinutes: 15,
    path: '/dashboard/vibecoding/labs/lab1'
  },
  {
    id: 2,
    title: 'Lab 2: 如何给清晰指令',
    description: '学习具体表达，避免歧义',
    estimatedMinutes: 20,
    path: '/dashboard/vibecoding/labs/lab2'
  },
  {
    id: 3,
    title: 'Lab 3: 角色扮演技巧',
    description: '让 AI 扮演不同角色，获得不同风格的输出',
    estimatedMinutes: 20,
    path: '/dashboard/vibecoding/labs/lab3'
  },
  {
    id: 4,
    title: 'Lab 4: 引导思考',
    description: '使用 Chain-of-thought，让 AI 分步推理',
    estimatedMinutes: 25,
    path: '/dashboard/vibecoding/labs/lab4'
  },
  {
    id: 5,
    title: 'Lab 5: 综合应用挑战',
    description: '综合运用所有技巧，完成实际场景',
    estimatedMinutes: 30,
    path: '/dashboard/vibecoding/labs/lab5'
  }
]
```

### 3.5 更新 Coach 上下文

**修改:** `lib/coach.ts` (如果存在) 或相关文件

```typescript
function getCoachSystemPrompt(context: string): string {
  if (context === 'PromptLab' || context === 'Code') {
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
- 每次回答控制在 2-3 句话

例子:
学生: "我的 prompt 怎么不行？"
你: "试着更具体一些！比如你想要什么主题的内容？想要多长的回答？告诉 AI 你的具体需求会更有帮助哦 😊"`
  }

  // ... other contexts
}
```

### 3.6 测试完整流程

**验证检查列表:**

- [ ] 访问 `/dashboard/vibecoding` 看到 5 个 Labs
- [ ] 点击 Lab 1，MDX 内容正确渲染
- [ ] PromptEditor 嵌入组件正常工作
- [ ] 运行 prompt，获得 LLM 输出
- [ ] 成功检查反馈正确显示
- [ ] 进度保存到数据库
- [ ] Lab 2 正常访问和工作

**完成标志:** Lab 1-2 完整可用，学生可以完整体验学习流程。

---

## 🎯 Phase 4: 完善和测试 (Week 4)

### 目标
完成剩余 Labs，优化体验，准备上线。

### 4.1 创建 Lab 3-5 内容

**快速创建:**

```bash
touch content/labs/lab3.mdx  # 角色扮演
touch content/labs/lab4.mdx  # 引导思考
touch content/labs/lab5.mdx  # 综合应用
```

**参考结构**（内容由 PM 或内容团队提供）:

- Lab 3: 学习 system prompt 和角色设定
- Lab 4: Chain-of-thought prompting
- Lab 5: 综合应用（多个实际场景）

### 4.2 成功标准完善

**更新:** `lib/prompt-lab/success-checker.ts`

添加 Lab 3-5 的成功标准配置。

### 4.3 Landing Page 更新

**修改:** `app/page.tsx` 或相关营销页面

- 更新标题: "LLM Learning Lab - 初中生 Prompt Engineering 教学平台"
- 更新描述: "2 小时学会与 AI 对话"
- 更新特性介绍
- 更新 CTA 按钮

### 4.4 清理旧代码

**移除不再使用的文件/组件:**

```bash
# 备份后删除（或移动到 .archive/）
# - WebContainer 相关组件
# - Sandpack 相关组件
# - AI Agent orchestration (function calling)
```

**注意:** 先确保新系统完全工作后再删除旧代码。

### 4.5 性能优化

- Code-split `PromptEditor` 和 `LLMOutputDisplay` (lazy load)
- 预编译 MDX (build time)
- 优化图片资源
- 添加 Loading Skeleton

### 4.6 测试

**功能测试清单:**

- [ ] 所有 5 个 Labs 可访问
- [ ] 所有练习的成功检查正常
- [ ] Rate limiting 正常工作
- [ ] Coach 功能正常
- [ ] 进度追踪正确
- [ ] 移动端响应式布局正常

**性能测试:**

- [ ] Landing page < 1.5s (Vercel Analytics)
- [ ] Lab 页面加载 < 1s
- [ ] Prompt 提交 → 输出 < 3s

### 4.7 部署

```bash
# 1. 数据库迁移（生产环境）
supabase migration up --project-ref <prod-ref>

# 2. 环境变量检查
# 确保生产环境的 OPENAI_API_KEY 等已设置

# 3. 部署到 Vercel
git push origin main  # 自动触发 Vercel 部署

# 4. 验证生产环境
# - 测试登录
# - 测试一个完整 Lab 流程
# - 检查数据库写入
```

**完成标志:** 全部 5 个 Labs 上线，系统稳定运行。

---

## 📊 验收标准

### 功能完整性

- ✅ 5 个 Labs 全部可用
- ✅ Prompt 提交 → LLM 输出 → 成功检查 完整流程
- ✅ 进度追踪正常
- ✅ Coach 辅导功能正常
- ✅ Rate limiting 正常

### 数据完整性

- ✅ `prompt_lab_progress` 表数据正确写入
- ✅ 旧表 `webcontainer_projects` 可选择性保留或删除
- ✅ RLS 策略正常工作

### 性能指标

- ✅ Landing page < 1.5s
- ✅ Lab 页面加载 < 1s
- ✅ API 响应 < 3s
- ✅ 移动端可用

### 成本控制

- ✅ GPT-4o 成本符合预期 (~$0.14/student)
- ✅ Rate limit 防止滥用

---

## 🚨 风险和应对

### Risk 1: MDX 渲染性能问题

**Mitigation**:
- 使用 `next-mdx-remote/rsc` (服务端渲染)
- 预编译 MDX 在 build time
- 监控 LCP (Largest Contentful Paint)

### Risk 2: LLM API 不稳定

**Mitigation**:
- 添加 retry 逻辑 (最多 3 次)
- Timeout 设置 30s
- 显示友好错误信息
- 考虑添加 fallback cache (Phase 2)

### Risk 3: 成功检查规则不准确

**Mitigation**:
- Phase 1-2 使用简单规则
- 收集数据后优化
- 考虑 Phase 2 使用 LLM 判断

### Risk 4: 学生觉得太难/太简单

**Mitigation**:
- Beta 测试 10-20 个初中生
- 收集反馈调整难度
- 添加可选的"提示"按钮

---

## 📅 时间线总结

| Phase | 时间 | 里程碑 |
|-------|-----|--------|
| **Phase 1** | Week 1 | 基础设施就绪，数据库迁移完成 |
| **Phase 2** | Week 2 | 核心组件可用，完整流程可测试 |
| **Phase 3** | Week 3 | Lab 1-2 上线，学生可体验 |
| **Phase 4** | Week 4 | 全部 5 Labs 上线，生产环境稳定 |

**总时长**: 4 周
**Buffer**: 建议预留 1 周用于测试和优化

---

## 🛠️ 开发者注意事项

### 关键原则

1. **保持简单**: 不要过度设计，先实现核心功能
2. **复用优先**: 能复用现有代码就不要重写
3. **渐进式**: 一个 Phase 一个 Phase 来，不要跳跃
4. **测试驱动**: 每个 Phase 结束都要验证功能

### 推荐工作流

```bash
# 1. 创建 feature branch
git checkout -b refactor/phase-1

# 2. 完成 Phase 1 所有任务
# ...

# 3. 测试验证
npm run dev
# 手动测试所有功能点

# 4. Commit and push
git add .
git commit -m "refactor: Phase 1 - Infrastructure migration"
git push origin refactor/phase-1

# 5. Create PR, review, merge
# 6. Deploy to staging, verify
# 7. Repeat for Phase 2-4
```

### 关键文件清单

**Phase 1:**
- `supabase/migrations/20251016_prompt_lab.sql`
- `package.json`
- `next.config.mjs`
- `types/prompt-lab.ts`

**Phase 2:**
- `components/features/prompt-lab/PromptEditor.tsx`
- `components/features/prompt-lab/LLMOutputDisplay.tsx`
- `lib/actions/prompt-lab.ts`
- `lib/prompt-lab/success-checker.ts`

**Phase 3:**
- `app/dashboard/vibecoding/labs/[labId]/page.tsx`
- `content/labs/lab1.mdx`
- `content/labs/lab2.mdx`
- `lib/lab-content.ts`

**Phase 4:**
- `content/labs/lab3-5.mdx`
- Landing page 更新
- 性能优化

---

## 📚 参考资料

- [PRD](./docs/prd/llm-learning-lab-prd.md) - 产品需求文档
- [Full-Stack Architecture](./docs/architecture/full-stack-architecture.md) - 新架构文档
- [next-mdx-remote 文档](https://github.com/hashicorp/next-mdx-remote)
- [OpenAI API 文档](https://platform.openai.com/docs/api-reference)
- [Supabase 文档](https://supabase.com/docs)

---

**Document Version**: 1.0
**Created**: 2025-10-16
**Author**: Winston (Architect)
**Status**: ✅ Ready for Implementation
