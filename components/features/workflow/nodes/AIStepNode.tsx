'use client'

import { Handle, Position, type NodeProps } from 'reactflow'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export function AIStepNode({ data, selected }: NodeProps) {
  const isEditing = data.editable && !data.readonly

  return (
    <div className="min-w-[320px]">
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-purple-500"
      />

      <Card
        className={cn(
          'border-2 transition-all',
          selected ? 'border-purple-500 shadow-lg' : 'border-purple-300',
          data.status === 'running' && 'border-purple-500 animate-pulse',
          data.status === 'completed' && 'border-green-500',
          data.status === 'error' && 'border-red-500'
        )}
      >
        {/* Header */}
        <div className="bg-purple-100 px-4 py-2 flex items-center gap-2 rounded-t-lg">
          <span className="text-2xl">🤖</span>
          <span className="font-semibold text-purple-900 flex-1">
            {data.label}
          </span>
          {isEditing && (
            <button className="text-sm text-purple-600 hover:text-purple-800">
              🔧
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Prompt */}
          <div>
            <label className="text-xs text-gray-600 font-medium">Prompt:</label>
            {isEditing ? (
              <Textarea
                value={data.prompt}
                onChange={(e) => data.onPromptChange?.(e.target.value)}
                rows={3}
                className="mt-1 text-sm font-mono resize-none"
              />
            ) : (
              <div className="mt-1 p-2 bg-gray-50 rounded text-sm font-mono text-gray-700 whitespace-pre-wrap">
                {data.prompt}
              </div>
            )}
          </div>

          {/* Output */}
          {data.output && (
            <div>
              <label className="text-xs text-gray-600 font-medium">💬 输出:</label>
              <div className="mt-1 p-3 bg-purple-50 rounded text-sm whitespace-pre-wrap max-h-48 overflow-y-auto">
                {data.output}
              </div>
            </div>
          )}
        </div>

        {/* Status */}
        {data.status === 'running' && (
          <div className="px-4 py-2 text-sm text-purple-600 border-t flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            正在思考...
          </div>
        )}

        {data.status === 'completed' && (
          <div className="px-4 py-2 text-sm text-green-600 border-t">
            ✓ 完成
          </div>
        )}

        {data.status === 'error' && (
          <div className="px-4 py-2 text-sm text-red-600 border-t">
            ⚠️ 出错了
          </div>
        )}
      </Card>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-purple-500"
      />
    </div>
  )
}
