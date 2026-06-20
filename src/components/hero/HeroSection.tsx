import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const VIDEO_SRC =
  'https://player.vimeo.com/external/371867710.hd.mp4?s=3c36d2c4b71d4be46f7a22ef218b45af'
const POSTER_SRC =
  'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=1920'

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)

  /** When the video fails to load, reveal the poster as a plain <img> fallback */
  const handleVideoError = () => {
    const video = videoRef.current
    if (!video) return
    video.style.display = 'none'
    const img = document.createElement('img')
    img.src = POSTER_SRC
    img.alt = ''
    img.setAttribute('aria-hidden', 'true')
    img.style.cssText =
      'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;'
    video.parentElement?.appendChild(img)
  }

  /* ── Animation variants ──────────────────────────────────────────── */
  const headlineVariants = prefersReducedMotion
    ? {}
    : {
        initial: {
          opacity: 0,
          y: 30,
          fontVariationSettings: "'wght' 200",
        },
        animate: {
          opacity: 1,
          y: 0,
          fontVariationSettings: "'wght' 700",
          transition: { duration: 1.2, ease: 'easeOut' },
        },
      }

  const subtextVariants = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: 'easeOut', delay: 0.4 },
        },
      }

  const ctaVariants = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: 'easeOut', delay: 0.8 },
        },
      }

  return (
    <section
      id="hero"
      className="min-h-screen w-full relative flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── Background video ─────────────────────────────────────────── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        autoPlay
        muted
        loop
        playsInline
        onError={handleVideoError}
        aria-hidden="true"
      />

      {/* ── Dark overlay ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Headline */}
        <motion.h1
          className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight"
          style={{
            color: 'var(--color-cream)',
            textShadow: '0 2px 16px rgba(0,0,0,0.6)',
            fontFamily: 'var(--font-display)',
            /* Ensure the variable font axis is active from the start */
            fontVariationSettings: prefersReducedMotion
              ? "'wght' 700"
              : undefined,
          }}
          {...(prefersReducedMotion ? {} : headlineVariants)}
        >
          Where Every Sip Tells a Story
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="mt-4 text-lg md:text-xl max-w-xl"
          style={{
            color: 'var(--color-offwhite)',
            textShadow: '0 1px 8px rgba(0,0,0,0.5)',
            fontFamily: 'var(--font-body)',
          }}
          {...(prefersReducedMotion ? {} : subtextVariants)}
        >
          Artisan coffee, wholesome food, and a warm corner to call your own.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="mt-8 flex flex-col sm:flex-row gap-4"
          {...(prefersReducedMotion ? {} : ctaVariants)}
        >
          <button
            type="button"
            onClick={() => scrollToSection('menu')}
            className="
              px-8 py-4 rounded-full font-semibold text-base
              transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber
              hover:scale-105 active:scale-95
            "
            style={{
              backgroundColor: 'var(--color-amber)',
              color: 'var(--color-cream)',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.backgroundColor =
                '#b3561f'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.backgroundColor =
                'var(--color-amber)'
            }}
          >
            View Menu
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('location')}
            className="
              px-8 py-4 rounded-full font-semibold text-base
              border-2 transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cream
              hover:scale-105 active:scale-95
            "
            style={{
              borderColor: 'var(--color-cream)',
              color: 'var(--color-cream)',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement
              btn.style.backgroundColor = 'rgba(245,236,215,0.15)'
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement
              btn.style.backgroundColor = 'transparent'
            }}
          >
            Visit Us
          </button>
        </motion.div>
      </div>
    </section>
  )
}
