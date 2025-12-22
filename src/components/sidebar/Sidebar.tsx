"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Settings, CircleUser } from "lucide-react";

import SidebarItem from "./SidebarItem";
import { sidebarItems } from "./sidebarData";
import LogoutButton from "../logout/LogoutButton";
import ThemeToggle from "../theme/ThemeToggle";
import { useSession } from "next-auth/react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const { data: session, status } = useSession();

  return (
    <aside
      className={`flex h-screen flex-shrink-0 flex-col border-r border-border transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* topo */}
      <div className="flex items-center justify-between px-3 py-4">
        {!collapsed && (
          <span className="text-lg font-semibold">My Bookstore</span>
        )}
        <button
          className="rounded-md p-1 hover:bg-muted px-2 hover-default"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* menu */}
      <nav className="flex flex-1 flex-col gap-4 px-1 pt-6">
        {sidebarItems
          .filter(
            (item) =>
              item.permission === "ALL" || session?.user.role === "ADMIN"
          )
          .map((item) => (
            <SidebarItem
              key={item.href}
              {...item}
              collapsed={collapsed}
              label={item.label}
            />
          ))}
      </nav>

      {/* rodape */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3">
          <CircleUser size={32} className="rounded-full ml-1" />

          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">{session?.user.name}</span>
              <span className="text-xs text-muted-foreground">
                {session?.user.email}
              </span>
            </div>
          )}
        </div>

        <div className="mt-3 flex flex-col gap-1">
          <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted hover-default">
            <Settings className="h-4 w-4" />
            {!collapsed && "Configurações"}
          </button>

          <ThemeToggle collapsed={collapsed} />

          <LogoutButton collapsed={collapsed} />
        </div>
      </div>
    </aside>
  );
}
