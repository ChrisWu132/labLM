# Testing Coach Interactions (Story 001A)

## Quick Test Guide

### Prerequisites
✅ Database schema applied (Story 000)
✅ App running locally: `npm run dev`
✅ User account created at `/auth`

## Test 1: Orientation Coach (2 minutes)

### Steps:
1. Visit http://localhost:3000/dashboard/orientation
2. Scroll to "Need Help Getting Started?" section
3. Click to expand the troubleshooting section
4. Enter a question in the text area:
   ```
   How do I set up Sandpack?
   ```
5. Click "Ask Coach"

### Expected Results:
✅ Loading spinner shows
✅ Response appears in ~1 second
✅ Toast notification shows: "Coach responded - Response time: XXXms"
✅ Response text starts with "Welcome! Great question..."

### Verify in Database:
```sql
SELECT
  module_number,
  context_tag,
  user_message,
  substring(coach_response, 1, 100) as response_preview,
  latency_ms,
  status,
  created_at
FROM coach_transcripts
WHERE module_number = 0
ORDER BY created_at DESC
LIMIT 5;
```

**Expected**:
- `module_number` = 0
- `context_tag` = 'Orientation'
- `status` = 'success'
- `latency_ms` > 0
- Timestamp is recent

### Check Server Logs:
```
[askCoach] User <uuid> | Module 0 | Context: Orientation
[askCoach] Success | Latency: 845ms | Transcript ID: <uuid>
```

---

## Test 2: Problem Discovery Coach (2 minutes)

### Steps:
1. Click "Start Learning" on orientation page
2. Navigate to /dashboard/problem-discovery
3. Find a coach interaction point (research helper, problem brief validator, etc.)
4. Enter a test question
5. Submit

### Expected Results:
✅ Coach responds with guidance
✅ Response stored to appropriate table (`research_inputs` or `problem_briefs`)
✅ Transcript created in `coach_transcripts`

### Verify in Database:
```sql
SELECT
  module_number,
  context_tag,
  substring(user_message, 1, 50) as message,
  status,
  created_at
FROM coach_transcripts
WHERE module_number = 1
ORDER BY created_at DESC
LIMIT 5;
```

**Expected**:
- `module_number` = 1
- `context_tag` = 'Problem'
- `status` = 'success'

---

## Test 3: Error Handling (1 minute)

### Test Empty Message
1. Go to orientation troubleshooting
2. Leave text area empty
3. Click "Ask Coach"

**Expected**: Toast error: "Please enter a message for the coach."

### Test Without Auth (Optional)
1. Log out
2. Try to call `askCoach()` directly

**Expected**: Authentication error

---

## Test 4: Performance (1 minute)

### Check Response Times
1. Ask 3-5 questions
2. Note the response times shown in toasts
3. Check server console for latency logs

**Expected**:
- Mock provider: 800-900ms (includes 800ms simulated delay)
- Transcript persistence: +5-10ms overhead
- Total: ~850ms

---

## Test 5: Transcript History (1 minute)

### View All Transcripts
```sql
SELECT
  module_number,
  context_tag,
  COUNT(*) as count,
  AVG(latency_ms) as avg_latency,
  MAX(latency_ms) as max_latency
FROM coach_transcripts
GROUP BY module_number, context_tag
ORDER BY module_number;
```

**Expected**:
- Separate counts for each module/context combination
- Average latency around 850ms for mock provider
- All with `status = 'success'`

### Check Individual Conversation
```sql
SELECT
  user_message,
  coach_response,
  latency_ms,
  created_at
FROM coach_transcripts
WHERE module_number = 0
ORDER BY created_at DESC;
```

**Expected**: Full conversation history preserved

---

## Test 6: Context Tags (2 minutes)

### Verify Correct Tagging

```sql
-- Should only have 'Orientation' for module 0
SELECT DISTINCT context_tag
FROM coach_transcripts
WHERE module_number = 0;
-- Expected: Only 'Orientation'

-- Should only have 'Problem' for module 1
SELECT DISTINCT context_tag
FROM coach_transcripts
WHERE module_number = 1;
-- Expected: Only 'Problem'
```

---

## Test 7: Telemetry Logging (1 minute)

### Check Console Output

Run app with: `npm run dev`

Ask a question in orientation, then check terminal output:

**Expected logs**:
```
[askCoach] User abc-123 | Module 0 | Context: Orientation
[askCoach] Success | Latency: 845ms | Transcript ID: xyz-789
```

**Should include**:
- User ID
- Module number
- Context tag
- Latency
- Transcript ID

---

## Automated Test (Optional)

### Create a Test File

```typescript
// tests/coach.test.ts
import { askCoach } from "@/lib/actions/coach"

describe("Coach Interaction", () => {
  it("should create transcript", async () => {
    const response = await askCoach({
      userMessage: "Test question",
      context: "Orientation",
      moduleNumber: 0,
    })

    expect(response.success).toBe(true)
    expect(response.message).toBeDefined()
    expect(response.latencyMs).toBeGreaterThan(0)
    expect(response.transcriptId).toBeDefined()
  })

  it("should handle empty message", async () => {
    const response = await askCoach({
      userMessage: "",
      context: "Orientation",
      moduleNumber: 0,
    })

    expect(response.success).toBe(false)
    expect(response.error).toContain("enter a message")
  })
})
```

---

## Troubleshooting

### Problem: No transcripts created

**Check**:
1. Is database connected? Check `.env` variables
2. Is RLS enabled? Run:
   ```sql
   SELECT tablename, rowsecurity
   FROM pg_tables
   WHERE tablename = 'coach_transcripts';
   ```
3. Is user authenticated? Check `auth.uid()` in Supabase

### Problem: "Not authenticated" error

**Fix**:
1. Log out and log back in
2. Check middleware.ts is working
3. Verify Supabase auth cookies

### Problem: No console logs

**Fix**:
1. Check server terminal (not browser console)
2. Look for `[askCoach]` prefix
3. Logs only appear in development mode

### Problem: Slow responses

**Expected**: Mock provider has 800ms delay
**Fix for production**: Connect real AI provider in `lib/coach.ts`

---

## Success Criteria

✅ All tests pass
✅ Transcripts created in database
✅ Correct module_number and context_tag
✅ Telemetry logged to console
✅ Error handling works
✅ Response times acceptable

---

## Next Steps After Testing

1. ✅ Confirm all tests pass
2. ⬜ Connect real AI provider (OpenAI/Anthropic)
3. ⬜ Implement remaining modules using same pattern
4. ⬜ Add rate limiting via `ai_usage_log`
5. ⬜ Deploy to production

---

## Questions?

- **Documentation**: `docs/architecture/coach-interaction-pattern.md`
- **Implementation**: `docs/stories/story-001a-implementation.md`
- **Source Code**: `lib/actions/coach.ts`
