import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL("https://7hillsweb.com"),
  title: {
    default: "7Hills Web Solutions | Premium Web Development & Digital Platforms",
    template: "%s | 7Hills Web Solutions",
  },
  description: "Bespoke website development, high-conversion e-commerce stores, and enterprise web applications engineered for speed, scale, and business growth.",
  keywords: ["web development", "business websites", "e-commerce development", "web applications", "7Hills Web Solutions", "custom web solutions", "Next.js agency"],
  authors: [{ name: "7Hills Web Solutions" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://7hillsweb.com',
  },
  icons: {
    icon: '/logo-sm.webp',
    apple: '/logo-sm.webp',
  },
  openGraph: {
    title: "7Hills Web Solutions | Premium Web Development & Digital Platforms",
    description: "Bespoke website development, high-conversion e-commerce stores, and enterprise web applications engineered for speed and scale.",
    url: "https://7hillsweb.com",
    siteName: "7Hills Web Solutions",
    locale: "en_US",
    type: "website",
    images: [{ url: '/logo.webp', width: 800, height: 400, alt: '7Hills Web Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "7Hills Web Solutions | Premium Web Development & Digital Platforms",
    description: "Bespoke website development, high-conversion e-commerce stores, and enterprise web applications.",
    images: ['/logo.webp'],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: '7Hills Web Solutions',
    image: 'https://7hillsweb.com/logo.png',
    '@id': 'https://7hillsweb.com',
    url: 'https://7hillsweb.com',
    telephone: '+919500118875',
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '7Hills Tech Tower, Outer Ring Road',
      addressLocality: 'Bangalore',
      postalCode: '560103',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.9279,
      longitude: 77.6271,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '20:00',
    },
    sameAs: [
      'https://github.com/SanjayElumalai2006/7hills-web-solutions',
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}

