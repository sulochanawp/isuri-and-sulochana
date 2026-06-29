import { useState, useEffect } from 'react'
import { WEDDING } from '../config'
import { ordinal } from '../utils.jsx'
import floralDivider from '../assets/floral-divider.svg?raw'

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
   A single ornamental floral divider, centred in the section.
   Inherits the section colour via currentColor, so it works on
   both light (pearl) and dark (olive) backgrounds.  */
export function FloralStripe({ light = false, className = '' }) {
  const col = light ? '#F5F2EA' : '#4A5C2A'

  return (
    <div
      className={`w-full flex justify-center overflow-hidden ${className}`}
      style={{ color: col }}
      aria-hidden="true"
    >
      <span
        className="block w-full max-w-xs opacity-50 [&>svg]:w-full [&>svg]:h-auto"
        dangerouslySetInnerHTML={{ __html: floralDivider }}
      />
    </div>
  )
}

/* ── Floral corner ornament ── */
export function FloralCorner({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 300"
      className={className}
    >
      <path fill="currentColor" d="M832.49,20V0H205.62V68.54H157.08V0H0V157.08H68.54v48.54H0V832.49H20V225.62H68.54v68.54H294.16V68.54H225.62V20ZM205.62,88.54v48.54H157.08V88.54Zm-68.54,48.54H88.54V88.54h48.54ZM20,137.08V20H137.08V68.54H68.54v68.54Zm68.54,20h48.54v48.54H88.54ZM274.16,88.54V274.16H88.54V225.62h68.54V157.08h68.54V88.54Z"/>
    </svg>
  )
}

/* ── Botanical vintage corner — hero names frame only ── */
export function HeroCorner({ className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 171.8 171.25" className={className}>
      <path fill="currentColor" d="M131.54,50.18c6.81-5.73,24.62-11.74,27,1.59a9.51,9.51,0,0,1-6.95,10.82c-4.76,1.23-10.69-1.26-11.93-5.92a4.7,4.7,0,0,1-.26-1.09c-.25-2.18.87-4.09,2.51-4.28s3.16,1.43,3.41,3.61a4.46,4.46,0,0,1-.94,3.42c2.8,2.27,8.39,1.05,10.17-2.38a7.45,7.45,0,0,0-.69-7.45c-3.41-4.9-14.29-1.42-18.65,1.84-8.56,6.41-12.09,18.59-13.12,28.71a48.85,48.85,0,0,0,3.89,25.24c3.55,7.67,10.68,12.74,17.39,17.48,4.24,3-1.9,1.83-2.85,1.19C128.92,115.15,121.1,106.35,119,92.2S120.17,59.77,131.54,50.18Z"/>
      <path fill="currentColor" d="M166.88,4c-6.89-5-16.38,1-21.56,6-6.91,6.6-9.9,15.74-11.82,24.92a176.8,176.8,0,0,1-44.14,3.35C75.12,37.47,58,33.67,50.41,20.37c-5.84-10.19,6-16.86,14.43-12.14,4.61,2.57,6.66,10,.7,12.25a9.27,9.27,0,0,1-3.7.38,5.55,5.55,0,0,1-4.09-2.95,4.35,4.35,0,0,0,4.15-1.63c1.5-1.82,1.45-4.31-.09-5.58a3.87,3.87,0,0,0-5.15.63,2.28,2.28,0,0,0-.34.35,4.58,4.58,0,0,0-.56.87c-2.88,5.07.79,12.17,6.69,12.43,7.79.34,12-8,8.64-14.61C66.67,1.63,55.18-.5,48.66,7.26s.22,18.47,6.21,24c8.34,7.64,21.47,10,32.34,11,14,1.29,28.52-.11,42.37-2.49,1-.17,2.06-.36,3.1-.55-.19,1-.38,2.08-.55,3.1-2.38,13.84-3.78,28.34-2.49,42.37,1,10.87,3.34,24,11,32.34,5.49,6,16.19,12.73,24,6.21s5.62-18-3.11-22.43c-6.61-3.35-14.95.85-14.61,8.64.26,5.9,7.36,9.57,12.43,6.69a5.83,5.83,0,0,0,.87-.56,1.92,1.92,0,0,0,.35-.35,3.87,3.87,0,0,0,.63-5.15c-1.27-1.54-3.77-1.58-5.58-.08a4.33,4.33,0,0,0-1.63,4.15,5.54,5.54,0,0,1-3-4.09,9.65,9.65,0,0,1,.38-3.7c2.22-6,9.69-3.91,12.26.7,4.72,8.46-2,20.26-12.14,14.43-13.31-7.61-17.1-24.72-17.9-38.95a177.24,177.24,0,0,1,3.36-44.14c9.18-1.92,18.32-4.91,24.92-11.83,4.93-5.17,10.94-14.66,6-21.55A8.13,8.13,0,0,0,166.88,4Zm-.69,3.37c3.74,7.58-6.33,16.75-10.88,20C150.09,31,144,32.69,137.81,34c1.34-6.15,3-12.28,6.68-17.5C147.69,12,157.36,1.7,164.44,5.65A4.74,4.74,0,0,1,166.19,7.4Z"/>
      <path fill="currentColor" d="M121.65,40.3c5.74-6.81,11.74-24.62-1.58-27a9.51,9.51,0,0,0-10.83,7C108,25.05,110.51,31,115.17,32.22a5.33,5.33,0,0,0,1.08.26c2.18.25,4.1-.88,4.29-2.51s-1.43-3.16-3.61-3.41a4.44,4.44,0,0,0-3.42.94c-2.27-2.8-1.05-8.4,2.38-10.17a7.42,7.42,0,0,1,7.45.69c4.9,3.41,1.42,14.29-1.84,18.65-6.41,8.56-18.59,12.08-28.71,13.12A49,49,0,0,1,67.54,45.9c-7.66-3.55-12.73-10.68-17.47-17.39-3-4.25-1.83,1.9-1.19,2.85,7.8,11.56,16.6,19.38,30.76,21.52S112.07,51.67,121.65,40.3Z"/>
      <path fill="currentColor" d="M151.79,126.8c8,4.31,13.07,11.27,13.07,20.45V169.1c0,3-4.51,2.89-4.51-.46V150.86c0-4.22.28-8.21-1.3-12.22-1.86-4.72-6.33-8.35-10.58-10.89s2.31-1.5,3.32-1Z"/>
      <path fill="currentColor" d="M44.45,19.46C40.13,11.47,33.18,6.39,24,6.39H2.15c-3,0-2.89,4.51.46,4.51H20.39c4.22,0,8.21-.28,12.22,1.31,4.72,1.85,8.35,6.32,10.88,10.57s1.51-2.31,1-3.32Z"/>
      <path fill="currentColor" d="M105,64.37C95.49,54.68,92.52,38.6,95,25.51,97.64,11.34,108,2.05,122.21,0c1.09-.16.59,3.15-.32,3.28C109.07,5.13,97.57,13.34,96.13,27.05c-1.36,13,2.9,27.1,12,36.67,9.57,9,23.68,13.32,36.67,12,13.71-1.44,21.92-12.94,23.76-25.76.14-.9,3.44-1.41,3.29-.32-2.05,14.22-11.33,24.57-25.5,27.24-13.09,2.45-28.88-.22-38.87-10A22.64,22.64,0,0,1,105,64.37Z"/>
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

      {/* Main content */}
      <div className="relative z-10 px-6 pt-24 pb-16 animate-fade-up">
        <p className="text-pearl-300/55 text-xs tracking-[0.5em] uppercase font-sans mb-7">
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
          <Lotus />
          <div className="flex-1 max-w-[80px] border-t border-current opacity-40" />
        </div>

        {/* Date */}
        <p className="text-pearl-100 font-serif text-xl md:text-2xl tracking-widest">{ordinal(WEDDING.date)}</p>

        {/* Countdown */}
        <Countdown target={WEDDING.weddingDate} />

        {/* ── Venue highlight block ── */}
        <div className="mt-8 mx-6 md:mx-auto md:max-w-sm border border-pearl-300/20 bg-white/5 backdrop-blur-sm px-6 py-5 relative">
          <span className="absolute -top-1 -left-1  w-1.5 h-1.5 rotate-45 bg-olive-400" />
          <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rotate-45 bg-olive-400" />
          <span className="absolute -bottom-1 -left-1  w-1.5 h-1.5 rotate-45 bg-olive-400" />
          <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 rotate-45 bg-olive-400" />

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

      </div>

    </section>
  )
}
