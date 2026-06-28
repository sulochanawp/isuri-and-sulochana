import { useState, useEffect, useCallback } from 'react'
import { WEDDING } from './config'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import RSVPSection from './components/RSVPSection'
import AgendaSection from './components/AgendaSection'
import MenuSection from './components/MenuSection'
import Footer from './components/Footer'
import { ThankYouPage } from './components/ThankYouSection'

/* ── Main site (all hooks live here, called unconditionally) ── */
function MainSite() {
  const [guestCode, setGuestCode] = useState('')
  const [guestData, setGuestData] = useState(null)
  const [lookupState, setLookupState] = useState('idle')
  const [lookupError, setLookupError] = useState('')
  const [rsvpState, setRsvpState] = useState('idle')
  const [rsvpError, setRsvpError] = useState('')
  const [showScrollTop, setShowScrollTop] = useState(false)

  const lookupGuest = useCallback(async (code) => {
    if (!code?.trim()) return
    setLookupState('loading')
    setLookupError('')
    try {
      const url = `${WEDDING.appsScriptUrl}?action=getGuest&code=${encodeURIComponent(code.trim())}`
      const res = await fetch(url)
      const data = await res.json()
      if (data.success) {
        setGuestData(data.guest)
        setLookupState('found')
        if (data.guest.alreadySubmitted) setRsvpState('confirmed')
      } else {
        setLookupError(data.error || 'Guest not found. Please check your code.')
        setLookupState('error')
      }
    } catch {
      setLookupError('Unable to connect. Please check your internet connection and try again.')
      setLookupState('error')
    }
  }, [])

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    // Remove #home hash so browser doesn't auto-scroll away from the top
    if (window.location.hash === '#home') {
      history.replaceState(null, '', window.location.pathname + window.location.search)
    }
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    if (code) {
      setGuestCode(code)
      lookupGuest(code)
      window.scrollTo(0, 0)
    } else {
      window.scrollTo(0, 0)
    }
  }, [lookupGuest])

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('home')
      const threshold = hero ? hero.offsetHeight * 0.8 : window.innerHeight
      setShowScrollTop(window.scrollY > threshold)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSubmitRSVP = async (formData) => {
    setRsvpState('submitting')
    setRsvpError('')
    try {
      const params = new URLSearchParams({
        action:    'submitRSVP',
        code:      guestCode.trim(),
        attending: formData.attending ? 'YES' : 'NO',
        adults:    formData.attendingAdults,
        children:  formData.attendingChildren,
        dietary:   formData.dietary,
        message:   formData.message,
      })
      const res = await fetch(`${WEDDING.appsScriptUrl}?${params.toString()}`)
      const data = await res.json()
      if (data.success) {
        setGuestData(prev => ({
          ...prev,
          table:             data.table,
          attending:         data.attending,
          attendingAdults:   data.adults,
          attendingChildren: data.children,
          alreadySubmitted:  true,
        }))
        setRsvpState('confirmed')
      } else {
        setRsvpError(data.error || 'Submission failed. Please try again.')
        setRsvpState('error')
      }
    } catch {
      setRsvpError('Unable to submit. Please check your connection and try again.')
      setRsvpState('error')
    }
  }

  return (
    <div className="bg-pearl-100 min-h-screen font-sans text-ink">
      <Navbar />
      <Hero />
      <RSVPSection
        guestCode={guestCode}
        setGuestCode={setGuestCode}
        guestData={guestData}
        lookupState={lookupState}
        lookupError={lookupError}
        rsvpState={rsvpState}
        rsvpError={rsvpError}
        onLookup={lookupGuest}
        onSubmit={handleSubmitRSVP}
        onRetry={() => { setRsvpState('idle'); setRsvpError('') }}
        onEdit={() => { setRsvpState('idle'); setRsvpError('') }}
      />
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
  const isThankYouView = new URLSearchParams(window.location.search).get('view') === 'thankyou'
  return isThankYouView ? <ThankYouPage /> : <MainSite />
}
