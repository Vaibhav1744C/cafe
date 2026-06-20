import { menuItems } from '@/data/menu'
import { cafeHours } from '@/data/hours'
import { computeOpenStatus } from '@/utils/openStatus'
import { WHATSAPP_NUMBER, CAFE_PHONE, TABLE_COUNT } from '@/data/config'
import { Link } from 'react-router-dom'

const S = {
  page: { padding: '32px 24px', maxWidth: 900, margin: '0 auto' } as React.CSSProperties,
  heading: { fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: '#1C1008', marginBottom: 4 } as React.CSSProperties,
  sub: { color: 'rgba(28,16,8,0.5)', fontSize: 14, marginBottom: 32 } as React.CSSProperties,
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 } as React.CSSProperties,
  card: { background: '#fff', borderRadius: 14, padding: '20px', boxShadow: '0 2px 8px rgba(28,16,8,0.07)' } as React.CSSProperties,
  cardNum: { fontSize: 32, fontWeight: 800, color: '#C4622D', lineHeight: 1 } as React.CSSProperties,
  cardLabel: { fontSize: 13, color: 'rgba(28,16,8,0.55)', marginTop: 4 } as React.CSSProperties,
  section: { marginBottom: 32 } as React.CSSProperties,
  sectionTitle: { fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, color: '#1C1008', marginBottom: 14 } as React.CSSProperties,
  linkCard: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: '#fff', borderRadius: 12, padding: '16px 20px',
    textDecoration: 'none', color: '#1C1008', marginBottom: 10,
    boxShadow: '0 2px 8px rgba(28,16,8,0.07)', fontSize: 14, fontWeight: 600,
  } as React.CSSProperties,
  infoRow: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(28,16,8,0.07)', fontSize: 13 } as React.CSSProperties,
}

export default function AdminDashboard() {
  const now = new Date()
  const { isOpen, label } = computeOpenStatus(cafeHours, now)
  const soldOutCount = menuItems.filter(m => m.isSoldOut).length
  const totalItems = menuItems.length
  const signatureCount = menuItems.filter(m => m.isSignature).length

  return (
    <div style={S.page}>
      <h1 style={S.heading}>Dashboard</h1>
      <p style={S.sub}>{now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>

      {/* Status cards */}
      <div style={S.grid}>
        <div style={S.card}>
          <div style={{ ...S.cardNum, color: isOpen ? '#4caf50' : '#e53935' }}>
            {isOpen ? '● Open' : '● Closed'}
          </div>
          <div style={S.cardLabel}>Current Status</div>
        </div>
        <div style={S.card}>
          <div style={S.cardNum}>{totalItems}</div>
          <div style={S.cardLabel}>Menu Items</div>
        </div>
        <div style={S.card}>
          <div style={{ ...S.cardNum, color: soldOutCount > 0 ? '#e53935' : '#4caf50' }}>{soldOutCount}</div>
          <div style={S.cardLabel}>Sold Out Today</div>
        </div>
        <div style={S.card}>
          <div style={S.cardNum}>{signatureCount}</div>
          <div style={S.cardLabel}>Signature Items</div>
        </div>
        <div style={S.card}>
          <div style={S.cardNum}>{TABLE_COUNT}</div>
          <div style={S.cardLabel}>Tables</div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={S.section}>
        <div style={S.sectionTitle}>Quick Actions</div>
        <Link to="/admin/menu" style={S.linkCard}>
          <span>🍽 Manage Menu — mark sold out / signature</span>
          <span style={{ color: '#C4622D' }}>→</span>
        </Link>
        <Link to="/admin/qr" style={S.linkCard}>
          <span>📱 Generate & Download QR Codes</span>
          <span style={{ color: '#C4622D' }}>→</span>
        </Link>
        <a href="/" target="_blank" rel="noopener noreferrer" style={S.linkCard}>
          <span>↗ Preview Live Site</span>
          <span style={{ color: '#C4622D' }}>→</span>
        </a>
      </div>

      {/* Config info */}
      <div style={S.section}>
        <div style={S.sectionTitle}>Site Configuration</div>
        <div style={{ background: '#fff', borderRadius: 14, padding: '16px 20px', boxShadow: '0 2px 8px rgba(28,16,8,0.07)' }}>
          <div style={S.infoRow}>
            <span style={{ color: 'rgba(28,16,8,0.5)' }}>WhatsApp Number</span>
            <span style={{ fontWeight: 600 }}>{WHATSAPP_NUMBER || <span style={{ color: '#e53935' }}>⚠ Not set</span>}</span>
          </div>
          <div style={S.infoRow}>
            <span style={{ color: 'rgba(28,16,8,0.5)' }}>Phone</span>
            <span style={{ fontWeight: 600 }}>{CAFE_PHONE || <span style={{ color: '#e53935' }}>⚠ Not set</span>}</span>
          </div>
          <div style={{ ...S.infoRow, borderBottom: 'none' }}>
            <span style={{ color: 'rgba(28,16,8,0.5)' }}>Today's Hours</span>
            <span style={{ fontWeight: 600 }}>
              {(() => {
                const today = cafeHours.find(h => h.day === now.getDay())
                return today ? `${today.open} – ${today.close}` : 'Closed today'
              })()}
              <span style={{
                marginLeft: 8, fontSize: 11, fontWeight: 700,
                color: isOpen ? '#4caf50' : '#e53935',
                background: isOpen ? 'rgba(76,175,80,0.1)' : 'rgba(229,57,53,0.1)',
                padding: '2px 7px', borderRadius: 999,
              }}>
                {label}
              </span>
            </span>
          </div>
        </div>
        <p style={{ fontSize: 12, color: 'rgba(28,16,8,0.4)', marginTop: 10 }}>
          To update WhatsApp number, phone, or hours — edit your .env.local file and redeploy.
        </p>
      </div>
    </div>
  )
}
