import { Providers } from "@/components/providers/Providers";
import Sidebar from "@/components/sidebar/Sidebar";

export default function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Providers>
        <Sidebar />
        {children}
      </Providers>
    </div>
  );
}
