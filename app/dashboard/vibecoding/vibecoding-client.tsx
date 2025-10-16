"use client"

import { Code2 } from "lucide-react"

export function VibeCodingClient() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="border-b px-4 py-3 bg-muted/30">
        <div className="flex items-center gap-3">
          <Code2 className="w-5 h-5 text-primary" />
          <div>
            <h2 className="font-semibold">LLM Learning Lab - Prompt Engineering</h2>
            <p className="text-xs text-muted-foreground">
              Learn how to communicate with AI - Master Prompt Engineering in 2 hours
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Welcome to the Prompt Engineering Learning Platform!</h3>
            <p className="text-muted-foreground">
              Through 6 hands-on labs, you will learn how to effectively communicate with AI and write high-quality prompts.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border">
            <h4 className="font-semibold mb-3">🎯 Learning Objectives</h4>
            <ul className="space-y-2 text-sm">
              <li>✓ Understand what a Prompt is and its importance</li>
              <li>✓ Learn to write clear, specific instructions</li>
              <li>✓ Master role-playing and context-setting techniques</li>
              <li>✓ Use Chain-of-Thought to guide AI reasoning</li>
              <li>✓ Apply comprehensively to real scenarios</li>
              <li>✓ Build complex AI workflows by chaining steps together</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h5 className="font-semibold mb-2">⏱️ Duration</h5>
              <p className="text-2xl font-bold text-primary">~3 hours</p>
              <p className="text-xs text-muted-foreground mt-1">Average 15-60 minutes per lab</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h5 className="font-semibold mb-2">📊 Difficulty Level</h5>
              <p className="text-2xl font-bold text-primary">Beginner</p>
              <p className="text-xs text-muted-foreground mt-1">Suitable for middle school and above</p>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border">
            <h5 className="font-semibold mb-2">💡 Getting Started</h5>
            <p className="text-sm">
              Click <strong>Lab 1</strong> on the left to begin your Prompt Engineering learning journey! Each lab includes theoretical explanations and practical exercises.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
