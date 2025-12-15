"use client";

import type React from "react";

import { useLanguage } from "@/contexts/LanguageContext";
import { X } from "lucide-react";
import { useState } from "react";

type BadgeShape = "christmas-bulb" | "circle" | "star" | "tag";

interface PromotionalBadgeProps {
  shape?: BadgeShape;
  targetSection: string;
  endDate?: string;
}

export default function PromotionalBadge({
  shape = "christmas-bulb",
  targetSection,
  endDate,
}: PromotionalBadgeProps) {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    const element = document.getElementById(targetSection);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={handleClick}
        className="relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-highlight-blue focus:ring-offset-2 rounded-full"
        aria-label={t("promotional.ariaLabel")}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors z-10"
          aria-label={t("promotional.close")}
        >
          <X className="h-4 w-4" />
        </button>

        {/* Shape Container */}
        <div className="relative">
          {shape === "christmas-bulb" && (
            <div className="relative">
              {/* Bulb cap */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-3 bg-gradient-to-b from-yellow-600 to-yellow-700 rounded-t-sm" />
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-800 rounded-full" />

              {/* Bulb body */}
              <div className="w-36 h-36 bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-full shadow-2xl group-hover:scale-105 transition-transform duration-300 flex items-center justify-center p-4">
                {/* Shine effect */}
                <div className="absolute top-6 left-6 w-8 h-12 bg-white/30 rounded-full blur-sm" />

                {/* Text content */}
                <div className="relative text-center text-white z-10">
                  <p className="text-xs font-bold mb-1 leading-tight">
                    {t("promotional.title")}
                  </p>
                  {endDate && (
                    <p className="text-[10px] opacity-90 leading-tight">
                      {endDate}
                    </p>
                  )}
                </div>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-red-400/40 rounded-full blur-xl -z-10 group-hover:bg-red-400/60 transition-all" />
            </div>
          )}

          {shape === "circle" && (
            <div className="w-32 h-32 bg-gradient-to-br from-highlight-blue to-blue-600 rounded-full shadow-2xl group-hover:scale-105 transition-transform duration-300 flex items-center justify-center p-4">
              <div className="text-center text-white">
                <p className="text-xs font-bold mb-1">
                  {t("promotional.title")}
                </p>
                {endDate && <p className="text-[10px] opacity-90">{endDate}</p>}
              </div>
              <div className="absolute inset-0 bg-blue-400/40 rounded-full blur-xl -z-10 group-hover:bg-blue-400/60 transition-all" />
            </div>
          )}

          {shape === "star" && (
            <div className="relative w-36 h-36">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
              >
                <defs>
                  <linearGradient
                    id="starGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
                <path
                  d="M50 5 L61 38 L95 38 L68 58 L79 91 L50 71 L21 91 L32 58 L5 38 L39 38 Z"
                  fill="url(#starGradient)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
                <div>
                  <p className="text-xs font-bold mb-1 leading-tight">
                    {t("promotional.title")}
                  </p>
                  {endDate && (
                    <p className="text-[10px] opacity-90 leading-tight">
                      {endDate}
                    </p>
                  )}
                </div>
              </div>
              <div className="absolute inset-0 bg-yellow-400/40 rounded-full blur-xl -z-10 group-hover:bg-yellow-400/60 transition-all" />
            </div>
          )}

          {shape === "tag" && (
            <div className="relative w-36 h-24 bg-gradient-to-br from-highlight-yellow to-orange-400 rounded-lg shadow-2xl group-hover:scale-105 transition-transform duration-300 flex items-center justify-center p-4">
              {/* Tag hole */}
              <div className="absolute top-3 right-3 w-4 h-4 bg-white/30 rounded-full border-2 border-white/50" />
              <div className="text-center text-gray-900">
                <p className="text-xs font-bold mb-1">
                  {t("promotional.title")}
                </p>
                {endDate && <p className="text-[10px] opacity-80">{endDate}</p>}
              </div>
              <div className="absolute inset-0 bg-yellow-400/40 rounded-lg blur-xl -z-10 group-hover:bg-yellow-400/60 transition-all" />
            </div>
          )}
        </div>

        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-red-500" />
      </button>
    </div>
  );
}
