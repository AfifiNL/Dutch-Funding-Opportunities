'use client';

import React, { createContext, useContext } from 'react';
import { supabase } from '@/utils/supabase';

// Create a context with the Supabase client
const SupabaseContext = createContext(supabase);

// Export a hook for using the Supabase client
export const useSupabase = () => useContext(SupabaseContext);

// Provider component for Supabase
export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
}; 