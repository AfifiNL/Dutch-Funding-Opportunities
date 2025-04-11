'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { SavedOpportunitiesDashboard } from '@/features/saved-opportunities';
import { useAuth } from '@/hooks/useAuth';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';

export default function SavedOpportunitiesPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth?redirectTo=/saved');
    }
  }, [user, isLoading, router]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }
  
  if (!user) {
    return null; // will redirect due to the effect
  }
  
  return (
    <AuthenticatedLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-3">Saved Funding Opportunities</h1>
          <p className="text-gray-400">
            Manage and organize the funding opportunities you've saved for later.
          </p>
        </div>
        
        <SavedOpportunitiesDashboard />
      </motion.div>
    </AuthenticatedLayout>
  );
} 