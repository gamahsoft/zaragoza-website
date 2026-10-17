import type { MenuCategory } from "@/types/content";

export const menuCategories: MenuCategory[] = [
  {
    id: "small-plates",
    name: "Small Plates",
    eyebrow: "To begin & share",
    items: [
      { id: "sp-patatas-bravas", name: "Patatas Bravas", description: "Crisp potatoes, smoked tomato, garlic aioli" },
      { id: "sp-croquetas", name: "Croquetas", description: "Golden croquettes, manchego, herbs" },
      { id: "sp-gambas", name: "Gambas al Ajillo", description: "Sizzling shrimp, garlic, chile, lemon" },
      { id: "sp-setas", name: "Roasted Mushrooms", description: "Sherry glaze, thyme, toasted breadcrumbs" },
    ],
  },
  {
    id: "from-the-fire",
    name: "From the Fire",
    eyebrow: "Larger plates",
    items: [
      { id: "fire-chicken", name: "Saffron-Roasted Chicken", description: "Charred lemon, pan jus, crispy potatoes" },
      { id: "fire-fish", name: "Market Fish", description: "Romesco, grilled seasonal vegetables" },
      { id: "fire-rice", name: "Zaragoza Rice", description: "Saffron rice, seasonal seafood, roasted pepper" },
    ],
  },
  {
    id: "sweets",
    name: "Something Sweet",
    eyebrow: "After the table",
    items: [
      { id: "sweet-churros", name: "Warm Churros", description: "Cinnamon sugar, dark chocolate" },
      { id: "sweet-citrus", name: "Citrus Crema", description: "Orange, caramelized sugar, sea salt" },
    ],
  },
  {
    id: "bar",
    name: "From the Bar",
    eyebrow: "Cocktails & pours",
    items: [
      { id: "bar-golden-hour", name: "Golden Hour", description: "A bright, citrus-led cocktail concept with saffron and bubbles" },
      { id: "bar-midnight", name: "Midnight in Madrid", description: "A spirit-forward cocktail concept with bitter orange and warming spice" },
      { id: "bar-sangria", name: "House Sangría", description: "A seasonal red or white sangría concept for the table" },
      { id: "bar-wine", name: "Spanish Wine Selection", description: "A proposed rotating list of sparkling, white, rosé, and red wines" },
    ],
  },
];
