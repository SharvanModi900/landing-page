import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Ultimate Guide to Decentralized Problem Validation",
  "author": { "@type": "Organization", "name": "Proof of Problem Protocol Team" },
  "datePublished": "2025-06-01",
  "description": "Learn how decentralized problem validation works on the blockchain. Complete guide to verifying, reporting, and resolving civic issues using PoPP protocol.",
  "mainEntityOfPage": "https://pops.thharko.com/learn/decentralized-problem-validation"
};

export const metadata: Metadata = {
  title: "Ultimate Guide to Decentralized Problem Validation",
  description: "Learn how decentralized problem validation works — from reporting civic issues to blockchain verification, community consensus, and earning crypto rewards. Complete guide to PoPP protocol.",
  keywords: [
    "decentralized problem validation",
    "how to verify problems on blockchain",
    "civic issue verification",
    "decentralized truth validation",
    "blockchain problem reporting",
    "community verification protocol",
    "crypto rewards for reporting",
    "PoPP protocol guide",
  ],
  alternates: { canonical: "/learn/decentralized-problem-validation" },
  openGraph: {
    title: "Ultimate Guide to Decentralized Problem Validation | PoPP",
    description: "Complete guide to verifying and reporting civic issues using blockchain technology and decentralized consensus.",
    url: "/learn/decentralized-problem-validation",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Learn", href: "/learn" }, { label: "Decentralized Problem Validation" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {children}
    </>
  );
}
