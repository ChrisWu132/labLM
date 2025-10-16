# Supabase Database Setup

This directory contains the database schema and migrations for the AI Startup Course platform.

## Quick Start (Supabase Dashboard)

If you don't have Supabase CLI installed, you can apply the schema directly via the Supabase Dashboard:

### Method 1: Supabase Dashboard SQL Editor (Easiest)

1. Go to [supabase.com](https://supabase.com) and sign in
2. Select your project: `bhugrkmtekghbarfnqcw`
3. Navigate to **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the contents of `migrations/20251013000000_initial_schema.sql`
6. Paste into the SQL editor
7. Click **Run** or press `Ctrl/Cmd + Enter`
8. Wait for the success message

### Method 2: Using Supabase CLI (Recommended for Development)

```bash
# Install Supabase CLI (if not installed)
npm install -g supabase

# Link to your project
supabase link --project-ref bhugrkmtekghbarfnqcw

# Apply migrations
supabase db push

# Or reset and apply all migrations
supabase db reset
```

## What Gets Created

### Tables (9 total)
1. **module_progress** - Tracks learner progress through modules 0-5
2. **research_inputs** - Stores Module 1 research workspace entries
3. **problem_briefs** - Validated problem briefs from Module 1
4. **sandpack_submissions** - Module 2 code snapshots and lab completions
5. **gtm_actions** - Module 3 go-to-market drafts (ToB/ToC)
6. **iterate_logs** - Module 4 weekly tracking and retrospectives
7. **demo_submissions** - Module 5 final demo submissions with certificates
8. **coach_transcripts** - All AI coach interactions for transparency
9. **ai_usage_log** - AI API usage tracking for rate limiting

### Security Features
- ✅ Row Level Security (RLS) enabled on all tables
- ✅ User isolation policies (users can only access their own data)
- ✅ Auth integration with `auth.uid()`

### Performance Features
- ✅ 15+ indexes for common query patterns
- ✅ Auto-updating `updated_at` timestamps via triggers
- ✅ Optimized for user_id lookups

### Storage
- ✅ `certificates` bucket for storing generated certificates
- ✅ Public access for easy sharing
- ✅ User-scoped upload/delete permissions
- ✅ 5MB file size limit
- ✅ Allowed types: PNG, JPEG, PDF

## Verify Installation

After running the migration, verify everything was created:

### Check Tables
```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

Should return 9 tables.

### Check RLS Policies
```sql
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

Should return 34+ policies.

### Check Indexes
```sql
SELECT tablename, indexname
FROM pg_indexes
WHERE schemaname = 'public' AND indexname LIKE 'idx_%'
ORDER BY tablename;
```

Should return 15+ indexes.

### Check Storage Bucket
```sql
SELECT * FROM storage.buckets WHERE id = 'certificates';
```

Should return 1 bucket.

## Testing RLS Policies

### Create Test Users
```sql
-- As admin, create two test users (use Supabase Auth UI)
-- Then test with their UUIDs
```

### Test User Isolation
```sql
-- Insert as User A
INSERT INTO module_progress (user_id, module_number, status)
VALUES ('user-a-uuid', 0, 'in_progress');

-- Try to query as User B (should return empty)
SELECT * FROM module_progress WHERE user_id = 'user-a-uuid';
-- This will fail with RLS - good!

-- Query your own data (should work)
SELECT * FROM module_progress WHERE user_id = auth.uid();
```

## Sample Data Insertion

### Insert Module Progress
```sql
INSERT INTO module_progress (user_id, module_number, status, started_at, checklist_items)
VALUES (
  auth.uid(),
  0,
  'in_progress',
  now(),
  '{"sandpack": true, "supabase": false, "community": false}'::jsonb
);
```

### Insert Research Input
```sql
INSERT INTO research_inputs (user_id, research_type, content, coach_feedback)
VALUES (
  auth.uid(),
  'deep_research',
  '{"industry": "SaaS", "notes": "Market analysis..."}'::jsonb,
  'Great research! Consider looking into...'
);
```

### Insert Problem Brief
```sql
INSERT INTO problem_briefs (
  user_id,
  segment,
  problem,
  current_solution,
  desired_outcome,
  validation_status
)
VALUES (
  auth.uid(),
  'Early-stage founders',
  'Hard to validate ideas quickly',
  'Manual user interviews',
  'Automated validation workflow',
  'approved'
);
```

## Rollback (Development Only)

⚠️ **WARNING**: This will delete ALL data!

```bash
# Via SQL Editor
# Copy and run: migrations/20251013000001_rollback_initial_schema.sql

# Via CLI
supabase db reset --db-url "your-connection-string"
```

## Migration Files

- `20251013000000_initial_schema.sql` - Creates all tables, RLS, indexes, storage
- `20251013000001_rollback_initial_schema.sql` - Removes everything (dev/test only)

## Troubleshooting

### Error: "relation already exists"
The table already exists. You can:
- Drop the table manually: `DROP TABLE table_name CASCADE;`
- Or run the rollback script first

### Error: "policy already exists"
The policy already exists. You can:
- Drop the policy: `DROP POLICY policy_name ON table_name;`
- Or run the rollback script first

### RLS Not Working
Check if RLS is enabled:
```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
```

All tables should have `rowsecurity = true`.

### Storage Bucket Issues
Check bucket configuration:
```sql
SELECT * FROM storage.buckets WHERE id = 'certificates';
```

Check storage policies:
```sql
SELECT * FROM pg_policies WHERE tablename = 'objects';
```

## Production Deployment

For production deployment to Vercel:

1. ✅ Apply this migration to your production Supabase project
2. ✅ Environment variables already configured in `.env`
3. ✅ Vercel environment variables configured
4. ✅ Test RLS policies with real user accounts
5. ✅ Monitor query performance in Supabase Dashboard
6. ✅ Set up database backups in Supabase settings

## Support

- **Supabase Docs**: https://supabase.com/docs
- **SQL Reference**: https://www.postgresql.org/docs/
- **RLS Guide**: https://supabase.com/docs/guides/auth/row-level-security

## Next Steps

After running this migration:
1. ✅ Test authentication flow (`/auth` page)
2. ✅ Test module progress tracking (`/dashboard/orientation`)
3. ✅ Verify user data isolation with multiple accounts
4. ✅ Test coach interactions and data persistence
5. ✅ Move to Story 001 implementation (already done!)
