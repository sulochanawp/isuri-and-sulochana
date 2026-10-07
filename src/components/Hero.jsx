import { useState, useEffect } from 'react'
import { WEDDING } from '../config'
import { ordinal } from '../utils.jsx'
import { Lotus, HeroCorner, DiamondCorners } from './Ornaments'

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
            <DiamondCorners />
          </div>
          <span className="text-pearl-300/70 text-xs tracking-[0.25em] uppercase font-sans">{label}</span>
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

      {/* Main content */}
      <div className="relative z-10 px-6 pt-24 pb-16 animate-fade-up">
        <p className="text-pearl-300/70 text-xs tracking-[0.5em] uppercase font-sans mb-7">
          You are cordially invited to the wedding of
        </p>

        {/* Framed couple names */}
        <div className="relative inline-block px-10 md:px-16 py-8">
          <HeroCorner className="absolute top-0 left-0 text-olive-400 w-[35px] h-[35px] -rotate-90" />
          <HeroCorner className="absolute top-0 right-0 text-olive-400 w-[35px] h-[35px]" />
          <HeroCorner className="absolute bottom-0 left-0 text-olive-400 w-[35px] h-[35px] rotate-180" />
          <HeroCorner className="absolute bottom-0 right-0 text-olive-400 w-[35px] h-[35px] rotate-90" />

          <h1 className="font-serif font-light text-pearl-100 leading-none">
            <span className="block text-5xl md:text-7xl lg:text-8xl tracking-wide">{WEDDING.bride}</span>
            <span className="block text-olive-300 text-2xl md:text-3xl tracking-[0.6em] my-4 font-light">&amp;</span>
            <span className="block text-5xl md:text-7xl lg:text-8xl tracking-wide">{WEDDING.groom}</span>
          </h1>
        </div>

        {/* Lotus divider */}
        <div className="mt-6 mb-5 flex items-center justify-center gap-4 text-olive-400">
          <div className="flex-1 max-w-[80px] border-t border-current opacity-40" />
          <Lotus dark />
          <div className="flex-1 max-w-[80px] border-t border-current opacity-40" />
        </div>

        {/* Date */}
        <p className="text-pearl-100 font-serif text-xl md:text-2xl tracking-widest">{ordinal(WEDDING.date)}</p>

        {/* Countdown */}
        <Countdown target={WEDDING.weddingDate} />

        {/* ── Venue highlight block ── */}
        <div className="mt-8 mx-6 md:mx-auto md:max-w-sm border border-pearl-300/20 bg-white/5 backdrop-blur-sm px-6 py-5 relative">
          <DiamondCorners />

          <p className="text-pearl-300/70 text-xs tracking-[0.3em] uppercase font-sans mb-1">Venue</p>
          <p className="font-serif text-xl text-pearl-100 font-light">{WEDDING.venue.name}</p>
          <p className="text-pearl-300/70 text-xs mt-1 font-sans">{WEDDING.venue.address}</p>
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

      </div>

    </section>
  )
}
