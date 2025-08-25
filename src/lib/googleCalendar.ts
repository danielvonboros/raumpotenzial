// Google Calendar API integration
interface CalendarEvent {
  start: {
    dateTime?: string
    date?: string
  }
  end: {
    dateTime?: string
    date?: string
  }
  summary?: string
}

interface TimeSlot {
  time: string
  available: boolean
}

export class GoogleCalendarService {
  private apiKey: string
  private calendarId: string

  constructor() {
    // These would typically come from environment variables
    this.apiKey = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY || ""
    this.calendarId = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID || "primary"
  }

  // Check if the service is properly configured
  isConfigured(): boolean {
    return !!this.apiKey && !!this.calendarId
  }

  // Get events for a specific date
  async getEventsForDate(date: Date): Promise<CalendarEvent[]> {
    if (!this.isConfigured()) {
      console.warn("Google Calendar API not configured")
      return []
    }

    try {
      const startOfDay = new Date(date)
      startOfDay.setHours(0, 0, 0, 0)

      const endOfDay = new Date(date)
      endOfDay.setHours(23, 59, 59, 999)

      const timeMin = startOfDay.toISOString()
      const timeMax = endOfDay.toISOString()

      const url =
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(this.calendarId)}/events?` +
        `key=${this.apiKey}&` +
        `timeMin=${timeMin}&` +
        `timeMax=${timeMax}&` +
        `singleEvents=true&` +
        `orderBy=startTime`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Calendar API error: ${response.status}`)
      }

      const data = await response.json()
      return data.items || []
    } catch (error) {
      console.error("Error fetching calendar events:", error)
      return []
    }
  }

  // Check if a specific time slot is available
  isTimeSlotAvailable(events: CalendarEvent[], timeSlot: string, date: Date): boolean {
    const [hours, minutes] = timeSlot.split(":").map(Number)

    const slotStart = new Date(date)
    slotStart.setHours(hours, minutes, 0, 0)

    const slotEnd = new Date(slotStart)
    slotEnd.setHours(hours + 1, minutes, 0, 0) // Assuming 1-hour slots

    return !events.some((event) => {
      if (!event.start?.dateTime || !event.end?.dateTime) {
        return false // Skip all-day events
      }

      const eventStart = new Date(event.start.dateTime)
      const eventEnd = new Date(event.end.dateTime)

      // Check if there's any overlap
      return slotStart < eventEnd && slotEnd > eventStart
    })
  }

  // Get available time slots for a specific date
  async getAvailableTimeSlots(date: Date): Promise<TimeSlot[]> {
    const baseTimeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]

    if (!this.isConfigured()) {
      // Fallback to static availability if API not configured
      return baseTimeSlots.map((time) => ({
        time,
        available: !["11:00", "17:00"].includes(time), // Mock some unavailable slots
      }))
    }

    try {
      const events = await this.getEventsForDate(date)

      return baseTimeSlots.map((time) => ({
        time,
        available: this.isTimeSlotAvailable(events, time, date),
      }))
    } catch (error) {
      console.error("Error getting available time slots:", error)
      // Fallback to static availability on error
      return baseTimeSlots.map((time) => ({
        time,
        available: true,
      }))
    }
  }

  // Create a calendar event (for booking confirmation)
  async createEvent(eventData: {
    summary: string
    description: string
    start: Date
    end: Date
    attendeeEmail?: string
  }): Promise<boolean> {
    if (!this.isConfigured()) {
      console.warn("Google Calendar API not configured for event creation")
      return false
    }

    try {
      const event = {
        summary: eventData.summary,
        description: eventData.description,
        start: {
          dateTime: eventData.start.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        end: {
          dateTime: eventData.end.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        attendees: eventData.attendeeEmail ? [{ email: eventData.attendeeEmail }] : [],
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 24 * 60 }, // 24 hours before
            { method: "popup", minutes: 15 }, // 15 minutes before
          ],
        },
      }

      const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(this.calendarId)}/events?key=${this.apiKey}`

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      })

      return response.ok
    } catch (error) {
      console.error("Error creating calendar event:", error)
      return false
    }
  }
}

// Export singleton instance
export const googleCalendar = new GoogleCalendarService()
