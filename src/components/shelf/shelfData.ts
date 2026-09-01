import type { PanelData, SpineItem } from './types';

// NOTE: image paths point at /public. Adjust to your actual asset locations.
export const spineItems: SpineItem[] = [
  { id: 'projects', label: 'Projekte',  color: '#C0573B', thumb: '/room/sample_room_1_after2.webp' },
  { id: 'about',    label: 'Über mich', color: '#3A4550', thumb: '/image_daniel.jpeg' },
  { id: 'booking',  label: 'Termin',    color: '#46513C', thumb: '/room/sample_room_2_after.webp', opensOverlay: true },
];

export const projectPanels: PanelData[] = [
  {
    id: 'p1', section: 'projects', number: '01', color: '#C0573B',
    kicker: 'Ausgewählte Projekte', title: 'Raumtransformation mit Stauraum',
    description: 'Einbauelement mit zusätzlicher Ebene und einer kleinen Kleiderkammer — Stauraum, wo man ihn nicht erwartet.',
    image: '/room/sample_room_1_after2.webp', ctaLabel: 'Details ansehen →', align: 'top',
  },
  {
    id: 'p2', section: 'projects', number: '02', color: '#5E6B4F', textColor: '#F4ECDD',
    kicker: 'Ausgewählte Projekte', title: 'Minimalistisches Sideboard',
    description: 'Elegante und funktionale Aufbewahrungslösung für moderne Wohnräume — ruhig, präzise, langlebig.',
    image: '/furniture/quadra_wide.webp', ctaLabel: 'Details ansehen →', flip: true, align: 'bottom',
  },
  {
    id: 'p3', section: 'projects', number: '03', color: '#C98A2E', textColor: '#20262B',
    kicker: 'Ausgewählte Projekte', title: 'Raumteiler & Empore',
    description: 'Eine Einbaulösung für die Zonierung eines kombinierten Wohn- und Schlafzimmers.',
    image: '/room/sample_room_2_after.webp', ctaLabel: 'Details ansehen →', align: 'top',
  },
  {
    id: 'p4', section: 'projects', number: '04', color: '#2B3947',
    kicker: 'Ausgewählte Projekte', title: 'Hochbett & Wohnwand',
    description: 'Eine multifunktionale Lösung für einen kombinierten Wohn- und Schlafbereich auf kleinster Fläche.',
    image: '/room/sample_room_4_after.webp', ctaLabel: 'Details ansehen →', flip: true, align: 'bottom',
  },
  {
    id: 'p5', section: 'projects', number: '05', color: '#5C4A57',
    kicker: 'Ausgewählte Projekte', title: 'Empore für Bett',
    description: 'Einbaulösung für den kindgerechten Umbau eines Mikroapartments — aus Chaos wird ein Wohntraum.',
    image: '/room/sample_room_8_1_after.webp', ctaLabel: 'Details ansehen →', align: 'top',
  },
  {
    id: 'p6', section: 'projects', number: '06', color: '#9E4B33',
    kicker: 'Ausgewählte Projekte', title: 'Plattformbett & Kleiderschrank',
    description: 'Eine Einbaulösung für die Zonierung eines Wohn- und Schlafzimmers mit integriertem Stauraum.',
    image: '/room/sample_room_11_2_after.webp', ctaLabel: 'Details ansehen →', flip: true, align: 'bottom',
  },
];