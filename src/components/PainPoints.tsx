"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Ruler, Boxes, Users, House } from "lucide-react";

const PAIN_POINTS = [
  {
    id: "pain1",
    icon: Ruler,
    headingKey: "painpoints.heading1",
    textKey: "painpoints.text1",
  },
  {
    id: "pain2",
    icon: Boxes,
    headingKey: "painpoints.heading2",
    textKey: "painpoints.text2",
  },
  {
    id: "pain3",
    icon: Users,
    headingKey: "painpoints.heading3",
    textKey: "painpoints.text3",
  },
  {
    id: "pain4",
    icon: House,
    headingKey: "painpoints.heading4",
    textKey: "painpoints.text4",
  },
];

export default function PainPoints() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 bg-gray-900 dark:bg-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PAIN_POINTS.map((point, index) => {
            const Icon = point.icon;

            return (
              <article
                key={point.id}
                className="group relative flex flex-col h-full dark:bg-gray-50 bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-gray-900 dark:hover:border-white"
              >
                {/* Akzentbalken oben, waechst beim Hover */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-1 w-12 dark:bg-gray-900 bg-white transition-all duration-300 group-hover:w-full"
                />

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center justify-center w-12 h-12 dark:bg-gray-900 bg-white dark:text-white text-gray-900">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-medium tabular-nums dark:text-gray-400 text-gray-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-xl dark:text-gray-900 text-white mb-3">
                  {t(point.headingKey)}
                </h3>
                <p className="dark:text-gray-600 font-light text-gray-300 leading-relaxed">
                  {t(point.textKey)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
