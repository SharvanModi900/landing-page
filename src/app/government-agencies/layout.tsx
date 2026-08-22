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

export default function GovernmentAgenciesLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Government Agencies" }]} />{children}</>; }
