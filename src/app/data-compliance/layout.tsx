import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Data Compliance",
  description: "PoPP Data Compliance — our approach to data protection, GDPR considerations, and regulatory compliance in decentralized problem validation and evidence management.",
  keywords: ["PoPP data compliance", "GDPR", "data protection", "regulatory compliance", "evidence data privacy"],
  alternates: { canonical: "/data-compliance" },
  robots: { index: false, follow: true },
};

const datacomplianceJsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"Data Compliance - PoPP","url":"https://pops.thharko.com/data-compliance","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function DataComplianceLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Data Compliance" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datacomplianceJsonLd) }} />{children}</>; }
