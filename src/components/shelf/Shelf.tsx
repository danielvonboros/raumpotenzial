"use client";

import { useRef, type ReactNode } from "react";
import type { SpineItem } from "./types";
import SpineNav from "./SpineNav";
import { useHorizontalScroll } from "./useHorizontalScroll";

type Props = {
  spineItems: SpineItem[];
  onOpenBooking?: () => void;
  disabled?: boolean; // pass `true` while the booking overlay is open
  children: ReactNode; // your panels (each with a data-section attribute)
};

export default function Shelf({
  spineItems,
  onOpenBooking,
  disabled = false,
  children,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { progress, activeSection, scrollToSection } = useHorizontalScroll(
    trackRef,
    { disabled },
  );

  const handleNavigate = (item: SpineItem) => {
    if (item.opensOverlay) onOpenBooking?.();
    else scrollToSection(item.id);
  };

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[70] h-1 bg-black/10">
        <div
          className="h-full origin-left bg-black/70 transition-transform duration-75"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <SpineNav
        items={spineItems}
        activeId={activeSection}
        onNavigate={handleNavigate}
      />

      <div
        ref={trackRef}
        className="flex h-screen w-full snap-x snap-proximity overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-md:h-auto max-md:snap-none max-md:flex-col max-md:overflow-visible"
      >
        {children}
      </div>
    </>
  );
}
