# AI Agent Orchestration Architecture

**Document Version**: 1.0
**Last Updated**: 2025-10-13
**Status**: Active Development
**Related**: [WebContainers Platform](webcontainers-platform.md), [Auto-Testing Framework](auto-testing-framework.md)

---

## 1. Overview

The AI Agent is the core intelligence layer of VibeCoding Lab. It transforms natural language prompts from complete beginners into working full-stack applications through function calling (tool use), while narrating each step in beginner-friendly language.

### Purpose

- **Generate Code**: Create complete full-stack projects from plain-English prompts
- **Execute Operations**: Interact with WebContainers via defined tools
- **Provide Guidance**: Narrate actions in simple, educational language
- **Self-Heal**: Fix bugs automatically when tests fail (max 3 attempts)
- **Teach Concepts**: Explain code after generation using analogies

### Key Characteristics

- **Function Calling**: Uses AI tool use (OpenAI/Anthropic function calling)
- **Iterative**: Generates code through multiple tool calls
- **Observable**: Every action is visualized for student learning
- **Fault-Tolerant**: Handles errors gracefully with retry logic
- **Educational**: All output is beginner-friendly (no jargon)

---

## 2. System Architecture

### High-Level Flow

```
Student Prompt
      ↓
Server Action: runAIAgent()
      ↓
AI Provider (GPT-4/Claude 3.5)
  with Function Calling Enabled
      ↓
Tool Calls Returned
      ↓
Execute Operations in WebContainers
  (createFile, runCommand, runTests)
      ↓
Stream Status Updates to Client
      ↓
Update UI in Real-Time
      ↓
Test/Fix Cycle (Story 006)
      ↓
Success: Working App + Explanation
```

### Component Diagram

```
┌─────────────────────────────────────────────────────────┐
│  Client (Browser)                                       │
│  ├── Prompt Input                                       │
│  ├── AI Status Feed (narration)                        │
│  ├── WebContainer Platform                             │
│  └── Preview Window                                     │
└──────────────────┬──────────────────────────────────────┘
                   │ HTTPS
                   ↓
┌─────────────────────────────────────────────────────────┐
│  Server Action: runAIAgent()                           │
│  ├── Build conversation with system prompt             │
│  ├── Call AI Provider with tools                       │
│  ├── Parse tool calls                                   │
│  ├── Execute operations                                 │
│  └── Stream updates back to client                     │
└──────────────────┬──────────────────────────────────────┘
                   │ API
                   ↓
┌─────────────────────────────────────────────────────────┐
│  AI Provider (OpenAI / Anthropic)                      │
│  ├── Receive prompt + system prompt + tools            │
│  ├── Generate code via function calling                │
│  └── Return tool calls + narration                     │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Function Calling Tools

### Tool Definitions

The AI Agent has access to these tools for interacting with WebContainers:

#### Tool 1: `createFile`

```typescript
{
  name: "createFile",
  description: "Create a new file in the project with specified content",
  parameters: {
    type: "object",
    properties: {
      path: {
        type: "string",
        description: "File path like 'src/app.js' or 'index.html'"
      },
      content: {
        type: "string",
        description: "Full file content (code)"
      }
    },
    required: ["path", "content"]
  }
}
```

**Example AI Usage**:
```json
{
  "tool_calls": [
    {
      "id": "call_1",
      "name": "createFile",
      "arguments": {
        "path": "index.html",
        "content": "<!DOCTYPE html>\n<html>..."
      }
    }
  ]
}
```

#### Tool 2: `updateFile`

```typescript
{
  name: "updateFile",
  description: "Update existing file content (used for fixing bugs)",
  parameters: {
    type: "object",
    properties: {
      path: {
        type: "string",
        description: "File path to update"
      },
      content: {
        type: "string",
        description: "New full file content"
      }
    },
    required: ["path", "content"]
  }
}
```

**When Used**: AI calls this during self-healing (Story 006) when tests fail.

#### Tool 3: `runCommand`

```typescript
{
  name: "runCommand",
  description: "Execute terminal command in WebContainers",
  parameters: {
    type: "object",
    properties: {
      command: {
        type: "string",
        description: "Command like 'npm' or 'node'"
      },
      args: {
        type: "array",
        items: { type: "string" },
        description: "Arguments like ['install', 'express']"
      }
    },
    required: ["command", "args"]
  }
}
```

**Example AI Usage**:
```json
{
  "tool_calls": [
    {
      "id": "call_2",
      "name": "runCommand",
      "arguments": {
        "command": "npm",
        "args": ["install", "express", "cors"]
      }
    }
  ]
}
```

#### Tool 4: `runTests`

```typescript
{
  name: "runTests",
  description: "Execute test suite and return results",
  parameters: {
    type: "object",
    properties: {
      testFile: {
        type: "string",
        description: "Path to test file like 'tests/app.test.js' (optional)"
      }
    }
  },
  returns: {
    passed: { type: "number" },
    failed: { type: "number" },
    total: { type: "number" },
    errors: {
      type: "array",
      items: {
        test: { type: "string" },
        error: { type: "string" },
        location: { type: "string" }
      }
    }
  }
}
```

**Example AI Usage** (Story 006):
```json
{
  "tool_calls": [
    {
      "id": "call_3",
      "name": "runTests",
      "arguments": {}
    }
  ]
}
```

#### Tool 5: `announceStatus`

```typescript
{
  name: "announceStatus",
  description: "Send status message to student (narration)",
  parameters: {
    type: "object",
    properties: {
      message: {
        type: "string",
        description: "Beginner-friendly message like 'Creating project structure...'"
      },
      type: {
        type: "string",
        enum: ["info", "success", "warning", "error"],
        description: "Message type for styling"
      }
    },
    required: ["message"]
  }
}
```

**Purpose**: AI narrates what it's doing for educational transparency.

---

## 4. System Prompt Templates

### Lab 1: Personal Landing Page (Static)

```
You are a coding assistant for complete beginners who don't know programming.

MISSION: Build a personal landing page from the student's prompt.

RULES:
1. Generate clean, valid HTML and CSS
2. Use only these files:
   - index.html (structure)
   - styles.css (styling)
   - package.json (minimal, for consistency)
3. Keep code simple - no advanced features
4. Narrate what you're doing in plain English

AVAILABLE TOOLS:
- createFile(path, content): Create new files
- runCommand(command, args): Run npm commands
- runTests(): Execute test suite
- announceStatus(message, type): Narrate to student

WORKFLOW:
1. announceStatus("Creating project structure...", "info")
2. createFile("package.json", {...})
3. createFile("index.html", "<!DOCTYPE html>...")
4. createFile("styles.css", "body {...}")
5. announceStatus("Installing dependencies...", "info")
6. runCommand("npm", ["install"])
7. runTests()
8. If tests fail, fix with updateFile and retry (max 3 attempts)
9. announceStatus("✅ Your landing page is ready!", "success")

BEGINNER-FRIENDLY NARRATION:
- ❌ "Initializing Express server"
- ✅ "Setting up your website's backend..."
- ❌ "Implementing event listeners"
- ✅ "Making buttons respond when you click them..."

Student request: {userPrompt}
```

### Lab 2: Interactive Counter App (JavaScript)

```
You are a coding assistant for complete beginners who don't know programming.

MISSION: Build an interactive web app from the student's prompt.

RULES:
1. Generate HTML, CSS, and JavaScript
2. Use only these files:
   - index.html (structure with buttons/inputs)
   - styles.css (nicer styling)
   - app.js (JavaScript for interactivity)
   - package.json
3. Use vanilla JavaScript (no frameworks)
4. Add event listeners, handle user input, update DOM
5. Narrate each step in simple terms

AVAILABLE TOOLS:
- createFile(path, content): Create new files
- updateFile(path, content): Fix bugs
- runCommand(command, args): Run npm commands
- runTests(): Execute test suite
- announceStatus(message, type): Narrate to student

WORKFLOW:
1. announceStatus("Creating project structure...", "info")
2. createFile files (HTML, CSS, JS, package.json)
3. announceStatus("Installing dependencies...", "info")
4. runCommand("npm", ["install"])
5. runTests()
6. If tests fail, analyze error, fix with updateFile, retry
7. announceStatus("✅ Your interactive app is ready!", "success")

JAVASCRIPT CONCEPTS TO COVER:
- Event listeners (click, input)
- Variables to store state
- Functions to handle actions
- DOM manipulation (getElementById, textContent)

BEGINNER-FRIENDLY NARRATION:
- ❌ "Registering click handler"
- ✅ "Making the button do something when clicked..."
- ❌ "Mutating state variable"
- ✅ "Updating the counter..."

Student request: {userPrompt}
```

### Lab 3: Weather Dashboard (Full-Stack)

```
You are a coding assistant for complete beginners who don't know programming.

MISSION: Build a full-stack app with frontend + backend from the student's prompt.

RULES:
1. Generate both frontend and backend code
2. File structure:
   - client/index.html (frontend structure)
   - client/styles.css (frontend styling)
   - client/app.js (frontend JavaScript)
   - server/server.js (Express backend with API routes)
   - package.json (includes express, cors, node-fetch)
3. Frontend fetches data from backend
4. Backend can call external APIs if needed
5. Narrate the client-server flow

AVAILABLE TOOLS:
- createFile(path, content): Create new files
- updateFile(path, content): Fix bugs
- runCommand(command, args): Run npm commands
- runTests(): Execute test suite
- announceStatus(message, type): Narrate to student

WORKFLOW:
1. announceStatus("Creating full-stack project structure...", "info")
2. Create all files (client/ and server/)
3. announceStatus("Installing backend dependencies...", "info")
4. runCommand("npm", ["install", "express", "cors"])
5. announceStatus("Running tests...", "info")
6. runTests()
7. If tests fail, fix and retry
8. announceStatus("Starting server...", "info")
9. runCommand("npm", ["start"])
10. announceStatus("✅ Your full-stack app is ready!", "success")

FULL-STACK CONCEPTS TO TEACH:
- Frontend: What users see and interact with
- Backend: The "brain" that handles requests
- API: How frontend talks to backend
- External APIs: Getting data from other services

BEGINNER-FRIENDLY NARRATION:
- ❌ "Configuring CORS middleware"
- ✅ "Setting up the backend to talk to the frontend..."
- ❌ "Implementing REST endpoint"
- ✅ "Creating a way for the frontend to request weather data..."

ANALOGY TO USE:
Frontend = Restaurant dining area (where customers are)
Backend = Kitchen (where food is prepared)
API = Waiter (connects dining area to kitchen)
External API = Supplier (where kitchen gets ingredients)

Student request: {userPrompt}
```

---

## 5. Conversation Loop Mechanics

### Orchestration Flow

```typescript
// lib/ai-agent.ts

interface AgentContext {
  webContainer: WebContainer;
  labNumber: number;
  userPrompt: string;
  onStatusUpdate: (message: StatusMessage) => void;
  onFileCreate: (path: string, content: string) => void;
  onFileUpdate: (path: string, content: string) => void;
  onCommandRun: (command: string, args: string[], output: string) => void;
}

export async function runAIAgent(
  context: AgentContext
): Promise<AIAgentResult> {
  // 1. Get lab-specific system prompt
  const systemPrompt = getLabSystemPrompt(context.labNumber);

  // 2. Initialize conversation
  const messages: Message[] = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: context.userPrompt }
  ];

  // 3. Iterate with AI until complete
  let completed = false;
  let iteration = 0;
  const maxIterations = 100; // Safety limit

  while (!completed && iteration < maxIterations) {
    iteration++;

    // Call AI provider
    const response = await callAI({
      model: process.env.AI_MODEL || 'gpt-4o',
      messages,
      tools: AI_TOOLS,
      temperature: 0.3, // Lower for more consistent code
      stream: false
    });

    // Check if AI is done or wants to call tools
    if (response.tool_calls && response.tool_calls.length > 0) {
      // Execute each tool call
      const toolResults = await executeToolCalls(
        response.tool_calls,
        context
      );

      // Add AI's response to conversation
      messages.push({
        role: 'assistant',
        content: response.content,
        tool_calls: response.tool_calls
      });

      // Add tool results to conversation
      for (const result of toolResults) {
        messages.push({
          role: 'tool',
          tool_call_id: result.id,
          content: JSON.stringify(result.output)
        });
      }
    } else {
      // AI is done (no more tool calls)
      completed = true;
    }
  }

  if (iteration >= maxIterations) {
    throw new Error('AI exceeded max iterations');
  }

  return {
    success: true,
    totalIterations: iteration,
    finalMessage: messages[messages.length - 1].content
  };
}
```

### Tool Execution Handler

```typescript
async function executeToolCalls(
  toolCalls: ToolCall[],
  context: AgentContext
): Promise<ToolResult[]> {
  const results: ToolResult[] = [];

  for (const toolCall of toolCalls) {
    try {
      let output: any;

      switch (toolCall.function.name) {
        case 'createFile':
          output = await handleCreateFile(
            toolCall.function.arguments,
            context
          );
          break;

        case 'updateFile':
          output = await handleUpdateFile(
            toolCall.function.arguments,
            context
          );
          break;

        case 'runCommand':
          output = await handleRunCommand(
            toolCall.function.arguments,
            context
          );
          break;

        case 'runTests':
          output = await handleRunTests(
            toolCall.function.arguments,
            context
          );
          break;

        case 'announceStatus':
          output = await handleAnnounceStatus(
            toolCall.function.arguments,
            context
          );
          break;

        default:
          throw new Error(`Unknown tool: ${toolCall.function.name}`);
      }

      results.push({
        id: toolCall.id,
        output,
        success: true
      });
    } catch (error) {
      results.push({
        id: toolCall.id,
        output: { error: error.message },
        success: false
      });
    }
  }

  return results;
}
```

### Individual Tool Handlers

```typescript
async function handleCreateFile(
  args: { path: string; content: string },
  context: AgentContext
): Promise<{ success: boolean }> {
  // 1. Update UI with status
  context.onStatusUpdate({
    type: 'file',
    message: `Creating ${args.path}...`,
    timestamp: new Date()
  });

  // 2. Write to WebContainer
  await context.webContainer.fs.writeFile(args.path, args.content);

  // 3. Notify UI (trigger highlight animation)
  context.onFileCreate(args.path, args.content);

  return { success: true };
}

async function handleRunCommand(
  args: { command: string; args: string[] },
  context: AgentContext
): Promise<{ output: string; exitCode: number }> {
  // 1. Update UI
  context.onStatusUpdate({
    type: 'command',
    message: `Running ${args.command} ${args.args.join(' ')}...`,
    timestamp: new Date()
  });

  // 2. Execute in WebContainer
  const process = await context.webContainer.spawn(
    args.command,
    args.args
  );

  // 3. Collect output
  let output = '';
  process.output.pipeTo(
    new WritableStream({
      write(chunk) {
        output += chunk;
      }
    })
  );

  const exitCode = await process.exit;

  // 4. Notify UI
  context.onCommandRun(args.command, args.args, output);

  return { output, exitCode };
}

async function handleAnnounceStatus(
  args: { message: string; type?: string },
  context: AgentContext
): Promise<{ success: boolean }> {
  context.onStatusUpdate({
    type: (args.type as any) || 'info',
    message: args.message,
    timestamp: new Date()
  });

  return { success: true };
}
```

---

## 6. Operation Types

### Operation Interface

```typescript
type Operation =
  | { type: 'createFile'; path: string; content: string }
  | { type: 'updateFile'; path: string; content: string }
  | { type: 'deleteFile'; path: string }
  | { type: 'runCommand'; command: string; args: string[] }
  | { type: 'runTests'; testFile?: string }
  | { type: 'announceStatus'; message: string; statusType: string };
```

### Client-Side Execution

Operations are sent to the client via Server-Sent Events (SSE) for real-time visualization:

```typescript
// Client component
useEffect(() => {
  const eventSource = new EventSource(`/api/ai-agent/stream?id=${sessionId}`);

  eventSource.onmessage = (event) => {
    const operation: Operation = JSON.parse(event.data);

    switch (operation.type) {
      case 'createFile':
        // Update file tree
        addFileToTree(operation.path);
        // Update Monaco editor
        setCurrentFile(operation.path, operation.content);
        // Highlight new file
        highlightFile(operation.path, 3000);
        break;

      case 'runCommand':
        // Show in terminal
        appendToTerminal(`$ ${operation.command} ${operation.args.join(' ')}`);
        break;

      case 'announceStatus':
        // Add to status feed
        addStatusMessage({
          type: operation.statusType,
          message: operation.message,
          timestamp: new Date()
        });
        break;
    }
  };

  return () => eventSource.close();
}, [sessionId]);
```

---

## 7. AI Provider Integration

### Multi-Provider Support

```typescript
// lib/ai-providers.ts

export type AIProvider = 'openai' | 'anthropic' | 'vertex';

export async function callAI(params: {
  model: string;
  messages: Message[];
  tools: Tool[];
  temperature?: number;
  stream?: boolean;
  provider?: AIProvider;
}): Promise<AIResponse> {
  const provider = params.provider || detectProvider(params.model);

  switch (provider) {
    case 'openai':
      return callOpenAI(params);
    case 'anthropic':
      return callAnthropic(params);
    case 'vertex':
      return callVertexAI(params);
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}
```

### OpenAI Implementation

```typescript
async function callOpenAI(params: {
  model: string;
  messages: Message[];
  tools: Tool[];
  temperature?: number;
}): Promise<AIResponse> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: params.model,
      messages: params.messages,
      tools: params.tools.map(formatToolForOpenAI),
      temperature: params.temperature ?? 0.3,
      tool_choice: 'auto'
    })
  });

  const data = await response.json();

  return {
    content: data.choices[0].message.content,
    tool_calls: data.choices[0].message.tool_calls || [],
    usage: data.usage
  };
}
```

### Anthropic Implementation

```typescript
async function callAnthropic(params: {
  model: string;
  messages: Message[];
  tools: Tool[];
  temperature?: number;
}): Promise<AIResponse> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: params.model,
      messages: params.messages.filter(m => m.role !== 'system'),
      system: params.messages.find(m => m.role === 'system')?.content,
      tools: params.tools.map(formatToolForAnthropic),
      temperature: params.temperature ?? 0.3,
      max_tokens: 4096
    })
  });

  const data = await response.json();

  return {
    content: data.content[0].text,
    tool_calls: parseAnthropicToolCalls(data.content),
    usage: data.usage
  };
}
```

---

## 8. Error Handling & Retry Logic

### Error Categories

1. **AI Provider Errors** (rate limits, timeouts)
2. **WebContainer Errors** (file write failures, command errors)
3. **Code Generation Errors** (syntax errors, invalid code)
4. **Test Failures** (handled by auto-testing framework)

### Retry Strategy

```typescript
async function runAIAgentWithRetry(
  context: AgentContext,
  maxRetries = 3
): Promise<AIAgentResult> {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await runAIAgent(context);
    } catch (error) {
      lastError = error;

      if (isRateLimitError(error)) {
        // Wait with exponential backoff
        await sleep(Math.pow(2, attempt) * 1000);
      } else if (isTransientError(error)) {
        // Retry immediately
        continue;
      } else {
        // Non-retriable error
        throw error;
      }
    }
  }

  throw new Error(`Failed after ${maxRetries} attempts: ${lastError.message}`);
}
```

### Graceful Degradation

```typescript
async function handleAIFailure(
  error: Error,
  context: AgentContext
): Promise<void> {
  // Log to monitoring
  console.error('[AI Agent Error]', {
    error: error.message,
    labNumber: context.labNumber,
    timestamp: new Date()
  });

  // Notify student with friendly message
  context.onStatusUpdate({
    type: 'error',
    message: `I'm having trouble right now. Please try again in a moment. If this keeps happening, try refreshing the page.`,
    timestamp: new Date()
  });

  // Save partial progress
  await saveProjectSnapshot({
    userId: context.userId,
    labNumber: context.labNumber,
    files: await getAllFilesFromWebContainer(context.webContainer),
    status: 'error',
    errorMessage: error.message
  });
}
```

---

## 9. Token Usage Optimization

### Strategies

1. **Minimize System Prompt**: Keep instructions concise
2. **Limit Conversation History**: Only include last N messages
3. **Compress File Content**: Don't include full code in every message
4. **Use Streaming**: Show progress without waiting for completion
5. **Cache Common Patterns**: Reuse tested code templates

### Token Budget Per Lab

```typescript
const TOKEN_BUDGETS = {
  lab_1: {
    systemPrompt: 500,      // Static HTML/CSS instructions
    userPrompt: 200,        // Student request
    aiResponse: 2000,       // Code generation
    toolResults: 500,       // File operations
    total: 3200
  },
  lab_2: {
    systemPrompt: 600,      // JavaScript instructions
    userPrompt: 200,
    aiResponse: 3000,       // More complex code
    toolResults: 800,
    total: 4600
  },
  lab_3: {
    systemPrompt: 800,      // Full-stack instructions
    userPrompt: 300,
    aiResponse: 5000,       // Frontend + Backend
    toolResults: 1200,
    total: 7300
  }
};
```

### Cost Estimates

**Assumptions**:
- Model: GPT-4o ($5/1M input, $15/1M output)
- Labs: 3 per student
- Success rate: 90% first try, 10% need 1 retry

```typescript
// Average tokens per lab
const avgTokensInput = (3200 + 4600 + 7300) / 3 = 5033 tokens
const avgTokensOutput = 2000 tokens (mostly code generation)

// Cost per student
const costPerLab = (5033 * $5/1M) + (2000 * $15/1M) = $0.055
const costPerStudent = $0.055 * 3 labs * 1.1 (retry buffer) = $0.18

// At scale
const cost1000Students = $0.18 * 1000 = $180/month
```

---

## 10. Rate Limiting

### Per-User Limits

```typescript
// Rate limits to prevent abuse
const RATE_LIMITS = {
  ai_agent_builds: {
    limit: 10,              // Max 10 builds per hour
    window: 60 * 60 * 1000  // 1 hour
  },
  ai_coach_questions: {
    limit: 20,              // Max 20 questions per hour
    window: 60 * 60 * 1000
  }
};

export async function checkRateLimit(
  userId: string,
  action: string
): Promise<boolean> {
  const limit = RATE_LIMITS[action];
  if (!limit) return true;

  const windowStart = new Date(Date.now() - limit.window);

  const { count } = await supabase
    .from('ai_usage_log')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .eq('action', action)
    .gte('created_at', windowStart.toISOString());

  return (count || 0) < limit.limit;
}
```

### Implementation in Server Action

```typescript
export async function runAIAgentAction(
  labNumber: number,
  userPrompt: string
): Promise<AIAgentResult> {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not authenticated');

  // Check rate limit
  const allowed = await checkRateLimit(user.id, 'ai_agent_builds');
  if (!allowed) {
    return {
      success: false,
      error: 'Rate limit exceeded. You can build 10 projects per hour. Try again soon!'
    };
  }

  // Log usage
  await supabase.from('ai_usage_log').insert({
    user_id: user.id,
    action: 'ai_agent_builds',
    metadata: { labNumber, promptLength: userPrompt.length }
  });

  // Run AI Agent
  return runAIAgent({ labNumber, userPrompt, userId: user.id });
}
```

---

## 11. Monitoring & Analytics

### Metrics to Track

```typescript
interface AIAgentMetrics {
  labNumber: number;
  userId: string;
  promptLength: number;
  totalIterations: number;
  tokensUsed: {
    input: number;
    output: number;
  };
  duration: number;          // milliseconds
  success: boolean;
  errorMessage?: string;
  testsPassed: boolean;
  fixAttempts: number;       // How many times AI fixed bugs
  timestamp: Date;
}
```

### Logging Implementation

```typescript
async function logAIAgentExecution(metrics: AIAgentMetrics) {
  await supabase.from('ai_agent_logs').insert({
    user_id: metrics.userId,
    lab_number: metrics.labNumber,
    prompt_length: metrics.promptLength,
    total_iterations: metrics.totalIterations,
    tokens_input: metrics.tokensUsed.input,
    tokens_output: metrics.tokensUsed.output,
    duration_ms: metrics.duration,
    success: metrics.success,
    error_message: metrics.errorMessage,
    tests_passed: metrics.testsPassed,
    fix_attempts: metrics.fixAttempts,
    created_at: metrics.timestamp
  });
}
```

### Analytics Queries

```sql
-- Average success rate per lab
SELECT
  lab_number,
  COUNT(*) as total_attempts,
  COUNT(*) FILTER (WHERE success = true) as successful,
  ROUND(COUNT(*) FILTER (WHERE success = true)::numeric / COUNT(*) * 100, 2) as success_rate
FROM ai_agent_logs
GROUP BY lab_number;

-- Average tokens used per lab
SELECT
  lab_number,
  AVG(tokens_input) as avg_input_tokens,
  AVG(tokens_output) as avg_output_tokens,
  AVG(tokens_input + tokens_output) as avg_total_tokens
FROM ai_agent_logs
WHERE success = true
GROUP BY lab_number;

-- AI Agent performance over time
SELECT
  DATE_TRUNC('day', created_at) as date,
  AVG(duration_ms) as avg_duration,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY duration_ms) as p95_duration
FROM ai_agent_logs
WHERE success = true
GROUP BY date
ORDER BY date DESC;
```

---

## 12. Testing Strategy

### Unit Tests

```typescript
// Test tool execution handlers
describe('AI Agent Tool Handlers', () => {
  it('handleCreateFile writes file to WebContainer', async () => {
    const mockContext = createMockContext();

    await handleCreateFile(
      { path: 'test.js', content: 'console.log("test")' },
      mockContext
    );

    expect(mockContext.webContainer.fs.writeFile).toHaveBeenCalledWith(
      'test.js',
      'console.log("test")'
    );
  });

  it('handleRunCommand executes in WebContainer', async () => {
    const mockContext = createMockContext();

    const result = await handleRunCommand(
      { command: 'npm', args: ['install'] },
      mockContext
    );

    expect(result.exitCode).toBe(0);
  });
});
```

### Integration Tests

```typescript
// Test full AI Agent flow
describe('AI Agent Orchestration', () => {
  it('generates working calculator app from prompt', async () => {
    const context = {
      labNumber: 2,
      userPrompt: 'Create a calculator app',
      userId: 'test-user-id',
      webContainer: await WebContainer.boot(),
      onStatusUpdate: jest.fn(),
      onFileCreate: jest.fn(),
      onCommandRun: jest.fn()
    };

    const result = await runAIAgent(context);

    expect(result.success).toBe(true);
    expect(context.onFileCreate).toHaveBeenCalledWith('index.html', expect.any(String));
    expect(context.onFileCreate).toHaveBeenCalledWith('app.js', expect.any(String));
  });
});
```

---

## 13. Security Considerations

### Input Validation

```typescript
// Validate user prompts
function validateUserPrompt(prompt: string): { valid: boolean; reason?: string } {
  // Check length
  if (prompt.length < 10) {
    return { valid: false, reason: 'Prompt too short (min 10 characters)' };
  }
  if (prompt.length > 1000) {
    return { valid: false, reason: 'Prompt too long (max 1000 characters)' };
  }

  // Check for suspicious content
  const suspiciousPatterns = [
    /api[_-]?key/i,
    /password/i,
    /token/i,
    /secret/i
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(prompt)) {
      return { valid: false, reason: 'Prompt contains sensitive keywords' };
    }
  }

  return { valid: true };
}
```

### Sandbox Environment

- **WebContainers**: Already sandboxed (no access to host filesystem)
- **AI-Generated Code**: Runs only in browser (no server execution)
- **Network Isolation**: WebContainers can only access allowed origins

### Output Filtering

```typescript
// Remove sensitive data from AI responses
function sanitizeAIResponse(response: string): string {
  // Remove potential API keys
  response = response.replace(/[a-zA-Z0-9]{32,}/g, '[REDACTED]');

  // Remove file paths that might expose system info
  response = response.replace(/\/home\/[^\s]+/g, '[PATH]');

  return response;
}
```

---

## 14. Future Enhancements

### Phase 2 (Post-MVP)

- [ ] **Streaming responses**: Show AI thinking in real-time
- [ ] **Multi-step planning**: AI outlines plan before coding
- [ ] **Code explanations**: AI explains every file after generation
- [ ] **Custom tools**: Students can define custom AI tools
- [ ] **Collaboration**: Multiple students share AI agent

### Phase 3 (Advanced)

- [ ] **AI learns from feedback**: Improve based on user reactions
- [ ] **Template library**: AI references tested patterns
- [ ] **Natural language debugging**: "Make the button blue"
- [ ] **Multi-language support**: Python, Go, Rust agents

---

## 15. Related Documentation

- **[WebContainers Platform](webcontainers-platform.md)** - Where AI-generated code runs
- **[Auto-Testing Framework](auto-testing-framework.md)** - How AI fixes bugs
- **[Data Model & Services](data-model-and-services.md)** - Database schema for AI logs
- **[Coach Interaction Pattern](coach-interaction-pattern.md)** - AI Coach integration

---

## 16. Appendix

### Example Full AI Conversation

**Student**: "Create a countdown timer"

**System Prompt** (Lab 2):
```
You are a coding assistant for complete beginners...
[Full system prompt for Lab 2]
```

**AI Response 1** (Tool Calls):
```json
{
  "content": null,
  "tool_calls": [
    {
      "id": "call_1",
      "function": {
        "name": "announceStatus",
        "arguments": {
          "message": "Creating project structure...",
          "type": "info"
        }
      }
    },
    {
      "id": "call_2",
      "function": {
        "name": "createFile",
        "arguments": {
          "path": "package.json",
          "content": "{\n  \"name\": \"countdown-timer\",\n  \"version\": \"1.0.0\"\n}"
        }
      }
    },
    {
      "id": "call_3",
      "function": {
        "name": "createFile",
        "arguments": {
          "path": "index.html",
          "content": "<!DOCTYPE html>\n<html>...</html>"
        }
      }
    }
  ]
}
```

**Tool Results**:
```json
[
  { "id": "call_1", "output": { "success": true } },
  { "id": "call_2", "output": { "success": true } },
  { "id": "call_3", "output": { "success": true } }
]
```

**AI Response 2** (More Tool Calls):
```json
{
  "tool_calls": [
    {
      "id": "call_4",
      "function": {
        "name": "runCommand",
        "arguments": {
          "command": "npm",
          "args": ["install"]
        }
      }
    },
    {
      "id": "call_5",
      "function": {
        "name": "runTests",
        "arguments": {}
      }
    }
  ]
}
```

**Final AI Response**:
```json
{
  "content": "✅ Your countdown timer is ready! Click 'Explain Code' to learn how it works.",
  "tool_calls": []
}
```

---

**Document Version**: 1.0
**Status**: Ready for Implementation
**Next Review**: After Story 005 completion
