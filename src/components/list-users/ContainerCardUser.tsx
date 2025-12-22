"use client";

import { deleteUser, getUsersList } from "@/actions/users-actions";
import CardUser from "./CardUser";
import { useEffect, useState } from "react";
import ModalAviso from "@/components/modal/ModalAviso";

export default function ContainerCardUser() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getUsersList();

        setUsers(data);
      } catch (err: any) {
        setError(err.message);
        setOpen(true);
      }
    }

    loadUsers();
  }, []);

  async function handleDeleteUser(id: string) {
    try {
      await deleteUser(id);

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (err: any) {
      setError(err.message);
      setOpen(true);
    }
  }

  return (
    <>
      <ModalAviso isOpen={open} onClose={() => setOpen(false)} erro={error} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-[900px] overflow-y-auto content-start">
        {users.map((user) => (
          <CardUser
            key={user.id}
            id={user.id}
            name={user.name}
            role={user.role}
            email={user.email}
            deleteUser={handleDeleteUser}
          />
        ))}
      </div>
    </>
  );
}
