'use client'

import { useState } from 'react'
import { PromptEditor } from '@/components/features/prompt-lab/PromptEditor'
import { LLMOutputDisplay } from '@/components/features/prompt-lab/LLMOutputDisplay'
import { runPrompt } from '@/lib/actions/prompt-lab'

export default function TestPromptPage() {
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean | null>(null)
  const [feedback, setFeedback] = useState('')
  const [latency, setLatency] = useState<number | null>(null)

  const handleSubmit = async (prompt: string) => {
    setLoading(true)
    setSuccess(null)
    setError(null)
    setOutput('')

    const result = await runPrompt({
      prompt,
      labNumber: 1,
      exerciseId: 'lab1-ex1'
    })

    if (result.success && result.output) {
      setOutput(result.output)
      setSuccess(result.passed || false)
      setFeedback(result.feedback || '')
      setLatency(result.latencyMs || null)
      setError(null)
    } else {
      setError(result.error || 'Unknown error')
      setSuccess(null)
    }

    setLoading(false)
  }

  return (
    <div className="container mx-auto p-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Prompt Lab 组件测试</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        测试 PromptEditor, LLMOutputDisplay, 和 runPrompt server action
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">练习: 让 AI 介绍猫的习性</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          尝试写一个 prompt，让 AI 专注于介绍猫的习性（而不是泛泛而谈）
        </p>

        <PromptEditor
          exerciseId="lab1-ex1"
          mode="editable"
          initialValue="告诉我关于猫的习性"
          onSubmit={handleSubmit}
        />

        <LLMOutputDisplay
          mode="live"
          content={output}
          loading={loading}
          error={error}
          success={success}
          feedback={feedback}
          showTokenCount
        />

        {latency !== null && (
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            响应时间: {latency}ms
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
        <h3 className="font-semibold mb-2">✅ Phase 2 组件验证</h3>
        <ul className="text-sm space-y-1">
          <li>✓ PromptEditor 渲染正常</li>
          <li>✓ LLMOutputDisplay 显示正常</li>
          <li>✓ runPrompt server action 集成</li>
          <li>✓ Success checker 规则生效</li>
          <li>✓ Rate limiting (30/hour)</li>
          <li>✓ 数据持久化到 prompt_lab_progress</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
        <h3 className="font-semibold mb-2">⚠️ 测试前确认</h3>
        <ul className="text-sm space-y-1">
          <li>• 已填入 OPENAI_API_KEY 到 .env</li>
          <li>• 已登录用户账户</li>
          <li>• Supabase 数据库已运行</li>
        </ul>
      </div>
    </div>
  )
}
