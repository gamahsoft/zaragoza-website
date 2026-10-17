import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { getAboutContent, getSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Read the proposed story and dining experience for Zaragoza Restaurant & Bar in Houston, Texas.",
};

export default function AboutPage() {
  const content = getAboutContent();
  const { images } = getSiteContent();
  return (
    <>
      <section className="about-hero">
        <Image src={images.diningRoom.src} alt={images.diningRoom.alt} fill priority sizes="100vw" className="about-hero-image" />
        <div className="about-hero-shade" />
        <div className="shell about-hero-content"><p className="eyebrow eyebrow-light">{content.eyebrow}</p><h1>{content.title}</h1></div>
      </section>
      <div className="approval-notice shell" role="note"><span>Awaiting restaurant approval</span><p>The narrative on this page is proposed copy for review. It does not state an opening history, ownership story, chef biography, award, or sourcing claim.</p></div>
      <section className="section about-intro">
        <div className="shell about-intro-grid">
          <p className="about-dropcap">{content.intro}</p>
          <div className="about-sections">
            {content.sections.map((section, index) => <article key={section.title}><span>0{index + 1}</span><div><h2>{section.title}</h2><p>{section.body}</p></div></article>)}
          </div>
        </div>
      </section>
      <section className="about-cta"><div className="shell"><p className="eyebrow eyebrow-light">A seat is waiting</p><h2>Begin with the menu.</h2><Link href="/menus" className="button button-amber">Explore sample menus <ArrowIcon className="button-icon" /></Link></div></section>
    </>
  );
}
