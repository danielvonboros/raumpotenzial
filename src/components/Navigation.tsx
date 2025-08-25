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
import { useTheme } from "@/contexts/ThemeContext";
import {
  Menu,
  X,
  Sun,
  Moon,
  Home,
  FolderOpen,
  DollarSign,
  User,
  MessageSquare,
  Mail,
  FileText,
} from "lucide-react";
import { useState } from "react";
import Tooltip from "@/components/Tooltip";
import LogoLightWide from "@/assets/LogoLightWide.svg";
import LogoDarkWide from "@/assets/LogoDarkWide.svg";
import Image from "next/image";

interface NavigationProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

export default function Navigation({
  currentSection,
  setCurrentSection,
}: NavigationProps) {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  type Language = "en" | "de" | "fr" | "es";

  const navItems = [
    { id: "home", icon: Home, label: t("nav.home") },
    { id: "projects", icon: FolderOpen, label: t("nav.projects") },
    { id: "pricing", icon: DollarSign, label: t("nav.pricing") },
    { id: "about", icon: User, label: t("nav.about") },
    { id: "testimonials", icon: MessageSquare, label: t("nav.testimonials") },
    { id: "contact", icon: Mail, label: t("nav.contact") },
    { id: "imprint", icon: FileText, label: t("nav.imprint") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <button
              onClick={() => {
                setCurrentSection("home");
                const element = document.getElementById("home");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="flex items-center justify-center transition-opacity hover:opacity-80"
              aria-label="Go to home"
            >
              <Image
                src={theme === "light" ? LogoLightWide : LogoDarkWide}
                alt="Logo"
                width={120}
                height={40}
                className="h-14 w-auto"
                priority
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Tooltip key={item.id} content={item.label} delay={1500}>
                    <button
                      onClick={() => {
                        setCurrentSection(item.id);
                        const element = document.getElementById(item.id);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 cursor-pointer ${
                        currentSection === item.id
                          ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      aria-label={item.label}
                    >
                      <IconComponent className="h-5 w-5" />
                    </button>
                  </Tooltip>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Tooltip
              content={
                theme === "light"
                  ? "Switch to Dark Mode"
                  : "Switch to Light Mode"
              }
              delay={1500}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label={
                  theme === "light"
                    ? "Switch to Dark Mode"
                    : "Switch to Light Mode"
                }
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
            </Tooltip>

            {/* Language Selector */}
            <Select
              value={language}
              onValueChange={(value: string) => setLanguage(value as Language)}
            >
              <SelectTrigger className="w-20 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                <SelectItem
                  value="en"
                  className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  EN
                </SelectItem>
                <SelectItem
                  value="de"
                  className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  DE
                </SelectItem>
                <SelectItem
                  value="fr"
                  className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  FR
                </SelectItem>
                <SelectItem
                  value="es"
                  className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  ES
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentSection(item.id);
                      setIsMenuOpen(false);
                      const element = document.getElementById(item.id);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                      currentSection === item.id
                        ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
