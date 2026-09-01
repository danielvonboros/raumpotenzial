'use client';

import { useCallback, useEffect, useState, type RefObject } from 'react';

const isDesktop = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(min-width: 769px) and (pointer: fine)').matches;

export function useHorizontalScroll(
  ref: RefObject<HTMLDivElement | null>,
  { disabled = false }: { disabled?: boolean } = {},
) {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const scrollToSection = useCallback(
    (id: string) => {
      const el = ref.current;
      if (!el) return;
      const target = el.querySelector<HTMLElement>(`[data-section="${id}"]`);
      if (!target) return;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollTo({ left: target.offsetLeft, behavior: reduce ? 'auto' : 'smooth' });
    },
    [ref],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
      const center = el.scrollLeft + el.clientWidth / 2;
      let current: string | null = null;
      el.querySelectorAll<HTMLElement>('[data-section]').forEach((p) => {
        if (center >= p.offsetLeft && center < p.offsetLeft + p.offsetWidth) {
          current = p.dataset.section ?? null;
        }
      });
      setActiveSection(current);
    };

    const onWheel = (e: WheelEvent) => {
      if (disabled || !isDesktop()) return;
      const target = e.target as HTMLElement;
      if (target.closest('[data-native-scroll]')) return; // let interactive widgets scroll
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // trackpad horizontal — leave it
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    const onKey = (e: KeyboardEvent) => {
      if (disabled || !isDesktop()) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); el.scrollBy({ left: el.clientWidth, behavior: 'smooth' }); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); el.scrollBy({ left: -el.clientWidth, behavior: 'smooth' }); }
    };

    let down = false, startX = 0, startLeft = 0;
    const onDown = (e: PointerEvent) => {
      if (disabled || !isDesktop()) return;
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-native-scroll]')) return;
      down = true; startX = e.clientX; startLeft = el.scrollLeft;
      el.classList.add('is-dragging');
    };
    const onMove = (e: PointerEvent) => { if (down) el.scrollLeft = startLeft - (e.clientX - startX); };
    const onUp = () => { down = false; el.classList.remove('is-dragging'); };

    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointerleave', onUp);
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointerleave', onUp);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, disabled]);

  return { progress, activeSection, scrollToSection };
}