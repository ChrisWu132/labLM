-- Migration: Add section-level progress tracking for lab restructuring
-- Date: 2025-01-20
-- Description: Creates section_progress table to track micro-section completion

-- Create section_progress table
CREATE TABLE IF NOT EXISTS section_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  section_id text NOT NULL,  -- Format: "1.1", "1.2", "2.1", etc.
  status text NOT NULL CHECK (status IN ('locked', 'in_progress', 'completed')),
  learn_tab_visited boolean DEFAULT false,
  try_it_tab_visited boolean DEFAULT false,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  UNIQUE(user_id, section_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_section_progress_user_id
  ON section_progress(user_id);

CREATE INDEX IF NOT EXISTS idx_section_progress_section_id
  ON section_progress(section_id);

CREATE INDEX IF NOT EXISTS idx_section_progress_status
  ON section_progress(status);

CREATE INDEX IF NOT EXISTS idx_section_progress_user_section
  ON section_progress(user_id, section_id);

-- Enable Row Level Security
ALTER TABLE section_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can only read their own progress
CREATE POLICY "Users can view their own section progress"
  ON section_progress
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own progress
CREATE POLICY "Users can create their own section progress"
  ON section_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own progress
CREATE POLICY "Users can update their own section progress"
  ON section_progress
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_section_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER section_progress_updated_at
  BEFORE UPDATE ON section_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_section_progress_updated_at();

-- Comments for documentation
COMMENT ON TABLE section_progress IS 'Tracks user progress through individual lab sections (micro-sections)';
COMMENT ON COLUMN section_progress.section_id IS 'Section identifier in format "labNumber.sectionNumber" (e.g., "1.1", "2.3")';
COMMENT ON COLUMN section_progress.status IS 'Current status: locked (not accessible), in_progress (started), completed (finished)';
COMMENT ON COLUMN section_progress.learn_tab_visited IS 'Whether user has visited the Learn tab';
COMMENT ON COLUMN section_progress.try_it_tab_visited IS 'Whether user has visited the Try It tab';
