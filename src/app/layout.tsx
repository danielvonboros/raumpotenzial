import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "raumideenwerk – Innenarchitektur & Raumkonzepte in Berlin | Smart Space Design",
  description:
    "Innenarchitektur & Interior Design aus Berlin – spezialisiert auf Raumkonzepte, Raumaufteilung, Möbel nach Maß und die Gestaltung kleiner Stadtwohnungen. Individuelle Designlösungen, Beratung und maßgefertigte Möbel.",
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
        <meta
          name="ai-content-type"
          content="interior-design, innenarchitektur"
        />
        <meta
          name="ai-topic"
          content="space-optimization, room-concepts, zoning, möbelplanung, wohnungsoptimierung"
        />
        <meta name="ai-category" content="home, design, architecture, wohnen" />
        <meta
          name="x-ai-label"
          content="professional-interior-design-service, innenarchitektur-dienstleistung"
        />

        <meta name="ai-generated" content="false" />
        <meta name="ai-review" content="human-curated" />
        <meta name="ai-moderation" content="safe" />
        <meta name="ai-robots" content="allow" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Interior Design & Space Optimization Studio / Innenarchitektur Berlin",
              url: "https://raumideenwerk.com",
              images: [
                {
                  url: "https://raumideenwerk.com/website.webp",
                  width: 1200,
                  height: 630,
                },
              ],
              description:
                "Interior design studio specializing in room concepts, zoning, furniture layout and space optimization. Innenarchitektur für Raumkonzepte, Möbelplanung und die Gestaltung kleiner Wohnungen in Berlin.",

              address: {
                "@type": "PostalAddress",
                addressLocality: "Berlin",
                addressCountry: "DE",
              },
              areaServed: ["Berlin", "Deutschland", "Germany"],
              serviceType: [
                "Room Concept Design",
                "Interior Zoning",
                "Furniture Layout Planning",
                "Space Optimization",
                "Custom Furniture Design",
                "Online Interior Consulting",
                "Raumkonzepte",
                "Raumaufteilung",
                "Möbelplanung",
                "Wohnungsoptimierung",
              ],
            }),
          }}
        />
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
