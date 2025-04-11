# Component Library Documentation

This document provides details on the component library used in the Dutch Funding Opportunities application.

## Table of Contents

- [Overview](#overview)
- [Core UI Components](#core-ui-components)
  - [Button](#button)
  - [LoadingSpinner](#loadingspinner)
  - [IconSet](#iconset)
  - [Header](#header)
  - [UserMenu](#usermenu)
- [Auth Components](#auth-components)
- [Feature Components](#feature-components)
  - [Funding Display](#funding-display)
  - [Investor Panel](#investor-panel)
  - [Interactive Character](#interactive-character)
  - [Hero Section](#hero-section)
- [Layout Patterns](#layout-patterns)
- [Design Principles](#design-principles)
- [Usage Guidelines](#usage-guidelines)

## Overview

The component library is a collection of reusable UI elements that maintain consistency across the application. These components encapsulate design patterns, interaction behaviors, and styling with Tailwind CSS.

## Core UI Components

### Button

A versatile button component with support for different variants, animations, and icons.

**Props:**
- `variant`: 'primary' | 'secondary' (default: 'primary')
- `icon`: React.ReactNode - optional icon to display
- `fullWidth`: boolean - sets width to 100% when true
- `className`: string - additional CSS classes
- All standard button attributes are supported

**Example:**
```tsx
import Button from '@/components/Button';
import { IconArrowRight } from '@/components/IconSet';

<Button 
  variant="primary" 
  icon={<IconArrowRight />}
  onClick={handleClick}
>
  Get Started
</Button>
```

**Styling:**
```css
/* Primary button */
.btn-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}

/* Secondary button */
.btn-secondary {
  @apply bg-gray-700 text-white hover:bg-gray-800;
}
```

**Animation:**
The button uses Framer Motion for hover and tap animations, providing visual feedback to user interactions.

### LoadingSpinner

A loading indicator component used throughout the application to indicate async operations.

**Props:**
- `size`: 'small' | 'medium' | 'large' (default: 'medium')
- `className`: string - additional CSS classes

**Example:**
```tsx
import LoadingSpinner from '@/components/LoadingSpinner';

<LoadingSpinner size="small" />
```

### IconSet

A collection of SVG icons used throughout the application, ensuring consistent iconography.

**Available Icons:**
- `IconArrowRight` - Navigation arrow
- `IconCheckmark` - Confirmation checkmark
- `IconError` - Error indicator
- `IconInfo` - Information icon
- `IconWarning` - Warning indicator
- `IconProfile` - User profile icon
- `IconSettings` - Settings icon
- `IconLogout` - Logout icon
- And many more...

**Example:**
```tsx
import { IconSettings, IconLogout } from '@/components/IconSet';

<div className="flex gap-2">
  <IconSettings className="w-5 h-5" />
  <IconLogout className="w-5 h-5 text-red-500" />
</div>
```

**Props for all icons:**
- `className`: string - styling classes
- `aria-hidden`: boolean - for accessibility

### Header

The main application header with navigation and user menu.

**Features:**
- Responsive design
- Navigation links
- User authentication status
- Dropdown user menu

**Example:**
```tsx
import Header from '@/components/Header';

<Header />
```

### UserMenu

A dropdown menu for authenticated users with profile and logout options.

**Props:**
- `user`: User object from AuthContext

**Example:**
```tsx
import UserMenu from '@/components/UserMenu';
import { useAuth } from '@/hooks/useAuth';

const { user } = useAuth();

{user && <UserMenu user={user} />}
```

## Auth Components

Auth components handle user authentication flows including sign-up, sign-in, and password reset.

### SignInForm

A form component for user authentication.

**Props:**
- `onSuccess`: () => void - callback after successful sign-in
- `redirectTo`: string - where to redirect after sign-in

**Example:**
```tsx
import SignInForm from '@/components/auth/SignInForm';

<SignInForm 
  onSuccess={() => router.push('/dashboard')}
  redirectTo="/dashboard"
/>
```

### SignUpForm

A form component for new user registration.

**Props:**
- `onSuccess`: () => void - callback after successful sign-up
- `redirectTo`: string - where to redirect after sign-up

**Example:**
```tsx
import SignUpForm from '@/components/auth/SignUpForm';

<SignUpForm
  onSuccess={() => router.push('/onboarding')}
  redirectTo="/onboarding"
/>
```

### ResetPasswordForm

A form component for password reset requests.

**Props:**
- `onSuccess`: () => void - callback after successful request

**Example:**
```tsx
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

<ResetPasswordForm
  onSuccess={() => setRequestSent(true)}
/>
```

## Feature Components

### Funding Display

Components for displaying funding opportunities in various formats.

#### FundingDisplaySection

The main component for displaying funding opportunities with filtering and search capabilities.

**Props:**
- `initialOpportunities`: FundingOpportunity[] - initial data
- `showFilters`: boolean - whether to show filtering options

**Example:**
```tsx
import FundingDisplaySection from '@/features/funding-display/FundingDisplaySection';

<FundingDisplaySection
  initialOpportunities={opportunities}
  showFilters={true}
/>
```

#### FundingCard

Card component for displaying individual funding opportunity details.

**Props:**
- `opportunity`: FundingOpportunity - the opportunity data to display
- `className`: string - additional CSS classes

**Example:**
```tsx
import { FundingCard } from '@/features/funding-display/components';

<FundingCard opportunity={opportunityData} />
```

### Investor Panel

Components for displaying investor information and filtering options.

#### InvestorPanelSection

The main component for the investor directory with filtering and search.

**Props:**
- `investors`: Investor[] - list of investors to display
- `className`: string - additional CSS classes

**Example:**
```tsx
import InvestorPanelSection from '@/features/investor-panel/InvestorPanelSection';

<InvestorPanelSection investors={investorData} />
```

#### InvestorCard

Card component for displaying individual investor details.

**Props:**
- `investor`: Investor - the investor data to display
- `className`: string - additional CSS classes

**Example:**
```tsx
import { InvestorCard } from '@/features/investor-panel/components';

<InvestorCard investor={investorData} />
```

### Interactive Character

An animated character that guides users through the application.

#### InteractiveGuide

An animated character with speech bubbles that provides contextual guidance.

**Props:**
- `message`: string - the message to display
- `character`: 'advisor' | 'founder' | 'investor' - which character to show
- `mood`: 'happy' | 'neutral' | 'concerned' - emotional state of character

**Example:**
```tsx
import InteractiveGuide from '@/features/interactive-character/InteractiveGuide';

<InteractiveGuide
  message="Welcome to the funding dashboard! Here you can explore opportunities."
  character="advisor"
  mood="happy"
/>
```

### Hero Section

Components for the landing page hero section.

#### HeroSection

The main hero component with animated text and call-to-action buttons.

**Props:**
- `title`: string - main heading text
- `subtitle`: string - secondary text
- `ctaText`: string - call to action button text
- `ctaLink`: string - call to action link

**Example:**
```tsx
import HeroSection from '@/features/hero/HeroSection';

<HeroSection
  title="Find the Perfect Funding for Your Dutch Startup"
  subtitle="Navigate grants, investments, and loans tailored to innovators in the Netherlands"
  ctaText="Explore Opportunities"
  ctaLink="/opportunities"
/>
```

## Layout Patterns

### StickyHeader

A header component that sticks to the top of the viewport on scroll.

**Props:**
- `className`: string - additional CSS classes
- `children`: React.ReactNode - content to display in the header

**Example:**
```tsx
import StickyHeader from '@/components/StickyHeader';

<StickyHeader>
  <h1 className="text-xl font-bold">Page Title</h1>
  <div className="flex gap-2">
    <Button>Action 1</Button>
    <Button variant="secondary">Action 2</Button>
  </div>
</StickyHeader>
```

### Card Layout

A consistent card layout pattern used throughout the application.

**Properties:**
- Rounded corners
- Consistent padding
- Optional header and footer sections
- Shadow effects

**Implementation:**
```tsx
<div className="bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
  {header && (
    <div className="border-b border-gray-700 pb-3 mb-3">
      {header}
    </div>
  )}
  <div className="space-y-4">
    {children}
  </div>
  {footer && (
    <div className="border-t border-gray-700 pt-3 mt-3">
      {footer}
    </div>
  )}
</div>
```

## Design Principles

### Visual Consistency

All components follow these design principles:
- **Color Palette**: Consistent use of Tailwind's color system
- **Typography**: Font families and sizing from the design system
- **Spacing**: Consistent spacing using Tailwind's spacing scale
- **Animations**: Subtle, purposeful animations with consistent timing

### Responsiveness

Components are designed to be responsive by default:
- Mobile-first approach
- Appropriate sizing on different viewport widths
- Touch-friendly on mobile devices
- Keyboard accessible for desktop users

### Accessibility

Components adhere to accessibility best practices:
- Semantic HTML structure
- ARIA attributes where appropriate
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast

## Usage Guidelines

### Component Structure

Follow these patterns when creating new components:

1. **Prop Typing**: Define a clear interface for props
2. **Default Values**: Provide sensible defaults for optional props
3. **Composition**: Build complex components by composing simple ones
4. **Reusability**: Focus on reusability over specialization
5. **Documentation**: Document props and usage examples

### Example Component Template

```tsx
import React from 'react';
import clsx from 'clsx';

interface ExampleComponentProps {
  /** Primary content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Variant style */
  variant?: 'default' | 'alternative';
}

/**
 * Example component description
 */
const ExampleComponent: React.FC<ExampleComponentProps> = ({
  children,
  className,
  variant = 'default',
}) => {
  return (
    <div className={clsx(
      'base-styles',
      variant === 'default' ? 'default-styles' : 'alternative-styles',
      className
    )}>
      {children}
    </div>
  );
};

export default ExampleComponent;
```

### Styling Guidelines

When styling components:

1. Use Tailwind utility classes directly in components
2. Extract common patterns to custom classes in globals.css
3. Use clsx or classnames for conditional class applications
4. Follow mobile-first responsive design patterns

### Extending the Library

When adding new components to the library:

1. Place shared UI components in the `components/` directory
2. Place feature-specific components in the `features/` directory
3. Follow the established naming conventions
4. Update this documentation with new component details

---

This component library documentation serves as a comprehensive guide for developers working on the Dutch Funding Opportunities application. By maintaining consistency in component usage and design, we ensure a cohesive user experience throughout the application. 