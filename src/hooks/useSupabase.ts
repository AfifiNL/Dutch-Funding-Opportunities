import { createContext, useContext } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';

export type SupabaseContext = {
  supabase: SupabaseClient;
};

export const Context = createContext<SupabaseContext | undefined>(undefined);

export function useSupabase() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
}