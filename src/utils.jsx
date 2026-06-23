/**
 * Wraps ordinal suffixes (st, nd, rd, th) in <sup> tags.
 * Returns an array of strings/elements suitable for React rendering.
 * e.g. "2nd December" → ["2", <sup>nd</sup>, " December"]
 */
export function ordinal(str) {
  const parts = str.split(/(\d+(?:st|nd|rd|th))/gi)
  return parts.map((part, i) => {
    const m = part.match(/^(\d+)(st|nd|rd|th)$/i)
    if (!m) return part
    return (
      <span key={i}>
        {m[1]}<sup className="text-[0.55em]" style={{ verticalAlign: '0.3em' }}>{m[2]}</sup>
      </span>
    )
  })
}
