# LLM Learning Lab PRD (初中生 Prompt Engineering 教学平台)

## 1. Purpose & Vision

**将现有平台转型为面向初中生的 LLM 教学实验室，通过文章式课程 + 交互式 prompt 练习帮助学生理解和掌握 Prompt Engineering。**

学生通过阅读课程文章学习概念，然后在嵌入式编辑器中修改示例 prompt，实时看到 LLM 输出的变化，从而直观理解 prompt 对结果的影响。

**Vision**: "让初中生通过实践理解 AI，掌握与 LLM 对话的技能"

---

## 2. Target Learners

### Primary: 初中生（12-15岁）
- **Background**: 对 AI 感兴趣，有基本的阅读理解能力
- **Goal**: 理解 LLM 如何工作，学会写有效的 prompt
- **Pain**: "AI 很神秘，我不知道怎么让它给我想要的答案"
- **Success**: 能够写出清晰的 prompt，理解如何引导 LLM 生成特定输出

### Secondary: 青少年编程爱好者（15-18岁）
- **Background**: 有一定编程基础，想了解 AI
- **Goal**: 学习如何在项目中使用 LLM
- **Success**: 理解 prompt engineering 的核心概念，能应用到实际项目

---

## 3. Core Product Changes (从现有平台转型)

### 保持不变 ✅
- **整体页面布局**: Dashboard, sidebar navigation
- **Lab 列表 UI**: 左侧lab卡片列表，完成状态追踪
- **进度系统**: Supabase-based progress tracking
- **用户认证**: Supabase auth
- **AI基础设施**: askCoach() server action（可复用）
- **UI组件库**: shadcn/ui, Tailwind CSS

### 核心改动 🔄

| 原有功能 | 新功能 | 原因 |
|---------|-------|------|
| **Sandpack 代码编辑器** | **文章式课程 + 嵌入式 Prompt 编辑器** | 不需要写代码，专注于 prompt 学习 |
| **WebContainer Node.js环境** | **LLM API 调用展示区** | 直接展示 LLM 输出，无需运行环境 |
| **文件树 + 终端面板** | **文章内容 + Prompt/Output 卡片** | 简化界面，适合阅读和练习 |
| **观察 AI 编程** | **修改 Prompt 看输出变化** | 学习目标从编程转向 prompt engineering |

---

## 4. Product Journey Snapshot

| Lab | 时长 | 主题 | 学生体验 | 输出理解 |
|-----|------|------|---------|----------|
| **Lab 1** | 15 min | 什么是 Prompt | 阅读文章 → 修改示例prompt → 看输出变化 | 理解 prompt 的基本结构 |
| **Lab 2** | 20 min | 如何给清晰指令 | 学习具体性 → 练习改进模糊prompt → 达到目标输出 | 掌握清晰表达的重要性 |
| **Lab 3** | 20 min | 角色扮演技巧 | 学习 role prompting → 让AI扮演不同角色 → 对比输出 | 理解上下文对输出的影响 |
| **Lab 4** | 25 min | 分步思考引导 | 学习 chain-of-thought → 引导AI分步推理 → 获得详细解答 | 掌握引导AI深度思考的技巧 |
| **Lab 5** | 30 min | 综合应用挑战 | 应用所学技巧 → 完成多个实际场景 → 自由创作 | 综合运用所有技能 |
| **Lab 6** | 60 min | AI 工作流搭建 ⭐ | 观察工作流 → 修改步骤 → 自由创建 | 学会分解问题，搭建多步骤 AI 系统 |

**总时长**: 约 3 小时完成全部课程（Lab 1-5 基础 + Lab 6 进阶）

**注**: Lab 6 为进阶"毕业项目"，综合运用前5个labs的所有技能

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

## 8. Lab 课程大纲（初步）

### Lab 1: Prompt 基础（15分钟）
**学习目标**:
- 理解什么是 prompt
- 学会写基本的指令
- 了解LLM如何理解输入

**练习**:
1. 修改简单prompt看输出变化
2. 让AI写一个故事（添加细节要求）
3. 挑战：写prompt让AI生成特定格式的回复

### Lab 2: 清晰表达（20分钟）
**学习目标**:
- 具体性的重要性
- 如何避免歧义
- 提供充分上下文

**练习**:
1. 改进模糊prompt
2. 添加约束条件
3. 挑战：写prompt获得JSON格式输出

### Lab 3: 角色扮演（20分钟）
**学习目标**:
- System prompt 的作用
- 如何设定AI的角色
- 不同角色的输出差异

**练习**:
1. 让AI扮演老师解释概念
2. 让AI扮演诗人写诗
3. 挑战：设计自定义角色

### Lab 4: 引导思考（25分钟）
**学习目标**:
- Chain-of-thought prompting
- 分步推理
- 获得详细解释

**练习**:
1. 让AI展示解题步骤
2. 引导AI分析问题
3. 挑战：复杂问题的多步引导

### Lab 5: 综合应用（30分钟）
**学习目标**:
- 综合运用所有技巧
- 解决实际问题
- 创意应用

**练习**:
1. 场景1：学习助手
2. 场景2：创意写作
3. 场景3：数据分析助手
4. 开放挑战：自由创作

---

### Lab 6: AI 工作流搭建（60分钟）⭐ 进阶毕业项目

**定位**: 综合应用所有 prompt engineering 技能的"毕业项目"

**学习目标**:
- 理解"复杂任务 = 简单步骤的组合"
- 学会分解问题（computational thinking）
- 掌握 prompt 链接（prompt chaining）
- 培养系统性思维

**三个递进阶段**:

**阶段1: 观察工作流（15分钟）**
- 看预设的"故事创作助手"如何运行
- 理解数据如何从一步传到下一步
- 观察 prompt 中的变量替换

**阶段2: 修改工作流（20分钟）**
- 编辑每个步骤的 prompt
- 看修改如何影响最终输出
- 练习题：
  1. 让创意更科幻
  2. 添加故事转折
  3. 改变输出语气

**阶段3: 自由创建（25分钟）**
- 从空白画布搭建自己的工作流
- 使用积木式拖拽（或点击添加）
- 挑战任务（3选1）：
  - 作业助手（分析题目 → 提示思路 → 验证方法）
  - 翻译润色器（翻译 → 检查 → 改进）
  - 自由创作（学生自己设计）

**技术实现**:
- 使用 React Flow 可视化工作流
- 自定义节点类型（输入、AI步骤、输出）
- 轻量级执行引擎
- 完整的详细设计见：`docs/labs/lab6-workflow-builder.md`

**教学价值**:
- ⭐⭐⭐⭐⭐ 培养"分解问题"的计算思维
- 理解 AI agent 和自动化的基本原理
- 为未来学习编程/AI工程打基础

**成本估算**:
- 每个学生约 37 次 LLM 调用
- 成本: ~$0.17/学生（Lab 1-5 为 $0.14）
- 增加 21%，教学价值远超成本

---

## 9. Success Metrics

### 学习成果指标
- **80%+ 完成率**: 学生完成 Lab 1-5（基础课程）
- **60%+ 进阶完成率**: 学生完成 Lab 6（进阶项目）
- **平均时长**: 每个lab在目标时间内完成
- **练习成功率**: 70%+ 的练习首次或第二次尝试成功
- **创作率**: 50%+ 学生在 Lab 6 中创建了自己的工作流

### 技术指标
- **LLM API 响应时间**: <3秒
- **API 成功率**: 95%+
- **页面加载时间**: <2秒

### 参与度指标
- **重试次数**: 平均每题 1.5-2 次尝试
- **辅导请求**: 30%+ 学生使用askCoach寻求帮助
- **完成后留存**: 50%+ 学生一周内返回复习

---

## 10. Cost Estimates

### LLM API 成本
**确定选择**: ✅ **GPT-4o**（用户决策）

**Lab 1-5 成本（基础课程）**:
- 5 labs × 平均6次练习 = 30次 API 调用/学生
- 平均每次调用: 200 tokens input + 400 tokens output
- Input: 30 × 200 = 6,000 tokens = $0.015
- Output: 30 × 400 = 12,000 tokens = $0.12
- **Lab 1-5 成本: ~$0.14/student**

**Lab 6 成本（进阶工作流）**:
- 观察3次 + 编辑8次 + 创建20次 = 37次 API 调用
- Input: 37 × 200 = 7,400 tokens = $0.0185
- Output: 37 × 400 = 14,800 tokens = $0.148
- **Lab 6 成本: ~$0.17/student**

**总成本（6个labs）**:
- **完整课程: ~$0.31/student**

**规模成本**:
- 100学生: ~$31/月
- 500学生: ~$155/月
- 1000学生: ~$310/月

**注意**:
- 如使用 LLM 做成功检查: 每次练习额外 +$0.01
- 推荐：使用规则检查（零成本）
- 大部分学生可能只完成 Lab 1-5（80%），Lab 6 是可选进阶（60%）
- 实际成本可能介于 $14-31/100学生之间

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

| Feature | LLM Learning Lab | Anthropic课程 | 其他编程平台 |
|---------|-----------------|--------------|-------------|
| **目标受众** | 初中生（12-15岁） | 成人开发者 | 青少年编程学习者 |
| **学习时长** | 2小时 | 4-6小时 | 数月 |
| **互动性** | 实时LLM调用 | 静态示例 | 代码练习 |
| **门槛** | 零基础 | 有技术背景 | 需要编程基础 |
| **中文支持** | ✅ 完整中文 | ❌ 英文 | 部分中文 |
| **价格** | 免费（MVP） | 免费 | $10-50/月 |

**独特价值**: "首个为中文初中生设计的 Prompt Engineering 实验室"

---

## 16. Marketing Messages（面向家长/学校）

### 核心卖点
🎯 **AI时代必备技能**: 让孩子学会与AI有效沟通
⚡ **2小时快速入门**: 周末就能完成，不占用课业时间
🧒 **适合初中生**: 无需编程基础，从零开始
💡 **实践导向**: 不是理论课，是动手实验室
🌐 **完全中文**: 无语言障碍

### 家长关心的问题
**Q: 我的孩子没有编程基础，能学吗？**
A: 完全可以！课程专为零基础设计，通过实践学习。

**Q: 学完能做什么？**
A: 孩子将学会如何有效使用ChatGPT等AI工具，这是未来学习和工作的必备技能。

**Q: 内容安全吗？**
A: 所有LLM输出都经过安全过滤，确保适合青少年。

---

**Document Version**: 1.2 (LLM Learning Lab for Middle School Students)
**Created**: 2025-10-16
**Last Updated**: 2025-10-17
**Status**: ✅ Core Decisions Confirmed + Lab 6 Added → Ready for Architecture & Epic Creation

**Confirmed Decisions**:
- ✅ 5 basic labs + 1 advanced lab (Lab 6)
- ✅ GPT-4o for LLM API
- ✅ MDX for article + embedded components
- ✅ Auto-check for exercise success (rule-based)
- ✅ No difficulty levels (unified experience)
- ✅ Lab 6: Visual workflow builder using React Flow

**Key Documents**:
- 📄 Main PRD: This document
- 📄 Lab 6 Detailed Design: `docs/labs/lab6-workflow-builder.md` (40,000+ words)

**Next Steps**:
1. ✅ PRD finalized (with Lab 6)
2. ✅ Lab 6 detailed design completed
3. 🔄 Create Architecture document (if needed)
4. 🔄 Create Epic with detailed Stories (Lab 1-6)
5. 🔄 Start Phase 1 implementation (Week 1-2 for Lab 1-5)
