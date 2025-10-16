import type { SuccessCriteria, SuccessRule } from '@/types/prompt-lab'

/**
 * Success Criteria Configuration for Each Exercise
 *
 * Define rules and passing scores for each exercise
 */
const exerciseCriteria: Record<string, SuccessCriteria> = {
  // Lab 1 Exercises
  'lab1-ex1': {
    exerciseId: 'lab1-ex1',
    rules: [
      { type: 'containsKeywords', value: ['habit', 'behavior', 'characteristic', 'like', 'love', 'prefer'] },
      { type: 'minLength', value: 50 }
    ],
    passingScore: 2
  },
  'lab1-ex2': {
    exerciseId: 'lab1-ex2',
    rules: [
      { type: 'containsKeywords', value: ['story', 'adventure', 'journey'] },
      { type: 'minLength', value: 100 }
    ],
    passingScore: 2
  },

  // Lab 2 Exercises
  'lab2-ex1': {
    exerciseId: 'lab2-ex1',
    rules: [
      { type: 'containsKeywords', value: ['beginner', 'programming', 'introduction', 'learn', 'start'] },
      { type: 'minLength', value: 80 }
    ],
    passingScore: 2
  },
  'lab2-ex2': {
    exerciseId: 'lab2-ex2',
    rules: [
      { type: 'containsKeywords', value: ['1.', '2.', '3.'] }, // Should have 3 points
      { type: 'minLength', value: 60 }
    ],
    passingScore: 2
  },
  'lab2-ex3': {
    exerciseId: 'lab2-ex3',
    rules: [
      { type: 'containsKeywords', value: ['title', 'author', 'year', 'genre'] },
      { type: 'containsKeywords', value: ['{', '}'] }, // JSON-like structure
      { type: 'minLength', value: 30 }
    ],
    passingScore: 3
  },

  // Lab 4 Exercises - Chain-of-Thought
  'lab4-ex1': {
    exerciseId: 'lab4-ex1',
    rules: [
      { type: 'containsKeywords', value: ['step', 'reasoning', 'explain', 'why', 'how'] },
      { type: 'containsKeywords', value: ['budget', 'cost', 'allocate', 'spend'] },
      { type: 'containsKeywords', value: ['Tokyo', 'trip', 'plan'] },
      { type: 'minLength', value: 100 }
    ],
    passingScore: 3
  },

  // Lab 5 Exercises - Comprehensive Challenge
  'lab5-ex1': {
    exerciseId: 'lab5-ex1',
    rules: [
      { type: 'containsKeywords', value: ['You are', 'Act as', 'role'] }, // Role assignment
      { type: 'containsKeywords', value: ['step', 'reasoning', 'explain', 'think'] }, // CoT
      { type: 'containsKeywords', value: ['Requirements:', 'Format:', 'Include:', '-', '1.', '2.'] }, // Specific requirements
      { type: 'minLength', value: 150 }
    ],
    passingScore: 3
  }
}

/**
 * Check if exercise submission passes success criteria
 */
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
    feedback = failedRules[0] || 'Output doesn\'t quite meet the requirements. Tip: Try making your prompt more specific.'
  }

  return { success, feedback }
}

/**
 * Check if a single rule passes
 */
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

/**
 * Get user-friendly feedback for a failed rule
 */
function getRuleFeedback(rule: SuccessRule): string {
  switch (rule.type) {
    case 'containsKeywords':
      return `Missing keywords in output. Try requesting: ${(rule.value as string[]).join(', ')}`

    case 'minLength':
      return `Output is too short. Try asking the AI for more detailed answers.`

    case 'maxLength':
      return `Output is too long. Try asking the AI to be more concise.`

    default:
      return 'Output does not meet requirements.'
  }
}
