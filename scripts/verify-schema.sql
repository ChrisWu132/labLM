-- Schema Verification Script
-- Run this in Supabase SQL Editor or via psql
-- Purpose: Verify all tables, indexes, and constraints are correct

-- ============================================================================
-- 1. CHECK TABLES EXIST
-- ============================================================================

SELECT
  table_name,
  table_type
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('prompt_lab_progress', 'module_progress', 'ai_usage_log')
ORDER BY table_name;

-- Expected: 3 tables

-- ============================================================================
-- 2. CHECK COLUMNS FOR prompt_lab_progress
-- ============================================================================

SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'prompt_lab_progress'
ORDER BY ordinal_position;

-- Expected columns:
-- id (uuid, NO)
-- user_id (uuid, NO)
-- lab_number (smallint, NO)
-- exercise_id (text, NO)
-- prompt_submitted (text, NO)
-- llm_response (text, NO)
-- success (boolean, YES)
-- attempts (integer, YES)
-- completed_at (timestamp with time zone, YES)
-- created_at (timestamp with time zone, NO)

-- ============================================================================
-- 3. CHECK INDEXES
-- ============================================================================

SELECT
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('prompt_lab_progress', 'module_progress', 'ai_usage_log')
ORDER BY tablename, indexname;

-- Expected indexes:
-- idx_prompt_lab_user
-- idx_prompt_lab_success
-- idx_module_progress_user
-- idx_ai_usage_user_action
-- idx_ai_usage_created

-- ============================================================================
-- 4. CHECK CONSTRAINTS
-- ============================================================================

SELECT
  tc.table_name,
  tc.constraint_name,
  tc.constraint_type,
  cc.check_clause
FROM information_schema.table_constraints tc
LEFT JOIN information_schema.check_constraints cc
  ON tc.constraint_name = cc.constraint_name
WHERE tc.table_schema = 'public'
  AND tc.table_name IN ('prompt_lab_progress', 'module_progress', 'ai_usage_log')
ORDER BY tc.table_name, tc.constraint_type, tc.constraint_name;

-- Expected constraints:
-- prompt_lab_progress: lab_number CHECK (1-5)
-- module_progress: module_number CHECK (0-5)
-- Unique constraints on (user_id, lab_number, exercise_id) and (user_id, module_number)

-- ============================================================================
-- 5. CHECK RLS POLICIES
-- ============================================================================

SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('prompt_lab_progress', 'module_progress', 'ai_usage_log')
ORDER BY tablename, policyname;

-- Expected: 8 policies total
-- prompt_lab_progress: 3 policies (SELECT, INSERT, UPDATE)
-- module_progress: 3 policies (SELECT, INSERT, UPDATE)
-- ai_usage_log: 2 policies (SELECT, INSERT)

-- ============================================================================
-- 6. CHECK RLS IS ENABLED
-- ============================================================================

SELECT
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('prompt_lab_progress', 'module_progress', 'ai_usage_log');

-- Expected: rowsecurity = true for all tables

-- ============================================================================
-- 7. CHECK FOREIGN KEYS
-- ============================================================================

SELECT
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
  AND tc.table_name IN ('prompt_lab_progress', 'module_progress', 'ai_usage_log');

-- Expected: All tables have user_id FK to auth.users(id)

-- ============================================================================
-- 8. CHECK TRIGGERS
-- ============================================================================

SELECT
  event_object_table AS table_name,
  trigger_name,
  event_manipulation,
  action_statement
FROM information_schema.triggers
WHERE event_object_schema = 'public'
  AND event_object_table IN ('prompt_lab_progress', 'module_progress', 'ai_usage_log')
ORDER BY event_object_table, trigger_name;

-- Expected: update_module_progress_updated_at trigger on module_progress

-- ============================================================================
-- 9. SAMPLE DATA TEST (Optional - run manually if needed)
-- ============================================================================

-- Uncomment to test data structure:
/*
INSERT INTO prompt_lab_progress (
  user_id,
  lab_number,
  exercise_id,
  prompt_submitted,
  llm_response,
  success,
  attempts
) VALUES (
  auth.uid(), -- This will fail without auth, which is correct
  1,
  'lab1-ex1',
  'Test prompt',
  'Test response',
  false,
  1
);
*/

-- ============================================================================
-- VERIFICATION SUMMARY
-- ============================================================================

SELECT
  'VERIFICATION COMPLETE' AS status,
  (SELECT COUNT(*) FROM information_schema.tables
   WHERE table_schema = 'public'
   AND table_name IN ('prompt_lab_progress', 'module_progress', 'ai_usage_log')) AS tables_count,
  (SELECT COUNT(*) FROM pg_indexes
   WHERE schemaname = 'public'
   AND tablename IN ('prompt_lab_progress', 'module_progress', 'ai_usage_log')) AS indexes_count,
  (SELECT COUNT(*) FROM pg_policies
   WHERE schemaname = 'public'
   AND tablename IN ('prompt_lab_progress', 'module_progress', 'ai_usage_log')) AS policies_count;

-- Expected: tables_count=3, indexes_count>=8, policies_count=8
