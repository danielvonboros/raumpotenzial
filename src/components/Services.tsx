import type { SiteContent } from "@/content/types";
import { SectionHeader } from "./SectionHeader";

export function Services({ c }: { c: SiteContent["services"] }) {
  return (
    <section
      id="leistungen"
      aria-labelledby="leistungen-titel"
      className="scroll-mt-24 px-5 py-16 md:px-14 md:py-[72px]"
    >
      <SectionHeader id="leistungen-titel" title={c.title} subtitle={c.subtitle} />

      <div className="mt-10 grid gap-6 md:mt-11 lg:grid-cols-2">
        {c.items.map((item, index) => (
          <article
            key={item.title}
            className="grid min-h-[400px] grid-cols-[72px_minmax(0,1fr)] grid-rows-[auto_1fr] bg-gelb text-tinte md:grid-cols-[112px_minmax(0,1fr)] lg:min-h-[460px]"
          >
            {/* Nummer als Buchrücken statt „raumideenwerk" */}
            <div className="row-span-2 flex items-end pb-5 pl-4 md:pb-[26px] md:pl-[26px]">
              <span
                aria-hidden="true"
                className="spine text-[64px] leading-[0.8] font-bold tracking-[-0.05em] md:text-[92px]"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Headline im gelben Rahmen */}
            <div className="flex min-h-[150px] flex-col justify-end pt-8 pr-6 pb-5 md:min-h-[196px] md:pr-10 md:pb-[22px]">
              <h3 className="text-[32px] leading-[0.95] font-bold tracking-[-0.04em] md:text-[44px]">
                {item.title}
              </h3>
            </div>

            {/* Kursivtext im Fenster, dort wo beim Ideen-Post das Foto sitzt */}
            <div className="mr-4 mb-4 bg-leinen px-6 py-6 md:mr-6 md:mb-6 md:px-8 md:py-7">
              <p className="text-lg leading-[1.4] font-semibold tracking-[-0.01em] italic md:text-[23px]">
                {item.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
