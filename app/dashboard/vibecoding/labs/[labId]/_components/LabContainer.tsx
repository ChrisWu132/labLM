'use client'

import { useState } from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'

interface LabContainerProps {
  content: any
  components: any
}

export function LabContainer({ content, components }: LabContainerProps) {
  const [showCongratulations, setShowCongratulations] = useState(false)
  
  const enhancedComponents = {
    ...components,
    QuizCard: (props: any) => {
      const OriginalQuizCard = components.QuizCard
      return (
        <OriginalQuizCard 
          {...props} 
          onAllCompleted={() => setShowCongratulations(true)}
        />
      )
    },
    NextSteps: (props: any) => {
      const OriginalNextSteps = components.NextSteps
      
      // 如果Quiz没有完成，不显示NextSteps
      if (!showCongratulations) {
        return null
      }
      
      return (
        <div className="animate-fadeIn">
          <OriginalNextSteps {...props} />
        </div>
      )
    }
  }
  
  return (
    <div className="min-h-screen bg-[#F8F9FE]">
      <div className="container mx-auto px-6 md:px-8 py-12 max-w-6xl space-y-10">
        <MDXRemote source={content} components={enhancedComponents} />
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}