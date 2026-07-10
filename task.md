# BlueBlocks Performance Optimization — Task List

## Phase 1 — Critical Image Compression
- [x] Write `scripts/compress-gallery.js` using sharp to compress src/assets and public oversized images
- [x] Run compression script
- [x] Add missing cache rules for root-level images in `public/_headers`

## Phase 2 — LCP Optimization
- [x] Add `fetchpriority="high"` to Hero LCP image
- [x] Add hero image preload link in home page metadata

## Phase 3 — CLS Fixes
- [x] Fix `StaticImageBanner.js` — replace fixed pixel height with aspect-ratio wrapper
- [x] Clean up `src/app/layout.js` (remove old GA4, Google Ads gtag, GoogleConversions import & component)
- [x] Delete `src/components/GoogleConversions.js`
- [x] Fix `NavigationLoader.js` — ensure it uses fixed positioning with zero layout impact

## Phase 4 — JavaScript Bundle Optimization
- [x] Remove framer-motion from `WhatsAppFloat.js` → pure CSS animation
- [x] Clean up `src/components/ui/WhatsAppFloat.js` (remove manual conversion event trigger)
- [x] Remove framer-motion `AnimatePresence`/`motion.div` from `Header.js` → CSS transitions
- [x] Move lightbox CSS import from `global.css` into `InnovationGallery` component
- [x] Add `"type": "module"` to `package.json`

## Phase 5 — Rendering Strategy
- [x] Split `Footer.js` into server shell + client newsletter form component

## Phase 6 — Font Optimization
- [x] Remove Poppins weight 300 if unused
- [x] Add `adjustFontFallback: true` to Poppins config in `layout.js`

## Phase 7 — SEO / Meta Fixes
- [x] Create proper OG image (1200×630) for home page
- [x] Update OG image URL in `page.js` to `.webp`

## Phase 8 — Accessibility Improvements
- [x] Add `sizes` prop to Images in `ImpactCollageSplit.js`
- [x] Add `sizes` prop to person profile images in `FoundersGuides.js`

## Phase 9 — CSS Quality
- [x] Remove duplicate `bb-hero-title`/`bb-hero-subtitle` block in `global.css`
- [x] Fix CSS typo `----bb-body-size` → `--bb-body-size` in `.bb-card-text`
- [x] Add `prefers-reduced-motion` overrides for float animations

## Phase 10 — Build Config
- [x] Enable React Compiler in `next.config.mjs`
- [x] Clean up redundant empty strings from `next.config.mjs`

## Final
- [x] Run `npm run build` to verify full build succeeds
- [x] Update walkthrough.md
