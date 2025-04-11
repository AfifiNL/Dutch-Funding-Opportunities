import { useState, useEffect, useCallback } from 'react';
import { submitPitch as submitPitchAPI, getFeedbackForUser } from '@/api/pitch';
import { useAuth } from './useAuth';

interface PitchData {
  userId?: string;
  stage: number;
  title: string;
  problem?: string;
  solution?: string;
  target?: string;
  businessModel?: string;
  marketSize?: string;
  competitiveAdvantage?: string;
  fundingAsk?: string;
  useOfFunds?: string;
  score?: number;
  content: Record<string, string>; // Make content required
}

interface Feedback {
  id: string;
  userId: string;
  pitchId: string;
  investorId: string;
  score: number;
  strengths: string[];
  improvements: string[];
  message?: string;
  createdAt: string;
}

interface UsePitchFeedbackResult {
  feedback: Feedback[];
  loading: boolean;
  submitting: boolean;
  error: Error | null;
  submitPitch: (pitch: PitchData) => Promise<any>;
  refreshFeedback: () => Promise<void>;
  getFeedbackByStage: (stage: number) => Feedback[];
  getAverageScore: (stage?: number) => number;
}

/**
 * Custom hook for submitting pitches and fetching feedback
 * @param providedUserId Optional user ID to override the one from useAuth
 * @returns Object containing feedback, loading states, and utility methods
 */
export function usePitchFeedback(providedUserId?: string): UsePitchFeedbackResult {
  const { user, isLoading: authLoading } = useAuth();
  const userId = providedUserId || user?.id;
  
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Function to fetch feedback
  const fetchFeedback = useCallback(async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching feedback for user:', userId);
      const apiData = await getFeedbackForUser(userId);
      
      // Map API feedback to the local Feedback interface
      const mappedFeedback = apiData.map(item => ({
        id: item.id,
        userId: item.userId,
        pitchId: item.pitchId,
        investorId: item.reviewerId,
        score: item.rating || 0,
        strengths: item.strengths || [],
        improvements: item.weaknesses || [],
        message: item.message || '',
        createdAt: item.createdAt
      }));
      
      setFeedback(mappedFeedback);
      console.log(`Loaded ${apiData.length} feedback items`);
    } catch (err) {
      console.error("Error fetching feedback:", err);
      setError(err instanceof Error ? err : new Error('Failed to fetch feedback'));
    } finally {
      setLoading(false);
    }
  }, [userId]);
  
  // Fetch feedback after auth is loaded or userId changes
  useEffect(() => {
    if (!authLoading && userId) {
      fetchFeedback();
    }
  }, [fetchFeedback, authLoading, userId]);
  
  // Function to submit a pitch
  const submitPitch = async (pitch: PitchData): Promise<any> => {
    if (!userId) {
      throw new Error('User ID is required to submit a pitch');
    }
    
    try {
      setSubmitting(true);
      setError(null);
      
      // Ensure userId is set in the pitch data
      const pitchWithUserId = {
        ...pitch,
        userId: pitch.userId || userId
      };
      
      console.log('Submitting pitch:', pitchWithUserId);
      const result = await submitPitchAPI(pitchWithUserId);
      
      // Refresh feedback after submitting pitch
      await fetchFeedback();
      
      return result;
    } catch (err) {
      console.error("Error submitting pitch:", err);
      const errorObj = err instanceof Error ? err : new Error('Failed to submit pitch');
      setError(errorObj);
      throw errorObj;
    } finally {
      setSubmitting(false);
    }
  };
  
  // Utility function to get feedback filtered by stage
  const getFeedbackByStage = (stage: number): Feedback[] => {
    // Note: In a real implementation we would need to associate feedback with stages
    // For this mock implementation, we'll return all feedback
    return feedback;
  };
  
  // Utility function to calculate average feedback score
  const getAverageScore = (stage?: number): number => {
    const relevantFeedback = stage !== undefined
      ? getFeedbackByStage(stage)
      : feedback;
      
    if (relevantFeedback.length === 0) return 0;
    
    const sum = relevantFeedback.reduce((total, item) => total + item.score, 0);
    return sum / relevantFeedback.length;
  };
  
  return {
    feedback,
    loading: loading || authLoading,
    submitting,
    error,
    submitPitch,
    refreshFeedback: fetchFeedback,
    getFeedbackByStage,
    getAverageScore
  };
} 