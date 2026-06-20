import { useState } from 'react'

interface AdminLoginProps {
  onLogin: (pin: string) => boolean
  error: string
}

export default function AdminLogin({ onLogin, error }: AdminLoginProps) {
  const [pin, setPin] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onLogin(pin)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#1C1008', fontFamily: 'var(--font-body)',
    }}>
      <div style={{
        background: '#EDE8DF', borderRadius: 20, padding: '40px 32px',
        width: '100%', maxWidth: 360, boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>☕</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, color: '#1C1008', margin: 0 }}>
            Brew &amp; Bloom
          </h1>
          <p style={{ color: 'rgba(28,16,8,0.5)', fontSize: 13, marginTop: 4 }}>Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1C1008', marginBottom: 6 }}>
            Enter PIN
          </label>
          <input
            type="password"
            inputMode="numeric"
            autoFocus
            value={pin}
            onChange={e => setPin(e.target.value)}
            placeholder="••••"
            maxLength={10}
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '12px 16px', borderRadius: 10,
              border: error ? '2px solid #e53935' : '1.5px solid rgba(28,16,8,0.2)',
              fontSize: 20, letterSpacing: 8, textAlign: 'center',
              background: '#F5ECD7', color: '#1C1008',
              outline: 'none', marginBottom: error ? 8 : 20,
            }}
          />
          {error && (
            <p style={{ color: '#e53935', fontSize: 13, marginBottom: 16, textAlign: 'center' }}>{error}</p>
          )}
          <button
            type="submit"
            style={{
              width: '100%', padding: '13px', borderRadius: 10, border: 'none',
              background: '#C4622D', color: '#F5ECD7',
              fontWeight: 700, fontSize: 15, cursor: 'pointer',
            }}
          >
            Enter Admin
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 11, color: 'rgba(28,16,8,0.35)', marginTop: 20 }}>
          Session clears when you close this tab
        </p>
      </div>
    </div>
  )
}
