import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800/50 backdrop-blur-sm mt-16 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Dutch Funding</h3>
            <p className="text-gray-400 text-sm">
              Connecting Dutch startups and innovators with the right funding opportunities.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/funding" className="text-gray-400 hover:text-teal-300 text-sm">
                  Funding Database
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-400 hover:text-teal-300 text-sm">
                  Startup Resources
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-teal-300 text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-teal-300 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-teal-300 text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-teal-300 text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-teal-300 text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-teal-300 text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-gray-500 text-sm text-center">
            &copy; {currentYear} Dutch Funding. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 