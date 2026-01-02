import { SquarePen, Trash } from "lucide-react";

interface TableBookProps {
  book: {
    id: string;
    title: string;
    author: string;
    price: number;
    description: string;
    createdAt: Date;
  };
  editBook: (book: any) => void;
  deleteBook: (id: string) => void;
  permission?: "ADMIN" | "USER";
}

export default function TableBook({
  book,
  editBook,
  deleteBook,
  permission,
}: TableBookProps) {
  return (
    <tr
      className="border-t border-[hsl(var(--input-border))]
                   hover:bg-[hsl(var(--hover))]
                   transition-colors"
    >
      <td className="px-4 py-3">{book.title}</td>
      <td className="px-4 py-3">{book.author}</td>
      <td className="px-4 py-3">R$ {book.price.toFixed(2)}</td>
      <td className="px-4 py-3">{book.description}</td>
      <td className="px-4 py-3">
        {new Date(book.createdAt).toLocaleDateString("pt-BR")}
      </td>

      <td className="px-4 py-3">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => editBook(book)}
            className="rounded-md p-2
                       text-[hsl(var(--foreground))]
                       hover:bg-[hsl(var(--primary))]
                       hover:text-[hsl(var(--primary-foreground))]
                       transition-colors"
            title="Editar"
          >
            <SquarePen size={18} />
          </button>

          {permission === "ADMIN" && (
            <button
              onClick={() => deleteBook(book.id)}
              className="rounded-md p-2
                         text-red-600
                         hover:bg-red-600
                         hover:text-white
                         transition-colors"
              title="Excluir"
            >
              <Trash size={18} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
