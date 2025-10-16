# Auto-Testing Framework Architecture

**Document Version**: 1.0
**Last Updated**: 2025-10-13
**Status**: Active Development
**Related**: [AI Agent Orchestration](ai-agent-orchestration.md), [WebContainers Platform](webcontainers-platform.md)

---

## 1. Overview

The Auto-Testing Framework is the educational heart of VibeCoding Lab. It demonstrates to complete beginners that coding is an iterative process: write → test → fix → success. By watching AI detect and fix bugs automatically, students learn that debugging is normal and approachable.

### Purpose

- **Validate Code**: Ensure AI-generated code works correctly
- **Detect Bugs**: Identify issues through automated tests
- **Self-Heal**: Fix bugs automatically (max 3 attempts)
- **Educate**: Teach debugging concepts through observation
- **Build Confidence**: Show students that bugs are fixable

### Key Principles

- **Test-First**: Tests generated alongside code
- **Beginner-Friendly**: Error messages translated to plain English
- **Observable**: Students see the test → fail → fix → pass cycle
- **Educational**: Narrate why bugs happen and how to fix them
- **Fault-Tolerant**: Graceful handling when fixes don't work

---

## 2. Architecture Overview

### Test Execution Flow

```
AI Generates Code
      ↓
AI Creates Tests
      ↓
Run Tests in WebContainers
      ↓
Parse Test Results
      ↓
   Tests Pass?
   /        \
  YES       NO
   ↓         ↓
Success   Analyze Errors
          ↓
       AI Fixes Code (Attempt 1)
          ↓
       Run Tests Again
          ↓
       Tests Pass?
       /        \
      YES       NO
       ↓         ↓
    Success   Fix Again (Attempt 2)
              ↓
           Run Tests Again
              ↓
           Tests Pass?
           /        \
          YES       NO
           ↓         ↓
        Success   Final Attempt (3)
                  ↓
               Tests Pass?
               /        \
              YES       NO
               ↓         ↓
            Success  Graceful Failure
                     (Explain issue to student)
```

### Component Diagram

```
┌─────────────────────────────────────────────────────────┐
│  AI Agent (Orchestration)                              │
│  ├── Generate initial code                             │
│  ├── Generate test suite                               │
│  └── Call Test Framework                               │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────┐
│  Test Framework (This Document)                        │
│  ├── Execute tests in WebContainers                    │
│  ├── Parse results and errors                          │
│  ├── Trigger AI fix if failures                        │
│  └── Retry up to 3 times                               │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────┐
│  WebContainers (Execution Environment)                 │
│  ├── Run Vitest/Jest                                   │
│  ├── Execute test files                                │
│  └── Return stdout/stderr                              │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Test Framework Selection

### Vitest (Recommended)

**Why Vitest**:
- ✅ Fast startup in WebContainers
- ✅ Modern, Jest-compatible API
- ✅ Better performance for browser environments
- ✅ Smaller bundle size
- ✅ Built-in support for ES modules

**Configuration**:
```javascript
// vitest.config.js (AI-generated in each project)
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    testTimeout: 10000, // 10 seconds max per test
    hookTimeout: 5000,
    reporters: ['json', 'verbose'],
    outputFile: {
      json: './test-results.json'
    }
  }
});
```

### Jest (Alternative)

**When to use Jest**:
- If student's prompt requires specific Jest features
- If testing React components (Lab 2+)
- If compatibility with Jest ecosystem is needed

**Configuration**:
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'node',
  verbose: true,
  testTimeout: 10000,
  reporters: [
    'default',
    ['jest-json-reporter', { outputPath: './test-results.json' }]
  ]
};
```

---

## 4. Test Generation Strategies

### Lab 1: Static Website Tests

**Project Type**: HTML + CSS landing page

**AI-Generated Tests**:
```javascript
// tests/page.test.js
import { readFileSync } from 'fs';
import { describe, it, expect } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Personal Landing Page', () => {
  let dom;
  let document;

  beforeAll(() => {
    const html = readFileSync('./index.html', 'utf-8');
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  it('has a valid HTML structure', () => {
    expect(document.doctype).toBeTruthy();
    expect(document.querySelector('html')).toBeTruthy();
  });

  it('contains a heading with name', () => {
    const heading = document.querySelector('h1, h2');
    expect(heading).toBeTruthy();
    expect(heading.textContent.length).toBeGreaterThan(0);
  });

  it('has a bio section', () => {
    const bio = document.querySelector('p, .bio, #bio');
    expect(bio).toBeTruthy();
    expect(bio.textContent.length).toBeGreaterThan(10);
  });

  it('includes a contact button', () => {
    const button = document.querySelector('button, a.button');
    expect(button).toBeTruthy();
  });

  it('links CSS file correctly', () => {
    const link = document.querySelector('link[rel="stylesheet"]');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toContain('.css');
  });
});
```

**Common Failures**:
- Missing `<!DOCTYPE html>`
- CSS file not linked
- No heading or bio section

### Lab 2: Interactive App Tests

**Project Type**: HTML + CSS + JavaScript (counter, calculator, etc.)

**AI-Generated Tests**:
```javascript
// tests/app.test.js
import { readFileSync } from 'fs';
import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Counter App', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    const html = readFileSync('./index.html', 'utf-8');
    const js = readFileSync('./app.js', 'utf-8');

    dom = new JSDOM(html, { runScripts: 'dangerously' });
    document = dom.window.document;
    window = dom.window;

    // Load JavaScript
    const script = document.createElement('script');
    script.textContent = js;
    document.body.appendChild(script);
  });

  it('counter starts at 0', () => {
    const display = document.querySelector('#counter, .counter');
    expect(display.textContent).toBe('0');
  });

  it('increment button increases counter', () => {
    const button = document.querySelector('#increment, .increment');
    const display = document.querySelector('#counter, .counter');

    button.click();
    expect(display.textContent).toBe('1');

    button.click();
    expect(display.textContent).toBe('2');
  });

  it('decrement button decreases counter', () => {
    const incButton = document.querySelector('#increment');
    const decButton = document.querySelector('#decrement');
    const display = document.querySelector('#counter');

    incButton.click();
    incButton.click();
    decButton.click();

    expect(display.textContent).toBe('1');
  });

  it('reset button clears counter', () => {
    const incButton = document.querySelector('#increment');
    const resetButton = document.querySelector('#reset');
    const display = document.querySelector('#counter');

    incButton.click();
    resetButton.click();

    expect(display.textContent).toBe('0');
  });
});
```

**Common Failures**:
- Event listeners not attached
- String concatenation instead of addition (`'2' + '3' = '23'`)
- DOM element selectors wrong
- Missing reset functionality

### Lab 3: Full-Stack App Tests

**Project Type**: Frontend + Express Backend + API

**AI-Generated Tests**:
```javascript
// tests/server.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../server/server.js';

describe('Weather Dashboard API', () => {
  let server;

  beforeAll(() => {
    server = app.listen(3001); // Test port
  });

  afterAll(() => {
    server.close();
  });

  it('GET / returns HTML page', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');
  });

  it('GET /api/weather returns JSON', async () => {
    const response = await request(app).get('/api/weather?city=Seattle');
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toHaveProperty('temperature');
    expect(response.body).toHaveProperty('conditions');
  });

  it('handles missing city parameter', async () => {
    const response = await request(app).get('/api/weather');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('enables CORS for frontend', async () => {
    const response = await request(app).get('/api/weather?city=Seattle');
    expect(response.headers['access-control-allow-origin']).toBeTruthy();
  });
});

// tests/client.test.js
import { readFileSync } from 'fs';
import { describe, it, expect } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Weather Dashboard Frontend', () => {
  let document;

  beforeAll(() => {
    const html = readFileSync('./client/index.html', 'utf-8');
    const dom = new JSDOM(html);
    document = dom.window.document;
  });

  it('has city input field', () => {
    const input = document.querySelector('input[type="text"]');
    expect(input).toBeTruthy();
  });

  it('has search button', () => {
    const button = document.querySelector('button');
    expect(button).toBeTruthy();
  });

  it('has results display area', () => {
    const results = document.querySelector('#results, .results');
    expect(results).toBeTruthy();
  });
});
```

**Common Failures**:
- Express server not starting
- CORS not configured
- API endpoint returning wrong format
- Frontend not fetching from correct URL

---

## 5. Test Execution in WebContainers

### Execution Handler

```typescript
// lib/test-runner.ts

export interface TestResult {
  passed: number;
  failed: number;
  total: number;
  duration: number;
  errors: TestError[];
  rawOutput: string;
}

export interface TestError {
  testName: string;
  error: string;
  location: string;      // file:line
  snippet?: string;      // Code snippet causing error
  expected?: any;
  received?: any;
}

export async function runTests(
  webContainer: WebContainer
): Promise<TestResult> {
  try {
    // 1. Run Vitest
    const process = await webContainer.spawn('npx', [
      'vitest',
      'run',
      '--reporter=json',
      '--reporter=verbose'
    ]);

    // 2. Collect output
    let output = '';
    process.output.pipeTo(
      new WritableStream({
        write(chunk) {
          output += chunk;
        }
      })
    );

    const exitCode = await process.exit;

    // 3. Parse JSON results
    const results = parseVitestOutput(output);

    // 4. Extract errors
    const errors = extractTestErrors(results);

    return {
      passed: results.numPassedTests,
      failed: results.numFailedTests,
      total: results.numTotalTests,
      duration: results.testResults.reduce((sum, r) => sum + r.duration, 0),
      errors,
      rawOutput: output
    };
  } catch (error) {
    // Handle test runner crash
    return {
      passed: 0,
      failed: 0,
      total: 0,
      duration: 0,
      errors: [{
        testName: 'Test Runner',
        error: error.message,
        location: 'unknown'
      }],
      rawOutput: ''
    };
  }
}
```

### Output Parsing

```typescript
function parseVitestOutput(output: string): any {
  try {
    // Find JSON output in verbose output
    const jsonMatch = output.match(/\{[\s\S]*"numTotalTests"[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    // Fallback: parse verbose output
    return parseVerboseOutput(output);
  } catch (error) {
    throw new Error(`Failed to parse test output: ${error.message}`);
  }
}

function extractTestErrors(results: any): TestError[] {
  const errors: TestError[] = [];

  for (const testResult of results.testResults) {
    for (const assertionResult of testResult.assertionResults) {
      if (assertionResult.status === 'failed') {
        errors.push({
          testName: assertionResult.title,
          error: assertionResult.failureMessages[0],
          location: `${testResult.name}:${assertionResult.location?.line || 'unknown'}`,
          expected: assertionResult.expected,
          received: assertionResult.actual
        });
      }
    }
  }

  return errors;
}
```

---

## 6. Self-Healing Loop

### Iteration Strategy

```typescript
// lib/self-healing.ts

export async function runTestFixCycle(
  webContainer: WebContainer,
  context: AgentContext,
  maxAttempts = 3
): Promise<{ success: boolean; attempts: number; errors?: TestError[] }> {
  let attempt = 0;

  while (attempt < maxAttempts) {
    attempt++;

    // Update UI
    context.onStatusUpdate({
      type: 'command',
      message: attempt === 1
        ? '🧪 Running tests...'
        : `🧪 Running tests again (Attempt ${attempt})...`,
      timestamp: new Date()
    });

    // Run tests
    const testResult = await runTests(webContainer);

    // Check if all passed
    if (testResult.failed === 0) {
      context.onStatusUpdate({
        type: 'success',
        message: `✅ All ${testResult.total} tests passed!`,
        timestamp: new Date()
      });

      return { success: true, attempts: attempt };
    }

    // Tests failed
    context.onStatusUpdate({
      type: 'info',
      message: `❌ ${testResult.failed} test(s) failed. Let me analyze the errors...`,
      timestamp: new Date()
    });

    // Show errors to student (beginner-friendly)
    for (const error of testResult.errors) {
      const explanation = explainErrorToStudent(error);
      context.onStatusUpdate({
        type: 'error',
        message: explanation,
        timestamp: new Date()
      });
    }

    // If max attempts reached, give up
    if (attempt >= maxAttempts) {
      context.onStatusUpdate({
        type: 'error',
        message: `I tried ${maxAttempts} times but couldn't fix all the issues. Let me explain what's wrong...`,
        timestamp: new Date()
      });

      return { success: false, attempts: attempt, errors: testResult.errors };
    }

    // Ask AI to fix
    context.onStatusUpdate({
      type: 'info',
      message: '🔧 I found the issue! Let me fix it...',
      timestamp: new Date()
    });

    await fixCodeWithAI(testResult.errors, webContainer, context);
  }

  // Should never reach here
  return { success: false, attempts: maxAttempts };
}
```

### AI Fix Request

```typescript
async function fixCodeWithAI(
  errors: TestError[],
  webContainer: WebContainer,
  context: AgentContext
): Promise<void> {
  // 1. Get current code files
  const files = await getAllFiles(webContainer);

  // 2. Build fix prompt
  const fixPrompt = buildFixPrompt(errors, files);

  // 3. Call AI with fix-focused system prompt
  const response = await callAI({
    model: process.env.AI_MODEL || 'gpt-4o',
    messages: [
      { role: 'system', content: AI_FIX_SYSTEM_PROMPT },
      { role: 'user', content: fixPrompt }
    ],
    tools: [updateFileTool, announceStatusTool],
    temperature: 0.2 // Lower for precise fixes
  });

  // 4. Execute tool calls (should be updateFile)
  await executeToolCalls(response.tool_calls, context);
}

function buildFixPrompt(errors: TestError[], files: Record<string, string>): string {
  let prompt = 'The following tests failed:\n\n';

  for (const error of errors) {
    prompt += `❌ Test: "${error.testName}"\n`;
    prompt += `   Error: ${error.error}\n`;
    prompt += `   Location: ${error.location}\n\n`;
  }

  prompt += '\nCurrent code files:\n\n';

  for (const [path, content] of Object.entries(files)) {
    prompt += `=== ${path} ===\n${content}\n\n`;
  }

  prompt += 'Fix the code to make these tests pass. Use updateFile() for each file you need to change.';

  return prompt;
}
```

### Fix-Focused System Prompt

```
You are a debugging assistant helping fix code that failed tests.

RULES:
1. Analyze the test errors carefully
2. Identify the root cause (not just symptoms)
3. Make minimal changes to fix the issue
4. Explain what was wrong in simple terms
5. Use updateFile() to apply fixes

COMMON BEGINNER BUGS:
- String concatenation instead of addition ('2' + '3' = '23')
  Fix: Convert to numbers first with Number() or parseInt()
- Missing event listeners
  Fix: Add addEventListener() calls
- Wrong DOM selectors
  Fix: Use correct IDs or classes
- CORS not configured
  Fix: Add cors() middleware in Express
- Async/await missing
  Fix: Add await when calling async functions

WORKFLOW:
1. announceStatus("I found the issue: [explain problem]", "info")
2. updateFile(path, fixedContent)
3. announceStatus("Fixed! The issue was [explanation]", "success")

NARRATION STYLE:
- ❌ "Type coercion error"
- ✅ "The calculator was treating numbers as text"
- ❌ "Missing async/await"
- ✅ "The code needs to wait for data before showing it"

Now fix these errors:
[Errors will be inserted here]
```

---

## 7. Error Translation for Students

### Beginner-Friendly Explanations

```typescript
// lib/error-explainer.ts

export function explainErrorToStudent(error: TestError): string {
  const errorMsg = error.error.toLowerCase();

  // Type errors
  if (errorMsg.includes('undefined') || errorMsg.includes('null')) {
    return `🔍 The code is trying to use something that doesn't exist yet. Like looking for keys that aren't in your pocket. (Test: ${error.testName})`;
  }

  if (errorMsg.includes('is not a function')) {
    return `🔍 The code is trying to run something as a function, but it's not one. Like trying to "drive" a bicycle. (Test: ${error.testName})`;
  }

  if (errorMsg.includes('cannot read property')) {
    return `🔍 The code is trying to access a property on something that's undefined. Like asking "What's your name?" to an empty room. (Test: ${error.testName})`;
  }

  // String/number errors
  if (error.expected && error.received) {
    if (typeof error.expected === 'number' && typeof error.received === 'string') {
      return `🔍 Expected a number (${error.expected}) but got text ("${error.received}"). The code might be treating numbers as text. (Test: ${error.testName})`;
    }
  }

  // DOM errors
  if (errorMsg.includes('element') && errorMsg.includes('null')) {
    return `🔍 Can't find an element on the page. The code is looking for something that doesn't exist in the HTML. (Test: ${error.testName})`;
  }

  // Event listener errors
  if (errorMsg.includes('click') || errorMsg.includes('event')) {
    return `🔍 Button clicks aren't working. The code might be missing event listeners. (Test: ${error.testName})`;
  }

  // Network/API errors
  if (errorMsg.includes('fetch') || errorMsg.includes('network')) {
    return `🔍 The frontend can't connect to the backend. Like calling a phone number that's not connected. (Test: ${error.testName})`;
  }

  if (errorMsg.includes('cors')) {
    return `🔍 The backend is blocking the frontend from accessing it (CORS issue). Need to enable cross-origin requests. (Test: ${error.testName})`;
  }

  // Default explanation
  return `🔍 Test failed: ${error.testName}\nError: ${error.error}`;
}
```

### Visual Error Display

```tsx
// components/test-results-panel.tsx

interface TestResultsProps {
  results: TestResult;
  isRunning: boolean;
}

export function TestResultsPanel({ results, isRunning }: TestResultsProps) {
  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Test Results</CardTitle>
          {isRunning && <Loader2 className="animate-spin w-4 h-4" />}
        </div>
      </CardHeader>
      <CardContent>
        {results.total > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm">
              <span>
                ✓ {results.passed} passed • ✗ {results.failed} failed
              </span>
              <span className="text-muted-foreground">
                {results.duration}ms
              </span>
            </div>
            <Progress
              value={(results.passed / results.total) * 100}
              className="mt-2"
            />
          </div>
        )}

        {results.errors.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-red-600">
              Issues Found:
            </p>
            {results.errors.map((error, i) => (
              <Alert key={i} variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle className="text-xs">
                  {error.testName}
                </AlertTitle>
                <AlertDescription className="text-xs">
                  {explainErrorToStudent(error)}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        {results.passed === results.total && results.total > 0 && (
          <Alert className="bg-green-50 border-green-500">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle className="text-green-700">
              All tests passed!
            </AlertTitle>
            <AlertDescription className="text-green-600 text-xs">
              Your code works perfectly. Great job!
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
```

---

## 8. Test Result Persistence

### Save to Database

```typescript
// actions/save-test-results.ts

export async function saveTestResults(
  userId: string,
  labNumber: number,
  results: TestResult
): Promise<void> {
  const supabase = await getSupabaseServer();

  await supabase.from('webcontainer_projects').upsert(
    {
      user_id: userId,
      lab_number: labNumber,
      test_results: {
        passed: results.passed,
        failed: results.failed,
        total: results.total,
        duration: results.duration,
        errors: results.errors.map(e => ({
          test: e.testName,
          error: e.error,
          location: e.location
        })),
        timestamp: new Date().toISOString()
      },
      status: results.failed === 0 ? 'completed' : 'in_progress',
      completed_at: results.failed === 0 ? new Date().toISOString() : null,
      updated_at: new Date().toISOString()
    },
    {
      onConflict: 'user_id,lab_number'
    }
  );
}
```

---

## 9. Performance Considerations

### Test Execution Timeouts

```typescript
// Prevent hanging tests
const TEST_TIMEOUTS = {
  perTest: 10000,      // 10 seconds per test
  total: 30000,        // 30 seconds total
  hookTimeout: 5000    // 5 seconds for before/after hooks
};

// Kill test runner if it exceeds timeout
async function runTestsWithTimeout(
  webContainer: WebContainer,
  timeout = TEST_TIMEOUTS.total
): Promise<TestResult> {
  const timeoutPromise = new Promise<TestResult>((_, reject) => {
    setTimeout(() => reject(new Error('Test execution timeout')), timeout);
  });

  const testPromise = runTests(webContainer);

  try {
    return await Promise.race([testPromise, timeoutPromise]);
  } catch (error) {
    if (error.message === 'Test execution timeout') {
      // Kill the test process
      // Return timeout error
      return {
        passed: 0,
        failed: 1,
        total: 1,
        duration: timeout,
        errors: [{
          testName: 'Test Runner',
          error: 'Tests took too long to run (>30 seconds)',
          location: 'unknown'
        }],
        rawOutput: ''
      };
    }
    throw error;
  }
}
```

### Test Optimization

- **Parallel execution**: Run independent tests concurrently
- **Test isolation**: Each test runs in clean environment
- **Minimal setup**: Reduce before/after hooks
- **Fast assertions**: Use simple equality checks
- **Mock external APIs**: Don't call real APIs in tests

---

## 10. Monitoring & Analytics

### Metrics to Track

```typescript
interface TestMetrics {
  labNumber: number;
  userId: string;
  totalTests: number;
  passedFirstTry: boolean;
  fixAttempts: number;
  finallyPassed: boolean;
  duration: number;
  errors: string[];
  timestamp: Date;
}
```

### Analytics Queries

```sql
-- Success rate by lab
SELECT
  lab_number,
  COUNT(*) as total_runs,
  COUNT(*) FILTER (WHERE test_results->>'failed' = '0') as passed,
  ROUND(
    COUNT(*) FILTER (WHERE test_results->>'failed' = '0')::numeric / COUNT(*) * 100,
    2
  ) as success_rate
FROM webcontainer_projects
WHERE test_results IS NOT NULL
GROUP BY lab_number;

-- Average fix attempts
SELECT
  lab_number,
  AVG(total_iterations) as avg_fix_attempts
FROM webcontainer_projects
WHERE test_results IS NOT NULL
GROUP BY lab_number;

-- Common test failures
SELECT
  error->>'test' as test_name,
  COUNT(*) as failure_count
FROM webcontainer_projects,
  jsonb_array_elements(test_results->'errors') as error
GROUP BY test_name
ORDER BY failure_count DESC
LIMIT 10;
```

---

## 11. Testing Strategy

### Unit Tests

```typescript
// Test error explainer
describe('Error Explainer', () => {
  it('explains undefined errors', () => {
    const error: TestError = {
      testName: 'counter works',
      error: 'Cannot read property "textContent" of null',
      location: 'app.test.js:10'
    };

    const explanation = explainErrorToStudent(error);

    expect(explanation).toContain("doesn't exist");
    expect(explanation).not.toContain('null');
  });

  it('explains type errors', () => {
    const error: TestError = {
      testName: 'addition works',
      error: 'Expected 5, received "23"',
      location: 'calc.test.js:5',
      expected: 5,
      received: '23'
    };

    const explanation = explainErrorToStudent(error);

    expect(explanation).toContain('text');
    expect(explanation).toContain('number');
  });
});
```

### Integration Tests

```typescript
// Test full self-healing cycle
describe('Self-Healing Loop', () => {
  it('fixes broken code automatically', async () => {
    const mockContext = createMockContext();
    const webContainer = await WebContainer.boot();

    // Mount project with intentional bug
    await webContainer.mount({
      'app.js': { file: { contents: 'const sum = (a, b) => a + b; // Missing Number()' } },
      'app.test.js': { file: { contents: 'test("sum", () => expect(sum("2", "3")).toBe(5));' } }
    });

    const result = await runTestFixCycle(webContainer, mockContext);

    expect(result.success).toBe(true);
    expect(result.attempts).toBeGreaterThan(1);
    expect(mockContext.onStatusUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining('All')
      })
    );
  });
});
```

---

## 12. Future Enhancements

### Phase 2 (Post-MVP)

- [ ] **Visual test coverage**: Show which lines are tested
- [ ] **Test explanations**: AI explains what each test does
- [ ] **Student can write tests**: Advanced mode
- [ ] **Test replay**: Step through test execution
- [ ] **Custom assertions**: Beginner-friendly test helpers

### Phase 3 (Advanced)

- [ ] **Mutation testing**: Verify test quality
- [ ] **Performance tests**: Check app speed
- [ ] **Visual regression**: Screenshot comparison
- [ ] **Accessibility tests**: A11y checks

---

## 13. Related Documentation

- **[AI Agent Orchestration](ai-agent-orchestration.md)** - How AI fixes bugs
- **[WebContainers Platform](webcontainers-platform.md)** - Where tests run
- **[Data Model & Services](data-model-and-services.md)** - Database schema for test results

---

## 14. Appendix: Example Self-Healing Session

### Student Prompt
"Create a calculator app"

### AI Generates Code
```javascript
// app.js (INTENTIONAL BUG)
function add(a, b) {
  return a + b; // BUG: String concatenation
}
```

### AI Generates Test
```javascript
// app.test.js
test('addition works', () => {
  expect(add('2', '3')).toBe(5);
});
```

### First Test Run
```
❌ Test failed: "addition works"
Expected: 5
Received: "23"
```

### AI Analysis
```
🔍 I found the issue! When you type numbers into a form,
they come in as text. The calculator is treating '2' + '3'
as text joining, giving us '23' instead of 5.
```

### AI Fix
```javascript
// app.js (FIXED)
function add(a, b) {
  return Number(a) + Number(b); // Convert to numbers first
}
```

### Second Test Run
```
✅ All 1 tests passed!
```

### Student Sees
1. Test failed (with beginner-friendly error)
2. AI explanation of the problem
3. AI fixing the code
4. Tests passing

**Educational Outcome**: Student learns that:
- Testing catches bugs
- Bugs are normal and fixable
- Type conversion is important
- AI (and developers) debug by reading errors

---

**Document Version**: 1.0
**Status**: Ready for Implementation
**Next Review**: After Story 006 completion
