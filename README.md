# Wattforge Solar — Website

Static marketing site for Wattforge Solar (WATTFORGE ENERGY SYSTEMS), a Lagos-based solar, inverter, electrical, CCTV and satellite-TV installer operating nationwide. Plain HTML/CSS/JS, no build step, no framework.

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

## Deployment

Portfolio piece — previously built to pitch a real prospective client, rebranded as a fictional business (Wattforge Solar) after that pitch went unanswered. `https://wattforge-solar.vercel.app` is a placeholder domain baked into the meta tags; it isn't live yet. Deploy to a fresh Vercel project (`npx vercel --prod`) and then update `canonical`/`og:url`/`twitter:image` in every page's `<head>`, plus `robots.txt`, `sitemap.xml`, and `llms.txt` to match the real deployed URL.
