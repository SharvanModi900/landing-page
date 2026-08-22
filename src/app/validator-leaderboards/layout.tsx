import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Validator Leaderboards",
  description: "PoPP Validator Leaderboards — see top-performing validators ranked by accuracy, uptime, reputation score, and community contributions.",
  keywords: ["validator leaderboards", "top validators", "validator rankings", "validator performance"],
  alternates: { canonical: "/validator-leaderboards" },
};

const validatorleaderboardsJsonLd = {"@context":"https://schema.org","@type":"ItemList","name":"Validator Leaderboards - PoPP","url":"https://pops.thharko.com/validator-leaderboards","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function ValidatorLeaderboardsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Validator Leaderboards" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(validatorleaderboardsJsonLd) }} />{children}</>; }
