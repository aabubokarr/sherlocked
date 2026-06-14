import type { QueryItem } from "./types";

/** Shared URLs and demo data for portfolio sections. */
export const GITHUB_REPO = "https://github.com/aabubokarr/sherlocked";
export const GITHUB_ISSUES = `${GITHUB_REPO}/issues`;

export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

export const GARMENT_CLASSES = [
  "Belt", "Blazer", "Blouse", "Burqo", "Cap", "Cardigan", "Dhoti", "Gown", "Hijab",
  "Fatua", "Footwear", "Frock", "Gawn", "Hoodie", "Jacket", "Jeans pant", "Kameez",
  "Koti", "Lehenga", "Lungi", "Panjabi", "Pagri", "Pajama", "Pant", "Plazo", "Polo shirt",
  "Sando genji", "Saree", "Sherwani", "Shirt", "Shorts", "T-shirt", "Tie", "Top", "Watch",
];

export const SAMPLE_QUERIES: QueryItem[] = [
  {
    text: "find a person wearing a blue kameez and black hijab",
    pairs: [
      { object: "kameez", color: "blue" },
      { object: "hijab", color: "black" },
    ],
    targets: ["kameez", "hijab"],
    colors: ["blue", "black"],
    pipeline: "gemini-2.5-flash-lite Intent Parser",
  },
  {
    text: "look for a red panjabi",
    pairs: [{ object: "panjabi", color: "red" }],
    targets: ["panjabi"],
    colors: ["red"],
    pipeline: "Fast Pattern Extractor",
  },
  {
    text: "spot a saree",
    pairs: [],
    targets: ["saree"],
    colors: [],
    pipeline: "Keyword Fallback Engine",
  },
];

export const COLOR_KEYWORDS = [
  "red", "blue", "green", "yellow", "orange", "purple", "pink",
  "black", "white", "gray", "grey", "cyan",
];
