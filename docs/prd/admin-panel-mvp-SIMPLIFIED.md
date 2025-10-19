# Admin Panel MVP - SIMPLIFIED Product Requirements

**Product**: VibeCode Study Admin Panel
**Version**: 1.0 (MVP - Simplified)
**Target**: School Teachers
**Status**: Planning - SIMPLIFIED
**Date**: 2025-10-18

---

## 🎯 Core Philosophy: Keep It Simple

**What we're doing**: Giving teachers visibility into student progress
**What we're NOT doing**: Building a full LMS or complex user management system

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

## What This Gives Us

✅ **Faster Development**: 4 weeks instead of 6
✅ **Lower Risk**: No complex auth workarounds
✅ **Easier Testing**: Fewer moving parts
✅ **Maintainable**: 2 tables vs 8+ tables
✅ **Standard Patterns**: All Supabase best practices
✅ **Room to Grow**: Can add features based on real feedback

---

## Next Steps

1. **Review** this simplified approach
2. **Approve** to proceed
3. **Implement** Phase 1 (teacher creates class)
4. **Test** with real teachers
5. **Iterate** based on feedback

---

**Document Status**: ✅ Simplified - Ready for Review
**Architect**: Winston
**Recommendation**: Start here. Add complexity only when proven necessary.

**Last Updated**: 2025-10-18 (Simplified from over-engineered PRD)
