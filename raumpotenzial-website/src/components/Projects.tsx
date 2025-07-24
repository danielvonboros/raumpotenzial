"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

const projects = [
  {
    id: 1,
    image: "/placeholder.svg?height=400&width=600",
    titleKey: "projects.project1.title",
    descriptionKey: "projects.project1.description",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=400&width=600",
    titleKey: "projects.project2.title",
    descriptionKey: "projects.project2.description",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=400&width=600",
    titleKey: "projects.project3.title",
    descriptionKey: "projects.project3.description",
  },
];

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("projects.title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={t(project.titleKey)}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t(project.titleKey)}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t(project.descriptionKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
