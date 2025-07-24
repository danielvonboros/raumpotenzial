"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
                />
              </div>
              <Button type="submit" className="w-full">
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
                  +49 123 456 789
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
                  info@furnituredesigner.com
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
                  123 Design Street
                  <br />
                  12345 Creative City
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
