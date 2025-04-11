'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserMenu from './UserMenu';

const Header: React.FC = () => {
  const pathname = usePathname();
  
  return (
    <header className="bg-gray-800 shadow-md relative z-60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white">
              Dutch Funding
            </Link>
            
            <nav className="ml-10 space-x-4 hidden md:flex">
              <Link href="/" className={`${pathname === '/' ? 'text-white' : 'text-gray-300 hover:text-white'} px-3 py-2 rounded-md`}>
                Home
              </Link>
              <Link href="/funding" className={`${pathname === '/funding' ? 'text-white' : 'text-gray-300 hover:text-white'} px-3 py-2 rounded-md`}>
                Funding Opportunities
              </Link>
              <Link href="/profile" className={`${pathname === '/profile' ? 'text-white' : 'text-gray-300 hover:text-white'} px-3 py-2 rounded-md`}>
                My Profile
              </Link>
            </nav>
          </div>
          
          {/* Temporarily simplified for debugging */}
          <div className="flex items-center">
             {/* <NotificationBell />  -- Temporarily commented out */}
             <UserMenu />
             {/* <MobileMenuToggle /> -- Temporarily commented out */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 