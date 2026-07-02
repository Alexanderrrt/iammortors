import { Archivo_Black, Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "./components/JsonLd";
import { LanguageProvider } from "./i18n/LanguageContext";
import { SITE } from "./site.config";

const displayFont = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const TITLE = `${SITE.name} — Tire Shop in San José, CA | Llantas San José`;
const DESCRIPTION =
  "Tire shop in San José, CA: new tires, flat repair, wheel alignment, brakes, oil changes, batteries and rims. Bilingual English/Spanish, best prices in the Bay Area, walk-ins welcome. Taller de llantas en San José.";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "tire shop San Jose",
    "llantas San Jose",
    "flat tire repair San Jose",
    "wheel alignment San Jose",
    "brakes San Jose",
    "oil change San Jose",
    "rims San Jose",
    "taller de llantas",
    "Tires SOS Rescue",
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
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Tires SOS Rescue — tire shop in San José, CA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport = {
  themeColor: "#f86000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <JsonLd />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
