# Hooks and Utilities Documentation

This document provides detailed information about the custom React hooks and utility functions used in the Dutch Funding Opportunities application.

## Table of Contents

- [Overview](#overview)
- [Authentication Hooks](#authentication-hooks)
- [Data Fetching Hooks](#data-fetching-hooks)
- [UI Hooks](#ui-hooks)
- [Feature-Specific Hooks](#feature-specific-hooks)
- [Utility Functions](#utility-functions)
- [Testing Utilities](#testing-utilities)
- [Best Practices](#best-practices)

## Overview

Custom hooks and utilities in this application improve code reusability, separation of concerns, and readability. They abstract away complex logic and side effects, allowing components to focus on rendering UI.

## Authentication Hooks

### useAuth

The primary hook for authentication-related functionality throughout the application. It provides access to the current user, session, and authentication methods.

**Returns:**
- `user`: The current authenticated user or null
- `session`: The current Supabase session or null
- `isLoading`: Boolean indicating if authentication state is loading
- `signUp`: Function to register a new user
- `signIn`: Function to authenticate a user
- `signOut`: Function to log out
- `resetPassword`: Function to initiate password reset
- `error`: Any authentication error message or null

**Example:**
```tsx
import { useAuth } from '@/hooks/useAuth';

function ProfileButton() {
  const { user, signOut, isLoading } = useAuth();
  
  if (isLoading) return <LoadingSpinner size="small" />;
  
  if (!user) {
    return <Button href="/auth/signin">Sign In</Button>;
  }
  
  return (
    <Button onClick={() => signOut()}>
      Sign Out
    </Button>
  );
}
```

**Implementation:**
```tsx
// Simple re-export from the context
import { useAuth as useAuthContext } from '@/contexts/AuthContext';
export const useAuth = useAuthContext;
```

## Data Fetching Hooks

### useInvestors

Hook for fetching and managing investor data.

**Parameters:**
- `stage`: (Optional) Filter investors by stage

**Returns:**
- `investors`: Array of investor objects
- `loading`: Boolean indicating if data is loading
- `error`: Error object or null
- `refetch`: Function to manually refetch data

**Example:**
```tsx
import { useInvestors } from '@/hooks/useInvestors';

function InvestorsList() {
  const { investors, loading, error } = useInvestors('Seed');
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  
  return (
    <div className="grid gap-4">
      {investors.map(investor => (
        <InvestorCard key={investor.id} investor={investor} />
      ))}
    </div>
  );
}
```

### useFundingOpportunities

Hook for fetching and managing funding opportunities data.

**Parameters:**
- `type`: (Optional) Filter opportunities by type
- `sector`: (Optional) Filter opportunities by sector

**Returns:**
- `opportunities`: Array of funding opportunity objects
- `loading`: Boolean indicating if data is loading
- `error`: Error object or null
- `refetch`: Function to manually refetch data
- `filterByType`: Function to filter results by type
- `filterBySector`: Function to filter results by sector
- `searchOpportunities`: Function to search opportunities by keyword

**Example:**
```tsx
import { useFundingOpportunities } from '@/hooks/useFundingOpportunities';

function FundingList() {
  const { 
    opportunities, 
    loading, 
    error, 
    filterByType 
  } = useFundingOpportunities();
  
  // Filter for only grants
  const handleShowGrantsOnly = () => {
    filterByType('grant');
  };
  
  // Render funding opportunities...
}
```

## UI Hooks

### useMediaQuery

Hook for responsive design that detects when a media query matches.

**Parameters:**
- `query`: CSS media query string

**Returns:**
- Boolean indicating if the media query matches

**Example:**
```tsx
import useMediaQuery from '@/hooks/useMediaQuery';

function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  
  return (
    <div>
      {isMobile && <MobileView />}
      {isTablet && <TabletView />}
      {isDesktop && <DesktopView />}
    </div>
  );
}
```

**Implementation:**
```tsx
export default function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    // Early return if not in browser environment
    if (typeof window === 'undefined') return;
    
    const media = window.matchMedia(query);
    
    // Update matches state initially
    setMatches(media.matches);
    
    // Define listener for subsequent changes
    const listener = () => setMatches(media.matches);
    
    // Add listener with compatibility for older browsers
    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } else {
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [query]);
  
  return matches;
}
```

## Feature-Specific Hooks

### useUserProgress

Hook for tracking and updating user progress and achievements.

**Parameters:**
- `userId`: The ID of the user to track progress for

**Returns:**
- `userProfile`: User profile with progress data
- `loading`: Boolean indicating if data is loading
- `error`: Error object or null
- `updateProgress`: Function to update progress
- `unlockAchievement`: Function to unlock a new achievement
- `achievements`: Array of user achievements
- `completedStages`: Array of completed stage IDs

**Example:**
```tsx
import { useUserProgress } from '@/hooks/useUserProgress';

function UserProgressIndicator() {
  const { userProfile, achievements, loading } = useUserProgress();
  
  if (loading) return <LoadingSpinner />;
  
  return (
    <div>
      <ProgressBar value={userProfile.profileCompletion} max={100} />
      <div className="mt-2">
        <span>Level {userProfile.level}</span>
        <span className="ml-2">{userProfile.xpPoints} XP</span>
      </div>
      <div className="mt-4">
        <h3>Achievements ({achievements.length})</h3>
        {/* Render achievements */}
      </div>
    </div>
  );
}
```

### usePitchFeedback

Hook for managing pitch feedback data and interactions.

**Parameters:**
- `pitchId`: The ID of the pitch to get feedback for

**Returns:**
- `feedback`: Array of feedback objects
- `loading`: Boolean indicating if data is loading
- `error`: Error object or null
- `addFeedback`: Function to add new feedback
- `updateFeedback`: Function to update existing feedback

**Example:**
```tsx
import { usePitchFeedback } from '@/hooks/usePitchFeedback';

function PitchFeedbackSection({ pitchId }) {
  const { feedback, loading, addFeedback } = usePitchFeedback(pitchId);
  const [newComment, setNewComment] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    addFeedback({
      comment: newComment,
      rating: 4,
    });
    setNewComment('');
  };
  
  // Render feedback form and list
}
```

## Utility Functions

### date.ts

Utilities for date formatting and manipulation.

**Functions:**
- `formatDate(date: Date | string, format?: string): string`: Format a date
- `relativeTime(date: Date | string): string`: Get relative time (e.g., "2 days ago")
- `isDateInPast(date: Date | string): boolean`: Check if date is in the past
- `isDateInFuture(date: Date | string): boolean`: Check if date is in the future

**Example:**
```tsx
import { formatDate, relativeTime } from '@/utils/date';

const formattedDate = formatDate(opportunity.deadline, 'MMM D, YYYY');
const relativeDeadline = relativeTime(opportunity.deadline);

<div>
  <span>Deadline: {formattedDate}</span>
  <span className="text-gray-400 ml-2">({relativeDeadline})</span>
</div>
```

### currency.ts

Utilities for currency formatting.

**Functions:**
- `formatCurrency(amount: number, currency: string = 'EUR'): string`: Format amount as currency
- `formatRange(min?: number, max?: number, currency: string = 'EUR'): string`: Format a funding range

**Example:**
```tsx
import { formatCurrency, formatRange } from '@/utils/currency';

const amount = formatCurrency(50000); // "€50,000"
const range = formatRange(25000, 100000); // "€25,000 - €100,000"

<div>
  <span>Funding: {range}</span>
  <span>Average: {amount}</span>
</div>
```

### supabase.ts

Utilities for Supabase operations and error handling.

**Functions:**
- `handleSupabaseError(error: any, operation: string): never`: Consistent error handling for Supabase operations
- `formatTimestamp(timestamp: string | null): string`: Format Supabase timestamps
- `isAuthenticated(): Promise<boolean>`: Check if user is authenticated
- `getCurrentUser(): Promise<User | null>`: Get the current authenticated user

**Example:**
```tsx
import { handleSupabaseError } from '@/utils/supabase';

try {
  // Supabase operation
} catch (error) {
  handleSupabaseError(error, 'fetching user profile');
}
```

### auth.ts

Utilities for authentication operations.

**Functions:**
- `signIn(email: string, password: string): Promise<any>`: Sign in a user
- `signUp(email: string, password: string): Promise<any>`: Register a new user
- `signOut(): Promise<boolean>`: Sign out the current user
- `resetPassword(email: string): Promise<boolean>`: Request password reset
- `getCurrentUser(): Promise<User | null>`: Get the current user

**Example:**
```tsx
import { signIn } from '@/utils/auth';

const handleLogin = async (credentials) => {
  try {
    const result = await signIn(credentials.email, credentials.password);
    if (result) {
      // Success handling
    }
  } catch (error) {
    // Error handling
  }
};
```

## Testing Utilities

### test-utils.tsx

Utilities for testing components and hooks.

**Functions:**
- `renderWithProviders(ui: React.ReactElement, options?: RenderOptions): RenderResult`: Render a component with all required providers
- `createMockUser(): User`: Create a mock user for testing
- `mockAuthContext(overrides?: Partial<AuthContextType>): AuthContextType`: Mock auth context for testing

**Example:**
```tsx
import { renderWithProviders, createMockUser } from '@/utils/test-utils';

describe('ProfileComponent', () => {
  it('renders user information correctly', () => {
    const mockUser = createMockUser();
    
    const { getByText } = renderWithProviders(
      <ProfileComponent userId={mockUser.id} />
    );
    
    expect(getByText(mockUser.email)).toBeInTheDocument();
  });
});
```

## Best Practices

### When to Create a Custom Hook

Create a custom hook when:

1. **Reusing Stateful Logic**: Several components need the same state management
2. **Managing Side Effects**: Handling complex effects (API calls, subscriptions)
3. **Abstracting Complex Logic**: Hide implementation details from components
4. **Encapsulating Related Functionality**: Group related functions and state

### Hook Naming Conventions

- Prefix all hooks with `use` (e.g., `useInvestors`)
- Name should clearly describe the hook's purpose
- Use camelCase for naming

### Hook Implementation Guidelines

1. **Single Responsibility**: Each hook should have a clear, focused purpose
2. **Type Safety**: Use TypeScript for parameter and return types
3. **Error Handling**: Include robust error handling in all hooks
4. **Loading States**: Expose loading states for asynchronous operations
5. **Cleanup**: Clear subscriptions and listeners in useEffect cleanup functions

### Example: Creating a New Hook

```tsx
// src/hooks/useFilters.ts
import { useState, useCallback } from 'react';

interface UseFiltersOptions<T> {
  initialItems: T[];
  filterFn?: (item: T, filters: Record<string, any>) => boolean;
}

export function useFilters<T>({ initialItems, filterFn }: UseFiltersOptions<T>) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [filters, setFilters] = useState<Record<string, any>>({});
  
  const applyFilters = useCallback(() => {
    if (!filterFn) return initialItems;
    
    return initialItems.filter(item => filterFn(item, filters));
  }, [initialItems, filters, filterFn]);
  
  const updateFilter = useCallback((key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    
    setItems(applyFilters());
  }, [applyFilters]);
  
  const clearFilters = useCallback(() => {
    setFilters({});
    setItems(initialItems);
  }, [initialItems]);
  
  return {
    items,
    filters,
    updateFilter,
    clearFilters
  };
}
```

---

This documentation provides a comprehensive overview of the custom hooks and utility functions used in the Dutch Funding Opportunities application. By leveraging these tools, developers can build components that are more focused, maintainable, and consistent. 