import type { Metadata } from "next";
import { de } from "@/content/de";
import { translations } from "@/content/legal";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Impressum",
  alternates: { canonical: "/impressum" },
};

// Rechtstexte bleiben in translations.ts, damit es nur eine Quelle gibt
const imprint = translations.de.imprint.content;

const headingClass =
  "text-2xl leading-tight font-bold tracking-[-0.03em] md:text-[28px]";
const textClass = "mt-3 text-lg leading-[1.6]";

export default function ImpressumPage() {
  return (
    <>
      <Header nav={de.nav} cta={de.headerCta} menu={de.menu} />

      <main id="inhalt" className="px-5 py-16 md:px-14 md:py-[72px]">
        <div className="flex max-w-[68ch] flex-col gap-12">
          <h1 className="text-[40px] leading-none font-bold tracking-[-0.04em] md:text-[64px]">
            impressum
          </h1>

          <section>
            <h2 className={headingClass}>{imprint.responsible}</h2>
            <address className={`${textClass} not-italic`}>
              {imprint.name}
              <br />
              {imprint.address}
              <br />
              Telefon:{" "}
              <a
                href="tel:+491604958148"
                className="underline underline-offset-4"
              >
                +49 160 495 81 48
              </a>
              <br />
              E-Mail:{" "}
              <a
                href="mailto:hallo@raumideenwerk.com"
                className="underline underline-offset-4"
              >
                hallo@raumideenwerk.com
              </a>
              <br />
              {imprint.vat}
            </address>
          </section>

          <section id="datenschutz" className="scroll-mt-24">
            <h2 className={headingClass}>{imprint.processingData}</h2>
            <p className={textClass}>{imprint.processingDataText}</p>
          </section>

          <section>
            <h2 className={headingClass}>{imprint.disclaimer}</h2>
            <p className={textClass}>{imprint.disclaimerText}</p>
          </section>

          <section>
            <h2 className={headingClass}>{imprint.liabilityHeader}</h2>
            <p className={textClass}>{imprint.liabilityText}</p>
          </section>

          <section>
            <h2 className={headingClass}>{imprint.linksHeader}</h2>
            <p className={textClass}>{imprint.linksText}</p>
          </section>
        </div>
      </main>

      <Footer c={de.footer} />
    </>
  );
}
