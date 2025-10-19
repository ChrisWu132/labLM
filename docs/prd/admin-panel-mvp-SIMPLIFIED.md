# Admin Panel MVP - SIMPLIFIED Product Requirements

**Product**: VibeCode Study Teacher Panel
**Version**: 2.0 (MVP - Lab Monitoring Focused)
**Target**: School Teachers
**Status**: Implemented
**Date**: 2025-10-18
**Last Updated**: 2025-10-18

---

## 🎯 Core Philosophy: Lab Progress Monitoring First

**What we're doing**: Giving teachers detailed visibility into student lab and exercise-level progress
**What we're NOT doing**: Building a full LMS or complex class management system

**Key Principle**: The teacher panel is primarily a **monitoring dashboard**, not a class management tool

---

## 🆕 What Changed in v2.0 (Lab Monitoring Focus)

### Before (v1.0 - Class Management Focus)
- ❌ Main page showed class cards
- ❌ Prominent "Create Class" button
- ❌ Only showed total labs completed (X/6)
- ❌ Had to click through to see student details

### After (v2.0 - Lab Monitoring Focus)
- ✅ Main page = **Student × Lab progress matrix table**
- ✅ "Create Class" moved to settings menu (de-emphasized)
- ✅ Shows status for each individual lab (✓ ⚠️ ❌ ○ 🔒)
- ✅ **Exercise-level tracking** for each student
- ✅ Automatic **at-risk student detection** (>7 days inactive or stuck)
- ✅ Click student row → View detailed exercise progress
- ✅ Click lab column → View class-wide lab statistics
- ✅ Class switcher dropdown at top

---

## MVP Feature Set (Bare Minimum)

### 1. Teacher Can Create Classes ✅

**Flow**:
1. Teacher signs up with email/password (standard Supabase Auth)
2. Teacher creates a class → Gets join code: `ABC-XYZ-2025`
3. Teacher shares code with students (write on board or print)

**Implementation**:
```sql
-- Single table
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  join_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_classes_teacher ON classes(teacher_id);
CREATE INDEX idx_classes_join_code ON classes(join_code);
```

**Server Action**:
```typescript
'use server'

export async function createClass(name: string) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Not authenticated' };
  }

  const joinCode = generateJoinCode(); // e.g., "ABC-XYZ-2025"

  const { data, error } = await supabase
    .from('classes')
    .insert({ teacher_id: user.id, name, join_code: joinCode })
    .select()
    .single();

  return { data, error };
}
```

---

### 2. Students Join with Code ✅

**SIMPLIFIED APPROACH**: Students still use regular email/password but auto-enroll in class

**Why this is simpler**:
- ❌ No fake emails (`username@student.vibecodestudy.app`)
- ❌ No username-based auth workarounds
- ❌ No email verification bypass
- ❌ No password reset complexity
- ✅ Use standard Supabase Auth (already working)
- ✅ Students can use real emails or school emails

**Flow**:
1. Student clicks "Join Class"
2. Student enters join code: `ABC-XYZ-2025`
3. Student signs up with **real email + password** (standard Supabase)
4. Auto-enrolled in teacher's class

**Implementation**:
```sql
-- Single enrollment table
CREATE TABLE class_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(class_id, student_id)
);

CREATE INDEX idx_enrollments_class ON class_enrollments(class_id);
CREATE INDEX idx_enrollments_student ON class_enrollments(student_id);
```

**Server Action**:
```typescript
'use server'

export async function joinClassWithCode(joinCode: string) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Not authenticated. Please sign up first.' };
  }

  // Find class by join code
  const { data: classData } = await supabase
    .from('classes')
    .select('id')
    .eq('join_code', joinCode)
    .single();

  if (!classData) {
    return { error: 'Invalid class code' };
  }

  // Enroll student
  const { error } = await supabase
    .from('class_enrollments')
    .insert({
      class_id: classData.id,
      student_id: user.id,
    });

  return { error };
}
```

**UI Flow**:
```
Student Page:
┌────────────────────────────────┐
│ Join a Class                   │
│                                │
│ Class Code: [ABC-XYZ-2025]     │
│                                │
│ [Join Class]                   │
│                                │
│ Don't have an account?         │
│ [Sign Up] first               │
└────────────────────────────────┘
```

---

### 3. Teacher Views Student Progress ✅

**SIMPLIFIED**: Just show what's already in `prompt_lab_progress` table

**Implementation**:
```typescript
'use server'

export async function getClassProgress(classId: string) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Not authenticated' };
  }

  // Verify teacher owns this class
  const { data: classData } = await supabase
    .from('classes')
    .select('id')
    .eq('id', classId)
    .eq('teacher_id', user.id)
    .single();

  if (!classData) {
    return { error: 'Class not found' };
  }

  // Get students in class
  const { data: enrollments } = await supabase
    .from('class_enrollments')
    .select('student_id, auth.users!inner(email)')
    .eq('class_id', classId);

  const studentIds = enrollments.map(e => e.student_id);

  // Get progress from EXISTING table
  const { data: progress } = await supabase
    .from('prompt_lab_progress')
    .select('*')
    .in('user_id', studentIds);

  // Simple aggregation
  const studentProgress = studentIds.map(studentId => {
    const studentData = progress.filter(p => p.user_id === studentId);
    const completed = studentData.filter(p => p.success).length;

    return {
      studentId,
      email: enrollments.find(e => e.student_id === studentId)?.auth.users.email,
      labsCompleted: completed,
      totalLabs: 6,
      lastActivity: studentData[0]?.created_at,
    };
  });

  return { data: studentProgress };
}
```

**UI**:
```
Teacher Dashboard:
┌─────────────────────────────────────────────┐
│ Class: 7th Grade Period 3                   │
│ Join Code: ABC-XYZ-2025                     │
│                                             │
│ Student Email         Labs   Last Active   │
│ ──────────────────────────────────────────  │
│ alice@school.edu      3/6    2 hours ago    │
│ bob@gmail.com         5/6    1 day ago      │
│ carol@school.edu      1/6    3 days ago     │
└─────────────────────────────────────────────┘
```

---

### 4. Simple Export to CSV ✅

**Implementation**:
```typescript
'use server'

export async function exportClassProgress(classId: string) {
  const { data } = await getClassProgress(classId);

  if (!data) {
    return { error: 'Failed to get progress' };
  }

  // Generate CSV
  const csv = [
    'Email,Labs Completed,Total Labs,Last Activity',
    ...data.map(s => `${s.email},${s.labsCompleted},${s.totalLabs},${s.lastActivity}`)
  ].join('\n');

  return { data: csv };
}
```

---

## RLS Policies (Minimal)

```sql
-- Classes: Teachers can only see their own
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers view own classes"
  ON classes FOR ALL
  USING (auth.uid() = teacher_id);

-- Enrollments: Teachers can view their class enrollments
ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers view own enrollments"
  ON class_enrollments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM classes
      WHERE classes.id = class_enrollments.class_id
        AND classes.teacher_id = auth.uid()
    )
  );

CREATE POLICY "Students can enroll themselves"
  ON class_enrollments FOR INSERT
  WITH CHECK (auth.uid() = student_id);

-- Use EXISTING prompt_lab_progress RLS
-- No changes needed - already secured by user_id
```

---

## What We Removed (Post-MVP)

### ❌ Removed from MVP:
1. **Username-based auth** → Use standard email/password
2. **CSV import** → Too complex, manual add only for now
3. **Temp passwords & force reset** → Use standard signup
4. **Join attempt tracking** → Not needed for MVP
5. **Rate limiting tables** → Use application-level or Vercel
6. **Admin role** → Just teachers for now
7. **Advanced reporting (PDF)** → CSV only
8. **Class capacity limits** → Not needed initially
9. **Code expiration** → Not needed initially
10. **Student last activity filters** → Just show the list

### ✅ Can Add Later (Post-MVP):
- CSV bulk import (if teachers request it)
- Username-based auth (if email is friction)
- Advanced filtering (at-risk students, etc.)
- PDF reports
- Admin dashboard
- Real-time updates

---

## Database Migration

```sql
-- Migration: 20251018_admin_panel_mvp.sql

-- 1. Classes table
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  join_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_classes_teacher ON classes(teacher_id);
CREATE INDEX idx_classes_join_code ON classes(join_code);

-- 2. Enrollments table
CREATE TABLE class_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(class_id, student_id)
);

CREATE INDEX idx_enrollments_class ON class_enrollments(class_id);
CREATE INDEX idx_enrollments_student ON class_enrollments(student_id);

-- 3. RLS Policies
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teachers view own classes"
  ON classes FOR ALL
  USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers view own enrollments"
  ON class_enrollments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM classes
      WHERE classes.id = class_enrollments.class_id
        AND classes.teacher_id = auth.uid()
    )
  );

CREATE POLICY "Students can enroll themselves"
  ON class_enrollments FOR INSERT
  WITH CHECK (auth.uid() = student_id);

-- Done! Only 2 tables + 3 policies
```

---

## Implementation Phases (Simplified)

### Phase 1 (Week 1):
- Teacher signup/login (already have Supabase Auth)
- Create class + generate join code
- View class list

### Phase 2 (Week 1-2):
- Student join with code flow
- Basic enrollment

### Phase 3 (Week 2-3):
- Teacher dashboard: view enrolled students
- Show student progress (query existing `prompt_lab_progress`)

### Phase 4 (Week 3-4):
- CSV export
- Polish UI
- Test with 1-2 teachers

**Total: 4 weeks instead of 6 weeks**

---

## Key Simplifications

| Original | Simplified | Why |
|----------|-----------|-----|
| Username-based auth | Standard email/password | No Supabase workarounds needed |
| CSV import | Manual add only | Avoid temp password complexity |
| Join attempt tracking | None | Not critical for MVP |
| Rate limiting tables | Application-level | Simpler implementation |
| Admin role | Just teachers | Fewer permissions to manage |
| PDF reports | CSV only | Simpler export logic |
| 8+ tables | 2 tables | Easier to maintain |
| Complex RLS | 3 simple policies | Lower security risk |

---

## Success Criteria (Revised)

### Must Have:
- ✅ Teacher creates class → Gets join code
- ✅ Student joins with code → Gets enrolled
- ✅ Teacher sees list of students in class
- ✅ Teacher sees student lab progress (from existing table)
- ✅ Teacher exports CSV

### Nice to Have (Post-MVP):
- ⚠️ Bulk CSV import
- ⚠️ Username-based auth
- ⚠️ Advanced filtering

---

## Risk Mitigation (Simplified)

### Risk: Email friction for students
**Mitigation**:
- Use school email addresses (most schools provide them)
- If still friction in testing → Add username auth in Phase 2

### Risk: Teachers want CSV import
**Mitigation**:
- Start with manual add (simple)
- Add CSV import post-MVP if requested

### Risk: Performance with 100+ students
**Mitigation**:
- Use existing indexes on `prompt_lab_progress`
- Pagination if needed (easy to add)

---

## 🆕 New Features in v2.0

### 4. Detailed Lab Progress Monitoring ✅

**Implementation**:
```typescript
// New server action
export async function getClassProgressDetailed(classId: string): Promise<{
  data?: ClassProgressDetailed
  error?: string
}> {
  // Returns:
  // - students: StudentProgressDetailed[] (with lab-level and exercise-level data)
  // - lab_statistics: LabStatistics[] (class-wide metrics per lab)
  // - at_risk_students: number (auto-detected)
}
```

**Lab Status Logic**:
- `completed`: All exercises passed
- `in_progress`: Some exercises started, none stuck
- `stuck`: Any exercise with ≥5 failed attempts
- `not_started`: No exercises attempted
- `locked`: Previous lab not complete

**At-Risk Detection**:
- Last activity > 7 days ago, OR
- Any exercise with ≥5 failed attempts

**UI**:
```
Teacher Dashboard (Main Page):
┌────────────────────────────────────────────────────────────┐
│ Teacher Panel         [Class: Period 3 ▼]  [Settings ⚙️]  │
│                                                            │
│ [28 Students] [24 Active] [85% Avg] [4 At Risk]            │
│                                                            │
│ Student Lab Progress                    [Export CSV]       │
│ ┌────────────────────────────────────────────────────────┐ │
│ │Student │Lab1│Lab2│Lab3│Lab4│Lab5│Lab6│Total│Last Active│ │
│ │────────┼────┼────┼────┼────┼────┼────┼─────┼──────────│ │
│ │alice@..│ ✓  │ ✓  │ ⚠️  │ ○  │ ○  │ 🔒 │ 2/6 │ 2h ago   │ │
│ │bob@... │ ✓  │ ✓  │ ✓  │ ✓  │ ⚠️  │ ○  │ 4/6 │ 5h ago   │ │
│ │carol@..│ ✓  │ ❌  │ ○  │ ○  │ ○  │ 🔒 │ 1/6 │ 3d ago ⚠️│ │
│ └────────────────────────────────────────────────────────┘ │
│ Legend: ✓ Completed | ⚠️ In Progress | ❌ Stuck | ○ Not Started | 🔒 Locked
└────────────────────────────────────────────────────────────┘
```

---

### 5. Student Detail View (Exercise-Level) ✅

**Route**: `/dashboard/teacher/students/[studentId]?class=[classId]`

**Implementation**:
```typescript
export async function getStudentProgress(classId: string, studentId: string): Promise<{
  data?: StudentProgressDetailed
}> {
  // Returns detailed lab and exercise progress for single student
}
```

**Shows**:
- Overall progress bar
- Each lab with status badge
- Exercise-level breakdown:
  - ✓/❌ status
  - Number of attempts
  - Student's submitted prompt
  - LLM response
  - Warning if stuck (≥5 attempts)

**UI**:
```
Student Detail (alice@school.edu):
┌──────────────────────────────────────────────────────────┐
│ ← Back to Class          alice@school.edu      [At Risk]│
│ Last active: 2 hours ago                                 │
│ Overall Progress: ████████░░ 33% (2/6 labs)             │
│                                                          │
│ ┌─────────────────────────────────────────────────────┐  │
│ │ Lab 1: 什么是 Prompt                  [✓ Completed] │  │
│ │ ──────────────────────────────────────────────────  │  │
│ │ • Exercise 1.1: First Prompt    ✓ (1 attempt, 2m)  │  │
│ │ • Exercise 1.2: Instructions     ✓ (2 attempts, 5m) │  │
│ │ • Exercise 1.3: Be Specific      ✓ (1 attempt, 3m)  │  │
│ │ Completed: Oct 15, 2025 at 3:24 PM                  │  │
│ └─────────────────────────────────────────────────────┘  │
│                                                          │
│ ┌─────────────────────────────────────────────────────┐  │
│ │ Lab 3: 角色扮演技巧                   [⚠️ In Progress]│  │
│ │ ──────────────────────────────────────────────────  │  │
│ │ • Exercise 3.1: Role Assignment  ✓ (1 attempt)      │  │
│ │ • Exercise 3.2: Expert Persona   ❌ (5 attempts)     │  │
│ │   [View submission ▼]                                │  │
│ │   ⚠️ Student is stuck (5 failed attempts)            │  │
│ │ • Exercise 3.3: Personality      ○ Not started       │  │
│ └─────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

---

### 6. Lab Statistics View (Class-Wide) ✅

**Route**: `/dashboard/teacher/labs/[labNumber]?class=[classId]`

**Shows**:
- Class-wide completion rate for this lab
- Breakdown by status (completed/in_progress/stuck/not_started)
- Exercise-level statistics:
  - Completion rate per exercise
  - Average attempts per exercise
  - Identifies problematic exercises
- List of stuck students with specific exercises

**UI**:
```
Lab 2 Statistics:
┌──────────────────────────────────────────────────────────┐
│ ← Back to Class          Lab 2: 如何给清晰指令           │
│                                                          │
│ [18 Completed] [5 In Progress] [3 Stuck] [2 Not Started]│
│                                        [75% Completion]  │
│                                                          │
│ Exercise Breakdown:                                      │
│ ┌──────────────────────────────────────────────────────┐ │
│ │Exercise │Completion│Avg Attempts│Progress Bar      │  │
│ │─────────┼──────────┼────────────┼─────────────────│  │
│ │Ex 2.1   │  85%     │   2.3      │████████████░░░░ │  │
│ │Ex 2.2   │  78%     │   1.8      │███████████░░░░░ │  │
│ │Ex 2.3   │  64%     │   3.1      │█████████░░░░░░░ │ ⚠️│
│ └──────────────────────────────────────────────────────┘ │
│                                                          │
│ ⚠️ Students Stuck on This Lab (3):                       │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ carol@school.edu - Failed Ex 2.1 (4 attempts)        │ │
│ │ emma@school.edu  - Failed Ex 2.3 (6 attempts)        │ │
│ │ frank@school.edu - Failed Ex 2.2 (3 attempts)        │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## What This Gives Us

✅ **Teacher-Focused**: Dashboard designed for monitoring, not management
✅ **Detailed Insights**: Exercise-level tracking, not just lab-level
✅ **Proactive**: Automatic at-risk student detection
✅ **Actionable**: Click through to see exactly where students are stuck
✅ **Class Management De-emphasized**: Create class button in settings menu
✅ **Maintainable**: Uses existing `prompt_lab_progress` table

---

## Implementation Summary

### Database
- **No new tables needed** - uses existing `prompt_lab_progress`
- Still uses `classes` and `class_enrollments` for organization

### New Server Actions
1. `getClassProgressDetailed(classId)` - Returns full class progress with exercise data
2. `getStudentProgress(classId, studentId)` - Returns single student detailed progress

### New Routes
1. `/dashboard/teacher` - Main dashboard with lab progress matrix
2. `/dashboard/teacher/students/[studentId]` - Student detail view
3. `/dashboard/teacher/labs/[labNumber]` - Lab statistics view

### Files Created/Modified
- **Modified**:
  - `types/admin.ts` - Added detailed progress types
  - `lib/actions/admin.ts` - Added detailed progress functions
  - `app/dashboard/teacher/page.tsx` - Updated to fetch detailed data
  - `app/dashboard/teacher/teacher-dashboard-client.tsx` - Complete redesign
- **Created**:
  - `app/dashboard/teacher/students/[studentId]/page.tsx`
  - `app/dashboard/teacher/students/[studentId]/student-detail-client.tsx`
  - `app/dashboard/teacher/labs/[labNumber]/page.tsx`
  - `app/dashboard/teacher/labs/[labNumber]/lab-statistics-client.tsx`

---

## Next Steps

1. **Test** with real teacher accounts
2. **Verify** at-risk detection logic accuracy
3. **Collect feedback** on usefulness of exercise-level tracking
4. **Iterate** on UI based on teacher needs

---

**Document Status**: ✅ v2.0 Implemented - Lab Monitoring Focused
**Last Updated**: 2025-10-18
**Key Change**: Shifted focus from class management to lab progress monitoring
