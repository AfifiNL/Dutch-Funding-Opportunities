import { supabase, handleSupabaseError } from '@/utils/supabase';
import { Json } from '@/types/supabase';

// Define interfaces for user data
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

interface Achievement {
  id: string;
  title: string;
  description: string;
  xpPoints: number;
  icon?: string;
  dateUnlocked?: string;
  category?: string;
}

/**
 * Fetches a user profile by user ID
 * @param userId The user ID
 * @returns The user profile or null if not found
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    // First check if the user exists in profiles
    const { data: profile, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();
    
    if (userError) {
      if (userError.code === 'PGRST116') { // no rows found
        console.log(`No user found with ID ${userId}`);
        return null;
      }
      handleSupabaseError(userError, 'getUserProfile - checking user');
      return null;
    }
    
    // Now get the user progress record
    const { data: progress, error: progressError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (progressError) {
      if (progressError.code === 'PGRST116') { // no rows found
        console.log(`No progress data found for user ${userId}, creating default profile`);
        // Automatically create a default profile
        return createUserProfile(userId, {
          xpPoints: 0,
          level: 1,
          currentStage: 0,
          completedStages: []
        });
      }
      handleSupabaseError(progressError, 'getUserProfile - getting progress');
      return null;
    }
    
    // Map the data to the expected format
    const userProfile: UserProfile = {
      id: progress.id,
      userId: progress.user_id,
      xpPoints: progress.profile_completion || 0,
      level: Math.floor((progress.profile_completion || 0) / 100) + 1,
      currentStage: progress.current_step ? parseInt(progress.current_step) : 0,
      completedStages: [],
      pitchScores: {}
    };
    
    // Parse completed stages from JSON
    if (progress.pitch_steps_completed && typeof progress.pitch_steps_completed === 'object') {
      // Type assertion to treat pitch_steps_completed as a Record<string, boolean>
      const stepsCompleted = progress.pitch_steps_completed as Record<string, boolean>;
      
      userProfile.completedStages = Object.keys(stepsCompleted)
        .filter(key => stepsCompleted[key] === true)
        .map(key => parseInt(key));
    }
    
    return userProfile;
  } catch (error) {
    console.error("Error in getUserProfile:", error);
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
    // Fetch user achievements from the user_achievements table with join to achievements
    const { data, error } = await supabase
      .from('user_achievements')
      .select(`
        unlocked_at,
        achievements:achievement_id (
          id,
          title,
          description,
          xp_points,
          icon,
          category
        )
      `)
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user achievements:', error);
      return [];
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }

    // Transform the joined data into the expected format
    // Use type assertion to handle the nested structure
    return data.map(item => {
      const achievementData = (item as any).achievements;
      return {
        id: achievementData.id,
        title: achievementData.title,
        description: achievementData.description,
        xpPoints: achievementData.xp_points,
        icon: achievementData.icon,
        category: achievementData.category,
        dateUnlocked: (item as any).unlocked_at
      };
    });
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
    // Check if achievement already unlocked
    const { data: existingAchievement, error: checkError } = await supabase
      .from('user_achievements')
      .select('id')
      .match({ user_id: userId, achievement_id: achievementId })
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // Real error, not just "no rows returned"
      console.error('Error checking existing achievement:', checkError);
      return false;
    }

    // If already unlocked, return success
    if (existingAchievement) {
      return true;
    }

    // Insert the achievement unlock record
    const { error } = await supabase
      .from('user_achievements')
      .insert({
        user_id: userId,
        achievement_id: achievementId,
        unlocked_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error unlocking achievement:', error);
      return false;
    }

    // Update user XP points
    const { data: achievement } = await supabase
      .from('achievements')
      .select('xp_points')
      .eq('id', achievementId)
      .single();

    if (achievement) {
      // Get current user progress
      const progress = await getUserProfile(userId);
      if (progress && achievement.xp_points) {
        // Update XP points
        await updateUserProfile(userId, {
          xpPoints: (progress.xpPoints || 0) + achievement.xp_points
        });
      }
    }

    return true;
  } catch (error) {
    console.error('Error in unlockAchievement:', error);
    return false;
  }
}

/**
 * Updates a user profile
 * @param userId The user ID
 * @param data The data to update
 * @returns The updated user profile
 */
export async function updateUserProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
  try {
    const existingProfile = await getUserProfile(userId);
    
    if (!existingProfile) {
      return createUserProfile(userId, data);
    }
    
    // Prepare data for update
    const updateData: Record<string, any> = {};
    
    if (data.xpPoints !== undefined) updateData.profile_completion = data.xpPoints;
    if (data.currentStage !== undefined) updateData.current_step = data.currentStage.toString();
    
    // Handle completed stages as JSON
    if (data.completedStages) {
      const completedStepsObj: Record<string, boolean> = {};
      data.completedStages.forEach(stage => {
        completedStepsObj[stage.toString()] = true;
      });
      updateData.pitch_steps_completed = completedStepsObj;
    }
    
    // Update the record
    const { data: updatedData, error } = await supabase
      .from('user_progress')
      .update(updateData)
      .eq('user_id', userId)
      .select()
      .single();
      
    if (error) {
      handleSupabaseError(error, 'updateUserProfile');
      throw error;
    }
    
    // Combine the updated data with existing profile
    return {
      ...existingProfile,
      ...data,
      xpPoints: data.xpPoints ?? existingProfile.xpPoints,
      level: data.level ?? Math.floor((data.xpPoints ?? existingProfile.xpPoints) / 100) + 1,
      currentStage: data.currentStage ?? existingProfile.currentStage,
      completedStages: data.completedStages ?? existingProfile.completedStages
    };
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    throw error;
  }
}

/**
 * Creates a new user profile
 * @param userId The user ID
 * @param data The initial profile data
 * @returns The created user profile
 */
export async function createUserProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
  try {
    // First check if profile already exists
    const existingProfile = await getUserProfile(userId);
    if (existingProfile) {
      return updateUserProfile(userId, data);
    }
    
    // Prepare data for insert
    const completedStepsObj: Record<string, boolean> = {};
    if (data.completedStages) {
      data.completedStages.forEach(stage => {
        completedStepsObj[stage.toString()] = true;
      });
    }
    
    const insertData = {
      user_id: userId,
      profile_completion: data.xpPoints || 0,
      current_step: data.currentStage !== undefined ? data.currentStage.toString() : '0',
      pitch_steps_completed: completedStepsObj as Json,
      last_active: new Date().toISOString(),
      onboarding_completed: false
    };
    
    // Insert the record
    const { data: newData, error } = await supabase
      .from('user_progress')
      .insert(insertData)
      .select()
      .single();
      
    if (error) {
      handleSupabaseError(error, 'createUserProfile');
      throw error;
    }
    
    // Return the newly created profile in the expected format
    return {
      id: newData.id,
      userId: newData.user_id,
      xpPoints: data.xpPoints || 0,
      level: data.level || Math.floor((data.xpPoints || 0) / 100) + 1,
      currentStage: data.currentStage || 0,
      completedStages: data.completedStages || [],
      pitchScores: data.pitchScores || {}
    };
  } catch (error) {
    console.error("Error in createUserProfile:", error);
    throw error;
  }
}

/**
 * Fetches all available achievements from the system
 * @returns Array of all achievements
 */
export async function getAllAchievements(): Promise<Achievement[]> {
  try {
    // TODO: Implement actual achievement fetching from Supabase when the table is created
    // For now return mock achievements
    console.log('Using mock data for getAllAchievements');
    
    // Mock achievements for testing
    const mockAchievements: Achievement[] = [
      {
        id: 'achievement-1',
        title: 'Getting Started',
        description: 'Created your first profile',
        xpPoints: 10,
        icon: '🚀',
        category: 'onboarding'
      },
      {
        id: 'achievement-2',
        title: 'Pitch Perfect',
        description: 'Completed your first pitch',
        xpPoints: 50,
        icon: '📊',
        category: 'pitch'
      },
      {
        id: 'achievement-3',
        title: 'Networker',
        description: 'Connected with an investor',
        xpPoints: 25,
        icon: '🤝',
        category: 'networking'
      }
    ];
    
    return mockAchievements;
  } catch (error) {
    console.error("Error in getAllAchievements:", error);
    throw error;
  }
} 