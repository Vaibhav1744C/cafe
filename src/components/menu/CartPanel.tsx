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

const WHATSAPP_GREEN = '#25D366';

export default function CartPanel({ items, removeItem, clear, total, tableId }: CartPanelProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isEmpty = items.length === 0;
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);

  function handleSendOrder() {
    if (isEmpty) return;
    const message = buildOrderMessage(items, tableId);
    openWhatsApp(WHATSAPP_NUMBER, message);
  }

  // ── Desktop sidebar content ──────────────────────────────────────────
  const sidebarContent = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(28,16,8,0.1)', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 600, fontSize: 15, color: '#1C1008' }}>Your Order</span>
          {tableId && (
            <span style={{ fontSize: 11, color: '#1C1008', opacity: 0.6, background: '#F5ECD7', borderRadius: 999, padding: '2px 8px' }}>
              Table {tableId}
            </span>
          )}
        </div>
      </div>

      {/* Item list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
        {isEmpty ? (
          <p style={{ textAlign: 'center', color: '#1C1008', opacity: 0.4, fontSize: 13, padding: '24px 0' }}>
            Add items from the menu
          </p>
        ) : (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map((item) => (
              <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: '#1C1008', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.name}
                  </p>
                  <p style={{ margin: 0, fontSize: 11, color: '#1C1008', opacity: 0.6 }}>
                    ₹{item.price} × {item.qty}
                  </p>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1C1008', whiteSpace: 'nowrap' }}>
                  ₹{item.price * item.qty}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: 'rgba(28,16,8,0.4)', borderRadius: '50%' }}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div style={{ flexShrink: 0, padding: '12px 16px', borderTop: '1px solid rgba(28,16,8,0.1)' }}>
        {!isEmpty && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 14, fontWeight: 700, color: '#1C1008' }}>
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        )}
        <div style={{ display: 'flex', gap: 8 }}>
          {!isEmpty && (
            <button
              type="button"
              onClick={clear}
              style={{ flex: '0 0 auto', minHeight: 44, padding: '0 16px', borderRadius: 12, border: '1px solid rgba(28,16,8,0.2)', background: 'transparent', fontSize: 13, cursor: 'pointer', color: 'rgba(28,16,8,0.6)' }}
            >
              Clear
            </button>
          )}
          <button
            type="button"
            disabled={isEmpty}
            onClick={handleSendOrder}
            style={{
              flex: 1, minHeight: 44, borderRadius: 12, border: 'none', fontSize: 13, fontWeight: 700, cursor: isEmpty ? 'not-allowed' : 'pointer',
              background: isEmpty ? 'rgba(28,16,8,0.08)' : WHATSAPP_GREEN,
              color: isEmpty ? 'rgba(28,16,8,0.3)' : '#fff',
            }}
          >
            {isEmpty ? 'Cart is empty' : '📲 Send Order via WhatsApp'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside
        className="hidden md:flex"
        style={{
          flexDirection: 'column',
          width: 320,
          background: '#EDE8DF',
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(28,16,8,0.1)',
          position: 'sticky',
          top: 96,
          alignSelf: 'flex-start',
          minHeight: 300,
          maxHeight: 'calc(100vh - 8rem)',
          opacity: isEmpty ? 0.6 : 1,
          transition: 'opacity 0.3s',
        }}
        aria-label="Order cart"
      >
        {sidebarContent}
      </aside>

      {/* ── Mobile: floating button + full-screen drawer ── */}
      <div className="md:hidden">
        {/* Floating cart FAB */}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label={`View cart – ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
          style={{
            position: 'fixed', bottom: 80, right: 16, zIndex: 30,
            width: 56, height: 56, borderRadius: '50%',
            background: '#C4622D', color: '#F5ECD7', border: 'none',
            boxShadow: '0 4px 16px rgba(196,98,45,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 22,
          }}
        >
          🛒
          {itemCount > 0 && (
            <span style={{
              position: 'absolute', top: -4, right: -4,
              background: '#1C1008', color: '#F5ECD7',
              fontSize: 10, fontWeight: 700,
              width: 20, height: 20, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {itemCount > 9 ? '9+' : itemCount}
            </span>
          )}
        </button>

        {/* Backdrop */}
        {drawerOpen && (
          <div
            onClick={() => setDrawerOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 55, background: 'rgba(28,16,8,0.5)' }}
            aria-hidden="true"
          />
        )}

        {/* Drawer — z-index 60 so it sits above the sticky bar (z-50) */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Order cart"
          style={{
            position: 'fixed',
            left: 0, right: 0, bottom: 0,
            zIndex: 60,
            background: '#EDE8DF',
            borderRadius: '24px 24px 0 0',
            boxShadow: '0 -8px 40px rgba(28,16,8,0.2)',
            height: '72vh',
            maxHeight: '72vh',
            display: 'flex',
            flexDirection: 'column',
            transform: drawerOpen ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s ease-out',
          }}
        >
          {/* Handle + header — fixed height ~72px */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 10, paddingBottom: 6 }}>
              <div style={{ width: 40, height: 4, background: 'rgba(28,16,8,0.15)', borderRadius: 999 }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 16px 12px' }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: 16, color: '#1C1008', fontFamily: 'var(--font-display)' }}>
                  Your Order
                </span>
                {tableId && (
                  <span style={{ marginLeft: 8, fontSize: 11, color: 'rgba(28,16,8,0.5)' }}>
                    · Table {tableId}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close cart"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'rgba(28,16,8,0.5)', padding: 8, borderRadius: '50%' }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Scrollable item list — fills remaining space */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 8px', minHeight: 0 }}>
            {isEmpty ? (
              <p style={{ textAlign: 'center', color: 'rgba(28,16,8,0.4)', fontSize: 14, paddingTop: 32 }}>
                Add items from the menu below
              </p>
            ) : (
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {items.map((item) => (
                  <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1C1008', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.name}
                      </p>
                      <p style={{ margin: 0, fontSize: 12, color: 'rgba(28,16,8,0.6)' }}>
                        ₹{item.price} × {item.qty}
                      </p>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#1C1008', whiteSpace: 'nowrap' }}>
                      ₹{item.price * item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: 'rgba(28,16,8,0.35)', padding: '4px 6px', borderRadius: '50%' }}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer — pinned at bottom, extra bottom padding clears the sticky bar */}
          <div style={{
            flexShrink: 0,
            padding: '12px 16px 80px',
            borderTop: '1px solid rgba(28,16,8,0.1)',
            background: '#EDE8DF',
          }}>
            {!isEmpty && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 15, fontWeight: 700, color: '#1C1008' }}>
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            )}
            <div style={{ display: 'flex', gap: 8 }}>
              {!isEmpty && (
                <button
                  type="button"
                  onClick={clear}
                  style={{
                    flex: '0 0 auto', height: 50, padding: '0 20px',
                    borderRadius: 14, border: '1.5px solid rgba(28,16,8,0.2)',
                    background: 'transparent', fontSize: 13, cursor: 'pointer', color: 'rgba(28,16,8,0.6)',
                  }}
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                disabled={isEmpty}
                onClick={handleSendOrder}
                style={{
                  flex: 1, height: 50, borderRadius: 14, border: 'none',
                  fontSize: 15, fontWeight: 700,
                  cursor: isEmpty ? 'not-allowed' : 'pointer',
                  background: isEmpty ? 'rgba(28,16,8,0.08)' : WHATSAPP_GREEN,
                  color: isEmpty ? 'rgba(28,16,8,0.3)' : '#fff',
                  letterSpacing: 0.2,
                }}
              >
                {isEmpty ? 'Add items first' : '📲 Send Order via WhatsApp'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
