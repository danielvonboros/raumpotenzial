"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

const slides = [
  {
    image: "/room/sample_room_1_after2.webp",
    alt: "Room Transformation with storage space",
    slideKey: "slide1",
  },
  {
    image: "/furniture/quadra_wide.webp",
    alt: "Minimalist Sideboard",
    slideKey: "slide2",
  },
  {
    image: "/room/sample_room_2_after.webp",
    alt: "Room divider and loft bed",
    slideKey: "slide3",
  },
  {
    image: "/room/sample_room_4_after.webp",
    alt: "Room divider and loft bed",
    slideKey: "slide4",
  },
  {
    image: "/room/sample_room_8_1_after.webp",
    alt: "Room divider and loft bed",
    slideKey: "slide5",
  },
  {
    image: "/room/sample_room_11_2_after.webp",
    alt: "Room divider and loft bed",
    slideKey: "slide6",
  },
];

export default function Hero() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Slideshow Background */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Hero Content - Dynamic based on current slide */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {t(`hero.${currentSlideData.slideKey}.title`)}
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          {t(`hero.${currentSlideData.slideKey}.subtitle`)}
        </p>
        <Button
          size="lg"
          className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-3"
          onClick={() => {
            const element = document.getElementById("projects");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          {t(`hero.${currentSlideData.slideKey}.cta`)}
        </Button>
      </div>
    </section>
  );
}
