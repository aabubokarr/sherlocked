// Anchor IDs used by portfolio sections and shared navbar links.
export const NAV_SECTIONS = [
  {
    id: "about",
    label: "About",
    description: "Project overview & mission",
    icon: "sparkles",
  },
  {
    id: "features",
    label: "Features",
    description: "Garments, pipeline & stack",
    icon: "grid",
  },
  {
    id: "demo",
    label: "Query Parser",
    description: "Live intent parser demo",
    icon: "terminal",
  },
  {
    id: "research",
    label: "Research",
    description: "Benchmarks & metrics",
    icon: "chart",
  },
  {
    id: "architecture",
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
