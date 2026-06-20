import { useState } from 'react';
import type { CartItem } from '@/utils/whatsapp';
import { buildOrderMessage, openWhatsApp } from '@/utils/whatsapp';
import { WHATSAPP_NUMBER } from '@/data/config';

interface CartPanelProps {
  items: CartItem[];
  removeItem: (id: string) => void;
  clear: () => void;
  total: number;
  tableId: string | null;
}

/**
 * CartPanel — floating cart button on mobile, sidebar on desktop.
 *
 * Mobile: fixed bottom-right button showing item count badge.
 *         Tapping opens a slide-up drawer with the full cart.
 * Desktop: shown as a sidebar panel when the cart has items.
 *
 * "Send Order via WhatsApp" is disabled + shows validation message when cart is empty.
 *
 * Requirements: 2.8, 2.9, 2.10
 */
export default function CartPanel({
  items,
  removeItem,
  clear,
  total,
  tableId,
}: CartPanelProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isEmpty = items.length === 0;
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);

  function handleSendOrder() {
    if (isEmpty) return;
    const message = buildOrderMessage(items, tableId);
    openWhatsApp(WHATSAPP_NUMBER, message);
  }

  const cartContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-espresso/10">
        <h2 className="font-display font-semibold text-espresso text-base">
          Your Order
        </h2>
        {tableId && (
          <span className="text-xs text-espresso/60 bg-cream rounded-full px-2 py-0.5">
            Table {tableId}
          </span>
        )}
      </div>

      {/* Item list */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {isEmpty ? (
          <p className="text-sm text-espresso/50 text-center py-8">
            Your cart is empty
          </p>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-espresso truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-espresso/60">
                    ₹{item.price} × {item.qty}
                  </p>
                </div>
                <span className="text-sm font-semibold text-espresso whitespace-nowrap">
                  ₹{item.price * item.qty}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                  className="p-1 rounded-full text-espresso/40 hover:text-espresso hover:bg-espresso/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
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
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer: total + actions */}
      <div className="px-4 py-4 border-t border-espresso/10 space-y-3">
        {!isEmpty && (
          <div className="flex justify-between items-center text-sm font-semibold text-espresso">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        )}

        {/* Empty cart validation message */}
        {isEmpty && (
          <p className="text-xs text-espresso/50 text-center" role="status">
            Add items to send an order
          </p>
        )}

        <div className="flex gap-2">
          {!isEmpty && (
            <button
              type="button"
              onClick={clear}
              className="flex-1 min-h-11 rounded-xl border border-espresso/20 text-sm text-espresso/60 hover:bg-espresso/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            disabled={isEmpty}
            onClick={handleSendOrder}
            className={[
              'flex-1 min-h-11 rounded-xl text-sm font-semibold px-4 py-2',
              'transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber',
              isEmpty
                ? 'bg-espresso/10 text-espresso/30 cursor-not-allowed'
                : 'bg-matcha text-cream hover:bg-matcha/90 active:bg-matcha/80',
            ].join(' ')}
            aria-disabled={isEmpty}
          >
            {isEmpty ? "Cart is empty" : "Send via WhatsApp"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop sidebar (shown when cart has items) ── */}
      <aside
        className={[
          'hidden md:flex flex-col w-80 bg-offwhite rounded-2xl shadow-lg sticky top-24 self-start',
          'transition-all duration-300 ease-in-out',
          isEmpty ? 'opacity-50' : 'opacity-100',
        ].join(' ')}
        style={{ minHeight: '300px', maxHeight: 'calc(100vh - 8rem)' }}
        aria-label="Order cart"
      >
        {cartContent}
      </aside>

      {/* ── Mobile: floating button + drawer ── */}
      <div className="md:hidden">
        {/* Floating cart button — sits above the sticky bar (bottom-20 = 80px) */}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label={`Open cart, ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
          className="fixed bottom-20 right-4 z-30 w-14 h-14 rounded-full bg-amber text-cream shadow-lg flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
            aria-hidden="true"
          >
            <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
          </svg>
          {itemCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute -top-1 -right-1 bg-espresso text-cream text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
            >
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          )}
        </button>

        {/* Backdrop */}
        {drawerOpen && (
          <div
            className="fixed inset-0 z-40 bg-espresso/40 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setDrawerOpen(false)}
          />
        )}

        {/* Slide-up drawer — fixed height layout so footer button is always visible */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Order cart"
          className={[
            'fixed left-0 right-0 z-50 bg-offwhite rounded-t-3xl shadow-xl',
            'transition-transform duration-300 ease-out',
            'flex flex-col',
            drawerOpen ? 'translate-y-0' : 'translate-y-full',
          ].join(' ')}
          style={{ bottom: 0, maxHeight: '80vh' }}
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
            <div className="w-10 h-1 bg-espresso/20 rounded-full" />
          </div>

          {/* Header row with title and close button */}
          <div className="flex items-center justify-between px-4 pb-3 flex-shrink-0">
            <h2 className="font-display font-semibold text-espresso text-base">
              Your Order {tableId && <span className="text-xs font-normal text-espresso/50 ml-1">· Table {tableId}</span>}
            </h2>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close cart"
              className="p-2 rounded-full text-espresso/50 hover:bg-espresso/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          </div>

          {/* Scrollable item list */}
          <div className="flex-1 overflow-y-auto px-4 pb-2 min-h-0">
            {isEmpty ? (
              <p className="text-sm text-espresso/50 text-center py-8">
                Add items from the menu below
              </p>
            ) : (
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-espresso truncate">{item.name}</p>
                      <p className="text-xs text-espresso/60">₹{item.price} × {item.qty}</p>
                    </div>
                    <span className="text-sm font-semibold text-espresso whitespace-nowrap">₹{item.price * item.qty}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="p-1 rounded-full text-espresso/40 hover:text-espresso hover:bg-espresso/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer — always visible at the bottom of the drawer */}
          <div className="flex-shrink-0 px-4 py-4 border-t border-espresso/10 space-y-3 bg-offwhite">
            {!isEmpty && (
              <div className="flex justify-between items-center text-sm font-semibold text-espresso">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            )}
            <div className="flex gap-2">
              {!isEmpty && (
                <button
                  type="button"
                  onClick={clear}
                  className="min-h-11 px-4 rounded-xl border border-espresso/20 text-sm text-espresso/60 hover:bg-espresso/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                disabled={isEmpty}
                onClick={handleSendOrder}
                className={[
                  'flex-1 min-h-11 rounded-xl text-sm font-semibold px-4 py-2',
                  'transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber',
                  isEmpty
                    ? 'bg-espresso/10 text-espresso/30 cursor-not-allowed'
                    : 'bg-amber text-cream hover:bg-amber/90 active:bg-amber/80',
                ].join(' ')}
                aria-disabled={isEmpty}
              >
                {isEmpty ? 'Add items to order' : '📲 Send Order via WhatsApp'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
