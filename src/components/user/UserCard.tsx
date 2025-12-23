"use client";

import { CircleUser } from "lucide-react";
import UserCardActions from "./UserCardActions";

export type User = {
  id: string;
  name: string | null;
  email: string;
  role: "ADMIN" | "USER";
};

type Props = {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
};

export default function UserCard({ user, onEdit, onDelete }: Props) {
  return (
    <div
      key={user.id}
      className="bg-[hsl(var(--card))] rounded-lg shadow border flex flex-col h-fit"
    >
      <div className="flex justify-around py-6">
        <div>
          <div className="flex gap-2">
            <h2 className="font-semibold text-lg">{user.name ?? "-"}</h2>
            <span
              className={`rounded-lg px-1 text-[0.6rem] flex items-center justify-center border  ${
                user.role === "ADMIN"
                  ? "bg-green-100 text-green-800 border-green-800"
                  : "bg-orange-100 text-orange-800 border-orange-800"
              }`}
            >
              {user.role}
            </span>
          </div>
          <div>
            <p className="mt-2 italic">{user.email}</p>
          </div>
        </div>
        <div>
          <CircleUser size={42} className="rounded-full text-gray-500" />
        </div>
      </div>
      <div className="flex justify-center border-t border-t-[hsl(var(--border))]">
        <UserCardActions
          onEdit={() => onEdit(user)}
          onDelete={() => onDelete(user.id)}
        />
      </div>
    </div>
  );
}
