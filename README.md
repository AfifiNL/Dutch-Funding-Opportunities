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

This repository contains a partial codebase of the Dutch Funding Opportunities Platform. Key components and modules have been uploaded to showcase the application's architecture and core functionality. The full codebase includes additional components, pages, and features that are still in development.

### Uploaded Components

- Authentication system (login, signup, password reset)
- Core layout and UI components
- Database schema types
- Utility functions and hooks
- Sample funding data

## Project Structure

```
/
├── src/                  # Source code
│   ├── app/              # Next.js app router components
│   ├── components/       # Reusable UI components
│   │   └── auth/         # Authentication components
│   ├── features/         # Feature-specific code
│   ├── utils/            # Utility functions
│   ├── hooks/            # Custom React hooks
│   ├── contexts/         # React context providers
│   ├── api/              # API endpoints and services
│   ├── data/             # Static data and mock data
│   ├── pages/            # Next.js page components
│   ├── scripts/          # Utility scripts
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
├── .next/                # Next.js build output
├── Fund-data/            # Funding dataset
├── case study/           # Case studies documentation
├── types/                # Global TypeScript types
└── docs/                 # Documentation
```

## Getting Started

1. Clone the repository
   ```
   git clone https://github.com/AfifiNL/Dutch-Funding-Opportunities.git
   cd Dutch-Funding-Opportunities
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup

This project uses Supabase as its backend. The database schema is defined in `src/types/supabase.ts`. To set up your own instance:

1. Create a Supabase project
2. Run the SQL scripts in `fund_data_import.sql` to set up tables and sample data
3. Update your `.env.local` file with your Supabase credentials

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Contributing

This project is currently in active development. If you'd like to contribute, please reach out to the repository owner.

## License

[MIT](LICENSE)