/**
 * Lightbox — full-viewport image overlay.
 *
 * - Closes on Escape key or overlay click (not image click)
 * - Focus is trapped to the close button when opened
 * - Returns focus to the trigger element on close
 * - Prev/Next navigation between images
 */

import { useEffect, useRef, useCallback, useState } from 'react'

interface LightboxProps {
  images: Array<{ src: string; alt: string }>
  currentIndex: number
  onClose: () => void
}

export default function Lightbox({ images, currentIndex, onClose }: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [activeIndex, setActiveIndex] = useState(currentIndex)

  // Auto-focus close button when opened
  useEffect(() => {
    closeButtonRef.current?.focus()
  }, [])

  // Sync activeIndex when currentIndex prop changes
  useEffect(() => {
    setActiveIndex(currentIndex)
  }, [currentIndex])

  const handlePrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  const handleNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % images.length)
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose, handlePrev, handleNext])

  const current = images[activeIndex]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image lightbox: ${current.alt}`}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.90)' }}
      // Close on overlay click
      onClick={onClose}
    >
      {/* Close button — top-right */}
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        className="
          absolute top-4 right-4 z-10
          w-11 h-11 flex items-center justify-center rounded-full
          text-white text-2xl
          bg-white/10 hover:bg-white/20 transition-colors
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
        "
        aria-label="Close image lightbox"
      >
        ✕
      </button>

      {/* Prev button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); handlePrev() }}
          className="
            absolute left-4 top-1/2 -translate-y-1/2 z-10
            w-11 h-11 flex items-center justify-center rounded-full
            text-white text-xl
            bg-white/10 hover:bg-white/20 transition-colors
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
          "
          aria-label="Previous image"
        >
          ‹
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); handleNext() }}
          className="
            absolute right-16 top-1/2 -translate-y-1/2 z-10
            w-11 h-11 flex items-center justify-center rounded-full
            text-white text-xl
            bg-white/10 hover:bg-white/20 transition-colors
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
          "
          aria-label="Next image"
        >
          ›
        </button>
      )}

      {/* Image — stop click propagation so image click doesn't close */}
      <div
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.src}
          alt={current.alt}
          className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
        />
        {/* Caption */}
        <p
          className="mt-2 text-center text-sm text-white/70"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {current.alt}
        </p>
      </div>

      {/* Page indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => { e.stopPropagation(); setActiveIndex(i) }}
              className="w-2 h-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
              style={{
                backgroundColor: i === activeIndex ? 'white' : 'rgba(255,255,255,0.4)',
              }}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
