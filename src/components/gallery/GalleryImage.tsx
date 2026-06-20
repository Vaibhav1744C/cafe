/**
 * GalleryImage — lazy-loaded image with CSS blur-up effect.
 *
 * Starts blurred + slightly scaled up, transitions to sharp once loaded.
 * Falls back to a neutral picsum placeholder on error.
 */

import { useState } from 'react'

interface GalleryImageProps {
  src: string
  alt: string
  onClick: () => void
}

const FALLBACK_SRC = 'https://picsum.photos/seed/fallback-img/600/400'

export default function GalleryImage({ src, alt, onClick }: GalleryImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg overflow-hidden"
      style={{ '--tw-ring-color': 'var(--color-amber)' } as React.CSSProperties}
      aria-label={`View photo: ${alt}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        width={600}
        height={400}
        className="w-full h-auto block transition-all duration-500"
        style={{
          filter: loaded ? 'blur(0px)' : 'blur(8px)',
          transform: loaded ? 'scale(1)' : 'scale(1.05)',
        }}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          ;(e.currentTarget as HTMLImageElement).src = FALLBACK_SRC
          setLoaded(true)
        }}
      />
    </button>
  )
}
