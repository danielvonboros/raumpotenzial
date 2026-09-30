"use client";

import { useCallback, useState, type ChangeEvent, type FormEvent } from "react";
import Captcha from "@/components/Captcha";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { submitContactForm } from "@/app/actions/SendMail";
import type { ContactFormContent } from "@/content/types";

type Status = { type: "success" | "error"; message: string } | null;

const emptyValues = { name: "", email: "", subject: "", message: "" };

const labelClass = "flex flex-col gap-2 text-[15px] font-semibold";
const fieldClass =
  "border-2 border-tinte bg-white px-3.5 text-[17px] font-normal text-tinte disabled:cursor-not-allowed disabled:opacity-50";

export function ContactForm({ c }: { c: ContactFormContent }) {
  const { hasConsented, resetConsent } = useCookieConsent();
  const [values, setValues] = useState(emptyValues);
  const [captchaValid, setCaptchaValid] = useState(false);
  const [captchaReset, setCaptchaReset] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  // Stabile Referenz, weil Captcha den Callback in einem Effect verwendet
  const onCaptchaChange = useCallback((valid: boolean) => setCaptchaValid(valid), []);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
    if (status) setStatus(null);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasConsented) {
      setStatus({ type: "error", message: c.consentText });
      return;
    }
    if (!captchaValid) {
      setStatus({ type: "error", message: c.captchaRequired });
      return;
    }

    setSending(true);
    setStatus(null);
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => formData.append(key, value));
      const result = await submitContactForm(formData);
      if (result.success) {
        setStatus({ type: "success", message: c.success });
        setValues(emptyValues);
        setCaptchaValid(false);
        setCaptchaReset((current) => !current);
      } else {
        setStatus({ type: "error", message: c.error });
      }
    } catch {
      setStatus({ type: "error", message: c.error });
    } finally {
      setSending(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Kontaktformular"
      className="grid gap-x-5 gap-y-[18px] sm:grid-cols-2"
    >
      {!hasConsented && (
        <div className="border-2 border-tinte p-4 sm:col-span-2">
          <p className="font-bold">{c.consentTitle}</p>
          <p className="mt-1 text-[15px] leading-snug">{c.consentText}</p>
          <button
            type="button"
            onClick={resetConsent}
            className="mt-3 text-[15px] font-semibold underline underline-offset-4 hover:text-petrol"
          >
            {c.consentButton}
          </button>
        </div>
      )}

      <label className={labelClass}>
        {c.name}
        <input
          type="text"
          name="name"
          autoComplete="name"
          required
          value={values.name}
          onChange={onChange}
          disabled={!hasConsented}
          className={`h-12 ${fieldClass}`}
        />
      </label>
      <label className={labelClass}>
        {c.email}
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={onChange}
          disabled={!hasConsented}
          className={`h-12 ${fieldClass}`}
        />
      </label>
      <label className={`${labelClass} sm:col-span-2`}>
        {c.subject}
        <input
          type="text"
          name="subject"
          required
          value={values.subject}
          onChange={onChange}
          disabled={!hasConsented}
          className={`h-12 ${fieldClass}`}
        />
      </label>
      <label className={`${labelClass} sm:col-span-2`}>
        {c.message}
        <textarea
          name="message"
          rows={6}
          required
          value={values.message}
          onChange={onChange}
          disabled={!hasConsented}
          className={`resize-y py-3 leading-[1.45] ${fieldClass}`}
        />
      </label>

      {hasConsented && (
        <div className="sm:col-span-2">
          <Captcha onValidationChange={onCaptchaChange} reset={captchaReset} />
        </div>
      )}

      <div aria-live="polite" className="sm:col-span-2 empty:hidden">
        {status && (
          <p
            className={`p-4 text-[15px] leading-snug ${
              status.type === "success" ? "bg-petrol text-leinen" : "bg-tinte text-leinen"
            }`}
          >
            {status.message}
          </p>
        )}
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={sending || !hasConsented}
          className="h-14 bg-tinte px-7 text-lg font-semibold text-leinen hover:bg-petrol disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? c.sending : c.submit}
        </button>
      </div>
    </form>
  );
}
