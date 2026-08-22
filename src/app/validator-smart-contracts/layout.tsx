import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Validator Smart Contracts",
  description: "PoPP Validator Smart Contracts — on-chain contracts governing validator staking, slashing, reward distribution, and performance tracking.",
  keywords: ["validator smart contracts", "staking contracts", "validator on-chain logic", "slashing contracts"],
  alternates: { canonical: "/validator-smart-contracts" },
};

const validatorsmartcontractsJsonLd = {"@context":"https://schema.org","@type":"TechArticle","name":"Validator Smart Contracts - PoPP","url":"https://pops.thharko.com/validator-smart-contracts","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function ValidatorSmartContractsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Validator Smart Contracts" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(validatorsmartcontractsJsonLd) }} />{children}</>; }
