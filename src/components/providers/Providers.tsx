"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProviderWrapper } from "@/components/theme/ThemeProviderWrapper";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
    </SessionProvider>
  );
}
