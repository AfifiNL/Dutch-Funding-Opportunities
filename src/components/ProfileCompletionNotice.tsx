'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProfileCompletion } from '@/hooks/useProfileCompletion';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfileCompletionNoticeProps {
  className?: string;
}

const ProfileCompletionNotice: React.FC<ProfileCompletionNoticeProps> = ({ className = '' }) => {
  const { completionPercentage, isComplete, missingFields, userType } = useProfileCompletion();
  const [dismissed, setDismissed] = useState(false);
  const router = useRouter();

  // Load dismissed state from localStorage on mount
  useEffect(() => {
    const savedDismissed = localStorage.getItem('profile-notice-dismissed');
    if (savedDismissed) {
      const { timestamp } = JSON.parse(savedDismissed);
      // Check if 24 hours have passed since dismissal
      const now = new Date().getTime();
      const hoursPassed = (now - timestamp) / (1000 * 60 * 60);
      
      if (hoursPassed < 24) {
        setDismissed(true);
      } else {
        // Reset if more than 24 hours
        localStorage.removeItem('profile-notice-dismissed');
      }
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('profile-notice-dismissed', JSON.stringify({
      timestamp: new Date().getTime()
    }));
  };

  const handleCompleteProfile = () => {
    router.push('/profile/edit');
  };

  // Show nothing if profile is complete or notice is dismissed
  if (isComplete || dismissed || !userType) {
    return null;
  }

  // Get user-friendly field names
  const formatFieldName = (field: string): string => {
    switch (field) {
      case 'full_name': return 'full name';
      case 'avatar_url': return 'profile picture';
      case 'linkedin_url': return 'LinkedIn URL';
      case 'company_name': return 'company name';
      case 'investment_thesis': return 'investment thesis';
      case 'investment_stages': return 'investment stages';
      case 'preferred_industries': return 'preferred industries';
      case 'startup': return 'startup information';
      default: return field.replace(/_/g, ' ');
    }
  };

  // Get missing fields formatted nicely
  const getMissingFieldsText = (): string => {
    if (missingFields.length === 0) return '';
    
    const formattedFields = missingFields.map(formatFieldName);
    
    if (formattedFields.length === 1) {
      return formattedFields[0];
    } else if (formattedFields.length === 2) {
      return `${formattedFields[0]} and ${formattedFields[1]}`;
    } else {
      const lastField = formattedFields.pop();
      return `${formattedFields.join(', ')}, and ${lastField}`;
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 p-4 rounded-md shadow-md mb-6 ${className}`}
      >
        <div className="flex items-start justify-between">
          <div className="flex">
            <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">
                Your profile is {completionPercentage}% complete
              </h3>
              <div className="mt-1 text-sm text-yellow-700">
                <p>
                  Complete your {userType} profile to get the most out of our platform. 
                  {missingFields.length > 0 && (
                    <span> Missing: <span className="font-medium">{getMissingFieldsText()}</span>.</span>
                  )}
                </p>
                <div className="mt-3">
                  <button
                    onClick={handleCompleteProfile}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-md px-3 py-1 text-sm font-medium"
                  >
                    Complete Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="ml-4 flex-shrink-0 text-yellow-600 hover:text-yellow-800"
            aria-label="Dismiss notification"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="mt-3 w-full bg-yellow-200 rounded-full h-1.5">
          <div 
            className="bg-yellow-500 h-1.5 rounded-full" 
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileCompletionNotice; 