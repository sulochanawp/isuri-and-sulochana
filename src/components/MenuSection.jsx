import { useState } from 'react'
import { MENU } from '../config'
import { LotusDivider, FloralStripe } from './Ornaments'

const TABS = [
  { id: 'starters', label: 'Starters' },
  { id: 'mains',    label: 'Mains'    },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks',   label: 'Drinks', star: true },   // * points to the drinks note
]

function DietaryBadge({ code }) {
  const key = MENU.dietaryKey.find(k => k.code === code)
  if (!key) return null
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-sans font-medium px-2 py-0.5 tracking-wide ${key.color}`}>
      {key.icon === 'cocktail' ? (
        // Martini glass with an olive on a pick
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none"
             stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 5h18l-9 9z M12 14v6 M8 20h8 M8.5 2.5l5 6"/>
          <circle cx="13.5" cy="8.5" r="1.5" fill="currentColor"/>
        </svg>
      ) : key.icon === 'mocktail' ? (
        // Tall glass with a straw and a lemon slice
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none"
             stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8h11l-1.5 13h-8z M13 8l2-6h3 M6.5 12h10"/>
          <path d="M17 8a3 3 0 0 1 3-3" />
        </svg>
      ) : (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="13" height="13" fill="currentColor">
        <path d="M216-176q-45-45-70.5-104T120-402q0-63 24-124.5T222-642q35-35 86.5-60t122-39.5Q501-756 591.5-759t202.5 7q8 106 5 195t-16.5 160.5q-13.5 71.5-38 125T684-182q-53 53-112.5 77.5T450-80q-65 0-127-25.5T216-176Zm112-16q29 17 59.5 24.5T450-160q46 0 91-18.5t86-59.5q18-18 36.5-50.5t32-85Q709-426 716-500.5t2-177.5q-49-2-110.5-1.5T485-670q-61 9-116 29t-90 55q-45 45-62 89t-17 85q0 59 22.5 103.5T262-246q42-80 111-153.5T534-520q-72 63-125.5 142.5T328-192Zm0 0Zm0 0Z"/>
      </svg>
      )}
      {key.label}
    </span>
  )
}

function MenuCard({ item }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line pb-5 last:border-0 last:pb-0 group">
      <div className="flex items-start gap-3">
        {/* Small diamond bullet */}
        <span className="mt-2 w-1.5 h-1.5 rotate-45 bg-olive-400 flex-shrink-0 group-hover:bg-olive-600 transition-colors" />
        <div>
          <h4 className="text-lg text-ink font-semibold leading-snug" style={{ fontFamily: '"Cormorant Upright", Georgia, serif' }}>{item.name}</h4>
          <p className="text-muted text-sm mt-0.5 leading-relaxed">{item.description}</p>
        </div>
      </div>
      {item.badges.length > 0 && (
        <div className="flex gap-1 flex-shrink-0 flex-col items-end">
          {item.badges.map(b => <DietaryBadge key={b} code={b} />)}
        </div>
      )}
    </div>
  )
}

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState('starters')

  const items = { starters: MENU.starters, mains: MENU.mains, desserts: MENU.desserts, drinks: MENU.drinks || [] }

  return (
    <section id="menu" className="py-24 px-6 bg-pearl-100">
      {/* Top floral stripe */}
      <FloralStripe className="mb-10" />

      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-olive-500 text-xs tracking-[0.4em] uppercase font-sans mb-3">
            A Culinary Journey
          </p>
          <h2 className="section-heading">The Menu</h2>
          <LotusDivider />
          {MENU.note && (
            <p className="text-muted mt-4 max-w-md mx-auto text-sm leading-relaxed">
              &ldquo;{MENU.note}&rdquo;
            </p>
          )}
        </div>

        {/* Tab bar */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex border border-line bg-white">
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-3.5 sm:px-7 py-2.5 font-sans text-xs font-medium tracking-[0.1em] sm:tracking-[0.2em] uppercase transition-all duration-200
                  ${i > 0 ? 'border-l border-line' : ''}
                  ${activeTab === tab.id
                    ? 'bg-olive-700 text-pearl-100'
                    : 'text-muted hover:text-ink hover:bg-pearl-50'
                  }`}
              >
                {tab.label}{tab.star && <span aria-hidden="true">*</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Items */}
        <div className="bg-white border border-line p-6 md:p-8 space-y-5 corner-ornament">
          {items[activeTab].map((item, i) => (
            <MenuCard key={i} item={item} />
          ))}
        </div>

        {activeTab === 'drinks' && MENU.drinksNote && (
          <p className="text-muted mt-6 max-w-md mx-auto text-center text-sm leading-relaxed italic">
            * {MENU.drinksNote}
          </p>
        )}

      </div>

    </section>
  )
}
