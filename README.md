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

## Deployment

Live at **https://twinstech-solar.vercel.app**. Linked to Vercel (`.vercel/` is git-ignored, per Vercel's own convention — do not commit it).

Deploys are currently manual (`npx vercel --prod`) — the Vercel project isn't connected to this GitHub repo, so pushes to `main` do not auto-deploy.

If a custom domain is assigned later, update `canonical`/`og:url`/`twitter:image` in every page's `<head>`, plus `robots.txt`, `sitemap.xml`, and `llms.txt` — they currently all point at the Vercel subdomain above.
