import Link from "next/link";
import type { SiteContent } from "@/content/types";
import { SectionHeader } from "./SectionHeader";
import { frameButtonClasses, frameClasses } from "./frames";

export function Packages({ c }: { c: SiteContent["packages"] }) {
  return (
    <section
      id="pakete"
      aria-labelledby="pakete-titel"
      className="scroll-mt-24 px-5 py-16 md:px-14 md:py-[72px]"
    >
      <SectionHeader id="pakete-titel" title={c.title} subtitle={c.subtitle} />

      <div className="mt-10 grid gap-6 md:mt-11 lg:grid-cols-3">
        {c.items.map((item) => (
          <article key={item.name} className={`flex flex-col ${frameClasses[item.color]}`}>
            <div className="flex flex-col gap-1.5 px-7 pt-7 pb-6">
              <div className="flex items-center justify-between gap-3">
                <p className="text-lg leading-tight italic">{item.kind}</p>
                {item.popular && (
                  <span className="bg-tinte px-2.5 pt-[5px] pb-[7px] text-sm leading-none font-semibold text-leinen">
                    {c.popularLabel}
                  </span>
                )}
              </div>
              <h3 className="text-[32px] leading-none font-bold tracking-[-0.035em] md:text-4xl">
                {item.name}
              </h3>
              <p className="mt-3.5 text-[52px] leading-none font-bold tracking-[-0.045em]">
                {item.price}
              </p>
              <p className="text-base leading-snug">{item.surcharge}</p>
            </div>

            <div className="mx-5 flex grow flex-col gap-[18px] bg-leinen p-6 text-tinte">
              <p className="text-[17px] leading-[1.45]">{item.description}</p>
              <ul className="flex flex-col gap-2 text-base leading-[1.35]">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-[7px] size-2 shrink-0 bg-tinte" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {item.addOns && (
                <div className="flex flex-col gap-1.5 text-base leading-[1.35]">
                  <p className="italic">{c.addOnsLabel}</p>
                  {item.addOns.map((addOn) => (
                    <p key={addOn.name}>
                      {addOn.name}, {addOn.price}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className="p-5">
              <Link
                href="/#kontakt"
                className={`block px-5 py-4 text-center text-lg font-semibold ${frameButtonClasses[item.color]}`}
              >
                {item.cta}
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-11 flex max-w-[900px] flex-col gap-1.5">
        {c.notes.map((note) => (
          <p key={note} className="text-[17px] leading-[1.5] text-schiefer">
            {note}
          </p>
        ))}
      </div>
    </section>
  );
}
