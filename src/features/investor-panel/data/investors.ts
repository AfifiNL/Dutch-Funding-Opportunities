import { InvestorType } from '../types';

// Mock avatar imports (in production, these would be actual image paths)
// For now, we'll use placeholder strings that will be replaced with actual SVG components
const avatarPlaceholders = {
  publicGrant: 'public-grant-officer',
  vcPartner: 'vc-partner',
  angelInvestor: 'angel-investor',
  acceleratorDirector: 'accelerator-director',
  impactInvestor: 'impact-investor',
};

// Initial investor data
export const initialInvestors: InvestorType[] = [
  {
    id: 'investor-1',
    name: 'Emma van der Meulen',
    role: 'Public Grant Officer',
    organization: 'RVO (Netherlands Enterprise Agency)',
    sector: 'innovation',
    stages: [0, 1, 2], // Ideation, Validation, Seed
    personality: 'analytical',
    feedbackStyle: 'detailed',
    investmentRange: '€50,000 - €250,000',
    interests: ['clean tech', 'digital innovation', 'healthcare'],
    avatar: avatarPlaceholders.publicGrant,
    bio: 'Emma oversees innovation grants at RVO, focusing on early-stage startups with strong R&D components. She looks for clear innovation potential and societal impact.'
  },
  {
    id: 'investor-2',
    name: 'Thomas de Boer',
    role: 'VC Partner',
    organization: 'Peak Capital',
    sector: 'technology',
    stages: [2, 3, 4], // Seed, Growth, Expansion
    personality: 'visionary',
    feedbackStyle: 'direct',
    investmentRange: '€500,000 - €3,000,000',
    interests: ['B2B SaaS', 'fintech', 'marketplace platforms'],
    avatar: avatarPlaceholders.vcPartner,
    bio: 'Thomas is a seasoned venture capitalist who has backed over 30 successful startups. He focuses on companies with proven traction and scalable business models.'
  },
  {
    id: 'investor-3',
    name: 'Sophie Jansen',
    role: 'Angel Investor',
    organization: 'Dutch Angel Network',
    sector: 'technology',
    stages: [1, 2], // Validation, Seed
    personality: 'risk-taker',
    feedbackStyle: 'encouraging',
    investmentRange: '€25,000 - €100,000',
    interests: ['consumer tech', 'direct-to-consumer brands', 'mobile applications'],
    avatar: avatarPlaceholders.angelInvestor,
    bio: 'With exits from two successful startups, Sophie now mentors and invests in early-stage companies. She values strong founding teams and innovative business models.'
  },
  {
    id: 'investor-4',
    name: 'Joris Klaassen',
    role: 'Accelerator Director',
    organization: 'StartupBootcamp Amsterdam',
    sector: 'fintech',
    stages: [0, 1], // Ideation, Validation
    personality: 'constructive',
    feedbackStyle: 'holistic',
    investmentRange: '€15,000 - €50,000',
    interests: ['banking innovation', 'real estate tech', 'urban mobility'],
    avatar: avatarPlaceholders.acceleratorDirector,
    bio: 'Joris runs the fintech and smart city programs at StartupBootcamp Amsterdam. He focuses on startups ready for mentorship and rapid market validation.'
  },
  {
    id: 'investor-5',
    name: 'Lena Vermeulen',
    role: 'Impact Investor',
    organization: 'Social Impact Ventures',
    sector: 'sustainability',
    stages: [1, 2, 3], // Validation, Seed, Growth
    personality: 'impact-focused',
    feedbackStyle: 'constructive',
    investmentRange: '€300,000 - €1,500,000',
    interests: ['green energy', 'waste reduction', 'social inclusion'],
    avatar: avatarPlaceholders.impactInvestor,
    bio: 'Lena invests in companies that deliver measurable positive impact alongside financial returns. She looks for scalable solutions to pressing environmental and social challenges.'
  }
];

// Function to get investors by stage
export const getInvestorsByStage = (stageId: number): InvestorType[] => {
  return initialInvestors.filter(investor => investor.stages && investor.stages.includes(stageId));
};

// Function to get investor by ID
export const getInvestorById = (id: string): InvestorType | undefined => {
  return initialInvestors.find(investor => investor.id === id);
}; 