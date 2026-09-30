/**
 * Platz für deine eigene Leistungs- und SEO-Komponente.
 *
 * Tipps für den Aufbau:
 * - eine h2, darunter pro Leistungskategorie eine h3 mit 2–3 Sätzen
 *   (was, für wen, wo in Berlin)
 * - echter Text im HTML, nichts ausklappen oder per JavaScript nachladen
 * - wo passend auf die Projektseiten unter /projekte/… verlinken
 *
 * Solange hier nur das Gerüst steht, rendert die Komponente im Produktions-Build
 * nichts, damit auf der Live-Seite kein Platzhalter erscheint.
 */
export function SeoServices() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <section aria-label="Platzhalter: Leistungsübersicht" className="px-5 py-16 md:px-14 md:py-[72px]">
      <div className="flex flex-col gap-7 border-2 border-dashed border-tinte p-6 md:p-10">
        <h2 className="text-3xl leading-none font-bold tracking-[-0.035em] md:text-[44px]">
          [überschrift deiner leistungsübersicht]
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((slot) => (
            <div key={slot} className="flex flex-col gap-2.5">
              <h3 className="text-2xl leading-tight font-bold tracking-[-0.02em]">
                [leistungskategorie]
              </h3>
              <p className="text-lg leading-[1.5] text-schiefer">
                [zwei bis drei sätze: was, für wen, wo in berlin]
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
