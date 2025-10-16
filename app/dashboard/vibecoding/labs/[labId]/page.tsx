import { MDXRemote } from 'next-mdx-remote/rsc'
import { getLabContent } from '@/lib/lab-content'
import { notFound } from 'next/navigation'
import {
  InteractivePromptEditor,
  StaticPromptDemo
} from './_components/LabWrapper'

/**
 * MDX Components Mapping
 *
 * These components will be available in MDX files
 */
const components = {
  PromptEditor: InteractivePromptEditor,
  StaticPromptDemo
}

export default async function LabPage({
  params
}: {
  params: Promise<{ labId: string }>
}) {
  const { labId } = await params
  const labContent = await getLabContent(labId)

  if (!labContent) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <MDXRemote source={labContent.mdx} components={components} />
    </div>
  )
}

/**
 * Generate static params for all labs
 */
export async function generateStaticParams() {
  return [
    { labId: 'lab1' },
    { labId: 'lab2' },
    { labId: 'lab3' },
    { labId: 'lab4' },
    { labId: 'lab5' }
  ]
}
