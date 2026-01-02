"use client";

import { useEffect, useState } from "react";
import CardDashboard from "./CardDashboard";
import { BookOpen, CircleUser } from "lucide-react";
import { getLengthBooks } from "@/actions/book-actions";
import ModalAviso from "../modal/ModalAviso";
import { getLengthUsers } from "@/actions/users-actions";

export default function ContainerDashboard() {
  const [users, setUsers] = useState<number | null>(null);
  const [books, setBooks] = useState<number | null>(null);

  const [error, setError] = useState("");
  const [openModalErro, setOpenModalErro] = useState(false);

  useEffect(() => {
    async function loadLengthUsers() {
      try {
        const data = await getLengthUsers();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
        setOpenModalErro(true);
      }
    }

    async function loadLengthBooks() {
      try {
        const data = await getLengthBooks();
        setBooks(data);
      } catch (err: any) {
        setError(err.message);
        setOpenModalErro(true);
      }
    }

    loadLengthUsers();
    loadLengthBooks();
  }, []);

  return (
    <>
      <ModalAviso
        isOpen={openModalErro}
        onClose={() => setOpenModalErro(false)}
        erro={error}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-4 p-4 content-start">
        <CardDashboard
          titulo="Livros Cadastrados"
          quantidade={books}
          icon={BookOpen}
        />
        <CardDashboard
          titulo="Usuarios Cadastrados"
          quantidade={users}
          icon={CircleUser}
        />
      </div>
    </>
  );
}
