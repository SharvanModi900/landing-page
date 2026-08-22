import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Datasets",
  description: "PoPP Datasets — access verified civic problem data, validation statistics, and community-generated datasets for research and analysis.",
  keywords: ["PoPP datasets", "civic data", "verified datasets", "open data", "research data"],
  alternates: { canonical: "/datasets" },
};

const datasetsJsonLd = {"@context":"https://schema.org","@type":"CollectionPage","name":"Datasets - PoPP","url":"https://pops.thharko.com/datasets","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function DatasetsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Datasets" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetsJsonLd) }} />{children}</>; }
