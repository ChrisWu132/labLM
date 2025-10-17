-- Update module_progress schema to match application expectations

BEGIN;

-- Add status / started_at / checklist_items columns if missing
ALTER TABLE module_progress
  ADD COLUMN IF NOT EXISTS status TEXT,
  ADD COLUMN IF NOT EXISTS started_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS checklist_items JSONB DEFAULT '{}'::jsonb;

-- Backfill status based on legacy completed flag if present
UPDATE module_progress
SET status = CASE
  WHEN status IS NOT NULL THEN status
  WHEN COALESCE(completed, false) THEN 'completed'
  ELSE 'not_started'
END
WHERE status IS NULL;

-- Ensure status has constraints and defaults
ALTER TABLE module_progress
  ALTER COLUMN status SET DEFAULT 'not_started';

ALTER TABLE module_progress
  ALTER COLUMN status SET NOT NULL;

ALTER TABLE module_progress
  DROP CONSTRAINT IF EXISTS module_progress_status_check;

ALTER TABLE module_progress
  ADD CONSTRAINT module_progress_status_check
  CHECK (status IN ('not_started', 'in_progress', 'completed'));

-- Drop legacy completed boolean if it exists (not used by app code)
ALTER TABLE module_progress
  DROP COLUMN IF EXISTS completed;

COMMIT;
