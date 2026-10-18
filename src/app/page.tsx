import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { HeroCarousel } from "@/components/hero-carousel";
import { ImageCredit } from "@/components/image-credit";
import { getValidatedBookingUrl } from "@/config/integrations";
import { getHeroSlides, getHomeContent, getSiteContent } from "@/lib/content";

export default function HomePage() {
  const content = getHomeContent();
  const slides = getHeroSlides();
  const { images, restaurant } = getSiteContent();
  const bookingUrl = getValidatedBookingUrl();

  return (
    <>
      <HeroCarousel slides={slides} bookingUrl={bookingUrl} />

      <section id="story" className="section story-section">
        <div className="shell story-grid">
          <div className="story-image-wrap">
            <Image src={images.diningRoom.src} alt={images.diningRoom.alt} width={images.diningRoom.width} height={images.diningRoom.height} sizes="(max-width: 800px) 92vw, 44vw" className="story-image" />
            <ImageCredit />
            <span className="image-index">01</span>
          </div>
          <div className="story-copy">
            <p className="eyebrow text-amber">{content.story.eyebrow}</p>
            <h2>{content.story.title}</h2>
            {content.story.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <Link href="/about" className="text-link">Read our proposed story <ArrowIcon className="button-icon" /></Link>
          </div>
        </div>
      </section>

      <section className="flavors-section">
        <div className="shell section-heading">
          <div><p className="eyebrow text-amber">Food &amp; bar</p><h2>Flavor with a little fire.</h2></div>
          <p>Sample culinary direction — final dishes and beverage selections are pending restaurant approval.</p>
        </div>
        <div className="shell feature-pair">
          <article className="feature-panel">
            <div className="feature-image-wrap"><Image src={images.smallPlates.src} alt={images.smallPlates.alt} fill sizes="(max-width: 800px) 92vw, 50vw" className="feature-image" /><ImageCredit /></div>
            <div className="feature-caption"><span>Share the table</span><h3>Small plates, generous spirit</h3><Link href="/menus">Explore food <ArrowIcon className="button-icon" /></Link></div>
          </article>
          <article className="feature-panel feature-panel-offset">
            <div className="feature-image-wrap"><Image src={images.cocktails.src} alt={images.cocktails.alt} fill sizes="(max-width: 800px) 92vw, 50vw" className="feature-image" /><ImageCredit /></div>
            <div className="feature-caption"><span>Meet at the bar</span><h3>Bright pours, late nights</h3><Link href="/menus#bar">Explore drinks <ArrowIcon className="button-icon" /></Link></div>
          </article>
        </div>
      </section>

      <section id="private-dining" className="private-section">
        <div className="private-rule" aria-hidden="true"><span>✦</span></div>
        <div className="shell private-content">
          <p className="eyebrow eyebrow-light">{content.privateDining.eyebrow}</p>
          <h2>{content.privateDining.title}</h2>
          <p>{content.privateDining.body}</p>
          <div className="preview-state"><span>Preview state</span><p>Event inquiries will be available once Zaragoza supplies an approved business contact. No inquiry is submitted from this prototype.</p></div>
        </div>
      </section>

      <section id="visit" className="visit-section">
        <div className="shell visit-grid">
          <div><p className="eyebrow text-amber">Visit us</p><h2>Your next table<br />is in Houston.</h2></div>
          <div className="visit-details">
            <div><span>Location</span><p>{restaurant.city}, {restaurant.region}</p><small>Exact address pending verification</small></div>
            <div><span>Hours</span><p>Coming soon</p><small>Final service hours pending</small></div>
          </div>
        </div>
      </section>
    </>
  );
}
