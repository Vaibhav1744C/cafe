import { CAFE_PHONE } from '../../data/config'

const MAPS_URL = 'https://maps.google.com/?q=Brew+%26+Bloom+Cafe%2C+Bengaluru'

function scrollToMenu() {
  const el = document.getElementById('menu')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function StickyBar() {
  const phone = CAFE_PHONE || '+91-XXXXXXXXXX'

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-espresso border-t-2 border-amber"
      style={{ minHeight: '56px' }}
      aria-label="Quick actions"
      role="navigation"
    >
      <div className="flex items-stretch h-14">
        {/* Call */}
        <a
          href={`tel:${phone}`}
          className="flex flex-1 flex-col items-center justify-center gap-0.5 text-cream text-xs font-medium min-h-11 hover:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-inset"
          aria-label="Call the cafe"
        >
          <span aria-hidden="true" className="text-lg leading-none">📞</span>
          <span>Call</span>
        </a>

        {/* Divider */}
        <div className="w-px bg-amber/40 self-stretch" aria-hidden="true" />

        {/* Directions */}
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 flex-col items-center justify-center gap-0.5 text-cream text-xs font-medium min-h-11 hover:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-inset"
          aria-label="Get directions"
        >
          <span aria-hidden="true" className="text-lg leading-none">📍</span>
          <span>Directions</span>
        </a>

        {/* Divider */}
        <div className="w-px bg-amber/40 self-stretch" aria-hidden="true" />

        {/* Order Now */}
        <button
          type="button"
          onClick={scrollToMenu}
          className="flex flex-1 flex-col items-center justify-center gap-0.5 text-cream text-xs font-medium min-h-11 hover:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-inset"
          aria-label="Scroll to menu to order"
        >
          <span aria-hidden="true" className="text-lg leading-none">🛒</span>
          <span>Order Now</span>
        </button>
      </div>
    </div>
  )
}
