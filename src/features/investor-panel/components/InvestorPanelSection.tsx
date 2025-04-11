'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InvestorProfiles from './InvestorProfiles';
import PitchBuilder from './PitchBuilder';
import JourneyProgress, { fundingStages } from './JourneyProgress';
import AchievementSystem from './AchievementSystem';
import { InvestorType } from '../types';
import FundingCardEarlyStage from '@/features/funding-display/components/FundingCardEarlyStage';
import FundingCardImpact from '@/features/funding-display/components/FundingCardImpact';
import FundingCardStats from '@/features/funding-display/components/FundingCardStats';
import FundingFilterBar from '@/features/funding-display/components/FundingFilterBar';
import { Icons } from '@/components/IconSet';

// Mock investor data
const mockInvestors: Record<number, InvestorType[]> = {
  0: [ // Ideation stage investors
    {
      id: 'incubator-1',
      name: 'StartHub Amsterdam',
      role: 'Incubator Program Manager',
      organization: 'StartHub',
      avatar: 'accelerator-director',
      bio: 'Specializes in early-stage startup support with a focus on pre-seed ventures.',
      personality: 'constructive',
      feedbackStyle: 'detailed',
      investmentRange: '€10K - €25K',
      interests: ['Software', 'AI', 'Sustainability', 'EdTech'],
      sector: 'Incubator',
      stages: [0, 1] // Ideation, Validation
    },
    {
      id: 'public-grant-1',
      name: 'Nora van der Linden',
      role: 'Innovation Grant Advisor',
      organization: 'RVO Netherlands',
      avatar: 'public-grant-officer',
      bio: 'Helps entrepreneurs navigate government grants for early innovation projects.',
      personality: 'analytical',
      feedbackStyle: 'methodical',
      investmentRange: '€20K - €50K',
      interests: ['Green Innovation', 'Digital Transformation', 'Social Impact'],
      sector: 'Government',
      stages: [0, 1] // Ideation, Validation
    }
  ],
  1: [ // Validation stage investors
    {
      id: 'angel-1',
      name: 'Pieter de Vries',
      role: 'Angel Investor',
      organization: 'Dutch Angels Collective',
      avatar: 'angel-investor',
      bio: 'Serial entrepreneur turned investor with 15+ successful exits in the Dutch tech scene.',
      personality: 'visionary',
      feedbackStyle: 'direct',
      investmentRange: '€50K - €200K',
      interests: ['Marketplaces', 'SaaS', 'FinTech'],
      sector: 'Angel Investment',
      stages: [1, 2] // Validation, Seed
    },
    {
      id: 'public-grant-2',
      name: 'Eva Jansen',
      role: 'MIT Scheme Coordinator',
      organization: 'RVO Netherlands',
      avatar: 'public-grant-officer',
      bio: 'Manages the SME Innovation Stimulation Region and Top Sectors (MIT) scheme.',
      personality: 'analytical',
      feedbackStyle: 'structured',
      investmentRange: '€50K - €200K',
      interests: ['Regional Development', 'Clean Energy', 'AgriFood'],
      sector: 'Government',
      stages: [1, 2] // Validation, Seed
    },
    {
      id: 'accelerator-1',
      name: 'Techstars Amsterdam',
      role: 'Program Director',
      organization: 'Techstars',
      avatar: 'accelerator-director',
      bio: 'Leads the Amsterdam chapter of this globally recognized startup accelerator.',
      personality: 'constructive',
      feedbackStyle: 'encouraging',
      investmentRange: '€100K',
      interests: ['B2B SaaS', 'Marketplace', 'Enterprise Solutions'],
      sector: 'Accelerator',
      stages: [1, 2] // Validation, Seed
    }
  ],
  2: [ // Seed stage investors
    {
      id: 'vc-1',
      name: 'Hendrik Bakker',
      role: 'Principal',
      organization: 'Peak Capital',
      avatar: 'vc-partner',
      bio: 'Early-stage investor focused on marketplace, SaaS and platform companies.',
      personality: 'analytical',
      feedbackStyle: 'direct',
      investmentRange: '€250K - €4M',
      interests: ['Marketplace', 'SaaS', 'Platform'],
      sector: 'Venture Capital',
      stages: [2, 3] // Seed, Growth
    },
    {
      id: 'vc-2',
      name: 'Sarah de Jong',
      role: 'Investment Manager',
      organization: 'INKEF Capital',
      avatar: 'vc-partner',
      bio: 'Leads investments in seed to Series A technology and healthcare companies.',
      personality: 'visionary',
      feedbackStyle: 'collaborative',
      investmentRange: '€500K - €5M',
      interests: ['Technology', 'Healthcare', 'Deep Tech'],
      sector: 'Venture Capital',
      stages: [2, 3] // Seed, Growth
    },
    {
      id: 'impact-1',
      name: 'Emma Verhoeven',
      role: 'Impact Investment Officer',
      organization: 'Social Impact Ventures',
      avatar: 'impact-investor',
      bio: 'Invests in companies that deliver solutions to societal challenges.',
      personality: 'impact-focused',
      feedbackStyle: 'constructive',
      investmentRange: '€300K - €2.5M',
      interests: ['Circular Economy', 'Energy Transition', 'Healthcare Innovation'],
      sector: 'Impact Investment',
      stages: [2, 3] // Seed, Growth
    }
  ],
  3: [ // Growth stage investors
    {
      id: 'vc-3',
      name: 'Lars van den Berg',
      role: 'Partner',
      organization: 'Endeit Capital',
      avatar: 'vc-partner',
      bio: 'Growth capital investor for technology companies ready to scale internationally.',
      personality: 'analytical',
      feedbackStyle: 'direct',
      investmentRange: '€5M - €15M',
      interests: ['Digital Scale-ups', 'EdTech', 'Health Tech', 'Smart Logistics'],
      sector: 'Venture Capital',
      stages: [3, 4] // Growth, Expansion
    },
    {
      id: 'vc-4',
      name: 'Julia Hoving',
      role: 'Investment Director',
      organization: 'HPE Growth',
      avatar: 'vc-partner',
      bio: 'Invests in technology companies with proven business models ready for international growth.',
      personality: 'risk-taker',
      feedbackStyle: 'challenging',
      investmentRange: '€10M - €30M',
      interests: ['Software', 'Tech-enabled Services', 'Internet'],
      sector: 'Venture Capital',
      stages: [3, 4] // Growth, Expansion
    }
  ],
  4: [ // Expansion stage investors
    {
      id: 'vc-5',
      name: 'Thomas de Haan',
      role: 'Managing Partner',
      organization: 'Gilde Equity Management',
      avatar: 'vc-partner',
      bio: 'Focuses on mature, market-leading companies with international expansion plans.',
      personality: 'conservative',
      feedbackStyle: 'thorough',
      investmentRange: '€20M - €80M',
      interests: ['Enterprise Software', 'Industry 4.0', 'Healthcare'],
      sector: 'Private Equity',
      stages: [4] // Expansion
    },
    {
      id: 'vc-6',
      name: 'Maria Janssen',
      role: 'Investment Partner',
      organization: 'NLC',
      avatar: 'vc-partner',
      bio: 'Specializes in healthcare ventures ready for international market expansion.',
      personality: 'analytical',
      feedbackStyle: 'detailed',
      investmentRange: '€10M - €40M',
      interests: ['MedTech', 'HealthTech', 'Digital Health'],
      sector: 'Healthcare Investment',
      stages: [3, 4] // Growth, Expansion
    },
    {
      id: 'impact-2',
      name: 'Daan Vermeer',
      role: 'Principal',
      organization: 'SET Ventures',
      avatar: 'impact-investor',
      bio: 'Invests in digital technologies for a carbon-free energy system.',
      personality: 'impact-focused',
      feedbackStyle: 'constructive',
      investmentRange: '€5M - €15M',
      interests: ['Clean Energy', 'Smart Grid', 'Energy Storage', 'Climate Tech'],
      sector: 'Impact Investment',
      stages: [3, 4] // Growth, Expansion
    }
  ]
};

// Mock funding opportunities based on stages
const stageFundingOpportunities: Record<number, any> = {
  0: { // Ideation
    id: 'early-grant-1',
    title: 'Innovation Kickstart Grant',
    fundProvider: 'StartupDelta Netherlands',
    sector: 'All Sectors',
    amountDescription: '€10K - €25K',
    location: 'Netherlands',
    description: 'Early-stage grant for innovative ideas and concept validation with minimal documentation required. Perfect for first-time entrepreneurs testing new concepts.',
    relevantLinks: ['https://example.com/startup-grant'],
    isEarlyStage: true
  },
  1: { // Validation
    id: 'validation-fund-1',
    title: 'MVP Development Fund',
    fundProvider: 'TechLeap.NL',
    sector: 'Technology',
    amountDescription: '€25K - €50K',
    location: 'Amsterdam',
    description: 'Funding for prototype development and market validation. Includes mentorship and technical resources for building your first MVP.',
    relevantLinks: ['https://example.com/mvp-fund'],
    isEarlyStage: true,
    equity: 'None',
    programSupport: true
  },
  2: { // Seed
    id: 'impact-seed-1',
    title: 'Sustainable Innovation Seed Fund',
    fundProvider: 'Impact Ventures NL',
    sector: 'SDG 7, 11, 13 - Clean Energy & Climate',
    amountDescription: '€100K - €250K',
    location: 'Rotterdam',
    description: 'Seed funding for startups addressing climate change and energy transition. Looking for innovative solutions with proven concepts ready to scale their impact.',
    relevantLinks: ['https://example.com/impact-seed'],
    isImpactFocused: true
  },
  3: { // Growth
    id: 'growth-fund-1',
    title: 'Scale-up Capital Accelerator',
    fundProvider: 'Dutch Founders Fund',
    sector: 'Digital Tech, Health, Smart Industry',
    amountDescription: '€500K - €2M',
    location: 'Utrecht',
    description: 'Growth capital for proven business models with international potential. Seeking startups with strong revenue growth and product-market fit.',
    relevantLinks: ['https://example.com/growth-fund'],
    details: [
      { key: 'Average Ticket', value: '€1.2M' },
      { key: 'Time to Decision', value: '10 Weeks' },
      { key: 'Portfolio Success', value: '68%' }
    ]
  },
  4: { // Expansion
    id: 'expansion-fund-1',
    title: 'Dutch Expansion Capital',
    fundProvider: 'NL Growth Partners',
    sector: 'Technology, Manufacturing, Healthcare',
    amountDescription: '€2M - €10M',
    location: 'The Hague',
    description: 'Late-stage funding for market leaders ready to expand across Europe and globally. For established companies with proven unit economics seeking rapid expansion.',
    relevantLinks: ['https://example.com/expansion-fund'],
    details: [
      { key: 'Portfolio Size', value: '€200M' },
      { key: 'Avg. Revenue', value: '€5M+' },
      { key: 'Exit Horizon', value: '5-7 Yrs' }
    ]
  }
};

// Funding filter categories
const fundingCategories = [
  {
    id: 'grants',
    name: 'Grants',
    icon: <Icons.Currency className="w-5 h-5" />,
    count: 12
  },
  {
    id: 'equity',
    name: 'Equity',
    icon: <Icons.Graph className="w-5 h-5" />,
    count: 8
  },
  {
    id: 'impact',
    name: 'Impact',
    icon: <Icons.Heart className="w-5 h-5" />,
    count: 5
  },
  {
    id: 'accelerator',
    name: 'Accelerators',
    icon: <Icons.Lightning className="w-5 h-5" />,
    count: 7
  }
];

const InvestorPanelSection: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [showAchievements, setShowAchievements] = useState<boolean>(false);
  const [pitchScores, setPitchScores] = useState<Record<number, number>>({});
  const [playerLevel, setPlayerLevel] = useState<number>(1);
  const [xpPoints, setXpPoints] = useState<number>(80);
  const [showNewStageNotice, setShowNewStageNotice] = useState<boolean>(false);
  const [newlyUnlockedStage, setNewlyUnlockedStage] = useState<number | null>(null);
  const [selectedFundingCategory, setSelectedFundingCategory] = useState<string>('all');
  const [showFundingReward, setShowFundingReward] = useState<boolean>(false);
  const [unlockedFundingOpportunity, setUnlockedFundingOpportunity] = useState<any>(null);
  
  // Get relevant investors for current stage
  const stageInvestors = mockInvestors[currentStage] || [];
  
  // Create a properly formatted Investor array for the InvestorProfiles component
  const mappedInvestors = stageInvestors.map(investor => {
    // Create a new object with only the properties needed by InvestorProfiles
    return {
      id: investor.id,
      name: investor.name,
      type: investor.sector || 'Unknown',
      description: investor.bio,
      stages: investor.stages || [],
      logo: investor.avatar,
      fundingRange: investor.investmentRange,
      preferredSectors: investor.interests,
      email: '',
      location: investor.organization
    };
  });
  
  // Get relevant funding for current stage
  const stageRelevantFunding = stageFundingOpportunities[currentStage];
  
  // Handle stage selection
  const handleStageSelect = (stageId: number) => {
    setCurrentStage(stageId);
  };
  
  // Handle stage completion and progress
  const handleStageComplete = (stageId: number, score: number) => {
    // Update pitch scores
    setPitchScores(prev => ({
      ...prev,
      [stageId]: Math.max(score, prev[stageId] || 0)
    }));
    
    // Add to completed stages if not already there
    if (!completedStages.includes(stageId)) {
      setCompletedStages(prev => [...prev, stageId]);
      
      // Award XP for completing a stage
      const baseXP = 100;
      const scoreBonus = Math.round((score / 5) * 50); // Up to 50 bonus XP based on score
      awardXP(baseXP + scoreBonus);
      
      // Show funding reward
      setUnlockedFundingOpportunity(stageFundingOpportunities[stageId]);
      setShowFundingReward(true);
      
      // Unlock next stage if available
      const nextStage = stageId + 1;
      if (nextStage <= 4 && !completedStages.includes(nextStage)) {
        // Show notification about new stage
        setNewlyUnlockedStage(nextStage);
        setShowNewStageNotice(true);
        
        // Auto-hide after 4 seconds
        setTimeout(() => {
          setShowNewStageNotice(false);
        }, 4000);
      }
    }
  };
  
  // Award XP to player
  const awardXP = (amount: number) => {
    setXpPoints(prev => {
      const newXP = prev + amount;
      
      // Check if player leveled up
      const newLevel = Math.floor(newXP / 100) + 1;
      if (newLevel > playerLevel) {
        setPlayerLevel(newLevel);
        // Here we could show a level up notification
      }
      
      return newXP;
    });
  };
  
  // Handle simulated pitch submission
  const handlePitchSubmit = (score: number) => {
    handleStageComplete(currentStage, score);
  };
  
  // Simulate pitch submission when user clicks submit in PitchBuilder
  const simulatePitchFeedback = () => {
    // This would normally come from the PitchBuilder component
    // For demo purposes, let's simulate a random score
    const simulatedScore = Math.round((3 + Math.random() * 2) * 10) / 10; // Between 3.0 and 5.0
    handlePitchSubmit(simulatedScore);
  };
  
  // Handle funding filter change
  const handleFundingFilterChange = (categoryId: string) => {
    setSelectedFundingCategory(categoryId);
  };
  
  // Add first stage as completed when component mounts
  useEffect(() => {
    if (completedStages.length === 0) {
      setTimeout(() => {
        setCompletedStages([0]);
      }, 500);
    }
  }, []);
  
  // Get the appropriate card component based on stage
  const getFundingCardForStage = (stage: number) => {
    const opportunity = stageFundingOpportunities[stage];
    
    if (stage <= 1) {
      return <FundingCardEarlyStage opportunity={opportunity} />;
    } else if (stage >= 2 && stage <= 3) {
      return <FundingCardImpact opportunity={opportunity} />;
    } else {
      return <FundingCardStats opportunity={opportunity} />;
    }
  };
  
  return (
    <div className="bg-gray-900 text-white rounded-xl overflow-hidden border border-gray-800">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dutch Funding Journey</h2>
          
          {/* Player level indicator */}
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg text-white font-bold flex items-center justify-center text-sm">
                {playerLevel}
              </div>
              <div className="ml-2">
                <div className="text-xs text-gray-300">LEVEL</div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-white">{xpPoints} XP</span>
                  <span className="text-xs text-gray-400">/ {playerLevel * 100}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setShowAchievements(true)}
              className="flex items-center gap-1 px-3 py-1.5 bg-indigo-800/40 hover:bg-indigo-800/70 rounded text-xs text-indigo-200 border border-indigo-700/50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Achievements
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Journey map */}
        <div className="lg:col-span-1 order-1">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Your Funding Journey</h3>
            <JourneyProgress 
              currentStage={currentStage}
              completedStages={completedStages}
              onStageSelect={handleStageSelect}
              pitchScores={pitchScores}
            />
          </div>
        </div>
        
        {/* Middle column: Pitch builder */}
        <div className="lg:col-span-1 order-3 lg:order-2">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Build Your Pitch</h3>
            <PitchBuilder 
              currentStage={currentStage} 
              onSubmitPitch={simulatePitchFeedback}
            />
            
            {/* Demo pitch submission button */}
            <div className="mt-4">
              <button
                onClick={simulatePitchFeedback}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors"
              >
                Submit Pitch for Feedback
              </button>
            </div>
          </div>
        </div>
        
        {/* Right column: Investor profiles */}
        <div className="lg:col-span-1 order-2 lg:order-3">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Relevant Investors</h3>
            <InvestorProfiles investors={mappedInvestors} activeStage={currentStage} />
          </div>
        </div>
      </div>
      
      {/* Funding Opportunities Section */}
      <div className="px-6 pb-6">
        <div className="mt-6 border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <h3 className="text-lg font-semibold text-white">Relevant Funding Opportunities</h3>
            
            <FundingFilterBar 
              categories={fundingCategories} 
              onFilterChange={handleFundingFilterChange}
              className="w-full md:w-auto"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFundingCardForStage(currentStage)}
            
            {currentStage > 0 && getFundingCardForStage(currentStage - 1)}
            
            {currentStage < 4 && getFundingCardForStage(currentStage + 1)}
          </div>
        </div>
      </div>
      
      {/* Achievement system */}
      <AnimatePresence>
        {showAchievements && (
          <AchievementSystem 
            currentLevel={playerLevel}
            xpPoints={xpPoints}
            onClose={() => setShowAchievements(false)}
          />
        )}
      </AnimatePresence>
      
      {/* New stage unlocked notification */}
      <AnimatePresence>
        {showNewStageNotice && newlyUnlockedStage !== null && (
          <motion.div 
            className="fixed bottom-10 right-10 z-40 bg-gradient-to-r from-blue-900 to-indigo-900 p-4 rounded-lg border border-blue-700 shadow-lg max-w-md"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <div className="flex gap-3 items-start">
              <div className="h-12 w-12 rounded-lg bg-blue-800 text-blue-300 flex items-center justify-center">
                {fundingStages[newlyUnlockedStage].icon}
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <h3 className="text-lg font-bold text-white">New Stage Unlocked!</h3>
                </div>
                <p className="text-yellow-300 font-medium mb-1">{fundingStages[newlyUnlockedStage].name}</p>
                <p className="text-sm text-gray-300">{fundingStages[newlyUnlockedStage].description}</p>
                <button
                  onClick={() => {
                    setCurrentStage(newlyUnlockedStage);
                    setShowNewStageNotice(false);
                  }}
                  className="mt-2 px-3 py-1 bg-blue-800 hover:bg-blue-700 rounded text-sm text-blue-200 transition-colors"
                >
                  Go to stage
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Funding Opportunity Reward Modal */}
      <AnimatePresence>
        {showFundingReward && unlockedFundingOpportunity && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="max-w-md w-full bg-gray-900 rounded-xl border border-gray-700 overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-4">
                <h2 className="text-xl font-bold text-white mb-1 text-center">Funding Opportunity Unlocked!</h2>
                <p className="text-blue-300 text-sm text-center">Your pitch has unlocked a new funding match</p>
              </div>
              
              <div className="p-4">
                {unlockedFundingOpportunity.isEarlyStage ? (
                  <FundingCardEarlyStage opportunity={unlockedFundingOpportunity} />
                ) : unlockedFundingOpportunity.isImpactFocused ? (
                  <FundingCardImpact opportunity={unlockedFundingOpportunity} />
                ) : (
                  <FundingCardStats opportunity={unlockedFundingOpportunity} />
                )}
                
                <div className="mt-4 flex justify-center">
                  <button 
                    onClick={() => setShowFundingReward(false)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md transition-colors"
                  >
                    Continue Your Journey
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InvestorPanelSection; 