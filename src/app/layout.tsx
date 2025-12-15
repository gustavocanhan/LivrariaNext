import { ThemeProvider } from "next-themes";
import "./globals.css";

import type { Metadata } from "next";
import ThemeToggle from "./../components/theme/ThemeToggle";
import { ThemeProviderWrapper } from "@/components/theme/ThemeProviderWrapper";

export const metadata: Metadata = {
  title: "Livraria",
  description: "Sistema de Livraria",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProviderWrapper>
          <ThemeToggle />
          {children}
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
