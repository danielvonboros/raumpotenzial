"use server";

import nodemailer from "nodemailer";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const smtpPass = Buffer.from(
  process.env.GMAIL_APP_PASSWORD!,
  "base64"
).toString("utf-8");

// Create SMTP transporter for Gmail
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: smtpPass,
    },
  });
};

export async function submitContactForm(formData: FormData) {
  try {
    // Extract form data
    const contactData: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    // Validate required fields
    if (
      !contactData.name ||
      !contactData.email ||
      !contactData.subject ||
      !contactData.message
    ) {
      return {
        success: false,
        error: "All fields are required",
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      };
    }

    // Check if Gmail SMTP is configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.log("Gmail SMTP not configured. Contact form data:");
      console.log(contactData);
      return {
        success: false,
        error:
          "Email service not configured. Please contact us directly at hallo@raumideenwerk.com",
      };
    }

    const transporter = createTransporter();

    // Prepare email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #1f2937; margin-bottom: 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #374151; margin-bottom: 10px;">Contact Information:</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${
              contactData.name
            }</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${
              contactData.email
            }" style="color: #3b82f6;">${contactData.email}</a></p>
            <p style="margin: 5px 0;"><strong>Subject:</strong> ${
              contactData.subject
            }</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #374151; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6;">
              <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${
                contactData.message
              }</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              This message was sent from the Furniture Portfolio contact form on ${new Date().toLocaleString()}.
            </p>
          </div>
        </div>
      </div>
    `;

    const emailText = `
New Contact Form Submission

Contact Information:
Name: ${contactData.name}
Email: ${contactData.email}
Subject: ${contactData.subject}

Message:
${contactData.message}

---
This message was sent from the Furniture Portfolio contact form on ${new Date().toLocaleString()}.
    `;

    // Send email to your business email
    await transporter.sendMail({
      from: `"Furniture Portfolio" <${process.env.GMAIL_USER}>`,
      to: "hallo@raumideenwerk.com",
      replyTo: contactData.email,
      subject: `Contact Form: ${contactData.subject}`,
      html: emailHtml,
      text: emailText,
    });

    // Send auto-reply to the user
    const autoReplyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Thank you for your message!</h2>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            Dear ${contactData.name},
          </p>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            Thank you for reaching out through our contact form. We have received your message regarding "${contactData.subject}" and will get back to you as soon as possible.
          </p>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            We typically respond to inquiries within 24-48 hours during business days. If your inquiry is urgent, please feel free to call us directly.
          </p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <h3 style="color: #374151; margin-bottom: 10px;">Your Message Summary:</h3>
            <p style="margin: 5px 0;"><strong>Subject:</strong> ${contactData.subject}</p>
            <p style="margin: 5px 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0; font-style: italic; white-space: pre-wrap;">${contactData.message}</p>
          </div>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            Best regards,<br>
            The Furniture Design Team<br>
            <a href="mailto:hallo@raumideenwerk.com" style="color: #3b82f6;">hallo@raumideenwerk.com</a>
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              This is an automated confirmation email. Please do not reply to this message directly.
            </p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Furniture Portfolio" <${process.env.GMAIL_USER}>`,
      to: contactData.email,
      subject: "Thank you for your message - Furniture Portfolio",
      html: autoReplyHtml,
      text: `Dear ${contactData.name},\n\nThank you for reaching out through our contact form. We have received your message regarding "${contactData.subject}" and will get back to you as soon as possible.\n\nWe typically respond to inquiries within 24-48 hours during business days.\n\nBest regards,\nThe Furniture Design Team\nhallo@raumideenwerk.com`,
    });

    return {
      success: true,
      message: "Message sent successfully! We will get back to you soon.",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      error:
        "Failed to send message. Please try again later or contact us directly at hallo@raumideenwerk.com",
    };
  }
}

export async function submitBookingForm(formData: FormData) {
  try {
    // Extract booking form data
    const bookingData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      service: formData.get("service") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      message: formData.get("message") as string,
    };

    // Validate required fields
    if (
      !bookingData.name ||
      !bookingData.email ||
      !bookingData.phone ||
      !bookingData.service ||
      !bookingData.date ||
      !bookingData.time
    ) {
      return {
        success: false,
        error: "All required fields must be filled",
      };
    }

    // Check if Gmail SMTP is configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.log("Gmail SMTP not configured. Booking data:");
      console.log(bookingData);
      return {
        success: false,
        error:
          "Email service not configured. Please contact us directly at hallo@raumideenwerk.com",
      };
    }

    const transporter = createTransporter();

    // Format date for better readability
    const formattedDate = new Date(bookingData.date).toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    // Prepare booking email content
    const bookingEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #1f2937; margin-bottom: 20px; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
            🗓️ New Consultation Booking
          </h2>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #374151; margin-bottom: 10px;">👤 Client Information:</h3>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${
              bookingData.name
            }</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${
              bookingData.email
            }" style="color: #3b82f6;">${bookingData.email}</a></p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> <a href="tel:${
              bookingData.phone
            }" style="color: #3b82f6;">${bookingData.phone}</a></p>
          </div>
          
          <div style="margin-bottom: 20px; background-color: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <h3 style="color: #1e40af; margin-bottom: 15px;">📅 Appointment Details:</h3>
            <p style="margin: 8px 0; font-size: 16px;"><strong>Service:</strong> ${
              bookingData.service
            }</p>
            <p style="margin: 8px 0; font-size: 16px;"><strong>Date:</strong> ${formattedDate}</p>
            <p style="margin: 8px 0; font-size: 16px;"><strong>Time:</strong> ${
              bookingData.time
            }</p>
          </div>
          
          ${
            bookingData.message
              ? `
          <div style="margin-bottom: 20px;">
            <h3 style="color: #374151; margin-bottom: 10px;">💬 Additional Notes:</h3>
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; border-left: 4px solid #10b981;">
              <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${bookingData.message}</p>
            </div>
          </div>
          `
              : ""
          }
          
          <div style="margin-top: 30px; padding: 20px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <h4 style="color: #92400e; margin-bottom: 10px;">⚡ Action Required:</h4>
            <ul style="color: #92400e; margin: 0; padding-left: 20px;">
              <li>Confirm appointment availability</li>
              <li>Send location details to client</li>
              <li>Add to your calendar</li>
              <li>Prepare consultation materials</li>
            </ul>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              📧 This booking was made through the Furniture Portfolio website on ${new Date().toLocaleString()}.
            </p>
          </div>
        </div>
      </div>
    `;

    // Send booking notification email
    await transporter.sendMail({
      from: `"Furniture Portfolio Booking" <${process.env.GMAIL_USER}>`,
      to: "hallo@raumideenwerk.com",
      replyTo: bookingData.email,
      subject: `🗓️ New Consultation Booking - ${bookingData.service} (${formattedDate} at ${bookingData.time})`,
      html: bookingEmailHtml,
    });

    // Send confirmation to client
    const clientConfirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #1f2937; margin-bottom: 20px;">✅ Consultation Booking Confirmed!</h2>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            Dear ${bookingData.name},
          </p>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            Thank you for booking a consultation with us! Your appointment request has been received and we're excited to work with you.
          </p>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 6px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-bottom: 15px;">📅 Your Appointment Details</h3>
            <p style="margin: 8px 0; font-size: 16px;"><strong>Service:</strong> ${bookingData.service}</p>
            <p style="margin: 8px 0; font-size: 16px;"><strong>Date:</strong> ${formattedDate}</p>
            <p style="margin: 8px 0; font-size: 16px;"><strong>Time:</strong> ${bookingData.time}</p>
          </div>
          
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 6px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <h4 style="color: #92400e; margin-bottom: 10px;">📋 What happens next?</h4>
            <ul style="color: #92400e; margin: 0; padding-left: 20px; line-height: 1.6;">
              <li>We'll confirm your appointment within 24 hours</li>
              <li>You'll receive the exact location and meeting details</li>
              <li>We recommend adding this to your calendar</li>
              <li>Feel free to prepare any questions or ideas you'd like to discuss</li>
            </ul>
          </div>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            If you need to reschedule or have any questions before our meeting, please don't hesitate to contact us at <a href="mailto:hallo@raumideenwerk.com" style="color: #3b82f6;">hallo@raumideenwerk.com</a>.
          </p>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            We look forward to bringing your design vision to life!<br><br>
            Best regards,<br>
            <strong>The Furniture Design Team</strong><br>
            <a href="mailto:hallo@raumideenwerk.com" style="color: #3b82f6;">hallo@raumideenwerk.com</a>
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              This is an automated confirmation email. If you have any questions, please reply to this email or contact us directly.
            </p>
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Furniture Portfolio" <${process.env.GMAIL_USER}>`,
      to: bookingData.email,
      subject: "✅ Consultation Booking Confirmed - Furniture Portfolio",
      html: clientConfirmationHtml,
    });

    return {
      success: true,
      message:
        "Consultation booked successfully! You will receive a confirmation email shortly.",
    };
  } catch (error) {
    console.error("Booking form error:", error);
    return {
      success: false,
      error:
        "Failed to book consultation. Please try again later or contact us directly at hallo@raumideenwerk.com",
    };
  }
}
