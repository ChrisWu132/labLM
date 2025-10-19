/**
 * Admin Panel Utility Functions
 */

/**
 * Generate a random join code in format: ABC-XYZ-2025
 * Format: [3 random letters]-[3 random letters]-[year]
 */
export function generateJoinCode(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const randomLetters = (count: number) =>
    Array.from({ length: count }, () => letters[Math.floor(Math.random() * letters.length)]).join('')

  const part1 = randomLetters(3)
  const part2 = randomLetters(3)
  const year = new Date().getFullYear()

  return `${part1}-${part2}-${year}`
}

/**
 * Validate join code format
 */
export function isValidJoinCode(code: string): boolean {
  // Format: ABC-XYZ-2025 (3 letters, hyphen, 3 letters, hyphen, 4 digits)
  const pattern = /^[A-Z]{3}-[A-Z]{3}-\d{4}$/
  return pattern.test(code)
}

/**
 * Format join code for display (ensures uppercase and proper formatting)
 */
export function formatJoinCode(code: string): string {
  return code.toUpperCase().trim()
}

/**
 * Calculate completion percentage
 */
export function calculateCompletionPercentage(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

/**
 * Format last activity time (e.g., "2 hours ago", "3 days ago")
 */
export function formatLastActivity(timestamp: string | null): string {
  if (!timestamp) return 'Never'

  const now = new Date()
  const then = new Date(timestamp)
  const diffMs = now.getTime() - then.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return `${weeks} week${weeks !== 1 ? 's' : ''} ago`
  }

  const months = Math.floor(diffDays / 30)
  return `${months} month${months !== 1 ? 's' : ''} ago`
}

/**
 * Generate CSV from student progress data
 */
export function generateProgressCSV(students: Array<{
  email: string
  labs_completed: number
  total_labs: number
  last_activity: string | null
}>): string {
  const headers = ['Email', 'Labs Completed', 'Total Labs', 'Completion %', 'Last Activity']
  const rows = students.map(student => [
    student.email,
    student.labs_completed.toString(),
    student.total_labs.toString(),
    `${calculateCompletionPercentage(student.labs_completed, student.total_labs)}%`,
    formatLastActivity(student.last_activity)
  ])

  return [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')
}

/**
 * Get current school year (e.g., "2024-2025")
 */
export function getCurrentSchoolYear(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1 // 0-indexed

  // School year starts in August (month 8)
  if (month >= 8) {
    return `${year}-${year + 1}`
  } else {
    return `${year - 1}-${year}`
  }
}
