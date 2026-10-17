import { HomeLink } from "@/components/home-link";

export function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <HomeLink className={`wordmark ${light ? "wordmark-light" : ""}`} aria-label="Zaragoza Restaurant and Bar, home">
      <span>Zaragoza</span>
      <small>Restaurant &amp; Bar</small>
    </HomeLink>
  );
}
