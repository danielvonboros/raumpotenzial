export type SpineItem = {
  id: string;          // matches a panel's data-section (for active highlight)
  label: string;
  color: string;       // hex — bold spine colour
  thumb?: string;      // small cover image shown when the spine folds open
  opensOverlay?: boolean; // true = clicking opens the booking overlay instead of scrolling
};

export type PanelData = {
  id: string;
  section: string;     // scroll-target id (projects can share e.g. "projects")
  number?: string;     // big faint volume number ("01")
  color: string;       // hex — bold panel background
  textColor?: string;  // hex — defaults to cream
  kicker?: string;     // small label above the title
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  ctaLabel?: string;
  flip?: boolean;      // image on the right instead of the left
  align?: 'top' | 'bottom'; // vertical offset of the image (the shelf "stagger")
};