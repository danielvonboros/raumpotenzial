import { Fragment } from "react";
import type { SiteContent } from "@/content/types";
import { ContactIsland } from "./ContactIsland";

export function ContactSection({ c }: { c: SiteContent["contact"] }) {
  return (
    <section
      id="kontakt"
      aria-labelledby="kontakt-titel"
      className="scroll-mt-24 px-5 py-16 md:px-14 md:py-[72px]"
    >
      <div className="grid bg-gelb text-tinte lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)]">
        <div className="flex flex-col justify-between gap-10 p-7 md:p-12">
          <div className="flex flex-col gap-4">
            <h2
              id="kontakt-titel"
              className="text-[40px] leading-none font-bold tracking-[-0.04em] md:text-[64px]"
            >
              {c.title}
            </h2>
            <p className="text-xl leading-tight tracking-[-0.01em] italic md:text-[28px]">
              {c.subtitle}
            </p>
          </div>
          <dl className="grid grid-cols-[96px_minmax(0,1fr)] gap-x-4 gap-y-2.5 text-lg leading-[1.4]">
            {c.details.map((detail) => (
              <Fragment key={detail.label}>
                <dt className="italic">{detail.label}</dt>
                <dd className="break-words">
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className="underline decoration-1 underline-offset-4 hover:text-petrol"
                      {...(detail.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {detail.value}
                    </a>
                  ) : (
                    detail.value
                  )}
                </dd>
              </Fragment>
            ))}
          </dl>
        </div>

        {/* Fenster im Rahmen */}
        <div className="mx-4 mb-4 bg-leinen p-6 md:mx-6 md:mb-6 md:p-9 lg:mt-6 lg:ml-0">
          <ContactIsland c={c.form} />
        </div>
      </div>
    </section>
  );
}
