# Service Pages Design Spec
**Date:** 2026-03-26
**Status:** Approved

## Overview

Create 3 dedicated service pages for Dhaki Technologies, matching the dark luxury aesthetic of the main site (`index.html`). Update the main site nav and "Our Environments" section to link to the new pages.

---

## New Files

```
/private-living/index.html
/private-workspaces/index.html
/private-digital-security/index.html
```

Each is a self-contained HTML file. No new CSS files — all pages use `../css/style.css` (the shared main site stylesheet).

---

## Page Structure (applied to all 3 pages)

Layout style: **Hybrid narrative + visual anchors** (Option C from brainstorming). Full content narrative with each section visually anchored via icons, numbered steps, or pull-quotes.

### Section order:

1. **Page hero**
   - `<p class="section-label">` — service category (e.g., "Private Living")
   - `<h1>` — headline from the markdown (e.g., "A Home That Thinks For You")
   - Tagline as a styled pull-quote (e.g., *"Technology disappears. Experience remains."*)

2. **Intro** — 2–3 sentence framing paragraph from the markdown ("Your home/office/digital life…")

3. **The Problem** — bullet list rendered as accent cards with a left teal border

4. **The Dhaki Approach** — comparison table (Typical vs Dhaki) using existing table styles

5. **Core Capabilities** — 2-column responsive grid of capability cards, each with:
   - A Font Awesome icon
   - Capability title
   - 1–2 bullet points

6. **The Dhaki Process** — 4 numbered steps (01–04) using the same step-card style as the main site `#process` section

7. **CTA section**
   - Heading: "Let's Design Your [Home / Office / Digital Life]"
   - Sub-text: "No commitment required."
   - Primary button: "Book Consultation" → `https://outlook.office.com/book/consultation@dhaki.ai/` (target="_blank")

---

## Header & Footer

Exact same sticky header and footer markup as `index.html`, with asset paths adjusted for subdirectory depth (`../` prefix on logo image, CSS, JS, and favicon).

The nav includes the new Solutions dropdown (see below).

---

## Nav Dropdown — "Solutions"

Added to the main sticky nav on **all pages** (main site + 3 new service pages).

- **Position:** Between "Philosophy" and "Process" links
- **Trigger:** Hover on desktop; tap-to-expand inline on mobile
- **Label:** "Solutions" with a `▾` chevron
- **Dropdown items** (icon + label + short description):
  | Icon | Label | Description |
  |------|-------|-------------|
  | house icon (FA) | Private Living | Smart home environments |
  | building icon (FA) | Private Workspaces | Intelligent office environments |
  | shield icon (FA) | Private Digital Security | Personal cybersecurity |
- **Dropdown style:** `#0C1322` background, `border-radius: 12px`, teal border, arrow pointer, subtle dividers between items
- **Links:** `private-living/`, `private-workspaces/`, `private-digital-security/` (relative from main site; `../private-living/` etc. from sub-pages)
- **Mobile:** Dropdown items appear inline below the Solutions trigger when the mobile menu is open

### Nav change on main site
The existing `#solutions` anchor link in the nav is **replaced** by the Solutions dropdown. The `#solutions` section (Our Environments) remains on the page — it's just no longer directly linked from the nav.

---

## "Our Environments" Section — index.html

The 3 `.solution-item` anchor elements currently link to the consultation URL. Update each `href`:

| Item | New href |
|------|----------|
| Private Living | `private-living/` |
| Private Workspace | `private-workspaces/` |
| Private Digital Security | `private-digital-security/` |

Remove `target="_blank"` from these items. All other markup (images, overlay, placeholder label, CTA text) stays unchanged.

The CTA text "Book Consultation" on these cards can be updated to "Explore →" or "Learn More →" since they now navigate to content pages rather than a booking form. **Preferred: "Explore →"**

---

## Content Source

Each page's content is drawn directly from the corresponding markdown file:

| Page | Source |
|------|--------|
| `/private-living/` | `private-living.md` |
| `/private-workspaces/` | `private-workspaces.md` |
| `/private-digital-security/` | `private-digital-security.md` |

No content is invented — all copy comes from the markdown files exactly as written.

---

## Analytics & Tracking

Copy the same GTM, GA4, and Google Ads snippets from `index.html` into each new page's `<head>`.

---

## Out of Scope

- No new CSS file — all styling uses existing variables in `css/style.css`
- No new JS file — the existing `js/app.js` handles nav, scroll, and animations; it is referenced as `../js/app.js`
- No hero video or canvas animation on service pages
- No sitemap update in this task
