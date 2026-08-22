import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "API Keys",
  description: "Manage your PoPP API keys — generate, revoke, and monitor API access for integrating with the Proof of Problem Protocol's decentralized validation network.",
  keywords: ["PoPP API keys", "API access", "developer API", "protocol integration"],
  alternates: { canonical: "/api-keys" },
  openGraph: { title: "API Keys — PoPP", description: "Manage your PoPP API keys for integrating with the decentralized validation network.", url: "/api-keys" },
  twitter: { title: "API Keys — PoPP", description: "Manage your PoPP API keys for protocol integration." },
};

const apikeysJsonLd = {"@context":"https://schema.org","@type":"TechArticle","name":"API Keys - PoPP Developer Portal","url":"https://pops.thharko.com/api-keys","publisher":{"@type":"Organization","name":"Proof of Problem Protocol","url":"https://pops.thharko.com"}};

export default function ApiKeysLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "API Keys" }]} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(apikeysJsonLd) }} />{children}</>; }
