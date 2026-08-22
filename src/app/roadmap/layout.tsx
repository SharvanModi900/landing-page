import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "View the PoPP development roadmap — from testnet launch to mainnet, governance milestones, ecosystem expansion, and long-term protocol evolution. Track our progress in building decentralized truth validation.",
  keywords: [
    "PoPP roadmap",
    "protocol development timeline",
    "PoPP milestones",
    "testnet to mainnet",
    "blockchain development plan",
    "decentralized protocol roadmap",
  ],
  alternates: { canonical: "/roadmap" },
  openGraph: {
    title: "Roadmap — PoPP",
    description:
      "Track PoPP's development journey — from testnet to mainnet, governance milestones, and ecosystem expansion.",
    url: "/roadmap",
  },
  twitter: {
    title: "Roadmap — PoPP",
    description:
      "Track PoPP's development journey — from testnet to mainnet and beyond.",
  },
};

const roadmapJsonLd = {"@context":"https://schema.org","@type":"ItemList","name":"PoPP Roadmap","url":"https://pops.thharko.com/roadmap","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function RoadmapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Roadmap" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(roadmapJsonLd) }} />{children}</>;
}
