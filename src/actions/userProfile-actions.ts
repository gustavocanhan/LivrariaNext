"use server";

import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

// Retornar dados do perfil do usuário
export async function getUserProfile() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  return user;
}

// Editar Nome do Usuário
// Usuário só pode editar seu próprio perfil
export default async function updateUserProfile(name: string) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  if (name.trim().length === 0) {
    throw new Error("O nome não pode ser vazio");
  }

  if (name.length < 3 || name.length > 50) {
    throw new Error("O nome deve ter entre 3 e 50 caracteres");
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name: name.trim() },
  });
}

// Alterar Senha do Usuário
// Usuário só pode alterar sua própria senha
export async function updateUserPassword(
  currentUserPassword: string,
  newPassword: string,
  confirmNewPassword: string
) {
  const session = await getServerSession(authOptions);

  // 1. Autenticação
  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  // 3. Validações simples
  if (
    currentUserPassword.trim().length === 0 ||
    newPassword.trim().length === 0 ||
    confirmNewPassword.trim().length === 0
  ) {
    throw new Error("As senhas não podem ser vazias");
  }

  if (newPassword.trim() !== confirmNewPassword.trim()) {
    throw new Error("A nova senha e a confirmação de senha não coincidem");
  }

  if (newPassword.trim().length < 4) {
    throw new Error("A nova senha deve ter no mínimo 4 caracteres");
  }

  if (currentUserPassword.trim() === newPassword.trim()) {
    throw new Error("A nova senha não pode ser igual à senha atual");
  }

  // 4. Banco
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user || !user.password) {
    throw new Error("Usuário inválido");
  }

  // 5. Validação com hash
  const passwordMatch = await bcrypt.compare(
    currentUserPassword.trim(),
    user.password
  );

  if (!passwordMatch) {
    throw new Error("A senha atual está incorreta");
  }

  // 6. Update
  const passwordHash = await bcrypt.hash(newPassword.trim(), 10);

  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: passwordHash },
  });
}

// Editar E-mail do Usuário
// Usuário só pode editar seu próprio e-mail
export async function updateUserEmail(
  currentUserEmail: string,
  newEmail: string,
  confirmNewEmail: string
) {
  // 1. Autenticação
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  // 3. Validações simples
  if (
    currentUserEmail.trim().length === 0 ||
    newEmail.trim().length === 0 ||
    confirmNewEmail.trim().length === 0
  ) {
    throw new Error("Os campos de email não podem ser vazios");
  }

  if (newEmail.trim() !== confirmNewEmail.trim()) {
    throw new Error("O novo email e a confirmação de email não coincidem");
  }

  // 4. Formato básico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(newEmail.trim())) {
    throw new Error("Formato de email inválido");
  }

  // 5. Banco
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user || !user.email) {
    throw new Error("Usuário inválido");
  }

  // 6. Confere se o email atual bate com o do banco
  if (user.email !== currentUserEmail.trim()) {
    throw new Error("O email atual informado está incorreto");
  }

  if (user.email === newEmail.trim()) {
    throw new Error("O novo email não pode ser igual ao email atual");
  }

  // 7. Duplicidade
  const emailAlreadyExists = await prisma.user.findUnique({
    where: { email: newEmail.trim() },
  });

  if (emailAlreadyExists) {
    throw new Error("O email informado já está em uso");
  }

  // 8. Update
  await prisma.user.update({
    where: { id: session.user.id },
    data: { email: newEmail.trim() },
  });
}
