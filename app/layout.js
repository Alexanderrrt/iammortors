import { Barlow, Barlow_Condensed, Caveat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import JsonLd from "./components/JsonLd";
import { LanguageProvider } from "./i18n/LanguageContext";
import { SITE } from "./site.config";
import WhatsAppButton from "./components/WhatsAppButton";

// Barlow Condensed (display) reads like garage / highway signage; Barlow
// (body) shares that American industrial-signage heritage — a grounded
// pairing for an auto shop, deliberately not the generic Inter.
const displayFont = Barlow_Condensed({
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = Barlow({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
});

const signatureFont = Caveat({
  weight: ["600"],
  subsets: ["latin"],
  variable: "--font-signature",
});

const TITLE = `${SITE.name} — Auto Repair & Mechanics in San Jose, CA`;
const DESCRIPTION =
  "Centro Automotriz BR — high-level automotive maintenance in San Jose, CA. General mechanics, brakes, tune-ups, suspension, electronics, and A/C repair. Bilingual service, expert workmanship.";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Centro Automotriz BR",
    "auto repair San Jose",
    "mechanic San Jose CA",
    "brake repair",
    "engine tune-up",
    "suspension repair",
    "A/C repair",
    "car electronics",
    "taller mecánico San Jose",
    "mecánica general",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
    alternateLocale: "es_US",
    images: [
      {
        url: "/logo.png",
        alt: "Centro Automotriz BR — Auto Repair in San Jose, CA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo.png", type: "image/png", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon-152.png", sizes: "152x152", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${signatureFont.variable}`}>
      <body>
        <JsonLd />
        <LanguageProvider>{children}</LanguageProvider>
        <WhatsAppButton />
        <Script src="https://www.instagram.com/embed.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
