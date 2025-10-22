# Remaining Lab Section Files - Creation Guide

## Status: IN PROGRESS

### Completed Lab 3 (10 files total) ✓
- [x] Section 3.1: try-it.tsx
- [x] Section 3.2: learn.tsx, try-it.tsx
- [x] Section 3.3: learn.tsx, try-it.tsx
- [x] Section 3.4: learn.tsx, try-it.tsx
- [x] Section 3.5: learn.tsx, quiz.tsx

### Lab 4 Progress (12 files total)
- [x] Section 4.1: learn.tsx, try-it.tsx (2/12)
- [x] Section 4.2: learn.tsx, try-it.tsx (4/12)
- [x] Section 4.3: learn.tsx (5/12)
- [ ] Section 4.3: try-it.tsx
- [ ] Section 4.4: learn.tsx, try-it.tsx (Verification techniques)
- [ ] Section 4.5: learn.tsx, try-it.tsx (Chain-of-Thought)
- [ ] Section 4.6: learn.tsx, quiz.tsx (Review & Quiz)

### Lab 5 To Do (12 files total)
- [ ] Section 5.1: learn.tsx, try-it.tsx (AI Ethics)
- [ ] Section 5.2: learn.tsx, try-it.tsx (Academic Integrity)
- [ ] Section 5.3: learn.tsx, try-it.tsx (Privacy Protection)
- [ ] Section 5.4: learn.tsx, try-it.tsx (Critical Thinking)
- [ ] Section 5.5: learn.tsx, try-it.tsx (Multi-Step Workflow)
- [ ] Section 5.6: learn.tsx, quiz.tsx (Review & Quiz)

## Content Source Files
- Lab 3: C:\Users\Haipeng Wu\Desktop\vibecodestudy\content\labs\lab3.mdx
- Lab 4: C:\Users\Haipeng Wu\Desktop\vibecodestudy\content\labs\lab4.mdx
- Lab 5: C:\Users\Haipeng Wu\Desktop\vibecodestudy\content\labs\lab5.mdx

## File Structure Pattern

### learn.tsx Template:
```typescript
/**
 * Lab X, Section X.X: [Title]
 * Learn Tab Content
 */

import { LearnContent } from '@/components/features/lab-sections'

export default function Learn() {
  return (
    <LearnContent previousSummary="[Summary of previous section]">
      {/* Content from MDX file, structured with:
        - h2 main title
        - h3 subsections
        - div components for callouts (bg-white, bg-yellow-50, etc.)
        - tables, lists, code examples
      */}
    </LearnContent>
  )
}
```

### try-it.tsx Template:
```typescript
'use client'

/**
 * Lab X, Section X.X: [Title]
 * Try It Tab Content
 */

import { useState } from 'react'
import { TryItContent } from '@/components/features/lab-sections'
import { PromptEditor } from '@/components/features/prompt-lab/PromptEditor'
import { LLMOutputDisplay } from '@/components/features/prompt-lab/LLMOutputDisplay'
import { runPrompt } from '@/lib/actions/prompt-lab'

export default function TryIt() {
  const [output, setOutput] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [attemptCount, setAttemptCount] = useState(0)

  const handleSubmit = async (prompt: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await runPrompt({
        prompt,
        labNumber: X,
        exerciseId: 'X.X-ex1',
      })

      if (result.success && result.output) {
        setOutput(result.output)
        setAttemptCount((prev) => prev + 1)
      } else {
        setError(result.error || 'Failed to run prompt')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <TryItContent
      instructions="[Exercise instructions]"
      showSuccessMessage={attemptCount >= 2}
      successMessage="[Success message]"
    >
      <div className="space-y-6">
        {/* Exercise content with PromptEditor and LLMOutputDisplay */}
      </div>
    </TryItContent>
  )
}
```

### quiz.tsx Template:
```typescript
'use client'

/**
 * Lab X, Section X.X: Review & Quiz
 * Quiz Tab Content
 */

import { useState } from 'react'
import { TryItContent } from '@/components/features/lab-sections'

export default function Quiz() {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)

  const questions = [
    // 5-8 questions with id, question, options, correct answer
  ]

  // Standard quiz logic (see Lab 1 or Lab 3 quiz for reference)

  return (
    <TryItContent exerciseId="labX-quiz">
      {/* Quiz UI */}
    </TryItContent>
  )
}
```

## Content Mapping

### Lab 4 Sections:
1. **4.1 AI Superpowers** ✓ (Writing, explanation, summarization, translation, brainstorming)
2. **4.2 AI Weaknesses** ✓ (Math, current events, facts, reasoning, personal knowledge)
3. **4.3 Hallucinations** (Partial - needs try-it.tsx) (What they are, why they happen, how to avoid)
4. **4.4 Verification** (How to check AI outputs, cross-referencing, critical evaluation)
5. **4.5 Chain-of-Thought** ("Let's think step by step", structured reasoning, debugging)
6. **4.6 Review & Quiz** (Summary of Lab 4, 8-question quiz)

### Lab 5 Sections:
1. **5.1 AI Ethics** (Responsible use, when to use AI, ethical considerations)
2. **5.2 Academic Integrity** (Learning vs cheating, good vs bad AI use for schoolwork)
3. **5.3 Privacy Protection** (What not to share, staying safe online)
4. **5.4 Critical Thinking** (Evaluating AI outputs, fact-checking, skepticism)
5. **5.5 Multi-Step Workflow** (Combining all techniques, real-world scenarios)
6. **5.6 Review & Quiz** (Summary of entire course, 10-question final quiz)

## Key Requirements for All Files:
1. Real interactive exercises with PromptEditor
2. runPrompt() server action integration
3. LLMOutputDisplay for showing results
4. Attempt tracking and progressive feedback
5. Clear instructions and success messages
6. Educational content extracted from MDX files
7. Consistent styling (Tailwind classes matching existing files)
8. Component structure following Lab 1 and Lab 2 patterns

## Next Steps:
1. Complete Lab 4 remaining files (7 files)
2. Create all Lab 5 files (12 files)
3. Test all exercises for functionality
4. Verify content quality and educational value
5. Ensure all paths and exerciseIds are correct

## File Paths:
- Lab 4: C:\Users\Haipeng Wu\Desktop\vibecodestudy\content\labs\lab4\section-4-{X}\{learn|try-it|quiz}.tsx
- Lab 5: C:\Users\Haipeng Wu\Desktop\vibecodestudy\content\labs\lab5\section-5-{X}\{learn|try-it|quiz}.tsx
