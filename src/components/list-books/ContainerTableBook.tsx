"use client";

import TableBook from "./TableBook";
import { useEffect, useState } from "react";
import ModalAviso from "@/components/modal/ModalAviso";

export default function ContainerTableBook() {
  const [books, setBooks] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [error, setError] = useState("");
  const [openModalErro, setOpenModalErro] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState<number | null>(null);
}
