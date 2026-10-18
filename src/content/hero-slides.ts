import { images } from "@/content/site";
import type { HeroSlide } from "@/types/content";

export const heroSlides = [
  {
    id: "dining-experience",
    eyebrow: "The Zaragoza experience",
    heading: "Gather boldly. Stay awhile.",
    description:
      "A prototype vision for a warm Houston dining room shaped around shared plates, expressive drinks, and easy conversation.",
    image: images.hero,
    actions: [
      { type: "reservation", label: "Reserve a Table" },
      { type: "link", label: "Explore Menus", href: "/menus" },
    ],
  },
  {
    id: "spanish-inspired-menus",
    eyebrow: "Spanish-inspired plates",
    heading: "Pass the plates. Keep the conversation going.",
    description:
      "Sample culinary direction brings bright flavors and generous shareable dishes to the center of the table, pending restaurant approval.",
    image: images.smallPlates,
    actions: [
      { type: "reservation", label: "Reserve a Table" },
      { type: "link", label: "Explore Menus", href: "/menus" },
    ],
  },
  {
    id: "cocktails-weekend-gatherings",
    eyebrow: "Cocktails & weekend gatherings",
    heading: "Raise a glass to the weekend.",
    description:
      "A sample bar experience imagines vivid cocktails, warm light, and the lively rhythm of friends settling in for the evening.",
    image: images.cocktails,
    actions: [
      { type: "reservation", label: "Reserve a Table" },
      { type: "link", label: "Explore the Bar", href: "/menus#bar" },
    ],
  },
] as const satisfies readonly HeroSlide[];
