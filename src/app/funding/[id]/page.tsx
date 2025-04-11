import FundingDetailsClient from './FundingDetailsClient';
import type { Metadata, Viewport } from 'next';

// Generate dynamic metadata based on the ID parameter
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `Funding Details | Dutch Funding Guide`,
    description: `Detailed information about this funding opportunity for startups and innovators in the Netherlands`,
    openGraph: {
      title: `Funding Details | Dutch Funding Guide`,
      description: `Detailed information about this funding opportunity for startups and innovators in the Netherlands`,
      url: `https://dutchfundingopportunities.com/funding/${params.id}`,
      siteName: 'Dutch Funding Guide',
      locale: 'en_US',
      type: 'website',
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
};

export default function FundingDetailsPage() {
  return <FundingDetailsClient />;
} 