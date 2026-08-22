import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Whitepaper",
  description:
    "Read the official Proof of Problem Protocol whitepaper. Dive into the technical architecture, consensus mechanism, token economics, and governance model that powers PoPP's decentralized truth validation system.",
  keywords: [
    "PoPP whitepaper",
    "proof of problem protocol paper",
    "decentralized protocol whitepaper",
    "blockchain problem verification",
    "truth validation whitepaper",
    "PoPP technical paper",
  ],
  alternates: { canonical: "/whitepaper" },
  openGraph: {
    title: "Whitepaper — PoPP",
    description:
      "Read the official PoPP whitepaper — technical architecture, consensus mechanism, token economics, and governance model.",
    url: "/whitepaper",
  },
  twitter: {
    title: "Whitepaper — PoPP",
    description:
      "Read the official PoPP whitepaper — technical architecture, consensus, and token economics.",
  },
};

const scholarlyJsonLd = {
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  "headline": "Proof of Problem Protocol Whitepaper",
  "author": { "@type": "Organization", "name": "Proof of Problem Protocol Team" },
  "datePublished": "2025-01-01",
  "abstract": "Technical architecture, consensus mechanism, token economics, and governance model for decentralized truth validation.",
  "inLanguage": "en-US"
};

export default function WhitepaperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Whitepaper" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyJsonLd) }} />{children}</>;
}
