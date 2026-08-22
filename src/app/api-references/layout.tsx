import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "API Reference",
  description: "Complete PoPP API reference — explore all REST endpoints for problem submission, validation, evidence management, validator operations, and governance interactions.",
  keywords: ["PoPP API reference", "REST API", "API endpoints", "problem API", "validation endpoints", "developer reference"],
  alternates: { canonical: "/api-references" },
  openGraph: { title: "API Reference — PoPP", description: "Complete REST API reference for problem submission, validation, and governance.", url: "/api-references" },
  twitter: { title: "API Reference — PoPP", description: "Complete REST API reference for PoPP protocol integration." },
};

const apireferencesJsonLd = {"@context":"https://schema.org","@type":"TechArticle","name":"API Reference - PoPP Developer Portal","url":"https://pops.thharko.com/api-references","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function ApiReferencesLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "API Reference" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(apireferencesJsonLd) }} />{children}</>; }
