import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { de } from "@/content/de";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { frameClasses } from "@/components/frames";

const content = de;
const projects = content.projects.items;

// Nur die bekannten Projekte, alles andere ergibt 404
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: project.metaTitle,
    description: project.description,
    alternates: { canonical: `/projekte/${project.slug}` },
    openGraph: {
      title: `${project.metaTitle} | raumideenwerk`,
      description: project.description,
      url: `/projekte/${project.slug}`,
      type: "article",
      locale: "de_DE",
      images: [{ url: project.cover.src, alt: project.cover.alt }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const t = content.projectPage;

  return (
    <>
      <Header nav={content.nav} cta={content.headerCta} menu={content.menu} />

      <main id="inhalt">
        {/* Das Cover aus dem Katalog, groß */}
        <section
          className={`grid grid-cols-[64px_minmax(0,1fr)] md:grid-cols-[180px_minmax(0,1fr)] ${frameClasses[project.color]}`}
        >
          <div className="row-span-3 flex flex-col justify-between py-6 pl-4 md:py-10 md:pl-10">
            <span className="text-[56px] leading-[0.8] font-bold tracking-[-0.06em] md:text-[110px]">
              {project.number}
            </span>
            <span className="spine text-lg italic md:text-2xl">
              {project.year}
            </span>
          </div>

          <div className="relative aspect-[3/2] overflow-hidden md:aspect-[16/7]">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              priority
              sizes="(min-width: 768px) calc(100vw - 180px), calc(100vw - 64px)"
              className="object-cover"
              style={{ objectPosition: project.cover.position }}
            />
          </div>

          <div className="flex flex-col gap-3 px-5 py-8 md:px-10 md:py-12">
            <h1 className="text-[40px] leading-[0.95] font-bold tracking-[-0.045em] md:text-[72px]">
              {project.title}
            </h1>
            <p className="text-xl leading-tight tracking-[-0.015em] italic md:text-[32px]">
              {project.subtitle}
            </p>
          </div>

          <div className="relative aspect-[3/2] overflow-hidden md:aspect-[16/6]">
            <Image
              src={project.detail.src}
              alt={project.detail.alt}
              fill
              sizes="(min-width: 768px) calc(100vw - 180px), calc(100vw - 64px)"
              className="object-cover"
              style={{ objectPosition: project.detail.position }}
            />
          </div>
        </section>

        <section className="grid gap-12 px-5 py-16 md:px-14 md:py-[72px] lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-20">
          <div className="flex max-w-[68ch] flex-col gap-10">
            <Link
              href="/#projekte"
              className="w-fit text-base font-semibold underline underline-offset-4 hover:text-petrol"
            >
              {t.back}
            </Link>
            {project.goal && (
              <div>
                <h2 className="text-[28px] leading-none font-bold tracking-[-0.035em] md:text-4xl">
                  {t.goal}
                </h2>
                <p className="mt-3 text-xl leading-snug italic md:text-2xl">
                  {project.goal}
                </p>
              </div>
            )}
            <div>
              <h2 className="text-[28px] leading-none font-bold tracking-[-0.035em] md:text-4xl">
                {t.story}
              </h2>
              <p className="mt-3 text-lg leading-[1.55] md:text-xl">
                {project.story}
              </p>
            </div>
          </div>

          <dl className="grid h-fit grid-cols-[130px_minmax(0,1fr)] gap-x-4 gap-y-3 border-t-2 border-tinte pt-5 text-lg leading-snug">
            <dt className="italic">{t.materials}</dt>
            <dd>{project.materials}</dd>
            <dt className="italic">{t.dimensions}</dt>
            <dd>{project.dimensions}</dd>
            <dt className="italic">{t.year}</dt>
            <dd>{project.year}</dd>
          </dl>
        </section>

        <section
          aria-labelledby="bilder-titel"
          className="px-5 pb-16 md:px-14 md:pb-[72px]"
        >
          <h2
            id="bilder-titel"
            className="text-[32px] leading-none font-bold tracking-[-0.04em] md:text-[44px]"
          >
            {t.gallery}
          </h2>
          {/* Bilder im eigenen Seitenverhältnis, zweispaltig gestapelt */}
          <div className="mt-8 columns-1 gap-6 sm:columns-2">
            {project.gallery.map((image) => (
              <Image
                key={image.src}
                src={image.src}
                alt={image.alt}
                width={0}
                height={0}
                sizes="(min-width: 640px) 50vw, 100vw"
                className="mb-6 h-auto w-full break-inside-avoid"
              />
            ))}
          </div>
        </section>

        <section className="px-5 pb-16 md:px-14 md:pb-[72px]">
          <div className="flex flex-col items-start gap-6 bg-gelb p-7 text-tinte md:p-12">
            <h2 className="text-[32px] leading-[0.95] font-bold tracking-[-0.045em] md:text-[56px]">
              {t.ctaTitle}
            </h2>
            <p className="max-w-[56ch] text-lg leading-snug md:text-xl">
              {t.ctaText}
            </p>
            <Link
              href={t.ctaButton.href}
              className="bg-tinte px-6 py-4 text-lg font-semibold text-leinen hover:bg-petrol"
            >
              {t.ctaButton.label}
            </Link>
          </div>
        </section>

        <nav
          aria-label="Weitere Projekte"
          className="grid gap-6 px-5 pb-16 sm:grid-cols-2 md:px-14 md:pb-[72px]"
        >
          <Link
            href={`/projekte/${previous.slug}`}
            className="border-2 border-tinte p-5 hover:bg-sand"
          >
            <span className="text-base italic">{t.prev}</span>
            <span className="mt-1 block text-2xl leading-tight font-bold tracking-[-0.03em]">
              {previous.number} {previous.title}
            </span>
          </Link>
          <Link
            href={`/projekte/${next.slug}`}
            className="border-2 border-tinte p-5 hover:bg-sand sm:text-right"
          >
            <span className="text-base italic">{t.next}</span>
            <span className="mt-1 block text-2xl leading-tight font-bold tracking-[-0.03em]">
              {next.number} {next.title}
            </span>
          </Link>
        </nav>
      </main>

      <Footer c={content.footer} />
    </>
  );
}
