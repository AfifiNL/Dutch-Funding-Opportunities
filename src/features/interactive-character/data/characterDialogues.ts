'use client';

// Character dialogue messages for different contexts
export const dialogues: Record<DialogueKey, string> = {
  // General messages
  greeting: "👋 Hello! I'm your Dutch Funding Advisor. I can help you discover funding opportunities for your startup or innovation project in the Netherlands.",
  idle: "Looking for funding in the Netherlands? I can help you identify the best opportunities for your project. Try exploring different categories!",
  
  // Category-specific messages
  public_grants: "📢 Public grants are government-funded opportunities with no equity requirements. For 2025, the WBSO R&D tax credits have an expanded €1.58 billion budget, with special allocations for AI-related R&D. The new Innovation Box tax incentive offers just 9% tax rate on innovation profits!",
  private_funding: "💼 Private funding sources often provide larger investments but may require equity. For 2025, check out the new LUMO Labs Pre-seed AI Fund offering €50K-€500K for AI startups, and Invest-NL with growth capital investments from €1M to €25M for sustainable businesses.",
  accelerators: "🚀 Accelerators offer mentoring, resources, and sometimes funding. The 2025 standouts include Techstars by ABN AMRO with $120K investments for fintech startups and Antler Amsterdam offering €100K for 10% equity in early-stage startups.",
  eu_programs: "🇪🇺 EU programs provide substantial funding for cross-border innovation. The Horizon Europe budget continues to grow, with special focus areas in AI, green tech, and digital transformation.",
  
  // Specific funding type messages
  early_stage: "🌟 Early-stage funding is perfect for startups just getting started. The 2025 landscape in the Netherlands includes multiple pre-seed options like angel investor networks and specialized early-stage VCs focusing on emerging tech.",
  impact_funding: "🌱 Impact funding focuses on social and environmental benefits. The Netherlands is a leader in this space, with growing opportunities for startups addressing sustainability and circular economy. For 2025, check the new €95M Circular Batteries Subsidy.",
  
  // Interactive responses
  clicked: "Need guidance on Dutch funding options? You can filter by different categories to find exactly what you need. For 2025, there's a strong focus on AI, sustainability and digital innovations!",
  scroll_hint: "Scroll down to explore all the funding opportunities! Each category has unique options that might be perfect for your project.",
  filter_used: "Great choice! This filter will help you find more targeted funding options. I'll highlight any special opportunities in this category.",
  
  // Tips and advice
  tip_application: "💡 Pro tip: When applying for Dutch funding, tailor your application to emphasize alignment with the Dutch innovation agenda, particularly focusing on sustainability, AI, or health technology.",
  tip_combination: "💡 Pro tip: Consider combining multiple funding sources - many Dutch startups use WBSO tax credits alongside accelerator programs and private investments for optimal capital structure.",
  tip_deadlines: "💡 Pro tip: Most Dutch public funding options have specific application windows. The WBSO tax credit applications for 2025 should be submitted at least one month before you plan to start your R&D work.",
  
  // Gamification elements
  achievement_unlocked: "{placeholder for achievements that will be replaced dynamically}",
  funding_path_hint: "I've noticed you're interested in {category}. Based on your exploration pattern, you might want to check out the new 2025 options in this category. Double-click my dialogue to see a personalized funding roadmap!",
  challenge_intro: "🎯 New Challenge: {clue} Can you find this funding option?",
  challenge_success: "🏆 Challenge completed! You've found the funding option. +25 points awarded!",
  progress_update: "You've explored {percent}% of the available funding options. Keep going to discover more opportunities that might be perfect for your project!",
  
  // New 2025 funding specifics
  ai_funding: "🤖 Looking at AI funding? The 2025 landscape includes the expanded WBSO credits, the ROBUST AI Programme with €25M additional funding, and the AiNed Programme with €276M allocation. These target different stages from research to commercialization.",
  growth_fund: "📈 The Dutch Growth Fund (Groeifonds) continues to expand its focus on long-term projects that enhance the country's earning capacity, with dedicated funding tracks for AI, quantum, health, and sustainable infrastructure.",
  specialized_funds: "🔍 New specialized funds for 2025 include the PhotonDelta R&D Program with €7.7M for photonics innovations and a €10.5M Cybersecurity Resilience Investment fund focusing on digital security solutions.",
  creative_industry: "🎨 The Creative Activities Programme Grant Scheme has allocated €3.7M for 2025, supporting innovative projects at the intersection of technology, design, and media.",
  academic_collaboration: "🔬 Partnering with Dutch universities can unlock specialized funding. The TTOs (Technology Transfer Offices) at institutions like TU Delft and Wageningen University have dedicated funds for commercializing academic research.",
  corporate_ventures: "🏢 Corporate venture capital from Dutch multinationals like Philips, DSM, and Shell offers strategic funding for startups aligned with their innovation priorities, particularly in health tech, sustainable materials, and clean energy.",
  
  // Funding roadmap dialogues
  roadmap_intro: "Let's create a personalized Dutch funding roadmap for your innovation journey! I'll guide you through stages from idea to growth, suggesting the optimal funding mix at each phase.",
  roadmap_early: "Early Stage (Idea/Concept): Start with WBSO tax credits (no equity!), RVO innovation vouchers, and academic partnership grants. For AI projects, consider the new LUMO Labs Pre-seed fund. Click to continue to the next stage.",
  roadmap_prototype: "Prototype Stage: As you develop your MVP, look at Startup in Residence for pilot funding, regional innovation funds like UNIIQ, and the Techstars accelerator program if you're in fintech. The Innovation Box tax benefit can help retain profits. Click to continue.",
  roadmap_growth: "Growth Stage: For scaling, consider the Dutch Seed Capital scheme, Invest-NL financing (especially for sustainable innovations), and Horizon Europe grants for R&D. The ROBUST AI Programme offers €25M in additional funding for AI scale-ups. Click to complete your roadmap.",
  roadmap_complete: "Success! You now have a complete funding roadmap. Typically, Dutch startups combine 2-3 funding sources at each stage, balancing grants (no equity) with strategic investors who bring expertise. Feel free to explore the specific opportunities in each category!"
};

export type DialogueKey = 
  | 'greeting' 
  | 'idle' 
  | 'clicked' 
  | 'scroll_hint' 
  | 'filter_used'
  | 'public_grants'
  | 'private_funding'
  | 'accelerators'
  | 'eu_programs'
  | 'tip_application'
  | 'tip_combination'
  | 'tip_deadlines'
  | 'impact_funding'
  | 'early_stage'
  | 'progress_update'
  | 'achievement_unlocked'
  | 'challenge_intro'
  | 'challenge_success'
  | 'funding_path_hint'
  | 'roadmap_intro'
  | 'roadmap_early'
  | 'roadmap_prototype'
  | 'roadmap_growth'
  | 'roadmap_complete'
  | 'ai_funding'
  | 'growth_fund'
  | 'specialized_funds'
  | 'creative_industry'
  | 'academic_collaboration'
  | 'corporate_ventures';

// Achievement tracking for gamification
export interface AchievementData {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

// List of achievements that can be unlocked
export const achievements: AchievementData[] = [
  {
    id: 'discover_public',
    title: 'Public Funding Expert',
    description: 'Discover at least 5 public funding options',
    unlocked: false
  },
  {
    id: 'discover_private',
    title: 'Private Capital Navigator',
    description: 'Discover at least 5 private funding options',
    unlocked: false
  },
  {
    id: 'discover_accelerator',
    title: 'Accelerator Insider',
    description: 'Discover at least 3 accelerator programs',
    unlocked: false
  },
  {
    id: 'discover_impact',
    title: 'Impact Champion',
    description: 'Discover at least 3 impact funding opportunities',
    unlocked: false
  },
  {
    id: 'ai_specialist',
    title: 'AI Funding Pioneer',
    description: 'Discover at least 3 AI-specific funding options',
    unlocked: false
  },
  {
    id: 'discover_all',
    title: 'Funding Strategist',
    description: 'Explore all major funding categories',
    unlocked: false
  },
  {
    id: 'create_roadmap',
    title: 'Funding Architect',
    description: 'Create a personalized funding roadmap',
    unlocked: false
  },
  {
    id: 'discover_2025',
    title: '2025 Future Visionary',
    description: 'Discover new funding opportunities for 2025',
    unlocked: false
  }
];

// Funding challenge data for interactive quizzes
export interface FundingChallenge {
  id: string;
  question: string;
  hint: string;
  targetFunding: string;
}

// List of funding challenges
export const fundingChallenges: FundingChallenge[] = [
  {
    id: 'find_wbso',
    question: 'Can you find the largest R&D tax credit scheme in the Netherlands?',
    hint: 'Look for a tax credit with a budget over €1.5 billion',
    targetFunding: 'wbso'
  },
  {
    id: 'find_ai_program',
    question: 'There is a major program supporting Dutch AI innovation. Can you find it?',
    hint: 'Look for a program with "AI" in the name',
    targetFunding: 'ained'
  },
  {
    id: 'find_impact',
    question: 'Find a funding option specifically for circular economy innovations',
    hint: 'It involves batteries and sustainability',
    targetFunding: 'circular-batteries'
  },
  {
    id: 'find_accelerator',
    question: 'Can you find the accelerator program backed by a major Dutch bank?',
    hint: 'Look for Techstars and a banking partner',
    targetFunding: 'techstars'
  },
  {
    id: 'find_early_stage',
    question: 'Find an investment fund that offers €100K for 10% equity',
    hint: 'This fund has "Amsterdam" in its name',
    targetFunding: 'antler'
  }
]; 