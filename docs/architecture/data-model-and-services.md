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
  lab_number SMALLINT NOT NULL CHECK (lab_number BETWEEN 1 AND 6),
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
  module_number SMALLINT CHECK (module_number BETWEEN 0 AND 5),

  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  checklist_items JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(user_id, module_number)
);

CREATE INDEX idx_progress_user ON module_progress(user_id, updated_at DESC);
```

**Changes**:
- Updated constraint to support `module_number BETWEEN 0 AND 5`
- Added `status`, `started_at`, and `checklist_items` columns to match orientation/vibecoding flows

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

### 2.5 workflows ✨ NEW (Lab 6)

**Purpose**: Store AI workflow definitions for visual workflow builder

```sql
CREATE TABLE workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Basic info
  name TEXT NOT NULL,
  description TEXT,
  lab_number INT DEFAULT 6,

  -- Workflow configuration (JSON)
  config JSONB NOT NULL,
  /* config structure:
  {
    "nodes": [
      {
        "id": "node-1",
        "type": "input" | "aiStep" | "output",
        "data": { "label": string, "prompt"?: string, ... },
        "position": { "x": number, "y": number }
      }
    ],
    "edges": [
      { "id": "edge-1", "source": "node-1", "target": "node-2" }
    ]
  }
  */

  -- Classification
  is_template BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT false,
  template_category TEXT,

  -- Statistics
  execution_count INT DEFAULT 0,
  success_rate FLOAT DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_workflows_user ON workflows(user_id);
CREATE INDEX idx_workflows_template ON workflows(is_template, is_public);
CREATE INDEX idx_workflows_category ON workflows(template_category) WHERE is_template = true;
```

**RLS Policies:**

```sql
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own and public workflows"
  ON workflows FOR SELECT
  USING (user_id = auth.uid() OR (is_public = true AND is_template = true));

CREATE POLICY "Users can create own workflows"
  ON workflows FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own workflows"
  ON workflows FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own workflows"
  ON workflows FOR DELETE
  USING (user_id = auth.uid());
```

---

### 2.6 workflow_executions ✨ NEW (Lab 6)

**Purpose**: Track workflow execution history and results

```sql
CREATE TABLE workflow_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID REFERENCES workflows(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Execution data
  input_data TEXT NOT NULL,
  final_output TEXT,

  -- Execution log (JSON)
  execution_log JSONB,
  /* execution_log structure:
  {
    "steps": [
      {
        "stepId": "node-2",
        "timestamp": "ISO timestamp",
        "input": "prompt text",
        "output": "LLM response",
        "durationMs": 1200,
        "status": "success" | "error"
      }
    ],
    "totalDurationMs": 3600
  }
  */

  -- Status
  status TEXT CHECK (status IN ('running', 'completed', 'failed')) NOT NULL,
  error_message TEXT,

  -- Cost tracking
  tokens_used INT,
  api_calls INT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX idx_executions_workflow ON workflow_executions(workflow_id);
CREATE INDEX idx_executions_user ON workflow_executions(user_id);
CREATE INDEX idx_executions_status ON workflow_executions(status);
CREATE INDEX idx_executions_created ON workflow_executions(created_at DESC);
```

**RLS Policies:**

```sql
ALTER TABLE workflow_executions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own executions"
  ON workflow_executions FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own executions"
  ON workflow_executions FOR INSERT
  WITH CHECK (user_id = auth.uid());
```

---

### 2.7 student_reports ✨ NEW (Floating Coach)

**Purpose**: Cache AI-generated learning reports for students

```sql
CREATE TABLE student_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  date_range_start TIMESTAMPTZ,
  date_range_end TIMESTAMPTZ,

  -- Report content
  report_data JSONB NOT NULL,
  /* report_data structure:
  {
    "totalQuestions": number,
    "topicsExplored": string[],
    "mostActiveLabNumber": number,
    "labDistribution": { [labNumber]: number },
    "strugglingTopics": string[],
    "masteredTopics": string[]
  }
  */

  ai_insights TEXT, -- AI-generated narrative

  -- Metadata
  metadata JSONB, -- stats like engagement_score, etc.
  version INT DEFAULT 1, -- for schema versioning

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_reports_user ON student_reports(user_id);
CREATE INDEX idx_reports_generated ON student_reports(generated_at DESC);
```

**RLS Policies:**

```sql
ALTER TABLE student_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own reports"
  ON student_reports FOR SELECT
  USING (auth.uid() = user_id);

-- Teachers can view their students' reports (requires join with teacher_assignments)
CREATE POLICY "Teachers can view assigned students' reports"
  ON student_reports FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM teacher_assignments
      WHERE teacher_assignments.student_id = student_reports.user_id
        AND teacher_assignments.teacher_id = auth.uid()
    )
  );
```

---

### 2.8 teacher_assignments ✨ NEW (Floating Coach)

**Purpose**: Define which teachers are assigned to which students

```sql
CREATE TABLE teacher_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  assigned_by UUID REFERENCES auth.users(id), -- admin who created assignment

  UNIQUE(teacher_id, student_id)
);

-- Indexes
CREATE INDEX idx_assignments_teacher ON teacher_assignments(teacher_id);
CREATE INDEX idx_assignments_student ON teacher_assignments(student_id);
```

**RLS Policies:**

```sql
ALTER TABLE teacher_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers can view own assignments"
  ON teacher_assignments FOR SELECT
  USING (auth.uid() = teacher_id);

CREATE POLICY "Admins can manage all assignments"
  ON teacher_assignments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
        AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );
```

---

### 2.9 Removed Tables ❌

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

### 3.5 saveWorkflow() ✨ NEW (Lab 6)

**File**: `lib/actions/workflow.ts`

**Purpose**: Save or update a workflow definition

**Signature:**
```typescript
export async function saveWorkflow(workflow: {
  name: string
  description?: string
  config: any // nodes and edges
}): Promise<{
  success: boolean
  error?: string
  data?: Workflow
}>
```

---

### 3.6 executeWorkflow() ✨ NEW (Lab 6)

**File**: `lib/actions/workflow.ts`

**Purpose**: Execute a workflow with provided input

**Signature:**
```typescript
export async function executeWorkflow(
  workflowId: string,
  inputData: string
): Promise<{
  success: boolean
  error?: string
  data?: {
    executionId: string
    finalOutput: string
    log: ExecutionLog[]
  }
}>
```

**Flow:**
1. Load workflow configuration
2. Create execution record (status: 'running')
3. Execute workflow engine (topological sort + sequential execution)
4. Update execution record with results
5. Return execution data

---

### 3.7 generateStudentReport() ✨ NEW (Floating Coach)

**File**: `lib/actions/reports.ts`

**Purpose**: Generate AI-powered learning report for a student

**Signature:**
```typescript
export async function generateStudentReport(
  studentId: string,
  options?: {
    dateRange?: { start: Date; end: Date }
    forceRegenerate?: boolean
  }
): Promise<{
  success: boolean
  error?: string
  report?: StudentReport
}>
```

**Flow:**
1. Check authentication and authorization (teacher/admin only)
2. Check cache (return if recent report exists and not force regenerate)
3. Fetch coach transcripts for date range
4. Analyze transcripts (extract patterns, topics, struggles)
5. Generate AI insights (using GPT-4)
6. Store report in database
7. Return report

**Rate Limit**: None (teacher-initiated, not student)

---

### 3.8 getMyStudents() ✨ NEW (Floating Coach)

**File**: `lib/actions/teacher.ts`

**Purpose**: Get list of students assigned to current teacher

**Signature:**
```typescript
export async function getMyStudents(): Promise<{
  success: boolean
  error?: string
  data?: StudentSummary[]
}>

interface StudentSummary {
  id: string
  name: string
  email: string
  avatar_url?: string
  labs_completed: number
  current_lab: number
  total_questions: number
  last_question_date?: string
  engagement_score: number
}
```

**Flow:**
1. Get teacher assignments for current user
2. Fetch student progress and coach stats
3. Calculate engagement scores
4. Return student summaries

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

### Expected Data (1000 students, 6 labs, avg 6 exercises/lab)

| Table | Rows | Avg Size/Row | Total Size |
|-------|------|--------------|------------|
| `prompt_lab_progress` | 36,000 | 1 KB | 36 MB |
| `coach_transcripts` | 25,000 | 2 KB | 50 MB |
| `module_progress` | 5,000 | 0.5 KB | 2.5 MB |
| `ai_usage_log` | 60,000 | 0.2 KB | 12 MB |
| `workflows` (Lab 6) | 3,000 | 3 KB | 9 MB |
| `workflow_executions` (Lab 6) | 15,000 | 2 KB | 30 MB |
| `student_reports` (Coach) | 1,000 | 5 KB | 5 MB |
| `teacher_assignments` (Coach) | 1,000 | 0.2 KB | 0.2 MB |
| **Total** | | | **~145 MB** |

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

**Last Updated**: 2025-10-17
**Status**: Active (Includes Lab 6 and Floating Coach features)
