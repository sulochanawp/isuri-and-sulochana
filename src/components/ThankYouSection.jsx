import { useState, useEffect } from 'react'
import { WEDDING } from '../config'
import { LotusDivider, FloralStripe, FloralCorner } from './Hero'

function useIsRevealed(revealTime) {
  const [revealed, setRevealed] = useState(() => Date.now() >= revealTime.getTime())

  useEffect(() => {
    if (revealed) return
    // Poll every 30 s — auto-reveals if guest already has the page open
    const id = setInterval(() => {
      if (Date.now() >= revealTime.getTime()) {
        setRevealed(true)
        clearInterval(id)
      }
    }, 30_000)
    return () => clearInterval(id)
  }, [revealTime, revealed])

  return revealed
}

/* ── Large decorative lotus for the card centre ── */
function CardLotus() {
  return (
    <svg viewBox="0 0 160 80" width="160" height="80" fill="none" className="text-olive-500">
      {/* Centre petal */}
      <path d="M80 68 Q56 50 56 20 Q68 36 80 46 Q92 36 104 20 Q104 50 80 68Z"
        stroke="currentColor" strokeWidth="0.9" fill="currentColor" fillOpacity="0.12"/>
      {/* Inner side petals */}
      <path d="M80 62 Q48 52 34 24 Q54 32 72 46" stroke="currentColor" strokeWidth="0.9" fill="currentColor" fillOpacity="0.08"/>
      <path d="M80 62 Q112 52 126 24 Q106 32 88 46" stroke="currentColor" strokeWidth="0.9" fill="currentColor" fillOpacity="0.08"/>
      {/* Outer side petals */}
      <path d="M80 58 Q32 54 10 28 Q38 32 68 48" stroke="currentColor" strokeWidth="0.7" fill="currentColor" fillOpacity="0.05"/>
      <path d="M80 58 Q128 54 150 28 Q122 32 92 48" stroke="currentColor" strokeWidth="0.7" fill="currentColor" fillOpacity="0.05"/>
      {/* Stem */}
      <line x1="80" y1="68" x2="80" y2="80" stroke="currentColor" strokeWidth="0.9"/>
      {/* Small leaf pair */}
      <path d="M80 74 Q68 70 64 62 Q74 66 80 72" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="0.5"/>
      <path d="M80 74 Q92 70 96 62 Q86 66 80 72" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="0.5"/>
      {/* Stamen */}
      <circle cx="80" cy="44" r="6"   fill="currentColor" fillOpacity="0.25"/>
      <circle cx="80" cy="44" r="3"   fill="currentColor" fillOpacity="0.5"/>
      <circle cx="80" cy="44" r="1.4" fill="currentColor"/>
    </svg>
  )
}

/* ── Standalone full-page wrapper (used when ?view=thankyou) ── */
export function ThankYouPage() {
  const revealed = useIsRevealed(WEDDING.thankYouRevealTime)

  if (!revealed) {
    return (
      <div className="min-h-screen bg-pearl-100 flex flex-col items-center justify-center px-6 text-center">
        <div className="text-olive-400 mb-6">
          <CardLotus />
        </div>
        <p className="text-olive-500 text-xs tracking-[0.4em] uppercase font-sans mb-3">
          {WEDDING.date}
        </p>
        <h2 className="font-serif text-3xl text-ink font-light mb-4">A Message Is Coming</h2>
        <div className="flex items-center gap-4 my-4 opacity-20 w-32">
          <div className="flex-1 border-t border-ink" />
          <div className="w-1.5 h-1.5 rotate-45 bg-ink" />
          <div className="flex-1 border-t border-ink" />
        </div>
        <p className="text-muted text-sm max-w-xs leading-relaxed">
          Our heartfelt thank you card will appear here on the day of the wedding.
          Please check back then.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-8 animate-fade-up">
      <ThankYouCard />
      <a
        href={import.meta.env.BASE_URL || '/'}
        className="mt-6 text-muted text-xs font-sans tracking-widest uppercase hover:text-ink transition-colors"
      >
        ← Back to Website
      </a>
    </div>
  )
}

/* ── Card extracted so both views can share it ── */
function ThankYouCard() {
  return (
    <div className="w-full max-w-2xl">
      <FloralStripe className="mb-6" />

      <div className="text-center mb-10">
        <p className="text-olive-500 text-xs tracking-[0.4em] uppercase font-sans mb-3">
          {WEDDING.date}
        </p>
        <h2 className="section-heading">Thank You</h2>
        <LotusDivider />
      </div>

      <div className="relative border-2 border-olive-200 bg-pearl-50 px-8 md:px-14 py-12 text-center">
        <FloralCorner className="absolute -top-3 -left-3 text-olive-500 w-12 h-12" />
        <FloralCorner className="absolute -top-3 -right-3 text-olive-500 w-12 h-12 rotate-90" />
        <FloralCorner className="absolute -bottom-3 -left-3 text-olive-500 w-12 h-12 -rotate-90" />
        <FloralCorner className="absolute -bottom-3 -right-3 text-olive-500 w-12 h-12 rotate-180" />

        <div className="border border-olive-100 px-6 md:px-10 py-10">
          <div className="flex justify-center mb-6"><CardLotus /></div>

          <p className="text-olive-400 text-xs tracking-[0.5em] uppercase font-sans mb-4">
            With all our love & gratitude
          </p>
          <h3 className="font-serif text-4xl md:text-5xl text-ink font-light leading-snug mb-2">
            From the bottom<br />
            <span className="italic">of our hearts,</span>
          </h3>

          <div className="flex items-center justify-center gap-3 my-6">
            <div className="flex-1 max-w-[60px] border-t border-olive-200" />
            <div className="w-1.5 h-1.5 rotate-45 bg-olive-400" />
            <div className="flex-1 max-w-[60px] border-t border-olive-200" />
          </div>

          <p className="text-muted text-sm md:text-base leading-relaxed max-w-md mx-auto">
            Today we became one, and you made our day complete. Thank you
            for your presence, your love, and the memories we will carry
            with us forever. It truly means the world to have you here.
          </p>

          <div className="mt-8">
            <p className="font-serif text-2xl md:text-3xl text-olive-700 italic font-light tracking-wide">
              {WEDDING.bride} & {WEDDING.groom}
            </p>
            <p className="text-muted text-xs tracking-[0.3em] uppercase font-sans mt-2">
              {WEDDING.date}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8 text-olive-300">
            <div className="flex-1 border-t border-current opacity-40" />
            <svg viewBox="0 0 60 24" width="60" height="24" fill="none">
              <path d="M30 20 Q18 14 18 4 Q24 10 30 14 Q36 10 42 4 Q42 14 30 20Z"
                stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.15"/>
              <circle cx="30" cy="13" r="2.5" fill="currentColor" fillOpacity="0.5"/>
            </svg>
            <div className="flex-1 border-t border-current opacity-40" />
          </div>
        </div>
      </div>

      <p className="text-center text-muted text-xs mt-6 tracking-wide">
        Screenshot or save this page as a keepsake 🌿
      </p>

      <FloralStripe className="mt-6" />
    </div>
  )
}

export default function ThankYouSection() {
  const revealed = useIsRevealed(WEDDING.thankYouRevealTime)

  if (!revealed) return null

  return (
    <section id="thankyou" className="py-24 px-6 bg-white animate-fade-up">
      <div className="max-w-2xl mx-auto">
        <ThankYouCard />
      </div>
    </section>
  )
}
