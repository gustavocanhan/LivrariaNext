import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, {
  DefaultSession,
  type NextAuthOptions,
  getServerSession,
} from "next-auth";

import { prisma } from "./db";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

/*
  Extensão dos tipos do NextAuth.
  Aqui ensinamos ao TypeScript que:
  - session.user possui também 'id'
  - o tipo interno User também possui 'id'
*/
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  /*
    Conecta o NextAuth ao banco de dados usando Prisma.
    Necessário quando a sessão é armazenada no banco ("database").
  */
  adapter: PrismaAdapter(prisma),

  /*
    Define os métodos de autenticação disponíveis.
    Aqui usamos apenas login via email + senha (Credentials Provider).
  */
  providers: [
    Credentials({
      name: "credentials",

      /*
        Define os campos esperados no formulário de login.
      */
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "seu@exemplo.com",
        },
        password: {
          label: "Senha",
          type: "password",
        },
      },

      /*
        Função que valida as credenciais informadas.
        Responsável por:
        - validar se os campos foram preenchidos
        - buscar o usuário no banco pelo email
        - verificar o hash da senha
        - retornar o usuário quando estiver correto
      */
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name ?? null,
          email: user.email ?? null,
        };
      },
    }),
  ],

  /*
    Chave secreta usada para assinar cookies e tokens.
    Necessária para segurança da sessão.
  */
  secret: process.env.NEXTAUTH_SECRET,

  /*
    Callbacks permitem personalizar como a sessão ou o token são montados.
  */
  callbacks: {
    /*
      Executa toda vez que a sessão é carregada ou enviada para o frontend.

      Como a estratégia é "database", o NextAuth fornece 'user' aqui,
      permitindo copiar o 'user.id' para dentro de session.user.
    */
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }

      return session;
    },

    /*
      Executa quando o token JWT é criado ou atualizado.
      Com strategy "database", esse token não controla a sessão diretamente,
      mas ainda recebe o 'user.id' durante o login inicial.
    */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },

  /*
    Define onde a sessão será armazenada.
    - strategy: "database" -> sessão persiste no banco
    - o cookie armazena apenas uma referência
    maxAge define o tempo de validade da sessão.
  */
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  /*
    Habilita logs detalhados fora de produção.
    Útil para debugar autenticação.
  */
  debug: process.env.NODE_ENV !== "production",
};

/*
  Helper para obter a sessão no servidor.
  Evita repetir getServerSession(authOptions) em vários arquivos.
*/
export const getServerAuthSession = () => {
  return getServerSession(authOptions);
};
