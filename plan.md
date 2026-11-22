# E-Shop redesign plan

## Design options considered

- **Editorial Kenyan lifestyle store** (0.05): warm oat canvas, espresso typography, copper accents, asymmetrical layouts, and tactile product cards.
- **Neo-Kilimanjaro Minimal** (0.07): airy white space, charcoal type, moss green, and quiet editorial product photography.
- **Night Market Select** (0.08): dark surfaces, amber highlights, high-contrast type, and a premium discovery feel.

## Chosen direction: Editorial Kenyan lifestyle store

### Design movement
Contemporary editorial commerce inspired by independent Kenyan makers, modern department stores, and printed product catalogues.

### Core principles
1. Make every category feel equally important: coffee and tea can sit beside kitchen, home, wellness, apparel, books, and tech.
2. Use asymmetry and layered panels instead of generic centered layouts.
3. Keep every interaction tactile: rounded controls, visible feedback, and generous touch targets.
4. Let warmth come from material contrast: oat paper, espresso ink, copper foil, and sage labels.

### Color philosophy
Oat and parchment keep the interface approachable; espresso anchors hierarchy and signals quality; copper creates appetite and focus; sage marks origin, trust, and successful actions. The palette should feel like a thoughtful Kenyan lifestyle store, not a single-product catalogue.

### Layout paradigm
A split editorial hero, category discovery rail, asymmetric feature blocks, and dense but calm shop controls. Product grids remain useful but are framed by stronger section headers and filter surfaces.

### Signature elements
- Copper catalog labels and numbered section markers.
- Soft paper-grain background with framed product panels.
- Pill-shaped espresso actions paired with square icon controls.

### Interaction philosophy
Hover states should feel like handling a physical package: image lift, shadow increase, copper edge reveal, and clear add-to-bag confirmation. Avoid excessive motion; use short 180–280ms transitions.

### Typography system
Use Fraunces for display headlines and section titles, Plus Jakarta Sans for UI/body, and a compact mono style for labels, origin notes, and order metadata.

### Brand essence
A Kenyan everyday-goods shop for people who care about what they bring home and how it fits their life. Personality: grounded, generous, discerning.

### Brand voice
Headlines are direct, sensory, and locally rooted. CTAs are active and welcoming. Example lines: “Good things, close to home.” and “Build a better shelf.”

### Wordmark & logo
A compact “E/” mark in an espresso square, paired with a wide uppercase E-SHOP wordmark and a small “KENYA / 2025” maker line.

### Signature brand color
Copper `#C96B3B`, used sparingly for actions, labels, and emphasis.

## Implementation approach

- Use the existing local mark asset as a brand graphic rather than a coffee product image.
- Keep the existing product data/API and cart behavior while replacing coffee-specific copy with category-neutral lifestyle-store language.
- Surface all major product groups in homepage discovery and shared navigation.
- Keep product detail, cart/checkout, and admin pages on the same design tokens.
- Maintain the route manifest for `/`, `/shop`, `/shop/:id`, `/checkout`, and `/admin`.
