import { useState, useEffect } from 'react'
import { WEDDING } from './config'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SeatingSection, { SeatingPage } from './components/SeatingSection'
import AgendaSection from './components/AgendaSection'
import MenuSection from './components/MenuSection'
import Footer from './components/Footer'
import { ThankYouPage } from './components/ThankYouSection'
import { PhotoUploadPage } from './components/PhotoUploadSection'
import { SaveTheDatePage } from './components/SaveTheDate'

/* ── Main site (all hooks live here, called unconditionally) ── */
function MainSite() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    // Remove #home hash so browser doesn't auto-scroll away from the top
    if (window.location.hash === '#home') {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('home')
      const threshold = hero ? hero.offsetHeight * 0.8 : window.innerHeight
      setShowScrollTop(window.scrollY > threshold)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="bg-pearl-100 min-h-screen font-sans text-ink">
      <Navbar />
      <Hero />
      <SeatingSection />
      <AgendaSection />
      <MenuSection />
      <Footer />

      {/* Floating scroll-to-top button — visible only after hero */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center
                   bg-olive-800 border border-olive-600 text-pearl-200
                   hover:bg-olive-700 transition-all duration-300 shadow-lg
                   ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"/>
        </svg>
      </button>
    </div>
  )
}

/* ── Root — no hooks here, safe to branch before rendering ── */
export default function App() {
  const view = new URLSearchParams(window.location.search).get('view')
  if (view === 'thankyou') return <ThankYouPage />
  if (view === 'photos')   return <PhotoUploadPage />
  if (view === 'savethedate') return <SaveTheDatePage />
  if (view === 'seating')  return <SeatingPage />
  // Save the Date until the site opens; ?view=site previews the full site early
  if (view !== 'site' && Date.now() < WEDDING.siteOpenTime.getTime()) return <SaveTheDatePage />
  return <MainSite />
}
