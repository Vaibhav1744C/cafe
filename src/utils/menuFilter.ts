import type { MenuItem } from '@/data/menu';

/**
 * Returns all items if category is "All", otherwise filters to items
 * whose category matches the given category string exactly.
 *
 * Requirements: 2.1
 */
export function filterByCategory(
  items: MenuItem[],
  category: string,
): MenuItem[] {
  if (category === 'All') return items;
  return items.filter((item) => item.category === category);
}

/**
 * Case-insensitive search against item name and description.
 * Returns all items if query is empty or only whitespace.
 *
 * Requirements: 2.2
 */
export function filterBySearch(
  items: MenuItem[],
  query: string,
): MenuItem[] {
  const trimmed = query.trim();
  if (!trimmed) return items;
  const lower = trimmed.toLowerCase();
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(lower) ||
      item.description.toLowerCase().includes(lower),
  );
}
