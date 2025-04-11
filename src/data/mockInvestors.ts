interface MockInvestor {
  id: string;
  name: string;
  type: string;
  description: string;
  logo?: string;
  website?: string;
  email?: string;
  location?: string;
  fundingRange?: string;
  stages: string[] | number[];
  investmentThesis?: string;
  portfolioCompanies?: string[];
  successStories?: string[];
  preferredSectors?: string[];
}

interface MockInvestorsData {
  [key: string | number]: MockInvestor[];
}

const mockInvestors: MockInvestorsData = {
  // Ideation Stage (0)
  0: [
    {
      id: "inv-001",
      name: "Dutch Startup Foundation",
      type: "Incubator",
      description: "Supporting first-time entrepreneurs with mentorship and small grants.",
      logo: "/investors/incubator.svg",
      website: "https://dutchstartupfoundation.nl",
      email: "info@dutchstartupfoundation.nl",
      location: "Amsterdam",
      fundingRange: "€5,000 - €15,000",
      stages: [0],
      investmentThesis: "First-time founders with innovative ideas that address real problems.",
      preferredSectors: ["Any", "Social Impact", "Sustainability"],
      portfolioCompanies: ["GreenTech Solutions", "EduLearn", "HealthMonitor"],
      successStories: ["Helped 30+ startups move from idea to MVP in the last 2 years"]
    },
    {
      id: "inv-002",
      name: "TechStars Nederland",
      type: "Accelerator",
      description: "Early-stage accelerator for tech startups with revolutionary ideas.",
      logo: "/investors/accelerator.svg",
      website: "https://techstars.nl",
      email: "applications@techstars.nl",
      location: "Utrecht",
      fundingRange: "€20,000 - €50,000",
      stages: [0, 1],
      investmentThesis: "Tech startups with a unique approach to solving market problems.",
      preferredSectors: ["Software", "AI/ML", "Fintech", "Healthtech"],
      portfolioCompanies: ["DataSense", "AILens", "FinStack"],
      successStories: ["Our startups have raised over €10M in follow-on funding"]
    },
  ],
  
  // Validation Stage (1)
  1: [
    {
      id: "inv-003",
      name: "Dutch Innovation Fund",
      type: "Public Grant",
      description: "Government-backed fund supporting innovative Dutch startups.",
      logo: "/investors/public-grant.svg",
      website: "https://dutchinnovationfund.nl",
      email: "grants@dutchinnovationfund.nl",
      location: "The Hague",
      fundingRange: "€25,000 - €100,000",
      stages: [1],
      investmentThesis: "Startups that demonstrate innovative technology with market potential.",
      preferredSectors: ["Climate Tech", "Digital Health", "Smart Mobility", "Agritech"],
      portfolioCompanies: ["GrowBox", "MedConnect", "CleanRide"],
      successStories: ["Supported 50+ startups who achieved market validation"]
    },
    {
      id: "inv-004",
      name: "Dutch Angel Collective",
      type: "Angel Investor",
      description: "Group of experienced entrepreneurs investing in early-stage startups.",
      logo: "/investors/angel.svg",
      website: "https://dutchangelcollective.nl",
      email: "pitches@dutchangelcollective.nl",
      location: "Amsterdam, Rotterdam",
      fundingRange: "€25,000 - €150,000",
      stages: [1, 2],
      investmentThesis: "Driven founders with a clear vision and early customer validation.",
      preferredSectors: ["E-commerce", "SaaS", "Marketplaces", "Consumer Tech"],
      portfolioCompanies: ["ShopDirect", "CloudTools", "ConsumerApp"],
      successStories: ["6 of our portfolio companies have been acquired in the last 3 years"]
    },
  ],
  
  // Seed Stage (2)
  2: [
    {
      id: "inv-005",
      name: "Orange Ventures",
      type: "Venture Capital",
      description: "Early-stage VC focusing on innovative technology startups.",
      logo: "/investors/vc.svg",
      website: "https://orangeventures.nl",
      email: "invest@orangeventures.nl",
      location: "Amsterdam",
      fundingRange: "€250,000 - €1,000,000",
      stages: [2],
      investmentThesis: "Startups with unique IP, growing customer base, and scalable business model.",
      preferredSectors: ["Enterprise Software", "Deeptech", "Cybersecurity", "Fintech"],
      portfolioCompanies: ["SecureNet", "AIFactory", "DataCloud"],
      successStories: ["Our portfolio has a combined valuation of over €500M"]
    },
    {
      id: "inv-006",
      name: "Impact Capital Partners",
      type: "Impact Investor",
      description: "Seed-stage investor focusing on startups with significant social impact.",
      logo: "/investors/impact.svg",
      website: "https://impactcapital.nl",
      email: "hello@impactcapital.nl",
      location: "Rotterdam",
      fundingRange: "€200,000 - €750,000",
      stages: [2, 3],
      investmentThesis: "Companies that blend profit with purpose and have scalable impact models.",
      preferredSectors: ["Clean Energy", "Circular Economy", "EdTech", "HealthTech"],
      portfolioCompanies: ["CircularPackaging", "SolarDrives", "EduAccess"],
      successStories: ["Our companies have positively impacted over 1 million people"]
    },
  ],
  
  // Growth Stage (3)
  3: [
    {
      id: "inv-007",
      name: "Holland Growth Capital",
      type: "Venture Capital",
      description: "Growth-stage VC firm investing in market leaders.",
      logo: "/investors/vc.svg",
      website: "https://hollandgrowth.nl",
      email: "investments@hollandgrowth.nl",
      location: "Amsterdam",
      fundingRange: "€1M - €5M",
      stages: [3],
      investmentThesis: "Companies with proven business models ready for European expansion.",
      preferredSectors: ["B2B SaaS", "Marketplace", "Enterprise Tech", "Healthtech"],
      portfolioCompanies: ["B2BSoftware", "MarketConnect", "HealthOS"],
      successStories: ["Led 12 companies to international expansion across Europe"]
    },
    {
      id: "inv-008",
      name: "Dutch Tech Fund",
      type: "Corporate VC",
      description: "Corporate venture arm investing in strategic technology companies.",
      logo: "/investors/corporate.svg",
      website: "https://dutchtechfund.nl",
      email: "ventures@dutchtechfund.nl",
      location: "Eindhoven",
      fundingRange: "€2M - €7M",
      stages: [3, 4],
      investmentThesis: "Technology companies with strong IP that align with our corporate strategy.",
      preferredSectors: ["IoT", "Smart Industry", "Advanced Materials", "High-Tech Systems"],
      portfolioCompanies: ["SmartFactory", "SensorTech", "MaterialScience"],
      successStories: ["Facilitated corporate partnerships for 80% of our portfolio"]
    },
  ],
  
  // Expansion Stage (4)
  4: [
    {
      id: "inv-009",
      name: "Dutch Global Expansion Fund",
      type: "Investment Fund",
      description: "Late-stage equity investor for international expansion.",
      logo: "/investors/investment-fund.svg",
      website: "https://dgef.nl",
      email: "global@dgef.nl",
      location: "Amsterdam",
      fundingRange: "€5M - €20M",
      stages: [4],
      investmentThesis: "Market leaders ready to expand to US, Asia and beyond.",
      preferredSectors: ["Enterprise Software", "E-commerce", "Logistics", "Fintech"],
      portfolioCompanies: ["GlobalSoft", "LogiTrade", "FinConnect"],
      successStories: ["Helped 5 Dutch champions become global category leaders"]
    },
    {
      id: "inv-010",
      name: "NextGen Partners",
      type: "Private Equity",
      description: "PE firm focused on scaling proven business models.",
      logo: "/investors/private-equity.svg",
      website: "https://nextgenpartners.nl",
      email: "office@nextgenpartners.nl",
      location: "Rotterdam",
      fundingRange: "€10M - €30M+",
      stages: [4],
      investmentThesis: "Established companies with strong management and growth potential.",
      preferredSectors: ["Software", "Healthcare", "Industrial Tech", "Consumer Brands"],
      portfolioCompanies: ["SoftwareCompany", "HealthGroup", "ConsumerBrand"],
      successStories: ["Generated 3x+ returns for 60% of our portfolio companies"]
    },
  ]
};

export default mockInvestors; 