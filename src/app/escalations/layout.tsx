import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Escalations",
  description: "PoPP Escalations — track escalated problems, dispute resolutions, and governance interventions for contested civic issue validations.",
  keywords: ["PoPP escalations", "dispute resolution", "contested validations", "governance escalation"],
  alternates: { canonical: "/escalations" },
};

const escalationsJsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"Escalations - PoPP","url":"https://pops.thharko.com/escalations","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function EscalationsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Escalations" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(escalationsJsonLd) }} />{children}</>; }
