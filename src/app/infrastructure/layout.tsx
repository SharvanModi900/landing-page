import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Infrastructure",
  description: "Explore PoPP's decentralized infrastructure — network nodes, validator topology, chain architecture, and the technical backbone powering truth validation at scale.",
  keywords: ["PoPP infrastructure", "network nodes", "decentralized network", "chain architecture", "validator topology"],
  alternates: { canonical: "/infrastructure" },
  openGraph: { title: "Infrastructure — PoPP", description: "Explore PoPP's decentralized network infrastructure and chain architecture.", url: "/infrastructure" },
  twitter: { title: "Infrastructure — PoPP", description: "Explore PoPP's decentralized network infrastructure." },
};

const infrastructureJsonLd = {"@context":"https://schema.org","@type":"TechArticle","name":"PoPP Infrastructure","url":"https://pops.thharko.com/infrastructure","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function InfrastructureLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Infrastructure" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(infrastructureJsonLd) }} />{children}</>; }
