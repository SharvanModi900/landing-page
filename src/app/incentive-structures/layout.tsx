import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Incentive Structures",
  description: "PoPP Incentive Structures — understand how rewards, staking incentives, and economic mechanisms motivate honest participation in the protocol.",
  keywords: ["PoPP incentives", "reward structures", "staking incentives", "economic mechanisms", "participation rewards"],
  alternates: { canonical: "/incentive-structures" },
};

const incentivestructuresJsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"Incentive Structures - PoPP","url":"https://pops.thharko.com/incentive-structures","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function IncentiveStructuresLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Incentive Structures" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(incentivestructuresJsonLd) }} />{children}</>; }
