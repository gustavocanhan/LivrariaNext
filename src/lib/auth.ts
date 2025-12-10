// Configuracao do NextAuth para autenticacao de usuarios
// usamos o adapter do Prisma para integrar com o banco de dados
// fornecemos um provider de credenciais para login personalizado
// exportamos authOptions para uso em outras partes da aplicacao
// getServerSession encapsula a logica de obter a sessao do usuario no servidor

import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type NextAuthOptions, getServerSession } from "next-auth";
import { CredentialsProvider } from "next-auth/providers/credentials";

import { prisma } from "./db";
import bcrypt from "bcryptjs";
