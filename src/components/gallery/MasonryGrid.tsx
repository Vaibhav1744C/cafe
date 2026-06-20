/**
 * MasonryGrid — CSS columns-based masonry layout.
 *
 * 2 columns on mobile, 3 columns on desktop.
 * Each image uses `break-inside-avoid` to prevent column-breaks mid-image.
 */

import GalleryImage from './GalleryImage'

interface MasonryGridProps {
  images: Array<{ src: string; alt: string }>
  onOpen: (index: number) => void
}

export default function MasonryGrid({ images, onOpen }: MasonryGridProps) {
  return (
    <div
      className="columns-2 md:columns-3 gap-4"
      style={{ columnGap: '1rem' }}
    >
      {images.map((image, index) => (
        <div
          key={`${image.src}-${index}`}
          className="break-inside-avoid mb-4"
        >
          <GalleryImage
            src={image.src}
            alt={image.alt}
            onClick={() => onOpen(index)}
          />
        </div>
      ))}
    </div>
  )
}
