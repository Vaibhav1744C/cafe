import { useState } from 'react';
import type { MenuItem } from '@/data/menu';

interface MenuItemCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

/**
 * Card component for a single menu item.
 *
 * - Shows image (lazy-loaded, fallback on error), name, price, description, category badge
 * - On mobile: description truncated to 2 lines with tap-to-expand toggle
 * - Sold-out items show a "Sold Out" badge and disabled add button
 * - Signature items show a ★ badge
 * - Image hover-zoom on desktop only (CSS `@media (hover: hover)`)
 *
 * Requirements: 2.3, 2.4, 2.6
 */
export default function MenuItemCard({ item, onAdd }: MenuItemCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const fallbackSrc = `https://picsum.photos/seed/${item.id}-fallback/400/300`;

  return (
    <article className="menu-card rounded-2xl shadow-md bg-offwhite overflow-hidden flex flex-col">
      {/* Image */}
      <div className="menu-card__image-wrapper relative overflow-hidden">
        <img
          src={imgError ? fallbackSrc : item.image}
          alt={item.name}
          loading="lazy"
          width={400}
          height={300}
          onError={() => setImgError(true)}
          className="menu-card__image w-full aspect-[4/3] object-cover"
        />

        {/* Signature badge */}
        {item.isSignature && (
          <span
            aria-label="Signature item"
            className="absolute top-2 left-2 bg-amber text-cream text-xs font-semibold px-2 py-0.5 rounded-full leading-tight"
          >
            ★ Signature
          </span>
        )}

        {/* Sold-out overlay badge */}
        {item.isSoldOut && (
          <span className="absolute top-2 right-2 bg-espresso text-cream text-xs font-semibold px-2 py-0.5 rounded-full leading-tight">
            Sold Out
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Header row: name + price */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold text-espresso text-base leading-snug">
            {item.name}
          </h3>
          <span className="text-amber font-semibold text-sm whitespace-nowrap">
            ₹{item.price}
          </span>
        </div>

        {/* Category badge */}
        <span className="self-start text-xs text-espresso/70 bg-cream border border-espresso/10 rounded-full px-2 py-0.5 leading-tight">
          {item.category}
        </span>

        {/* Description — truncated on mobile, expandable */}
        <div className="flex-1">
          {/* Mobile: show truncated or full based on expanded state */}
          <p
            className={[
              'text-sm text-espresso/80 leading-relaxed',
              'md:line-clamp-none', // always full on desktop
              expanded ? '' : 'line-clamp-2', // truncate on mobile unless expanded
            ].join(' ')}
          >
            {item.description}
          </p>

          {/* Tap-to-expand toggle (mobile only) */}
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="md:hidden mt-1 text-xs text-amber underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : 'Tap to expand'}
          </button>
        </div>

        {/* Add to order button */}
        <button
          type="button"
          disabled={item.isSoldOut}
          onClick={() => !item.isSoldOut && onAdd(item)}
          aria-label={
            item.isSoldOut
              ? `${item.name} is sold out`
              : `Add ${item.name} to order`
          }
          className={[
            'mt-auto w-full min-h-11 rounded-xl text-sm font-semibold px-4 py-2',
            'transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber',
            item.isSoldOut
              ? 'bg-espresso/10 text-espresso/40 cursor-not-allowed'
              : 'bg-amber text-cream hover:bg-amber/90 active:bg-amber/80',
          ].join(' ')}
        >
          {item.isSoldOut ? 'Sold Out' : 'Add to order'}
        </button>
      </div>

      {/* Hover-zoom style — desktop only */}
      <style>{`
        @media (hover: hover) {
          .menu-card:hover .menu-card__image {
            transform: scale(1.05);
            transition: transform 400ms ease;
          }
          .menu-card__image {
            transition: transform 400ms ease;
          }
        }
      `}</style>
    </article>
  );
}
