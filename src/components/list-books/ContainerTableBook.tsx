"use client";

import TableBook from "./TableBook";
import { useEffect, useState } from "react";
import ModalAviso from "@/components/modal/ModalAviso";
import {
  addBook,
  deleteBook,
  getBooks,
  updateBook,
} from "@/actions/book-actions";
import { useSession } from "next-auth/react";
import ModalEditarBook from "../modal/ModalEditarBook";
import AddBook from "../book/AddBook";
import ModalAdicionarBook from "../modal/ModalAdicionarBook";
import UserSearch from "../user/UserSearch";

export default function ContainerTableBook() {
  const { data: session } = useSession();
  const permission = session?.user?.role as "ADMIN" | "USER" | undefined;

  const [books, setBooks] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);

  const [search, setSearch] = useState("");

  const [error, setError] = useState("");

  const [openModalErro, setOpenModalErro] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [openModalAdicionar, setOpenModalAdicionar] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function loadBooks() {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (err: any) {
        setError(err.message);
        setOpenModalErro(true);
      }
    }

    loadBooks();
  }, []);

  async function handleDeleteBook(id: string) {
    try {
      await deleteBook(id);

      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    } catch (err: any) {
      setError(err.message);
      setOpenModalErro(true);
    }
  }

  function handleEditBook(book: any) {
    setSelectedBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setPrice(book.price);
    setDescription(book.description);
    setOpenModalEditar(true);
  }

  function handleOpenAddBook() {
    setTitle("");
    setAuthor("");
    setPrice("");
    setDescription("");
    setOpenModalAdicionar(true);
  }

  async function handleAddBook(e: React.FormEvent) {
    e.preventDefault();

    if (price === null) {
      setError("Preço inválido");
      setOpenModalErro(true);
      return;
    }

    const parsedPrice = Number(price.replace(",", "."));

    if (Number.isNaN(parsedPrice)) {
      setError("Preço inválido");
      setOpenModalAdicionar(false);
      setOpenModalErro(true);
      return;
    }

    try {
      const newBook = await addBook({
        title,
        author,
        price: parsedPrice,
        description,
      });

      setBooks((prevBooks) => [...prevBooks, newBook]);
      setOpenModalAdicionar(false);
    } catch (err: any) {
      setError(err.message);
      setOpenModalAdicionar(false);
      setOpenModalErro(true);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (price === null) {
      setError("Preço inválido");
      setOpenModalErro(true);
      return;
    }

    const parsedPrice = Number(price.replace(",", "."));

    if (Number.isNaN(parsedPrice)) {
      setError("Preço inválido");
      setOpenModalErro(true);
      return;
    }

    try {
      await updateBook(selectedBook.id, {
        title,
        author,
        price: parsedPrice,
        description,
      });

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === selectedBook.id
            ? { ...book, title, author, price, description }
            : book
        )
      );
      setOpenModalEditar(false);
    } catch (err: any) {
      setError(err.message);
      setOpenModalErro(true);
    }
  }

  const filteredBooks = books.filter((book) => {
    const matchSearch =
      book.title?.toLowerCase().includes(search.toLowerCase()) ||
      book.author?.toLowerCase().includes(search.toLowerCase());

    return matchSearch;
  });

  return (
    <>
      <AddBook addBook={handleOpenAddBook} />

      <UserSearch value={search} onChange={setSearch} />

      <ModalAviso
        isOpen={openModalErro}
        onClose={() => setOpenModalErro(false)}
        erro={error}
      />

      <ModalAdicionarBook
        handleSubmit={handleAddBook}
        onChangeTitle={setTitle}
        onChangeAuthor={setAuthor}
        onChangePrice={setPrice}
        onChangeDescription={setDescription}
        isOpen={openModalAdicionar}
        onClose={() => setOpenModalAdicionar(false)}
        title={title}
        author={author}
        price={price}
        description={description}
      />

      <ModalEditarBook
        handleSubmit={handleSubmit}
        onChangeTitle={setTitle}
        onChangeAuthor={setAuthor}
        onChangePrice={setPrice}
        onChangeDescription={setDescription}
        isOpen={openModalEditar}
        onClose={() => setOpenModalEditar(false)}
        title={title}
        author={author}
        price={price}
        description={description}
      />

      <table
        className="w-full border-collapse rounded-lg overflow-hidden
                 border border-[hsl(var(--input-border))]
                 bg-[hsl(var(--card))]"
      >
        <thead className="bg-[hsl(var(--background))]">
          <tr className="text-left text-sm text-[hsl(var(--foreground))]">
            <th className="px-4 py-3 font-medium">Título</th>
            <th className="px-4 py-3 font-medium">Autor</th>
            <th className="px-4 py-3 font-medium">Preço</th>
            <th className="px-4 py-3 font-medium">Descrição</th>
            <th className="px-4 py-3 font-medium">Criado em</th>
            <th className="px-4 py-3 font-medium text-center">Ações</th>
          </tr>
        </thead>

        <tbody>
          {filteredBooks.map((book) => (
            <TableBook
              key={book.id}
              book={book}
              editBook={handleEditBook}
              deleteBook={handleDeleteBook}
              permission={permission}
            />
          ))}

          {search.length > 1 && filteredBooks.length === 0 && (
            <tr>
              <td>Nenhum livro ou autor encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
