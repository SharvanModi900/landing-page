import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Explore real-world PoPP case studies — see how decentralized problem reporting and community verification are solving civic issues like water contamination, infrastructure hazards, and corruption.",
  keywords: [
    "PoPP case studies",
    "real-world problem solving",
    "civic impact stories",
    "verified problem outcomes",
    "decentralized validation results",
    "civic tech success stories",
  ],
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies — PoPP",
    description:
      "See how PoPP transforms civic problems into verified, actionable outcomes with real-world case studies.",
    url: "/case-studies",
  },
  twitter: {
    title: "Case Studies — PoPP",
    description: "Real-world PoPP case studies — verified problems, community impact, proven outcomes.",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "PoPP Case Studies — Real-World Impact",
  "author": { "@type": "Organization", "name": "Proof of Problem Protocol Team" },
  "publisher": { "@type": "Organization", "name": "Proof of Problem Protocol", "logo": { "@type": "ImageObject", "url": "https://pops.thharko.com/logo.png" } },
  "datePublished": "2025-01-01",
  "description": "Real-world case studies showing how PoPP transforms civic problems into verified, actionable outcomes.",
  "mainEntityOfPage": "https://pops.thharko.com/case-studies"
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />{children}</>;
}
