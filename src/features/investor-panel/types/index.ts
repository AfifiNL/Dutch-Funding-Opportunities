// Define types for the investor panel feature

// Investor personality types
export type InvestorPersonality = 'analytical' | 'visionary' | 'conservative' | 'risk-taker' | 'impact-focused' | 'constructive';

// Investor feedback styles
export type FeedbackStyle = 'direct' | 'constructive' | 'detailed' | 'holistic' | 'encouraging';

// Interface for Investor
export interface InvestorType {
  id: string;
  name: string;
  role: string;
  organization: string;
  sector: string;
  stages: number[];  // Funding stages (0: Ideation, 1: Validation, 2: Seed, 3: Growth, 4: Expansion)
  personality: InvestorPersonality;
  feedbackStyle: FeedbackStyle;
  investmentRange: string;
  interests: string[];
  avatar: string;
  bio: string;
}

// Interface for stage in the funding journey
export interface StageType {
  id: number;
  name: string;
  description: string;
}

// Interface for pitch components
export interface PitchComponentType {
  id: string;
  title: string;
  description: string;
  stage: number;
  required: boolean;
  completed: boolean;
  content: string;
}

// Interface for investor feedback
export interface FeedbackType {
  investorId: string;
  pitchComponentId: string;
  rating: number;  // 1-5 scale
  comment: string;
  suggestions: string[];
}

// Interface for pitch submission
export interface PitchSubmissionType {
  stageId: number;
  components: PitchComponentType[];
  overallScore: number;
  feedback: FeedbackType[];
  matchScores: {
    investorId: string;
    score: number;
    comments: string;
  }[];
} 