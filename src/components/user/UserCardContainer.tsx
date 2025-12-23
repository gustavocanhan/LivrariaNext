"use client";

import { useEffect, useState } from "react";
import {
  deleteUser,
  getUsersList,
  updateUsersProfile,
} from "@/actions/users-actions";
import UserCard, { User } from "./UserCard";
import EditUserModal from "./EditUserModal";
import ModalAviso from "../modal/ModalAviso";
import UserSearch from "./UserSearch";

export default function UserCardContainer() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isWarningModalOpen, setWarningModalOpen] = useState(false);

  const [selectUser, setSelectUser] = useState<User | null>(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getUsersList();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
        setWarningModalOpen(true);
      }
    }
    loadUsers();
  }, []);

  function handleEdit(user: User) {
    setSelectUser(user);
    setIsEditModalOpen(true);
  }

  async function handleDelete(id: string) {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err: any) {
      setError(err.message);
      setWarningModalOpen(true);
    }
  }

  async function handleSave(updateUser: User) {
    try {
      await updateUsersProfile(updateUser.id, {
        name: updateUser.name ?? "",
        role: updateUser.role,
      });

      setUsers((prev) =>
        prev.map((u) => (u.id === updateUser.id ? updateUser : u))
      );

      setIsEditModalOpen(false);
      setSelectUser(null);
    } catch (err: any) {
      setError(err.message);
      setWarningModalOpen(true);
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div>
        <UserSearch value={search} onChange={setSearch} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {isEditModalOpen && selectUser && (
        <EditUserModal
          user={selectUser}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectUser(null);
          }}
          onSave={handleSave}
        />
      )}

      <ModalAviso
        isOpen={isWarningModalOpen}
        onClose={() => {
          setWarningModalOpen(false);
          setError("");
        }}
        erro={error}
      />
    </>
  );
}
