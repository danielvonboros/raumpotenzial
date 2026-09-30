import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";
import { frameClasses } from "./frames";

const cardSize =
  "aspect-[3/4] w-[78vw] max-w-[420px] shrink-0 snap-start sm:w-[420px]";

const imageSizes = "(min-width: 640px) 356px, 70vw";

export function ProjectCover({ project }: { project: Project }) {
  return (
    <Link
      href={`/projekte/${project.slug}`}
      className={`grid grid-cols-[52px_minmax(0,1fr)] grid-rows-[1.2fr_auto_1fr] md:grid-cols-[64px_minmax(0,1fr)] ${cardSize} ${frameClasses[project.color]}`}
    >
      {/* Buchrücken: Katalognummer oben, Jahr unten */}
      <div className="row-span-3 flex flex-col justify-between py-4 pl-3 md:pl-4">
        <span className="text-[28px] leading-none font-bold tracking-[-0.04em] md:text-[34px]">
          {project.number}
        </span>
        <span className="spine text-[15px] italic">{project.year}</span>
      </div>

      <div className="relative overflow-hidden">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes={imageSizes}
          className="object-cover"
          style={{ objectPosition: project.cover.position }}
        />
      </div>

      <div className="flex flex-col gap-1.5 px-4 pt-4 pb-4 md:pl-3.5">
        <h3 className="text-[22px] leading-none font-bold tracking-[-0.035em] md:text-[26px]">
          {project.title}
        </h3>
        <p className="text-[15px] leading-snug italic md:text-[17px]">{project.subtitle}</p>
      </div>

      <div className="relative overflow-hidden">
        <Image
          src={project.detail.src}
          alt={project.detail.alt}
          fill
          sizes={imageSizes}
          className="object-cover"
          style={{ objectPosition: project.detail.position }}
        />
      </div>
    </Link>
  );
}

interface ProjectCtaCardProps {
  number: string;
  title: string;
  subtitle: string;
  href: string;
}

/** Letzte Karte im Katalog: der nächste Platz ist frei */
export function ProjectCtaCard({ number, title, subtitle, href }: ProjectCtaCardProps) {
  return (
    <Link
      href={href}
      className={`grid grid-cols-[50px_minmax(0,1fr)] grid-rows-[1.2fr_auto_1fr] border-2 border-tinte bg-leinen text-tinte md:grid-cols-[62px_minmax(0,1fr)] ${cardSize}`}
    >
      <div className="row-span-3 py-3.5 pl-3 md:pl-3.5">
        <span className="text-[28px] leading-none font-bold tracking-[-0.04em] md:text-[34px]">
          {number}
        </span>
      </div>
      <div className="mt-3.5 mr-3.5 border-2 border-dashed border-tinte" />
      <div className="flex flex-col gap-1.5 px-4 pt-4 pb-4 md:pl-3.5">
        <h3 className="text-[22px] leading-none font-bold tracking-[-0.035em] md:text-[26px]">
          {title}
        </h3>
        <p className="text-[15px] leading-snug italic underline underline-offset-4 md:text-[17px]">
          {subtitle}
        </p>
      </div>
      <div className="mr-3.5 mb-3.5 border-2 border-dashed border-tinte" />
    </Link>
  );
}
