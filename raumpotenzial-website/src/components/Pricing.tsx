"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, Star } from "lucide-react";
import ContactModal from "@/components/ContactModal";
import { useState } from "react";

export default function Pricing() {
  const { t } = useLanguage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const pricingPlans = [
    {
      id: "consultation",
      titleKey: "pricing.consultation.title",
      priceKey: "pricing.consultation.price",
      durationKey: "pricing.consultation.duration",
      featuresKey: "pricing.consultation.features",
      ctaKey: "pricing.consultation.cta",
      popular: false,
    },
    {
      id: "custom",
      titleKey: "pricing.custom.title",
      priceKey: "pricing.custom.price",
      durationKey: "pricing.custom.duration",
      featuresKey: "pricing.custom.features",
      ctaKey: "pricing.custom.cta",
      popular: true,
    },
    {
      id: "complete",
      titleKey: "pricing.complete.title",
      priceKey: "pricing.complete.price",
      durationKey: "pricing.complete.duration",
      featuresKey: "pricing.complete.features",
      ctaKey: "pricing.complete.cta",
      popular: false,
    },
  ];

  const getFeatures = (planId: string) => {
    const features = t(`pricing.${planId}.features`);
    if (Array.isArray(features)) {
      return features;
    }
    // Fallback if translation returns a string
    return ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"];
  };

  const handleServiceClick = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("pricing.title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("pricing.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 ${
                plan.popular ? "ring-2 ring-blue-500 transform scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                  <Star className="inline-block w-4 h-4 mr-1" />
                  Most Popular
                </div>
              )}

              <div className={`p-8 ${plan.popular ? "pt-16" : ""}`}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {t(plan.titleKey)}
                  </h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {t(plan.priceKey)}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300 ml-2">
                      {t(plan.durationKey)}
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {getFeatures(plan.id).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleServiceClick(t(plan.titleKey))}
                  className={`w-full py-3 text-lg font-semibold ${
                    plan.popular
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-gray-900 hover:bg-gray-800 text-white"
                  }`}
                >
                  {t(plan.ctaKey)}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            All prices are estimates and may vary based on project complexity
            and materials chosen.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Contact us for a personalized quote tailored to your specific needs.
          </p>
        </div>
      </div>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prefilledSubject={selectedService}
      />
    </section>
  );
}
