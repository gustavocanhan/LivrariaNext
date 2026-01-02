"use client";

import { X } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function UserSearch({ value, onChange }: Props) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-md
          bg-[hsl(var(--input))]
          text-[hsl(var(--input-foreground))]
          border border-[hsl(var(--input-border))]
          focus:outline-none
          focus:ring-2 focus:ring-[hsl(var(--primary))]"
      />
      <button
        type="button"
        aria-label="Limpar busca"
        onClick={() => onChange("")}
        className="absolute right-2 top-1/2 -translate-y-1/2"
      >
        <X className="h-6 w-6" />
      </button>
    </div>
  );
}
