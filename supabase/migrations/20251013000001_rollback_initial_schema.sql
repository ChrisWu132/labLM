-- ============================================================================
-- AI Startup Course - Rollback Initial Schema
-- Migration: 20251013000001_rollback_initial_schema.sql
-- Description: Safely removes all tables, policies, and storage created by initial schema
-- WARNING: This will delete all data! Only use for development/testing!
-- ============================================================================

-- ============================================================================
-- STORAGE: Remove certificates bucket policies and bucket
-- ============================================================================

DROP POLICY IF EXISTS "Anyone can view certificates" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own certificates" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own certificates" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own certificates" ON storage.objects;

DELETE FROM storage.buckets WHERE id = 'certificates';

-- ============================================================================
-- TABLES: Drop in reverse order to handle dependencies
-- ============================================================================

DROP TABLE IF EXISTS ai_usage_log CASCADE;
DROP TABLE IF EXISTS coach_transcripts CASCADE;
DROP TABLE IF EXISTS demo_submissions CASCADE;
DROP TABLE IF EXISTS iterate_logs CASCADE;
DROP TABLE IF EXISTS gtm_actions CASCADE;
DROP TABLE IF EXISTS sandpack_submissions CASCADE;
DROP TABLE IF EXISTS problem_briefs CASCADE;
DROP TABLE IF EXISTS research_inputs CASCADE;
DROP TABLE IF EXISTS module_progress CASCADE;

-- ============================================================================
-- TRIGGER FUNCTION: Remove update_updated_at_column function
-- ============================================================================

DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- ============================================================================
-- ROLLBACK COMPLETE
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE 'Rollback completed successfully!';
  RAISE NOTICE 'All tables, policies, indexes, and storage buckets have been removed';
  RAISE WARNING 'All data has been deleted - this action cannot be undone!';
END $$;
