"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

type LogoutButtonProps = {
  collapsed: boolean;
};

export default function LogoutButton({ collapsed }: LogoutButtonProps) {
  function handleLogout() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-muted hover-default"
    >
      <LogOut className="h-4 w-4" />
      {!collapsed && "Sair"}
    </button>
  );
}
