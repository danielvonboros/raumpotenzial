interface SectionHeaderProps {
  id: string;
  title: string;
  subtitle?: string;
}

/** h2 plus kursive Unterzeile auf einer Grundlinie, bricht auf dem Handy um */
export function SectionHeader({ id, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-7 gap-y-2">
      <h2
        id={id}
        className="text-[40px] leading-none font-bold tracking-[-0.04em] md:text-[64px]"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl tracking-[-0.01em] italic md:text-[28px]">{subtitle}</p>
      )}
    </div>
  );
}
