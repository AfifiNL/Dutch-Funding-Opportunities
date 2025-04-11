# API Functions

This document provides detailed information about the API functions used in the Dutch Funding Opportunities application.

## Table of Contents

- [Overview](#overview)
- [Configuration](#configuration)
- [User Progress API](#user-progress-api)
- [Investors API](#investors-api)
- [Funding Opportunities API](#funding-opportunities-api)
- [Pitch API](#pitch-api)
- [Supabase Implementation](#supabase-implementation)
- [Mock Data](#mock-data)
- [Error Handling](#error-handling)

## Overview

The API layer in this application provides a consistent interface for data operations, with implementations for both Supabase database access and mock data for development and testing. All API functions follow a similar pattern:

1. Check if Supabase is configured and available
2. If available, use Supabase implementation
3. If not available, fall back to mock data

This abstraction allows the application to work in various environments without changes to the client code.

## Configuration

The API configuration is defined in `src/api/config.ts` and determines whether Supabase should be used:

```typescript
import { createClient } from '@supabase/supabase-js';

// Environment variables
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if Supabase credentials are available
export const isSupabaseAvailable = () => {
  return !!(SUPABASE_URL && SUPABASE_ANON_KEY);
};

// Supabase client instance
export const supabase = isSupabaseAvailable()
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// Log configuration status
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log(
    `Supabase ${isSupabaseAvailable() ? 'is' : 'is not'} configured.`
  );
  
  if (!isSupabaseAvailable()) {
    console.log('Using mock data for all API operations.');
  }
}
```

## User Progress API

The User Progress API provides functions for managing user profiles, achievements, and progress tracking.

### Functions

#### `getUserProfile(userId: string): Promise<UserProfile | null>`

Retrieves a user's profile with progress information.

- **Parameters**:
  - `userId`: The ID of the user
- **Returns**: A promise that resolves to the user profile or null if not found
- **Implementation**:
  - Checks if the user exists in the profiles table
  - Retrieves user progress data from the user_progress table
  - Creates a default profile if none exists
  - Maps database fields to the UserProfile interface

#### `getUserAchievements(userId: string): Promise<Achievement[]>`

Gets all achievements for a specific user.

- **Parameters**:
  - `userId`: The ID of the user
- **Returns**: A promise that resolves to an array of achievements

#### `getAllAchievements(): Promise<Achievement[]>`

Gets all available achievements in the system.

- **Returns**: A promise that resolves to an array of all achievements

#### `unlockAchievement(userId: string, achievementId: string): Promise<boolean>`

Unlocks a specific achievement for a user.

- **Parameters**:
  - `userId`: The ID of the user
  - `achievementId`: The ID of the achievement to unlock
- **Returns**: A promise that resolves to true if successful, false otherwise

#### `updateUserProgress(userId: string, updateData: Partial<UserProfile>): Promise<UserProfile | null>`

Updates a user's progress information.

- **Parameters**:
  - `userId`: The ID of the user
  - `updateData`: An object containing the fields to update
- **Returns**: A promise that resolves to the updated user profile or null if failed

#### `createUserProfile(userId: string, initialData?: Partial<UserProfile>): Promise<UserProfile | null>`

Creates a new user profile.

- **Parameters**:
  - `userId`: The ID of the user
  - `initialData`: Optional initial data for the profile
- **Returns**: A promise that resolves to the created user profile or null if failed

### Interfaces

```typescript
interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  user_type?: 'founder' | 'investor' | 'admin';
  avatar_url?: string;
  onboarding_completed: boolean;
  profile_completed: boolean;
  points: number;
  pitch_completed: boolean;
  pitch_steps_completed: Record<string, boolean>;
  created_at?: string;
  updated_at?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  category: string;
  icon_url?: string;
  unlocked?: boolean;
  unlocked_at?: string;
}
```

## Investors API

The Investors API provides functions for retrieving investor information.

### Functions

#### `getInvestors(): Promise<Investor[]>`

Retrieves all investors.

- **Returns**: A promise that resolves to an array of investors

#### `getInvestorsByStage(stage: string): Promise<Investor[]>`

Retrieves investors that match a specific startup stage.

- **Parameters**:
  - `stage`: The startup stage to filter by
- **Returns**: A promise that resolves to an array of matching investors

#### `getInvestorById(id: string): Promise<Investor | null>`

Retrieves a specific investor by ID.

- **Parameters**:
  - `id`: The ID of the investor
- **Returns**: A promise that resolves to the investor or null if not found

#### `getInvestorsByType(type: string): Promise<Investor[]>`

Retrieves investors of a specific type (VC, Angel, etc.).

- **Parameters**:
  - `type`: The investor type to filter by
- **Returns**: A promise that resolves to an array of matching investors

#### `getLinkedOpportunitiesForInvestor(investorId: string): Promise<FundingOpportunity[]>`

Retrieves funding opportunities associated with a specific investor.

- **Parameters**:
  - `investorId`: The ID of the investor
- **Returns**: A promise that resolves to an array of funding opportunities

### Interfaces

```typescript
interface Investor {
  id: string;
  name: string;
  logo_url?: string;
  website_url?: string;
  description?: string;
  investment_thesis?: string;
  investor_type: string; // 'VC', 'Angel', 'Government', etc.
  target_industries?: string[];
  target_stages?: string[];
  minimum_investment?: number;
  maximum_investment?: number;
  geographic_focus?: string[];
  contact_email?: string;
  // Other fields as needed
}
```

## Funding Opportunities API

The Funding Opportunities API provides functions for retrieving funding opportunity information.

### Functions

#### `getFundingOpportunities(): Promise<FundingOpportunity[]>`

Retrieves all funding opportunities.

- **Returns**: A promise that resolves to an array of funding opportunities

#### `getFundingOpportunitiesByStage(stage: string): Promise<FundingOpportunity[]>`

Retrieves funding opportunities that match a specific startup stage.

- **Parameters**:
  - `stage`: The startup stage to filter by
- **Returns**: A promise that resolves to an array of matching funding opportunities

#### `getFundingOpportunityById(id: string): Promise<FundingOpportunity | null>`

Retrieves a specific funding opportunity by ID.

- **Parameters**:
  - `id`: The ID of the funding opportunity
- **Returns**: A promise that resolves to the funding opportunity or null if not found

#### `getFundingOpportunitiesByType(type: string): Promise<FundingOpportunity[]>`

Retrieves funding opportunities of a specific type.

- **Parameters**:
  - `type`: The opportunity type to filter by
- **Returns**: A promise that resolves to an array of matching funding opportunities

### Interfaces

```typescript
interface FundingOpportunity {
  id: string;
  title: string;
  description?: string;
  provider_id: string;
  provider_name: string;
  opportunity_type: string; // 'Grant', 'Investment', 'Loan', etc.
  amount_min?: number;
  amount_max?: number;
  application_deadline?: string;
  application_url?: string;
  eligibility_criteria?: string[];
  target_stages?: string[];
  target_industries?: string[];
  geographic_restrictions?: string[];
  success_rate?: number;
  terms?: string;
  logo_url?: string;
  // Other fields as needed
}
```

## Pitch API

The Pitch API provides functions for managing startup pitches.

### Functions

#### `createPitch(userId: string, pitchData: Partial<Pitch>): Promise<Pitch | null>`

Creates a new pitch for a startup.

- **Parameters**:
  - `userId`: The ID of the user creating the pitch
  - `pitchData`: The pitch data to create
- **Returns**: A promise that resolves to the created pitch or null if failed

#### `updatePitch(pitchId: string, userId: string, pitchData: Partial<Pitch>): Promise<Pitch | null>`

Updates an existing pitch.

- **Parameters**:
  - `pitchId`: The ID of the pitch to update
  - `userId`: The ID of the user updating the pitch
  - `pitchData`: The pitch data to update
- **Returns**: A promise that resolves to the updated pitch or null if failed

#### `getUserPitches(userId: string): Promise<Pitch[]>`

Retrieves all pitches for a specific user.

- **Parameters**:
  - `userId`: The ID of the user
- **Returns**: A promise that resolves to an array of pitches

#### `getUserPitchByStage(userId: string, stage: string): Promise<Pitch | null>`

Retrieves a specific pitch for a user by startup stage.

- **Parameters**:
  - `userId`: The ID of the user
  - `stage`: The startup stage
- **Returns**: A promise that resolves to the pitch or null if not found

#### `getPitchById(pitchId: string): Promise<Pitch | null>`

Retrieves a specific pitch by ID.

- **Parameters**:
  - `pitchId`: The ID of the pitch
- **Returns**: A promise that resolves to the pitch or null if not found

### Interfaces

```typescript
interface Pitch {
  id: string;
  user_id: string;
  startup_name: string;
  startup_stage: string;
  industry: string;
  problem: string;
  solution: string;
  target_market: string;
  business_model: string;
  competition: string;
  competitive_advantage: string;
  traction: string;
  team: string;
  funding_ask: number;
  funding_use: string;
  created_at?: string;
  updated_at?: string;
  // Other fields as needed
}
```

## Supabase Implementation

The Supabase implementations of these APIs are located in the `src/api/supabase/` directory. Each file exports functions that interact with the Supabase client to perform database operations.

Example implementation for getting a user profile:

```typescript
import { supabase } from '@/api/config';
import { UserProfile } from '@/types';

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    // Check if the user exists in profiles
    let { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (profileError) {
      console.error('Error fetching profile:', profileError);
      return null;
    }
    
    // Get user progress data
    const { data: progress, error: progressError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (progressError && progressError.code !== 'PGRST116') { // Not found error
      console.error('Error fetching user progress:', progressError);
      // Continue with default progress values
    }
    
    // Map to UserProfile interface
    const userProfile: UserProfile = {
      id: profile.id,
      email: profile.email,
      full_name: profile.full_name || undefined,
      user_type: profile.user_type,
      avatar_url: profile.avatar_url || undefined,
      onboarding_completed: progress?.onboarding_completed || false,
      profile_completed: progress?.profile_completed || false,
      points: progress?.points || 0,
      pitch_completed: progress?.pitch_completed || false,
      pitch_steps_completed: progress?.pitch_steps_completed ? 
        JSON.parse(progress.pitch_steps_completed) : {},
      created_at: profile.created_at,
      updated_at: profile.updated_at,
    };
    
    return userProfile;
  } catch (error) {
    console.error('Unexpected error getting user profile:', error);
    return null;
  }
}
```

## Mock Data

Mock data implementations provide static data for development and testing when Supabase is not configured. These are located directly in the API files.

Example implementation for investors:

```typescript
// Mock data for testing
const mockInvestors: Investor[] = [
  {
    id: 'inv1',
    name: 'Amsterdam Venture Partners',
    logo_url: '/images/mock/investors/avp.png',
    website_url: 'https://example.com/avp',
    description: 'Early-stage venture capital firm focused on Dutch startups.',
    investment_thesis: 'We invest in innovative technologies that solve real-world problems.',
    investor_type: 'VC',
    target_industries: ['Software', 'Fintech', 'Health'],
    target_stages: ['Seed', 'Series A'],
    minimum_investment: 250000,
    maximum_investment: 2000000,
    geographic_focus: ['Netherlands', 'Europe'],
    contact_email: 'info@avp-example.com',
  },
  // More mock investors...
];
```

## Error Handling

The API functions follow a consistent error handling pattern:

1. Try/catch blocks around all Supabase operations
2. Specific error handling for common database errors
3. Console error logging for debugging
4. Returning null or empty arrays on failure
5. Type checking to ensure data consistency

Example error handling:

```typescript
try {
  const { data, error } = await supabase
    .from('table_name')
    .select('*')
    .eq('id', id);
    
  if (error) {
    console.error('Database error:', error);
    return null;
  }
  
  return data;
} catch (error) {
  console.error('Unexpected error:', error);
  return null;
}
```

---

This documentation provides an overview of the API functions available in the Dutch Funding Opportunities application. Developers should refer to this guide when working with data operations or extending the API functionality. 