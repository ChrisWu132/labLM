'use client'

import React, { useState } from 'react'

/**
 * Special card components for Labs MDX content
 * These match the UI spec from the HTML mock
 */

interface ObjectivesCardProps {
  children: React.ReactNode
  duration?: string
}

export function ObjectivesCard({ children, duration }: ObjectivesCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-100 border-t-4 p-8 mb-16" style={{borderTopColor: '#3b999c'}}>
      <h2 className="!mt-0 text-2xl md:text-3xl flex items-center gap-3 font-extrabold mb-6" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>
        Learning Objectives
      </h2>
      <div className="space-y-4 text-base md:text-lg" style={{color: '#3f3f3f'}}>{children}</div>
      {duration && (
        <div className="mt-6 px-4 py-2 rounded-full text-sm font-medium text-white shadow-sm" style={{backgroundColor: '#f7aa37'}}>
          Duration: {duration}
        </div>
      )}
    </div>
  )
}

// 专门的表格组件
interface TableCardProps {
  children: React.ReactNode
  title?: string
}

export function TableCard({ children, title }: TableCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-100 border-t-4 p-8 mb-16" style={{borderTopColor: '#3b999c'}}>
      {title && (
        <h3 className="!mt-0 text-xl md:text-2xl font-bold mb-6" style={{color: '#164055'}}>{title}</h3>
      )}
      <div className="overflow-hidden">
        <table className="w-full border-collapse border border-slate-200 rounded-lg overflow-hidden">
          {children}
        </table>
      </div>
    </div>
  )
}

interface ExperimentBlockProps {
  children: React.ReactNode
  title?: string
  icon?: string
}

export function ExperimentBlock({ children, title, icon = "" }: ExperimentBlockProps) {
  return (
    <div className="mt-16 rounded-3xl p-8 border-2" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
      {title && (
        <h3 className="!mt-0 flex items-center gap-3 text-2xl md:text-3xl font-bold mb-6" style={{color: '#164055'}}>
          {title}
        </h3>
      )}
      <div className="space-y-6 text-base md:text-lg" style={{color: '#3f3f3f'}}>{children}</div>
    </div>
  )
}

interface ExerciseBlockProps {
  children: React.ReactNode
  title?: string
  number?: number
}

export function ExerciseBlock({ children, title, number }: ExerciseBlockProps) {
  const displayTitle = title || (number ? `Exercise ${number}` : "Exercise")
  return (
    <div className="mt-16 rounded-3xl p-8 border-2" style={{backgroundColor: '#3b999c20', borderColor: '#3b999c40'}}>
      <h3 className="!mt-0 flex items-center gap-3 text-2xl md:text-3xl font-bold mb-6" style={{color: '#164055'}}>
        {displayTitle}
      </h3>
      <div className="space-y-6 text-base md:text-lg" style={{color: '#3f3f3f'}}>{children}</div>
    </div>
  )
}

interface DiscoveriesCardProps {
  children: React.ReactNode
}

export function DiscoveriesCard({ children }: DiscoveriesCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-100 border-t-4 p-8 my-20" style={{borderTopColor: '#3b999c'}}>
      <h2 className="!mt-0 text-2xl md:text-3xl flex items-center gap-3 font-extrabold mb-6" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>
        Key Discoveries
      </h2>
      <div className="space-y-4 text-base md:text-lg" style={{color: '#3f3f3f'}}>{children}</div>
    </div>
  )
}

interface QuizCardProps {
  children: React.ReactNode
  onAllCompleted?: () => void
}

export function QuizCard({ children, onAllCompleted }: QuizCardProps) {
  const [completedItems, setCompletedItems] = useState<Set<number>>(new Set())
  
  // 获取子组件数量
  const totalItems = React.Children.count(children)
  
  const handleItemComplete = (index: number, isCompleted: boolean) => {
    setCompletedItems(prev => {
      const newSet = new Set(prev)
      if (isCompleted) {
        newSet.add(index)
      } else {
        newSet.delete(index)
      }
      
      // 检查是否所有项目都完成了
      if (newSet.size === totalItems && onAllCompleted) {
        setTimeout(() => onAllCompleted(), 500) // 延迟一点显示动画
      }
      
      return newSet
    })
  }
  
  return (
    <div className="bg-white rounded-3xl shadow-lg border-2 border-slate-100 border-t-4 p-8 my-20" style={{borderTopColor: '#3b999c'}}>
      <h2 className="!mt-0 text-2xl md:text-3xl flex items-center gap-3 font-extrabold mb-6" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>
        Quick Quiz
        {completedItems.size === totalItems && totalItems > 0 && (
          <div className="ml-2 w-8 h-8 rounded-full flex items-center justify-center animate-bounce" style={{backgroundColor: '#3b999c'}}>
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </h2>
      <p className="mb-8 text-base md:text-lg" style={{color: '#3f3f3f'}}>
        Before moving on, make sure you understand: 
        <span className="ml-2 font-medium" style={{color: '#3b999c'}}>
          ({completedItems.size}/{totalItems} completed)
        </span>
      </p>
      <ul className="!list-none !pl-0 space-y-6">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { 
              key: index,
              index, 
              onToggle: handleItemComplete 
            } as any)
          }
          return child
        })}
      </ul>
    </div>
  )
}

interface QuizItemProps {
  children: React.ReactNode
  index?: number
  onToggle?: (index: number, isCompleted: boolean) => void
}

export function QuizItem({ children, index, onToggle }: QuizItemProps) {
  const [isChecked, setIsChecked] = useState(false)
  
  const handleToggle = () => {
    const newState = !isChecked
    setIsChecked(newState)
    if (onToggle && typeof index === 'number') {
      onToggle(index, newState)
    }
  }
  
  return (
    <li className="flex items-start gap-4">
      <button 
        onClick={handleToggle}
        className={`w-5 h-5 border-2 rounded-md flex-shrink-0 mt-1 transition-all duration-200 ${
          isChecked 
            ? 'text-white scale-110' 
            : 'border-slate-300 hover:scale-105'
        }`}
        style={isChecked ? {backgroundColor: '#3b999c', borderColor: '#3b999c'} : {borderColor: 'hover:#3b999c'}}
      >
        {isChecked && (
          <svg className="w-3 h-3 mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>
      <span className={`text-base md:text-lg transition-colors duration-200 ${
        isChecked ? 'line-through' : ''
      }`}
      style={{color: isChecked ? '#999' : '#3f3f3f'}}>
        {children}
      </span>
    </li>
  )
}

interface NextStepsProps {
  children: React.ReactNode
  href?: string
}

export function NextSteps({ children, href }: NextStepsProps) {
  return (
    <div className="relative rounded-3xl p-12 my-24 text-center overflow-hidden" style={{background: 'linear-gradient(135deg, #3b999c, #2d7a7c)'}}>
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        {/* 成功图标 */}
        <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        
        <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">Congratulations! 🎉</h2>
        
        <div className="bg-white/10 rounded-2xl p-6 mb-8 backdrop-blur-sm">
          <h3 className="text-white font-bold text-xl mb-4">What You've Achieved:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/90 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Understanding LLMs</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>Writing Clear Prompts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>AI Best Practices</span>
            </div>
          </div>
        </div>
        
        <div className="text-lg md:text-xl text-white/90 space-y-4 mb-8">{children}</div>
        
        {href && (
          <a
            href={href}
            className="inline-flex items-center gap-3 bg-white font-bold text-lg py-4 px-8 rounded-full transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1 active:scale-95 shadow-lg hover:shadow-xl"
            style={{color: '#3b999c'}}
          >
            <span>Continue Your Journey</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}

interface PromptComparisonProps {
  badPrompt: string
  badOutput: string
  goodPrompt: string
  goodOutput: string
}

export function PromptComparison({ badPrompt, badOutput, goodPrompt, goodOutput }: PromptComparisonProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 my-8">
      <div>
        <p className="font-semibold mb-4 text-base md:text-lg" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>❌ Bad Prompt (vague):</p>
        <div className="bg-slate-200/50 p-4 rounded-xl border border-slate-300 text-sm md:text-base mb-4" style={{color: '#3f3f3f'}}>
          {badPrompt}
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-sm md:text-base" style={{color: '#3f3f3f'}}>
          {badOutput}
        </div>
      </div>
      <div>
        <p className="font-semibold mb-4 text-base md:text-lg" style={{color: '#164055', fontFamily: 'Comic Sans MS, cursive, sans-serif'}}>✅ Good Prompt (specific):</p>
        <div className="bg-slate-200/50 p-4 rounded-xl border border-slate-300 text-sm md:text-base mb-4" style={{color: '#3f3f3f'}}>
          {goodPrompt}
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-sm md:text-base" style={{color: '#3f3f3f'}}>
          {goodOutput}
        </div>
      </div>
    </div>
  )
}
