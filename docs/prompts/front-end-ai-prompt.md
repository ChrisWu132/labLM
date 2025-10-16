# Interactive AI Startup Course Frontend AI Prompt

## Copy This Prompt Into Your AI Frontend Tool
```text
You are an expert Next.js 15 + TypeScript + Tailwind CSS engineer. Build the Interactive AI Startup Course MVP UI exactly as described below. Focus on scaffolded, production-ready code that developers can refine, not throwaway prototypes.

High-Level Goal:
1. Implement the marketing landing page and authenticated dashboard shell.
2. Create module pages (Orientation through Demo & Certificate) with the layouts, components, and interactions defined in the UX specification.
3. Stub safe client/server hooks for Supabase reads and writes plus AI coach interactions without exposing secrets.

Project Context:
- Tech stack: Next.js 15 app router, TypeScript, Tailwind CSS, @supabase/auth-helpers-nextjs, Supabase client, @codesandbox/sandpack-react (lazy loaded), Headless UI or Radix primitives if needed.
- Hosting assumption: Vercel (Node runtime for server actions).
- Data contracts: module_progress, research_inputs, problem_briefs, sandpack_submissions, gtm_actions, iterate_logs, demo_submissions, coach_transcripts (see schema comments in code).
- AI coach calls flow through server actions that wrap a callCoach helper; never call external providers directly from the client.

Visual & UX Guardrails (summarized; follow details from spec):
- Sidebar navigation with Orientation, Problem Discovery, Vibecoding, Go-To-Market, Iterate, Demo & Certificate, Settings/Support.
- Dashboard content max width 960px, right-side coach drawer on desktop, bottom sheet on mobile.
- Color tokens: primary #1A5CFF, navy #0E1B3D, teal #1BC5AE, amber #FFB347, neutrals #111827/#E5E7EB/#F7F9FC.
- Typography: Inter font stack with H1 32/40, H2 24/32, H3 20/28, body 16/24, small 14/20.
- Accessibility: WCAG 2.1 AA, keyboard navigable modals, aria-live updates for coach responses.
- Responsiveness: collapse sidebar on <1024px, use stacked layout for Sandpack on mobile, keep coach access visible.

Detailed Build Steps (execute sequentially):
1. Project setup: scaffold app router structure under `app/` with `layout.tsx`, global Tailwind config, and metadata reflecting course name. Create `lib` folder for Supabase and coach helpers.
2. Marketing landing page (`app/page.tsx`): implement hero, module overview grid, proof section with certificate thumbnails, pricing, FAQ accordion, final CTA. Use static JSON constants and accessible accordion controls.
3. Auth route (`app/auth/page.tsx`): render Supabase Auth UI component configured for magic link + Google OAuth, redirecting to `/dashboard/orientation`.
4. Dashboard shell: create `app/dashboard/layout.tsx` with sidebar navigation, top header, and responsive behavior. Include progress pill ("Module X of 6"), learner name placeholder, coach drawer toggle, and support link. Provide mobile sheet for navigation.
5. Shared components (place in `components/`): ModuleSidebar, ModuleHeader (context strip), ProgressPill, ChecklistCard, StepCard, CoachDrawer (with transcript list + Ask Coach form), LabCard, TrackToggle (ToB/ToC), SubmissionFooter, CertificatePreviewModal, Toast/Alert primitives tied to status.
6. Orientation module page: roadmap summary, setup checklist (Sandpack account, Supabase login, community link), embedded 3-minute video placeholder, start button that calls `startModule(0)` server action and updates checklist state.
7. Module 1 page: research workspace split into three accordion sections (deep research prompt form, bullseye planner table, interview kit builder) plus problem brief submission form. Each form uses optimistic UI, calls stubbed server actions (`runResearchCoach`, `submitProblemBrief`) and pipes responses into CoachDrawer.
8. Module 2 page: lazy-load Sandpack with starter files, render three LabCard components (UI tweak, prompt tweak, API tweak). Provide controls to run prompt experiments (calling `runPromptExperiment`) and mark labs complete. Include reset + download buttons.
9. Module 3 page: top-level track selector (radio button or segmented control) toggling ToB/ToC editors. Implement outreach email editor, discovery call agenda, objection responses (ToB) and landing hero wizard, CTA helper, SEO checklist (ToC). Persist to `submitGtmAction` server action with coach review status badges.
10. Module 4 page: render North Star prompt inputs, Supabase-backed tracking table (list view with inline add), retro helper (Keep/Improve/Test) with coach synthesis call. Provide weekly filter dropdown.
11. Module 5 page: final submission form capturing learner name, project title, value proposition, Sandpack link, optional Loom. Call `generateCertificate` server action, display coach tips, render CertificatePreviewModal with download + copy share text buttons.
12. Coach transcript drawer: show list grouped by module with timestamp, message type, latency chip, and ability to filter by module. Include `Ask Coach` form that requires context tag selection (Problem, Sandbox, GTM, Iterate, Demo).
13. Toast + status handling: global provider to show success/warning/error toasts when server actions return. Confirmations must restate what was saved and next steps.
14. Accessibility & responsiveness pass: ensure keyboard focus order, aria labeling, reduced motion preference respected (disable non-essential animations). Implement bottom sheet versions of coach drawer and navigation.
15. Testing scaffolds: include Storybook-style mock data file or fixtures so engineering can run UI locally without backend (export sample Supabase responses and coach transcripts).

Code Examples & Contracts:
- Provide TypeScript interfaces for each Supabase table payload at top of modules (e.g., `type ProblemBrief = { id: string; segment: string; ... }`).
- Server actions should live in `app/dashboard/{module}/actions.ts` and call shared helpers in `lib/supabaseServer.ts` and `lib/coach.ts`. Stub external AI response with mocked promise resolving to sample guidance.
- Include Tailwind class names using tokens above; define CSS variables in `globals.css` for colors and spacing if helpful.

Scope Boundaries (critical):
- Only modify files within `app/`, `components/`, `lib/`, and `styles/`. Do not touch backend infrastructure, tests, or configuration outside Tailwind and Supabase helpers.
- Do not implement actual Supabase client instantiation with real keys; use placeholders and ensure all sensitive values come from environment variables.
- Do not create production Sandpack assets; provide preset configuration inline with clear comments.
- Leave payment, analytics, and community integrations as TODO comments.

Deliverables:
- Complete TypeScript components, server action stubs, and Tailwind styles aligned to the UX spec.
- Seed data fixtures that mirror the success criteria in the PRD success metrics section.
- README snippet (append to existing README if provided) describing how to run dashboard, configure env vars, and where to replace mock coach calls with real providers.

Quality Bar:
- Code must compile with `npm run lint` and `npm run typecheck` (no implicit any).
- Match headings, copy, and structure from the UX specification; reuse exact module names and CTA labels.
- Include TODO comments wherever real API integration or visual polish is deferred.

Before returning output, recap which files were created or edited and highlight follow-up work for human engineers (hooking up Supabase queries, connecting real AI provider, validating accessibility).
```

## Why This Prompt Works
- Context-first summary orients the AI on mission, tech stack, and UX constraints.
- Numbered build steps break the project into sequential deliverables that map to modules in the spec.
- Explicit contracts and scope boundaries prevent accidental backend or config changes.
- Quality bar reminders reinforce lint/typecheck compliance and alignment with the UX specification.
- Final recap request encourages the AI tool to document outputs for easier code review.

## Human Review Reminder
All AI-generated code must be reviewed, tested, and refined by the engineering team before production deployment.
