import Image from "next/image";
import type { SiteContent } from "@/content/types";

export function About({ c }: { c: SiteContent["about"] }) {
  return (
    <section
      id="ueber-mich"
      aria-labelledby="ueber-mich-titel"
      className="grid scroll-mt-24 items-start gap-10 px-5 py-16 md:px-14 md:py-[72px] lg:grid-cols-[440px_minmax(0,1fr)] lg:gap-20"
    >
      <div className="grid h-[440px] max-w-[440px] grid-cols-[56px_minmax(0,1fr)] bg-tinte text-leinen md:h-[500px] md:grid-cols-[64px_minmax(0,1fr)]">
        <div className="flex items-end pb-5 pl-4 md:pl-[18px]">
          <span className="spine text-[20px] leading-none font-bold tracking-[-0.02em] md:text-[22px]">
            {c.spine}
          </span>
        </div>
        <div className="relative my-4 mr-4 overflow-hidden md:my-5 md:mr-5">
          <Image
            src={c.portrait.src}
            alt={c.portrait.alt}
            fill
            sizes="(min-width: 768px) 356px, 80vw"
            className="object-cover"
            style={{ objectPosition: c.portrait.position }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2
            id="ueber-mich-titel"
            className="text-[40px] leading-none font-bold tracking-[-0.04em] md:text-[64px]"
          >
            {c.title}
          </h2>
          <p className="text-xl leading-tight tracking-[-0.01em] italic md:text-[28px]">
            {c.subtitle}
          </p>
        </div>
        <p className="max-w-[62ch] text-lg leading-[1.55] md:text-xl">{c.text}</p>
      </div>
    </section>
  );
}
