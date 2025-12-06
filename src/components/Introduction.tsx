"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function Introduction() {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {t("introduction.title")}
          </h2>
          <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
            <p>{t("introduction.sentence1")}</p>
            <p>{t("introduction.sentence2")}</p>
            <p>{t("introduction.sentence3")}</p>
            <p>{t("introduction.sentence4")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
