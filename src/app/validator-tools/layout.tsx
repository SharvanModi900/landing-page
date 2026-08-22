import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Validator Tools",
  description: "PoPP Validator Tools — utilities and dashboards for validators to monitor performance, manage stakes, and optimize validation operations.",
  keywords: ["validator tools", "validator utilities", "validator dashboard", "staking management"],
  alternates: { canonical: "/validator-tools" },
};

const validatortoolsJsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"Validator Tools - PoPP","url":"https://pops.thharko.com/validator-tools","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function ValidatorToolsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Validator Tools" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(validatortoolsJsonLd) }} />{children}</>; }
