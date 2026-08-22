import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Complete Guide to Civic Tech and Blockchain",
  "author": { "@type": "Organization", "name": "Proof of Problem Protocol Team" },
  "datePublished": "2025-06-01",
  "description": "How blockchain technology is transforming civic engagement and civic tech. Learn about decentralized governance, transparent problem reporting, and community-driven solutions.",
  "mainEntityOfPage": "https://pops.thharko.com/learn/civic-tech-blockchain"
};

export const metadata: Metadata = {
  title: "Complete Guide to Civic Tech and Blockchain",
  description: "How blockchain is transforming civic tech — decentralized governance, transparent problem reporting, community engagement, and real-world impact through PoPP protocol.",
  keywords: ["civic tech blockchain", "blockchain for civic engagement", "decentralized civic technology", "civic governance blockchain", "transparent government technology", "community problem solving"],
  alternates: { canonical: "/learn/civic-tech-blockchain" },
  openGraph: { title: "Complete Guide to Civic Tech and Blockchain | PoPP", description: "How blockchain technology is revolutionizing civic engagement and community problem solving.", url: "/learn/civic-tech-blockchain" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Learn", href: "/learn" }, { label: "Civic Tech & Blockchain" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {children}
    </>
  );
}
