import { IFundingOpportunity } from "@/features/funding-display/types";

// Mock data based on Dutch funding opportunities
export const mockFundingData: IFundingOpportunity[] = [
  // Public Grants & Subsidies
  {
    id: "wbso",
    title: "WBSO (R&D Tax Credit)",
    fundProvider: "Rijksdienst voor Ondernemend Nederland (RVO)",
    sector: "Public Grants - R&D",
    amountDescription: "Reduction in payroll tax for R&D activities",
    location: "Netherlands",
    description: "A Dutch tax incentive that subsidizes R&D labor and development costs, ideal for software and AI development.",
    relevantLinks: ["https://www.rvo.nl/subsidie-en-financieringswijzer/wbso"],
    displayType: "default",
    details: [
      { key: "Eligibility", value: "Dutch companies performing R&D (including AI-driven projects)" },
      { key: "Funding Type", value: "Tax credit reducing payroll tax" },
      { key: "Timeline", value: "Rolling application – apply prior to or during R&D" }
    ]
  },
  {
    id: "innovatiekrediet",
    title: "Innovatiekrediet (Innovation Credit)",
    fundProvider: "Rijksdienst voor Ondernemend Nederland (RVO)",
    sector: "Public Grants - Innovation",
    amountDescription: "Up to 45% of R&D costs",
    amountMin: 100000,
    amountMax: 10000000,
    location: "Netherlands",
    description: "A government-backed loan that supports high-risk, innovative projects by financing up to 45% of R&D costs.",
    relevantLinks: ["https://www.rvo.nl/subsidie-en-financieringswijzer/innovatiekrediet"],
    displayType: "table",
    programSupport: true,
    details: [
      { key: "Eligibility", value: "Dutch startups/SMEs developing innovative products or services" },
      { key: "Funding Type", value: "Loan (repayment contingent on project success)" },
      { key: "Timeline", value: "Applications are open year-round" }
    ]
  },
  {
    id: "vroegefasefinanciering",
    title: "Vroegefasefinanciering (Proof-of-Concept Funding)",
    fundProvider: "Rijksdienst voor Ondernemend Nederland (RVO)",
    sector: "Public Grants - Early Stage",
    amountDescription: "Loan up to €450,000",
    amountMax: 450000,
    location: "Netherlands",
    description: "Early-stage loan to support proof-of-concept activities, typically used to finance feasibility studies and MVP development.",
    relevantLinks: ["https://www.rvo.nl/subsidie-en-financieringswijzer/vroegefasefinanciering"],
    displayType: "pyramid",
    details: [
      { key: "Eligibility", value: "Innovative startups and SMEs in the Netherlands" },
      { key: "Funding Type", value: "Convertible loan" },
      { key: "Timeline", value: "Open until the allocated budget is exhausted" }
    ]
  },
  {
    id: "mit-haalbaarheid",
    title: "MIT Haalbaarheid (Feasibility Grant)",
    fundProvider: "Rijksdienst voor Ondernemend Nederland (RVO)",
    sector: "Public Grants - Feasibility",
    amountDescription: "Grant up to €20,000",
    amountMax: 20000,
    location: "Netherlands",
    description: "A grant to study the technical and economic feasibility of a new innovation, ideal for validating startup concepts.",
    relevantLinks: ["https://www.rvo.nl/subsidie-en-financieringswijzer/mit-haalbaarheid"],
    displayType: "stats",
    details: [
      { key: "Eligibility", value: "Dutch SMEs with innovative ideas aligned with mission-driven themes" },
      { key: "Funding Type", value: "Non-dilutive grant" },
      { key: "Application", value: "First-come-first-serve basis, typically opens early April" }
    ]
  },
  {
    id: "sidn-fonds",
    title: "SIDN Fonds – Responsible AI Grants",
    fundProvider: "SIDN Fonds",
    sector: "Public Grants - Digital Innovation",
    amountDescription: "Grant up to €125,000",
    amountMax: 125000,
    location: "Netherlands",
    description: "Grants for projects that promote responsible AI and digital innovation, with a focus on societal impact.",
    relevantLinks: ["https://www.sidn.nl/kennis-en-inzichten/fonds"],
    displayType: "default",
    imageUrl: "/images/sidn-logo.png",
    details: [
      { key: "Eligibility", value: "Collaborations between non-profits, research institutes, and startups" },
      { key: "Funding Type", value: "Grant" },
      { key: "Timeline", value: "Specific calls with deadlines (e.g., March 31)" }
    ]
  },
  {
    id: "amif",
    title: "Asylum, Migration and Integration Fund (AMIF)",
    fundProvider: "European Commission",
    sector: "EU Programs - Integration",
    amountDescription: "Varies by project scope",
    location: "EU Member States",
    description: "Supports integration projects for third-country nationals. Startups can participate as technology providers.",
    relevantLinks: ["https://ec.europa.eu/info/policies/justice-and-fundamental-rights/equality/equality-between-women-and-men/eu-funding-programmes_en"],
    displayType: "list",
    details: [
      { key: "Eligibility", value: "Typically applied for by public or non-profit entities; startups can participate as technology providers" },
      { key: "Funding Type", value: "Grant" },
      { key: "Focus Areas", value: "Integration of newcomers, legal migration, return operations" }
    ]
  },
  {
    id: "eic-accelerator",
    title: "EIC Accelerator (EU Innovation Council)",
    fundProvider: "European Innovation Council",
    sector: "EU Programs - Innovation",
    amountDescription: "Grants up to €2.5M plus potential equity investment",
    amountMax: 2500000,
    location: "EU Member States",
    description: "Provides grants plus potential equity investment for high-impact innovations with breakthrough technologies.",
    relevantLinks: ["https://eic.ec.europa.eu/eic-funding-opportunities/eic-accelerator_en"],
    displayType: "pyramid",
    details: [
      { key: "Eligibility", value: "EU-based SMEs with breakthrough technologies" },
      { key: "Funding Type", value: "Grant + Equity" },
      { key: "Timeline", value: "Multiple cut-off dates throughout the year" }
    ]
  },
  
  // Private Funding
  {
    id: "rubio-impact",
    title: "Rubio Impact Ventures",
    fundProvider: "Rubio Impact Ventures",
    sector: "Private - Impact Investor",
    amountDescription: "Seed to Series A funding",
    amountMin: 500000,
    amountMax: 3000000,
    location: "Amsterdam, Netherlands",
    description: "Amsterdam-based impact VC focusing on world-changing entrepreneurs in sectors like education and social inclusion.",
    relevantLinks: ["https://www.rubio.vc"],
    displayType: "default",
    equity: "Yes (percentage depends on stage)",
    details: [
      { key: "Investment Stage", value: "Seed to Series A" },
      { key: "Typical Investment", value: "€500k - €3M" },
      { key: "Focus", value: "Education, social inclusion, sustainable consumption" }
    ]
  },
  {
    id: "4impact-capital",
    title: "4impact Capital",
    fundProvider: "4impact Capital",
    sector: "Private - Tech for Good",
    amountDescription: "Seed funding €200k-€1M",
    amountMin: 200000,
    amountMax: 1000000,
    location: "The Hague, Netherlands",
    description: "A Hague-based tech-for-good VC fund investing in early-stage digital companies with societal impact.",
    relevantLinks: ["https://www.4impact.nl"],
    displayType: "default",
    equity: "Yes (typically 10-20%)",
    details: [
      { key: "Investment Stage", value: "Seed funding" },
      { key: "Typical Investment", value: "€200k–€1M" },
      { key: "Focus", value: "Digital solutions with societal impact" }
    ]
  },
  {
    id: "seed-business-angel",
    title: "Seed Business Angel Scheme",
    fundProvider: "RVO + Angel Investors",
    sector: "Private - Angel Investment",
    amountDescription: "Angel investment matched with government loans",
    location: "Netherlands",
    description: "The Dutch Seed Business Angel scheme matches angel investments with government-backed loans, doubling the capital available to startups.",
    relevantLinks: ["https://www.rvo.nl/subsidie-en-financieringswijzer/seed-business-angel"],
    displayType: "table",
    equity: "Yes (depends on angel investor)",
    details: [
      { key: "Structure", value: "Angel investment + matching loan" },
      { key: "Benefits", value: "Doubles available capital" },
      { key: "Requirements", value: "Must secure qualified angel investor first" }
    ]
  },
  {
    id: "oneplanetcrowd",
    title: "Oneplanetcrowd",
    fundProvider: "Oneplanetcrowd Platform",
    sector: "Private - Crowdfunding",
    amountDescription: "Varies by campaign",
    amountMin: 50000,
    amountMax: 2500000,
    location: "Netherlands",
    description: "A crowdfunding platform focused on sustainability and social impact, allowing ventures to raise capital from the crowd.",
    relevantLinks: ["https://www.oneplanetcrowd.com"],
    displayType: "stats",
    equity: "Optional (convertible notes or direct equity possible)",
    details: [
      { key: "Platform Type", value: "Impact-focused crowdfunding" },
      { key: "Funding Options", value: "Loans, convertible notes, equity" },
      { key: "Success Rate", value: "70% of campaigns fully funded" }
    ]
  },
  
  // Accelerators & Incubators
  {
    id: "rockstart",
    title: "Rockstart - Emerging Tech Track",
    fundProvider: "Rockstart",
    sector: "Accelerator - Tech",
    amountDescription: "~€135k investment for 6% equity",
    amountMax: 135000,
    location: "Amsterdam, Netherlands",
    description: "Accelerator offering investment, intensive coaching, and access to an investor network for emerging tech startups.",
    relevantLinks: ["https://www.rockstart.com"],
    displayType: "list",
    equity: "6%",
    programSupport: true,
    details: [
      { key: "Program Length", value: "4 months" },
      { key: "Benefits", value: "Investment, mentorship, investor network" },
      { key: "Application", value: "Competitive selection process" }
    ]
  },
  {
    id: "yes-delft",
    title: "YES!Delft - AI/EdTech Programs",
    fundProvider: "YES!Delft",
    sector: "Accelerator - AI/EdTech",
    amountDescription: "No direct funding, but access to resources and pilot opportunities",
    location: "Delft, Netherlands",
    description: "An incubator supporting tech startups through a 3-month program without taking equity, focused on AI, Blockchain, and EdTech.",
    relevantLinks: ["https://www.yesdelft.com"],
    displayType: "default",
    equity: "No",
    programSupport: true,
    details: [
      { key: "Program Length", value: "3 months" },
      { key: "Benefits", value: "Mentorship, pilot projects, academic partnerships" },
      { key: "Cost", value: "Program fee may apply" }
    ]
  },
  {
    id: "utrechtinc",
    title: "UtrechtInc",
    fundProvider: "UtrechtInc",
    sector: "Accelerator - Software/EdTech",
    amountDescription: "Pre-seed investment €50k-€70k via convertible loans",
    amountMin: 50000,
    amountMax: 70000,
    location: "Utrecht, Netherlands",
    description: "Incubator offering a 10-week acceleration program with a pre-seed investment (~€50–€70k) via convertible loans.",
    relevantLinks: ["https://www.utrechtinc.nl"],
    displayType: "default",
    equity: "Convertible loan",
    programSupport: true,
    details: [
      { key: "Program Length", value: "10 weeks" },
      { key: "Focus", value: "Software and EdTech startups" },
      { key: "Investment", value: "€50-70k convertible loan" }
    ]
  },
  {
    id: "forward-incubator",
    title: "Forward·Inc (Forward Incubator)",
    fundProvider: "Forward·Inc",
    sector: "Accelerator - Newcomer Empowerment",
    amountDescription: "No direct funding, focus on coaching and networks",
    location: "Amsterdam, Netherlands",
    description: "An Amsterdam-based incubator focused on startups that empower newcomers and refugees, providing business coaching and investor networks.",
    relevantLinks: ["https://www.forwardinc.nl"],
    displayType: "stats",
    equity: "No",
    programSupport: true,
    details: [
      { key: "Focus", value: "Empowering newcomers and refugees" },
      { key: "Benefits", value: "Business coaching, networks, investor pitch opportunities" },
      { key: "Support", value: "Specialized for migrant entrepreneurs" }
    ]
  },
  {
    id: "startup-in-residence",
    title: "Startup in Residence (SiR)",
    fundProvider: "Dutch Municipalities",
    sector: "Public-Private Partnership",
    amountDescription: "Pilot funding and potential government contracts",
    location: "Multiple cities in Netherlands",
    description: "Programs where startups collaborate with municipalities to address civic challenges, offering pilot funding and government contracts.",
    relevantLinks: ["https://www.rvo.nl/subsidie-en-financieringswijzer/startup-residence"],
    displayType: "pyramid",
    programSupport: true,
    details: [
      { key: "Structure", value: "Municipality-startup collaboration" },
      { key: "Benefits", value: "Pilot funding, government contracts, high credibility" },
      { key: "Focus", value: "Civic challenges including integration" }
    ]
  },
  {
    id: "impact-hub",
    title: "Impact Hub Amsterdam",
    fundProvider: "Impact Hub Network",
    sector: "Accelerator - Social Impact",
    amountDescription: "Varies by program",
    location: "Amsterdam, Netherlands",
    description: "Runs themed accelerator cohorts focusing on sustainable business models for social impact ventures.",
    relevantLinks: ["https://www.impacthub.net/locations/amsterdam"],
    displayType: "table",
    programSupport: true,
    details: [
      { key: "Program Types", value: "Better Education, Refugee Entrepreneurship" },
      { key: "Focus", value: "Sustainable business models with social impact" },
      { key: "Network", value: "Part of global Impact Hub network" }
    ]
  }
];

// Mock data for funding opportunities
export const fundingOpportunities: IFundingOpportunity[] = [
  // Original funding opportunities would be here
  // Adding new 2025 funding opportunities
  {
    id: 'wbso-2025',
    title: 'WBSO R&D Tax Credit (2025 Expanded)',
    fundProvider: 'Netherlands Enterprise Agency (RVO)',
    sector: 'Public Grant',
    amountDescription: 'Expanded Budget €1,582 million',
    location: 'Netherlands',
    description: 'The expanded WBSO scheme for 2025 offers substantial tax benefits for R&D activities. The program has received a €192 million budget increase from the previous year. AI-focused R&D activities receive favorable treatment for labor costs associated with algorithm development and data processing systems. Applications continue on a rolling basis throughout the year.',
    relevantLinks: ['https://english.rvo.nl/subsidies-programmes/wbso'],
    displayType: 'stats',
    programSupport: false,
    details: [
      { key: 'Application Process', value: 'Rolling basis' },
      { key: 'Target Companies', value: 'All companies with R&D activities' },
      { key: 'AI Specialty', value: 'Special treatment for AI algorithm development' }
    ]
  },
  {
    id: 'innovation-box-2025',
    title: 'Innovation Box Tax Incentive',
    fundProvider: 'Dutch Tax Authority',
    sector: 'Public Tax Incentive',
    amountDescription: '9% tax rate on innovation profits',
    location: 'Netherlands',
    description: 'The Innovation Box provides a highly attractive 9% corporate tax rate on profits derived from innovative activities (compared to the standard 25.8% rate). The scheme maintains its SME-friendly approach with a 19% rate on profits up to €200,000, making it accessible for early-stage AI startups. Requires demonstrable qualifying innovative activities such as patented solutions or specialized software implementations.',
    relevantLinks: ['https://business.gov.nl/regulation/innovation-box/'],
    displayType: 'stats',
    programSupport: false,
    details: [
      { key: 'Standard Tax Rate', value: '25.8%' },
      { key: 'Innovation Box Rate', value: '9%' },
      { key: 'SME Rate (up to €200k)', value: '19%' }
    ]
  },
  {
    id: 'robust-ai-programme',
    title: 'ROBUST AI Programme',
    fundProvider: 'Dutch Research Council (NWO)',
    sector: 'Public Grant / AI Research',
    amountDescription: '€25 million additional funding',
    amountMin: 250000,
    amountMax: 500000,
    location: 'Netherlands',
    description: 'The ROBUST AI Programme has received a significant €25 million additional funding allocation from NWO to support long-term AI research and development. The complete initiative represents an €87.3 million investment in AI infrastructure. The funding supports 17 new AI labs and finances 170 PhD positions across the Netherlands over a 10-year period, creating a robust talent pipeline for AI companies.',
    relevantLinks: ['https://www.nwo.nl/en/researchprogrammes/robust-ai-programme'],
    displayType: 'default',
    programSupport: true,
    details: [
      { key: 'Total Investment', value: '€87.3 million' },
      { key: 'New AI Labs', value: '17' },
      { key: 'PhD Positions', value: '170' },
      { key: 'Timeline', value: '10 years' }
    ]
  },
  {
    id: 'ained-programme',
    title: 'AiNed Programme',
    fundProvider: 'National Growth Fund',
    sector: 'Public Grant / AI Development',
    amountDescription: '€276 million allocation',
    amountMin: 500000,
    amountMax: 2000000,
    location: 'Netherlands',
    description: 'The National Growth Fund has allocated €276 million to accelerate AI development in the Netherlands through the AiNed programme. Funding supports the creation of a nationwide AI innovation ecosystem with regional AI hubs and connecting centers of expertise. The initiative addresses five critical bottlenecks: innovation, knowledge base, employment market, society, and data sharing - all essential elements for AI startups to thrive.',
    relevantLinks: ['https://nlaic.com/en/about-nl-aic/'],
    displayType: 'pyramid',
    programSupport: true,
    details: [
      { key: 'Focus Areas', value: 'Innovation, Knowledge, Employment, Society, Data Sharing' },
      { key: 'Structure', value: 'Nationwide network with regional hubs' },
      { key: 'Application', value: 'Through NL AIC partners' }
    ]
  },
  {
    id: 'circular-batteries-subsidy',
    title: 'Circular Batteries Subsidy',
    fundProvider: 'Ministry of Economic Affairs',
    sector: 'Public Grant / Sustainability / SDG 12',
    amountDescription: '€95 million available',
    amountMin: 100000,
    amountMax: 500000,
    location: 'Netherlands',
    description: 'A newly introduced €95 million subsidy opportunity for sustainable battery development, open for applications from December 2024 to April 2025. This fund supports research, development, and implementation of circular battery technologies, focusing on reducing environmental impact and creating sustainable energy storage solutions. Ideal for startups working on innovative battery recycling, materials, or management systems.',
    relevantLinks: ['https://hollandhightech.nl/en/how-we-help-1/calls'],
    displayType: 'default',
    programSupport: false
  },
  {
    id: 'photondelta-rd',
    title: 'PhotonDelta R&D Program',
    fundProvider: 'National Growth Fund',
    sector: 'Public Grant / Technology Innovation',
    amountDescription: '€7.7 million available',
    amountMin: 50000,
    amountMax: 250000,
    location: 'Netherlands',
    description: 'Approximately €7.7 million available through the PhotonDelta R&D program, financed by the National Growth Fund to strengthen Dutch photonics technology capabilities. The program focuses on integrated photonics technologies with applications in data communications, sensing, medical technology, and semiconductor manufacturing. Open to companies developing innovations in these areas with clear commercialization potential.',
    relevantLinks: ['https://hollandhightech.nl/en/how-we-help-1/calls'],
    displayType: 'default',
    programSupport: true
  },
  {
    id: 'cybersecurity-resilience',
    title: 'Cybersecurity Resilience Investment',
    fundProvider: 'NWO and Private Investors',
    sector: 'Public-Private / Digital Security',
    amountDescription: '€10.5 million across projects',
    amountMin: 100000,
    amountMax: 350000,
    location: 'Netherlands',
    description: 'A €10.5 million investment across six projects aimed at increasing digital resilience, with almost €9 million from NWO and €1.5 million from private investors. This program supports innovative approaches to cybersecurity challenges, including AI-driven threat detection, privacy-preserving technologies, and secure-by-design methodologies. Special emphasis on solutions that can be widely implemented across critical infrastructure and digital services.',
    relevantLinks: ['https://www.nwo.nl/en/researchprogrammes/digital-security'],
    displayType: 'default',
    programSupport: false
  },
  {
    id: 'creative-activities-programme',
    title: 'Activities Programme Grant Scheme',
    fundProvider: 'Creative Industries Fund NL',
    sector: 'Public Grant / Creative Industry / Impact',
    amountDescription: '€3.7 million for 2025-2026',
    amountMin: 50000,
    amountMax: 200000,
    location: 'Netherlands (5 regions + Caribbean)',
    description: 'A new €3.7 million funding initiative for 2025-2026 supporting approximately 18 institutions in design, architecture, and digital culture. Funding prioritizes balanced support across five regions of the Netherlands plus the Caribbean territories. Applications accepted until September 3, 2024, for programs implementing innovative cultural and creative initiatives in 2025-2026.',
    relevantLinks: ['https://www.stimuleringsfonds.nl/en/grants/digital-culture-grant-scheme'],
    displayType: 'default',
    programSupport: true,
    equity: 'No equity required'
  },
  {
    id: 'lumo-labs-ai-fund',
    title: 'LUMO Labs Pre-seed AI Fund',
    fundProvider: 'LUMO Labs',
    sector: 'Private VC / AI Startups',
    amountDescription: 'From €50k to €500k',
    amountMin: 50000,
    amountMax: 500000,
    location: 'Netherlands',
    description: 'A newly established pre-seed fund specifically targeting artificial intelligence startups, complementing LUMO\'s broader impact-driven technology focus. The fund operates within a knowledge and investment consortium awarded €8 million from the Netherlands Enterprise Agency\'s Technology Transfer scheme. Strong connections with universities in Amsterdam, Utrecht, Nijmegen, and Eindhoven, plus university medical centers and the Center for Mathematics & Computer Science.',
    relevantLinks: ['https://lumolabs.io/millions-in-funding-for-dutch-ai-consortium-to-support-early-stage-ai-startups/'],
    displayType: 'default',
    programSupport: true,
    equity: 'Yes, for equity stake'
  },
  {
    id: 'dutch-seed-capital',
    title: 'Dutch Seed Capital Scheme',
    fundProvider: 'Netherlands Enterprise Agency (RVO)',
    sector: 'Public-Private / Early Stage',
    amountDescription: 'Up to 50% matching',
    location: 'Netherlands',
    description: 'Government-backed support for venture capital funds focused on early-stage technology companies. Fund managers can establish sub-funds benefiting from government backing through interest-free loans. The scheme provides up to 50% of total commitments within a VC fund, significantly leveraging private capital for technology startups. Specifically supports technological and creative start-ups by making risk capital available through qualified investment funds.',
    relevantLinks: ['https://english.rvo.nl/subsidies-programmes/seed-capital'],
    displayType: 'table',
    programSupport: false,
    equity: 'Depends on individual VC requirements'
  },
  {
    id: 'corporate-venture-capital',
    title: 'Strategic Corporate Venture Capital',
    fundProvider: 'Various Dutch Corporations',
    sector: 'Private Corporate / Strategic Investment',
    amountDescription: 'Varies by corporate partner',
    location: 'Netherlands',
    description: 'Most large technology-driven companies in the Netherlands now maintain corporate venture capital arms, creating additional funding avenues. Beyond technology, sectors including energy, healthcare, banking, and telecommunications have developed corporate venture capital initiatives. These investments offer not just capital but strategic partnerships, market access, and technical validation for AI startups.',
    relevantLinks: ['https://www.legal500.com/guides/chapter/the-netherlands-venture-capital/'],
    displayType: 'list',
    programSupport: true,
    equity: 'Yes, for equity stake'
  },
  {
    id: 'invest-nl',
    title: 'Invest-NL',
    fundProvider: 'Dutch Government',
    sector: 'Public-Private / Growth Capital',
    amountDescription: 'From €1M to €25M',
    amountMin: 1000000,
    amountMax: 25000000,
    location: 'Netherlands',
    description: 'Offering both equity investments for startups/scale-ups and venture debt options. Since its 2020 establishment, Invest-NL has become a major player in the Dutch investment landscape, particularly for companies with significant growth potential. Investments align with national economic and sustainability objectives, creating opportunities for AI companies addressing key challenges.',
    relevantLinks: ['https://www.invest-nl.nl/en'],
    displayType: 'stats',
    programSupport: false,
    equity: 'Flexible options including equity and debt'
  },
  {
    id: 'antler-amsterdam',
    title: 'Antler Amsterdam',
    fundProvider: 'Antler',
    sector: 'Accelerator / Early Stage',
    amountDescription: '€100,000 for 10% equity',
    amountMin: 100000,
    amountMax: 100000,
    location: 'Amsterdam, Netherlands',
    description: 'Antler Amsterdam offers a 6-month program with €100,000 investment for 10% equity plus a €2,500 monthly allowance, with particular strength in AI ventures. The program helps founders find co-founders, validate ideas, and build strong teams. Their extensive global network provides connections to investors and mentors worldwide. Antler has a track record of supporting successful AI and deep tech startups across their global locations.',
    relevantLinks: ['https://www.antler.co/location/amsterdam'],
    displayType: 'default',
    programSupport: true,
    equity: '10% equity'
  },
  {
    id: 'rockstart-emerging-tech',
    title: 'Rockstart Emerging Tech Track',
    fundProvider: 'Rockstart',
    sector: 'Accelerator / AI & Technology',
    amountDescription: '€135,000 investment',
    amountMin: 135000,
    amountMax: 135000,
    location: 'Amsterdam, Netherlands',
    description: 'Provides €135,000 investment during a 4-month program, now with expanded focus on AI applications across energy, agrifood, and sustainability domains. The program includes intensive mentorship, industry connections, and workspace. Rockstart\'s model includes initial funding and the opportunity for follow-on investments. Their alumni network includes some of the most successful Dutch tech startups.',
    relevantLinks: ['https://rockstart.com/emerging-tech/'],
    displayType: 'default',
    programSupport: true,
    equity: 'For equity stake'
  },
  {
    id: 'techstars-abn-amro',
    title: 'Techstars by ABN AMRO',
    fundProvider: 'Techstars & ABN AMRO',
    sector: 'Accelerator / Fintech',
    amountDescription: '$120,000 investment',
    amountMin: 110000,
    amountMax: 110000,
    location: 'Amsterdam, Netherlands',
    description: 'Specialized fintech focus with $120,000 investment for 6% equity, actively seeking AI-driven financial technology solutions. The 13-week program includes mentorship from ABN AMRO executives and the global Techstars network. Participants get access to ABN AMRO\'s APIs, data sets, and potential as a customer. Ideal for startups disrupting banking, payments, lending, wealth management, and insurance sectors.',
    relevantLinks: ['https://www.techstars.com/accelerators/abn-amro'],
    displayType: 'default',
    programSupport: true,
    equity: '6% equity'
  },
  {
    id: 'forward-incubator',
    title: 'Forward Incubator',
    fundProvider: 'Forward Incubator',
    sector: 'Incubator / Impact / SDG 10',
    amountDescription: 'Non-equity program with funding access',
    location: 'Amsterdam, Netherlands',
    description: 'Amsterdam-based program specifically focused on startups empowering newcomers and refugees, with strong alignment to social integration missions. The 6-month program helps newcomer entrepreneurs build, validate, and scale their startups. Participants receive business coaching, legal support, community access, and connections to follow-on funding. The program runs twice a year and accepts applications from refugee and migrant founders.',
    relevantLinks: ['https://forwardincubator.com/'],
    displayType: 'default',
    programSupport: true,
    equity: 'No equity required'
  },
  {
    id: 'startup-in-residence',
    title: 'Startup in Residence (SiR)',
    fundProvider: 'Various Dutch Municipalities',
    sector: 'Public / Civic Innovation / Impact',
    amountDescription: 'Pilot funding + potential contracts',
    amountMin: 10000,
    amountMax: 100000,
    location: 'Multiple cities, Netherlands',
    description: 'Connects startups with municipalities to address civic challenges, providing pilot funding and potential government contracts. Each program round identifies specific urban challenges that need solving. Selected startups work closely with government mentors to develop and test their solutions. Successful pilots may lead to procurement contracts worth up to €200,000 with the municipality. The program focuses on practical solutions that improve urban living and city services.',
    relevantLinks: ['https://startupinresidence.com/'],
    displayType: 'default',
    programSupport: true,
    equity: 'No equity required'
  },
  {
    id: 'kic-long-term',
    title: 'KIC Long-term Programmes',
    fundProvider: 'Dutch Research Council (NWO)',
    sector: 'Public-Private / Research Collaboration',
    amountDescription: '€9-25 million per project',
    amountMin: 9000000,
    amountMax: 25000000,
    location: 'Netherlands',
    description: 'Offers ten-year funding for strategic research by public-private consortia, with budgets between €9-25 million per project. These ambitious programs focus on groundbreaking innovations with significant economic and societal impact. Research themes include AI, quantum technologies, circular economy, and healthcare innovations. Requires strong collaboration between academic institutions and industry partners. Applications involve a two-stage process with preliminary and full proposals.',
    relevantLinks: ['https://www.nwo.nl/en/researchprogrammes/knowledge-and-innovation-covenant/mission-driven-calls-kic-2020-2023/long-term-programmes'],
    displayType: 'pyramid',
    programSupport: true
  }
];

// Helper function to get a specific funding opportunity by ID
export const getFundingById = (id: string): IFundingOpportunity | undefined => {
  return fundingOpportunities.find(item => item.id === id);
};

// Helper function to get funding opportunities by category
export const getFundingByCategory = (category: string): IFundingOpportunity[] => {
  if (category === 'all') return fundingOpportunities;
  
  return fundingOpportunities.filter(item => {
    const lowerCategory = category.toLowerCase();
    const lowerTitle = item.title.toLowerCase();
    const lowerDesc = item.description.toLowerCase();
    const lowerSector = item.sector.toLowerCase();
    
    switch(lowerCategory) {
      case 'public': 
        return lowerSector.includes('public');
      case 'private': 
        return lowerSector.includes('private');
      case 'accelerator': 
        return lowerSector.includes('accelerator') || lowerSector.includes('incubator');
      case 'eu': 
        return lowerSector.includes('eu') || lowerTitle.includes('european');
      case 'impact': 
        return lowerTitle.includes('impact') || 
               lowerDesc.includes('impact') || 
               lowerSector.includes('impact') ||
               lowerSector.includes('sdg');
      case 'early': 
        return lowerTitle.includes('early') || 
               lowerDesc.includes('early') || 
               lowerTitle.includes('seed') || 
               lowerDesc.includes('seed') ||
               lowerDesc.includes('pre-seed') ||
               lowerTitle.includes('pre-seed');
      case 'ai': 
        return lowerTitle.includes('ai') || 
               lowerDesc.includes('artificial intelligence') || 
               lowerDesc.includes(' ai ') ||
               lowerTitle.includes('artificial intelligence');
      default: 
        return false;
    }
  });
};

// Helper function to search funding opportunities
export const searchFunding = (query: string): IFundingOpportunity[] => {
  if (!query || query.trim() === '') return fundingOpportunities;
  
  const lowerQuery = query.toLowerCase().trim();
  
  return fundingOpportunities.filter(item => {
    return (
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.sector.toLowerCase().includes(lowerQuery) ||
      item.fundProvider.toLowerCase().includes(lowerQuery)
    );
  });
}; 