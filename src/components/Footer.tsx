'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Dutch Funding Opportunities</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Helping startups and innovators discover and secure funding in the Netherlands.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4 text-gray-900 dark:text-white">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/funding" className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm">
                  Funding Opportunities
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/connections" className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm">
                  Network
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4 text-gray-900 dark:text-white">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/profile" className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/saved" className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm">
                  Saved Opportunities
                </Link>
              </li>
              <li>
                <Link href="/auth?view=login" className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/auth?view=signup" className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium mb-4 text-gray-900 dark:text-white">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Dutch Funding Opportunities. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}