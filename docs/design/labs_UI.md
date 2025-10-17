# VibeCoding Labs（Lab 1–5）UI 设计方案（对齐 Redesign 规范）

# Labs UI authoring guide
版本：2.0  日期：2025-10-17  状态：已实施

目标：在不改变现有信息架构和交互流程的前提下，统一 Lab 1–5 的视觉与交互样式，使其与《VibeCoding Lab UI Redesign Specification》（docs/design/ui-redesign-spec-en.md）保持一致，同时吸收《labs-ui_referrence.md》的视觉做法，并适配现有 MDX 内容与组件。

**最新更新（v2.0）**：引入专用 MDX 卡片组件，替代纯 Markdown 渲染，实现完整的 UI 规范对齐。

--

## 1. 设计原则（与 Redesign 对齐）
- 氛围：Fresh、Light、Encouraging
- 结构：卡片化、层级清晰；交互闭环（编辑→运行→反馈）明确

--
- Success：`#22C55E`（Fresh Green）
- Cyan：`#06B6D4`（次操作/提示）
- Amber：`#F59E0B`（强调，少量）
- Neutrals：背景 `#F7F8FA`，卡片 `#FFFFFF`，描边 `#E5E7EB`，正文 `#6B7280`，标题 `#111827`
- Radius：`rounded-2xl` 为主（16–20px）


## 3. 页面框架
- 路由：`/dashboard/vibecoding/labs/[labId]`
- 左侧：可折叠 Lab 列表 + Coach（保留现状）
- 右侧：MDX 渲染区 `max-w-4xl mx-auto px-4 py-8`，区块 `space-y-6`

--

  - `h2: font-display text-[1.875rem] mt-10 mb-5 text-slate-800 font-extrabold`
  - `h3: text-[1.5rem] mt-8 mb-4 text-slate-800 font-bold`
  - `p/ul/ol/strong`：正文 `text-slate-600`，强调 `text-slate-800`

--

## 5. 交互组件样式

### 5.1 PromptEditor（交互输入）
- 容器：`bg-white border-2 border-slate-300/50 rounded-2xl shadow-sm p-4 md:p-5 focus-within:border-[#3A7BFA]`
- 文本域：`w-full min-h-[120px] p-3 bg-transparent border-0 focus:outline-none placeholder:text-slate-400`
- 工具栏：左侧字数 `text-sm text-slate-500`；右侧按钮组
- 辅助按钮 “Use Example”：`bg-cyan-50 text-cyan-700 border border-cyan-200 rounded-2xl px-4 py-2`（一键填入 placeholder/initialValue）
- 主按钮：`bg-[#3A7BFA] text-white rounded-2xl px-5 py-2.5`（动效：hover brightness + translateY）

### 5.2 LLMOutputDisplay（输出与反馈）
- 输出容器：`bg-gray-50 dark:bg-gray-900 border rounded-2xl p-4 min-h-[120px]`

## 6. Lab 信息流模板
1) 标题（H1）+ 导语
2) 学习目标卡（Key Info Card）
3) 概念讲解 + 表格/示例（`<StaticPromptDemo/>`）
4) 交互实验（`<PromptEditor/>` + 实时反馈）
5) 小结/关键发现卡
6) 挑战题（更严格规则 + 产出格式）
7) CTA 链接（“Start Lab X →” 按钮化）


## 7. 反馈与状态
- 通过：绿底横幅；可在侧边栏显示完成态
- 限流：温和提示（30 次/小时）


## 8. 与代码映射（已实现）
- MDX 映射与样式：`app/dashboard/vibecoding/labs/[labId]/page.tsx:1`
  - 自定义 a/table/thead/tr/th/td/h2/h3/p/ul/ol/strong 映射
  - 新增专用卡片组件映射（详见 8.1）
- LLMOutputDisplay：`components/features/prompt-lab/LLMOutputDisplay.tsx:15`（圆角与色彩统一）

### 8.1 MDX 专用卡片组件（新增）
位置：`app/dashboard/vibecoding/labs/[labId]/_components/LabCards.tsx`

**可用组件列表**：
- `<ObjectivesCard duration="~20 minutes">...</ObjectivesCard>` — 学习目标卡片，蓝色顶边
- `<ExperimentBlock title="..." icon="🔬">...</ExperimentBlock>` — 实验区块，蓝底
- `<ExerciseBlock title="..." number={1}>...</ExerciseBlock>` — 练习区块，绿底
- `<DiscoveriesCard>...</DiscoveriesCard>` — 关键发现卡片，黄色顶边
- `<QuizCard><QuizItem>...</QuizItem></QuizCard>` — 快速测验卡片，绿色顶边，包含可复选项
- `<NextSteps href="/path">...</NextSteps>` — 下一步 CTA 区块
- `<PromptComparison badPrompt="..." badOutput="..." goodPrompt="..." goodOutput="..." />` — 好坏 Prompt 对比卡片

**使用示例**：
```mdx
<ObjectivesCard duration="~20 minutes">
- 理解 LLM 的工作原理
- 编写你的第一个 Prompt
</ObjectivesCard>

<ExperimentBlock title="Interactive Experiment 1" icon="🔬">
观察 LLM 如何响应同一个问题...
<PromptEditor exerciseId="lab1-demo" mode="editable" />
</ExperimentBlock>

<ExerciseBlock number={1} title="Improving Questions">
<PromptComparison
  badPrompt="Tell me about dogs."
  badOutput="Dogs are mammals..."
  goodPrompt="Explain to a 10-year-old why dogs are good pets."
  goodOutput="Dogs are great because..."
/>
<PromptEditor exerciseId="lab1-ex1" mode="editable" />
</ExerciseBlock>

<DiscoveriesCard>
1. LLMs 是预测机器
2. 清晰的 Prompt 带来更好的回复
</DiscoveriesCard>

<QuizCard>
<QuizItem>什么是 LLM？</QuizItem>
<QuizItem>LLM 与搜索引擎的区别？</QuizItem>
</QuizCard>

<NextSteps href="/dashboard/vibecoding/labs/lab2">
恭喜完成！准备好继续了吗？
</NextSteps>
```

--

## 9. 示例片段
- CTA 链接（按钮化）：
  ```html
  <a class="inline-flex items-center gap-1 px-4 py-2 rounded-2xl bg-[#3A7BFA] text-white">Start Lab 2 →</a>
  ```
- 表格容器：
  ```html
  <div class="rounded-2xl border-2 border-slate-200/80 shadow-sm bg-white">
    <table class="w-full text-left">…</table>
  </div>
  ```
- Prompt 工具栏：
  ```tsx
  <div className="flex items-center gap-2">
    <button className="px-4 py-2 rounded-2xl bg-cyan-50 text-cyan-700 border border-cyan-200">Use Example</button>
    <button className="px-5 py-2.5 rounded-2xl bg-[#3A7BFA] text-white">Run Prompt</button>
  </div>
  ```

--

## 10. 验收清单
- [ ] 链接按钮化与表格卡片化生效
- [ ] PromptEditor 出现 “Use Example” 并可用
- [ ] 标题/正文层级与色彩对齐规范
- [ ] 交互流程无回归（编辑→运行→反馈）

附：本方案仅调整 UI，兼容现有数据与 Server Actions。
