import ThemeToggle from "@/components/theme/ThemeToggle";
import { ThemeProviderWrapper } from "@/components/theme/ThemeProviderWrapper";
import Sidebar from "@/components/sidebar/Sidebar";

export default function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <ThemeProviderWrapper>
        {/* <ThemeToggle /> */}
        <Sidebar />

        {children}
      </ThemeProviderWrapper>
    </div>
  );
}
