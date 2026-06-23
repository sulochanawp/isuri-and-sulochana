import { useState, useRef } from 'react'
import { AGENDA, WEDDING } from '../config'
import { LotusDivider, FloralStripe } from './Hero'
import { ordinal } from '../utils.jsx'

export default function AgendaSection() {
  const [expanded, setExpanded] = useState(false)
  const expandBtnRef = useRef(null)

  const visibleItems = expanded ? AGENDA : AGENDA.slice(0, 3)

  function collapse() {
    setExpanded(false)
    setTimeout(() => {
      expandBtnRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 50)
  }

  return (
    <section id="agenda" className="py-24 bg-white">
      <FloralStripe className="mb-6" />

      <div className="max-w-3xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-olive-500 text-xs tracking-[0.4em] uppercase font-sans mb-3">
            {ordinal(WEDDING.date)}
          </p>
          <h2 className="section-heading">The Day</h2>
          <LotusDivider />
          <p className="text-muted text-sm mt-4 max-w-md mx-auto leading-relaxed">
            Here's a glimpse of how our day will unfold. We can't wait to share every moment with you.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line stops before the button area */}
          <div className="absolute left-8 md:left-1/2 top-0 w-px bg-olive-100 md:-translate-x-px"
            style={{ bottom: expanded ? '80px' : '160px' }} />

          <div className="space-y-6">
            {visibleItems.map((item, i) => {
              const fading = !expanded && i === 2
              return (
                <div
                  key={i}
                  className={`relative flex items-start gap-6 md:gap-0 transition-opacity duration-300 ${
                    fading ? 'opacity-35' : 'opacity-100'
                  } ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`ml-16 md:ml-0 md:w-5/12 ${i % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:pl-10 md:text-left'}`}>
                    <div className="border border-line hover:border-olive-300 transition-colors duration-300 p-5 bg-pearl-50">
                      <span className="text-olive-500 text-xs tracking-[0.25em] uppercase font-sans block mb-1">
                        {item.time}
                      </span>
                      <h3 className="font-serif text-lg text-ink font-light mb-1">{item.title}</h3>
                      <p className="text-muted text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Centre marker */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10 top-5">
                    <div className="relative w-8 h-8 flex items-center justify-center bg-white border border-olive-200">
                      <div className="w-2.5 h-2.5 rotate-45 bg-olive-400" />
                    </div>
                  </div>

                  <div className="hidden md:block md:w-5/12" />
                </div>
              )
            })}
          </div>

          {/* Fade gradient + expand button */}
          {!expanded ? (
            <div
              className="relative -mt-24 flex flex-col items-center pt-2 pb-4"
              style={{ background: 'linear-gradient(to bottom, transparent, white 50%)' }}
            >
              <button
                ref={expandBtnRef}
                onClick={() => setExpanded(true)}
                className="mt-14 relative z-10 border border-olive-300 bg-white px-8 py-3 font-sans text-xs tracking-[0.25em] uppercase text-olive-600 hover:bg-olive-50 hover:border-olive-400 transition-colors duration-200 flex items-center gap-3"
              >
                <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" className="text-olive-400">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
                View the full agenda for the day
              </button>
            </div>
          ) : (
            <div className="relative z-10 flex justify-center mt-10 pt-6"
              style={{ background: 'linear-gradient(to top, white 70%, transparent)' }}>
              <button
                onClick={collapse}
                className="border border-olive-300 bg-white px-8 py-3 font-sans text-xs tracking-[0.25em] uppercase text-olive-600 hover:bg-olive-50 hover:border-olive-400 transition-colors duration-200 flex items-center gap-3"
              >
                <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" className="text-olive-400">
                  <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"/>
                </svg>
                Hide the full agenda for the day
              </button>
            </div>
          )}
        </div>
      </div>

      <FloralStripe className="mt-6" />
    </section>
  )
}
