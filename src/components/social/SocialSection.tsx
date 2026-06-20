import { instagramPosts } from '../../data/instagramPosts'

// Instagram SVG icon (inline, no external dependency)
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function SocialSection() {
  // Use only first 9 posts for the 3×3 grid
  const posts = instagramPosts.slice(0, 9)

  return (
    <section id="social" className="bg-espresso py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">

        {/* Heading with Instagram icon */}
        <div className="flex items-center justify-center gap-2.5 mb-3">
          <InstagramIcon className="w-7 h-7 text-cream" />
          <h2 className="font-display text-3xl font-bold text-cream">
            Follow Along
          </h2>
        </div>
        <p className="text-center text-offwhite text-sm mb-8">
          See what's brewing at Brew &amp; Bloom.
        </p>

        {/* 3×3 Instagram Grid */}
        <div
          className="grid grid-cols-3 gap-1 sm:gap-1.5 rounded-xl overflow-hidden"
          aria-label="Instagram photo grid"
        >
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={post.altText ?? `View Instagram post`}
              className="relative aspect-square overflow-hidden block group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
            >
              <img
                src={post.imageUrl}
                alt={post.altText ?? ''}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
              />
              {/* Hover overlay */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-espresso/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </a>
          ))}
        </div>

        {/* Delivery platform CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://www.zomato.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border-2 border-cream/40 text-cream text-sm font-semibold px-6 py-2.5 hover:border-cream hover:bg-white/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
          >
            Order on Zomato
          </a>
          <a
            href="https://www.swiggy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border-2 border-cream/40 text-cream text-sm font-semibold px-6 py-2.5 hover:border-cream hover:bg-white/5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
          >
            Order on Swiggy
          </a>
        </div>

        {/* WhatsApp preference note */}
        <p className="mt-5 text-center text-xs text-offwhite/60">
          Direct WhatsApp orders support us more 💛
        </p>
      </div>
    </section>
  )
}
