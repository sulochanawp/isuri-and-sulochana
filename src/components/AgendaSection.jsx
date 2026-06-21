import { AGENDA, WEDDING } from '../config'
import { LotusDivider, FloralStripe, FloralCorner } from './Hero'

/* ── Prominent venue banner ──────────────────────────── */
function VenueBanner() {
  return (
    <div className="mb-16 bg-olive-800 text-pearl-100 relative overflow-hidden"
      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' stroke=\'%23F5F2EA\' stroke-width=\'0.35\' opacity=\'0.07\'%3E%3Cpath d=\'M20 2 L38 20 L20 38 L2 20 Z\'/%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'1.5\' fill=\'%23F5F2EA\'/%3E%3C/g%3E%3C/svg%3E")' }}
    >
      {/* Floral stripe top */}
      <FloralStripe light />

      <div className="px-6 py-10 text-center relative">
        {/* Floral corner ornaments */}
        <FloralCorner className="absolute top-4 left-4 text-olive-400 w-10 h-10" />
        <FloralCorner className="absolute top-4 right-4 text-olive-400 w-10 h-10 rotate-90" />
        <FloralCorner className="absolute bottom-4 left-4 text-olive-400 w-10 h-10 -rotate-90" />
        <FloralCorner className="absolute bottom-4 right-4 text-olive-400 w-10 h-10 rotate-180" />

        <p className="text-pearl-300/45 text-xs tracking-[0.4em] uppercase font-sans mb-1">Ceremony & Reception Venue</p>
        <h3 className="font-serif text-3xl md:text-4xl text-pearl-100 font-light tracking-wide mb-2">
          {WEDDING.venue.name}
        </h3>
        <p className="text-pearl-300/60 font-sans text-sm mb-1">{WEDDING.venue.address}</p>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-xs font-sans tracking-widest uppercase text-pearl-300/50">
          <span>Ceremony · {WEDDING.venue.ceremonyTime}</span>
          <span className="w-1 h-1 rotate-45 bg-olive-400 inline-block" />
          <span>Reception · {WEDDING.venue.receptionTime}</span>
        </div>

        {/* Open in Maps link */}
        {WEDDING.venue.mapsUrl && (
          <a
            href={WEDDING.venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 border border-pearl-300/25 px-6 py-2.5
                       text-pearl-200 hover:bg-pearl-100/10 hover:border-pearl-300/50
                       transition-all duration-200 text-xs tracking-[0.2em] uppercase font-sans group"
          >
            <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
            </svg>
            <span className="group-hover:underline underline-offset-2">Open in Google Maps</span>
            <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
              <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
              <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
            </svg>
          </a>
        )}
      </div>

      {/* Embedded map */}
      {WEDDING.venue.mapsEmbed && (
        <div className="relative w-full" style={{ height: 360 }}>
          <div className="absolute inset-0 bg-olive-900/10 pointer-events-none z-10" />
          <iframe
            src={WEDDING.venue.mapsEmbed}
            width="100%"
            height="360"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Venue map"
          />
        </div>
      )}

      {/* Floral stripe bottom */}
      <FloralStripe light />
    </div>
  )
}

/* ── Agenda section ─────────────────────────────────── */
export default function AgendaSection() {
  return (
    <section id="agenda" className="pt-24 pb-0 bg-white">
      <div className="max-w-3xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-olive-500 text-xs tracking-[0.4em] uppercase font-sans mb-3">
            {WEDDING.date}
          </p>
          <h2 className="section-heading">The Day</h2>
          <LotusDivider />
          <p className="text-muted text-sm mt-4 max-w-md mx-auto leading-relaxed">
            Here's a glimpse of how our day will unfold. We can't wait to share every moment with you.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pb-20">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-olive-100 md:-translate-x-px" />

          <div className="space-y-6">
            {AGENDA.map((item, i) => (
              <div
                key={i}
                className={`relative flex items-start gap-6 md:gap-0 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`ml-16 md:ml-0 md:w-5/12 ${i % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left'}`}>
                  <div className="border border-line hover:border-olive-300 transition-colors duration-300 p-5 bg-pearl-50 group">
                    <span className="text-olive-500 text-xs tracking-[0.25em] uppercase font-sans block mb-1">
                      {item.time}
                    </span>
                    <h3 className="font-serif text-lg text-ink font-light mb-1">{item.title}</h3>
                    <p className="text-muted text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* Centre marker */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10 top-5">
                  <div className="relative w-8 h-8 flex items-center justify-center bg-white border border-olive-200">
                    <div className="w-2.5 h-2.5 rotate-45 bg-olive-400" />
                  </div>
                </div>

                <div className="hidden md:block md:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Full-width venue banner at the bottom of Agenda ── */}
      <VenueBanner />
    </section>
  )
}
