import { aboutContent, homeContent } from "@/content/pages";
import { heroSlides } from "@/content/hero-slides";
import { menuCategories } from "@/content/menu";
import { images, primaryNavigation, prototypeNotice, restaurant } from "@/content/site";

export function getSiteContent() {
  return { restaurant, primaryNavigation, images, prototypeNotice };
}

export function getHomeContent() {
  return homeContent;
}

export function getHeroSlides() {
  return heroSlides;
}

export function getAboutContent() {
  return aboutContent;
}

export function getMenuCategories() {
  return menuCategories;
}
