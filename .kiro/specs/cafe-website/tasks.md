# Implementation Plan: Cafe Website

## Overview

Incremental build of a React + Vite + TypeScript + Tailwind CSS + Framer Motion cafe website. No backend — orders and reservations go via WhatsApp deep links; newsletter posts to Google Apps Script. Each task builds on the previous and ends with working, integrated code. Testing sub-tasks use fast-check (property-based) and Vitest + React Testing Library (unit/component).

---

## Tasks

- [x] 1. Project scaffolding, design tokens, and routing
  - Scaffold with `npm create vite@latest` using React + TypeScript template
  - Install dependencies: `tailwindcss`, `framer-motion`, `qrcode`, `fast-check`, `@testing-library/react`, `vitest`, `jsdom`
  - Configure `tailwind.config.ts` with custom color tokens (`espresso`, `cream`, `amber`, `matcha`, `offwhite`) and font families (Bricolage Grotesque, DM Sans)
  - Add `src/styles/tokens.css` with CSS custom properties matching Tailwind tokens
  - Configure `vite.config.ts` for path aliases (`@/` → `src/`) and Vitest with jsdom environment
  - Set up React Router v6 with routes: `/` (Home), `/menu` (Menu page), `/admin/qr` (AdminQR)
  - Create `index.html` with Google Fonts preconnect, title, meta description, Open Graph tags, and Restaurant JSON-LD schema (placeholder values)
  - Create `public/sitemap.xml` and `public/robots.txt`
  - Create `.env.example` documenting all `VITE_*` variables
  - _Requirements: 14.7, 14.8, 14.9_

- [-] 2. Static data layer and core utilities
  - [x] 2.1 Create static data files
    - `src/data/menu.ts` — `MenuItem[]` with 12–16 items across Coffee, Food, Desserts, Beverages categories; include 3–5 flagged `isSignature`, 1–2 `isSoldOut`
    - `src/data/events.ts` — `CafeEvent[]` with 3 upcoming + 1 past event
    - `src/data/testimonials.ts` — 6 static testimonials with name, text, rating (1–5)
    - `src/data/instagramPosts.ts` — 9 static entries with `imageUrl` and `postUrl`
    - `src/data/config.ts` — typed `VITE_*` env var exports
    - `src/data/hours.ts` — `DayHours[]` for a typical 7-day cafe schedule
    - _Requirements: 9.1, 10.1, 6.1_

  - [x] 2.2 Implement WhatsApp utilities (`src/utils/whatsapp.ts`)
    - `buildOrderMessage(items, tableId)` — itemized list with totals, table number if present
    - `buildReservationMessage(name, partySize, datetime, notes)` — structured reservation text
    - `openWhatsApp(phoneNumber, message)` — encodes and navigates to `wa.me` URL
    - _Requirements: 2.9, 8.2_

  - [ ]* 2.3 Write property tests for WhatsApp utilities
    - **Property 1: Order message contains all item names and table ID**
    - **Validates: Requirements 2.9, 2.7**
    - **Property 2: Reservation message contains all field values**
    - **Validates: Requirements 8.2**
    - **Property 11: Cart total in summary equals total in order message**
    - **Validates: Requirements 2.9**

  - [x] 2.4 Implement validation utilities (`src/utils/validation.ts`)
    - `isValidEmail(value)`, `isValidPhone(value)`, `isNonEmpty(value)`
    - _Requirements: 8.3, 11.5_

  - [ ]* 2.5 Write property tests for validation utilities
    - **Property 8: isValidEmail rejects strings without @ and .**
    - **Validates: Requirements 11.5**
    - **Property 9: isNonEmpty returns false for all-whitespace strings**
    - **Validates: Requirements 8.3, 11.5**

  - [x] 2.6 Implement open status utility (`src/utils/openStatus.ts`)
    - Pure function `computeOpenStatus(hours, now)` — returns `{ isOpen, label }`
    - _Requirements: 7.2_

  - [ ]* 2.7 Write property test for open status
    - **Property 7: computeOpenStatus is deterministic for same inputs**
    - **Validates: Requirements 7.2**

- [-] 3. Core hooks
  - [x] 3.1 Implement `useCart` hook (`src/hooks/useCart.ts`)
    - Manages `Map<string, CartItem>` state; exposes `addItem`, `removeItem`, `clear`, `total`, `items`
    - `addItem` increments quantity if item already in cart
    - _Requirements: 2.8, 2.9, 2.10_

  - [ ]* 3.2 Write property tests for useCart
    - **Property 3: add → contains round trip for non-sold-out items**
    - **Validates: Requirements 2.8**
    - **Property 4: empty cart blocks send action**
    - **Validates: Requirements 2.10**

  - [x] 3.3 Implement `useTableId` hook (`src/hooks/useTableId.ts`)
    - Reads `?table` query param from URL on mount; returns `string | null`
    - _Requirements: 2.7_

  - [x] 3.4 Implement `useOpenStatus` hook (`src/hooks/useOpenStatus.ts`)
    - Wraps `computeOpenStatus` with a 1-minute polling interval
    - _Requirements: 7.2_

  - [x] 3.5 Implement `useReducedMotion` hook (`src/hooks/useReducedMotion.ts`)
    - Wraps Framer Motion's `useReducedMotion`; re-exports as project hook
    - _Requirements: 1.5, 3.4, 6.4, 14.6_

- [ ] 4. Checkpoint — utilities and hooks
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Layout shell: Navbar, Footer, and StickyBar
  - [x] 5.1 Implement `Navbar` component (`src/components/layout/Navbar.tsx`)
    - Transparent on hero, transitions to filled background on scroll
    - Links to all page sections via smooth scroll
    - Hamburger menu on mobile (≤768px)
    - _Requirements: 13.2_

  - [x] 5.2 Implement `StickyBar` component (`src/components/layout/StickyBar.tsx`)
    - Visible only on mobile viewport (Tailwind `md:hidden`)
    - Three actions: Call (tel: link), Directions (Google Maps deep link), Order Now (scroll to menu)
    - 44px minimum tap target height
    - _Requirements: 13.1, 13.2, 13.3_

  - [x] 5.3 Implement `Footer` component (`src/components/layout/Footer.tsx`)
    - Cafe name, address, phone, social links, copyright
    - _Requirements: 14.3_

  - [x] 5.4 Wire layout into `App.tsx`
    - Wrap all routes with `Navbar` + `Footer`; render `StickyBar` globally
    - _Requirements: 13.2_

- [-] 6. Hero section
  - [x] 6.1 Implement `HeroSection` component (`src/components/hero/HeroSection.tsx`)
    - Full-viewport `<video>` with autoplay, muted, loop, playsInline, and poster fallback image
    - Overlay with cafe tagline (Bricolage Grotesque), "View Menu" and "Visit Us" CTAs
    - Variable-font weight-morph entrance animation using Framer Motion (thin → bold)
    - Disable all animations when `useReducedMotion` returns true
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

  - [ ]* 6.2 Write component test for HeroSection
    - Verify CTAs render; verify animation class absent when reduced-motion is mocked
    - _Requirements: 1.5_

- [x] 7. Menu section
  - [x] 7.1 Implement menu filter logic (`src/utils/menuFilter.ts`)
    - `filterByCategory(items, category)` — returns items matching category or all if "All"
    - `filterBySearch(items, query)` — case-insensitive name+description match
    - _Requirements: 2.1, 2.2_

  - [ ]* 7.2 Write property tests for menu filter
    - **Property 5: Search results are a subset and each matches the query**
    - **Validates: Requirements 2.2**
    - **Property 6: Category filter — every result belongs to the selected category**
    - **Validates: Requirements 2.1**

  - [x] 7.3 Implement `MenuItemCard` component (`src/components/menu/MenuItemCard.tsx`)
    - Displays name, price, description (truncated; tap to expand on mobile), image (WebP, lazy), category
    - "Add to order" button — disabled + "Sold Out" tag when `isSoldOut` is true
    - Hover-zoom on image (desktop only via `@media (hover: hover)`)
    - _Requirements: 2.3, 2.4, 2.6_

  - [x] 7.4 Implement `CategoryTabs` component (`src/components/menu/CategoryTabs.tsx`)
    - Horizontal tab row; swipeable on mobile (CSS `overflow-x: auto`, `-webkit-overflow-scrolling: touch`)
    - Smooth active-tab indicator transition (Framer Motion `layoutId`)
    - 44px tap targets
    - _Requirements: 2.1, 2.5_

  - [x] 7.5 Implement `CartPanel` component (`src/components/menu/CartPanel.tsx`)
    - Sliding drawer on mobile, sidebar on desktop
    - Lists cart items with quantity controls and remove buttons
    - "Send Order via WhatsApp" button — disabled and shows validation message when cart is empty
    - Uses `useCart`, `useTableId`, `buildOrderMessage`, `openWhatsApp`
    - _Requirements: 2.8, 2.9, 2.10_

  - [x] 7.6 Implement `MenuSection` / `Menu.tsx` page
    - Composes `CategoryTabs`, search bar, `MenuItemCard` grid, `CartPanel`
    - Reads `?table` via `useTableId` on mount
    - _Requirements: 2.1, 2.2, 2.7, 2.8_

  - [ ]* 7.7 Write component tests for Menu
    - Search interaction updates visible cards
    - Category tab switch updates visible cards
    - Add-to-cart increments cart count
    - Empty cart blocks WhatsApp send
    - _Requirements: 2.1, 2.2, 2.8, 2.10_

- [x] 8. Signature Items Showcase
  - [x] 8.1 Implement `SignatureShowcase` component (`src/components/menu/SignatureShowcase.tsx`)
    - Reads `isSignature` items from menu data (3–5 items)
    - Larger card treatment with image-reveal and staggered Framer Motion `whileInView` animations
    - Disable animations when `useReducedMotion` is true
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 9. Photo Gallery
  - [x] 9.1 Implement `GalleryImage` component (`src/components/gallery/GalleryImage.tsx`)
    - `<img>` with `loading="lazy"`, low-quality blur-up via CSS transition on load
    - `srcSet` with multiple WebP sizes; `onerror` fallback to placeholder
    - _Requirements: 4.3, 4.4_

  - [x] 9.2 Implement `MasonryGrid` component (`src/components/gallery/MasonryGrid.tsx`)
    - CSS columns-based masonry layout (2 columns mobile, 3 desktop)
    - Renders `GalleryImage` for each photo; triggers `onOpen` on click/tap
    - _Requirements: 4.1_

  - [x] 9.3 Implement `Lightbox` component (`src/components/gallery/Lightbox.tsx`)
    - Full-viewport overlay; renders full-size image
    - Closes on Escape keypress and on overlay click
    - Focus-trapped while open; restores focus on close
    - _Requirements: 4.2, 4.5, 14.4_

  - [x] 9.4 Wire gallery into `GallerySection` (`src/components/gallery/GallerySection.tsx`)
    - Manages lightbox open/close state; passes selected image to `Lightbox`
    - _Requirements: 4.1, 4.2_

- [x] 10. About, Reviews, and Events sections
  - [x] 10.1 Implement `AboutSection` component (`src/components/AboutSection.tsx`)
    - Founder story text + optional portrait image
    - No statistics, counters, or placeholder metrics
    - _Requirements: 5.1, 5.2_

  - [x] 10.2 Implement `ReviewsCarousel` component (`src/components/reviews/ReviewsCarousel.tsx`)
    - Auto-scrolling CSS marquee or Framer Motion infinite loop
    - Pause on hover (pointer) and touch (touch events)
    - Star rating display (1–5 filled stars)
    - Falls back to static list when `useReducedMotion` is true
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [x] 10.3 Implement `EventsSection` component (`src/components/events/EventsSection.tsx`)
    - Renders event cards from `events.ts`; shows empty-state message when array is empty
    - Each card: event name, date (formatted), optional description and image
    - _Requirements: 10.1, 10.2, 10.3_

- [x] 11. Location section
  - [x] 11.1 Implement `LocationSection` component (`src/components/location/LocationSection.tsx`)
    - Google Maps `<iframe>` embed using `MAPS_EMBED_URL`; fallback address text on iframe error
    - `useOpenStatus` to display "Open Now" / "Closed" badge
    - Parking info text block
    - "Get Directions" button linking to `https://maps.google.com/?q=<address>`
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [-] 12. Ordering and Reservation
  - [x] 12.1 Implement `ReservationForm` component (`src/components/ReservationForm.tsx`)
    - Fields: name (required), party size (required, number), date/time (required), notes (optional)
    - Inline validation using `isNonEmpty`; focus first invalid field on failed submit
    - On valid submit: calls `buildReservationMessage` + `openWhatsApp`
    - _Requirements: 8.1, 8.2, 8.3_

  - [ ]* 12.2 Write component tests for ReservationForm
    - Missing required fields show inline errors
    - Valid submission generates correct WhatsApp link
    - _Requirements: 8.2, 8.3_

  - [x] 12.3 Implement click-to-call button in `Footer` and `StickyBar`
    - `<a href="tel:VITE_CAFE_PHONE_NUMBER">` with visible phone icon
    - _Requirements: 8.4_

- [ ] 13. Checkpoint — all sections integrated
  - Ensure all tests pass, ask the user if questions arise.

- [x] 14. Newsletter signup
  - [x] 14.1 Implement `NewsletterForm` component (`src/components/newsletter/NewsletterForm.tsx`)
    - Fields: email (optional) and phone (optional); at least one required
    - Validates with `isValidEmail` / `isValidPhone`
    - `fetch` POST to `SHEET_SCRIPT_URL` with JSON body
    - Shows success confirmation on 2xx; shows retry-able error banner on failure
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

  - [ ]* 14.2 Write component tests for NewsletterForm
    - Submit with no valid input shows validation error
    - Successful fetch shows confirmation
    - Failed fetch shows error with retry
    - _Requirements: 11.3, 11.4, 11.5_

- [x] 15. Social section
  - [x] 15.1 Implement `SocialSection` component (`src/components/social/SocialSection.tsx`)
    - Static 3×3 Instagram grid; each image is an `<a>` linking to `postUrl`
    - No OAuth, no live API calls
    - Zomato and Swiggy deep links as styled secondary buttons
    - _Requirements: 9.1, 9.2, 9.3_

- [-] 16. QR code admin page
  - [x] 16.1 Implement `AdminQR.tsx` page (`src/pages/AdminQR.tsx`)
    - Number input for table count (default from `TABLE_COUNT` env var)
    - Renders a grid of QR codes using the `qrcode` package (canvas-based)
    - Each QR encodes `<origin>/menu?table=<n>`; overlays cafe logo at center
    - "Download All as ZIP" button uses JSZip + FileSaver (or equivalent) to batch-export PNGs
    - Individual per-table download button
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

  - [ ]* 16.2 Write property test for QR URL encoding
    - **Property 10: QR URL for table n equals `<origin>/menu?table=<n>`**
    - **Validates: Requirements 12.2**

- [x] 17. CSS steam effect
  - Implement a CSS-only animated steam effect (`src/components/effects/SteamEffect.tsx`)
  - Uses `@keyframes` with translate + opacity — no canvas, no heavy libraries
  - Applied near coffee imagery in the Hero and Signature sections
  - Disabled via `prefers-reduced-motion: reduce` media query in CSS
  - _Requirements: 14.6_

- [-] 18. Performance and SEO hardening
  - [x] 18.1 Verify and finalize `index.html` meta tags and JSON-LD schema
    - Fill in real cafe name, address, phone, opening hours in Restaurant schema
    - Add canonical URL, og:image with correct dimensions
    - _Requirements: 14.7, 14.8_

  - [ ] 18.2 Audit image pipeline
    - Confirm all images in `public/images/` are WebP with `loading="lazy"` and `srcSet`
    - Add `width`/`height` attributes to prevent CLS
    - _Requirements: 14.1, 14.2_

  - [ ] 18.3 Add keyboard focus styles
    - Custom Tailwind `focus-visible:ring` styles applied to all interactive elements
    - Verify no element loses native focus outline without replacement
    - _Requirements: 14.4, 14.5_

  - [ ] 18.4 Verify responsive layout at 360px viewport
    - Test all sections at 360px width; fix any overflow or broken layout
    - _Requirements: 14.3_

- [x] 19. Final checkpoint — full site wiring
  - Wire all sections into `Home.tsx` in correct order: Hero → SignatureShowcase → MenuSection → GallerySection → AboutSection → ReviewsCarousel → LocationSection → EventsSection → NewsletterForm → SocialSection
  - Verify React Router routes: `/` renders Home, `/menu` renders Menu page, `/admin/qr` renders AdminQR
  - Ensure `StickyBar` is visible and functional on all routes at mobile viewport
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Property tests require a minimum of 100 fast-check iterations per test
- Each property test must include the comment: `// Feature: cafe-website, Property <N>: <description>`
- All images must be provided as WebP; placeholder images can use picsum.photos during development
- `VITE_WHATSAPP_NUMBER` format: country code + number, no `+` or spaces (e.g., `911234567890`)
- The `/admin/qr` route is intentionally unprotected in V1 — the cafe owner accesses it directly
