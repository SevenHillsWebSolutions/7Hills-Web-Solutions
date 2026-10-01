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
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: "7Hills Web Solutions | Premium Web Development & Digital Platforms",
    description: "Bespoke website development, high-conversion e-commerce stores, and enterprise web applications engineered for speed and scale.",
    url: "https://7hillsweb.com",
    siteName: "7Hills Web Solutions",
    locale: "en_US",
    type: "website",
    images: [{ url: '/logo.png' }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
