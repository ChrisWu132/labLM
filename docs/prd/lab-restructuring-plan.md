# Lab Restructuring Plan: Micro-Sections with Learn/Practice Separation

**Status**: Draft
**Created**: 2025-01-20
**Author**: Product Team
**Target**: Labs 1-6 Content Restructuring

---

## Executive Summary

Restructure all 6 labs from long-form continuous content into **micro-sections** (5-7 minutes each) with **learn/practice tab separation** within each section. This addresses middle school students' attention span limitations and provides clearer mental models for learning vs. doing.

**Expected Outcomes**:
- Reduced cognitive load per session
- Higher completion rates
- Clearer progress tracking
- Better retention through spaced practice

---

## Problem Statement

### Current Issues

1. **Content Length Fatigue**
   - Lab 5: 34KB of content (~15-20 min continuous reading + exercises)
   - Middle schooler attention span: 10-15 minutes max
   - No natural break points for pausing

2. **Mixed Content Types**
   - Theory, exercises, and quizzes interleaved
   - Unclear mental model: "Am I learning or practicing?"
   - Hard to review concepts while doing exercises

3. **Lab 6 Learning Cliff**
   - Labs 1-5: Simple text prompts
   - Lab 6: Complex visual workflow builder
   - No scaffolding or gradual introduction

4. **Progress Ambiguity**
   - Students don't know how much is left
   - Can't see what they've accomplished
   - Hard to resume after interruption

---

## Proposed Solution: Hybrid Micro-Section Structure

### Overview

Break each lab into **5-7 minute sections** (vertical slicing), with **Learn/Practice tabs** within each section (horizontal separation).

```
Lab 1: Meet Your AI Friend

  Section 1.1: What is AI? (5 min)
    [📖 Learn] [🎯 Try It]

  Section 1.2: Your First Prompt (5 min)
    [📖 Learn] [🎯 Try It]

  Section 1.3: Why Different Answers? (5 min)
    [📖 Learn] [🎯 Try It]

  Section 1.4: Experiment Time (7 min)
    [📖 Learn] [🎯 Try It]

  Section 1.5: Review & Quiz (5 min)
    [📖 Recap] [✅ Quiz]
```

### Design Principles

1. **Bite-sized chunks**: Each section = one concept + one practice
2. **Clear separation**: Learn tab (theory) vs Try It tab (practice)
3. **Sequential unlock**: Complete section N to unlock N+1
4. **Flexible pacing**: Can pause between sections
5. **Always accessible**: Can revisit completed sections anytime

---

## Detailed Design

### Section Structure

Each section contains:

```yaml
section:
  id: "1.1"
  title: "What is AI?"
  estimatedTime: 5  # minutes
  status: "locked" | "in_progress" | "completed"
  tabs:
    - learn:
        type: "content"
        content: "Theory, explanations, examples"
        media: ["text", "images", "videos"]
    - tryIt:
        type: "interactive"
        exercises:
          - id: "1.1-ex1"
            prompt: "Exercise prompt"
            successCriteria: {...}
```

### Tab Types

**Learn Tab (📖)**:
- Pure content consumption
- Read explanations
- Watch examples
- See demonstrations
- No exercises (except quick checks)
- Estimated time: 2-3 min

**Try It Tab (🎯)**:
- Pure practice - **MUST BE INTERACTIVE**
- **REQUIRED COMPONENTS**:
  - ✅ PromptEditor component (editable text area)
  - ✅ "Run Prompt" button that calls runPrompt() server action
  - ✅ LLMOutputDisplay component showing actual AI responses
  - ✅ Real-time feedback based on student's actual submissions
  - ✅ Success validation based on completed attempts
- **NOT ACCEPTABLE**:
  - ❌ Static text with fake "submit" counters
  - ❌ Instructions without actual prompt editor
  - ❌ Describing what students "should" do without letting them do it
- Can reference Learn tab anytime
- Estimated time: 2-4 min of actual hands-on practice

**Quiz Tab (✅)** (final section only):
- Review questions
- Self-assessment
- Summary of discoveries

### Progress Tracking

```
Lab 1: Meet Your AI Friend

Progress: ▓▓▓░░ 3/5 sections • ~12 min remaining

✅ 1.1 What is AI? (5 min)
✅ 1.2 Your First Prompt (5 min)
🔄 1.3 Why Different Answers? (5 min) ← You are here
🔒 1.4 Experiment Time (7 min)
🔒 1.5 Review & Quiz (5 min)
```

### Navigation Flow

```
Lab Selection Page
    ↓
Lab Overview (sections list)
    ↓
Section 1.1
  ├─ Learn tab (default)
  └─ Try It tab
    ↓ [Mark Complete & Continue →]
Section 1.2
  ├─ Learn tab
  └─ Try It tab
    ↓
... repeat ...
    ↓
Section 1.5 (Quiz)
  ├─ Recap tab
  └─ Quiz tab
    ↓ [Complete Lab →]
Lab Complete!
  ↓
Next Lab Unlocked
```

---

## Lab-by-Lab Breakdown

### Lab 1: Meet Your AI Friend (20 min → 5 sections)

| Section | Title | Learn Tab Content | Try It Tab Exercises |
|---------|-------|-------------------|---------------------|
| 1.1 (5m) | What is AI? | AI vs LLM vs Search Engine | Quick check: Categorize examples |
| 1.2 (5m) | Your First Prompt | How to write prompts | Exercise: Have first conversation |
| 1.3 (5m) | Why Different Answers? | Randomness/temperature concept | Exercise: Same prompt 3 times |
| 1.4 (5m) | Prompt Experiments | Tips for good prompts | Exercise: Test specific vs vague |
| 1.5 (5m) | Review & Quiz | Key takeaways recap | 5-question quiz |

### Lab 2: How AI Gets Smart (25 min → 5 sections)

| Section | Title | Learn Tab Content | Try It Tab Exercises |
|---------|-------|-------------------|---------------------|
| 2.1 (5m) | How LLMs Learn | Training process overview | Quick check: Training concepts |
| 2.2 (5m) | Knowledge Sources | Internet text, books, code | Exercise: Test knowledge boundaries |
| 2.3 (5m) | Knowledge Cutoff | What AI knows/doesn't know | Exercise: Recent vs old events |
| 2.4 (5m) | Clear Communication | Writing specific prompts | Exercise: Vague → specific refinement |
| 2.5 (5m) | Review & Quiz | Key discoveries | Quiz + summary |

### Lab 3: AI's Thinking Process (25 min → 5 sections)

| Section | Title | Learn Tab Content | Try It Tab Exercises |
|---------|-------|-------------------|---------------------|
| 3.1 (5m) | Token Generation | How AI generates text | Exercise: Observe token-by-token |
| 3.2 (5m) | Context Windows | Memory limitations | Exercise: Test context limits |
| 3.3 (5m) | Role-Playing Basics | Setting AI personas | Exercise: Try different roles |
| 3.4 (5m) | Advanced Personas | Tone, style, expertise | Exercise: Create custom persona |
| 3.5 (5m) | Review & Quiz | Recap + discoveries | Quiz |

### Lab 4: AI's Capabilities & Limits (30 min → 6 sections)

| Section | Title | Learn Tab Content | Try It Tab Exercises |
|---------|-------|-------------------|---------------------|
| 4.1 (5m) | AI Superpowers | Pattern matching, synthesis | Exercise: Test strengths |
| 4.2 (5m) | AI Weaknesses | Math, real-time, reasoning | Exercise: Find the limits |
| 4.3 (5m) | Hallucinations | Why AI makes things up | Exercise: Spot hallucinations |
| 4.4 (5m) | Verification | How to check AI outputs | Exercise: Fact-check responses |
| 4.5 (5m) | Chain-of-Thought | **Manual step-by-step (prep for Lab 6)** | Exercise: Multi-step problem |
| 4.6 (5m) | Review & Quiz | Summary | Quiz |

**New in 4.5**: Introduce manual prompt chaining (copy output → paste as next input) to motivate workflow builder

### Lab 5: Responsible AI Use (30 min → 6 sections)

| Section | Title | Learn Tab Content | Try It Tab Exercises |
|---------|-------|-------------------|---------------------|
| 5.1 (5m) | AI Ethics | Bias, fairness, transparency | Exercise: Identify bias scenarios |
| 5.2 (5m) | Academic Integrity | When/how to use AI for homework | Exercise: Evaluate use cases |
| 5.3 (5m) | Privacy Protection | What not to share | Exercise: Spot privacy risks |
| 5.4 (5m) | Critical Thinking | Questioning AI outputs | Exercise: Critique AI advice |
| 5.5 (5m) | Multi-Step Workflow | **Manual workflow practice** | Exercise: Research workflow (manual chaining) |
| 5.6 (5m) | Review & Quiz | Summary | Quiz |

**New in 5.5**: Students experience the pain of manual copy-paste workflows → motivation for Lab 6

### Lab 6: AI Workflow Builder (60 min → 8 sections)

**Major restructuring needed**

| Section | Title | Learn Tab Content | Try It Tab Exercises |
|---------|-------|-------------------|---------------------|
| 6.1 (5m) | Why Workflows? | Problem: Manual copy-paste is tedious | Watch: Workflow demo video |
| 6.2 (10m) | Guided Tour | Workflow builder UI walkthrough | **Interactive tutorial** (step-by-step) |
| 6.3 (10m) | First Workflow | How to create nodes & connections | Exercise: Build 2-step workflow |
| 6.4 (10m) | Using Variables | Passing data between steps | Exercise: Add variable substitution |
| 6.5 (10m) | Rebuild Lab 5 | Template: Research workflow | Exercise: Rebuild your Lab 5 workflow |
| 6.6 (10m) | Customize Template | Choose pre-built template | Exercise: Modify & extend template |
| 6.7 (15m) | Create Your Own | Blank canvas | Exercise: Original 3+ step workflow |
| 6.8 (5m) | Review & Gallery | See examples | Optional: Remix others' workflows |

**New 6.2**: Interactive tutorial with forced progression (like Duolingo)
- Can't skip steps
- Highlights next action
- Validates each step before proceeding

---

## Technical Implementation

### Data Model Changes

```typescript
// New types
interface LabSection {
  id: string;              // "1.1", "1.2", etc.
  labNumber: number;       // 1-6
  order: number;           // 1, 2, 3...
  title: string;           // "What is AI?"
  estimatedMinutes: number;
  tabs: SectionTab[];
}

interface SectionTab {
  id: string;              // "learn" | "tryIt" | "quiz"
  type: TabType;
  label: string;           // "📖 Learn", "🎯 Try It"
  content: MDXContent | ReactComponent;
}

// Updated progress tracking
interface SectionProgress {
  userId: string;
  sectionId: string;       // "1.1", "1.2", etc.
  status: "locked" | "in_progress" | "completed";
  learnTabCompleted: boolean;
  tryItTabCompleted: boolean;
  startedAt?: Date;
  completedAt?: Date;
}
```

### Database Schema Changes

```sql
-- New table for section-level progress
CREATE TABLE section_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  section_id text NOT NULL,  -- "1.1", "1.2", etc.
  status text NOT NULL CHECK (status IN ('locked', 'in_progress', 'completed')),
  learn_tab_visited boolean DEFAULT false,
  try_it_tab_visited boolean DEFAULT false,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  UNIQUE(user_id, section_id)
);

-- Keep existing module_progress for lab-level tracking
-- Keep existing prompt_lab_progress for exercise tracking
```

### File Structure Changes

```
Current:
/content/labs/
  ├── lab1.mdx (monolithic)
  ├── lab2.mdx (monolithic)
  └── ...

New:
/content/labs/
  ├── lab1/
  │   ├── section-1-1/
  │   │   ├── learn.mdx
  │   │   └── try-it.tsx
  │   ├── section-1-2/
  │   │   ├── learn.mdx
  │   │   └── try-it.tsx
  │   ├── section-1-3/
  │   │   ├── learn.mdx
  │   │   └── try-it.tsx
  │   └── config.ts (section metadata)
  ├── lab2/
  │   ├── section-2-1/
  │   └── ...
  └── ...
```

### Component Changes

```
New components needed:

/components/features/lab-sections/
  ├── SectionLayout.tsx       # Wrapper for section with tabs
  ├── SectionNav.tsx          # Progress bar & section navigation
  ├── SectionTabs.tsx         # Learn/Try It tab switcher
  ├── LearnContent.tsx        # Read-only content display
  ├── TryItContent.tsx        # Interactive exercise container
  └── SectionProgress.tsx     # Progress indicator

Updated components:

/components/features/prompt-lab/
  ├── PromptEditor.tsx        # Used in Try It tabs
  ├── ExerciseCard.tsx        # Used in Try It tabs
  └── ...
```

### Route Structure Changes

```
Current:
/app/dashboard/vibecoding/labs/[labId]/page.tsx
  └── Renders full lab content

New:
/app/dashboard/vibecoding/labs/[labId]/
  ├── page.tsx                    # Lab overview (section list)
  └── sections/[sectionId]/
      └── page.tsx                # Section with tabs
```

URL structure:
```
Current: /labs/1
New:     /labs/1              # Overview
         /labs/1/sections/1-1  # Section 1.1
         /labs/1/sections/1-2  # Section 1.2
         ...
```

### Configuration System

```typescript
// /lib/constants/lab-sections.ts

export const LAB_SECTIONS: Record<number, LabSection[]> = {
  1: [
    {
      id: "1.1",
      labNumber: 1,
      order: 1,
      title: "What is AI?",
      estimatedMinutes: 5,
      tabs: [
        { id: "learn", type: "content", label: "📖 Learn" },
        { id: "tryIt", type: "interactive", label: "🎯 Try It" }
      ]
    },
    {
      id: "1.2",
      labNumber: 1,
      order: 2,
      title: "Your First Prompt",
      estimatedMinutes: 5,
      tabs: [
        { id: "learn", type: "content", label: "📖 Learn" },
        { id: "tryIt", type: "interactive", label: "🎯 Try It" }
      ]
    },
    // ... more sections
  ],
  2: [ /* Lab 2 sections */ ],
  // ... more labs
};
```

---

## Migration Strategy

### Phase 1: Infrastructure (Week 1-2)

**Goal**: Build new section system without breaking existing labs

- [ ] Create new database tables (`section_progress`)
- [ ] Build new components (`SectionLayout`, `SectionTabs`, etc.)
- [ ] Set up new route structure (`/labs/[labId]/sections/[sectionId]`)
- [ ] Create configuration system
- [ ] Keep old routes working (backwards compatibility)

**Deliverables**:
- New components in Storybook
- Database migrations
- Empty section pages rendering

### Phase 2: Lab 1 Pilot (Week 3)

**Goal**: Fully restructure Lab 1 as proof of concept

- [ ] Break down Lab 1 into 5 sections
- [ ] Create Learn tab content (MDX)
- [ ] Create Try It tab exercises (React components)
- [ ] Implement section progress tracking
- [ ] Add section navigation UI
- [ ] Test with internal users

**Success Criteria**:
- Lab 1 works end-to-end in new structure
- Progress tracking functional
- No regressions on existing features

### Phase 3: Lab 6 Interactive Tutorial (Week 4)

**Goal**: Build guided tutorial for workflow builder

- [ ] Design tutorial script (8 steps)
- [ ] Build tutorial overlay component
- [ ] Implement step validation
- [ ] Disable UI elements until appropriate step
- [ ] Add animated hints/arrows
- [ ] Test tutorial flow

**Success Criteria**:
- Users can complete tutorial without getting stuck
- Tutorial teaches all core workflow builder concepts

### Phase 4: Labs 2-5 Migration (Week 5-7)

**Goal**: Restructure remaining labs

Week 5:
- [ ] Lab 2 restructuring (5 sections)
- [ ] Lab 3 restructuring (5 sections)

Week 6:
- [ ] Lab 4 restructuring (6 sections) + add Chain-of-Thought prep
- [ ] Lab 5 restructuring (6 sections) + add manual workflow exercise

Week 7:
- [ ] Lab 6 full restructuring (8 sections)
- [ ] Integrate interactive tutorial from Phase 3

### Phase 5: Polish & Testing (Week 8)

- [ ] Remove old route handlers
- [ ] Clean up deprecated code
- [ ] Update documentation
- [ ] Teacher dashboard updates (show section-level progress)
- [ ] User acceptance testing
- [ ] Performance optimization

### Phase 6: Deployment (Week 9)

- [ ] Staged rollout (10% → 50% → 100%)
- [ ] Monitor analytics (completion rates, time spent)
- [ ] Gather user feedback
- [ ] Iterate based on data

---

## Impact Assessment

### Code Changes

| Area | Impact | Effort |
|------|--------|--------|
| Database schema | Medium | Low (2 new tables) |
| Content files | High | High (restructure all labs) |
| Components | Medium | Medium (5-7 new components) |
| Routes | Medium | Medium (new nested routes) |
| State management | Low | Low (extend existing) |
| Testing | Medium | Medium (update test suites) |

**Total Estimated Effort**: 6-9 weeks (1 developer)

### User Experience Changes

**Positive**:
- ✅ Clearer progress tracking
- ✅ Better attention span alignment
- ✅ Easier to pause and resume
- ✅ Less overwhelming per session
- ✅ Clearer learning vs practicing distinction

**Potential Concerns**:
- ⚠️ More clicks to complete a lab
- ⚠️ Could feel more fragmented
- ⚠️ Need to educate users on new structure

**Mitigation**:
- Show total estimated time upfront
- Allow "Mark section complete" without visiting Try It tab (for advanced users)
- Add "Quick Complete" mode for users who want to skip ahead

### Analytics to Track

**Engagement**:
- Section completion rate
- Average time per section
- Drop-off points (which sections lose students)
- Tab usage patterns (Learn vs Try It)

**Performance**:
- Overall lab completion rate (before vs after)
- Time to complete full lab
- Return rate (students coming back next day)

**Quality**:
- Quiz scores by section
- Exercise success rate
- Teacher feedback

---

## Success Metrics

### Primary Metrics

| Metric | Current Baseline | Target | Measurement |
|--------|-----------------|--------|-------------|
| Lab completion rate | TBD | +25% | % of students who complete all 6 labs |
| Average session length | TBD | 8-12 min | Time spent per session |
| Return rate | TBD | +40% | % students who return next day |
| Exercise success rate | TBD | >70% | % exercises passed on first try |

### Secondary Metrics

- Section completion time (should be ≤ estimated time)
- Tab switch frequency (Learn ↔ Try It)
- Section revisit rate
- Teacher satisfaction score

---

## Risks & Mitigation

### Risk 1: Content Fragmentation

**Risk**: Breaking content into small chunks loses narrative flow

**Mitigation**:
- Each section's Learn tab includes "Previously..." recap
- Final section includes comprehensive review
- Visual progress indicator shows big picture

### Risk 2: Increased Development Time

**Risk**: Restructuring all labs takes longer than planned

**Mitigation**:
- Pilot with Lab 1 first (validate approach)
- Use templates for repetitive sections
- Parallelize content creation and development

### Risk 3: User Confusion

**Risk**: Students don't understand new structure

**Mitigation**:
- Add onboarding tooltip tour
- Show video tutorial in orientation
- Provide teacher guide for explaining structure

### Risk 4: Mobile Experience

**Risk**: Tabs don't work well on small screens

**Mitigation**:
- Test on mobile early
- Consider accordion layout for mobile
- Ensure touch targets are adequate

---

## Open Questions

1. **Section unlock strategy**:
   - Must complete both Learn + Try It tabs to unlock next section?
   - Or just visiting Learn tab is enough?
   - Or allow skip for advanced users?

2. **Content distribution**:
   - Should all sections be equal length (5 min)?
   - Or allow variability (3-10 min)?

3. **Lab 6 tutorial**:
   - Force all users through tutorial?
   - Or allow "Skip Tutorial" option?

4. **Progress granularity**:
   - Track tab-level progress (Learn visited, Try It completed)?
   - Or just section-level (completed/not completed)?

5. **Teacher visibility**:
   - Show teachers section-level progress?
   - Or just lab-level is sufficient?

---

## Next Steps

1. **Immediate** (this week):
   - [ ] Review and approve this plan
   - [ ] Gather feedback from teachers/students (if possible)
   - [ ] Finalize section breakdown for Lab 1

2. **Week 1**:
   - [ ] Start Phase 1 (infrastructure)
   - [ ] Begin content creation for Lab 1

3. **Week 2**:
   - [ ] Complete Phase 1
   - [ ] Internal testing of new components

4. **Week 3**:
   - [ ] Start Phase 2 (Lab 1 pilot)
   - [ ] User testing with small group

---

## Appendices

### A. Example Section Content

**Lab 1, Section 1.1: "What is AI?"**

**Learn Tab** (📖):
```markdown
# What is AI?

You've probably heard the term "AI" everywhere - in movies,
games, and the news. But what actually is it?

## AI vs Search Engines

When you search on Google, it finds web pages that match
your keywords. It's like a super-fast librarian.

When you talk to an AI like ChatGPT, it generates new text
based on patterns it learned. It's more like a conversation partner.

[Comparison diagram here]

## What is an LLM?

LLM stands for "Large Language Model" - the type of AI you'll
be working with in these labs...

[2-minute video explaining LLMs]

## Key Points
- AI creates new content, search finds existing content
- LLMs are trained on huge amounts of text
- Every response is generated fresh, not retrieved

Ready to try talking to an AI?
[Continue to Try It →]
```

**Try It Tab** (🎯):
```tsx
# Try It: Spot the Difference

Let's see if you can tell the difference between AI and search.

## Exercise 1.1

Look at these two responses to "Tell me about space":

Response A:
[Shows Google search results screenshot]

Response B:
[Shows LLM generated paragraph about space]

Which one came from an AI? Which came from a search engine?

[Radio buttons for student to choose]

[Check Answer button]

✅ Success Criteria:
- Identify which is AI-generated
- Explain one difference between them
```

### B. Workflow Builder Tutorial Script

**Section 6.2: Guided Tour**

```
Step 1: Welcome
  "Let's build your first AI workflow! I'll guide you through each step."
  [Next →]

Step 2: Add First Node
  Highlight: [+ Add Node] button
  Instruction: "Click the + button to add your first prompt node"
  Validation: Wait for user to click
  Disable: Everything except + button

Step 3: Name Your Node
  Highlight: Node title field
  Instruction: "Give your node a name, like 'Brainstorm Ideas'"
  Validation: Text entered

Step 4: Write Your Prompt
  Highlight: Prompt textarea
  Instruction: "Write a prompt like: 'Give me 5 creative story ideas'"
  Validation: Text entered

Step 5: Add Second Node
  Instruction: "Great! Now add another node to continue the workflow"
  Validation: Second node created

Step 6: Connect Nodes
  Highlight: First node's output handle
  Instruction: "Drag from this dot to connect it to your second node"
  Animation: Show dragging motion
  Validation: Connection created

Step 7: Run Workflow
  Highlight: [▶ Run] button
  Instruction: "Click Run to see your workflow in action!"
  Validation: Workflow executed

Step 8: See Results
  Show: Execution results panel
  Message: "Congratulations! You just built your first AI workflow!"
  [Continue to Section 6.3 →]
```

### C. Mobile Layout Considerations

**Desktop** (>768px):
```
┌─────────────────────────────────┐
│ Section 1.1: What is AI?        │
├─────────────────────────────────┤
│ [📖 Learn] [🎯 Try It]         │ ← Horizontal tabs
├─────────────────────────────────┤
│                                  │
│  Tab content here                │
│                                  │
└─────────────────────────────────┘
```

**Mobile** (<768px):
```
┌──────────────────────┐
│ Section 1.1          │
├──────────────────────┤
│ ▼ 📖 Learn           │ ← Accordion
│   Content here...    │
│                      │
├──────────────────────┤
│ ▶ 🎯 Try It          │ ← Collapsed
├──────────────────────┤
```

---

## Approval

**Stakeholders**:
- [ ] Product Manager
- [ ] Lead Developer
- [ ] UX Designer
- [ ] Content Creator
- [ ] Teacher Representative (if available)

**Estimated Budget**: 6-9 weeks developer time + 2-3 weeks content creation

**Target Launch**: [To be determined]

---

---

## CRITICAL LESSONS LEARNED (2025-01-20)

### Issue #1: What is NOT an Exercise

**Problem Discovered**: During code review of Lab 1, sections 1.2-1.4 were marked "complete" but had NO actual interactive exercises.

**What Was Wrong**:
```tsx
// WRONG - This is NOT an exercise!
export default function TryIt() {
  const [attemptCount, setAttemptCount] = useState(0)

  return (
    <div>
      <p>Try this prompt: "Write about healthy eating"</p>
      <p>Use the prompt editor below!</p>  {/* ← NO EDITOR EXISTS! */}
      <button onClick={() => setAttemptCount(prev => prev + 1)}>
        Submit  {/* ← FAKE BUTTON, DOESN'T DO ANYTHING */}
      </button>
      <p>Attempts: {attemptCount}</p>  {/* ← FAKE COUNTER */}
    </div>
  )
}
```

**What's Required**:
```tsx
// CORRECT - Real interactive exercise
export default function TryIt() {
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (prompt: string) => {
    setLoading(true)
    const result = await runPrompt({ prompt, labNumber: 1, exerciseId: '1.2' })
    setOutput(result.output)
    setLoading(false)
  }

  return (
    <div>
      <PromptEditor
        onSubmit={handleSubmit}
        initialValue="Write about healthy eating"
      />
      <LLMOutputDisplay
        content={output}
        loading={loading}
      />
    </div>
  )
}
```

**Key Differences**:
- ✅ Real PromptEditor component that students can type in
- ✅ Real runPrompt() server action that calls OpenAI API
- ✅ Real LLMOutputDisplay showing actual AI responses
- ✅ Students actually PRACTICE, not just READ instructions

### Issue #2: Performance - Database Migration Not Deployed

**Problem**: Page loads take 13+ seconds on first visit, 1.4s on navigation

**Root Cause**:
- `getLabProgress()` queries `section_progress` table
- Migration file exists but wasn't deployed to Supabase
- Query fails/times out on non-existent table

**Solution**:
1. Deploy migration: `supabase/migrations/20251020000000_section_progress.sql`
2. Verify table creation
3. Re-test load times (should be < 2s)

### Action Items

**Before Declaring Phase 2 Complete**:
- [ ] Add PromptEditor + runPrompt + LLMOutputDisplay to section 1.2
- [ ] Add PromptEditor + runPrompt + LLMOutputDisplay to section 1.3
- [ ] Add PromptEditor + runPrompt + LLMOutputDisplay to section 1.4
- [ ] Deploy database migration to production
- [ ] Verify load times < 2 seconds
- [ ] Test all exercises actually work with real AI responses

**Updated Definition of "Exercise Complete"**:
- ✅ PromptEditor component rendered
- ✅ runPrompt() server action integrated
- ✅ LLMOutputDisplay component showing responses
- ✅ Student can type prompt and get real AI response
- ✅ Feedback is based on actual student actions
- ❌ NO fake counters or static text pretending to be interactive

---

**Document End**
