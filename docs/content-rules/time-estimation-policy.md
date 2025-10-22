# Time Estimation Policy: NO TIME ESTIMATES

**Status:** Active
**Effective Date:** 2025-01-20
**Applies To:** All lab content, UI components, and marketing materials

---

## Policy Statement

**Do not provide time estimates for labs, sections, or exercises.**

This includes:
- Lab duration (e.g., "20 min", "1 hour")
- Section duration (e.g., "5 min per section")
- Exercise completion time (e.g., "This should take 10 minutes")
- Course completion time (e.g., "Complete in 6 weeks")
- Time remaining indicators (e.g., "~15 min remaining")

## Rationale

### 1. Student Pace Varies Dramatically

Students learn at vastly different speeds:
- Fast learners may finish in 25% of estimated time → feel bored
- Slow learners may take 300% of estimated time → feel inadequate
- Neurodiverse students have unpredictable pacing
- Students with learning differences need flexible timing

### 2. Creates Performance Anxiety

Time estimates create stress:
- Students race to "beat the clock" → shallow learning
- Slower students feel pressure and frustration
- Creates unhealthy competition among peers
- Discourages thorough exploration and experimentation

### 3. Inaccurate and Misleading

Time estimates are inherently unreliable:
- Based on average fictional "ideal student"
- Don't account for reading speed variations
- Ignore different learning styles (visual vs. text learners)
- Fail to consider prior knowledge differences
- Can't predict when students will get stuck

### 4. Pedagogical Concerns

Time pressure undermines learning:
- Students skip important concepts to finish "on time"
- Reduces reflection and metacognition
- Discourages asking questions or seeking help
- Prioritizes speed over comprehension

### 5. Accessibility Issues

Time estimates discriminate against:
- Students using assistive technology (takes longer)
- Non-native speakers (need more time to process)
- Students with ADHD or processing disorders
- Students with physical disabilities affecting typing speed

---

## Allowed Alternatives

Instead of time estimates, provide:

### Progress Indicators

✅ **Good:**
```tsx
<ProgressBar>
  <span>3 of 5 sections completed</span>
  <span>60% complete</span>
</ProgressBar>
```

❌ **Bad:**
```tsx
<ProgressBar>
  <span>3 of 5 sections (~12 min remaining)</span>
  <span>60% complete • 8 minutes left</span>
</ProgressBar>
```

### Section Count

✅ **Good:**
```
Lab 1: Meet Your AI Friend
- 5 sections
- Learn tab, Try It tab, Quiz
```

❌ **Bad:**
```
Lab 1: Meet Your AI Friend (20 minutes)
- 5 sections (4 min each)
- Learn tab (2 min), Try It tab (2 min), Quiz (4 min)
```

### Completion Status

✅ **Good:**
```tsx
<SectionCard status="completed">
  Section 1.1: What is AI?
  Status: Completed
</SectionCard>
```

❌ **Bad:**
```tsx
<SectionCard status="completed">
  Section 1.1: What is AI? (5 min)
  Completed in 7 minutes
</SectionCard>
```

### General Guidance (Without Numbers)

✅ **Good:**
```
This section covers several concepts. Take your time to understand each one.
```

✅ **Good:**
```
This is a longer section with multiple exercises. Feel free to take breaks.
```

❌ **Bad:**
```
This section should take about 10-15 minutes to complete.
```

---

## Exceptions

**Limited exceptions allowed for:**

### Course-Level Marketing (Very General)

✅ **Acceptable:**
```
Complete this course at your own pace.
Most students finish within a few weeks.
```

⚠️ **Use sparingly:**
```
This is an introductory course designed to be completed in a semester.
```

❌ **Not allowed:**
```
6-week course • 2 hours per week • Complete in 12 hours total
```

### Teacher Dashboard (Aggregate Data Only)

✅ **Acceptable:**
```
Average student progress: 45% of labs completed
Median time to complete Lab 1: [hidden from students]
```

❌ **Not shown to students:**
```
Your completion time: 35 minutes vs. class average: 22 minutes
```

---

## Implementation Guidelines

### Database & Code

Remove these fields:
```typescript
// ❌ Remove from types
interface LabSection {
  estimatedMinutes: number  // DELETE THIS
  estimatedTime: string     // DELETE THIS
  duration: number          // DELETE THIS
}

// ✅ Keep only structure
interface LabSection {
  id: string
  title: string
  order: number
  tabs: SectionTab[]
}
```

### UI Components

Remove time displays:
```tsx
// ❌ Remove these
<div className="time-estimate">{section.estimatedMinutes} min</div>
<p>Estimated time: 5-7 minutes</p>
<span>~12 minutes remaining</span>

// ✅ Replace with progress
<div className="progress-indicator">
  Section {section.order} of {totalSections}
</div>
```

### Marketing Copy

Avoid specificity:
```markdown
❌ Bad:
"Learn AI in just 30 days! Each lab takes 20 minutes."

✅ Good:
"Learn AI at your own pace. Complete labs when you're ready."
```

---

## Enforcement

### Code Review Checklist

- [ ] No `estimatedMinutes`, `duration`, or `estimatedTime` fields in types
- [ ] No time values displayed in UI components
- [ ] No time references in content (check for "min", "minute", "hour", "time")
- [ ] No time-based calculations in progress functions

### Automated Checks

Run grep to find violations:
```bash
# Check for time-related terms
grep -r "estimatedMinutes\|duration\|min\|minute" content/labs/
grep -r "time to complete\|takes about\|should take" content/labs/

# Check TypeScript types
grep -r "estimatedMinutes\|duration" types/ lib/
```

### Violation Handling

**During Code Review:**
- Request removal of time estimates
- Suggest progress indicators as alternative
- Link to this policy document

**In Legacy Code:**
- Use scripts to remove time fields
- Update components to hide time displays
- Refactor progress calculations

---

## Migration from Time-Based Code

If you inherit code with time estimates:

1. **Remove from Types**
   ```bash
   # Find all occurrences
   grep -rn "estimatedMinutes" .

   # Remove from type definitions
   # Edit types/prompt-lab.ts
   ```

2. **Remove from Configuration**
   ```typescript
   // lib/constants/lab-sections.ts
   // Remove estimatedMinutes from all section objects
   ```

3. **Update Components**
   ```tsx
   // Remove time display from SectionLayout, SectionNav, etc.
   ```

4. **Remove Time Calculations**
   ```typescript
   // Remove getLabTotalTime() function
   // Remove remainingMinutes from calculateLabProgress()
   ```

5. **Test Build**
   ```bash
   npm run build
   npm run test
   ```

---

## Examples

### Bad: Time-Heavy Content

```tsx
export default function LabOverview() {
  return (
    <div>
      <h1>Lab 1: Meet Your AI Friend (20 minutes)</h1>
      <p>This lab takes approximately 20 minutes to complete.</p>

      <ul>
        <li>Section 1.1: What is AI? (5 min)</li>
        <li>Section 1.2: Your First Prompt (5 min)</li>
        <li>Section 1.3: Why Different Answers? (5 min)</li>
        <li>Section 1.4: Experiment Time (7 min)</li>
        <li>Section 1.5: Review & Quiz (5 min)</li>
      </ul>

      <div>Estimated time remaining: 12 minutes</div>
    </div>
  )
}
```

### Good: Time-Free Content

```tsx
export default function LabOverview() {
  return (
    <div>
      <h1>Lab 1: Meet Your AI Friend</h1>
      <p>This lab has 5 sections. Complete them at your own pace.</p>

      <ul>
        <li>Section 1.1: What is AI?</li>
        <li>Section 1.2: Your First Prompt</li>
        <li>Section 1.3: Why Different Answers?</li>
        <li>Section 1.4: Experiment Time</li>
        <li>Section 1.5: Review & Quiz</li>
      </ul>

      <ProgressIndicator
        completed={3}
        total={5}
        message="3 of 5 sections completed"
      />
    </div>
  )
}
```

---

## Benefits of This Policy

1. **Reduced Anxiety**: Students feel free to learn at their own pace
2. **Better Learning**: Deep understanding prioritized over speed
3. **Inclusion**: All learning speeds and styles accommodated
4. **Flexibility**: Students can take breaks without feeling behind
5. **Accuracy**: No false promises or misleading estimates
6. **Focus**: Progress measured by completion, not time

---

## Changelog

- **2025-01-20**: Policy created and enforced
- **2025-01-20**: Removed `estimatedMinutes` from all types and configurations
- **2025-01-20**: Updated all components to remove time displays

---

## Approval

**Approved By:** Product, UX, & Pedagogy Teams
**Review Date:** 2025-01-20
**Next Review:** 2025-07-20 (6 months)
