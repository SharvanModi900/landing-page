import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Escalations",
  description: "PoPP Escalations — track escalated problems, dispute resolutions, and governance interventions for contested civic issue validations.",
  keywords: ["PoPP escalations", "dispute resolution", "contested validations", "governance escalation"],
  alternates: { canonical: "/escalations" },
};

export default function EscalationsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Escalations" }]} />{children}</>; }
