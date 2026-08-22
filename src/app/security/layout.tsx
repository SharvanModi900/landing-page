import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Security",
  description: "PoPP Security — learn about the cryptographic safeguards, network security measures, audit protocols, and best practices that protect the Proof of Problem Protocol.",
  keywords: ["PoPP security", "cryptographic security", "network security", "protocol audits", "blockchain security"],
  alternates: { canonical: "/security" },
  openGraph: { title: "Security — PoPP", description: "Cryptographic safeguards and network security measures protecting PoPP.", url: "/security" },
  twitter: { title: "Security — PoPP", description: "Cryptographic safeguards and network security measures protecting PoPP." },
};

export default function SecurityLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Security" }]} />{children}</>; }
