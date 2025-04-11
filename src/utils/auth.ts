import { supabase, handleSupabaseError } from './supabase';
import { Session, User } from '@supabase/supabase-js';

/**
 * Sign up a new user with email and password
 * @param email User's email
 * @param password User's password
 * @returns The newly created user or null if error
 */
export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password 
    });
    
    if (error) {
      handleSupabaseError(error, 'sign up');
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error during signup:', error);
    return null;
  }
}

/**
 * Sign in a user with email and password
 * @param email User's email
 * @param password User's password
 * @returns The user session or null if error
 */
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });
    
    if (error) {
      handleSupabaseError(error, 'sign in');
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error during sign in:', error);
    return null;
  }
}

/**
 * Sign out the current user
 * @returns True if successful, false otherwise
 */
export async function signOut(): Promise<boolean> {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      handleSupabaseError(error, 'sign out');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error during sign out:', error);
    return false;
  }
}

/**
 * Get the current session
 * @returns Current session or null if not authenticated
 */
export async function getSession(): Promise<Session | null> {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      handleSupabaseError(error, 'get session');
      return null;
    }
    
    return data.session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

/**
 * Get the current user
 * @returns Current user or null if not authenticated
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      handleSupabaseError(error, 'get user');
      return null;
    }
    
    return data.user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

/**
 * Reset a user's password
 * @param email The email address of the user
 * @returns True if successful, false otherwise
 */
export async function resetPassword(email: string): Promise<boolean> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) {
      handleSupabaseError(error, 'reset password');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error resetting password:', error);
    return false;
  }
}