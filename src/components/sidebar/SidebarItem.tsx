"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  label: string;
  href: string;
  icon: React.ElementType;
  collapsed: boolean;
}

export default function SidebarItem({
  label,
  href,
  icon: Icon,
  collapsed,
}: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`hover-default group relative flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted"
      }`}
    >
      <Icon className="h-6 w-6 shrink-0" />

      {!collapsed && <span className="text-base font-medium">{label}</span>}

      {collapsed && (
        <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md bg-card px-2 py-2 text-xs text-card-foreground shadow opacity-0 group-hover:opacity-100 transition-opacity">
          {label}
        </span>
      )}
    </Link>
  );
}
