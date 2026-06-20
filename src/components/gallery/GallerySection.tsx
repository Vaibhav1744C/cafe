/**
 * GallerySection — Photo gallery with masonry grid and lightbox.
 *
 * Uses 12 picsum.photos images with cafe-themed alt text.
 * Manages the open/close state for the Lightbox overlay.
 */

import { useState } from 'react'
import MasonryGrid from './MasonryGrid'
import Lightbox from './Lightbox'

const GALLERY_IMAGES = [
  { src: 'https://picsum.photos/seed/cafe-interior/600/800', alt: 'Cosy cafe interior with warm lighting' },
  { src: 'https://picsum.photos/seed/latte-art/600/400', alt: 'Latte art rosette in a ceramic cup' },
  { src: 'https://picsum.photos/seed/cafe-window/600/700', alt: 'Sunny window seat with a book and coffee' },
  { src: 'https://picsum.photos/seed/barista-pour/600/500', alt: 'Barista pouring steamed milk over espresso' },
  { src: 'https://picsum.photos/seed/coffee-beans/600/600', alt: 'Freshly roasted coffee beans on a wooden surface' },
  { src: 'https://picsum.photos/seed/cafe-pastry/600/450', alt: 'Flaky croissants and pastries on a display shelf' },
  { src: 'https://picsum.photos/seed/cold-brew-glass/600/800', alt: 'Cold brew served over ice in a tall glass' },
  { src: 'https://picsum.photos/seed/cafe-outdoor/600/500', alt: 'Outdoor seating area with plants and string lights' },
  { src: 'https://picsum.photos/seed/tiramisu-jar/600/600', alt: 'Tiramisu served in a charming glass jar' },
  { src: 'https://picsum.photos/seed/cafe-counter/600/400', alt: 'Espresso machine and coffee bar counter' },
  { src: 'https://picsum.photos/seed/avocado-toast-plate/600/700', alt: 'Sourdough avocado toast on a rustic plate' },
  { src: 'https://picsum.photos/seed/cafe-friends/600/500', alt: 'Friends enjoying coffee and conversation at a cafe table' },
]

export default function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--color-offwhite)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            id="gallery-heading"
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-espresso)',
            }}
          >
            Gallery
          </h2>
          <p
            className="mt-3 text-lg opacity-70"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-espresso)',
            }}
          >
            A glimpse into our world — one cup at a time.
          </p>
        </div>

        {/* Masonry grid */}
        <MasonryGrid images={GALLERY_IMAGES} onOpen={setSelectedIndex} />
      </div>

      {/* Lightbox overlay */}
      {selectedIndex !== null && (
        <Lightbox
          images={GALLERY_IMAGES}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </section>
  )
}
