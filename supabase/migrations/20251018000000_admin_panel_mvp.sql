-- Admin Panel MVP Migration
-- Creates classes and class_enrollments tables for teacher dashboard

-- 1. Classes table
CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  join_code TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indexes for classes
CREATE INDEX IF NOT EXISTS idx_classes_teacher ON classes(teacher_id);
CREATE INDEX IF NOT EXISTS idx_classes_join_code ON classes(join_code);

-- 2. Class enrollments table
CREATE TABLE IF NOT EXISTS class_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  enrolled_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(class_id, student_id)
);

-- Indexes for enrollments
CREATE INDEX IF NOT EXISTS idx_enrollments_class ON class_enrollments(class_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON class_enrollments(student_id);

-- 3. RLS Policies for classes
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;

-- Teachers can view and manage their own classes
CREATE POLICY "Teachers view own classes"
  ON classes FOR SELECT
  USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers create classes"
  ON classes FOR INSERT
  WITH CHECK (auth.uid() = teacher_id);

CREATE POLICY "Teachers update own classes"
  ON classes FOR UPDATE
  USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers delete own classes"
  ON classes FOR DELETE
  USING (auth.uid() = teacher_id);

-- 4. RLS Policies for class_enrollments
ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;

-- Teachers can view enrollments for their classes
CREATE POLICY "Teachers view own enrollments"
  ON class_enrollments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM classes
      WHERE classes.id = class_enrollments.class_id
        AND classes.teacher_id = auth.uid()
    )
  );

-- Students can enroll themselves in classes
CREATE POLICY "Students can enroll themselves"
  ON class_enrollments FOR INSERT
  WITH CHECK (auth.uid() = student_id);

-- Students can view their own enrollments
CREATE POLICY "Students view own enrollments"
  ON class_enrollments FOR SELECT
  USING (auth.uid() = student_id);

-- Teachers can remove students from their classes
CREATE POLICY "Teachers remove students from own classes"
  ON class_enrollments FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM classes
      WHERE classes.id = class_enrollments.class_id
        AND classes.teacher_id = auth.uid()
    )
  );

-- 5. Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at on classes
CREATE TRIGGER update_classes_updated_at
  BEFORE UPDATE ON classes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE classes IS 'Classes created by teachers for organizing students';
COMMENT ON TABLE class_enrollments IS 'Student enrollments in teacher classes';
COMMENT ON COLUMN classes.join_code IS 'Unique code students use to join the class (e.g., ABC-XYZ-2025)';
