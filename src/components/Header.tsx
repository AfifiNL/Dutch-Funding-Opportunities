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
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold text-teal-600 dark:text-teal-400">
            Dutch Funding
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link 
              href="/funding"
              className={`${isActive('/funding') ? 'text-teal-600 dark:text-teal-400 font-medium' : 'text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-300'}`}
            >
              Opportunities
            </Link>
            <Link 
              href="/case-studies"
              className={`${isActive('/case-studies') ? 'text-teal-600 dark:text-teal-400 font-medium' : 'text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-300'}`}
            >
              Case Studies
            </Link>
            <Link 
              href="/connections"
              className={`${isActive('/connections') ? 'text-teal-600 dark:text-teal-400 font-medium' : 'text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-300'}`}
            >
              Network
            </Link>
            <Link 
              href="/saved"
              className={`${isActive('/saved') ? 'text-teal-600 dark:text-teal-400 font-medium' : 'text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-300'}`}
            >
              Saved
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