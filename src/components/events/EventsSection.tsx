/**
 * EventsSection — Upcoming and past events.
 *
 * - Upcoming events (date >= today) shown first, with normal styling
 * - Past events shown after, with muted styling
 * - Empty state message when no upcoming events exist
 */

import { cafeEvents, type CafeEvent } from '@/data/events'

/** Format an ISO date string to a human-readable format e.g. "Aug 15, 2025" */
function formatDate(iso: string): string {
  const date = new Date(iso + 'T00:00:00') // force local-midnight parse
  return date.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function EventCard({ event, isPast }: { event: CafeEvent; isPast: boolean }) {
  return (
    <article
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        backgroundColor: isPast
          ? 'rgba(28, 16, 8, 0.04)'
          : 'white',
        border: `1px solid ${isPast ? 'rgba(28,16,8,0.08)' : 'rgba(28,16,8,0.12)'}`,
        opacity: isPast ? 0.6 : 1,
      }}
      aria-label={isPast ? `Past event: ${event.name}` : `Upcoming event: ${event.name}`}
    >
      {event.image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={event.image}
            alt={event.name}
            loading="lazy"
            width={600}
            height={400}
            className="w-full h-full object-cover"
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).style.display = 'none'
            }}
          />
        </div>
      )}

      <div className="p-6 flex flex-col gap-2 flex-1">
        {isPast && (
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-espresso)', opacity: 0.5 }}
          >
            Past Event
          </span>
        )}

        <h3
          className="text-xl font-bold"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-espresso)',
          }}
        >
          {event.name}
        </h3>

        <time
          dateTime={event.date}
          className="text-sm font-medium"
          style={{ color: 'var(--color-amber)', fontFamily: 'var(--font-body)' }}
        >
          {formatDate(event.date)}
        </time>

        {event.description && (
          <p
            className="text-sm leading-relaxed mt-1"
            style={{
              color: 'var(--color-espresso)',
              fontFamily: 'var(--font-body)',
              opacity: 0.75,
            }}
          >
            {event.description}
          </p>
        )}
      </div>
    </article>
  )
}

export default function EventsSection() {
  const today = new Date().toISOString().slice(0, 10) // "YYYY-MM-DD"

  const upcoming = cafeEvents
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))

  const past = cafeEvents
    .filter((e) => e.date < today)
    .sort((a, b) => b.date.localeCompare(a.date)) // most recent first

  return (
    <section
      id="events"
      aria-labelledby="events-heading"
      className="py-20 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--color-offwhite)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            id="events-heading"
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-espresso)',
            }}
          >
            Events &amp; Happenings
          </h2>
          <p
            className="mt-3 text-lg opacity-70"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-espresso)',
            }}
          >
            Live music, workshops, pop-ups — there's always something brewing.
          </p>
        </div>

        {/* Upcoming events */}
        {upcoming.length === 0 ? (
          <div className="text-center py-16">
            <p
              className="text-lg"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-espresso)',
                opacity: 0.6,
              }}
            >
              No upcoming events. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} isPast={false} />
            ))}
          </div>
        )}

        {/* Past events */}
        {past.length > 0 && (
          <div>
            <h3
              className="text-lg font-semibold mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-espresso)',
                opacity: 0.5,
              }}
            >
              Past Events
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((event) => (
                <EventCard key={event.id} event={event} isPast={true} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
