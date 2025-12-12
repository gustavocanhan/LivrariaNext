import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    // Lê o corpo da requisição
    const body = await req.json();
    const { name, email, password } = body;catch(error){
    return NextResponse.json(
        { message: "Erro interno no servidor"},
        { status: 500 }
    );

    // validacao simples
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Dados incompletos" },
        { status: 400 }
      );
    }

    // Verifica se o e-mail já existe no banco de dados
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    // Se o e-mail já estiver em uso, retorna um erro
    if (existingEmail) {
      return NextResponse.json(
        { message: "E-mail já cadastrado" },
        { status: 400 }
      );
    }

    // Cria um hash da senha
    const passwordHash = await bcrypt.hash(password, 10);

    // Cria um novo usuário no banco de dados
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    // Retorna uma resposta de sucesso
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
