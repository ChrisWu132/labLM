'use client'

import { EnhancedWorkflowBuilder } from '@/components/features/workflow/EnhancedWorkflowBuilder'

export default function Lab6Page() {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b p-6 shrink-0">
        <h1 className="text-3xl font-bold mb-2">Lab 6: AI Workflow Builder</h1>
        <p className="text-gray-600">
          Learn how to break down complex tasks into simple steps and build your own AI workflows
        </p>
      </div>

      {/* Workflow Builder */}
      <div className="flex-1 overflow-auto">
        <EnhancedWorkflowBuilder />
      </div>
    </div>
  )
}
