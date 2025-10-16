# WebContainers Platform Architecture (Module 2)

## 1. Overview

Module 2 (Vibecoding) runs a full-stack development environment entirely in the browser using **WebContainers** - a browser-based Node.js runtime. Students watch an AI agent generate, test, and debug code in real-time without writing code themselves.

### Key Technologies

```
Frontend:
├── @webcontainer/api - Browser-based Node.js runtime
├── @monaco-editor/react - VSCode-powered code editor (read-only)
├── xterm.js + xterm-addon-fit - Terminal emulator
└── React 19 + Next.js 15 - UI framework

Backend:
├── Next.js Server Actions - AI orchestration
├── OpenAI/Anthropic - Code generation via function calling
└── Supabase - State persistence

State Management:
└── React hooks + Server Components (no Redux)
```

## 2. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser (Student View)                    │
├──────────────┬──────────────┬───────────────┬───────────────┤
│ File Tree    │ Monaco       │ Terminal      │ Preview       │
│ (Explorer)   │ Editor       │ (xterm.js)    │ (iframe)      │
│              │ (read-only)  │               │               │
└──────┬───────┴──────┬───────┴───────┬───────┴───────┬───────┘
       │              │               │               │
       └──────────────┴───────────────┴───────────────┘
                      │
                      ▼
          ┌───────────────────────┐
          │ WebContainer Instance │
          │ (Browser Node.js)     │
          ├───────────────────────┤
          │ • File System         │
          │ • npm install/run     │
          │ • Express server      │
          │ • Vitest runner       │
          └───────────┬───────────┘
                      │
       ┌──────────────┴──────────────┐
       │                             │
       ▼                             ▼
┌──────────────┐           ┌──────────────────┐
│ AI Agent     │           │ Supabase         │
│ Orchestrator │◄─────────►│ • Projects       │
│ (Server)     │           │ • Transcripts    │
└──────────────┘           │ • Test Results   │
                           └──────────────────┘
```

## 3. Component Breakdown

### 3.1 WebContainer Manager (`lib/webcontainer/manager.ts`)

Manages the lifecycle of the WebContainer instance:

```typescript
interface WebContainerManager {
  // Initialize WebContainer (runs once per lab)
  init(): Promise<WebContainerInstance>

  // File operations
  writeFile(path: string, content: string): Promise<void>
  readFile(path: string): Promise<string>
  listFiles(): Promise<FileNode[]>

  // Command execution
  spawn(command: string, args: string[]): Promise<SpawnResult>

  // Server preview
  getPreviewUrl(): Promise<string>

  // Cleanup
  teardown(): Promise<void>
}
```

**Key Responsibilities:**
- Boot WebContainer on lab load (<3 seconds target)
- Provide file system API for AI agent
- Execute npm commands (install, test, start)
- Expose preview URL for Express server
- Handle errors and cleanup

**Implementation Notes:**
- Singleton pattern (one instance per lab session)
- Lazy initialization (boot on first lab start)
- Automatic cleanup on unmount
- Error recovery (restart on crash)

### 3.2 Three-Panel Layout (`components/features/vibecoding/lab-workspace.tsx`)

```tsx
<LabWorkspace>
  <FileTreePanel files={projectFiles} />

  <MiddlePanel>
    <MonacoEditor
      value={currentFileContent}
      readOnly={true}
      language={detectLanguage(currentFile)}
      onFileChange={handleFileSelect}
    />
    <Terminal
      ref={terminalRef}
      onData={handleTerminalInput}
    />
  </MiddlePanel>

  <PreviewPanel
    src={previewUrl}
    loading={isBooting}
  />
</LabWorkspace>
```

**Layout Specifications:**
- File Tree: 20% width, collapsible
- Editor + Terminal: 50% width, resizable split (60/40 default)
- Preview: 30% width, collapsible
- Mobile: Stack vertically (file tree → editor → preview)

### 3.3 Monaco Editor Integration

**Configuration:**
```typescript
<Editor
  height="60vh"
  defaultLanguage="javascript"
  theme="vs-dark"
  options={{
    readOnly: true,           // Students don't edit
    minimap: { enabled: false },
    lineNumbers: 'on',
    fontSize: 14,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    folding: true,
    renderWhitespace: 'selection'
  }}
  onMount={(editor, monaco) => {
    // Register language support
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false
    })
  }}
/>
```

**File Highlighting:**
- Flash green animation when AI creates/updates file
- Smooth scroll to new content
- Syntax highlighting for JS/TS/HTML/CSS/JSON

### 3.4 Terminal (xterm.js)

**Setup:**
```typescript
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'

const terminal = new Terminal({
  theme: {
    background: '#1e1e1e',
    foreground: '#d4d4d4'
  },
  fontSize: 13,
  fontFamily: 'Menlo, Monaco, Courier New, monospace',
  cursorBlink: true
})

const fitAddon = new FitAddon()
terminal.loadAddon(fitAddon)
terminal.open(terminalRef.current)
fitAddon.fit()
```

**Features:**
- Display npm install output (filtered warnings)
- Show test results with colored output
- Display Express server startup logs
- Auto-scroll to bottom on new output
- Clear terminal button

**Output Filtering:**
```typescript
// Hide noisy npm warnings, show only:
// - Package install confirmations
// - Test results
// - Server startup messages
// - Error messages
const shouldShowLine = (line: string) => {
  if (line.includes('WARN')) return false
  if (line.includes('deprecated')) return false
  return true
}
```

### 3.5 Preview Panel

```tsx
<PreviewPanel>
  {isBooting ? (
    <LoadingSpinner>Starting server...</LoadingSpinner>
  ) : error ? (
    <ErrorState>{error}</ErrorState>
  ) : (
    <iframe
      src={previewUrl}
      sandbox="allow-scripts allow-same-origin"
      style={{ width: '100%', height: '100%', border: 'none' }}
    />
  )}
</PreviewPanel>
```

**Behaviors:**
- Automatically refresh on server restart
- Show loading state while Express boots
- Display error overlay if server crashes
- Responsive container (scales to panel width)

## 4. AI Agent Integration

### 4.1 Function Calling Tools

The AI agent uses function calling to interact with WebContainers:

```typescript
const tools = [
  {
    name: 'createFile',
    description: 'Create a new file in the project',
    parameters: {
      path: { type: 'string', description: 'File path relative to project root' },
      content: { type: 'string', description: 'File contents' }
    }
  },
  {
    name: 'updateFile',
    description: 'Update existing file contents',
    parameters: {
      path: { type: 'string' },
      content: { type: 'string' }
    }
  },
  {
    name: 'runCommand',
    description: 'Execute terminal command',
    parameters: {
      command: { type: 'string', description: 'Command to run (npm, node, etc.)' },
      args: { type: 'array', items: { type: 'string' }, description: 'Command arguments' }
    }
  },
  {
    name: 'readFile',
    description: 'Read file contents (for debugging)',
    parameters: {
      path: { type: 'string' }
    }
  },
  {
    name: 'announceStatus',
    description: 'Narrate progress to student',
    parameters: {
      message: { type: 'string', description: 'User-friendly status update' }
    }
  }
]
```

### 4.2 Agent Orchestration Flow

```typescript
// Server Action: lib/actions/ai-agent.ts
export async function runAIAgent(prompt: string, labNumber: number) {
  const user = await getCurrentUser()

  // 1. Initialize conversation
  const systemPrompt = getLabSystemPrompt(labNumber)
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: prompt }
  ]

  // 2. Call AI with function calling
  let completed = false
  let iterations = 0
  const maxIterations = 20 // Prevent infinite loops

  while (!completed && iterations < maxIterations) {
    const response = await callAI({
      model: 'gpt-4o', // or claude-3-5-sonnet
      messages,
      tools,
      tool_choice: 'auto'
    })

    // 3. Execute tool calls
    if (response.tool_calls) {
      for (const toolCall of response.tool_calls) {
        const result = await executeToolCall(toolCall, user.id)

        // Add tool result to conversation
        messages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: JSON.stringify(result)
        })
      }
      iterations++
    } else {
      // No more tool calls = agent is done
      completed = true
    }
  }

  // 4. Persist project state
  await saveProjectSnapshot(user.id, labNumber, messages)

  return { success: true, iterations }
}
```

### 4.3 System Prompts

**Lab-specific prompts guide AI behavior:**

```markdown
# Lab 1: Personal Landing Page

You are a coding assistant teaching complete beginners how web pages work.

## Your Task
Create a simple personal landing page with:
- HTML structure (header, main, footer)
- Basic CSS styling (colors, fonts, layout)
- No JavaScript needed

## Development Process
1. Announce: "Creating project files..."
2. Create package.json with live-server
3. Create index.html with semantic structure
4. Create style.css with beginner-friendly CSS
5. Run: npm install
6. Run: npm start (starts live-server)
7. Announce: "Your landing page is ready! Check the preview."

## Style Guide
- Use simple, modern design (no fancy animations)
- Include helpful HTML comments explaining structure
- Use CSS flexbox for layout (easier than grid)
- Pick a nice color palette (provide hex codes)

## Testing
No automated tests for this lab - visual verification only.

## Error Handling
If live-server fails to start:
1. Check port availability
2. Try alternative port (8080, 3000)
3. Explain error in beginner-friendly terms
```

## 5. WebContainer Boot Sequence

**Optimized for speed (<3 seconds):**

```typescript
async function bootLab(labNumber: number) {
  // 1. Initialize WebContainer (600ms)
  const webcontainer = await WebContainer.boot()

  // 2. Mount starter files (200ms)
  await webcontainer.mount(getLabStarterFiles(labNumber))

  // 3. Pre-install dependencies (1-2s)
  // Use cached node_modules if available
  const hasCache = await checkDependencyCache(labNumber)
  if (!hasCache) {
    await webcontainer.spawn('npm', ['install'])
  }

  // 4. Ready!
  return webcontainer
}
```

**Optimization Strategies:**
- Pre-cache common dependencies (express, vitest)
- Use CDN for node_modules (via WebContainer config)
- Minimal starter files (defer full project until AI generates)

## 6. Testing Integration

### 6.1 Vitest Configuration

```javascript
// vitest.config.js (generated by AI agent)
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node', // or 'jsdom' for frontend tests
    include: ['**/*.test.js'],
    reporters: ['verbose']
  }
})
```

### 6.2 Test Execution Flow

```typescript
async function runTests(webcontainer: WebContainerInstance) {
  // 1. Run vitest
  const process = await webcontainer.spawn('npm', ['test'])

  let output = ''
  process.output.pipeTo(new WritableStream({
    write(chunk) {
      output += chunk
      // Stream to terminal in real-time
      terminalRef.current?.write(chunk)
    }
  }))

  await process.exit

  // 2. Parse test results
  const results = parseVitestOutput(output)

  // 3. Return structured data
  return {
    passed: results.passed,
    failed: results.failed,
    total: results.total,
    failures: results.failureDetails // Array of { test, error, stack }
  }
}
```

### 6.3 Self-Healing Loop

If tests fail, AI agent attempts to fix (max 3 attempts):

```typescript
async function selfHealingLoop(webcontainer, testResults) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    if (testResults.failed === 0) break

    // Ask AI to analyze failures
    const fixPrompt = `
Tests failed. Please fix the issues.

Failures:
${testResults.failures.map(f => `
Test: ${f.test}
Error: ${f.error}
Stack: ${f.stack}
`).join('\n')}

Read the relevant files, identify the bug, and update the code to fix it.
`

    // AI generates fix via function calls
    await runAIAgent(fixPrompt, labNumber)

    // Re-run tests
    testResults = await runTests(webcontainer)

    if (testResults.failed === 0) {
      announceStatus('✅ All tests passing! Bug fixed.')
    } else if (attempt === 3) {
      announceStatus('⚠️ Some tests still failing after 3 attempts. This is a learning opportunity - errors happen in real development!')
    }
  }
}
```

## 7. State Persistence

### 7.1 Database Schema Updates

**New table: `webcontainer_projects`**

```sql
CREATE TABLE webcontainer_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lab_number SMALLINT NOT NULL CHECK (lab_number BETWEEN 1 AND 10),

  -- Project state
  files JSONB NOT NULL, -- { "path/to/file.js": "content..." }
  terminal_history TEXT[], -- Array of terminal output lines
  test_results JSONB, -- { passed: 5, failed: 0, details: [...] }

  -- AI conversation
  ai_conversation JSONB NOT NULL, -- Array of messages for resume/replay
  total_iterations SMALLINT, -- How many AI function calls

  -- Metadata
  status TEXT CHECK (status IN ('in_progress', 'completed', 'failed')) DEFAULT 'in_progress',
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(user_id, lab_number) -- One project per lab per user
);

CREATE INDEX idx_webcontainer_user_lab ON webcontainer_projects(user_id, lab_number);
```

### 7.2 Project Snapshot

Save project state after each AI iteration:

```typescript
async function saveProjectSnapshot(
  userId: string,
  labNumber: number,
  files: Record<string, string>,
  conversation: Message[],
  testResults?: TestResults
) {
  await supabase.from('webcontainer_projects').upsert({
    user_id: userId,
    lab_number: labNumber,
    files,
    ai_conversation: conversation,
    test_results: testResults,
    status: testResults?.failed === 0 ? 'completed' : 'in_progress',
    total_iterations: conversation.filter(m => m.role === 'assistant').length,
    updated_at: new Date().toISOString()
  }, {
    onConflict: 'user_id,lab_number'
  })
}
```

### 7.3 Resume Lab

Load previous project state:

```typescript
async function resumeLab(userId: string, labNumber: number) {
  const { data } = await supabase
    .from('webcontainer_projects')
    .select('*')
    .eq('user_id', userId)
    .eq('lab_number', labNumber)
    .single()

  if (!data) return null

  // Restore files to WebContainer
  const webcontainer = await WebContainer.boot()
  for (const [path, content] of Object.entries(data.files)) {
    await webcontainer.fs.writeFile(path, content)
  }

  // Restore terminal history
  for (const line of data.terminal_history) {
    terminalRef.current?.writeln(line)
  }

  return {
    webcontainer,
    conversation: data.ai_conversation,
    testResults: data.test_results
  }
}
```

## 8. Performance Optimizations

### 8.1 Lazy Loading

```tsx
// Only load heavy WebContainer components when needed
const LabWorkspace = dynamic(
  () => import('@/components/features/vibecoding/lab-workspace'),
  {
    ssr: false, // WebContainers require browser APIs
    loading: () => <LabLoadingSkeleton />
  }
)
```

### 8.2 Dependency Pre-caching

Pre-install common packages to reduce wait times:

```typescript
// On first app load (background task)
async function preCacheDependencies() {
  const commonPackages = ['express', 'vitest', '@vitest/ui']
  const webcontainer = await WebContainer.boot()

  await webcontainer.spawn('npm', ['install', ...commonPackages])

  // Cache stored in browser IndexedDB by WebContainers SDK
  await webcontainer.teardown()
}
```

### 8.3 Terminal Output Throttling

Prevent UI lag from rapid terminal output:

```typescript
let outputBuffer: string[] = []
let flushTimeout: NodeJS.Timeout

function writeToTerminal(chunk: string) {
  outputBuffer.push(chunk)

  clearTimeout(flushTimeout)
  flushTimeout = setTimeout(() => {
    terminalRef.current?.write(outputBuffer.join(''))
    outputBuffer = []
  }, 50) // Batch writes every 50ms
}
```

## 9. Error Handling

### 9.1 WebContainer Errors

```typescript
try {
  const webcontainer = await WebContainer.boot()
} catch (error) {
  if (error.message.includes('SharedArrayBuffer')) {
    showError('Your browser doesn\'t support WebContainers. Please use Chrome 90+, Edge 90+, or Safari 15+.')
  } else if (error.message.includes('memory')) {
    showError('Not enough memory to run labs. Please close other tabs and try again.')
  } else {
    showError('Failed to start lab environment. Please refresh the page.')
  }
}
```

### 9.2 AI Agent Failures

```typescript
if (iterations >= maxIterations) {
  await announceStatus('⚠️ Agent hit iteration limit. This happens when problems are complex. Let\'s review what we built so far.')

  // Still save partial progress
  await saveProjectSnapshot(userId, labNumber, files, conversation)

  // Offer "Try Again" or "Ask Coach" buttons
}
```

### 9.3 Network Failures

```typescript
// Retry AI calls with exponential backoff
async function callAIWithRetry(payload, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await callAI(payload)
    } catch (error) {
      if (i === maxRetries - 1) throw error
      await sleep(Math.pow(2, i) * 1000) // 1s, 2s, 4s
    }
  }
}
```

## 10. Security Considerations

### 10.1 Sandboxing

WebContainers run in browser sandbox:
- No access to user's file system
- No access to user's network (except preview iframe)
- Isolated from main page via Web Workers

### 10.2 AI Generated Code

- Limit file sizes (max 50KB per file)
- Prevent infinite loops (timeout commands after 30s)
- Block dangerous commands (rm -rf, curl sensitive URLs)
- Rate limit AI calls (10 builds per hour per user)

### 10.3 Preview Security

```tsx
<iframe
  src={previewUrl}
  sandbox="allow-scripts allow-same-origin"
  referrerPolicy="no-referrer"
  allow="none" // Block camera, microphone, geolocation
/>
```

## 11. Browser Compatibility

### 11.1 Requirements

WebContainers require:
- **Chrome/Edge**: 90+
- **Safari**: 15+
- **Firefox**: Not supported (missing SharedArrayBuffer support)

### 11.2 Feature Detection

```typescript
function checkWebContainerSupport() {
  if (typeof SharedArrayBuffer === 'undefined') {
    return {
      supported: false,
      reason: 'Your browser doesn\'t support WebContainers (missing SharedArrayBuffer)'
    }
  }

  if (typeof Worker === 'undefined') {
    return {
      supported: false,
      reason: 'Your browser doesn\'t support Web Workers'
    }
  }

  return { supported: true }
}
```

### 11.3 Fallback for Unsupported Browsers

```tsx
const support = checkWebContainerSupport()

if (!support.supported) {
  return (
    <div className="unsupported-browser">
      <h2>Browser Not Supported</h2>
      <p>{support.reason}</p>
      <a href="https://www.google.com/chrome/">Download Chrome</a>
      <p>Or use Replit as alternative: <a href={replitLink}>Open in Replit</a></p>
    </div>
  )
}
```

## 12. Monitoring & Analytics

### 12.1 Key Metrics

Track in `coach_transcripts` and `webcontainer_projects`:

- **Boot time**: WebContainer initialization latency
- **AI iterations**: Average function calls per lab
- **Test success rate**: % of labs with passing tests
- **Completion rate**: % of students finishing each lab
- **Error rate**: Browser crashes, AI timeouts

### 12.2 Logging

```typescript
// Log to Vercel console + Supabase
await logEvent({
  type: 'webcontainer_boot',
  userId,
  labNumber,
  latencyMs: bootTime,
  success: true
})

await logEvent({
  type: 'ai_agent_run',
  userId,
  labNumber,
  iterations,
  testsPassed,
  testsFailed,
  success: testsFailed === 0
})
```

## 13. Future Enhancements (Post-MVP)

### 13.1 Download Project

```typescript
async function downloadProject(webcontainer: WebContainerInstance) {
  // Zip all project files
  const files = await webcontainer.fs.readdir('/', { recursive: true })
  const zip = new JSZip()

  for (const file of files) {
    const content = await webcontainer.fs.readFile(file, 'utf-8')
    zip.file(file, content)
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  downloadBlob(blob, 'my-lab-project.zip')
}
```

### 13.2 Replay AI Build

Show time-lapse of AI building the project:

```typescript
async function replayBuild(conversation: Message[]) {
  for (const message of conversation) {
    if (message.role === 'assistant' && message.tool_calls) {
      for (const toolCall of message.tool_calls) {
        // Animate each file creation/update
        await animateToolCall(toolCall)
        await sleep(500) // Pause between actions
      }
    }
  }
}
```

### 13.3 Git Integration

Initialize git repo in WebContainer:

```typescript
await webcontainer.spawn('git', ['init'])
await webcontainer.spawn('git', ['add', '.'])
await webcontainer.spawn('git', ['commit', '-m', 'Initial commit'])
```

## 14. Related Documentation

- [AI Agent Orchestration](./ai-agent-orchestration.md)
- [Auto-Testing Framework](./auto-testing-framework.md)
- [Coach Interaction Pattern](./coach-interaction-pattern.md)
- [Data Model & Services](./data-model-and-services.md)

## 15. References

- [WebContainers API Documentation](https://webcontainers.io/api)
- [Monaco Editor Integration](https://microsoft.github.io/monaco-editor/)
- [xterm.js Documentation](https://xtermjs.org/)
- [OpenAI Function Calling](https://platform.openai.com/docs/guides/function-calling)
- [Anthropic Tool Use](https://docs.anthropic.com/claude/docs/tool-use)
