import fs from 'fs/promises'
import path from 'path'

export interface LabContent {
  id: string
  mdx: string
  metadata: {
    title: string
    description: string
  }
}

/**
 * Get Lab content from MDX file
 *
 * @deprecated This function is no longer used for Labs 1-6.
 * All labs now use the micro-sections structure with Learn/Try It tabs.
 * This is kept for backwards compatibility or future non-section labs.
 *
 * @param labId - Lab identifier (e.g., 'lab1', 'lab2')
 * @returns Lab content with metadata
 */
export async function getLabContent(labId: string): Promise<LabContent | null> {
  const labsDir = path.join(process.cwd(), 'content', 'labs')
  const filePath = path.join(labsDir, `${labId}.mdx`)

  try {
    const source = await fs.readFile(filePath, 'utf8')

    // Simple metadata extraction (from first heading)
    const titleMatch = source.match(/^# (.+)$/m)
    const title = titleMatch ? titleMatch[1] : labId

    // Extract description from frontmatter or first paragraph
    const descMatch = source.match(/## 📖 Learning Objectives\n\n(.+?)\n/)
    const description = descMatch ? descMatch[1] : ''

    return {
      id: labId,
      mdx: source,
      metadata: {
        title,
        description
      }
    }
  } catch (error) {
    console.error(`Failed to load lab content: ${labId}`, error)
    return null
  }
}

/**
 * Get list of all available labs
 *
 * @deprecated This function is no longer used for Labs 1-6.
 * All labs now use the micro-sections structure.
 * This is kept for backwards compatibility or future non-section labs.
 */
export async function getAllLabs(): Promise<string[]> {
  const labsDir = path.join(process.cwd(), 'content', 'labs')

  try {
    const files = await fs.readdir(labsDir)
    return files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace('.mdx', ''))
      .sort()
  } catch (error) {
    console.error('Failed to list labs:', error)
    return []
  }
}
