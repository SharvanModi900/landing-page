import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import CookieConsent from "@/components/CookieConsent";
import ReduxProvider from "./Provider";
import { WalletProvider } from "@/lib/wallet";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import SocialBar from "@/components/SocialBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pops.thharko.com"),
  title: {
    default: "Proof of Problem Protocol (PoPP) - Decentralized Truth Validation",
    template: "%s | PoPP - Proof of Problem Protocol",
  },
  description: "The protocol for verifiable, decentralized problem-solving and truth validation. Turn complaints into civilization's building blocks with PoPP.",
  keywords: [
    "Proof of Problem Protocol",
    "PoPP",
    "decentralized validation",
    "truth protocol",
    "problem solving",
    "blockchain governance",
    "DAO",
    "civic technology",
    "transparency",
    "accountability",
    "decentralized problem reporting",
    "civic data economy",
    "verifiable evidence",
    "community governance",
    "web3 civic tech"
  ],
  authors: [{ name: "Proof of Problem Protocol Team" }],
  creator: "Proof of Problem Protocol",
  publisher: "Proof of Problem Protocol",
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Proof of Problem Protocol (PoPP)",
    description: "The protocol for verifiable, decentralized problem-solving and truth validation.",
    type: "website",
    url: "https://pops.thharko.com",
    siteName: "Proof of Problem Protocol",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Proof of Problem Protocol (PoPP)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proof of Problem Protocol (PoPP)",
    description: "The protocol for verifiable, decentralized problem-solving and truth validation.",
    site: "@ShravanModi8",
    creator: "@ShravanModi8",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  category: "technology",
  other: {
    "google-adsense-account": "ca-pub-1974085005262731",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a14" },
    { media: "(prefers-color-scheme: light)", color: "#0891b2" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://pops.thharko.com/#organization",
      "name": "Proof of Problem Protocol",
      "alternateName": "PoPP",
      "url": "https://pops.thharko.com",
      "foundingDate": "2024",
      "description": "A decentralized framework for verifying, validating, and escalating real-world problems with transparency and traceability.",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pops.thharko.com/logo.png",
        "width": 512,
        "height": 512
      },
      "sameAs": [
        "https://x.com/ShravanModi8",
        "https://github.com/SharvanModi900/proof-of-problem-protocol"
      ],
      "knowsAbout": [
        "Decentralized Problem Validation",
        "Blockchain Governance",
        "Civic Technology",
        "Cryptographic Evidence",
        "DAO Governance",
        "Token Economics"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://pops.thharko.com/#website",
      "url": "https://pops.thharko.com",
      "name": "Proof of Problem Protocol",
      "publisher": { "@id": "https://pops.thharko.com/#organization" },
      "inLanguage": "en-US",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://pops.thharko.com/explorer?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="FzA5CCrnELCJ1mK3YviQ2kaci5uw3mGCxrK5pT6ndSw" />
        <link rel="preconnect" href="https://popp.thharko.com" />
        <link rel="dns-prefetch" href="https://popp.thharko.com" />
        <link rel="preconnect" href="https://chain.thharko.com" />
        <link rel="dns-prefetch" href="https://chain.thharko.com" />
        <link rel="alternate" type="application/rss+xml" title="PoPP Blog RSS Feed" href="/rss.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WalletProvider>
          <BreadcrumbSchema />
          <SocialBar />
          <Navigation />
          <ReduxProvider>
            <main>
              {children}
            </main>
          </ReduxProvider>
          <Footer />
          <CookieConsent />
        </WalletProvider>
      </body>
    </html>
  );
}
