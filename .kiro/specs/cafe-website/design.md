# Design Document: Cafe Website

## Overview

A mobile-first, animation-rich React + Vite website for an independent cafe. The site operates without a backend — all ordering and reservation flows use WhatsApp deep links, and newsletter signups post to a Google Apps Script endpoint. The architecture is intentionally static/client-side to minimize operational overhead while delivering a premium, distinctive feel.

The tech stack is:
- **React 18 + Vite** — fast dev experience, code splitting out of the box
- **Tailwind CSS** — utility-first styling with a small custom design token layer
- **Framer Motion** — declarative animation with `useReducedMotion` support
- **qrcode** npm package — client-side QR PNG generation
- **Google Fonts** — Bricolage Grotesque (display) + DM Sans (body)

Deployment target is Vercel free tier. All secrets are Vite environment variables (`VITE_*`).

---

## Architecture

```
cafe-website/
├── public/
│   ├── images/           # static WebP gallery & menu images
│   ├── sitemap.xml
│   └── robots.txt
├── src/
│   ├── assets/           # logo, hero video fallback
│   ├── components/       # shared UI components
│   │   ├── layout/       # Navbar, StickyBar, Footer
│   │   ├── hero/
│   │   ├── menu/
│   │   ├── gallery/
│   │   ├── reviews/
│   │   ├── location/
│   │   ├── events/
│   │   ├── newsletter/
│   │   ├── social/
│   │   └── qr/
│   ├── data/             # static data files (menu, events, testimonials, etc.)
│   ├── hooks/            # useCart, useTableId, useOpenStatus, useReducedMotion
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Menu.tsx      # /menu?table=<id>
│   │   └── AdminQR.tsx   # /admin/qr
│   ├── utils/
│   │   ├── whatsapp.ts   # WhatsApp link builders
│   │   ├── openStatus.ts # compute open/closed from hours
│   │   └── validation.ts # form validators
│   ├── styles/
│   │   └── tokens.css    # CSS custom properties for design tokens
│   ├── App.tsx
│   └── main.tsx
├── index.html            # SEO meta tags + JSON-LD schema
├── vite.config.ts
└── tailwind.config.ts
```

### Data Flow

```
Customer Browser
      │
      ├─ Static assets served from Vercel CDN
      │
      ├─ Cart state: in-memory React state (useCart hook)
      │
      ├─ Order/Reservation: builds wa.me URL → opens native WhatsApp
      │
      └─ Newsletter: fetch POST → Google Apps Script → Google Sheet
```

No database, no auth, no server-side rendering required.

---

## Components and Interfaces

### Design Tokens

Defined as Tailwind config extensions and CSS custom properties:

```ts
// tailwind.config.ts
colors: {
  espresso:  '#1C1008',
  cream:     '#F5ECD7',
  amber:     '#C4622D',
  matcha:    '#7D9E6E',
  offwhite:  '#EDE8DF',
}
```

### Core Hooks

```ts
// useTableId — reads ?table=<id> from URL, stable across re-renders
function useTableId(): string | null

// useCart — manages in-memory order cart
interface CartItem { id: string; name: string; price: number; qty: number }
function useCart(): {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  total: number;
}

// useOpenStatus — returns live open/closed status
function useOpenStatus(hours: DayHours[]): { isOpen: boolean; label: string }

// useReducedMotion — wraps Framer Motion's useReducedMotion
function useReducedMotion(): boolean
```

### WhatsApp Utilities

```ts
// whatsapp.ts
function buildOrderMessage(items: CartItem[], tableId: string | null): string
// Returns: "🛒 Order from Table 4\n• Espresso x2 – ₹180\n• Croissant x1 – ₹120\nTotal: ₹300"

function buildReservationMessage(name: string, partySize: number, datetime: string, notes: string): string
// Returns: "📅 Reservation Request\nName: [name]\nParty: [n]\nTime: [datetime]\nNotes: [notes]"

function openWhatsApp(phoneNumber: string, message: string): void
// Navigates to: https://wa.me/<phoneNumber>?text=<encoded message>
```

### Validation Utilities

```ts
// validation.ts
function isValidEmail(value: string): boolean
function isValidPhone(value: string): boolean
function isNonEmpty(value: string): boolean   // trims whitespace
```

### Key Page Components

**Home.tsx** — Composes all sections in order:
`Hero → SignatureItems → Menu (preview) → Gallery → About → Reviews → Location → Events → Newsletter → Social`

**Menu.tsx / MenuSection** — Category tabs + search bar + item grid + cart panel. Reads `?table` param on mount.

**AdminQR.tsx** — `/admin/qr` page. Input for number of tables, renders downloadable QR PNGs.

### Menu Data Shape

```ts
interface MenuItem {
  id: string;
  name: string;
  price: number;           // in local currency units (integer)
  description: string;
  image: string;           // path to WebP asset
  category: string;
  isSoldOut?: boolean;
  isSignature?: boolean;
}
```

### Event Data Shape

```ts
interface CafeEvent {
  id: string;
  name: string;
  date: string;            // ISO date string
  description?: string;
  image?: string;
}
```

### Operating Hours Shape

```ts
interface DayHours {
  day: number;             // 0 = Sunday, 6 = Saturday
  open: string;            // "08:00"
  close: string;           // "22:00"
}
```

---

## Data Models

### Static Data Files

All content lives in `src/data/`:

- `menu.ts` — array of `MenuItem[]` with placeholder items across categories (Coffee, Food, Desserts, Beverages)
- `events.ts` — array of `CafeEvent[]` (3–5 placeholder events)
- `testimonials.ts` — array of `{ name, text, rating, avatar? }[]` (5–6 static testimonials)
- `instagramPosts.ts` — array of `{ imageUrl, postUrl }[]` (6–9 static entries)
- `config.ts` — reads all `VITE_*` env vars and exports typed constants

### Config Constants

```ts
// src/data/config.ts
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER
export const MAPS_EMBED_URL  = import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL
export const SHEET_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEET_SCRIPT_URL
export const CAFE_PHONE       = import.meta.env.VITE_CAFE_PHONE_NUMBER
export const TABLE_COUNT      = Number(import.meta.env.VITE_TABLE_COUNT ?? 10)
```

### Cart State

Cart is ephemeral React state (no localStorage persistence for V1). The `useCart` hook manages it with a `Map<string, CartItem>` internally for O(1) lookups, exposed as a sorted array.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: WhatsApp order message contains all cart items and table ID

*For any* cart containing one or more items and any table ID string, `buildOrderMessage` should produce a string that contains the name of every item in the cart and the table ID.

**Validates: Requirements 2.9, 2.7**

---

### Property 2: WhatsApp reservation message contains all required fields

*For any* combination of name, party size, datetime string, and notes passed to `buildReservationMessage`, the resulting string should contain each of those values as substrings.

**Validates: Requirements 8.2**

---

### Property 3: Cart add/contains round trip

*For any* menu item that is not sold out, adding it to the cart and then checking the cart items should yield a list that contains an entry with the same ID and a quantity of at least 1.

**Validates: Requirements 2.8**

---

### Property 4: Cart empty-guard

*For any* empty cart, the "Send Order via WhatsApp" action should be blocked (return false or equivalent error indicator) rather than generating a WhatsApp link.

**Validates: Requirements 2.10**

---

### Property 5: Search filter — results are a subset of all items

*For any* non-empty search string and any menu item array, the set of items returned by the search filter should be a subset of the original array and every returned item's name or description should contain the search string (case-insensitive).

**Validates: Requirements 2.2**

---

### Property 6: Category filter — results match selected category

*For any* selected category and any menu item array, every item returned by the category filter should have a `category` field equal to the selected category.

**Validates: Requirements 2.1**

---

### Property 7: Open status is deterministic given time

*For any* set of operating hours and any specific timestamp, `useOpenStatus` should return the same result when called multiple times with the same inputs (pure function / referential transparency).

**Validates: Requirements 7.2**

---

### Property 8: Email validation rejects non-email strings

*For any* string that does not contain both an `@` character and a `.` after the `@`, `isValidEmail` should return false.

**Validates: Requirements 11.5**

---

### Property 9: Whitespace-only input is treated as empty

*For any* string composed entirely of whitespace characters, `isNonEmpty` should return false.

**Validates: Requirements 8.3, 11.5**

---

### Property 10: QR URL encodes correct table ID

*For any* table number `n` in range `[1, TABLE_COUNT]`, the URL encoded into the QR code should equal `<origin>/menu?table=<n>`.

**Validates: Requirements 12.2**

---

### Property 11: WhatsApp message round trip — order total

*For any* cart, the total value displayed in the cart summary and the total value embedded in the WhatsApp message string should be equal.

**Validates: Requirements 2.9**

---

## Error Handling

| Scenario | Handling |
|---|---|
| Hero video fails to load | `<video>` element falls back to poster image (static WebP) |
| Newsletter POST fails (network error) | Show inline error banner with retry button; do not clear the form |
| Newsletter POST returns non-2xx | Same as network error path |
| Reservation form submitted with missing fields | Inline validation errors per field; focus first invalid field |
| Cart send attempted while empty | Inline message "Your order is empty"; no WhatsApp link opened |
| `?table` param absent from URL | Table ID treated as null; order message omits table reference |
| Google Maps iframe fails to load | Show fallback text with address and "Get Directions" deep link |
| QR download fails (canvas API unavailable) | Show fallback text message asking to screenshot |
| Images fail to load | `onerror` handler replaces with a neutral placeholder WebP |

---

## Testing Strategy

### Dual Approach

Both unit tests and property-based tests are used. Unit tests cover specific examples, edge cases, and error conditions. Property tests verify universal correctness properties across many random inputs.

### Unit Tests (Vitest)

Focus areas:
- `buildOrderMessage` — example outputs for known inputs
- `buildReservationMessage` — example outputs
- `isValidEmail`, `isValidPhone`, `isNonEmpty` — known valid/invalid examples
- `openStatus` — specific day/time combinations (open, closed, boundary)
- Cart add/remove/clear — specific sequences
- Menu search filter — exact match, partial match, case-insensitive match, empty string
- Menu category filter — exact match, all items in correct category
- WhatsApp URL construction — correct `wa.me` domain, correctly encoded message

### Property-Based Tests (fast-check via Vitest)

Each property test runs a minimum of **100 iterations**.

Tag format per test: `// Feature: cafe-website, Property <N>: <description>`

| Property | Test |
|---|---|
| Property 1 | For all carts + table IDs, order message contains all item names and table ID |
| Property 2 | For all reservation field combos, message contains all field values |
| Property 3 | For all non-sold-out items, add → contains round trip |
| Property 4 | For all empty-cart states, send is blocked |
| Property 5 | For all search strings, results ⊆ all items AND each result matches query |
| Property 6 | For all categories, every filtered result belongs to that category |
| Property 7 | For all hours configs + timestamps, openStatus is deterministic |
| Property 8 | For all strings without `@` + `.`, isValidEmail returns false |
| Property 9 | For all whitespace-only strings, isNonEmpty returns false |
| Property 10 | For all table numbers in range, QR URL matches expected pattern |
| Property 11 | For all carts, cart total === total in order message string |

### Component Tests (Vitest + React Testing Library)

- Menu search/filter interaction
- Cart add/remove and "Send Order" button state
- Reservation form validation and WhatsApp link generation
- Newsletter form submit (mock fetch), success and error paths
- Sticky bar visibility on mobile viewport
- Open/Closed status indicator renders correctly
