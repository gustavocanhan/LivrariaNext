/**
 * src/lib/auth.ts
 *
 * Configuração do NextAuth para autenticação.
 * - Usamos o adapter Prisma para persistir sessões e contas no banco.
 * - Fornecemos um provider de Credenciais (email + senha) como exemplo.
 * - Exportamos `authOptions` para reutilização e `getServerAuthSession` para
 *   facilitar uso no App Router / API Routes.
 *
 * Observação: este arquivo pressupõe que você já tem:
 *  - uma instância Prisma exportada em src/lib/db.ts como `prisma`
 *  - variáveis de ambiente NEXTAUTH_SECRET e NEXTAUTH_URL configuradas
 *  - tabela de users no Prisma com campos id, email, name, password (hash)
 */

import { PrismaAdapter } from "@next-auth/prisma-adapter"; // adapter Prisma oficial
import NextAuth, { type NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GitHubProvider from "next-auth/providers/github"; // exemplo de OAuth
import { prisma } from "./db"; // nossa instância Prisma (arquivo src/lib/db.ts)
import bcrypt from "bcrypt"; // usado para comparar senha em credenciais

// ---------- Tipagem estendida (opcional, mas útil) ----------
//
// Aqui estendemos alguns tipos do NextAuth para deixar claro o conteúdo
// da sessão e do usuário que nossa aplicação vai manipular.
//
// Se preferir não estender tipos, pode remover esta seção.
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      // adicione campos extras se necessário
    } & DefaultSession["user"];
  }

  // Se você quiser, pode estender o tipo User também
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    // campo de senha não é exposto pela sessão, mas existe no DB
  }
}

// ---------- Configuração principal do NextAuth ----------
export const authOptions: NextAuthOptions = {
  // 1) Adapter: integra o NextAuth com o banco via Prisma
  adapter: PrismaAdapter(prisma),

  // 2) Providers: aqui definimos como os usuários podem autenticar
  providers: [
    // Provider de Credenciais (email + senha)
    CredentialsProvider({
      // nome mostrado na tela de login (pode customizar)
      name: "Credenciais",

      // campos que esperamos receber do formulário de login
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "seu@exemplo.com",
        },
        password: { label: "Senha", type: "password" },
      },

      // função authorize: valida as credenciais e retorna o usuário se válido
      async authorize(credentials) {
        // validação básica dos dados recebidos
        if (!credentials?.email || !credentials?.password) {
          // retorna null quando as credenciais são inválidas (NextAuth trata como falha)
          return null;
        }

        // busca usuário no banco pelo email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // se não existir usuário ou não tiver senha hash no DB, falha
        if (!user || !user.password) return null;

        // compara senha recebida com o hash armazenado usando bcrypt
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) return null;

        // NextAuth espera um objeto usuário com pelo menos um id
        // NÃO retorne a senha aqui
        return {
          id: user.id,
          name: user.name ?? null,
          email: user.email ?? null,
        };
      },
    }),

    // Exemplo de provider OAuth (comentado). Para usar, adicione as
    // variáveis de ambiente GITHUB_ID e GITHUB_SECRET e descomente.
    /*
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    */
  ],

  // 3) Secret: usado para assinar cookies / tokens.
  // É obrigatório em produção. Configure NEXTAUTH_SECRET no .env
  secret: process.env.NEXTAUTH_SECRET,

  // 4) Callbacks: permite controlar o conteúdo da session e do token
  callbacks: {
    // session: chamado sempre que uma sessão é criada/retornada.
    async session({ session, user }) {
      // aqui incluímos o id do usuário dentro de session.user.id
      // isso facilita checagens no front end sem outra query
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },

    // jwt: se usar JWTs diretamente, você pode manipular o token aqui.
    // (manter default se não precisar customizar)
    async jwt({ token, user }) {
      // quando o user existe (login inicial), adicionamos o id no token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },

  // 5) Páginas customizadas (opcional)
  // Se quiser páginas custom de sign in / error, defina aqui:
  // pages: {
  //   signIn: "/auth/signin",
  //   error: "/auth/error",
  // },

  // 6) Sessão e estratégia: por padrão usamos cookies (jwt=false),
  // caso prefira usar tokens JWT, ajuste strategy para "jwt".
  session: {
    strategy: "database", // armazenamos sessões no DB via adapter
    maxAge: 30 * 24 * 60 * 60, // 30 dias em segundos (ajuste conforme necessário)
  },

  // 7) Logger e debug
  // Em ambiente de desenvolvimento, o NextAuth exibe logs úteis.
  // Aqui só ativamos debug quando NODE_ENV !== production.
  debug: process.env.NODE_ENV !== "production",
};

// ---------- Helper para facilitar uso do getServerSession com App Router ----------
//
// Em rotas server e layout server components você pode usar diretamente
// getServerAuthSession(req, res) para obter a sessão sem repetir authOptions.
export const getServerAuthSession = () => {
  // Em App Router você só precisa chamar getServerSession com authOptions,
  // não é necessário passar o req/res como em API routes com express.
  return getServerSession(authOptions);
};

// ---------- Export default (opcional) ----------
//
// Se você quiser usar este arquivo como a rota de autenticação (pages/api/auth/[...nextauth].ts)
// exporte NextAuth(authOptions). Em App Router isso geralmente não é necessário, pois
// você cria handlers em routes. Eu deixo comentado por padrão:
//
// export default NextAuth(authOptions);
