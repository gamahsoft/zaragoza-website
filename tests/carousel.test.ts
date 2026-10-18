import assert from "node:assert/strict";
import test from "node:test";
import {
  getManualCarouselState,
  getAutoplayPauseReason,
  isAutoplayRequested,
  shouldPauseForPointerHover,
  shouldRunAutoplay,
  wrapSlideIndex,
} from "../src/lib/carousel";

test("wraps carousel navigation in both directions", () => {
  assert.equal(wrapSlideIndex(3, 3), 0);
  assert.equal(wrapSlideIndex(-1, 3), 2);
  assert.equal(wrapSlideIndex(1, 3), 1);
});

test("manual navigation keeps autoplay paused", () => {
  assert.deepEqual(
    getManualCarouselState({ index: 0, autoplayIntent: "playing" }, 1, 3),
    { index: 1, autoplayIntent: "paused" },
  );
  assert.deepEqual(
    getManualCarouselState({ index: 1, autoplayIntent: "paused" }, 3, 3),
    { index: 0, autoplayIntent: "paused" },
  );
});

test("default autoplay intent follows the resolved motion preference", () => {
  assert.equal(isAutoplayRequested("default", true), false);
  assert.equal(isAutoplayRequested("default", false), true);
  assert.equal(isAutoplayRequested("playing", true), true);
  assert.equal(isAutoplayRequested("paused", false), false);
});

test("hover pauses only for a real hover-capable fine pointer", () => {
  assert.equal(shouldPauseForPointerHover(true, "mouse"), true);
  assert.equal(shouldPauseForPointerHover(true, "pen"), true);
  assert.equal(shouldPauseForPointerHover(true, "touch"), false);
  assert.equal(shouldPauseForPointerHover(false, "mouse"), false);
});

test("Play resumes rotation after temporary pause conditions clear", () => {
  const runningStatus = {
    browserPreferencesResolved: true,
    autoplayIntent: "playing" as const,
    prefersReducedMotion: false,
    slideCount: 3,
    isHovered: false,
    hasSlideFocus: false,
    isDialogOpen: false,
    isDocumentHidden: false,
  };

  assert.equal(shouldRunAutoplay({ ...runningStatus, hasSlideFocus: true }), false);
  assert.equal(shouldRunAutoplay(runningStatus), true);
  assert.equal(shouldRunAutoplay({ ...runningStatus, autoplayIntent: "paused" }), false);
});

test("reports preference initialization and active pause reasons", () => {
  const ready = {
    browserPreferencesResolved: true,
    autoplayIntent: "default" as const,
    prefersReducedMotion: false,
    slideCount: 3,
    isHovered: false,
    hasSlideFocus: false,
    isDialogOpen: false,
    isDocumentHidden: false,
  };

  assert.equal(
    getAutoplayPauseReason({ ...ready, browserPreferencesResolved: false }),
    "preferences-pending",
  );
  assert.equal(getAutoplayPauseReason(ready), null);
  assert.equal(
    getAutoplayPauseReason({ ...ready, prefersReducedMotion: true }),
    "reduced-motion",
  );
  assert.equal(getAutoplayPauseReason({ ...ready, isDialogOpen: true }), "dialog-open");
  assert.equal(
    getAutoplayPauseReason({ ...ready, hasSlideFocus: true }),
    "slide-content-focus",
  );
});
