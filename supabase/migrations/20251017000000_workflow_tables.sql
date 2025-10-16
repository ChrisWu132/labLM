-- Lab 6: Workflow Builder Tables
-- Created: 2025-10-17
-- Purpose: Tables for AI workflow creation, execution, and tracking

BEGIN;

-- ============================================================================
-- 1. WORKFLOWS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Basic information
  name TEXT NOT NULL,
  description TEXT,
  lab_number INT DEFAULT 6,

  -- Workflow configuration (JSON)
  config JSONB NOT NULL,
  /* config structure:
  {
    "nodes": [
      {
        "id": "node-1",
        "type": "input|aiStep|output",
        "data": {
          "label": "步骤名称",
          "prompt": "prompt template",
          "placeholder": "...",
          ...
        },
        "position": { "x": 250, "y": 0 }
      }
    ],
    "edges": [
      {
        "id": "edge-1",
        "source": "node-1",
        "target": "node-2"
      }
    ]
  }
  */

  -- Classification
  is_template BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT false,
  template_category TEXT,

  -- Statistics
  execution_count INT DEFAULT 0,
  success_rate FLOAT DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 2. WORKFLOW EXECUTIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS workflow_executions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workflow_id UUID REFERENCES workflows(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,

  -- Execution data
  input_data TEXT NOT NULL,
  final_output TEXT,

  -- Execution log (JSON)
  execution_log JSONB,
  /* execution_log structure:
  {
    "steps": [
      {
        "stepId": "node-2",
        "timestamp": "2025-01-16T10:30:00Z",
        "input": "resolved prompt",
        "output": "LLM response",
        "durationMs": 1200,
        "status": "success|error"
      }
    ],
    "totalDurationMs": 3600
  }
  */

  -- Status
  status TEXT CHECK (status IN ('running', 'completed', 'failed')) NOT NULL,
  error_message TEXT,

  -- Cost tracking
  tokens_used INT,
  api_calls INT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- ============================================================================
-- 3. INDEXES
-- ============================================================================

-- Workflows indexes
CREATE INDEX IF NOT EXISTS idx_workflows_user ON workflows(user_id);
CREATE INDEX IF NOT EXISTS idx_workflows_template ON workflows(is_template, is_public);
CREATE INDEX IF NOT EXISTS idx_workflows_category ON workflows(template_category) WHERE is_template = true;

-- Executions indexes
CREATE INDEX IF NOT EXISTS idx_executions_workflow ON workflow_executions(workflow_id);
CREATE INDEX IF NOT EXISTS idx_executions_user ON workflow_executions(user_id);
CREATE INDEX IF NOT EXISTS idx_executions_status ON workflow_executions(status);
CREATE INDEX IF NOT EXISTS idx_executions_created ON workflow_executions(created_at DESC);

-- ============================================================================
-- 4. ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_executions ENABLE ROW LEVEL SECURITY;

-- Workflows policies
CREATE POLICY "Users can view own and public workflows"
  ON workflows FOR SELECT
  USING (user_id = auth.uid() OR (is_public = true AND is_template = true));

CREATE POLICY "Users can create own workflows"
  ON workflows FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own workflows"
  ON workflows FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own workflows"
  ON workflows FOR DELETE
  USING (user_id = auth.uid());

-- Executions policies
CREATE POLICY "Users can view own executions"
  ON workflow_executions FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own executions"
  ON workflow_executions FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- ============================================================================
-- 5. EXTEND EXISTING PROGRESS TABLE
-- ============================================================================

-- Add workflow-specific columns to prompt_lab_progress
ALTER TABLE prompt_lab_progress
  ADD COLUMN IF NOT EXISTS workflow_id UUID REFERENCES workflows(id),
  ADD COLUMN IF NOT EXISTS stage INT CHECK (stage IN (1, 2, 3));

-- Update lab_number check to include lab 6
ALTER TABLE prompt_lab_progress
  DROP CONSTRAINT IF EXISTS prompt_lab_progress_lab_number_check;

ALTER TABLE prompt_lab_progress
  ADD CONSTRAINT prompt_lab_progress_lab_number_check
  CHECK (lab_number BETWEEN 1 AND 6);

-- ============================================================================
-- 6. TRIGGERS
-- ============================================================================

-- Auto-update updated_at for workflows
CREATE TRIGGER update_workflows_updated_at
  BEFORE UPDATE ON workflows
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 7. HELPER FUNCTIONS
-- ============================================================================

-- Increment workflow execution count
CREATE OR REPLACE FUNCTION increment_workflow_execution(workflow_id_param UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE workflows
  SET execution_count = execution_count + 1
  WHERE id = workflow_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMIT;
