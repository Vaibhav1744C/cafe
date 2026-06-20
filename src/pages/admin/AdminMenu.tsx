import { useState } from 'react'
import { menuItems, CATEGORIES } from '@/data/menu'
import { useMenuOverrides } from '@/hooks/useMenuOverrides'

export default function AdminMenu() {
  const { resolvedItems, toggleSoldOut, toggleSignature, resetAll } = useMenuOverrides()
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const categories = ['All', ...CATEGORIES]
  const filtered = activeCategory === 'All'
    ? resolvedItems
    : resolvedItems.filter(i => i.category === activeCategory)

  const soldOutCount = resolvedItems.filter(i => i.isSoldOut).length

  return (
    <div style={{ padding: '32px 24px', maxWidth: 900, margin: '0 auto', fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: '#1C1008', margin: 0 }}>
            Menu Management
          </h1>
          <p style={{ color: 'rgba(28,16,8,0.5)', fontSize: 14, marginTop: 4 }}>
            Toggle sold-out status and signature highlights. Changes apply instantly and persist.
          </p>
        </div>
        {soldOutCount > 0 && (
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            style={{
              padding: '8px 16px', borderRadius: 8, border: '1.5px solid #e53935',
              background: 'transparent', color: '#e53935', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}
          >
            Clear All Sold-Out ({soldOutCount})
          </button>
        )}
      </div>

      {/* Reset confirm */}
      {showResetConfirm && (
        <div style={{
          background: '#fff3f3', border: '1.5px solid #e53935', borderRadius: 10,
          padding: '14px 18px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: 14, color: '#c62828', fontWeight: 600 }}>
            This will reset ALL overrides to the original menu defaults.
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={() => { resetAll(); setShowResetConfirm(false) }}
              style={{ padding: '6px 14px', borderRadius: 7, border: 'none', background: '#e53935', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
            >
              Reset All
            </button>
            <button
              type="button"
              onClick={() => setShowResetConfirm(false)}
              style={{ padding: '6px 14px', borderRadius: 7, border: '1.5px solid rgba(28,16,8,0.2)', background: 'transparent', fontSize: 13, cursor: 'pointer' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 20 }}>
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '7px 18px', borderRadius: 999, border: 'none', whiteSpace: 'nowrap',
              fontWeight: 600, fontSize: 13, cursor: 'pointer', flexShrink: 0,
              background: activeCategory === cat ? '#C4622D' : 'rgba(28,16,8,0.08)',
              color: activeCategory === cat ? '#F5ECD7' : '#1C1008',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Summary */}
      <div style={{ fontSize: 13, color: 'rgba(28,16,8,0.5)', marginBottom: 16 }}>
        Showing {filtered.length} items
        {soldOutCount > 0 && (
          <span style={{ marginLeft: 12, color: '#e53935', fontWeight: 600 }}>
            ● {soldOutCount} sold out
          </span>
        )}
      </div>

      {/* Item list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(item => {
          const base = menuItems.find(m => m.id === item.id)!
          return (
            <div
              key={item.id}
              style={{
                background: item.isSoldOut ? 'rgba(229,57,53,0.04)' : '#fff',
                borderRadius: 14, padding: '14px 18px',
                border: item.isSoldOut ? '1.5px solid rgba(229,57,53,0.2)' : '1.5px solid rgba(28,16,8,0.07)',
                display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
                boxShadow: '0 1px 4px rgba(28,16,8,0.05)',
              }}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                width={56}
                height={56}
                style={{ borderRadius: 8, objectFit: 'cover', flexShrink: 0, opacity: item.isSoldOut ? 0.4 : 1 }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{
                    fontWeight: 700, fontSize: 15, color: item.isSoldOut ? 'rgba(28,16,8,0.4)' : '#1C1008',
                    textDecoration: item.isSoldOut ? 'line-through' : 'none',
                  }}>
                    {item.name}
                  </span>
                  {item.isSoldOut && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#e53935', background: 'rgba(229,57,53,0.1)', padding: '2px 8px', borderRadius: 999 }}>
                      SOLD OUT
                    </span>
                  )}
                  {item.isSignature && (
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#C4622D', background: 'rgba(196,98,45,0.1)', padding: '2px 8px', borderRadius: 999 }}>
                      ★ SIGNATURE
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(28,16,8,0.45)', marginTop: 2 }}>
                  {item.category} · ₹{item.price}
                </div>
              </div>

              {/* Controls */}
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={() => toggleSoldOut(item.id)}
                  style={{
                    padding: '7px 14px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer',
                    background: item.isSoldOut ? '#4caf50' : '#e53935',
                    color: '#fff',
                  }}
                  title={item.isSoldOut ? 'Mark as available' : 'Mark as sold out'}
                >
                  {item.isSoldOut ? '✓ Mark Available' : '✕ Sold Out'}
                </button>

                <button
                  type="button"
                  onClick={() => toggleSignature(item.id)}
                  style={{
                    padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                    border: '1.5px solid rgba(196,98,45,0.4)',
                    background: item.isSignature ? '#C4622D' : 'transparent',
                    color: item.isSignature ? '#F5ECD7' : '#C4622D',
                  }}
                  title={item.isSignature ? 'Remove from signatures' : 'Add to signatures'}
                >
                  ★ {item.isSignature ? 'Signature' : 'Add Sig.'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
