// prisma/seed.ts
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.user.createMany({
    data: [
      {
        email: "admin@admin.com",
        password: await bcrypt.hash("admin123", 10),
        name: "Administrador",
        role: "ADMIN",
      },
      {
        email: "user@user.com",
        password: await bcrypt.hash("user123", 10),
        name: "Usuário Comum",
        role: "USER",
      },
    ],
    skipDuplicates: true,
  });

  console.log("- Usuários cadastrados!");

  await prisma.book.createMany({
    data: [
      {
        title: "Percy Jackson - Ladrão de Raio",
        author: "Rick Rordan",
        price: 89.9,
        description: "The Lightning Thief ...",
      },
      {
        title: "Percy Jackson e o Mar de Monstros",
        author: "Rick Rordan",
        price: 49.9,
      },
    ],
    skipDuplicates: true,
  });

  console.log("- Livros cadastrados!");
}

main()
  .then(() => {
    console.log("Seed finalizado com sucesso!");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
