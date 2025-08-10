"use client";

import type React from "react";

import { useState, useRef, useEffect, type ReactNode } from "react";

interface TooltipProps {
  content: string;
  children: ReactNode;
  delay?: number;
}

export default function Tooltip({
  content,
  children,
  delay = 1500,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Calculate tooltip position
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.bottom + 8,
    });

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block cursor-pointer"
      >
        {children}
      </div>
      {isVisible && (
        <div
          className="fixed z-[60] px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-700 rounded shadow-lg pointer-events-none transform -translate-x-1/2 animate-in fade-in-0 zoom-in-95 duration-200"
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          <div className="relative">
            {content}
            {/* Tooltip arrow */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
          </div>
        </div>
      )}
    </>
  );
}
