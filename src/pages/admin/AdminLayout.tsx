import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface AdminLayoutProps {
  children: React.ReactNode
  onLogout: () => void
}

const NAV = [
  { label: '🏠 Dashboard',    path: '/admin' },
  { label: '🍽 Menu',         path: '/admin/menu' },
  { label: '📱 QR Codes',     path: '/admin/qr' },
]

export default function AdminLayout({ children, onLogout }: AdminLayoutProps) {
  const { pathname } = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const sidebar = (
    <nav style={{
      width: 220, background: '#1C1008', minHeight: '100vh',
      display: 'flex', flexDirection: 'column', padding: '24px 0',
      fontFamily: 'var(--font-body)',
    }}>
      {/* Brand */}
      <div style={{ padding: '0 20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: 24 }}>☕</div>
        <div style={{ fontFamily: 'var(--font-display)', color: '#F5ECD7', fontWeight: 800, fontSize: 16, marginTop: 4 }}>
          Brew &amp; Bloom
        </div>
        <div style={{ color: 'rgba(245,236,215,0.4)', fontSize: 11, marginTop: 2 }}>Admin Panel</div>
      </div>

      {/* Nav links */}
      <div style={{ flex: 1, padding: '16px 12px' }}>
        {NAV.map(item => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            style={{
              display: 'block', padding: '10px 12px', borderRadius: 8,
              marginBottom: 4, textDecoration: 'none', fontSize: 14,
              fontWeight: pathname === item.path ? 700 : 400,
              background: pathname === item.path ? '#C4622D' : 'transparent',
              color: pathname === item.path ? '#F5ECD7' : 'rgba(245,236,215,0.65)',
              transition: 'all 0.15s',
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', fontSize: 12, color: 'rgba(245,236,215,0.45)', marginBottom: 10, textDecoration: 'none' }}
        >
          ↗ View Live Site
        </a>
        <button
          type="button"
          onClick={onLogout}
          style={{
            width: '100%', padding: '8px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)',
            background: 'transparent', color: 'rgba(245,236,215,0.6)', fontSize: 13, cursor: 'pointer',
          }}
        >
          Sign Out
        </button>
      </div>
    </nav>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      {/* Desktop sidebar */}
      <div className="hidden md:block" style={{ flexShrink: 0 }}>
        {sidebar}
      </div>

      {/* Mobile: top bar + drawer */}
      <div className="md:hidden" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
        <div style={{
          background: '#1C1008', height: 52, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '0 16px',
        }}>
          <span style={{ fontFamily: 'var(--font-display)', color: '#F5ECD7', fontWeight: 700, fontSize: 15 }}>
            ☕ Admin
          </span>
          <button
            type="button"
            onClick={() => setSidebarOpen(o => !o)}
            style={{ background: 'none', border: 'none', color: '#F5ECD7', fontSize: 22, cursor: 'pointer' }}
          >
            {sidebarOpen ? '✕' : '☰'}
          </button>
        </div>
        {sidebarOpen && (
          <>
            <div
              onClick={() => setSidebarOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: -1 }}
            />
            {sidebar}
          </>
        )}
      </div>

      {/* Main content */}
      <main style={{
        flex: 1, background: '#F5ECD7', minHeight: '100vh',
        paddingTop: 52, // mobile top bar height
      }}
        className="md:pt-0"
      >
        {children}
      </main>
    </div>
  )
}
