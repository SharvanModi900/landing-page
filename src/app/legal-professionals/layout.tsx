import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Legal Professionals",
  description: "PoPP for legal professionals — leverage cryptographically verified evidence, tamper-proof documentation, and decentralized validation for legal cases, compliance, and dispute resolution.",
  keywords: ["legal evidence protocol", "verifiable documentation", "cryptographic evidence law", "legal tech blockchain", "dispute resolution"],
  alternates: { canonical: "/legal-professionals" },
  openGraph: { title: "Legal Professionals — PoPP", description: "Cryptographically verified evidence and tamper-proof documentation for legal use.", url: "/legal-professionals" },
  twitter: { title: "Legal Professionals — PoPP", description: "Verified evidence and tamper-proof documentation for legal professionals." },
};

export default function LegalProfessionalsLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Legal Professionals" }]} />{children}</>; }
