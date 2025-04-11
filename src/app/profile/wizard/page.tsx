'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ProfileWizard from '@/components/ProfileWizard';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';

export default function ProfileWizardPage() {
  const router = useRouter();
  
  const handleComplete = () => {
    router.push('/profile');
  };
  
  return (
    <AuthenticatedLayout showProfileNotice={false}>
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <ProfileWizard onComplete={handleComplete} />
      </div>
    </AuthenticatedLayout>
  );
} 