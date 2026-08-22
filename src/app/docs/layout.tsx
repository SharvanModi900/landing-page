import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Official PoPP documentation — comprehensive guides covering protocol architecture, validator operations, token economics, governance, and developer integration.",
  keywords: ["PoPP documentation", "protocol docs", "PoPP guides", "validator documentation", "developer documentation"],
  alternates: { canonical: "/docs" },
  openGraph: { title: "Documentation — PoPP", description: "Comprehensive guides covering protocol architecture, validators, tokenomics, and governance.", url: "/docs" },
  twitter: { title: "Documentation — PoPP", description: "Comprehensive guides for the PoPP protocol." },
};

const docsJsonLd = {"@context":"https://schema.org","@type":"TechArticle","name":"PoPP Documentation","url":"https://pops.thharko.com/docs","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function DocsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Documentation" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(docsJsonLd) }} />{children}</>; }
