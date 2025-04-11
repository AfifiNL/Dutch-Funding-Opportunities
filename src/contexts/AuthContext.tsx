'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabase';
import { signIn, signOut, signUp, getCurrentUser, resetPassword } from '@/utils/auth';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, userData?: any) => Promise<{
    error: any;
    data: any;
  }>;
  signIn: (email: string, password: string) => Promise<{
    error: any;
    data: any;
  }>;
  signOut: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  error: string | null;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  signUp: async () => ({ error: null, data: null }),
  signIn: async () => ({ error: null, data: null }),
  signOut: async () => false,
  resetPassword: async () => false,
  error: null,
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component to wrap the application
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Sign up handler
  const handleSignUp = async (email: string, password: string, userData?: any) => {
    setError(null);
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });
      
      if (error) {
        setError(error.message);
        return { error, data: null };
      }
      
      if (data.user && userData) {
        const { error: profileError } = await supabase.from('profiles').insert({
          id: data.user.id,
          email: email,
          full_name: userData.full_name || email,
          user_type: userData.user_type || 'founder',
        });
        
        if (profileError) {
          console.error('Error creating profile:', profileError);
        }
      }
      
      return { data, error: null };
    } catch (error: any) {
      console.error('Error signing up:', error);
      setError(error.message);
      return { error, data: null };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in handler
  const handleSignIn = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        setError(error.message);
        return { error, data: null };
      }
      
      return { data, error: null };
    } catch (error: any) {
      console.error('Error signing in:', error);
      setError(error.message);
      return { error, data: null };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out handler
  const handleSignOut = async () => {
    setError(null);
    setIsLoading(true);
    try {
      // First, call the signOut utility function to sign out from Supabase
      const success = await signOut();
      
      // Explicitly set user and session to null regardless of the result
      // This ensures we clear our app state even if Supabase had an issue
      setUser(null);
      setSession(null);
      
      console.log('Sign out completed, success:', success);
      return success;
    } catch (error: any) {
      console.error('Error signing out:', error);
      // Still clear local state even if there was an error with Supabase
      setUser(null);
      setSession(null);
      setError(error.message || 'An error occurred during sign out');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Password reset handler
  const handleResetPassword = async (email: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const success = await resetPassword(email);
      if (!success) {
        setError('Password reset request failed');
      }
      return success;
    } catch (error) {
      console.error('Password reset error:', error);
      setError('An error occurred during password reset');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // The auth context value
  const value = {
    user,
    session,
    isLoading,
    signUp: handleSignUp,
    signIn: handleSignIn,
    signOut: handleSignOut,
    resetPassword: handleResetPassword,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};