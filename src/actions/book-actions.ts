"use server";

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getLengthBooks() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Usuário não autenticado.");
  }

  const data = await prisma.book.findMany();

  if (!data) {
    throw new Error("Nenhum livro encontrado.");
  }

  return data.length;
}

export async function getBooks() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Usuário não autenticado.");
  }

  const data = await prisma.book.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!data) {
    throw new Error("Nenhum livro encontrado.");
  }

  return data;
}

// Criar Livro
// Qualquer nível de permissão de usuário
export async function addBook(data: {
  title: string;
  author: string;
  price: number;
  description: string;
}) {
  // Recupera a sessão do usuário logado
  const session = await getServerSession(authOptions);

  // Bloqueia se não estiver logado
  if (!session) {
    throw new Error("Usuário não autenticado.");
  }

  const book = await prisma.book.create({
    data: {
      title: data.title,
      author: data.author,
      price: data.price,
      description: data.description,
    },
  });

  if (!book) {
    throw new Error("Houve um erro ao cadastrar o livro.");
  }

  return book;
}

// Editar Livro
// Qualquer nível de permissão de usuário
export async function updateBook(
  bookId: string,
  data: { title: string; author: string; price: number; description: string }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Usuário não autenticado.");
  }

  // Atualiza o livro
  await prisma.book.update({
    where: { id: bookId },
    data: {
      title: data.title,
      author: data.author,
      price: data.price,
      description: data.description,
    },
  });
}

// Deletar Livro
// Apenas usuários com permissão de 'admin'
export async function deleteBook(bookId: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Usuário não autenticado.");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Apenas administradores podem deletar livros.");
  }

  // Exclui o livro
  await prisma.book.delete({
    where: { id: bookId },
  });
}
