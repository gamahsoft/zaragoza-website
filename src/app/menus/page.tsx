import type { Metadata } from "next";
import Image from "next/image";
import { getMenuCategories, getSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sample Menus",
  description: "Explore sample food and beverage directions for Zaragoza Restaurant & Bar in Houston. Final dishes and prices are pending.",
};

export default function MenusPage() {
  const categories = getMenuCategories();
  const { images } = getSiteContent();
  return (
    <>
      <section className="page-hero menu-hero">
        <div className="shell page-hero-grid">
          <div><p className="eyebrow text-amber">At the table</p><h1>Sample menus</h1><p className="page-lead">Spanish-inspired plates built for passing, tasting, and staying a little longer.</p></div>
          <div className="page-hero-image"><Image src={images.smallPlates.src} alt={images.smallPlates.alt} fill priority sizes="(max-width: 800px) 100vw, 48vw" /></div>
        </div>
      </section>
      <div className="menu-notice" role="note"><strong>Sample menu — final dishes and prices pending.</strong><span>These selections illustrate a proposed direction and are not an approved Zaragoza menu.</span></div>
      <section className="menu-section section">
        <div className="shell menu-list">
          {categories.map((category, index) => (
            <section className="menu-category" id={category.id} key={category.id} aria-labelledby={`${category.id}-title`}>
              <div className="menu-category-heading"><span>0{index + 1}</span><div><p className="eyebrow text-amber">{category.eyebrow}</p><h2 id={`${category.id}-title`}>{category.name}</h2></div></div>
              <div className="menu-items">
                {category.items.map((item) => (
                  <article className="menu-item" key={item.id}>
                    <div><h3>{item.name}</h3><p>{item.description}</p></div>
                    {item.priceMinorUnits !== undefined && <span>${(item.priceMinorUnits / 100).toFixed(2)}</span>}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
        <p className="shell allergen-note">Please ask the restaurant team about ingredients and allergens once the final menu is available. No dietary or allergen claims are made in this preview.</p>
      </section>
    </>
  );
}
