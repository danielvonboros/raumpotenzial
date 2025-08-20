"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("about.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              {t("about.subtitle")}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {t("about.content")}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {t("about.content2")}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {t("about.content3")}
            </p>
          </div>
          <div className="relative">
            <Image
              src="/image_daniel.jpeg"
              alt="Furniture Designer at Work"
              width={600}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
