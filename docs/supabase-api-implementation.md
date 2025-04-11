# Supabase API Implementation

This document provides a comprehensive overview of the Supabase API implementations used throughout the Dutch Funding Opportunities application.

## Table of Contents

- [Introduction](#introduction)
- [Supabase Configuration](#supabase-configuration)
- [User Progress and Profile Management](#user-progress-and-profile-management)
- [Investors API](#investors-api)
- [Funding Opportunities API](#funding-opportunities-api)
- [Authentication Utilities](#authentication-utilities)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)

## Introduction

The application has transitioned to using Supabase as its sole database provider, removing previous dependencies on Airtable. The Supabase implementation includes functionality for:

- User profile and progress management
- Investor data retrieval
- Funding opportunities discovery
- Authentication and session management
- Database connections and error handling

Each API module follows a consistent pattern of checking for Supabase availability and falling back to mock data when necessary.

## Supabase Configuration

### Client Setup

The Supabase client is initialized in `src/utils/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://byeugnlnbqzxebxlxzaq.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

// Create a single supabase client for the entire application
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
```

### Availability Check

The application determines whether to use Supabase or mock data through a utility function in `src/api/config.ts`:

```typescript
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if Supabase credentials are available
export const isSupabaseAvailable = () => {
  return !!(SUPABASE_URL && SUPABASE_ANON_KEY);
};
```

### Utility Functions

Common utilities for Supabase operations are defined in `src/utils/supabase.ts`:

```typescript
// Error handling
export function handleSupabaseError(error: any, operation: string): never {
  console.error(`Supabase ${operation} error:`, error)
  throw new Error(`Error during ${operation}: ${error.message || 'Unknown error'}`)
}

// Timestamp formatting
export function formatTimestamp(timestamp: string | null): string {
  if (!timestamp) return ''
  return new Date(timestamp).toLocaleString()
}

// Authentication check
export async function isAuthenticated(): Promise<boolean> {
  const { data, error } = await supabase.auth.getSession()
  if (error) {
    console.error('Auth check error:', error)
    return false
  }
  return !!data.session
}

// Get current user
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Get user error:', error)
    return null
  }
  return data.user
}
```

## User Progress and Profile Management

The `src/api/supabase/userProgress.ts` module handles user profiles, progress tracking, and achievements.

### Interfaces

```typescript
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
```

### Key Functions

#### Get User Profile

```typescript
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    // Check if user exists in profiles
    const { data: profile, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();
    
    if (userError) {
      if (userError.code === 'PGRST116') {
        return null;
      }
      handleSupabaseError(userError, 'getUserProfile - checking user');
      return null;
    }
    
    // Get the user progress record
    const { data: progress, error: progressError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    // Handle no progress found case
    if (progressError && progressError.code === 'PGRST116') {
      return createUserProfile(userId, {
        xpPoints: 0,
        level: 1,
        currentStage: 0,
        completedStages: []
      });
    }
    
    // Map data to expected format
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
```

#### Get User Achievements

```typescript
export async function getUserAchievements(userId: string): Promise<Achievement[]> {
  try {
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

    // Transform the joined data
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
```

#### Unlock Achievement

```typescript
export async function unlockAchievement(userId: string, achievementId: string): Promise<boolean> {
  try {
    // Check if already unlocked
    const { data: existingAchievement, error: checkError } = await supabase
      .from('user_achievements')
      .select('id')
      .match({ user_id: userId, achievement_id: achievementId })
      .single();

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

    // Update user XP points
    const { data: achievement } = await supabase
      .from('achievements')
      .select('xp_points')
      .eq('id', achievementId)
      .single();

    if (achievement) {
      const progress = await getUserProfile(userId);
      if (progress && achievement.xp_points) {
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
```

#### Update User Profile

```typescript
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
      updateData.pitch_steps_completed = completedStepsObj as Json;
    }
    
    // Update the record
    const { data: updatedData, error } = await supabase
      .from('user_progress')
      .update(updateData)
      .eq('user_id', userId)
      .select('*')
      .single();
    
    if (error) {
      handleSupabaseError(error, 'updateUserProfile');
    }
    
    // Retrieve and return the updated profile
    return getUserProfile(userId);
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    throw error;
  }
}
```

## Investors API

The `src/api/supabase/investors.ts` module handles investor data retrieval.

### Key Functions

#### Fetch All Investors

```typescript
export async function fetchInvestors(): Promise<Investor[]> {
  try {
    // First get profiles with investor type
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, full_name, email, avatar_url, bio, company_name, linkedin_url, created_at')
      .eq('user_type', 'investor');

    if (profilesError) {
      handleSupabaseError(profilesError, 'fetching investor profiles');
    }

    // Get detailed investor information
    const { data: investorProfiles, error: investorError } = await supabase
      .from('investor_profiles')
      .select('profile_id, investment_thesis, investment_stages, investment_sizes, preferred_industries, portfolio');

    if (investorError) {
      handleSupabaseError(investorError, 'fetching investor details');
    }

    // Combine and map the data
    return profiles.map(profile => {
      const investorProfile = investorProfiles?.find(inv => inv.profile_id === profile.id);
      
      // Map portfolio, investment ranges, and stages
      // ...
      
      return {
        id: profile.id,
        name: profile.full_name,
        type: 'Investor',
        stages,
        description: profile.bio || '',
        logoUrl: profile.avatar_url || undefined,
        website: '',
        focusSectors: investorProfile?.preferred_industries || [],
        investmentRange,
        location: '',
        email: profile.email,
        investmentThesis: investorProfile?.investment_thesis || '',
        portfolioCompanies,
        linkedinUrl: profile.linkedin_url || '',
        companyName: profile.company_name || ''
      };
    });
  } catch (error) {
    console.error('Error in fetchInvestors:', error);
    throw error;
  }
}
```

#### Fetch Investors By Stage

```typescript
export async function fetchInvestorsByStage(stageId: number): Promise<Investor[]> {
  try {
    // First get all investors
    const investors = await fetchInvestors();
    
    // Filter by the specified stage
    return investors.filter(investor => 
      investor.stages && investor.stages.includes(stageId)
    );
  } catch (error) {
    console.error(`Error in fetchInvestorsByStage for stage ${stageId}:`, error);
    throw error;
  }
}
```

#### Fetch Investor By ID

```typescript
export async function fetchInvestorById(id: string): Promise<Investor | null> {
  try {
    // Get profile and investor details
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, full_name, email, avatar_url, bio, company_name, linkedin_url, created_at')
      .eq('id', id)
      .eq('user_type', 'investor')
      .single();
    
    // Return null for not found
    if (profileError && profileError.code === 'PGRST116') {
      return null;
    }
    
    // Get investor details and map to expected format
    // ...

    return {
      id: profile.id,
      name: profile.full_name,
      // ...other properties
    };
  } catch (error) {
    console.error(`Error in fetchInvestorById for ID ${id}:`, error);
    throw error;
  }
}
```

## Funding Opportunities API

The `src/api/supabase/fundingOpportunities.ts` module handles funding opportunity data.

### Key Functions

#### Fetch All Funding Opportunities

```typescript
export async function fetchFundingOpportunities(): Promise<IFundingOpportunity[]> {
  try {
    // Fetch all funding opportunities
    const { data: fundingData, error: fundingError } = await supabase
      .from('funding_opportunities')
      .select('*');

    if (fundingError) {
      handleSupabaseError(fundingError, 'fetchFundingOpportunities');
    }

    // Map data to match IFundingOpportunity interface
    return (fundingData || []).map(opportunity => mapFundingOpportunityData(opportunity));
  } catch (error) {
    console.error('Error in fetchFundingOpportunities:', error);
    throw error;
  }
}
```

#### Fetch Funding Opportunity By ID

```typescript
export async function fetchFundingOpportunityById(id: string): Promise<IFundingOpportunity | null> {
  try {
    const { data: opportunity, error } = await supabase
      .from('funding_opportunities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      handleSupabaseError(error, 'fetchFundingOpportunityById');
    }

    return mapFundingOpportunityData(opportunity);
  } catch (error) {
    console.error(`Error in fetchFundingOpportunityById for ID ${id}:`, error);
    throw error;
  }
}
```

#### Fetch Opportunities By Type

```typescript
export async function fetchFundingOpportunitiesByType(type: string): Promise<IFundingOpportunity[]> {
  try {
    const { data: fundingData, error: fundingError } = await supabase
      .from('funding_opportunities')
      .select('*')
      .eq('funding_type', type);

    if (fundingError) {
      handleSupabaseError(fundingError, 'fetchFundingOpportunitiesByType');
    }

    return (fundingData || []).map(opportunity => mapFundingOpportunityData(opportunity));
  } catch (error) {
    console.error(`Error in fetchFundingOpportunitiesByType for type ${type}:`, error);
    throw error;
  }
}
```

#### Data Mapping Helper

```typescript
function mapFundingOpportunityData(data: Database['public']['Tables']['funding_opportunities']['Row']): IFundingOpportunity {
  // Parse details if stored as JSON string
  let mappedDetails: Array<{ key: string; value: string }> | Record<string, string> | undefined;
  
  // Handle details field properly
  if (data.details) {
    // Map JSON data to expected format
    // ...
  }
  
  // Convert null values to undefined for optional properties
  return {
    id: data.id,
    title: data.title,
    fundProvider: data.fund_provider,
    sector: data.sector,
    amountDescription: data.amount_description,
    amountMin: data.amount_min || undefined,
    amountMax: data.amount_max || undefined,
    location: data.location,
    description: data.description,
    relevantLinks: Array.isArray(data.relevant_links) ? data.relevant_links : [],
    displayType: displayType,
    imageUrl: data.image_url || undefined,
    equity: data.equity || undefined,
    programSupport: data.program_support || false,
    details: mappedDetails
  };
}
```

## Authentication Utilities

The Supabase implementation includes authentication utilities for user management:

```typescript
// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const { data, error } = await supabase.auth.getSession()
  if (error) {
    console.error('Auth check error:', error)
    return false
  }
  return !!data.session
}

// Get current user
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Get user error:', error)
    return null
  }
  return data.user
}
```

## Error Handling

The application uses a consistent approach to handle Supabase errors:

```typescript
export function handleSupabaseError(error: any, operation: string): never {
  console.error(`Supabase ${operation} error:`, error)
  throw new Error(`Error during ${operation}: ${error.message || 'Unknown error'}`)
}
```

Key error handling patterns:

1. **Not Found Handling**: Check for "PGRST116" error code which means "no rows returned"
2. **Operation Context**: Pass operation name to error handler for more meaningful messages
3. **Fallback Values**: Return empty arrays or null values when appropriate
4. **Detailed Logging**: Console log errors with context
5. **Error Propagation**: Throw errors to allow handling at higher levels

## Best Practices

When working with the Supabase API implementation:

1. **Always check if Supabase is available** before attempting operations
2. **Use type assertions carefully** when working with JSON or dynamic data
3. **Handle null/undefined values** explicitly to prevent runtime errors
4. **Use transactions** for operations that modify multiple tables
5. **Keep data transformations consistent** between mock and real implementations
6. **Follow the established pattern** of separating Supabase implementations into their own modules
7. **Use strong typing** with the Database type from `@/types/supabase`
8. **Handle authentication state changes** through the AuthContext hooks
9. **Avoid embedding credentials** in code - use environment variables
10. **Test with both real and mock data** to ensure consistent behavior 