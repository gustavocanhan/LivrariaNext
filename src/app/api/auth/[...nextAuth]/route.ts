import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Rota única do NextAuth para o App Router.
 * NextAuth cria vários endpoints internos (signin, signout, callback, session, csrf, providers etc).
 * O arquivo abaixo conecta todas essas rotas ao seu authOptions.
 *
 * Ao exportar GET e POST, o Next.js usará o handler do NextAuth para todas as requisições
 * que chegarem em /api/auth/* (catch all route).
 */

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
