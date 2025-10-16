'use client'

import { Handle, Position, type NodeProps } from 'reactflow'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export function InputNode({ data, selected }: NodeProps) {
  return (
    <div className="min-w-[280px]">
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-blue-500"
      />

      <Card
        className={cn(
          'border-2 transition-all',
          selected ? 'border-blue-500 shadow-lg' : 'border-blue-300',
          data.status === 'running' && 'animate-pulse',
          data.status === 'completed' && 'border-green-500'
        )}
      >
        {/* Header */}
        <div className="bg-blue-100 px-4 py-2 flex items-center gap-2 rounded-t-lg">
          <span className="text-2xl">📝</span>
          <span className="font-semibold text-blue-900">{data.label}</span>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <label className="text-sm text-gray-600">
            {data.placeholder || '输入内容'}
          </label>
          <Input
            value={data.value || ''}
            onChange={(e) => data.onChange?.(e.target.value)}
            placeholder={data.placeholder}
            readOnly={data.readonly}
            className="w-full"
          />
        </div>

        {/* Status */}
        {data.status === 'completed' && (
          <div className="px-4 py-2 text-sm text-green-600 border-t">
            ✓ 已输入
          </div>
        )}
      </Card>
    </div>
  )
}
