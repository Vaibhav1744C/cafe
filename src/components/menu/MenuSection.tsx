import { useState } from 'react';
import { menuItems, CATEGORIES } from '@/data/menu';
import { filterByCategory, filterBySearch } from '@/utils/menuFilter';
import { useCart } from '@/hooks/useCart';
import { useTableId } from '@/hooks/useTableId';
import CategoryTabs from './CategoryTabs';
import MenuItemCard from './MenuItemCard';
import CartPanel from './CartPanel';

/**
 * Full menu section — composes search bar, CategoryTabs, item grid, and CartPanel.
 *
 * - Reads `?table` query param via useTableId
 * - Filters items using filterByCategory + filterBySearch
 * - Responsive grid: 1 col mobile, 2 col sm, 3 col lg
 * - Section id="menu" for smooth scroll targeting
 *
 * Requirements: 2.1, 2.2, 2.7, 2.8
 */
export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const cart = useCart();
  const tableId = useTableId();

  // Apply filters in sequence: category first, then search
  const categoryFiltered = filterByCategory(menuItems, activeCategory);
  const visibleItems = filterBySearch(categoryFiltered, searchQuery);

  return (
    <section
      id="menu"
      className="bg-cream py-16 px-4 sm:px-6 lg:px-8 min-h-screen"
      aria-label="Menu"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <h2
          className="font-display font-bold text-3xl sm:text-4xl text-espresso text-center mb-10"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Our Menu
        </h2>

        {/* Search + Category controls */}
        <div className="space-y-4 mb-8">
          {/* Search bar */}
          <div className="relative max-w-md mx-auto">
            <label htmlFor="menu-search" className="sr-only">
              Search menu
            </label>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-espresso/40 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <input
              id="menu-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search menu..."
              className="w-full min-h-11 pl-10 pr-10 py-2 rounded-full border border-espresso/15 bg-offwhite text-espresso text-sm placeholder:text-espresso/40 focus:outline-none focus:ring-2 focus:ring-amber"
            />
            {/* Clear button */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-espresso/40 hover:text-espresso transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            )}
          </div>

          {/* Category tabs */}
          <CategoryTabs
            categories={[...CATEGORIES]}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        {/* Content area: grid + sidebar cart */}
        <div className="flex gap-8 items-start">
          {/* Menu item grid */}
          <div className="flex-1 min-w-0">
            {visibleItems.length === 0 ? (
              <div className="text-center py-20 text-espresso/50">
                <p className="text-lg font-medium">No items found</p>
                <p className="text-sm mt-1">
                  {searchQuery
                    ? `No results for "${searchQuery}"`
                    : 'No items in this category'}
                </p>
              </div>
            ) : (
              <ul
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                aria-label="Menu items"
              >
                {visibleItems.map((item) => (
                  <li key={item.id}>
                    <MenuItemCard item={item} onAdd={cart.addItem} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Cart panel (desktop sidebar) */}
          <CartPanel
            items={cart.items}
            removeItem={cart.removeItem}
            clear={cart.clear}
            total={cart.total}
            tableId={tableId}
          />
        </div>
      </div>
    </section>
  );
}
