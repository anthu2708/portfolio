# An Phung — Portfolio (React + Tailwind v4)

Tailwind port of the embossed-metal trinket-box portfolio. Design reference: `Portfolio.dc.html` in the parent project.

## Run

```bash
npm install
npm run dev
```

Stack: Vite + React 18 + Tailwind CSS v4 (`@tailwindcss/vite`, no config file — theme tokens live in `@theme` inside `src/index.css`).

## Structure

| File | What it holds |
| --- | --- |
| `src/App.jsx` | Page assembly: tin → About → Projects → Contact / CV → footer |
| `src/components/TrinketBox.jsx` | The tin: lid flip (3D), red lining, draggable objects, taped polaroid |
| `src/components/ProjectCarousel.jsx` | Fixed plaque stage with the looping vertical carousel |
| `src/components/Ransom.jsx` | Cut-out newspaper lettering |
| `src/components/ImageSlot.jsx` | Drop/browse image placeholder (data URL in localStorage) |
| `src/lib/drag.js` | Pointer drag in % of a container; click = drag under 4px |
| `src/lib/ransom.js` | Deterministic letter randomiser (rotation, paper, font, size) |
| `src/data/projects.js` | Project list — append an object to add a card |
| `src/index.css` | Theme tokens + metal/velvet surfaces, scalloped and torn-edge clip paths |

## Why some CSS is not utilities

Hammered metal is a stack of an SVG `feTurbulence` data URI blended over a multi-stop gradient, and the plaque edge is a ~100-point `clip-path`. Those live as semantic classes (`.metal-base`, `.metal-lid`, `.metal-plaque`, `.velvet`, `.engraved`, `.scalloped`, `.receipt-edge`) in `src/index.css`; everything else — layout, spacing, type, shadows, states — is Tailwind utilities.

## Type

- `font-display` → Cinzel (engraved titles, stamped lid)
- `font-body` → Spectral (prose)
- `font-mono` → Courier Prime (catalog numbers, eyebrows, receipt)

Loaded from Google Fonts in `index.html`.

## Behaviour notes

- The tin sizes itself from viewport height (`min(460px, 78vw, calc((100vh - 190px) * 0.8))`) so lid + base stay on screen when open; opening reserves the lid's swing room as real layout (`margin-top`), so nothing overlaps.
- The closed lid hides its inner face (`visibility: hidden`) — `backface-visibility` alone does not hide descendants.
- Object positions persist in `localStorage` (`an-phung-tin-positions-v2`); the polaroid intentionally resets to its taped corner on every open/close.
- Carousel: 5 slots at ±2 steps, slide by one step, then commit the index — that is what makes 1 → 2 → 3 → 1 loop seamlessly.
- Images the user drops are stored as data URLs in `localStorage`; swap `ImageSlot` for your real asset pipeline before shipping.
