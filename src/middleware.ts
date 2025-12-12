export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/", // protege home
    "/books/:path*", // protege todas rotas de livros
  ],
};
