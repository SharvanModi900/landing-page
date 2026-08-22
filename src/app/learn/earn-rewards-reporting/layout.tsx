import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Earn Rewards Reporting Civic Problems",
  "author": { "@type": "Organization", "name": "Proof of Problem Protocol Team" },
  "datePublished": "2025-06-01",
  "description": "Learn how to earn crypto rewards by reporting civic problems. Step-by-step guide to submitting problem reports, providing evidence, and receiving SAT MUDRA tokens.",
  "mainEntityOfPage": "https://pops.thharko.com/learn/earn-rewards-reporting"
};

export const metadata: Metadata = {
  title: "How to Earn Rewards Reporting Civic Problems",
  description: "Step-by-step guide to earning SAT MUDRA tokens by reporting civic problems. Learn how to submit evidence, get verified, and receive crypto rewards with PoPP.",
  keywords: ["earn crypto reporting problems", "rewards for civic reporting", "crypto rewards civic issues", "report problems earn tokens", "SAT MUDRA rewards", "blockchain bounty program"],
  alternates: { canonical: "/learn/earn-rewards-reporting" },
  openGraph: { title: "How to Earn Rewards Reporting Civic Problems | PoPP", description: "Earn SAT MUDRA tokens by reporting and verifying civic problems with cryptographic evidence.", url: "/learn/earn-rewards-reporting" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Learn", href: "/learn" }, { label: "Earn Rewards Reporting" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {children}
    </>
  );
}
