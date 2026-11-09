# WE ARE HERE — Creative Marketing Agency

Live: https://ahmedelbehary-dev.github.io/we-are-here-concepts/

This repository now contains one **Bold Statement–based** long-scroll agency website, replacing the five earlier Design Lab concept directions.

## Sections
- Home
- About Us
- Services
- Portfolio — interactive 3D card cascade (4 illustrative concept studies)
- Studio (interactive branded poster)
- Blog / Ideas (upcoming editorial previews)
- Contact Us
- Footer

## Visual direction
The original Bold Statement layout, kinetic typography, marquee, and scroll reveals remain in place. The Portfolio grid is replaced by the user-selected 3D card cascade, keeping its card stacking, forward fold-and-drop, perspective, depth, and smooth interpolation. The cascade is restyled to the Bold black/brown/beige/white palette without changing the other homepage sections. The color palette comes from the We Are Here logo supplied for this project:

| Role | Color |
|---|---|
| Black | `#000000` |
| Dark Brown | `#3A1711` |
| Warm Beige | `#C9AB93` |
| White | `#FFFFFF` |

## Files
- `index.html` — static entry point
- `site.js` — page content and interactive behavior
- `style.css` — original Bold Statement design system (includes legacy CSS)
- `brand.css` — approved palette, new sections, and responsive navigation
- `cascade.css` — Bold-branded 3D portfolio layout and card styling
- `cascade.js` — scoped scroll, drag/swipe, keyboard, and arrow navigation for the card cascade
- `motion-enhancements.js` and `motion-enhancements.css` — Bold motion features
- `.nojekyll` — GitHub Pages support

The old concept directions remain recoverable in the Git branch `archive/design-lab-five-concepts-2026-11-09`.

## Before public launch
The portfolio images are **illustrative concept studies**, not verified client projects. Replace them with approved case studies and real metrics. The Blog section contains upcoming topic previews, not published articles. The contact call-to-action temporarily links to the existing public We Are Here website until an approved lead form, email or booking link is supplied.

## Run locally
No build tooling is required. Open through a static HTTP server, e.g. `npx serve .`, to test the site.

Creative implementation: Ahmed Elbehary · 2026.

## Portfolio cascade behavior

The cascade preserves the supplied 3D folding/freefall interaction, but is embedded into the real homepage rather than forcing page-wide `overflow: hidden`. Use the mouse wheel **while hovering over the deck**, drag with the mouse, swipe horizontally on touch screens, or use the previous/next buttons and arrow keys while the deck is focused. Scrolling normally past the first/last card is intentionally allowed. A reduced-motion setting displays card transitions without animated interpolation.
