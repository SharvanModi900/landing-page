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

const securityJsonLd = {"@context":"https://schema.org","@type":"WebPage","name":"Security - PoPP","url":"https://pops.thharko.com/security","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function SecurityLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Security" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(securityJsonLd) }} />{children}</>; }
