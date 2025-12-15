"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  function handleLogout() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <button onClick={handleLogout}>
      <LogOut />
    </button>
  );
}
