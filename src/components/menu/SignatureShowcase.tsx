/**
 * SignatureShowcase — "House Signatures" section
 *
 * Displays the 3–5 menu items flagged `isSignature: true` as large cards
 * with staggered scroll-triggered reveal animations (Framer Motion whileInView).
 * Animations are disabled when `useReducedMotion()` returns true.
 */

import { motion } from 'framer-motion'
import { menuItems } from '@/data/menu'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import SteamEffect from '@/components/effects/SteamEffect'

const signatureItems = menuItems.filter((item) => item.isSignature)

export default function SignatureShowcase() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="signatures"
      aria-labelledby="signatures-heading"
      className="relative py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--color-espresso)', color: 'var(--color-cream)' }}
    >
      {/* ── Section heading ───────────────────────────────────────── */}
      <div className="relative max-w-6xl mx-auto text-center mb-14">
        <div className="relative inline-block">
          <SteamEffect className="absolute -top-8 left-1/2 -translate-x-1/2" />
          <h2
            id="signatures-heading"
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-cream)' }}
          >
            House Signatures
          </h2>
        </div>
        <p
          className="mt-4 text-lg max-w-xl mx-auto opacity-80"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-offwhite)' }}
        >
          Crafted with care, loved by all. These are the cups and plates that
          define Brew&nbsp;&amp;&nbsp;Bloom.
        </p>
      </div>

      {/* ── Cards grid ───────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {signatureItems.map((item, index) => {
          const cardContent = (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(245,236,215,0.12)',
              }}
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    ;(e.currentTarget as HTMLImageElement).src =
                      'https://picsum.photos/seed/fallback-sig/400/400'
                  }}
                />
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col gap-2 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <h3
                    className="text-xl font-semibold"
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: 'var(--color-cream)',
                    }}
                  >
                    {item.name}
                  </h3>
                  <span
                    className="text-lg font-bold shrink-0"
                    style={{ color: 'var(--color-amber)' }}
                  >
                    ₹{item.price}
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed opacity-75"
                  style={{ color: 'var(--color-offwhite)', fontFamily: 'var(--font-body)' }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          )

          // No animation when reduced motion is preferred
          if (prefersReducedMotion) {
            return <div key={item.id}>{cardContent}</div>
          }

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
                delay: index * 0.15,
              }}
            >
              {cardContent}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
