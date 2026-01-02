"use client";

import ModalLayout from "./ModalLayout";

type ModalEditarProps = {
  handleSubmit: (e: React.FormEvent) => void;
  onChangeTitle: (value: string) => void;
  onChangeAuthor: (value: string) => void;
  onChangePrice: (value: string) => void;
  onChangeDescription: (value: string) => void;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  author: string;
  price: string;
  description: string;
};

export default function ModalAdicionarBook({
  handleSubmit,
  onChangeTitle,
  onChangeAuthor,
  onChangePrice,
  onChangeDescription,
  isOpen,
  onClose,
  title,
  author,
  price,
  description,
}: ModalEditarProps) {
  if (!isOpen) return null;

  return (
    <ModalLayout titulo="Cadastrar Livro" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        {/* Titulo */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-[hsl(var(--foreground))]">
            Título:
          </label>
          <input
            value={title}
            onChange={(e) => onChangeTitle(e.target.value)}
            type="text"
            className="
          w-full px-3 py-2 rounded-md
          bg-[hsl(var(--input))]
          text-[hsl(var(--input-foreground))]
          border border-[hsl(var(--input-border))]
          focus:outline-none
          focus:ring-2 focus:ring-[hsl(var(--primary))]
        "
          />
        </div>

        {/* Autor */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-[hsl(var(--foreground))]">
            Autor/Autora:
          </label>
          <input
            value={author}
            onChange={(e) => onChangeAuthor(e.target.value)}
            type="text"
            className="
          w-full px-3 py-2 rounded-md
          bg-[hsl(var(--input))]
          text-[hsl(var(--input-foreground))]
          border border-[hsl(var(--input-border))]
          focus:outline-none
          focus:ring-2 focus:ring-[hsl(var(--primary))]
        "
          />
        </div>

        {/* Preço */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-[hsl(var(--foreground))]">
            Preço:
          </label>
          <input
            value={price}
            onChange={(e) => onChangePrice(e.target.value)}
            type="text"
            className="
          w-full px-3 py-2 rounded-md
          bg-[hsl(var(--input))]
          text-[hsl(var(--input-foreground))]
          border border-[hsl(var(--input-border))]
          focus:outline-none
          focus:ring-2 focus:ring-[hsl(var(--primary))]
        "
          />
        </div>

        {/* Descricao */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-[hsl(var(--foreground))]">
            Descrição:
          </label>
          <textarea
            value={description || ""}
            onChange={(e) => onChangeDescription(e.target.value)}
            placeholder="Descrição do livro"
            className="
        w-full min-h-[120px] resize-none
        px-3 py-2 rounded-md
        bg-[hsl(var(--input))]
        text-[hsl(var(--input-foreground))]
        border border-[hsl(var(--input-border))]
        focus:outline-none focus:ring-2
        focus:ring-[hsl(var(--primary))]
      "
          />
        </div>
        <div className="pt-4 pb-2 flex justify-end">
          <button
            type="submit"
            className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-600 transition-colors"
          >
            Salvar
          </button>
        </div>
      </form>
    </ModalLayout>
  );
}
