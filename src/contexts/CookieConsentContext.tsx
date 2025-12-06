"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

interface CookieConsentContextType {
  hasConsented: boolean;
  showModal: boolean;
  acceptCookies: () => void;
  declineCookies: () => void;
  resetConsent: () => void;
}

const CookieConsentContext = createContext<
  CookieConsentContextType | undefined
>(undefined);

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasConsented, setHasConsented] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent");
    if (consent === null) {
      // No previous choice, show modal
      setShowModal(true);
    } else {
      // User has made a choice before
      setHasConsented(consent === "accepted");
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setHasConsented(true);
    setShowModal(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setHasConsented(false);
    setShowModal(false);
  };

  const resetConsent = () => {
    localStorage.removeItem("cookie-consent");
    setHasConsented(false);
    setShowModal(true);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        hasConsented,
        showModal,
        acceptCookies,
        declineCookies,
        resetConsent,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider"
    );
  }
  return context;
}
