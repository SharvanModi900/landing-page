import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture",
  description: "PoPP Architecture — deep dive into the protocol's technical architecture, including chain design, consensus mechanism, data layers, and network topology.",
  keywords: ["PoPP architecture", "protocol architecture", "chain design", "consensus mechanism", "network topology"],
  alternates: { canonical: "/how-it-works/architecture" },
};

const howitworksarchitectureJsonLd = {"@context":"https://schema.org","@type":"Article","name":"Architecture - How PoPP Works","url":"https://pops.thharko.com/how-it-works/architecture","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function ArchitectureLayout({ children }: { children: React.ReactNode }) { return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howitworksarchitectureJsonLd) }} />{children}</>; }
