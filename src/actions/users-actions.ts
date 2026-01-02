"use server";

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function getLengthUsers() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Usuário não autenticado.");
  }

  const data = await prisma.user.findMany();

  if (!data) {
    throw new Error("Nenhum usuário encontrado.");
  }

  return data.length;
}

// Retorna um usuário pelo ID
// Para editar, subir os dados para a modal de edição
export async function getUserById(userId: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Usuário não autenticado");
  }
  if (session.user.role !== "ADMIN") {
    throw new Error(
      "Apenas administradores podem acessar os dados de outros usuários."
    );
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  return user;
}

// Retornar lista de usuários
export async function getUsersList() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Usuário não autenticado.");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error(
      "Apenas administradores podem acessar a lista de usuários."
    );
  }

  const users = await prisma.user.findMany({
    where: { id: { not: session.user.id } },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!users) {
    throw new Error("Nenhum usuário encontrado.");
  }

  return users;
}

// Editar Usuário
// Apenas ADMIN pode editar outros usuários
// ADMIN não pode editar outro ADMIN
export async function updateUsersProfile(
  userId: string,
  data: {
    name: string;
    role: "ADMIN" | "USER";
  }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Usuário não autenticado.");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Apenas administradores podem editar usuários.");
  }

  if (session.user.id === userId) {
    throw new Error(
      "Administradores só podem alterar seu nível de acesso em configurações do Perfil."
    );
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (currentUser == null) {
    throw new Error("Usuário não encontrado.");
  }

  if (currentUser?.role === "ADMIN" && currentUser.id !== session.user.id) {
    throw new Error("Não é possível editar outro usuário ADMIN.");
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      role: data.role,
    },
  });
}

// Deletar Usuário
// Apenas ADMIN pode deletar outros usuários
// ADMIN não pode deletar outro ADMIN
export async function deleteUser(userId: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Usuário não autenticado.");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Apenas administradores podem deletar usuários.");
  }

  if (session.user.id === userId) {
    throw new Error("Administradores não podem deletar a si mesmos.");
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (currentUser == null) {
    throw new Error("Usuário não encontrado.");
  }

  if (currentUser?.role === "ADMIN") {
    throw new Error("Não é possível deletar outro usuário ADMIN.");
  }

  await prisma.user.delete({
    where: { id: userId },
  });
}
