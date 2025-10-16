# Coach Interaction Pattern

## Overview

All AI coach interactions in VibeCoding Lab follow a unified pattern through the shared `askCoach()` server action. This ensures consistent behavior, proper logging, and transparent conversation history across all 3 labs.

## Architecture

```
┌──────────────┐
│ Client Code  │ (React components, forms)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  askCoach()  │ (lib/actions/coach.ts)
│ Server Action│
└──────┬───────┘
       │
       ├─► 1. Validate auth
       ├─► 2. Call AI provider (via callCoach())
       ├─► 3. Persist to coach_transcripts
       ├─► 4. Log telemetry
       └─► 5. Return response
```

## Usage

### Basic Example

```typescript
import { askCoach } from "@/lib/actions/coach"

// In your server action or component
const response = await askCoach({
  userMessage: "How do I validate my problem?",
  context: "Problem",
  moduleNumber: 1,
})

if (response.success) {
  console.log(response.message)
  console.log(`Response time: ${response.latencyMs}ms`)
} else {
  console.error(response.error)
}
```

### Context Tags for VibeCoding Lab

Use the appropriate `context` value for each lab:

| Lab | Context Tag | Description |
|-----|-------------|-------------|
| 1 | `"Code"` | HTML/CSS questions, frontend basics |
| 2 | `"Code"` | JavaScript questions, interactivity help |
| 3 | `"Code"` | Full-stack questions, backend/API help |
| All | `"Sandbox"` | WebContainers platform troubleshooting, general coding help |

**Note**: For MVP, we use simple context tags. Future modules may add "Orientation", "GTM", "Iterate", "Demo" contexts.

### Advanced Example with Additional Context

```typescript
const response = await askCoach({
  userMessage: "How do I add event listeners in JavaScript?",
  context: "Code",
  moduleNumber: 2,
  additionalContext: {
    labNumber: 2,
    currentFile: "app.js",
    topic: "event-handling"
  },
})
```

## TypeScript Types

```typescript
import type { CoachContextTag } from "@/lib/coach"

// Request
interface AskCoachRequest {
  userMessage: string
  context: CoachContextTag
  moduleNumber: number
  additionalContext?: Record<string, any>
}

// Response
interface AskCoachResponse {
  success: boolean
  message?: string
  suggestions?: string[]
  latencyMs?: number
  transcriptId?: string
  error?: string
}
```

## Features

### 1. Automatic Transcript Persistence

Every coach interaction is automatically saved to the `coach_transcripts` table with:
- User ID
- Module number
- Context tag
- User message
- Coach response
- Latency in milliseconds
- Status (success/failure/timeout)
- Timestamp

### 2. Error Handling

The action provides user-friendly error messages while logging detailed errors for debugging:

```typescript
const response = await askCoach({ ... })

if (!response.success) {
  // User sees friendly message
  toast({
    title: "Error",
    description: response.error,
    variant: "destructive",
  })
}
```

Possible errors:
- **Authentication required**: User not logged in
- **Empty message**: User didn't provide a message
- **AI provider timeout**: Request took too long
- **AI provider failure**: Provider API error

### 3. Telemetry and Logging

All requests are logged with:
- User ID
- Module number
- Context tag
- Latency
- Success/failure status
- Transcript ID (if saved)

Example console output:
```
[askCoach] User abc-123 | Module 1 | Context: Problem
[askCoach] Success | Latency: 845ms | Transcript ID: xyz-456
```

### 4. Performance Monitoring

Response includes latency for monitoring:

```typescript
const response = await askCoach({ ... })
console.log(`Coach responded in ${response.latencyMs}ms`)
```

## Best Practices

### ✅ Do

- **Always use `askCoach()`** instead of calling `callCoach()` directly
- **Use correct context tags** for your module
- **Handle errors gracefully** with user-friendly messages
- **Include module number** to help with analytics
- **Add additional context** when helpful for the AI

### ❌ Don't

- Don't call `callCoach()` directly from client code
- Don't skip error handling
- Don't use wrong context tags (they're tracked in analytics)
- Don't forget to show loading states to users

## Example Implementations

### Orientation Module

```typescript
// app/dashboard/orientation/orientation-client.tsx
const handleAskCoach = async () => {
  setIsAskingCoach(true)

  const response = await askCoach({
    userMessage: coachQuestion,
    context: "Orientation",
    moduleNumber: 0,
  })

  if (response.success) {
    setCoachResponse(response.message)
    toast({
      title: "Coach responded",
      description: `Response time: ${response.latencyMs}ms`,
    })
  } else {
    toast({
      title: "Error",
      description: response.error,
      variant: "destructive",
    })
  }

  setIsAskingCoach(false)
}
```

### Problem Discovery Module

```typescript
// app/dashboard/problem-discovery/actions.ts
export async function runResearchCoach(userMessage: string, researchType: string) {
  const response = await askCoach({
    userMessage,
    context: "Problem",
    moduleNumber: 1,
    additionalContext: { researchType },
  })

  if (!response.success) {
    return { success: false, error: response.error }
  }

  // Save coach feedback to research_inputs
  await supabase.from("research_inputs").insert({
    user_id: user.id,
    research_type: researchType,
    content: { userMessage },
    coach_feedback: response.message,
  })

  return {
    success: true,
    coachResponse: response.message,
    suggestions: response.suggestions,
  }
}
```

## Retrieving Coach History

Use the `getCoachTranscripts()` helper to display conversation history:

```typescript
import { getCoachTranscripts } from "@/lib/actions/coach"

// Get all transcripts for current user
const allTranscripts = await getCoachTranscripts()

// Get transcripts for specific module
const moduleTranscripts = await getCoachTranscripts(1, 20)

if (allTranscripts.success) {
  console.log(allTranscripts.data) // Array of CoachTranscript
}
```

## Database Schema

Transcripts are stored in the `coach_transcripts` table:

```sql
CREATE TABLE coach_transcripts (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  module_number SMALLINT,
  context_tag TEXT CHECK (context_tag IN ('Orientation', 'Problem', 'Sandbox', 'GTM', 'Iterate', 'Demo')),
  user_message TEXT NOT NULL,
  coach_response TEXT NOT NULL,
  latency_ms INTEGER,
  tone TEXT CHECK (tone IN ('coach', 'warning', 'celebration')),
  status TEXT CHECK (status IN ('success', 'failure', 'timeout')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## Testing

### Unit Test Example

```typescript
describe("askCoach", () => {
  it("should persist transcript on success", async () => {
    const response = await askCoach({
      userMessage: "Test question",
      context: "Problem",
      moduleNumber: 1,
    })

    expect(response.success).toBe(true)
    expect(response.transcriptId).toBeDefined()

    // Verify transcript in database
    const transcript = await supabase
      .from("coach_transcripts")
      .select()
      .eq("id", response.transcriptId)
      .single()

    expect(transcript.data.module_number).toBe(1)
    expect(transcript.data.context_tag).toBe("Problem")
  })
})
```

### Integration Test

```typescript
// Test that orientation coach Q&A creates transcripts
test("orientation coach interaction", async () => {
  await login()
  await visit("/dashboard/orientation")

  await fillIn("coach-question", "How do I set up WebContainers?")
  await click("ask-coach-button")

  await waitFor(() => {
    expect(screen.getByText(/response-time/i)).toBeInTheDocument()
  })

  // Verify transcript created
  const transcripts = await getCoachTranscripts(0)
  expect(transcripts.data.length).toBeGreaterThan(0)
  expect(transcripts.data[0].context_tag).toBe("Orientation")
})
```

## Migration Guide

### Before (old pattern)

```typescript
// ❌ Don't do this anymore
import { callCoach } from "@/lib/coach"

const response = await callCoach({
  context: "Problem",
  userMessage: question,
  moduleNumber: 1,
})

// No transcript persistence
// No error handling
// No telemetry
```

### After (new pattern)

```typescript
// ✅ Do this instead
import { askCoach } from "@/lib/actions/coach"

const response = await askCoach({
  userMessage: question,
  context: "Problem",
  moduleNumber: 1,
})

if (response.success) {
  // Transcript automatically saved ✓
  // Telemetry logged ✓
  // Errors handled ✓
  console.log(response.message)
}
```

## Support

For questions or issues with the coach interaction pattern:
- Check this documentation
- Review `lib/actions/coach.ts` source code
- Check `coach_transcripts` table for debugging
- Review telemetry logs in server console

## Related Files

- `lib/actions/coach.ts` - Main server action
- `lib/coach.ts` - AI provider wrapper
- `lib/types.ts` - TypeScript types
- `supabase/migrations/20251013000000_initial_schema.sql` - Database schema
