"use client";

import { Pencil, Trash2 } from "lucide-react";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function UserCardActions({ onEdit, onDelete }: Props) {
  return (
    <div className="flex w-full">
      <button
        onClick={onEdit}
        className="flex py-4 items-center gap-2 border-r border-r-[hsl(var(--border))] w-full justify-center hover:bg-green-500 rounded-bl-lg hover:text-white transition-colors duration-200"
      >
        <Pencil size={16} />
        Editar
      </button>

      <button
        onClick={onDelete}
        className="flex py-4 items-center gap-2 w-full justify-center hover:bg-red-500 rounded-br-lg hover:text-white transition-colors duration-200"
      >
        <Trash2 size={16} />
        Excluir
      </button>
    </div>
  );
}
