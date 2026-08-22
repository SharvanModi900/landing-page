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

export default function AcademiaResearchLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Academia & Research" }]} />{children}</>; }
