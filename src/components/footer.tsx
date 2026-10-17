import Link from "next/link";
import { getSiteContent } from "@/lib/content";
import { Wordmark } from "@/components/wordmark";
import { HomeLink } from "@/components/home-link";

export function Footer() {
  const { primaryNavigation, restaurant } = getSiteContent();
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Wordmark light />
          <p>A new restaurant and bar concept for Houston, Texas.</p>
        </div>
        <div>
          <p className="footer-label">Explore</p>
          <nav aria-label="Footer navigation" className="footer-links">
            {primaryNavigation.map((item) => item.href === "/#top"
              ? <HomeLink key={item.href}>{item.label}</HomeLink>
              : <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
        </div>
        <div>
          <p className="footer-label">Visit</p>
          <p>{restaurant.city}, {restaurant.region}</p>
          <p>Address and hours coming soon.</p>
        </div>
      </div>
      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} Zaragoza Restaurant &amp; Bar</p>
        <p>Prototype for review — not yet open for reservations.</p>
      </div>
    </footer>
  );
}
