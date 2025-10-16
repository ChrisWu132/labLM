-- ============================================================================
-- AI Startup Course - Initial Database Schema
-- Migration: 20251013000000_initial_schema.sql
-- Description: Creates all tables, RLS policies, indexes, and storage for the course platform
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TRIGGER FUNCTION: Auto-update updated_at timestamp
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TABLE 1: module_progress
-- Tracks completion status, checklist, and timestamps for all modules (0-5)
-- ============================================================================

CREATE TABLE IF NOT EXISTS module_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_number SMALLINT NOT NULL CHECK (module_number BETWEEN 0 AND 5),
  status TEXT NOT NULL CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'not_started',
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  checklist_items JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, module_number)
);

COMMENT ON TABLE module_progress IS 'Tracks learner progress through modules 0-5 with status and checklist items';
COMMENT ON COLUMN module_progress.module_number IS '0=Orientation, 1=Problem Discovery, 2=Vibecoding, 3=Go-To-Market, 4=Iterate, 5=Demo & Certificate';
COMMENT ON COLUMN module_progress.checklist_items IS 'JSON object storing checklist completion state, e.g., {"sandpack": true, "supabase": false}';

-- ============================================================================
-- TABLE 2: research_inputs
-- Store structured research workspace entries with coach feedback
-- ============================================================================

CREATE TABLE IF NOT EXISTS research_inputs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  research_type TEXT NOT NULL CHECK (research_type IN ('deep_research', 'bullseye', 'interview_kit')),
  content JSONB NOT NULL,
  coach_feedback TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE research_inputs IS 'Stores Module 1 research workspace entries with AI coach feedback';
COMMENT ON COLUMN research_inputs.research_type IS 'Type of research: deep_research, bullseye (channel planning), or interview_kit';

-- ============================================================================
-- TABLE 3: problem_briefs
-- Persist the validated problem brief and review status
-- ============================================================================

CREATE TABLE IF NOT EXISTS problem_briefs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  segment TEXT,
  problem TEXT,
  current_solution TEXT,
  desired_outcome TEXT,
  validation_status TEXT CHECK (validation_status IN ('pending', 'approved', 'needs_revision')) DEFAULT 'pending',
  coach_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE problem_briefs IS 'Stores validated problem briefs from Module 1 with coach validation status';

-- ============================================================================
-- TABLE 4: sandpack_submissions
-- Capture Module 2 lab snapshots, notes, and completion state
-- ============================================================================

CREATE TABLE IF NOT EXISTS sandpack_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lab_number SMALLINT NOT NULL,
  code_snapshot JSONB NOT NULL,
  experiment_notes TEXT,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE sandpack_submissions IS 'Stores Module 2 (Vibecoding) code snapshots and lab completion status';
COMMENT ON COLUMN sandpack_submissions.code_snapshot IS 'JSON snapshot of Sandpack code files';

-- ============================================================================
-- TABLE 5: gtm_actions
-- Store Module 3 go-to-market drafts and coach review state
-- ============================================================================

CREATE TABLE IF NOT EXISTS gtm_actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  track TEXT CHECK (track IN ('tob', 'toc')),
  action_type TEXT,
  content JSONB NOT NULL,
  coach_review_status TEXT CHECK (coach_review_status IN ('pending', 'approved', 'needs_work')) DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE gtm_actions IS 'Stores Module 3 (Go-To-Market) actions for ToB or ToC tracks';
COMMENT ON COLUMN gtm_actions.track IS 'tob = To Business, toc = To Consumer';

-- ============================================================================
-- TABLE 6: iterate_logs
-- Track weekly retros with structured metrics and coach synthesis
-- ============================================================================

CREATE TABLE IF NOT EXISTS iterate_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  week_number SMALLINT NOT NULL CHECK (week_number >= 1),
  north_star_prompt TEXT,
  tracking_items JSONB NOT NULL,
  retro_notes JSONB,
  coach_synthesis TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE iterate_logs IS 'Stores Module 4 (Iterate) weekly tracking logs with metrics and retrospectives';
COMMENT ON COLUMN iterate_logs.tracking_items IS 'Array of metrics with target/actual values';
COMMENT ON COLUMN iterate_logs.retro_notes IS 'JSON with keep/improve/test categories';

-- ============================================================================
-- TABLE 7: demo_submissions
-- Store the final Module 5 submission plus certificate metadata
-- ============================================================================

CREATE TABLE IF NOT EXISTS demo_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  learner_name TEXT NOT NULL,
  project_title TEXT NOT NULL,
  value_proposition TEXT,
  sandpack_link TEXT,
  loom_link TEXT,
  certificate_url TEXT,
  certificate_thumb_url TEXT,
  coach_status TEXT CHECK (coach_status IN ('pending', 'approved', 'needs_revision')) DEFAULT 'pending',
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE demo_submissions IS 'Stores Module 5 (Demo & Certificate) final submissions';
COMMENT ON COLUMN demo_submissions.coach_status IS 'AI coach review status before certificate generation';

-- ============================================================================
-- TABLE 8: coach_transcripts
-- Store AI coach interactions with consistent naming and enums
-- ============================================================================

CREATE TABLE IF NOT EXISTS coach_transcripts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_number SMALLINT CHECK (module_number BETWEEN 0 AND 5),
  context_tag TEXT CHECK (context_tag IN ('Orientation', 'Problem', 'Sandbox', 'GTM', 'Iterate', 'Demo')),
  user_message TEXT NOT NULL,
  coach_response TEXT NOT NULL,
  latency_ms INTEGER,
  tone TEXT CHECK (tone IN ('coach', 'warning', 'celebration')),
  status TEXT CHECK (status IN ('success', 'failure', 'timeout')) DEFAULT 'success',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE coach_transcripts IS 'Stores all AI coach interactions for transparency and debugging';
COMMENT ON COLUMN coach_transcripts.tone IS 'Emotional tone of coach response for UI styling';

-- ============================================================================
-- TABLE 9: ai_usage_log (Optional for MVP)
-- Track AI API call counts for rate limiting
-- ============================================================================

CREATE TABLE IF NOT EXISTS ai_usage_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_number SMALLINT,
  call_count INTEGER DEFAULT 0,
  window_start TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE ai_usage_log IS 'Tracks AI API usage per user for rate limiting';

-- ============================================================================
-- INDEXES: Performance optimization for common queries
-- ============================================================================

-- Module progress indexes
CREATE INDEX IF NOT EXISTS idx_module_progress_user_module ON module_progress(user_id, module_number);
CREATE INDEX IF NOT EXISTS idx_module_progress_status ON module_progress(user_id, status);

-- Research inputs indexes
CREATE INDEX IF NOT EXISTS idx_research_inputs_user_type ON research_inputs(user_id, research_type);
CREATE INDEX IF NOT EXISTS idx_research_inputs_created ON research_inputs(user_id, created_at DESC);

-- Problem briefs indexes
CREATE INDEX IF NOT EXISTS idx_problem_briefs_user ON problem_briefs(user_id);
CREATE INDEX IF NOT EXISTS idx_problem_briefs_status ON problem_briefs(user_id, validation_status);

-- Sandpack submissions indexes
CREATE INDEX IF NOT EXISTS idx_sandpack_submissions_user_lab ON sandpack_submissions(user_id, lab_number);
CREATE INDEX IF NOT EXISTS idx_sandpack_submissions_completed ON sandpack_submissions(user_id, completed);

-- GTM actions indexes
CREATE INDEX IF NOT EXISTS idx_gtm_actions_user_track ON gtm_actions(user_id, track);
CREATE INDEX IF NOT EXISTS idx_gtm_actions_status ON gtm_actions(user_id, coach_review_status);

-- Iterate logs indexes
CREATE INDEX IF NOT EXISTS idx_iterate_logs_user_week ON iterate_logs(user_id, week_number);

-- Demo submissions indexes
CREATE INDEX IF NOT EXISTS idx_demo_submissions_user ON demo_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_demo_submissions_status ON demo_submissions(user_id, coach_status);

-- Coach transcripts indexes
CREATE INDEX IF NOT EXISTS idx_coach_transcripts_user_module ON coach_transcripts(user_id, module_number, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_coach_transcripts_context ON coach_transcripts(user_id, context_tag);

-- AI usage log indexes
CREATE INDEX IF NOT EXISTS idx_ai_usage_log_user_window ON ai_usage_log(user_id, window_start DESC);

-- ============================================================================
-- TRIGGERS: Auto-update updated_at timestamp
-- ============================================================================

CREATE TRIGGER update_module_progress_updated_at
  BEFORE UPDATE ON module_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_research_inputs_updated_at
  BEFORE UPDATE ON research_inputs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_problem_briefs_updated_at
  BEFORE UPDATE ON problem_briefs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sandpack_submissions_updated_at
  BEFORE UPDATE ON sandpack_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gtm_actions_updated_at
  BEFORE UPDATE ON gtm_actions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_iterate_logs_updated_at
  BEFORE UPDATE ON iterate_logs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_demo_submissions_updated_at
  BEFORE UPDATE ON demo_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS): Enable and create policies
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_inputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE problem_briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sandpack_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gtm_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE iterate_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE coach_transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage_log ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS POLICIES: module_progress
-- ============================================================================

CREATE POLICY "Users can view their own progress"
  ON module_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON module_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON module_progress FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own progress"
  ON module_progress FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- RLS POLICIES: research_inputs
-- ============================================================================

CREATE POLICY "Users can view their own research"
  ON research_inputs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own research"
  ON research_inputs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own research"
  ON research_inputs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own research"
  ON research_inputs FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- RLS POLICIES: problem_briefs
-- ============================================================================

CREATE POLICY "Users can view their own problem briefs"
  ON problem_briefs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own problem briefs"
  ON problem_briefs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own problem briefs"
  ON problem_briefs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own problem briefs"
  ON problem_briefs FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- RLS POLICIES: sandpack_submissions
-- ============================================================================

CREATE POLICY "Users can view their own submissions"
  ON sandpack_submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own submissions"
  ON sandpack_submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own submissions"
  ON sandpack_submissions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own submissions"
  ON sandpack_submissions FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- RLS POLICIES: gtm_actions
-- ============================================================================

CREATE POLICY "Users can view their own gtm actions"
  ON gtm_actions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own gtm actions"
  ON gtm_actions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own gtm actions"
  ON gtm_actions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own gtm actions"
  ON gtm_actions FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- RLS POLICIES: iterate_logs
-- ============================================================================

CREATE POLICY "Users can view their own iterate logs"
  ON iterate_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own iterate logs"
  ON iterate_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own iterate logs"
  ON iterate_logs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own iterate logs"
  ON iterate_logs FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- RLS POLICIES: demo_submissions
-- ============================================================================

CREATE POLICY "Users can view their own demo submissions"
  ON demo_submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own demo submissions"
  ON demo_submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own demo submissions"
  ON demo_submissions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own demo submissions"
  ON demo_submissions FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- RLS POLICIES: coach_transcripts
-- ============================================================================

CREATE POLICY "Users can view their own coach transcripts"
  ON coach_transcripts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own coach transcripts"
  ON coach_transcripts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own coach transcripts"
  ON coach_transcripts FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- RLS POLICIES: ai_usage_log
-- ============================================================================

CREATE POLICY "Users can view their own ai usage"
  ON ai_usage_log FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ai usage"
  ON ai_usage_log FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ai usage"
  ON ai_usage_log FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================================================
-- STORAGE: Certificates bucket
-- ============================================================================

-- Create certificates bucket (public for easy sharing)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'certificates',
  'certificates',
  true,
  5242880, -- 5MB limit
  ARRAY['image/png', 'image/jpeg', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- RLS policy: Users can upload their own certificates
CREATE POLICY "Users can upload their own certificates"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'certificates' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- RLS policy: Users can update their own certificates
CREATE POLICY "Users can update their own certificates"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'certificates' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- RLS policy: Users can delete their own certificates
CREATE POLICY "Users can delete their own certificates"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'certificates' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- RLS policy: Anyone can view certificates (public sharing)
CREATE POLICY "Anyone can view certificates"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'certificates');

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

-- Verify table creation
DO $$
BEGIN
  RAISE NOTICE 'Migration 20251013000000_initial_schema.sql completed successfully!';
  RAISE NOTICE 'Created tables: module_progress, research_inputs, problem_briefs, sandpack_submissions, gtm_actions, iterate_logs, demo_submissions, coach_transcripts, ai_usage_log';
  RAISE NOTICE 'Enabled RLS on all tables with user isolation policies';
  RAISE NOTICE 'Created indexes for performance optimization';
  RAISE NOTICE 'Set up certificates storage bucket';
END $$;
