import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Government Agencies",
  description: "PoPP for government agencies — access verified civic data, monitor infrastructure issues in real-time, and leverage community-reported problems with cryptographic evidence for faster resolution.",
  keywords: ["government civic data", "infrastructure monitoring", "civic issue dashboard", "government transparency", "public data verification"],
  alternates: { canonical: "/government-agencies" },
  openGraph: { title: "Government Agencies — PoPP", description: "Access verified civic data and monitor infrastructure issues with cryptographic evidence.", url: "/government-agencies" },
  twitter: { title: "Government Agencies — PoPP", description: "Verified civic data for government agencies." },
};

const governmentagenciesJsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"Government Agencies - PoPP","url":"https://pops.thharko.com/government-agencies","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function GovernmentAgenciesLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Government Agencies" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(governmentagenciesJsonLd) }} />{children}</>; }
