"use server";

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
    throw new Error("Usuário não autenticado");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Apenas administradores podem editar usuários");
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (currentUser == null) {
    throw new Error("Usuário não encontrado");
  }

  if (currentUser?.role === "ADMIN" && currentUser.id !== session.user.id) {
    throw new Error("Não é possível editar outro usuário ADMIN");
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
    throw new Error("Usuário não autenticado");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Apenas administradores podem deletar usuários");
  }

  if (session.user.id === userId) {
    throw new Error("Administradores não podem deletar a si mesmos");
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (currentUser == null) {
    throw new Error("Usuário não encontrado");
  }

  if (currentUser?.role === "ADMIN") {
    throw new Error("Não é possível deletar outro usuário ADMIN");
  }

  await prisma.user.delete({
    where: { id: userId },
  });
}
