'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserMenu } from './UserMenu';
import { NotificationBell } from './NotificationBell';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            Dutch Funding
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link 
              href="/funding"
              className={`${isActive('/funding') ? 'text-primary-600 font-medium' : 'text-gray-600 hover:text-primary-500'}`}
            >
              Opportunities
            </Link>
            <Link 
              href="/case-studies"
              className={`${isActive('/case-studies') ? 'text-primary-600 font-medium' : 'text-gray-600 hover:text-primary-500'}`}
            >
              Case Studies
            </Link>
            <Link 
              href="/connections"
              className={`${isActive('/connections') ? 'text-primary-600 font-medium' : 'text-gray-600 hover:text-primary-500'}`}
            >
              Network
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <NotificationBell />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}