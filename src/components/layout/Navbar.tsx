import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Menu',          href: '#menu' },
  { label: 'Gallery',       href: '#gallery' },
  { label: 'About',         href: '#about' },
  { label: 'Reviews',       href: '#reviews' },
  { label: 'Location',      href: '#location' },
  { label: 'Events',        href: '#events' },
  { label: 'Reserve Table', href: '#reservation', highlight: true },
]

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false)
  const [menuOpen,     setMenuOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <>
      <nav
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-espresso shadow-md'
            : 'bg-transparent',
        ].join(' ')}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="/"
            className="font-display text-xl font-bold text-cream tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded"
          >
            Brew &amp; Bloom
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-6" role="list">
            {NAV_LINKS.map(({ label, href, highlight }) => (
              <li key={href}>
                <a
                  href={href}
                  className={
                    highlight
                      ? 'text-sm font-semibold px-4 py-2 rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber'
                      : 'text-sm text-offwhite hover:text-cream transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded px-1'
                  }
                  style={highlight ? { background: '#C4622D', color: '#F5ECD7' } : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger button (mobile only) */}
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
          >
            <span
              className={[
                'block w-6 h-0.5 bg-cream transition-all duration-300',
                menuOpen ? 'rotate-45 translate-y-2' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block w-6 h-0.5 bg-cream transition-all duration-300',
                menuOpen ? 'opacity-0' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block w-6 h-0.5 bg-cream transition-all duration-300',
                menuOpen ? '-rotate-45 -translate-y-2' : '',
              ].join(' ')}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        className={[
          'fixed inset-x-0 top-16 z-40 bg-espresso shadow-lg md:hidden transition-all duration-300 overflow-hidden',
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <ul className="flex flex-col px-6 py-4 gap-1" role="list">
          {NAV_LINKS.map(({ label, href, highlight }) => (
            <li key={href}>
              <a
                href={href}
                onClick={handleLinkClick}
                className="block py-3 text-base transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded px-1"
                style={highlight ? { color: '#C4622D', fontWeight: 700 } : { color: '#EDE8DF' }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
