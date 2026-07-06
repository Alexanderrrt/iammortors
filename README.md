# Business Website Template

A Next.js (App Router) bilingual (English/Spanish) business website template with a quote estimator, admin pricing panel, and full i18n support.

**Stack:** Next.js 14 · React · plain CSS · Vercel (hosting) · Supabase (optional, for persistent pricing)

## Quick start

```bash
npm install
npm run dev   # http://localhost:3000
```

## Customize for your business

### 1. Edit `app/site.config.js`

This is the **single file** where you change all text and business info:

- `SITE` — name, phone, address, maps links, hours (per weekday), social links, WhatsApp number
- `SERVICES` — the service cards shown in the "What We Do" section
- `MARQUEE_ITEMS` — scrolling banner text
- `OWNERS_RIDE` — featured vehicle/build section copy
- `TESTIMONIALS` — customer review quotes
- `COPY` — every other bilingual UI string
- `REELS` — Instagram reel permalinks for the gallery

Every text field that needs both languages is a `{ en: "...", es: "..." }` object.

### 2. Replace images in `public/`

| Location | Replace with |
|----------|-------------|
| `public/storefront.jpg` | Your storefront photo |
| `public/owner.jpg` | Owner/staff portrait |
| `public/owners-m3.jpg` | Featured vehicle photo |
| `public/loyalty-card.jpg` | Loyalty card or promo image |
| `public/snap-finance.jpg` | Financing partner image |
| `public/og.png` | Open Graph share image (1200×630) |
| `public/apple-touch-icon.png` | Apple touch icon (180×180) |
| `public/apple-touch-icon-152.png` | Apple touch icon (152×152) |
| `public/services/*.jpg` | Photos for each service |

**Keep:** `logo.jpg`, `logo-mark.png`, `favicon.svg`, `brands/*.svg`

### 3. Update metadata in `app/layout.js`

Set your business name, description, and keywords in the `metadata` export.

### 4. Review `lib/pricing.default.js`

Default pricing for the quote estimator. Set real prices in the `/admin` panel or edit this file.

### 5. Update environment variables

Copy `.env.example` to `.env.local` and set:
- `ADMIN_PASSWORD` — admin login password
- `AUTH_SECRET` — random string (`openssl rand -base64 32`)

(Optional) For persistent pricing storage, also set:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Features

- Bilingual EN/ES with language toggle
- Mobile-responsive, fully custom CSS (no framework)
- Scroll animations with reduced-motion support
- Interactive quote estimator (`/quote`)
- Password-protected admin pricing editor (`/admin`)
- Real-time open/closed status badge
- Secret admin entry (5-tap Easter egg on logo)
- SEO: sitemap, robots.txt, JSON-LD structured data, Open Graph
- Instagram reels gallery
- Brand showcase popups
- WhatsApp integration for quotes and inquiries

## Project structure

```
app/
  layout.js           — Root layout, metadata, font loading
  page.js             — Homepage (assembles all components)
  site.config.js      — All text and business configuration
  globals.css         — All styles (2859 lines)
  components/         — UI components
  i18n/               — Language context/provider
  hooks/              — Custom React hooks
  quote/              — Quote estimator page
  admin/              — Admin panel (login + pricing editor)
  api/                — API routes (pricing, auth)
lib/                  — Business logic (pricing engine, auth)
public/               — Static assets (images, manifests)
db/                   — Database schema
```
