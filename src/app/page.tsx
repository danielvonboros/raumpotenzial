"use client";

import { useEffect, useState } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Imprint from "@/components/Imprint";
import Introduction from "@/components/Introduction";

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "projects",
        "pricing",
        "about",
        "testimonials",
        "contact",
        "imprint",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Navigation
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
          />
          <main>
            <section id="home">
              <Hero />
            </section>
            <section id="introduction">
              <Introduction />
            </section>
            <section id="projects">
              <Projects />
            </section>
            <section id="pricing">
              <Pricing />
            </section>
            <section id="about">
              <About />
            </section>
            <section id="testimonials">
              <Testimonials />
            </section>
            <section id="contact">
              <Contact />
            </section>
            <section id="imprint">
              <Imprint />
            </section>
          </main>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}
