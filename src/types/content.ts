export type NavigationItem = {
  label: string;
  href: string;
};

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  source: "OpenAI generated placeholder";
};

export type RestaurantIdentity = {
  name: string;
  descriptor: string;
  city: string;
  region: string;
  address: string | null;
  phone: string | null;
  hours: string[];
  socialLinks: NavigationItem[];
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  priceMinorUnits?: number;
};

export type MenuCategory = {
  id: string;
  name: string;
  eyebrow: string;
  items: MenuItem[];
};
