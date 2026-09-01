"use client";

import type { SpineItem } from "./types";

type Props = {
  items: SpineItem[];
  activeId: string | null;
  onNavigate: (item: SpineItem) => void;
};

export default function SpineNav({ items, activeId, onNavigate }: Props) {
  return (
    <nav className="fixed right-0 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-2 md:flex">
      {items.map((item) => {
        const active = activeId === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item)}
            aria-label={item.label}
            style={{ backgroundColor: item.color }}
            className={`group relative flex h-32 items-center justify-center overflow-hidden rounded-l-lg text-[#F4ECDD] shadow-[-6px_0_20px_rgba(0,0,0,0.22)] transition-[width] duration-500 ease-out ${active ? "w-56" : "w-9 hover:w-56"}`}
          >
            <span
              className={`text-xs font-semibold uppercase tracking-widest [writing-mode:vertical-rl] transition-opacity ${active ? "opacity-0" : "opacity-100 group-hover:opacity-0"}`}
            >
              {item.label}
            </span>
            <span
              className={`absolute inset-0 flex items-center gap-3 pr-4 transition-opacity ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
            >
              {item.thumb && (
                <img
                  src={item.thumb}
                  alt=""
                  className="h-full w-16 flex-none object-cover"
                />
              )}
              <span className="flex-1 text-left text-lg font-bold uppercase leading-none">
                {item.label}
              </span>
              <span aria-hidden>→</span>
            </span>
          </button>
        );
      })}
    </nav>
  );
}
