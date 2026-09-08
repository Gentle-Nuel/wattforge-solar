# Twinstech Solar — Website

Static marketing site for Twinstech Solar (TWINSTECK INTEGRATED SERVICES), a Lagos-based solar, inverter, electrical, CCTV and satellite-TV installer operating nationwide. Plain HTML/CSS/JS, no build step, no framework.

## Structure

```
index.html            Homepage
services.html          Services
our-work.html          Completed projects
how-it-works.html      Process
contact.html           Contact / WhatsApp CTA
privacy.html, terms.html
sitemap.xml, robots.txt, llms.txt
assets/
  css/                 Stylesheet
  js/                  main.js, theme-init.js
  fonts/               Self-hosted webfonts (woff2)
  images/              Project photos, logo marks
```

## Running locally

Either works:

```bash
python -m http.server 5500
```

```bash
node .qa-serve.js   # serves on http://localhost:8946
```

Then open the printed local URL — no dependencies to install.

## Known pre-launch TODOs

This build still carries a few markers from its internal review pass ("Study 03 / Verify") that need to be cleared before it's treated as the live production site:

- [ ] `<meta name="robots" content="noindex,nofollow">` in `index.html` — remove once ready to be indexed.
- [ ] Page `<title>` still reads "Study 03 'Verify' (test build)" — needs a real title.
- [ ] Canonical/OG URLs point at a placeholder domain (`https://twinstech-solar.example/`) — update to the real domain once one is assigned.

## Deployment

Linked to Vercel (`.vercel/` is git-ignored, per Vercel's own convention — do not commit it).
