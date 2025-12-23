"use client";

import { useEffect, useState } from "react";
import { User } from "./UserCard";

type Props = {
  user: User;
  onClose: () => void;
  onSave: (user: User) => void;
};

export default function EditUserModal({ user, onClose, onSave }: Props) {
  const [name, setName] = useState("");
  const [role, setRole] = useState<User["role"]>("USER");

  useEffect(() => {
    setName(user.name ?? "");
    setRole(user.role);
  }, [user]);

  function handleSave() {
    onSave({
      ...user,
      name,
      role,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[hsl(var(--card))] rounded-lg p-6 w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Editar Usuário</h2>

        <label className="block text-sm mb-1">Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-3"
        />

        <label className="block text-sm mb-1">Perfil</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as User["role"])}
        >
          <option value={user.role}>{user.role}</option>
          {user.role === "ADMIN" ? (
            <option value="USER">USER</option>
          ) : (
            <option value="ADMIN">ADMIN</option>
          )}
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md bg-red-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 border rounded-md bg-blue-600"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
