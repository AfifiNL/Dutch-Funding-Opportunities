'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect after auth is initialized and no user found
    if (!isLoading && !user) {
      // Encode the current path to redirect back after login
      const returnPath = encodeURIComponent(pathname || '/');
      router.push(`/auth?redirectTo=${returnPath}`);
    }
  }, [user, isLoading, router, pathname]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Only render children if authenticated
  return user ? <>{children}</> : null;
};

export default ProtectedRoute; 