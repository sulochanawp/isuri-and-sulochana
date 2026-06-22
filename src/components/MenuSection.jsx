import { useState } from 'react'
import { MENU } from '../config'
import { LotusDivider, FloralStripe } from './Hero'

const TABS = [
  { id: 'starters', label: 'Starters' },
  { id: 'mains',    label: 'Mains'    },
  { id: 'desserts', label: 'Desserts' },
]

function DietaryBadge({ code }) {
  const def = MENU.dietaryKey.find(d => d.code === code)
  if (!def) return null
  return (
    <span className={`inline-block text-xs font-sans font-medium px-2 py-0.5 tracking-wide ${def.color}`}>
      {def.label}
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
          <h4 className="font-serif text-lg text-ink font-light leading-snug">{item.name}</h4>
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

  const items = { starters: MENU.starters, mains: MENU.mains, desserts: MENU.desserts }

  return (
    <section id="menu" className="py-24 px-6 bg-pearl-100">
      {/* Top floral stripe */}
      <FloralStripe className="mb-6" />

      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-olive-500 text-xs tracking-[0.4em] uppercase font-sans mb-3">
            A Culinary Journey
          </p>
          <h2 className="section-heading">The Menu</h2>
          <LotusDivider />
          {MENU.note && (
            <p className="text-muted mt-4 max-w-md mx-auto text-sm leading-relaxed italic font-serif">
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
                className={`relative px-7 py-2.5 font-sans text-xs font-medium tracking-[0.2em] uppercase transition-all duration-200
                  ${i > 0 ? 'border-l border-line' : ''}
                  ${activeTab === tab.id
                    ? 'bg-olive-700 text-pearl-100'
                    : 'text-muted hover:text-ink hover:bg-pearl-50'
                  }`}
              >
                {tab.label}
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

        {/* Bottom floral stripe */}
        <FloralStripe className="mt-6" />

        {/* Dietary key */}
        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <span className="text-muted text-xs tracking-[0.25em] uppercase font-sans">Key —</span>
          {MENU.dietaryKey.map(({ code, label, color }) => (
            <span key={code} className={`text-xs font-sans font-medium px-2 py-0.5 ${color}`}>
              {label}
            </span>
          ))}
        </div>
      </div>

    </section>
  )
}
