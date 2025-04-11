# Frontend Architecture

This document provides a comprehensive overview of the frontend architecture used in the Dutch Funding Opportunities application.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Application Structure](#application-structure)
- [Component Design](#component-design)
- [State Management](#state-management)
- [Routing](#routing)
- [Styling Approach](#styling-approach)
- [Custom Hooks](#custom-hooks)
- [Performance Optimizations](#performance-optimizations)
- [Responsive Design](#responsive-design)
- [Authentication Flow](#authentication-flow)
- [Best Practices](#best-practices)

## Overview

The frontend of the Dutch Funding Opportunities application is built using a modern React-based stack with Next.js at its core. The architecture follows a component-based approach with clear separation of concerns, reusable UI elements, and centralized state management for authentication and user data.

## Technology Stack

The frontend is built using the following technologies:

- **Next.js**: Framework for server-rendered React applications
- **React**: JavaScript library for building user interfaces
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Library for animations and transitions
- **React Hook Form**: For form validation and handling
- **SWR**: For data fetching, caching and revalidation

## Application Structure

The application follows a feature-based directory structure to organize code:

```
src/
├── app/                      # Next.js app directory (pages and layouts)
│   ├── api/                  # API routes
│   ├── auth/                 # Authentication pages
│   ├── profile/              # User profile pages
│   ├── reset-password/       # Password reset functionality
│   ├── layout.tsx            # Root layout component
│   └── page.tsx              # Home page
├── components/               # Shared UI components
│   ├── auth/                 # Authentication-related components
│   ├── Button.tsx            # Reusable button component
│   ├── Card.tsx             # Card container component
│   ├── Header.tsx            # Site header
│   ├── IconSet.tsx           # SVG icons collection
│   ├── LoadingSpinner.tsx    # Loading indicator
│   └── UserMenu.tsx          # User dropdown menu
├── contexts/                 # React context providers
│   └── AuthContext.tsx       # Authentication state management
├── features/                 # Feature-specific components
│   ├── funding-display/      # Funding opportunities display
│   ├── hero/                 # Hero section components
│   ├── interactive-character/# Interactive guide character
│   └── investor-panel/       # Investor information panel
├── hooks/                    # Custom React hooks
│   ├── useAuth.ts            # Authentication hook
│   ├── useInvestors.ts       # Investor data hook
│   ├── useMediaQuery.ts      # Responsive design hook
│   ├── usePitchFeedback.ts   # Pitch feedback hook
│   └── useUserProgress.ts    # User progress hook
├── utils/                    # Utility functions
└── types/                    # TypeScript type definitions
```

## Component Design

The application follows a hierarchical component structure:

1. **Layout Components**: Define the overall structure (app/layout.tsx)
2. **Page Components**: Top-level components for each route (app/*/page.tsx)
3. **Feature Components**: Domain-specific components in the features directory
4. **UI Components**: Reusable UI elements in the components directory

### Component Principles

- **Single Responsibility**: Each component has a clear, focused purpose
- **Composition**: Complex UIs are built by composing smaller components
- **Prop Typing**: All components have well-defined TypeScript interfaces
- **Client/Server Components**: Appropriate use of Next.js client and server components

### Sample Component

```tsx
// src/components/Button.tsx
'use client';

import React from 'react';
import clsx from 'clsx';
import { motion, HTMLMotionProps } from 'framer-motion';

type ButtonMotionProps = Omit<HTMLMotionProps<"button">, "className" | "children"> & {
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
};

const Button: React.FC<ButtonMotionProps> = ({
  children,
  className,
  variant = 'primary',
  icon,
  fullWidth = false,
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={clsx(
        'btn',
        variant === 'primary' ? 'btn-primary' : 'btn-secondary',
        fullWidth ? 'w-full' : '',
        className
      )}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;
```

## State Management

The application uses a combination of state management approaches:

### Local Component State

For UI state that's specific to a component, React's `useState` hook is used:

```tsx
const [isOpen, setIsOpen] = useState(false);
```

### Context API

For shared state across components, React Context is used:

- **AuthContext**: Manages authentication state throughout the application
- **UserProgressContext**: Tracks user progress and achievements (implemented through hooks)

### AuthContext Example

```tsx
// src/contexts/AuthContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabase';
import { signIn, signOut, signUp, getCurrentUser, resetPassword } from '@/utils/auth';

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

const AuthContext = createContext<AuthContextType>({/* default values */});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Implementation details...
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

### Remote Data Management

For server data, the application uses custom hooks with SWR for data fetching and caching:

```tsx
const { investors, loading, error, refetch } = useInvestors();
```

## Routing

The application uses Next.js App Router for navigation:

### Page Structure

- **Static Routes**: Defined by folders in the `app` directory
- **Dynamic Routes**: Using folder names with brackets (e.g., `[id]`)
- **Route Groups**: Using folders with parentheses to organize without affecting URL structure

### Navigation

Navigation is handled using Next.js's `Link` component and the `useRouter` hook:

```tsx
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Link component for declarative navigation
<Link href="/profile">Go to Profile</Link>

// useRouter for programmatic navigation
const router = useRouter();
router.push('/dashboard');
```

## Styling Approach

The application uses Tailwind CSS for styling with a consistent design system:

### Tailwind Utilities

Styles are primarily applied using Tailwind utility classes:

```tsx
<div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold text-white">Dashboard</h2>
</div>
```

### Custom Classes

Custom component styles are extended when needed:

```css
/* In globals.css */
@layer components {
  .btn {
    @apply px-4 py-2 rounded-md font-medium transition-all duration-200;
  }
  
  .btn-primary {
    @apply bg-blue-600 text-white hover:bg-blue-700;
  }
  
  .btn-secondary {
    @apply bg-gray-700 text-white hover:bg-gray-800;
  }
}
```

### Animation

Framer Motion is used for animations:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

## Custom Hooks

The application uses custom hooks to encapsulate and reuse logic:

### Data Fetching Hooks

```tsx
// src/hooks/useInvestors.ts
export function useInvestors(stage?: string | number): UseInvestorsResult {
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = stage !== undefined
          ? await getInvestorsByStage(stage.toString())
          : await getInvestors();
        setInvestors(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [stage]);
  
  return { investors, loading, error, refetch: () => fetchData() };
}
```

### Utility Hooks

```tsx
// src/hooks/useMediaQuery.ts
export default function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const media = window.matchMedia(query);
    const updateMatch = () => setMatches(media.matches);
    
    updateMatch();
    media.addEventListener('change', updateMatch);
    
    return () => media.removeEventListener('change', updateMatch);
  }, [query]);
  
  return matches;
}
```

## Performance Optimizations

The application includes several performance optimizations:

### Code Splitting

Next.js automatically splits code by page. Additional splitting can be done with dynamic imports:

```tsx
const DynamicComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false // Optional: disable server rendering
});
```

### Image Optimization

Next.js Image component is used for optimized image loading:

```tsx
import Image from 'next/image';

<Image 
  src="/images/logo.png"
  alt="Logo"
  width={200}
  height={100}
  priority // For above-the-fold images
/>
```

### Component Memoization

React.memo is used for expensive components that don't change often:

```tsx
const ExpensiveComponent = React.memo(({ data }) => {
  // Render expensive content
});
```

## Responsive Design

The application is fully responsive, using a mobile-first approach:

### Breakpoints

Tailwind CSS breakpoints are used consistently throughout the application:

- **sm**: 640px and up
- **md**: 768px and up
- **lg**: 1024px and up
- **xl**: 1280px and up
- **2xl**: 1536px and up

### Media Queries Hook

The `useMediaQuery` hook is used for responsive behavior in JavaScript:

```tsx
const isMobile = useMediaQuery('(max-width: 767px)');
const isTabletOrLarger = useMediaQuery('(min-width: 768px)');

return (
  <div>
    {isMobile && <MobileNav />}
    {isTabletOrLarger && <DesktopNav />}
  </div>
);
```

## Authentication Flow

The authentication flow is managed through the AuthContext and related components:

### Sign Up Process

1. User completes signup form in `/auth/signup`
2. Form data is validated with React Hook Form
3. `AuthContext.signUp()` is called with email and password
4. User is redirected to email verification page
5. After verification, user is prompted to complete profile

### Sign In Process

1. User enters credentials in `/auth/signin`
2. `AuthContext.signIn()` authenticates with Supabase
3. On success, user is redirected to dashboard or intended page
4. Session is maintained via Supabase's JWT token

### Password Reset

1. User requests password reset at `/auth/forgot-password`
2. Email is sent with reset link
3. User clicks link and lands on `/reset-password` with token parameter
4. New password is submitted and processed by Supabase

## Best Practices

### Code Organization

- Keep components focused on a single responsibility
- Extract reusable logic into custom hooks
- Group related files in feature directories
- Use TypeScript interfaces to define component props and data structures

### Performance

- Memoize expensive calculations and components
- Optimize bundle size with code splitting
- Avoid unnecessary re-renders with proper dependency arrays in useEffect
- Use server components for static content where possible

### Accessibility

- Use semantic HTML elements
- Implement keyboard navigation
- Ensure sufficient color contrast
- Add aria attributes where needed
- Test with screen readers

### Testing

- Write unit tests for utility functions and hooks
- Use React Testing Library for component tests
- Implement integration tests for critical user flows
- Test responsive behavior across device sizes

## Conclusion

The frontend architecture of the Dutch Funding Opportunities application is designed to be modular, performant, and maintainable. By following the patterns and practices outlined in this document, developers can effectively contribute to and extend the application's frontend capabilities. 