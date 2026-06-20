import HeroSection from '@/components/hero/HeroSection'
import SignatureShowcase from '@/components/menu/SignatureShowcase'
import MenuSection from '@/components/menu/MenuSection'
import GallerySection from '@/components/gallery/GallerySection'
import AboutSection from '@/components/AboutSection'
import ReviewsCarousel from '@/components/reviews/ReviewsCarousel'
import LocationSection from '@/components/location/LocationSection'
import ReservationForm from '@/components/ReservationForm'
import EventsSection from '@/components/events/EventsSection'
import NewsletterForm from '@/components/newsletter/NewsletterForm'
import SocialSection from '@/components/social/SocialSection'

/**
 * Home page — assembles all landing-page sections in order.
 *
 * Each section component owns its own `id` for smooth-scroll targeting
 * from the Navbar and Hero CTAs.
 */
function Home() {
  return (
    <main>
      {/* 1. Hero — full-viewport video intro (id="hero") */}
      <HeroSection />

      {/* 2. Signature showcase — highlighted menu items (id="signatures") */}
      <SignatureShowcase />

      {/* 3. Menu — full interactive menu with cart (id="menu") */}
      <MenuSection />

      {/* 4. Gallery — masonry photo grid with lightbox (id="gallery") */}
      <GallerySection />

      {/* 5. About — founder story (id="about") */}
      <AboutSection />

      {/* 6. Reviews — auto-scrolling testimonials (id="reviews") */}
      <ReviewsCarousel />

      {/* 7. Location — map, hours, directions (id="location") */}
      <LocationSection />

      {/* 8. Reservation — WhatsApp booking form (id="reservation") */}
      <ReservationForm />

      {/* 9. Events — upcoming and past events (id="events") */}
      <EventsSection />

      {/* 10. Newsletter — email/phone signup */}
      <NewsletterForm />

      {/* 11. Social — Instagram grid and delivery links (id="social") */}
      <SocialSection />

      {/* 12. Order on Delivery Apps */}
      <section style={{ background: '#1C1008', padding: '48px 16px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#F5ECD7', fontSize: 13, marginBottom: 8, opacity: 0.6, letterSpacing: 1, textTransform: 'uppercase' }}>
            Prefer delivery?
          </p>
          <h2 style={{ color: '#F5ECD7', fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
            Order Online
          </h2>
          <p style={{ color: '#EDE8DF', fontSize: 14, opacity: 0.7, marginBottom: 32 }}>
            Also available on your favourite food delivery apps.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://www.zomato.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', borderRadius: 12,
                background: '#E23744', color: '#fff',
                fontWeight: 700, fontSize: 15, textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(226,55,68,0.4)',
              }}
            >
              🍽 Order on Zomato
            </a>
            <a
              href="https://www.swiggy.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', borderRadius: 12,
                background: '#FC8019', color: '#fff',
                fontWeight: 700, fontSize: 15, textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(252,128,25,0.4)',
              }}
            >
              🛵 Order on Swiggy
            </a>
          </div>
          <p style={{ marginTop: 20, fontSize: 12, color: '#EDE8DF', opacity: 0.45 }}>
            Direct WhatsApp orders help us avoid commission fees 💛
          </p>
        </div>
      </section>
    </main>
  )
}

export default Home
