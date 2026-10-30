import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export type SavedContent = {
  id: string;
  user_id: string;
  tool: string;
  title: string;
  content: Record<string, unknown>;
  platform: string | null;
  language: string | null;
  created_at: string;
};

export type NewSavedContent = Omit<SavedContent, 'id' | 'user_id' | 'created_at'>;
