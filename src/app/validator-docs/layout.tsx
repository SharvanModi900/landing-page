import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Validator Documentation",
  description: "PoPP Validator Documentation — comprehensive guides for validators covering protocol rules, validation procedures, best practices, and operational requirements.",
  keywords: ["validator documentation", "validator guides", "validation procedures", "validator requirements"],
  alternates: { canonical: "/validator-docs" },
};

const validatordocsJsonLd = {"@context":"https://schema.org","@type":"TechArticle","name":"Validator Documentation - PoPP","url":"https://pops.thharko.com/validator-docs","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function ValidatorDocsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Validator Documentation" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(validatordocsJsonLd) }} />{children}</>; }
