import { MDXRemote } from 'next-mdx-remote/rsc'
import { getLabContent } from '@/lib/lab-content'
import { notFound } from 'next/navigation'
import { LabContainer } from './_components/LabContainer'
import { Lab1Interactive } from './_components/Lab1Interactive'
import { Lab2Interactive } from './_components/Lab2Interactive'
import { Lab3Interactive } from './_components/Lab3Interactive'
import { Lab4Interactive } from './_components/Lab4Interactive'
import { Lab5Interactive } from './_components/Lab5Interactive'
import {
  InteractivePromptEditor,
  StaticPromptDemo
} from './_components/LabWrapper'
import {
  ObjectivesCard,
  ExperimentBlock,
  ExerciseBlock,
  DiscoveriesCard,
  QuizCard,
  QuizItem,
  NextSteps,
  PromptComparison,
  TableCard
} from './_components/LabCards'

/**
 * MDX Components Mapping
 *
 * These components will be available in MDX files
 */
// Styled primitives for MDX content
function StyledLink(props: any) {
  const { children, href, ...rest } = props
  const text = typeof children === 'string' ? children : ''
  const looksLikeCta = /Start|Next|Continue|Ready|→/i.test(text)
  const base = looksLikeCta
    ? 'inline-flex items-center gap-1 px-4 py-2 rounded-2xl bg-[#3A7BFA] text-white hover:brightness-105 transition'
    : 'text-[#3A7BFA] underline underline-offset-4 hover:opacity-90'
  return (
    <a href={href} className={base} {...rest}>
      {children}
    </a>
  )
}

function StyledTable(props: any) {
  return (
    <div className="my-8 overflow-x-auto rounded-2xl border-2 border-slate-200 shadow-sm bg-white">
      <table className="w-full text-left border-collapse">
        {props.children}
      </table>
    </div>
  )
}

function StyledThead(props: any) {
  return <thead style={{backgroundColor: '#f7aa37'}} {...props} />
}
function StyledTr(props: any) { 
  return <tr className="border-t border-slate-200" {...props} /> 
}
function StyledTh(props: any) { 
  return <th className="px-6 py-4 font-semibold text-slate-700 text-left" {...props} /> 
}
function StyledTd(props: any) { 
  return <td className="px-6 py-4 text-slate-600 align-top border-t border-slate-100" {...props} /> 
}

function StyledH1(props: any) {
  return <h1 className="text-4xl md:text-5xl font-bold mb-8" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}} {...props} />
}
function StyledH2(props: any) {
  return <h2 className="text-2xl md:text-3xl mt-16 mb-8 font-bold" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}} {...props} />
}
function StyledH3(props: any) {
  return <h3 className="text-xl md:text-2xl mt-12 mb-6 font-bold" style={{color: '#164055'}} {...props} />
}
function StyledP(props: any) {
  return <p className="text-base md:text-lg leading-7 md:leading-8 mb-6" style={{color: '#3f3f3f'}} {...props} />
}
function StyledUl(props: any) {
  return <ul className="list-disc pl-6 space-y-3 text-base md:text-lg mb-6" style={{color: '#3f3f3f'}} {...props} />
}
function StyledOl(props: any) {
  return <ol className="list-decimal pl-6 space-y-3 text-base md:text-lg mb-6" style={{color: '#3f3f3f'}} {...props} />
}
function StyledStrong(props: any) {
  return <strong className="font-semibold" style={{color: '#164055'}} {...props} />
}
function StyledHr(props: any) {
  return <hr className="my-12 border-t-2 border-slate-200/80" {...props} />
}
function StyledBlockquote(props: any) {
  return (
    <blockquote className="border-l-4 border-slate-300 pl-4 italic text-slate-700" {...props} />
  )
}
function StyledPre(props: any) {
  return (
    <pre className="bg-slate-900 text-slate-100 rounded-2xl p-4 overflow-auto my-4" {...props} />
  )
}
function StyledCode(props: any) {
  return <code className="bg-slate-100 rounded px-1.5 py-0.5 text-slate-800" {...props} />
}

const components = {
  PromptEditor: InteractivePromptEditor,
  StaticPromptDemo,
  ObjectivesCard,
  ExperimentBlock,
  ExerciseBlock,
  DiscoveriesCard,
  QuizCard,
  QuizItem,
  NextSteps,
  PromptComparison,
  TableCard,
  a: StyledLink,
  table: StyledTable,
  thead: StyledThead,
  tr: StyledTr,
  th: StyledTh,
  td: StyledTd,
  h1: StyledH1,
  h2: StyledH2,
  h3: StyledH3,
  p: StyledP,
  ul: StyledUl,
  ol: StyledOl,
  strong: StyledStrong,
  hr: StyledHr,
  blockquote: StyledBlockquote,
  pre: StyledPre,
  code: StyledCode,
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

  // 如果是lab1或lab2，使用完全交互式的组件
  if (labId === 'lab1') {
    return (
      <div className="flex flex-col h-full overflow-hidden bg-[#F8F9FE]">
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 md:px-8 py-12 md:py-20 max-w-6xl">
            <Lab1Interactive />
          </div>
        </div>
      </div>
    )
  }

  if (labId === 'lab2') {
    return (
      <div className="flex flex-col h-full overflow-hidden bg-[#F8F9FE]">
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 md:px-8 py-12 md:py-20 max-w-6xl">
            <Lab2Interactive />
          </div>
        </div>
      </div>
    )
  }

  if (labId === 'lab3') {
    return (
      <div className="flex flex-col h-full overflow-hidden bg-[#F8F9FE]">
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 md:px-8 py-12 md:py-20 max-w-6xl">
            <Lab3Interactive />
          </div>
        </div>
      </div>
    )
  }

  if (labId === 'lab4') {
    return (
      <div className="flex flex-col h-full overflow-hidden bg-[#F8F9FE]">
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 md:px-8 py-12 md:py-20 max-w-6xl">
            <Lab4Interactive />
          </div>
        </div>
      </div>
    )
  }

  if (labId === 'lab5') {
    return (
      <div className="flex flex-col h-full overflow-hidden bg-[#F8F9FE]">
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 md:px-8 py-12 md:py-20 max-w-6xl">
            <Lab5Interactive />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#F8F9FE]">
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 md:px-8 py-12 md:py-20 max-w-6xl">
          <div className="border-2 rounded-3xl p-8 space-y-10" style={{borderColor: '#3b999c40', backgroundColor: 'rgba(59, 153, 156, 0.02)'}}>
            <MDXRemote source={labContent.mdx} components={components} />
          </div>
        </div>
      </div>
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
