'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { WorkflowPlayer } from '@/components/features/workflow/WorkflowPlayer'
import { WorkflowBuilder } from '@/components/features/workflow/WorkflowBuilder'
import {
  STORY_CREATOR_TEMPLATE,
  HOMEWORK_HELPER_TEMPLATE,
  TRANSLATOR_TEMPLATE
} from '@/lib/workflow/templates'
import type { WorkflowConfig } from '@/lib/workflow/types'

export default function Lab6Page() {
  const [activeStage, setActiveStage] = useState<'1' | '2' | '3'>('1')
  const [selectedTemplate, setSelectedTemplate] = useState(STORY_CREATOR_TEMPLATE)

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b p-6">
        <h1 className="text-3xl font-bold mb-2">Lab 6: AI 工作流搭建</h1>
        <p className="text-gray-600">
          学习如何将复杂任务分解为简单步骤，构建自己的 AI 工作流
        </p>
      </div>

      {/* Stage Navigation */}
      <Tabs
        value={activeStage}
        onValueChange={value => setActiveStage(value as '1' | '2' | '3')}
        className="flex-1 flex flex-col"
      >
        <div className="bg-white border-b px-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="1" className="flex-1 max-w-xs">
              阶段 1: 观察工作流
            </TabsTrigger>
            <TabsTrigger value="2" className="flex-1 max-w-xs">
              阶段 2: 修改工作流
            </TabsTrigger>
            <TabsTrigger value="3" className="flex-1 max-w-xs">
              阶段 3: 创建工作流
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          {/* Stage 1: Observe */}
          <TabsContent value="1" className="h-full m-0 p-0">
            <div className="h-full flex flex-col">
              {/* Template Selector */}
              <div className="bg-white border-b p-4">
                <label className="text-sm font-medium mb-2 block">
                  选择预设工作流：
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedTemplate(STORY_CREATOR_TEMPLATE)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedTemplate.name === STORY_CREATOR_TEMPLATE.name
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">📖 故事创作助手</div>
                    <div className="text-xs text-gray-600">
                      把主题变成完整故事
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedTemplate(HOMEWORK_HELPER_TEMPLATE)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedTemplate.name === HOMEWORK_HELPER_TEMPLATE.name
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">📐 作业助手</div>
                    <div className="text-xs text-gray-600">
                      分析数学题思路
                    </div>
                  </button>
                  <button
                    onClick={() => setSelectedTemplate(TRANSLATOR_TEMPLATE)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedTemplate.name === TRANSLATOR_TEMPLATE.name
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">🌐 翻译润色器</div>
                    <div className="text-xs text-gray-600">
                      中文翻译并优化
                    </div>
                  </button>
                </div>
              </div>

              {/* Workflow Player */}
              <div className="flex-1">
                <WorkflowPlayer
                  key={selectedTemplate.name}
                  initialWorkflow={selectedTemplate.config}
                  editable={false}
                />
              </div>

              {/* Instructions */}
              <Card className="m-4 p-4 bg-blue-50 border-blue-200">
                <h3 className="font-semibold mb-2">📝 练习任务：</h3>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>用不同的主题运行工作流，观察每一步的输出</li>
                  <li>思考：步骤2从哪里获得输入？数据如何流动？</li>
                  <li>尝试理解每个步骤的作用</li>
                </ol>
              </Card>
            </div>
          </TabsContent>

          {/* Stage 2: Edit */}
          <TabsContent value="2" className="h-full m-0 p-0">
            <div className="h-full flex flex-col">
              {/* Template Selector */}
              <div className="bg-white border-b p-4">
                <label className="text-sm font-medium mb-2 block">
                  选择要编辑的工作流：
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedTemplate(STORY_CREATOR_TEMPLATE)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedTemplate.name === STORY_CREATOR_TEMPLATE.name
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">📖 故事创作助手</div>
                    <div className="text-xs text-gray-600">可编辑 Prompt</div>
                  </button>
                  <button
                    onClick={() => setSelectedTemplate(HOMEWORK_HELPER_TEMPLATE)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedTemplate.name === HOMEWORK_HELPER_TEMPLATE.name
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">📐 作业助手</div>
                    <div className="text-xs text-gray-600">可编辑 Prompt</div>
                  </button>
                  <button
                    onClick={() => setSelectedTemplate(TRANSLATOR_TEMPLATE)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedTemplate.name === TRANSLATOR_TEMPLATE.name
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">🌐 翻译润色器</div>
                    <div className="text-xs text-gray-600">可编辑 Prompt</div>
                  </button>
                </div>
              </div>

              {/* Editable Workflow Player */}
              <div className="flex-1">
                <WorkflowPlayer
                  key={`edit-${selectedTemplate.name}`}
                  initialWorkflow={selectedTemplate.config}
                  editable={true}
                />
              </div>

              {/* Instructions */}
              <Card className="m-4 p-4 bg-purple-50 border-purple-200">
                <h3 className="font-semibold mb-2">🎨 练习任务：</h3>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>
                    修改步骤1的 prompt，让创意更有科幻感（提示：加入"科幻"、"未来"等关键词）
                  </li>
                  <li>
                    修改步骤3的 prompt，让故事结尾有意外转折
                  </li>
                  <li>尝试修改语气：让整个故事变成诗歌形式</li>
                </ol>
              </Card>
            </div>
          </TabsContent>

          {/* Stage 3: Create */}
          <TabsContent value="3" className="h-full m-0 p-0">
            <div className="h-full flex flex-col">
              {/* Instructions Banner */}
              <Card className="m-4 mb-0 p-4 bg-green-50 border-green-200">
                <h3 className="font-semibold mb-2">🚀 挑战任务：</h3>
                <p className="text-sm mb-2">
                  从零开始搭建你自己的工作流！可以选择：
                </p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>作业助手 - 帮助分析题目并提供解题思路</li>
                  <li>翻译润色器 - 中文翻译成英文并逐步改进</li>
                  <li>自由创作 - 设计你自己的创意工作流！</li>
                </ul>
                <p className="text-sm mt-2 text-gray-700">
                  💡 记得至少包含：1个输入节点 + 至少1个AI步骤 + 1个输出节点
                </p>
              </Card>

              {/* Workflow Builder */}
              <div className="flex-1 min-h-0">
                <WorkflowBuilder />
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
