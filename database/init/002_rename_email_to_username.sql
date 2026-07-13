-- Migrates databases created with the original email-based user identity.
-- Fresh databases already use username from 001_schema.sql, so this block is safe to rerun.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'email'
  ) THEN
    ALTER TABLE users RENAME COLUMN email TO username;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'users_email_key') THEN
    ALTER TABLE users RENAME CONSTRAINT users_email_key TO users_username_key;
  END IF;
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'users_email_not_null') THEN
    ALTER TABLE users RENAME CONSTRAINT users_email_not_null TO users_username_not_null;
  END IF;
END $$;
