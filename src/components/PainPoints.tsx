import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PainPoints() {
  const { t } = useLanguage();

  const PAIN_POINTS = [
    {
      heading: t("painpoints.heading1"),
      text: t("painpoints.text1"),
    },
    {
      heading: t("painpoints.heading2"),
      text: t("painpoints.text2"),
    },
    {
      heading: t("painpoints.heading3"),
      text: t("painpoints.text3"),
    },
    {
      heading: t("painpoints.heading4"),
      text: t("painpoints.text4"),
    },
  ];

  return (
    <section className="py-24 px-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center">
        {PAIN_POINTS.map((point, index) => (
          <div
            key={index}
            className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 py-2"
          >
            <p>{point.heading}</p>
            <p>{point.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
