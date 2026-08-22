import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Academia & Research",
  description: "PoPP for academia and research — explore partnerships, access protocol datasets for study, collaborate on decentralized governance research, and contribute to peer-reviewed civic tech innovation.",
  keywords: ["PoPP academia", "research partnership", "decentralized data research", "civic tech study", "academic collaboration", "blockchain research"],
  alternates: { canonical: "/academia-and-research" },
  openGraph: { title: "Academia & Research — PoPP", description: "Partnerships, datasets, and collaboration for decentralized governance research.", url: "/academia-and-research" },
  twitter: { title: "Academia & Research — PoPP", description: "Partnerships and collaboration for decentralized governance research." },
};

const academiaandresearchJsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"Academia & Research - PoPP","url":"https://pops.thharko.com/academia-and-research","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function AcademiaResearchLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Academia & Research" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(academiaandresearchJsonLd) }} />{children}</>; }
