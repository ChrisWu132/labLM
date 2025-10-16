# Components 架构说明

**最后更新**: 2025-10-13
**版本**: 2.0 (VibeCoding Lab 聚焦版)

---

## 📂 目录结构

```
components/
├── features/          # 功能模块专用组件
│   ├── orientation/   # Orientation 模块
│   │   ├── checklist-card.tsx          # 设置清单卡片
│   │   └── orientation-welcome.tsx     # 欢迎动画组件
│   │
│   └── vibecoding/    # VibeCoding Lab 核心
│       ├── lab-card.tsx               # Lab 卡片（显示 Lab 1/2/3）
│       └── sandpack-wrapper.tsx       # Sandpack 包装器（待 WebContainers 替换）
│
├── layout/            # 布局组件（跨页面共享）
│   ├── dashboard-header.tsx           # Dashboard 顶部导航
│   ├── module-sidebar.tsx             # 侧边栏（仅显示 Orientation + VibeCoding）
│   └── theme-provider.tsx             # 主题切换 Provider
│
├── shared/            # 跨模块共享组件
│   ├── coach-drawer.tsx               # AI Coach 抽屉（全局可用）
│   ├── module-header.tsx              # 模块标题组件
│   └── progress-pill.tsx              # 进度状态徽章
│
├── ui/                # shadcn/ui 基础组件库
│   ├── button.tsx, card.tsx, badge.tsx (更新为新设计规范)
│   └── ... (其他 shadcn 组件)
│
└── _deprecated/       # 废弃组件（不再使用，但保留以防回滚）
    ├── features/
    │   ├── demo/                      # ❌ Demo & Certificate 模块（MVP 不做）
    │   └── go-to-market/              # ❌ Go-To-Market 模块（已删除）
    └── shared/
        └── video-player.tsx           # ❌ 视频播放器（Orientation 不再需要）
```

---

## 🎯 VibeCoding Lab 当前架构

根据最新 PRD ([vibecoding-lab-prd.md](../docs/prd/vibecoding-lab-prd.md))，产品聚焦于：

### 核心流程
1. **Orientation** → 快速欢迎 + 设置（5 分钟）
2. **VibeCoding Lab** → 3 个渐进式 Labs（45 分钟）
   - Lab 1: Personal Landing Page (10 min)
   - Lab 2: Interactive Counter App (15 min)
   - Lab 3: Weather Dashboard (20 min)

### 不再包含的模块
- ❌ Problem Discovery（已从产品中移除）
- ❌ Go-To-Market（已从产品中移除）
- ❌ Iterate（已从产品中移除）
- ❌ Demo & Certificate（MVP 阶段不做）

---

## 📦 组件分类说明

### 1. `features/` - 功能模块专用

**原则**: 仅供特定模块使用，不跨模块复用

#### `orientation/`
- **checklist-card.tsx**: 显示 Sandpack/Supabase/Community 设置清单
- **orientation-welcome.tsx**: 30 秒自动播放的欢迎动画

#### `vibecoding/`
- **lab-card.tsx**: 显示 Lab 卡片（标题、时长、难度、锁定状态）
- **sandpack-wrapper.tsx**: 当前 Sandpack 集成（未来替换为 WebContainers）

**未来扩展** (Post-MVP):
- `vibecoding/webcontainer-platform.tsx` - WebContainers 三面板界面
- `vibecoding/ai-status-feed.tsx` - AI 实时状态流
- `vibecoding/code-explainer.tsx` - 代码解释器组件

---

### 2. `layout/` - 布局组件

**原则**: 跨页面共享的布局结构

- **dashboard-header.tsx**: 顶部导航（Logo、用户头像、设置、Help）
- **module-sidebar.tsx**: 左侧边栏（仅显示 Orientation + VibeCoding Lab）
- **theme-provider.tsx**: Light/Dark 模式切换

**注意**: 根据 Epic-003 更新，未来可能移除侧边栏，改为全屏 Header-only 布局。

---

### 3. `shared/` - 跨模块共享

**原则**: 多个模块都可能用到的通用组件

- **coach-drawer.tsx**: AI Coach 对话抽屉（右侧滑出）
- **module-header.tsx**: 页面标题 + 描述组件
- **progress-pill.tsx**: 状态徽章（Not Started / In Progress / Completed）

---

### 4. `ui/` - 基础组件库

**来源**: shadcn/ui

**最近更新** (2025-10-13):
- **button.tsx**: 圆角 16px，新增 `success` variant，悬停动画
- **card.tsx**: 圆角 16-20px，浅层/浮层阴影
- **badge.tsx**: 支持 success/info/warning/amber 颜色

**设计规范**: 参见 [ui-redesign-spec.md](../docs/design/ui-redesign-spec.md)

---

### 5. `_deprecated/` - 废弃组件

**原则**: 不再使用但暂时保留的组件

#### 为什么保留？
- 防止回滚时需要
- 代码审计追溯
- 未来功能参考

#### 废弃组件列表

| 组件路径 | 原用途 | 废弃原因 | 废弃日期 |
|---------|--------|---------|---------|
| `features/demo/*` | Demo & Certificate 模块 | MVP 不包含此功能 | 2025-10-13 |
| `features/go-to-market/*` | Go-To-Market 模块 | 产品聚焦于 VibeCoding | 2025-10-13 |
| `shared/video-player.tsx` | Orientation 视频播放 | 改为 30s 动画欢迎 | 2025-10-13 |

**清理策略**: MVP 上线后 3 个月，可删除 `_deprecated/` 文件夹。

---

## 🚀 使用指南

### 引入组件示例

```tsx
// ✅ 正确：功能模块专用组件
import { LabCard } from "@/components/features/vibecoding/lab-card"

// ✅ 正确：跨模块共享组件
import { CoachDrawer } from "@/components/shared/coach-drawer"

// ✅ 正确：基础 UI 组件
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// ❌ 错误：不要引用废弃组件
import { VideoPlayer } from "@/components/_deprecated/shared/video-player"
```

### 新增组件规范

#### 1. 功能模块专用组件
```
components/features/{module-name}/{component-name}.tsx
```

**示例**: `components/features/vibecoding/webcontainer-platform.tsx`

#### 2. 跨模块共享组件
```
components/shared/{component-name}.tsx
```

**示例**: `components/shared/ai-status-feed.tsx`

#### 3. 基础 UI 组件
使用 shadcn/ui CLI 添加：
```bash
npx shadcn@latest add {component-name}
```

---

## 🔍 组件依赖关系

```
┌─────────────┐
│   ui/       │ ← 最底层：无业务逻辑
└──────┬──────┘
       │
┌──────▼──────┐
│  shared/    │ ← 中间层：通用业务组件
└──────┬──────┘
       │
┌──────▼──────┐
│  features/  │ ← 最上层：模块专用组件
│  layout/    │
└─────────────┘
```

**依赖原则**:
- ✅ `features/` 可以引用 `shared/` 和 `ui/`
- ✅ `shared/` 可以引用 `ui/`
- ❌ `ui/` 不应引用 `shared/` 或 `features/`
- ❌ 同级模块不应互相引用（如 `orientation/` 不引用 `vibecoding/`）

---

## 📊 组件数量统计

| 类别 | 活跃组件 | 废弃组件 |
|------|----------|---------|
| **features/** | 4 | 3 |
| **layout/** | 3 | 0 |
| **shared/** | 3 | 1 |
| **ui/** | 56 | 0 |
| **总计** | 66 | 4 |

---

## 🔧 维护指南

### 定期检查（每月）
1. 运行 `npm run build` 确认无未使用组件警告
2. 审查 `_deprecated/` 是否可以删除
3. 更新本 README 反映最新架构

### 重构建议
- 当 `shared/` 组件只被一个模块使用时，考虑移到 `features/{module}/`
- 当 `features/` 组件被多个模块使用时，考虑提升到 `shared/`

---

## 📚 相关文档

- [VibeCoding Lab PRD](../docs/prd/vibecoding-lab-prd.md)
- [Epic-003: Vibecoding Platform](../docs/epics/epic-003-vibecoding.md)
- [UI Redesign Spec](../docs/design/ui-redesign-spec.md)

---

**维护者**: UX Expert (Sally)
**审核**: 产品负责人
