import type { SiteContent } from "@/content/types";
import { SectionHeader } from "./SectionHeader";

/** Maßkettenende: senkrechter Strich plus 45°-Schrägstrich */
function Tick({ side }: { side: "start" | "end" }) {
  const position =
    side === "start" ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2";
  return (
    <svg
      viewBox="0 0 16 24"
      width="16"
      height="24"
      aria-hidden="true"
      className={`absolute top-1/2 -translate-y-1/2 ${position}`}
    >
      <line x1="8" y1="0" x2="8" y2="24" stroke="currentColor" strokeWidth="2" />
      <line x1="0" y1="20" x2="16" y2="4" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

/**
 * Jeder Schritt hat sein eigenes Kettenstück. Auf dem Desktop stoßen die vier
 * Stücke ohne Abstand aneinander und lesen sich als eine durchgehende Maßkette,
 * auf dem Handy stehen sie untereinander.
 */
export function Process({ c }: { c: SiteContent["process"] }) {
  return (
    <section
      id="ablauf"
      aria-labelledby="ablauf-titel"
      className="scroll-mt-24 px-5 py-16 md:px-14 md:py-[72px]"
    >
      <SectionHeader id="ablauf-titel" title={c.title} subtitle={c.subtitle} />

      <ol className="mt-10 grid gap-12 px-2 md:mt-11 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {c.steps.map((step, index) => (
          <li key={step.title} className="flex flex-col">
            <span
              aria-hidden="true"
              className="text-center text-2xl font-bold tabular-nums md:text-[26px]"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div aria-hidden="true" className="relative mt-2 h-6 text-tinte">
              <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-tinte" />
              <Tick side="start" />
              <Tick side="end" />
            </div>
            <h3 className="mt-6 pr-8 pl-3 text-[28px] leading-none font-bold tracking-[-0.035em] md:text-[34px]">
              {step.title}
            </h3>
            <p className="mt-3 pr-8 pl-3 text-lg leading-[1.5] text-schiefer md:text-[19px]">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
