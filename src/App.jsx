import { useState, useEffect, useCallback } from 'react'
import { WEDDING } from './config'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import RSVPSection from './components/RSVPSection'
import AgendaSection from './components/AgendaSection'
import MenuSection from './components/MenuSection'
import Footer from './components/Footer'
import ThankYouSection from './components/ThankYouSection'

export default function App() {
  const [guestCode, setGuestCode] = useState('')
  const [guestData, setGuestData] = useState(null)
  const [lookupState, setLookupState] = useState('idle') // idle | loading | found | error
  const [lookupError, setLookupError] = useState('')
  const [rsvpState, setRsvpState] = useState('idle') // idle | submitting | confirmed | error
  const [rsvpError, setRsvpError] = useState('')

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
        if (data.guest.alreadySubmitted) {
          setRsvpState('confirmed')
        }
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
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    if (code) {
      setGuestCode(code)
      lookupGuest(code)
      setTimeout(() => {
        document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })
      }, 800)
    }
  }, [lookupGuest])

  const handleSubmitRSVP = async (formData) => {
    setRsvpState('submitting')
    setRsvpError('')
    try {
      const params = new URLSearchParams({
        action: 'submitRSVP',
        code: guestCode.trim(),
        attending: formData.attending ? 'YES' : 'NO',
        adults:   formData.attendingAdults,
        children: formData.attendingChildren,
        dietary:  formData.dietary,
        message:  formData.message,
      })
      const res = await fetch(`${WEDDING.appsScriptUrl}?${params.toString()}`)
      const data = await res.json()
      if (data.success) {
        setGuestData(prev => ({
          ...prev,
          table:             data.table,
          attending:         data.attending,
          attendingAdults:   data.attendingAdults,
          attendingChildren: data.attendingChildren,
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
      />
      <AgendaSection />
      <MenuSection />
      <ThankYouSection />
      <Footer />
    </div>
  )
}
