import { WEDDING } from '../config'

/* Full lotus for footer */
function FooterLotus() {
  return (
    <svg viewBox="0 0 100 60" width="100" height="60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 52 Q30 38 30 14 Q40 26 50 34 Q60 26 70 14 Q70 38 50 52Z"
        stroke="#A3B578" strokeWidth="0.8" fill="#A3B578" fillOpacity="0.12"/>
      <path d="M50 48 Q22 40 10 18 Q28 26 44 38"
        stroke="#A3B578" strokeWidth="0.8" fill="#A3B578" fillOpacity="0.08"/>
      <path d="M50 48 Q78 40 90 18 Q72 26 56 38"
        stroke="#A3B578" strokeWidth="0.8" fill="#A3B578" fillOpacity="0.08"/>
      <path d="M50 44 Q10 44 2 24 Q20 28 40 40"
        stroke="#A3B578" strokeWidth="0.6" fill="#A3B578" fillOpacity="0.05"/>
      <path d="M50 44 Q90 44 98 24 Q80 28 60 40"
        stroke="#A3B578" strokeWidth="0.6" fill="#A3B578" fillOpacity="0.05"/>
      <line x1="50" y1="52" x2="50" y2="60" stroke="#A3B578" strokeWidth="0.8"/>
      <circle cx="50" cy="34" r="5"  fill="#A3B578" fillOpacity="0.3"/>
      <circle cx="50" cy="34" r="2.5" fill="#A3B578"/>
    </svg>
  )
}

export default function Footer({ showMap = true, showWhatsApp = true }) {
  return (
    <footer
      className="bg-olive-800 text-pearl-100 py-20 px-6"
      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' stroke=\'%23F5F2EA\' stroke-width=\'0.35\' opacity=\'0.06\'%3E%3Cpath d=\'M20 2 L38 20 L20 38 L2 20 Z\'/%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'1.5\' fill=\'%23F5F2EA\'/%3E%3C/g%3E%3C/svg%3E")' }}
    >
      {/* Top kandyan stripe */}
      <div
        className="h-2 w-full mb-12 opacity-20"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' stroke=\'%23F5F2EA\' stroke-width=\'0.4\' opacity=\'1\'%3E%3Cpath d=\'M20 2 L38 20 L20 38 L2 20 Z\'/%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'1.5\' fill=\'%23F5F2EA\'/%3E%3C/g%3E%3C/svg%3E")', backgroundRepeat: 'repeat-x' }}
      />

      <div className="max-w-3xl mx-auto text-center">

        {/* Lotus */}
        <div className="flex justify-center mb-6">
          <FooterLotus />
        </div>

        {/* Names */}
        <h2 className="font-serif text-4xl md:text-5xl font-light text-pearl-100 tracking-wide mb-2">
          {WEDDING.bride} & {WEDDING.groom}
        </h2>
        <p className="text-pearl-300/40 text-xs tracking-[0.4em] uppercase font-sans mb-10">
          {WEDDING.date}
        </p>

        {/* Thin olive rule */}
        <div className="flex items-center gap-4 mb-10 opacity-20">
          <div className="flex-1 border-t border-pearl-100" />
          <div className="w-1.5 h-1.5 rotate-45 bg-olive-300" />
          <div className="flex-1 border-t border-pearl-100" />
        </div>

        {/* Venue details */}
        <div className="text-sm text-pearl-300/50 mb-12">
          <p className="text-pearl-300/25 text-xs tracking-[0.3em] uppercase font-sans mb-2">Venue</p>
          <p className="font-serif text-xl text-pearl-200/70 font-light mb-2">{WEDDING.venue.name}</p>
          <p className="text-xs">{WEDDING.venue.address}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-3 text-xs tracking-widest uppercase">
            <span>Ceremony · {WEDDING.venue.ceremonyTime}</span>
            <span className="w-1 h-1 rotate-45 bg-olive-400 inline-block" />
            <span>Reception · {WEDDING.venue.receptionTime}</span>
          </div>
        </div>

        {/* Google Maps embed */}
        {showMap && WEDDING.venue.mapsEmbed && (
          <div className="mb-10 w-full max-w-2xl mx-auto">
            <p className="text-pearl-300/25 text-xs tracking-[0.3em] uppercase font-sans mb-3">Find Us</p>
            <div className="relative w-full overflow-hidden" style={{ height: 240 }}>
              <iframe
                src={WEDDING.venue.mapsEmbed}
                width="100%"
                height="240"
                style={{ border: 0, display: 'block', filter: 'grayscale(30%) contrast(1.05)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Venue map"
              />
            </div>
            {WEDDING.venue.mapsUrl && (
              <a
                href={WEDDING.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-pearl-300/40 hover:text-pearl-200 text-xs font-sans tracking-widest uppercase transition-colors duration-200"
              >
                <svg viewBox="0 0 20 20" width="12" height="12" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                Open in Google Maps
              </a>
            )}
          </div>
        )}

        {/* WhatsApp contact */}
        {showWhatsApp && WEDDING.whatsappNumber && (
          <div className="mb-10">
            <p className="text-pearl-300/25 text-xs tracking-[0.3em] uppercase font-sans mb-3">Questions?</p>
            <a
              href={`https://wa.me/${WEDDING.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-pearl-300/20 px-6 py-3
                         text-pearl-200/70 hover:text-pearl-100 hover:border-pearl-300/40
                         transition-all duration-200 font-sans text-xs tracking-widest uppercase group"
            >
              {/* WhatsApp icon */}
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="group-hover:underline underline-offset-2">Contact us on WhatsApp</span>
            </a>
          </div>
        )}

        {/* RSVP jump button */}
        <div className="mt-10">
          <a
            href="#rsvp"
            className="inline-flex items-center gap-2 border border-pearl-300/30 px-8 py-3
                       text-pearl-200/70 hover:text-pearl-100 hover:border-pearl-300/60
                       transition-all duration-200 font-sans text-xs tracking-[0.3em] uppercase"
          >
            <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"/>
            </svg>
            RSVP
          </a>
        </div>

        <p className="text-pearl-300/20 text-xs font-sans tracking-widest mt-6">
          Made with love · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
