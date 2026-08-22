import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Staking Mechanics",
  description: "PoPP Staking Mechanics — understand how staking works, validator bonding, slashing conditions, reward calculations, and the economic incentives securing the network.",
  keywords: ["PoPP staking", "staking mechanics", "validator bonding", "slashing conditions", "staking rewards", "PoS staking"],
  alternates: { canonical: "/staking-mechanics" },
  openGraph: { title: "Staking Mechanics — PoPP", description: "How staking, bonding, slashing, and rewards work in PoPP.", url: "/staking-mechanics" },
  twitter: { title: "Staking Mechanics — PoPP", description: "How staking, bonding, and rewards work in PoPP." },
};

export default function StakingMechanicsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Staking Mechanics" }]} />{children}</>; }
