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
    </main>
  )
}

export default Home
