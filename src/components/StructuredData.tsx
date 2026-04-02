// src/components/StructuredData.jsx

export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      // ── 1. LOCAL BUSINESS ──────────────────────────────────────────
      {
        "@type": ["LocalBusiness", "InteriorDesignBusiness"],
        "@id": "https://www.raumideenwerk.com/",
        name: "raumideenwerk",
        legalName: "raumideenwerk - Daniel von Boros",
        url: "https://www.raumideenwerk.com",
        logo: "https://www.raumideenwerk.com/_next/static/media/LogoLightWide.3f64a38c.svg",
        image: "https://www.raumideenwerk.com/room/sample_room_1_after2.webp",
        description:
          "Einrichtungsberatung und Innenarchitektur für kleine Wohnungen in Berlin. Spezialisiert auf Kinderzimmer, Mikroapartments und schlecht geschnittene Grundrisse.",
        telephone: "+49160495 8148",
        email: "hallo@raumideenwerk.com",
        vatID: "DE456695805",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Kolonnenstraße 8",
          postalCode: "10827",
          addressLocality: "Berlin",
          addressCountry: "DE",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "52.48627243666373",
          longitude: "13.35993720266727",
        },
        areaServed: { "@type": "City", name: "Berlin" },
        priceRange: "€€",
        currenciesAccepted: "EUR",
        founder: { "@id": "https://www.raumideenwerk.com/" },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          reviewCount: "3",
          bestRating: "5",
        },
      },

      // ── 2. PERSON ──────────────────────────────────────────────────
      {
        "@type": "Person",
        "@id": "https://www.raumideenwerk.com/",
        name: "Daniel von Boros",
        jobTitle: "Architekt & Innenarchitekt",
        description:
          "Architekt mit über 5 Jahren Erfahrung im Umbau kleiner Wohnräume in Berlin.",
        image: "https://www.raumideenwerk.com/image_daniel.jpeg",
        url: "https://www.raumideenwerk.com",
        worksFor: { "@id": "https://www.raumideenwerk.com/" },
        sameAs: [
          "https://www.linkedin.com/in/danielvonboros",
          "https://www.instagram.com/raum.ideen.werk.berlin",
        ],
      },

      // ── 3. SERVICES (one per package) ──────────────────────────────
      {
        "@type": "Service",
        name: "Raum Impulse",
        serviceType: "Einrichtungsberatung",
        description:
          "Online-Beratungspaket für Räume bis 20m². Inkl. Designberatung, Stilberatung, Materialvorschläge und Grundriss.",
        url: "https://www.raumideenwerk.com/",
        provider: { "@id": "https://www.raumideenwerk.com/" },
        areaServed: { "@type": "City", name: "Berlin" },
        offers: {
          "@type": "Offer",
          price: "490",
          priceCurrency: "EUR",
        },
      },
      {
        "@type": "Service",
        name: "Raum Konzepte",
        serviceType: "Einrichtungsberatung",
        description:
          "Profi-Paket für Räume 15–20m². Inkl. Stilkonzept, Raumkonzept, Moodboard, Shoppingliste und Beratung vor Ort in Berlin.",
        url: "https://www.raumideenwerk.com/",
        provider: { "@id": "https://www.raumideenwerk.com/" },
        areaServed: { "@type": "City", name: "Berlin" },
        offers: {
          "@type": "Offer",
          price: "790",
          priceCurrency: "EUR",
        },
      },
      {
        "@type": "Service",
        name: "Raum Transformation",
        serviceType: "Einrichtungsberatung",
        description:
          "Komplettlösung für Räume bis 20m². Inkl. Möbelplanung, fotorealistischer 3D-Visualisierung, technischen Zeichnungen und Tischlervermittlung.",
        url: "https://www.raumideenwerk.com/",
        provider: { "@id": "https://www.raumideenwerk.com/" },
        areaServed: { "@type": "City", name: "Berlin" },
        offers: {
          "@type": "Offer",
          price: "1290",
          priceCurrency: "EUR",
        },
      },

      // ── 4. REVIEWS ─────────────────────────────────────────────────
      {
        "@type": "Review",
        itemReviewed: { "@id": "https://www.raumideenwerk.com/" },
        author: { "@type": "Person", name: "Lisa V." },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody:
          "Die neue Aufteilung wirkt viel offener und einladender. Man schaut nicht mehr direkt auf die Rückseite der Couch, wenn man die Wohnung betritt.",
      },
      {
        "@type": "Review",
        itemReviewed: { "@id": "https://www.raumideenwerk.com/" },
        author: { "@type": "Person", name: "Nadia P." },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody:
          "Ich bin sehr glücklich mit der neuen Lösung — zusätzlicher Stauraum und eine durchdachte Erhöhung für Bildschirm und Lautsprecher.",
      },
      {
        "@type": "Review",
        itemReviewed: { "@id": "https://www.raumideenwerk.com/" },
        author: { "@type": "Person", name: "Christina K." },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody:
          "Daniel hat viele sowohl optisch ansprechende als auch technisch ausgeklügelte Ideen gefunden. Ich kann die Beratung nur empfehlen.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
