import Link from "next/link";

export default function NotFound() {
  return <section className="not-found shell"><p className="eyebrow text-amber">404</p><h1>This table isn’t set.</h1><p>The page you requested is not part of this preview.</p><Link className="button button-navy" href="/">Return home</Link></section>;
}
