"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    textKey: "testimonials.testimonial1.text",
    authorKey: "testimonials.testimonial1.author",
    roleKey: "testimonials.testimonial1.role",
  },
  {
    id: 2,
    textKey: "testimonials.testimonial2.text",
    authorKey: "testimonials.testimonial2.author",
    roleKey: "testimonials.testimonial2.role",
  },
  {
    id: 3,
    textKey: "testimonials.testimonial3.text",
    authorKey: "testimonials.testimonial3.author",
    roleKey: "testimonials.testimonial3.role",
  },
];

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("testimonials.title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {"'" + t(testimonial.textKey) + "'"}
              </p>
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {t(testimonial.authorKey)}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {t(testimonial.roleKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
