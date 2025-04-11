import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/utils/supabase';
import { useNotifications } from './useNotifications';
import { Database } from '@/types/supabase';

type ProfileType = Database['public']['Tables']['profiles']['Row'];
type InvestorProfileType = Database['public']['Tables']['investor_profiles']['Row'];

interface ProfileCompletionResult {
  completionPercentage: number;
  isComplete: boolean;
  missingFields: string[];
  requiredFields: {
    common: string[];
    founder: string[];
    investor: string[];
  };
  calculateCompletion: () => Promise<number>;
  userType: string | null;
  hasCompletedWorkflow: boolean;
  startWorkflow: () => void;
}

export function useProfileCompletion(): ProfileCompletionResult {
  const { user } = useAuth();
  const { notifications } = useNotifications();
  const [completionPercentage, setCompletionPercentage] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [userType, setUserType] = useState<string | null>(null);
  const [hasCompletedWorkflow, setHasCompletedWorkflow] = useState<boolean>(false);

  // Required fields for both user types
  const requiredFields = {
    common: ['full_name', 'avatar_url', 'bio', 'linkedin_url'],
    founder: ['company_name'],
    investor: ['investment_thesis', 'investment_stages', 'preferred_industries']
  };

  // Check if user has completed the guided workflow
  useEffect(() => {
    const checkWorkflowCompletion = async () => {
      if (!user?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('user_progress')
          .select('profile_completion_workflow_done')
          .eq('user_id', user.id)
          .single();
          
        if (!error && data) {
          setHasCompletedWorkflow(data.profile_completion_workflow_done || false);
        }
      } catch (error) {
        console.error('Error checking workflow completion:', error);
      }
    };
    
    checkWorkflowCompletion();
  }, [user?.id]);

  const calculateCompletion = useCallback(async () => {
    if (!user?.id) {
      setCompletionPercentage(0);
      setIsComplete(false);
      setMissingFields([]);
      return 0;
    }

    try {
      // First, get the base profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        return 0;
      }

      const profile = profileData as ProfileType;
      setUserType(profile.user_type);
      const userProfileType = profile.user_type;
      let totalFields = requiredFields.common.length;
      let completedFields = 0;
      let missingFieldsList: string[] = [];

      // Check common fields
      for (const field of requiredFields.common) {
        if (profile[field as keyof ProfileType]) {
          completedFields++;
        } else {
          missingFieldsList.push(field);
        }
      }

      // Check user type specific fields
      if (userProfileType === 'founder') {
        totalFields += requiredFields.founder.length;
        
        for (const field of requiredFields.founder) {
          if (profile[field as keyof ProfileType]) {
            completedFields++;
          } else {
            missingFieldsList.push(field);
          }
        }

        // Check if the founder has a startup
        const { count, error: startupError } = await supabase
          .from('startups')
          .select('id', { count: 'exact', head: true })
          .eq('founder_id', user.id);

        if (!startupError && count && count > 0) {
          completedFields++;
        } else {
          missingFieldsList.push('startup');
        }
        totalFields++; // Add startup as a required item

      } else if (userProfileType === 'investor') {
        // Check investor profile
        const { data: investorData, error: investorError } = await supabase
          .from('investor_profiles')
          .select('*')
          .eq('profile_id', user.id)
          .single();

        if (investorError) {
          // Investor profile might not exist yet
          totalFields += requiredFields.investor.length;
          missingFieldsList = missingFieldsList.concat(requiredFields.investor);
        } else {
          const investorProfile = investorData as InvestorProfileType;
          totalFields += requiredFields.investor.length;
          for (const field of requiredFields.investor) {
            const value = investorProfile[field as keyof InvestorProfileType];
            if (value && (Array.isArray(value) ? value.length > 0 : true)) {
              completedFields++;
            } else {
              missingFieldsList.push(field);
            }
          }
        }
      }

      // Calculate percentage
      const percentage = Math.round((completedFields / totalFields) * 100);
      
      // Update the profile_completion in user_progress
      await supabase
        .from('user_progress')
        .update({ profile_completion: percentage })
        .eq('user_id', user.id);

      setCompletionPercentage(percentage);
      setIsComplete(percentage >= 100);
      setMissingFields(missingFieldsList);
      
      return percentage;
    } catch (error) {
      console.error('Error calculating profile completion:', error);
      return completionPercentage;
    }
  }, [user?.id, completionPercentage]);

  // Start the guided workflow
  const startWorkflow = useCallback(() => {
    const router = typeof window !== 'undefined' ? require('next/navigation').useRouter() : null;
    if (router) {
      router.push('/profile/wizard');
    } else {
      // Fallback if router is not available
      if (typeof window !== 'undefined') {
        window.location.href = '/profile/wizard';
      }
    }
  }, []);

  // Calculate completion when the hook mounts or user changes
  useEffect(() => {
    calculateCompletion();
  }, [calculateCompletion, user?.id]);

  return {
    completionPercentage,
    isComplete,
    missingFields,
    requiredFields,
    calculateCompletion,
    userType,
    hasCompletedWorkflow,
    startWorkflow
  };
} 