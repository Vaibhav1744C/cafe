# Requirements Document

## Introduction

A modern, animation-rich, mobile-first cafe website that serves as a lightweight operational tool. The site enables customers to browse the menu, place orders via WhatsApp, make reservations, view the gallery, and subscribe to a newsletter — all without a backend server. Orders and reservations are delivered through WhatsApp deep links; newsletter signups are collected via Google Apps Script into Google Sheets.

## Glossary

- **Website**: The React + Tailwind CSS + Framer Motion cafe website deployed on Vercel
- **Customer**: A visitor to the website, typically a cafe patron
- **Owner**: The cafe operator who receives WhatsApp messages for orders and reservations
- **Cart**: The in-memory collection of menu items a customer has selected during a session
- **WhatsApp_Link**: A `wa.me` deep link URL with a pre-filled message that opens WhatsApp
- **Table_QR**: A QR code that encodes a URL of the form `/menu?table=<id>`
- **Table_ID**: A numeric identifier captured from the URL query parameter `table`
- **Menu_Item**: A menu entry with a name, price, short description, image, category, and optional sold-out flag
- **Category**: A named grouping of Menu_Items (e.g., Coffee, Food, Desserts)
- **Google_Apps_Script**: A Google-hosted serverless endpoint that writes form data to a Google Sheet
- **Reduced_Motion**: The `prefers-reduced-motion: reduce` media query indicating the user has requested minimal animation
- **LCP**: Largest Contentful Paint, a Core Web Vitals metric
- **WebP**: A modern image format used for performance optimization
- **Blur_Up**: A technique where a low-quality image placeholder is shown while the full image loads
- **Masonry_Grid**: A multi-column layout where items are placed to minimize vertical gaps
- **Lightbox**: A fullscreen image overlay triggered by tapping a gallery image
- **Static_Testimonial**: A hardcoded customer review not pulled from an external API

---

## Requirements

### Requirement 1: Hero Section

**User Story:** As a customer, I want to see an impactful hero section when I first land on the site, so that I immediately understand the cafe's brand and can navigate to key actions.

#### Acceptance Criteria

1. THE Website SHALL display a full-screen hero section as the first visible element on the homepage.
2. WHEN the hero section loads, THE Website SHALL play a looping, muted, autoplay video of cafe ambience, or fall back to a static full-screen image if video is unavailable.
3. THE Website SHALL display a tagline and two call-to-action buttons labeled "View Menu" and "Visit Us" within the hero section.
4. WHEN the hero section first renders, THE Website SHALL execute exactly one entrance animation (either a fade or a parallax effect) for the headline text.
5. WHERE Reduced_Motion is enabled, THE Website SHALL display the hero section without any animation.
6. THE Website SHALL use Bricolage Grotesque as the headline font and DM Sans as the body font, both loaded from Google Fonts.
7. WHEN the hero headline loads, THE Website SHALL animate the variable font weight from thin to bold (weight-morph) as the entrance animation.

---

### Requirement 2: Menu

**User Story:** As a customer, I want to browse the menu by category and search for items, so that I can quickly find what I want and add it to my order.

#### Acceptance Criteria

1. THE Website SHALL display Menu_Items grouped by Category using tab-based filtering without a page reload.
2. WHEN a customer types in the search bar, THE Website SHALL filter visible Menu_Items in real time to those whose name or description contains the search string.
3. THE Website SHALL display each Menu_Item with its name, price, short description, image, and Category label.
4. WHEN a Menu_Item is marked as sold out, THE Website SHALL display a "Sold Out" tag on that item and disable the "Add to order" action for it.
5. WHEN the Website is viewed on a mobile viewport, THE Website SHALL render category tabs as a horizontally swipeable row.
6. WHEN a customer taps a Menu_Item description on a mobile viewport, THE Website SHALL expand the full description inline.
7. WHEN the URL contains the query parameter `table=<id>`, THE Website SHALL silently capture the Table_ID and attach it to all subsequent order messages.
8. WHEN a customer taps "Add to order" on a Menu_Item, THE Website SHALL add that item to the Cart and display a running cart summary.
9. WHEN the Cart contains at least one item and the customer taps "Send Order via WhatsApp", THE Website SHALL open a WhatsApp_Link pre-filled with an itemized list of Cart contents and the Table_ID (if present).
10. IF the Cart is empty and the customer taps "Send Order via WhatsApp", THEN THE Website SHALL prevent the action and display an inline validation message.

---

### Requirement 3: Signature Items Showcase

**User Story:** As a customer, I want to see the cafe's most popular items highlighted, so that I can discover bestsellers at a glance.

#### Acceptance Criteria

1. THE Website SHALL display between 3 and 5 bestseller Menu_Items in a visually distinct showcase section.
2. THE Website SHALL render each bestseller with a larger card size and an image reveal animation triggered on scroll.
3. WHEN the scroll position reaches the showcase section, THE Website SHALL trigger staggered reveal animations for the bestseller cards.
4. WHERE Reduced_Motion is enabled, THE Website SHALL display the showcase section without scroll-triggered animations.

---

### Requirement 4: Photo Gallery

**User Story:** As a customer, I want to view cafe photos in an attractive gallery, so that I can get a feel for the atmosphere before visiting.

#### Acceptance Criteria

1. THE Website SHALL display cafe photos in a Masonry_Grid layout.
2. WHEN a customer taps a photo, THE Website SHALL open that photo in a Lightbox overlay.
3. THE Website SHALL lazy-load gallery images, showing a Blur_Up placeholder until each image is fully loaded.
4. THE Website SHALL serve all gallery images in WebP format.
5. WHEN the Lightbox is open and the customer presses the Escape key, THE Website SHALL close the Lightbox.

---

### Requirement 5: About Section

**User Story:** As a customer, I want to learn about the cafe's story and founders, so that I can connect with the brand before or after visiting.

#### Acceptance Criteria

1. THE Website SHALL display a founder or cafe story section with authentic text content.
2. THE Website SHALL NOT display any fabricated or placeholder statistics in the About section.

---

### Requirement 6: Reviews

**User Story:** As a customer, I want to read testimonials from other patrons, so that I can feel confident about visiting the cafe.

#### Acceptance Criteria

1. THE Website SHALL display a testimonial carousel with Static_Testimonials that includes star ratings.
2. THE Website SHALL auto-scroll the testimonial carousel continuously without user interaction.
3. WHEN a customer interacts with the carousel (hover or touch), THE Website SHALL pause the auto-scroll.
4. WHERE Reduced_Motion is enabled, THE Website SHALL display testimonials in a static list rather than a scrolling carousel.

---

### Requirement 7: Location

**User Story:** As a customer, I want to find the cafe's location and know if it's currently open, so that I can plan my visit.

#### Acceptance Criteria

1. THE Website SHALL display an embedded Google Map showing the cafe's location.
2. THE Website SHALL display a real-time "Open Now" or "Closed" status based on hardcoded operating hours evaluated against the customer's local time.
3. THE Website SHALL display parking information near the location section.
4. THE Website SHALL display a "Get Directions" button that opens a Google Maps deep link in the native maps application.

---

### Requirement 8: WhatsApp-First Ordering

**User Story:** As a customer, I want to send my order and reservation requests via WhatsApp, so that the owner can respond and confirm directly in WhatsApp without any additional systems.

#### Acceptance Criteria

1. THE Website SHALL display a reservation form with fields for name, party size, date/time, and optional notes.
2. WHEN a customer submits the reservation form with all required fields filled, THE Website SHALL open a WhatsApp_Link pre-filled with the customer's name, party size, and requested date/time.
3. IF a customer submits the reservation form with required fields missing, THEN THE Website SHALL prevent submission and display inline validation errors on the empty fields.
4. THE Website SHALL display a click-to-call button that initiates a phone call when tapped.
5. THE Website SHALL NOT require any backend server or database for ordering or reservation functionality.

---

### Requirement 9: Social Section

**User Story:** As a customer, I want to see the cafe's social media presence and order via delivery apps, so that I can follow the cafe and place off-site orders.

#### Acceptance Criteria

1. THE Website SHALL display a static Instagram grid where each image links to the corresponding Instagram post URL.
2. THE Website SHALL NOT use a live Instagram embed that requires OAuth token refresh.
3. THE Website SHALL display links to third-party delivery platforms (Zomato, Swiggy) as secondary ordering options.

---

### Requirement 10: Events Section

**User Story:** As a customer, I want to know about upcoming events and specials, so that I can plan visits around live music nights and other activities.

#### Acceptance Criteria

1. THE Website SHALL display a list or grid of upcoming events (e.g., live music, specials) as hardcoded cards.
2. THE Website SHALL display each event card with at minimum an event name and date.
3. WHEN there are no upcoming events, THE Website SHALL display a message indicating no events are currently scheduled.

---

### Requirement 11: Newsletter Signup

**User Story:** As a customer, I want to subscribe with my email or phone number, so that I receive updates about the cafe.

#### Acceptance Criteria

1. THE Website SHALL display a newsletter signup form with fields for email address and/or phone number.
2. WHEN a customer submits the newsletter form with a valid email or phone number, THE Website SHALL POST the data to a Google_Apps_Script endpoint.
3. WHEN the Google_Apps_Script endpoint returns a success response, THE Website SHALL display a confirmation message to the customer.
4. IF the Google_Apps_Script endpoint returns an error response, THEN THE Website SHALL display an error message and allow the customer to retry.
5. IF a customer submits the newsletter form with neither a valid email nor a valid phone number, THEN THE Website SHALL prevent submission and display an inline validation error.

---

### Requirement 12: QR Code System

**User Story:** As the owner, I want to generate and download branded QR codes for each table, so that customers can scan them to access the table-specific menu URL.

#### Acceptance Criteria

1. THE Website SHALL provide an admin page (e.g., `/admin/qr`) for generating Table_QR codes.
2. THE Website SHALL generate one QR code per table encoding the URL `<origin>/menu?table=<id>`.
3. THE Website SHALL render each QR code with the cafe logo overlaid at the center.
4. THE Website SHALL allow the owner to download all Table_QR codes as print-ready PNG files (individually or as a set).
5. WHEN the `/menu?table=<id>` page loads, THE Website SHALL apply reduced or no entrance animations to minimize time-to-interactive.

---

### Requirement 13: Sticky Mobile Navigation Bar

**User Story:** As a customer on a mobile device, I want persistent quick-access buttons, so that I can call, get directions, or start an order from any section of the site.

#### Acceptance Criteria

1. WHEN the Website is viewed on a mobile viewport, THE Website SHALL display a sticky bottom bar with three actions: Call, Directions, and Order Now.
2. THE Website SHALL keep the sticky bottom bar visible on every page of the site while on a mobile viewport.
3. WHEN the sticky bottom bar's "Order Now" button is tapped, THE Website SHALL scroll to or navigate to the menu section.

---

### Requirement 14: Performance and Accessibility

**User Story:** As a customer, I want the website to load quickly and be usable regardless of my device or accessibility needs, so that I have a smooth experience.

#### Acceptance Criteria

1. THE Website SHALL achieve an LCP of less than 2.5 seconds on a simulated 4G connection.
2. THE Website SHALL serve all images in WebP format with lazy loading enabled.
3. THE Website SHALL be fully responsive down to a viewport width of 360px.
4. THE Website SHALL include keyboard-accessible focus states on all interactive elements.
5. THE Website SHALL maintain sufficient color contrast ratios as defined by WCAG 2.1 AA.
6. WHERE Reduced_Motion is enabled, THE Website SHALL disable all non-essential animations site-wide.
7. THE Website SHALL include semantic HTML meta tags for SEO including title, description, and Open Graph tags.
8. THE Website SHALL include Restaurant schema markup (JSON-LD) on the homepage.
9. THE Website SHALL include a sitemap.
10. THE Website SHALL use a color palette of 4 to 6 named hex values based on a coffee-brown and cream theme.
