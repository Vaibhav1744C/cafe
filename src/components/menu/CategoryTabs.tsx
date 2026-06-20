import { motion } from 'framer-motion';

interface CategoryTabsProps {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}

/**
 * Horizontal scrollable category tab row.
 *
 * - All categories including "All" are shown as pill tabs
 * - Active tab uses a Framer Motion shared `layoutId` for smooth indicator transition
 * - Swipeable on mobile via CSS overflow-x: auto / webkit-overflow-scrolling: touch
 * - Each tab meets the 44px minimum tap target height
 *
 * Requirements: 2.1, 2.5
 */
export default function CategoryTabs({
  categories,
  active,
  onChange,
}: CategoryTabsProps) {
  // Always prepend "All" as the first tab
  const allTabs = ['All', ...categories];

  return (
    <div
      role="tablist"
      aria-label="Menu categories"
      className="flex gap-2 overflow-x-auto py-1"
      style={{
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      } as React.CSSProperties}
    >
      {allTabs.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat)}
            className={[
              'relative min-h-11 px-5 rounded-full text-sm font-semibold whitespace-nowrap',
              'transition-colors duration-150 flex-shrink-0',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber',
              isActive
                ? 'text-cream'
                : 'bg-offwhite text-espresso hover:bg-espresso/10',
            ].join(' ')}
          >
            {/* Animated background indicator for active tab */}
            {isActive && (
              <motion.span
                layoutId="tab-indicator"
                className="absolute inset-0 rounded-full bg-amber"
                style={{ zIndex: -1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              />
            )}
            {cat}
          </button>
        );
      })}
    </div>
  );
}
