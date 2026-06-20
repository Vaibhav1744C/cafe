/**
 * LocationSection — Map, hours, open status, parking info, and directions.
 *
 * - Embeds Google Maps via MAPS_EMBED_URL from config
 * - Falls back to address text if the URL is empty
 * - Displays live "Open Now" / "Closed" badge via useOpenStatus
 * - "Get Directions" button links to Google Maps deep link
 */

import { useState } from 'react'
import { cafeHours } from '@/data/hours'
import { useOpenStatus } from '@/hooks/useOpenStatus'
import { MAPS_EMBED_URL } from '@/data/config'

const DIRECTIONS_URL = 'https://maps.google.com/?q=123+Bloom+Street+Bengaluru'
const ADDRESS = '123 Bloom Street, Indiranagar, Bengaluru — 560 038'
const PHONE = '+91 98765 43210'

/** Day name from index */
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number)
  const period = h < 12 ? 'AM' : 'PM'
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour}:${String(m).padStart(2, '0')} ${period}`
}

export default function LocationSection() {
  const { isOpen, label } = useOpenStatus(cafeHours)
  const [mapError, setMapError] = useState(false)

  const showMap = MAPS_EMBED_URL && !mapError

  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--color-cream)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            id="location-heading"
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-espresso)',
            }}
          >
            Find Us
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Map embed */}
          <div className="w-full lg:flex-1 rounded-2xl overflow-hidden shadow-lg min-h-72">
            {showMap ? (
              <iframe
                src={MAPS_EMBED_URL}
                title="Brew & Bloom Cafe on Google Maps"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-72 lg:h-96 border-0"
                onError={() => setMapError(true)}
                aria-label="Google Maps showing cafe location"
              />
            ) : (
              /* Fallback address card when iframe isn't available */
              <div
                className="w-full h-72 lg:h-96 flex flex-col items-center justify-center gap-4 rounded-2xl"
                style={{
                  backgroundColor: 'rgba(28,16,8,0.06)',
                  border: '1px solid rgba(28,16,8,0.12)',
                }}
              >
                <span className="text-4xl" aria-hidden="true">📍</span>
                <p
                  className="text-center text-sm max-w-xs leading-relaxed"
                  style={{ color: 'var(--color-espresso)', fontFamily: 'var(--font-body)' }}
                >
                  {ADDRESS}
                </p>
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold underline"
                  style={{ color: 'var(--color-amber)' }}
                >
                  View on Google Maps ↗
                </a>
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className="w-full lg:w-80 flex flex-col gap-8">
            {/* Open/Closed badge */}
            <div>
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  backgroundColor: isOpen
                    ? 'rgba(125, 158, 110, 0.15)'
                    : 'rgba(180, 60, 60, 0.12)',
                  color: isOpen ? '#3a7a32' : '#c03030',
                  border: `1px solid ${isOpen ? 'rgba(125,158,110,0.35)' : 'rgba(180,60,60,0.25)'}`,
                }}
                aria-live="polite"
                aria-atomic="true"
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: isOpen ? '#4caf50' : '#e53935',
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                {label}
              </span>
            </div>

            {/* Address */}
            <div>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: 'var(--color-espresso)', opacity: 0.5 }}
              >
                Address
              </h3>
              <address
                className="not-italic text-sm leading-relaxed"
                style={{ color: 'var(--color-espresso)', fontFamily: 'var(--font-body)' }}
              >
                {ADDRESS}
              </address>
            </div>

            {/* Phone */}
            <div>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: 'var(--color-espresso)', opacity: 0.5 }}
              >
                Phone
              </h3>
              <a
                href={`tel:${PHONE.replace(/\s/g, '')}`}
                className="text-sm font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 rounded"
                style={{ color: 'var(--color-amber)' }}
              >
                {PHONE}
              </a>
            </div>

            {/* Hours */}
            <div>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: 'var(--color-espresso)', opacity: 0.5 }}
              >
                Hours
              </h3>
              <ul className="space-y-1.5">
                {cafeHours.map((h) => (
                  <li
                    key={h.day}
                    className="flex justify-between text-sm"
                    style={{ color: 'var(--color-espresso)', fontFamily: 'var(--font-body)' }}
                  >
                    <span className="opacity-70">{DAY_NAMES[h.day]}</span>
                    <span>
                      {formatTime(h.open)} – {formatTime(h.close)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Parking */}
            <div
              className="rounded-xl p-4 text-sm"
              style={{
                backgroundColor: 'rgba(196,98,45,0.08)',
                border: '1px solid rgba(196,98,45,0.2)',
                color: 'var(--color-espresso)',
                fontFamily: 'var(--font-body)',
              }}
            >
              <span className="font-semibold" style={{ color: 'var(--color-amber)' }}>
                🅿 Parking
              </span>
              <p className="mt-1 leading-relaxed opacity-80">
                Free parking available on Bloom Street and adjacent lanes.
              </p>
            </div>

            {/* Get Directions CTA */}
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center gap-2
                px-6 py-3 rounded-full text-sm font-semibold
                transition-all duration-200 hover:scale-105 active:scale-95
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              "
              style={{
                backgroundColor: 'var(--color-amber)',
                color: 'var(--color-cream)',
                '--tw-ring-color': 'var(--color-amber)',
              } as React.CSSProperties}
            >
              <span aria-hidden="true">🗺</span>
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
