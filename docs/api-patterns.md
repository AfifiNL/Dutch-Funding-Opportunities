# API and Data Fetching Patterns

This document outlines the API architecture and data fetching patterns used in the Dutch Funding Opportunities application.

## Table of Contents

- [Overview](#overview)
- [API Layer Architecture](#api-layer-architecture)
- [Data Providers](#data-providers)
  - [Supabase Client](#supabase-client)
  - [Mock Data](#mock-data)
- [Data Fetching Patterns](#data-fetching-patterns)
  - [Client-Side Fetching](#client-side-fetching)
  - [Server Components](#server-components)
  - [API Routes](#api-routes)
- [Error Handling](#error-handling)
- [Caching](#caching)
- [Authentication and Authorization](#authentication-and-authorization)
- [Performance Optimization](#performance-optimization)
- [Common Patterns](#common-patterns)

## Overview

The Dutch Funding Opportunities application uses a multi-layered approach to data fetching, with Supabase as the primary data provider and mock data as a fallback during development or when Supabase credentials are not available.

The API layer follows these design principles:

1. **Abstraction**: The API interface is abstracted from the data source implementation
2. **Flexibility**: Support for multiple data sources (Supabase, mock data)
3. **Type Safety**: All API functions and responses are fully typed
4. **Error Handling**: Consistent error handling across all data fetching operations
5. **Performance**: Optimized for fast data retrieval with caching where appropriate

## API Layer Architecture

The API architecture consists of the following components:

1. **API Interface**: Located in `src/api` directory
2. **Data Providers**:
   - Supabase client (`src/api/supabase/`)
   - Mock data (`src/api/mock-data/`)
3. **Configuration**: API behavior configured via `src/api/config.ts`
4. **Utility Functions**: Common utilities for data transformation and validation

```
src/
├── api/
│   ├── config.ts                 # Configuration for API behavior
│   ├── index.ts                  # Main exports
│   ├── fundingOpportunities.ts   # API for funding opportunities
│   ├── investors.ts              # API for investors
│   ├── pitch.ts                  # API for pitches
│   ├── startups.ts               # API for startups
│   ├── userProgress.ts           # API for user progress/gamification
│   ├── supabase/                 # Supabase-specific implementations
│   │   ├── fundingOpportunities.ts
│   │   ├── investors.ts
│   │   ├── pitch.ts
│   │   ├── startups.ts
│   │   └── userProgress.ts
│   └── types/                    # Type definitions
└── utils/
    └── supabase.ts               # Supabase client initialization
```

## Data Providers

### Supabase Client

The Supabase client is initialized in `src/utils/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

This client is then used in the Supabase-specific implementations in the `src/api/supabase/` directory:

```typescript
// src/api/supabase/investors.ts
import { supabase } from '@/utils/supabase';
import { Investor } from '../investors';

export async function fetchInvestors(): Promise<Investor[]> {
  const { data, error } = await supabase
    .from('investors')
    .select('*');
    
  if (error) {
    console.error('Error fetching investors:', error);
    throw new Error('Failed to fetch investors');
  }
  
  return data || [];
}
```

### Mock Data

Mock data is used as a fallback when Supabase is not available, primarily during development or when running in environments without proper credentials:

```typescript
// src/api/investors.ts
import { isSupabaseAvailable } from './config';
import { fetchInvestors as fetchSupabaseInvestors } from './supabase/investors';

// Mock data
const mockInvestors: Investor[] = [
  {
    id: 'mock-1',
    name: 'Mock Investor 1',
    // ...other properties
  },
  // ...more mock investors
];

export async function getInvestors(): Promise<Investor[]> {
  if (isSupabaseAvailable()) {
    try {
      return await fetchSupabaseInvestors();
    } catch (error) {
      console.error('Error fetching investors from Supabase:', error);
      console.warn('Falling back to mock data');
      return mockInvestors;
    }
  }
  
  return mockInvestors;
}
```

## Data Fetching Patterns

The application employs several data fetching patterns:

### Client-Side Fetching

For interactive components where data needs to be fetched on the client side:

```typescript
// Example using React hooks
import { useState, useEffect } from 'react';
import { getInvestors } from '@/api/investors';

function InvestorsList() {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getInvestors();
        setInvestors(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <ul>
      {investors.map(investor => (
        <li key={investor.id}>{investor.name}</li>
      ))}
    </ul>
  );
}
```

### Server Components

For Next.js server components, data is fetched directly on the server:

```typescript
// src/app/investors/page.tsx
import { getInvestors } from '@/api/investors';
import InvestorCard from '@/components/InvestorCard';

export const revalidate = 3600; // Revalidate every hour

export default async function InvestorsPage() {
  const investors = await getInvestors();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {investors.map(investor => (
        <InvestorCard key={investor.id} investor={investor} />
      ))}
    </div>
  );
}
```

### API Routes

For operations that require server-side processing or need to hide credentials:

```typescript
// src/app/api/investors/route.ts
import { NextResponse } from 'next/server';
import { getInvestors } from '@/api/investors';

export async function GET() {
  try {
    const investors = await getInvestors();
    return NextResponse.json(investors);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch investors' },
      { status: 500 }
    );
  }
}
```

## Error Handling

The application follows a consistent pattern for error handling:

```typescript
// Standard try/catch pattern
export async function getInvestorById(id: string): Promise<Investor | null> {
  if (isSupabaseAvailable()) {
    try {
      return await fetchInvestorById(id);
    } catch (error) {
      console.error(`Error fetching investor ${id}:`, error);
      
      // Log to monitoring service in production
      if (process.env.NODE_ENV === 'production') {
        // logErrorToMonitoring(error);
      }
      
      // Fall back to mock data in development
      if (process.env.NODE_ENV === 'development') {
        console.warn('Falling back to mock data');
        return mockInvestors.find(investor => investor.id === id) || null;
      }
      
      throw error; // Re-throw in production
    }
  }
  
  return mockInvestors.find(investor => investor.id === id) || null;
}
```

For components that fetch data, a standard error state pattern is used:

```typescript
// Error state pattern for components
function DataComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ... fetching logic with try/catch ...
  
  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorDisplay message={error.message} />;
  if (!data) return <EmptyState />;
  
  return <DataDisplay data={data} />;
}
```

## Caching

The application implements several caching strategies:

1. **SWR (Stale-While-Revalidate)** for client-side data fetching:

```typescript
import useSWR from 'swr';
import { getInvestorById } from '@/api/investors';

function InvestorProfile({ investorId }) {
  const { data, error, isLoading } = useSWR(
    `investor-${investorId}`,
    () => getInvestorById(investorId),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 60000 * 5, // Refresh every 5 minutes
    }
  );
  
  // ... component rendering logic ...
}
```

2. **Next.js Cache** for server components:

```typescript
// src/app/investors/[id]/page.tsx
import { getInvestorById } from '@/api/investors';

// ISR - Incremental Static Regeneration
export const revalidate = 3600; // 1 hour

export default async function InvestorPage({ params }) {
  const { id } = params;
  const investor = await getInvestorById(id);
  
  if (!investor) {
    return <div>Investor not found</div>;
  }
  
  return (
    <div>
      <h1>{investor.name}</h1>
      {/* ... */}
    </div>
  );
}
```

3. **Local Storage Cache** for persistent data:

```typescript
// src/utils/cache.ts
export function getFromCache<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const item = localStorage.getItem(`cache_${key}`);
    if (!item) return null;
    
    const { value, expiry } = JSON.parse(item);
    if (expiry && Date.now() > expiry) {
      localStorage.removeItem(`cache_${key}`);
      return null;
    }
    
    return value as T;
  } catch (error) {
    console.error('Cache retrieval error:', error);
    return null;
  }
}

export function setInCache<T>(
  key: string, 
  value: T, 
  expiryInMinutes: number = 60
): void {
  if (typeof window === 'undefined') return;
  
  try {
    const expiry = expiryInMinutes > 0 
      ? Date.now() + (expiryInMinutes * 60 * 1000)
      : null;
      
    localStorage.setItem(
      `cache_${key}`,
      JSON.stringify({ value, expiry })
    );
  } catch (error) {
    console.error('Cache storage error:', error);
  }
}
```

## Authentication and Authorization

API functions that require authentication check for an authenticated user:

```typescript
// src/api/pitch.ts
import { supabase } from '@/utils/supabase';

export async function createPitch(pitchData: PitchInput): Promise<Pitch | null> {
  // Check for authenticated user
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error('Authentication required');
  }
  
  const userId = session.user.id;
  
  // Add user ID to pitch data
  const dataWithUser = {
    ...pitchData,
    founder_id: userId,
  };
  
  // Create the pitch
  const { data, error } = await supabase
    .from('pitches')
    .insert(dataWithUser)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating pitch:', error);
    throw new Error('Failed to create pitch');
  }
  
  return data;
}
```

## Performance Optimization

The API layer implements several performance optimizations:

1. **Selective Columns**: Only requesting needed fields:

```typescript
const { data } = await supabase
  .from('investors')
  .select('id, name, logo_url, focus_areas')
  .eq('active', true);
```

2. **Pagination**: For large datasets:

```typescript
export async function getFundingOpportunities(
  page: number = 1,
  pageSize: number = 10
): Promise<{ data: FundingOpportunity[]; count: number }> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;
  
  const { data, error, count } = await supabase
    .from('funding_opportunities')
    .select('*', { count: 'exact' })
    .range(start, end);
  
  if (error) {
    console.error('Error fetching funding opportunities:', error);
    throw new Error('Failed to fetch funding opportunities');
  }
  
  return { data: data || [], count: count || 0 };
}
```

3. **Minimal Network Requests**: Combining related data in single requests:

```typescript
// Fetch investor with related opportunities in a single query
const { data } = await supabase
  .from('investors')
  .select(`
    *,
    funding_opportunities(*)
  `)
  .eq('id', investorId)
  .single();
```

## Common Patterns

### Data Transformation

API functions often transform data between database schema and application model:

```typescript
function transformDatabaseUser(dbUser: DatabaseUser): User {
  return {
    id: dbUser.id,
    name: dbUser.full_name,
    email: dbUser.email,
    role: dbUser.user_type,
    createdAt: new Date(dbUser.created_at),
    profileCompleted: Boolean(dbUser.profile_completed),
    // Transform nested properties
    preferences: dbUser.preferences 
      ? JSON.parse(dbUser.preferences)
      : defaultPreferences,
    // Add computed properties
    isAdmin: dbUser.user_type === 'admin',
  };
}
```

### Optimistic Updates

For better user experience, some operations use optimistic updates:

```typescript
function StarButton({ investorId, initialStarred = false }) {
  const [isStarred, setIsStarred] = useState(initialStarred);
  const [isPending, setIsPending] = useState(false);
  
  const toggleStar = async () => {
    // Optimistically update UI
    setIsStarred(!isStarred);
    setIsPending(true);
    
    try {
      await updateInvestorStar(investorId, !isStarred);
      // Success - UI already updated
    } catch (error) {
      // Revert optimistic update on failure
      setIsStarred(isStarred);
      toast.error('Failed to update starred status');
    } finally {
      setIsPending(false);
    }
  };
  
  return (
    <button 
      onClick={toggleStar} 
      disabled={isPending}
      className={isStarred ? 'starred' : ''}
    >
      {isStarred ? 'Starred' : 'Star'}
    </button>
  );
}
```

### Retry Logic

For operations that might fail due to network issues:

```typescript
async function fetchWithRetry<T>(
  fetchFn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fetchFn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < maxRetries - 1) {
        // Wait before retrying (with exponential backoff)
        await new Promise(resolve => 
          setTimeout(resolve, delay * Math.pow(2, attempt))
        );
      }
    }
  }
  
  throw lastError!;
}

// Usage
const data = await fetchWithRetry(() => getInvestors());
```

---

This document provides a comprehensive overview of the API architecture and data fetching patterns used in the Dutch Funding Opportunities application. Developers should refer to this guide when working with data fetching operations or adding new API functionality. 