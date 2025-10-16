# Epic 003: AI-Powered Vibecoding Platform

## Vision
Transform Module 2 (Vibecoding) from a simple Sandpack playground into a full WebContainers-based platform where students learn full-stack development by watching AI code in real-time. Target audience: **Complete programming beginners** who learn by observation, not by coding.

## Problem Statement
Current Sandpack implementation only supports frontend JavaScript. Students can't learn:
- Backend/server-side programming
- Real Node.js development workflows
- Complete full-stack architecture
- How AI-assisted development actually works in production

## Solution
Build a browser-based full-stack development environment powered by:
- **WebContainers**: Run real Node.js in the browser (no backend servers needed)
- **AI Agent**: Generates, tests, and fixes code automatically
- **Visual Learning**: Students observe the complete development cycle

## Target Outcome
Non-programmers complete 3 labs and gain foundational understanding of:
1. Frontend (HTML/CSS/JS) - "What users see"
2. Interactivity (JavaScript) - "Making things respond"
3. Full-Stack (Frontend + Backend + APIs) - "How real apps work"

**Success Metric**: 80% of students complete all 3 labs and can explain the difference between frontend and backend in their own words.

## User Personas

### Primary: Complete Beginner
- **Background**: Never coded before, maybe used no-code tools
- **Goal**: Understand how software works to build their startup MVP
- **Pain**: Intimidated by code, learns best by watching
- **Need**: Gentle introduction with clear explanations, no jargon

### Secondary: Career Switcher
- **Background**: Professional in non-tech field (marketing, sales, operations)
- **Goal**: Gain technical literacy to work with developers
- **Pain**: Traditional coding tutorials assume too much knowledge
- **Need**: Practical understanding without deep technical details

## Core Principles

### 1. Learning by Observation
Students **watch** AI code, they don't code themselves. Like watching a chef cook before trying yourself.

### 2. Process > Product
The goal isn't building perfect apps - it's understanding **how** apps get built (iterative, tested, debugged).

### 3. Simple Language
Zero jargon. Use analogies:
- Frontend = Restaurant dining area
- Backend = Kitchen
- API = Supplier
- Bug = Recipe mistake

### 4. Visible Progress
Everything AI does is narrated and visualized:
- Creating files → See new files appear
- Running tests → See pass/fail indicators
- Fixing bugs → See code changes highlighted

## UI Architecture (No Sidebar)

### Single-Page Experience

**✨ NEW PRODUCT VISION**: Orientation and VibeCoding Lab are merged into one seamless, full-width experience.

**🚫 LEFT SIDEBAR COMPLETELY REMOVED**:
- No traditional dashboard sidebar navigation
- No module navigation menu on the left
- Students get a focused, distraction-free learning environment
- All navigation consolidated into top header

**Layout**:
```
┌────────────────────────────────────────────────────────┐
│  [Logo] VibeCoding Lab    👤 [User] ⚙️ Settings ❓ Help │
├────────────────────────────────────────────────────────┤
│                                                        │
│              Full-Width VibeCoding Lab                 │
│                                                        │
│  [WebContainer Platform - 3 panels]                    │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**Header Only** (Top-Right Items):
- **Left**: Logo + "VibeCoding Lab" branding
- **Right**:
  - 👤 User avatar + **real name** (from Supabase auth.users.user_metadata.full_name, **NOT hardcoded "Alex Chen"**)
  - ⚙️ Settings dropdown
  - ❓ Help/Support button → Discord community link

**Routing Flow**:
- `/auth` → `/dashboard/orientation` (first-time users, **auto-plays 30s welcome**)
- Orientation **automatically transitions** to `/dashboard/vibecoding` (no button click needed)
- `/auth` → `/dashboard/vibecoding` (returning users, skip orientation entirely)
- All other routes removed (no problem-discovery, gtm, iterate, demo)

### Orientation Welcome Flow (Story 001)

**30-Second Auto-Playing Introduction** (Fully Automated):
1. User logs in → Welcome screen appears fullscreen
2. 4 animated messages with smooth transitions (6s each):
   - "Welcome, [User's **Real Name**]! You're joining a community..."
   - "Your AI Teacher will guide you step-by-step..."
   - "Zero Configuration - everything runs in your browser..."
   - "Community Support - join Discord, get help from coaches..."
3. **Automatic transition** to VibeCoding Lab (no button click, no manual action)

**🎯 KEY MESSAGES** (Must be emphasized with animations and clear text):
- 👥 **Community support**: Discord, coaches, peers - you're not alone
- 🤖 **AI teacher guidance**: Step-by-step teaching, no prior knowledge needed
- 🚀 **No configuration needed**: Zero setup, no installation, runs in browser
- ✨ **For complete beginners**: Aimed at students with **zero coding experience**

**Skip Option**: Small "Skip Intro ↗" button in corner (optional, not prominent)

**One-Time Only**: Returning users bypass orientation completely, go straight to Lab

**User Name**: Display actual user name from Supabase `auth.users.user_metadata.full_name` or email prefix - **NEVER use hardcoded "Alex Chen" or any constant name**

## Stories Breakdown

### Story 001: Orientation Welcome Flow
**Effort**: 3-4 days | **Priority**: P0 (Blocker)

Create engaging auto-playing welcome:
- 30-second animated introduction
- Emphasizes community, AI teacher, no-config, beginner-friendly
- Auto-transitions to VibeCoding Lab
- Displays real user name (from Supabase auth, **not** "Alex Chen")
- Skip button for fast users

**Value**: Sets welcoming tone, reduces intimidation, emphasizes support

### Story 004: WebContainers Platform Foundation
**Effort**: 8-10 days | **Priority**: P0 (Blocker)

Build the core infrastructure:
- WebContainers integration (browser-based Node.js)
- Three-panel layout: File Tree | Editor + Terminal | Preview
- Monaco Editor (read-only for students)
- xterm.js terminal (shows npm commands, output)
- Preview iframe (displays running app)

**Value**: Enables students to see real full-stack apps running in browser

### Story 005: AI Agent Code Generation
**Effort**: 10-12 days | **Priority**: P0 (Blocker)

Integrate AI Agent with visualization:
- Student enters prompt → AI generates code
- Function calling tools: createFile, updateFile, runCommand
- Real-time status feed narrating AI actions
- File highlight animations when AI creates/modifies code
- "Explain Code" feature for post-build learning

**Value**: Students learn by watching AI work, understand coding process

### Story 006: Auto-Testing & Self-Healing
**Effort**: 8-10 days | **Priority**: P0 (Blocker)

Complete the development cycle:
- AI auto-generates tests for each project
- Run tests automatically after code generation
- AI detects failures and explains errors (beginner-friendly)
- AI fixes bugs automatically (max 3 attempts)
- Visual test results panel with pass/fail indicators

**Value**: Students learn debugging is normal, see complete dev cycle

### Story 007: Lab Curriculum & Learning Path
**Effort**: 6-8 days | **Priority**: P0 (Blocker)

Design and implement 3 progressive labs:
- **Lab 1**: Personal Landing Page (HTML/CSS basics)
- **Lab 2**: Interactive Counter App (JavaScript, events)
- **Lab 3**: Weather Dashboard (Full-stack, APIs)

Includes:
- Starter prompts for each lab
- Pre-lab learning objectives
- Post-lab debriefs with key concepts
- Progress tracking and completion celebration

**Value**: Structured learning path, clear sense of progression

## Technical Architecture

### Stack
```
Frontend:
├── React (Next.js 15)
├── Monaco Editor (VSCode engine)
├── xterm.js (terminal)
└── WebContainers SDK (@webcontainer/api)

Backend:
├── Next.js Server Actions (AI orchestration)
├── Supabase (persistence)
└── AI API (OpenAI/Anthropic/multi-model)

State Management:
└── React hooks + Server Components (no Redux needed)
```

### Data Flow
```
1. Student enters prompt
   ↓
2. AI Agent receives prompt + system instructions
   ↓
3. AI generates code via function calls:
   - createFile(path, content)
   - runCommand(command, args)
   ↓
4. WebContainers executes (in browser)
   ↓
5. Tests run automatically
   ↓
6. If tests fail → AI fixes → Repeat
   ↓
7. Success → Preview shows working app
   ↓
8. Student clicks "Explain" → AI teaches what was built
```

### AI Agent Design

**System Prompt Structure:**
```yaml
Role: Coding assistant for complete beginners
Rules:
  - Use only Express for backend (keep dependencies minimal)
  - Always create: package.json, server.js, index.html
  - Narrate every step in simple terms
  - Generate appropriate tests
  - Fix bugs by reading error messages
Workflow:
  1. Announce what you're building
  2. Create files (show in status feed)
  3. Install dependencies (npm install)
  4. Run tests
  5. Fix any failures (max 3 attempts)
  6. Announce success
```

**Example Interaction:**
```
Student: "Create a random quote generator"

AI:
💬 "Creating project structure..."
[createFile("package.json", {...})]
[createFile("server.js", "...")] → File tree highlights new file
[createFile("index.html", "...")] → Editor shows content

💬 "Installing dependencies..."
[runCommand("npm", ["install"])] → Terminal shows: npm install express

💬 "Running tests..."
[runCommand("npm", ["test"])]
Terminal: ✗ Test failed: Server not starting on port 3000

💬 "Found the issue - fixing port configuration..."
[updateFile("server.js", "...")] → Diff shows change

💬 "Running tests again..."
Terminal: ✓ All 4 tests passed!

💬 "✅ Your quote generator is ready!"
```

## Dependencies

### External Services
- **WebContainers SDK**: StackBlitz (free for educational use)
- **AI API**: OpenAI/Anthropic (cost: ~$0.05-0.10 per lab completion)
- **Supabase**: Database + auth (existing)

### Technical Requirements
- Browser support: Chrome 90+, Edge 90+, Safari 15+ (WebContainers requirement)
- Memory: 512MB minimum (WebContainers needs RAM for Node.js)
- Network: Broadband recommended (WebContainers initial load ~2-3MB)

### Team Skills Needed
- WebContainers API knowledge (1-2 day learning curve)
- AI function calling / tool use (OpenAI/Anthropic APIs)
- Monaco Editor integration
- Terminal/shell output handling

## Risks & Mitigations

### Risk 1: WebContainers Browser Compatibility
**Impact**: High | **Probability**: Medium

Some older browsers don't support WebAssembly features needed for WebContainers.

**Mitigation**:
- Check browser support on page load
- Show clear error: "Please use Chrome/Edge/Safari to access Vibecoding"
- Provide fallback: "Download this Replit link instead" (manual option)

### Risk 2: AI Generates Broken Code
**Impact**: High | **Probability**: Medium

AI might generate code that doesn't work, even after 3 fix attempts.

**Mitigation**:
- Use well-tested templates for common patterns
- Limit AI to simple dependencies (Express only, no complex libraries)
- Provide "Help" button to contact coach if AI stuck
- Story 006 includes max retry limit with graceful failure

### Risk 3: Too Slow (Performance)
**Impact**: Medium | **Probability**: Medium

WebContainers + AI calls + npm install could take 60+ seconds.

**Mitigation**:
- Pre-bundle common dependencies (express cached)
- Use streaming for AI responses (show progress immediately)
- Optimize AI prompts to reduce token usage
- Target: <45 seconds total from prompt to working app

### Risk 4: Cost of AI API Calls
**Impact**: Medium | **Probability**: Low

Each lab might cost $0.10-0.20 in AI API fees per student.

**Mitigation**:
- Cache common patterns (e.g., "create a counter" → use template)
- Implement rate limiting (max 10 AI builds per day per user)
- Monitor costs closely in MVP phase
- Estimated cost: $0.60 per student for all 3 labs (acceptable)

### Risk 5: Students Don't Learn (Just Click Through)
**Impact**: High | **Probability**: Medium

Students might skip explanations and just complete labs without understanding.

**Mitigation**:
- Make debriefs visually engaging (not just text walls)
- Add reflection questions (optional but encouraged)
- Track time spent per lab (if <5 min, likely skipped)
- Future: Add quiz after each lab to verify understanding

## Success Metrics

### Primary (MVP)
- **80% completion rate** for all 3 labs (students who start Lab 1 finish Lab 3)
- **Average time per lab**: 10/15/20 minutes (Lab 1/2/3)
- **<1% error rate**: AI successfully generates working code on first or second try
- **Post-module survey**: 80%+ students say they "understand how web apps work"

### Secondary (Nice to Have)
- **AI fix success rate**: 90% of failing tests fixed within 3 attempts
- **Platform load time**: <5 seconds from page load to WebContainer ready
- **Code explanation engagement**: 60%+ students click "Explain Code" button

### Qualitative
- User testing feedback: Non-programmers report feeling "less intimidated by code"
- Students can explain frontend vs backend in interview-style questions
- No complaints about confusing jargon or overwhelming technical details

## Timeline

### Phase 1: Foundation (Weeks 1-2)
- Story 004: WebContainers Platform
- Milestone: Can load and display a hardcoded Express app

### Phase 2: AI Integration (Weeks 3-4)
- Story 005: AI Agent Code Generation
- Story 006: Auto-Testing & Self-Healing
- Milestone: AI can generate, test, and fix a simple app

### Phase 3: Content & Polish (Week 5)
- Story 007: Lab Curriculum
- Milestone: All 3 labs work end-to-end

### Phase 4: Testing & Launch (Week 6)
- User testing with 5-10 non-programmers
- Bug fixes and UX polish
- Milestone: Ready for student cohort

**Total: 6 weeks from kickoff to launch**

## Future Enhancements (Post-MVP)

### Immediate (Next Quarter)
- [ ] Lab 4: Database integration (SQLite in browser)
- [ ] AI can modify existing code based on student feedback
- [ ] Download project as .zip for local development
- [ ] Lab completion certificates

### Medium-term (6 months)
- [ ] Custom lab creator (students design their own experiments)
- [ ] Collaborative mode (pair programming with AI + human)
- [ ] Advanced debugging tools (step-through execution)
- [ ] Integration with Module 3 (use Vibecoding to build GTM assets)

### Long-term (1 year+)
- [ ] Full IDE experience (git, extensions, themes)
- [ ] Multi-language support (Python, Go, Rust via WebContainers)
- [ ] AI learns from student patterns (personalized teaching)
- [ ] Community lab marketplace (share and remix projects)

## Open Questions

1. **AI Model Selection**: Which model for code generation? (GPT-4, Claude 3.5, or multi-model routing?)
   - **Recommendation**: Start with GPT-4 Turbo (best at code + function calling), evaluate Claude 3.5 Sonnet in testing

2. **Test Framework**: Jest vs Vitest for auto-testing?
   - **Recommendation**: Vitest (faster, better for browser environments)

3. **Error Reporting**: How much terminal output to show students? Full npm logs or filtered?
   - **Recommendation**: Filtered (hide warnings, show only errors and success messages)

4. **Accessibility**: How to make code editor accessible for screen readers?
   - **Recommendation**: Monaco has built-in a11y, but add "Explain Code" audio option (future)

5. **Mobile Support**: Should Vibecoding work on mobile?
   - **Recommendation**: MVP is desktop/tablet only (WebContainers + 3-panel layout needs screen space), mobile in Phase 2

## Appendix

### Related Documentation
- [WebContainers API Docs](https://webcontainers.io/api)
- [Monaco Editor Integration](https://microsoft.github.io/monaco-editor/)
- [AI Function Calling Guide](https://platform.openai.com/docs/guides/function-calling)

### Comparison to Alternatives

| Feature | Current (Sandpack) | Proposed (WebContainers) | Replit/CodeSandbox |
|---------|-------------------|-------------------------|-------------------|
| Backend support | ❌ No | ✅ Yes | ✅ Yes |
| AI integration | ❌ No | ✅ Yes | 🟡 Partial |
| Self-hosted | ✅ Yes | ✅ Yes | ❌ No (3rd party) |
| Browser-based | ✅ Yes | ✅ Yes | ✅ Yes |
| Beginner-friendly | 🟡 Partial | ✅ Yes | 🟡 Partial |
| Cost | Free | Free | $7-20/month per user |

**Why WebContainers?**: Only option that gives us full control + backend support + free + AI integration.

---

**Epic Owner**: Product/Engineering Lead
**Last Updated**: 2025-10-13
**Status**: Planning → Ready for Development
