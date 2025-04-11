import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://byeugnlnbqzxebxlxzaq.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5ZXVnbmxuYnF6eGVieGx4emFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMDc2MTYsImV4cCI6MjA1OTY4MzYxNn0.6eq0g-jPfAbturnqUVezvp2uX0h2LQVd-IYFYZELPM0'

// Create a single supabase client for the entire application
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Utility function to handle errors in Supabase operations
export function handleSupabaseError(error: any, operation: string): never {
  console.error(`Supabase ${operation} error:`, error)
  throw new Error(`Error during ${operation}: ${error.message || 'Unknown error'}`)
}

// Utility function to convert Supabase timestamp to readable format
export function formatTimestamp(timestamp: string | null): string {
  if (!timestamp) return ''
  return new Date(timestamp).toLocaleString()
}

// Utility to check if user is authenticated
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