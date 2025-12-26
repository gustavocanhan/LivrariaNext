import { SquarePen, Trash } from "lucide-react";

interface TableBookProps {
  book: {
    id: string;
    title: string;
    author: string;
    price: number;
    createdat: string;
  };
  editBook: (book: any) => void;
  deleteBook: (id: string) => void;
}

export default function TableBook({
  book,
  editBook,
  deleteBook,
}: TableBookProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Price</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr key={book.id}>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.price}</td>
          <td>{book.createdat}</td>
          <td>
            <button onClick={() => editBook(book)}>
              <SquarePen />
            </button>
            <button onClick={() => deleteBook(book.id)}>
              <Trash />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
