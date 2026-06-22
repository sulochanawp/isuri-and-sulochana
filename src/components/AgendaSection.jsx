import { useState } from 'react'
import { AGENDA, WEDDING } from '../config'
import { LotusDivider, FloralStripe } from './Hero'

/* ── Agenda section ─────────────────────────────────── */
export default function AgendaSection() {
  const [open, setOpen] = useState(false)

  return (
    <section id="agenda" className="py-24 bg-white">
      <FloralStripe className="mb-6" />

      <div className="max-w-3xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-olive-500 text-xs tracking-[0.4em] uppercase font-sans mb-3">
            {WEDDING.date}
          </p>
          <h2 className="section-heading">The Day</h2>
          <LotusDivider />
          <p className="text-muted text-sm mt-4 max-w-md mx-auto leading-relaxed">
            Here's a glimpse of how our day will unfold. We can't wait to share every moment with you.
          </p>
        </div>

        {/* Accordion trigger */}
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between border border-line hover:border-olive-300 bg-pearl-50 px-6 py-5 transition-colors duration-200 group"
        >
          <span className="font-serif text-xl text-ink font-light tracking-wide">View the Full Schedule</span>
          <span className={`transition-transform duration-300 text-olive-400 ${open ? 'rotate-180' : ''}`}>
            <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </span>
        </button>

        {/* Collapsible timeline */}
        <div className={`overflow-hidden transition-all duration-500 ${open ? 'max-h-[9999px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="relative pt-8 pb-4">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-olive-100 md:-translate-x-px" />

            <div className="space-y-6">
              {AGENDA.map((item, i) => (
                <div
                  key={i}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
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
              ))}
            </div>
          </div>
        </div>
      </div>

      <FloralStripe className="mt-6" />
    </section>
  )
}
