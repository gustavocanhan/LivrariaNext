import { Home, BookOpen, Plus } from "lucide-react";

export const sidebarItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Listar",
    href: "/books",
    icon: BookOpen,
  },
  {
    label: "Cadastrar",
    href: "/books/new",
    icon: Plus,
  },
];
