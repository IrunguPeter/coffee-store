# Coffee Store redesign plan

## Design options considered

- **Editorial Coffee House / Modern craft** (0.05): warm oat canvas, espresso typography, copper accents, asymmetrical layouts, and tactile product cards.
- **Neo-Kilimanjaro Minimal** (0.07): airy white space, charcoal type, moss green, and quiet editorial product photography.
- **Night Roastery** (0.08): dark roast surfaces, amber highlights, high-contrast type, and a more nocturnal premium feel.

## Chosen direction: Editorial Coffee House / Modern craft

### Design movement
Contemporary editorial commerce with references to independent coffee roasters, printed tasting notes, and Kenyan craft markets.

### Core principles
1. Make the product feel collectible: large imagery, concise tasting language, and confident pricing.
2. Use asymmetry and layered panels instead of generic centered grids.
3. Keep every interaction tactile: rounded controls, visible feedback, and generous touch targets.
4. Let warmth come from material contrast: oat paper, espresso ink, copper foil, and sage labels.

### Color philosophy
Oat and parchment keep the interface approachable; espresso anchors hierarchy and signals quality; copper creates appetite and focus; sage marks origin, trust, and successful actions. The palette should feel like a roastery counter rather than a generic green ecommerce template.

### Layout paradigm
A split editorial hero, horizontal discovery rail, asymmetric feature blocks, and dense but calm shop controls. Product grids remain useful but are framed by stronger section headers and filter surfaces.

### Signature elements
- Copper “roast note” eyebrow labels and numbered section markers.
- Soft paper-grain background with framed product panels.
- Pill-shaped espresso actions paired with square icon controls.

### Interaction philosophy
Hover states should feel like handling a physical package: image lift, shadow increase, copper edge reveal, and clear add-to-bag confirmation. Avoid excessive motion; use short 180–280ms transitions.

### Animation
Use fade/slide-up entry for major sections, subtle image scale on cards, and a gentle cart badge pulse when item count changes. Respect reduced-motion preferences.

### Typography system
Use Fraunces for display headlines and section titles, Plus Jakarta Sans for UI/body, and a compact mono style for labels, origin notes, and order metadata.

### Brand essence
A Kenyan everyday-goods shop for people who care about where things come from and how they feel at home. Personality: grounded, generous, discerning.

### Brand voice
Headlines: direct, sensory, and locally rooted. CTAs: active and welcoming. Example lines: “Good things, roasted close to home.” and “Build a better shelf.”

### Wordmark & logo
A compact “E/” cup-mark in an espresso square, paired with a wide uppercase E-SHOP wordmark and a small “KENYA / 2025” maker line.

### Signature brand color
Copper `#C96B3B`, used sparingly for actions, roast notes, and emphasis.

## Implementation approach

- Replace the global theme tokens and component primitives in `src/index.css` and `tailwind.config.js`.
- Redesign the shell in `Navbar.tsx` and `Layout.tsx` with a utility header, announcement strip, richer footer, and responsive mobile menu.
- Rebuild `Hero.tsx` with the existing local hero asset, editorial copy, category links, and trust metrics.
- Rebuild `ProductCard.tsx` and `ProductGrid.tsx` with stronger product hierarchy, filters, and responsive list/grid presentation.
- Polish product detail, cart drawer, checkout, and admin surfaces through shared tokens and targeted component changes.
- Add `public/manus-routes.json` for the known application routes.

## Project structure

- `src/components/`: storefront shell, homepage, product discovery, detail, cart/checkout, and admin UI.
- `src/context/`: cart and promo state.
- `src/data/` and `src/lib/`: API-backed data access and shared utilities.
- `src/index.css` / `tailwind.config.js`: design tokens and reusable primitives.
- `public/`: static metadata and route manifest.
