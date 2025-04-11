# Development Documentation

This document provides comprehensive guidance for developers working on the Dutch Funding Opportunities application.

## Project Overview

The Dutch Funding Opportunities application is designed to help startups and innovators in the Netherlands find and access funding opportunities that match their needs. The platform connects founders with investors, grants, subsidies, and other funding sources while providing tools to help prepare compelling pitches.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)
- Git
- A Supabase account (for database and authentication)

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-organization/dutch-funding-opportunities.git
   cd dutch-funding-opportunities
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env.local` file in the root directory:
   ```
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_DEVELOPMENT_MODE=true
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Database Setup

Follow these steps to set up your Supabase database:

1. Create a new project in Supabase
2. Use the SQL scripts in `docs/database-schema.md` to set up your database tables and functions
3. Set up authentication providers in Supabase dashboard (Email, Google, etc.)
4. Configure Row Level Security (RLS) policies
5. Copy your project URL and anon key to your `.env.local` file

## Architecture

### Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Hosting**: Vercel (recommended)

### Directory Structure

```
dutch-funding-opportunities/
├── docs/                      # Documentation files
├── public/                    # Static assets
├── src/
│   ├── api/                   # API modules for data fetching
│   │   ├── config.ts          # Configuration for API providers
│   │   ├── investors.ts       # Investors API
│   │   ├── fundingOpportunities.ts # Funding opportunities API
│   │   ├── pitch.ts           # Pitch related functions
│   │   ├── userProgress.ts    # User progress tracking
│   │   └── supabase/          # Supabase specific implementations
│   ├── app/                   # Next.js app directory
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── investors/         # Investor pages
│   │   ├── opportunities/     # Funding opportunities pages
│   │   ├── pitch/             # Pitch creation pages
│   │   └── profile/           # User profile pages
│   ├── components/            # Reusable React components
│   ├── contexts/              # React context providers
│   ├── features/              # Feature-specific components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions
│   ├── styles/                # CSS and style-related files
│   └── types/                 # TypeScript type definitions
├── .env.example               # Example environment variables
├── package.json               # Project dependencies
├── tailwind.config.js         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## Development Workflow

### Code Style and Conventions

- Use TypeScript for type safety
- Follow consistent naming conventions:
  - PascalCase for component files and React components
  - camelCase for functions, variables, and file names
  - snake_case for database fields
- Add comprehensive JSDoc comments for functions and components
- Group related files in feature-specific directories

### Authentication and Authorization

The application uses Supabase for authentication with JWT tokens. Authorization is handled through Supabase Row Level Security (RLS) policies defined at the database level.

#### User Types

- **Founders**: Can manage their profiles, startups, and pitches
- **Investors**: Can view startup information and submitted pitches
- **Admins**: Have full access to manage content

### Working with API Modules

The application follows a modular approach to API implementation, with support for both Supabase and mock data.

#### API Structure

- `src/api/config.ts`: Manages API configuration and determines whether to use Supabase or mock data
- `src/api/investors.ts`: Functions for fetching and managing investor data
- `src/api/fundingOpportunities.ts`: Functions for fetching funding opportunities
- `src/api/pitch.ts`: Functions for creating and managing pitch data
- `src/api/userProgress.ts`: Functions for tracking user progress through the application
- `src/api/supabase/`: Directory containing Supabase-specific implementations

#### Error Handling

All API functions follow a consistent pattern for error handling:

```typescript
try {
  // API operations
} catch (error) {
  console.error("Error in API function:", error);
  throw new Error(`Error message: ${error.message}`);
}
```

### Testing

#### Unit Tests

Write unit tests for utility functions, hooks, and components using Jest and React Testing Library:

```bash
npm test                 # Run all tests
npm test -- --watch      # Run tests in watch mode
```

#### E2E Tests

End-to-end tests use Cypress to simulate user interactions:

```bash
npm run cypress:open     # Open Cypress test runner
npm run cypress:run      # Run Cypress tests headlessly
```

### Mock Data

The application includes mock data for development and testing purposes. To enable mock data mode:

1. Set `NEXT_PUBLIC_DEVELOPMENT_MODE=true` in your `.env.local` file
2. Optionally, leave Supabase credentials undefined to force mock data usage

Mock data is located in the respective API files and follows the same interface as the real data.

## Database Integration

### Supabase Integration

The application uses Supabase for database operations and authentication. Key integration points:

1. **Client Initialization**: In `src/lib/supabase.ts`
2. **Authentication**: Managed through `src/contexts/AuthContext.tsx`
3. **API Functions**: Implemented in `src/api/supabase/*.ts` files

### Migrations

Database migrations are managed through:

1. SQL scripts in version control
2. Supabase dashboard for manual operations
3. Supabase CLI for automated deployments

## UI Components

### Component Library

The application uses a mix of custom components and Tailwind CSS for styling. Key components:

- `Button`: Standard button component with variants
- `Card`: Container for content with consistent styling
- `Input`: Form input components
- `Modal`: Dialog component for displaying modal content
- `Select`: Dropdown selection component
- `Stepper`: Multi-step process visualization

### Form Handling

Forms use React Hook Form for validation and state management. Example:

```tsx
import { useForm } from 'react-hook-form';

// In your component
const { register, handleSubmit, formState: { errors } } = useForm();

const onSubmit = async (data) => {
  // Process form data
};

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register('fieldName', { required: true })} />
    {errors.fieldName && <span>This field is required</span>}
    <button type="submit">Submit</button>
  </form>
);
```

## State Management

The application uses React Context for global state management. Key contexts:

- `AuthContext`: Manages authentication state
- `ProfileContext`: Manages user profile information
- `PitchContext`: Manages pitch creation state

## Deployment

### Vercel Deployment

1. Connect your repository to Vercel
2. Set environment variables in the Vercel dashboard
3. Deploy using the Vercel CLI or GitHub integration

### Environment Variables for Production

Ensure these environment variables are set for production:

```
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
NEXT_PUBLIC_APP_URL=https://your-production-domain.com
NEXT_PUBLIC_DEVELOPMENT_MODE=false
```

## Performance Optimization

### Caching Strategy

- Use SWR for data fetching with built-in caching
- Implement Supabase query caching where appropriate
- Use Next.js static and server-side generation for pages with static content

### Bundle Optimization

- Use dynamic imports for code splitting
- Optimize image loading with Next.js Image component
- Minimize CSS with Tailwind's purge option

## Troubleshooting

### Common Issues

1. **Authentication Problems**
   - Check that Supabase URL and anon key are correct
   - Verify that authentication providers are configured in Supabase
   - Check browser console for JWT-related errors

2. **Database Connection Issues**
   - Check the browser console for Supabase connection errors
   - Verify RLS policies are correctly set up
   - Check that table schemas match the expected structure

3. **API Errors**
   - Check network tab in browser developer tools
   - Verify that API routes return proper error responses
   - Enable development mode to see detailed error messages

#### Troubleshooting Supabase Connection

If you're having issues with the Supabase connection:

- Check that your `.env.local` file contains the correct Supabase URL and anon key
- Verify that your Supabase project is running and accessible
- Look at the browser console for any specific error messages

## Contributing

### Pull Request Process

1. Create a new branch for your feature or fix
2. Make your changes and commit them with clear, descriptive messages
3. Push your branch and open a pull request
4. Ensure all tests pass and there are no linting errors
5. Request a review from other team members

### Code Review Guidelines

- Focus on readability and maintainability
- Ensure proper error handling
- Check for potential security issues
- Verify that changes follow the project's architecture
- Ensure proper documentation is included

## Security Best Practices

- Never store sensitive information in client-side code
- Use Supabase RLS policies to restrict data access
- Implement proper input validation
- Keep dependencies updated to avoid vulnerabilities
- Use environment variables for configuration
- Implement rate limiting for API endpoints

## Internationalization (i18n)

The application uses next-i18next for internationalization:

```tsx
import { useTranslation } from 'next-i18next';

// In your component
const { t } = useTranslation('common');

return <h1>{t('title')}</h1>;
```

Translation files are located in the `public/locales` directory.

## Accessibility

- Use semantic HTML elements
- Include proper aria attributes
- Ensure keyboard navigation works
- Maintain proper color contrast
- Test with screen readers

## Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)

## Contact

For questions or support, contact the development team at:
- Email: dev-team@yourcompany.com
- Slack: #dutch-funding-app channel 