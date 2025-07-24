"use client";

import { useState } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Imprint from "@/components/Imprint";
import Pricing from "@/components/Pricing";

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState("home");

  const renderSection = () => {
    switch (currentSection) {
      case "home":
        return <Hero />;
      case "projects":
        return <Projects />;
      case "pricing":
        return <Pricing />;
      case "about":
        return <About />;
      case "testimonials":
        return <Testimonials />;
      case "contact":
        return <Contact />;
      case "imprint":
        return <Imprint />;
      default:
        return <Hero />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Navigation
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
        <main>{renderSection()}</main>
      </div>
    </LanguageProvider>
  );
}
