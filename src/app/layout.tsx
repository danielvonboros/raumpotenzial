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
  title: "raumideenwerk",
  description:
    "Innenraumdesign und Architektur - Raum Konzepte, Möbeldesign, Design, Einrichtung, Beratung",
  keywords:
    "Möbeldesign, maßgefertigte Möbel, Innenarchitektur, handgefertigte Möbel, maßgeschneiderte Möbel, Möbel nach Maß, Innenraumgestaltung, Raumkonzepte, Designberatung, Möbel, Architektur, Inneneinrichtung, Raumgestaltung, Wohnkultur, Design, Einrichtungsideen, kreative Möbel, exklusive Möbel, individuelle Möbel, Designmöbel, Möbelherstellung, Innenarchitekt, Raumplanung, Innenraumkonzepte, Wohnraumgestaltung, kreative Innenräume, Designlösungen, Inneneinrichtungsideen, Möbelgestaltung, Architekturdesign",
  authors: [{ name: "Daniel von Boros" }],
  openGraph: {
    title: "raumideenwerk - Smart Space - Better Living",
    description:
      "Interior Design und Architektur - Raum Konzepte, Möbeldesign, Design, Einrichtung, Beratung",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
