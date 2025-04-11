import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import { SupabaseProvider } from '@/components/SupabaseProvider';
import StickyHeader from '@/components/StickyHeader';
import ProfileCompletionTracker from '@/components/ProfileCompletionTracker';
import Footer from '@/components/Footer';
import { Providers } from './providers';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Dutch Funding Opportunities for Startups',
  description: 'Discover funding opportunities for startups and innovators in the Netherlands',
  keywords: ['funding', 'netherlands', 'startups', 'innovation', 'grants', 'venture capital', 'impact funding'],
  authors: [{ name: 'Dutch Funding Guide' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className={`${inter.className} min-h-screen bg-gray-900 text-gray-100 antialiased overflow-x-hidden`}>
        <Providers>
          <AuthProvider>
            <SupabaseProvider>
              <div className="relative flex flex-col min-h-screen">
                {/* Blurred background circles - z-index reduced to avoid interference */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                  <div className="absolute top-[-50vh] right-[-20vw] w-[100vw] h-[100vh] rounded-full bg-gradient-to-br from-purple-800/20 via-transparent to-transparent blur-3xl transform rotate-12"></div>
                  <div className="absolute top-[20vh] left-[-40vw] w-[100vw] h-[100vh] rounded-full bg-gradient-to-br from-blue-800/20 via-transparent to-transparent blur-3xl"></div>
                </div>
                
                {/* StickyHeader with higher z-index to ensure dropdowns work */}
                <div className="sticky top-0 z-30">
                  <StickyHeader />
                </div>

                {/* Background profile completion tracker */}
                <ProfileCompletionTracker />
                
                {/* Main content */}
                <main className="flex-grow relative pt-8 z-10">
                  {children}
                  <Footer />
                </main>
              </div>
            </SupabaseProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
} 