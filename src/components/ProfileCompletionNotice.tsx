'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export function ProfileCompletionNotice() {
  const [dismissed, setDismissed] = useState(false);
  const router = useRouter();
  
  // Placeholder for actual profile completion logic
  const completionPercentage = 70;
  const isComplete = completionPercentage >= 100;
  const missingFields = ['profile picture', 'company details'];
  
  if (isComplete || dismissed) {
    return null;
  }

  const handleDismiss = () => {
    setDismissed(true);
  };

  const handleCompleteProfile = () => {
    router.push('/profile/edit');
  };

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md shadow-md my-4">
      <div className="flex items-start justify-between">
        <div className="flex">
          <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">
              Your profile is {completionPercentage}% complete
            </h3>
            <div className="mt-1 text-sm text-yellow-700">
              <p>
                Complete your profile to get the most out of our platform. 
                {missingFields.length > 0 && (
                  <span> Missing: <span className="font-medium">{missingFields.join(', ')}</span>.</span>
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
    </div>
  );
} 