"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import {
  Mail,
  MapPin,
  Phone,
  CheckCircle,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import Captcha from "@/components/Captcha";
import { submitContactForm } from "@/app/actions/SendMail";

export default function Contact() {
  const { t } = useLanguage();
  const { hasConsented, resetConsent } = useCookieConsent();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [resetCaptcha, setResetCaptcha] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasConsented) {
      setSubmitStatus({
        type: "error",
        message: t("contact.cookieError.message"),
      });
      return;
    }

    if (!isCaptchaValid) {
      setSubmitStatus({
        type: "error",
        message: t("captcha.required"),
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("email", formData.email);
      formDataObj.append("subject", formData.subject);
      formDataObj.append("message", formData.message);

      const result = await submitContactForm(formDataObj);

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message || "Message sent successfully!",
        });

        // Reset form
        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsCaptchaValid(false);
        setResetCaptcha((prev) => !prev);
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear status when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: "" });
    }
  };

  const handleCaptchaValidation = (isValid: boolean) => {
    setIsCaptchaValid(isValid);
  };

  const generateMailtoLink = () => {
    const subject = encodeURIComponent(formData.subject || "Contact Request");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    return `mailto:hallo@raumideenwerk.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            {!hasConsented && (
              <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                      {t("contact.cookieError.title")}
                    </h4>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
                      {t("contact.cookieError.message")}
                    </p>
                    <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                      {t("contact.cookieError.directContact")}
                    </p>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      hallo (at) raumideenwerk.com
                    </p>
                    <div>
                      <button
                        onClick={() => resetConsent()}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 hover:cursor-pointer dark:hover:text-blue-300 underline mt-2"
                      >
                        {t("contact.cookieError.changeCookiePreferences")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder={t("contact.form.name")}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={!hasConsented}
                  className="text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder={t("contact.form.email")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={!hasConsented}
                  className="text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="subject"
                  placeholder={t("contact.form.subject")}
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={!hasConsented}
                  className="text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder={t("contact.form.message")}
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                  disabled={!hasConsented}
                  className="text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Captcha */}
              {hasConsented && (
                <Captcha
                  onValidationChange={handleCaptchaValidation}
                  reset={resetCaptcha}
                />
              )}

              {/* Status Messages */}
              {submitStatus.type && (
                <div
                  className={`p-4 rounded-lg flex items-center gap-3 ${
                    submitStatus.type === "success"
                      ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                  }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  )}
                  <p
                    className={`text-sm ${
                      submitStatus.type === "success"
                        ? "text-green-700 dark:text-green-300"
                        : "text-red-700 dark:text-red-300"
                    }`}
                  >
                    {submitStatus.message}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!hasConsented || !isCaptchaValid || isSubmitting}
                >
                  {isSubmitting ? "Sending..." : t("contact.form.send")}
                </Button>

                {!hasConsented && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.open(generateMailtoLink(), "_blank")}
                    className="w-full bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open in Email App
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-gray-600 dark:text-gray-400 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {t("contact.info.phone")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  +49 160 495 81 48
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-gray-600 dark:text-gray-400 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {t("contact.info.email")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  hallo (at) raumideenwerk.com
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-gray-600 dark:text-gray-400 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {t("contact.info.address")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Kolonnenstraße 8
                  <br />
                  10827 Berlin
                  <br />
                  Germany
                </p>
              </div>
            </div>

            {/* Email Service Status */}
            <div
              className={`rounded-lg p-4 border ${
                hasConsented
                  ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                  : "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600"
              }`}
            >
              <div className="flex items-start gap-3">
                <Mail
                  className={`h-5 w-5 mt-0.5 ${
                    hasConsented
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                />
                <div>
                  <h4
                    className={`text-sm font-semibold mb-1 ${
                      hasConsented
                        ? "text-green-900 dark:text-green-100"
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {hasConsented
                      ? "Email Service Active"
                      : "Direct Contact Only"}
                  </h4>
                  <p
                    className={`text-sm ${
                      hasConsented
                        ? "text-green-700 dark:text-green-300"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {hasConsented
                      ? "Messages are automatically forwarded to hallo@raumideenwerk.com. You'll receive a confirmation email after submitting."
                      : "Cookie consent required for automated forms. Use direct email contact or accept cookies to enable form submission."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
