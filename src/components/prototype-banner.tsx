import { getSiteContent } from "@/lib/content";

export function PrototypeBanner() {
  const { prototypeNotice } = getSiteContent();
  return (
    <div className="prototype-banner" role="note">
      <span className="prototype-desktop">
        <strong className="prototype-label">Prototype</strong>
        <span>{prototypeNotice}</span>
      </span>
      <span className="prototype-mobile">Prototype — sample imagery and content pending approval.</span>
    </div>
  );
}
