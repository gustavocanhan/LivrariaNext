import { Home, BookOpen, Plus, CircleUser } from "lucide-react";

export const sidebarItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
    permission: "ALL",
  },
  {
    label: "Listar",
    href: "/books",
    icon: BookOpen,
    permission: "ALL",
  },
  {
    label: "Cadastrar",
    href: "/books/new",
    icon: Plus,
    permission: "ALL",
  },
  {
    label: "Usuários",
    href: "/usuarios",
    icon: CircleUser,
    permission: "ADMIN",
  },
];
