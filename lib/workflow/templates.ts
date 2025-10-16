/**
 * Workflow Templates
 * Predefined workflow configurations for Stage 1+2
 */

import type { Workflow } from './types'

export const STORY_CREATOR_TEMPLATE: Workflow = {
  name: '故事创作助手',
  description: '把一个简单主题变成有趣的完整故事',
  is_template: true,
  is_public: true,
  template_category: 'story',
  config: {
    nodes: [
      {
        id: 'input-1',
        type: 'input',
        data: {
          label: '输入主题',
          placeholder: '输入一个主题，如：太空猫',
          value: ''
        },
        position: { x: 250, y: 0 }
      },
      {
        id: 'step-1',
        type: 'aiStep',
        data: {
          label: '生成创意',
          prompt: "根据主题'{输入}'，生成3个有趣的故事创意，每个用一句话描述",
          editable: true
        },
        position: { x: 250, y: 120 }
      },
      {
        id: 'step-2',
        type: 'aiStep',
        data: {
          label: '扩展大纲',
          prompt: "选择第一个创意，扩展成200字的故事大纲",
          editable: true
        },
        position: { x: 250, y: 240 }
      },
      {
        id: 'step-3',
        type: 'aiStep',
        data: {
          label: '添加细节',
          prompt: "根据大纲，添加生动的对话和细节描写，写成完整故事",
          editable: true
        },
        position: { x: 250, y: 360 }
      },
      {
        id: 'output-1',
        type: 'output',
        data: {
          label: '完整故事'
        },
        position: { x: 250, y: 480 }
      }
    ],
    edges: [
      { id: 'e1', source: 'input-1', target: 'step-1' },
      { id: 'e2', source: 'step-1', target: 'step-2' },
      { id: 'e3', source: 'step-2', target: 'step-3' },
      { id: 'e4', source: 'step-3', target: 'output-1' }
    ]
  }
}

export const HOMEWORK_HELPER_TEMPLATE: Workflow = {
  name: '作业助手',
  description: '帮助分析数学题，提供解题思路',
  is_template: true,
  is_public: true,
  template_category: 'homework',
  config: {
    nodes: [
      {
        id: 'input-1',
        type: 'input',
        data: {
          label: '输入数学题',
          placeholder: '输入你的数学题',
          value: ''
        },
        position: { x: 250, y: 0 }
      },
      {
        id: 'step-1',
        type: 'aiStep',
        data: {
          label: '分析题目',
          prompt: "分析这道题：'{输入}'，识别题目类型和考查的知识点",
          editable: true
        },
        position: { x: 250, y: 120 }
      },
      {
        id: 'step-2',
        type: 'aiStep',
        data: {
          label: '提供思路',
          prompt: "根据分析结果，给出解题思路（不直接给答案），引导学生思考",
          editable: true
        },
        position: { x: 250, y: 240 }
      },
      {
        id: 'step-3',
        type: 'aiStep',
        data: {
          label: '验证方法',
          prompt: "说明如何验证答案的正确性",
          editable: true
        },
        position: { x: 250, y: 360 }
      },
      {
        id: 'output-1',
        type: 'output',
        data: {
          label: '完整思路'
        },
        position: { x: 250, y: 480 }
      }
    ],
    edges: [
      { id: 'e1', source: 'input-1', target: 'step-1' },
      { id: 'e2', source: 'step-1', target: 'step-2' },
      { id: 'e3', source: 'step-2', target: 'step-3' },
      { id: 'e4', source: 'step-3', target: 'output-1' }
    ]
  }
}

export const TRANSLATOR_TEMPLATE: Workflow = {
  name: '翻译润色器',
  description: '中文翻译成英文，并逐步改进表达',
  is_template: true,
  is_public: true,
  template_category: 'translate',
  config: {
    nodes: [
      {
        id: 'input-1',
        type: 'input',
        data: {
          label: '输入中文',
          placeholder: '输入一段中文',
          value: ''
        },
        position: { x: 250, y: 0 }
      },
      {
        id: 'step-1',
        type: 'aiStep',
        data: {
          label: '翻译',
          prompt: "将这段中文翻译成英文：'{输入}'",
          editable: true
        },
        position: { x: 250, y: 120 }
      },
      {
        id: 'step-2',
        type: 'aiStep',
        data: {
          label: '检查语法',
          prompt: "检查这段英文的语法错误，并修正",
          editable: true
        },
        position: { x: 250, y: 240 }
      },
      {
        id: 'step-3',
        type: 'aiStep',
        data: {
          label: '提升表达',
          prompt: "让这段英文更地道、更流畅",
          editable: true
        },
        position: { x: 250, y: 360 }
      },
      {
        id: 'output-1',
        type: 'output',
        data: {
          label: '最终英文'
        },
        position: { x: 250, y: 480 }
      }
    ],
    edges: [
      { id: 'e1', source: 'input-1', target: 'step-1' },
      { id: 'e2', source: 'step-1', target: 'step-2' },
      { id: 'e3', source: 'step-2', target: 'step-3' },
      { id: 'e4', source: 'step-3', target: 'output-1' }
    ]
  }
}

export const WORKFLOW_TEMPLATES = [
  STORY_CREATOR_TEMPLATE,
  HOMEWORK_HELPER_TEMPLATE,
  TRANSLATOR_TEMPLATE
]
