import { useState } from 'react'
import { WEDDING } from '../config'
import { LotusDivider, FloralStripe } from './Hero'
import { ordinal } from '../utils.jsx'

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
  const isUpdate = guestData?.alreadySubmitted

  // Always start blank — guest enters fresh numbers each time
  const [attending, setAttending]   = useState(true)
  const [adultCount, setAdultCount] = useState(1)
  const [childCount, setChildCount] = useState(0)
  const [dietary, setDietary]       = useState('')
  const [message, setMessage]       = useState('')
  const [formError, setFormError]   = useState('')

  const maxAdults   = guestData?.allowedAdults   || 1
  const maxChildren = guestData?.allowedChildren || 0

  const handleSubmit = (e) => {
    e.preventDefault()
    if (attending && adultCount < 1) {
      setFormError('Please select at least 1 adult attending.')
      return
    }
    setFormError('')
    onSubmit({
      attending,
      attendingAdults:   attending ? adultCount : 0,
      attendingChildren: attending ? childCount : 0,
      dietary,
      message,
    })
  }

  // Invitation summary line
  const inviteSummary = maxChildren > 0
    ? `Your invitation includes up to ${maxAdults} ${maxAdults === 1 ? 'adult' : 'adults'} and ${maxChildren} ${maxChildren === 1 ? 'child' : 'children'}.`
    : maxAdults > 1
      ? `Your invitation includes up to ${maxAdults} adults.`
      : null

  return (
    <div className="card corner-ornament max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="font-serif text-3xl text-ink font-light">
          {isUpdate ? 'Update Your RSVP' : `Welcome, ${guestData?.name}`}
        </h3>
        <p className="text-muted text-sm mt-2">
          {isUpdate
            ? 'Change your details below and resubmit — your previous response will be replaced.'
            : "Your invitation is confirmed — please let us know if you'll be joining us."}
        </p>
        {inviteSummary && (
          <p className="text-olive-600 text-xs mt-2 tracking-wide">{inviteSummary}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Attendance */}
        <div>
          <p className="font-sans font-medium text-ink mb-3 text-xs tracking-[0.25em] uppercase">
            Will you be attending? *
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setAttending(true)}
              className={`py-4 border font-sans font-medium text-xs tracking-[0.15em] uppercase transition-all duration-200 leading-relaxed ${
                attending === true
                  ? 'border-olive-600 bg-olive-700 text-pearl-100'
                  : 'border-line text-muted hover:border-olive-400 hover:text-ink'
              }`}
            >
              Joyfully<br />Accept
            </button>
            <button
              type="button"
              onClick={() => setAttending(false)}
              className={`py-4 border font-sans font-medium text-xs tracking-[0.15em] uppercase transition-all duration-200 ${
                attending === false
                  ? 'border-rose-400 bg-rose-50 text-rose-700'
                  : 'border-line text-rose-400/70 hover:border-rose-300 hover:text-rose-500'
              }`}
            >
              Regretfully Decline
            </button>
          </div>
        </div>

        {/* Adults + Children */}
        {attending && (
          <div className={`grid gap-4 ${maxChildren > 0 ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
            {/* Adults */}
            <div>
              <label className="font-sans font-medium text-ink mb-2 text-xs tracking-[0.25em] uppercase block">
                Adults Attending *
              </label>
              <select
                value={adultCount}
                onChange={e => setAdultCount(Number(e.target.value))}
                className="input-field"
              >
                {Array.from({ length: maxAdults }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{String(n).padStart(2, '0')} {n === 1 ? 'Adult' : 'Adults'}</option>
                ))}
              </select>
            </div>

            {/* Children — only shown if invitation allows children */}
            {maxChildren > 0 && (
              <div>
                <label className="font-sans font-medium text-ink mb-2 text-xs tracking-[0.25em] uppercase block">
                  Children Attending
                </label>
                <select
                  value={childCount}
                  onChange={e => setChildCount(Number(e.target.value))}
                  className="input-field"
                >
                  {Array.from({ length: maxChildren + 1 }, (_, i) => i).map(n => (
                    <option key={n} value={n}>{n === 0 ? 'None' : `${String(n).padStart(2, '0')} ${n === 1 ? 'Child' : 'Children'}`}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Attending count summary */}
        {attending && (
          <div className="bg-olive-50 border border-olive-100 px-4 py-3 text-xs text-olive-700 font-sans flex items-center gap-2">
            <span className="w-1.5 h-1.5 rotate-45 bg-olive-400 flex-shrink-0" />
            <span>
              Confirming <strong>{adultCount} {adultCount === 1 ? 'adult' : 'adults'}</strong>
              {maxChildren > 0 && childCount > 0 && (
                <> and <strong>{childCount} {childCount === 1 ? 'child' : 'children'}</strong></>
              )}
              {maxChildren > 0 && childCount === 0 && <>, no children</>}
            </span>
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
              placeholder="e.g. 1 vegetarian, 1 nut allergy, children's meals needed…"
              className="input-field"
              maxLength={200}
            />
            <p className="text-muted text-xs mt-1">Please mention each person's requirements. Leave blank if none.</p>
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
            {submitting ? 'Submitting…' : isUpdate ? 'Update RSVP' : 'Submit RSVP'}
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
function RSVPConfirmation({ guestData, onEdit }) {
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
          <p className="text-muted text-sm leading-relaxed mb-4">
            Thank you for confirming, <strong className="text-ink font-medium">{guestData?.name}</strong>.
            Your RSVP has been received. We are so excited to celebrate this special day with you.
          </p>

          {/* Attending breakdown */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {guestData?.attendingAdults > 0 && (
              <div className="border border-olive-200 bg-olive-50 px-5 py-3 text-center">
                <p className="font-serif text-2xl text-ink font-light">{String(guestData.attendingAdults).padStart(2, '0')}</p>
                <p className="text-olive-500 text-xs tracking-widest uppercase font-sans mt-0.5">
                  {guestData.attendingAdults === 1 ? 'Adult' : 'Adults'}
                </p>
              </div>
            )}
            {guestData?.attendingChildren > 0 && (
              <div className="border border-olive-200 bg-olive-50 px-5 py-3 text-center">
                <p className="font-serif text-2xl text-ink font-light">{String(guestData.attendingChildren).padStart(2, '0')}</p>
                <p className="text-olive-500 text-xs tracking-widest uppercase font-sans mt-0.5">
                  {guestData.attendingChildren === 1 ? 'Child' : 'Children'}
                </p>
              </div>
            )}
          </div>

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
          <div className="border border-line p-4">
            <p className="text-muted text-xs mb-3">For queries, please contact us directly.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              {WEDDING.contacts.map(c => (
                <a key={c.name}
                  href={`https://wa.me/${c.whatsapp}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-olive-200 px-4 py-2 text-xs font-sans tracking-widest uppercase text-olive-600 hover:bg-olive-50 hover:border-olive-300 transition-colors duration-200"
                >
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" className="text-olive-400">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Contact {c.name}
                </a>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <h3 className="font-serif text-3xl text-ink font-light mb-3">Thank You for Letting Us Know</h3>
          <p className="text-muted text-sm leading-relaxed mb-6">
            We're sorry you won't be able to join us, <strong className="text-ink font-medium">{guestData?.name}</strong>.
            You'll be with us in spirit on our special day.
          </p>
        </>
      )}

      {/* Update button — always visible after submission */}
      <button
        onClick={onEdit}
        className="mt-6 inline-flex items-center gap-2 text-muted hover:text-ink text-xs font-sans tracking-widest uppercase transition-colors duration-200 group"
      >
        <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>
        <span className="group-hover:underline underline-offset-2">Change my RSVP</span>
      </button>
    </div>
  )
}

/* ── Main Section ───────────────────────────────────── */
export default function RSVPSection({
  guestCode, setGuestCode,
  guestData, lookupState, lookupError,
  rsvpState, rsvpError,
  onLookup, onSubmit, onRetry, onEdit,
}) {
  return (
    <section id="rsvp" className="py-24 px-6 bg-pearl-100">
      {/* Top floral stripe */}
      <FloralStripe className="mb-6" />

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
                Kindly RSVP before
              </p>
              <p className="font-serif text-2xl text-pearl-100 font-light tracking-wide">
                {ordinal(WEDDING.rsvpDeadline)}
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
          <RSVPConfirmation guestData={guestData} onEdit={onEdit} />
        )}
      </div>

      {/* Bottom floral stripe */}
      <FloralStripe className="mt-6" />
    </section>
  )
}
