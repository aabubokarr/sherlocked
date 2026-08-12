// Anchor IDs used by portfolio sections and shared navbar links.
export const NAV_SECTIONS = [
  {
    id: "research",
    label: "Research",
    description: "Benchmarks & metrics",
    icon: "chart",
  },
  {
    id: "demo",
    label: "Query Parser",
    description: "Live intent parser demo",
    icon: "terminal",
  },
  {
    id: "features",
    label: "Features",
    description: "Garments, pipeline & stack",
    icon: "grid",
  },
  {
    id: "pipeline",
    label: "Pipeline",
    description: "CV & AI processing stages",
    icon: "layers",
  },
  {
    id: "contact",
    label: "Contact",
    description: "GitHub, issues & chatbot",
    icon: "mail",
  },
] as const;

export type NavSectionIcon = (typeof NAV_SECTIONS)[number]["icon"];

/** Offset for sticky navbar when scrolling to in-page anchors. */
export const NAVBAR_HEIGHT_PX = 64;
