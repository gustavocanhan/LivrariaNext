import { useState } from "react";
import { Filter } from "lucide-react";

type Role = "ALL" | "USER" | "ADMIN";

type UserRoleFilterProps = {
  value: Role;
  onChange: (value: Role) => void;
};

export default function UserRoleFilter({
  value,
  onChange,
}: UserRoleFilterProps) {
  const [open, setOpen] = useState(false);

  function handleSelect(role: Role) {
    onChange(role);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 rounded-md border bg-[hsl(var(--card))] hover:bg-[hsl(var(--hover))]"
      >
        <Filter className="h-6 w-6" />
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-44 rounded-md border bg-[hsl(var(--card))] shadow-lg z-50 space-y-1">
          {(["ALL", "USER", "ADMIN"] as Role[]).map((role) => (
            <label
              key={role}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-[hsl(var(--hover))]"
            >
              <input
                type="radio"
                name="role-filter"
                checked={value === role}
                onChange={() => handleSelect(role)}
              />
              <span>
                {role === "ALL"
                  ? "Todos"
                  : role === "USER"
                  ? "Usuários"
                  : "Administradores"}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
