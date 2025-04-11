-- Add profile_completion_workflow_done column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'user_progress'
    AND column_name = 'profile_completion_workflow_done'
  ) THEN
    ALTER TABLE user_progress
    ADD COLUMN profile_completion_workflow_done BOOLEAN DEFAULT FALSE;
  END IF;
END $$;

-- Add profile_completion_date column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'user_progress'
    AND column_name = 'profile_completion_date'
  ) THEN
    ALTER TABLE user_progress
    ADD COLUMN profile_completion_date TIMESTAMP WITH TIME ZONE;
  END IF;
END $$; 