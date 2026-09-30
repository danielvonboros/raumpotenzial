"use client";

import CookieConsentModal from "@/components/CookieConsentModal";
import { CookieConsentProvider } from "@/contexts/CookieConsentContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import type { ContactFormContent } from "@/content/types";
import { ContactForm } from "./ContactForm";

export function ContactIsland({ c }: { c: ContactFormContent }) {
  return (
    <LanguageProvider>
      <CookieConsentProvider>
        <ContactForm c={c} />
        <CookieConsentModal />
      </CookieConsentProvider>
    </LanguageProvider>
  );
}
