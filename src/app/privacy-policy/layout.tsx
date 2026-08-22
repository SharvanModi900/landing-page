import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "PoPP Privacy Policy — understand how we collect, use, and protect your data. Our commitment to user privacy in decentralized problem validation.",
  keywords: ["PoPP privacy policy", "data privacy", "user data protection", "privacy compliance"],
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};

const privacypolicyJsonLd = {"@context":"https://schema.org","@type":"CreativeWork","name":"Privacy Policy - PoPP","url":"https://pops.thharko.com/privacy-policy","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(privacypolicyJsonLd) }} />{children}</>; }
