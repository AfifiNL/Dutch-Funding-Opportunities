import { useState, useEffect, useCallback } from 'react';
import { getUserAchievements, getAllAchievements, unlockAchievement } from '@/api/userProgress';
import { useAuth } from './useAuth';

interface Achievement {
  id: string;
  name: string;
  description: string;
  xpReward: number;
  category: string;
  requirements: string;
  icon?: string;
  isUnlocked?: boolean;
  dateUnlocked?: string;
  [key: string]: any;
}

interface UseAchievementsResult {
  achievements: Achievement[];
  allAchievements: Achievement[];
  loading: boolean;
  error: Error | null;
  unlockAchievement: (achievementId: string) => Promise<void>;
  hasAchievement: (achievementId: string) => boolean;
  getAchievementsByCategory: (category: string) => Achievement[];
}

/**
 * Custom hook for fetching and unlocking achievements
 * @param providedUserId Optional user ID to override the one from useAuth
 * @returns Object containing achievements, loading state, error, and utility methods
 */
export function useAchievements(providedUserId?: string): UseAchievementsResult {
  const { user, isLoading: authLoading } = useAuth();
  const userId = providedUserId || user?.id;
  
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Function to fetch user achievements
  const fetchAchievements = useCallback(async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching achievements for user:', userId);
      
      // Fetch achievements unlocked by the user
      const userAchievements = await getUserAchievements(userId);
      
      // Fetch all available achievements
      const allAvailableAchievements = await getAllAchievements();
      
      // Map the API achievements to the local Achievement type format
      const mappedUserAchievements = userAchievements.map(achievement => ({
        id: achievement.id,
        name: achievement.title || '',
        description: achievement.description || '',
        xpReward: achievement.xpPoints || 0,
        category: achievement.category || '',
        requirements: '',
        icon: achievement.icon,
        isUnlocked: true,
        dateUnlocked: achievement.dateUnlocked
      }));
      
      // Mark achievements as unlocked based on user achievements
      const userAchievementIds = mappedUserAchievements.map(a => a.id);
      
      const markedAchievements = allAvailableAchievements.map(achievement => ({
        id: achievement.id,
        name: achievement.title || '',
        description: achievement.description || '',
        xpReward: achievement.xpPoints || 0,
        category: achievement.category || '',
        requirements: '',
        icon: achievement.icon,
        isUnlocked: userAchievementIds.includes(achievement.id)
      }));
      
      setAchievements(mappedUserAchievements);
      setAllAchievements(markedAchievements);
      
      console.log(`Loaded ${userAchievements.length} user achievements and ${allAvailableAchievements.length} total achievements`);
    } catch (err) {
      console.error("Error fetching achievements:", err);
      setError(err instanceof Error ? err : new Error('Failed to fetch achievements'));
    } finally {
      setLoading(false);
    }
  }, [userId]);
  
  // Fetch achievements after auth is loaded or userId changes
  useEffect(() => {
    if (!authLoading && userId) {
      fetchAchievements();
    }
  }, [fetchAchievements, authLoading, userId]);
  
  // Function to unlock an achievement
  const unlockUserAchievement = async (achievementId: string): Promise<void> => {
    if (!userId) {
      throw new Error('User ID is required to unlock achievements');
    }
    
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Unlocking achievement ${achievementId} for user ${userId}`);
      await unlockAchievement(userId, achievementId);
      
      // Refetch achievements to get updated list
      await fetchAchievements();
    } catch (err) {
      console.error("Error unlocking achievement:", err);
      throw err instanceof Error ? err : new Error('Failed to unlock achievement');
    } finally {
      setLoading(false);
    }
  };
  
  // Utility function to check if user has an achievement
  const hasAchievement = (achievementId: string): boolean => {
    return achievements.some(achievement => achievement.id === achievementId);
  };
  
  // Utility function to get achievements by category
  const getAchievementsByCategory = (category: string): Achievement[] => {
    return allAchievements.filter(achievement => achievement.category === category);
  };
  
  return {
    achievements,
    allAchievements,
    loading: loading || authLoading,
    error,
    unlockAchievement: unlockUserAchievement,
    hasAchievement,
    getAchievementsByCategory
  };
} 