"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import Captcha from "@/components/Captcha";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [resetCaptcha, setResetCaptcha] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isCaptchaValid) {
      alert(t("captcha.required"));
      return;
    }

    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsCaptchaValid(false);
    setResetCaptcha((prev) => !prev); // Trigger captcha reset
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
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder={t("contact.form.name")}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
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
                  className="text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
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
                  className="text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
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
                  className="text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>

              {/* Captcha */}
              <Captcha
                onValidationChange={handleCaptchaValidation}
                reset={resetCaptcha}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={!isCaptchaValid}
              >
                {t("contact.form.send")}
              </Button>
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
                  +49 160 495 8148
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
                  hallo@raumideenwerk.com
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
                  Kolonnenstrasse 8
                  <br />
                  10827 Berlin
                  <br />
                  Germany
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
