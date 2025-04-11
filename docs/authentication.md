# Authentication System

This document details the authentication system used in the Dutch Funding Opportunities application, which is built using Supabase Auth.

## Overview

The application uses Supabase Authentication to manage user accounts, authentication flows, and session handling. Supabase provides a complete authentication system with multiple providers and security features.

## Authentication Flow

1. **User Registration**: New users can create accounts using email/password or social providers
2. **User Login**: Returning users authenticate through their chosen method
3. **Session Management**: JWT tokens handle user sessions and authorization
4. **Password Recovery**: Email-based password reset functionality
5. **Account Verification**: Email verification for new accounts

## Implementation

### AuthContext

The application uses a React Context (`AuthContext`) to manage authentication state and provide authentication functions throughout the application:

```typescript
// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updatePassword: (newPassword: string) => Promise<{ error: any }>;
}

// Context implementation
// ...
```

### User Registration

```typescript
// New user registration
const signUp = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { error };
  } catch (error) {
    console.error('Error during sign up:', error);
    return { error };
  }
};
```

### User Login

```typescript
// User login
const signIn = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  } catch (error) {
    console.error('Error during sign in:', error);
    return { error };
  }
};
```

### User Logout

```typescript
// User logout
const signOut = async () => {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Error during sign out:', error);
  }
};
```

### Password Reset

Password reset is a two-step process:

1. **Request Reset**:
```typescript
// Request password reset
const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error };
  } catch (error) {
    console.error('Error during password reset request:', error);
    return { error };
  }
};
```

2. **Update Password** (after user clicks the email link):
```typescript
// Update password with new one
const updatePassword = async (newPassword: string) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    return { error };
  } catch (error) {
    console.error('Error updating password:', error);
    return { error };
  }
};
```

## Authentication UI Components

### Login Component

```tsx
// src/app/login/page.tsx
'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard');
    }
  };

  // JSX form implementation
  // ...
}
```

### Registration Component

```tsx
// src/app/register/page.tsx
'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    const { error } = await signUp(email, password);
    
    if (error) {
      setError(error.message);
    } else {
      router.push('/verify-email');
    }
  };

  // JSX form implementation
  // ...
}
```

### Password Reset Component

```tsx
// src/app/reset-password/page.tsx
'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { updatePassword } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    const { error } = await updatePassword(password);
    
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    }
  };

  // JSX form implementation
  // ...
}
```

## Protected Routes

The application uses a higher-order component to protect routes that require authentication:

```tsx
// src/components/ProtectedRoute.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <>{children}</> : null;
}
```

## Row Level Security (RLS)

Supabase uses Row Level Security (RLS) to restrict access to data at the database level. The application implements the following policies:

### Profile Table Policy

```sql
-- Allow users to read only their own profile
CREATE POLICY "Users can view their own profiles" 
ON profiles FOR SELECT 
USING (auth.uid() = user_id);

-- Allow users to update only their own profile
CREATE POLICY "Users can update their own profiles" 
ON profiles FOR UPDATE 
USING (auth.uid() = user_id);
```

### Startups Table Policy

```sql
-- Allow authenticated users to view startups
CREATE POLICY "Anyone can view startups" 
ON startups FOR SELECT 
TO authenticated
USING (true);

-- Allow users to manage only their own startups
CREATE POLICY "Users can manage their own startups" 
ON startups FOR ALL 
USING (auth.uid() = founder_id);
```

## Social Authentication

The application supports social authentication through:

1. Google
2. LinkedIn
3. GitHub

Configuration for social providers is managed through the Supabase dashboard.

## Security Considerations

1. **JWT Tokens**: Short-lived access tokens with refresh token rotation
2. **PKCE Flow**: For OAuth providers to prevent CSRF attacks
3. **Password Policies**: Minimum length and complexity requirements
4. **Rate Limiting**: Prevents brute force attacks
5. **Email Verification**: Required for new accounts
6. **Session Management**: Automatic token refresh

## Testing Authentication

### Manual Testing

1. Register a new account
2. Verify email through the link sent
3. Log in with credentials
4. Test password reset flow
5. Test social authentication
6. Test logout functionality
7. Test access to protected routes

### Automated Testing

```typescript
// Example test for authentication
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '@/app/login/page';
import { AuthProvider } from '@/contexts/AuthContext';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Login Component', () => {
  it('handles user login correctly', async () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(screen.queryByText(/invalid email or password/i)).not.toBeInTheDocument();
    });
  });
});
```

## Troubleshooting

### Common Issues

1. **JWT Validation Failure**
   - Check if the token has expired
   - Ensure the token signature is valid
   - Verify the token was issued by your Supabase instance

2. **Email Verification Problems**
   - Ensure email service is configured correctly
   - Check spam folders for verification emails
   - Verify redirect URLs are correctly set

3. **Social Auth Failures**
   - Verify OAuth credentials are correctly set in Supabase
   - Ensure redirect URIs match the application URLs
   - Check for CORS issues with redirect domains

## Best Practices

1. Always use HTTPS for all authentication requests
2. Implement proper error handling and user feedback
3. Limit the number of failed login attempts
4. Store user data securely with appropriate RLS policies
5. Never store sensitive authentication data in local storage
6. Implement proper session timeout and refresh mechanisms
7. Use environment variables for all auth configuration
8. Regularly audit authentication logs for suspicious activity 