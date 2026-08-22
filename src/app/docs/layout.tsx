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

export default function DocsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Documentation" }]} />{children}</>; }
