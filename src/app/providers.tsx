"use client";

import React from "react";
import { SupabaseProvider } from "@/components/SupabaseProvider";
import { AuthProvider } from "@/components/AuthProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseProvider>
      <AuthProvider>{children}</AuthProvider>
    </SupabaseProvider>
  );
}