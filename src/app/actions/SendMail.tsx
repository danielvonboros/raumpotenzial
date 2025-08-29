"use client";

// EmailJS configuration - these would be your EmailJS credentials
const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_default",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_default",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "your_public_key",
};

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
}

// Fallback email service that works entirely in the browser
class LocalEmailService {
  private isConfigured(): boolean {
    return !!(
      EMAILJS_CONFIG.serviceId !== "service_default" &&
      EMAILJS_CONFIG.templateId !== "template_default" &&
      EMAILJS_CONFIG.publicKey !== "your_public_key"
    );
  }

  async sendContactEmail(
    data: ContactFormData
  ): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      // Validate required fields
      if (!data.name || !data.email || !data.subject || !data.message) {
        return {
          success: false,
          error: "All fields are required",
        };
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        return {
          success: false,
          error: "Please enter a valid email address",
        };
      }

      // If EmailJS is not configured, simulate success for demo
      if (!this.isConfigured()) {
        console.log("📧 Contact Form Submission (Demo Mode):");
        console.log("Name:", data.name);
        console.log("Email:", data.email);
        console.log("Subject:", data.subject);
        console.log("Message:", data.message);
        console.log("Timestamp:", new Date().toLocaleString());

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        return {
          success: true,
          message:
            "Message sent successfully! (Demo mode - check console for details)",
        };
      }

      // If EmailJS is configured, use it
      const { default: emailjs } = await import("@emailjs/browser");

      const templateParams = {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
        to_email: "hallo@raumideenwerk.com",
        timestamp: new Date().toLocaleString(),
      };

      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      return {
        success: true,
        message: "Message sent successfully! We will get back to you soon.",
      };
    } catch (error) {
      console.error("Email sending error:", error);
      return {
        success: false,
        error:
          "Failed to send message. Please try again later or contact us directly at hallo@raumideenwerk.com",
      };
    }
  }

  async sendBookingEmail(
    data: BookingFormData
  ): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      // Validate required fields
      if (
        !data.name ||
        !data.email ||
        !data.phone ||
        !data.service ||
        !data.date ||
        !data.time
      ) {
        return {
          success: false,
          error: "All required fields must be filled",
        };
      }

      // Format date for better readability
      const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // If EmailJS is not configured, simulate success for demo
      if (!this.isConfigured()) {
        console.log("📅 Booking Form Submission (Demo Mode):");
        console.log("Name:", data.name);
        console.log("Email:", data.email);
        console.log("Phone:", data.phone);
        console.log("Service:", data.service);
        console.log("Date:", formattedDate);
        console.log("Time:", data.time);
        console.log("Message:", data.message);
        console.log("Timestamp:", new Date().toLocaleString());

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return {
          success: true,
          message:
            "Consultation booked successfully! (Demo mode - check console for details)",
        };
      }

      // If EmailJS is configured, use it
      const { default: emailjs } = await import("@emailjs/browser");

      const templateParams = {
        client_name: data.name,
        client_email: data.email,
        client_phone: data.phone,
        service_type: data.service,
        appointment_date: formattedDate,
        appointment_time: data.time,
        additional_notes: data.message || "No additional notes",
        to_email: "hallo@raumideenwerk.com",
        timestamp: new Date().toLocaleString(),
      };

      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        "template_booking", // Different template for bookings
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      return {
        success: true,
        message:
          "Consultation booked successfully! You will receive a confirmation email shortly.",
      };
    } catch (error) {
      console.error("Booking error:", error);
      return {
        success: false,
        error:
          "Failed to book consultation. Please try again later or contact us directly at hallo@raumideenwerk.com",
      };
    }
  }

  // Generate mailto link as fallback
  generateMailtoLink(data: ContactFormData): string {
    const subject = encodeURIComponent(`Contact Form: ${data.subject}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Subject: ${data.subject}\n\n` +
        `Message:\n${data.message}\n\n` +
        `---\n` +
        `Sent from Furniture Portfolio website on ${new Date().toLocaleString()}`
    );

    return `mailto:hallo@raumideenwerk.com?subject=${subject}&body=${body}`;
  }

  // Generate booking mailto link
  generateBookingMailtoLink(data: BookingFormData): string {
    const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const subject = encodeURIComponent(
      `Consultation Booking - ${data.service}`
    );
    const body = encodeURIComponent(
      `New Consultation Booking Request\n\n` +
        `Client Information:\n` +
        `Name: ${data.name}\n` +
        `Email: ${data.email}\n` +
        `Phone: ${data.phone}\n\n` +
        `Appointment Details:\n` +
        `Service: ${data.service}\n` +
        `Date: ${formattedDate}\n` +
        `Time: ${data.time}\n\n` +
        `Additional Notes:\n${data.message || "No additional notes"}\n\n` +
        `---\n` +
        `Booking made through Furniture Portfolio website on ${new Date().toLocaleString()}`
    );

    return `mailto:hallo@raumideenwerk.com?subject=${subject}&body=${body}`;
  }
}

export const emailService = new LocalEmailService();
