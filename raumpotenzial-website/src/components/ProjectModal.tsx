"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Ruler,
  Palette,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
}

const projectImages = {
  project1: [
    "/modern-oak-dining-set.png",
    "/oak-dining-table-detail.png",
    "/dining-chairs-closeup.png",
    "/complete-dining-room.png",
  ],
  project2: [
    "/minimalist-bookshelf-storage.png",
    "/modular-bookshelf.png",
    "/arranged-bookshelf.png",
    "/placeholder-idd4q.png",
  ],
  project3: [
    "/luxury-bedroom-suite.png",
    "/luxury-headboard-detail.png",
    "/bedroom-nightstand-charging.png",
    "/complete-bedroom-suite.png",
  ],
};

export default function ProjectModal({
  isOpen,
  onClose,
  projectId,
}: ProjectModalProps) {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = projectImages[projectId as keyof typeof projectImages] || [];

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        handlePrevImage();
      } else if (event.key === "ArrowRight") {
        handleNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentImageIndex]);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t(`projects.${projectId}.title`)}
            </h2>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{t(`projects.${projectId}.year`)}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full p-2"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row max-h-[calc(95vh-80px)]">
          {/* Image Carousel Section */}
          <div className="lg:w-3/5 relative bg-gray-100 dark:bg-gray-900">
            <div className="relative h-64 lg:h-full min-h-[400px]">
              {/* Main Image */}
              <Image
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt={`${t(`projects.${projectId}.title`)} - Image ${
                  currentImageIndex + 1
                }`}
                fill
                className="object-cover"
                priority
              />

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-4 flex gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex
                        ? "border-white"
                        : "border-white/50 hover:border-white/80"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="lg:w-2/5 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Project Goal */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t("projects.modal.projectGoal")}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t(`projects.${projectId}.goal`)}
                </p>
              </div>

              {/* Extended Description */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {t("projects.modal.aboutProject")}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t(`projects.${projectId}.extendedDescription`)}
                </p>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Palette className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {t("projects.modal.materials")}
                    </h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {t(`projects.${projectId}.materials`)}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Ruler className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {t("projects.modal.dimensions")}
                    </h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {t(`projects.${projectId}.dimensions`)}
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t("projects.modal.interestedText")}
                </p>
                <Button
                  onClick={() => {
                    onClose();
                    const element = document.getElementById("contact");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                >
                  {t("projects.modal.startProject")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
