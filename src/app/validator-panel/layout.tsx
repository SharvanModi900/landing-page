import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Validator Panel",
  description: "PoPP Validator Panel — manage your validator operations, monitor performance, track rewards, and handle validation tasks from a centralized dashboard.",
  keywords: ["PoPP validator panel", "validator dashboard", "validator management", "validation tasks"],
  alternates: { canonical: "/validator-panel" },
};

const validatorpanelJsonLd = {"@context":"https://schema.org","@type":"WebApplication","name":"Validator Panel - PoPP","url":"https://pops.thharko.com/validator-panel","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"},"applicationCategory":"BlockchainApplication","operatingSystem":"Web"};

export default function ValidatorPanelLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Validator Panel" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(validatorpanelJsonLd) }} />{children}</>; }
