# Website v2 (Rahmen)

Startpunkt für die neue raumideenwerk-Website nach dem Canvas-Entwurf „Website v2, Rahmen“.

## Loslegen

```bash
git checkout gmail-email
git checkout -b website-v2
git apply ~/Downloads/website-v2.patch
yarn
yarn dev
```

Dann http://localhost:3000 öffnen.

## Was wo liegt

| Pfad | Inhalt |
| --- | --- |
| `src/content/de.ts` | Alle Texte, Preise und Projekte mit Slugs und Bildpfaden. Texte ändern heißt: nur hier ändern. |
| `src/content/types.ts` | Typen dazu |
| `src/components/v2/` | Die Sektionen: Header, Hero, ProjectCatalog, ProjectCover, Services, PainPoints, Process, Packages, About, Testimonials, SeoServices, ContactSection, ContactForm, Footer. `frames.ts` ordnet den Rahmenfarben Text- und Buttonfarben zu. |
| `src/app/page.tsx` | Startseite als Server-Komponente |
| `src/app/projekte/[slug]/page.tsx` | Eine Seite pro Projekt, statisch vorgerendert, mit eigenem Titel, Description und Canonical |
| `src/app/impressum/page.tsx` | Impressum; die Rechtstexte kommen weiter aus `src/lib/translations.ts` |
| `src/app/sitemap.ts`, `src/app/robots.ts` | Sitemap mit allen Projektseiten und robots.txt |
| `src/app/globals.css` | Markenfarben als Tailwind-Farben (`gelb`, `tinte`, `leinen`, `petrol`, `sand`, `schiefer`, `nebel`), dazu die Utilities `spine` (senkrechter Buchrücken-Text) und `platzhalter` (schraffierte Fläche) |

## Was sich gegenüber der alten Seite ändert

- Die Startseite rendert serverseitig. Nur Kopfzeile (Handy-Menü), Katalog-Pfeile und Kontaktformular laufen im Browser.
- `lang="de"` statt `lang="en"`. Schrift ist Hanken Grotesk über `next/font/google`; sie wird beim Build selbst gehostet.
- Projekte haben eigene URLs statt des Modals. Die Katalognummern entsprechen den Nummern auf Instagram.
- Das Kontaktformular nutzt dieselbe Server-Action, dasselbe Captcha und denselben Zustimmungsdialog wie bisher und ist nur neu gestaltet.
- In den Projekttexten sind ein paar Tippfehler korrigiert (Groß- und Kleinschreibung, ein fehlendes Verb bei Projekt 05).
- Die alten Komponenten in `src/components/` sind unverändert. Genutzt werden davon nur noch Captcha, Zustimmungsdialog und die Übersetzungen; den Rest kannst du löschen, wenn v2 steht.

## Deine SEO-Komponente

`src/components/v2/SeoServices.tsx` ist der Platzhalter vor dem Kontakt. Im Produktions-Build rendert er nichts, bis du ihn ersetzt. Hinweise zum Aufbau stehen oben in der Datei.

## Noch offen

- **Englisch:** `src/content/en.ts` anlegen und unter `/en` ausliefern, mit hreflang. Die Komponenten bekommen ihre Texte schon per Props.
- **Terminbuchung:** Der BookingCalendar ist noch nicht eingebunden; alle „erstgespräch buchen“-Buttons führen zum Kontaktformular.
- **Zustimmungsdialog:** Er erscheint wie bisher beim ersten Besuch als Overlay. Schöner wäre, ihn erst am Formular zu zeigen.
- **Kontakt-Action:** Das Captcha wird nur im Browser geprüft, und die automatische Antwort schickt den Nachrichtentext an die eingegebene Adresse zurück. Beides lässt sich für Spam missbrauchen. Nächster Schritt: Prüfung auf dem Server und eine Bestätigung ohne Nachrichtentext.
- **Rechtstexte:** Sie verweisen noch auf das TMG, das im Mai 2024 durch das Digitale-Dienste-Gesetz abgelöst wurde. Bitte prüfen (lassen). Eine eigene Datenschutzseite fehlt; „datenschutz“ verlinkt vorerst auf den Abschnitt im Impressum.
- **Hosting:** Die Kontakt-Action braucht einen Node-Server, zum Beispiel Vercel. Ein statischer Export, wie ihn der GitHub-Pages-Workflow in `.github/` vorsieht, kann Server Actions nicht ausführen.
- **ESLint** startet im Repo gerade nicht, weil `typescript-eslint` TypeScript 7 noch nicht unterstützt. Die Typprüfung im Build läuft.

## Fehler auf der Live-Seite

Im alten `ProjectModal.tsx` zeigen zwei Bilder von Projekt 01 auf `/room/…` statt auf `/room/room1/…` und laden deshalb nicht. In `src/content/de.ts` sind die Pfade korrekt.
