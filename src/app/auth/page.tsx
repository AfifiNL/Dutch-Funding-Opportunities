import AuthClient from './AuthClient';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Authentication | Dutch Funding Opportunities',
  description: 'Sign in or create an account to access personalized funding opportunities',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function AuthPage() {
  return <AuthClient />;
} 