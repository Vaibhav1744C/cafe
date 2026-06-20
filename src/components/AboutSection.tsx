/**
 * AboutSection — The Brew & Bloom founder story.
 *
 * Authentic narrative about Arjun and how the cafe was founded in 2019.
 * No statistics or counters — per Requirement 5.2.
 */

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--color-cream)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Portrait */}
          <div className="shrink-0 w-full lg:w-72">
            <div className="rounded-2xl overflow-hidden shadow-lg aspect-[3/4] w-full max-w-xs mx-auto lg:max-w-none">
              <img
                src="https://picsum.photos/seed/cafe-founder/480/640"
                alt="Arjun, founder of Brew & Bloom Cafe"
                loading="lazy"
                width={480}
                height={640}
                className="w-full h-full object-cover"
                onError={(e) => {
                  ;(e.currentTarget as HTMLImageElement).src =
                    'https://picsum.photos/seed/fallback-portrait/480/640'
                }}
              />
            </div>
          </div>

          {/* Story */}
          <div className="flex-1">
            <h2
              id="about-heading"
              className="text-4xl md:text-5xl font-bold tracking-tight leading-tight"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-espresso)',
              }}
            >
              Where Coffee Became a Calling
            </h2>

            <div
              className="mt-6 space-y-5 text-base md:text-lg leading-relaxed"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-espresso)',
                opacity: 0.85,
              }}
            >
              <p>
                It started with a thermos and a long commute. Every morning,
                Arjun would brew himself a cup before the chaos of the day — a
                ritual that kept him sane through years of spreadsheets and
                boardrooms. But somewhere along the way, the coffee stopped
                being about the caffeine and started being about the craft.
              </p>

              <p>
                In 2019, after a decade in corporate finance, Arjun made the
                leap most people only dream about. He quit his job, spent six
                months learning to pull espresso shots from a specialty roaster
                in Coorg, and came home with a plan. Not a business plan — just
                a deep, stubborn belief that Bengaluru deserved a cafe where
                every single cup was made with intention.
              </p>

              <p>
                Brew &amp; Bloom opened its doors on a quiet lane off Indiranagar
                with mismatched chairs, a secondhand La Marzocco, and a short
                menu of things Arjun genuinely loved to make. The name was his
                mother's idea — she always said the best mornings start with
                something that blooms in the cup.
              </p>

              <p>
                Five years on, the chairs are still mismatched. The machine has
                been replaced once. And the menu has grown, slowly and
                deliberately, the same way Arjun approaches everything — with
                patience, curiosity, and an unreasonable amount of care.
              </p>
            </div>

            <p
              className="mt-8 text-lg font-semibold italic"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-amber)',
              }}
            >
              — Arjun, Founder &amp; Head Barista
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
