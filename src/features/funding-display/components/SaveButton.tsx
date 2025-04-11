'use client';

import React, { useState, useEffect } from 'react';
import { useSavedOpportunities } from '@/hooks';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface SaveButtonProps {
  fundingId: string;
  className?: string;
  iconOnly?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ 
  fundingId, 
  className = '',
  iconOnly = false
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const { isSaved, saveOpportunity, unsaveOpportunity } = useSavedOpportunities();
  const [isSavedState, setIsSavedState] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Check if the opportunity is saved
  useEffect(() => {
    const checkSavedStatus = async () => {
      if (user?.id) {
        setIsLoading(true);
        try {
          const savedStatus = await isSaved(fundingId);
          setIsSavedState(savedStatus);
        } catch (error) {
          console.error('Error checking saved status:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    checkSavedStatus();
  }, [user?.id, fundingId, isSaved]);

  // Toggle saved status
  const toggleSaved = async () => {
    if (!user) {
      // Redirect to login if not logged in
      router.push(`/auth?redirectTo=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    if (isProcessing) return;

    setIsProcessing(true);
    try {
      if (isSavedState) {
        await unsaveOpportunity(fundingId);
        setIsSavedState(false);
      } else {
        await saveOpportunity(fundingId);
        setIsSavedState(true);
      }
    } catch (error) {
      console.error('Error toggling saved status:', error);
      // You might want to show a toast notification here
    } finally {
      setIsProcessing(false);
    }
  };

  // Determine button appearance based on saved state
  const buttonClasses = `
    ${className}
    ${iconOnly ? 'p-2 rounded-full' : 'px-4 py-2 rounded-md'}
    transition-colors duration-150
    ${isSavedState 
      ? 'bg-teal-600 hover:bg-teal-700 text-white' 
      : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}
    ${isProcessing ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
    flex items-center justify-center
  `;

  return (
    <button
      onClick={toggleSaved}
      disabled={isLoading || isProcessing}
      className={buttonClasses}
      aria-label={isSavedState ? 'Unsave opportunity' : 'Save opportunity'}
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <>
          <svg 
            className={`h-5 w-5 ${iconOnly ? '' : 'mr-2'}`} 
            fill={isSavedState ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
          {!iconOnly && (
            <span>{isSavedState ? 'Saved' : 'Save'}</span>
          )}
        </>
      )}
    </button>
  );
};

export default SaveButton; 