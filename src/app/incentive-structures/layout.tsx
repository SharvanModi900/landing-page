import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Incentive Structures",
  description: "PoPP Incentive Structures — understand how rewards, staking incentives, and economic mechanisms motivate honest participation in the protocol.",
  keywords: ["PoPP incentives", "reward structures", "staking incentives", "economic mechanisms", "participation rewards"],
  alternates: { canonical: "/incentive-structures" },
};

export default function IncentiveStructuresLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Incentive Structures" }]} />{children}</>; }
