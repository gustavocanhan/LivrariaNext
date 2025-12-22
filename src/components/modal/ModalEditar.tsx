"use client";

import { useEffect, useState } from "react";
import ModalLayout from "./ModalLayout";

type ModalEditarProps = {
  handleSubmit: (e: React.FormEvent) => void;
  onChangeName: (value: string) => void;
  onChangeRole: (value: UserRole) => void;
  isOpen: boolean;
  onClose: () => void;
  user: { id: string; name: string; email: string; role: string };
};

type UserRole = "ADMIN" | "USER";

export default function ModalEditar({
  handleSubmit,
  onChangeName,
  onChangeRole,
  isOpen,
  onClose,
  user,
}: ModalEditarProps) {
  if (!isOpen) return null;
  return (
    <ModalLayout titulo="Editar Usuário" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-[hsl(var(--foreground))]">
            Nome:
          </label>
          <input
            value={user.name}
            onChange={(e) => onChangeName(e.target.value)}
            type="text"
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
            Permissão
          </label>
          <select
            onChange={(e) => onChangeRole(e.target.value as UserRole)}
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
        <div className="pt-4 pb-2 flex justify-end">
          <button
            type="submit"
            className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-600 transition-colors"
          >
            Salvar
          </button>
        </div>
      </form>
    </ModalLayout>
  );
}
