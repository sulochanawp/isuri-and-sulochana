import floralDivider from '../assets/floral-divider.svg?raw'
import lotusLight from '../assets/lotus-light.svg?raw'
import lotusDark from '../assets/lotus-dark.svg?raw'

/* ════════════════════════════════════════════════════════════
   SHARED DECORATIVE ELEMENTS
   ════════════════════════════════════════════════════════════ */

/* ── Inline lotus ── */
export function Lotus({ dark = false, className = '' }) {
  return (
    <span
      className={`inline-block w-[120px] [&>svg]:w-full [&>svg]:h-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: dark ? lotusDark : lotusLight }}
    />
  )
}

/* ── Lotus section divider ── */
export function LotusDivider({ light = false }) {
  return (
    <div className={`flex items-center justify-center gap-4 my-1 ${light ? 'text-pearl-300' : 'text-olive-400'}`}>
      <div className="flex-1 border-t border-current opacity-30" />
      <Lotus dark={light} className="opacity-70" />
      <div className="flex-1 border-t border-current opacity-30" />
    </div>
  )
}

/* ── Botanical / floral stripe ──────────────────────────────
   A single ornamental floral divider, centred in the section.
   Inherits the section colour via currentColor, so it works on
   both light (pearl) and dark (olive) backgrounds.  */
export function FloralStripe({ light = false, className = '' }) {
  const col = light ? '#F5F2EA' : '#4A5C2A'

  return (
    <div
      className={`w-full flex justify-center overflow-hidden ${className}`}
      style={{ color: col }}
      aria-hidden="true"
    >
      <span
        className="block w-full max-w-xs opacity-50 [&>svg]:w-full [&>svg]:h-auto"
        dangerouslySetInnerHTML={{ __html: floralDivider }}
      />
    </div>
  )
}

/* ── Botanical vintage corner — hero names frame only ── */
export function HeroCorner({ className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 171.8 171.25" className={className}>
      <path fill="currentColor" d="M131.54,50.18c6.81-5.73,24.62-11.74,27,1.59a9.51,9.51,0,0,1-6.95,10.82c-4.76,1.23-10.69-1.26-11.93-5.92a4.7,4.7,0,0,1-.26-1.09c-.25-2.18.87-4.09,2.51-4.28s3.16,1.43,3.41,3.61a4.46,4.46,0,0,1-.94,3.42c2.8,2.27,8.39,1.05,10.17-2.38a7.45,7.45,0,0,0-.69-7.45c-3.41-4.9-14.29-1.42-18.65,1.84-8.56,6.41-12.09,18.59-13.12,28.71a48.85,48.85,0,0,0,3.89,25.24c3.55,7.67,10.68,12.74,17.39,17.48,4.24,3-1.9,1.83-2.85,1.19C128.92,115.15,121.1,106.35,119,92.2S120.17,59.77,131.54,50.18Z"/>
      <path fill="currentColor" d="M166.88,4c-6.89-5-16.38,1-21.56,6-6.91,6.6-9.9,15.74-11.82,24.92a176.8,176.8,0,0,1-44.14,3.35C75.12,37.47,58,33.67,50.41,20.37c-5.84-10.19,6-16.86,14.43-12.14,4.61,2.57,6.66,10,.7,12.25a9.27,9.27,0,0,1-3.7.38,5.55,5.55,0,0,1-4.09-2.95,4.35,4.35,0,0,0,4.15-1.63c1.5-1.82,1.45-4.31-.09-5.58a3.87,3.87,0,0,0-5.15.63,2.28,2.28,0,0,0-.34.35,4.58,4.58,0,0,0-.56.87c-2.88,5.07.79,12.17,6.69,12.43,7.79.34,12-8,8.64-14.61C66.67,1.63,55.18-.5,48.66,7.26s.22,18.47,6.21,24c8.34,7.64,21.47,10,32.34,11,14,1.29,28.52-.11,42.37-2.49,1-.17,2.06-.36,3.1-.55-.19,1-.38,2.08-.55,3.1-2.38,13.84-3.78,28.34-2.49,42.37,1,10.87,3.34,24,11,32.34,5.49,6,16.19,12.73,24,6.21s5.62-18-3.11-22.43c-6.61-3.35-14.95.85-14.61,8.64.26,5.9,7.36,9.57,12.43,6.69a5.83,5.83,0,0,0,.87-.56,1.92,1.92,0,0,0,.35-.35,3.87,3.87,0,0,0,.63-5.15c-1.27-1.54-3.77-1.58-5.58-.08a4.33,4.33,0,0,0-1.63,4.15,5.54,5.54,0,0,1-3-4.09,9.65,9.65,0,0,1,.38-3.7c2.22-6,9.69-3.91,12.26.7,4.72,8.46-2,20.26-12.14,14.43-13.31-7.61-17.1-24.72-17.9-38.95a177.24,177.24,0,0,1,3.36-44.14c9.18-1.92,18.32-4.91,24.92-11.83,4.93-5.17,10.94-14.66,6-21.55A8.13,8.13,0,0,0,166.88,4Zm-.69,3.37c3.74,7.58-6.33,16.75-10.88,20C150.09,31,144,32.69,137.81,34c1.34-6.15,3-12.28,6.68-17.5C147.69,12,157.36,1.7,164.44,5.65A4.74,4.74,0,0,1,166.19,7.4Z"/>
      <path fill="currentColor" d="M121.65,40.3c5.74-6.81,11.74-24.62-1.58-27a9.51,9.51,0,0,0-10.83,7C108,25.05,110.51,31,115.17,32.22a5.33,5.33,0,0,0,1.08.26c2.18.25,4.1-.88,4.29-2.51s-1.43-3.16-3.61-3.41a4.44,4.44,0,0,0-3.42.94c-2.27-2.8-1.05-8.4,2.38-10.17a7.42,7.42,0,0,1,7.45.69c4.9,3.41,1.42,14.29-1.84,18.65-6.41,8.56-18.59,12.08-28.71,13.12A49,49,0,0,1,67.54,45.9c-7.66-3.55-12.73-10.68-17.47-17.39-3-4.25-1.83,1.9-1.19,2.85,7.8,11.56,16.6,19.38,30.76,21.52S112.07,51.67,121.65,40.3Z"/>
      <path fill="currentColor" d="M151.79,126.8c8,4.31,13.07,11.27,13.07,20.45V169.1c0,3-4.51,2.89-4.51-.46V150.86c0-4.22.28-8.21-1.3-12.22-1.86-4.72-6.33-8.35-10.58-10.89s2.31-1.5,3.32-1Z"/>
      <path fill="currentColor" d="M44.45,19.46C40.13,11.47,33.18,6.39,24,6.39H2.15c-3,0-2.89,4.51.46,4.51H20.39c4.22,0,8.21-.28,12.22,1.31,4.72,1.85,8.35,6.32,10.88,10.57s1.51-2.31,1-3.32Z"/>
      <path fill="currentColor" d="M105,64.37C95.49,54.68,92.52,38.6,95,25.51,97.64,11.34,108,2.05,122.21,0c1.09-.16.59,3.15-.32,3.28C109.07,5.13,97.57,13.34,96.13,27.05c-1.36,13,2.9,27.1,12,36.67,9.57,9,23.68,13.32,36.67,12,13.71-1.44,21.92-12.94,23.76-25.76.14-.9,3.44-1.41,3.29-.32-2.05,14.22-11.33,24.57-25.5,27.24-13.09,2.45-28.88-.22-38.87-10A22.64,22.64,0,0,1,105,64.37Z"/>
    </svg>
  )
}

/* ── Diamond accents pinned to the four corners of a `relative` box ── */
export function DiamondCorners({ className = 'w-1.5 h-1.5 bg-olive-400' }) {
  const base = `absolute rotate-45 ${className}`
  return (
    <>
      <span className={`${base} -top-1 -left-1`} />
      <span className={`${base} -top-1 -right-1`} />
      <span className={`${base} -bottom-1 -left-1`} />
      <span className={`${base} -bottom-1 -right-1`} />
    </>
  )
}

/* ── Thin rule with a centred diamond ── */
export function DiamondRule({ className = '', lineClass = 'border-ink', diamondClass = 'bg-ink' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className={`flex-1 border-t ${lineClass}`} />
      <div className={`w-1.5 h-1.5 rotate-45 ${diamondClass}`} />
      <div className={`flex-1 border-t ${lineClass}`} />
    </div>
  )
}
