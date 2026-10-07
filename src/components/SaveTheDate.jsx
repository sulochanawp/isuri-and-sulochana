import Hero from './Hero'
import { DiamondRule } from './Ornaments'

/* ── Standalone full-page Save the Date (shown until WEDDING.siteOpenTime) ──
   Reuses the hero as-is so the two always match. */
export function SaveTheDatePage() {
  return (
    <Hero eyebrow="Save the date for the wedding of">
      <DiamondRule
        className="mt-10 mb-5 max-w-xs mx-auto opacity-30"
        lineClass="border-pearl-100"
        diamondClass="bg-olive-300"
      />
      <p className="text-pearl-300/70 text-xs tracking-[0.35em] uppercase font-sans">
        Formal invitation &amp; RSVP to follow
      </p>
    </Hero>
  )
}
