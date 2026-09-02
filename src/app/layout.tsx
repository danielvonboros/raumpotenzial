import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Innenarchitektur Berlin für kleine Wohnungen | raumideenwerk",
    template: "%s | raumideenwerk",
  },

  description:
    "Innenarchitektur und Raumplanung für kleine Wohnungen in Berlin. Clevere Raumkonzepte, Stauraumlösungen und individuelle Möbelplanung – für mehr Platz ohne Umzug.",

  keywords: [
    "interior design",
    "room concepts",
    "zoning",
    "space optimization",
    "small apartment design",
    "Berlin interior designer",
    "custom furniture",
    "mid-century modern",
    "Innenarchitektur Berlin",
    "Raumkonzept",
    "Raumaufteilung",
    "Wohnung einrichten",
    "Möbelplanung",
    "Wohnungsoptimierung",
    "kleine Wohnung gestalten",
    "Möbeldesign Berlin",
    "Möbeldesign",
    "maßgefertigte Möbel",
    "Innenarchitektur",
    "handgefertigte Möbel",
    "maßgeschneiderte Möbel",
    "Möbel nach Maß",
    "Innenraumgestaltung",
    "Raumkonzepte",
    "Designberatung",
    "Möbel",
    "Architektur",
    "Inneneinrichtung",
    "Raumgestaltung",
    "Wohnkultur",
    "Design",
    "Einrichtungsideen",
    "kreative Möbel",
    "exklusive Möbel",
    "individuelle Möbel",
    "Designmöbel",
    "Möbelherstellung",
    "Innenarchitekt",
    "Raumplanung",
    "Innenraumkonzepte",
    "Wohnraumgestaltung",
    "kreative Innenräume",
    "Designlösungen",
    "Inneneinrichtungsideen",
    "Möbelgestaltung",
    "Architekturdesign",
  ],
  authors: [{ name: "Daniel von Boros" }],
  openGraph: {
    title:
      "raumideenwerk - Smart Space - Better Living | Interior Design & Space Optimization | Innenarchitektur Berlin",
    description:
      "Specialized in room concepts, apartment zoning, and smart space solutions. Spezialisiert auf Raumkonzepte, kreative Zonierung und maßgeschneiderte Einrichtungslösungen für Berliner Wohnungen.",
    url: "https://raumideenwerk.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Design & Space Optimization | Innenarchitektur Berlin",
    description:
      "Experte für Raumkonzepte, Raumaufteilung und Wohnungsoptimierung. Expertise in room concepts, zoning, and smart apartment layouts.",
    images: ["https://raumideenwerk.com/website.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
