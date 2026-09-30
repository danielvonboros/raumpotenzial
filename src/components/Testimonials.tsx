import type { SiteContent } from "@/content/types";

export function Testimonials({ c }: { c: SiteContent["testimonials"] }) {
  return (
    <section
      aria-labelledby="stimmen-titel"
      className="bg-petrol px-5 py-16 text-leinen md:px-14 md:py-[72px]"
    >
      <h2
        id="stimmen-titel"
        className="text-[40px] leading-none font-bold tracking-[-0.04em] md:text-[64px]"
      >
        {c.title}
      </h2>
      <div className="mt-10 grid items-start gap-10 md:mt-11 md:grid-cols-3">
        {c.items.map((item) => (
          <figure key={item.author} className="flex flex-col gap-[18px]">
            <span aria-hidden="true" className="text-[72px] leading-[0.6] font-bold text-gelb">
              „
            </span>
            <blockquote className="text-lg leading-[1.5]">{item.text}</blockquote>
            <figcaption className="text-lg font-bold">{item.author}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
