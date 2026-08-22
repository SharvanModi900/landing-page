import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Validator Panel",
  description: "PoPP Validator Panel — manage your validator operations, monitor performance, track rewards, and handle validation tasks from a centralized dashboard.",
  keywords: ["PoPP validator panel", "validator dashboard", "validator management", "validation tasks"],
  alternates: { canonical: "/validator-panel" },
};

export default function ValidatorPanelLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Validator Panel" }]} />{children}</>; }
