import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

const text = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-text",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-sans",
});

const SITE = "https://theidealstoic.com";

/**
 * The claim leads, because search results and link previews are usually cut
 * around 155 characters and only the first sentence is certain to survive.
 * Everything after it is a bonus that some surfaces will show in full.
 */
const DESCRIPTION =
  "Those who follow the Stoic ascent toward virtue may be surprised, upon reaching the summit, to discover that Christ has been standing there all along. A forthcoming book by Jay Saenz, MD, on the virtues the Stoics revered and the life that embodied them.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Christ the Ideal Stoic — Jay Saenz, MD",
  description: DESCRIPTION,
  applicationName: "Christ the Ideal Stoic",
  authors: [{ name: "Jay Saenz, MD" }],
  creator: "Jay Saenz, MD",
  keywords: [
    "Christ the Ideal Stoic",
    "Jay Saenz",
    "Stoicism",
    "Christianity",
    "philosophy",
    "virtue",
    "Marcus Aurelius",
    "Seneca",
    "Epictetus",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "book",
    url: SITE,
    siteName: "Christ the Ideal Stoic",
    title: "Christ the Ideal Stoic — Jay Saenz, MD",
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Christ the Ideal Stoic — Jay Saenz, MD",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

/**
 * Reveal targets start hidden in CSS. Without JS nothing would ever reveal
 * them, so put everything back.
 */
const NOSCRIPT_REVEAL = `[data-reveal]{opacity:1!important;transform:none!important}`;

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Book",
      name: "Christ the Ideal Stoic",
      url: SITE,
      abstract: DESCRIPTION,
      inLanguage: "en",
      numberOfPages: 117,
      author: {
        "@type": "Person",
        "@id": `${SITE}/#author`,
        name: "Jay Saenz, MD",
      },
      publisher: {
        "@type": "Organization",
        name: "Groundmark Press",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Memphis",
          addressRegion: "TN",
          addressCountry: "US",
        },
      },
    },
    {
      "@type": "Person",
      "@id": `${SITE}/#author`,
      name: "Jay Saenz, MD",
      jobTitle: "Orthopedic surgeon",
      homeLocation: {
        "@type": "Place",
        name: "Memphis, Tennessee",
      },
    },
    {
      "@type": "WebSite",
      url: SITE,
      name: "Christ the Ideal Stoic",
      description: DESCRIPTION,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${text.variable} ${sans.variable}`}
    >
      <head>
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: NOSCRIPT_REVEAL }} />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body>
        {children}
        {/* Cookieless page counts. No identifiers, nothing to consent to. */}
        <Analytics />
      </body>
    </html>
  );
}
