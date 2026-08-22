import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Policy & Governance",
  description: "PoPP Policy & Governance — understand the decentralized governance framework, protocol policies, DAO decision-making processes, and community governance guidelines.",
  keywords: ["PoPP governance", "protocol policy", "DAO governance", "decentralized policy", "community governance framework"],
  alternates: { canonical: "/policy-and-governance" },
  openGraph: { title: "Policy & Governance — PoPP", description: "Decentralized governance framework and protocol policies.", url: "/policy-and-governance" },
  twitter: { title: "Policy & Governance — PoPP", description: "Decentralized governance framework and protocol policies." },
};

const policyandgovernanceJsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"Policy & Governance - PoPP","url":"https://pops.thharko.com/policy-and-governance","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function PolicyGovernanceLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Policy & Governance" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(policyandgovernanceJsonLd) }} />{children}</>; }
