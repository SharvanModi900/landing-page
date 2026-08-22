import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Validator Smart Contracts",
  description: "PoPP Validator Smart Contracts — on-chain contracts governing validator staking, slashing, reward distribution, and performance tracking.",
  keywords: ["validator smart contracts", "staking contracts", "validator on-chain logic", "slashing contracts"],
  alternates: { canonical: "/validator-smart-contracts" },
};

export default function ValidatorSmartContractsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Validator Smart Contracts" }]} />{children}</>; }
