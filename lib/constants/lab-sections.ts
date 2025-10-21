/**
 * Lab Sections Configuration
 *
 * Defines all micro-sections for each lab with Learn/Practice tab structure.
 * This configuration drives the section-based navigation and progress tracking.
 */

import type { LabSection } from '@/types/prompt-lab'

/**
 * Complete section configuration for all 6 labs
 *
 * Each lab is broken down into 5-8 minute micro-sections with:
 * - Learn tab: Theory and explanations (📖 Learn)
 * - Try It tab: Interactive exercises (🎯 Try It)
 * - Quiz tab: Review questions (✅ Quiz) - final section only
 */
export const LAB_SECTIONS: Record<number, LabSection[]> = {
  // Lab 1: Meet Your AI Friend (20 min → 5 sections)
  1: [
    {
      id: '1.1',
      labNumber: 1,
      order: 1,
      title: 'What is AI?',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '1.2',
      labNumber: 1,
      order: 2,
      title: 'Your First Prompt',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '1.3',
      labNumber: 1,
      order: 3,
      title: 'Why Different Answers?',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '1.4',
      labNumber: 1,
      order: 4,
      title: 'Experiment Time',
      estimatedMinutes: 7,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '1.5',
      labNumber: 1,
      order: 5,
      title: 'Review & Quiz',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Recap' },
        { id: 'quiz', type: 'quiz', label: '✅ Quiz' },
      ],
    },
  ],

  // Lab 2: How AI Gets Smart (25 min → 5 sections)
  2: [
    {
      id: '2.1',
      labNumber: 2,
      order: 1,
      title: 'How LLMs Learn',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '2.2',
      labNumber: 2,
      order: 2,
      title: 'Knowledge Sources',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '2.3',
      labNumber: 2,
      order: 3,
      title: 'Knowledge Cutoff',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '2.4',
      labNumber: 2,
      order: 4,
      title: 'Clear Communication',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '2.5',
      labNumber: 2,
      order: 5,
      title: 'Review & Quiz',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Recap' },
        { id: 'quiz', type: 'quiz', label: '✅ Quiz' },
      ],
    },
  ],

  // Lab 3: AI's Thinking Process (25 min → 5 sections)
  3: [
    {
      id: '3.1',
      labNumber: 3,
      order: 1,
      title: 'Token Generation',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '3.2',
      labNumber: 3,
      order: 2,
      title: 'Context Windows',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '3.3',
      labNumber: 3,
      order: 3,
      title: 'Role-Playing Basics',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '3.4',
      labNumber: 3,
      order: 4,
      title: 'Advanced Personas',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '3.5',
      labNumber: 3,
      order: 5,
      title: 'Review & Quiz',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Recap' },
        { id: 'quiz', type: 'quiz', label: '✅ Quiz' },
      ],
    },
  ],

  // Lab 4: AI's Capabilities & Limits (30 min → 6 sections)
  4: [
    {
      id: '4.1',
      labNumber: 4,
      order: 1,
      title: 'AI Superpowers',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '4.2',
      labNumber: 4,
      order: 2,
      title: 'AI Weaknesses',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '4.3',
      labNumber: 4,
      order: 3,
      title: 'Hallucinations',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '4.4',
      labNumber: 4,
      order: 4,
      title: 'Verification',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '4.5',
      labNumber: 4,
      order: 5,
      title: 'Chain-of-Thought',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '4.6',
      labNumber: 4,
      order: 6,
      title: 'Review & Quiz',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Recap' },
        { id: 'quiz', type: 'quiz', label: '✅ Quiz' },
      ],
    },
  ],

  // Lab 5: Responsible AI Use (30 min → 6 sections)
  5: [
    {
      id: '5.1',
      labNumber: 5,
      order: 1,
      title: 'AI Ethics',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '5.2',
      labNumber: 5,
      order: 2,
      title: 'Academic Integrity',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '5.3',
      labNumber: 5,
      order: 3,
      title: 'Privacy Protection',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '5.4',
      labNumber: 5,
      order: 4,
      title: 'Critical Thinking',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '5.5',
      labNumber: 5,
      order: 5,
      title: 'Multi-Step Workflow',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '5.6',
      labNumber: 5,
      order: 6,
      title: 'Review & Quiz',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Recap' },
        { id: 'quiz', type: 'quiz', label: '✅ Quiz' },
      ],
    },
  ],

  // Lab 6: AI Workflow Builder (60 min → 8 sections)
  6: [
    {
      id: '6.1',
      labNumber: 6,
      order: 1,
      title: 'Why Workflows?',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '6.2',
      labNumber: 6,
      order: 2,
      title: 'Guided Tour',
      estimatedMinutes: 10,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '6.3',
      labNumber: 6,
      order: 3,
      title: 'First Workflow',
      estimatedMinutes: 10,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '6.4',
      labNumber: 6,
      order: 4,
      title: 'Using Variables',
      estimatedMinutes: 10,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '6.5',
      labNumber: 6,
      order: 5,
      title: 'Rebuild Lab 5',
      estimatedMinutes: 10,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '6.6',
      labNumber: 6,
      order: 6,
      title: 'Customize Template',
      estimatedMinutes: 10,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '6.7',
      labNumber: 6,
      order: 7,
      title: 'Create Your Own',
      estimatedMinutes: 15,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Learn' },
        { id: 'tryIt', type: 'interactive', label: '🎯 Try It' },
      ],
    },
    {
      id: '6.8',
      labNumber: 6,
      order: 8,
      title: 'Review & Gallery',
      estimatedMinutes: 5,
      tabs: [
        { id: 'learn', type: 'content', label: '📖 Recap' },
        { id: 'quiz', type: 'quiz', label: '✅ Quiz' },
      ],
    },
  ],
}

/**
 * Get all sections for a specific lab
 */
export function getLabSections(labNumber: number): LabSection[] {
  return LAB_SECTIONS[labNumber] || []
}

/**
 * Get a specific section by ID
 */
export function getSection(sectionId: string): LabSection | undefined {
  const [labNum] = sectionId.split('.')
  const labNumber = parseInt(labNum, 10)
  const sections = LAB_SECTIONS[labNumber] || []
  return sections.find((s) => s.id === sectionId)
}

/**
 * Get the next section in the lab sequence
 */
export function getNextSection(currentSectionId: string): LabSection | null {
  const currentSection = getSection(currentSectionId)
  if (!currentSection) return null

  const labSections = getLabSections(currentSection.labNumber)
  const currentIndex = labSections.findIndex((s) => s.id === currentSectionId)

  if (currentIndex === -1 || currentIndex === labSections.length - 1) {
    return null // Last section or not found
  }

  return labSections[currentIndex + 1]
}

/**
 * Get the previous section in the lab sequence
 */
export function getPreviousSection(
  currentSectionId: string
): LabSection | null {
  const currentSection = getSection(currentSectionId)
  if (!currentSection) return null

  const labSections = getLabSections(currentSection.labNumber)
  const currentIndex = labSections.findIndex((s) => s.id === currentSectionId)

  if (currentIndex <= 0) {
    return null // First section or not found
  }

  return labSections[currentIndex - 1]
}

/**
 * Calculate total estimated time for a lab
 */
export function getLabTotalTime(labNumber: number): number {
  const sections = getLabSections(labNumber)
  return sections.reduce((total, section) => total + section.estimatedMinutes, 0)
}

/**
 * Get progress statistics for a lab
 */
export function calculateLabProgress(
  labNumber: number,
  completedSectionIds: string[]
): {
  totalSections: number
  completedSections: number
  percentComplete: number
  remainingMinutes: number
} {
  const sections = getLabSections(labNumber)
  const totalSections = sections.length
  const completedSections = completedSectionIds.length

  const remainingSections = sections.filter(
    (s) => !completedSectionIds.includes(s.id)
  )
  const remainingMinutes = remainingSections.reduce(
    (total, s) => total + s.estimatedMinutes,
    0
  )

  return {
    totalSections,
    completedSections,
    percentComplete:
      totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0,
    remainingMinutes,
  }
}
