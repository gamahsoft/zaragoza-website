import Image from "next/image";
import { HomeLink } from "@/components/home-link";

type WordmarkPlacement = "header" | "footer" | "navigation";

const wordmarkSizes: Record<WordmarkPlacement, string> = {
  header: "(max-width: 960px) 100px, 124px",
  footer: "220px",
  navigation: "130px",
};

export function Wordmark({ placement = "header" }: { placement?: WordmarkPlacement }) {
  return (
    <HomeLink
      className={`wordmark wordmark-${placement}`}
      aria-label="Zaragoza Restaurant and Bar, home"
    >
      <Image
        src="/images/zaragoza-logo-concept-web.png"
        width={580}
        height={400}
        sizes={wordmarkSizes[placement]}
        preload={placement === "header"}
        alt=""
        className="wordmark-image"
      />
    </HomeLink>
  );
}
