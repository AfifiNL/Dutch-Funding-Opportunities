import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dutch Funding Opportunities',
  description: 'Find and explore funding opportunities for startups and innovators in the Netherlands',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const isAuthenticated = cookieStore.get('supabase-auth-token');

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {isAuthenticated ? (
            <AuthenticatedLayout>{children}</AuthenticatedLayout>
          ) : (
            <>{children}</>
          )}
        </Providers>
      </body>
    </html>
  );
}