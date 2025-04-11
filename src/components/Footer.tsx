'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Dutch Funding Opportunities</h3>
            <p className="text-gray-600 text-sm">
              Helping startups and innovators discover and secure funding in the Netherlands.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/funding" className="text-gray-600 hover:text-primary-600 text-sm">
                  Funding Opportunities
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-gray-600 hover:text-primary-600 text-sm">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/connections" className="text-gray-600 hover:text-primary-600 text-sm">
                  Network
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/profile" className="text-gray-600 hover:text-primary-600 text-sm">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/saved" className="text-gray-600 hover:text-primary-600 text-sm">
                  Saved Opportunities
                </Link>
              </li>
              <li>
                <Link href="/auth/signin" className="text-gray-600 hover:text-primary-600 text-sm">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-primary-600 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-primary-600 text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Dutch Funding Opportunities. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}