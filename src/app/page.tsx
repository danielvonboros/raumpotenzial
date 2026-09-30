import type { Metadata } from "next";
import { de } from "@/content/de";
import { About } from "@/components/About";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Packages } from "@/components/Packages";
import { PainPoints } from "@/components/PainPoints";
import { Process } from "@/components/Process";
import { ProjectCatalog } from "@/components/ProjectCatalog";
import { ProjectCover, ProjectCtaCard } from "@/components/ProjectCover";
import { SeoServices } from "@/components/SeoServices";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Startseite, serverseitig gerendert: Alle Texte stehen im ausgelieferten HTML.
 * Nur Kopfzeile (Handy-Menü), Katalog-Pfeile und Kontaktformular laufen im Browser.
 */
export default function Home() {
  const c = de;

  return (
    <>
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-tinte focus:px-4 focus:py-3 focus:text-leinen"
      >
        {c.skipLink}
      </a>
      <Header nav={c.nav} cta={c.headerCta} menu={c.menu} />

      <main id="inhalt">
        <Hero c={c.hero} />

        <ProjectCatalog
          title={c.projects.title}
          subtitle={c.projects.subtitle}
          prevLabel={c.projects.prevLabel}
          nextLabel={c.projects.nextLabel}
        >
          {c.projects.items.map((project) => (
            <ProjectCover key={project.slug} project={project} />
          ))}
          <ProjectCtaCard {...c.projects.ctaCard} />
        </ProjectCatalog>

        <Services c={c.services} />
        <PainPoints c={c.painPoints} />
        <Process c={c.process} />
        <Packages c={c.packages} />
        <About c={c.about} />
        <Testimonials c={c.testimonials} />

        {/* Deine SEO-Komponente: zwischen Projekten und Kontakt, hier direkt davor */}
        <SeoServices />

        <ContactSection c={c.contact} />
      </main>

      <Footer c={c.footer} />
    </>
  );
}
