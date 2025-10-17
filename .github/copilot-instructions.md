# Copilot Instructions for labLM

Purpose: help AI devs be productive fast on this Next.js + MDX project. Prefer concrete repo patterns over generic advice.

## Big picture
- Next.js 15 (App Router, Server Actions, TypeScript).
- Labs are MDX files under `content/labs/*`, rendered in `app/dashboard/vibecoding/labs/[labId]/page.tsx` via `next-mdx-remote`.
- MDX exposes two components only:
  - `PromptEditor` → interactive editor that submits to a server action and renders live output.
  - `StaticPromptDemo` → read‑only prompt with a fixed demo output.
- Server action: `lib/actions/prompt-lab.ts::runPrompt`. Success rules: `lib/prompt-lab/success-checker.ts`.

## MDX authoring rules
- Use only the mapped tags:
  - `<StaticPromptDemo initialValue="What is a cat?" demoOutput="A cat is a small domesticated mammal..." />`
  - `<PromptEditor exerciseId="lab2-ex2" mode="editable" placeholder="Explain the water cycle in 5 steps..." />`
- Do NOT pass `labNumber` (derived from `exerciseId` internally).
- Do NOT render `LLMOutputDisplay` directly in MDX (the wrapper handles it).
- ExerciseId format: `lab{N}-{slug}` (e.g., `lab1-demo`, `lab3-ex2`, `lab5-challenge`). The code infers `{N}` via `lab(\d+)`.
- Headings, tables, links are styled by the MDX component map in `[labId]/page.tsx` — write plain markdown.

## Files that matter
- MDX: `content/labs/lab1.mdx` … `lab5.mdx`.
- MDX renderer: `app/dashboard/vibecoding/labs/[labId]/page.tsx` (maps components and styles; update `generateStaticParams()` when adding labs).
- UI: `components/features/prompt-lab/{PromptEditor,LLMOutputDisplay}.tsx`.
- Wrapper exposed to MDX: `app/.../[labId]/_components/LabWrapper.tsx` (exports `InteractivePromptEditor` as `PromptEditor` and `StaticPromptDemo`).
- OpenAI client and actions: `lib/ai/openai-client.ts`, `lib/actions/prompt-lab.ts`.
- Supabase: `lib/supabase-{server,client}.ts`; schema in `supabase/migrations/*`.

## Developer workflow
- Dev: `npm run dev` (Node ≥ 18). If it fails, ensure `.env.local` has Supabase + `OPENAI_API_KEY` or temporarily author MDX that doesn’t trigger server actions.
- Build: `npm run build`; Start: `npm start`.
- Labs render statically without keys; interactive prompts require runtime env.

## Conventions & examples
- New lab: add `content/labs/lab{N}.mdx` and register `{ labId: 'lab{N}' }` in `generateStaticParams()`.
- Example snippet to copy into MDX:
```mdx
## 🔬 Demo
<StaticPromptDemo initialValue="What is a cat?" demoOutput="A cat is a small carnivorous mammal..." />

## ✏️ Exercise
<PromptEditor
  exerciseId="lab2-ex2"
  mode="editable"
  placeholder="Explain the water cycle in exactly 5 steps, simple words, one sentence per step."
/>
```

## Guardrails
- Don’t invent new MDX components without wiring them in `[labId]/page.tsx`.
- Keep `exerciseId` stable (success rules reference it).
- Avoid hardcoding OpenAI calls inside components; use `runPrompt` server action.
