# Dutch Funding Opportunities Platform

A comprehensive web application that helps Dutch startups and innovators discover, explore, and manage funding opportunities across the Netherlands.

## Features

- **Funding Discovery**: Browse a curated database of grants, venture capital, angel investments, and other funding sources
- **Personalized Recommendations**: Get funding matches based on your startup's profile and needs
- **Interactive UI**: Modern, responsive interface with intuitive navigation
- **Case Studies**: Access detailed funding analysis for example companies
- **User Authentication**: Secure registration and login system
- **Saved Opportunities**: Track and save interesting funding options to your profile

## Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL database, authentication, storage)
- **Deployment**: Node.js hosting (see [DEPLOYMENT.md](DEPLOYMENT.md) for details)

## Repository Status

This repository contains the directory structure for the Dutch Funding Opportunities Platform. All required directories have been created, and you can now upload your files to these directories.

## Complete Directory Structure

```
/
├── .cursor/               # Cursor editor configuration
│   └── rules/             # Project rules for AI assistance
├── Fund-data/             # Funding dataset
├── Prototype/             # Prototype designs and mockups
├── case study/            # Case studies documentation
├── docs/                  # Documentation
├── public/                # Static assets
├── src/                   # Source code
│   ├── api/               # API endpoints and services
│   ├── app/               # Next.js app router components
│   │   ├── auth/          # Authentication pages
│   │   ├── case-studies/  # Case studies pages
│   │   │   └── isystem-ai/# Specific case study page
│   │   ├── connections/   # Networking pages
│   │   ├── funding/       # Funding opportunities pages
│   │   ├── profile/       # User profile pages
│   │   ├── reset-password/# Password reset pages
│   │   └── saved/         # Saved opportunities pages
│   ├── components/        # Reusable UI components
│   │   ├── auth/          # Authentication components
│   │   ├── layout/        # Layout components
│   │   └── ui/            # UI component library
│   ├── contexts/          # React context providers
│   ├── data/              # Static data and mock data
│   ├── features/          # Feature-specific code
│   │   ├── funding-display/# Funding display components
│   │   ├── hero/          # Hero section components
│   │   ├── interactive-character/# Interactive character feature
│   │   │   └── components/# Character components
│   │   ├── investor-panel/# Investor panel components
│   │   └── saved-opportunities/# Saved opportunities feature
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Next.js page components (legacy)
│   ├── scripts/           # Utility scripts
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
└── types/                 # Global TypeScript types
```

## Getting Started

1. Clone the repository
   ```
   git clone https://github.com/AfifiNL/Dutch-Funding-Opportunities.git
   cd Dutch-Funding-Opportunities
   ```

2. Add your project files to the appropriate directories

3. Install dependencies
   ```
   npm install
   ```

4. Set up environment variables
   Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Run the development server
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup

This project uses Supabase as its backend. To set up your own instance:

1. Create a Supabase project
2. Upload and run your SQL scripts to set up tables and sample data
3. Update your `.env.local` file with your Supabase credentials

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## License

[MIT](LICENSE)