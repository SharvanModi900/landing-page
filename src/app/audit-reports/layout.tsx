import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Audit Reports",
  description: "PoPP Audit Reports — review independent security audits, smart contract assessments, and protocol security evaluations of the Proof of Problem Protocol.",
  keywords: ["PoPP audit reports", "security audit", "smart contract audit", "protocol assessment", "independent audit"],
  alternates: { canonical: "/audit-reports" },
  openGraph: { title: "Audit Reports — PoPP", description: "Independent security audits and smart contract assessments.", url: "/audit-reports" },
  twitter: { title: "Audit Reports — PoPP", description: "Independent security audits and smart contract assessments." },
};

const auditreportsJsonLd = {"@context":"https://schema.org","@type":"Report","name":"Audit Reports - PoPP","url":"https://pops.thharko.com/audit-reports","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function AuditReportsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Audit Reports" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(auditreportsJsonLd) }} />{children}</>; }
