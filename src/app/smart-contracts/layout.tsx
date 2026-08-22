import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Smart Contracts",
  description: "Explore PoPP smart contracts — on-chain logic for problem validation, reward distribution, staking mechanisms, and governance voting on the Proof of Problem Protocol blockchain.",
  keywords: ["PoPP smart contracts", "on-chain logic", "CosmWasm contracts", "staking contracts", "governance contracts", "blockchain smart contracts"],
  alternates: { canonical: "/smart-contracts" },
  openGraph: { title: "Smart Contracts — PoPP", description: "On-chain smart contracts for validation, staking, and governance.", url: "/smart-contracts" },
  twitter: { title: "Smart Contracts — PoPP", description: "On-chain smart contracts for validation, staking, and governance." },
};

const smartcontractsJsonLd = {"@context":"https://schema.org","@type":"TechArticle","name":"Smart Contracts - PoPP","url":"https://pops.thharko.com/smart-contracts","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function SmartContractsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Smart Contracts" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(smartcontractsJsonLd) }} />{children}</>; }
