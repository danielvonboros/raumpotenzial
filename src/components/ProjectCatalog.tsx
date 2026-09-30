"use client";

import { useRef, type ReactNode } from "react";
import { SectionHeader } from "./SectionHeader";

interface ProjectCatalogProps {
  title: string;
  subtitle: string;
  prevLabel: string;
  nextLabel: string;
  /** Die Karten werden auf dem Server gerendert und hier nur hineingereicht */
  children: ReactNode;
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 5 L8 12 L15 19" : "M9 5 L16 12 L9 19"}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
      />
    </svg>
  );
}

export function ProjectCatalog({
  title,
  subtitle,
  prevLabel,
  nextLabel,
  children,
}: ProjectCatalogProps) {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const row = scroller.current;
    if (!row) return;
    const card = row.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
    const step = card ? card.offsetWidth + gap : row.clientWidth * 0.8;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    row.scrollBy({ left: direction * step, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <section
      id="projekte"
      aria-labelledby="projekte-titel"
      className="scroll-mt-24 py-16 pl-5 md:py-[72px] md:pl-14"
    >
      <div className="flex flex-wrap items-end justify-between gap-6 pr-5 md:pr-14">
        <SectionHeader id="projekte-titel" title={title} subtitle={subtitle} />
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label={prevLabel}
            className="flex size-14 items-center justify-center border-2 border-tinte bg-leinen text-tinte hover:bg-sand"
          >
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label={nextLabel}
            className="flex size-14 items-center justify-center border-2 border-tinte bg-tinte text-leinen hover:border-petrol hover:bg-petrol"
          >
            <Chevron direction="right" />
          </button>
        </div>
      </div>

      {/* Reicht bis an den rechten Rand, damit die nächste Karte anschneidet */}
      <div
        ref={scroller}
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pr-5 pb-5 [scrollbar-color:var(--color-tinte)_var(--color-sand)] [scrollbar-width:thin] md:pr-14"
      >
        {children}
      </div>
    </section>
  );
}
