"use server";

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Criar Livro
// Qualquer nível de permissão de usuário
export async function addBook(data: {
  title: string;
  author: string;
  price: number;
}) {
  // Recupera a sessão do usuário logado
  const session = await getServerSession(authOptions);

  // Bloqueia se não estiver logado
  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  await prisma.book.create({
    data: {
      title: data.title,
      author: data.author,
      price: data.price,
    },
  });
}

// Editar Livro
// Qualquer nível de permissão de usuário
export async function updateBook(
  bookId: string,
  data: { title: string; author: string; price: number }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  // Atualiza o livro
  await prisma.book.update({
    where: { id: bookId },
    data: {
      title: data.title,
      author: data.author,
      price: data.price,
    },
  });
}
