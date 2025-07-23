"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function Imprint() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("imprint.title")}
          </h2>
          <p className="text-xl text-gray-600">{t("imprint.subtitle")}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t("imprint.content.responsible")}
            </h3>
            <div className="text-gray-700 space-y-2">
              <p>{t("imprint.content.name")}</p>
              <p>{t("imprint.content.address")}</p>
              <p>{t("imprint.content.phone")}</p>
              <p>{t("imprint.content.email")}</p>
              <p>{t("imprint.content.vat")}</p>
            </div>
          </div>

          <div className="border-t pt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t("imprint.content.disclaimer")}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {t("imprint.content.disclaimerText")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
