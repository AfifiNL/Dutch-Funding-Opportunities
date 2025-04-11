'use client';

import { useAuth as useAuthContext } from '@/contexts/AuthContext';

// Re-export the auth hook from our context
export const useAuth = useAuthContext;