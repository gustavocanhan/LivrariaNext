"use client";

import ModalLayout from "./ModalLayout";

type ModalAvisoProps = {
  isOpen: boolean;
  onClose: () => void;
  erro: string;
};

export default function ModalAviso({ isOpen, onClose, erro }: ModalAvisoProps) {
  if (!isOpen) return null;

  return (
    <ModalLayout titulo="Aviso" onClose={onClose}>
      <div>
        <p>{erro}</p>
      </div>
    </ModalLayout>
  );
}
