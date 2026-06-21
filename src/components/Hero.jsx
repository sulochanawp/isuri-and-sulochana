import { useState, useEffect } from 'react'
import { WEDDING } from '../config'

/* ════════════════════════════════════════════════════════════
   SHARED DECORATIVE EXPORTS
   (imported by AgendaSection, RSVPSection, MenuSection, Footer)
   ════════════════════════════════════════════════════════════ */

/* ── Inline lotus ── */
function Lotus({ className = '' }) {
  return (
    <svg viewBox="0 0 120 48" width="120" height="48" className={className} fill="none">
      <path d="M60 40 Q44 28 44 14 Q52 22 60 28 Q68 22 76 14 Q76 28 60 40Z"
        stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.12"/>
      <path d="M60 36 Q38 30 30 16 Q42 20 52 28" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.08"/>
      <path d="M60 36 Q82 30 90 16 Q78 20 68 28" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.08"/>
      <path d="M60 36 Q28 34 16 22 Q32 22 48 30" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.05"/>
      <path d="M60 36 Q92 34 104 22 Q88 22 72 30" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.05"/>
      <line x1="60" y1="40" x2="60" y2="48" stroke="currentColor" strokeWidth="0.8"/>
      <circle cx="60" cy="26" r="3"   fill="currentColor" fillOpacity="0.6"/>
      <circle cx="60" cy="26" r="1.2" fill="currentColor"/>
    </svg>
  )
}

/* ── Lotus section divider ── */
export function LotusDivider({ light = false }) {
  return (
    <div className={`flex items-center justify-center gap-4 my-1 ${light ? 'text-pearl-300' : 'text-olive-400'}`}>
      <div className="flex-1 border-t border-current opacity-30" />
      <Lotus className="opacity-70" />
      <div className="flex-1 border-t border-current opacity-30" />
    </div>
  )
}

/* ── Botanical / floral stripe ──────────────────────────────
   A repeating wavy vine with 5-petal flowers and leaves.
   Works on both light (pearl) and dark (olive) backgrounds.  */
export function FloralStripe({ light = false, className = '' }) {
  const id   = light ? 'fp-light' : 'fp-dark'
  const col  = light ? '#F5F2EA' : '#4A5C2A'
  const opV  = light ? 0.45 : 0.35   // vine opacity
  const opF  = light ? 0.55 : 0.45   // flower opacity
  const opL  = light ? 0.35 : 0.28   // leaf opacity

  return (
    <div className={`w-full overflow-hidden ${className}`} style={{ height: 52 }}>
      <svg width="100%" height="52" viewBox="0 0 160 52" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id={id} x="0" y="0" width="160" height="52" patternUnits="userSpaceOnUse">
            {/* Wavy vine */}
            <path
              d="M0,30 C20,22 40,38 80,30 C120,22 140,38 160,30"
              stroke={col} strokeWidth="0.8" fill="none" opacity={opV}
            />

            {/* Flower centred at x=80, sitting above vine */}
            <g transform="translate(80,22)" opacity={opF}>
              {[0,72,144,216,288].map(r => (
                <ellipse key={r} cx="0" cy="-7" rx="2.3" ry="5"
                  fill={col} fillOpacity="0.18" stroke={col} strokeWidth="0.6"
                  transform={`rotate(${r} 0 0)`}/>
              ))}
              <circle cx="0" cy="0" r="2.8" fill={col} fillOpacity="0.6"/>
              <circle cx="0" cy="0" r="1.2" fill={col}/>
            </g>

            {/* Leaf pair at x=30 */}
            <g transform="translate(30,26)" opacity={opL}>
              <path d="M0,4 Q-9,-1 -7,-11 Q-2,-4 0,2"  fill={col} fillOpacity="0.25" stroke={col} strokeWidth="0.5"/>
              <path d="M0,4 Q 9,-1  7,-11 Q 2,-4 0,2"  fill={col} fillOpacity="0.25" stroke={col} strokeWidth="0.5"/>
            </g>

            {/* Leaf pair at x=130 */}
            <g transform="translate(130,26)" opacity={opL}>
              <path d="M0,4 Q-9,-1 -7,-11 Q-2,-4 0,2"  fill={col} fillOpacity="0.25" stroke={col} strokeWidth="0.5"/>
              <path d="M0,4 Q 9,-1  7,-11 Q 2,-4 0,2"  fill={col} fillOpacity="0.25" stroke={col} strokeWidth="0.5"/>
            </g>

            {/* Small buds */}
            {[10, 52, 108, 150].map(x => (
              <g key={x} transform={`translate(${x},28)`} opacity={opL * 0.8}>
                <line x1="0" y1="4" x2="0" y2="-5" stroke={col} strokeWidth="0.5"/>
                <ellipse cx="0" cy="-7" rx="1.5" ry="3"
                  fill={col} fillOpacity="0.25" stroke={col} strokeWidth="0.4"/>
              </g>
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="52" fill={`url(#${id})`}/>
      </svg>
    </div>
  )
}

/* ── Floral corner ornament ── */
export function FloralCorner({ className = '' }) {
  return (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" className={className}>
      {/* L-frame */}
      <line x1="2" y1="2" x2="18" y2="2"  stroke="currentColor" strokeWidth="0.7"/>
      <line x1="2" y1="2" x2="2"  y2="18" stroke="currentColor" strokeWidth="0.7"/>
      {/* Small flower at corner */}
      <g transform="translate(9,9)">
        {[0,72,144,216,288].map(r => (
          <ellipse key={r} cx="0" cy="-5" rx="1.6" ry="3.5"
            fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="0.5"
            transform={`rotate(${r} 0 0)`}/>
        ))}
        <circle cx="0" cy="0" r="2" fill="currentColor" fillOpacity="0.5"/>
        <circle cx="0" cy="0" r="0.9" fill="currentColor"/>
      </g>
      {/* Tiny leaf on arm */}
      <path d="M14,2 Q14,-3 18,-4 Q16,-1 14,2" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="0.4"/>
      <path d="M2,14 Q-3,14 -4,18 Q-1,16 2,14" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="0.4"/>
    </svg>
  )
}

/* ── Kandyan corner ornament ── */
function CornerOrnament({ className = '' }) {
  return (
    <svg viewBox="0 0 36 36" width="36" height="36" className={className} fill="none">
      <line x1="2" y1="2" x2="16" y2="2" stroke="currentColor" strokeWidth="0.8"/>
      <line x1="2" y1="2" x2="2"  y2="16" stroke="currentColor" strokeWidth="0.8"/>
      <rect x="5" y="5" width="5" height="5"
        transform="rotate(45 7.5 7.5)" stroke="currentColor" strokeWidth="0.6"
        fill="currentColor" fillOpacity="0.15"/>
    </svg>
  )
}

/* ════════════════════════════════════════════════════════════
   COUNTDOWN
   ════════════════════════════════════════════════════════════ */
function Countdown({ target }) {
  const calc = d => {
    const diff = d - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff / 3600000) % 24),
      minutes: Math.floor((diff / 60000) % 60),
      seconds: Math.floor((diff / 1000)  % 60),
    }
  }
  const [t, setT] = useState(calc(target))
  useEffect(() => {
    const id = setInterval(() => setT(calc(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return (
    <div className="flex gap-5 md:gap-8 justify-center mt-8">
      {[['Days', t.days], ['Hours', t.hours], ['Mins', t.minutes], ['Secs', t.seconds]].map(([label, val]) => (
        <div key={label} className="flex flex-col items-center gap-2">
          <div className="relative border border-pearl-300/30 px-4 py-2 min-w-[58px] md:min-w-[70px]">
            <span className="font-serif text-2xl md:text-3xl font-light text-pearl-100 block text-center leading-none">
              {String(val).padStart(2, '0')}
            </span>
            <span className="absolute -top-1    -left-1   w-1.5 h-1.5 rotate-45 bg-olive-400" />
            <span className="absolute -top-1    -right-1  w-1.5 h-1.5 rotate-45 bg-olive-400" />
            <span className="absolute -bottom-1 -left-1   w-1.5 h-1.5 rotate-45 bg-olive-400" />
            <span className="absolute -bottom-1 -right-1  w-1.5 h-1.5 rotate-45 bg-olive-400" />
          </div>
          <span className="text-pearl-300/55 text-xs tracking-[0.25em] uppercase font-sans">{label}</span>
        </div>
      ))}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   HERO
   ════════════════════════════════════════════════════════════ */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-olive-800"
      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' stroke=\'%23F5F2EA\' stroke-width=\'0.35\' opacity=\'0.07\'%3E%3Cpath d=\'M20 2 L38 20 L20 38 L2 20 Z\'/%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'1.5\' fill=\'%23F5F2EA\'/%3E%3C/g%3E%3C/svg%3E")' }}
    >
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-olive-900/60 via-transparent to-olive-900/80 pointer-events-none" />

      {/* Floral strip top */}
      <div className="absolute top-0 left-0 right-0">
        <FloralStripe light />
      </div>

      {/* Top rule */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-25">
        <div className="w-px h-8 bg-pearl-200" />
        <div className="w-1.5 h-1.5 rotate-45 bg-pearl-200" />
      </div>

      {/* Main content */}
      <div className="relative z-10 px-6 animate-fade-up">
        <p className="text-pearl-300/55 text-xs tracking-[0.5em] uppercase font-sans mb-7">
          You are cordially invited to the wedding of
        </p>

        {/* Framed couple names */}
        <div className="relative inline-block px-10 md:px-16 py-8">
          <FloralCorner className="absolute top-0 left-0 text-olive-400" />
          <FloralCorner className="absolute top-0 right-0 text-olive-400 rotate-90" />
          <FloralCorner className="absolute bottom-0 left-0 text-olive-400 -rotate-90" />
          <FloralCorner className="absolute bottom-0 right-0 text-olive-400 rotate-180" />

          <h1 className="font-serif font-light text-pearl-100 leading-none">
            <span className="block text-5xl md:text-7xl lg:text-8xl tracking-wide">{WEDDING.bride}</span>
            <span className="block text-olive-300 text-2xl md:text-3xl tracking-[0.6em] my-4 font-light">&amp;</span>
            <span className="block text-5xl md:text-7xl lg:text-8xl tracking-wide">{WEDDING.groom}</span>
          </h1>
        </div>

        {/* Lotus divider */}
        <div className="mt-6 mb-5 flex items-center justify-center gap-4 text-olive-400">
          <div className="flex-1 max-w-[80px] border-t border-current opacity-40" />
          <Lotus />
          <div className="flex-1 max-w-[80px] border-t border-current opacity-40" />
        </div>

        {/* Date */}
        <p className="text-pearl-200/70 font-sans text-xs tracking-[0.35em] uppercase">{WEDDING.date}</p>

        {/* Countdown */}
        <Countdown target={WEDDING.weddingDate} />

        {/* ── Venue highlight block ── */}
        <div className="mt-8 mx-auto max-w-sm border border-pearl-300/20 bg-white/5 backdrop-blur-sm px-6 py-4 relative">
          {/* floral corners on venue card */}
          <FloralCorner className="absolute -top-2 -left-2 text-olive-400 w-6 h-6" />
          <FloralCorner className="absolute -top-2 -right-2 text-olive-400 w-6 h-6 rotate-90" />
          <FloralCorner className="absolute -bottom-2 -left-2 text-olive-400 w-6 h-6 -rotate-90" />
          <FloralCorner className="absolute -bottom-2 -right-2 text-olive-400 w-6 h-6 rotate-180" />

          <p className="text-pearl-300/40 text-xs tracking-[0.3em] uppercase font-sans mb-1">Venue</p>
          <p className="font-serif text-xl text-pearl-100 font-light">{WEDDING.venue.name}</p>
          <p className="text-pearl-300/55 text-xs mt-1 font-sans">{WEDDING.venue.address}</p>
          {WEDDING.venue.mapsUrl && (
            <a
              href={WEDDING.venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-olive-300 hover:text-pearl-100 text-xs font-sans tracking-widest uppercase transition-colors duration-200 group"
            >
              <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              <span className="group-hover:underline underline-offset-2">View on Google Maps</span>
            </a>
          )}
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#rsvp" className="bg-pearl-100 text-olive-800 font-sans font-medium px-8 py-3 tracking-[0.25em] text-xs uppercase hover:bg-white transition-colors active:scale-95">
            RSVP
          </a>
          <a href="#agenda" className="border border-pearl-300/30 text-pearl-200 font-sans font-medium px-8 py-3 tracking-[0.25em] text-xs uppercase hover:bg-pearl-100/10 transition-colors">
            View Agenda
          </a>
        </div>
      </div>

      {/* Bottom floral strip */}
      <div className="absolute bottom-0 left-0 right-0">
        <FloralStripe light />
      </div>
    </section>
  )
}
