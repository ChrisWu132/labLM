-- LLM Learning Lab Initial Schema
-- Created: 2025-10-16
-- Purpose: Complete fresh database schema for LLM Learning Lab (Prompt Engineering platform)

-- ============================================================================
-- 1. PROMPT LAB PROGRESS TABLE
-- ============================================================================

CREATE TABLE prompt_lab_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lab_number SMALLINT NOT NULL CHECK (lab_number BETWEEN 1 AND 5),
  exercise_id TEXT NOT NULL,

  -- Submission data
  prompt_submitted TEXT NOT NULL,
  llm_response TEXT NOT NULL,

  -- Success tracking
  success BOOLEAN DEFAULT false,
  attempts INT DEFAULT 1,

  -- Timestamps
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(user_id, lab_number, exercise_id)
);

-- Indexes for performance
CREATE INDEX idx_prompt_lab_user ON prompt_lab_progress(user_id, lab_number);
CREATE INDEX idx_prompt_lab_success ON prompt_lab_progress(user_id, success, created_at DESC);

-- ============================================================================
-- 2. MODULE PROGRESS TABLE (for Labs overview)
-- ============================================================================

CREATE TABLE module_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_number SMALLINT NOT NULL CHECK (module_number BETWEEN 0 AND 5),

  -- Progress tracking
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(user_id, module_number)
);

-- Indexes
CREATE INDEX idx_module_progress_user ON module_progress(user_id, module_number);

-- ============================================================================
-- 3. AI USAGE LOG (for rate limiting and analytics)
-- ============================================================================

CREATE TABLE ai_usage_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,

  -- Optional metadata
  metadata JSONB,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_ai_usage_user_action ON ai_usage_log(user_id, action, created_at DESC);
CREATE INDEX idx_ai_usage_created ON ai_usage_log(created_at DESC);

-- ============================================================================
-- 4. ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE prompt_lab_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage_log ENABLE ROW LEVEL SECURITY;

-- prompt_lab_progress policies
CREATE POLICY "Users can view own prompt lab progress"
  ON prompt_lab_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own prompt lab progress"
  ON prompt_lab_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own prompt lab progress"
  ON prompt_lab_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- module_progress policies
CREATE POLICY "Users can view own module progress"
  ON module_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own module progress"
  ON module_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own module progress"
  ON module_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- ai_usage_log policies (read-only for users)
CREATE POLICY "Users can view own ai usage log"
  ON ai_usage_log FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert ai usage log"
  ON ai_usage_log FOR INSERT
  WITH CHECK (true); -- Service role only

-- ============================================================================
-- 5. TRIGGERS
-- ============================================================================

-- Auto-update updated_at timestamp for module_progress
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_module_progress_updated_at
  BEFORE UPDATE ON module_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 6. SAMPLE DATA (Optional - for development)
-- ============================================================================

-- Note: Add sample data in a separate seed file if needed
