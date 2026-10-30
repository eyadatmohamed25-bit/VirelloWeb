/*
# Create saved_content table for Virello

1. New Tables
- `saved_content`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users, defaults to the authenticated user)
  - `tool` (text, which generator produced it: ideas | scripts | captions | hashtags | planner)
  - `title` (text, a short label for the saved item)
  - `content` (jsonb, the full generated payload)
  - `platform` (text, nullable, e.g. tiktok | instagram | youtube)
  - `language` (text, nullable, content language: en | ar)
  - `created_at` (timestamptz)
2. Security
- Enable RLS on `saved_content`.
- Grant CRUD to `authenticated` only (app requires sign-in).
- Owner-scoped CRUD: each authenticated user can only access rows they own.
3. Notes
- `user_id` defaults to `auth.uid()` so inserts that omit it still satisfy the INSERT policy.
- An index on `user_id` speeds up per-user listing.
*/

CREATE TABLE IF NOT EXISTS saved_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  tool text NOT NULL,
  title text NOT NULL,
  content jsonb NOT NULL,
  platform text,
  language text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE saved_content ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS saved_content_user_id_idx ON saved_content(user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON saved_content TO authenticated;

DROP POLICY IF EXISTS "select_own_saved_content" ON saved_content;
CREATE POLICY "select_own_saved_content" ON saved_content FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_saved_content" ON saved_content;
CREATE POLICY "insert_own_saved_content" ON saved_content FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_saved_content" ON saved_content;
CREATE POLICY "update_own_saved_content" ON saved_content FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_saved_content" ON saved_content;
CREATE POLICY "delete_own_saved_content" ON saved_content FOR DELETE
  TO authenticated USING (auth.uid() = user_id);
