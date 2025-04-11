import { API_CONFIG } from './config';
import { unlockAchievement, getUserProfile } from './userProgress';
import { supabase, handleSupabaseError } from '@/utils/supabase';

// Define interface for pitch data
export interface PitchData {
  userId?: string;
  startupId?: string;
  stage: number;
  title?: string;
  content: Record<string, string>;
  score?: number;
  feedback?: string;
  problem?: string | null;
  solution?: string | null;
  target?: string | null;
  businessModel?: string | null;
  marketSize?: string | null;
  competitiveAdvantage?: string | null;
  fundingAsk?: string | null;
  useOfFunds?: string | null;
}

// Define feedback interface
export interface Feedback {
  id: string;
  userId: string;
  pitchId: string;
  message: string;
  reviewerId: string;
  reviewerName: string;
  createdAt: string;
  rating?: number;
  stage?: number;
  strengths?: string[];
  weaknesses?: string[];
  suggestions?: string;
}

// Type for database record
interface FeedbackRecord {
  id: string;
  reviewer_id: string;
  pitch_id: string;
  comment: string | null;
  rating: number | null;
  strengths: string[] | null;
  weaknesses: string[] | null;
  suggestions: string | null;
  created_at: string;
  [key: string]: any; // For any additional fields from database
}

// Mock data for testing
const mockPitches: Record<string, PitchData[]> = {};
const mockFeedback: Record<string, Feedback[]> = {};

// Function to submit pitch data
export async function submitPitch(pitchData: PitchData): Promise<boolean> {
  try {
    // Check if we have a valid user ID
    if (!pitchData.userId) {
      console.error('No user ID provided for pitch submission');
      return false;
    }

    // Use mock data if configured
    if (API_CONFIG.USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.MOCK_DATA_DELAY));
      
      // Add to mock data
      if (!mockPitches[pitchData.userId]) {
        mockPitches[pitchData.userId] = [];
      }
      
      // Create a new object to avoid reference issues
      const newPitchData = { ...pitchData };
      
      // Assign a random score between 1-5
      newPitchData.score = Math.floor(Math.random() * 5) + 1;
      
      // Replace existing pitch at the same stage if it exists
      const existingIndex = mockPitches[pitchData.userId].findIndex(p => p.stage === pitchData.stage);
      if (existingIndex >= 0) {
        mockPitches[pitchData.userId][existingIndex] = newPitchData;
      } else {
        mockPitches[pitchData.userId].push(newPitchData);
      }
      
      // Generate mock feedback
      await generateMockFeedback(newPitchData);
      
      // Update user progress
      await checkAndUnlockAchievements(pitchData.userId);
      
      return true;
    }
    
    // Get user profile to get startup ID
    let startupId = pitchData.startupId;
    if (!startupId) {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', pitchData.userId)
        .single();
      
      if (profileError) {
        handleSupabaseError(profileError, 'fetching user profile');
        return false;
      }
      
      if (!profileData) {
        console.error(`No profile found for user ${pitchData.userId}`);
        return false;
      }
      
      startupId = profileData.id;
    }
    
    // Determine if we're updating or creating
    const statusString = `stage-${pitchData.stage}`;
    const { data: existingPitch, error: fetchError } = await supabase
      .from('pitches')
      .select('id')
      .eq('startup_id', startupId)
      .eq('status', statusString)
      .limit(1);
    
    if (fetchError) {
      handleSupabaseError(fetchError, 'checking existing pitch');
      return false;
    }
    
    const pitchRecord = {
      startup_id: startupId,
      title: pitchData.title || `Pitch Stage ${pitchData.stage}`,
      status: statusString,
      problem_statement: pitchData.problem || null,
      solution_description: pitchData.solution || null,
      business_model: pitchData.businessModel || null,
      market_size: pitchData.marketSize || null,
      competition: pitchData.competitiveAdvantage || null,
      funding_ask: pitchData.fundingAsk || null,
      use_of_funds: pitchData.useOfFunds || null,
      is_active: true,
      version: 1
    };
    
    let result;
    if (existingPitch && existingPitch.length > 0) {
      // Update existing pitch
      result = await supabase
        .from('pitches')
        .update(pitchRecord)
        .eq('id', existingPitch[0].id);
    } else {
      // Create new pitch
      result = await supabase
        .from('pitches')
        .insert(pitchRecord);
    }
    
    if (result.error) {
      handleSupabaseError(result.error, 'saving pitch');
      return false;
    }
    
    // Update user progress
    await checkAndUnlockAchievements(pitchData.userId);
    
    return true;
  } catch (error) {
    console.error('Error submitting pitch:', error);
    return false;
  }
}

async function checkAndUnlockAchievements(userId: string): Promise<void> {
  try {
    // Get user profile
    const userProfile = await getUserProfile(userId);
    if (!userProfile) return;
    
    // Check for pitch completions and unlock appropriate achievements
    const pitches = await getPitchesForUser(userId);
    
    // Unlock achievements based on number of pitches completed
    if (pitches.length >= 1) {
      await unlockAchievement(userId, 'first_pitch_completed');
    }
    
    if (pitches.length >= 3) {
      await unlockAchievement(userId, 'pitch_master');
    }
    
    // Check for high-quality pitches (score > 4)
    const highQualityPitches = pitches.filter(p => (p.score || 0) > 4);
    if (highQualityPitches.length >= 1) {
      await unlockAchievement(userId, 'high_quality_pitch');
    }
  } catch (error) {
    console.error('Error checking achievements:', error);
  }
}

export async function getFeedbackForUser(userId: string): Promise<Feedback[]> {
  try {
    // Use mock data if configured
    if (API_CONFIG.USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.MOCK_DATA_DELAY));
      
      // Return mock feedback if exists for the user
      return mockFeedback[userId] || [];
    }
    
    // Find startup ID for the user
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', userId)
      .single();
    
    if (profileError) {
      handleSupabaseError(profileError, 'fetching user profile');
      return [];
    }
    
    if (!profileData) {
      console.error(`No profile found for user ${userId}`);
      return [];
    }
    
    // Fetch pitches for the user
    const { data: pitchesData, error: pitchesError } = await supabase
      .from('pitches')
      .select('id')
      .eq('startup_id', profileData.id);
    
    if (pitchesError) {
      handleSupabaseError(pitchesError, 'fetching user pitches');
      return [];
    }
    
    if (!pitchesData || pitchesData.length === 0) {
      return [];
    }

    // Get pitch IDs
    const pitchIds = pitchesData.map(p => p.id);
    
    // Fetch feedback for the pitches
    const { data, error } = await supabase
      .from('feedback')
      .select(`
        id,
        reviewer_id,
        pitch_id,
        comment,
        rating,
        strengths,
        weaknesses,
        suggestions,
        created_at,
        profiles(full_name)
      `)
      .in('pitch_id', pitchIds)
      .order('created_at', { ascending: false });
    
    if (error) {
      handleSupabaseError(error, 'fetching pitch feedback');
      throw error;
    }
    
    if (!data || data.length === 0) {
      return [];
    }
    
    // Convert to Feedback interface with proper type checking
    const feedbackList: Feedback[] = data.map(item => ({
      id: item.id,
      userId: userId, // Use the user ID we were passed
      pitchId: item.pitch_id,
      message: item.comment || '',
      reviewerId: item.reviewer_id,
      reviewerName: item.profiles?.full_name || 'Anonymous Reviewer',
      createdAt: item.created_at,
      rating: item.rating ?? undefined,
      strengths: item.strengths || [],
      weaknesses: item.weaknesses || [],
      suggestions: item.suggestions || ''
    }));
    
    return feedbackList;
  } catch (error) {
    console.error(`Error fetching feedback for user ${userId}:`, error);
    return [];
  }
}

export async function getPitchesForUser(userId: string): Promise<PitchData[]> {
  try {
    // Use mock data if configured
    if (API_CONFIG.USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.MOCK_DATA_DELAY));
      
      // Return mock pitches if exists for the user
      return mockPitches[userId] || [];
    }
    
    // Find startup ID for the user
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', userId)
      .single();
    
    if (profileError) {
      handleSupabaseError(profileError, 'fetching user profile');
      return [];
    }
    
    if (!profileData) {
      console.error(`No profile found for user ${userId}`);
      return [];
    }
    
    // Fetch pitches from Supabase
    const { data, error } = await supabase
      .from('pitches')
      .select('*')
      .eq('startup_id', profileData.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      handleSupabaseError(error, 'fetching user pitches');
      throw error;
    }
    
    if (!data || data.length === 0) {
      return [];
    }
    
    // Convert to PitchData interface
    const pitchList: PitchData[] = data.map(item => ({
      userId,
      startupId: item.startup_id || '',
      stage: parseInt(item.status?.replace(/[^0-9]/g, '') || '0'), // Convert status to stage number if possible
      title: item.title || '',
      problem: item.problem_statement || '',
      solution: item.solution_description || '',
      target: item.problem_statement || '', // Using problem_statement as fallback since target_market doesn't exist
      businessModel: item.business_model || '',
      marketSize: item.market_size || '',
      competitiveAdvantage: item.competition || '',
      fundingAsk: item.funding_ask || '',
      useOfFunds: item.use_of_funds || '',
      content: {} // Initialize empty content object as we don't have this in the database
    }));
    
    return pitchList;
  } catch (error) {
    console.error(`Error fetching pitches for user ${userId}:`, error);
    return [];
  }
}

export async function getUserPitch(userId: string, stageId: number): Promise<PitchData | null> {
  try {
    // Use mock data if configured
    if (API_CONFIG.USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.MOCK_DATA_DELAY));
      
      // Find pitch for the specified stage
      const userPitches = mockPitches[userId] || [];
      return userPitches.find(pitch => pitch.stage === stageId) || null;
    }
    
    // Find startup ID for the user
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', userId)
      .single();
    
    if (profileError) {
      handleSupabaseError(profileError, 'fetching user profile');
      return null;
    }
    
    if (!profileData) {
      console.error(`No profile found for user ${userId}`);
      return null;
    }
    
    // Fetch pitches for the specific stage
    const { data, error } = await supabase
      .from('pitches')
      .select('*')
      .eq('startup_id', profileData.id)
      .eq('status', `stage-${stageId}`) // Assuming status follows this format
      .order('created_at', { ascending: false })
      .limit(1);
    
    if (error) {
      handleSupabaseError(error, `fetching pitch for stage ${stageId}`);
      throw error;
    }
    
    if (!data || data.length === 0) {
      return null;
    }
    
    // Convert to PitchData interface
    const item = data[0];
    const pitchData: PitchData = {
      userId,
      startupId: item.startup_id || '',
      stage: stageId,
      title: item.title || '',
      problem: item.problem_statement || '',
      solution: item.solution_description || '',
      target: item.problem_statement || '', // Using problem_statement as fallback
      businessModel: item.business_model || '',
      marketSize: item.market_size || '',
      competitiveAdvantage: item.competition || '',
      fundingAsk: item.funding_ask || '',
      useOfFunds: item.use_of_funds || '',
      content: {} // Initialize with stored content if available
    };
    
    return pitchData;
  } catch (error) {
    console.error(`Error fetching pitch for user ${userId} at stage ${stageId}:`, error);
    return null;
  }
}

async function generateMockFeedback(pitchData: PitchData): Promise<void> {
  if (!pitchData.userId) return;
  
  // Generate 1-3 random feedback items
  const numFeedbacks = Math.floor(Math.random() * 3) + 1;
  
  for (let i = 0; i < numFeedbacks; i++) {
    const mockInvestors = [
      { id: 'inv-001', name: 'Dutch Ventures Capital' },
      { id: 'inv-002', name: 'Innovation Angels NL' },
      { id: 'inv-003', name: 'Growth Partners BV' },
      { id: 'inv-004', name: 'Startup Accelerator NL' }
    ];
    
    const randomInvestor = mockInvestors[Math.floor(Math.random() * mockInvestors.length)];
    const score = Math.random() * 5;
    
    // Generate random strengths
    const strengths = [
      'Clear value proposition',
      'Strong team background',
      'Innovative solution',
      'Scalable business model',
      'Promising market potential'
    ];
    const randomStrengths = strengths
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);
    
    // Generate random improvements
    const improvements = [
      'More market validation needed',
      'Financial projections could be more detailed',
      'Consider refining go-to-market strategy',
      'Competitive analysis needs expansion',
      'Clarify revenue model'
    ];
    const randomImprovements = improvements
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);
    
    const feedback: Feedback = {
      id: `fb-${Date.now()}-${i}`,
      userId: pitchData.userId,
      pitchId: `pitch-${Date.now()}`,
      message: generateMockFeedbackText(pitchData.stage),
      reviewerId: randomInvestor.id,
      reviewerName: randomInvestor.name,
      createdAt: new Date().toISOString(),
      stage: pitchData.stage,
      rating: Math.round(score),
      strengths: randomStrengths,
      weaknesses: randomImprovements,
      suggestions: 'Consider focusing on your core value proposition and refining your market analysis.'
    };
    
    // Add to mock data
    if (!mockFeedback[pitchData.userId]) {
      mockFeedback[pitchData.userId] = [];
    }
    mockFeedback[pitchData.userId].push(feedback);
  }
}

function generateMockFeedbackText(stage: number): string {
  const stageTexts = [
    "Your pitch needs more clarity on the problem you're solving. Consider focusing on a specific pain point that your target market experiences.",
    "Good start on defining your solution, but try to explain more concretely how it addresses the specific problem you identified.",
    "I like your business model, but you should elaborate more on how you'll monetize your solution at scale. Consider including pricing tiers.",
    "Your pitch shows potential, but the competitive landscape analysis could be stronger. Who are your direct and indirect competitors?",
    "Interesting concept! I'd like to see more validation data to support your market size estimates."
  ];
  
  const index = Math.min(stage, stageTexts.length - 1);
  return stageTexts[index];
} 