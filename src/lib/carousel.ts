export type AutoplayIntent = "default" | "playing" | "paused";

export type CarouselState = {
  index: number;
  autoplayIntent: AutoplayIntent;
};

export type AutoplayPauseConditions = {
  isHovered: boolean;
  hasSlideFocus: boolean;
  isDialogOpen: boolean;
  isDocumentHidden: boolean;
};

export type AutoplayStatus = AutoplayPauseConditions & {
  browserPreferencesResolved: boolean;
  autoplayIntent: AutoplayIntent;
  prefersReducedMotion: boolean;
  slideCount: number;
};

export type AutoplayPauseReason =
  | "preferences-pending"
  | "reduced-motion"
  | "user-paused"
  | "document-hidden"
  | "dialog-open"
  | "slide-content-focus"
  | "fine-pointer-hover"
  | "insufficient-slides";

export function wrapSlideIndex(index: number, slideCount: number) {
  if (slideCount <= 0) return 0;
  return ((index % slideCount) + slideCount) % slideCount;
}

export function getManualCarouselState(
  state: CarouselState,
  requestedIndex: number,
  slideCount: number,
): CarouselState {
  return {
    index: wrapSlideIndex(requestedIndex, slideCount),
    autoplayIntent: "paused",
  };
}

export function isAutoplayRequested(
  autoplayIntent: AutoplayIntent,
  prefersReducedMotion: boolean,
) {
  if (autoplayIntent === "playing") return true;
  if (autoplayIntent === "paused") return false;
  return !prefersReducedMotion;
}

export function shouldPauseForPointerHover(
  supportsFinePointerHover: boolean,
  pointerType: string,
) {
  return supportsFinePointerHover && pointerType !== "touch";
}

export function getAutoplayPauseReason(status: AutoplayStatus): AutoplayPauseReason | null {
  if (!status.browserPreferencesResolved) return "preferences-pending";
  if (status.slideCount < 2) return "insufficient-slides";
  if (status.autoplayIntent === "paused") return "user-paused";
  if (status.autoplayIntent === "default" && status.prefersReducedMotion) {
    return "reduced-motion";
  }
  if (status.isDocumentHidden) return "document-hidden";
  if (status.isDialogOpen) return "dialog-open";
  if (status.hasSlideFocus) return "slide-content-focus";
  if (status.isHovered) return "fine-pointer-hover";
  return null;
}

export function shouldRunAutoplay(status: AutoplayStatus) {
  return getAutoplayPauseReason(status) === null;
}
