"use client";

import { createClient } from '@supabase/supabase-js';
import { Context } from '@/hooks/useSupabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  return (
    <Context.Provider value={{ supabase }}>
      {children}
    </Context.Provider>
  );
}