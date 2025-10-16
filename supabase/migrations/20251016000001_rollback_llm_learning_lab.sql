-- Rollback Migration for LLM Learning Lab
-- Created: 2025-10-16
-- Purpose: Safely rollback all changes from initial migration

-- ============================================================================
-- DROP POLICIES (in reverse order)
-- ============================================================================

-- ai_usage_log policies
DROP POLICY IF EXISTS "Service role can insert ai usage log" ON ai_usage_log;
DROP POLICY IF EXISTS "Users can view own ai usage log" ON ai_usage_log;

-- module_progress policies
DROP POLICY IF EXISTS "Users can update own module progress" ON module_progress;
DROP POLICY IF EXISTS "Users can insert own module progress" ON module_progress;
DROP POLICY IF EXISTS "Users can view own module progress" ON module_progress;

-- prompt_lab_progress policies
DROP POLICY IF EXISTS "Users can update own prompt lab progress" ON prompt_lab_progress;
DROP POLICY IF EXISTS "Users can insert own prompt lab progress" ON prompt_lab_progress;
DROP POLICY IF EXISTS "Users can view own prompt lab progress" ON prompt_lab_progress;

-- ============================================================================
-- DROP TRIGGERS
-- ============================================================================

DROP TRIGGER IF EXISTS update_module_progress_updated_at ON module_progress;
DROP FUNCTION IF EXISTS update_updated_at_column();

-- ============================================================================
-- DROP INDEXES
-- ============================================================================

-- ai_usage_log indexes
DROP INDEX IF EXISTS idx_ai_usage_created;
DROP INDEX IF EXISTS idx_ai_usage_user_action;

-- module_progress indexes
DROP INDEX IF EXISTS idx_module_progress_user;

-- prompt_lab_progress indexes
DROP INDEX IF EXISTS idx_prompt_lab_success;
DROP INDEX IF EXISTS idx_prompt_lab_user;

-- ============================================================================
-- DROP TABLES (in reverse dependency order)
-- ============================================================================

DROP TABLE IF EXISTS ai_usage_log CASCADE;
DROP TABLE IF EXISTS module_progress CASCADE;
DROP TABLE IF EXISTS prompt_lab_progress CASCADE;

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Uncomment to verify clean rollback:
-- SELECT table_name FROM information_schema.tables
-- WHERE table_schema = 'public'
-- AND table_name IN ('prompt_lab_progress', 'module_progress', 'ai_usage_log');
