-- Idempotent production schema. Executed under a PostgreSQL advisory lock at API startup.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'email'
  ) THEN
    ALTER TABLE users RENAME COLUMN email TO username;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS learning_progress (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_key TEXT NOT NULL CHECK (module_key IN ('frontend', 'backend', 'ai')),
  lesson_id TEXT NOT NULL,
  topic_index INTEGER NOT NULL CHECK (topic_index >= 0),
  focus_index INTEGER NOT NULL CHECK (focus_index >= 0),
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, module_key, lesson_id, topic_index, focus_index)
);

CREATE TABLE IF NOT EXISTS learning_notes (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_key TEXT NOT NULL CHECK (module_key IN ('frontend', 'backend', 'ai')),
  lesson_id TEXT NOT NULL,
  topic_index INTEGER NOT NULL CHECK (topic_index >= 0),
  content TEXT NOT NULL CHECK (length(content) <= 10000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS learning_progress_user_status_idx ON learning_progress (user_id, status);
CREATE INDEX IF NOT EXISTS learning_notes_user_topic_idx ON learning_notes (user_id, module_key, lesson_id, topic_index);
