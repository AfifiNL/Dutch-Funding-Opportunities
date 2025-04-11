'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JourneyMap from './components/JourneyMap';
import InvestorProfiles from './components/InvestorProfiles';
import PitchBuilder from './components/PitchBuilder';
import { InvestorType } from './types';
import { useInvestors } from '@/hooks/useInvestors';
import { useUserProgress } from '@/hooks/useUserProgress';
import { usePitchFeedback } from '@/hooks/usePitchFeedback';
import { useAchievements } from '@/hooks/useAchievements'; 
import { submitPitch, getUserPitch, Feedback as ApiPitchFeedback } from '@/api/pitch';
import LoadingSpinner from '@/components/LoadingSpinner';
import { API_CONFIG, isSupabaseAvailable } from '@/api/config';

// Utility function to map hook feedback to API feedback format
const mapFeedbackToApiFormat = (feedback: any[]): ApiPitchFeedback[] => {
  if (!feedback) return [];
  
  return feedback.map(item => ({
    id: item.id,
    userId: item.userId,
    pitchId: item.pitchId,
    message: item.message || '',
    reviewerId: item.investorId || '',
    reviewerName: 'Investor',
    createdAt: item.createdAt,
    rating: item.score,
    stage: 0, // Default stage
    strengths: item.strengths || [],
    weaknesses: item.improvements || [],
    suggestions: ''
  }));
};

const InvestorPanelSection: React.FC = () => {
  // Fix the hooks destructuring to match their actual implementations
  const { investors, loading: investorsLoading } = useInvestors();
  const { 
    profile: userProgress, 
    loading: progressLoading, 
    updateProgress: updateUserProgress
  } = useUserProgress();
  
  const { 
    feedback, 
    loading: feedbackLoading, 
    refreshFeedback 
  } = usePitchFeedback();
  
  const {
    achievements,
    loading: achievementsLoading,
    unlockAchievement
  } = useAchievements();

  // Add a fetchAchievements function that calls the hook's refresh methods
  const fetchAchievements = useCallback(async () => {
    // Since useAchievements doesn't expose a fetchAchievements method directly,
    // we'll implement our own that will be a no-op for now
    console.log('Fetching achievements (placeholder implementation)');
    // In a real implementation, we might want to add a refresh method to useAchievements
  }, []);

  const [activeStage, setActiveStage] = useState<number>(0);
  const [isPitchMode, setIsPitchMode] = useState<boolean>(false);
  const [selectedFundingCategory, setSelectedFundingCategory] = useState<string>("all");
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [pitchLoading, setPitchLoading] = useState<boolean>(false);
  const [savedPitchData, setSavedPitchData] = useState<Record<string, string>>({});
  
  // Debug logging enhanced to show detailed user progress
  useEffect(() => {
    if (userProgress) {
      console.log("Current User Progress Details:");
      console.log(`- User ID: ${userProgress.userId}`);
      console.log(`- Current Stage: ${userProgress.currentStage}`);
      console.log(`- Completed Stages: ${JSON.stringify(userProgress.completedStages)}`);
      console.log(`- Pitch Scores: ${JSON.stringify(userProgress.pitchScores)}`);
      console.log(`- Level: ${userProgress.level}, XP: ${userProgress.xpPoints}`);
      console.log(`- Achievements: ${userProgress.achievements?.length || 0}`);
    }
    
    console.log('Supabase Integration Validation:');
    console.log('- Investors:', investors?.length || 0, 'records loaded', investors?.[0]?.id ? '✅' : '❌');
    console.log('- Feedback:', feedback?.length || 0, 'records loaded', feedback?.[0]?.id ? '✅' : '❌');
    console.log('- User Progress:', userProgress ? '✅' : '❌', userProgress);
    console.log('- Achievements:', achievements?.length || 0, 'records loaded', achievements?.[0]?.id ? '✅' : '❌');
  }, [investors, feedback, userProgress, achievements]);
  
  // Update this effect to load user progress and set active stage
  useEffect(() => {
    if (userProgress && userProgress.completedStages && userProgress.completedStages.length > 0) {
      const highestCompletedStage = Math.max(...userProgress.completedStages);
      // Set the active stage to either the current stage from userProgress or the next stage after highest completed
      const newActiveStage = Math.min(
        userProgress.currentStage !== undefined ? userProgress.currentStage : highestCompletedStage + 1, 
        4
      );
      setActiveStage(newActiveStage);
      
      // Load the pitch data for this stage if available
      if (userProgress.userId) {
        loadPitchDataForStage(userProgress.userId, newActiveStage);
      }
    }
  }, [userProgress]);
  
  // New function to load pitch data for a specific stage
  const loadPitchDataForStage = async (userId: string, stageId: number) => {
    try {
      console.log(`Loading pitch data for user ${userId}, stage ${stageId}`);
      const pitchData = await getUserPitch(userId, stageId);
      if (pitchData && pitchData.content) {
        console.log('Found saved pitch data:', pitchData.content);
        setSavedPitchData(pitchData.content);
      } else {
        console.log('No saved pitch data found');
        setSavedPitchData({});
      }
    } catch (error) {
      console.error('Error loading pitch data:', error);
      setSavedPitchData({});
    }
  };
  
  // Refresh all data function
  const refreshData = useCallback(async () => {
    try {
      setIsRefreshing(true);
      console.log("Refreshing all data...");
      
      // We'll manually handle errors here to make sure we continue even if one refresh fails
      try {
        await refreshFeedback();
        console.log("Feedback refreshed successfully");
      } catch (e) {
        console.error("Error refreshing feedback:", e);
      }
      
      try {
        await fetchAchievements();
        console.log("Achievements refreshed successfully");
      } catch (e) {
        console.error("Error refreshing achievements:", e);
      }
      
      console.log("Data refresh complete!");
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, [refreshFeedback, fetchAchievements]);
  
  // Handle pitch submission with the pitch hook
  const handlePitchSubmit = async (stageId: number, pitchData: Record<string, string>) => {
    if (!userProgress) return;
    
    try {
      setPitchLoading(true);
      
      // Update saved pitch data state immediately
      setSavedPitchData(pitchData);
      
      // Submit the pitch directly using the API function
      const result = await submitPitch({
        userId: userProgress.userId,
        stage: stageId,
        title: `Stage ${stageId} Pitch`,
        content: pitchData
      });
      
      // Calculate a score based on content completeness (optional)
      const score = Object.values(pitchData).filter(v => v.length > 10).length / 
                   Object.keys(pitchData).length * 5;
      
      // Update user progress with completed stage and pitch score
      const updatedPitchScores = {
        ...(userProgress.pitchScores || {}),
        [stageId]: score
      };
      
      // Ensure completedStages is not undefined
      const currentCompletedStages = userProgress.completedStages || [];
      
      // Create a new array with unique values instead of using Set
      const uniqueCompletedStages = Array.from(
        new Set([...currentCompletedStages, stageId])
      ).map(s => Number(s)); // Convert all stage IDs to numbers
      
      // Determine the next stage
      const nextStage = Math.min(stageId + 1, 4);
      
      await updateUserProgress({
        ...userProgress,
        completedStages: uniqueCompletedStages,
        pitchScores: updatedPitchScores,
        // Always advance to next stage after submission
        currentStage: nextStage
      });
      
      // Unlock achievement for completing a pitch
      await unlockAchievement('pitch-submitted');
      
      // If this is their first pitch, unlock first pitch achievement
      if (userProgress.completedStages && !userProgress.completedStages.includes(stageId)) {
        await unlockAchievement('first-pitch');
      }
      
      // Stage-specific achievements
      if (stageId === 1) { // Validation
        await unlockAchievement('validation-champion');
      } else if (stageId === 2) { // Seed
        await unlockAchievement('discover-early-funding');
      }
      
      // If they've completed all stages, unlock master pitcher achievement
      const allCompletedStages = uniqueCompletedStages;
      if (allCompletedStages.length >= 4) {
        await unlockAchievement('master-pitcher');
      }

      // Refresh data after submission
      await refreshData();

      // Show confirmation to user
      alert(`Pitch for ${stages[stageId].name} stage submitted successfully!`);
      
      // Switch to stage info mode
      setIsPitchMode(false);
      
      // Automatically update active stage to the next one
      setActiveStage(nextStage);
      
      // If we completed one stage but not the final stage, automatically switch to pitch mode for the next stage
      if (nextStage < 4) {
        setTimeout(() => setIsPitchMode(true), 500);
      }
      
    } catch (error) {
      console.error('Error submitting pitch:', error);
      alert('There was an error submitting your pitch. Please try again.');
    } finally {
      setPitchLoading(false);
    }
  };
  
  // Test function for pitch submission
  const testPitchSubmission = async () => {
    if (!userProgress) {
      console.log('Cannot test pitch submission: No user progress available');
      return;
    }
    
    console.log('Testing pitch submission...');
    try {
      const testPitchData = {
        value_proposition: 'This is a test pitch for validation purposes.',
        target_market: 'Test market segment.',
        business_model: 'Test business model.',
        problem_solution: 'Test problem and solution.'
      };
      
      await submitPitch({
        userId: userProgress.userId,
        stage: activeStage,
        title: `Test Pitch for Stage ${activeStage}`,
        content: testPitchData
      });
      
      // Refresh data after test submission
      await refreshData();
      
      console.log('✅ Pitch submission successful!');
    } catch (error) {
      console.error('❌ Pitch submission failed:', error);
    }
  };
  
  // Call this when a user selects a new stage
  const handleStageSelect = async (stageId: number) => {
    // Check if user is allowed to select this stage
    const completedStages = userProgress?.completedStages || [];
    const maxAllowedStage = completedStages.length > 0 
      ? Math.min(Math.max(...completedStages) + 1, 4)
      : 0;
    
    if (stageId > maxAllowedStage) {
      alert(`Please complete stage ${maxAllowedStage + 1} before moving to stage ${stageId + 1}.`);
      return;
    }
    
    setActiveStage(stageId);
    
    if (userProgress) {
      // Update current stage in Airtable
      await updateUserProgress({
        ...userProgress,
        currentStage: stageId
      });
      console.log(`Updated current stage to ${stageId} in Airtable`);
      
      // Load saved pitch data for this stage
      if (userProgress.userId) {
        await loadPitchDataForStage(userProgress.userId, stageId);
      }
      
      // Refresh data after stage change
      await refreshData();
    }
  };
  
  const stages = [
    { id: 0, name: 'Ideation', description: 'Develop and refine your business idea' },
    { id: 1, name: 'Validation', description: 'Test your concept with potential customers' },
    { id: 2, name: 'Seed Funding', description: 'Secure initial investment to build your MVP' },
    { id: 3, name: 'Growth', description: 'Scale your business with additional funding' },
    { id: 4, name: 'Expansion', description: 'Enter new markets and grow your team' }
  ];

  const isLoadingAny = investorsLoading || progressLoading || achievementsLoading;

  if (isLoadingAny) {
    return (
      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="flex justify-center items-center h-24">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!userProgress) {
    return (
      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="p-6 bg-yellow-900/30 border border-yellow-800 rounded-lg text-center">
          <h3 className="text-yellow-500 font-medium text-lg mb-2">User Profile Not Found</h3>
          <p className="text-gray-300 mb-4">
            We couldn't find your user profile data. Please make sure you're logged in and try refreshing the page.
          </p>
          <button 
            onClick={refreshData}
            className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Refresh Data
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-8 pb-16">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-base-200 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <motion.div 
            className="bg-gray-800/60 p-4 rounded-lg mb-6 border border-gray-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
              <div>
                <h3 className="text-white font-medium text-lg">Your Funding Journey</h3>
                <p className="text-sm text-gray-400">
                  {userProgress?.completedStages?.length || 0} of {stages.length} stages completed
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-6 mt-2 sm:mt-0">
                <div className="flex items-center mb-2 sm:mb-0">
                  <div className="h-10 w-10 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg text-white font-bold flex items-center justify-center text-lg mr-2">
                    {userProgress?.level || 1}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">LEVEL</div>
                    <div className="text-sm text-white font-medium">
                      {userProgress?.xpPoints || 0} XP
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">CURRENT STAGE</div>
                  <div className="text-sm text-white font-medium">
                    {stages[userProgress?.currentStage || 0].name}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Overall Progress</span>
                <span>{Math.round(((userProgress?.completedStages?.length || 0) / stages.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-teal-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${((userProgress?.completedStages?.length || 0) / stages.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            
            {/* Refresh button */}
            <div className="mt-3 flex justify-end">
              <button 
                onClick={refreshData}
                disabled={isRefreshing}
                className={`text-xs px-3 py-1.5 rounded flex items-center ${
                  isRefreshing 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {isRefreshing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Refreshing...
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    Refresh Data
                  </>
                )}
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 text-transparent bg-clip-text mb-3">
              Pitch Perfect: Dutch Funding Journey
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Build your pitch and present to Dutch investors across different funding stages. 
              Perfect your pitch, receive feedback, and discover your ideal funding match.
            </p>
            
            <div className="mt-3 text-sm">
              <span className="text-blue-400 font-medium">Level {userProgress?.level || 1}</span>
              <span className="mx-2 text-gray-500">•</span>
              <span className="text-gray-400">{userProgress?.xpPoints || 0} XP</span>
              <span className="mx-2 text-gray-500">•</span>
              <span className="text-gray-400">{userProgress?.completedStages?.length || 0} Stages Completed</span>
            </div>
            
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-3 space-x-2">
                <button 
                  onClick={testPitchSubmission} 
                  className="px-3 py-1 bg-gray-700 text-xs text-white rounded hover:bg-gray-600"
                >
                  Test Pitch API
                </button>
                <button 
                  onClick={() => unlockAchievement('first-pitch')} 
                  className="px-3 py-1 bg-gray-700 text-xs text-white rounded hover:bg-gray-600"
                >
                  Test Achievement API
                </button>
                <button 
                  onClick={refreshData} 
                  className="px-3 py-1 bg-gray-700 text-xs text-white rounded hover:bg-gray-600"
                  disabled={isRefreshing}
                >
                  {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
                </button>
              </div>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          <motion.div 
            className="lg:col-span-2 bg-gray-900/50 rounded-xl border border-gray-800 p-4 overflow-hidden"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-1">Funding Journey</h3>
              <p className="text-xs text-gray-400">Navigate through funding stages</p>
            </div>
            
            <JourneyMap 
              stages={stages}
              activeStage={activeStage}
              onStageSelect={handleStageSelect}
              completedStages={userProgress?.completedStages || []}
            />
          </motion.div>

          <motion.div 
            className="lg:col-span-3 bg-gray-900/60 rounded-xl border border-gray-800 overflow-hidden"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-gray-800/50 px-4 py-3 flex justify-between items-center border-b border-gray-700">
              <h3 className="font-medium text-white">
                {isPitchMode ? 'Pitch Builder' : `Stage: ${stages[activeStage].name}`}
              </h3>
              <div className="flex space-x-2">
                {isPitchMode && activeStage > 0 && (
                  <button
                    onClick={() => {
                      const prevStage = activeStage - 1;
                      if (userProgress && userProgress.userId) {
                        loadPitchDataForStage(userProgress.userId, prevStage);
                      }
                      setActiveStage(prevStage);
                    }}
                    className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
                  >
                    Previous Stage
                  </button>
                )}
                <button
                  onClick={() => setIsPitchMode(!isPitchMode)}
                  className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  {isPitchMode ? 'View Stage Info' : 'Build Your Pitch'}
                </button>
              </div>
            </div>

            <div className="p-5">
              {isPitchMode ? (
                <PitchBuilder 
                  currentStage={activeStage} 
                  existingFeedback={mapFeedbackToApiFormat(feedback)}
                  onSubmitPitch={(pitchData) => handlePitchSubmit(activeStage, pitchData)}
                  isSubmitting={pitchLoading}
                  savedPitchData={savedPitchData}
                  isFinalStage={activeStage === 4}
                />
              ) : (
                <div>
                  <h4 className="text-xl font-semibold text-white mb-3">{stages[activeStage].name}</h4>
                  <p className="text-gray-300 mb-4">{stages[activeStage].description}</p>
                  
                  <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700">
                    <h5 className="text-sm font-medium text-blue-400 mb-2">Key Focus Areas</h5>
                    <ul className="text-sm text-gray-400 space-y-2">
                      {activeStage === 0 && (
                        <>
                          <li className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span> 
                            Define your value proposition clearly
                          </li>
                          <li className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span> 
                            Identify your target market and size
                          </li>
                          <li className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span> 
                            Outline your business model
                          </li>
                        </>
                      )}

                      {activeStage === 1 && (
                        <>
                          <li className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span> 
                            Show evidence of customer interviews
                          </li>
                          <li className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span> 
                            Present early prototype results
                          </li>
                          <li className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span> 
                            Demonstrate problem-solution fit
                          </li>
                        </>
                      )}

                      {activeStage === 2 && (
                        <>
                          <li className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span> 
                            Clear MVP development roadmap
                          </li>
                          <li className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span> 
                            Initial traction metrics
                          </li>
                          <li className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span> 
                            Detailed use of funds breakdown
                          </li>
                        </>
                      )}

                      {activeStage === 3 && (
                        <>
                          <li className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span> 
                            Growth metrics and KPIs
                          </li>
                          <li className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span> 
                            Customer acquisition strategy
                          </li>
                          <li className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span> 
                            Revenue projections and unit economics
                          </li>
                        </>
                      )}

                      {activeStage === 4 && (
                        <>
                          <li className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span> 
                            International expansion strategy
                          </li>
                          <li className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span> 
                            Team scaling and organizational structure
                          </li>
                          <li className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span> 
                            Long-term vision and potential exit strategies
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div 
            className="lg:col-span-2 bg-gray-900/50 rounded-xl border border-gray-800 p-4"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-1">Investor Panel</h3>
              <p className="text-xs text-gray-400">Dutch funding experts evaluating your pitch</p>
            </div>
            
            <InvestorProfiles 
              investors={investors.filter(investor => {
                // Safely check if stages is an array and if it includes activeStage
                if (Array.isArray(investor.stages)) {
                  return investor.stages.some(stage => {
                    // Ensure stage is converted to a number for comparison
                    const stageNum = typeof stage === 'string' ? parseInt(stage, 10) : stage;
                    return stageNum === activeStage;
                  });
                }
                return false;
              }) as import('@/api/investors').Investor[]}
              activeStage={activeStage}
            />
          </motion.div>
        </div>

        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button
            onClick={() => setIsPitchMode(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-lg font-medium transition-all"
          >
            {userProgress?.completedStages?.length 
              ? `Continue Your ${stages[activeStage].name} Stage Pitch` 
              : 'Start Your Funding Journey'}
          </button>
          <p className="text-xs text-gray-500 mt-2">
            {userProgress?.completedStages?.length 
              ? `You've completed ${userProgress.completedStages.length} of 5 stages` 
              : 'Complete each stage to unlock the next level of funding options'}
          </p>
        </motion.div>
        
        {achievements && achievements.length > 0 && (
          <div className="fixed bottom-4 right-4 max-w-xs">
            {achievements.filter(a => a.unlocked).slice(0, 1).map(achievement => (
              <motion.div 
                key={achievement.id}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                className="bg-gray-800 border border-blue-500 rounded-lg p-3 shadow-lg"
              >
                <div className="flex items-start">
                  <div className="mr-3 text-blue-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-white">{achievement.name}</h5>
                    <p className="text-xs text-gray-400">{achievement.description}</p>
                    <p className="text-xs text-blue-400 mt-1">+{achievement.xpReward} XP</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorPanelSection; 