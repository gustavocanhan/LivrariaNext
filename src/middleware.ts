import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. O NOME CORRETO (Visto na sua imagem)
  // Nota: Em produção (HTTPS), o NextAuth pode mudar o nome para '__Secure-next-auth.session-token'.
  // Esta verificação dupla garante que funcione tanto local quanto em produção.
  const token =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  const signInURL = new URL("/login", request.url);
  const dashboardURL = new URL("/", request.url);
  const path = request.nextUrl.pathname;

  // CENÁRIO A: Usuário NÃO logado tentando acessar o dashboard
  // (Redireciona para o login)
  if (!token && path === "/") {
    return NextResponse.redirect(signInURL);
  }

  // CENÁRIO B: Usuário JÁ logado tentando acessar login ou cadastro
  // (Redireciona para o dashboard)
  if (token && (path === "/login" || path === "/signup")) {
    return NextResponse.redirect(dashboardURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/"],
};
