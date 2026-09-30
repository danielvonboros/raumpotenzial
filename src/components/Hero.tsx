import Image from "next/image";
import Link from "next/link";
import type { SiteContent } from "@/content/types";

export function Hero({ c }: { c: SiteContent["hero"] }) {
  return (
    <section
      id="start"
      className="grid grid-cols-[64px_minmax(0,1fr)] grid-rows-[minmax(220px,34svh)_auto_minmax(150px,22svh)] bg-gelb text-tinte md:grid-cols-[200px_minmax(0,1fr)] md:grid-rows-[320px_auto_200px]"
    >
      {/* Buchrücken über die volle Höhe */}
      <div className="row-span-3 flex items-end gap-1 pb-6 pl-3 md:pb-10 md:pl-10">
        <span className="spine text-[34px] leading-none font-bold tracking-[-0.035em] md:text-[56px]">
          {c.spine[0]}
        </span>
        <span className="spine text-[34px] leading-none tracking-[-0.02em] italic md:text-[56px]">
          {c.spine[1]}
        </span>
      </div>

      <div className="relative overflow-hidden">
        <Image
          src={c.imageTop.src}
          alt={c.imageTop.alt}
          fill
          priority
          sizes="(min-width: 768px) calc(100vw - 200px), calc(100vw - 64px)"
          className="object-cover"
          style={{ objectPosition: c.imageTop.position }}
        />
      </div>

      <div className="flex flex-col justify-center gap-6 px-5 py-10 md:gap-7 md:py-14 md:pr-14 md:pl-11">
        {/* h1 trägt Claim und Suchbegriffe zugleich */}
        <h1 className="flex flex-col gap-3 font-normal">
          <span className="text-[44px] leading-[0.92] font-bold tracking-[-0.045em] sm:text-[64px] lg:text-[96px]">
            {c.claim}
          </span>
          <span className="text-xl leading-tight tracking-[-0.015em] italic md:text-[30px]">
            {c.keywords}
          </span>
        </h1>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <Link
            href={c.primaryCta.href}
            className="bg-tinte px-6 py-4 text-lg font-semibold text-leinen hover:bg-petrol"
          >
            {c.primaryCta.label}
          </Link>
          <Link
            href={c.secondaryCta.href}
            className="text-lg font-semibold underline decoration-2 underline-offset-[5px] hover:text-petrol"
          >
            {c.secondaryCta.label}
          </Link>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <Image
          src={c.imageBottom.src}
          alt={c.imageBottom.alt}
          fill
          sizes="(min-width: 768px) calc(100vw - 200px), calc(100vw - 64px)"
          className="object-cover"
          style={{ objectPosition: c.imageBottom.position }}
        />
      </div>
    </section>
  );
}
