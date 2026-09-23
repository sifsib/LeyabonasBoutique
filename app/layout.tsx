import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat, Yellowtail } from "next/font/google";
import { site } from "@/content/site";
import { isDemo } from "@/lib/demo";
import DemoRibbon from "@/components/DemoRibbon";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-montserrat",
  display: "swap",
});
// Used once, for the signature line under the hero.
const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-yellowtail",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.seo.title,
  description: site.seo.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
    locale: site.locale.replace("-", "_"),
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
  },
  robots: isDemo ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#010101",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: site.name,
  description: site.seo.description,
  url: site.url,
  image: new URL(site.images.logo.src, site.url).toString(),
  logo: new URL(site.images.logo.src, site.url).toString(),
  telephone: site.phone.tel,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  sameAs: Object.values(site.socials),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.locale} className={`${cormorant.variable} ${montserrat.variable} ${yellowtail.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {isDemo && <DemoRibbon />}
        {children}
      </body>
    </html>
  );
}
