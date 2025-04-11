import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
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
  // We'll handle authentication in client components instead of server component
  // This avoids issues with cookie-based auth detection at the layout level
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}