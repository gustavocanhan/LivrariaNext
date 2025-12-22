"use client";

import {
  deleteUser,
  getUsersList,
  updateUsersProfile,
} from "@/actions/users-actions";
import CardUser from "./CardUser";
import { useEffect, useState } from "react";
import ModalAviso from "@/components/modal/ModalAviso";
import ModalEditar from "../modal/ModalEditar";

type UserRole = "ADMIN" | "USER";

export default function ContainerCardUser() {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [error, setError] = useState("");
  const [openModalErro, setOpenModalErro] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("ADMIN");

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getUsersList();

        setUsers(data);
      } catch (err: any) {
        setError(err.message);
        setOpenModalErro(true);
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
      setOpenModalErro(true);
    }
  }

  function handleEditUser(user: any) {
    setSelectedUser(user);
    setName(user.name);
    setRole(user.role);
    setOpenModalEditar(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await updateUsersProfile(selectedUser.id, { name, role });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, name, role } : user
        )
      );
      setOpenModalEditar(false);
    } catch (err: any) {
      setError(err.message);
      setOpenModalErro(true);
    }
  }

  return (
    <>
      <ModalAviso
        isOpen={openModalErro}
        onClose={() => setOpenModalErro(false)}
        erro={error}
      />

      <ModalEditar
        handleSubmit={handleSubmit}
        onChangeName={setName}
        onChangeRole={setRole}
        isOpen={openModalEditar}
        onClose={() => setOpenModalEditar(false)}
        user={selectedUser}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 h-[900px] overflow-y-auto content-start">
        {users.map((user) => (
          <CardUser
            key={user.id}
            user={user}
            editUser={handleEditUser}
            deleteUser={handleDeleteUser}
          />
        ))}
      </div>
    </>
  );
}
