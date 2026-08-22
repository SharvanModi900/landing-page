import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Measure PoPP's real-world impact — track verified problems resolved, communities empowered, civic data generated, and the growing network of decentralized truth validators making a difference.",
  keywords: [
    "PoPP impact",
    "civic improvement metrics",
    "problems resolved",
    "community empowerment",
    "decentralized impact",
    "civic data generated",
  ],
  alternates: { canonical: "/impact" },
  openGraph: {
    title: "Impact — PoPP",
    description:
      "Track PoPP's real-world impact — verified problems resolved, communities empowered, and civic data generated.",
    url: "/impact",
  },
  twitter: {
    title: "Impact — PoPP",
    description: "Track PoPP's real-world impact — problems resolved, communities empowered.",
  },
};

const impactJsonLd = {"@context":"https://schema.org","@type":"AboutPage","name":"PoPP Impact - Civic Participation","url":"https://pops.thharko.com/impact","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function ImpactLayout({ children }: { children: React.ReactNode }) {
  return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Impact" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(impactJsonLd) }} />{children}</>;
}
