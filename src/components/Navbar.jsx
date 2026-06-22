import { useState, useEffect } from 'react'

const LINKS = [
  { label: 'Home',   href: '#' },
  { label: 'RSVP',   href: '#rsvp' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Menu',   href: '#menu' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = LINKS

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-pearl-100/95 backdrop-blur border-b border-line py-3'
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* Logo — couple initials with small diamond */}
        <a href="#home" className={`flex items-center gap-2 font-serif text-xl font-light tracking-widest transition-colors duration-300 ${
          scrolled ? 'text-ink' : 'text-pearl-100'
        }`}>
          <span className={`w-1.5 h-1.5 rotate-45 inline-block transition-colors duration-300 ${scrolled ? 'bg-olive-500' : 'bg-pearl-300'}`} />
          {WEDDING.bride} & {WEDDING.groom}
          <span className={`w-1.5 h-1.5 rotate-45 inline-block transition-colors duration-300 ${scrolled ? 'bg-olive-500' : 'bg-pearl-300'}`} />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map(link => (
            <li key={link.label}>
              <a href={link.href} className={`font-sans text-xs tracking-[0.25em] uppercase transition-all duration-300 hover:opacity-60 ${
                scrolled ? 'text-ink' : 'text-pearl-100'
              }`}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden flex flex-col gap-1.5 ${scrolled ? 'text-ink' : 'text-pearl-100'}`}
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-px w-5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      } bg-pearl-100 border-b border-line`}>
        <ul className="flex flex-col items-center gap-5 py-7">
          {links.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-sans text-xs tracking-[0.25em] uppercase text-ink hover:text-olive-600 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
