// Types for Dutch Funding Journey

// Investor Personality Types
export type PersonalityType = 'analytical' | 'visionary' | 'conservative' | 'risk-taker' | 'impact-focused' | 'constructive';

// Investor Avatar Types  
export type AvatarType = string;

// Investor Feedback Styles
export type FeedbackStyle = string;

// Funding Stages
export type FundingStage = number; // 0: Ideation, 1: Validation, 2: Seed, 3: Growth, 4: Expansion

// Investor Type
export interface InvestorType {
  id: string;
  name: string;
  role: string;
  organization: string;
  avatar: AvatarType;
  bio: string;
  personality: PersonalityType;
  feedbackStyle: FeedbackStyle;
  investmentRange: string;
  interests: string[];
  sector?: string;
  stages?: FundingStage[];
}

// Pitch Component Interface
export interface PitchComponentType {
  id: string;
  title: string;
  description: string;
}

// Feedback Interface
export interface FeedbackType {
  investorId: string;
  pitchComponentId: string;
  rating: number;
  comment: string;
  suggestions: string[];
}

// Achievement Interface
export interface AchievementType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  category: 'pitch' | 'feedback' | 'funding' | 'special';
  xpReward: number;
  dateUnlocked?: string;
}

// Level Reward Interface
export interface LevelRewardType {
  level: number;
  reward: string;
}

// Player Progress Interface
export interface PlayerProgressType {
  level: number;
  xp: number;
  completedStages: number[];
  achievements: string[];
  pitchScores: Record<number, number>;
} 