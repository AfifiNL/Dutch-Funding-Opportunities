'use client';

import React from 'react';

// This component will be the parent of providers that require 'use client'
// Add more providers here as needed
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
} 