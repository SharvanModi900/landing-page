import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Partners",
  description: "PoPP partners — organizations, institutions, and ecosystem collaborators supporting the Proof of Problem Protocol's mission for decentralized civic validation.",
  keywords: ["PoPP partners", "ecosystem partners", "civic tech partnerships", "collaborators"],
  alternates: { canonical: "/patners" },
};

const patnersJsonLd = {"@context":"https://schema.org","@type":"AboutPage","name":"Partners - PoPP","url":"https://pops.thharko.com/patners","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function PatnersLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Partners" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(patnersJsonLd) }} />{children}</>; }
