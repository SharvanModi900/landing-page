import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Best Practices",
  description: "PoPP best practices — guidelines for effective problem reporting, evidence collection, validator conduct, and community participation to maximize protocol integrity and impact.",
  keywords: ["PoPP best practices", "reporting guidelines", "evidence collection", "validator conduct", "community guidelines"],
  alternates: { canonical: "/best-practices" },
  openGraph: { title: "Best Practices — PoPP", description: "Guidelines for effective problem reporting, evidence collection, and validator conduct.", url: "/best-practices" },
  twitter: { title: "Best Practices — PoPP", description: "Guidelines for effective reporting, evidence, and validator conduct." },
};

export default function BestPracticesLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Best Practices" }]} />{children}</>; }
