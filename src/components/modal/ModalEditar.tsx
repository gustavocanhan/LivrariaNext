"import client";

import ModalLayout from "./ModalLayout";

type ModalEditarProps = {
  isOpen: boolean;
  onClose: () => void;
  onChange: (value: string) => void;
  user: { id: string; name: string; email: string; role: string };
};

export default function ModalEditar({
  isOpen,
  onClose,
  onChange,
  user,
}: ModalEditarProps) {
  if (!isOpen) return null;
  return (
    <ModalLayout titulo="Editar Usuário" onClose={onClose}>
      <form action="">
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-[hsl(var(--foreground))]">
            Nome:
          </label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => onChange(e.target.value)}
            className="
          w-full px-3 py-2 rounded-md
          bg-[hsl(var(--input))]
          text-[hsl(var(--input-foreground))]
          border border-[hsl(var(--input-border))]
          focus:outline-none
          focus:ring-2 focus:ring-[hsl(var(--primary))]
        "
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-[hsl(var(--foreground))]">
            E-mail:
          </label>
          <input
            disabled
            type="text"
            value={user.email}
            className="
          w-full px-3 py-2 rounded-md
          bg-[hsl(var(--input))]
          text-[hsl(var(--input-foreground))]
          border border-[hsl(var(--input-border))]
          focus:outline-none
          focus:ring-2 focus:ring-[hsl(var(--primary))]
        "
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-[hsl(var(--foreground))]">
            Nome:
          </label>
          <select
            name="role"
            className="
          w-full px-3 py-2 rounded-md
          bg-[hsl(var(--input))]
          text-[hsl(var(--input-foreground))]
          border border-[hsl(var(--input-border))]
          focus:outline-none
          focus:ring-2 focus:ring-[hsl(var(--primary))]
        "
          >
            <option value={user.role}>{user.role}</option>
            {user.role === "ADMIN" ? (
              <option value="USER">USER</option>
            ) : (
              <option value="ADMIN">ADMIN</option>
            )}
          </select>
        </div>
      </form>
    </ModalLayout>
  );
}
