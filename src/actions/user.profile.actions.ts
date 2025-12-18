"use server";

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

// Editar Nome do Usuário
// Usuário só pode editar seu próprio perfil
export default async function updateUserProfile(userId: string, name: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  if (session.user.id !== userId) {
    throw new Error("Você só pode editar seu próprio perfil");
  }

  if (name.trim().length === 0) {
    throw new Error("O nome não pode ser vazio");
  }

  if (name.length < 3 || name.length > 50) {
    throw new Error("O nome deve ter entre 3 e 50 caracteres");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { name: name.trim() },
  });
}

// Alterar Senha do Usuário
// Usuário só pode alterar sua própria senha
export async function updateUserPassword(
  userId: string,
  currentUserPassword: string,
  confirmNewPassword: string,
  newPassword: string
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  if (session.user.id !== userId) {
    throw new Error("Você só pode alterar sua própria senha");
  }

  if (
    currentUserPassword.trim().length === 0 ||
    newPassword.trim().length === 0
  ) {
    throw new Error("As senhas não podem ser vazias");
  }

  if (currentUserPassword.trim() === newPassword.trim()) {
    throw new Error(
      "A nova senha não pode ser igual à uma senha utilizada anteriormente"
    );
  }

  if (newPassword.trim() !== confirmNewPassword.trim()) {
    throw new Error("A nova senha e a confirmação de senha não coincidem");
  }

  if (newPassword.trim().length < 4) {
    throw new Error("A nova senha deve ter no mínimo 4 caracteres");
  }

  const passwordHash = await bcrypt.hash(newPassword.trim(), 10);

  await prisma.user.update({
    where: { id: userId },
    data: { password: passwordHash },
  });
}

export async function updateUserEmail(
  userId: string,
  currentUserEmail: string,
  confirmNewEmail: string,
  newEmail: string
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  if (session.user.id !== userId) {
    throw new Error("Você só pode alterar seu próprio email");
  }
}
