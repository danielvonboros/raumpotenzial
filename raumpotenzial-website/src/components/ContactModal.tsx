"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import Captcha from "@/components/Captcha";

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: prefilledSubject,
    message: "",
  });
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [resetCaptcha, setResetCaptcha] = useState(false);

  // Update subject when prefilledSubject changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, subject: prefilledSubject }));
  }, [prefilledSubject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isCaptchaValid) {
      alert(t("captcha.required"));
      return;
    }

    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    setFormData({
      name: "",
      email: "",
      subject: prefilledSubject,
      message: "",
    });
    setIsCaptchaValid(false);
    setResetCaptcha((prev) => !prev); // Trigger captcha reset
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCaptchaValidation = (isValid: boolean) => {
    setIsCaptchaValid(isValid);
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                name="name"
                placeholder={t("contact.form.name")}
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
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
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
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
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
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
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </div>

            {/* Captcha */}
            <Captcha
              onValidationChange={handleCaptchaValidation}
              reset={resetCaptcha}
            />

            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1"
                disabled={!isCaptchaValid}
              >
                {t("contact.form.send")}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
