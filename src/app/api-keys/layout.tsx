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

export default function ApiKeysLayout({ children }: { children: React.ReactNode }) { return <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "API Keys" }]} />{children}</>; }
