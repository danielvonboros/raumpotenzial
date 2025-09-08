"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { X, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import Captcha from "@/components/Captcha";
import { submitContactForm } from "@/app/actions/SendMail";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledSubject: string;
}

export default function ContactModal({
  isOpen,
  onClose,
  prefilledSubject,
}: ContactModalProps) {
  const { t } = useLanguage();
  const { hasConsented, resetConsent } = useCookieConsent();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: prefilledSubject,
    message: "",
  });
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [resetCaptcha, setResetCaptcha] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Update subject when prefilledSubject changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, subject: prefilledSubject }));
  }, [prefilledSubject]);

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

        // Reset form after a delay and close modal
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            subject: prefilledSubject,
            message: "",
          });
          setIsCaptchaValid(false);
          setResetCaptcha((prev) => !prev);
          setSubmitStatus({ type: null, message: "" });
          onClose();
        }, 2000);
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
    const subject = encodeURIComponent(formData.subject || prefilledSubject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    return `mailto:hallo@raumideenwerk.com?subject=${subject}&body=${body}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("contact.title")}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t("contact.subtitle")}
          </p>

          {!hasConsented && (
            <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                    {t("contact.cookieError.title")}
                  </h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    {t("contact.cookieError.message")}
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
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
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
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
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

              <div className="flex gap-3">
                {!hasConsented && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.open(generateMailtoLink(), "_blank")}
                    className="flex-1 bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Email App
                  </Button>
                )}
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className={`${
                    !hasConsented ? "flex-1" : "w-full"
                  } bg-transparent`}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
