import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://kishanagro.com'),
  title: {
    default: "Kishan Agro - Agrotech Solutions",
    template: "%s | Kishan Agro"
  },
  description: "Kishan Agro offers top-tier agricultural solutions, premium seeds, and modern farming techniques to empower farmers globally.",
  openGraph: {
    title: "Kishan Agro - Agrotech Solutions",
    description: "Kishan Agro offers top-tier agricultural solutions, premium seeds, and modern farming techniques to empower farmers globally.",
    url: "https://kishanagro.com",
    siteName: "Kishan Agro",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kishan Agro - Agrotech Solutions",
    description: "Kishan Agro offers top-tier agricultural solutions, premium seeds, and modern farming techniques.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#e3d10aa0] transition-colors duration-300`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
