import { CirclePlus } from "lucide-react";

type AddBookProps = {
  addBook: () => void;
};

export default function AddBook({ addBook }: AddBookProps) {
  return (
    <div className="w-full flex justify-end pb-2">
      <button
        onClick={addBook}
        className="px-4 py-2 bg-green-600 text-white hover:bg-green-800 transition-all duration-200 flex gap-2 items-center rounded-md shadow"
      >
        <CirclePlus />
        Adicionar
      </button>
    </div>
  );
}
