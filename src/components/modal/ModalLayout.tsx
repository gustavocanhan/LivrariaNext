import { X } from "lucide-react";

type ModalLayoutProps = {
  children: React.ReactNode;
  titulo: string;
  onClose: () => void;
};

export default function ModalLayout({
  children,
  titulo,
  onClose,
}: ModalLayoutProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 w-full max-w-lg rounded-lg bg-white shadow-lg flex flex-col gap-4 p-6">
        <div className="flex justify-between">
          <h1>{titulo}</h1>
          <button onClick={onClose}>
            <X />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
