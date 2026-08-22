import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "PoPP Privacy Policy — understand how we collect, use, and protect your data. Our commitment to user privacy in decentralized problem validation.",
  keywords: ["PoPP privacy policy", "data privacy", "user data protection", "privacy compliance"],
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />{children}</>; }
