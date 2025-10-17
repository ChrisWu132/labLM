# Tech Stack - LLM Learning Lab

## Frontend Stack

### Core Framework
```yaml
Framework: Next.js 15.2.4
- App Router: ✅
- Server Components: ✅
- Server Actions: ✅
- TypeScript: ✅
```

### UI & Styling
```yaml
CSS Framework: Tailwind CSS v4
UI Components: shadcn/ui (Radix UI primitives)
Icons: Lucide React
Typography: Inter (Google Fonts)
```

### Content & Editor
```yaml
MDX: next-mdx-remote
- Supports: RSC (React Server Components)
- Usage: Lab article content with embedded components

Prompt Editor: Simple <textarea>
- No Monaco: ❌ (removed)
- No CodeMirror: ❌ (not needed)
- Syntax Highlighting: Optional (react-syntax-highlighter)

Workflow Canvas (Lab 6): React Flow v11+
- Usage: Visual node-based workflow builder
- Features: Drag-and-drop nodes, connections, zoom/pan
- Performance: Handles 50+ nodes smoothly
- Docs: https://reactflow.dev/
```

### State Management
```yaml
Client State: React hooks (useState, useEffect)
Server State: Server Components + Server Actions
Workflow State (Lab 6 only): Zustand
- Usage: Manage workflow builder canvas state (nodes, edges)
- Lightweight alternative to Redux
- Integrates well with React Flow
No Redux: ❌
```

### Removed Dependencies ❌
```yaml
WebContainer: @webcontainer/api - 不再需要浏览器 Node.js
Monaco Editor: @monaco-editor/react - 不再需要代码编辑器
Terminal: xterm + xterm-addon-fit - 不再需要终端模拟
```

---

## Backend Stack

### Runtime & Platform
```yaml
Platform: Next.js 15 (Server Actions)
Runtime: Node.js (Vercel serverless functions)
NOT Edge Runtime: ❌ (需要 AI SDKs)
```

### Database & Auth
```yaml
Database: Supabase (PostgreSQL)
- Version: PostgreSQL 15+
- Features: Row Level Security (RLS)
- Client: @supabase/ssr

Authentication: Supabase Auth
- Methods: OAuth (Google, GitHub), Email/Password
- Session: Cookie-based
```

### AI Integration
```yaml
Provider: OpenAI
- Model: GPT-4o (确定选择，根据 PRD)
- SDK: openai@latest
- Approach: Simple text completion (非 function calling)

Fallback: None (Phase 1)
- Phase 2: 可考虑缓存或备用模型
```

### Storage
```yaml
Object Storage: Supabase Storage
- Buckets: certificates (可选)
- Usage: 存储生成的证书 (未来功能)
```

---

## Development Tools

### Package Manager
```yaml
Manager: npm
- Lock file: package-lock.json
- Node version: >=18.17.0
```

### Linting & Formatting
```yaml
Linter: ESLint (Next.js config)
Formatter: Prettier (推荐)
TypeScript: Strict mode
```

### Testing (后期添加)
```yaml
Unit: Vitest (推荐)
E2E: Playwright (可选)
```

---

## Deployment

### Hosting
```yaml
Platform: Vercel
- Framework Preset: Next.js
- Runtime: Node.js
- Regions: US East (默认)
```

### CI/CD
```yaml
Trigger: Git push to main
- Auto-deploy: Vercel
- Preview: PR branches
- Production: main branch
```

### Monitoring
```yaml
Analytics: Vercel Analytics
Logs: Vercel Logs + Supabase Dashboard
Error Tracking: Vercel (built-in)
- Phase 2: 可考虑 Sentry
```

---

## Dependencies Overview

### Production Dependencies
```json
{
  "next": "15.2.4",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "^5",
  "@supabase/ssr": "latest",
  "openai": "latest",
  "next-mdx-remote": "latest",
  "lucide-react": "latest",
  "tailwindcss": "^4",
  "zod": "^3.22.0",
  "reactflow": "^11.10.0",
  "zustand": "^4.5.0"
}
```

**Note**: `reactflow` and `zustand` are only used in Lab 6 (Workflow Builder)

### Dev Dependencies
```json
{
  "@types/node": "^20",
  "@types/react": "^19",
  "eslint": "^8",
  "eslint-config-next": "15.2.4",
  "prettier": "^3",
  "prettier-plugin-tailwindcss": "^0.5.0"
}
```

---

## Version Requirements

| Package | Minimum Version | Recommended |
|---------|----------------|-------------|
| Node.js | 18.17.0 | 20.x LTS |
| npm | 9.0.0 | Latest |
| Next.js | 15.2.4 | 15.2.4 |
| TypeScript | 5.0.0 | 5.x |
| Supabase | N/A (BaaS) | Latest |
| React Flow | 11.10.0 | 11.x (Lab 6) |
| Zustand | 4.5.0 | 4.x (Lab 6) |

---

## Environment Setup

### Local Development
```bash
# 1. Install dependencies
npm install

# 2. Setup Supabase
supabase init
supabase start

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your keys

# 4. Run database migrations
supabase db reset

# 5. Start dev server
npm run dev
```

### Production
```bash
# 1. Set environment variables in Vercel Dashboard
# 2. Push to main branch
git push origin main
# 3. Vercel auto-deploys
```

---

**Last Updated**: 2025-10-17
**Status**: Active (Includes Lab 6 React Flow and Zustand)
