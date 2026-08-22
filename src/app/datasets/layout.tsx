import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Datasets",
  description: "PoPP Datasets — access verified civic problem data, validation statistics, and community-generated datasets for research and analysis.",
  keywords: ["PoPP datasets", "civic data", "verified datasets", "open data", "research data"],
  alternates: { canonical: "/datasets" },
};

export default function DatasetsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Datasets" }]} />{children}</>; }
