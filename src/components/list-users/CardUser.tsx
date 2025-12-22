"use client";

import { CircleUser, SquarePen, Trash } from "lucide-react";

interface CardUserProps {
  id: string;
  name: string | null;
  role: string;
  email: string;
  deleteUser: (id: string) => void;
}

export default function CardUser({
  id,
  name,
  role,
  email,
  deleteUser,
}: CardUserProps) {
  return (
    <div
      key={id}
      className="bg-[hsl(var(--card))] rounded-lg shadow border flex flex-col h-fit"
    >
      <div className="flex justify-around py-6">
        <div>
          <div className="flex gap-2">
            <h2 className="font-semibold text-lg">{name}</h2>
            <span
              className={`rounded-lg px-1 text-[0.6rem] flex items-center justify-center border  ${
                role === "ADMIN"
                  ? "bg-green-100 text-green-800 border-green-800"
                  : "bg-orange-100 text-orange-800 border-orange-800"
              }`}
            >
              {role}
            </span>
          </div>
          <div>
            <p className="mt-2 italic">{email}</p>
          </div>
        </div>
        <div>
          <CircleUser size={42} className="rounded-full text-gray-500" />
        </div>
      </div>
      <div className="flex justify-center border-t border-t-[hsl(var(--border))]">
        <button className="flex py-4 items-center gap-2 border-r border-r-[hsl(var(--border))] w-full justify-center hover:bg-green-500 rounded-bl-lg hover:text-white transition-colors duration-200">
          <SquarePen size={16} />
          Editar
        </button>
        <button
          onClick={() => deleteUser(id)}
          className="flex py-4 items-center gap-2 w-full justify-center hover:bg-red-500 rounded-br-lg hover:text-white transition-colors duration-200"
        >
          <Trash size={16} />
          Deletar
        </button>
      </div>
    </div>
  );
}
