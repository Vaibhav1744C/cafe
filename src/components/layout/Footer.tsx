import { CAFE_PHONE } from '../../data/config'

export default function Footer() {
  const phone = CAFE_PHONE || '+91-XXXXXXXXXX'
  const year  = new Date().getFullYear()

  return (
    <footer className="bg-espresso text-cream" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:items-start">

          {/* Brand + address */}
          <div className="flex flex-col gap-2">
            <p className="font-display text-xl font-bold tracking-wide">
              Brew &amp; Bloom Cafe
            </p>
            <address className="not-italic text-sm text-offwhite leading-relaxed">
              123 Bloom Street<br />
              Bengaluru, Karnataka 560001
            </address>
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-1.5 text-sm text-offwhite hover:text-cream transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded"
              aria-label={`Call us at ${phone}`}
            >
              {/* Phone icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 shrink-0"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6.09 6.09l.99-.99a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {phone}
            </a>
          </div>

          {/* Social links */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-offwhite uppercase tracking-widest">
              Follow Us
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-offwhite hover:text-cream transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded"
              >
                {/* Instagram SVG icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-offwhite hover:text-cream transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber rounded"
              >
                {/* Facebook SVG icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-white/10 text-xs text-offwhite text-center">
          &copy; {year} Brew &amp; Bloom Cafe. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
