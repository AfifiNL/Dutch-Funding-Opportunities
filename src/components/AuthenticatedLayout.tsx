'use client';

import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import ProfileCompletionNotice from './ProfileCompletionNotice';

interface AuthenticatedLayoutProps {
  children: ReactNode;
  showProfileNotice?: boolean;
  redirectTo?: string;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ 
  children, 
  showProfileNotice = true,
  redirectTo = '/auth'
}) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading && !user) {
      const redirectUrl = redirectTo + (window.location.pathname ? `?redirectTo=${window.location.pathname}` : '');
      router.push(redirectUrl);
    }
  }, [user, isLoading, router, redirectTo]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }
  
  if (!user) {
    return null; // Will redirect due to the effect
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      {showProfileNotice && <ProfileCompletionNotice className="mb-6" />}
      {children}
    </div>
  );
};

export default AuthenticatedLayout; 