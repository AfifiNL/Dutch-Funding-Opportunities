# Supabase Implementation Guide

This document provides a comprehensive overview of how Supabase is implemented and used within the Dutch Funding Opportunities application. It serves as a reference for developers to understand the database structure, authentication mechanisms, and data access patterns.

## Table of Contents

- [Overview](#overview)
- [Configuration](#configuration)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [Data Access Patterns](#data-access-patterns)
- [Common Tasks](#common-tasks)
- [Utility Functions](#utility-functions)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

The application uses Supabase as its primary database and authentication provider. Supabase is an open-source Firebase alternative that provides:

- PostgreSQL database
- Authentication and user management
- Row-level security
- Realtime subscriptions
- Storage
- Serverless functions

The application interacts with Supabase through the `@supabase/supabase-js` client library.

## Configuration

The Supabase client is initialized in `src/utils/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://byeugnlnbqzxebxlxzaq.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

// Create a single supabase client for the entire application
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
```

The application uses environment variables to store the Supabase URL and anonymous key:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

These environment variables are loaded from the `.env.local` file in development.

The application also includes a config utility (`src/api/config.ts`) that determines whether Supabase should be used:

```typescript
// Check if Supabase URL and key are defined
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Function to check if Supabase should be available
export function isSupabaseAvailable(): boolean {
  return !!supabaseUrl && supabaseUrl.length > 0 && 
         !!supabaseKey && supabaseKey.length > 0;
}
```

The application can also use mock data for testing/development purposes by setting the environment variable:

```
NEXT_PUBLIC_USE_MOCK_DATA=true
```

## Authentication

### Authentication Context

The application uses a React Context (`src/contexts/AuthContext.tsx`) to manage authentication state across the application. This context provides:

- Current user information
- Session data
- Loading state
- Authentication methods (sign in, sign up, sign out, reset password)

```typescript
interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  error: string | null;
}
```

The context initializes by checking for an existing session and subscribes to auth state changes:

```typescript
// Initialize auth state
useEffect(() => {
  // Check for existing session
  const initAuth = async () => {
    try {
      // Get session
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      
      if (session) {
        // Get user if session exists
        const user = await getCurrentUser();
        setUser(user);
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      setError('Failed to initialize authentication');
    } finally {
      setIsLoading(false);
    }
  };

  initAuth();

  // Subscribe to auth changes
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth state changed:', event);
    setSession(session);
    
    if (session) {
      getCurrentUser().then(setUser);
    } else {
      setUser(null);
    }
    
    setIsLoading(false);
  });

  // Cleanup
  return () => {
    subscription.unsubscribe();
  };
}, []);
```

### Authentication Utilities

The `src/utils/auth.ts` file provides utility functions for authentication operations:

- `signUp(email, password)`: Register a new user
- `signIn(email, password)`: Sign in a user with credentials
- `signOut()`: Sign out the current user
- `getSession()`: Get the current session
- `getCurrentUser()`: Get the current user
- `resetPassword(email)`: Request a password reset

### Using Authentication in Components

Components can access the authentication context using the `useAuth` hook:

```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, signIn, signOut, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <button onClick={() => signIn('user@example.com', 'password')}>Sign In</button>;
  }

  return (
    <div>
      <p>Welcome, {user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

## Database Schema

The application uses a PostgreSQL database managed by Supabase with the following primary tables:

### Profiles

Stores user profile information associated with authenticated users.

```sql
profiles (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  company_name TEXT,
  linkedin_url TEXT,
  user_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
```

### Startups

Stores information about startups.

```sql
startups (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  founder_id UUID REFERENCES profiles(id),
  description TEXT,
  industry TEXT[],
  funding_stage TEXT,
  logo_url TEXT,
  tagline TEXT,
  website_url TEXT,
  founding_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
```

### Pitches

Stores pitch information that startups create to present to investors.

```sql
pitches (
  id UUID PRIMARY KEY,
  startup_id UUID REFERENCES startups(id),
  title TEXT NOT NULL,
  problem_statement TEXT,
  solution_description TEXT,
  business_model TEXT,
  market_size TEXT,
  competition TEXT,
  traction TEXT,
  team_description TEXT,
  funding_ask TEXT,
  use_of_funds TEXT,
  pitch_deck_url TEXT,
  video_url TEXT,
  status TEXT,
  is_active BOOLEAN,
  version INTEGER,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
```

### Connections

Manages connections between users (e.g., founders and investors).

```sql
connections (
  id UUID PRIMARY KEY,
  requester_id UUID REFERENCES profiles(id),
  recipient_id UUID REFERENCES profiles(id),
  status TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
```

### User Progress

Tracks user progress within the application.

```sql
user_progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  current_step TEXT,
  onboarding_completed BOOLEAN,
  profile_completion INTEGER,
  pitch_steps_completed JSONB,
  last_active TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
```

### Achievements

Stores the achievements that users can unlock.

```sql
achievements (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  xp_points INTEGER NOT NULL,
  icon TEXT,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
)
```

### User Achievements

Tracks which achievements each user has unlocked.

```sql
user_achievements (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  achievement_id UUID REFERENCES achievements(id),
  date_unlocked TIMESTAMP WITH TIME ZONE,
  progress JSONB,
  created_at TIMESTAMP WITH TIME ZONE
)
```

## Data Access Patterns

The application follows a structured approach to data access using a service layer pattern:

### Service Modules

Data access is organized into service modules in the `src/api/supabase/` directory:

- `profiles.ts`: Methods for creating, retrieving, and updating user profiles
- `pitches.ts`: Methods for managing pitches
- `startups.ts`: Methods for startup operations
- `investors.ts`: Methods for investor-specific operations
- `userProgress.ts`: Methods for tracking user progress and achievements

### Typical Data Access Pattern

Most data access functions follow this pattern:

1. Define a function that takes necessary parameters
2. Make a Supabase query
3. Handle errors
4. Transform data if needed
5. Return results

Example:

```typescript
/**
 * Get a startup by ID
 * @param id Startup ID
 * @returns Startup data or null if not found
 */
export async function getStartupById(id: string): Promise<Startup | null> {
  try {
    const { data, error } = await supabase
      .from('startups')
      .select('*, profiles(full_name, avatar_url)')
      .eq('id', id)
      .single();
    
    if (error) {
      handleSupabaseError(error, 'getStartupById');
      return null;
    }
    
    // Transform data if needed
    return transformStartupData(data);
    
  } catch (error) {
    console.error('Error in getStartupById:', error);
    return null;
  }
}
```

### Error Handling

The application uses a consistent error handling pattern with the `handleSupabaseError` utility:

```typescript
export function handleSupabaseError(error: any, operation: string): never {
  console.error(`Supabase ${operation} error:`, error);
  throw new Error(`Error during ${operation}: ${error.message || 'Unknown error'}`);
}
```

## Common Tasks

### Creating a Profile

```typescript
async function createProfile(userId: string, userData: ProfileData) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: userId, // Use the auth user ID
        ...userData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
      
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
}
```

### Querying Data with Joins

```typescript
async function getPitchWithDetails(pitchId: string) {
  const { data, error } = await supabase
    .from('pitches')
    .select(`
      *,
      startup:startups(*),
      tags:pitch_tags(
        tag:tags(*)
      )
    `)
    .eq('id', pitchId)
    .single();
    
  if (error) {
    throw error;
  }
  
  return data;
}
```

### Using Row-Level Security

The database uses Row-Level Security (RLS) to control access to data. Policies are set up to ensure users can only access data they are authorized to see.

Example policy for pitches:

```sql
-- Allow users to see their own pitches
CREATE POLICY "Users can view their own pitches"
ON public.pitches
FOR SELECT
USING (
  auth.uid() IN (
    SELECT s.founder_id
    FROM public.startups s
    WHERE s.id = startup_id
  )
);
```

## Utility Functions

The application includes several utility functions for working with Supabase:

### General Supabase Utilities

- `isAuthenticated()`: Check if the current user is authenticated
- `getCurrentUser()`: Get the current user's data
- `handleSupabaseError()`: Consistent error handling

### Profile Utilities

- `getUserProfile(userId)`: Get a user's profile information
- `updateUserProfile(userId, data)`: Update a user's profile
- `createUserProfile(userId, data)`: Create a new user profile

### Achievement Utilities

- `getAllAchievements()`: Get all available achievements
- `getUserAchievements(userId)`: Get the achievements a user has unlocked
- `unlockAchievement(userId, achievementId)`: Unlock an achievement for a user

## Best Practices

When working with the Supabase implementation, follow these best practices:

1. **Use TypeScript interfaces** for data models to ensure type safety.
2. **Centralize data access** in the service modules.
3. **Handle errors consistently** using the `handleSupabaseError` utility.
4. **Use the auth context** for authentication-related operations.
5. **Leverage RLS policies** instead of implementing access control in the application code.
6. **Use transactions** when performing multiple related operations.
7. **Implement optimistic updates** for a better user experience.
8. **Cache frequently accessed data** to reduce database queries.

## Troubleshooting

### Common Issues

1. **Authentication Issues**

   - Check if the Supabase URL and key are correctly set in the environment variables
   - Ensure the user has the correct permissions set in Supabase
   - Check browser console for errors

2. **Data Access Issues**

   - Verify that RLS policies are correctly set up
   - Check that the user is authenticated
   - Examine the query structure for errors

3. **Type Errors**

   - Ensure the Database type definition in `src/types/supabase.ts` is up to date
   - Use the Supabase CLI to generate types: `npx supabase gen types typescript --project-id your-project-id`

### Debugging Tips

1. Use `console.log` to inspect the data at different stages of the operation
2. Check the Supabase dashboard for logs and errors
3. Verify that the environment variables are correctly loaded
4. Use the Supabase Studio to run queries directly and check results

For more assistance, refer to the [Supabase documentation](https://supabase.com/docs). 