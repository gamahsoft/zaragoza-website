# Prototype Image Sources

The images below were generated specifically for this prototype with OpenAI's built-in image generation tool on October 17, 2026. They are locally stored, contain no borrowed Bulla Gastrobar assets, and require no external photographer attribution. They remain sample imagery and should be replaced with approved Zaragoza photography before launch.

| File | Prototype use | Generation summary |
|---|---|---|
| `public/images/zaragoza-shared-table-hero.webp` | Homepage hero | Candlelit Spanish-inspired shared table with paella, warm amber bar light, dark negative space for page copy |
| `public/images/zaragoza-dining-room.webp` | Home story and About hero | Contemporary navy-and-brass dining room with a long set table and indistinct guests |
| `public/images/zaragoza-small-plates.webp` | Food feature and Menus hero | Overhead Spanish-inspired small plates on warm stone |
| `public/images/zaragoza-cocktails.webp` | Bar feature | Garnet and golden cocktails on a dark stone bar |

All prompts specified: original imagery, no logos, no readable text, no watermarks, and no copied restaurant design. Full image metadata and visitor-facing alt text live in `src/content/site.ts`.

## Replacement process

1. Confirm usage rights and record the source, creator, license, and any attribution requirement.
2. Export an optimized WebP or AVIF at sufficient dimensions for the intended crop.
3. Replace the local file or add a new meaningful filename under `public/images/`.
4. Update `src/content/site.ts` with the file path, intrinsic dimensions, and accurate alt text.
5. Review focal cropping at phone, tablet, and desktop sizes and re-run the production build.
