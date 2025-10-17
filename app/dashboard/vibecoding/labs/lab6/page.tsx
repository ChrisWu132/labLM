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
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b p-6 shrink-0">
        <h1 className="text-3xl font-bold mb-2">Lab 6: AI Workflow Builder</h1>
        <p className="text-gray-600">
          Learn how to break down complex tasks into simple steps and build your own AI workflows
        </p>
      </div>

      {/* Stage Navigation */}
      <Tabs
        value={activeStage}
        onValueChange={value => setActiveStage(value as '1' | '2' | '3')}
        className="flex-1 flex flex-col overflow-hidden"
      >
        <div className="bg-white border-b px-6 shrink-0">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="1" className="flex-1 max-w-xs">
              Stage 1: Observe Workflows
            </TabsTrigger>
            <TabsTrigger value="2" className="flex-1 max-w-xs">
              Stage 2: Edit Workflows
            </TabsTrigger>
            <TabsTrigger value="3" className="flex-1 max-w-xs">
              Stage 3: Create Workflows
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          {/* Stage 1: Observe */}
          <TabsContent value="1" className="h-full m-0 p-0">
            <div className="h-full flex flex-col">
              {/* Template Selector */}
              <div className="bg-white border-b p-4 shrink-0">
                <label className="text-sm font-medium mb-2 block">
                  Select a preset workflow:
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
                    <div className="font-medium">📖 Story Creator</div>
                    <div className="text-xs text-gray-600">
                      Turn a topic into a full story
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
                    <div className="font-medium">📐 Homework Helper</div>
                    <div className="text-xs text-gray-600">
                      Analyze math problems
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
                    <div className="font-medium">🌐 Translator</div>
                    <div className="text-xs text-gray-600">
                      Translate and polish text
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
              <Card className="m-4 p-4 bg-blue-50 border-blue-200 shrink-0">
                <h3 className="font-semibold mb-2">📝 Practice Tasks:</h3>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>Run the workflow with different topics and observe each step's output</li>
                  <li>Think: Where does Step 2 get its input? How does data flow?</li>
                  <li>Try to understand the role of each step</li>
                </ol>
              </Card>
            </div>
          </TabsContent>

          {/* Stage 2: Edit */}
          <TabsContent value="2" className="h-full m-0 p-0">
            <div className="h-full flex flex-col">
              {/* Template Selector */}
              <div className="bg-white border-b p-4 shrink-0">
                <label className="text-sm font-medium mb-2 block">
                  Select a workflow to edit:
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
                    <div className="font-medium">📖 Story Creator</div>
                    <div className="text-xs text-gray-600">Editable Prompts</div>
                  </button>
                  <button
                    onClick={() => setSelectedTemplate(HOMEWORK_HELPER_TEMPLATE)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedTemplate.name === HOMEWORK_HELPER_TEMPLATE.name
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">📐 Homework Helper</div>
                    <div className="text-xs text-gray-600">Editable Prompts</div>
                  </button>
                  <button
                    onClick={() => setSelectedTemplate(TRANSLATOR_TEMPLATE)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedTemplate.name === TRANSLATOR_TEMPLATE.name
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">🌐 Translator</div>
                    <div className="text-xs text-gray-600">Editable Prompts</div>
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
              <Card className="m-4 p-4 bg-purple-50 border-purple-200 shrink-0">
                <h3 className="font-semibold mb-2">🎨 Practice Tasks:</h3>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>
                    Modify Step 1's prompt to make ideas more sci-fi (Hint: add "sci-fi", "future" keywords)
                  </li>
                  <li>
                    Modify Step 3's prompt to add a plot twist at the end
                  </li>
                  <li>Try changing the tone: transform the story into a poem</li>
                </ol>
              </Card>
            </div>
          </TabsContent>

          {/* Stage 3: Create */}
          <TabsContent value="3" className="h-full m-0 p-0">
            <div className="h-full flex flex-col">
              {/* Instructions Banner */}
              <Card className="m-4 mb-0 p-4 bg-green-50 border-green-200 shrink-0">
                <h3 className="font-semibold mb-2">🚀 Challenge Tasks:</h3>
                <p className="text-sm mb-2">
                  Build your own workflow from scratch! You can choose:
                </p>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Homework Helper - Analyze problems and provide solution steps</li>
                  <li>Translator - Translate and progressively improve text</li>
                  <li>Free Creation - Design your own creative workflow!</li>
                </ul>
                <p className="text-sm mt-2 text-gray-700">
                  💡 Remember to include at least: 1 input node + 1 AI step + 1 output node
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
