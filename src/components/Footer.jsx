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

export default function Footer() {
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

        <p className="text-pearl-300/20 text-xs font-sans tracking-widest">
          Made with love · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
