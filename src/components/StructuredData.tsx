// src/components/StructuredData.jsx

export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",

    "@graph": [
      // ─────────────────────────────────────────────────────────────
      // 1. LOCAL BUSINESS
      // ─────────────────────────────────────────────────────────────
      {
        "@type": "LocalBusiness",
        "@id": "https://www.raumideenwerk.com/#business",

        name: "raumideenwerk",
        legalName: "raumideenwerk - Daniel von Boros",

        url: "https://www.raumideenwerk.com",

        logo: {
          "@type": "ImageObject",
          url: "https://www.raumideenwerk.com/logo.svg",
        },

        image: {
          "@type": "ImageObject",
          url: "https://www.raumideenwerk.com/website.webp",
          width: 1200,
          height: 630,
        },

        description:
          "Innenarchitektur und Raumplanung für kleine Wohnungen in Berlin. Spezialisiert auf intelligente Raumkonzepte, Zonierung, Stauraumlösungen und individuelle Möbelplanung.",

        telephone: "+491604958148",
        email: "hallo@raumideenwerk.com",

        address: {
          "@type": "PostalAddress",
          streetAddress: "Kolonnenstraße 8",
          postalCode: "10827",
          addressLocality: "Berlin",
          addressCountry: "DE",
        },

        geo: {
          "@type": "GeoCoordinates",
          latitude: 52.48627243666373,
          longitude: 13.35993720266727,
        },

        areaServed: {
          "@type": "City",
          name: "Berlin",
        },

        priceRange: "€€",
        currenciesAccepted: "EUR",

        founder: {
          "@id": "https://www.raumideenwerk.com/#person",
        },

        sameAs: ["https://www.instagram.com/raum.ideen.werk.berlin"],

        hasOfferCatalog: {
          "@id": "https://www.raumideenwerk.com/#services",
        },
      },

      // ─────────────────────────────────────────────────────────────
      // 2. PERSON
      // ─────────────────────────────────────────────────────────────
      {
        "@type": "Person",
        "@id": "https://www.raumideenwerk.com/#person",

        name: "Daniel von Boros",

        jobTitle: "Architekt & Interior Designer",

        description:
          "Architekt und Gründer von raumideenwerk mit Schwerpunkt auf Raumplanung, Wohnungsoptimierung und individuellen Lösungen für kleine Wohnungen.",

        image: {
          "@type": "ImageObject",
          url: "https://www.raumideenwerk.com/image_daniel.jpeg",
        },

        url: "https://www.raumideenwerk.com",

        worksFor: {
          "@id": "https://www.raumideenwerk.com/#business",
        },

        sameAs: [
          "https://www.linkedin.com/in/danielvonboros",
          "https://www.instagram.com/raum.ideen.werk.berlin",
        ],

        knowsAbout: [
          "Innenarchitektur",
          "Raumplanung",
          "Raumkonzepte",
          "Wohnungsoptimierung",
          "kleine Wohnungen",
          "Stauraumplanung",
          "Möbelplanung",
          "Grundrissoptimierung",
        ],
      },

      // ─────────────────────────────────────────────────────────────
      // 3. SERVICE CATALOG
      // ─────────────────────────────────────────────────────────────
      {
        "@type": "OfferCatalog",
        "@id": "https://www.raumideenwerk.com/#services",

        name: "Innenarchitektur und Raumplanung",

        itemListElement: [
          {
            "@type": "Offer",

            price: "590",
            priceCurrency: "EUR",

            itemOffered: {
              "@type": "Service",
              "@id": "https://www.raumideenwerk.com/#service-raum-impulse",

              name: "Raum Impulse",

              serviceType: "Online-Raumberatung und Einrichtungsberatung",

              description:
                "Online-Beratung für Räume bis 20 m² mit Designberatung, Stilberatung, Materialvorschlägen und Grundrissoptimierung.",

              provider: {
                "@id": "https://www.raumideenwerk.com/#business",
              },

              areaServed: {
                "@type": "Country",
                name: "Deutschland",
              },
            },
          },

          {
            "@type": "Offer",

            price: "890",
            priceCurrency: "EUR",

            itemOffered: {
              "@type": "Service",
              "@id": "https://www.raumideenwerk.com/#service-raum-konzepte",

              name: "Raum Konzepte",

              serviceType: "Innenarchitektur und Raumplanung",

              description:
                "Raumkonzept mit Stilkonzept, Moodboard, Grundrissplanung, Einrichtungsvorschlägen und Beratung vor Ort in Berlin.",

              provider: {
                "@id": "https://www.raumideenwerk.com/#business",
              },

              areaServed: {
                "@type": "City",
                name: "Berlin",
              },
            },
          },

          {
            "@type": "Offer",

            price: "1490",
            priceCurrency: "EUR",

            itemOffered: {
              "@type": "Service",
              "@id":
                "https://www.raumideenwerk.com/#service-raum-transformation",

              name: "Raum Transformation",

              serviceType: "Innenarchitektur, Raumplanung und Möbelplanung",

              description:
                "Umfassendes Raumkonzept mit individueller Möbelplanung, fotorealistischer 3D-Visualisierung, technischen Zeichnungen und Unterstützung bei der Umsetzung.",

              provider: {
                "@id": "https://www.raumideenwerk.com/#business",
              },

              areaServed: {
                "@type": "City",
                name: "Berlin",
              },
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
