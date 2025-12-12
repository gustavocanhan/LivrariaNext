"use client";
import { useTheme } from "next-themes";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-full p-2 flex justify-end">
      <button
        className="border-none cursor-pointer"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <Sun /> : <Moon />}
      </button>
    </div>
  );
}
