"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import {
  Cookie,
  Shield,
  Mail,
  Calendar,
  ExternalLink,
  Globe,
} from "lucide-react";

export default function CookieConsentModal() {
  const { t, language, setLanguage } = useLanguage();
  const { showModal, acceptCookies, declineCookies } = useCookieConsent();

  type Language = "en" | "de" | "fr" | "es";

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Cookie className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t("cookies.title")}
            </h2>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <Select
                value={language}
                onValueChange={(value: Language) => setLanguage(value)}
              >
                <SelectTrigger className="w-20 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 z-[110]">
                  <SelectItem
                    value="en"
                    className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    EN
                  </SelectItem>
                  <SelectItem
                    value="de"
                    className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    DE
                  </SelectItem>
                  <SelectItem
                    value="fr"
                    className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    FR
                  </SelectItem>
                  <SelectItem
                    value="es"
                    className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    ES
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          <div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t("cookies.description")}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
              {t("cookies.languageNote")}
            </p>
          </div>

          {/* Data Processing Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
              {t("cookies.dataProcessing.title")}
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                    {t("cookies.dataProcessing.email.title")}
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {t("cookies.dataProcessing.email.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <Calendar className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-100 mb-1">
                    {t("cookies.dataProcessing.calendar.title")}
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {t("cookies.dataProcessing.calendar.description")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Information */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              {t("cookies.privacy.title")}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              {t("cookies.privacy.description")}
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• {t("cookies.privacy.point1")}</li>
              <li>• {t("cookies.privacy.point2")}</li>
              <li>• {t("cookies.privacy.point3")}</li>
              <li>• {t("cookies.privacy.point4")}</li>
            </ul>
          </div>

          {/* Consequences of Declining */}
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
            <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2 flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              {t("cookies.decline.title")}
            </h4>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              {t("cookies.decline.description")}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={acceptCookies}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {t("cookies.accept")}
            </Button>
            <Button
              onClick={declineCookies}
              variant="outline"
              className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 bg-transparent"
            >
              {t("cookies.decline.button")}
            </Button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {t("cookies.changeSettings")}
          </p>
        </div>
      </div>
    </div>
  );
}
