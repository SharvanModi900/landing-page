import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Tokenomics",
  description:
    "Explore PoPP's token economics — SAT MUDRA token distribution, staking rewards, validator incentives, governance voting power, and the sustainable economic model powering decentralized problem validation.",
  keywords: [
    "PoPP tokenomics",
    "SAT MUDRA token",
    "staking rewards",
    "validator incentives",
    "token distribution",
    "governance token",
    "PoPP economic model",
    "decentralized finance civic",
  ],
  alternates: { canonical: "/tokenomics" },
  openGraph: {
    title: "Tokenomics — PoPP",
    description:
      "Explore SAT MUDRA token distribution, staking rewards, validator incentives, and the sustainable economic model behind PoPP.",
    url: "/tokenomics",
  },
  twitter: {
    title: "Tokenomics — PoPP",
    description:
      "Explore SAT MUDRA token distribution, staking rewards, and the PoPP economic model.",
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "SAT MUDRA Token — PoPP Economy",
  "description": "PoPP's token economics — SAT MUDRA token distribution, staking rewards, validator incentives, and governance voting power.",
  "brand": { "@type": "Organization", "name": "Proof of Problem Protocol" },
  "category": "Digital Token",
  "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "price": "0", "priceCurrency": "USD" }
};

export default function TokenomicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tokenomics" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      {children}
    </>
  );
}
