import { useState, useMemo } from 'react'
import { SEATING } from '../seating'
import { LotusDivider, FloralStripe } from './Ornaments'
import Footer from './Footer'

const BASE         = import.meta.env.BASE_URL
const FLOOR_PLAN   = `${BASE}floor-plan.pdf`
const SEATING_PAGE = `${BASE}?view=seating`

const SIDES = [
  { id: 'bride', label: "Bride's side" },
  { id: 'groom', label: "Groom's side" },
]

/* ── Guest-list parsing ─────────────────────────────── */

// Leading titles ("Mr", "Mrs", "Ven.", "Mr & Mrs" …) — shown as written,
// but ignored when sorting A–Z by first name
const TITLES = /^((mr|mrs|ms|miss|master|dr|ven|rev|prof|hon)\.?\s*(&|and)\s*)?(mr|mrs|ms|miss|master|dr|ven|rev|prof|hon)\.?\s+/i
// "and Family", "& Partner", "with Kids" … — shown in a lighter colour
const SUFFIX = /\s+((?:and|&|with)\s+(?:family|partner|wife|husband|spouse|kids|children|son|daughter|sons|daughters))\s*$/i

function parseGuest(table, raw) {
  const name     = raw.replace(/\s+/g, ' ').trim()
  const sortName = name.replace(TITLES, '')
  const m = name.match(SUFFIX)
  const main   = m ? name.slice(0, m.index) : name
  const suffix = m ? m[1] : ''
  return { table, raw, main, suffix, sortName, letter: sortName.charAt(0).toUpperCase() }
}

// Rows are "table<TAB>name" as pasted from a spreadsheet (2+ spaces also work,
// in case an editor turned the tab into spaces). A header row is skipped.
function parseList(text) {
  return String(text || '')
    .split(/\r?\n/)
    .map(line => line.split(/\t+| {2,}/).map(s => s.trim()).filter(Boolean))
    .filter(cells => cells.length >= 2 && !/^tables?$/i.test(cells[0]))
    .map(([table, ...rest]) => parseGuest(table, rest.join(' ')))
    .sort((a, b) => a.sortName.localeCompare(b.sortName))
}

// Match every whitespace-separated term, in any order, against the name as written
const matches = (g, terms) => terms.every(t => g.raw.toLowerCase().includes(t))

function Highlight({ text, terms }) {
  if (!terms.length) return text
  const re = new RegExp(`(${terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'ig')
  return text.split(re).map((part, i) =>
    i % 2 ? <mark key={i} className="bg-olive-200 text-ink">{part}</mark> : part
  )
}

/* ── Section on the main site (between the hero and the agenda) ── */
export default function SeatingSection() {
  return (
    <section id="seating" className="py-24 px-6 bg-pearl-100">
      {/* Top floral stripe */}
      <FloralStripe className="mb-10" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <p className="text-olive-500 text-xs tracking-[0.4em] uppercase font-sans mb-3">
            Find Your Seat
          </p>
          <h2 className="section-heading">Seating Arrangement</h2>
          <LotusDivider />
          <p className="text-muted text-sm max-w-sm mx-auto mt-4 mb-8 leading-relaxed">
            Look up your name to find your table, and view the floor plan of the hall.
          </p>
          <a href={SEATING_PAGE} target="_blank" rel="noopener" className="btn-primary">
            View Seating Arrangement
          </a>
        </div>
      </div>
    </section>
  )
}

/* ── Standalone full page (used when ?view=seating) ─── */
export function SeatingPage() {
  const lists = useMemo(() => ({
    bride: parseList(SEATING.bride),
    groom: parseList(SEATING.groom),
  }), [])
  const [tab, setTab]     = useState(() => (lists.bride.length || !lists.groom.length ? 'bride' : 'groom'))
  const [query, setQuery] = useState('')

  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)

  // If the name is only on the other side, show that side instead
  let side = tab
  if (terms.length && !lists[side].some(g => matches(g, terms))) {
    const other = side === 'bride' ? 'groom' : 'bride'
    if (lists[other].some(g => matches(g, terms))) side = other
  }

  const guests = lists[side].filter(g => matches(g, terms))
  const groups = []
  guests.forEach(g => {
    const last = groups[groups.length - 1]
    if (last && last.letter === g.letter) last.guests.push(g)
    else groups.push({ letter: g.letter, guests: [g] })
  })

  return (
    <div className="min-h-screen bg-pearl-100 font-sans text-ink flex flex-col">
      <div className="flex-1 px-6 pt-10 pb-20">
        <FloralStripe className="mb-10" />

        {/* Heading */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="text-olive-500 text-xs tracking-[0.4em] uppercase font-sans mb-3">
            Find Your Seat
          </p>
          <h1 className="section-heading">Seating Arrangement</h1>
          <LotusDivider />
        </div>

        <div className="max-w-xl mx-auto">

          {/* Floor plan — opens the PDF in a new tab */}
          <div className="text-center">
            <a href={FLOOR_PLAN} target="_blank" rel="noopener" className="btn-primary inline-flex items-center gap-2">
              <svg viewBox="0 0 20 20" width="13" height="13" fill="currentColor" aria-hidden="true">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
              </svg>
              View Floor Plan
            </a>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mt-12 mb-6 text-olive-400 text-xs tracking-[0.3em] uppercase font-sans">
            <span className="flex-1 border-t border-line" />
            Find Your Name
            <span className="flex-1 border-t border-line" />
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true"
                 className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
            </svg>
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search your name"
              aria-label="Search your name"
              className="input-field pl-11"
            />
          </div>

          {/* Bride / Groom tabs */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex border border-line bg-white" role="tablist">
              {SIDES.map((s, i) => (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={side === s.id}
                  onClick={() => { setTab(s.id); setQuery('') }}
                  className={`px-6 py-2.5 font-sans text-xs font-medium tracking-[0.2em] uppercase transition-all duration-200
                    ${i > 0 ? 'border-l border-line' : ''}
                    ${side === s.id ? 'bg-olive-700 text-pearl-100' : 'text-muted hover:text-ink hover:bg-pearl-50'}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Guest list — A–Z by first name */}
          {groups.length > 0 ? groups.map(grp => (
            <div key={grp.letter} className="mb-2">
              <p className="font-serif text-3xl text-olive-400 border-b border-line mt-4 mb-1 leading-tight">
                {grp.letter}
              </p>
              {grp.guests.map((g, i) => (
                <div key={i} className="flex items-baseline gap-2 py-1.5 text-sm">
                  <span className="min-w-0">
                    <Highlight text={g.main} terms={terms} />
                    {g.suffix && <span className="text-muted"> <Highlight text={g.suffix} terms={terms} /></span>}
                  </span>
                  <span className="flex-1 min-w-4 border-b border-dotted border-olive-300 -translate-y-1" aria-hidden="true" />
                  <span className="whitespace-nowrap font-serif text-base text-olive-700">
                    Table {g.table}
                  </span>
                </div>
              ))}
            </div>
          )) : (
            <p className="text-center text-muted text-sm py-6">
              {terms.length
                ? 'No guest found by that name. Try your first or last name only.'
                : 'This list will appear here soon.'}
            </p>
          )}
        </div>
      </div>

      <Footer showMap={false} showWhatsApp={false} />
    </div>
  )
}
