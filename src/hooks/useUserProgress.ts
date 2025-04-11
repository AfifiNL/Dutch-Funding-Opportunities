import { useState, useEffect, useCallback } from 'react';
import { getUserProfile, updateUserProgress as updateUserProgressAPI, createUserProfile } from '@/api/userProgress';
import { useAuth } from './useAuth';

interface UserProfile {
  id: string;
  userId: string;
  xpPoints: number;
  level: number;
  currentStage: number;
  completedStages: number[];
  pitchScores?: Record<string, number>;
  achievements?: string[];
  [key: string]: any;
}

interface UseUserProgressResult {
  profile: UserProfile | null;
  loading: boolean;
  error: Error | null;
  updateProgress: (data: Partial<UserProfile>) => Promise<UserProfile>;
  level: number;
  xpToNextLevel: number;
  completedStages: number[];
  hasCompletedStage: (stageId: number) => boolean;
  currentXpPercentage: number;
}

/**
 * Custom hook for fetching and updating user progress
 * @param providedUserId Optional user ID to override the one from useAuth
 * @returns Object containing user profile, loading state, error, and utility methods
 */
export function useUserProgress(providedUserId?: string): UseUserProgressResult {
  const { user, isLoading: authLoading } = useAuth();
  const userId = providedUserId || user?.id;
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Function to create a default profile
  const createDefaultProfile = useCallback(async () => {
    if (!userId) return null;
    
    try {
      const defaultProfile = {
        userId,
        xpPoints: 0,
        level: 1,
        currentStage: 0,
        completedStages: [],
        pitchScores: {},
        achievements: []
      };
      
      console.log('Creating default user profile for:', userId);
      const newProfile = await createUserProfile(userId, defaultProfile);
      return newProfile;
    } catch (err) {
      console.error("Error creating default profile:", err);
      return null;
    }
  }, [userId]);
  
  // Function to fetch user profile
  const fetchProfile = useCallback(async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching user profile for:', userId);
      let data = await getUserProfile(userId);
      
      // If no profile exists, create a default one
      if (!data) {
        console.log('No profile found, creating default profile');
        data = await createDefaultProfile();
      }
      
      setProfile(data);
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError(err instanceof Error ? err : new Error('Failed to fetch user profile'));
    } finally {
      setLoading(false);
    }
  }, [userId, createDefaultProfile]);
  
  // Fetch profile after auth is loaded or userId changes
  useEffect(() => {
    if (!authLoading) {
      fetchProfile();
    }
  }, [fetchProfile, authLoading]);
  
  // Function to update user progress
  const updateProgress = async (data: Partial<UserProfile>): Promise<UserProfile> => {
    if (!userId) {
      throw new Error('User ID is required to update progress');
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Ensure we have a profile before trying to update
      let profileToUpdate = profile;
      if (!profileToUpdate) {
        profileToUpdate = await createDefaultProfile();
        if (!profileToUpdate) {
          throw new Error('Failed to create user profile');
        }
      }
      
      // Map from UserProfile to API format
      const apiUpdateData: any = {};
      
      if (data.xpPoints !== undefined) apiUpdateData.profile_completion = data.xpPoints;
      if (data.level !== undefined) apiUpdateData.current_step = data.level.toString();
      if (data.currentStage !== undefined) apiUpdateData.profile_completion_workflow_done = data.currentStage > 0;
      if (data.completedStages !== undefined) {
        apiUpdateData.pitch_steps_completed = {
          stages: data.completedStages
        };
      }
      
      const apiResult = await updateUserProgressAPI(userId, apiUpdateData);
      
      // Map API response back to UserProfile format
      const updatedProfile: UserProfile = {
        ...profileToUpdate,
        ...data,
        id: apiResult.id,
        userId: apiResult.user_id
      };
      
      setProfile(updatedProfile);
      
      return updatedProfile;
    } catch (err) {
      console.error("Error updating user progress:", err);
      const errorObj = err instanceof Error ? err : new Error('Failed to update user progress');
      setError(errorObj);
      throw errorObj;
    } finally {
      setLoading(false);
    }
  };
  
  // Calculate derived values
  const level = profile ? profile.level || 1 : 1;
  const xpPoints = profile ? profile.xpPoints || 0 : 0;
  const xpToNextLevel = 100 - (xpPoints % 100);
  const currentXpPercentage = 100 - (xpToNextLevel / 100 * 100);
  const completedStages = profile?.completedStages || [];
  
  // Utility function to check if a stage is completed
  const hasCompletedStage = (stageId: number): boolean => {
    return completedStages.includes(stageId);
  };
  
  return { 
    profile, 
    loading: loading || authLoading, 
    error, 
    updateProgress,
    level,
    xpToNextLevel,
    completedStages,
    hasCompletedStage,
    currentXpPercentage
  };
} 