import type { Project, SiteContent } from "./types";

/**
 * Projekte in Katalog-Reihenfolge.
 * Die Nummer ist dieselbe wie auf Instagram (Projekt-Post 03 = Katalog-Karte 03).
 */
const projects: Project[] = [
  {
    slug: "raumtransformation-mit-stauraum",
    number: "01",
    year: "2025",
    color: "gelb",
    title: "raumtransformation mit stauraum",
    subtitle: "einbauelement mit zusätzlicher ebene und einer kleinen kleiderkammer",
    metaTitle: "Raumtransformation mit Stauraum",
    description:
      "Einbauelement mit zusätzlicher Ebene und einer kleinen Kleiderkammer für eine 1-Zimmer-Wohnung.",
    story:
      "Dieses Projekt wurde für eine 1-Zimmer-Wohnung entworfen und verfolgte mehrere Ziele. Eine optisch ansprechende Lösung für die Schlafmöglichkeit zu schaffen, ohne beim Betreten des Zimmers gleich den Blick auf das Bett zu lenken. Zusätzlichen Stauraum zu schaffen, da der Platz in der 1-Zimmer-Wohnung sehr begrenzt war. Mit dieser Lösung wurde das Bett über Kopfhöhe angehoben und bietet dem Bewohner die Möglichkeit, darunter viele Gegenstände und seine Kleidung zu verstauen. Die sichtbare Seite zum Zimmer wurde mit einem großen Regal verkleidet, welches zur Raumgestaltung beiträgt und gleichzeitig Stauraum bietet. Dieses Möbelstück kaschiert die Raumnische und bildet klare Kanten, gleichzeitig löst es alle bislang vorhandenen Probleme.",
    goal: "Eine Lösung für einen Wohn- und Schlafraum auf kleiner Fläche finden.",
    materials: "Buchenholz, Naturöl-Finish",
    dimensions: "Regal: 200 × 200 × 40 cm, zweite Ebene: 240 × 200 cm",
    cover: {
      src: "/room/room1/nische_berliner-zimmer_hochbett_stauraum.webp",
      alt: "Nische in einem Berliner Zimmer mit Hochbett, Regal und Stauraum",
      position: "50% 45%",
    },
    detail: {
      src: "/room/room1/problem_nische_berliner_zimmer.webp",
      alt: "Die Nische im Berliner Zimmer vor dem Umbau",
      position: "50% 55%",
    },
    gallery: [
      {
        src: "/room/room1/problem_nische_berliner_zimmer.webp",
        alt: "Die Nische im Berliner Zimmer vor dem Umbau",
      },
      {
        src: "/room/room1/entwurf_nische_bett.webp",
        alt: "Entwurf für das Hochbett in der Nische",
      },
      {
        src: "/room/room1/nische_berliner-zimmer_hochbett_stauraum.webp",
        alt: "Nische mit Hochbett, Regal und Stauraum nach dem Umbau",
      },
    ],
  },
  {
    slug: "minimalistisches-sideboard",
    number: "02",
    year: "2024",
    color: "tinte",
    title: "minimalistisches sideboard",
    subtitle: "elegante und funktionale aufbewahrung für moderne wohnräume",
    metaTitle: "Minimalistisches Sideboard aus Akazienholz",
    description:
      "Sideboard im Mid-Century-Stil aus Akazienholz mit Hairpin-Stahlfüßen: Stauraum für Bücher, Elektronik und persönliche Dinge.",
    story:
      "Entworfen als Sideboard für das Wohnzimmer. Schlankes Mid-Century-Modern-Design, das Funktionalität und Ästhetik vereint. Das Sideboard bietet großzügigen Stauraum für Bücher, Elektronik und persönliche Gegenstände. Die Kombination aus warmem Akazienholz und Stahlfüßen schafft einen eleganten Kontrast, der sich nahtlos in moderne Wohnräume einfügt. Dieses Möbelstück ist nicht nur funktional, sondern auch ein stilvolles Statement in jedem Raum.",
    goal: "Ein elegantes Möbelstück für einen Wohnbereich schaffen.",
    materials: "Akazienholz Nussbaum, Hairpin-Stahlfüße",
    dimensions: "135 × 40 × 80 cm",
    cover: {
      src: "/furniture/quadra/moebeldesign_akazienholz_sideboard_wide.webp",
      alt: "Sideboard aus Akazienholz mit Hairpin-Stahlfüßen",
    },
    detail: {
      src: "/furniture/quadra/massgeschneiderte_moebel_detail_altbau.webp",
      alt: "Detail des Sideboards im Altbau",
      position: "50% 60%",
    },
    gallery: [
      {
        src: "/furniture/quadra/moebelbau_akazien_sideboard_schrank.webp",
        alt: "Sideboard aus Akazienholz im Wohnzimmer",
      },
      {
        src: "/furniture/quadra/massgeschneiderte_moebel_detail_altbau.webp",
        alt: "Detail der Verarbeitung",
      },
      {
        src: "/furniture/quadra/sideboard_hochwertig_altbau_mid-century.webp",
        alt: "Sideboard im Mid-Century-Stil in einer Altbauwohnung",
      },
    ],
  },
  {
    slug: "raumteiler-und-empore-fuer-bett",
    number: "03",
    year: "2025",
    color: "petrol",
    title: "raumteiler und empore für bett",
    subtitle: "einbaulösung für die zonierung von wohn- und schlafbereich",
    metaTitle: "Raumteiler und Empore für das Bett",
    description:
      "Eine Einbaulösung für die Zonierung eines Wohn- und Schlafzimmers: Raumteiler mit Stauraum und Empore für das Bett.",
    story:
      "Dieses Möbelstück wurde für eine kompakte Wohnung entworfen, in der Wohn- und Schlafbereich klar voneinander getrennt werden sollten. Der Raumteiler bietet nicht nur Sichtschutz, sondern auch zusätzlichen Stauraum. Die integrierte Empore für das Bett schafft eine gemütliche Schlafnische und nutzt den vertikalen Raum optimal aus. Das Design kombiniert Funktionalität mit einem modernen Look, der den Raum zoniert und gleichzeitig eine klare Struktur schafft. Zudem ist unter der neu geschaffenen Ebene ein Raum entstanden, der als Ecke für Homeoffice oder gemütliche Leseecke genutzt werden kann.",
    goal: "Wohn- und Schlafbereich voneinander trennen und elegant in den Raum einbinden.",
    materials: "Fichtenholz, schwarz lackiert",
    dimensions: "Bett: 140 × 200 cm, Regal: 140 × 40 × 200 cm",
    cover: {
      src: "/room/room2/raumteiler_homeoffice_studio_kleine_wohnung_raumkonzept.webp",
      alt: "Raumteiler mit Homeoffice-Ecke unter der Empore",
      position: "50% 40%",
    },
    detail: {
      src: "/room/room2/wgzimmer_entwurf_altbauwohnung_raumkonzept.webp",
      alt: "Entwurf des Raumkonzepts für das Zimmer",
      position: "50% 50%",
    },
    gallery: [
      {
        src: "/room/room2/wgzimmer_berlin_kleiderschrank.webp",
        alt: "Das Zimmer vor dem Umbau",
      },
      {
        src: "/room/room2/wgzimmer_entwurf_altbauwohnung_raumkonzept.webp",
        alt: "Entwurf des Raumkonzepts",
      },
      {
        src: "/room/room2/raumteiler_homeoffice_studio_kleine_wohnung_raumkonzept.webp",
        alt: "Raumteiler mit Empore und Homeoffice-Ecke nach dem Umbau",
      },
    ],
  },
  {
    slug: "hochbett-kleiderschrank-wohnwand",
    number: "04",
    year: "2025",
    color: "gelb",
    title: "einbaumöbel für kleine apartments",
    subtitle: "begehbarer kleiderschrank, wohnwand und hochbett in einem",
    metaTitle: "Hochbett mit begehbarem Kleiderschrank und Wohnwand",
    description:
      "Eine multifunktionale Einbaulösung für einen kombinierten Wohn- und Schlafbereich: Hochbett, begehbarer Kleiderschrank und Wohnwand.",
    story:
      "Dieses Möbelstück wurde für eine kompakte Wohnung entworfen, in der zusätzlicher Stauraum unterhalb des Hochbetts entstehen sollte. Das Design kombiniert Funktionalität mit einem modernen Look, der den Raum zoniert und gleichzeitig eine klare Struktur schafft. Unter der neu geschaffenen Ebene ist ein Raum entstanden, der sowohl als begehbarer Kleiderschrank als auch als Wohnwand funktioniert. Dadurch wird der Raum strukturiert und wirkt deutlich aufgeräumter als zuvor.",
    materials: "Melaminharzbeschichtetes Sperrholz",
    dimensions: "Bett: 160 × 200 cm, Höhe: 200 cm",
    cover: {
      src: "/room/room4/einbauschrank_stauraum_bettschrank_kleine_wohnung_berlin.webp",
      alt: "Einbauschrank mit Stauraum und Hochbett in einer kleinen Wohnung in Berlin",
    },
    detail: {
      src: "/room/room4/zimmer_unordnung_schraenke_stauraum.webp",
      alt: "Das Zimmer vor dem Umbau mit einzelnen Schränken",
    },
    gallery: [
      {
        src: "/room/room4/zimmer_unordnung_schraenke_stauraum.webp",
        alt: "Das Zimmer vor dem Umbau mit einzelnen Schränken",
      },
      {
        src: "/room/room4/studio_designloesung_raumbildend_einbauschrank.webp",
        alt: "Entwurf für den raumbildenden Einbauschrank",
      },
      {
        src: "/room/room4/einbauschrank_stauraum_bettschrank_kleine_wohnung_berlin.webp",
        alt: "Einbauschrank mit Hochbett nach dem Umbau",
      },
    ],
  },
  {
    slug: "neue-nutzung-fuer-10-qm-zimmer",
    number: "05",
    year: "2026",
    color: "tinte",
    title: "neue nutzung für 10 m²",
    subtitle: "arbeitszimmer, gästezimmer und stauraum in einem raum",
    metaTitle: "Neue Nutzung für ein 10-m²-Zimmer",
    description:
      "Raumkonzept für ein 10 m² kleines Zimmer, das jetzt als Arbeitszimmer, Gästezimmer und Stauraum funktioniert.",
    story:
      "Obwohl der Raum nur 10 m² groß ist, wurde er so umgestaltet, dass er als Arbeitszimmer, Gästezimmer und Stauraum genutzt werden kann. Durch die clevere Anordnung der Möbel und die Nutzung des vertikalen Raums oberhalb der Tür konnte eine funktionale Lösung geschaffen werden. Sie wird den Bedürfnissen der Bewohner gerecht, schafft Platz zum Arbeiten, für Gäste, zum Lesen und für die Aufbewahrung und entlastet so die anderen Zimmer der Wohnung.",
    goal: "Stauraum schaffen, Zonen erstellen und den Raum für mehrere Zwecke nutzbar machen.",
    materials: "Individuelle Holzplatte als Schreibtisch, Regal und Stauraum aus dem Möbelhaus",
    dimensions: "Schreibtisch: ca. 170 × 65 cm",
    cover: {
      src: "/room/room13/kleines_arbeitszimmer_nachher_1.webp",
      alt: "Kleines Arbeitszimmer mit Schreibtisch und Stauraum nach dem Umbau",
    },
    detail: {
      src: "/room/room13/kleines_arbeitszimmer_vorher_1.webp",
      alt: "Das Zimmer vor dem Umbau",
    },
    gallery: [
      {
        src: "/room/room13/kleines_arbeitszimmer_vorher_1.webp",
        alt: "Arbeitsbereich vor dem Umbau",
      },
      {
        src: "/room/room13/kleines_arbeitszimmer_nachher_1.webp",
        alt: "Arbeitsbereich nach dem Umbau",
      },
      {
        src: "/room/room13/gaestezimmer_stauraum_vorher_2.webp",
        alt: "Gäste- und Stauraumbereich vor dem Umbau",
      },
      {
        src: "/room/room13/gaestezimmer_stauraum_nachher_2.webp",
        alt: "Gäste- und Stauraumbereich nach dem Umbau",
      },
    ],
  },
  {
    slug: "podestbett-fuer-kleine-wohnungen",
    number: "06",
    year: "2025",
    color: "petrol",
    title: "podestbett für kleine wohnungen",
    subtitle: "kombinierte lösung aus kleiderschrank und bett",
    metaTitle: "Podestbett mit Kleiderschrank für kleine Wohnungen",
    description:
      "Plattformbett mit integriertem Stauraum, das einen Kleiderschrank ersetzt und Wohn- und Schlafbereich trennt.",
    story:
      "Dieses Möbelstück wurde für eine kompakte Wohnung entworfen, um den Fokus vom Bett zu lenken. Das Podest bietet viel zusätzlichen Stauraum und ersetzt einen Kleiderschrank. Das Design gleicht einem langen Sideboard und schafft Platz für eine Matratze, ohne direkt an ein Bett zu erinnern. Dadurch wirkt der Raum deutlich aufgeräumter als zuvor.",
    goal: "Wohn- und Schlafbereich voneinander trennen und elegant in den Raum einbinden.",
    materials: "Melaminharzbeschichtetes Sperrholz",
    dimensions: "Bett: 140 × 200 cm",
    cover: {
      src: "/room/room11/podestbett_arbeitsplatz_altbauwohnung_studio_stauraum.webp",
      alt: "Podestbett mit Arbeitsplatz in einer Altbauwohnung",
    },
    detail: {
      src: "/room/room11/studio_bett_stauraumproblem_kleine_wohnung.webp",
      alt: "Das Zimmer vor dem Umbau mit zu wenig Stauraum",
    },
    gallery: [
      {
        src: "/room/room11/studio_bett_stauraumproblem_kleine_wohnung.webp",
        alt: "Das Zimmer vor dem Umbau mit zu wenig Stauraum",
      },
      {
        src: "/room/room11/wgzimmer_dunkel_schreibtisch_wohnbereich.webp",
        alt: "Wohn- und Arbeitsbereich vor dem Umbau",
      },
      {
        src: "/room/room11/kleine-wohnung_design_entwurf_podestbett.webp",
        alt: "Entwurf für das Podestbett",
      },
      {
        src: "/room/room11/zimmer_design_podestbett.webp",
        alt: "Visualisierung des Zimmers mit Podestbett",
      },
      {
        src: "/room/room11/podestbett_arbeitsplatz_altbauwohnung_studio_stauraum.webp",
        alt: "Podestbett mit Arbeitsplatz nach dem Umbau",
      },
      {
        src: "/room/room11/podestbett_stauraum_homeoffice_raumkonzept_farbkonzept.webp",
        alt: "Podestbett mit Stauraum und Homeoffice im Farbkonzept",
      },
    ],
  },
];

export const de: SiteContent = {
  skipLink: "zum inhalt springen",
  nav: [
    { href: "/#projekte", label: "projekte" },
    { href: "/#leistungen", label: "leistungen" },
    { href: "/#ablauf", label: "ablauf" },
    { href: "/#pakete", label: "pakete" },
    { href: "/#ueber-mich", label: "über mich" },
    { href: "/#kontakt", label: "kontakt" },
  ],
  headerCta: { href: "/#kontakt", label: "erstgespräch buchen" },
  menu: { open: "Menü öffnen", close: "Menü schließen" },

  hero: {
    spine: ["raumideenwerk", "berlin"],
    claim: "mehr raum ohne umzug.",
    keywords: "innenarchitektur und raumplanung für kleine wohnungen in berlin",
    primaryCta: { href: "/#kontakt", label: "erstgespräch buchen" },
    secondaryCta: { href: "/#projekte", label: "projekte ansehen" },
    imageTop: {
      src: "/room/room11/podestbett_stauraum_homeoffice_raumkonzept_farbkonzept.webp",
      alt: "Zimmer mit Podestbett, Stauraum und Arbeitsplatz",
      position: "50% 55%",
    },
    imageBottom: {
      src: "/room/room13/kleines_arbeitszimmer_nachher_1.webp",
      alt: "Kleines Arbeitszimmer mit Regal und Schreibtisch",
      position: "50% 60%",
    },
  },

  projects: {
    title: "projekte",
    subtitle: "ausgewählte raumkonzepte und individuelle einbaulösungen",
    prevLabel: "Vorherige Projekte",
    nextLabel: "Nächste Projekte",
    ctaCard: {
      number: "07",
      title: "deine wohnung",
      subtitle: "erstgespräch buchen",
      href: "/#kontakt",
    },
    items: projects,
  },

  services: {
    title: "meine leistungen",
    subtitle: "smart space. better living.",
    items: [
      {
        title: "raumgestaltung & innenarchitektur",
        text: "Ich habe mich darauf spezialisiert, bestehende Räume in funktionale, ästhetische und personalisierte Lebensräume zu verwandeln.",
      },
      {
        title: "raumoptimierung ohne umzug",
        text: "Anstatt umzuziehen, helfe ich Menschen, das Beste aus dem aktuellen Zuhause herauszuholen – durch clevere Umorganisation, durchdachte Zonierung und maßgeschneiderte Möbel-Lösungen.",
      },
      {
        title: "raumkonzepte und einbaulösungen",
        text: "Jedes Konzept wird auf den Lebensstil der Kunden zugeschnitten und verbindet Praktikabilität mit zeitlosem Design.",
      },
      {
        title: "optimierte nutzung und verbessertes raumgefühl",
        text: "Das Ergebnis: Wohnräume, die größer wirken, besser funktionieren und die Menschen, die in ihnen leben, wirklich widerspiegeln.",
      },
    ],
  },

  painPoints: {
    title: "kommt dir das bekannt vor?",
    items: [
      {
        title: "kleine wohnung in berlin",
        text: "Du hast wenig Quadratmeter, aber viele Bedürfnisse? Ich zeige dir, wie du ohne Umzug mehr aus deiner Wohnung holst.",
      },
      {
        title: "platzmangel & kein stauraum",
        text: "Kein Platz für alles? Clevere Einbaulösungen schaffen Stauraum, wo du ihn nicht erwartest.",
      },
      {
        title: "kinderzimmer zu klein",
        text: "Zwei Kinder, ein Zimmer — das geht. Mit der richtigen Planung wird aus Chaos ein funktionaler Wohntraum.",
      },
      {
        title: "wohntraum ohne umzug",
        text: "Eine größere Wohnung kostet in Berlin ein Vermögen. Ich helfe dir, in deiner jetzigen Wohnung zu bleiben — und sie zu lieben.",
      },
    ],
  },

  process: {
    title: "ablauf",
    subtitle: "so arbeiten wir zusammen",
    steps: [
      {
        title: "erstgespräch",
        text: "Wir sprechen über deinen Alltag und darüber, was in der Wohnung gerade nicht funktioniert.",
      },
      {
        title: "aufmaß",
        text: "Du misst selbst nach meiner Anleitung, oder ich komme vorbei und nehme den Bestand auf.",
      },
      {
        title: "konzept",
        text: "Zonen, Stauraum und Einbauten, als Grundriss, Skizze oder Visualisierung.",
      },
      {
        title: "umsetzung",
        text: "Du baust selbst um, oder ich vermittle dich an meine Partnertischlerei.",
      },
    ],
  },

  packages: {
    title: "pakete",
    subtitle: "grundpreise für räume bis 20 m²",
    popularLabel: "am beliebtesten",
    addOnsLabel: "zusätzlich buchbar",
    items: [
      {
        name: "raum impulse",
        kind: "online paket",
        price: "590 €",
        surcharge: "ab 20 m²: +30 € pro weiterem m²",
        description:
          "Das Paket für Inspirationen und Ideen für deine Räume. Für Räume bis 20 m². Online-Beratung.",
        features: [
          "Designberatung",
          "Stilberatung",
          "Raumberatung",
          "Materialvorschläge",
          "Grober Grundriss",
          "Aufmaß durch dich",
        ],
        cta: "loslegen",
        color: "petrol",
      },
      {
        name: "raum konzepte",
        kind: "profi-paket",
        price: "890 €",
        surcharge: "ab 20 m²: +45 € pro weiterem m²",
        description:
          "Das Rundum-Paket für Räume von 15 bis 20 m². Das Konzept zum Umbau deines Wohnraums in Eigenregie, mit Beratung vor Ort in Berlin.",
        features: [
          "Designberatung",
          "Stilkonzept",
          "Raumkonzept",
          "Materialberatung",
          "Moodboard",
          "Shoppingliste",
          "Perspektivische Skizze",
        ],
        addOns: [
          { name: "Individuelle Möbelplanung", price: "500–700 €" },
          { name: "Fotorealistische Visualisierung", price: "150 €" },
        ],
        cta: "konzepte wählen",
        color: "gelb",
        popular: true,
      },
      {
        name: "raum transformation",
        kind: "komplettlösung",
        price: "1.490 €",
        surcharge: "ab 20 m²: +75 € pro weiterem m²",
        description:
          "Das Sorglos-Paket für die Verwandlung deines Wohnraums, mit 3D-Visualisierung und Aufmaß vor Ort in Berlin. Für Räume bis 20 m².",
        features: [
          "Alles aus Raum Konzepte",
          "Individuelle Möbelplanung, inklusive",
          "Fotorealistische Visualisierung, inklusive",
          "Aufmaß vor Ort",
          "Technische Zeichnungen",
          "Vermittlung an Partnertischlerei",
        ],
        cta: "raum transformieren",
        color: "tinte",
      },
    ],
    notes: [
      "Sollte der Umfang einer Anfrage noch nicht ganz klar sein oder kein Paket gebucht werden, rechne ich nach Zeitaufwand ab. Mein Stundensatz liegt bei 160 €.",
      "Alle Preise sind Grundpreise und können je nach Projektkomplexität und spezifischen Anforderungen variieren.",
    ],
  },

  about: {
    title: "über mich",
    subtitle: "architekt und interior designer mit leidenschaft für außergewöhnliche räume",
    spine: "daniel von boros",
    text: "Ich bin Architekt mit über fünf Jahren Erfahrung im Aus- und Umbau von Häusern, Wohnungen sowie in der Gestaltung von Innen- und Außenräumen. Mein Fokus liegt darauf, Funktionalität und ästhetische Schönheit zu verbinden – denn Räume sollten nicht nur gut aussehen, sondern auch den Alltag ihrer Bewohner bereichern. Mein Weg begann mit dem Architekturstudium, in dem ich ein tiefes Verständnis für räumliche Zusammenhänge, strukturelle Integrität und den Einfluss von Umgebungen auf unser Wohlbefinden entwickelte.",
    portrait: {
      src: "/image_daniel.jpeg",
      alt: "Daniel von Boros",
      position: "50% 30%",
    },
  },

  testimonials: {
    title: "was kunden sagen",
    items: [
      {
        text: "Ich war schon lange Zeit unzufrieden mit der Aufteilung unseres Wohnzimmers. Daniel hatte die richtigen Ideen für unsere Bedürfnisse und half uns, mit unseren vorhandenen Möbeln den Raum so umzugestalten, dass wir uns wieder darin wohlfühlen. Mit der neuen Aufteilung wirkt der Raum viel offener und einladender, und man schaut nicht mehr direkt auf die Rückseite der Couch, wenn man die Wohnung betritt.",
        author: "Lisa V.",
      },
      {
        text: "Ich war schon seit langem auf der Suche nach einer individuellen Lösung für meinen Schreibtisch. Zunächst suchte ich nur nach einer Möglichkeit, die Lautsprecher auf meinem Schreibtisch etwas zu erhöhen, doch ich habe wertvolle Inspirationen bekommen. Gemeinsam haben wir anhand meiner Bedürfnisse eine Lösung geschaffen, die zusätzlichen Stauraum, die gewünschte Erhöhung der Lautsprecher und meines Bildschirms an meinem Arbeitsplatz, sowie zusätzliche Stellfläche für all mein Audio Equipment geschaffen hat. Ich bin sehr glücklich mit der neuen Lösung.",
        author: "Nadia P.",
      },
      {
        text: "Daniel hat uns umfassend zu vielen kleinen Problemzonen in unserem Ferienhaus beraten und sehr viele sowohl optisch sehr ansprechende, als auch technisch sehr ausgeklügelte Ideen gefunden. Nun sehen die ehemals kleinen Problemstellen sehr einladend aus und bieten sowohl Stauraum, sind aber auch optisch sehr ansprechend. Ich kann die Beratung nur empfehlen.",
        author: "Christina K.",
      },
    ],
  },

  contact: {
    title: "kontakt",
    subtitle: "bereit, deine wohnung zu verwandeln?",
    details: [
      { label: "e-mail", value: "hallo@raumideenwerk.com", href: "mailto:hallo@raumideenwerk.com" },
      { label: "telefon", value: "+49 160 495 81 48", href: "tel:+491604958148" },
      {
        label: "instagram",
        value: "@raum.ideen.werk.berlin",
        href: "https://www.instagram.com/raum.ideen.werk.berlin",
      },
      { label: "adresse", value: "Kolonnenstraße 8, 10827 Berlin" },
    ],
    form: {
      name: "name",
      email: "e-mail",
      subject: "betreff",
      message: "nachricht",
      submit: "nachricht senden",
      sending: "wird gesendet …",
      success:
        "Danke, deine Nachricht ist angekommen. Ich melde mich in der Regel innerhalb von 24 bis 48 Stunden an Werktagen.",
      error:
        "Das hat nicht geklappt. Versuch es bitte später noch einmal oder schreib direkt an hallo@raumideenwerk.com.",
      captchaRequired: "Bitte löse zuerst die kleine Rechenaufgabe.",
      consentTitle: "Zustimmung erforderlich",
      consentText:
        "Um das Kontaktformular nutzen zu können, ist deine Zustimmung zur Datenverarbeitung nötig. Alternativ erreichst du mich direkt per E-Mail.",
      consentButton: "einstellungen öffnen",
    },
  },

  footer: {
    contact: [
      { href: "mailto:hallo@raumideenwerk.com", label: "hallo@raumideenwerk.com" },
      { href: "tel:+491604958148", label: "+49 160 495 81 48" },
    ],
    social: [
      { href: "https://www.instagram.com/raum.ideen.werk.berlin", label: "@raum.ideen.werk.berlin" },
    ],
    address: "Kolonnenstraße 8, 10827 Berlin",
    legal: [
      { href: "/impressum", label: "impressum" },
      { href: "/impressum#datenschutz", label: "datenschutz" },
    ],
    homeLabel: "raumideenwerk, zur Startseite",
  },

  projectPage: {
    back: "alle projekte",
    goal: "projektziel",
    story: "über dieses projekt",
    materials: "materialien",
    dimensions: "abmessungen",
    year: "jahr",
    gallery: "bilder",
    ctaTitle: "interessiert an einem ähnlichen projekt?",
    ctaText: "Lass uns über deine Wohnung sprechen. Das Erstgespräch ist der erste Schritt.",
    ctaButton: { href: "/#kontakt", label: "erstgespräch buchen" },
    prev: "vorheriges projekt",
    next: "nächstes projekt",
  },

};
