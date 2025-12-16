"use client";
import { useTheme } from "next-themes";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";

type ThemeToggleProps = {
  collapsed: boolean;
};

export default function ThemeToggle({ collapsed }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted hover-default"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      {!collapsed && (theme === "dark" ? "Modo Claro" : "Modo Escuro")}
    </button>
  );
}
