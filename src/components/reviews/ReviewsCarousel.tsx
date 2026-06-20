/**
 * ReviewsCarousel — Auto-scrolling testimonial marquee.
 *
 * - Scrolls continuously via CSS animation
 * - Duplicates testimonials array for seamless loop
 * - Pauses on mouse hover and touch
 * - Falls back to a static flex-wrap list when useReducedMotion() is true
 */

import { useState, useRef } from 'react'
import { testimonials } from '@/data/testimonials'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/** Render star rating as filled (★) or empty (☆) star characters */
function StarRating({ rating }: { rating: number }) {
  return (
    <span aria-label={`${rating} out of 5 stars`} role="img">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ color: i < rating ? 'var(--color-amber)' : 'rgba(245,236,215,0.3)' }}
        >
          {i < rating ? '★' : '☆'}
        </span>
      ))}
    </span>
  )
}

function ReviewCard({ name, text, rating }: { name: string; text: string; rating: number }) {
  return (
    <article
      className="flex-shrink-0 w-72 md:w-80 rounded-2xl p-6 mx-3"
      style={{
        backgroundColor: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(245,236,215,0.12)',
      }}
    >
      <StarRating rating={rating} />
      <blockquote
        className="mt-3 text-sm leading-relaxed"
        style={{ color: 'var(--color-offwhite)', fontFamily: 'var(--font-body)' }}
      >
        "{text}"
      </blockquote>
      <footer
        className="mt-4 text-sm font-semibold"
        style={{ color: 'var(--color-cream)', fontFamily: 'var(--font-display)' }}
      >
        — {name}
      </footer>
    </article>
  )
}

export default function ReviewsCarousel() {
  const prefersReducedMotion = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  // Duplicate for seamless infinite scroll
  const doubled = [...testimonials, ...testimonials]

  // Fallback: static list when reduced motion is preferred
  if (prefersReducedMotion) {
    return (
      <section
        id="reviews"
        aria-labelledby="reviews-heading"
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: 'var(--color-espresso)' }}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            id="reviews-heading"
            className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-12"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
          >
            What Our Guests Say
          </h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {testimonials.map((t) => (
              <ReviewCard key={t.id} name={t.name} text={t.text} rating={t.rating} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="py-20 overflow-hidden"
      style={{ backgroundColor: 'var(--color-espresso)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="reviews-heading"
          className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-12"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
        >
          What Our Guests Say
        </h2>
      </div>

      {/* Marquee track */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        aria-label="Customer testimonials carousel"
      >
        <div
          ref={trackRef}
          className="flex"
          style={{
            animation: `marquee 40s linear infinite`,
            animationPlayState: paused ? 'paused' : 'running',
            width: 'max-content',
          }}
        >
          {doubled.map((t, i) => (
            <ReviewCard key={`${t.id}-${i}`} name={t.name} text={t.text} rating={t.rating} />
          ))}
        </div>

        {/* Gradient fade edges */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-24"
          style={{
            background: `linear-gradient(to right, var(--color-espresso), transparent)`,
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-24"
          style={{
            background: `linear-gradient(to left, var(--color-espresso), transparent)`,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Keyframe definition via inline style tag */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
