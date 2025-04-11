# API Endpoints

This document provides details on the API endpoints available in the Dutch Funding Opportunities application.

## Overview

The application uses a combination of:

1. **Supabase API** - Direct database access via the Supabase client
2. **Next.js API Routes** - Custom endpoints for complex operations
3. **Client-side API Modules** - Frontend service layers

## Authentication

All API endpoints that access protected data require authentication. This is handled via:

1. **JWT Tokens** - Automatically managed by the Supabase client
2. **RLS Policies** - Row Level Security at the database level

## API Directory Structure

```
src/
├── api/
│   ├── config.ts                 # API configuration
│   ├── fundingOpportunities.ts   # Funding opportunities API
│   ├── investors.ts              # Investors API
│   ├── pitch.ts                  # Pitch management API
│   ├── supabase/                 # Supabase-specific implementations
│   │   ├── fundingOpportunities.ts
│   │   ├── investors.ts
│   │   ├── pitch.ts
│   │   └── userProgress.ts
│   └── userProgress.ts           # User progress tracking API
├── app/
│   └── api/                      # Next.js API Routes
│       ├── verify-database/
│       └── ...
```

## Core API Modules

### User Progress API (`src/api/userProgress.ts`)

Manages user profiles and progress tracking.

#### Functions

```typescript
// Get user profile
getUserProfile(userId: string): Promise<UserProfile>

// Get user achievements
getUserAchievements(userId: string): Promise<Achievement[]>

// Get all available achievements
getAllAchievements(): Promise<Achievement[]>

// Unlock an achievement for a user
unlockAchievement(userId: string, achievementId: string): Promise<boolean>

// Update user progress
updateUserProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile>

// Create new user profile
createUserProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile>
```

### Investors API (`src/api/investors.ts`)

Manages investor data and related operations.

#### Functions

```typescript
// Get all investors
getInvestors(): Promise<Investor[]>

// Get investors by stage
getInvestorsByStage(stage: string): Promise<Investor[]>

// Get a specific investor by ID
getInvestorById(id: string): Promise<Investor | null>

// Get investors by type
getInvestorsByType(type: string): Promise<Investor[]>

// Get funding opportunities linked to an investor
getLinkedOpportunitiesForInvestor(investorId: string): Promise<FundingOpportunity[]>
```

### Funding Opportunities API (`src/api/fundingOpportunities.ts`)

Manages funding opportunities data.

#### Functions

```typescript
// Get all funding opportunities
getFundingOpportunities(): Promise<FundingOpportunity[]>

// Get funding opportunities by type
getFundingOpportunitiesByType(type: string): Promise<FundingOpportunity[]>

// Get a specific funding opportunity by ID
getFundingOpportunityById(id: string): Promise<FundingOpportunity | null>

// Get funding opportunities by stage
getFundingOpportunitiesByStage(stage: string): Promise<FundingOpportunity[]>

// Get funding opportunities by industry
getFundingOpportunitiesByIndustry(industry: string): Promise<FundingOpportunity[]>

// Search funding opportunities
searchFundingOpportunities(query: string): Promise<FundingOpportunity[]>
```

### Pitch API (`src/api/pitch.ts`)

Manages startup pitches and related data.

#### Functions

```typescript
// Get user's pitch
getUserPitch(userId: string): Promise<Pitch | null>

// Get user's pitch by stage
getUserPitchByStage(userId: string, stage: string): Promise<Pitch | null>

// Create a new pitch
createPitch(userId: string, data: Partial<Pitch>): Promise<Pitch>

// Update an existing pitch
updatePitch(pitchId: string, data: Partial<Pitch>): Promise<Pitch>

// Delete a pitch
deletePitch(pitchId: string): Promise<boolean>

// Get pitch feedback
getPitchFeedback(pitchId: string): Promise<PitchFeedback[]>

// Submit pitch for review
submitPitchForReview(pitchId: string): Promise<boolean>
```

## Next.js API Routes

### Database Verification (`/api/verify-database`)

Verifies the Supabase database connection and configuration.

- **Method**: GET
- **Authentication**: Required
- **Response**: Database status and connection information

```typescript
// Response format
interface DatabaseVerificationResponse {
  success: boolean;
  message: string;
  details: {
    connected: boolean;
    tables: string[];
    missingTables: string[];
    version: string;
  };
}
```

### Database Tables Check (`/api/database-tables-check`)

Checks for the existence of required database tables.

- **Method**: GET
- **Authentication**: Required
- **Response**: Status of required tables

```typescript
// Response format
interface TablesCheckResponse {
  success: boolean;
  message: string;
  tables: {
    [tableName: string]: boolean;
  };
}
```

## Data Models

### User Profile

```typescript
interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  full_name?: string;
  profile_picture?: string;
  user_type: 'founder' | 'investor' | 'admin';
  completed_stages: Record<string, boolean>;
  current_stage?: string;
  pitch_steps_completed: Record<string, boolean>;
  created_at: string;
  updated_at: string;
}
```

### Achievement

```typescript
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  criteria: string;
  points: number;
}
```

### Investor

```typescript
interface Investor {
  id: string;
  name: string;
  description: string;
  logo_url: string;
  website: string;
  investor_type: string;
  focus_sectors: string[];
  focus_stages: string[];
  investment_range_min: number;
  investment_range_max: number;
  location: string;
  contact_email?: string;
  contact_phone?: string;
  created_at: string;
  updated_at: string;
}
```

### Funding Opportunity

```typescript
interface FundingOpportunity {
  id: string;
  title: string;
  description: string;
  provider: string;
  provider_logo?: string;
  opportunity_type: string;
  funding_amount_min?: number;
  funding_amount_max?: number;
  eligibility_criteria: string[];
  application_process: string;
  application_deadline?: string;
  application_link?: string;
  focus_sectors: string[];
  focus_stages: string[];
  success_rate?: string;
  created_at: string;
  updated_at: string;
}
```

### Pitch

```typescript
interface Pitch {
  id: string;
  user_id: string;
  startup_id: string;
  title: string;
  elevator_pitch: string;
  problem_statement: string;
  solution_description: string;
  target_market: string;
  business_model: string;
  competitors: string;
  competitive_advantage: string;
  team_description: string;
  traction: string;
  funding_ask: number;
  funding_use: string;
  financials: Record<string, any>;
  stage: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  feedback?: string;
  created_at: string;
  updated_at: string;
}
```

## Error Handling

API functions follow a consistent error handling pattern:

```typescript
try {
  // API operation
  return result;
} catch (error) {
  console.error(`Error in [operation]: `, error);
  throw error; // or return formatted error
}
```

Client-side error handling:

```typescript
try {
  const result = await apiFunction();
  // Handle success
} catch (error) {
  // Handle error based on type
  if (error.status === 401) {
    // Authentication error
  } else if (error.status === 404) {
    // Not found error
  } else {
    // General error
  }
}
```

## Mock Data

The API layers include mock data implementations for development and testing:

```typescript
// Example mock data implementation
export const mockInvestors: Investor[] = [
  {
    id: 'mock-inv-1',
    name: 'Dutch Venture Capital',
    description: 'Early stage VC firm focused on Dutch tech startups',
    // Other fields...
  },
  // More mock investors...
];
```

When the application is configured to use mock data or Supabase is unavailable, these mock datasets are used instead of making actual API calls.

## API Configuration

The API configuration is managed in `src/api/config.ts`:

```typescript
// Check if Supabase is configured and available
export const isSupabaseAvailable = (): boolean => {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    return Boolean(supabaseUrl && supabaseKey);
  } catch (error) {
    console.error('Error checking Supabase availability:', error);
    return false;
  }
};

// Determine if mock data should be used
export const shouldUseMockData = (): boolean => {
  if (isDevelopment() && !isSupabaseAvailable()) {
    console.log('Using mock data for development');
    return true;
  }
  return false;
};
```

## Rate Limiting

API endpoints implement rate limiting to prevent abuse:

- **Supabase API** - Handled by Supabase's built-in rate limiting
- **Next.js API Routes** - Custom implementation using middleware

Example rate limiting middleware for Next.js API routes:

```typescript
// Rate limiting middleware (simplified example)
export function withRateLimit(handler) {
  return async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const key = `rate-limit:${ip}`;
    
    // Check rate limit logic here
    
    return handler(req, res);
  };
}
```

## Caching

API responses are cached where appropriate to improve performance:

1. **Client-side caching** - Using SWR or React Query
2. **Server-side caching** - Next.js ISR for semi-static data
3. **Database query caching** - Using Supabase's PostgreSQL query cache

Example SWR implementation:

```tsx
import useSWR from 'swr';
import { getInvestors } from '@/api/investors';

function InvestorsList() {
  const { data, error, isLoading } = useSWR('investors', getInvestors);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading investors</div>;
  
  return (
    <ul>
      {data.map(investor => (
        <li key={investor.id}>{investor.name}</li>
      ))}
    </ul>
  );
}
```

## API Evolution and Versioning

As the API evolves, these guidelines are followed:

1. **Backwards compatibility** - Avoid breaking changes to existing endpoints
2. **Deprecation notices** - Mark functions as deprecated before removal
3. **Documentation updates** - Keep this document updated with changes

## Testing API Endpoints

API endpoints are tested with:

1. **Unit tests** - Testing individual API functions
2. **Integration tests** - Testing API function chains
3. **End-to-end tests** - Testing complete API flows

Example test:

```typescript
describe('Investors API', () => {
  it('should return investors filtered by stage', async () => {
    const stage = 'Seed';
    const investors = await getInvestorsByStage(stage);
    
    expect(investors.length).toBeGreaterThan(0);
    investors.forEach(investor => {
      expect(investor.focus_stages).toContain(stage);
    });
  });
});
``` 