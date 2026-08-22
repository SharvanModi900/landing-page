import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Civic Activists & NGOs",
  description: "PoPP for civic activists and NGOs — powerful tools for reporting, tracking, and verifying civic issues. Use decentralized evidence collection to amplify transparency and drive accountability in your community.",
  keywords: ["civic reporting tools", "NGO problem tracking", "activist tools", "civic transparency", "decentralized activism", "community accountability"],
  alternates: { canonical: "/civic-activists-and-ngos" },
  openGraph: { title: "Civic Activists & NGOs — PoPP", description: "Tools for reporting, tracking, and verifying civic issues with decentralized evidence.", url: "/civic-activists-and-ngos" },
  twitter: { title: "Civic Activists & NGOs — PoPP", description: "Decentralized tools for civic activists and NGOs." },
};

export default function CivicActivistsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Civic Activists & NGOs" }]} />{children}</>; }
