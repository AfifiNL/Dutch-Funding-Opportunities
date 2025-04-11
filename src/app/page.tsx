import HomeClient from './HomeClient';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Dutch Funding Opportunities for Startups',
  description: 'Find the perfect funding match for your startup in the Netherlands. Explore grants, venture capital, accelerators, and more.',
  keywords: ['funding', 'netherlands', 'startups', 'innovation', 'grants', 'venture capital', 'startup funding'],
  openGraph: {
    title: 'Dutch Funding Opportunities for Startups',
    description: 'Find the perfect funding match for your startup in the Netherlands',
    url: 'https://dutchfundingopportunities.com',
    siteName: 'Dutch Funding Guide',
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
  themeColor: '#111827',
};

export default function HomePage() {
  return <HomeClient />;
} 