# Service Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create 3 service pages (Private Living, Private Workspaces, Private Digital Security) matching the main site's dark luxury aesthetic, and add a Solutions nav dropdown linking to them from all pages.

**Architecture:** Pure HTML/CSS/JS, no build step. New styles go into the shared `css/style.css`. New JS for dropdown toggle goes into `js/app.js`. Each service page lives in its own subfolder and reuses the main stylesheet and script via `../` relative paths. The main `index.html` is updated to add the nav dropdown and point its "Our Environments" cards to the new pages.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS, Font Awesome 6.4.0 (CDN), Google Fonts (Manrope), GitHub Pages static hosting.

---

## Files Modified / Created

| File | Action | Responsibility |
|------|--------|----------------|
| `css/style.css` | Modify | Nav dropdown styles + service page component styles |
| `js/app.js` | Modify | Dropdown mobile toggle JS |
| `index.html` | Modify | Replace `#solutions` nav link with dropdown; update solution item hrefs + CTA text |
| `private-living/index.html` | Create | Private Living service page |
| `private-workspaces/index.html` | Create | Private Workspaces service page |
| `private-digital-security/index.html` | Create | Private Digital Security service page |

---

## Task 1: Add nav dropdown + service page CSS to `css/style.css`

**Files:**
- Modify: `css/style.css` (append to end of file)

- [ ] **Step 1: Verify no dropdown styles exist yet**

Run: `grep -n "nav-dropdown" css/style.css`
Expected: no output (no existing dropdown styles)

- [ ] **Step 2: Append the new CSS block to `css/style.css`**

Append exactly this block to the end of `css/style.css`:

```css
/* === NAV DROPDOWN ========================================= */
.nav-dropdown { position: relative; }

.nav-dropdown-trigger {
  font-family: var(--font-h);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-2);
  padding: 8px 14px;
  border-radius: 6px;
  letter-spacing: 0.01em;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.25s ease;
}

.nav-dropdown-trigger:hover { color: var(--text-1); }

.nav-dropdown-chevron {
  font-size: 0.65rem;
  transition: transform 0.25s ease;
}

.nav-dropdown.open .nav-dropdown-chevron { transform: rotate(180deg); }

.nav-dropdown-menu {
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%) translateY(-8px);
  background: var(--bg-surface);
  border: 1px solid var(--border-mid);
  border-radius: var(--r-md);
  padding: 8px;
  min-width: 244px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
  z-index: 200;
}

.nav-dropdown-menu::before {
  content: '';
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 10px;
  height: 10px;
  background: var(--bg-surface);
  border-left: 1px solid var(--border-mid);
  border-top: 1px solid var(--border-mid);
}

.nav-dropdown:hover .nav-dropdown-menu,
.nav-dropdown.open .nav-dropdown-menu {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}

.nav-dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--r-sm);
  color: var(--text-1);
  transition: background 0.15s ease;
}

.nav-dropdown-item + .nav-dropdown-item {
  border-top: 1px solid var(--border-dim);
  margin-top: 2px;
  padding-top: 12px;
}

.nav-dropdown-item:hover { background: rgba(27, 200, 230, 0.07); }

.nav-dropdown-item-icon {
  width: 34px;
  height: 34px;
  border-radius: var(--r-sm);
  background: linear-gradient(135deg, rgba(33, 209, 195, 0.12), rgba(27, 103, 198, 0.12));
  border: 1px solid var(--border-dim);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--teal);
  font-size: 0.85rem;
}

.nav-dropdown-item-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-dropdown-item-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-1);
}

.nav-dropdown-item-desc {
  font-size: 0.72rem;
  color: var(--text-3);
}

/* === SERVICE PAGES ======================================== */
.service-hero {
  padding: 160px 0 100px;
  text-align: center;
  background: var(--bg-deep);
  border-bottom: 1px solid var(--border-dim);
}

.service-hero h1 {
  font-size: clamp(2.4rem, 5vw, 4rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
}

.service-hero-tagline {
  font-size: 1rem;
  font-style: italic;
  color: var(--teal);
  opacity: 0.85;
}

.problem-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 32px;
}

.problem-card {
  background: var(--bg-card);
  border-left: 3px solid var(--teal);
  border-radius: 0 var(--r-sm) var(--r-sm) 0;
  padding: 14px 20px;
  color: var(--text-2);
  font-size: 0.93rem;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 32px;
  border-radius: var(--r-md);
  overflow: hidden;
  border: 1px solid var(--border-dim);
}

.comparison-table th,
.comparison-table td {
  padding: 14px 20px;
  text-align: left;
  border-bottom: 1px solid var(--border-dim);
  font-size: 0.9rem;
}

.comparison-table tr:last-child td { border-bottom: none; }

.comparison-table th {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--teal);
  background: rgba(33, 209, 195, 0.04);
}

.comparison-table td:first-child { color: var(--text-3); }
.comparison-table td:last-child { color: var(--text-1); }

.capabilities-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 40px;
}

.capability-card {
  background: var(--bg-card);
  border: 1px solid var(--border-dim);
  border-radius: var(--r-md);
  padding: 28px 24px;
  transition: border-color 0.3s ease, transform 0.3s ease;
}

.capability-card:hover {
  border-color: var(--border-mid);
  transform: translateY(-4px);
}

.capability-card-icon {
  font-size: 1.3rem;
  color: var(--teal);
  margin-bottom: 16px;
}

.capability-card h4 {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-1);
  margin-bottom: 12px;
}

.capability-card ul {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.capability-card ul li {
  font-size: 0.85rem;
  color: var(--text-2);
  padding-left: 16px;
  position: relative;
}

.capability-card ul li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 9px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--teal);
  opacity: 0.6;
}

.service-process-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 40px;
}

.service-cta-section {
  text-align: center;
  padding: 100px 0;
  background: var(--bg-deep);
  border-top: 1px solid var(--border-dim);
}

.service-cta-section h2 {
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  font-weight: 300;
  margin-bottom: 12px;
}

.service-cta-section p {
  color: var(--text-3);
  margin-bottom: 40px;
  font-size: 0.9rem;
}

.service-cta-btns {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
}

/* === RESPONSIVE: SERVICE + DROPDOWN ====================== */
@media (max-width: 900px) {
  .capabilities-grid { grid-template-columns: 1fr; }
  .service-process-grid { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .nav-dropdown-trigger {
    width: 100%;
    justify-content: space-between;
    padding: 14px 0;
    border-radius: 0;
    border-bottom: 1px solid var(--border-dim);
    color: var(--text-1);
    font-size: 0.95rem;
  }

  /* In closed mobile menu, hide dropdown menu */
  .nav-dropdown-menu {
    position: static;
    transform: none;
    opacity: 1;
    visibility: hidden;
    max-height: 0;
    overflow: hidden;
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 0;
    min-width: unset;
    transition: max-height 0.3s ease, visibility 0.3s, padding 0.3s;
  }

  .nav-dropdown-menu::before { display: none; }

  .nav-dropdown.open .nav-dropdown-menu {
    visibility: visible;
    max-height: 320px;
    padding: 8px 0;
  }

  /* Override the :hover rule on touch devices — only .open controls mobile */
  .nav-dropdown:hover .nav-dropdown-menu {
    opacity: 1;
    visibility: hidden;
    pointer-events: none;
    transform: none;
  }

  .nav-dropdown.open .nav-dropdown-menu {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .nav-dropdown-item {
    background: var(--bg-card);
    border-radius: var(--r-sm);
    margin-bottom: 4px;
  }

  .nav-dropdown-item + .nav-dropdown-item {
    border-top: none;
    margin-top: 0;
    padding-top: 10px;
  }
}
```

- [ ] **Step 3: Verify CSS was appended**

Run: `grep -c "nav-dropdown" css/style.css`
Expected: a number greater than 0 (e.g., 15+)

- [ ] **Step 4: Commit**

```bash
git add css/style.css
git commit -m "feat: add nav dropdown and service page component CSS"
```

---

## Task 2: Add dropdown mobile toggle to `js/app.js`

**Files:**
- Modify: `js/app.js` (insert inside the `DOMContentLoaded` callback, after the mobile menu toggle block, before the smooth scrolling block)

- [ ] **Step 1: Locate the insertion point**

Open `js/app.js`. Find the line that reads:
```javascript
    // Smooth Scrolling with Offset
```
Insert the new block immediately before that comment.

- [ ] **Step 2: Insert the dropdown JS**

Insert this block before `// Smooth Scrolling with Offset`:

```javascript
    // Nav Dropdown — mobile toggle + close-on-outside-click
    const dropdownTriggers = document.querySelectorAll('.nav-dropdown-trigger');
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', e => {
            e.stopPropagation();
            const dropdown = trigger.closest('.nav-dropdown');
            const isOpen = dropdown.classList.toggle('open');
            trigger.setAttribute('aria-expanded', isOpen);
        });
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('.nav-dropdown')) {
            document.querySelectorAll('.nav-dropdown.open').forEach(d => {
                d.classList.remove('open');
                const t = d.querySelector('.nav-dropdown-trigger');
                if (t) t.setAttribute('aria-expanded', 'false');
            });
        }
    });

```

- [ ] **Step 3: Verify the insertion didn't break the file structure**

Run: `node --check js/app.js`
Expected: no output (valid JS)

- [ ] **Step 4: Commit**

```bash
git add js/app.js
git commit -m "feat: add nav dropdown mobile toggle"
```

---

## Task 3: Update `index.html` — nav dropdown + solution item links

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace the `#solutions` nav `<li>` with the dropdown**

Find this exact block in the `<nav>` (lines ~113-121):
```html
                    <li><a href="#philosophy">Philosophy</a></li>
                    <li><a href="#solutions">Solutions</a></li>
                    <li><a href="#process">Process</a></li>
```

Replace with:
```html
                    <li><a href="#philosophy">Philosophy</a></li>
                    <li class="nav-dropdown">
                        <button class="nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true">
                            Solutions <i class="fas fa-chevron-down nav-dropdown-chevron" aria-hidden="true"></i>
                        </button>
                        <div class="nav-dropdown-menu" role="menu">
                            <a href="private-living/" class="nav-dropdown-item" role="menuitem">
                                <span class="nav-dropdown-item-icon"><i class="fas fa-house" aria-hidden="true"></i></span>
                                <span class="nav-dropdown-item-text">
                                    <span class="nav-dropdown-item-label">Private Living</span>
                                    <span class="nav-dropdown-item-desc">Smart home environments</span>
                                </span>
                            </a>
                            <a href="private-workspaces/" class="nav-dropdown-item" role="menuitem">
                                <span class="nav-dropdown-item-icon"><i class="fas fa-building" aria-hidden="true"></i></span>
                                <span class="nav-dropdown-item-text">
                                    <span class="nav-dropdown-item-label">Private Workspaces</span>
                                    <span class="nav-dropdown-item-desc">Intelligent office environments</span>
                                </span>
                            </a>
                            <a href="private-digital-security/" class="nav-dropdown-item" role="menuitem">
                                <span class="nav-dropdown-item-icon"><i class="fas fa-shield-halved" aria-hidden="true"></i></span>
                                <span class="nav-dropdown-item-text">
                                    <span class="nav-dropdown-item-label">Private Digital Security</span>
                                    <span class="nav-dropdown-item-desc">Personal cybersecurity</span>
                                </span>
                            </a>
                        </div>
                    </li>
                    <li><a href="#process">Process</a></li>
```

- [ ] **Step 2: Update the 3 solution items in the `#solutions` section**

Find and replace each of the 3 `.solution-item` `<a>` tags. Make these exact changes:

**Private Living** — find:
```html
                <a class="solution-item" href="https://outlook.office.com/book/consultation@dhaki.ai/" target="_blank"
                    rel="noopener" aria-label="Book a consultation for Private Living">
```
Replace with:
```html
                <a class="solution-item" href="private-living/"
                    aria-label="Explore Private Living">
```

Also update the CTA span inside that item — find:
```html
                        <span class="solution-placeholder-cta">Book Consultation <i class="fas fa-arrow-right"></i></span>
```
Replace with:
```html
                        <span class="solution-placeholder-cta">Explore <i class="fas fa-arrow-right"></i></span>
```
(This is inside the Private Living item only — do the same for the other two items below.)

**Private Workspace** — find:
```html
                <a class="solution-item" href="https://outlook.office.com/book/consultation@dhaki.ai/" target="_blank"
                    rel="noopener" aria-label="Book a consultation for Private Workspace">
```
Replace with:
```html
                <a class="solution-item" href="private-workspaces/"
                    aria-label="Explore Private Workspaces">
```
Update CTA span to `Explore <i class="fas fa-arrow-right"></i>`.

**Private Digital Security** — find:
```html
                <a class="solution-item" href="https://outlook.office.com/book/consultation@dhaki.ai/" target="_blank"
                    rel="noopener" aria-label="Book a consultation for Private Digital Security">
```
Replace with:
```html
                <a class="solution-item" href="private-digital-security/"
                    aria-label="Explore Private Digital Security">
```
Update CTA span to `Explore <i class="fas fa-arrow-right"></i>`.

- [ ] **Step 3: Open `index.html` in a browser and verify**

Expected:
- Hovering "Solutions" in the nav shows the dropdown with 3 items
- On mobile (resize to ≤768px), tapping "Solutions" expands the list inline
- Clicking a solution card navigates to a 404 (the pages don't exist yet — correct at this stage)
- The card CTA now reads "Explore →" instead of "Book Consultation"

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add Solutions dropdown to nav, link environment cards to service pages"
```

---

## Task 4: Create `private-living/index.html`

**Files:**
- Create: `private-living/index.html`

- [ ] **Step 1: Create the directory**

```bash
mkdir private-living
```

- [ ] **Step 2: Create `private-living/index.html` with the full page**

Write the following complete file to `private-living/index.html`:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Website crafted by Andres Bolivar  https://andresbolivar.me -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Google Tag Manager -->
    <script>(function (w, d, s, l, i) {
            w[l] = w[l] || []; w[l].push({
                'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
            }); var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-5N2V8MJT');</script>
    <!-- End Google Tag Manager -->
    <title>Private Living — Smart Home Environments | Dhaki Technologies</title>

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="../assets/favicon.png">
    <link rel="apple-touch-icon" href="../assets/favicon.png">

    <meta name="description"
        content="Dhaki designs intelligent homes that anticipate your lifestyle and respond automatically. Privacy-first smart home automation in Dubai.">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://dhaki.ai/private-living/">
    <meta property="og:title" content="Private Living — Smart Home Environments | Dhaki Technologies">
    <meta property="og:description" content="Homes that anticipate your lifestyle. Presence-aware automation, privacy-first, tailored to you.">
    <meta property="og:image" content="https://dhaki.ai/assets/LogoText.webp">
    <meta property="og:site_name" content="Dhaki Technologies">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="canonical" href="https://dhaki.ai/private-living/">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="../css/style.css">

    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Google Analytics + Ads -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-EBEY2258N5"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-EBEY2258N5');
        gtag('config', 'AW-17777377788');
    </script>
</head>

<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5N2V8MJT" height="0" width="0"
            style="display:none;visibility:hidden"></iframe></noscript>

    <!-- Header / Navigation -->
    <header class="header">
        <div class="container">
            <div class="logo-container">
                <a href="../">
                    <picture>
                        <source srcset="../assets/LogoText.webp" type="image/webp">
                        <img src="../assets/LogoText.png" alt="Dhaki Logo" class="logo">
                    </picture>
                </a>
            </div>
            <nav class="nav" id="main-nav">
                <ul>
                    <li><a href="../#philosophy">Philosophy</a></li>
                    <li class="nav-dropdown">
                        <button class="nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true">
                            Solutions <i class="fas fa-chevron-down nav-dropdown-chevron" aria-hidden="true"></i>
                        </button>
                        <div class="nav-dropdown-menu" role="menu">
                            <a href="../private-living/" class="nav-dropdown-item" role="menuitem">
                                <span class="nav-dropdown-item-icon"><i class="fas fa-house" aria-hidden="true"></i></span>
                                <span class="nav-dropdown-item-text">
                                    <span class="nav-dropdown-item-label">Private Living</span>
                                    <span class="nav-dropdown-item-desc">Smart home environments</span>
                                </span>
                            </a>
                            <a href="../private-workspaces/" class="nav-dropdown-item" role="menuitem">
                                <span class="nav-dropdown-item-icon"><i class="fas fa-building" aria-hidden="true"></i></span>
                                <span class="nav-dropdown-item-text">
                                    <span class="nav-dropdown-item-label">Private Workspaces</span>
                                    <span class="nav-dropdown-item-desc">Intelligent office environments</span>
                                </span>
                            </a>
                            <a href="../private-digital-security/" class="nav-dropdown-item" role="menuitem">
                                <span class="nav-dropdown-item-icon"><i class="fas fa-shield-halved" aria-hidden="true"></i></span>
                                <span class="nav-dropdown-item-text">
                                    <span class="nav-dropdown-item-label">Private Digital Security</span>
                                    <span class="nav-dropdown-item-desc">Personal cybersecurity</span>
                                </span>
                            </a>
                        </div>
                    </li>
                    <li><a href="../#process">Process</a></li>
                    <li><a href="../#team">Team</a></li>
                    <li><a href="https://outlook.office.com/book/consultation@dhaki.ai/" target="_blank"
                            class="btn-nav">Book Consultation</a></li>
                </ul>
            </nav>
            <button class="mobile-menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false"
                aria-controls="main-nav">
                <i class="fas fa-bars" aria-hidden="true"></i>
            </button>
        </div>
    </header>

    <!-- Page Hero -->
    <section class="service-hero">
        <div class="container">
            <p class="section-label">Private Living</p>
            <h1>A Home That<br><span class="gradient-text">Thinks For You</span></h1>
            <p class="service-hero-tagline">Technology disappears. Experience remains.</p>
        </div>
    </section>

    <!-- Intro + Problem -->
    <section class="section-padding">
        <div class="container">
            <div style="max-width: 720px; margin: 0 auto 60px; text-align: center;">
                <p class="section-label">The Problem</p>
                <h2 class="section-title">Most Homes Require<br>Constant Interaction</h2>
                <p class="section-subtitle">Lights, temperature, and devices need to be adjusted manually. Even "smart homes" today are not truly smart.</p>
            </div>
            <div style="max-width: 640px; margin: 0 auto;">
                <div class="problem-cards">
                    <div class="problem-card">Too many apps and controls</div>
                    <div class="problem-card">Automation that feels rigid or unreliable</div>
                    <div class="problem-card">Devices that don't work together</div>
                    <div class="problem-card">Lack of privacy and control over data</div>
                </div>
            </div>
        </div>
    </section>

    <!-- The Dhaki Approach -->
    <section class="section-padding" style="background: var(--bg-deep); border-top: 1px solid var(--border-dim); border-bottom: 1px solid var(--border-dim);">
        <div class="container">
            <div style="max-width: 720px; margin: 0 auto; text-align: center;">
                <p class="section-label">The Dhaki Approach</p>
                <h2 class="section-title">We Don't Install Gadgets.<br>We Design Environments.</h2>
                <p class="section-subtitle">Intelligent environments built around how you live.</p>
            </div>
            <div style="max-width: 760px; margin: 0 auto;">
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Typical Smart Home</th>
                            <th>Dhaki Smart Home</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>App-controlled</td><td>Fully automated</td></tr>
                        <tr><td>Motion-based</td><td>Presence-aware</td></tr>
                        <tr><td>Generic setup</td><td>Tailored to you</td></tr>
                        <tr><td>Cloud-dependent</td><td>Privacy-first</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <!-- What Your Home Becomes -->
    <section class="section-padding">
        <div class="container">
            <div style="max-width: 720px; margin: 0 auto 60px; text-align: center;">
                <p class="section-label">What Your Home Becomes</p>
                <h2 class="section-title">Effortless Living</h2>
                <p class="section-subtitle">You walk in. Lights adjust. Temperature is already comfortable. Your environment feels right — without doing anything. No switches. No apps. No friction.</p>
            </div>
        </div>
    </section>

    <!-- Core Capabilities -->
    <section class="section-padding" style="padding-top: 0;">
        <div class="container">
            <div style="max-width: 720px; margin: 0 auto 16px; text-align: center;">
                <p class="section-label">Core Capabilities</p>
                <h2 class="section-title">What We Build Into Your Home</h2>
            </div>
            <div class="capabilities-grid">
                <div class="capability-card">
                    <div class="capability-card-icon"><i class="fas fa-lightbulb" aria-hidden="true"></i></div>
                    <h4>Intelligent Lighting</h4>
                    <ul>
                        <li>Presence-aware — no unnecessary on/off</li>
                        <li>Adaptive brightness and color temperature</li>
                        <li>Scene-based environments: relax, focus, night</li>
                    </ul>
                </div>
                <div class="capability-card">
                    <div class="capability-card-icon"><i class="fas fa-temperature-half" aria-hidden="true"></i></div>
                    <h4>Climate Control</h4>
                    <ul>
                        <li>Automatic temperature adjustment</li>
                        <li>Room-based zone control</li>
                        <li>Comfort without waste</li>
                    </ul>
                </div>
                <div class="capability-card">
                    <div class="capability-card-icon"><i class="fas fa-wifi" aria-hidden="true"></i></div>
                    <h4>Presence Intelligence</h4>
                    <ul>
                        <li>Detects real presence, not just movement</li>
                        <li>Enables natural, seamless automation</li>
                    </ul>
                </div>
                <div class="capability-card">
                    <div class="capability-card-icon"><i class="fas fa-shield-halved" aria-hidden="true"></i></div>
                    <h4>Security &amp; Awareness</h4>
                    <ul>
                        <li>Smart monitoring of activity</li>
                        <li>Alerts for unusual behavior</li>
                        <li>Integration with digital security if needed</li>
                    </ul>
                </div>
                <div class="capability-card">
                    <div class="capability-card-icon"><i class="fas fa-bolt" aria-hidden="true"></i></div>
                    <h4>Energy Optimization</h4>
                    <ul>
                        <li>Reduce unnecessary consumption</li>
                        <li>Smart control of idle systems</li>
                    </ul>
                </div>
                <div class="capability-card">
                    <div class="capability-card-icon"><i class="fas fa-sliders" aria-hidden="true"></i></div>
                    <h4>Seamless Control <span style="font-weight:300; color: var(--text-3);">(Optional)</span></h4>
                    <ul>
                        <li>Apple, Google, Alexa support</li>
                        <li>Wall controls and mobile access when needed</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Privacy & Control -->
    <section class="section-padding" style="background: var(--bg-deep); border-top: 1px solid var(--border-dim); border-bottom: 1px solid var(--border-dim);">
        <div class="container">
            <div style="max-width: 640px; margin: 0 auto; text-align: center;">
                <p class="section-label">Privacy &amp; Control</p>
                <h2 class="section-title">Your Home Should Be Yours</h2>
                <div class="problem-cards" style="text-align: left; margin-top: 40px;">
                    <div class="problem-card">Local-first systems</div>
                    <div class="problem-card">Minimal reliance on cloud services</div>
                    <div class="problem-card">Full control over your data</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Process -->
    <section class="section-padding">
        <div class="container">
            <div style="max-width: 720px; margin: 0 auto 16px; text-align: center;">
                <p class="section-label">The Dhaki Process</p>
                <h2 class="section-title">Designed Around Your Lifestyle</h2>
                <p class="section-subtitle">Every home is different. This is not a template. It is a tailored experience.</p>
            </div>
            <div class="service-process-grid">
                <div class="step-card">
                    <div class="step-number">01</div>
                    <h3>Understand</h3>
                    <p>We learn how you live — your routines, preferences, and environment.</p>
                </div>
                <div class="step-card">
                    <div class="step-number">02</div>
                    <h3>Design</h3>
                    <p>We create an intelligent system tailored around your lifestyle.</p>
                </div>
                <div class="step-card">
                    <div class="step-number">03</div>
                    <h3>Implement</h3>
                    <p>We install and configure everything with precision and care.</p>
                </div>
                <div class="step-card">
                    <div class="step-number">04</div>
                    <h3>Refine</h3>
                    <p>We optimize based on real use — until your home feels truly effortless.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="service-cta-section">
        <div class="container">
            <p class="section-label" style="justify-content: center;">Let's Begin</p>
            <h2>Let's Design Your Home</h2>
            <p>We analyze your space and design a system tailored to you.<br>No commitment required.</p>
            <div class="service-cta-btns">
                <a href="https://outlook.office.com/book/consultation@dhaki.ai/" target="_blank"
                    class="btn-primary">Book a Private Consultation</a>
                <a href="https://wa.me/971504619202" target="_blank" class="btn-outline-primary">
                    <i class="fab fa-whatsapp"></i> Chat on WhatsApp
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer id="contact" class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-info">
                    <picture>
                        <source srcset="../assets/LogoText.webp" type="image/webp">
                        <img src="../assets/LogoText.png" alt="Dhaki" class="footer-logo" loading="lazy">
                    </picture>
                    <p>Intelligent automation and private digital security for those who expect more from their environments.</p>
                </div>
                <div class="footer-contact">
                    <h3>Contact</h3>
                    <ul>
                        <li><i class="fas fa-map-marker-alt"></i> Dubai, United Arab Emirates</li>
                        <li><i class="fas fa-phone"></i> <a href="tel:+971504619202">+971 50 461 9202</a></li>
                        <li><i class="fas fa-envelope"></i> <a href="mailto:solutions@dhaki.ai">solutions@dhaki.ai</a></li>
                    </ul>
                </div>
                <div class="footer-social">
                    <h3>Follow</h3>
                    <div class="social-links">
                        <a href="https://instagram.com/dhaki.ai" target="_blank" aria-label="Instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="https://linkedin.com/company/dhakiai" target="_blank" aria-label="LinkedIn">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a href="https://wa.me/971504619202" target="_blank" aria-label="WhatsApp">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                    </div>
                    <a href="https://outlook.office.com/book/consultation@dhaki.ai/" target="_blank"
                        class="btn-primary" style="font-size: 0.82rem; padding: 10px 22px;">
                        Book a Consultation
                    </a>
                </div>
            </div>
            <div class="footer-bottom">
                <span>© 2025 Dhaki Technologies. All rights reserved.</span>
                <span>Bespoke environments. Designed with discretion.</span>
            </div>
        </div>
    </footer>

    <!-- Floating WhatsApp -->
    <a href="https://wa.me/971504619202" class="whatsapp-float" target="_blank" aria-label="Chat on WhatsApp">
        <i class="fab fa-whatsapp"></i>
    </a>

    <script src="../js/app.js"></script>
</body>

</html>
```

- [ ] **Step 3: Open `private-living/index.html` in a browser and verify**

Expected:
- Page loads with the dark luxury theme
- Sticky header shows with "Solutions" dropdown (hover to verify)
- Logo links back to `../` (home)
- All sections present: hero, problem cards, comparison table, 6 capability cards, process steps, CTA
- "Book a Private Consultation" button links to the consultation URL
- Footer renders correctly with Dhaki logo

- [ ] **Step 4: Commit**

```bash
git add private-living/
git commit -m "feat: add Private Living service page"
```

---

## Task 5: Create `private-workspaces/index.html`

**Files:**
- Create: `private-workspaces/index.html`

- [ ] **Step 1: Create the directory**

```bash
mkdir private-workspaces
```

- [ ] **Step 2: Create `private-workspaces/index.html`**

Write the following complete file to `private-workspaces/index.html`:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Website crafted by Andres Bolivar  https://andresbolivar.me -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Google Tag Manager -->
    <script>(function (w, d, s, l, i) {
            w[l] = w[l] || []; w[l].push({
                'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
            }); var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-5N2V8MJT');</script>
    <!-- End Google Tag Manager -->
    <title>Private Workspaces — Intelligent Office Environments | Dhaki Technologies</title>

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="../assets/favicon.png">
    <link rel="apple-touch-icon" href="../assets/favicon.png">

    <meta name="description"
        content="Dhaki transforms offices into intelligent environments that adapt to your team, optimize energy, and remove daily friction. Smart office automation in Dubai.">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://dhaki.ai/private-workspaces/">
    <meta property="og:title" content="Private Workspaces — Intelligent Office Environments | Dhaki Technologies">
    <meta property="og:description" content="Offices that adapt automatically to your team. No apps. No buttons. No interruptions.">
    <meta property="og:image" content="https://dhaki.ai/assets/LogoText.webp">
    <meta property="og:site_name" content="Dhaki Technologies">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="canonical" href="https://dhaki.ai/private-workspaces/">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="../css/style.css">

    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Google Analytics + Ads -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-EBEY2258N5"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-EBEY2258N5');
        gtag('config', 'AW-17777377788');
    </script>
</head>

<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5N2V8MJT" height="0" width="0"
            style="display:none;visibility:hidden"></iframe></noscript>

    <!-- Header / Navigation -->
    <header class="header">
        <div class="container">
            <div class="logo-container">
                <a href="../">
                    <picture>
                        <source srcset="../assets/LogoText.webp" type="image/webp">
                        <img src="../assets/LogoText.png" alt="Dhaki Logo" class="logo">
                    </picture>
                </a>
            </div>
            <nav class="nav" id="main-nav">
                <ul>
                    <li><a href="../#philosophy">Philosophy</a></li>
                    <li class="nav-dropdown">
                        <button class="nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true">
                            Solutions <i class="fas fa-chevron-down nav-dropdown-chevron" aria-hidden="true"></i>
                        </button>
                        <div class="nav-dropdown-menu" role="menu">
                            <a href="../private-living/" class="nav-dropdown-item" role="menuitem">
                                <span class="nav-dropdown-item-icon"><i class="fas fa-house" aria-hidden="true"></i></span>
                                <span class="nav-dropdown-item-text">
                                    <span class="nav-dropdown-item-label">Private Living</span>
                                    <span class="nav-dropdown-item-desc">Smart home environments</span>
                                </span>
                            </a>
                            <a href="../private-workspaces/" class="nav-dropdown-item" role="menuitem">
                                <span class="nav-dropdown-item-icon"><i class="fas fa-building" aria-hidden="true"></i></span>
                                <span class="nav-dropdown-item-text">
                                    <span class="nav-dropdown-item-label">Private Workspaces</span>
                                    <span class="nav-dropdown-item-desc">Intelligent office environments</span>
                                </span>
                            </a>
                            <a href="../private-digital-security/" class="nav-dropdown-item" role="menuitem">
                                <span class="nav-dropdown-item-icon"><i class="fas fa-shield-halved" aria-hidden="true"></i></span>
                                <span class="nav-dropdown-item-text">
                                    <span class="nav-dropdown-item-label">Private Digital Security</span>
                                    <span class="nav-dropdown-item-desc">Personal cybersecurity</span>
                                </span>
                            </a>
                        </div>
                    </li>
                    <li><a href="../#process">Process</a></li>
                    <li><a href="../#team">Team</a></li>
                    <li><a href="https://outlook.office.com/book/consultation@dhaki.ai/" target="_blank"
                            class="btn-nav">Book Consultation</a></li>
                </ul>
            </nav>
            <button class="mobile-menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false"
                aria-controls="main-nav">
                <i class="fas fa-bars" aria-hidden="true"></i>
            </button>
        </div>
    </header>

    <!-- Page Hero -->
    <section class="service-hero">
        <div class="container">
            <p class="section-label">Private Workspaces</p>
            <h1>Your Office Should<br><span class="gradient-text">Think For You</span></h1>
            <p class="service-hero-tagline">No apps. No buttons. No interruptions.</p>
        </div>
    </section>

    <!-- Problem -->
    <section class="section-padding">
        <div class="container">
            <div style="max-width: 720px; margin: 0 auto 60px; text-align: center;">
                <p class="section-label">The Problem</p>
                <h2 class="section-title">Most Offices Are Inefficient<br>Without Realising It</h2>
                <p class="section-subtitle">Daily friction compounds silently. Systems that don't communicate create waste, lost time, and broken focus.</p>
            </div>
            <div style="max-width: 640px; margin: 0 auto;">
                <div class="problem-cards">
                    <div class="problem-card">Lights and AC run unnecessarily</div>
                    <div class="problem-card">Workspaces require constant manual adjustment</div>
                    <div class="problem-card">Meeting rooms waste time and break flow</div>
                    <div class="problem-card">Systems don't communicate with each other</div>
                </div>
            </div>
        </div>
    </section>

    <!-- The Shift -->
    <section class="section-padding" style="background: var(--bg-deep); border-top: 1px solid var(--border-dim); border-bottom: 1px solid var(--border-dim);">
        <div class="container">
            <div style="max-width: 720px; margin: 0 auto; text-align: center;">
                <p class="section-label">The Dhaki Approach</p>
                <h2 class="section-title">From Reactive Spaces to<br>Intelligent Environments</h2>
                <p class="section-subtitle">Dhaki transforms offices from spaces that react to spaces that anticipate.</p>
            </div>
        </div>
    </section>

    <!-- What Changes -->
    <section class="section-padding">
        <div class="container">
            <div style="max-width: 720px; margin: 0 auto 60px; text-align: center;">
                <p class="section-label">What Changes</p>
                <h2 class="section-title">When Your Team Arrives,<br>Everything Is Ready</h2>
                <p class="section-subtitle">When a meeting starts, the room prepares itself. Lights, screens, and environment align automatically.</p>
            </div>
        </div>
    </section>

    <!-- What We Deliver -->
    <section class="section-padding" style="padding-top: 0;">
        <div class="container">
            <div style="max-width: 720px; margin: 0 auto 16px; text-align: center;">
                <p class="section-label">What We Deliver</p>
                <h2 class="section-title">Capabilities Built Into Your Office</h2>
            </div>
            <div class="capabilities-grid">
                <div class="capability-card">
                    <div class="capability-card-icon"><i class="fas fa-lightbulb" aria-hidden="true"></i></div>
                    <h4>Intelligent Lighting</h4>
                    <ul>
                        <li>Presence-aware — on only when needed</li>
                        <li>Adaptive brightness for focus and comfort</li>
                    </ul>
                </div>
                <div class="capability-card">
                    <div class="capability-card-icon"><i class="fas fa-temperature-half" aria-hidden="true"></i></div>
                    <h4>Climate Automation</h4>
                    <ul>
                        <li>Zone-based temperature control</li>
                        <li>Efficient, occupancy-driven adjustment</li>
                    </ul>
                </div>
                <div class="capability-card">
                    <div class="capability-card-icon"><i class="fas fa-door-open" aria-hidden="true"></i></div>
                    <h4>Meeting Room Automation</h4>
                    <ul>
                        <li>Instant, automatic room setup</li>
                        <li>Lights, screens, environment aligned on entry</li>
                    </ul>
                </div>
                <div class="capability-card">
                    <div class="capability-card-icon"><i class="fas fa-wifi" aria-hidden="true"></i></div>
                    <h4>Presence Intelligence</h4>
                    <ul>
                        <li>Real occupancy detection — not just motion</li>
                        <li>Enables natural, uninterrupted automation</li>
                    </ul>
                </div>
                <div class="capability-card">
                    <div class="capability-card-icon"><i class="fas fa-bolt" aria-hidden="true"></i></div>
                    <h4>Energy Optimization</h4>
                    <ul>
                        <li>Reduced consumption without manual effort</li>
                        <li>Smart control of idle systems</li>
                    </ul>
                </div>
                <div class="capability-card">
                    <div class="capability-card-icon"><i class="fas fa-lock" aria-hidden="true"></i></div>
                    <h4>Secure, Private Infrastructure</h4>
                    <ul>
                        <li>Local-first, professional-grade architecture</li>
                        <li>Designed for daily, uninterrupted use</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Process -->
    <section class="section-padding" style="background: var(--bg-deep); border-top: 1px solid var(--border-dim); border-bottom: 1px solid var(--border-dim);">
        <div class="container">
            <div style="max-width: 720px; margin: 0 auto 16px; text-align: center;">
                <p class="section-label">The Dhaki Process</p>
                <h2 class="section-title">Built for Your Team,<br>Your Space, Your Work</h2>
                <p class="section-subtitle">We analyze your space, identify inefficiencies, and design a system tailored to how your team works.</p>
            </div>
            <div class="service-process-grid">
                <div class="step-card">
                    <div class="step-number">01</div>
                    <h3>Understand</h3>
                    <p>We learn how your team works — routines, space usage, and pain points.</p>
                </div>
                <div class="step-card">
                    <div class="step-number">02</div>
                    <h3>Design</h3>
                    <p>We create an intelligent office system tailored to your environment.</p>
                </div>
                <div class="step-card">
                    <div class="step-number">03</div>
                    <h3>Implement</h3>
                    <p>We install and configure everything with minimal disruption.</p>
                </div>
                <div class="step-card">
                    <div class="step-number">04</div>
                    <h3>Refine</h3>
                    <p>We optimize based on real team usage until everything runs without friction.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="service-cta-section">
        <div class="container">
            <p class="section-label" style="justify-content: center;">Let's Begin</p>
            <h2>Let's Design Your Office</h2>
            <p>We analyze your space, identify inefficiencies, and design a system tailored to how your team works.<br>No commitment required.</p>
            <div class="service-cta-btns">
                <a href="https://outlook.office.com/book/consultation@dhaki.ai/" target="_blank"
                    class="btn-primary">Book a Private Consultation</a>
                <a href="https://wa.me/971504619202" target="_blank" class="btn-outline-primary">
                    <i class="fab fa-whatsapp"></i> Chat on WhatsApp
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer id="contact" class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-info">
                    <picture>
                        <source srcset="../assets/LogoText.webp" type="image/webp">
                        <img src="../assets/LogoText.png" alt="Dhaki" class="footer-logo" loading="lazy">
                    </picture>
                    <p>Intelligent automation and private digital security for those who expect more from their environments.</p>
                </div>
                <div class="footer-contact">
                    <h3>Contact</h3>
                    <ul>
                        <li><i class="fas fa-map-marker-alt"></i> Dubai, United Arab Emirates</li>
                        <li><i class="fas fa-phone"></i> <a href="tel:+971504619202">+971 50 461 9202</a></li>
                        <li><i class="fas fa-envelope"></i> <a href="mailto:solutions@dhaki.ai">solutions@dhaki.ai</a></li>
                    </ul>
                </div>
                <div class="footer-social">
                    <h3>Follow</h3>
                    <div class="social-links">
                        <a href="https://instagram.com/dhaki.ai" target="_blank" aria-label="Instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="https://linkedin.com/company/dhakiai" target="_blank" aria-label="LinkedIn">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a href="https://wa.me/971504619202" target="_blank" aria-label="WhatsApp">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                    </div>
                    <a href="https://outlook.office.com/book/consultation@dhaki.ai/" target="_blank"
                        class="btn-primary" style="font-size: 0.82rem; padding: 10px 22px;">
                        Book a Consultation
                    </a>
                </div>
            </div>
            <div class="footer-bottom">
                <span>© 2025 Dhaki Technologies. All rights reserved.</span>
                <span>Bespoke environments. Designed with discretion.</span>
            </div>
        </div>
    </footer>

    <!-- Floating WhatsApp -->
    <a href="https://wa.me/971504619202" class="whatsapp-float" target="_blank" aria-label="Chat on WhatsApp">
        <i class="fab fa-whatsapp"></i>
    </a>

    <script src="../js/app.js"></script>
</body>

</html>
```

- [ ] **Step 3: Open `private-workspaces/index.html` in a browser and verify**

Expected:
- Page loads with dark theme, sticky nav, all sections present
- Hero reads "Your Office Should Think For You"
- 6 capability cards visible
- 4 process step cards visible
- CTA reads "Let's Design Your Office"

- [ ] **Step 4: Commit**

```bash
git add private-workspaces/
git commit -m "feat: add Private Workspaces service page"
```

---

## Task 6: Create `private-digital-security/index.html`

**Files:**
- Create: `private-digital-security/index.html`

- [ ] **Step 1: Create the directory**

```bash
mkdir private-digital-security
```

- [ ] **Step 2: Create `private-digital-security/index.html`**

Write the following complete file to `private-digital-security/index.html`:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Website crafted by Andres Bolivar  https://andresbolivar.me -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Google Tag Manager -->
    <script>(function (w, d, s, l, i) {
            w[l] = w[l] || []; w[l].push({
                'gtm.start':
                    new Date().getTime(), event: 'gtm.js'
            }); var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                    'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-5N2V8MJT');</script>
    <!-- End Google Tag Manager -->
    <title>Private Digital Security — Personal Cybersecurity | Dhaki Technologies</title>

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="../assets/favicon.png">
    <link rel="apple-touch-icon" href="../assets/favicon.png">

    <meta name="description"
        content="Dhaki designs private digital environments for high-net-worth individuals. Device hardening, secure networks, digital exposure analysis and continuous protection in Dubai.">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://dhaki.ai/private-digital-security/">
    <meta property="og:title" content="Private Digital Security — Personal Cybersecurity | Dhaki Technologies">
    <meta property="og:description" content="Your devices are secure. Your network is controlled. Your exposure is minimized. Security becomes invisible.">
    <meta property="og:image" content="https://dhaki.ai/assets/LogoText.webp">
    <meta property="og:site_name" content="Dhaki Technologies">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="canonical" href="https://dhaki.ai/private-digital-security/">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="../css/style.css">

    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Google Analytics + Ads -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-EBEY2258N5"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-EBEY2258N5');
        gtag('config', 'AW-17777377788');
    </script>
</head>

<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5N2V8MJT" height="0" width="0"
            style="display:none;visibility:hidden"></iframe></noscript>

    <!-- Header / Navigation -->
    <header class="header">
        <div class="container">
            <div class="logo-container">
                <a href="../">
                    <picture>
                        <source srcset="../assets/LogoText.webp" type="image/webp">
                        <img src="../assets/LogoText.png" alt="Dhaki Logo" class="logo">
                    </picture>
                </a>
            </div>
            <nav class="nav" id="main-nav">
                <ul>
                    <li><a href="../#philosophy">Philosophy</a></li>
                    <li class="nav-dropdown">
                        <button class="nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true">
                            Solutions <i class="fas fa-chevron-down nav-dropdown-chevron" aria-hidden="true"></i>
                        </button>
                        <div class="nav-dropdown-menu" role="menu">
                            <a href="../private-living/" class="nav-dropdown-item" role="menuitem">
                                <span class="nav-dropdown-item-icon"><i class="fas fa-house" aria-hidden="true"></i></span>
                                <span class="nav-dropdown-item-text">
                                    <span class="nav-dropdown-item-label">Private Living</span>
                                    <span class="nav-dropdown-item-desc">Smart home environments</span>
                                </span>
                            </a>
                            <a href="../private-workspaces/" class="nav-dropdown-item" role="menuitem">
                                <span class="nav-dropdown-item-icon"><i class="fas fa-building" aria-hidden="true"></i></span>
                                <span class="nav-dropdown-item-text">
                                    <span class="nav-dropdown-item-label">Private Workspaces</span>
                                    <span class="nav-dropdown-item-desc">Intelligent office environments</span>
                                </span>
                            </a>
                            <a href="../private-digital-security/" class="nav-dropdown-item" role="menuitem">
                                <span class="nav-dropdown-item-icon"><i class="fas fa-shield-halved" aria-hidden="true"></i></span>
                                <span class="nav-dropdown-item-text">
                                    <span class="nav-dropdown-item-label">Private Digital Security</span>
                                    <span class="nav-dropdown-item-desc">Personal cybersecurity</span>
                                </span>
                            </a>
                        </div>
                    </li>
                    <li><a href="../#process">Process</a></li>
                    <li><a href="../#team">Team</a></li>
                    <li><a href="https://outlook.office.com/book/consultation@dhaki.ai/" target="_blank"
                            class="btn-nav">Book Consultation</a></li>
                </ul>
            </nav>
            <button class="mobile-menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false"
                aria-controls="main-nav">
                <i class="fas fa-bars" aria-hidden="true"></i>
            </button>
        </div>
    </header>

    <!-- Page Hero -->
    <section class="service-hero">
        <div class="container">
            <p class="section-label">Private Digital Security</p>
            <h1>Protecting Your Digital Life,<br><span class="gradient-text">Quietly and Completely</span></h1>
            <p class="service-hero-tagline">Security becomes invisible.</p>
        </div>
    </section>

    <!-- Problem -->
    <section class="section-padding">
        <div class="container">
            <div style="max-width: 720px; margin: 0 auto 60px; text-align: center;">
                <p class="section-label">Your Digital Life Is Exposed</p>
                <h2 class="section-title">Traditional Cybersecurity<br>Was Built for Companies</h2>
                <p class="section-subtitle">It does not address personal exposure, family security, device-level vulnerabilities, or lifestyle-based risks. High-value individuals remain exposed without realising it.</p>
            </div>
            <div style="max-width: 640px; margin: 0 auto;">
                <div class="problem-cards">
                    <div class="problem-card">Phones contain sensitive conversations and data</div>
                    <div class="problem-card">Home networks connect dozens of vulnerable devices</div>
                    <div class="problem-card">Personal information is scattered across services</div>
                    <div class="problem-card">Attackers increasingly target individuals, not just companies</div>
                </div>
            </div>
        </div>
    </section>

    <!-- The Dhaki Approach -->
    <section class="section-padding" style="background: var(--bg-deep); border-top: 1px solid var(--border-dim); border-bottom: 1px solid var(--border-dim);">
        <div class="container">
            <div style="max-width: 720px; margin: 0 auto; text-align: center;">
                <p class="section-label">The Dhaki Approach</p>
                <h2 class="section-title">We Design Private<br>Digital Environments</h2>
                <p class="section-subtitle">Tailored to your life — not a generic corporate security checklist.</p>
            </div>
            <div style="max-width: 760px; margin: 0 auto;">
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Traditional Cybersecurity</th>
                            <th>Dhaki Private Digital Security</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Company-focused</td><td>Individual-focused</td></tr>
                        <tr><td>Reactive</td><td>Preventive</td></tr>
                        <tr><td>Technical tools</td><td>Lifestyle-integrated</td></tr>
                        <tr><td>One-time audits</td><td>Continuous protection</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <!-- What We Protect -->
    <section class="section-padding">
        <div class="container">
            <div style="max-width: 720px; margin: 0 auto 16px; text-align: center;">
                <p class="section-label">What We Protect</p>
                <h2 class="section-title">Core Capabilities</h2>
            </div>
            <div class="capabilities-grid">
                <div class="capability-card">
                    <div class="capability-card-icon"><i class="fas fa-magnifying-glass" aria-hidden="true"></i></div>
                    <h4>Digital Exposure Analysis</h4>
                    <ul>
                        <li>Identify where your data is exposed</li>
                        <li>Map your full digital footprint</li>
                    </ul>
                </div>
                <div class="capability-card">
                    <div class="capability-card-icon"><i class="fas fa-mobile-screen-button" aria-hidden="true"></i></div>
                    <h4>Device Hardening</h4>
                    <ul>
                        <li>Secure configuration of phones and computers</li>
                        <li>Removal of vulnerabilities</li>
                    </ul>
                </div>
                <div class="capability-card">
                    <div class="capability-card-icon"><i class="fas fa-network-wired" aria-hidden="true"></i></div>
                    <h4>Secure Network Design</h4>
                    <ul>
                        <li>Protected home and office networks</li>
                        <li>Segmentation and access control</li>
                    </ul>
                </div>
                <div class="capability-card">
                    <div class="capability-card-icon"><i class="fas fa-eye-slash" aria-hidden="true"></i></div>
                    <h4>Privacy Architecture</h4>
                    <ul>
                        <li>Minimize data leakage</li>
                        <li>Reduce unnecessary tracking</li>
                    </ul>
                </div>
                <div class="capability-card">
                    <div class="capability-card-icon"><i class="fas fa-triangle-exclamation" aria-hidden="true"></i></div>
                    <h4>Threat Awareness</h4>
                    <ul>
                        <li>Identify risks before they become incidents</li>
                        <li>Continuous monitoring (optional)</li>
                    </ul>
                </div>
                <div class="capability-card">
                    <div class="capability-card-icon"><i class="fas fa-users" aria-hidden="true"></i></div>
                    <h4>Family Protection</h4>
                    <ul>
                        <li>Secure usage protocols for all members</li>
                        <li>Protection across shared environments</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Built for Discretion -->
    <section class="section-padding" style="background: var(--bg-deep); border-top: 1px solid var(--border-dim); border-bottom: 1px solid var(--border-dim);">
        <div class="container">
            <div style="max-width: 640px; margin: 0 auto; text-align: center;">
                <p class="section-label">Built for Discretion</p>
                <h2 class="section-title">You Don't See It.<br>You Don't Manage It.</h2>
                <p class="section-subtitle" style="margin-bottom: 40px;">Your devices are secure. Your network is controlled. Your exposure is minimized. Security becomes invisible.</p>
                <div class="problem-cards" style="text-align: left;">
                    <div class="problem-card">Absolute confidentiality</div>
                    <div class="problem-card">Minimal visibility — discreet by design</div>
                    <div class="problem-card">No unnecessary data collection</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Process -->
    <section class="section-padding">
        <div class="container">
            <div style="max-width: 720px; margin: 0 auto 16px; text-align: center;">
                <p class="section-label">The Dhaki Process</p>
                <h2 class="section-title">A Considered,<br>Personal Approach</h2>
                <p class="section-subtitle">Digital risk is personal. A breach does not just affect data — it affects privacy, reputation, and safety.</p>
            </div>
            <div class="service-process-grid">
                <div class="step-card">
                    <div class="step-number">01</div>
                    <h3>Assessment</h3>
                    <p>We analyze your digital exposure and identify personal risk vectors.</p>
                </div>
                <div class="step-card">
                    <div class="step-number">02</div>
                    <h3>Design</h3>
                    <p>We build a tailored protection strategy around your lifestyle.</p>
                </div>
                <div class="step-card">
                    <div class="step-number">03</div>
                    <h3>Implementation</h3>
                    <p>We secure your devices, network, and digital environment.</p>
                </div>
                <div class="step-card">
                    <div class="step-number">04</div>
                    <h3>Ongoing Protection</h3>
                    <p>We monitor and adapt as risks evolve — continuously.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="service-cta-section">
        <div class="container">
            <p class="section-label" style="justify-content: center;">Let's Begin</p>
            <h2>Let's Secure Your Digital Life</h2>
            <p>We assess your current exposure and design a private, secure environment tailored to you.<br>No commitment required.</p>
            <div class="service-cta-btns">
                <a href="https://outlook.office.com/book/consultation@dhaki.ai/" target="_blank"
                    class="btn-primary">Book a Private Consultation</a>
                <a href="https://wa.me/971504619202" target="_blank" class="btn-outline-primary">
                    <i class="fab fa-whatsapp"></i> Chat on WhatsApp
                </a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer id="contact" class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-info">
                    <picture>
                        <source srcset="../assets/LogoText.webp" type="image/webp">
                        <img src="../assets/LogoText.png" alt="Dhaki" class="footer-logo" loading="lazy">
                    </picture>
                    <p>Intelligent automation and private digital security for those who expect more from their environments.</p>
                </div>
                <div class="footer-contact">
                    <h3>Contact</h3>
                    <ul>
                        <li><i class="fas fa-map-marker-alt"></i> Dubai, United Arab Emirates</li>
                        <li><i class="fas fa-phone"></i> <a href="tel:+971504619202">+971 50 461 9202</a></li>
                        <li><i class="fas fa-envelope"></i> <a href="mailto:solutions@dhaki.ai">solutions@dhaki.ai</a></li>
                    </ul>
                </div>
                <div class="footer-social">
                    <h3>Follow</h3>
                    <div class="social-links">
                        <a href="https://instagram.com/dhaki.ai" target="_blank" aria-label="Instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="https://linkedin.com/company/dhakiai" target="_blank" aria-label="LinkedIn">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a href="https://wa.me/971504619202" target="_blank" aria-label="WhatsApp">
                            <i class="fab fa-whatsapp"></i>
                        </a>
                    </div>
                    <a href="https://outlook.office.com/book/consultation@dhaki.ai/" target="_blank"
                        class="btn-primary" style="font-size: 0.82rem; padding: 10px 22px;">
                        Book a Consultation
                    </a>
                </div>
            </div>
            <div class="footer-bottom">
                <span>© 2025 Dhaki Technologies. All rights reserved.</span>
                <span>Bespoke environments. Designed with discretion.</span>
            </div>
        </div>
    </footer>

    <!-- Floating WhatsApp -->
    <a href="https://wa.me/971504619202" class="whatsapp-float" target="_blank" aria-label="Chat on WhatsApp">
        <i class="fab fa-whatsapp"></i>
    </a>

    <script src="../js/app.js"></script>
</body>

</html>
```

- [ ] **Step 3: Open `private-digital-security/index.html` in a browser and verify**

Expected:
- Page loads with dark theme, sticky nav, all sections present
- Hero reads "Protecting Your Digital Life, Quietly and Completely"
- Comparison table shows Traditional vs Dhaki columns
- 6 capability cards, 4 process steps, CTA section all visible

- [ ] **Step 4: Final end-to-end verification**

Open `index.html` in a browser and verify:
- Hovering "Solutions" shows all 3 dropdown items with icons
- Clicking "Private Living" card navigates to `/private-living/` — page loads correctly
- Clicking "Private Workspaces" card navigates to `/private-workspaces/` — page loads correctly
- Clicking "Private Digital Security" card navigates to `/private-digital-security/` — page loads correctly
- Logo on each service page links back to the home page
- "Book Consultation" nav button on all pages links to the consultation URL

- [ ] **Step 5: Commit**

```bash
git add private-digital-security/
git commit -m "feat: add Private Digital Security service page"
```
