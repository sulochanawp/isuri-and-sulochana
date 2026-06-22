import { useState, useEffect } from 'react'
import { WEDDING } from '../config'
import { LotusDivider, FloralStripe, FloralCorner } from './Hero'

function useIsRevealed(revealTime) {
  const [revealed, setRevealed] = useState(() => Date.now() >= revealTime.getTime())

  useEffect(() => {
    if (revealed) return
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

/* ── Small lotus for the "not yet" holding page ── */
function SmallLotus() {
  return (
    <svg viewBox="0 0 120 60" width="120" height="60" fill="none" className="text-olive-400">
      <path d="M60 50 Q42 36 42 16 Q51 26 60 34 Q69 26 78 16 Q78 36 60 50Z"
        stroke="currentColor" strokeWidth="0.9" fill="currentColor" fillOpacity="0.12"/>
      <path d="M60 46 Q34 38 22 18 Q38 24 52 36" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.08"/>
      <path d="M60 46 Q86 38 98 18 Q82 24 68 36" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.08"/>
      <line x1="60" y1="50" x2="60" y2="60" stroke="currentColor" strokeWidth="0.9"/>
      <circle cx="60" cy="32" r="4" fill="currentColor" fillOpacity="0.3"/>
      <circle cx="60" cy="32" r="1.8" fill="currentColor"/>
    </svg>
  )
}

/* ── Standalone full-page (used when ?view=thankyou) ── */
export function ThankYouPage() {
  const revealed = useIsRevealed(WEDDING.thankYouRevealTime)

  if (!revealed) {
    return (
      <div className="min-h-screen bg-pearl-100 flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-6"><SmallLotus /></div>
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
    <div className="min-h-screen bg-white flex flex-col animate-fade-up">

      {/* ── Top: heading + photo frame ── */}
      <div className="flex-1 flex flex-col items-center px-6 pt-10 pb-0">
        <FloralStripe className="mb-6 w-full" />

        {/* Heading */}
        <div className="text-center mb-8 w-full max-w-2xl">
          <h2 className="section-heading">Thank You</h2>
          <LotusDivider />
          <p className="text-muted text-sm mt-4 leading-relaxed max-w-md mx-auto">
            Thank you for being there to make our special day even more beautiful.
            Your presence meant everything to us.
          </p>
        </div>

        {/* Photo frame */}
        <div className="relative w-full max-w-2xl mb-8">
          {/* Floral corner ornaments */}
          <FloralCorner className="absolute -top-3 -left-3 text-olive-500 w-12 h-12 z-10" />
          <FloralCorner className="absolute -top-3 -right-3 text-olive-500 w-12 h-12 rotate-90 z-10" />
          <FloralCorner className="absolute -bottom-3 -left-3 text-olive-500 w-12 h-12 -rotate-90 z-10" />
          <FloralCorner className="absolute -bottom-3 -right-3 text-olive-500 w-12 h-12 rotate-180 z-10" />

          {/* Outer frame */}
          <div className="border-2 border-olive-200 p-2">
            {/* Inner border */}
            <div className="border border-olive-100">
              {WEDDING.thankYouPhotoUrl && WEDDING.thankYouPhotoUrl !== 'YOUR_PHOTO_URL_HERE' ? (
                <img
                  src={WEDDING.thankYouPhotoUrl}
                  alt="Isuri & Sulochana"
                  className="w-full object-cover block"
                  style={{ maxHeight: '520px' }}
                />
              ) : (
                /* Placeholder shown until photo URL is added */
                <div className="w-full flex items-center justify-center bg-pearl-50 text-olive-300" style={{ height: 400 }}>
                  <div className="text-center">
                    <SmallLotus />
                    <p className="text-xs font-sans tracking-widest uppercase mt-3 text-olive-300">
                      Photo coming soon
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Download button */}
        {WEDDING.thankYouPhotoUrl && WEDDING.thankYouPhotoUrl !== 'YOUR_PHOTO_URL_HERE' && (
          <a
            href={WEDDING.thankYouPhotoUrl.replace('export=view', 'export=download')}
            download
            className="inline-flex items-center gap-2 border border-olive-300 bg-olive-700 text-pearl-100
                       px-8 py-3 font-sans text-xs tracking-[0.25em] uppercase
                       hover:bg-olive-800 transition-colors duration-200 mb-10"
          >
            <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
            Download Thank You Card
          </a>
        )}
      </div>

      {/* ── Footer: names, date, venue — matches main footer style ── */}
      <div
        className="bg-olive-800 text-pearl-100 py-14 px-6 text-center"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' stroke=\'%23F5F2EA\' stroke-width=\'0.35\' opacity=\'0.06\'%3E%3Cpath d=\'M20 2 L38 20 L20 38 L2 20 Z\'/%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'1.5\' fill=\'%23F5F2EA\'/%3E%3C/g%3E%3C/svg%3E")' }}
      >
        {/* Thin divider with diamond */}
        <div className="flex items-center gap-4 mb-10 opacity-20 max-w-xs mx-auto">
          <div className="flex-1 border-t border-pearl-100" />
          <div className="w-1.5 h-1.5 rotate-45 bg-olive-300" />
          <div className="flex-1 border-t border-pearl-100" />
        </div>

        {/* Couple names */}
        <h2 className="font-serif text-4xl md:text-5xl font-light text-pearl-100 tracking-wide mb-2">
          {WEDDING.bride} & {WEDDING.groom}
        </h2>
        <p className="text-pearl-300/40 text-xs tracking-[0.4em] uppercase font-sans mb-8">
          {WEDDING.date}
        </p>

        {/* Venue */}
        <div className="text-sm text-pearl-300/50">
          <p className="text-pearl-300/25 text-xs tracking-[0.3em] uppercase font-sans mb-2">Venue</p>
          <p className="font-serif text-xl text-pearl-200/70 font-light mb-1">{WEDDING.venue.name}</p>
          <p className="text-xs mb-1">{WEDDING.venue.address}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-3 text-xs tracking-widest uppercase">
            <span>Ceremony · {WEDDING.venue.ceremonyTime}</span>
            <span className="w-1 h-1 rotate-45 bg-olive-400 inline-block" />
            <span>Reception · {WEDDING.venue.receptionTime}</span>
          </div>
        </div>
      </div>

    </div>
  )
}

/* ── Default export (unused on main page, kept for safety) ── */
export default function ThankYouSection() {
  return null
}
