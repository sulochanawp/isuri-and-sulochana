import { useState, useEffect } from 'react'
import { WEDDING } from '../config'
import { LotusDivider, FloralStripe, Lotus, DiamondCorners, DiamondRule } from './Ornaments'
import { useIsRevealed } from '../utils.jsx'
import Footer from './Footer'

/* ── Standalone full-page (used when ?view=thankyou) ── */
export function ThankYouPage() {
  const revealed = useIsRevealed(WEDDING.thankYouRevealTime)
  const [photoUrl, setPhotoUrl]   = useState(null)
  const [photoFileId, setPhotoFileId] = useState(null)
  const [photoError, setPhotoError] = useState(false)

  // Fetch photo from Drive folder once revealed
  useEffect(() => {
    if (!revealed) return
    if (!WEDDING.thankYouFolderId || WEDDING.thankYouFolderId === 'YOUR_FOLDER_ID_HERE') return
    const url = `${WEDDING.appsScriptUrl}?action=getThankYouPhoto&folderId=${WEDDING.thankYouFolderId}`
    fetch(url)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setPhotoUrl(`https://drive.google.com/thumbnail?id=${data.fileId}&sz=w2000`)
          setPhotoFileId(data.fileId)
        } else {
          setPhotoError(true)
        }
      })
      .catch(() => setPhotoError(true))
  }, [revealed])

  if (!revealed) {
    return (
      <div className="min-h-screen bg-pearl-100 flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-6"><Lotus /></div>
        <p className="text-olive-500 text-xs tracking-[0.4em] uppercase font-sans mb-3">
          {WEDDING.date}
        </p>
        <h2 className="font-serif text-3xl text-ink font-light mb-4">A Message Is Coming</h2>
        <DiamondRule className="my-4 opacity-20 w-32" />
        <p className="text-muted text-sm max-w-xs leading-relaxed">
          Our heartfelt thank you card will appear here on the day of the wedding.
          Please check back then.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-pearl-100 flex flex-col animate-fade-up">

      {/* ── Top: heading + photo frame ── */}
      <div className="flex flex-col items-center px-6 pt-10 pb-10">
        <FloralStripe className="mb-10 w-full" />

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
          <DiamondCorners className="w-1.5 h-1.5 bg-olive-500 z-10" />

          <div className="border-2 border-olive-200 p-2">
            <div className="border border-olive-100">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={`${WEDDING.bride} & ${WEDDING.groom}`}
                  className="w-full h-auto block"
                />
              ) : photoError ? (
                <div className="w-full flex items-center justify-center bg-pearl-50 text-olive-300" style={{ height: 400 }}>
                  <p className="text-xs font-sans tracking-widest uppercase text-olive-300">Photo unavailable</p>
                </div>
              ) : (
                <div className="w-full flex items-center justify-center bg-pearl-50" style={{ height: 400 }}>
                  <div className="text-center text-olive-300">
                    <Lotus />
                    <p className="text-xs font-sans tracking-widest uppercase mt-3">Loading…</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Download button */}
        {photoFileId && (
          <a
            href={`https://drive.google.com/uc?id=${photoFileId}&export=download`}
            download
            className="inline-flex items-center gap-2 bg-olive-700 text-pearl-100
                       px-8 py-3 font-sans text-xs tracking-[0.25em] uppercase
                       hover:bg-olive-800 transition-colors duration-200"
          >
            <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
            Download Thank You Card
          </a>
        )}

      </div>

      {/* ── Footer: reuse main Footer without the map ── */}
      <Footer showMap={false} showWhatsApp={false} showRsvpButton={false} />

    </div>
  )
}
