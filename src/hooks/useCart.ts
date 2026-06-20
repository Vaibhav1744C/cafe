import { useState, useCallback } from 'react';
import type { CartItem } from '@/utils/whatsapp';
import type { MenuItem } from '@/data/menu';

export type { CartItem };

interface UseCartReturn {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  total: number;
}

/**
 * Manages the in-memory shopping cart for menu orders.
 *
 * Internally uses a Map<string, CartItem> for O(1) lookups.
 * `items` is exposed as a CartItem[] sorted by insertion order.
 * `addItem` increments quantity if the item is already in the cart;
 * otherwise it adds the item with qty = 1.
 */
export function useCart(): UseCartReturn {
  // Store insertion-order keys separately so we can expose items
  // in stable insertion order without relying on Map iteration order
  // (Map does iterate in insertion order, but being explicit is clearer).
  const [cartMap, setCartMap] = useState<Map<string, CartItem>>(new Map());

  const addItem = useCallback((menuItem: MenuItem) => {
    setCartMap((prev) => {
      const next = new Map(prev);
      const existing = next.get(menuItem.id);
      if (existing) {
        next.set(menuItem.id, { ...existing, qty: existing.qty + 1 });
      } else {
        next.set(menuItem.id, {
          id: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          qty: 1,
        });
      }
      return next;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setCartMap((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setCartMap(new Map());
  }, []);

  // Expose items in insertion order (Map preserves insertion order)
  const items = Array.from(cartMap.values());

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return { items, addItem, removeItem, clear, total };
}
