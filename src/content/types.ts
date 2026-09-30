export type FrameColor = "gelb" | "tinte" | "petrol";

export interface ImageRef {
  src: string;
  alt: string;
  /** CSS object-position für den Bildausschnitt, z. B. "50% 40%" */
  position?: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface TextItem {
  title: string;
  text: string;
}

export interface Project {
  slug: string;
  /** Katalognummer, identisch mit der Nummer auf Instagram */
  number: string;
  year: string;
  color: FrameColor;
  /** Anzeigetitel, lowercase */
  title: string;
  /** Kursive Unterzeile, lowercase */
  subtitle: string;
  /** Titel für <title> und Suchergebnisse */
  metaTitle: string;
  /** Kurzbeschreibung für Meta-Description und Vorschauen */
  description: string;
  story: string;
  goal?: string;
  materials: string;
  dimensions: string;
  /** Hauptbild (nachher) */
  cover: ImageRef;
  /** Zweites Fenster im Cover (vorher, Entwurf oder Detail) */
  detail: ImageRef;
  gallery: ImageRef[];
}

export interface Package {
  name: string;
  kind: string;
  price: string;
  surcharge: string;
  description: string;
  features: string[];
  addOns?: { name: string; price: string }[];
  cta: string;
  color: FrameColor;
  popular?: boolean;
}

export interface ContactFormContent {
  name: string;
  email: string;
  subject: string;
  message: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  captchaRequired: string;
  consentTitle: string;
  consentText: string;
  consentButton: string;
}

export interface SiteContent {
  skipLink: string;
  nav: NavLink[];
  headerCta: NavLink;
  menu: { open: string; close: string };
  hero: {
    spine: [string, string];
    claim: string;
    keywords: string;
    primaryCta: NavLink;
    secondaryCta: NavLink;
    imageTop: ImageRef;
    imageBottom: ImageRef;
  };
  projects: {
    title: string;
    subtitle: string;
    prevLabel: string;
    nextLabel: string;
    ctaCard: { number: string; title: string; subtitle: string; href: string };
    items: Project[];
  };
  services: { title: string; subtitle: string; items: TextItem[] };
  painPoints: { title: string; items: TextItem[] };
  process: { title: string; subtitle: string; steps: TextItem[] };
  packages: {
    title: string;
    subtitle: string;
    popularLabel: string;
    addOnsLabel: string;
    items: Package[];
    notes: string[];
  };
  about: {
    title: string;
    subtitle: string;
    spine: string;
    text: string;
    portrait: ImageRef;
  };
  testimonials: { title: string; items: { text: string; author: string }[] };
  contact: {
    title: string;
    subtitle: string;
    details: { label: string; value: string; href?: string }[];
    form: ContactFormContent;
  };
  footer: {
    contact: NavLink[];
    social: NavLink[];
    address: string;
    legal: NavLink[];
    homeLabel: string;
  };
  projectPage: {
    back: string;
    goal: string;
    story: string;
    materials: string;
    dimensions: string;
    year: string;
    gallery: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: NavLink;
    prev: string;
    next: string;
  };
}
