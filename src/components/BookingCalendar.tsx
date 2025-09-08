"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import {
  Calendar,
  Clock,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import Captcha from "@/components/Captcha";
import { googleCalendar } from "@/lib/googleCalendar";
import { submitBookingForm } from "@/app/actions/SendMail";

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
  const { hasConsented, resetConsent } = useCookieConsent();
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
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Load available time slots when date is selected
  useEffect(() => {
    if (selectedDate && hasConsented) {
      loadAvailableTimeSlots(selectedDate);
    }
  }, [selectedDate, hasConsented]);

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
    if (isDateAvailable(date) && hasConsented) {
      setSelectedDate(date);
      setSelectedTime("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasConsented) {
      setSubmitStatus({
        type: "error",
        message: t("contact.cookieError.message"),
      });
      return;
    }

    if (!selectedDate || !selectedTime) {
      setSubmitStatus({
        type: "error",
        message: "Please select a date and time for your consultation.",
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
      // Prepare form data for server action
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("email", formData.email);
      formDataObj.append("phone", formData.phone);
      formDataObj.append("service", selectedService);
      formDataObj.append("date", selectedDate.toISOString().split("T")[0]);
      formDataObj.append("time", selectedTime);
      formDataObj.append("message", formData.message);

      const result = await submitBookingForm(formDataObj);

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message || "Consultation booked successfully!",
        });

        // Handle booking data for calendar integration
        const bookingData = {
          service: selectedService,
          date: selectedDate,
          time: selectedTime,
          ...formData,
        };

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

        // Reset form and close modal after success
        setTimeout(() => {
          setFormData({ name: "", email: "", phone: "", message: "" });
          setSelectedDate(null);
          setSelectedTime("");
          setTimeSlots([]);
          setIsCaptchaValid(false);
          setResetCaptcha((prev) => !prev);
          setSubmitStatus({ type: null, message: "" });
          onClose();
        }, 3000);
      } else {
        setSubmitStatus({
          type: "error",
          message:
            result.error || "Failed to book consultation. Please try again.",
        });
      }
    } catch (error) {
      console.error("Booking error:", error);
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
            {!hasConsented && (
              <div className="flex items-center gap-2 mt-2 text-sm text-amber-600 dark:text-amber-400">
                <AlertCircle className="h-4 w-4" />
                <span>Cookie consent required for booking appointments</span>
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
          {!hasConsented && (
            <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                    {t("contact.cookieError.title")}
                  </h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
                    {t("contact.cookieError.message")}
                  </p>
                  <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                    {t("contact.cookieError.directContact")}
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    hallo@raumideenwerk.com
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calendar Section */}
            <div
              className={!hasConsented ? "opacity-50 pointer-events-none" : ""}
            >
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
                  disabled={!hasConsented}
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
                  disabled={!hasConsented}
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
                    disabled={!day || !isDateAvailable(day) || !hasConsented}
                    className={`p-2 text-sm rounded-lg transition-colors ${
                      !day
                        ? "invisible"
                        : !isDateAvailable(day) || !hasConsented
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
              {selectedDate && hasConsented && (
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
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={!hasConsented}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Additional notes or questions about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
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

                {/* Cookie Consent Integration Info */}
                <div
                  className={`rounded-lg p-4 border ${
                    hasConsented
                      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                      : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Calendar
                      className={`h-5 w-5 mt-0.5 ${
                        hasConsented
                          ? "text-green-600 dark:text-green-400"
                          : "text-amber-600 dark:text-amber-400"
                      }`}
                    />
                    <div>
                      <h4
                        className={`text-sm font-semibold mb-1 ${
                          hasConsented
                            ? "text-green-900 dark:text-green-100"
                            : "text-amber-900 dark:text-amber-100"
                        }`}
                      >
                        {hasConsented
                          ? "Google Integration Active"
                          : "Cookie Consent Required"}
                      </h4>
                      <p
                        className={`text-sm ${
                          hasConsented
                            ? "text-green-700 dark:text-green-300"
                            : "text-amber-700 dark:text-amber-300"
                        }`}
                      >
                        {hasConsented
                          ? "Booking confirmations are sent via Gmail SMTP to both you and hallo@raumideenwerk.com. Appointments are automatically added to Google Calendar."
                          : "Accept cookies to enable automated booking with Google Calendar integration and email notifications."}
                      </p>
                      {!hasConsented && (
                        <button
                          onClick={() => resetConsent()}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline mt-2"
                        >
                          {t("contact.cookieError.changeCookiePreferences")}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={
                      !hasConsented ||
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
                    disabled={isSubmitting}
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
