# Gmail SMTP Setup Guide

This guide explains how to set up Gmail SMTP for sending emails through your contact forms and booking system.

## Prerequisites

- Gmail account
- Two-factor authentication enabled on your Gmail account

## Setup Steps

### 1. Enable Two-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click "2-Step Verification"
3. Follow the setup process to enable 2FA

### 2. Generate App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click "App passwords"
3. Select "Mail" as the app
4. Select "Other (custom name)" as the device
5. Enter "Furniture Portfolio" as the name
6. Click "Generate"
7. **Copy the 16-character password** (you won't see it again)

### 3. Environment Variables

Add these to your `.env.local` file:

\`\`\`env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
\`\`\`

**Important:** Use the app password, NOT your regular Gmail password!

## Features

### ✅ **Email Functionality:**

#### **Contact Forms:**

- **Business notifications** - All messages forwarded to hallo@raumideenwerk.com
- **Auto-replies** - Professional confirmation emails to users
- **Rich HTML formatting** - Beautiful, responsive email templates
- **Reply-to headers** - Direct replies go to the user's email

#### **Booking System:**

- **Booking notifications** - Detailed appointment info sent to your Gmail
- **Client confirmations** - Professional booking confirmations
- **Calendar integration** - Easy to add to Google Calendar
- **Action reminders** - Clear next steps for each booking

#### **Email Templates Include:**

- 📧 **Professional branding** - Consistent design across all emails
- 📱 **Mobile responsive** - Looks great on all devices
- 🎨 **Rich formatting** - Colors, icons, and structured layouts
- ⏰ **Timestamps** - When messages were sent
- 📋 **Complete information** - All form data preserved

### 🔒 **Security Features:**

- **App passwords** - More secure than regular passwords
- **Input validation** - All form data sanitized
- **Error handling** - Graceful fallback if email fails
- **No sensitive data** - Passwords stored securely in environment variables

### 📊 **Email Types:**

#### 1. Contact Form Notification

**To:** hallo@raumideenwerk.com  
**Subject:** Contact Form: [User's Subject]  
**Content:** Name, email, subject, message, timestamp

#### 2. Contact Auto-Reply

**To:** User's email  
**Subject:** Thank you for your message - Furniture Portfolio  
**Content:** Professional thank you with message summary

#### 3. Booking Notification

**To:** hallo@raumideenwerk.com  
**Subject:** 🗓️ New Consultation Booking - [Service] ([Date] at [Time])  
**Content:** Client info, appointment details, action items

#### 4. Booking Confirmation

**To:** User's email  
**Subject:** ✅ Consultation Booking Confirmed - Furniture Portfolio  
**Content:** Appointment details, next steps, contact info

## Testing

1. **Contact Form Test:**

   - Fill out contact form
   - Check hallo@raumideenwerk.com for notification
   - Check sender's email for auto-reply

2. **Booking Test:**
   - Book a consultation
   - Check hallo@raumideenwerk.com for booking details
   - Check client email for confirmation

## Troubleshooting

### **Common Issues:**

#### "Authentication failed"

- ✅ Make sure 2FA is enabled
- ✅ Use app password, not regular password
- ✅ Check GMAIL_USER is correct email address

#### "Emails not sending"

- ✅ Verify environment variables are set
- ✅ Check app password is 16 characters
- ✅ Ensure no spaces in app password

#### "Emails in spam folder"

- ✅ This is normal for new sending addresses
- ✅ Mark as "Not Spam" to improve future delivery
- ✅ Consider using a custom domain for better reputation

#### "Rate limiting"

- ✅ Gmail allows 500 emails/day for free accounts
- ✅ 2000 emails/day for Google Workspace accounts
- ✅ Monitor usage if you expect high volume

## Gmail Limits

- **Free Gmail:** 500 emails per day
- **Google Workspace:** 2000 emails per day
- **Rate limit:** 100 emails per hour
- **Attachment size:** 25MB max

## Best Practices

1. **Monitor your Gmail account** for any delivery issues
2. **Keep app passwords secure** - treat like regular passwords
3. **Test regularly** to ensure emails are working
4. **Check spam folders** initially until reputation builds
5. **Consider Google Workspace** for higher limits if needed

## Alternative: Google Workspace

For professional use, consider upgrading to Google Workspace:

- **Higher sending limits** (2000/day vs 500/day)
- **Custom domain** (you@raumideenwerk.com)
- **Better deliverability** and professional appearance
- **Advanced admin controls** and security features

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify all environment variables are correct
3. Test with a simple email first
4. Check Gmail's security settings for any blocks
