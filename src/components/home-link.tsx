"use client";

import Link from "next/link";
import { forwardRef, type ComponentProps, type MouseEvent } from "react";

type HomeLinkProps = Omit<ComponentProps<typeof Link>, "href">;

function isUnmodifiedPrimaryClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

export const HomeLink = forwardRef<HTMLAnchorElement, HomeLinkProps>(function HomeLink(
  { onClick, ...props },
  ref,
) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (event.defaultPrevented || !isUnmodifiedPrimaryClick(event) || window.location.pathname !== "/") {
      return;
    }

    event.preventDefault();

    if (window.location.hash !== "#top") {
      window.location.hash = "top";
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const target = document.getElementById("top");
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        target?.focus({ preventScroll: true });
        target?.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      });
    });
  }

  return <Link {...props} ref={ref} href="/#top" onClick={handleClick} />;
});
