# LLM Learning Lab PRD (AI Literacy Education Platform)

## 1. Purpose & Vision

**Transform the existing platform into an LLM learning laboratory that combines theoretical understanding with hands-on practice, helping students understand LLM principles and master practical skills.**

Students first learn what LLMs are and how they work, then practice prompt techniques through embedded editors, seeing LLM outputs change in real-time, thereby building correct AI understanding and critical thinking.

**Vision**: "Through theory + practice, enable learners to understand AI principles, master practical skills, and become responsible AI users"

---

## 2. Target Learners

### Primary: Middle School Students (Ages 12-15)
- **Background**: Beginners curious about AI but with no prior knowledge
- **Goal**: Understand what LLMs are, how they work, what they can and cannot do
- **Pain**: "What is ChatGPT? Is it really thinking? Can I trust it?"
- **Success**:
  - ✅ Understand LLM fundamentals (training, generation, limitations)
  - ✅ Use LLMs effectively (clear communication, role-setting, guided reasoning)
  - ✅ Develop critical thinking (knowing when to trust, when to question)
  - ✅ Use AI responsibly (academic integrity, privacy protection)

### Secondary: Teen Programming Enthusiasts (Ages 15-18)
- **Background**: Some programming experience, wanting to dive deeper into AI
- **Goal**: Understand AI principles and apply them to real projects
- **Success**:
  - ✅ Master AI literacy fundamentals
  - ✅ Design complex prompts and workflows
  - ✅ Build foundation for further AI/ML learning

---

## 3. Core Product Changes (Platform Transformation)

### Unchanged ✅
- **Overall page layout**: Dashboard, sidebar navigation
- **Lab list UI**: Left sidebar lab cards, completion tracking
- **Progress system**: Supabase-based progress tracking
- **User authentication**: Supabase auth
- **AI infrastructure**: askCoach() server action (reusable)
- **UI component library**: shadcn/ui, Tailwind CSS

### Core Changes 🔄

| Previous Feature | New Feature | Reason |
|-----------------|-------------|---------|
| **Sandpack code editor** | **Article-based lessons + Embedded Prompt Editor** | No coding needed, focus on AI understanding and usage |
| **WebContainer Node.js environment** | **LLM API response display** | Direct LLM output display, no runtime needed |
| **File tree + terminal** | **Article content + Interactive experiments** | Simplified UI for theory learning + practice |
| **Observe AI coding** | **Understand AI principles + Practice prompt techniques** | Shift from coding to AI literacy education |

---

## 4. Product Journey Snapshot

| Lab | Duration | Topic | Theory | Practice | Learning Outcomes |
|-----|----------|-------|--------|----------|-------------------|
| **Lab 1** | 20 min | Meet Your AI Friend | What LLMs are, how they work | First conversation, refining questions | Understand LLMs + Ask questions |
| **Lab 2** | 25 min | How AI Gets Smart | Training process, knowledge sources | Clear communication practice | Understand training + Write specific prompts |
| **Lab 3** | 25 min | AI's "Thinking" Process | Generation mechanism, context role | Role-playing practice | Understand generation + Set roles |
| **Lab 4** | 30 min | AI's Capabilities & Limits | Superpowers vs weaknesses, hallucinations | Guide deep reasoning | Critical thinking + Advanced techniques |
| **Lab 5** | 30 min | Responsible AI Use | Ethics, academic integrity | Comprehensive scenarios | Ethical awareness + Integrated application |
| **Lab 6** | 60 min | AI Workflow Builder ⭐ | Problem decomposition, systems thinking | Observe→Modify→Create workflows | Computational thinking + Workflow design |

**Total Duration**: ~3.2 hours for complete course

**Course Structure**: 40% theory + 60% practice - each lab follows "understand principles first, then practice"

**Note**: Lab 6 is an advanced "capstone project" integrating all knowledge and skills from Labs 1-5

---

## 5. Lab 内容结构设计

### 每个 Lab 的统一结构

```markdown
# Lab X: [主题名称]

## 📖 学习目标
- 目标1
- 目标2
- 目标3

## 🎯 核心概念

[文章式讲解，包含：]
- 概念解释
- 为什么重要
- 实际应用场景

## 💡 示例展示

<PromptEditor readonly>
  示例prompt内容
</PromptEditor>

<LLMOutput>
  对应的LLM输出
</LLMOutput>

## ✏️ 动手练习

[2-3个递进式练习]

### 练习 1: [练习名称]
**任务**: 修改prompt达到特定目标

<PromptEditor editable initialValue="...">
  学生可编辑的prompt起点
</PromptEditor>

<LLMOutput live>
  实时显示API调用结果
</LLMOutput>

**目标**: [清晰描述期望的输出特征]
**提示**: [如果卡住了的引导性提示]

## 🎓 挑战题

**场景**: [实际应用场景]
**你的任务**: [开放式任务描述]

<PromptEditor editable blank>
  空白编辑器让学生从零开始
</PromptEditor>

**成功标准**:
- [ ] 输出包含X
- [ ] 输出语气是Y
- [ ] 输出长度约Z

## 📝 总结

- 关键要点1
- 关键要点2
- 下一步学什么
```

---

## 6. Core Features

### 6.1 嵌入式 Prompt 编辑器组件

**技术方案**: 简单的 textarea + 语法高亮（可选）

```typescript
<PromptEditor
  mode="readonly" | "editable" | "blank"
  initialValue={string}
  placeholder={string}
  onSubmit={(prompt) => callLLM(prompt)}
  showCharCount={boolean}
  maxLength={number}
/>
```

**功能**:
- ✅ 多行文本输入
- ✅ 字符计数提示
- ✅ "运行"按钮调用 LLM API
- ✅ 加载状态显示
- ✅ 错误处理（API失败、超时）

**不需要**:
- ❌ 复杂的代码编辑器（Monaco）
- ❌ 文件管理
- ❌ 终端模拟

### 6.2 LLM 输出展示组件

```typescript
<LLMOutput
  mode="static" | "live"
  content={string}
  loading={boolean}
  error={string | null}
  showTokenCount={boolean}
  highlightDifferences={boolean} // 对比前后输出变化
/>
```

**功能**:
- ✅ 格式化显示 LLM 响应
- ✅ 加载动画（打字机效果可选）
- ✅ 错误消息友好展示
- ✅ 可选：显示token使用量（教育目的）
- ✅ 可选：高亮输出中的关键变化

### 6.3 文章内容渲染（MDX 嵌入组件）

**技术方案**: MDX（Markdown + JSX）- 支持在文章中嵌入 React 组件

**关键决策**: ✅ **组件必须可嵌入文章内**（用户需求）

```mdx
# Lab 1: 什么是 Prompt

正文内容介绍概念...

## 💡 试一试

下面是一个简单的例子。点击"运行"看看 AI 的回答：

<PromptEditor
  initialValue="告诉我关于猫的事情"
  exerciseId="lab1-ex1"
/>

<LLMOutput mode="live" />

继续正文讲解为什么这个 prompt 有效...
```

**实现方案**:
1. 使用 `@next/mdx` 或 `next-mdx-remote`
2. 在 MDX 中直接使用 PromptEditor/LLMOutput 组件
3. 组件间通过 React Context 共享状态（prompt → output）

**文件组织**:
```
app/dashboard/vibecoding/labs/
├── lab1.mdx              # Lab 1 文章+组件
├── lab2.mdx              # Lab 2 文章+组件
├── lab3.mdx
├── lab4.mdx
└── lab5.mdx
```

### 6.4 实时 LLM API 调用

**复用现有基础设施**: `askCoach()` server action

**调整方案**:
```typescript
// 新增专门的 prompt lab 调用
export async function runPromptLab(request: {
  prompt: string
  labNumber: number
  exerciseId: string
}) {
  // 1. 验证用户认证
  // 2. 调用真实 LLM API (OpenAI/Anthropic)
  // 3. 记录到 lab_submissions 表
  // 4. 返回输出 + metadata
}
```

**与 askCoach() 的区别**:
- `askCoach()`: 辅导性对话，有上下文记忆
- `runPromptLab()`: 单次 prompt 执行，用于练习

### 6.5 自动成功检查机制（关键功能）

**用户需求**: ✅ **练习题必须自动检查成功**

**实现方案**: 两种方案并行

#### 方案 A: 规则检查（推荐，零成本）

每个练习定义成功标准规则：

```typescript
interface SuccessCriteria {
  exerciseId: string
  rules: {
    containsKeywords?: string[]      // 必须包含的关键词
    minLength?: number                // 最小字符数
    maxLength?: number                // 最大字符数
    format?: 'json' | 'markdown' | 'plain'  // 输出格式
    sentiment?: 'positive' | 'negative' | 'neutral'  // 情感倾向
    customRegex?: string              // 自定义正则表达式
  }[]
  passingScore: number  // 满足几条规则算通过
}
```

**示例**:
```typescript
// Lab 1 练习 2: 让 AI 写故事（包含特定元素）
{
  exerciseId: "lab1-ex2",
  rules: [
    { containsKeywords: ["猫", "冒险"] },  // 必须包含主题词
    { minLength: 100 },                    // 至少100字
    { sentiment: "positive" }              // 积极的语气
  ],
  passingScore: 3  // 3条都满足才通过
}
```

#### 方案 B: LLM 判断（备选，更灵活但有成本）

用另一个 GPT-4o-mini 调用判断：

```typescript
async function checkWithLLM(
  exerciseGoal: string,
  llmOutput: string
): Promise<{ success: boolean, feedback: string }> {
  const systemPrompt = `
你是一个教学助手，判断学生的 prompt 练习是否成功。

练习目标：${exerciseGoal}
LLM 输出：${llmOutput}

请判断：
1. 输出是否符合练习目标？
2. 给出简短反馈（1-2句话）

返回 JSON:
{ "success": true/false, "feedback": "..." }
  `

  // 调用 GPT-4o-mini 获取判断
  // 成本：~$0.01/次
}
```

**推荐策略**:
- Lab 1-3: 使用规则检查（简单明确）
- Lab 4-5: 可选使用 LLM 判断（更复杂的标准）

### 6.6 进度追踪

**复用现有表结构** + 新增字段:

```sql
-- 复用 module_progress 表
-- 新增 prompt_lab_progress 表
CREATE TABLE prompt_lab_progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  lab_number INT,
  exercise_id TEXT, -- e.g., "lab1-ex1"
  prompt_submitted TEXT,
  llm_response TEXT,
  success BOOLEAN, -- 是否达到目标
  attempts INT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ
);
```

**新增索引**:
```sql
CREATE INDEX idx_prompt_lab_user ON prompt_lab_progress(user_id, lab_number);
```

---

## 7. Technical Blueprint (改动范围)

### 7.1 需要新建的组件

```
components/features/prompt-lab/
├── PromptEditor.tsx          # 核心编辑器组件
├── LLMOutputDisplay.tsx      # 输出展示组件
├── LabArticle.tsx            # 文章容器组件
├── ExerciseCard.tsx          # 练习题卡片
└── SuccessCriteria.tsx       # 成功标准检查器
```

### 7.2 需要修改的组件

```
app/dashboard/vibecoding/
├── page.tsx                  # 保持lab列表UI，只改数据源
└── vibecoding-client.tsx     # 保持布局，改内部渲染逻辑

app/dashboard/vibecoding/[labId]/
└── page.tsx                  # 新增动态路由页面
    └── lab-content.mdx       # MDX格式的lab内容
```

### 7.3 需要新建的 Server Actions

```typescript
// lib/actions/prompt-lab.ts

export async function runPrompt(request: RunPromptRequest) {
  // 调用 LLM API
  // 记录提交
  // 返回结果
}

export async function checkSuccess(request: CheckSuccessRequest) {
  // ✅ 必须：自动检查是否达到成功标准（用户需求）
  // 方案1（推荐）：基于规则检查（关键词、长度、格式）
  // 方案2（备选）：用另一个LLM调用判断是否符合标准
  // 返回：{ success: boolean, feedback: string }
}

export async function getLabContent(labNumber: number) {
  // 返回lab的文章内容和练习结构
}
```

### 7.4 数据库迁移

**新增迁移文件**: `supabase/migrations/20251016_prompt_lab.sql`

```sql
-- 创建 prompt_lab_progress 表
-- 添加必要的索引
-- 设置 RLS 策略
```

---

## 8. Lab Course Outline (Theory + Practice Integration)

### Lab 1: Meet Your AI Friend — What are LLMs + First Conversation (20 min)

**Part A: Understanding LLMs** (10 min)
- What is AI, what is an LLM
- LLM vs Search Engine vs Calculator
- How LLMs work (predicting the next word)
- AI is not a person, it's an intelligent tool
- Interactive experiments:
  - Ask simple questions, observe AI responses
  - Ask the same question 3 times, notice slight variations (understanding randomness)

**Part B: First Conversation** (10 min)
- 💡 Concept: A prompt is an instruction to AI
- ✏️ Exercise 1: Improve your question (vague → clear)
- ✏️ Exercise 2: Have AI write a story (adding details)
- 🎯 Discovery: The clearer you communicate, the better AI responds

**Learning Outcomes**:
- ✅ Know what LLMs are and how they work
- ✅ Ask your first question
- ✅ Understand the importance of clear communication

---

### Lab 2: How AI Gets Smart + Learning Clear Communication (25 min)

**Part A: LLM's Learning Process** (12 min)
- How LLMs learn (training data, pattern recognition)
- What LLMs have "read" (internet text, books, code)
- Why some questions are answered well, others poorly
- Understanding knowledge cutoff dates
- Interactive experiments:
  - Ask about 2020 vs 2024 events → Discover knowledge boundaries
  - Ask obscure vs common knowledge → Understand data influence

**Part B: Clear Communication Techniques** (13 min)
- Why specificity matters (based on how LLMs work)
- Three elements: Details, Constraints, Context
- ✏️ Exercise 1: Have AI write a story (vague → specific)
  - Vague: "Write a story"
  - Specific: "Write a 200-word sci-fi story featuring a cat on an adventure"
- ✏️ Exercise 2: Add format requirements
- 🎯 Challenge: Get JSON format output

**Learning Outcomes**:
- ✅ Understand LLM learning sources and limitations
- ✅ Master clear communication methods
- ✅ Write effective detailed instructions

---

### Lab 3: AI's "Thinking" Process + Role-Playing Magic (25 min)

**Part A: How LLMs Generate Responses** (12 min)
- Token concept (how AI understands text)
- Word-by-word generation process
- Role of context (previous text determines what follows)
- Why responses vary slightly each time (probabilistic selection)
- Interactive experiments:
  - Ask same question multiple times → Observe differences
  - Gradually add context → See improved responses

**Part B: Role-Playing Techniques** (13 min)
- Why role-setting works (based on context understanding)
- System prompts / Role-setting function
- ✏️ Exercise 1: Have AI play teacher explaining concepts
- ✏️ Exercise 2: Have AI play poet writing poetry
- ✏️ Exercise 3: Compare outputs from different roles
- 🎯 Challenge: Design your custom AI assistant persona

**Learning Outcomes**:
- ✅ Understand LLM generation mechanisms
- ✅ Use role-setting to change output style
- ✅ Understand context's impact on responses

---

### Lab 4: AI's Capabilities & Limits + Guiding Deep Reasoning (30 min)

**Part A: LLM's Superpowers and Weaknesses** (15 min)
- ✅ Great at: Writing, summarizing, translating, explaining
- ⚠️ Use caution: Math, facts, recent information
- ❌ Weaknesses: Complex reasoning, making up information
- Understanding "hallucinations" (AI inventing plausible-sounding but false information)
- Interactive experiments:
  - Math problem test → Discover calculation errors
  - Fact-checking challenge → Find outdated knowledge
  - Identify AI fabrications → Learn to question

**Part B: Chain-of-Thought (Step-by-Step Reasoning)** (15 min)
- Why guide AI's "thinking" (compensating for reasoning weaknesses)
- How to make AI show reasoning steps
- ✏️ Exercise 1: Have AI show problem-solving process
  - "Please explain your reasoning step by step"
- ✏️ Exercise 2: Guide AI through complex problem analysis
- 🎯 Challenge: Design multi-step guidance for real problems

**Learning Outcomes**:
- ✅ Clearly know what AI can and cannot do
- ✅ Develop critical thinking and fact-checking skills
- ✅ Master techniques for guiding AI's deep reasoning

---

### Lab 5: Responsible AI Use + Comprehensive Application (30 min)

**Part A: AI Ethics and Responsible Use** (12 min)
- Academic integrity: AI-assisted learning vs plagiarism
  - ✅ Good: Using AI to explain concepts, brainstorm ideas
  - ❌ Bad: Copying homework answers directly
- Privacy protection: What NOT to tell AI
  - ❌ Personal information, passwords, home addresses
- Case discussions and voting
- Create your personal "AI Usage Principles"

**Part B: Comprehensive Practice** (18 min)
Apply all techniques (clear communication, role-setting, step-by-step guidance)

- ✏️ **Scenario 1: Learning Assistant**
  - Task: Have AI explain a difficult concept (e.g., "photosynthesis")
  - Requirement: Don't want direct answers, want to understand the reasoning
  - Techniques: Clear communication + Role-setting (teacher) + Guided reasoning

- ✏️ **Scenario 2: Creative Writing Partner**
  - Task: Use AI to help write a short essay
  - Process: Brainstorm → AI suggestions → Your creation
  - Techniques: Role-setting (creative consultant) + Multi-turn dialogue

- ✏️ **Scenario 3: Research Assistant**
  - Task: Research a topic (e.g., "dinosaur extinction")
  - Process: Information gathering → Fact-checking → Organize & summarize
  - Techniques: Clear communication + Critical thinking (verify information)

- 🎯 **Open Challenge**: Solve your own real problem
  - Choose your own topic, apply all skills comprehensively

**Learning Outcomes**:
- ✅ Establish responsible AI usage mindset
- ✅ Flexibly apply all techniques in real scenarios
- ✅ Understand AI is a tool, you are the leader

---

### Lab 6: AI Workflow Builder (60 min) ⭐ Advanced Capstone Project

**Purpose**: Comprehensive application of all prompt engineering skills as a "capstone project"

**Learning Objectives**:
- Understand "complex tasks = combination of simple steps"
- Learn problem decomposition (computational thinking)
- Master prompt chaining
- Develop systems thinking

**Three Progressive Stages**:

**Stage 1: Observe Workflows (15 min)**
- See how preset "Story Creator" workflow runs
- Understand how data flows from step to step
- Observe variable substitution in prompts

**Stage 2: Modify Workflows (20 min)**
- Edit prompts for each step
- See how modifications affect final output
- Practice exercises:
  1. Make ideas more sci-fi
  2. Add story twists
  3. Change output tone

**Stage 3: Free Creation (25 min)**
- Build your own workflow from blank canvas
- Use block-style drag-and-drop (or click-to-add)
- Challenge tasks (choose 1 of 3):
  - Homework Helper (analyze problem → hint reasoning → verify method)
  - Translation Polisher (translate → check → improve)
  - Free Creation (design your own)

**Technical Implementation**:
- Visual workflows using React Flow
- Custom node types (Input, AI Step, Output)
- Lightweight execution engine
- Full detailed design: `docs/labs/lab6-workflow-builder.md`

**Educational Value**:
- ⭐⭐⭐⭐⭐ Cultivate "problem decomposition" computational thinking
- Understand AI agent and automation fundamentals
- Build foundation for future programming/AI engineering learning

**Cost Estimate**:
- ~37 LLM calls per student
- Cost: ~$0.17/student (Labs 1-5: $0.16)
- 6% increase, educational value far exceeds cost

---

## 9. Success Metrics

### Learning Outcome Metrics
- **80%+ completion rate**: Students complete Labs 1-5 (foundation course)
- **60%+ advanced completion**: Students complete Lab 6 (advanced project)
- **Average duration**: Each lab completed within target time
- **Exercise success rate**: 70%+ of exercises succeed on first or second attempt
- **Creation rate**: 50%+ of students create their own workflow in Lab 6

### Technical Metrics
- **LLM API response time**: <3 seconds
- **API success rate**: 95%+
- **Page load time**: <2 seconds

### Engagement Metrics
- **Retry attempts**: Average 1.5-2 attempts per exercise
- **Coaching requests**: 30%+ students use askCoach for help
- **Post-completion retention**: 50%+ students return within a week for review

---

## 10. Cost Estimates

### LLM API 成本
**确定选择**: ✅ **GPT-4o**（用户决策）

**Lab 1-5 成本（基础课程）**:
- 5 labs × 平均7次练习/实验 = 35次 API 调用/学生
- 平均每次调用: 200 tokens input + 400 tokens output
- Input: 35 × 200 = 7,000 tokens = $0.0175
- Output: 35 × 400 = 14,000 tokens = $0.14
- **Lab 1-5 成本: ~$0.16/student**（比原计划增加$0.02，因为增加了理论实验）

**Lab 6 成本（进阶工作流）**:
- 观察3次 + 编辑8次 + 创建20次 = 37次 API 调用
- Input: 37 × 200 = 7,400 tokens = $0.0185
- Output: 37 × 400 = 14,800 tokens = $0.148
- **Lab 6 成本: ~$0.17/student**

**总成本（6个labs）**:
- **完整课程: ~$0.33/student** (Lab 1-5: $0.16 + Lab 6: $0.17)

**规模成本**:
- 100学生: ~$33/月
- 500学生: ~$165/月
- 1000学生: ~$330/月

**实际成本预估**:
- 如使用 LLM 做成功检查: 每次练习额外 +$0.01
- 推荐：使用规则检查（零成本）
- 预计80%学生完成 Lab 1-5，60%学生完成 Lab 6
- **实际平均成本: ~$0.26/student** ($0.16 × 80% + $0.17 × 60%)
- **100学生实际成本: ~$26/月**

---

## 11. Risks & Mitigations

### Risk 1: LLM 输出不当内容
**Impact**: High（不适合初中生）
**Mitigation**:
- 使用带 safety filter 的 API
- Content moderation 检查
- 家长/教师监督选项

### Risk 2: 学生觉得太简单/太难
**Impact**: Medium（流失率）
**Mitigation**:
- Beta测试调整难度
- 提供难度选择（基础/进阶）
- 实时反馈调整

### Risk 3: API 成本突然上涨
**Impact**: Low（可控）
**Mitigation**:
- Rate limiting（每天最多X次调用）
- 缓存常见练习答案
- 预留成本buffer

---

## 12. Out of Scope (MVP)

**不做**:
- ❌ 代码编写功能（纯 prompt 学习）
- ❌ 多人协作
- ❌ 教师dashboard
- ❌ 证书生成（可后续添加）
- ❌ 移动端app（web first）
- ❌ 中文以外的语言版本
- ❌ 高级prompt技巧（function calling, embeddings等）

---

## 13. Implementation Phases

### Phase 1 (Week 1-2): 核心组件开发
- ✅ PromptEditor 组件
- ✅ LLMOutputDisplay 组件
- ✅ runPrompt server action
- ✅ 数据库迁移
- **Milestone**: 一个完整的练习流程可工作

### Phase 2 (Week 2-3): Lab 内容创作
- ✅ Lab 1-3 完整内容（文章+练习）
- ✅ MDX 集成和渲染
- ✅ 进度追踪UI
- **Milestone**: 前3个labs可完整体验

### Phase 3 (Week 3-4): Lab 4-5 + 完善
- ✅ Lab 4-5 内容
- ✅ 成功标准自动检查
- ✅ 辅导功能集成
- **Milestone**: 全部5个labs完成

### Phase 4 (Week 4-5): 测试和优化
- ✅ Beta测试（10-20个初中生）
- ✅ 根据反馈调整内容和难度
- ✅ 性能优化
- ✅ 错误处理完善
- **Milestone**: 准备正式发布

### Phase 5 (Week 5-6): 发布准备
- ✅ Landing page 更新
- ✅ 使用指南/教师资源
- ✅ 部署到生产环境
- ✅ 监控和分析设置
- **Milestone**: 正式发布

---

## 14. Decisions & Open Questions

### ✅ 已确认的决策

**产品设计**:
- ✅ **Lab 数量**: 5个基础 labs + 1个进阶 lab（Lab 6）
- ✅ **难度调整**: 不需要难度分级，统一版本
- ✅ **成功检查**: 必须自动检查，不用学生自评
- ✅ **组件嵌入**: PromptEditor 和 LLMOutput 必须可嵌入文章内
- ✅ **Lab 6 定位**: 进阶"毕业项目"，可视化工作流搭建

**技术选型**:
- ✅ **LLM 选择**: GPT-4o（确认）
- ✅ **内容组织**: MDX（支持组件嵌入）
- ✅ **Lab 6 技术栈**: React Flow + 自定义节点 + 轻量级执行引擎

### ❓ 待确认的问题

**产品功能**:
- [ ] 是否允许学生保存和分享优秀prompt？
- [ ] 是否需要"解释为什么这个prompt有效"的按钮？
- [ ] 是否需要查看其他学生的 prompt 示例？

**自动检查实现**:
- [ ] 规则检查（关键词+格式）还是用 LLM 判断？
- [ ] 检查失败时提供什么样的提示？
- [ ] 允许几次重试？

**内容策略**:
- [ ] 是否包含"常见错误"示例对比？
- [ ] 每个练习是否需要"提示"按钮？
- [ ] 是否参考 Anthropic 课程内容结构？

**技术细节**:
- [ ] 是否需要 prompt 版本历史记录？
- [ ] 是否需要离线模式/缓存？

---

## 15. Competitive Positioning

| Feature | LLM Learning Lab | Anthropic Course | Other Coding Platforms |
|---------|-----------------|------------------|----------------------|
| **Target Audience** | Middle school students (12-15) | Adult developers | Teen programmers |
| **Teaching Focus** | AI Literacy (theory+practice) | Prompt engineering skills | Coding skills |
| **Duration** | 3.2 hours | 4-6 hours | Months |
| **Theory vs Practice** | 40% theory + 60% practice | 10% theory + 90% practice | 5% theory + 95% practice |
| **Critical Thinking** | ✅ Emphasized | ⚠️ Limited | ❌ None |
| **Ethics Education** | ✅ Comprehensive | ⚠️ Briefly mentioned | ❌ None |
| **Interactivity** | Real-time LLM calls | Static examples | Code exercises |
| **Barrier to Entry** | Zero prerequisites | Technical background needed | Programming required |
| **Language** | ✅ English | ✅ English | Mixed |
| **Price** | Free (MVP) | Free | $10-50/month |

**Unique Value**: "First AI literacy education platform for middle schoolers — teaching not just how to use AI, but what it is, why it works, and when to trust it"

---

## 16. Marketing Messages (For Parents/Schools)

### Core Value Propositions
🧠 **AI Literacy Education**: Teaching not just how to use AI, but what it is, why it works, and when to question it
🎯 **Theory + Practice**: 40% understanding principles + 60% hands-on practice
⚡ **Learn in 3 Hours**: Complete on a weekend, build proper AI understanding
🔍 **Critical Thinking**: Learn to question AI, verify information, avoid blind trust
⚖️ **Responsible Use**: Comprehensive ethics education and academic integrity training
🧒 **Beginner-Friendly**: No coding required, suitable for all middle schoolers
🌐 **Fully in English**: Clear, accessible educational content

### Parent FAQs
**Q: My child has no programming background. Can they learn this?**
A: Absolutely! The course starts with "What is AI?" — complete beginners welcome.

**Q: How is this different from typical AI tutorials?**
A: We don't just teach how to use AI. More importantly, we teach students to understand AI's principles, limitations, and proper usage. We cultivate AI literacy, not just operational skills.

**Q: What will my child gain from this?**
A: Students will:
- ✅ Understand how AI works and develop proper AI understanding
- ✅ Effectively use ChatGPT and similar tools to assist learning
- ✅ Develop critical thinking — knowing when to trust AI
- ✅ Use AI responsibly while maintaining academic integrity

**Q: Won't this make my child overly dependent on AI?**
A: Quite the opposite! The course specifically emphasizes AI's limitations and responsible use. We teach students to treat AI as an assistant tool, not an answer machine.

**Q: Is the content safe?**
A: All LLM outputs are filtered for safety. The course includes comprehensive privacy protection and safe usage education.

---

**Document Version**: 2.0 EN (AI Literacy Education Platform for Middle School Students)
**Created**: 2025-10-16
**Last Updated**: 2025-10-16
**Status**: ✅ Major Update: Transformed to AI Literacy Education (Theory + Practice) + Full English Localization

**Major Updates (v2.0 EN)**:
- ✅ **Teaching Focus Shift**: From pure skill training → AI Literacy Education (40% theory + 60% practice)
- ✅ **Labs 1-5 Redesigned**: Each lab includes "Understanding Principles" + "Practice Techniques"
- ✅ **New Content**: Critical thinking, hallucination recognition, ethics education, responsible use
- ✅ **Lab 6 Retained**: Workflow builder as advanced "capstone project"
- ✅ **Full English Localization**: All content, UI, and documentation in English

**Confirmed Decisions**:
- ✅ 5 foundation labs (theory+practice) + 1 advanced lab (Lab 6 workflow)
- ✅ GPT-4o for LLM API
- ✅ MDX for articles + embedded components
- ✅ Rule-based checking (auto success validation)
- ✅ Unified difficulty (no leveling)
- ✅ Lab 6: React Flow visual workflow editor

**Key Documents**:
- 📄 Main PRD: This document
- 📄 Lab 6 Detailed Design: `docs/labs/lab6-workflow-builder.md`

**Next Steps**:
1. ✅ PRD v2.0 EN Complete (AI Literacy Education + English)
2. ✅ Lab 6 detailed design completed
3. 🔄 Create or update Architecture document
4. 🔄 Create Epic and detailed Stories (Labs 1-6)
5. 🔄 Begin Phase 1 implementation (Week 1-2)
