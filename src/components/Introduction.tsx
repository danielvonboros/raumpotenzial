"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles, LayoutGrid, UserRoundCheck, Sofa } from "lucide-react";

const INTRO_POINTS = [
  {
    id: "intro1",
    icon: Sparkles,
    headingKey: "introduction.heading1",
    textKey: "introduction.sentence1",
  },
  {
    id: "intro2",
    icon: LayoutGrid,
    headingKey: "introduction.heading2",
    textKey: "introduction.sentence2",
  },
  {
    id: "intro3",
    icon: UserRoundCheck,
    headingKey: "introduction.heading3",
    textKey: "introduction.sentence3",
  },
  {
    id: "intro4",
    icon: Sofa,
    headingKey: "introduction.heading4",
    textKey: "introduction.sentence4",
  },
];

export default function Introduction() {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl text-gray-900 dark:text-white">
            {t("introduction.title")}
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {INTRO_POINTS.map((point) => {
            const Icon = point.icon;

            return (
              <article
                key={point.id}
                className="group relative flex items-start gap-6 sm:gap-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 sm:p-8 pl-8 sm:pl-10 transition-all duration-300 hover:shadow-xl hover:border-gray-900 dark:hover:border-white"
              >
                <div className="flex shrink-0 items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gray-900 dark:bg-white text-white dark:text-gray-900">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.5} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t(point.headingKey)}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t(point.textKey)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
