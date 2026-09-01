"use client";

import { useEffect, type ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function BookingOverlay({
  open,
  onClose,
  title = "Termin buchen",
  children,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <div
        data-native-scroll
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#F1E9DA] p-6 shadow-2xl md:p-10"
      >
        <button
          onClick={onClose}
          aria-label="Schließen"
          className="absolute right-4 top-4 text-2xl leading-none text-[#20262B] hover:opacity-70"
        >
          ×
        </button>
        <h2 className="mb-6 font-display text-3xl uppercase text-[#20262B]">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
