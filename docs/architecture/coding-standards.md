# Coding Standards - LLM Learning Lab

## TypeScript Standards

### Strict Mode
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### Type Definitions
- Always define explicit types for function parameters and return values
- Use interfaces over types for object shapes
- Export types from `types/` directory

**Good:**
```typescript
interface PromptLabProgress {
  id: string
  userId: string
  success: boolean
}

export async function runPrompt(
  request: RunPromptRequest
): Promise<RunPromptResult> {
  // ...
}
```

**Avoid:**
```typescript
// ❌ Any types
function runPrompt(request: any): any {
  // ...
}
```

---

## React & Next.js Standards

### Server Components by Default
- Use Server Components unless client interactivity is needed
- Mark client components with `'use client'` directive
- Keep client components small and focused

**Server Component:**
```typescript
// app/dashboard/vibecoding/labs/[labId]/page.tsx
export default async function LabPage({ params }: { params: { labId: string } }) {
  const content = await getLabContent(params.labId)
  return <MDXRemote source={content.mdx} />
}
```

**Client Component:**
```typescript
// components/features/prompt-lab/PromptEditor.tsx
'use client'

export function PromptEditor({ onSubmit }: Props) {
  const [prompt, setPrompt] = useState('')
  // ... interactive logic
}
```

### Server Actions
- Always mark with `'use server'`
- Validate input with Zod
- Handle errors gracefully
- Return structured results

```typescript
'use server'

import { z } from 'zod'

const PromptSchema = z.object({
  prompt: z.string().min(10).max(1000),
  labNumber: z.number().int().min(1).max(5)
})

export async function runPrompt(request: unknown) {
  // 1. Validate
  const validatedRequest = PromptSchema.parse(request)

  // 2. Execute
  try {
    // ... logic
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
```

---

## Component Organization

### File Structure
```typescript
// components/features/prompt-lab/PromptEditor.tsx

// 1. Imports
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

// 2. Types
export interface PromptEditorProps {
  exerciseId: string
  mode: 'readonly' | 'editable'
  onSubmit?: (prompt: string) => Promise<void>
}

// 3. Component
export function PromptEditor({
  exerciseId,
  mode,
  onSubmit
}: PromptEditorProps) {
  // ... implementation
}

// 4. Sub-components (if needed)
function EditorToolbar() {
  // ...
}
```

### Naming Conventions
- **Components**: PascalCase (`PromptEditor`, `LLMOutputDisplay`)
- **Files**: PascalCase for components (`PromptEditor.tsx`)
- **Hooks**: camelCase with `use` prefix (`usePromptSubmit`)
- **Server Actions**: camelCase (`runPrompt`, `askCoach`)
- **Types**: PascalCase interfaces (`PromptLabProgress`)

---

## Tailwind CSS Standards

### Use Utility Classes
```tsx
// ✅ Good
<div className="flex items-center gap-2 p-4 bg-white rounded-lg">

// ❌ Avoid inline styles
<div style={{ display: 'flex', padding: '16px' }}>
```

### Responsive Design
```tsx
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* Mobile full width, tablet half, desktop third */}
</div>
```

### Use Theme Variables
```tsx
<div className="bg-primary text-primary-foreground">
  {/* Uses theme colors from Tailwind config */}
</div>
```

---

## Error Handling

### Server Actions
```typescript
export async function runPrompt(request: RunPromptRequest) {
  try {
    // Attempt operation
    const result = await openai.chat.completions.create(...)
    return { success: true, output: result }
  } catch (error) {
    console.error('[runPrompt] Error:', error)

    // User-friendly error message
    return {
      success: false,
      error: 'AI 服务暂时不可用,请稍后再试'
    }
  }
}
```

### Client Components
```tsx
export function PromptEditor({ onSubmit }: Props) {
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    setError(null)
    try {
      await onSubmit(prompt)
    } catch (err) {
      setError('提交失败,请重试')
    }
  }

  return (
    <>
      {error && <div className="text-red-600">{error}</div>}
      {/* ... */}
    </>
  )
}
```

---

## Database Queries

### Use Supabase Client Correctly
```typescript
// ❌ Bad - Client-side query without RLS
const { data } = await supabase.from('prompt_lab_progress').select('*')

// ✅ Good - Filter by user
const { data } = await supabase
  .from('prompt_lab_progress')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false })
```

### Server-Side Queries
```typescript
// lib/actions/prompt-lab.ts
'use server'

import { createServerClient } from '@/lib/supabase-server'

export async function getProgress() {
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const { data, error } = await supabase
    .from('prompt_lab_progress')
    .select('*')
    .eq('user_id', user.id)

  return { data, error }
}
```

---

## Input Validation

### Always Validate User Input
```typescript
import { z } from 'zod'

const PromptLabSchema = z.object({
  prompt: z.string().min(10).max(1000),
  labNumber: z.number().int().min(1).max(5),
  exerciseId: z.string().regex(/^lab\d+-ex\d+$/)
})

// In server action
export async function runPrompt(request: unknown) {
  const validated = PromptLabSchema.safeParse(request)

  if (!validated.success) {
    return {
      success: false,
      error: 'Invalid input: ' + validated.error.message
    }
  }

  // Use validated.data
}
```

---

## Performance Best Practices

### Code Splitting
```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic'

const PromptEditor = dynamic(
  () => import('@/components/features/prompt-lab/PromptEditor'),
  { ssr: false }
)
```

### Memo Expensive Computations
```typescript
import { useMemo } from 'react'

function LabProgress({ exercises }) {
  const completionRate = useMemo(() => {
    const completed = exercises.filter(e => e.success).length
    return (completed / exercises.length) * 100
  }, [exercises])

  return <div>{completionRate}% complete</div>
}
```

### Debounce User Input
```typescript
import { useDebounce } from '@/lib/hooks/useDebounce'

function PromptEditor() {
  const [prompt, setPrompt] = useState('')
  const debouncedPrompt = useDebounce(prompt, 500)

  // Only trigger expensive operations with debounced value
  useEffect(() => {
    // Auto-save or validation
  }, [debouncedPrompt])
}
```

---

## Testing (Phase 2)

### Unit Tests
```typescript
// lib/prompt-lab/success-checker.test.ts
import { describe, it, expect } from 'vitest'
import { checkExerciseSuccess } from './success-checker'

describe('checkExerciseSuccess', () => {
  it('should pass when keywords are present', async () => {
    const result = await checkExerciseSuccess(
      'lab1-ex1',
      '猫的习性包括独立、喜欢晒太阳...'
    )

    expect(result.success).toBe(true)
  })

  it('should fail when output is too short', async () => {
    const result = await checkExerciseSuccess(
      'lab1-ex1',
      '猫很可爱'
    )

    expect(result.success).toBe(false)
    expect(result.feedback).toContain('太短')
  })
})
```

---

## Git Commit Conventions

### Format
```
type(scope): message

type: feat, fix, refactor, docs, style, test, chore
scope: prompt-lab, coach, auth, db, etc.
```

### Examples
```bash
feat(prompt-lab): add PromptEditor component
fix(auth): resolve rate limit bypass issue
refactor(db): migrate to prompt_lab_progress table
docs(architecture): update data model documentation
```

---

## Code Comments

### When to Comment
- ✅ Complex business logic
- ✅ Non-obvious workarounds
- ✅ API integrations
- ❌ Self-explanatory code

**Good:**
```typescript
// GPT-4o returns inconsistent formatting for structured outputs
// We normalize by stripping extra whitespace before parsing
const normalized = response.trim().replace(/\s+/g, ' ')
```

**Unnecessary:**
```typescript
// Increment counter
counter += 1
```

### Function Documentation
```typescript
/**
 * Execute a student's prompt and check success criteria
 *
 * @param request - Prompt submission details
 * @returns Result with LLM output and success status
 *
 * @throws Error if user is not authenticated
 *
 * Rate limited to 30 calls/hour per user
 */
export async function runPrompt(request: RunPromptRequest) {
  // ...
}
```

---

## Security Checklist

### Server Actions
- [ ] Authenticate user before DB access
- [ ] Validate all inputs with Zod
- [ ] Use RLS policies on Supabase
- [ ] Never expose service keys
- [ ] Rate limit expensive operations

### Client Code
- [ ] Sanitize user input before display
- [ ] Escape LLM output to prevent XSS
- [ ] Never store sensitive data in localStorage
- [ ] Use HTTPS only

---

## Accessibility

### Semantic HTML
```tsx
// ✅ Good
<button onClick={handleSubmit}>Submit</button>

// ❌ Avoid
<div onClick={handleSubmit}>Submit</div>
```

### ARIA Labels
```tsx
<button
  onClick={handleSubmit}
  aria-label="运行 Prompt"
  aria-busy={isSubmitting}
>
  {isSubmitting ? '运行中...' : '运行'}
</button>
```

### Keyboard Navigation
```tsx
<textarea
  value={prompt}
  onChange={(e) => setPrompt(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit()
    }
  }}
/>
```

---

## Environment Variables

### Naming
- **Public**: `NEXT_PUBLIC_*` (exposed to browser)
- **Private**: No prefix (server-only)

### Organization
```bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJyyy...  # Server-only

# AI
AI_PROVIDER=openai
OPENAI_API_KEY=sk-xxx...  # Server-only
AI_MODEL=gpt-4o
```

### Never Commit
- Add `.env.local` to `.gitignore`
- Use `.env.example` for template
- Store secrets in Vercel Dashboard

---

**Last Updated**: 2025-10-16
**Status**: Active
