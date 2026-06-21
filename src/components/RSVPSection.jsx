import { useState } from 'react'
import { WEDDING } from '../config'
import { LotusDivider, FloralStripe } from './Hero'

/* ── Code entry ─────────────────────────────────────── */
function CodeEntry({ guestCode, setGuestCode, onLookup, loading }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onLookup(guestCode)
  }
  return (
    <div className="card corner-ornament max-w-md mx-auto text-center">
      {/* Lotus top mark */}
      <div className="flex justify-center mb-5 text-olive-400">
        <svg viewBox="0 0 48 32" width="48" height="32" fill="none">
          <path d="M24 28 Q14 20 14 8 Q19 14 24 18 Q29 14 34 8 Q34 20 24 28Z" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.15"/>
          <line x1="24" y1="28" x2="24" y2="32" stroke="currentColor" strokeWidth="0.8"/>
          <circle cx="24" cy="16" r="2.5" fill="currentColor" fillOpacity="0.5"/>
        </svg>
      </div>

      <h3 className="font-serif text-2xl text-ink font-light mb-2">Find Your Invitation</h3>
      <p className="text-muted text-sm mb-6 leading-relaxed">
        Enter the unique code from your invitation to access your personalised RSVP.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="e.g. ABC123"
          value={guestCode}
          onChange={e => setGuestCode(e.target.value.toUpperCase())}
          className="input-field text-center text-lg tracking-[0.3em] font-medium"
          maxLength={20}
          autoFocus
        />
        <button
          type="submit"
          disabled={!guestCode.trim() || loading}
          className="btn-primary w-full text-center disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? 'Looking up…' : 'Find My Invitation'}
        </button>
      </form>
    </div>
  )
}

/* ── RSVP form ──────────────────────────────────────── */
function RSVPForm({ guestData, onSubmit, submitting, rsvpError, onRetry }) {
  const [attending, setAttending] = useState(true)
  const [count, setCount] = useState(1)
  const [dietary, setDietary] = useState('')
  const [message, setMessage] = useState('')
  const [formError, setFormError] = useState('')

  const maxGuests = guestData?.allowedGuests || 1

  const handleSubmit = (e) => {
    e.preventDefault()
    if (attending && count < 1) { setFormError('Please select the number of guests.'); return }
    setFormError('')
    onSubmit({ attending, attendingCount: attending ? count : 0, dietary, message })
  }

  return (
    <div className="card corner-ornament max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="font-serif text-3xl text-ink font-light">Welcome, {guestData?.name}</h3>
        <p className="text-muted text-sm mt-2">Your invitation is confirmed — please let us know if you'll be joining us.</p>
        {maxGuests > 1 && (
          <p className="text-olive-600 text-xs mt-2 tracking-wide">
            Your invitation includes up to {maxGuests} guests.
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Attendance */}
        <div>
          <p className="font-sans font-medium text-ink mb-3 text-xs tracking-[0.25em] uppercase">
            Will you be attending? *
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Joyfully Accept', val: true },
              { label: 'Regretfully Decline', val: false },
            ].map(({ label, val }) => (
              <button
                key={label}
                type="button"
                onClick={() => setAttending(val)}
                className={`py-4 border font-sans font-medium text-xs tracking-[0.15em] uppercase transition-all duration-200 ${
                  attending === val
                    ? 'border-olive-600 bg-olive-700 text-pearl-100'
                    : 'border-line text-muted hover:border-olive-400 hover:text-ink'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Guest count */}
        {attending && (
          <div>
            <label className="font-sans font-medium text-ink mb-2 text-xs tracking-[0.25em] uppercase block">
              Number of Guests *
            </label>
            <select
              value={count}
              onChange={e => setCount(Number(e.target.value))}
              className="input-field"
            >
              {Array.from({ length: maxGuests }, (_, i) => i + 1).map(n => (
                <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
              ))}
            </select>
          </div>
        )}

        {/* Dietary */}
        {attending && (
          <div>
            <label className="font-sans font-medium text-ink mb-2 text-xs tracking-[0.25em] uppercase block">
              Dietary Requirements
            </label>
            <input
              type="text"
              value={dietary}
              onChange={e => setDietary(e.target.value)}
              placeholder="e.g. Vegetarian, Gluten Free, Nut allergy…"
              className="input-field"
              maxLength={200}
            />
            <p className="text-muted text-xs mt-1">Leave blank if none — we'll do our best to accommodate.</p>
          </div>
        )}

        {/* Message */}
        <div>
          <label className="font-sans font-medium text-ink mb-2 text-xs tracking-[0.25em] uppercase block">
            Message to the Couple
          </label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Share your well-wishes for the happy couple…"
            className="input-field resize-none h-28"
            maxLength={500}
          />
          <p className="text-muted text-xs mt-1 text-right">{message.length}/500</p>
        </div>

        {(formError || rsvpError) && (
          <p className="text-red-600 text-xs bg-red-50 border border-red-200 p-3 text-center">
            {formError || rsvpError}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary flex-1 text-center disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting…' : 'Submit RSVP'}
          </button>
          {rsvpError && (
            <button type="button" onClick={onRetry} className="btn-secondary">Try Again</button>
          )}
        </div>
      </form>
    </div>
  )
}

/* ── Confirmation ───────────────────────────────────── */
function RSVPConfirmation({ guestData }) {
  const attending = guestData?.attending === 'YES'
  return (
    <div className="card corner-ornament max-w-lg mx-auto text-center">
      {/* Lotus */}
      <div className="flex justify-center mb-6 text-olive-500">
        <svg viewBox="0 0 80 56" width="80" height="56" fill="none">
          <path d="M40 48 Q22 34 22 12 Q31 22 40 30 Q49 22 58 12 Q58 34 40 48Z" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.12"/>
          <path d="M40 44 Q16 38 6 18 Q22 24 36 34" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.08"/>
          <path d="M40 44 Q64 38 74 18 Q58 24 44 34" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.08"/>
          <line x1="40" y1="48" x2="40" y2="56" stroke="currentColor" strokeWidth="0.8"/>
          <circle cx="40" cy="30" r="4" fill="currentColor" fillOpacity="0.4"/>
          <circle cx="40" cy="30" r="2" fill="currentColor"/>
        </svg>
      </div>

      {attending ? (
        <>
          <h3 className="font-serif text-3xl text-ink font-light mb-3">We Can't Wait to See You</h3>
          <p className="text-muted text-sm leading-relaxed mb-6">
            Thank you for confirming, <strong className="text-ink font-medium">{guestData?.name}</strong>.
            Your RSVP has been received. We are so excited to celebrate this special day with you.
          </p>
          {guestData?.table && (
            <div className="border border-olive-200 bg-olive-50 p-6 mb-6 relative">
              <span className="absolute -top-1 -left-1  w-2 h-2 rotate-45 bg-olive-400" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rotate-45 bg-olive-400" />
              <span className="absolute -bottom-1 -left-1  w-2 h-2 rotate-45 bg-olive-400" />
              <span className="absolute -bottom-1 -right-1 w-2 h-2 rotate-45 bg-olive-400" />
              <p className="text-olive-500 text-xs tracking-[0.3em] uppercase font-sans mb-1">Your Seat</p>
              <p className="font-serif text-3xl text-ink font-light">Table {guestData.table}</p>
              <p className="text-muted text-xs mt-2">Please collect your table card at the venue entrance.</p>
            </div>
          )}
          <p className="text-muted text-xs border border-line p-4">
            A confirmation will be sent to you. For queries, please contact us directly.
          </p>
        </>
      ) : (
        <>
          <h3 className="font-serif text-3xl text-ink font-light mb-3">Thank You for Letting Us Know</h3>
          <p className="text-muted text-sm leading-relaxed">
            We're sorry you won't be able to join us, <strong className="text-ink font-medium">{guestData?.name}</strong>.
            You'll be with us in spirit on our special day.
          </p>
        </>
      )}
    </div>
  )
}

/* ── Main Section ───────────────────────────────────── */
export default function RSVPSection({
  guestCode, setGuestCode,
  guestData, lookupState, lookupError,
  rsvpState, rsvpError,
  onLookup, onSubmit, onRetry,
}) {
  return (
    <section id="rsvp" className="py-24 px-6 bg-pearl-100">
      {/* Top floral stripe */}
      <FloralStripe className="mb-16" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading">RSVP</h2>
          <LotusDivider />
          <p className="text-muted text-sm max-w-sm mx-auto mt-4 leading-relaxed">
            Your presence at our celebration would mean the world to us.
          </p>

          {/* ── RSVP deadline highlight ── */}
          <div className="mt-8 inline-flex flex-col items-center">
            <div className="relative border-2 border-olive-600 bg-olive-700 px-8 py-4">
              {/* Floral corners */}
              {[
                'absolute -top-2 -left-2 text-olive-300',
                'absolute -top-2 -right-2 text-olive-300 rotate-90',
                'absolute -bottom-2 -left-2 text-olive-300 -rotate-90',
                'absolute -bottom-2 -right-2 text-olive-300 rotate-180',
              ].map((cls, i) => (
                <svg key={i} viewBox="0 0 24 24" width="20" height="20" fill="none"
                  className={cls}>
                  <line x1="1" y1="1" x2="10" y2="1" stroke="currentColor" strokeWidth="0.8"/>
                  <line x1="1" y1="1" x2="1"  y2="10" stroke="currentColor" strokeWidth="0.8"/>
                  <g transform="translate(6,6)">
                    {[0,72,144,216,288].map(r => (
                      <ellipse key={r} cx="0" cy="-4" rx="1.2" ry="2.8"
                        fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.4"
                        transform={`rotate(${r} 0 0)`}/>
                    ))}
                    <circle cx="0" cy="0" r="1.6" fill="currentColor" fillOpacity="0.6"/>
                  </g>
                </svg>
              ))}
              <p className="text-pearl-300/60 text-xs tracking-[0.35em] uppercase font-sans mb-1">
                Kindly reply before
              </p>
              <p className="font-serif text-2xl text-pearl-100 font-light tracking-wide">
                {WEDDING.rsvpDeadline}
              </p>
            </div>
          </div>
        </div>

        {(lookupState === 'idle' || lookupState === 'error') && rsvpState === 'idle' && (
          <div className="space-y-4">
            <CodeEntry
              guestCode={guestCode}
              setGuestCode={setGuestCode}
              onLookup={onLookup}
              loading={false}
            />
            {lookupError && (
              <p className="text-red-600 text-xs text-center bg-red-50 border border-red-200 p-3 max-w-md mx-auto">
                {lookupError}
              </p>
            )}
          </div>
        )}

        {lookupState === 'loading' && (
          <div className="card max-w-md mx-auto text-center py-16">
            <div className="inline-flex flex-col items-center gap-4 text-olive-500">
              {/* Spinning lotus */}
              <svg viewBox="0 0 40 40" width="40" height="40" className="animate-spin" fill="none">
                <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6"/>
                <circle cx="20" cy="20" r="4" fill="currentColor" fillOpacity="0.4"/>
              </svg>
              <p className="text-muted text-sm font-sans">Loading your invitation…</p>
            </div>
          </div>
        )}

        {lookupState === 'found' && rsvpState !== 'confirmed' && (
          <RSVPForm
            guestData={guestData}
            onSubmit={onSubmit}
            submitting={rsvpState === 'submitting'}
            rsvpError={rsvpState === 'error' ? rsvpError : ''}
            onRetry={onRetry}
          />
        )}

        {rsvpState === 'confirmed' && (
          <RSVPConfirmation guestData={guestData} />
        )}
      </div>

      {/* Bottom floral stripe */}
      <FloralStripe className="mt-16" />
    </section>
  )
}
