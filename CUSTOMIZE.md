# Customization Guide — Fill Business Data

Use this file as a checklist when setting up the template for a new business.  
For each item, replace the placeholder value with real business data.

---

## 1. `app/site.config.js` — All text & business info

### `SITE` object (lines 4–58)

| Field | Placeholder | Replace with |
|-------|-------------|-------------|
| `name` | `"Your Business Name"` | Business legal name |
| `nameShort` | `"Your Biz"` | Short abbreviation (used in header) |
| `url` | `"https://example.com"` | Production domain |
| `tagline.en` | `"Your tagline here..."` | One-line English tagline |
| `tagline.es` | `"Tu eslogan aquí..."` | One-line Spanish tagline |
| `phone` | `"(555) 123-4567"` | Display phone number |
| `phoneHref` | `"tel:+15551234567"` | Click-to-call link (digits only, with + and country code) |
| `whatsapp` | `"15551234567"` | WhatsApp number (digits only, with country code, no +) |

**Locations** — repeat the object for each physical location:
| Field | Example | Replace with |
|-------|---------|-------------|
| `id` | `"main"` | Unique slug (no spaces) |
| `line1` | `"123 Main St"` | Street address |
| `line2` | `"Anytown, ST 12345"` | City, state, ZIP |
| `full` | `"123 Main St, Anytown, ST 12345"` | Full address for display |
| `mapsHref` | `"https://..."` | Google Maps directions link (use `destination=` param) |
| `mapsEmbedSrc` | `"https://..."` | Google Maps embed iframe src |
| `postalCode` | `"12345"` | ZIP/Postal code |

**Social:**
| Field | Replace with |
|-------|-------------|
| `instagram` | Full Instagram profile URL |
| `tiktok` | Full TikTok profile URL |
| `facebook` | Full Facebook page URL |

**Hours** — edit each day's `open` / `close` (24h format, `null` = closed).

### `SERVICES` array (lines 60–131)

For each of the 7 services, replace:
- `title` — `{ en: "...", es: "..." }`
- `desc` — `{ en: "...", es: "..." }`
- `icon` — must match one of the icon names in `app/components/Icons.js`: `tire`, `wrench`, `alignment`, `brakes`, `oil`, `battery`, `rim`, `usedTire`, `rotation`, `balance`, `tpms`, `suspension`, `phone`, `pin`, `instagram`, `arrow`
- `image` — path to photo in `/public/services/` (or keep placeholder)

**To change number of services:** add/remove objects from the array, then update `lib/pricing.default.js` to match.

### `MARQUEE_ITEMS` (lines 134–145)

Array of 10 strings for the infinite scrolling banner. Mix English and Spanish if bilingual.

### `REELS` (lines 148–149)

Array of Instagram reel permalinks. Leave empty `[]` if not using.

### `OWNERS_RIDE` (lines 151–158)

Bilingual copy for the featured vehicle/build section.

### `TESTIMONIALS` (lines 160–182)

Array of 3+ review objects with `{ quote: { en, es }, author }`.

### `COPY` (lines 184–379)

Every bilingual UI string on the site. Replace `{ en, es }` values as needed.

Key sections to always customize:
- `hero.kicker` — city/area name
- `hero.alignment.*` — about your featured equipment
- `promos.financeSub` — financing details
- `promos.loyaltySub` — loyalty program details
- `promos.driverTitle/Sub/Price/Includes` — featured deal details

---

## 2. `app/layout.js` — Metadata & SEO (lines 30–87)

| Line(s) | What to change |
|---------|---------------|
| 30 | `TITLE` — page title template |
| 31–32 | `DESCRIPTION` — meta description |
| 41–43 | `keywords` — array of SEO keywords |
| 53–55 | `openGraph.title`, `openGraph.description` |
| 59–67 | `openGraph.images` — update alt text |
| 69–74 | `twitter.title`, `twitter.description` |

---

## 3. `public/` — Image assets

Replace every file with real photos. Recommended dimensions:

| File | Recommended size | Content |
|------|-----------------|---------|
| `storefront.jpg` | 800×600 | Exterior storefront photo |
| `owner.jpg` | 600×700 | Owner/staff portrait |
| `owners-m3.jpg` | 800×600 | Featured vehicle photo |
| `loyalty-card.jpg` | 400×300 | Loyalty card or promo graphic |
| `snap-finance.jpg` | 400×300 | Financing partner image |
| `og.png` | 1200×630 | Open Graph share image |
| `logo.jpg` | 400×200 | Horizontal logo |
| `logo-mark.png` | 200×200 | Icon/logo mark (transparent bg preferred) |
| `favicon.svg` | any | SVG favicon |
| `apple-touch-icon.png` | 180×180 | Apple touch icon |
| `apple-touch-icon-152.png` | 152×152 | Apple touch icon (smaller) |
| `services/*.jpg` | 800×600 | One photo per service |

---

## 4. `lib/pricing.default.js` — Default pricing

Set realistic default prices for the quote estimator:

| Section | What to set |
|---------|------------|
| `laborRate` | Hourly labor rate in dollars |
| `rangePct` | Estimate spread (e.g. 0.15 = ±15%) |
| `vehicleClasses` | Multipliers per vehicle type |
| Each service object | Base prices, labor hours, fees, option prices |

Prices can also be edited live in the `/admin` panel after deploy.

---

## 5. `.env.example` → `.env.local`

```
ADMIN_PASSWORD=your-secure-password
AUTH_SECRET=openssl rand -base64 32
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

- `ADMIN_PASSWORD` — used to log in at `/admin`
- `AUTH_SECRET` — random string for session signing
- `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` — only needed for persistent pricing storage

---

## 6. `db/pricing-schema.sql` — Supabase setup (optional)

Run once in Supabase SQL editor if using persistence.

---

## 7. `public/manifest.json` — PWA manifest

Update `name` and `short_name`.

---

## 8. `package.json` — Project metadata

Update `name` and `description`.

---

## 9. `app/globals.css` — Colors & styling (if changing theme)

The template uses CSS custom properties in `:root` (lines 1–24):

```css
--ink: #ffffff;        /* page background */
--ink-2: #f8fafc;      /* alternate background */
--surface: #ffffff;    /* card background */
--surface-2: #eff6ff;  /* tinted surface */
--line: #93c5fd;       /* borders */
--line-soft: #bfdbfe;  /* soft borders */
--paper: #1e293b;      /* text color */
--paper-dim: #64748b;  /* muted text */
--blue: #2563eb;       /* primary accent */
--blue-deep: #1d4ed8;  /* deep accent */
--steel: #94a3b8;      /* muted gray */
--good: #4caf6d;       /* success green */
```

To change the color theme, update these variables (affects entire site).

---

## Quick reference — File map

| Purpose | File |
|---------|------|
| All text & copy | `app/site.config.js` |
| Page metadata | `app/layout.js` |
| Quote page metadata | `app/quote/page.js` |
| Structured data (schema.org) | `app/components/JsonLd.js` |
| Admin loader text | `app/admin/AdminLoader.js` |
| Default prices | `lib/pricing.default.js` |
| Environment variables | `.env.example` |
| PWA manifest | `public/manifest.json` |
| CSS custom properties | `app/globals.css` (lines 1–24) |
| All images | `public/` directory |
| Supabase schema | `db/pricing-schema.sql` |
