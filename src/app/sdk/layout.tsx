import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "PoPP SDK",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Cross-platform",
  "provider": { "@type": "Organization", "name": "Proof of Problem Protocol" },
  "description": "Developer tools and libraries for integrating decentralized problem reporting, evidence validation, and reward distribution."
};

export const metadata: Metadata = {
  title: "SDK",
  description:
    "PoPP SDK — developer tools and libraries for integrating decentralized problem reporting, evidence validation, and reward distribution into your applications. Available for multiple platforms.",
  keywords: ["PoPP SDK", "developer tools", "integration", "problem reporting SDK", "blockchain SDK", "decentralized API"],
  alternates: { canonical: "/sdk" },
  openGraph: { title: "SDK — PoPP", description: "Developer tools for integrating decentralized problem reporting and validation into your apps.", url: "/sdk" },
  twitter: { title: "SDK — PoPP", description: "Developer tools for integrating decentralized problem reporting and validation." },
};

export default function SdkLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "SDK" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />{children}</>; }
