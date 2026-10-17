import Link from "next/link";
import { getValidatedBookingUrl } from "@/config/integrations";
import { getSiteContent } from "@/lib/content";
import { MobileNavigation } from "@/components/mobile-navigation";
import { ReservationAction } from "@/components/reservation-action";
import { Wordmark } from "@/components/wordmark";
import { HomeLink } from "@/components/home-link";

export function Header() {
  const { primaryNavigation } = getSiteContent();
  const bookingUrl = getValidatedBookingUrl();

  return (
    <header className="site-header">
      <div className="header-main shell">
        <div className="header-location">Houston, Texas</div>
        <Wordmark light />
        <div className="header-action">
          <ReservationAction bookingUrl={bookingUrl} className="text-action" />
        </div>
        <MobileNavigation items={primaryNavigation} bookingUrl={bookingUrl} />
      </div>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <div className="shell desktop-nav-inner">
          {primaryNavigation.map((item) => item.href === "/#top"
            ? <HomeLink key={item.href}>{item.label}</HomeLink>
            : <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </div>
      </nav>
    </header>
  );
}
