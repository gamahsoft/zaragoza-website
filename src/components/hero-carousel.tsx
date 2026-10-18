"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
} from "react";
import { ChevronIcon, PauseIcon, PlayIcon } from "@/components/icons";
import { ImageCredit } from "@/components/image-credit";
import { ReservationAction } from "@/components/reservation-action";
import {
  getAutoplayPauseReason,
  getManualCarouselState,
  isAutoplayRequested,
  shouldPauseForPointerHover,
  wrapSlideIndex,
} from "@/lib/carousel";
import type { AutoplayIntent } from "@/lib/carousel";
import type { HeroSlide } from "@/types/content";

const AUTOPLAY_INTERVAL_MS = 5_000;
const CROSSFADE_MS = 700;
const SWIPE_THRESHOLD_PX = 50;

type HeroCarouselProps = {
  slides: readonly HeroSlide[];
  bookingUrl: string | null;
};

type CarouselViewState = {
  index: number;
  previousIndex: number | null;
  autoplayIntent: AutoplayIntent;
};

type PointerStart = {
  id: number;
  x: number;
  y: number;
};

export function HeroCarousel({ slides, bookingUrl }: HeroCarouselProps) {
  const [view, setView] = useState<CarouselViewState>({
    index: 0,
    previousIndex: null,
    autoplayIntent: "default",
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  const [browserPreferencesResolved, setBrowserPreferencesResolved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasSlideFocus, setHasSlideFocus] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDocumentHidden, setIsDocumentHidden] = useState(false);
  const carouselRef = useRef<HTMLElement>(null);
  const pointerStart = useRef<PointerStart | null>(null);
  const supportsFinePointerHover = useRef(false);

  const setSlide = useCallback((requestedIndex: number, manual: boolean) => {
    setView((current) => {
      const next = manual
        ? getManualCarouselState(current, requestedIndex, slides.length)
        : {
            index: wrapSlideIndex(requestedIndex, slides.length),
            autoplayIntent: current.autoplayIntent,
          };

      if (next.index === current.index) {
        return { ...current, autoplayIntent: next.autoplayIntent };
      }

      return {
        ...next,
        previousIndex: prefersReducedMotion ? null : current.index,
      };
    });
  }, [prefersReducedMotion, slides.length]);

  useEffect(() => {
    const banner = document.querySelector<HTMLElement>(".prototype-banner");
    const header = document.querySelector<HTMLElement>(".site-header");

    const updateViewportOffset = () => {
      const chromeHeight = (banner?.offsetHeight ?? 0) + (header?.offsetHeight ?? 0);
      carouselRef.current?.style.setProperty("--hero-viewport-offset", `${chromeHeight}px`);
    };

    updateViewportOffset();
    const observer = new ResizeObserver(updateViewportOffset);
    if (banner) observer.observe(banner);
    if (header) observer.observe(header);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyMotionPreference = () => {
      const reducedMotion = mediaQuery.matches;
      setPrefersReducedMotion(reducedMotion);
      setView((current) => ({
        ...current,
        previousIndex: reducedMotion ? null : current.previousIndex,
      }));
      setBrowserPreferencesResolved(true);
    };

    const frame = window.requestAnimationFrame(applyMotionPreference);
    mediaQuery.addEventListener("change", applyMotionPreference);

    return () => {
      window.cancelAnimationFrame(frame);
      mediaQuery.removeEventListener("change", applyMotionPreference);
    };
  }, []);

  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateHoverCapability = () => {
      supportsFinePointerHover.current = hoverQuery.matches;
      if (!hoverQuery.matches) setIsHovered(false);
    };

    const frame = window.requestAnimationFrame(updateHoverCapability);
    hoverQuery.addEventListener("change", updateHoverCapability);

    return () => {
      window.cancelAnimationFrame(frame);
      hoverQuery.removeEventListener("change", updateHoverCapability);
    };
  }, []);

  useEffect(() => {
    const updateVisibility = () => setIsDocumentHidden(document.hidden);
    const frame = window.requestAnimationFrame(updateVisibility);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    const updateDialogState = () => {
      setIsDialogOpen(Boolean(document.querySelector(
        '[role="dialog"][data-state="open"]:not([hidden]):not([aria-hidden="true"])',
      )));
    };
    const observer = new MutationObserver(updateDialogState);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["aria-hidden", "data-state", "hidden"],
      childList: true,
      subtree: true,
    });
    const frame = window.requestAnimationFrame(updateDialogState);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (view.previousIndex === null) return;
    const transitionTimer = window.setTimeout(() => {
      setView((current) => ({ ...current, previousIndex: null }));
    }, CROSSFADE_MS);
    return () => window.clearTimeout(transitionTimer);
  }, [view.index, view.previousIndex]);

  const autoplayPauseReason = getAutoplayPauseReason({
    browserPreferencesResolved,
    autoplayIntent: view.autoplayIntent,
    prefersReducedMotion,
    slideCount: slides.length,
    isHovered,
    hasSlideFocus,
    isDialogOpen,
    isDocumentHidden,
  });

  useEffect(() => {
    if (autoplayPauseReason !== null) return;

    const autoplayTimer = window.setTimeout(() => {
      setSlide(view.index + 1, false);
    }, AUTOPLAY_INTERVAL_MS);
    return () => window.clearTimeout(autoplayTimer);
  }, [autoplayPauseReason, setSlide, view.index]);

  if (slides.length === 0) return null;

  const activeSlide = slides[view.index];
  const previousSlide = view.previousIndex === null ? null : slides[view.previousIndex];
  const autoplayRequested = isAutoplayRequested(
    view.autoplayIntent,
    prefersReducedMotion,
  );

  const handleSlideFocusOut = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setHasSlideFocus(false);
  };

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") return;
    if ((event.target as HTMLElement).closest("a, button")) return;
    pointerStart.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
  };

  const handlePointerEnter = (event: PointerEvent<HTMLElement>) => {
    if (shouldPauseForPointerHover(supportsFinePointerHover.current, event.pointerType)) {
      setIsHovered(true);
    }
  };

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || start.id !== event.pointerId) return;

    const horizontalDistance = event.clientX - start.x;
    const verticalDistance = event.clientY - start.y;
    if (
      Math.abs(horizontalDistance) < SWIPE_THRESHOLD_PX
      || Math.abs(horizontalDistance) <= Math.abs(verticalDistance) * 1.25
    ) return;

    setSlide(view.index + (horizontalDistance < 0 ? 1 : -1), true);
  };

  const developmentDiagnostics = process.env.NODE_ENV === "development"
    ? {
        "data-autoplay-pause-reason": autoplayPauseReason ?? "none",
        "data-autoplay-state": autoplayPauseReason === null ? "timer-active" : "paused",
        "data-carousel-slide": String(view.index + 1),
      }
    : {};

  return (
    <section
      ref={carouselRef}
      className="hero hero-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured Zaragoza prototype experiences"
      {...developmentDiagnostics}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={() => setIsHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => { pointerStart.current = null; }}
    >
      <h1 className="sr-only">Zaragoza Restaurant &amp; Bar in Houston, Texas</h1>
      <div className="hero-carousel-media" aria-hidden="true">
        {previousSlide ? (
          <Image
            key={`previous-${previousSlide.id}`}
            src={previousSlide.image.src}
            alt=""
            fill
            sizes="100vw"
            className="hero-carousel-image hero-carousel-image-previous"
          />
        ) : null}
        <Image
          key={activeSlide.id}
          src={activeSlide.image.src}
          alt=""
          fill
          preload={view.index === 0 && view.previousIndex === null}
          sizes="100vw"
          className="hero-carousel-image hero-carousel-image-active"
        />
      </div>
      <div className="hero-shade" />

      <div className="shell hero-content">
        <div
          className="hero-slides"
          onFocusCapture={() => setHasSlideFocus(true)}
          onBlurCapture={handleSlideFocusOut}
        >
          {slides.map((slide, index) => {
            const isActive = index === view.index;

            return (
              <div
                key={slide.id}
                className={`hero-slide-copy${isActive ? " hero-slide-copy-active" : ""}`}
                role={isActive ? "group" : undefined}
                aria-roledescription={isActive ? "slide" : undefined}
                aria-label={isActive ? `${index + 1} of ${slides.length}` : undefined}
                aria-hidden={isActive ? undefined : true}
                inert={!isActive}
              >
                <p className="eyebrow eyebrow-light">{slide.eyebrow}</p>
                <h2 className="hero-title">{slide.heading}</h2>
                <p className="hero-intro">{slide.description}</p>
                <div className="hero-actions">
                  {slide.actions.map((action) => action.type === "reservation" ? (
                    <ReservationAction
                      key={`${slide.id}-${action.type}`}
                      bookingUrl={bookingUrl}
                      className="button button-amber"
                    >
                      {action.label}
                    </ReservationAction>
                  ) : (
                    <Link
                      key={`${slide.id}-${action.href}`}
                      href={action.href}
                      className="button button-outline"
                    >
                      {action.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="hero-carousel-controls" aria-label="Carousel controls">
          <button
            type="button"
            className="hero-carousel-control"
            aria-label="Show previous slide and pause autoplay"
            onClick={() => setSlide(view.index - 1, true)}
          >
            <ChevronIcon className="icon" />
          </button>
          <div className="hero-carousel-indicators" aria-label="Choose a slide">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                className="hero-carousel-indicator"
                aria-label={`Show slide ${index + 1}: ${slide.heading}`}
                aria-current={index === view.index ? "true" : undefined}
                onClick={() => setSlide(index, true)}
              >
                <span />
              </button>
            ))}
          </div>
          <button
            type="button"
            className="hero-carousel-control hero-carousel-next"
            aria-label="Show next slide and pause autoplay"
            onClick={() => setSlide(view.index + 1, true)}
          >
            <ChevronIcon className="icon" />
          </button>
          <button
            type="button"
            className="hero-carousel-control"
            aria-label={autoplayRequested ? "Pause carousel autoplay" : "Play carousel autoplay"}
            onClick={() => setView((current) => ({
              ...current,
              autoplayIntent: isAutoplayRequested(
                current.autoplayIntent,
                prefersReducedMotion,
              ) ? "paused" : "playing",
            }))}
          >
            {autoplayRequested ? <PauseIcon className="icon" /> : <PlayIcon className="icon" />}
          </button>
        </div>
      </div>

      <ImageCredit />
      <a className="hero-scroll" href="#story"><span>Discover</span><i /></a>
    </section>
  );
}
