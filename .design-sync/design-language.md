# Isuri & Sulochana — Wedding Design Language

Use this document as your design brief whenever creating stationery or printed materials for this wedding. Every design should feel like it belongs to the same family as the wedding website.

---

## Wedding details

- **Couple:** Isuri & Sulochana
- **Date:** Wednesday, 2nd December 2026
- **Venue:** The Grand Walawwa, No 190/8, Kandy Road, Kegalle, Sri Lanka
- **Ceremony:** 4:00 PM · Reception: 6:30 PM

---

## Colour palette

| Role | Name | Hex |
|---|---|---|
| Page background | pearl-100 | `#F5F2EA` |
| Card / surface | pearl-50 | `#FDFCF8` |
| Card tint | pearl-200 | `#EDE9DC` |
| Border / line | line | `#D5D9C8` |
| Body text | ink | `#1C2710` |
| Secondary text | muted | `#6B7057` |
| Primary action | olive-700 | `#3A4920` |
| Dark hero bg | olive-800 | `#2B3B18` |
| Deepest dark | olive-900 | `#1C2710` |
| Mid olive | olive-600 | `#4A5C2A` |
| Light olive accent | olive-300 | `#A3B578` |
| Pale olive tint | olive-200 | `#C8D3AC` |
| Warmest highlight | pearl-300 | `#DDD8C8` |
| Earth / warm brown | earth | `#7A5C2A` |

**In practice:** Nearly everything is olive or pearl. Earth brown is a subtle warm accent. Avoid introducing colours outside this palette.

---

## Typography

| Use | Font | Weight | Style notes |
|---|---|---|---|
| Names, headings, titles | Cormorant Garamond | Light (300) | Wide tracking, elegant |
| Body, labels, buttons | Inter | Regular / Medium | Clean, minimal |

### Rules
- Headings: `font-family: 'Cormorant Garamond', Georgia, serif` · font-weight 300 · `letter-spacing: 0.05em`
- Section titles: 40–56px, font-weight 300, centered
- Display names (invitation): 64–96px, font-weight 300, `letter-spacing: 0.04em`
- Labels and small text: `font-family: Inter` · `font-size: 11–12px` · `letter-spacing: 0.35–0.5em` · ALL CAPS
- "and" ampersand between names: olive-300 colour, `letter-spacing: 0.6em`, slightly smaller than the names

---

## Decorative motifs

All motifs use olive-600 (`#4A5C2A`) at low opacity on light backgrounds, or pearl-100 (`#F5F2EA`) at low opacity on dark backgrounds.

### 1. Kandyan textile pattern (background texture)
A repeating 40×40 px diamond grid with a dot at the centre — a Kandyan textile reference.
- On light background: stroke `#4A5C2A`, opacity 0.18
- On dark background: stroke `#F5F2EA`, opacity 0.07
- SVG: `<path d='M20 2 L38 20 L20 38 L2 20 Z'/>` + `<circle cx='20' cy='20' r='2'/>`
- Use as a subtle full-bleed background pattern, never as a focal graphic

### 2. Lotus divider
A hand-drawn lotus flower SVG flanked by two thin horizontal rules — used between sections.
- Flower drawn with radiating petal paths, a stem line, and a small filled centre circle
- Lines: 1px, same colour as the lotus, 30% opacity
- Colour on light bg: olive-400 (`#7A8C4E`) · On dark bg: pearl-300/55

### 3. Floral corner ornament
An L-shaped two-line frame at each corner, with a five-petal flower at the elbow and a small leaf on each arm.
- Used at all four corners of a card or invitation panel
- Rotate 0° / 90° / 180° / 270° for each corner
- Size: 32–48 px · Stroke: 0.6–0.8 px
- Colour: olive-400 on light · pearl-300/40 on dark

### 4. Floral stripe
A wavy vine band with a centred five-petal flower, leaf pairs, and small buds — used as a horizontal divider or top/bottom border.
- Height: ~52 px · Full width
- Repeating pattern unit: 160 px wide
- Vine: single wavy path · Flowers: 5 ellipse petals + filled centre circle
- Works on both light and dark backgrounds

### 5. Countdown / box corners
Tiny diamond accents (1.5×1.5 px squares rotated 45°) pinned to each corner of a bordered box.
- Colour: olive-400
- Used on timekeeping panels, price tags, small framed text blocks

---

## Structural rules

- **No border-radius anywhere.** Every corner is perfectly square — cards, buttons, inputs, panels, tags.
- **Borders:** 1 px, colour `#D5D9C8` (line) on light backgrounds · `rgba(221,216,200,0.20)` on dark
- **Spacing:** generous internal padding — minimum 24 px on cards, 32 px on invitation panels
- **Alignment:** centred compositions for formal pieces (invitations, cake tags); left-aligned for informational pieces (menus, programmes)

---

## Button / label style

- Background: olive-700 (`#3A4920`) · Text: pearl-50 (`#FDFCF8`)
- Font: Inter Medium · Size: 11–12 px · Letter-spacing: 0.25 em · ALL CAPS
- Padding: 12 px top/bottom, 32 px left/right
- No border-radius
- Secondary variant: transparent background, olive-600 border, olive-700 text

---

## Dark panel / hero style

- Background: olive-800 (`#2B3B18`) with the Kandyan light SVG pattern overlaid at 7% opacity
- Vignette gradient: `linear-gradient(to bottom, rgba(28,39,16,0.60) 0%, transparent 50%, rgba(28,39,16,0.80) 100%)`
- Text: pearl-100 (`#F5F2EA`) for headings · pearl-300 at 55% opacity for subtext
- Frosted inset panels: `background: rgba(255,255,255,0.05)` · `backdrop-filter: blur(8px)` · border `rgba(221,216,200,0.20)`

---

## Stationery application guide

### Wedding invitation
- **Outer layer:** dark panel (olive-800 + Kandyan pattern) · floral corner ornaments in all four corners
- **Centre panel:** pearl-50 card with corner ornaments · couple names in large Cormorant Garamond light · lotus divider below the names · date, venue, time in all-caps Inter small text
- **Hierarchy:** "You are cordially invited to the wedding of" (12px Inter all-caps, muted) → Names (display size, serif) → lotus divider → date/venue block

### Cake tags
- Pearl-50 background · square cut corners · thin line border (`#D5D9C8`)
- Floral corner ornament on two opposite corners (top-left and bottom-right, or all four on larger tags)
- Cake name in Cormorant Garamond 20–24 px light · dietary badge below in Inter 10 px all-caps
- Dietary badge colours from the website: Vegetarian = `bg:#F2F5EC border:#C8D3AC text:#4A5C2A` · Gluten Free = `bg:#EDE9DC border:#DDD8C8 text:#6B7057`

### General guidance
- Always include at least one lotus divider or floral stripe to tie the piece to the website
- Use the Kandyan pattern only as a background — never as the main visual
- Keep colour use to three tones maximum per piece: a background (pearl or olive-800), one olive accent, and ink/pearl for text
- Cormorant Garamond carries the elegance — let it be large and light rather than small and bold

---

## Quick-start snippet (for Claude Design)

> Design a [piece name] for Isuri & Sulochana's wedding on 2 December 2026 at The Grand Walawwa, Kegalle, Sri Lanka.
>
> Follow this design language exactly:
> — Colours: pearl-100 (`#F5F2EA`) or olive-800 (`#2B3B18`) background · olive-700 (`#3A4920`) for accents and buttons · ink (`#1C2710`) for text · line (`#D5D9C8`) for borders
> — Fonts: Cormorant Garamond (Light, wide tracking) for headings and names · Inter for all body and label text
> — No border-radius anywhere — all square corners
> — Decorative elements: floral corner ornaments, lotus divider, subtle Kandyan diamond-grid background pattern
> — Tone: elegant, botanical, Sri Lankan / Kandyan wedding aesthetic
