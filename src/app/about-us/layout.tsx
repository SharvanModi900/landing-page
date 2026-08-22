import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the Proof of Problem Protocol team. PoPP is a decentralized framework for verifying, validating, and escalating real-world problems with transparency and traceability. Learn about our mission, core values, and open-source repositories.",
  keywords: [
    "about PoPP",
    "proof of problem protocol team",
    "decentralized validation team",
    "PoPP core values",
    "open source civic tech",
    "Sharvan Modi",
  ],
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About Us — PoPP",
    description:
      "Meet the team behind PoPP — building a decentralized framework where real-world problems are verified, validated, and solved with full transparency.",
    url: "/about-us",
  },
  twitter: {
    title: "About Us — PoPP",
    description:
      "Meet the team behind PoPP — building decentralized truth validation for real-world problems.",
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Proof of Problem Protocol",
  "alternateName": "PoPP",
  "url": "https://pops.thharko.com",
  "description": "A decentralized framework for verifying, validating, and escalating real-world problems with transparency and traceability.",
  "foundingDate": "2024",
  "knowsAbout": ["Decentralized Problem Validation", "Blockchain Governance", "Civic Technology", "Cryptographic Evidence", "DAO Governance"],
  "member": [
    { "@type": "Person", "name": "Sharvan Modi", "jobTitle": "R & D Researcher" }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  }
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
      {children}
    </>
  );
}
