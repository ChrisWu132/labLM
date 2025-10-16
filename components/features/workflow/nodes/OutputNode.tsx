'use client'

import { useState } from 'react'
import { Handle, Position, type NodeProps } from 'reactflow'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Copy, Check } from 'lucide-react'

export function OutputNode({ data, selected }: NodeProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (data.result) {
      navigator.clipboard.writeText(data.result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-w-[280px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-green-500"
      />

      <Card
        className={cn(
          'border-2 transition-all',
          selected ? 'border-green-500 shadow-lg' : 'border-green-300',
          data.status === 'running' && 'animate-pulse',
          data.status === 'completed' && 'border-green-500'
        )}
      >
        {/* Header */}
        <div className="bg-green-100 px-4 py-2 flex items-center gap-2 rounded-t-lg">
          <span className="text-2xl">✅</span>
          <span className="font-semibold text-green-900">{data.label}</span>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <label className="text-xs text-gray-600 font-medium">
            📄 最终结果:
          </label>

          {data.result ? (
            <>
              <div className="p-3 bg-green-50 rounded text-sm whitespace-pre-wrap max-h-64 overflow-y-auto border border-green-200">
                {data.result}
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopy}
                  className="flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      已复制
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      复制
                    </>
                  )}
                </Button>

                {data.onSave && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={data.onSave}
                    className="flex items-center gap-1"
                  >
                    💾 保存
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div className="p-3 text-sm text-gray-400 italic border border-dashed border-gray-300 rounded">
              等待工作流执行...
            </div>
          )}
        </div>

        {/* Status */}
        {data.status === 'completed' && data.result && (
          <div className="px-4 py-2 text-sm text-green-600 border-t">
            ✓ 执行完成
          </div>
        )}
      </Card>
    </div>
  )
}
