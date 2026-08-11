import type { Metadata } from "next";
import { Cardo, IBM_Plex_Sans } from "next/font/google";
import { book, meta, site } from "@/lib/content";
import "./globals.css";

/*
 * Cardo is a humanist face cut for classical scholarship — it carries polytonic
 * Greek and Hebrew alongside Latin, which is the typographic world this book
 * lives in. IBM Plex Sans handles the parts of the page that are machinery
 * rather than text: labels, the form, the footer.
 */
const cardo = Cardo({
  variable: "--font-cardo",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const cardoItalic = Cardo({
  variable: "--font-cardo-italic",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${book.title} — ${site.name}`,
    template: `%s — ${book.title}`,
  },
  description: meta.description,
  openGraph: {
    title: book.title,
    description: meta.description,
    url: site.url,
    siteName: site.name,
    type: "book",
  },
  twitter: {
    card: "summary_large_image",
    title: book.title,
    description: meta.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cardo.variable} ${cardoItalic.variable} ${plex.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
