# 快速参考 - LLM Learning Lab 重构

## 🔧 常用命令

### 开发
```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 运行 linter
npm run lint
```

### 数据库
```bash
# 重置本地数据库 (运行所有迁移)
npx supabase db reset

# 查看迁移状态
npx supabase migration list

# 运行特定迁移
npx supabase migration up

# 测试数据库连接和表
node scripts/test-db.js
```

### 测试
```bash
# 数据库自动化测试
node scripts/test-db.js

# 构建测试
npm run build
```

---

## 📁 关键文件位置

### 配置文件
- `next.config.mjs` - Next.js 配置 (MDX 支持)
- `mdx-components.tsx` - MDX 组件映射
- `.env` - 环境变量 (需填入 API keys)
- `.bmad-core/core-config.yaml` - BMAD 配置

### 数据库
- `supabase/migrations/20251016000000_llm_learning_lab_initial.sql` - 初始 schema
- `supabase/migrations/20251016000001_rollback_llm_learning_lab.sql` - Rollback

### 类型定义
- `types/prompt-lab.ts` - Prompt Lab 类型定义

### 测试脚本
- `scripts/test-db.js` - 数据库测试 (Node.js)
- `scripts/verify-schema.sql` - Schema 验证 (SQL)

---

## 📊 数据库表结构

### `prompt_lab_progress`
用户练习进度记录
```sql
user_id + lab_number + exercise_id -> 唯一
lab_number: 1-5
包含: prompt, response, success, attempts
```

### `module_progress`
Lab 模块完成状态
```sql
user_id + module_number -> 唯一
module_number: 0-5
包含: completed, completed_at
```

### `ai_usage_log`
AI 调用日志 (rate limiting)
```sql
user_id + action + created_at
用于: 30 次/小时限制
```

---

## 🔑 环境变量

### 必须配置 (需填入真实值)
```bash
OPENAI_API_KEY=sk-...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### 已配置
```bash
NEXT_PUBLIC_SUPABASE_URL=https://bhugrkmtekghbarfnqcw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
AI_MODEL=gpt-4o
AI_TIMEOUT_MS=30000
AI_MAX_TOKENS=500
```

---

## 🎯 开发流程

### Phase 2 - 核心组件 (下一步)
1. 创建 `PromptEditor` 组件
2. 创建 `LLMOutputDisplay` 组件
3. 实现 `runPrompt()` server action
4. 创建 success checker
5. 创建测试页面

### 组件位置规划
```
components/
  └── features/
      └── prompt-lab/
          ├── PromptEditor.tsx
          └── LLMOutputDisplay.tsx

lib/
  ├── actions/
  │   └── prompt-lab.ts (runPrompt)
  ├── prompt-lab/
  │   └── success-checker.ts
  └── rate-limit.ts

app/
  └── dashboard/
      └── test-prompt/
          └── page.tsx
```

---

## 🧪 测试清单

### Phase 1 完成验证
- [x] 旧依赖全部移除
- [x] 新依赖安装成功
- [x] 数据库迁移运行成功
- [x] 3 个表创建成功
- [x] RLS 策略启用
- [x] 构建成功
- [x] 数据库测试通过

### Phase 2 需要验证
- [ ] PromptEditor 渲染正常
- [ ] LLMOutputDisplay 显示正确
- [ ] runPrompt() 调用 OpenAI 成功
- [ ] Success checker 规则正确
- [ ] Rate limiting 正常工作
- [ ] 数据持久化到数据库

---

## 🐛 故障排查

### 构建失败
```bash
# 清理并重新安装依赖
rm -rf node_modules .next
npm install --legacy-peer-deps
npm run build
```

### 数据库连接失败
```bash
# 确保 Docker Desktop 运行中
# 检查 Supabase 服务状态
npx supabase status

# 重启服务
npx supabase stop
npx supabase start
```

### 测试失败
```bash
# 检查环境变量
cat .env

# 重新运行迁移
npx supabase db reset

# 重新测试
node scripts/test-db.js
```

---

## 📚 相关文档

- [完整重构计划](./docs/refactor.md)
- [Phase 1 完成报告](./PHASE1_COMPLETE.md)
- [BMAD Agents](./AGENTS.md)
- [Architecture](./docs/architecture/)

---

## 🎉 Phase 2 & 3 新增功能

### 测试 Prompt Lab 组件
```bash
# 访问测试页面
http://localhost:3000/dashboard/test-prompt
```

### 体验完整 Labs
```bash
# 访问 Lab 列表
http://localhost:3000/dashboard/vibecoding

# 直接访问 Lab
http://localhost:3000/dashboard/vibecoding/labs/lab1
http://localhost:3000/dashboard/vibecoding/labs/lab2
```

### 核心文件位置 (新增)
```
components/features/prompt-lab/
  ├── PromptEditor.tsx
  └── LLMOutputDisplay.tsx

lib/
  ├── actions/prompt-lab.ts (runPrompt server action)
  ├── prompt-lab/success-checker.ts
  └── rate-limit.ts

content/labs/
  ├── lab1.mdx (完整)
  ├── lab2.mdx (完整)
  └── lab3-5.mdx (占位符)
```

---

**最后更新:** 2025-10-16
**当前阶段:** Phase 2 & 3 完成 ✅ (Lab 1-2 上线可用)
