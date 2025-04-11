import { API_CONFIG } from './config';
import { Json } from '@/types/supabase';
import { supabase } from '@/utils/supabase';
import { Tables } from '@/types/supabase';

// Define a type for user profile
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

// Define a type for achievement
interface Achievement {
  id: string;
  title: string;
  description: string;
  xpPoints: number;
  icon?: string;
  dateUnlocked?: string;
  category?: string;
  [key: string]: any;
}

// Mock user profiles for testing/development
const mockUserProfiles: Record<string, UserProfile> = {
  // Example profile for testing
  'dev-user-1744059223516': {
    id: 'recABC123',
    userId: 'dev-user-1744059223516',
    xpPoints: 450,
    level: 3,
    currentStage: 2,
    completedStages: [0, 1],
    pitchScores: {
      'basic-pitch': 4.5,
      'investor-pitch': 3.8
    },
    achievements: ['first-pitch', 'feedback-collector', 'early-adopter']
  },
  // Can add more mock profiles for different testing scenarios
};

// Mock achievements for testing/development
const mockAchievements: Record<string, Achievement> = {
  'first-pitch': {
    id: 'first-pitch',
    title: 'First Pitch',
    description: 'Created your first pitch deck',
    xpPoints: 100,
    icon: 'award',
    category: 'pitch'
  },
  'feedback-collector': {
    id: 'feedback-collector',
    title: 'Feedback Collector',
    description: 'Received feedback from 5 different investors',
    xpPoints: 150,
    icon: 'message-square',
    category: 'engagement'
  },
  'early-adopter': {
    id: 'early-adopter',
    title: 'Early Adopter',
    description: 'Joined during the beta phase',
    xpPoints: 50,
    icon: 'zap',
    category: 'account'
  },
  'high-scorer': {
    id: 'high-scorer',
    title: 'High Scorer',
    description: 'Received a pitch score of 4.5 or higher',
    xpPoints: 200,
    icon: 'award',
    category: 'pitch'
  }
};

export type UserProgress = Tables<'user_progress'>;

// We need to add this dependency to package.json if it's not already there
// For now, we'll use a random ID generation fallback if uuid is not available
const generateId = () => {
  try {
    // Try to use crypto API for random ID if uuid module is not available
    return crypto.randomUUID();
  } catch (e) {
    // Fallback to timestamp + random number
    return `id-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }
};

/**
 * Creates a new default user progress entry for a user
 * @param userId The user ID to create a progress entry for
 * @returns The created user progress entry
 */
export async function createDefaultUserProgress(userId: string): Promise<UserProgress> {
  try {
    // Check if entry already exists
    const { data: existingProgress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (existingProgress) {
      return existingProgress as UserProgress;
    }

    // Create default progress
    const newProgress = {
      id: generateId(),
      user_id: userId,
      current_step: 'onboarding',
      onboarding_completed: false,
      profile_completion: 0,
      pitch_steps_completed: {} as Json,
      last_active: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('user_progress')
      .insert(newProgress)
      .select()
      .single();

    if (error) {
      console.error('Error creating user progress:', error);
      throw error;
    }

    return data as UserProgress;
  } catch (error) {
    console.error('Error in createDefaultUserProgress:', error);
    throw error;
  }
}

/**
 * Gets user progress for a specific user
 * @param userId The user ID to get progress for
 * @returns The user's progress entry or null if not found
 */
export async function getUserProgress(userId: string): Promise<UserProgress | null> {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned, user progress doesn't exist yet
        return null;
      }
      console.error('Error fetching user progress:', error);
      throw error;
    }

    return data as UserProgress;
  } catch (error) {
    console.error('Error in getUserProgress:', error);
    throw error;
  }
}

/**
 * Updates a user's progress
 * @param userId The user ID to update progress for
 * @param updates The updates to apply to the user's progress
 * @returns The updated user progress
 */
export async function updateUserProgress(
  userId: string, 
  updates: Partial<Omit<UserProgress, 'id' | 'created_at' | 'updated_at' | 'user_id'>>
): Promise<UserProgress> {
  try {
    // Update last_active timestamp
    const updateData: Record<string, any> = {
      ...updates,
      last_active: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('user_progress')
      .update(updateData)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating user progress:', error);
      throw error;
    }

    return data as UserProgress;
  } catch (error) {
    console.error('Error in updateUserProgress:', error);
    throw error;
  }
}

/**
 * Updates the pitch steps completed for a user
 * @param userId The user ID to update
 * @param pitchId The pitch ID to update steps for
 * @param stepKey The step key to mark as completed
 * @returns The updated user progress
 */
export async function updatePitchStep(
  userId: string,
  pitchId: string,
  stepKey: string
): Promise<UserProgress> {
  try {
    // First get current progress
    const currentProgress = await getUserProgress(userId);
    
    if (!currentProgress) {
      // Create default progress if it doesn't exist
      return createDefaultUserProgress(userId);
    }
    
    // Handle typing issues with pitch_steps_completed
    const currentSteps = currentProgress.pitch_steps_completed as Record<string, Record<string, boolean>> || {};
    
    // Update the pitch steps
    const pitchStepsCompleted = {
      ...currentSteps,
      [pitchId]: {
        ...(currentSteps[pitchId] || {}),
        [stepKey]: true
      }
    };
    
    return updateUserProgress(userId, { pitch_steps_completed: pitchStepsCompleted as Json });
  } catch (error) {
    console.error('Error in updatePitchStep:', error);
    throw error;
  }
}

/**
 * Gets a user's profile completion percentage
 * @param userId The user ID to check
 * @returns A number between 0-100 representing profile completion percentage
 */
export async function getProfileCompletionPercentage(userId: string): Promise<number> {
  try {
    const { data: progress } = await supabase
      .from('user_progress')
      .select('profile_completion')
      .eq('user_id', userId)
      .single();
      
    return progress?.profile_completion || 0;
  } catch (error) {
    console.error('Error in getProfileCompletionPercentage:', error);
    return 0;
  }
}

/**
 * Updates a user's profile completion percentage
 * @param userId The user ID to update
 * @param percentage The new completion percentage (0-100)
 */
export async function updateProfileCompletion(userId: string, percentage: number): Promise<void> {
  try {
    // Ensure percentage is between 0-100
    const validPercentage = Math.max(0, Math.min(100, percentage));
    
    await supabase
      .from('user_progress')
      .update({ profile_completion: validPercentage })
      .eq('user_id', userId);
  } catch (error) {
    console.error('Error in updateProfileCompletion:', error);
    throw error;
  }
}

/**
 * Gets a user profile by user ID
 * @param userId The user ID
 * @returns The user profile or null if not found
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    if (API_CONFIG.USE_SUPABASE) {
      // Import from Supabase implementation
      const { getUserProfile } = await import('./supabase/userProgress');
      return getUserProfile(userId);
    } else {
      // Use mock data for testing
      return mockUserProfiles[userId] || null;
    }
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    throw error;
  }
}

/**
 * Gets all achievements for a user
 * @param userId The user ID to get achievements for
 * @returns An array of achievements
 */
export async function getUserAchievements(userId: string): Promise<Achievement[]> {
  try {
    // Use Supabase in production, mock data in development if configured
    if (API_CONFIG.USE_SUPABASE) {
      // Get user progress from user_progress table
      const progress = await getUserProgress(userId);
      
      if (!progress) {
        return [];
      }
      
      // We don't have an achievements table yet, so return an empty array
      // TODO: Implement achievements in Supabase
      return [];
    } else {
      // Use mock data for testing/development
      console.log('Using mock achievements for development');
      const profile = mockUserProfiles[userId];
      if (!profile || !profile.achievements) {
        return [];
      }
      
      return profile.achievements.map(id => mockAchievements[id]).filter(Boolean);
    }
  } catch (error) {
    console.error('Error in getUserAchievements:', error);
    return [];
  }
}

/**
 * Unlocks an achievement for a user
 * @param userId The user ID to unlock the achievement for
 * @param achievementId The achievement to unlock
 * @returns Whether the achievement was successfully unlocked
 */
export async function unlockAchievement(userId: string, achievementId: string): Promise<boolean> {
  try {
    // Use Supabase in production, mock data in development if configured
    if (API_CONFIG.USE_SUPABASE) {
      // We don't have an achievements table yet
      // TODO: Implement achievements in Supabase
      return true; // Pretend it worked for now
    } else {
      // Use mock data for testing/development
      console.log(`Unlocking achievement ${achievementId} for user ${userId}`);
      
      const profile = mockUserProfiles[userId];
      if (!profile) {
        return false;
      }
      
      // Check if achievement exists
      if (!mockAchievements[achievementId]) {
        return false;
      }
      
      // Add achievement if not already added
      if (!profile.achievements) {
        profile.achievements = [];
      }
      
      if (!profile.achievements.includes(achievementId)) {
        profile.achievements.push(achievementId);
      }
      
      return true;
    }
  } catch (error) {
    console.error('Error in unlockAchievement:', error);
    return false;
  }
}

/**
 * Gets all possible achievements
 * @returns Array of all achievements
 */
export async function getAllAchievements(): Promise<Achievement[]> {
  try {
    if (API_CONFIG.USE_SUPABASE) {
      // Import the implementation from Supabase
      const { getAllAchievements } = await import('./supabase/userProgress');
      return getAllAchievements();
    } else {
      // Return mock achievements for testing
      return Object.values(mockAchievements);
    }
  } catch (error) {
    console.error('Error in getAllAchievements:', error);
    throw error;
  }
}

/**
 * Creates a user profile
 * @param userId The user ID
 * @param data The initial profile data
 * @returns The created user profile
 */
export async function createUserProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
  try {
    if (API_CONFIG.USE_SUPABASE) {
      // Import from Supabase implementation
      const { createUserProfile } = await import('./supabase/userProgress');
      return createUserProfile(userId, data);
    } else {
      // Use mock data for testing
      const newProfile: UserProfile = {
        id: generateId(),
        userId,
        xpPoints: data.xpPoints || 0,
        level: data.level || 1,
        currentStage: data.currentStage || 0,
        completedStages: data.completedStages || [],
        ...data
      };
      mockUserProfiles[userId] = newProfile;
      return newProfile;
    }
  } catch (error) {
    console.error('Error in createUserProfile:', error);
    throw error;
  }
}

// Export all functions related to user progress and achievements
export * from './supabase/userProgress';

// Use the existing mock achievements implementation
// Remove duplicate definition of getAllAchievements as it's already defined above 