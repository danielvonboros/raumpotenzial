"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Calendar,
  Clock,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Captcha from "@/components/Captcha";
import { googleCalendar } from "@/lib/googleCalendar";

interface BookingCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function BookingCalendar({
  isOpen,
  onClose,
  selectedService,
}: BookingCalendarProps) {
  const { t } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [loadingTimeSlots, setLoadingTimeSlots] = useState(false);
  const [calendarError, setCalendarError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [resetCaptcha, setResetCaptcha] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load available time slots when date is selected
  useEffect(() => {
    if (selectedDate) {
      loadAvailableTimeSlots(selectedDate);
    }
  }, [selectedDate]);

  const loadAvailableTimeSlots = async (date: Date) => {
    setLoadingTimeSlots(true);
    setCalendarError(null);
    setSelectedTime("");

    try {
      const availableSlots = await googleCalendar.getAvailableTimeSlots(date);
      setTimeSlots(availableSlots);
    } catch (error) {
      console.error("Error loading time slots:", error);
      setCalendarError("Unable to load availability. Please try again.");
      // Fallback to default slots
      setTimeSlots([
        { time: "09:00", available: true },
        { time: "10:00", available: true },
        { time: "11:00", available: false },
        { time: "14:00", available: true },
        { time: "15:00", available: true },
        { time: "16:00", available: true },
        { time: "17:00", available: false },
      ]);
    } finally {
      setLoadingTimeSlots(false);
    }
  };

  // Get days in current month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayOfWeek = date.getDay();

    // Available Monday to Friday, not in the past
    return date >= today && dayOfWeek >= 1 && dayOfWeek <= 5;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDateSelect = (date: Date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date);
      setSelectedTime("");
    }
  };

  // Generate Google Calendar URL
  const generateGoogleCalendarUrl = (bookingData: any) => {
    const startDateTime = new Date(bookingData.date);
    const [hours, minutes] = bookingData.time.split(":");
    startDateTime.setHours(
      Number.parseInt(hours),
      Number.parseInt(minutes),
      0,
      0
    );

    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(startDateTime.getHours() + 1); // 1 hour consultation

    const formatDateForGoogle = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const title = encodeURIComponent(
      `Design Consultation - ${bookingData.service}`
    );
    const details = encodeURIComponent(
      `Design Consultation Session\n\n` +
        `Service: ${bookingData.service}\n` +
        `Client: ${bookingData.name}\n` +
        `Email: ${bookingData.email}\n` +
        `Phone: ${bookingData.phone}\n\n` +
        `Notes: ${bookingData.message || "No additional notes"}\n\n` +
        `This is a professional interior design consultation session.`
    );
    const location = encodeURIComponent(
      "Design Studio - Address will be confirmed via email"
    );

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatDateForGoogle(
      startDateTime
    )}/${formatDateForGoogle(
      endDateTime
    )}&details=${details}&location=${location}&sf=true&output=xml`;

    return googleCalendarUrl;
  };

  // Generate ICS file content
  const generateICSFile = (bookingData: any) => {
    const startDateTime = new Date(bookingData.date);
    const [hours, minutes] = bookingData.time.split(":");
    startDateTime.setHours(
      Number.parseInt(hours),
      Number.parseInt(minutes),
      0,
      0
    );

    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(startDateTime.getHours() + 1);

    const formatDateForICS = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Furniture Designer//Design Consultation//EN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@furnituredesigner.com`,
      `DTSTART:${formatDateForICS(startDateTime)}`,
      `DTEND:${formatDateForICS(endDateTime)}`,
      `SUMMARY:Design Consultation - ${bookingData.service}`,
      `DESCRIPTION:Design Consultation Session\\n\\nService: ${
        bookingData.service
      }\\nClient: ${bookingData.name}\\nEmail: ${bookingData.email}\\nPhone: ${
        bookingData.phone
      }\\n\\nNotes: ${bookingData.message || "No additional notes"}`,
      "LOCATION:Design Studio - Address will be confirmed via email",
      "STATUS:CONFIRMED",
      "BEGIN:VALARM",
      "TRIGGER:-PT15M",
      "ACTION:DISPLAY",
      "DESCRIPTION:Design Consultation in 15 minutes",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    return icsContent;
  };

  const downloadICSFile = (bookingData: any) => {
    const icsContent = generateICSFile(bookingData);
    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `design-consultation-${
      bookingData.date.toISOString().split("T")[0]
    }.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time for your consultation.");
      return;
    }

    if (!isCaptchaValid) {
      alert(t("captcha.required"));
      return;
    }

    setIsSubmitting(true);

    try {
      // Handle booking submission
      const bookingData = {
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
        ...formData,
      };

      console.log("Booking submitted:", bookingData);

      // Try to create the event in your Google Calendar
      const startDateTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(":");
      startDateTime.setHours(
        Number.parseInt(hours),
        Number.parseInt(minutes),
        0,
        0
      );

      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(startDateTime.getHours() + 1);

      const eventCreated = await googleCalendar.createEvent({
        summary: `Design Consultation - ${selectedService}`,
        description: `Client: ${formData.name}\nEmail: ${
          formData.email
        }\nPhone: ${formData.phone}\n\nNotes: ${
          formData.message || "No additional notes"
        }`,
        start: startDateTime,
        end: endDateTime,
        attendeeEmail: formData.email,
      });

      if (eventCreated) {
        console.log("Event created in designer's calendar");
      }

      // Simulate API call for booking system
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message with calendar options
      const shouldAddToCalendar = window.confirm(
        "Consultation booked successfully! Would you like to add this appointment to your calendar?"
      );

      if (shouldAddToCalendar) {
        // Try to open Google Calendar first
        const googleCalendarUrl = generateGoogleCalendarUrl(bookingData);
        const newWindow = window.open(googleCalendarUrl, "_blank");

        // If popup is blocked or user prefers, offer ICS download
        setTimeout(() => {
          const shouldDownloadICS = window.confirm(
            "If Google Calendar didn't open, would you like to download a calendar file instead?"
          );
          if (shouldDownloadICS) {
            downloadICSFile(bookingData);
          }
        }, 2000);
      }

      // Reset form
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSelectedDate(null);
      setSelectedTime("");
      setTimeSlots([]);
      setIsCaptchaValid(false);
      setResetCaptcha((prev) => !prev);
      onClose();
    } catch (error) {
      console.error("Booking error:", error);
      alert("There was an error booking your consultation. Please try again.");
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
  };

  const handleCaptchaValidation = (isValid: boolean) => {
    setIsCaptchaValid(isValid);
  };

  if (!isOpen) return null;

  const days = getDaysInMonth(currentDate);
  const monthYear = currentDate.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Book Consultation
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {selectedService}
            </p>
            {!googleCalendar.isConfigured() && (
              <div className="flex items-center gap-2 mt-2 text-sm text-amber-600 dark:text-amber-400">
                <AlertCircle className="h-4 w-4" />
                <span>
                  Using demo availability - Real-time calendar sync not
                  configured
                </span>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calendar Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Select Date
              </h3>

              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevMonth}
                  className="text-gray-600 dark:text-gray-300"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  {monthYear}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNextMonth}
                  className="text-gray-600 dark:text-gray-300"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400"
                    >
                      {day}
                    </div>
                  )
                )}
                {days.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => day && handleDateSelect(day)}
                    disabled={!day || !isDateAvailable(day)}
                    className={`p-2 text-sm rounded-lg transition-colors ${
                      !day
                        ? "invisible"
                        : !isDateAvailable(day)
                        ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                        : selectedDate &&
                          day.toDateString() === selectedDate.toDateString()
                        ? "bg-blue-500 text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {day?.getDate()}
                  </button>
                ))}
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Available Times
                    {loadingTimeSlots && (
                      <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                    )}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {formatDate(selectedDate)}
                  </p>

                  {calendarError && (
                    <div className="mb-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{calendarError}</span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2">
                    {loadingTimeSlots
                      ? // Loading skeleton
                        Array.from({ length: 6 }).map((_, index) => (
                          <div
                            key={index}
                            className="p-2 text-sm rounded-lg border border-gray-200 dark:border-gray-600 animate-pulse bg-gray-100 dark:bg-gray-700"
                          >
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                          </div>
                        ))
                      : timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            onClick={() =>
                              slot.available && setSelectedTime(slot.time)
                            }
                            disabled={!slot.available}
                            className={`p-2 text-sm rounded-lg border transition-colors ${
                              !slot.available
                                ? "border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed bg-gray-50 dark:bg-gray-700/50"
                                : selectedTime === slot.time
                                ? "border-blue-500 bg-blue-500 text-white"
                                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                  </div>

                  {googleCalendar.isConfigured() && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Real-time availability from Google Calendar
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Form Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Additional notes or questions about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  />
                </div>

                {/* Captcha */}
                <Captcha
                  onValidationChange={handleCaptchaValidation}
                  reset={resetCaptcha}
                />

                {/* Calendar Integration Info */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                        Calendar Integration
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        {googleCalendar.isConfigured()
                          ? "Time slots show real availability from the designer's calendar. After booking, the appointment will be automatically added to both calendars."
                          : "After booking, you'll be able to add this appointment to Google Calendar or download a calendar file for other calendar apps."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={
                      !selectedDate ||
                      !selectedTime ||
                      !isCaptchaValid ||
                      isSubmitting
                    }
                  >
                    {isSubmitting ? "Booking..." : "Book Consultation"}
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
      </div>
    </div>
  );
}
