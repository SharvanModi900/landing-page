import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Decentralized Identity (DID)",
  description: "PoPP Decentralized Identity — learn how DIDs are used for pseudonymous validator identities, reputation tracking, and privacy-preserving participation in the protocol.",
  keywords: ["PoPP DID", "decentralized identity", "pseudonymous identity", "validator identity", "privacy-preserving identity"],
  alternates: { canonical: "/did" },
  openGraph: { title: "Decentralized Identity — PoPP", description: "Pseudonymous identities and reputation tracking in PoPP.", url: "/did" },
  twitter: { title: "Decentralized Identity — PoPP", description: "Pseudonymous identities and reputation tracking in PoPP." },
};

const didJsonLd = {"@context":"https://schema.org","@type":"TechArticle","name":"Decentralized Identifiers - PoPP","url":"https://pops.thharko.com/did","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function DidLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Decentralized Identity" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(didJsonLd) }} />{children}</>; }
