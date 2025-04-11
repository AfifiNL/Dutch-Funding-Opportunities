import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { ProfileCompletionNotice } from './ProfileCompletionNotice';

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ProfileCompletionNotice />
      <main className="flex-grow bg-gradient-to-b from-white to-gray-50">
        {children}
      </main>
      <Footer />
    </div>
  );
}