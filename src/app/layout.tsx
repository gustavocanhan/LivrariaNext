import type { Metadata } from "next";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
