import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Validation Process",
  description: "PoPP Validation Process — understand how community validators verify problem reports, assess evidence quality, and reach consensus on truth validation.",
  keywords: ["PoPP validation", "validation process", "community verification", "evidence assessment", "consensus validation"],
  alternates: { canonical: "/how-it-works/validation" },
};

const howitworksvalidationJsonLd = {"@context":"https://schema.org","@type":"Article","name":"Validation - How PoPP Works","url":"https://pops.thharko.com/how-it-works/validation","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function ValidationLayout({ children }: { children: React.ReactNode }) { return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howitworksvalidationJsonLd) }} />{children}</>; }
