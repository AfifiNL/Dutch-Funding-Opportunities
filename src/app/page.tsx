"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HomeClient } from './HomeClient';
import { useSupabase } from '@/hooks/useSupabase';

export default function Home() {
  const router = useRouter();
  const { supabase } = useSupabase();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // User is logged in, redirect to dashboard or funding page
        router.push('/funding');
      }
    };

    checkSession();
  }, [router, supabase]);

  return <HomeClient />;
}