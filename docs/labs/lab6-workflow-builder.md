# Lab 6: AI 工作流搭建 - 详细设计文档

## 📋 文档概览

**文档版本**: 1.0
**创建日期**: 2025-10-16
**状态**: 设计阶段
**Lab 类型**: 进阶实验（毕业项目）

---

## 🎯 Lab 定位

### 在课程中的位置
- **前置 Labs**: Lab 1-5（基础 prompt engineering）
- **定位**: 进阶"毕业项目"，综合应用前面学到的所有技能
- **难度**: ⭐⭐⭐⭐（4星，最高难度）
- **时长**: 60 分钟

### 学习目标

**核心目标**:
1. 理解"复杂任务 = 简单步骤的组合"
2. 学会分解问题（decomposition）
3. 掌握 prompt 链接（prompt chaining）
4. 培养计算思维

**技能目标**:
- ✅ 能够观察和理解工作流运行过程
- ✅ 能够修改现有工作流的 prompts
- ✅ 能够从零搭建自己的工作流
- ✅ 理解数据如何在步骤间流动

**认知目标**:
- 理解"模块化思维"
- 理解"顺序执行"的概念
- 理解"输入-处理-输出"模式
- 培养系统性思考能力

---

## 📚 Lab 内容结构

### 三个递进阶段

#### 阶段 1: 观察工作流（15分钟）

**目标**: 让学生理解工作流的基本概念

**学生体验**:
1. 看到预设的"故事创作助手"工作流
2. 输入一个主题（如"太空猫"）
3. 点击"运行"，观察每个步骤如何执行
4. 看到数据如何从一步传到下一步
5. 最终得到完整的故事输出

**预设工作流: 故事创作助手**

```yaml
名称: 故事创作助手
描述: 把一个简单主题变成有趣的故事

步骤:
  - id: step1
    名称: 生成创意
    prompt: "根据主题'{输入}'，生成3个有趣的故事创意，每个用一句话描述"

  - id: step2
    名称: 扩展大纲
    prompt: "选择第一个创意：'{step1的输出第一行}'，扩展成200字的故事大纲"

  - id: step3
    名称: 添加细节
    prompt: "根据大纲：'{step2的输出}'，添加生动的对话和细节描写，写成完整故事"

输出: step3 的结果
```

**UI 设计**:
- 单列布局，垂直流程图
- 每个步骤显示为卡片
- 执行时实时更新输出
- 完成后高亮最终结果

**教学辅助**:
- 工作流旁边有"💡 解释"按钮
- 点击后显示每一步的作用
- 高亮"变量替换"部分（如 `{输入}` → 实际值）

**练习题**:
- ✏️ 练习1: 用不同主题运行工作流（如"机器人"、"恐龙"）
- ✏️ 练习2: 观察并回答问题："步骤2从哪里获得输入？"
- ✏️ 练习3: 说说每一步的作用是什么

---

#### 阶段 2: 修改工作流（20分钟）

**目标**: 让学生理解如何调整工作流行为

**学生体验**:
1. 看到同一个"故事创作助手"
2. 可以点击某个步骤的"🔧 编辑"按钮
3. 修改该步骤的 prompt
4. 重新运行，观察输出变化
5. 理解 prompt 如何影响结果

**可编辑的元素**:
- ✅ 每个步骤的 prompt 文本
- ✅ 步骤的名称/标题
- ❌ 不能改步骤数量（降低复杂度）
- ❌ 不能改步骤顺序

**练习题**:

**练习1: 让创意更科幻**
```
任务: 修改步骤1的 prompt，让生成的创意更有科幻感

原 prompt: "根据主题'{输入}'，生成3个有趣的故事创意"
你的修改: _______________________

成功标准:
- 输出包含"太空"、"未来"、"科技"等关键词之一
- 生成了3个创意
```

**练习2: 添加转折**
```
任务: 修改步骤3的 prompt，让故事结尾有意外转折

提示: 可以在 prompt 末尾加上"在结尾加一个意外的转折"

成功标准:
- 故事有明显的转折点
- 转折符合故事主题
```

**练习3: 改变语气**
```
任务: 让整个故事变成诗歌形式

提示: 修改步骤3的 prompt
你可以改成: "根据大纲'{step2的输出}'，写成一首押韵的诗歌"

成功标准:
- 输出是诗歌格式
- 有押韵
```

**教学辅助**:
- 每个练习有"💡 提示"按钮（卡住时点击）
- "↩️ 恢复默认"按钮（可以重置）
- 实时预览修改效果

---

#### 阶段 3: 自由创建（25分钟）

**目标**: 让学生独立设计和搭建工作流

**学生体验**:
1. 看到空白画布
2. 从工具箱拖拽节点到画布
3. 连接节点形成流程
4. 配置每个节点的 prompt
5. 测试运行工作流
6. 保存作品

**工具箱节点类型**:
```
📦 可用组件:

🎯 输入节点
   - 让用户输入内容作为起点
   - 例如: 输入一个数学题、输入一段中文

🤖 AI 步骤节点
   - 让 AI 处理数据
   - 需要配置 prompt
   - 可以引用前面步骤的输出

📤 输出节点
   - 显示最终结果
   - 工作流的终点
```

**挑战任务（3选1）**:

**任务 A: 作业助手**
```
目标: 搭建一个帮助分析数学题的工作流

建议步骤:
1. 输入: 数学题目
2. 步骤1: 分析题目，识别考点
3. 步骤2: 提供解题思路（不直接给答案）
4. 步骤3: 给出验证方法
5. 输出: 完整的思路引导

成功标准:
- 至少3个步骤
- 能成功运行
- 输出有用的学习指导
```

**任务 B: 翻译润色器**
```
目标: 中文 → 英文 → 改进表达

建议步骤:
1. 输入: 一段中文
2. 步骤1: 翻译成英文
3. 步骤2: 检查语法错误
4. 步骤3: 提升表达（更地道）
5. 输出: 最终英文版本

成功标准:
- 包含翻译、检查、改进三个阶段
- 输出质量比直接翻译好
```

**任务 C: 自由创作**
```
目标: 设计你自己的工作流！

可以是:
- 诗歌创作助手
- 故事改编器（改编已有故事）
- 辩论观点生成器
- 学习计划制定器
- 任何你想到的！

成功标准:
- 至少3个步骤
- 逻辑清晰
- 能解决实际问题
- 创意性
```

**UI 交互设计**:

**三列布局**:
```
┌────────────────────────────────────────────────────┐
│  Lab 6 - 阶段3: 创建你的工作流                       │
├──────────┬──────────────────────┬──────────────────┤
│ 📦 工具箱 │     🎨 画布          │  ⚙️ 配置面板      │
│          │                      │                  │
│ 🎯 输入   │  [开始]              │ 当前选中:         │
│ 拖拽添加  │    ↓                 │ 步骤2            │
│          │  [AI步骤1]           │                  │
│ 🤖 AI步骤 │    ↓                 │ 步骤名称:         │
│ 点击配置  │  [AI步骤2] ← 选中    │ [生成创意____]   │
│          │    ↓                 │                  │
│ 📤 输出   │  [结束]              │ Prompt:          │
│ 完成流程  │                      │ ┌──────────────┐ │
│          │  [▶ 测试运行]        │ │根据主题{输入}│ │
│          │  [💾 保存工作流]     │ │生成3个创意   │ │
│          │                      │ └──────────────┘ │
│          │                      │                  │
│          │                      │ 输入来源:         │
│          │                      │ [步骤1 ▼]        │
└──────────┴──────────────────────┴──────────────────┘
```

**操作流程**:
1. 从工具箱拖节点到画布（或点击添加）
2. 点击两个节点自动连线（简化连线操作）
3. 点击节点，在右侧配置面板编辑
4. 点击"测试运行"看效果
5. 满意后点击"保存"

**教学辅助**:
- 新手引导（首次进入时）
- 示例模板（可以加载预设）
- 实时验证（不合法的连线会提示）
- 智能提示（配置 prompt 时给建议）

---

## 🎨 前端设计方案

### 总体 UI 风格

**设计理念**:
- 基于现有 shadcn/ui 风格（一致性）
- 加入"儿童友好"元素（更大图标、鲜艳颜色）
- 参考 Scratch 的积木理念，但使用现代 UI

**色彩方案**:
```
输入节点:  蓝色 (#3B82F6)    - 代表起点
AI步骤:    紫色 (#A855F7)    - 代表处理
输出节点:  绿色 (#10B981)    - 代表结果
分支节点:  橙色 (#F97316)    - 进阶功能
连线:      灰色 (#6B7280)    - 数据流
```

**字体和间距**:
- 标题: 18px, 加粗
- 正文: 14px
- 按钮: 高度 40px（比常规稍大）
- 节点: 最小宽度 280px
- 节点间距: 60px（垂直）

---

### 阶段 1+2: 单列布局（观察和编辑）

**布局结构**:
```
┌─────────────────────────────────────────┐
│  Lab 6: AI 工作流搭建                    │
│  阶段1: 观察工作流如何运行                │
├─────────────────────────────────────────┤
│  [故事创作助手]  [作业助手]  [翻译器]   │  ← 预设模板选择
├─────────────────────────────────────────┤
│                                         │
│  📝 输入主题                             │
│  ┌───────────────────────────────────┐  │
│  │ [太空猫__________________]  [▶运行] │  │
│  └───────────────────────────────────┘  │
│                                         │
│  工作流可视化:                           │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  📝 输入                         │   │
│  │      ↓                           │   │
│  │  🤖 步骤1: 生成创意        [🔧]  │   │  ← 阶段2可编辑
│  │     💬 输出: 1. 猫在火星...      │   │
│  │      ↓                           │   │
│  │  🤖 步骤2: 扩展大纲        [🔧]  │   │
│  │     💬 输出: 在遥远的未来...     │   │
│  │      ↓                           │   │
│  │  🤖 步骤3: 添加细节        [🔧]  │   │
│  │     💬 输出: [完整故事]          │   │
│  │      ↓                           │   │
│  │  ✅ 完成！                       │   │
│  └─────────────────────────────────┘   │
│                                         │
│  [▶ 重新运行] [💡 解释工作流] [↩️ 重置] │
└─────────────────────────────────────────┘
```

**节点视觉设计**:

**输入节点卡片**:
```tsx
┌────────────────────────┐
│ 📝 输入主题             │  ← 蓝色标题栏
├────────────────────────┤
│ ┌────────────────────┐ │
│ │ [太空猫_________]  │ │  ← 可输入框
│ └────────────────────┘ │
│        ↓               │  ← 向下箭头
└────────────────────────┘
蓝色边框 (2px)
圆角 (8px)
阴影 (shadow-md)
```

**AI 步骤节点卡片**:
```tsx
┌────────────────────────────────┐
│ 🤖 步骤1: 生成创意       [🔧]  │  ← 紫色标题栏 + 编辑按钮
├────────────────────────────────┤
│ Prompt (阶段2可编辑):          │
│ ┌────────────────────────────┐ │
│ │ 根据主题{输入}，生成3个... │ │  ← textarea (阶段2)
│ └────────────────────────────┘ │
├────────────────────────────────┤
│ 💬 输出:                       │
│ ┌────────────────────────────┐ │
│ │ 1. 猫在火星探险            │ │  ← 运行后显示
│ │ 2. 猫当宇航员...           │ │
│ │ 3. 猫遇到外星猫...         │ │
│ └────────────────────────────┘ │
│            ↓                   │  ← 向下箭头
└────────────────────────────────┘
紫色边框
运行时: 边框闪烁动画 (pulse)
完成后: 边框变绿 + ✓ 图标
```

**输出节点卡片**:
```tsx
┌────────────────────────┐
│ ✅ 最终输出             │  ← 绿色标题栏
├────────────────────────┤
│ 📄 完整故事:           │
│ ┌────────────────────┐ │
│ │ 在遥远的未来，一只 │ │  ← 最终结果
│ │ 名叫小白的太空猫...│ │
│ │ [完整故事内容]     │ │
│ └────────────────────┘ │
│                        │
│ [📋 复制] [💾 保存]     │  ← 操作按钮
└────────────────────────┘
绿色边框
```

---

### 阶段 3: 三列布局（自由创建）

**完整布局**:
```
┌─────────────────────────────────────────────────────────────────┐
│  Lab 6 - 阶段3: 创建你的工作流          [💾 保存] [📖 帮助]      │
├──────────────┬───────────────────────────┬──────────────────────┤
│ 📦 工具箱     │     🎨 画布（React Flow）  │  ⚙️ 配置面板          │
│ (200px 固定)  │     (自适应)              │  (320px 固定)        │
├──────────────┤                           │                      │
│              │   ┌─────────┐             │  当前选中:            │
│ 🎯 输入       │   │ 开始    │             │  🤖 AI步骤2          │
│ ┌──────────┐ │   └─────────┘             │                      │
│ │  📝      │ │       ↓                   │  ┌────────────────┐  │
│ │  输入    │ │   ┌─────────┐             │  │ 步骤名称:      │  │
│ └──────────┘ │   │ AI步骤1 │             │  │ [生成创意___]  │  │
│ 拖到画布添加  │   └─────────┘             │  └────────────────┘  │
│              │       ↓                   │                      │
│ 🤖 AI步骤    │   ┌─────────┐ ← 选中      │  Prompt:             │
│ ┌──────────┐ │   │ AI步骤2 │ (紫边框)   │  ┌────────────────┐  │
│ │  🤖      │ │   └─────────┘             │  │ 根据主题{输入} │  │
│ │  处理    │ │       ↓                   │  │ 生成3个有趣的  │  │
│ └──────────┘ │   ┌─────────┐             │  │ 创意...        │  │
│ 可添加多个    │   │  结束   │             │  └────────────────┘  │
│              │   └─────────┘             │                      │
│ 📤 输出      │                           │  输入来源:            │
│ ┌──────────┐ │   [🗑️ 删除节点]           │  ┌────────────────┐  │
│ │  ✅      │ │   [🔗 连接模式: 关]      │  │ [步骤1 ▼]      │  │
│ │  输出    │ │                           │  └────────────────┘  │
│ └──────────┘ │   [▶ 测试运行]           │                      │
│              │   [💾 保存工作流]         │  [应用修改]           │
└──────────────┴───────────────────────────┴──────────────────────┘
```

**工具箱组件 (Toolbox)**:
```tsx
// 每个节点类型的卡片
<div className="toolbox-item">
  <div className="icon">📝</div>
  <div className="label">输入</div>
  <div className="desc">用户输入起点</div>
</div>

样式:
- 可拖拽 (draggable)
- Hover 时高亮
- 点击添加到画布中心（备选方案）
```

**画布区域 (Canvas)**:
- 使用 React Flow
- 缩放、平移功能
- 网格背景（dots）
- 节点自动对齐（snap to grid）

**配置面板 (Config Panel)**:
- 根据选中节点类型显示不同配置
- 实时保存（debounced）
- 验证输入（prompt 不能为空）
- 变量引用提示（显示可用的 `{变量}`）

---

### 执行时的动画反馈

**工作流运行状态可视化**:

1. **准备阶段**:
   ```
   所有节点: 灰色边框，半透明
   连线: 灰色虚线
   ```

2. **执行中**:
   ```
   当前节点:
   - 边框颜色变亮（紫色 → 亮紫色）
   - 边框闪烁动画 (animate-pulse)
   - 显示 spinner 加载图标
   - 状态文字: "正在思考..." / "正在处理..."

   连线动画:
   - 流动的点动画（从上到下）
   - 表示数据传递
   ```

3. **完成后**:
   ```
   完成的节点:
   - 边框变绿色
   - 显示 ✓ 对勾图标
   - 输出区域淡入 (fade-in)

   未执行的节点:
   - 保持灰色
   ```

4. **错误状态**:
   ```
   出错的节点:
   - 边框变红色
   - 显示 ⚠️ 图标
   - 错误信息显示在输出区
   - "重试"按钮
   ```

**CSS 动画示例**:
```css
/* 执行中的闪烁效果 */
@keyframes pulse-border {
  0%, 100% { border-color: #A855F7; }
  50% { border-color: #C084FC; }
}

.node-running {
  animation: pulse-border 2s ease-in-out infinite;
}

/* 数据流动效果 */
@keyframes flow {
  0% { stroke-dashoffset: 20; }
  100% { stroke-dashoffset: 0; }
}

.edge-active {
  stroke-dasharray: 5 5;
  animation: flow 1s linear infinite;
}
```

---

### 响应式设计策略

**桌面端 (>= 1024px)**:
- 完整三列布局
- 所有功能可用
- 拖拽体验最佳

**平板端 (768px - 1023px)**:
- 工具箱变成顶部横向滚动条
- 配置面板变成底部抽屉（drawer）
- 画布占据主要区域
- 点击节点时抽屉自动弹出

**移动端 (< 768px)**:
- **阶段1+2**:
  - 改为垂直滚动的卡片列表
  - 每个步骤是一张卡片
  - 简化UI，去掉装饰性元素

- **阶段3**:
  - 使用底部菜单（bottom sheet）
  - 点击"+"按钮添加节点（不拖拽）
  - 简化的连线方式（自动连接相邻节点）
  - 配置在全屏模态框中

**响应式断点**:
```typescript
const breakpoints = {
  mobile: '< 768px',
  tablet: '768px - 1023px',
  desktop: '>= 1024px'
}
```

---

### 组件复用策略

**复用 shadcn/ui 组件**:
```tsx
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog } from '@/components/ui/dialog'
import { Toast } from '@/components/ui/toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
```

**新建自定义组件**:
```
components/features/workflow/
├── WorkflowCanvas.tsx          # React Flow 画布封装
├── WorkflowPlayer.tsx          # 阶段1+2 播放器组件
├── WorkflowBuilder.tsx         # 阶段3 编辑器组件
├── WorkflowToolbox.tsx         # 工具箱
├── WorkflowConfigPanel.tsx     # 配置面板
├── WorkflowExecutor.tsx        # 执行控制器
│
├── nodes/
│   ├── InputNode.tsx           # 输入节点
│   ├── AIStepNode.tsx          # AI步骤节点
│   ├── OutputNode.tsx          # 输出节点
│   └── BaseNode.tsx            # 节点基类
│
├── templates/
│   ├── StoryCreator.ts         # 预设：故事创作
│   ├── HomeworkHelper.ts       # 预设：作业助手
│   └── Translator.ts           # 预设：翻译润色
│
└── utils/
    ├── workflow-validator.ts   # 验证工作流合法性
    └── variable-parser.ts      # 解析 {变量} 引用
```

---

## 💻 技术实现方案

### 技术栈选型

**核心库**: React Flow
- 版本: ^11.10.0
- 用途: 画布、节点、连线系统
- 优势: 成熟稳定、文档完善、React 原生

**安装**:
```bash
npm install reactflow
```

**基础用法示例**:
```tsx
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  BackgroundVariant
} from 'reactflow'
import 'reactflow/dist/style.css'

function WorkflowCanvas() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])

  return (
    <div className="w-full h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={customNodeTypes}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} />
        <Controls />
      </ReactFlow>
    </div>
  )
}
```

---

### 自定义节点实现

#### 1. 基础节点组件 (BaseNode.tsx)

```tsx
import { Handle, Position, NodeProps } from 'reactflow'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface BaseNodeProps extends NodeProps {
  color: string
  icon: string
  children: React.ReactNode
}

export function BaseNode({
  data,
  color,
  icon,
  children,
  selected
}: BaseNodeProps) {
  return (
    <>
      {data.hasInput && (
        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3"
        />
      )}

      <Card className={cn(
        'min-w-[280px] border-2 transition-all',
        selected ? `border-${color}-500 shadow-lg` : `border-${color}-300`,
        data.status === 'running' && 'animate-pulse',
        data.status === 'completed' && 'border-green-500'
      )}>
        {/* 标题栏 */}
        <div className={`bg-${color}-100 px-4 py-2 flex items-center gap-2`}>
          <span className="text-2xl">{icon}</span>
          <span className="font-semibold">{data.label}</span>
          {data.editable && (
            <button className="ml-auto text-sm">🔧</button>
          )}
        </div>

        {/* 内容区 */}
        <div className="p-4">
          {children}
        </div>

        {/* 状态指示 */}
        {data.status === 'running' && (
          <div className="px-4 py-2 text-sm text-gray-600">
            正在处理... <LoadingSpinner />
          </div>
        )}

        {data.status === 'completed' && (
          <div className="px-4 py-2 text-sm text-green-600">
            ✓ 完成
          </div>
        )}
      </Card>

      {data.hasOutput && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3"
        />
      )}
    </>
  )
}
```

#### 2. 输入节点 (InputNode.tsx)

```tsx
export function InputNode({ data }: NodeProps) {
  return (
    <BaseNode
      data={data}
      color="blue"
      icon="📝"
    >
      <div className="space-y-2">
        <label className="text-sm text-gray-600">
          {data.placeholder || "输入内容"}
        </label>
        <Input
          value={data.value || ''}
          onChange={(e) => data.onChange?.(e.target.value)}
          placeholder={data.placeholder}
          readOnly={data.readonly}
          className="w-full"
        />
      </div>
    </BaseNode>
  )
}
```

#### 3. AI 步骤节点 (AIStepNode.tsx)

```tsx
export function AIStepNode({ data }: NodeProps) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <BaseNode
      data={data}
      color="purple"
      icon="🤖"
    >
      <div className="space-y-3">
        {/* Prompt 区域 */}
        <div>
          <label className="text-xs text-gray-600">Prompt:</label>
          {isEditing || data.editable ? (
            <Textarea
              value={data.prompt}
              onChange={(e) => data.onPromptChange?.(e.target.value)}
              rows={3}
              className="mt-1 text-sm font-mono"
            />
          ) : (
            <div className="mt-1 p-2 bg-gray-50 rounded text-sm font-mono">
              {data.prompt}
            </div>
          )}
        </div>

        {/* 输出区域 */}
        {data.output && (
          <div>
            <label className="text-xs text-gray-600">💬 输出:</label>
            <div className="mt-1 p-2 bg-purple-50 rounded text-sm">
              {data.output}
            </div>
          </div>
        )}
      </div>
    </BaseNode>
  )
}
```

#### 4. 输出节点 (OutputNode.tsx)

```tsx
export function OutputNode({ data }: NodeProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(data.result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <BaseNode
      data={data}
      color="green"
      icon="✅"
    >
      <div className="space-y-2">
        <label className="text-xs text-gray-600">📄 最终结果:</label>

        {data.result ? (
          <>
            <div className="p-3 bg-green-50 rounded text-sm max-h-48 overflow-y-auto">
              {data.result}
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
              >
                {copied ? '✓ 已复制' : '📋 复制'}
              </Button>

              {data.onSave && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={data.onSave}
                >
                  💾 保存
                </Button>
              )}
            </div>
          </>
        ) : (
          <div className="p-3 text-sm text-gray-400">
            等待工作流执行...
          </div>
        )}
      </div>
    </BaseNode>
  )
}
```

---

### 工作流执行引擎

#### WorkflowEngine 类设计

```typescript
// lib/workflow/workflow-engine.ts

export interface WorkflowStep {
  id: string
  type: 'input' | 'aiStep' | 'output'
  data: {
    label: string
    prompt?: string
    value?: string
    [key: string]: any
  }
  position: { x: number; y: number }
}

export interface WorkflowEdge {
  id: string
  source: string
  target: string
}

export interface WorkflowExecutionResult {
  success: boolean
  finalOutput?: string
  log: ExecutionLog[]
  error?: string
}

export interface ExecutionLog {
  stepId: string
  timestamp: string
  input: string
  output: string
  durationMs: number
  status: 'success' | 'error'
}

export class WorkflowEngine {
  private steps: Map<string, WorkflowStep>
  private edges: WorkflowEdge[]
  private results: Map<string, string>

  // 回调函数（用于 UI 更新）
  public onStepStart?: (stepId: string) => void
  public onStepComplete?: (stepId: string, output: string) => void
  public onStepError?: (stepId: string, error: string) => void

  constructor(steps: WorkflowStep[], edges: WorkflowEdge[]) {
    this.steps = new Map(steps.map(s => [s.id, s]))
    this.edges = edges
    this.results = new Map()
  }

  /**
   * 执行整个工作流
   */
  async execute(initialInput: string): Promise<WorkflowExecutionResult> {
    const log: ExecutionLog[] = []

    try {
      // 1. 拓扑排序获取执行顺序
      const executionOrder = this.topologicalSort()

      // 2. 设置初始输入
      const inputStepId = this.findInputStep()
      if (!inputStepId) {
        throw new Error('工作流必须有输入节点')
      }
      this.results.set(inputStepId, initialInput)

      // 3. 按顺序执行每个步骤
      for (const stepId of executionOrder) {
        const step = this.steps.get(stepId)
        if (!step) continue

        // 跳过输入节点（已设置）和输出节点（最后处理）
        if (step.type === 'input' || step.type === 'output') {
          continue
        }

        // 执行 AI 步骤
        if (step.type === 'aiStep') {
          await this.executeAIStep(stepId, step, log)
        }
      }

      // 4. 获取最终输出
      const outputStepId = this.findOutputStep()
      const finalOutput = outputStepId
        ? this.results.get(this.getInputSourceForStep(outputStepId))
        : undefined

      return {
        success: true,
        finalOutput,
        log
      }

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '未知错误',
        log
      }
    }
  }

  /**
   * 执行单个 AI 步骤
   */
  private async executeAIStep(
    stepId: string,
    step: WorkflowStep,
    log: ExecutionLog[]
  ): Promise<void> {
    const startTime = Date.now()

    try {
      // 触发开始回调
      this.onStepStart?.(stepId)

      // 1. 获取输入数据
      const inputs = this.getInputsForStep(stepId)

      // 2. 解析 prompt 中的变量
      const resolvedPrompt = this.resolvePromptVariables(
        step.data.prompt!,
        inputs
      )

      // 3. 调用 LLM
      const output = await this.callLLM(resolvedPrompt)

      // 4. 保存结果
      this.results.set(stepId, output)

      // 5. 记录日志
      const logEntry: ExecutionLog = {
        stepId,
        timestamp: new Date().toISOString(),
        input: resolvedPrompt,
        output,
        durationMs: Date.now() - startTime,
        status: 'success'
      }
      log.push(logEntry)

      // 触发完成回调
      this.onStepComplete?.(stepId, output)

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : '执行失败'

      // 记录错误日志
      log.push({
        stepId,
        timestamp: new Date().toISOString(),
        input: step.data.prompt || '',
        output: errorMsg,
        durationMs: Date.now() - startTime,
        status: 'error'
      })

      // 触发错误回调
      this.onStepError?.(stepId, errorMsg)

      throw error
    }
  }

  /**
   * 调用 LLM API
   */
  private async callLLM(prompt: string): Promise<string> {
    // 复用现有的 runPrompt server action
    const response = await runPrompt({
      prompt,
      labNumber: 6,
      exerciseId: 'workflow-execution'
    })

    if (!response.success) {
      throw new Error(response.error || 'LLM 调用失败')
    }

    return response.output
  }

  /**
   * 解析 prompt 中的 {变量} 占位符
   */
  private resolvePromptVariables(
    template: string,
    inputs: Map<string, string>
  ): string {
    let resolved = template

    // 替换 {变量名} 格式的占位符
    for (const [key, value] of inputs.entries()) {
      const regex = new RegExp(`\\{${key}\\}`, 'g')
      resolved = resolved.replace(regex, value)
    }

    // 特殊变量: {输入} - 指向工作流的初始输入
    const inputStepId = this.findInputStep()
    if (inputStepId) {
      const inputValue = this.results.get(inputStepId) || ''
      resolved = resolved.replace(/\{输入\}/g, inputValue)
    }

    return resolved
  }

  /**
   * 获取某个步骤的所有输入数据
   */
  private getInputsForStep(stepId: string): Map<string, string> {
    const inputs = new Map<string, string>()

    // 找到所有指向该步骤的边
    const incomingEdges = this.edges.filter(e => e.target === stepId)

    for (const edge of incomingEdges) {
      const sourceStep = this.steps.get(edge.source)
      const sourceOutput = this.results.get(edge.source)

      if (sourceStep && sourceOutput) {
        // 使用源步骤的标签作为变量名
        const varName = sourceStep.data.label || edge.source
        inputs.set(varName, sourceOutput)

        // 也添加步骤ID作为变量名（兼容）
        inputs.set(edge.source, sourceOutput)
      }
    }

    return inputs
  }

  /**
   * 拓扑排序 - 确定步骤执行顺序
   */
  private topologicalSort(): string[] {
    const visited = new Set<string>()
    const result: string[] = []
    const adjacency = this.buildAdjacencyList()

    const visit = (nodeId: string) => {
      if (visited.has(nodeId)) return

      visited.add(nodeId)

      const neighbors = adjacency.get(nodeId) || []
      for (const neighbor of neighbors) {
        visit(neighbor)
      }

      result.push(nodeId)
    }

    // 从输入节点开始 DFS
    const inputStepId = this.findInputStep()
    if (inputStepId) {
      visit(inputStepId)
    }

    return result.reverse()
  }

  /**
   * 构建邻接表
   */
  private buildAdjacencyList(): Map<string, string[]> {
    const adjacency = new Map<string, string[]>()

    for (const edge of this.edges) {
      const neighbors = adjacency.get(edge.source) || []
      neighbors.push(edge.target)
      adjacency.set(edge.source, neighbors)
    }

    return adjacency
  }

  /**
   * 工具方法: 查找输入节点
   */
  private findInputStep(): string | undefined {
    for (const [id, step] of this.steps.entries()) {
      if (step.type === 'input') return id
    }
    return undefined
  }

  /**
   * 工具方法: 查找输出节点
   */
  private findOutputStep(): string | undefined {
    for (const [id, step] of this.steps.entries()) {
      if (step.type === 'output') return id
    }
    return undefined
  }

  /**
   * 获取某个节点的输入来源节点ID
   */
  private getInputSourceForStep(stepId: string): string | undefined {
    const incomingEdge = this.edges.find(e => e.target === stepId)
    return incomingEdge?.source
  }
}
```

---

### 使用示例

#### 阶段1+2: WorkflowPlayer 组件

```tsx
// components/features/workflow/WorkflowPlayer.tsx

import { useState } from 'react'
import ReactFlow, { Node, Edge } from 'reactflow'
import { WorkflowEngine } from '@/lib/workflow/workflow-engine'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function WorkflowPlayer({
  workflow
}: {
  workflow: Workflow
}) {
  const [input, setInput] = useState('')
  const [nodes, setNodes] = useState<Node[]>(workflow.nodes)
  const [isRunning, setIsRunning] = useState(false)

  const runWorkflow = async () => {
    if (!input.trim()) {
      toast.error('请输入内容')
      return
    }

    setIsRunning(true)

    // 创建执行引擎
    const engine = new WorkflowEngine(
      workflow.nodes,
      workflow.edges
    )

    // 监听步骤执行
    engine.onStepStart = (stepId) => {
      updateNodeStatus(stepId, 'running')
    }

    engine.onStepComplete = (stepId, output) => {
      updateNodeOutput(stepId, output)
      updateNodeStatus(stepId, 'completed')
    }

    engine.onStepError = (stepId, error) => {
      updateNodeStatus(stepId, 'error')
      toast.error(`步骤 ${stepId} 执行失败: ${error}`)
    }

    // 执行工作流
    try {
      const result = await engine.execute(input)

      if (result.success) {
        toast.success('工作流执行完成！')
      } else {
        toast.error(`执行失败: ${result.error}`)
      }
    } catch (error) {
      toast.error('执行过程中出现错误')
    } finally {
      setIsRunning(false)
    }
  }

  const updateNodeStatus = (nodeId: string, status: string) => {
    setNodes(prev => prev.map(node =>
      node.id === nodeId
        ? { ...node, data: { ...node.data, status } }
        : node
    ))
  }

  const updateNodeOutput = (nodeId: string, output: string) => {
    setNodes(prev => prev.map(node =>
      node.id === nodeId
        ? { ...node, data: { ...node.data, output } }
        : node
    ))
  }

  return (
    <div className="h-screen flex flex-col">
      {/* 控制面板 */}
      <div className="p-4 border-b">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入主题..."
            className="flex-1"
          />
          <Button
            onClick={runWorkflow}
            disabled={isRunning}
          >
            {isRunning ? '运行中...' : '▶ 运行工作流'}
          </Button>
        </div>
      </div>

      {/* 工作流可视化 */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={workflow.edges}
          nodeTypes={customNodeTypes}
          fitView
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
        >
          <Background variant="dots" />
        </ReactFlow>
      </div>
    </div>
  )
}
```

---

## 🗄 数据库设计

### 表结构

#### workflows 表

```sql
CREATE TABLE workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,

  -- 基本信息
  name TEXT NOT NULL,
  description TEXT,
  lab_number INT DEFAULT 6,

  -- 工作流配置 (JSON)
  config JSONB NOT NULL,
  /* config 结构:
  {
    "nodes": [
      {
        "id": "node-1",
        "type": "input",
        "data": {
          "label": "输入主题",
          "placeholder": "输入一个主题...",
          "value": ""
        },
        "position": { "x": 250, "y": 0 }
      },
      {
        "id": "node-2",
        "type": "aiStep",
        "data": {
          "label": "生成创意",
          "prompt": "根据主题{输入}，生成3个创意",
          "editable": true
        },
        "position": { "x": 250, "y": 100 }
      }
    ],
    "edges": [
      {
        "id": "edge-1",
        "source": "node-1",
        "target": "node-2"
      }
    ]
  }
  */

  -- 分类标记
  is_template BOOLEAN DEFAULT false,    -- 是否是预设模板
  is_public BOOLEAN DEFAULT false,      -- 是否公开分享
  template_category TEXT,               -- 模板分类 (story, homework, etc.)

  -- 统计信息
  execution_count INT DEFAULT 0,        -- 运行次数
  success_rate FLOAT DEFAULT 0,         -- 成功率

  -- 时间戳
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_workflows_user ON workflows(user_id);
CREATE INDEX idx_workflows_template ON workflows(is_template, is_public);
CREATE INDEX idx_workflows_category ON workflows(template_category) WHERE is_template = true;
```

#### workflow_executions 表

```sql
CREATE TABLE workflow_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID REFERENCES workflows(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,

  -- 执行数据
  input_data TEXT NOT NULL,             -- 初始输入
  final_output TEXT,                    -- 最终输出

  -- 执行日志 (JSON)
  execution_log JSONB,
  /* execution_log 结构:
  {
    "steps": [
      {
        "stepId": "node-2",
        "timestamp": "2025-01-16T10:30:00Z",
        "input": "根据主题太空猫，生成3个创意",
        "output": "1. 猫在火星...",
        "durationMs": 1200,
        "status": "success"
      }
    ],
    "totalDurationMs": 3600
  }
  */

  -- 状态
  status TEXT CHECK (status IN ('running', 'completed', 'failed')),
  error_message TEXT,

  -- 成本追踪
  tokens_used INT,                      -- 使用的 token 数
  api_calls INT,                        -- API 调用次数

  -- 时间戳
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- 索引
CREATE INDEX idx_executions_workflow ON workflow_executions(workflow_id);
CREATE INDEX idx_executions_user ON workflow_executions(user_id);
CREATE INDEX idx_executions_status ON workflow_executions(status);
CREATE INDEX idx_executions_created ON workflow_executions(created_at DESC);
```

#### workflow_progress 表 (扩展 prompt_lab_progress)

```sql
-- 复用现有的 prompt_lab_progress 表
-- 添加 workflow 相关字段

ALTER TABLE prompt_lab_progress ADD COLUMN IF NOT EXISTS workflow_id UUID REFERENCES workflows(id);
ALTER TABLE prompt_lab_progress ADD COLUMN IF NOT EXISTS stage INT CHECK (stage IN (1, 2, 3));
-- stage 1: 观察, 2: 编辑, 3: 创建

-- 用于追踪 Lab 6 的进度
-- exercise_id 格式: "lab6-stage1-ex1"
```

---

### RLS 策略

```sql
-- workflows 表的 RLS
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;

-- 用户可以查看自己的工作流 + 公开的模板
CREATE POLICY "Users can view own and public workflows"
  ON workflows FOR SELECT
  USING (
    user_id = auth.uid()
    OR (is_public = true AND is_template = true)
  );

-- 用户只能创建自己的工作流
CREATE POLICY "Users can create own workflows"
  ON workflows FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- 用户只能修改自己的工作流
CREATE POLICY "Users can update own workflows"
  ON workflows FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- 用户只能删除自己的工作流
CREATE POLICY "Users can delete own workflows"
  ON workflows FOR DELETE
  USING (user_id = auth.uid());

-- workflow_executions 表的 RLS
ALTER TABLE workflow_executions ENABLE ROW LEVEL SECURITY;

-- 用户只能查看自己的执行记录
CREATE POLICY "Users can view own executions"
  ON workflow_executions FOR SELECT
  USING (user_id = auth.uid());

-- 用户只能创建自己的执行记录
CREATE POLICY "Users can create own executions"
  ON workflow_executions FOR INSERT
  WITH CHECK (user_id = auth.uid());
```

---

### 数据库迁移文件

**文件**: `supabase/migrations/20251017_workflow_tables.sql`

```sql
-- Lab 6: Workflow Builder Tables
-- Created: 2025-10-17

BEGIN;

-- 1. 创建 workflows 表
CREATE TABLE IF NOT EXISTS workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  lab_number INT DEFAULT 6,
  config JSONB NOT NULL,
  is_template BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT false,
  template_category TEXT,
  execution_count INT DEFAULT 0,
  success_rate FLOAT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 创建 workflow_executions 表
CREATE TABLE IF NOT EXISTS workflow_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID REFERENCES workflows(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  input_data TEXT NOT NULL,
  final_output TEXT,
  execution_log JSONB,
  status TEXT CHECK (status IN ('running', 'completed', 'failed')) NOT NULL,
  error_message TEXT,
  tokens_used INT,
  api_calls INT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- 3. 创建索引
CREATE INDEX IF NOT EXISTS idx_workflows_user ON workflows(user_id);
CREATE INDEX IF NOT EXISTS idx_workflows_template ON workflows(is_template, is_public);
CREATE INDEX IF NOT EXISTS idx_workflows_category ON workflows(template_category) WHERE is_template = true;

CREATE INDEX IF NOT EXISTS idx_executions_workflow ON workflow_executions(workflow_id);
CREATE INDEX IF NOT EXISTS idx_executions_user ON workflow_executions(user_id);
CREATE INDEX IF NOT EXISTS idx_executions_status ON workflow_executions(status);
CREATE INDEX IF NOT EXISTS idx_executions_created ON workflow_executions(created_at DESC);

-- 4. 启用 RLS
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_executions ENABLE ROW LEVEL SECURITY;

-- 5. RLS 策略 - workflows
CREATE POLICY "Users can view own and public workflows"
  ON workflows FOR SELECT
  USING (user_id = auth.uid() OR (is_public = true AND is_template = true));

CREATE POLICY "Users can create own workflows"
  ON workflows FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own workflows"
  ON workflows FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own workflows"
  ON workflows FOR DELETE
  USING (user_id = auth.uid());

-- 6. RLS 策略 - workflow_executions
CREATE POLICY "Users can view own executions"
  ON workflow_executions FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own executions"
  ON workflow_executions FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- 7. 扩展现有的 prompt_lab_progress 表
ALTER TABLE prompt_lab_progress
  ADD COLUMN IF NOT EXISTS workflow_id UUID REFERENCES workflows(id),
  ADD COLUMN IF NOT EXISTS stage INT CHECK (stage IN (1, 2, 3));

-- 8. 创建预设模板工作流
INSERT INTO workflows (
  user_id,
  name,
  description,
  config,
  is_template,
  is_public,
  template_category
) VALUES
-- 模板1: 故事创作助手
(
  (SELECT id FROM auth.users LIMIT 1),  -- 使用系统用户
  '故事创作助手',
  '把一个简单主题变成有趣的完整故事',
  '{"nodes":[{"id":"input-1","type":"input","data":{"label":"输入主题","placeholder":"输入一个主题，如：太空猫"},"position":{"x":250,"y":0}},{"id":"step-1","type":"aiStep","data":{"label":"生成创意","prompt":"根据主题''{输入}''，生成3个有趣的故事创意，每个用一句话描述","editable":true},"position":{"x":250,"y":100}},{"id":"step-2","type":"aiStep","data":{"label":"扩展大纲","prompt":"选择第一个创意，扩展成200字的故事大纲","editable":true},"position":{"x":250,"y":200}},{"id":"step-3","type":"aiStep","data":{"label":"添加细节","prompt":"根据大纲，添加生动的对话和细节描写，写成完整故事","editable":true},"position":{"x":250,"y":300}},{"id":"output-1","type":"output","data":{"label":"完整故事"},"position":{"x":250,"y":400}}],"edges":[{"id":"e1","source":"input-1","target":"step-1"},{"id":"e2","source":"step-1","target":"step-2"},{"id":"e3","source":"step-2","target":"step-3"},{"id":"e4","source":"step-3","target":"output-1"}]}'::jsonb,
  true,
  true,
  'story'
),
-- 模板2: 作业助手
(
  (SELECT id FROM auth.users LIMIT 1),
  '作业助手',
  '帮助分析数学题，提供解题思路',
  '{"nodes":[{"id":"input-1","type":"input","data":{"label":"输入数学题","placeholder":"输入你的数学题"},"position":{"x":250,"y":0}},{"id":"step-1","type":"aiStep","data":{"label":"分析题目","prompt":"分析这道题: ''{输入}''，识别题目类型和考查的知识点"},"position":{"x":250,"y":100}},{"id":"step-2","type":"aiStep","data":{"label":"提供思路","prompt":"根据分析结果，给出解题思路（不直接给答案），引导学生思考"},"position":{"x":250,"y":200}},{"id":"step-3","type":"aiStep","data":{"label":"验证方法","prompt":"说明如何验证答案的正确性"},"position":{"x":250,"y":300}},{"id":"output-1","type":"output","data":{"label":"完整思路"},"position":{"x":250,"y":400}}],"edges":[{"id":"e1","source":"input-1","target":"step-1"},{"id":"e2","source":"step-1","target":"step-2"},{"id":"e3","source":"step-2","target":"step-3"},{"id":"e4","source":"step-3","target":"output-1"}]}'::jsonb,
  true,
  true,
  'homework'
),
-- 模板3: 翻译润色器
(
  (SELECT id FROM auth.users LIMIT 1),
  '翻译润色器',
  '中文翻译成英文，并逐步改进表达',
  '{"nodes":[{"id":"input-1","type":"input","data":{"label":"输入中文","placeholder":"输入一段中文"},"position":{"x":250,"y":0}},{"id":"step-1","type":"aiStep","data":{"label":"翻译","prompt":"将这段中文翻译成英文: ''{输入}''"},"position":{"x":250,"y":100}},{"id":"step-2","type":"aiStep","data":{"label":"检查语法","prompt":"检查这段英文的语法错误，并修正"},"position":{"x":250,"y":200}},{"id":"step-3","type":"aiStep","data":{"label":"提升表达","prompt":"让这段英文更地道、更流畅"},"position":{"x":250,"y":300}},{"id":"output-1","type":"output","data":{"label":"最终英文"},"position":{"x":250,"y":400}}],"edges":[{"id":"e1","source":"input-1","target":"step-1"},{"id":"e2","source":"step-1","target":"step-2"},{"id":"e3","source":"step-2","target":"step-3"},{"id":"e4","source":"step-3","target":"output-1"}]}'::jsonb,
  true,
  true,
  'translate'
);

COMMIT;
```

---

## 🔌 Server Actions

### workflow.ts

```typescript
// lib/actions/workflow.ts

'use server'

import { createClient } from '@/lib/supabase-server'
import { WorkflowEngine } from '@/lib/workflow/workflow-engine'

/**
 * 保存工作流
 */
export async function saveWorkflow(workflow: {
  name: string
  description?: string
  config: any
}) {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: '未登录' }
  }

  const { data, error } = await supabase
    .from('workflows')
    .insert({
      user_id: user.id,
      name: workflow.name,
      description: workflow.description,
      config: workflow.config,
      lab_number: 6
    })
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

/**
 * 获取用户的工作流列表
 */
export async function getUserWorkflows() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: '未登录' }
  }

  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

/**
 * 获取工作流模板
 */
export async function getWorkflowTemplates() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .eq('is_template', true)
    .eq('is_public', true)
    .order('template_category')

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

/**
 * 加载工作流
 */
export async function loadWorkflow(workflowId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .eq('id', workflowId)
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  // 检查权限（自己的 或 公开模板）
  if (data.user_id !== user?.id && !(data.is_public && data.is_template)) {
    return { success: false, error: '无权限访问此工作流' }
  }

  return { success: true, data }
}

/**
 * 执行工作流
 */
export async function executeWorkflow(
  workflowId: string,
  inputData: string
) {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: '未登录' }
  }

  // 加载工作流配置
  const { data: workflow, error: loadError } = await supabase
    .from('workflows')
    .select('*')
    .eq('id', workflowId)
    .single()

  if (loadError || !workflow) {
    return { success: false, error: '工作流不存在' }
  }

  // 创建执行记录（状态: running）
  const { data: execution, error: createError } = await supabase
    .from('workflow_executions')
    .insert({
      workflow_id: workflowId,
      user_id: user.id,
      input_data: inputData,
      status: 'running'
    })
    .select()
    .single()

  if (createError || !execution) {
    return { success: false, error: '创建执行记录失败' }
  }

  try {
    // 执行工作流
    const engine = new WorkflowEngine(
      workflow.config.nodes,
      workflow.config.edges
    )

    const result = await engine.execute(inputData)

    // 更新执行记录
    const updateData = {
      status: result.success ? 'completed' : 'failed',
      final_output: result.finalOutput,
      execution_log: { steps: result.log },
      error_message: result.error,
      completed_at: new Date().toISOString(),
      tokens_used: estimateTokens(result.log),
      api_calls: result.log.length
    }

    await supabase
      .from('workflow_executions')
      .update(updateData)
      .eq('id', execution.id)

    // 更新工作流统计
    await supabase.rpc('increment_workflow_execution', {
      workflow_id: workflowId
    })

    return {
      success: result.success,
      data: {
        executionId: execution.id,
        finalOutput: result.finalOutput,
        log: result.log
      },
      error: result.error
    }

  } catch (error) {
    // 更新执行记录为失败
    await supabase
      .from('workflow_executions')
      .update({
        status: 'failed',
        error_message: error instanceof Error ? error.message : '未知错误',
        completed_at: new Date().toISOString()
      })
      .eq('id', execution.id)

    return {
      success: false,
      error: error instanceof Error ? error.message : '执行失败'
    }
  }
}

/**
 * 估算 token 使用量（简单估计）
 */
function estimateTokens(log: any[]): number {
  let total = 0
  for (const entry of log) {
    // 粗略估计: 1 token ≈ 4 个字符
    total += Math.ceil((entry.input.length + entry.output.length) / 4)
  }
  return total
}

/**
 * 删除工作流
 */
export async function deleteWorkflow(workflowId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: '未登录' }
  }

  const { error } = await supabase
    .from('workflows')
    .delete()
    .eq('id', workflowId)
    .eq('user_id', user.id)  // 确保只能删除自己的

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

/**
 * 复制模板到用户工作流
 */
export async function cloneTemplate(templateId: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: '未登录' }
  }

  // 加载模板
  const { data: template, error: loadError } = await supabase
    .from('workflows')
    .select('*')
    .eq('id', templateId)
    .eq('is_template', true)
    .single()

  if (loadError || !template) {
    return { success: false, error: '模板不存在' }
  }

  // 创建副本
  const { data, error } = await supabase
    .from('workflows')
    .insert({
      user_id: user.id,
      name: `${template.name} (我的副本)`,
      description: template.description,
      config: template.config,
      lab_number: 6,
      is_template: false,
      is_public: false
    })
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true, data }
}
```

---

## 📈 成本估算

### Lab 6 特定成本

**每个学生的使用情况**:
```
阶段1 (观察):
- 运行预设工作流 3 次
- 每次 3 个步骤
- = 9 次 LLM 调用

阶段2 (编辑):
- 完成 3 道练习题
- 每题运行 2-3 次
- = 约 8 次 LLM 调用

阶段3 (创建):
- 搭建并测试自己的工作流
- 平均 4 个步骤
- 测试运行 5 次
- = 20 次 LLM 调用

总计: 37 次 LLM 调用/学生
```

**成本计算**:
```
使用 GPT-4o:
- 每次调用: 200 tokens input + 400 tokens output
- Input: 37 × 200 = 7,400 tokens × $2.50/1M = $0.0185
- Output: 37 × 400 = 14,800 tokens × $10.00/1M = $0.148

Lab 6 成本/学生: ~$0.17

与 Lab 1-5 成本: ~$0.14
增加: $0.03 (+21%)
```

**规模成本**:
```
100 学生: $17
500 学生: $85
1000 学生: $170
```

**结论**: 成本增加可接受（仅增加 21%），教学价值远超成本

---

## 🎓 教学评估和成功标准

### 自动检查规则

#### 阶段 1: 观察练习

```typescript
// 练习检查（基于用户行为）
const stage1Criteria = {
  ex1: {
    // 练习1: 用不同主题运行工作流
    type: 'behavior',
    check: (data) => data.executionCount >= 2,
    feedback: '尝试用不同的主题运行工作流'
  },
  ex2: {
    // 练习2: 回答问题
    type: 'quiz',
    question: '步骤2从哪里获得输入？',
    correctAnswers: ['步骤1', 'step1', '上一步'],
    feedback: '观察数据如何从一步流动到下一步'
  }
}
```

#### 阶段 2: 编辑练习

```typescript
// 练习1: 让创意更科幻
const ex1Criteria = {
  exerciseId: 'lab6-stage2-ex1',
  rules: [
    {
      type: 'promptContains',
      target: 'step1.prompt',
      keywords: ['科幻', '未来', '太空', '星球', '机器人'],
      minMatches: 1
    },
    {
      type: 'outputContains',
      keywords: ['太空', '星球', '未来', '科技', '机器人'],
      minMatches: 1
    }
  ],
  passingScore: 2
}

// 练习2: 添加转折
const ex2Criteria = {
  exerciseId: 'lab6-stage2-ex2',
  rules: [
    {
      type: 'promptContains',
      target: 'step3.prompt',
      keywords: ['转折', '意外', '反转', '但是'],
      minMatches: 1
    },
    {
      type: 'outputLength',
      minLength: 200
    }
  ],
  passingScore: 2
}
```

#### 阶段 3: 创建挑战

```typescript
// 工作流完整性检查
const stage3Criteria = {
  exerciseId: 'lab6-stage3-challenge',
  rules: [
    {
      type: 'hasMinNodes',
      minCount: 3  // 至少3个步骤（input + 1 AI + output）
    },
    {
      type: 'hasInputNode',
      required: true
    },
    {
      type: 'hasOutputNode',
      required: true
    },
    {
      type: 'isConnected',
      required: true  // 所有节点必须连通
    },
    {
      type: 'allPromptsValid',
      required: true  // 所有 prompt 不为空
    },
    {
      type: 'executionSuccessful',
      required: true  // 能成功运行
    }
  ],
  passingScore: 6  // 所有规则都必须通过
}
```

---

### 学习成果评估

**知识理解**:
- ✅ 能说出"工作流由步骤组成"
- ✅ 能解释数据如何从一步传到下一步
- ✅ 理解 prompt 如何影响输出

**技能掌握**:
- ✅ 能修改 prompt 改变输出
- ✅ 能设计 3+ 步骤的工作流
- ✅ 能将复杂任务分解为简单步骤

**创造力**:
- ✅ 设计了有实际用途的工作流
- ✅ 工作流有逻辑性和创意性

**成功指标**:
- 80%+ 学生完成阶段3
- 70%+ 学生创建的工作流能成功运行
- 60%+ 学生创建了有创意的工作流

---

## 📅 实施时间线

### Week 1: 基础架构 (5-7天)

**Day 1-2**: React Flow 集成
- [ ] 安装和配置 React Flow
- [ ] 创建基础画布组件 (WorkflowCanvas)
- [ ] 实现 3 种基础节点 (InputNode, AIStepNode, OutputNode)
- [ ] 测试节点渲染

**Day 3-4**: 执行引擎
- [ ] 实现 WorkflowEngine 类 (~200行)
- [ ] 拓扑排序算法
- [ ] 变量解析逻辑
- [ ] LLM API 集成
- [ ] 单元测试

**Day 5**: 数据库设计
- [ ] 创建数据库迁移文件
- [ ] 运行迁移
- [ ] 测试 RLS 策略
- [ ] 创建预设模板工作流

**Day 6-7**: 基础 Server Actions
- [ ] saveWorkflow
- [ ] loadWorkflow
- [ ] executeWorkflow
- [ ] getWorkflowTemplates
- [ ] 测试所有 actions

**里程碑**: ✅ 能加载模板工作流并成功执行

---

### Week 2: 阶段 1+2 实现 (5-7天)

**Day 1-2**: WorkflowPlayer 组件
- [ ] 单列布局设计
- [ ] 节点卡片样式
- [ ] 控制面板 UI
- [ ] 实时执行状态更新
- [ ] 动画效果

**Day 3**: 阶段1 完成
- [ ] 预设工作流展示
- [ ] 模板切换功能
- [ ] "解释工作流"功能
- [ ] 练习题和检查逻辑

**Day 4-5**: 阶段2 编辑功能
- [ ] Prompt 编辑 UI
- [ ] 实时保存修改
- [ ] "恢复默认"功能
- [ ] 3道练习题
- [ ] 自动成功检查

**Day 6**: 阶段切换和导航
- [ ] Tab 切换 UI
- [ ] 进度追踪
- [ ] 解锁逻辑（完成阶段1才能进阶段2）

**Day 7**: 测试和优化
- [ ] 端到端测试
- [ ] 性能优化
- [ ] Bug 修复

**里程碑**: ✅ 阶段1+2 完全可用，学生能观察和编辑工作流

---

### Week 3: 阶段 3 实现 (5-7天)

**Day 1-2**: WorkflowBuilder 编辑器
- [ ] 三列布局
- [ ] 工具箱组件
- [ ] 配置面板
- [ ] 拖拽功能（或点击添加）

**Day 3**: 节点操作
- [ ] 添加节点
- [ ] 删除节点
- [ ] 连接节点（简化版连线）
- [ ] 编辑节点配置

**Day 4**: 保存和加载
- [ ] 保存工作流到数据库
- [ ] 加载已保存的工作流
- [ ] 工作流列表 UI
- [ ] 删除工作流

**Day 5**: 挑战任务
- [ ] 3个挑战任务说明
- [ ] 任务模板（可选）
- [ ] 完成检查逻辑
- [ ] 成功庆祝 UI

**Day 6**: 测试运行
- [ ] 在编辑器中测试运行
- [ ] 调试模式（显示每步详情）
- [ ] 错误处理和提示

**Day 7**: 优化和打磨
- [ ] 新手引导（tooltips）
- [ ] 快捷键支持
- [ ] 撤销/重做（可选）
- [ ] 性能优化

**里程碑**: ✅ 阶段3 完成，学生能自由创建工作流

---

### Week 4: 测试、优化、文档 (5-7天)

**Day 1-2**: 全面测试
- [ ] 功能测试（所有 user flows）
- [ ] 边界情况测试
- [ ] 错误处理测试
- [ ] 跨浏览器测试

**Day 3**: 学生 Beta 测试
- [ ] 邀请 5-10 个初中生
- [ ] 观察他们的使用过程
- [ ] 收集反馈
- [ ] 记录卡点

**Day 4**: 根据反馈调整
- [ ] UI 优化（基于观察）
- [ ] 增加提示/引导
- [ ] 简化复杂操作
- [ ] Bug 修复

**Day 5**: 响应式适配
- [ ] 平板适配
- [ ] 手机适配（简化版）
- [ ] 测试不同屏幕尺寸

**Day 6**: 性能优化
- [ ] 大工作流加载优化
- [ ] 执行过程优化
- [ ] 内存管理
- [ ] 打包大小优化

**Day 7**: 文档和发布
- [ ] 教师使用指南
- [ ] 学生帮助文档
- [ ] 代码注释完善
- [ ] 部署到生产环境

**里程碑**: ✅ Lab 6 全部完成，准备正式上线

---

## 🎉 额外功能（可选/后续）

### 进阶节点类型

**分支节点** (BranchNode):
```
根据条件选择不同路径

           ┌─────────┐
           │  条件   │
           └─────────┘
              /   \
            是/     \否
            /       \
    ┌─────────┐  ┌─────────┐
    │ 路径A   │  │ 路径B   │
    └─────────┘  └─────────┘
```

**循环节点** (LoopNode):
```
重复执行某些步骤

    ┌─────────┐
    │ 开始循环 │
    └─────────┘
         ↓
    ┌─────────┐
    │  步骤   │ ←┐
    └─────────┘  │
         ↓       │
    ┌─────────┐  │
    │ 继续？  │──┘
    └─────────┘
         ↓ 否
    ┌─────────┐
    │  结束   │
    └─────────┘
```

### 社区功能

**工作流分享**:
- 学生可以公开自己的作品
- 浏览其他学生的工作流
- 点赞和收藏
- 评论和讨论

**工作流市场**:
- 按分类浏览（学习、创作、工具等）
- 搜索功能
- 热门排行榜
- 使用次数统计

### 协作功能

**多人协作**:
- 实时共同编辑工作流
- 版本历史
- 评论和批注

### 导出功能

**生成代码**:
- 导出为 Python 脚本
- 导出为 JavaScript 代码
- 学生可以在真实环境运行

---

## 📚 参考资料

### 类似产品研究

**Scratch** (MIT):
- 积木式编程教学平台
- 借鉴：可视化、拖拽、颜色编码

**n8n**:
- 工作流自动化工具
- 借鉴：节点设计、连线方式

**Flowise**:
- LLM 应用构建工具
- 借鉴：AI 节点类型、执行引擎

**Zapier**:
- 自动化平台
- 借鉴：简洁的 UI、模板系统

### 技术文档

**React Flow**:
- 官方文档: https://reactflow.dev/
- 示例: https://reactflow.dev/examples

**Supabase**:
- JSONB 查询: https://supabase.com/docs/guides/database/json
- RLS 策略: https://supabase.com/docs/guides/auth/row-level-security

---

## 🎯 成功指标 (KPIs)

### 学习成果
- **完成率**: 70%+ 学生完成全部 3 个阶段
- **创作率**: 60%+ 学生创建了自己的工作流
- **运行成功率**: 80%+ 的学生工作流能成功执行

### 参与度
- **平均时长**: 50-70 分钟（符合预期 60 分钟）
- **重试次数**: 平均每个工作流 3-5 次测试运行
- **保存率**: 50%+ 学生保存了自己的作品

### 技术性能
- **执行成功率**: 95%+ 工作流执行成功
- **平均执行时间**: <10 秒（3步工作流）
- **API 成功率**: 98%+ LLM 调用成功

### 用户反馈
- **推荐度**: NPS > 50
- **"有趣"评分**: 4.5+/5
- **"学到东西"评分**: 4.5+/5

---

**文档结束**

---

**下一步行动**:
1. ✅ 本文档已完成
2. 🔄 更新主 PRD 文档，添加 Lab 6
3. 🔄 开始实施 Week 1 任务

**维护者**: Product Manager (John)
**审核**: [待定]
**批准**: [待定]
