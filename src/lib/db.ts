// Importa o PrismaClient, que é a classe usada para acessar o banco de dados
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client/";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);

// Aqui criamos um tipo para permitir armazenar a instância do PrismaClient no objeto global
// Isso evita criar múltiplas conexões quando o Next.js recarrega o código durante o desenvolvimento
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Exportamos a variável 'prisma', que será a instância do PrismaClient
// - Se já existe uma instância no objeto global, usamos essa instância
// - Caso contrário, criamos uma nova instância do PrismaClient
// O parâmetro 'log' é usado para registrar consultas, erros e avisos no console
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter, log: ["query", "error", "warn"] });

// Se estivermos em ambiente de desenvolvimento, armazenamos a instância do PrismaClient
// no objeto global para evitar múltiplas conexões
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
