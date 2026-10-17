import type { ImageAsset, NavigationItem, RestaurantIdentity } from "@/types/content";

export const restaurant: RestaurantIdentity = {
  name: "Zaragoza",
  descriptor: "Restaurant & Bar",
  city: "Houston",
  region: "Texas",
  address: null,
  phone: null,
  hours: [],
  socialLinks: [],
};

export const primaryNavigation: NavigationItem[] = [
  { label: "Home", href: "/#top" },
  { label: "Menus", href: "/menus" },
  { label: "About", href: "/about" },
  { label: "Private Dining", href: "/#private-dining" },
  { label: "Visit Us", href: "/#visit" },
];

export const images = {
  hero: {
    src: "/images/zaragoza-shared-table-hero.webp",
    alt: "A candlelit table arranged with Spanish-inspired shared plates and a paella pan",
    width: 1680,
    height: 936,
    source: "OpenAI generated placeholder",
  },
  diningRoom: {
    src: "/images/zaragoza-dining-room.webp",
    alt: "A warmly lit dining room with a long table set for shared plates",
    width: 1124,
    height: 1408,
    source: "OpenAI generated placeholder",
  },
  smallPlates: {
    src: "/images/zaragoza-small-plates.webp",
    alt: "An overhead arrangement of Spanish-inspired small plates on a stone table",
    width: 1536,
    height: 1024,
    source: "OpenAI generated placeholder",
  },
  cocktails: {
    src: "/images/zaragoza-cocktails.webp",
    alt: "Two jewel-toned cocktails on a dark bar under warm amber light",
    width: 1536,
    height: 1024,
    source: "OpenAI generated placeholder",
  },
} satisfies Record<string, ImageAsset>;

export const prototypeNotice =
  "Preview concept — imagery, menu selections, and written content are placeholders awaiting restaurant review.";
