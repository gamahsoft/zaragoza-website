# Zaragoza Restaurant & Bar Website

A responsive customer-review prototype for Zaragoza Restaurant & Bar in Houston, Texas. This repository covers the Phase 1 website foundation only. Phase 2 capabilities are documented for future planning and are not implemented.

## Run locally

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Additional checks:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Routes and architecture

- `/` — homepage with story, food and bar, private dining preview, and visit sections
- `/menus` — structured sample food and beverage categories
- `/about` — proposed Zaragoza story and experience
- `src/content/` — typed, file-backed identity, navigation, hero-slide, page, image, and menu content
- `src/lib/content.ts` — intentionally small content-access boundary that can later be backed by a CMS
- `src/config/integrations.ts` — OpenTable URL validation, kept separate from presentation
- `src/components/` — shared header, footer, navigation, dialog, and visual primitives

Server Components are the default. Client JavaScript is limited to the accessible homepage carousel, mobile navigation, and reservation dialog. No database, authentication, CMS, analytics, ordering, payments, maps, advertising, or third-party widget is loaded.

## Editing content

Restaurant identity and navigation live in `src/content/site.ts`. Homepage carousel slides live in `src/content/hero-slides.ts`; other page copy lives in `src/content/pages.ts`; sample dishes live in `src/content/menu.ts`. Each carousel slide has a stable ID, image metadata, copy, and typed reservation or internal-link actions. Menu items use stable IDs and optional integer `priceMinorUnits`; omit that field until a price is approved.

The content-access functions in `src/lib/content.ts` are the future CMS boundary. A CMS can replace the file-backed slide source later without moving timer, gesture, or accessibility behavior out of `src/components/hero-carousel.tsx`.

Replace prototype copy only with customer-approved text. Exact address, phone, hours, social links, opening details, and menu prices intentionally remain unset.

## Replacing images

Images are in `public/images/`; their dimensions and alt text are in `src/content/site.ts`, and carousel assignments are in `src/content/hero-slides.ts`. Replace an asset with an appropriately licensed, optimized local file, update its metadata if dimensions or subject change, and review every slide that references it. Preserve meaningful alt text. Do not place important page text inside images.

All current photographs are original AI-generated placeholders created for this prototype. They have no external attribution requirement and must be replaced or explicitly approved before launch. See `docs/image-sources.md`.

## Homepage carousel behavior

The carousel shows one slide at a time and starts a five-second autoplay cycle unless the visitor prefers reduced motion. Hover from a real hover-capable fine pointer, keyboard focus within the carousel, an open site dialog, or a hidden browser tab pauses the timer temporarily; touch interaction does not activate the hover pause. Previous/next controls, indicators, horizontal swipes, and an explicit Pause action keep autoplay off until the visitor presses Play. Slide changes never move keyboard focus or use a live region, and inactive slide actions are inert and hidden from assistive technology. Reduced-motion mode starts paused and removes the crossfade through CSS.

Only the initial image is preloaded. Later slide images enter the optimized Next.js image pipeline when needed, and the initial slide remains useful in server-rendered HTML before the carousel hydrates.

## OpenTable configuration

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_OPENTABLE_URL` only to Zaragoza's verified HTTPS listing on `opentable.com` or `www.opentable.com`:

```text
NEXT_PUBLIC_OPENTABLE_URL=https://www.opentable.com/r/verified-zaragoza-listing
```

If missing or invalid, reservation actions open an accessible preview dialog. A configured link opens safely in a new tab. Never use another restaurant's URL. Because this variable is public, it must contain no token or secret.

## Prototype safeguards

- Every route is `noindex, nofollow` until launch approval.
- Sample copy, images, dishes, and incomplete business details are visibly disclosed.
- No structured restaurant data is emitted while facts remain unverified.
- No reservation or private-event inquiry is falsely submitted.

## Validation

Completed on October 17, 2026:

- `npm run typecheck` — passed
- `npm run lint` — passed with no warnings
- `npm test` — passed 8/8 carousel behavior and OpenTable URL validation tests
- `npm run build` — passed; Home, Menus, About, favicon, and not-found output were statically generated
- Local HTTP review — Home, Menus, About, favicon, and all four images returned 200; internal route and homepage anchor targets were present
- `npm audit --omit=dev` — 0 production vulnerabilities

Automated visual viewport and keyboard interaction checks remain pending because no controllable browser was available in the development environment. Manually review 360×640, 390×844, tablet, desktop, landscape, and 200% zoom layouts; carousel swipe versus vertical scrolling; hidden-slide tab exclusion; pause/play and temporary pauses; mobile-menu focus/Escape behavior; reservation-dialog opening, dismissal, and focus restoration; sticky header and homepage anchors; and final image crops before approval. The Radix Dialog primitive supplies focus containment, Escape dismissal, and opener-focus restoration for both interactive overlays.

The full development audit reports five high-severity advisories in a transitive glob parser used by `eslint-config-next`; npm offers no non-breaking current fix and the affected chain is development-only. Do not apply the suggested forced downgrade to Next 14. Re-check when Next's lint dependencies update.

Known content limitations and customer needs are tracked in `docs/content-checklist.md`; future-scope decisions are tracked in `docs/phase-2-roadmap.md`.
