import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Academic Researchers",
  description: "PoPP for academic researchers — access decentralized datasets, study governance mechanisms, publish peer-reviewed research on civic tech, and collaborate on blockchain-based problem validation.",
  keywords: ["academic research protocol", "decentralized data", "blockchain research", "civic tech study", "governance research", "academic datasets"],
  alternates: { canonical: "/academic-researchers" },
  openGraph: { title: "Academic Researchers — PoPP", description: "Access datasets and collaborate on decentralized governance research.", url: "/academic-researchers" },
  twitter: { title: "Academic Researchers — PoPP", description: "Decentralized datasets and governance research for academics." },
};

const academicresearchersJsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"Academic Researchers - PoPP","url":"https://pops.thharko.com/academic-researchers","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function AcademicResearchersLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Academic Researchers" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(academicresearchersJsonLd) }} />{children}</>; }
