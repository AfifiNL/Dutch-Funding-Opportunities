import FundingClient from './FundingClient';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Funding Opportunities | Dutch Funding Guide',
  description: 'Browse and search through 300+ funding opportunities for startups and innovators in the Netherlands.',
  keywords: ['funding opportunities', 'grants', 'venture capital', 'angel investors', 'netherlands', 'startups'],
  openGraph: {
    title: 'Funding Opportunities | Dutch Funding Guide',
    description: 'Browse and search through 300+ funding opportunities for startups and innovators in the Netherlands.',
    url: 'https://dutchfundingopportunities.com/funding',
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
};

export default function FundingPage() {
  return <FundingClient />;
} 