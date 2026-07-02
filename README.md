# Tires SOS Rescue — website

Next.js (App Router) marketing site for Tires SOS Rescue, a tire & auto shop
in San José, CA (tires, brakes, oil changes, batteries, rims, alignment).

**Stack:** Next.js 14 · React · plain CSS · Vercel (hosting). No database,
no backend — the shop runs on walk-ins and phone calls, not online booking.

## Run it

```bash
npm install
npm run dev   # http://localhost:3000
```

## Edit site content in ONE place

Open **`app/site.config.js`**:

- `SITE` — name, phone, address, map links, hours (per weekday, used to
  compute the live "Open now / Closed" badge), social links
- `SERVICES` — the service cards shown in the "What We Do" section
- `TESTIMONIALS` — the review quotes shown in "What Customers Say"
- `COPY` — every other bilingual (English/Spanish) UI string

Every text field that needs both languages is a `{ en: "...", es: "..." }`
object — the site's language toggle reads whichever one is active.

## Design system

Brand colors are the shop's real ones — **orange & black** (`--color-accent:
#f86000` in `app/globals.css`). Headings use Archivo Black, body uses Inter,
both self-hosted at build time via `next/font` (no runtime font requests).
All scroll/hover animations are pure CSS + a small IntersectionObserver
`Reveal` component (`app/components/Reveal.js`) and are fully disabled for
users with `prefers-reduced-motion`.

## Photos & Instagram

- **Owner's BMW M3 Competition** — `/public/owners-m3.jpg`, shown in the
  "Owner's Ride" section. Replace the file to update the photo.
- **Logo** — `/public/logo.jpg`, used in the header, footer and the social
  share image (`/public/og.png`).
- **Instagram reels** — the "From the Shop" section embeds the reels listed
  in `REELS` in `app/site.config.js`. Paste new reel permalinks there to
  rotate the featured content.

## SEO

- `app/components/JsonLd.js` — schema.org `TireShop`/`AutoRepair` structured
  data (name, address, phone, hours, payment methods incl. Afterpay, social
  profiles) for Google local results.
- `app/robots.js` / `app/sitemap.js` — served at `/robots.txt` and
  `/sitemap.xml` automatically.
- `app/layout.js` — canonical URL, bilingual keywords, Open Graph + Twitter
  cards using `/public/og.png`.
- **IMPORTANT:** `SITE.url` in `app/site.config.js` is set to the default
  Vercel URL. Update it when a custom domain is attached, then also submit
  the sitemap in [Google Search Console](https://search.google.com/search-console)
  and create/claim the free **Google Business Profile** — for a local shop
  that matters more than anything on the site itself.

## Deploying to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the
   `alexanderrrt/tires-sos` GitHub repo.
2. Framework preset: Next.js (auto-detected). No environment variables are
   required.
3. Deploy. Every push to the connected branch will auto-deploy.
