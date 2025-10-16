# Data Model & Service Contracts - LLM Learning Lab

## 1. Database Overview

### Platform
- **Database**: Supabase (PostgreSQL 15+)
- **Features**: Row Level Security (RLS), Realtime (未使用), Storage
- **Client**: @supabase/ssr

---

## 2. Core Tables

### 2.1 prompt_lab_progress ✨ NEW

**Purpose**: Track student prompt exercise submissions and progress

```sql
CREATE TABLE prompt_lab_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lab_number SMALLINT NOT NULL CHECK (lab_number BETWEEN 1 AND 5),
  exercise_id TEXT NOT NULL, -- e.g., "lab1-ex1", "lab2-ex2"

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

-- Indexes
CREATE INDEX idx_prompt_lab_user ON prompt_lab_progress(user_id, lab_number);
CREATE INDEX idx_prompt_lab_success ON prompt_lab_progress(user_id, success, created_at DESC);
```

**RLS Policies:**

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

**Example Data:**

```json
{
  "id": "uuid-xxx",
  "user_id": "user-uuid",
  "lab_number": 1,
  "exercise_id": "lab1-ex1",
  "prompt_submitted": "请介绍猫的习性",
  "llm_response": "猫是一种独立性很强的动物...",
  "success": true,
  "attempts": 2,
  "completed_at": "2025-10-16T10:30:00Z",
  "created_at": "2025-10-16T10:25:00Z"
}
```

---

### 2.2 coach_transcripts (复用)

**Purpose**: Store AI coach conversations

```sql
CREATE TABLE coach_transcripts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_number SMALLINT, -- 2 for VibeCoding/Prompt Lab
  context_tag TEXT CHECK (context_tag IN ('Code', 'PromptLab', 'Sandbox')),

  -- Conversation
  user_message TEXT NOT NULL,
  coach_response TEXT NOT NULL,

  -- Metadata
  latency_ms INTEGER,
  tone TEXT CHECK (tone IN ('coach', 'warning', 'celebration')) DEFAULT 'coach',
  status TEXT CHECK (status IN ('success', 'failure', 'timeout')) DEFAULT 'success',

  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_transcripts_user_module ON coach_transcripts(user_id, module_number, created_at DESC);
```

**Changes**:
- Updated `context_tag` to include `'PromptLab'`
- 其他保持不变

---

### 2.3 module_progress (复用)

**Purpose**: Track high-level module completion

```sql
CREATE TABLE module_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_number SMALLINT CHECK (module_number BETWEEN 0 AND 5), -- Updated constraint

  status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'not_started',
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(user_id, module_number)
);

CREATE INDEX idx_progress_user ON module_progress(user_id, updated_at DESC);
```

**Changes**:
- Updated constraint to support `module_number BETWEEN 0 AND 5`

---

### 2.4 ai_usage_log (复用)

**Purpose**: Rate limiting and usage tracking

```sql
CREATE TABLE ai_usage_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL, -- 'ai_agent', 'ai_coach', 'prompt_lab'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_usage_user_action_time ON ai_usage_log(user_id, action, created_at DESC);
```

**Changes**:
- New action type: `'prompt_lab'`

---

### 2.5 Removed Tables ❌

**After refactor, these tables are no longer used:**

```sql
-- ❌ webcontainer_projects - No longer needed (WebContainer removed)
-- ❌ sandpack_submissions - No longer needed (Sandpack removed)
```

**Migration Strategy**:
- Keep old tables for backup (don't drop immediately)
- After confirming new system works, can optionally drop:
  ```sql
  -- DROP TABLE webcontainer_projects CASCADE;
  -- DROP TABLE sandpack_submissions CASCADE;
  ```

---

## 3. Server Actions

### 3.1 runPrompt() ✨ NEW

**File**: `lib/actions/prompt-lab.ts`

**Purpose**: Execute a student's prompt and return LLM output

**Signature:**
```typescript
export async function runPrompt(request: {
  prompt: string
  labNumber: number
  exerciseId: string
}): Promise<{
  success: boolean
  error?: string
  output?: string
  passed?: boolean
  feedback?: string
  latencyMs?: number
}>
```

**Flow:**
1. Authenticate user
2. Validate input (length, format)
3. Check rate limit (30/hour)
4. Call GPT-4o API
5. Check success criteria
6. Save to `prompt_lab_progress`
7. Log to `ai_usage_log`
8. Return result

**Rate Limit**: 30 calls/hour

---

### 3.2 askCoach() (复用)

**File**: `lib/actions/coach.ts`

**Purpose**: Get AI coaching help

**Signature:**
```typescript
export async function askCoach(request: {
  userMessage: string
  context: 'Code' | 'PromptLab' | 'Sandbox'
  moduleNumber?: number
}): Promise<{
  success: boolean
  error?: string
  message?: string
  latencyMs?: number
}>
```

**Changes**:
- Updated context to include `'PromptLab'`
- Updated system prompt for Prompt Engineering coaching

**Rate Limit**: 20 calls/hour

---

### 3.3 updateModuleProgress() (复用)

**File**: `lib/actions/progress.ts`

**Purpose**: Update module-level progress

**Signature:**
```typescript
export async function updateModuleProgress(
  moduleNumber: number,
  status: 'not_started' | 'in_progress' | 'completed'
): Promise<{ success: boolean }>
```

---

### 3.4 getLabProgress() ✨ NEW

**File**: `lib/actions/prompt-lab.ts`

**Purpose**: Get user's progress for a specific lab

**Signature:**
```typescript
export async function getLabProgress(labNumber: number): Promise<{
  completed: number
  total: number
  exercises: {
    exerciseId: string
    success: boolean
    attempts: number
  }[]
}>
```

---

## 4. Data Access Patterns

### 4.1 Getting User's Lab Progress

```typescript
// Client component
const { data, error } = await supabase
  .from('prompt_lab_progress')
  .select('*')
  .eq('lab_number', 1)
  .order('created_at', { ascending: true })
```

### 4.2 Checking Exercise Completion

```typescript
// Server action
const { data } = await supabase
  .from('prompt_lab_progress')
  .select('success')
  .eq('user_id', userId)
  .eq('lab_number', labNumber)
  .eq('exercise_id', exerciseId)
  .single()

const isCompleted = data?.success || false
```

### 4.3 Rate Limit Check

```typescript
// lib/rate-limit.ts
const windowStart = new Date(Date.now() - 60 * 60 * 1000) // 1 hour

const { count } = await supabase
  .from('ai_usage_log')
  .select('*', { count: 'exact', head: true })
  .eq('user_id', userId)
  .eq('action', 'prompt_lab')
  .gte('created_at', windowStart.toISOString())

return (count || 0) < 30
```

---

## 5. Key Metrics Queries

### 5.1 Lab Completion Rate

```sql
SELECT
  lab_number,
  COUNT(DISTINCT user_id) AS total_students,
  COUNT(DISTINCT user_id) FILTER (WHERE success = true) AS completed,
  (COUNT(DISTINCT user_id) FILTER (WHERE success = true)::FLOAT /
   COUNT(DISTINCT user_id) * 100) AS completion_rate
FROM prompt_lab_progress
WHERE created_at > now() - interval '7 days'
GROUP BY lab_number
ORDER BY lab_number;
```

### 5.2 Average Attempts per Exercise

```sql
SELECT
  exercise_id,
  AVG(attempts) AS avg_attempts,
  MAX(attempts) AS max_attempts,
  COUNT(*) AS total_submissions
FROM prompt_lab_progress
WHERE created_at > now() - interval '7 days'
GROUP BY exercise_id
ORDER BY avg_attempts DESC;
```

### 5.3 AI API Usage

```sql
SELECT
  action,
  COUNT(*) AS total_calls,
  COUNT(DISTINCT user_id) AS unique_users,
  DATE(created_at) AS date
FROM ai_usage_log
WHERE created_at > now() - interval '30 days'
GROUP BY action, DATE(created_at)
ORDER BY date DESC, action;
```

### 5.4 Coach Performance

```sql
SELECT
  context_tag,
  COUNT(*) AS total_calls,
  AVG(latency_ms) AS avg_latency_ms,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY latency_ms) AS p95_latency_ms,
  (COUNT(*) FILTER (WHERE status = 'success')::FLOAT / COUNT(*) * 100) AS success_rate
FROM coach_transcripts
WHERE created_at > now() - interval '7 days'
GROUP BY context_tag;
```

---

## 6. Data Volume Estimates

### Expected Data (1000 students, 5 labs, avg 6 exercises/lab)

| Table | Rows | Avg Size/Row | Total Size |
|-------|------|--------------|------------|
| `prompt_lab_progress` | 30,000 | 1 KB | 30 MB |
| `coach_transcripts` | 20,000 | 2 KB | 40 MB |
| `module_progress` | 5,000 | 0.5 KB | 2.5 MB |
| `ai_usage_log` | 50,000 | 0.2 KB | 10 MB |
| **Total** | | | **~83 MB** |

**Conclusion**: Well within Supabase free tier (500 MB)

---

## 7. Backup & Recovery

### Automatic Backups
- Supabase: Daily automatic backups (7 days retention on free tier)
- Point-in-time recovery: Available on Pro tier

### Manual Export
```bash
# Export specific table
supabase db dump --table prompt_lab_progress > backup.sql

# Full database dump
supabase db dump > full_backup.sql
```

### Restore
```bash
supabase db reset
psql -f backup.sql
```

---

## 8. Migration Scripts

### Initial Setup

**File**: `supabase/migrations/20251016_prompt_lab.sql`

```sql
-- See refactor.md Phase 1 for full migration script
CREATE TABLE prompt_lab_progress (...);
CREATE INDEX ...;
ALTER TABLE prompt_lab_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY ...;
```

### Running Migrations

```bash
# Local development
supabase db reset

# Production
supabase migration up --project-ref <prod-ref>
```

---

## 9. Related Documentation

- [Full-Stack Architecture](./full-stack-architecture.md) - System overview
- [Refactor Plan](../refactor.md) - Migration guide
- [Tech Stack](./tech-stack.md) - Technology choices

---

**Last Updated**: 2025-10-16
**Status**: Active (Post-refactor)
