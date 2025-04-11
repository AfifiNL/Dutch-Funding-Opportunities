/**
 * API Configuration
 */

// Check if Supabase URL and key are defined
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Function to check if Supabase should be available
export function isSupabaseAvailable(): boolean {
  return !!supabaseUrl && supabaseUrl.length > 0 && 
         !!supabaseKey && supabaseKey.length > 0;
}

// Log API configuration
console.log('API configuration:', {
  mockDataEnabled: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true',
  supabaseAvailable: isSupabaseAvailable(),
  nodeEnv: process.env.NODE_ENV
});

// Determine which data source to use
// Priority: 1. Supabase (if available), 2. Mock data
const useSupabase = isSupabaseAvailable();
const useMockData = !useSupabase || process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

if (useSupabase) {
  console.log('Using Supabase for data storage');
} else {
  console.log('⚠️ Using mock data - No valid Supabase configuration found');
}

export const API_CONFIG = {
  USE_SUPABASE: useSupabase,
  USE_MOCK_DATA: useMockData,
  MOCK_DATA_DELAY: 500, // ms to simulate API delay
  ERROR_RETRY_DELAY: 2000, // ms to wait before retrying after an error
  MAX_RETRIES: 3 // maximum number of retry attempts for API calls
}; 